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
    
    // Check if the user exists
    const [users] = await connection.execute(
      'SELECT * FROM customers WHERE email = ?',
      ['edgarbacker@gmail.com']
    );
    
    if (users.length > 0) {
      const user = users[0];
      console.log('User exists:', {
        id: user.id,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        password: user.password ? `${user.password.substring(0, 10)}... (length: ${user.password.length})` : 'NULL'
      });
      
      // Hash the password
      const hashedPassword = await bcrypt.hash('welkom123', 10);
      console.log('Generated hashed password:', hashedPassword);
      
      // Update the user with the hashed password
      await connection.execute(
        'UPDATE customers SET password = ? WHERE id = ?',
        [hashedPassword, user.id]
      );
      
      console.log('Updated user password with bcrypt hash');
      
      // Verify the password can be authenticated
      const [updatedUser] = await connection.execute(
        'SELECT * FROM customers WHERE id = ?',
        [user.id]
      );
      
      if (updatedUser.length > 0) {
        const passwordMatch = await bcrypt.compare('welkom123', updatedUser[0].password);
        console.log('Password verification test:', passwordMatch ? 'SUCCESS' : 'FAILED');
      }
    } else {
      console.log('User does not exist. Creating new user...');
      
      // Create a new user with hashed password
      const hashedPassword = await bcrypt.hash('welkom123', 10);
      
      const [result] = await connection.execute(
        `INSERT INTO customers (
          firstname, lastname, email, password, phone, 
          street_address, postal_code, city, country
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          'Edgar', 'Backer', 'edgarbacker@gmail.com', hashedPassword,
          '123456789', 'Test Street', '12345', 'Test City', 'Sweden'
        ]
      );
      
      console.log('Created new user with ID:', result.insertId);
    }
    
    // Check all users in the database
    const [allUsers] = await connection.execute('SELECT id, email, firstname, lastname FROM customers');
    console.log('All users in database:');
    allUsers.forEach(user => {
      console.log(`- ID: ${user.id}, Email: ${user.email}, Name: ${user.firstname} ${user.lastname}`);
    });
    
    await connection.end();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error:', error);
  }
}

main();

