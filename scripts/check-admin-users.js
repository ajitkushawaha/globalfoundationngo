#!/usr/bin/env node

/**
 * Check Admin Users Script
 * Lists all admin users in the database
 */

const mongoose = require('mongoose');

// User schema (simplified)
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String,
  isActive: Boolean,
  createdAt: Date
});

const User = mongoose.model('User', userSchema);

async function checkAdminUsers() {
  try {
    // Connect to MongoDB
    const mongoUri = process.env.DB || process.env.MONGODB_URI;
    if (!mongoUri) {
      console.error('❌ No MongoDB URI found in environment variables');
      console.log('Please set DB or MONGODB_URI environment variable');
      return;
    }

    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB');

    // Find all users
    const users = await User.find({});
    console.log(`\n📊 Found ${users.length} users in database:`);
    
    if (users.length === 0) {
      console.log('❌ No users found in database');
      console.log('\n💡 To create an admin user, run:');
      console.log('   node scripts/seed-admin-users.js');
      return;
    }

    // Display users
    users.forEach((user, index) => {
      console.log(`\n${index + 1}. User:`);
      console.log(`   Name: ${user.name || 'N/A'}`);
      console.log(`   Email: ${user.email || 'N/A'}`);
      console.log(`   Role: ${user.role || 'N/A'}`);
      console.log(`   Active: ${user.isActive ? 'Yes' : 'No'}`);
      console.log(`   Created: ${user.createdAt || 'N/A'}`);
    });

    // Check for admin users
    const adminUsers = users.filter(user => user.role === 'admin' && user.isActive);
    console.log(`\n👑 Active admin users: ${adminUsers.length}`);
    
    if (adminUsers.length === 0) {
      console.log('❌ No active admin users found');
      console.log('\n💡 To create an admin user, run:');
      console.log('   node scripts/seed-admin-users.js');
    } else {
      console.log('✅ Admin users found:');
      adminUsers.forEach((user, index) => {
        console.log(`   ${index + 1}. ${user.name} (${user.email})`);
      });
    }

  } catch (error) {
    console.error('❌ Error checking admin users:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('\n✅ Disconnected from MongoDB');
  }
}

// Run the script
if (require.main === module) {
  checkAdminUsers();
}

module.exports = { checkAdminUsers };
