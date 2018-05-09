'use strict';

const { Encoder, 
        Decoder } = require('../index'),
      { assert }  = require('chai');

describe('8b10b', function(){
  it('encodes and decodes', function(){
    const encoder = new Encoder(),
          decoder = new Decoder();
    "hello world".split('').map(c => c.charCodeAt(0)).forEach(w => {
      const symbol = encoder.encode(w),
            word   = decoder.decode(symbol);
      assert.notEqual(symbol, word);
      assert.equal(word, w);
    });
  });
});

