const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb+srv://102597504:azkkR0l1txFE0fpc@cluster0.jczodm5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

const reservationRoutes = require('./routes/reservation');
app.use('/api/reservations', reservationRoutes);