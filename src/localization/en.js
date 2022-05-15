module.exports = (key) => ({
    'validation.min.length' : 'IBAN cannot be more than 15 letters.',
    'validation.max.length' : 'IBAN cannot be more than 34 letters.',
    'validation.alphaNumeric' : 'IBAN must only contain alpha numeric characters.',
    'iban.valid' : 'IBAN is valid.',
    'iban.invalid' : 'IBAN is invalid.'
}[key])