const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

async function fixAdminPassword() {
  try {
    // Connect to MongoDB
    await mongoose.connect(
      process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio_shaman'
    );
    console.log('✅ Connected to MongoDB');

    // Get Admin model
    const Admin = require('./models/Admin');
    
    const adminEmail = 'admin@portfolio.com';
    const newPassword = 'Admin123';
    
    // Find admin
    let admin = await Admin.findOne({ email: adminEmail });
    
    if (!admin) {
      console.log('❌ Admin not found, creating new one...');
      admin = new Admin({
        email: adminEmail,
        password: newPassword,
        name: 'Shaman Admin'
      });
    } else {
      console.log('✅ Admin found, resetting password...');
      admin.password = newPassword; // Will be hashed on save
    }
    
    await admin.save();
    
    // Verify
    const isMatch = await bcrypt.compare(newPassword, admin.password);
    console.log(`📧 Email: ${adminEmail}`);
    console.log(`🔑 New Password: ${newPassword}`);
    console.log(`✅ Password verification: ${isMatch ? 'SUCCESS' : 'FAILED'}`);
    
    console.log('\n✅ Admin password reset complete!');
    console.log('Now use:');
    console.log('  Email: admin@portfolio.com');
    console.log('  Password: Admin123');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

fixAdminPassword();