import '@mdi/font/css/materialdesignicons.css';
import './assets/styles/style.scss';
import { mount } from 'svelte';
import App from './App.svelte';

const app = mount(App, { target: document.getElementById('app')! });

export default app;
