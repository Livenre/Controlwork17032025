import "./style.css"

export function correctEmail(email) {
    return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email);
}

export function correctPassword(password) {
    return /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{5,}$/.test(password);
}

export function correctConfirmPassword(password, confirmPassword) {
    return password === confirmPassword;
}
