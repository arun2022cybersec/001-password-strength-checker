// Function to check password strength
function checkPasswordStrength(password) {
    let strength = 0;

    // Check for length
    if (password.length >= 8) strength++;
    // Check for uppercase letters
    if (/[A-Z]/.test(password)) strength++;
    // Check for lowercase letters
    if (/[a-z]/.test(password)) strength++;
    // Check for numbers
    if (/[0-9]/.test(password)) strength++;
    // Check for special characters
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    return strength;
}

// Function to update the strength bar and text
function updateStrengthDisplay(strength) {
    const strengthText = document.getElementById('strength-text');
    const strengthLevel = document.getElementById('strength-level');
    const bar = document.querySelector('.password-strength-bar .bar');

    // Set the strength level text and apply the corresponding class
    switch (strength) {
        case 0:
            strengthLevel.textContent = 'None';
            bar.style.width = '0%';
            bar.className = 'bar'; // Reset class
            break;
        case 1:
            strengthLevel.textContent = 'Weak';
            bar.style.width = '20%';
            bar.className = 'bar weak'; // Apply weak class
            break;
        case 2:
            strengthLevel.textContent = 'Fair';
            bar.style.width = '50%';
            bar.className = 'bar fair'; // Apply fair class
            break;
        case 3:
            strengthLevel.textContent = 'Good';
            bar.style.width = '75%';
            bar.className = 'bar good'; // Apply good class
            break;
        case 4:
            strengthLevel.textContent = 'Strong';
            bar.style.width = '100%';
            bar.className = 'bar strong'; // Apply strong class
            break;
        default:
            strengthLevel.textContent = 'None';
            bar.style.width = '0%';
            bar.className = 'bar'; // Reset class
            break;
    }
}

// Event listener for real-time input
document.getElementById('password-input').addEventListener('input', () => {
    const passwordInput = document.getElementById('password-input').value;
    const strength = checkPasswordStrength(passwordInput);
    updateStrengthDisplay(strength);
});
