import { createVuetify } from 'vuetify'
import { pt } from 'vuetify/locale'

import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import '@fontsource-variable/ibm-plex-sans/wght.css'
import '@fontsource-variable/geist/wght.css'

export default createVuetify({
  theme: {
    defaultTheme: 'light',
  },
  locale: {
    locale: 'pt-BR',
    messages: {
      'pt-BR': pt,
    },
  },
})
