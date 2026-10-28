import { describe, it, expect } from 'vitest'
import { replaceAll } from './replaceAll'

describe('replaceAll', () => {
  it('should replace multiple occurrences with corresponding values', () => {
    expect(replaceAll('aXbXcXd', 'X', ['1', '2', '3'])).toBe('a1b2c3d')
  })

  it('should replace a single occurrence', () => {
    expect(replaceAll('aXb', 'X', ['1'])).toBe('a1b')
  })

  it('should return the original string when find does not exist', () => {
    expect(replaceAll('abc', 'X', ['1'])).toBe('abc')
  })

  it('should handle empty string', () => {
    expect(replaceAll('', 'X', ['1'])).toBe('')
  })

  it('should handle str equal to find', () => {
    expect(replaceAll('X', 'X', ['1'])).toBe('1')
  })

  it('should handle str starting with find', () => {
    expect(replaceAll('Xabc', 'X', ['1'])).toBe('1abc')
  })

  it('should handle str ending with find', () => {
    expect(replaceAll('abcX', 'X', ['1'])).toBe('abc1')
  })

  it('should handle consecutive find occurrences', () => {
    expect(replaceAll('aXXb', 'X', ['1', '2'])).toBe('a12b')
  })

  it('should handle empty replace array when find does not exist', () => {
    expect(replaceAll('abc', 'X', [])).toBe('abc')
  })

  it('should return undefined string when replace array is shorter than find occurrences', () => {
    // 这是当前实现的已知行为：replace 数组长度不足时，会拼接 "undefined"
    expect(replaceAll('aXbXc', 'X', ['1'])).toBe('a1bundefinedc')
  })

  it('should handle longer replace array than needed', () => {
    expect(replaceAll('aXb', 'X', ['1', '2', '3'])).toBe('a1b')
  })

  it('should handle multi-character find', () => {
    expect(replaceAll('aXYbXYc', 'XY', ['1', '2'])).toBe('a1b2c')
  })
})
