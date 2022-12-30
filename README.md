8b10b
=====

An JavaScript implementation of the [8b10b](https://en.wikipedia.org/wiki/8b/10b_encoding) line codec.

Use it to convert bytes to 10-bit symbols and vise-versa.  It only converts to and from data symbols; control symbols should be intercepted and handled by your application.


## Usage

```javascript
import { encode, decode } from 'npm:8b10b@2.0.0';

const encoded = encode({ word: 42 });

encoded.symbol;

// => 345

const decoded = decode({ symbol: encoded.symbol });

encoded.word;

// => 42
```

The object returned by the `encode` function also provides the running disparity for the next word to be encoded.  This is how you can encode a string:

```javascript
import { encode, decode } from 'npm:8b10b@2.0.0';

const words = 'hello world'.split('').map(char => char.charCodeAt(0));
const symbols = [];

let runningDisparity = -1;

for (const word of words) {
  const result = encode({ word, runningDisparity });

  runningDisparity = result.runningDisparity;
  symbols.push(result.symbol);
}

console.log(symbols);

// => [ 915, 659, 211, 211, 652, 633, 92, 371, 307, 211, 172 ]

let decodedString = '';

runningDisparity = -1;

for (const symbol of symbols) {
  const result = decode({ symbol, runningDisparity });

  runningDisparity = result.runningDisparity;
  decodedString = decodedString.concat(
    String.fromCharCode(result.word)
  );
}

console.log(decodedString);

// => hello world
```


## Testing

The tests use the Deno runtime.

Run them with `make test`.


## License

See [LICENSE.txt](LICENSE.txt)
