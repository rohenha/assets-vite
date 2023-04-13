import { describe, it, expect } from 'vitest'

import { normalizeText } from '../scripts/utils/tools'

describe('Normalize text', () => {
  it('Value is String', () => {
    expect(normalizeText('Lorèm Ipsûm')).toBeTypeOf('string')
  })

  it('Value is normalized', () => {
    expect(normalizeText('Lorèm Ipsûm')).eq('lorem ipsum')
  })
})