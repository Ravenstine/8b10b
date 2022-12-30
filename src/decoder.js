import './types.js';
import { calculateDisparity } from './disparity-calculator.js';
import table from './full_8b10b.js';

const tenToEight = Object.freeze({
  '-1': {},
  '1' : {}
});

for (const row of table) {
  if (!row['CODE'].match(/D/)) continue;

  tenToEight[-1][parseInt(row['RD_M(a_j)'], 2)] = parseInt(row['8B_BYTE'], 16);
  tenToEight[1][parseInt(row['RD_P(a_j)'], 2)] = parseInt(row['8B_BYTE'], 16);
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
 * @param {8b10bState} decodeState - An object containing the symbol and other stateful information
 * @returns {8b10bState}
 */
export function decode({ symbol, runningDisparity = -1 } = {}) {
  const word = tenToEight[runningDisparity][symbol] || null;

  return {
    word,
    runningDisparity: calculateDisparity(symbol, 10) ? -runningDisparity : runningDisparity,
  };
}
