import { test, expect } from 'vitest';
import { getByRole, getByText, fireEvent } from '@testing-library/dom';

// 🔴 Проверяем, что кнопка "Відправити" отключена при загрузке
test('Кнопка "Відправити" повинна бути відключена при завантаженні', () => {
  expect(document.getElementById('submitButton').disabled).toBe(true);
});

// 🔴 Проверяем, что ошибки скрыты до первого ввода
test('Помилки не повинні відображатися до першого введення', () => {
  expect(getByText(document.body, 'Введіть коректний e-mail')).not.toBeVisible();
  expect(getByText(document.body, 'Пароль має бути щонайменше 5 символів, містити одну велику літеру та одне число')).not.toBeVisible();
  expect(getByText(document.body, 'Пароль та підтвердження паролю не співпадають')).not.toBeVisible();
  expect(getByText(document.body, 'Ви повинні погодитися з умовами')).not.toBeVisible();
});

// 🔴 Проверяем, что ошибка появляется при неправильном email
test('Помилка "Введіть коректний e-mail" з\'являється при некоректному email', () => {
  const emailInput = document.getElementById('email');
  fireEvent.input(emailInput, { target: { value: 'wrongemail' } });

  expect(document.body, 'Введіть коректний e-mail').toBeVisible();
});

// 🔴 Проверяем, что ошибка появляется при коротком пароле
test('Помилка "Пароль має бути щонайменше 5 символів" з\'являється при короткому паролі', () => {
  const passwordInput = document.getElementById('password');
  fireEvent.input(passwordInput, { target: { value: '123' } });

  expect(getByText(document.body, 'Пароль має бути щонайменше 5 символів, містити одну велику літеру та одне число')).toBeVisible();
});

// 🔴 Проверяем, что ошибка появляется, если пароли не совпадают
test('Помилка "Пароль та підтвердження паролю не співпадають" з\'являється при різних паролях', () => {
  const passwordInput = document.getElementById('password');
  const confirmPasswordInput = document.getElementById('confirmPassword');

  fireEvent.input(passwordInput, { target: { value: 'Correct1' } });
  fireEvent.input(confirmPasswordInput, { target: { value: 'WrongPass' } });

  expect(getByText(document.body, 'Пароль та підтвердження паролю не співпадають')).toBeVisible();
});

// 🔴 Проверяем, что кнопка "Відправити" включается при правильных данных
test('Кнопка "Відправити" включається при правильних даних', () => {
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const confirmPasswordInput = document.getElementById('confirmPassword');
  const agreeCheckbox = document.getElementById('agree');
  const submitButton = document.getElementById('submitButton');

  fireEvent.input(emailInput, { target: { value: 'test@email.com' } });
  fireEvent.input(passwordInput, { target: { value: 'Correct1' } });
  fireEvent.input(confirmPasswordInput, { target: { value: 'Correct1' } });
  fireEvent.click(agreeCheckbox);

  expect(submitButton.disabled).toBe(false);
});