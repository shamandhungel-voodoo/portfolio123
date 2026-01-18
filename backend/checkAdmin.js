import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const MONGO_URI = process.env.MONGODB_URI || 'mongodb+srv://portfolio:f6q8iFn4KPw6ti4h@portfolio.gn5rmzy.mongodb.net/';

async function checkAndCreateAdmin() {
  try {
    console.log('🔗 Connecting to MongoDB Atlas...');
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB Atlas');
    
    // Check if Admin model exists
    const existingModel = mongoose.models.Admin;
    let Admin;
    
    if (existingModel) {
      Admin = existingModel;
      console.log('📋 Using existing Admin model');
    } else {
      // Create Admin schema
      const adminSchema = new mongoose.Schema({
        email: {
          type: String,
          required: true,
          unique: true,
          lowercase: true,
          trim: true,
        },
        password: {
          type: String,
          required: true,
        },
        name: {
          type: String,
          required: true,
          trim: true,
        },
        lastLogin: {
          type: Date,
          default: Date.now,
        },
        role: {
          type: String,
          default: 'admin',
          enum: ['admin', 'superadmin'],
        },
      }, {
        timestamps: true,
      });
      
      Admin = mongoose.model('Admin', adminSchema);
      console.log('📋 Created new Admin model');
    }
    
    // Check for existing admin
    const adminEmail = process.env.ADMIN_EMAIL || 'admin1@portfolio.com';
    const existingAdmin = await Admin.findOne({ email: adminEmail });
    
    if (existingAdmin) {
      console.log(`✅ Admin found: ${existingAdmin.email}`);
      console.log(`   Role: ${existingAdmin.role}`);
      console.log(`   Created: ${existingAdmin.createdAt}`);
    } else {
      console.log(`❌ Admin "${adminEmail}" NOT FOUND in database`);
      console.log('\n🚀 Creating admin user now...');
      
      // Create new admin
      const bcrypt = await import('bcryptjs');
      const salt = await bcrypt.genSalt(12);
      const hashedPassword = await bcrypt.hash('Admin1234', salt);
      
      const newAdmin = new Admin({
        email: adminEmail,
        password: hashedPassword,
        name: 'Admin User',
        role: 'admin'
      });
      
      await newAdmin.save();
      console.log(`✅ Created admin: ${adminEmail}`);
      console.log(`   Password: Admin1234`);
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

checkAndCreateAdmin();