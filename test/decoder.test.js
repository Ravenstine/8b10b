'use strict';

const   Decoder        = require('../lib/decoder'),
      { assert }       = require('chai'),
        table          = require('../lib/full_8b10b'),
        invalid        = require('../lib/known-invalid');

describe('encoder', function(){
  it('decodes 10b to 8b bytes', function(){
    const decoder = new Decoder();
    table.forEach(row => {
      const negInput  = parseInt(row['RD_M(a_j)'], 2),
            negResult = decoder.decode(negInput);
      assert.isTrue(negResult === parseInt(row['8B_BYTE'], 16));
      const posInput  = parseInt(row['RD_P(a_j)'], 2),
            posResult = decoder.decode(posInput);
      assert.isTrue(posResult === parseInt(row['8B_BYTE'], 16));
    });
  });
  it('decodes 10b to code names', function(){
    const decoder = new Decoder({mode: 'code'});
    table.forEach(row => {
      const negInput  = parseInt(row['RD_M(a_j)'], 2),
            negResult = decoder.decode(negInput);
      assert.isTrue(negResult === row['CODE']);
      const posInput  = parseInt(row['RD_P(a_j)'], 2),
            posResult = decoder.decode(posInput);
      assert.isTrue(posResult === row['CODE']);
    });
  });
  it('returns undefined for invalid 10b (errors)', function(){
    const decoder = new Decoder();
    invalid.forEach(value => {
      const result = decoder.decode(value);
      assert.isUndefined(result);
    });
  });
});

