const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    console.log('🔗 Attempting to connect to MongoDB Atlas...');
    console.log('📁 Database URI:', process.env.MONGODB_URI ? 'Present (hidden for security)' : 'Missing!');
    
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }

    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000, // Increased to 10 seconds
      socketTimeoutMS: 45000, // Keep connection alive
    });

    console.log(`✅ MongoDB Atlas Connected: ${conn.connection.host}`);
    console.log(`📊 Database: ${conn.connection.name}`);
    console.log(`⚡ Connection state: ${mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'}`);

    // Create default admin
    await createDefaultAdmin();
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    console.error('💡 Check these Atlas settings:');
    console.error('1. Network Access → Add IP Address 0.0.0.0/0');
    console.error('2. Database Access → User has readWrite permissions');
    console.error('3. Check internet connection');
    console.error('4. Verify password is correct');
    console.error('Full error:', error);
    process.exit(1);
  }
};

const createDefaultAdmin = async () => {
  try {
    const Admin = require('../models/Admin');
    
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
      console.warn('⚠️ ADMIN_EMAIL or ADMIN_PASSWORD not set in .env');
      return;
    }

    // Check if admin exists
    let admin = await Admin.findOne({ email: adminEmail });
    
    if (!admin) {
      console.log('📝 Creating default admin user...');
      console.log(`📧 Email: ${adminEmail}`);
      
      admin = new Admin({
        email: adminEmail,
        password: adminPassword,
        name: 'Shaman Admin'
      });
      
      await admin.save();
      console.log('✅ Default admin created successfully');
    } else {
      console.log('✅ Admin user already exists');
    }

    // Don't log password in production
    if (process.env.NODE_ENV !== 'production') {
      console.log(`📧 Login Email: ${adminEmail}`);
      console.log(`🔑 Login Password: ${adminPassword}`);
    }
  } catch (error) {
    console.error('❌ Error in createDefaultAdmin:', error.message);
  }
};

// Event listeners for debugging
mongoose.connection.on('connected', () => {
  console.log('📡 Mongoose connected to DB');
});

mongoose.connection.on('error', (err) => {
  console.error('📡 Mongoose connection error:', err.message);
});

mongoose.connection.on('disconnected', () => {
  console.log('📡 Mongoose disconnected from DB');
});

process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('📡 MongoDB connection closed through app termination');
  process.exit(0);
});

module.exports = connectDB;