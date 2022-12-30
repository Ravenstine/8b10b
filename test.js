import { assertEquals, assertNotEquals } from "https://deno.land/std@0.168.0/testing/asserts.ts";
import { encode, decode } from './mod.js';
import lines from './src/full_8b10b.js';
import invalid from './src/known-invalid.js';

const table = lines.filter(line => line['CODE'].match(/D\d+_\d+/));

Deno.test("encodes all possible bytes to 10-bit symbols", () => {
  for (const row of table) {
    const { symbol: negResultSym } = encode({
      word: parseInt(row['8B_BYTE'], 16),
      runningDisparity: -1,
    });

    assertEquals(negResultSym, parseInt(row['RD_M(a_j)'], 2));

    const { symbol: posResultSym } = encode({
      word: parseInt(row['8B_BYTE'], 16),
      runningDisparity: 1,
    });

    assertEquals(posResultSym, parseInt(row['RD_P(a_j)'], 2));
  }
});

Deno.test("decodes 10b symbols to 8b words", () => {
  for (const row of table) {
    const { symbol: negResultWord } = decode({
      symbol: parseInt(row['RD_M(a_j)'], 2),
      runningDisparity: -1,
    });

    assertEquals(negResultWord, parseInt(row['8B_BYTE'], 16));

    const { symbol: posResultWord } = decode({
      symbol: parseInt(row['RD_P(a_j)'], 2),
      runningDisparity: 1,
    });

    assertEquals(posResultWord, parseInt(row['8B_BYTE'], 16));
  }
});

Deno.test("returns null for invalid 10b symbols", () => {
  for (const symbol of invalid) {
    const { word } = decode({ symbol });

    assertEquals(word, null);
  }
});

Deno.test("integration", () => {
  for (const char of 'hello world'.split('')) {
    const charCode = char.charCodeAt(0);

    const { symbol } = encode({ word: charCode });
    const { word } = decode({ symbol });

    assertNotEquals(symbol, word);
    assertEquals(word, charCode);
  }
});
