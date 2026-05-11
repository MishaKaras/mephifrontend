import { createApp } from 'vue'
import App from './App.vue'
import { defineRule } from 'vee-validate'
import { required, email, min } from '@vee-validate/rules'

defineRule('required', required)
defineRule('email', email)
defineRule('min', min)

defineRule('mustBeTrue', (value) => {
    return value === true || 'Необходимо принять лицензионное соглашение'
})

defineRule('strongPassword', (value) => {
    if (!value) return 'Введите пароль'
    if (value.length < 8)            return 'Минимум 8 символов'
    if (!/[0-9]/.test(value))        return 'Нужна хотя бы одна цифра'
    if (!/[a-z]/.test(value))        return 'Нужна буква нижнего регистра'
    if (!/[A-Z]/.test(value))        return 'Нужна буква верхнего регистра'
    if (!/[^a-zA-Z0-9]/.test(value)) return 'Нужен спецсимвол (!@#$...)'
    return true
})

createApp(App).mount('#app')
