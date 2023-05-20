import { createPinia } from 'pinia'
import { useLanguageStore } from './LanguageStore'
// Importa aquí tus otros stores individuales

const pinia = createPinia()

pinia.use(useLanguageStore)
// Usa pinia.use para registrar tus otros stores individuales
// por ejemplo: pinia.use(useOtherStore)

export default pinia
