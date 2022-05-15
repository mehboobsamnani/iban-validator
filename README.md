# IBAN Validator

NodeJS Express Web Server that provide api to validate IBAN

## Directory Layout
    .
    ├── ...
    ├── coverage                # will be created once run test command , contains html files that are generate based on test and display test coverage.
    ├── src                     # Source code directory
    │   ├── api                 # Load and stress tests
    │   ├── config              # configuration file i.e. swagger.
    │   ├── functions           # contains methods to be used in api's. 
    │   ├── app.js              # Express server setup
    │   ├── index.js            # configuration for swagger.
    │   └── middleware.js       # api middleware to handle where route throws error or is not found.
    ├── test                    # Test files (alternatively `spec` or `tests`)
    ├── .eslintrc.js            # ES Lint configuration
    └── package.json            # Dependences

## Setup

```
npm install
```
## Development

To run application

```
npm run dev
```

Open in your browser

- http://localhost:3000

## API Documentation

Api is documented using swagger jsdoc and swagger ui, which can be view on below url.

- http://localhost:3000/docs

## Lint

```
npm run lint
```

## Test

```
npm run test
```
