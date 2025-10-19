#!/usr/bin/env node

/**
 * Test Admin Login Script
 * Tests the admin login API endpoint
 */

const fetch = require('node-fetch');

async function testAdminLogin() {
  const baseUrl = 'http://localhost:3000';
  
  console.log('🧪 Testing admin login...');
  
  try {
    // Test with admin@gekct.org
    const response = await fetch(`${baseUrl}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'admin@gekct.org',
        password: 'admin123' // Default password from seed script
      })
    });

    const data = await response.json();
    
    if (data.success) {
      console.log('✅ Admin login successful!');
      console.log('User:', data.data.user.name);
      console.log('Email:', data.data.user.email);
      console.log('Role:', data.data.user.role);
      console.log('Token received:', data.data.token ? 'Yes' : 'No');
    } else {
      console.log('❌ Admin login failed:', data.error);
    }
    
  } catch (error) {
    console.error('❌ Error testing admin login:', error.message);
    console.log('Make sure the dev server is running on http://localhost:3000');
  }
}

// Run the test
if (require.main === module) {
  testAdminLogin();
}

module.exports = { testAdminLogin };
