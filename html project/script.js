/**
 * =======================================================
 * Global Variables and Element Selection
 * =======================================================
 */

let forgotModal;
let resetEmailInput;

/**
 * =======================================================
 * 1. Login Form Submission Handling
 * =======================================================
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize global variables once the DOM is ready
    forgotModal = document.getElementById('forgotModal');
    resetEmailInput = document.getElementById('resetEmail');

    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const errorDisplay = document.getElementById('error');

    // Add event listener for form submission
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        errorDisplay.textContent = '';

        const email = emailInput.value.trim();
        const password = passwordInput.value;

        // Validation checks
        if (email === "" || password === "") {
            errorDisplay.textContent = "Please enter both email and password.";
            return;
        }
        if (!validateEmail(email)) {
             errorDisplay.textContent = "Please enter a valid email address.";
             return;
        }

        console.log(`Attempting login with: Email: ${email}, Password: ${password}`);

        // Simulate an asynchronous server check
        setTimeout(() => {
            
            // =================================================================
            // 🛑 CRITICAL UPDATE: Replace these placeholders with your actual login details
            // =================================================================
            const YOUR_EMAIL = "abc@gmail.com"; // <-- REPLACE THIS
            const YOUR_PASSWORD = "12345"; // <-- REPLACE THIS
            // =================================================================

            if (email === YOUR_EMAIL && password === YOUR_PASSWORD) {
                
                // Successful Login: Redirect immediately to the homepage
                alert('Login Successful! Redirecting to Dashboard...');
                window.location.href = 'AboutUs.html'; 
                
            } else {
                // Failed Login for ALL other credentials
                errorDisplay.textContent = 'Invalid email or password. Please try again.';
            }
        }, 1000); // Simulate network latency
    });
    
    // Attach the window click handler inside DOMContentLoaded
    window.onclick = function(event) {
        if (event.target == forgotModal) {
            closeForgotPassword();
        }
    }
});

/**
 * Helper function for basic email validation
 */
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}


/**
 * =======================================================
 * 2. Forgot Password Modal Handling
 * =======================================================
 */

function openForgotPassword() {
    forgotModal.style.display = "block";
    resetEmailInput.value = ''; 
}

function closeForgotPassword() {
    forgotModal.style.display = "none";
}

function sendReset() {
    const email = resetEmailInput.value.trim();

    if (email === "" || !validateEmail(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    console.log(`Sending reset link to: ${email}`);

    // Simulate sending an email
    setTimeout(() => {
        alert(`Password reset link sent to ${email}! Check your inbox.`);
        closeForgotPassword();
    }, 1000);
}

