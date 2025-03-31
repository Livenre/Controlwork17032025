console.log('Скрипт работает!');
import { correctEmail, correctPassword, correctConfirmPassword } from './logic.js'
import "./style.css"

const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
const agreeCheckbox = document.getElementById('agree');
const submitButton = document.getElementById('submitButton');

const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const confirmPasswordError = document.getElementById('confirmPasswordError');

let emailDirty = false;
let passwordDirty = false;
let confirmPasswordDirty = false;


function CorrectForm() {
let correct = true;

emailInput.addEventListener('input' , () => { emailDirty = true })
passwordInput.addEventListener('input', () => { passwordDirty = true })
confirmPasswordInput.addEventListener('input', () => { confirmPasswordDirty = true })

const emailValue = emailInput.value;


if (!correctEmail(emailValue) && emailDirty) {
  emailError.style.display = 'block';
  correct = false;
} else if (!emailDirty) {
  correct = false;
} else {
  emailError.style.display = 'none';
}

const passwordValue = passwordInput.value;
if (!correctPassword(passwordValue) && passwordDirty) {
  passwordError.style.display = 'block';
  correct = false;
} else if (!passwordDirty) {
  correct = false;
} else {
  passwordError.style.display = 'none';
}

const confirmPasswordValue = confirmPasswordInput.value;
if (!correctConfirmPassword(confirmPasswordValue, passwordValue) && confirmPasswordDirty) {
  confirmPasswordError.style.display = 'block';
  correct = false;
} else if (!confirmPasswordDirty) {
  correct = false;
} else {
  confirmPasswordError.style.display = 'none';
}

if (!agreeCheckbox.checked) {
  correct = false;
}

if (correct) {
  submitButton.disabled = false;
} else {
  submitButton.disabled = true;
}

return correct;
}

emailInput.addEventListener('focus', CorrectForm);
emailInput.addEventListener('blur', CorrectForm);
passwordInput.addEventListener('focus', CorrectForm);
passwordInput.addEventListener('blur', CorrectForm);
confirmPasswordInput.addEventListener('focus', CorrectForm);
confirmPasswordInput.addEventListener('blur', CorrectForm);
agreeCheckbox.addEventListener('change', CorrectForm);
