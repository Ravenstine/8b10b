'use strict';

const table       = require('./full_8b10b'),
      tenToEight  = {};

table.forEach(row => { if(row['CODE'].match(/D/)) tenToEight[parseInt(row['RD_M(a_j)'], 2)] = parseInt(row['8B_BYTE'], 16) });
table.forEach(row => { if(row['CODE'].match(/D/)) tenToEight[parseInt(row['RD_P(a_j)'], 2)] = parseInt(row['8B_BYTE'], 16) });

/**
 * Decodes 10b data symbols to 8b words.
 */
class Decoder {
  /**
   * Decodes a 10b sdata ymbol to either an 8b word.
   * If `undefined` is returned, this probably means the value passed
   * is either a control symbol or not a valid 8b10b data symbol.
   * Because this decoder only decodes data symbols, and since control
   * symbols do not have any strict meaning, it's up to you to
   * handle any control symbols you are looking for before
   * attempting to use this decoder.
   * 
   * @returns {number|undefined}
   */
  decode(tenB){
    return tenToEight[tenB];
  }
}

module.exports = Decoder;

