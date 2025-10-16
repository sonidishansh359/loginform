const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// ==========================
// 🧩 Middleware
// ==========================
app.use(cors({
  origin: ['https://loginform-okk7.onrender.com', 'https://loginform-1-o84v.onrender.com', 'http://localhost:3000'],
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json({ limit: '10mb' }));

// ==========================
// 🗄️ MongoDB Connection
// ==========================
mongoose.connect('mongodb+srv://dishansh:dishansh@cluster0.ojxirwi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.log('❌ DB Connection Error:', err));

// optional listeners (for better logs)
mongoose.connection.on('connected', () => console.log('✅ MongoDB Connection Established'));
mongoose.connection.on('error', (err) => console.log('❌ MongoDB Error:', err));

// ==========================
// 💤 Wake-Up / Test Routes
// ==========================

// ping route (Render wake-up fix)
app.get('/ping', (req, res) => {
  res.send('Server is awake 🚀');
});

// root route (test route)
app.get('/', (req, res) => {
  res.send('Backend working fine ✅');
});

// ==========================
// 🧠 Main Routes
// ==========================
app.use('/api/auth', require('./routes/auth'));
app.use('/api/form', require('./routes/form'));

// ==========================
// 🚀 Start Server
// ==========================
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
