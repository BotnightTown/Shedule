const express = require('express');
const dotenv = require('dotenv')
const cors = require('cors');
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const scheduleRoutes = require('./routes/scheduleRoutes');
app.use('/', scheduleRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, HOST, () => {
  console.log(`Server running on port ${PORT} \n`)
});
