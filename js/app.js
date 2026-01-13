// ================== script.js ==================

// DOM Elements
const loginForm = document.querySelector('#Wajid form'); // your modal form
const loginModalEl = document.getElementById('Wajid');
const loginModal = new bootstrap.Modal(loginModalEl);
const loginBtn = document.querySelector('button[data-bs-target="#Wajid"]');
const signupBtn = document.querySelector('button.btn-outline-primary');
const navContainer = document.querySelector('.d-flex.align-items-center');

// Function to generate random color
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Function to display user initial
function displayUser(user) {
    const firstInitial = user.firstName.charAt(0).toUpperCase();
    const color = getRandomColor();

    // Hide login/signup buttons
    loginBtn.style.display = 'none';
    signupBtn.style.display = 'none';

    // Create avatar circle
    const avatar = document.createElement('div');
    avatar.textContent = firstInitial;
    avatar.style.width = '35px';
    avatar.style.height = '35px';
    avatar.style.borderRadius = '50%';
    avatar.style.backgroundColor = color;
    avatar.style.color = 'white';
    avatar.style.display = 'flex';
    avatar.style.justifyContent = 'center';
    avatar.style.alignItems = 'center';
    avatar.style.fontWeight = 'bold';
    avatar.style.fontSize = '18px';
    avatar.style.cursor = 'pointer';
    avatar.title = `${user.firstName} ${user.lastName}`;

    navContainer.appendChild(avatar);
}

// Check if user already logged in
window.addEventListener('DOMContentLoaded', () => {
    const savedUser = JSON.parse(localStorage.getItem('songhubbUser'));
    if (savedUser) {
        displayUser(savedUser);
    }
});

// Handle form submit
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Grab input values
    const firstName = loginForm.querySelector('input[placeholder="First Name"]').value.trim();
    const lastName = loginForm.querySelector('input[placeholder="Last Name"]').value.trim();
    const email = loginForm.querySelector('#inputEmail').value.trim();
    const password = loginForm.querySelector('#inputPassword').value.trim();
    const confirmPassword = loginForm.querySelector('#inputConfirmPassword').value.trim();
    const gender = loginForm.querySelector('input[name="gender"]:checked')?.value || '';
    const reason = loginForm.querySelector('#inputZip').value.trim();

    if (!firstName || !lastName || !email || !password || !confirmPassword || !gender) {
        alert('Please fill all required fields!');
        return;
    }

    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }

    const user = { firstName, lastName, email, password, gender, reason };

    // Save to localStorage
    localStorage.setItem('songhubbUser', JSON.stringify(user));

    // Close modal
    loginModal.hide();

    // Display avatar
    displayUser(user);

    // Reset form
    loginForm.reset();
});
