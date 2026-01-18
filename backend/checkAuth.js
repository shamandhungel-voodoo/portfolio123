import axios from 'axios';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import readline from 'readline';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 1. CONFIGURATION - EDIT THESE FOR YOUR SETUP
const BACKEND_URL = 'http://localhost:5000';
const MONGO_URI = 'mongodb://localhost:27017/portfolio'; // Update with your actual DB name
const USER_MODEL_NAME = 'User'; // Change if your model has a different name
const TEST_CREDENTIALS = {
  email: 'admin1@portfolio.com',
  password: 'Admin1234'
};

async function runDiagnostics() {
  console.log('🔍 Running Admin Auth Diagnostics...\n');

  // 2. TEST 1: Check if Login Endpoint is Alive
  console.log('1. Testing server connection...');
  try {
    const health = await axios.get(`${BACKEND_URL}/api/health`); // Modify endpoint if needed
    console.log(`   ✅ Server responded: ${health.status}`);
  } catch (err) {
    console.log(`   ❌ Cannot reach server at ${BACKEND_URL}`);
    console.log(`   Error: ${err.message}`);
    console.log('\n💡 TIP: Ensure your backend (localhost:5000) is running.');
    return;
  }

  // 3. TEST 2: Attempt Login with Provided Credentials
  console.log('\n2. Testing login endpoint...');
  try {
    const loginRes = await axios.post(`${BACKEND_URL}/api/auth/login`, TEST_CREDENTIALS, {
      headers: { 'Content-Type': 'application/json' }
    });
    console.log(`   ✅ Login successful! Server responded with status: ${loginRes.status}`);
    console.log(`   Response sample:`, JSON.stringify(loginRes.data).substring(0, 200) + '...');
    console.log('\n🎉 The credentials work! The issue might be in your frontend session handling.');
    return; // Stop here if login works
  } catch (err) {
    console.log(`   ❌ Login failed with status: ${err.response?.status || 'No response'}`);
    if (err.response?.data) {
      console.log(`   Server error message: ${JSON.stringify(err.response.data)}`);
    }
  }

  // 4. TEST 3: Database Connection & User Inspection
  console.log('\n3. Connecting to database to inspect user...');
  let UserModel;
  try {
    await mongoose.connect(MONGO_URI);
    console.log('   ✅ Connected to MongoDB');

    // Try to get the User model - check existing models or import it
    // First, let's try to require it from your models directory
    try {
      const userModule = await import('./models/User.js');
      UserModel = userModule.default || mongoose.models[USER_MODEL_NAME];
    } catch (importErr) {
      console.log('   ℹ️  Could not import User model directly, checking mongoose models...');
      UserModel = mongoose.models[USER_MODEL_NAME];
    }

    if (!UserModel) {
      console.log(`   ❌ Could not find User model. Trying to create schema...`);
      
      // Create a minimal User schema if model doesn't exist
      const userSchema = new mongoose.Schema({
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: { type: String, default: 'user' }
      });
      UserModel = mongoose.model(USER_MODEL_NAME, userSchema);
    }

    const user = await UserModel.findOne({ email: TEST_CREDENTIALS.email });

    if (!user) {
      console.log(`   ❌ User "${TEST_CREDENTIALS.email}" NOT FOUND in database.`);
      console.log('\n💡 TIP: The user does not exist. You need to create it first.');
    } else {
      console.log(`   ✅ User found: ${user.email}`);
      console.log(`   User ID: ${user._id}`);
      console.log(`   Has password hash: ${!!user.password}`);

      // 5. Check if password matches
      const isValid = await bcrypt.compare(TEST_CREDENTIALS.password, user.password);
      console.log(`   Password "Admin1234" matches hash: ${isValid ? '✅ YES' : '❌ NO'}`);

      if (!isValid) {
        console.log('\n💡 TIP: The password does not match the hash in DB.');
        console.log('   The stored hash might be for a different password.');
      }
    }
  } catch (dbErr) {
    console.log(`   ❌ Database error: ${dbErr.message}`);
  } finally {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }
  }

  // 6. OPTION: Create a guaranteed admin user
  console.log('\n---\n');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question('Create a new, guaranteed admin user? (yes/no): ', async (answer) => {
    if (answer.toLowerCase() === 'yes') {
      await createGuaranteedAdmin();
    } else {
      console.log('Skipping user creation.');
    }
    rl.close();
  });
}

async function createGuaranteedAdmin() {
  const NEW_ADMIN = {
    email: 'admin@fix.com',
    password: 'SecurePass123'
  };

  try {
    await mongoose.connect(MONGO_URI);
    
    // Try to get or create User model
    let UserModel;
    try {
      const userModule = await import('./models/User.js');
      UserModel = userModule.default || mongoose.models[USER_MODEL_NAME];
    } catch {
      // Create schema if model doesn't exist
      const userSchema = new mongoose.Schema({
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: { type: String, default: 'user' }
      });
      UserModel = mongoose.model(USER_MODEL_NAME, userSchema);
    }

    // Hash password with bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(NEW_ADMIN.password, salt);

    // Create user or update if exists
    const existingUser = await UserModel.findOne({ email: NEW_ADMIN.email });
    
    if (existingUser) {
      existingUser.password = hashedPassword;
      existingUser.role = 'admin';
      await existingUser.save();
      console.log('\n✅ EXISTING ADMIN USER UPDATED!');
    } else {
      const newUser = new UserModel({
        email: NEW_ADMIN.email,
        password: hashedPassword,
        role: 'admin'
      });
      await newUser.save();
      console.log('\n✅ NEW ADMIN USER CREATED!');
    }
    
    console.log(`   Email: ${NEW_ADMIN.email}`);
    console.log(`   Password: ${NEW_ADMIN.password}`);
    console.log('\n💡 Use these credentials to log in, then check your auth logic.');
  } catch (err) {
    console.log(`❌ Creation failed: ${err.message}`);
  } finally {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }
  }
}

// Run the script
runDiagnostics().catch(console.error);