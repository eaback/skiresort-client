const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');

async function main() {
  try {
    console.log('Connecting to database...');
    
    // Create a connection to the database
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'ecommerce'
    });
    
    console.log('Connected successfully!');
    
    // Check if admin user exists
    const [users] = await connection.execute(
      'SELECT * FROM customers WHERE email = ?',
      ['edgar.backer@medieinstitutet.se']
    );
    
    if (users.length > 0) {
      const user = users[0];
      console.log('Admin user exists:', {
        id: user.id,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname
      });
      
      // Update admin password
      const hashedPassword = await bcrypt.hash('welkom123', 10);
      console.log('Generated hashed password for admin');
      
      await connection.execute(
        'UPDATE customers SET password = ? WHERE id = ?',
        [hashedPassword, user.id]
      );
      
      console.log('Updated admin password');
    } else {
      console.log('Admin user does not exist. Creating new admin user...');
      
      // Create admin user with hashed password
      const hashedPassword = await bcrypt.hash('welkom123', 10);
      
      const [result] = await connection.execute(
        `INSERT INTO customers (
          firstname, lastname, email, password, phone, 
          street_address, postal_code, city, country
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          'Edgar', 'Backer', 'edgar.backer@medieinstitutet.se', hashedPassword,
          '123456789', 'Admin Street', '12345', 'Admin City', 'Sweden'
        ]
      );
      
      console.log('Created admin user with ID:', result.insertId);
    }
    
    await connection.end();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error:', error);
  }
}

main();

