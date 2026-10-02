// Este arquivo roda antes de cada arquivo de teste do Vitest.
import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

// Desmonta o que foi renderizado depois de cada teste,
// para um teste não interferir no outro.
afterEach(() => {
  cleanup()
})
