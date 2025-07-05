document.addEventListener('DOMContentLoaded', () => {
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    burger.addEventListener('click', () => {
        navLinks.classList.toggle('open');
        burger.classList.toggle('toggle');
    });

    const togglePasswordBtn = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');
    togglePasswordBtn.addEventListener('click', () => {
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            togglePasswordBtn.textContent = 'Hide';
        } else {
            passwordInput.type = 'password';
            togglePasswordBtn.textContent = 'Show';
        }
    });

    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = contactForm.name.value.trim();
        const email = contactForm.email.value.trim();
        const message = contactForm.message.value.trim();
        const password = contactForm.password.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

        if (!name || !email || !message || !password) {
            alert('Please fill in all fields.');
            return;
        }
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        if (!passwordRegex.test(password)) {
            alert('Password must be at least 6 characters and contain letters and numbers.');
            return;
        }
        alert('Form submitted successfully!');
        contactForm.reset();
    });

    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    const cookieNotification = document.getElementById('cookieNotification');
    const acceptCookiesBtn = document.getElementById('acceptCookies');
    if (!localStorage.getItem('cookiesAccepted')) {
        cookieNotification.style.display = 'block';
    }
    acceptCookiesBtn.addEventListener('click', () => {
        localStorage.setItem('cookiesAccepted', 'true');
        cookieNotification.style.display = 'none';
    });
});
