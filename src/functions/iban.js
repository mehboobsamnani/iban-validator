const LETTER_TO_TWO_DIGITS = 55;
const DECIMAL_POINT = 10;

/**
 * Country Code and their iban length
 */
const CODE_LENGTHS = {
  AD: 24,
  AE: 23,
  AT: 20,
  AZ: 28,
  BA: 20,
  BE: 16,
  BG: 22,
  BH: 22,
  BR: 29,
  CH: 21,
  CY: 28,
  CZ: 24,
  DE: 22,
  DK: 18,
  DO: 28,
  EE: 20,
  ES: 24,
  FI: 18,
  FO: 18,
  FR: 27,
  GB: 22,
  GI: 23,
  GL: 18,
  GR: 27,
  GT: 28,
  HR: 21,
  HU: 28,
  IE: 22,
  IL: 23,
  IS: 26,
  IT: 27,
  JO: 30,
  KW: 30,
  KZ: 20,
  LB: 28,
  LI: 21,
  LT: 20,
  LU: 20,
  LV: 21,
  MC: 27,
  MD: 24,
  ME: 22,
  MK: 19,
  MR: 27,
  MT: 31,
  MU: 30,
  NL: 18,
  NO: 15,
  PK: 24,
  PL: 28,
  PS: 29,
  PT: 25,
  QA: 29,
  RO: 24,
  RS: 22,
  SA: 24,
  SE: 24,
  SI: 19,
  SK: 24,
  SM: 27,
  TN: 24,
  TR: 26,
  AL: 28,
  BY: 28,
  CR: 22,
  EG: 29,
  GE: 22,
  IQ: 23,
  LC: 32,
  SC: 31,
  ST: 25,
  SV: 28,
  TL: 23,
  UA: 29,
  VA: 22,
  VG: 24,
  XK: 20,
};

/**
 * Calculates the MOD 97 10 of the passed IBAN as specified in ISO7064.
 *
 * @param iban
 * @returns {number}
 */
function mod97(string) {
  let remainder = string;
  let block;

  while (remainder.length > 2) {
    block = remainder.slice(0, 9);
    // 4. Interpret the string as a decimal integer
    // and compute the remainder of that number on division by 97
    remainder = (parseInt(block, DECIMAL_POINT) % 97) + remainder.slice(block.length);
  }
  return parseInt(remainder, 10) % 97;
}

/**
 * Validating IBAN Based on Wikipedia
 * https://en.wikipedia.org/wiki/International_Bank_Account_Number#Validating_the_IBAN
 * @param iban
 * @returns {boolean} true if valid and false if invalid
 */
function validateIban(iban) {
  // using javascript array destructuring to get 1 , 2 and 3 index array parts from match function.
  const [, countryCode, checkDigits, accountNumber] = iban
    .toUpperCase()
    .match(/^([A-Z]{2})(\d{2})([A-Z\d]+)$/);

  // 1. Check that the total IBAN length is correct as per the country. If not, the IBAN is invalid
  if (!countryCode || iban.length !== CODE_LENGTHS[countryCode]) {
    return false;
  }

  // 2. Move the four initial characters to the end of the string
  const transformedIBAN = accountNumber + countryCode + checkDigits;

  // 3. Replace each letter in the string with two digits,
  // thereby expanding the string, where A = 10, B = 11, ..., Z = 35
  let digits = null; digits = (transformedIBAN).replace(/[A-Z]/g, (letter) => letter.charCodeAt(0) - LETTER_TO_TWO_DIGITS);

  return mod97(digits) === 1;
}

module.exports = validateIban;
