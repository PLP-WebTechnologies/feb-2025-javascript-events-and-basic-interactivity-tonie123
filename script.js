// Image gallery data
const images = [
    'https://picsum.photos/400/300?random=1',
    'https://picsum.photos/400/300?random=2',
    'https://picsum.photos/400/300?random=3',
    'https://picsum.photos/400/300?random=4'
];
let currentImageIndex = 0;

document.addEventListener('DOMContentLoaded', () => {
    // Button color change
    const colorButton = document.getElementById('colorButton');
    const colors = ['#1a73e8', '#dc3545', '#28a745', '#ffc107', '#17a2b8'];
    let colorIndex = 0;

    if (colorButton) {
        colorButton.addEventListener('click', () => {
            colorIndex = (colorIndex + 1) % colors.length;
            colorButton.style.backgroundColor = colors[colorIndex];
        });
    }

    // Button text change
    const textButton = document.getElementById('textButton');
    const texts = ['Click Me!', 'Again!', 'One More Time!', 'Keep Going!', 'You Got It!'];
    let textIndex = 0;

    if (textButton) {
        textButton.addEventListener('click', () => {
            textIndex = (textIndex + 1) % texts.length;
            textButton.textContent = texts[textIndex];
        });
    }

    // Hover effects
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'scale(1.05)';
        });
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'scale(1)';
        });
    });

    // Image Gallery
    const galleryImg = document.getElementById('galleryImg');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    function updateGalleryImage() {
        galleryImg.src = images[currentImageIndex];
        galleryImg.style.animation = 'none';
        galleryImg.offsetHeight; // Trigger reflow
        galleryImg.style.animation = 'slideDown 0.3s ease-out';
    }

    if (prevBtn && nextBtn && galleryImg) {
        prevBtn.addEventListener('click', () => {
            currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
            updateGalleryImage();
        });

        nextBtn.addEventListener('click', () => {
            currentImageIndex = (currentImageIndex + 1) % images.length;
            updateGalleryImage();
        });
    }

    // Accordion
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            content.classList.toggle('active');
        });

        // Secret double-click action
        header.addEventListener('dblclick', () => {
            header.style.backgroundColor = '#1a73e8';
            header.style.color = 'white';
            setTimeout(() => {
                header.style.backgroundColor = '';
                header.style.color = '';
            }, 500);
        });
    });

    // Form Validation
    const form = document.getElementById('validationForm');
    const username = document.getElementById('username');
    const email = document.getElementById('email');
    const password = document.getElementById('password');

    function setValid(input, message) {
        input.style.borderColor = '#28a745';
        const msgEl = input.nextElementSibling;
        msgEl.style.color = '#28a745';
        msgEl.textContent = message;
    }

    function setInvalid(input, message) {
        input.style.borderColor = '#dc3545';
        const msgEl = input.nextElementSibling;
        msgEl.style.color = '#dc3545';
        msgEl.textContent = message;
    }

    if (username) {
        username.addEventListener('input', () => {
            if (username.value.length < 3) {
                setInvalid(username, 'Username must be at least 3 characters long');
            } else {
                setValid(username, 'Looks good!');
            }
        });
    }

    if (email) {
        email.addEventListener('input', () => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email.value)) {
                setInvalid(email, 'Please enter a valid email address');
            } else {
                setValid(email, 'Looks good!');
            }
        });
    }

    if (password) {
        password.addEventListener('input', () => {
            const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
            if (!passwordRegex.test(password.value)) {
                setInvalid(password, 'Password must be at least 8 characters and contain letters & numbers');
            } else {
                setValid(password, 'Looks good!');
            }
        });
    }

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            let valid = true;

            if (username.value.length < 3) {
                setInvalid(username, 'Username must be at least 3 characters long');
                valid = false;
            }
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email.value)) {
                setInvalid(email, 'Please enter a valid email address');
                valid = false;
            }
            const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
            if (!passwordRegex.test(password.value)) {
                setInvalid(password, 'Password must be at least 8 characters and contain letters & numbers');
                valid = false;
            }

            if (valid) {
                alert('Form submitted successfully!');
                form.reset();
                document.querySelectorAll('.validation-message').forEach(message => {
                    message.textContent = '';
                });
                document.querySelectorAll('input').forEach(input => {
                    input.style.borderColor = '';
                });
            }
        });
    }

    // Keypress detection
    document.addEventListener('keydown', (e) => {
        if (prevBtn && nextBtn) {
            if (e.key === 'ArrowLeft') {
                prevBtn.click();
            } else if (e.key === 'ArrowRight') {
                nextBtn.click();
            }
        }
    });
});
