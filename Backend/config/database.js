const { Sequelize } = require('sequelize');
require('dotenv').config();

// Veritabanı bağlantı bilgilerini alalım
const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST,        // Veritabanı sunucusu (localhost veya başka bir adres)
  username: process.env.DB_USER,    // Kullanıcı adı (örneğin: postgres)
  password: process.env.DB_PASSWORD, // Veritabanı parolası
  database: process.env.DB_NAME,    // Veritabanı adı (örneğin: mydatabase)
  port: process.env.DB_PORT,        // Port (varsayılan olarak 5432, ancak başka bir port kullanılıyorsa değiştirilir)
  logging: false                    // Gereksiz log'ları engellemek için
});

// Veritabanı bağlantısını test edelim
sequelize.authenticate()
  .then(() => {
    console.log('Veritabanı bağlantısı başarılı!');
  })
  .catch(err => {
    console.error('Veritabanı bağlantısı hatası:', err.message);
  });

module.exports = sequelize;
