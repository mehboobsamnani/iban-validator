const express = require('express');

const iban = require('./iban');

const router = express.Router();

/**
 * GET v1/status
 */
router.get('/status', (req, res) => {
  res.json({
    message: 'OK',
    timestamp: new Date().toISOString(),
    IP: req.ip,
    URL: req.originalUrl,
  });
});

router.use('/iban', iban);

module.exports = router;
