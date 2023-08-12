import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import * as VeeValidate from 'vee-validate'
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import WarningDialog from "@/components/WarningDialog.vue";
import RadioInputs from "@/components/RadioInputs.vue";

createApp(App)
    .use(router)
    .use(store)
    .use(VeeValidate)
    .component('loading-spinner', LoadingSpinner)
    .component('warning-dialog', WarningDialog)
    .component('radio-inputs', RadioInputs)
    .mount('#app');
