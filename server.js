// Load modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb+srv://102597504:azkkR0l1txFE0fpc@cluster0.jczodm5.mongodb.net/koala-relax?retryWrites=true&w=majority&appName=Cluster0');


async function listDatabases(client){
  const databaseList = await client.db.admin().listDatabases();
  console.log(databaseList);
};

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
  // List all databases
  //listDatabases(db);
});


// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Point to homepage
app.get('/', (req,res) => {
  res.sendFile(path.join(__dirname, 'public', 'Homepage.html'));
});

const reservationRoutes = require('./routes/reservation');
app.use('/api/reservations', reservationRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

//res.sendFile(path.join(__dirname, 'public', 'Homepage.html'));