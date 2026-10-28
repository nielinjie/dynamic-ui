/**
 * 将 str 中所有出现的 find 依次替换为 replace 数组中对应的元素。
 *
 * @param str - 原始字符串
 * @param find - 要查找的子串
 * @param replace - 替换值数组，第 i 个元素替换第 i+1 个 find
 * @returns 替换后的字符串
 *
 * @example
 * replaceAll("aXbXc", "X", ["1", "2"]) // => "a1b2c"
 */
export function replaceAll(str: string, find: string, replace: string[]): string {
  const parts = str.split(find)
  return parts
    .map((item, index) => {
      if (index === 0) {
        return item
      }
      const replacement = replace[index - 1]
      return replacement + item
    })
    .join('')
}
