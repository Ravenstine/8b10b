'use strict';

const table      = require('./full_8b10b'),
      tenToEight = {},
      tenToCode  = {};

table.forEach(row => { tenToEight[parseInt(row['RD_M(a_j)'], 2)] = parseInt(row['8B_BYTE'], 16) });
table.forEach(row => { tenToEight[parseInt(row['RD_P(a_j)'], 2)] = parseInt(row['8B_BYTE'], 16) });
table.forEach(row => { tenToCode[parseInt(row['RD_M(a_j)'], 2)]  = row['CODE'] });
table.forEach(row => { tenToCode[parseInt(row['RD_P(a_j)'], 2)]  = row['CODE'] });

/**
 * Decodes 10b to either 8b(bytes) or 8b10b codes.
 * @param {object}        options
 * @param {string='byte'} options.mode - The decoding mode.  By default will decode to bytes.  Set value to 'code' to decode to data/control codes.
 */
class Decoder {
  constructor({mode}={mode: 'byte'}){
    if(mode == 'byte') this.table = tenToEight;
    if(mode == 'code') this.table = tenToCode;
  }
  /**
   * Decodes a 10b value to either a byte or a code string.
   * If `undefined` is returned, this means that the value passed
   * is not a valid 8b10b value and should be considered an error.
   * @returns {number|string|undefined}
   */
  decode(tenB){
    return this.table[tenB];
  }
}

module.exports = Decoder;

