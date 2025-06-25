import { describe, it, expect } from 'vitest'
import convertColor from './utils'

describe('convertColor', () => {
  it('converts hex to rgb and hsl', () => {
    const result = convertColor('#ff0000')
    expect(result.rgb).toBe('rgb(255, 0, 0)')
    expect(result.hsl).toBe('hsl(0, 100%, 50%)')
    expect(result.hex).toBe('#ff0000')
    expect(result.rgbObj).toEqual({ r: 255, g: 0, b: 0 })
    expect(result.hslObj).toEqual({ h: 0, s: 100, l: 50 })
  })

  it('converts rgb to hex and hsl', () => {
    const result = convertColor('rgb(0, 128, 255)')
    expect(result.hex).toBe('#0080ff')
    expect(result.hsl).toBe('hsl(210, 100%, 50%)')
    expect(result.rgb).toBe('rgb(0, 128, 255)')
  })

  it('converts hsl to hex and rgb', () => {
    const result = convertColor('hsl(120, 100%, 50%)')
    expect(result.hex).toBe('#00ff00')
    expect(result.rgb).toBe('rgb(0, 255, 0)')
    expect(result.hsl).toBe('hsl(120, 100%, 50%)')
  })
})
