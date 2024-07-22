// Declare the variable to hold the Set of common passwords
let commonPasswords = new Set();
let isPasswordSetReady = false;

// Function to fetch the list of common passwords
async function fetchPasswordSet() {
    try {
        const response = await fetch('https://raw.githubusercontent.com/danielmiessler/SecLists/master/Passwords/Common-Credentials/10k-most-common.txt');
        const data = await response.text();

        // Create a Set from the fetched data
        commonPasswords = new Set(data.split('\n').map(password => password.trim()).filter(Boolean)); // Remove empty lines
        isPasswordSetReady = true; // Set is ready
    } catch (error) {
        console.error('Error fetching password set:', error);
    }
}

// Fetch the password set when the script runs
fetchPasswordSet();

// Add event listener for password input
document.getElementById('password').addEventListener('input', function () {
    const password = this.value;

    if (!isPasswordSetReady) {
        // If the password set is not ready, do not check the strength
        return;
    }

    const score = calculatePasswordStrength(password);
    updateStrengthMeter(score);
});

// Function to calculate password strength
function calculatePasswordStrength(password) {
    const minLength = 16; // Minimum length requirement for a strong password
    const weights = {
        common: 40, // Weight assigned to the common password check
        distribution: 20, // Weight assigned to the statistical distribution check
        entropy: 40, // Weight assigned to the entropy score
    };

    // Initialize scores for each component
    let scoreCommon = 0; // Score for the common password check
    let scoreDistribution = 0; // Score for the statistical distribution check
    let scoreEntropy = 0; // Score for the entropy calculation

    // Check if the password meets the minimum length requirement
    if (password.length < minLength) {
        return 0; // Return score of 0 if password length is less than minimum
    }

    // Check if the password is in the list of common passwords
    if (commonPasswords.has(password)) {
        scoreCommon = 0; // Score 0 if the password is common
    } else {
        scoreCommon = weights.common; // Assign full weight if the password is not common
    }

    // Calculate frequency of each character type in the password
    const frequency = {
        lowercase: 0, // Count of lowercase letters
        uppercase: 0, // Count of uppercase letters
        numbers: 0, // Count of numeric digits
        special: 0, // Count of special characters
    };

    // Loop through each character in the password to determine its type
    for (const char of password) {
        if (/[a-z]/.test(char)) frequency.lowercase++; // Increment lowercase count
        else if (/[A-Z]/.test(char)) frequency.uppercase++; // Increment uppercase count
        else if (/[0-9]/.test(char)) frequency.numbers++; // Increment numbers count
        else frequency.special++; // Increment special characters count
    }

    const totalChars = password.length; // Total number of characters in the password
    const frequencies = Object.values(frequency); // Get an array of character type frequencies
    const mean = totalChars / 4; // Calculate the mean frequency (assuming 4 character types)
    const variance = frequencies.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / 4; // Calculate variance
    const stdDev = Math.sqrt(variance); // Calculate standard deviation

    // Check statistical distribution of character types
    if (stdDev <= 0.2) {
        scoreDistribution = weights.distribution; // Full weight for good distribution
    }

    // Calculate entropy based on character set size and password length
    const R = 94; // Example: printable ASCII characters (from space to ~)
    const E = Math.log2(Math.pow(R, password.length)); // Calculate entropy
    scoreEntropy = (E / Math.log2(Math.pow(R, minLength))) * (weights.entropy / 80); // Normalize to weight

    // Calculate final score by summing the weighted scores
    const finalScore = scoreCommon + scoreDistribution + scoreEntropy;
    return Math.max(0, Math.min(finalScore, 100)); // Clamp the final score between 0 and 100
}

// Function to update the strength meter based on the score
function updateStrengthMeter(score) {
    const strengthBar = document.getElementById('strength-bar');
    const strengthText = document.getElementById('strength-text');

    strengthBar.value = score;

    if (score === 0) {
        strengthText.textContent = 'Very Weak';
    } else if (score <= 40) {
        strengthText.textContent = 'Weak';
    } else if (score <= 70) {
        strengthText.textContent = 'Moderate';
    } else if (score <= 90) {
        strengthText.textContent = 'Strong';
    } else {
        strengthText.textContent = 'Very Strong';
    }
}