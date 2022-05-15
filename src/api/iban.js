const express = require('express');
const Joi = require('joi');

const router = express.Router();

// customized validation message based on locale
const schema = Joi.object({
  iban: Joi.string()
    .trim()
    .alphanum()
    .min(15)
    .max(34)
    .required()
    .messages({
      'string.alphanum': 'IBAN must only contain alpha numeric characters.',
      'string.min': 'IBAN cannot be more than 15 letters.',
      'string.max': 'IBAN cannot be more than 34 letters.',
    })
});

router.post('/validate', async (req, res) => {
  try {
    const { iban } = await schema.validateAsync(req.body);
    res.json(`${iban} is valid`);
  } catch (error) {
    res.status(400);
    res.json({ message: error.message });
  }
});

module.exports = router;
