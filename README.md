8b10b
=====

An ECMAScript implementation of the [8b10b](https://en.wikipedia.org/wiki/8b/10b_encoding) line codec.

Use it to convert bytes to 10-bit symbols and vise-versa.  It only converts to and from data symbols; control symbols should be intercepted and handled by your application.

## Installation

```sh
npm install --save 8b10b
```

## Usage

```javascript
const { Encoder, Decoder } = require('8b10b');

const encoder = new Encoder(),
      decoder = new Decoder();      

const encoded = encoder.encode(42);

// => 345

decoder.decode(encoded);

// => 42
```

## Testing

Tests use Mocha w/ Chai.  To run, use `npm run test`.

## License

See [LICENSE.txt](LICENSE.txt)

## Thanks

Most of the encoder was converted to JavaScript from [fontesrp/encoding_8b10b](https://github.com/fontesrp/encoding_8b10b).

