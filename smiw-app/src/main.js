import { createApp } from 'vue'
import App from './App.vue'
import MainReading from './components/MainReading'
import PreviousReadings from './components/PreviousReadings'

const app = createApp(App);
app.component('main-reading',MainReading);
app.component('previous-reading',PreviousReadings)
app.mount('#app');
