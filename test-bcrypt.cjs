const bcrypt = require('bcrypt');

async function testBcrypt() {
  const password = 'password123';
  
  console.log('Hashing password...');
  const hash = await bcrypt.hash(password, 10);
  console.log('Hashed password:', hash);
  console.log('Hash length:', hash.length);
  
  console.log('Verifying correct password...');
  const match1 = await bcrypt.compare(password, hash);
  console.log('Should be true:', match1);
  
  console.log('Verifying incorrect password...');
  const match2 = await bcrypt.compare('wrongpassword', hash);
  console.log('Should be false:', match2);
}

testBcrypt().catch(console.error);

