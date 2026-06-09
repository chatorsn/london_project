const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 4000;

// Middleware
app.use(cors());
app.use(express.json());

// База данных
const dbPath = path.join(__dirname, '../database.sqlite');
const db = new sqlite3.Database(dbPath);

// Создаём таблицу
db.run(`
  CREATE TABLE IF NOT EXISTS bookings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    fullName TEXT NOT NULL,
    company TEXT,
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    serviceType TEXT NOT NULL,
    pickup TEXT NOT NULL,
    destination TEXT NOT NULL,
    date TEXT NOT NULL,
    time TEXT NOT NULL,
    passengers INTEGER NOT NULL,
    meetAndGreet INTEGER DEFAULT 0,
    notes TEXT,
    status TEXT DEFAULT 'pending',
    createdAt TEXT DEFAULT (datetime('now')),
    updatedAt TEXT DEFAULT (datetime('now'))
  )
`);

// Валидация даты (не прошлая)
function isValidDate(dateStr) {
  const today = new Date().toISOString().split('T')[0];
  return dateStr >= today;
}

// Валидация email
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// POST /api/bookings - создать бронирование
app.post('/api/bookings', (req, res) => {
  const { fullName, company, phone, email, serviceType, pickup, destination, date, time, passengers, meetAndGreet, notes } = req.body;
  
  const errors = [];
  
  if (!fullName || fullName.length < 2) errors.push({ field: 'fullName', message: 'Full name is required' });
  if (!phone || phone.length < 5) errors.push({ field: 'phone', message: 'Phone is required' });
  if (!email || !isValidEmail(email)) errors.push({ field: 'email', message: 'Invalid email format' });
  if (!serviceType || !['airport', 'corporate', 'group', 'private'].includes(serviceType)) errors.push({ field: 'serviceType', message: 'Invalid service type' });
  if (!pickup) errors.push({ field: 'pickup', message: 'Pickup address is required' });
  if (!destination) errors.push({ field: 'destination', message: 'Destination is required' });
  if (!date || !isValidDate(date)) errors.push({ field: 'date', message: 'Date cannot be in the past' });
  if (!time) errors.push({ field: 'time', message: 'Time is required' });
  if (!passengers || passengers < 1) errors.push({ field: 'passengers', message: 'Passengers must be at least 1' });
  
  if (errors.length > 0) {
    return res.status(400).json({ success: false, message: 'Validation failed', errors });
  }
  
  db.run(
    `INSERT INTO bookings (fullName, company, phone, email, serviceType, pickup, destination, date, time, passengers, meetAndGreet, notes) 
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [fullName, company || null, phone, email, serviceType, pickup, destination, date, time, passengers, meetAndGreet ? 1 : 0, notes || null],
    function(err) {
      if (err) {
        return res.status(500).json({ success: false, message: 'Database error', error: err.message });
      }
      res.status(201).json({
        success: true,
        message: 'Booking created successfully',
        data: { id: this.lastID, status: 'pending', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }
      });
    }
  );
});

// GET /api/bookings - получить все бронирования
app.get('/api/bookings', (req, res) => {
  const { status, search } = req.query;
  let sql = 'SELECT * FROM bookings';
  const params = [];
  
  if (status || search) {
    sql += ' WHERE';
    if (status) {
      sql += ' status = ?';
      params.push(status);
    }
    if (search) {
      if (status) sql += ' AND';
      sql += ' (fullName LIKE ? OR id LIKE ?)';
      params.push(`%${search}%`, `%${search}%`);
    }
  }
  
  sql += ' ORDER BY id DESC';
  
  db.all(sql, params, (err, rows) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Database error', error: err.message });
    }
    res.json({ success: true, data: rows, total: rows.length });
  });
});

// GET /api/bookings/:id - получить одно бронирование
app.get('/api/bookings/:id', (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM bookings WHERE id = ?', [id], (err, row) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Database error', error: err.message });
    }
    if (!row) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }
    res.json({ success: true, data: row });
  });
});

// PATCH /api/bookings/:id/status - обновить статус
app.patch('/api/bookings/:id/status', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const validStatuses = ['pending', 'confirmed', 'completed', 'cancelled'];
  
  if (!status || !validStatuses.includes(status)) {
    return res.status(400).json({ success: false, message: 'Invalid status value' });
  }
  
  db.run('UPDATE bookings SET status = ?, updatedAt = datetime("now") WHERE id = ?', [status, id], function(err) {
    if (err) {
      return res.status(500).json({ success: false, message: 'Database error', error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }
    res.json({ success: true, message: 'Status updated', data: { id: parseInt(id), status, updatedAt: new Date().toISOString() } });
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
  console.log(`📁 Database: ${dbPath}`);
});
