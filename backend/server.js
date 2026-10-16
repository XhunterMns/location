const express = require('express');
const cors = require('cors');
const { ensureDatabaseSchema } = require('./db_config/database');
const authRoutes = require('./routes/auth.routes');
const landlordRoutes = require('./routes/landlord.routes');
const renterRoutes = require('./routes/renter.routes');
const adminRoutes = require('./routes/admin.routes');

const app = express();

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

app.use('/api', authRoutes);
app.use('/api', landlordRoutes);
app.use('/api', renterRoutes);
app.use('/api', adminRoutes);

const PORT = process.env.PORT || 3000;

ensureDatabaseSchema()
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
  .catch((error) => {
    console.error('Startup failed:', error);
    process.exit(1);
  });
