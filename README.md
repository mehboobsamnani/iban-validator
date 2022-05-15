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
    │   ├── localization        # contains language specific translations.
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

## Run Application

### Using Docker

1. Build image using local dockerfile.
```
docker build . -t <your username>/iban-validator
```
2. Run the image
```
docker run -p 3000:3000 -d <your username>/iban-validator
```
3. To test your app, get the port of your app that Docker mapped:
```
docker ps
```

4. Now you can call your app using curl (install if needed via: sudo apt-get install curl):
```
curl -i localhost:3000
```
response example
```
HTTP/1.1 200 OK
Content-Security-Policy: default-src 'self';base-uri 'self';block-all-mixed-content;font-src 'self' https: data:;frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests
X-DNS-Prefetch-Control: off
Expect-CT: max-age=0
X-Frame-Options: SAMEORIGIN
Strict-Transport-Security: max-age=15552000; includeSubDomains
X-Download-Options: noopen
X-Content-Type-Options: nosniff
X-Permitted-Cross-Domain-Policies: none
Referrer-Policy: no-referrer
X-XSS-Protection: 0
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 16
ETag: W/"10-UXPfMV2cYA97/TmG7+glMcuYSm0"
Date: Sun, 15 May 2022 18:59:54 GMT
Connection: keep-alive
Keep-Alive: timeout=5

"Server online."
```
### Development

To run application
```
npm run dev
```

Open in your browser

- http://localhost:3000

### Setting Custom Port
you can pass custom port for running locally or docker image by
```
PORT=4000 npm run dev
```
also while running docker image pass desired port mapped to image port 3000.
```
docker run -p 4000:3000 -d <your username>/iban-validator
```
Open in your browser

- http://localhost:4000
## API Documentation

Api is documented using swagger jsdoc and swagger ui, which can be view on below url.

- http://localhost:$PORT/docs

## Lint

```
npm run lint
```

## Test

```
npm run test
```