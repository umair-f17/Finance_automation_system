require('dotenv').config();
require('./config/db'); 

const express = require('express');
const cors = require('cors');
const organizationRoutes = require('./routes/organizationRoutes');

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  setTimeout(() => {
    next();
  }, 1000); 
});

app.use('/organization', organizationRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
