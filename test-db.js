const mysql = require('mysql2/promise');

async function testConnection() {
  try {
    console.log('Attempting to connect to database...');
    
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'ecommerce'
    });
    
    console.log('Connection successful!');
    
    // Test a simple query
    const [rows] = await connection.execute('SELECT * FROM products LIMIT 1');
    console.log('Query result:', rows);
    
    // Try to insert a test customer
    const [result] = await connection.execute(
      `INSERT INTO customers (firstname, lastname, email, password, phone, street_address, postal_code, city, country)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      ['Test', 'User', 'test@example.com', 'password123', '123456789', 'Test Street', '12345', 'Test City', 'Test Country']
    );
    
    console.log('Insert result:', result);
    
    // Check if the customer was inserted
    const [customers] = await connection.execute('SELECT * FROM customers WHERE email = ?', ['test@example.com']);
    console.log('Inserted customer:', customers);
    
    await connection.end();
  } catch (error) {
    console.error('Database test failed:', error);
  }
}

testConnection();