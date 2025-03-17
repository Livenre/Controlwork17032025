const registrationForm = document.getElementById('registrationForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
const agreeCheckbox = document.getElementById('agree');
const submitButton = document.getElementById('submitButton');

const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const confirmPasswordError = document.getElementById('confirmPasswordError');

function CorrectForm() {
let correct = true;

const emailValue = emailInput.value;
const emailIsCorrect = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
if (!emailIsCorrect.test(emailValue)) {
  emailError.style.display = 'block';
  correct = false;
} else {
  emailError.style.display = 'none';
}

const passwordValue = passwordInput.value;
const passwordIsCorrect = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{5,}$/;
if (!passwordIsCorrect.test(passwordValue)) {
  passwordError.style.display = 'block';
  correct = false;
} else {
  passwordError.style.display = 'none';
}

const confirmPasswordValue = confirmPasswordInput.value;
if (confirmPasswordValue !== passwordValue) {
  confirmPasswordError.style.display = 'block';
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

emailInput.addEventListener('input', CorrectForm);
passwordInput.addEventListener('input', CorrectForm);
confirmPasswordInput.addEventListener('input', CorrectForm);
agreeCheckbox.addEventListener('change', CorrectForm);
