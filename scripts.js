// scripts.js

function evaluatePasswordStrength(password) {
    let strength = 'weak';
    const lengthCriteria = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (lengthCriteria && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar) {
        strength = 'strong';
    } else if (lengthCriteria && (hasUpperCase || hasLowerCase) && (hasNumber || hasSpecialChar)) {
        strength = 'medium';
    }

    return strength;
}

document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const nav = document.getElementById('nav');

    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
    });

    // Pagination functionality
    const paginationLinks = document.querySelectorAll('.pagination a');
    const pages = document.querySelectorAll('main');

    paginationLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const pageNumber = link.getAttribute('data-page');
            
            // Hide all pages
            pages.forEach(page => page.classList.add('hidden'));

            // Show the selected page
            document.getElementById(`page${pageNumber}`).classList.remove('hidden');

            // Update pagination active state
            paginationLinks.forEach(p => p.classList.remove('active'));
            link.classList.add('active');
        });
    });
    // Get elements
const signinButton = document.querySelector('.btn-signin');
const modal = document.getElementById('signin-modal');
const closeModal = document.querySelector('.close');

// Show the modal when the "Sign In" button is clicked
signinButton.addEventListener('click', () => {
    modal.style.display = 'flex'; // Make modal visible
});

// Hide the modal when the close button is clicked
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Hide the modal when clicking outside of the modal content
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// Get elements
const registerButton = document.querySelector('.btn-register');
const registerModal = document.getElementById('register-modal');
const registerCloseModal = registerModal.querySelector('.close');

// Show the modal when the "Register" button is clicked
registerButton.addEventListener('click', () => {
    registerModal.style.display = 'flex'; // Make modal visible
});

// Hide the modal when the close button is clicked
registerCloseModal.addEventListener('click', () => {
    registerModal.style.display = 'none';
});

// Hide the modal when clicking outside of the modal content
window.addEventListener('click', (event) => {
    if (event.target === registerModal) {
        registerModal.style.display = 'none';
    }
});

// Password Strength Checker

    const passwordField = document.getElementById('reg-password');
    const passwordStrength = document.getElementById('password-strength');

    passwordField.addEventListener('input', () => {
        const strength = evaluatePasswordStrength(passwordField.value);
        passwordStrength.textContent = `Strength: ${strength}`;
        passwordStrength.className = `password-strength ${strength}`;
    });


});
