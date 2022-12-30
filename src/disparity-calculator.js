export function calculateDisparity(data, length) {
  let ones = 0, zeros = 0, i = 0x1;

  while(length > 0) {
    (data & i) ? ones++ : zeros++;
    i = i << 1;
    length--;
  }

  return (ones != zeros);
}
