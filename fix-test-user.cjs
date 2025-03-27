const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');

async function main() {
  console.log('Connecting to database...');
  
  // Create a connection to the database
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ecommerce'
  });
  
  console.log('Connected successfully!');
  
  // Check if test user exists
  const [users] = await connection.execute(
    'SELECT * FROM customers WHERE email = ?',
    ['test@example.com']
  );
  
  console.log('Found users:', users.length);
  
  if (users.length > 0) {
    const user = users[0];
    console.log('Existing user:', {
      id: user.id,
      email: user.email,
      password: user.password ? `${user.password.substring(0, 10)}...` : 'null'
    });
    
    // Hash the password
    const hashedPassword = await bcrypt.hash('password123', 10);
    console.log('Generated hashed password:', hashedPassword);
    
    // Update the user with the hashed password
    await connection.execute(
      'UPDATE customers SET password = ? WHERE id = ?',
      [hashedPassword, user.id]
    );
    
    console.log('Updated user password with bcrypt hash');
  } else {
    // Create a new user with hashed password
    const hashedPassword = await bcrypt.hash('password123', 10);
    console.log('Generated hashed password:', hashedPassword);
    
    const [result] = await connection.execute(
      `INSERT INTO customers (
        firstname, lastname, email, password, phone, 
        street_address, postal_code, city, country
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        'Test', 'User', 'test@example.com', hashedPassword,
        '123456789', 'Test Street', '12345', 'Test City', 'Test Country'
      ]
    );
    
    console.log('Created new user with ID:', result.insertId);
  }
  
  // Verify the user can be authenticated
  const [updatedUsers] = await connection.execute(
    'SELECT * FROM customers WHERE email = ?',
    ['test@example.com']
  );
  
  if (updatedUsers.length > 0) {
    const user = updatedUsers[0];
    const passwordMatch = await bcrypt.compare('password123', user.password);
    
    console.log('Password verification test:', passwordMatch ? 'SUCCESS' : 'FAILED');
  }
  
  await connection.end();
  console.log('Database connection closed');
}

main().catch(error => {
  console.error('Error:', error);
  process.exit(1);
});

