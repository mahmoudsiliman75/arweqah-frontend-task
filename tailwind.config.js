export default {
  important: true,
  purge: false,

  content: [
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue'
  ],
  corePlugins: {
    preflight: false
  },
}