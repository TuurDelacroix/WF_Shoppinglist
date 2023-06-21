import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './assets/main.css'


import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import '@fortawesome/free-brands-svg-icons'
import '@fortawesome/free-solid-svg-icons'

import { faUserSecret, faArrowRight, faArrowLeft, faFlag, faFlagUsa } from '@fortawesome/free-solid-svg-icons'

library.add(faUserSecret, faArrowLeft, faArrowRight, faFlag, faFlagUsa)

const app = createApp(App)
    .component('font-awesome-icon', FontAwesomeIcon)

app.use(router)

app.mount('#app')
