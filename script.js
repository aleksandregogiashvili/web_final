document.addEventListener('DOMContentLoaded', () => {
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    burger.addEventListener('click', () => {
        navLinks.classList.toggle('open');
        burger.classList.toggle('toggle');
    });

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        if (localStorage.getItem('contactFormData')) {
            const savedData = JSON.parse(localStorage.getItem('contactFormData'));
            contactForm.name.value = savedData.name || '';
            contactForm.email.value = savedData.email || '';
            contactForm.message.value = savedData.message || '';
        }

        ['name', 'email', 'message'].forEach(field => {
            contactForm[field].addEventListener('input', () => {
                const formData = {
                    name: contactForm.name.value.trim(),
                    email: contactForm.email.value.trim(),
                    message: contactForm.message.value.trim()
                };
                localStorage.setItem('contactFormData', JSON.stringify(formData));
            });
        });

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = contactForm.name.value.trim();
            const email = contactForm.email.value.trim();
            const message = contactForm.message.value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!name || !email || !message) {
                alert('Please fill in all fields.');
                return;
            }
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }

            const submission = {
                name,
                email,
                message,
                submittedAt: new Date().toISOString()
            };

            let submissions = JSON.parse(localStorage.getItem('contactFormSubmissions')) || [];
            submissions = submissions.filter(s => s.email !== submission.email || s.message !== submission.message || s.name !== submission.name);
            submissions.push(submission);
            localStorage.setItem('contactFormSubmissions', JSON.stringify(submissions));

            alert('Form submitted successfully!');
            contactForm.reset();
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

    // Scroll to top button
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
