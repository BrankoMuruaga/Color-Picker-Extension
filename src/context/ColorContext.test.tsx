import React from 'react'
import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { ColorProvider, useColor } from './ColorContext'

describe('ColorProvider', () => {
  it('throws when useColor is used outside provider', () => {
    const { result } = renderHook(() => {
      try {
        // Should throw
        useColor()
      } catch (e) {
        return e
      }
    })
    expect(result.current).toBeInstanceOf(Error)
  })

  it('updates css variables on setColor', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ColorProvider>{children}</ColorProvider>
    )
    const { result } = renderHook(() => useColor(), { wrapper })

    act(() => {
      result.current.setColor('#ff0000')
    })

    expect(document.documentElement.style.getPropertyValue('--hue-default')).toBe('0')
    expect(document.documentElement.style.getPropertyValue('--saturation-default')).toBe('100%')
    expect(document.documentElement.style.getPropertyValue('--lightness-default')).toBe('50%')
    expect(document.documentElement.style.getPropertyValue('--text-color')).toBe('white')
  })
})
