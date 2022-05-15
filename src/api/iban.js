const express = require('express');

const router = express.Router();

router.post('/validate', async (req, res) => {
  const { iban } = req.body;
  res.json(`${iban} is valid`);
});

module.exports = router;
