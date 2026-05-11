<script setup>
import { computed } from 'vue'
import { useForm, useField } from 'vee-validate'

const { meta: formMeta } = useForm()

const {
    value: emailValue,
    errorMessage: emailError,
    meta: emailMeta
} = useField('email', 'required|email')

const {
    value: passwordValue,
    errorMessage: passwordError,
    meta: passwordMeta
} = useField('password', 'required|strongPassword')

const { value: agreedValue } = useField('agree', 'mustBeTrue')

const criteria = computed(() => [
    {
        label: 'Длина не менее 8',
        passed: passwordValue.value?.length >= 8
    },
    {
        label: 'Цифры',
        passed: /[0-9]/.test(passwordValue.value ?? '')
    },
    {
        label: 'Буквы нижнего регистра',
        passed: /[a-z]/.test(passwordValue.value ?? '')
    },
    {
        label: 'Буквы верхнего регистра',
        passed: /[A-Z]/.test(passwordValue.value ?? '')
    },
    {
        label: 'Спецсимволы',
        passed: /[^a-zA-Z0-9]/.test(passwordValue.value ?? '')
    }
])
</script>

<template>
    <div class="form-wrapper">
        <h2>Регистрация</h2>

        <div class="field">
            <label>Email</label>
            <input
                v-model="emailValue"
                type="email"
                :class="{
                'input-error':   emailMeta.dirty && !emailMeta.valid,
                'input-success': emailMeta.dirty &&  emailMeta.valid
                }"
            />
            <span class="error-msg">{{ emailError }}</span>
        </div>

        <div class="field">
            <label>Password</label>
            <input
                v-model="passwordValue"
                type="password"
                :class="{
                'input-error':   passwordMeta.dirty && !passwordMeta.valid,
                'input-success': passwordMeta.dirty &&  passwordMeta.valid
                }"
            />

            <ul v-if="passwordMeta.dirty" class="criteria-list">
                <li
                v-for="criterion in criteria"
                :key="criterion.label"
                :class="criterion.passed ? 'criterion-ok' : 'criterion-fail'"
                >
                {{ criterion.passed ? '\u2705' : '\u274C' }} {{ criterion.label }}
                </li>
            </ul>
        </div>

        <div class="field checkbox-field">
        <label>
            <input type="checkbox" v-model="agreedValue" />
            I agree with license agreement
        </label>
        </div>

        <button :disabled="!formMeta.valid">Зарегистрироваться</button>
    </div>
</template>

<style scoped>
.form-wrapper {
    max-width: 420px;
    margin: 40px auto;
    font-family: sans-serif;
    padding: 24px;
    border-radius: 10px;
    box-shadow: 0 2px 12px rgba(0,0,0,0.1);
}

.field {
    display: flex;
    flex-direction: column;
    margin-bottom: 18px;
    gap: 5px;
}

label { font-size: 14px; font-weight: 600; color: #2d3748; }

input[type="email"],
input[type="password"] {
    padding: 9px 12px;
    border: 2px solid #cbd5e0;
    border-radius: 6px;
    font-size: 14px;
    outline: none;
    transition: border-color 0.2s;
}

input[type="email"]:focus,
input[type="password"]:focus { border-color: #4299e1; }

.input-error   { border-color: #e53e3e !important; }
.input-success { border-color: #38a169 !important; }

.error-msg { color: #e53e3e; font-size: 12px; min-height: 16px; }

.criteria-list {
    list-style: none;
    padding: 8px 12px;
    margin: 0;
    background: #f7fafc;
    border-radius: 6px;
    border: 1px solid #e2e8f0;
    font-size: 13px;
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.criterion-ok   { color: #276749; }
.criterion-fail { color: #c53030; }

.checkbox-field label {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    font-weight: 400;
}

button {
    width: 100%;
    padding: 11px;
    background: #4299e1;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 15px;
    font-weight: 600;
    transition: background 0.2s;
}
button:hover:not(:disabled) { background: #3182ce; }
button:disabled { background: #a0aec0; cursor: not-allowed; }
</style>