const express = require('express');
const Joi = require('joi');

const router = express.Router();
const validateIban = require('../functions/iban');
const en = require('../localization/en');

// customized validation message based on locale
const schema = Joi.object({
  iban: Joi.string()
    .trim()
    .alphanum()
    .min(15)
    .max(34)
    .required()
    .messages({
      'string.alphanum': en('validation.alphaNumeric'),
      'string.min': en('validation.min.length'),
      'string.max': en('validation.max.length'),
    })
});

/**
 * @swagger
 * components:
 *  schemas:
 *    Payload:
 *     type: string
 *     required:
 *      - iban
 *     properties:
 *      iban:
 *       type: string
 *       description: 32 alphanumeric characters, comprising a country code, two check digits
 *                    and a long and detailed bank account number
 *     example:
 *      iban: AE070331234567890123456
 *  responses:
 *    Valid:
 *     type: object
 *     properties:
 *      message:
 *       type: string
 *       description: reponse with a message
 *     example:
 *      message: IBAN is valid.
 *    InValid:
 *     type: object
 *     properties:
 *      message:
 *       type: string
 *       description: reponse with a message
 *     example:
 *      message: IBAN is invalid.
 *    ValidationError:
 *     type: object
 *     properties:
 *      message:
 *       type: string
 *       description: reponse with a validation error message
 *     example:
 *      message: IBAN must only contain alpha numeric characters.
 */

/**
  * @swagger
  * tags:
  *   name: IBAN
  *   description: list of apis that provide validation and conversion for iban
  */

/**
 * @openapi
 * /iban/validate:
 *   post:
 *      summary: Validates an IBAN
 *      tags: [IBAN]
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Payload'
 *      responses:
 *       200:
 *         description: Returns with valid or is invalid message.
 *         content:
 *           application/json:
 *             schema:
 *              oneOf:
 *                 - $ref: '#/components/responses/Valid'
 *                 - $ref: '#/components/responses/InValid'
 *       400:
 *         description: Returns error message.
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/responses/ValidationError'
 */

router.post('/validate', async (req, res) => {
  try {
    const { iban } = await schema.validateAsync(req.body);
    let response = false;
    if (validateIban(iban)) {
      response = true;
    }
    res.json({ message: response ? en('iban.valid') : en('iban.invalid') });
  } catch (error) {
    res.status(400);
    res.json({ message: error.message });
  }
});

module.exports = router;
