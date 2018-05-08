'use strict';

const   Encoder        = require('../lib/encoder'),
      { assert }       = require('chai'),
        lines          = require('../lib/full_8b10b'),
        table          = lines
                          .filter(line => line['CODE'].match(/D\d+_\d+/));


describe('encoder', function(){
  it('properly encodes all possible bytes to 10-bits', function(){
    const codec = new Encoder();
    table.forEach(row => {
      codec.rd = -1;
      const input     = parseInt(row['8B_BYTE'], 16),
            negResult = codec.encode(input);
      assert.isTrue(negResult === parseInt(row['RD_M(a_j)'], 2));
      codec.rd = 1;
      const posResult = codec.encode(input);
      assert.isTrue(posResult === parseInt(row['RD_P(a_j)'], 2));
    });
  });
});

