'use strict';

const yTable = [ 0xB, 0x9, 0x5, 0xC, 0xD, 0xA, 0x6, 0xE, 0x7 ],
      xTable = [ 0x27, 0x1D, 0x2D, 0x31, 0x35, 0x29, 0x19, 0x38, 0x39, 0x25, 0x15, 0x34, 0xD, 0x2C, 0x1C, 0x17, 0x1B, 0x23, 0x13, 0x32, 0xB, 0x2A, 0x1A, 0x3A, 0x33, 0x26, 0x16, 0x36, 0xE, 0x2E, 0x1E, 0x2B];

/**
 * Encodes 8b words to 10b data symbols.
 * To set the running disparity manually, set `this.rd` to either -1 or 1.
 * @example 
 * // const encoder = new Encoder();
 * // encoder.encode(42);
 */
class Encoder {
  constructor(){
    this.rd = -1;
  }
  /**
   * Encode an 8b word to a 10b data symbol, updating the running disparity.
   * 
   * Be careful not to pass a value above 255, which will be converted to a
   * data symbol that cannot be converted back to the original value.
   * 
   * @param   {number} value
   * @returns {number}
   */
  encode(byte){
    const flags   = { rd: this.rd },
          byte5B  = byte & 0x1F,                 // 5 least significant bits (EDCBA; 0x1F = 0001 1111)
          byte3B  = (byte & 0xE0) >> 5,          // 3 most significant bits  (HGF;   0xE0 = 1110 0000)
          enc6B   = fiveToSix(byte5B,   flags),  // (abcdei)
          enc4B   = threeToFour(byte3B, flags),  // (fghj)
          encoded = (enc6B << 4) | enc4B;        // (abcdei0000)
    if (calculateDisparity(encoded, 10)) this.rd = -this.rd;
    return encoded;
  }
}

function calculateDisparity(data, length) {
  let ones  = 0, zeros = 0, i = 0x1;
  while(length > 0) {
    (data & i) ? ones++ : zeros++;
    i = i << 1;
    length--;
  }
  return (ones != zeros);
}

function fiveToSix(data, flags){
  let enc         = xTable[data];
  const disparity = calculateDisparity(enc, 6),
      { rd }      = flags;
  // Flags used for 3b4b encoding
  flags.inv   = (disparity && rd < 0) || !(disparity || rd < 0); // (disparity) XOR (rd < 0)
  flags.y7Pos = (data == 11 || data == 13 || data == 14);        // special cases for y = 7 e rd > 0
  flags.y7Neg = (data == 17 || data == 18 || data == 20);        // special cases for y = 7 e rd < 0
  if (rd > 0 && (enc == 0x38 || disparity))
    enc = ~enc & 0x3F; // complement of enc (6 bits -> 0x3F = 0011 1111)
  return enc;
}

function threeToFour(data, flags){
  let enc;
  let { rd, y7Pos, y7Neg, inv } = flags;
  if (data == 7 && y7Neg && rd < 0){
    enc = yTable[8];
  } else if (data == 7 && y7Pos && rd > 0) {
    enc = ~yTable[8] & 0xF;
  } else {
    enc = yTable[data];
    if (inv && (enc == 0xC || calculateDisparity(enc, 4)))
      enc = ~enc & 0xF; // complement of enc (4 bits -> 0xF = 0000 1111)
  }
  return enc;
}

module.exports = Encoder;

