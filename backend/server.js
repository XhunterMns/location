const express = require('express');
const cors = require('cors');
const { APP_CONFIG } = require('./config/app.config');
const { ensureDatabaseSchema } = require('./db_config/database');
const authRoutes = require('./routes/auth.routes');
const landlordRoutes = require('./routes/landlord.routes');
const renterRoutes = require('./routes/renter.routes');
const adminRoutes = require('./routes/admin.routes');
const agencyRoutes = require('./routes/agency.routes');

const app = express();

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

app.get('/', (req, res) => {
  res.json({ service: 'location-backend', status: 'ok' });
});

app.use('/api', authRoutes);
app.use('/api', agencyRoutes);
app.use('/api', landlordRoutes);
app.use('/api', renterRoutes);
app.use('/api', adminRoutes);

const PORT = process.env.PORT || 3000;

if (APP_CONFIG.jwtSecret === 'secret123' && process.env.NODE_ENV !== 'development') {
  console.error('Invalid JWT secret configuration. Set JWT_SECRET env variable.');
  process.exit(1);
}

ensureDatabaseSchema()
  .then(() => {
    const port = Number(process.env.PORT || PORT || 3000);

    app.listen(port, '0.0.0.0', () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Startup failed:', error);
    process.exit(1);
  });
