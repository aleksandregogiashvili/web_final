document.addEventListener('DOMContentLoaded', () => {
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    burger.addEventListener('click', () => {
        navLinks.classList.toggle('open');
        burger.classList.toggle('toggle');
    });

    document.addEventListener('click', (event) => {
        if (!burger.contains(event.target) && !navLinks.contains(event.target)) {
            if (navLinks.classList.contains('open')) {
                navLinks.classList.remove('open');
                burger.classList.remove('toggle');
            }
        }
    });

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        const savedData = JSON.parse(localStorage.getItem('contactFormData') || '{}');
        contactForm.name.value = savedData.name || '';
        contactForm.email.value = savedData.email || '';
        contactForm.message.value = savedData.message || '';

        const saveFormData = () => {
            const formData = {
                name: contactForm.name.value.trim(),
                email: contactForm.email.value.trim(),
                message: contactForm.message.value.trim()
            };
            localStorage.setItem('contactFormData', JSON.stringify(formData));
        };

        const nameRegex = /^[a-zA-Z\s]{2,50}$/;
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        const messageRegex = /^.{10,500}$/;

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = contactForm.name.value.trim();
            const email = contactForm.email.value.trim();
            const message = contactForm.message.value.trim();

            if (!name) {
                alert('Name is required.');
                contactForm.name.focus();
                return;
            }
            if (!nameRegex.test(name)) {
                alert('Name must be 2-50 letters and spaces only.');
                contactForm.name.focus();
                return;
            }
            if (!email) {
                alert('Email is required.');
                contactForm.email.focus();
                return;
            }
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                contactForm.email.focus();
                return;
            }
            if (!message) {
                alert('Message is required.');
                contactForm.message.focus();
                return;
            }
            if (!messageRegex.test(message)) {
                alert('Message must be between 10 and 500 characters.');
                contactForm.message.focus();
                return;
            }

            const submission = {
                name,
                email,
                message,
                submittedAt: new Date().toISOString()
            };

            let submissions = JSON.parse(localStorage.getItem('contactFormSubmissions') || '[]');
            submissions = submissions.filter(s =>
                s.email !== submission.email ||
                s.message !== submission.message ||
                s.name !== submission.name
            );
            submissions.push(submission);
            localStorage.setItem('contactFormSubmissions', JSON.stringify(submissions));

            alert('Form submitted successfully!');
            contactForm.reset();
            localStorage.removeItem('contactFormData');
        });
    }

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


    const scrollBtn = document.createElement('button');
    scrollBtn.textContent = '↑';
    scrollBtn.id = 'scrollToTopBtn';
    scrollBtn.style.position = 'fixed';
    scrollBtn.style.bottom = '40px';
    scrollBtn.style.right = '40px';
    scrollBtn.style.padding = '10px 15px';
    scrollBtn.style.fontSize = '24px';
    scrollBtn.style.display = 'none';
    scrollBtn.style.backgroundColor = '#45a29e';
    scrollBtn.style.color = '#0b0c10';
    scrollBtn.style.border = 'none';
    scrollBtn.style.borderRadius = '5px';
    scrollBtn.style.cursor = 'pointer';
    scrollBtn.style.zIndex = '1000';
    document.body.appendChild(scrollBtn);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollBtn.style.display = 'block';
        } else {
            scrollBtn.style.display = 'none';
        }
    });

    scrollBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});
