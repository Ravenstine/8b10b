'use strict';

const calculateDisparity = require('./disparity-calculator'),
      table              = require('./full_8b10b'),
      tenToEight         = {
        '-1': {},
        '1' : {}
      };

table.forEach(row => { if(row['CODE'].match(/D/)) tenToEight[-1][parseInt(row['RD_M(a_j)'], 2)] = parseInt(row['8B_BYTE'], 16) });
table.forEach(row => { if(row['CODE'].match(/D/)) tenToEight[1][parseInt(row['RD_P(a_j)'], 2)] = parseInt(row['8B_BYTE'], 16) });

/**
 * Decodes 10b data symbols to 8b words.
 */
class Decoder {
  constructor({mode}={mode: 'strict'}){
    this.rd = -1;
  }
  /**
   * Decodes a 10b data symbol to an 8b word.
   * If `undefined` is returned, this probably means the value passed
   * is either a control symbol, a valid 8b10b data symbol encoded from
   * the wrong running disparity, or not a valid 8b10b data symbol.
   * Because this decoder only decodes data symbols, and since control
   * symbols do not have any strict meaning, it's up to you to
   * handle any control symbols you are looking for before
   * attempting to use this decoder.  Any symbol passed, whether valid
   * or invalid, will effect the running disparity.
   * 
   * @returns {number|undefined}
   */
  decode(symbol){
    const word = tenToEight[this.rd][symbol];
    if(calculateDisparity(symbol, 10)) this.rd = -this.rd;
    return word;
  }
  /**
   * Resets the running disparity.
   */
  reset(){
    this.rd = -1;
  }
}

module.exports = Decoder;

