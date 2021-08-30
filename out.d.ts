declare module 'zip-code-boundaries' {
  const boundaries: { [key: number]: { n: number; s: number; e: number; w: number } }
  module.exports = boundaries
}
