/**
 * Returns true or false if userAgent matches regex
 *
 */
export const isNativeDevice = /Android|webOS|iPhone|iPad|iPod|Opera Mini/i.test(
  navigator.userAgent,
);
