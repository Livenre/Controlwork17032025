import { test, expect } from 'vitest';
import { correctEmail, correctPassword, correctConfirmPassword } from './logic.js';


test('Корректные email-адреса', () => {
    expect(correctEmail('test@example.com')).toBe(true);
    expect(correctEmail('user123@mail.org')).toBe(true);
});

test('Некорректные email-адреса', () => {
    expect(correctEmail('testexample.com')).toBe(false);
    expect(correctEmail('user@mail')).toBe(false);
    expect(correctEmail('')).toBe(false);
});

test('Корректные пароли', () => {
    expect(correctPassword('Bread4')).toBe(true);
    expect(correctPassword('9Toxa')).toBe(true);
    expect(correctPassword('Za2Vardo')).toBe(true);
});

test('Некорректные пароли', () => {
    expect(correctPassword('abcde')).toBe(false);
    expect(correctPassword('ABCDE')).toBe(false);
    expect(correctPassword('12345')).toBe(false);
    expect(correctPassword('As1')).toBe(false);
});

test('Возвращает true, если пароли совпадают', () => {
    expect(correctConfirmPassword('Password1', 'Password1')).toBe(true);
});

test('Возвращает false, если пароли не совпадают', () => {
    expect(correctConfirmPassword('Password1', 'Password2')).toBe(false);
});

test('Возвращает false, если один из паролей пустой', () => {
    expect(correctConfirmPassword('Password1', '')).toBe(false);
    expect(correctConfirmPassword('', 'Password1')).toBe(false);
});
