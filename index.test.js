import { test, expect } from 'vitest';
import { fireEvent } from '@testing-library/dom';
import "./index.js"

test('Кнопка "Відправити" повинна бути відключена при завантаженні', () => {
  expect(document.getElementById('submitButton').disabled).toBe(true);
});

test('Помилки не повинні відображатися до першого введення', () => {
  expect.not.toHaveTextContent('Введіть коректний e-mail');
  expect.not.toHaveTextContent('Пароль має бути щонайменше 5 символів, містити одну велику літеру та одне число');
  expect.not.toHaveTextContent('Пароль та підтвердження паролю не співпадають');
  expect.not.toHaveTextContent('Ви повинні погодитися з умовами');
});

test('Помилка "Введіть коректний e-mail" з являється при некоректному email', () => {
  const emailInput = document.getElementById('email');

  fireEvent.focus(emailInput);
  fireEvent.input(emailInput, { target: { value: 'wrongemail' } });
  fireEvent.blur(emailInput);

  expect(document.body).toHaveTextContent('Введіть коректний e-mail');
});

test('Помилка "Пароль має бути щонайменше 5 символів" з являється при короткому паролі', () => {
  const passwordInput = document.getElementById('password');

  fireEvent.focus(passwordInput);
  fireEvent.input(passwordInput, { target: { value: '123' } });
  fireEvent.blur(passwordInput);

  expect(document.body).toHaveTextContent('Пароль має бути щонайменше 5 символів, містити одну велику літеру та одне число');
});

test('Помилка "Пароль та підтвердження паролю не співпадають" з являється при різних паролях', () => {
  const passwordInput = document.getElementById('password');
  const confirmPasswordInput = document.getElementById('confirmPassword');

  fireEvent.focus(passwordInput);
  fireEvent.input(passwordInput, { target: { value: 'Correct1' } });
  fireEvent.blur(passwordInput);

  fireEvent.focus(confirmPasswordInput);
  fireEvent.input(confirmPasswordInput, { target: { value: 'WrongPass' } });
  fireEvent.blur(confirmPasswordInput);

  expect(document.body).toHaveTextContent('Пароль та підтвердження паролю не співпадають');
});

test('Кнопка "Відправити" включається при правильних даних', () => {
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const confirmPasswordInput = document.getElementById('confirmPassword');
  const agreeCheckbox = document.getElementById('agree');
  const submitButton = document.getElementById('submitButton');

  fireEvent.focus(emailInput)
  fireEvent.input(emailInput, { target: { value: 'test@email.com' } });
  fireEvent.blur(emailInput)

  fireEvent.focus(passwordInput);
  fireEvent.input(passwordInput, { target: { value: 'Correct1' } });
  fireEvent.blur(passwordInput);

  fireEvent.focus(confirmPasswordInput);
  fireEvent.input(confirmPasswordInput, { target: { value: 'Correct1' } });
  fireEvent.blur(confirmPasswordInput);

  fireEvent.click(agreeCheckbox);

  expect(submitButton.disabled).toBe(false);
});

test('Кнопка "Відправити" відключається при зміні email на некоректний', () => {
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const confirmPasswordInput = document.getElementById('confirmPassword');
  const agreeCheckbox = document.getElementById('agree');
  const submitButton = document.getElementById('submitButton');

  fireEvent.focus(emailInput)
  fireEvent.input(emailInput, { target: { value: 'test@email.com' } });
  fireEvent.blur(emailInput)

  fireEvent.focus(passwordInput);
  fireEvent.input(passwordInput, { target: { value: 'Correct1' } });
  fireEvent.blur(passwordInput);

  fireEvent.focus(confirmPasswordInput);
  fireEvent.input(confirmPasswordInput, { target: { value: 'Correct1' } });
  fireEvent.blur(confirmPasswordInput);

  fireEvent.click(agreeCheckbox);

  expect(submitButton.disabled).toBe(false);

  fireEvent.focus(emailInput);
  fireEvent.input(emailInput, { target: { value: 'wrongemail' } });
  fireEvent.blur(emailInput);

  expect(submitButton.disabled).toBe(true);
});

test('Кнопка "Відправити" відключається при зміні пароля на некоректний', () => {
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const confirmPasswordInput = document.getElementById('confirmPassword');
  const agreeCheckbox = document.getElementById('agree');
  const submitButton = document.getElementById('submitButton');

  fireEvent.focus(emailInput)
  fireEvent.input(emailInput, { target: { value: 'test@email.com' } });
  fireEvent.blur(emailInput)

  fireEvent.focus(passwordInput);
  fireEvent.input(passwordInput, { target: { value: 'Correct1' } });
  fireEvent.blur(passwordInput);

  fireEvent.focus(confirmPasswordInput);
  fireEvent.input(confirmPasswordInput, { target: { value: 'Correct1' } });
  fireEvent.blur(confirmPasswordInput);

  fireEvent.click(agreeCheckbox);

  expect(submitButton.disabled).toBe(false);

  fireEvent.focus(passwordInput);
  fireEvent.input(passwordInput, { target: { value: 'wrongpassword' } });
  fireEvent.blur(passwordInput);

  expect(submitButton.disabled).toBe(true);
});

test('Кнопка "Відправити" відключається, якщо прибрати галочку згоди', () => {
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const confirmPasswordInput = document.getElementById('confirmPassword');
  const agreeCheckbox = document.getElementById('agree');
  const submitButton = document.getElementById('submitButton');

  fireEvent.focus(emailInput)
  fireEvent.input(emailInput, { target: { value: 'test@email.com' } });
  fireEvent.blur(emailInput)

  fireEvent.focus(passwordInput);
  fireEvent.input(passwordInput, { target: { value: 'Correct1' } });
  fireEvent.blur(passwordInput);

  fireEvent.focus(confirmPasswordInput);
  fireEvent.input(confirmPasswordInput, { target: { value: 'Correct1' } });
  fireEvent.blur(confirmPasswordInput);

  fireEvent.click(agreeCheckbox);

  expect(submitButton.disabled).toBe(false);

  fireEvent.click(agreeCheckbox);

  expect(submitButton.disabled).toBe(true);
});