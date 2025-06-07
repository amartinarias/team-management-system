// vuetify.js

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'

// My theme
const myCustomTheme = {
  dark: false, 
  colors: {
    background: '#EEEEEE',
    primary: '#00ADB5',
    secondary: '#393E46',
    accent: '#222831',
  }
}

export default createVuetify({
  theme: {
    defaultTheme: 'myCustomTheme', // Set my custom theme as the default
    themes: {
      myCustomTheme, 
    },
  },
})