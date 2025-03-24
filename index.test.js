import { test, expect } from 'vitest';
import { getByText, fireEvent } from '@testing-library/dom';


test('Кнопка "Відправити" повинна бути відключена при завантаженні', () => {
  expect(document.getElementById('submitButton').disabled).toBe(true);
});


test('Помилки не повинні відображатися до першого введення', () => {
  expect(getByText(document.body, 'Введіть коректний e-mail')).not.toBeVisible();
  expect(getByText(document.body, 'Пароль має бути щонайменше 5 символів, містити одну велику літеру та одне число')).not.toBeVisible();
  expect(getByText(document.body, 'Пароль та підтвердження паролю не співпадають')).not.toBeVisible();
  expect(getByText(document.body, 'Ви повинні погодитися з умовами')).not.toBeVisible();
});


test('Помилка "Введіть коректний e-mail" з являється при некоректному email', () => {
  fireEvent.input(document.getElementById('email'), { target: { value: 'wrongemail' } });

  expect(document.body, 'Введіть коректний e-mail').toBeVisible();
});

test('Помилка "Пароль має бути щонайменше 5 символів" з являється при короткому паролі', () => {
  fireEvent.input(document.getElementById('password'), { target: { value: '123' } });

  expect(getByText(document.body, 'Пароль має бути щонайменше 5 символів, містити одну велику літеру та одне число')).toBeVisible();
});

test('Помилка "Пароль та підтвердження паролю не співпадають" з являється при різних паролях', () => {
  fireEvent.input(document.getElementById('password'), { target: { value: 'Correct1' } });
  fireEvent.input(document.getElementById('confirmPassword'), { target: { value: 'WrongPass' } });

  expect(getByText(document.body, 'Пароль та підтвердження паролю не співпадають')).toBeVisible();
});

test('Кнопка "Відправити" включається при правильних даних', () => {
  fireEvent.input(document.getElementById('email'), { target: { value: 'test@email.com' } });
  fireEvent.input(document.getElementById('password'), { target: { value: 'Correct1' } });
  fireEvent.input(document.getElementById('confirmPassword'), { target: { value: 'Correct1' } });
  fireEvent.click(document.getElementById('agree'));

  expect(document.getElementById('submitButton').disabled).toBe(false);
});