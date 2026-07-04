document.addEventListener('DOMContentLoaded', () => {
    // 1. Remove Loader
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 800); // Small delay to allow assets to begin loading

    // 2. Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    const navLinksItems = navLinks.querySelectorAll('a');

    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = mobileMenuBtn.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-xmark');
        } else {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        }
    });

    // Close mobile menu when a link is clicked
    navLinksItems.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileMenuBtn.querySelector('i').classList.remove('fa-xmark');
            mobileMenuBtn.querySelector('i').classList.add('fa-bars');
        });
    });

    // 3. Sticky Header & Back to Top Button
    const header = document.getElementById('header');
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        if (window.scrollY > 500) {
            backToTop.style.display = 'flex';
        } else {
            backToTop.style.display = 'none';
        }
    });

    // 4. Smooth Scrolling for Anchor Links (Handled by CSS scroll-behavior mostly, but active state requires JS)
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinksItems.forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href').includes(current)) {
                a.classList.add('active');
            }
        });
    });

    // 5. Intersection Observer for Fade-Up Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-up');
    fadeElements.forEach(el => observer.observe(el));

    // 6. Gallery Lightbox
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const imgSrc = item.querySelector('img').getAttribute('src');
            lightboxImg.setAttribute('src', imgSrc);
            lightbox.classList.add('active');
        });
    });

    lightboxClose.addEventListener('click', () => {
        lightbox.classList.remove('active');
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target !== lightboxImg) {
            lightbox.classList.remove('active');
        }
    });

    // 6a. Gallery and Reviews Modal Handlers
    const galleryBtn = document.getElementById('galleryBtn');
    const reviewsBtn = document.getElementById('reviewsBtn');
    const galleryModal = document.getElementById('galleryModal');
    const reviewsModal = document.getElementById('reviewsModal');
    const galleryModalClose = document.getElementById('galleryModalClose');
    const reviewsModalClose = document.getElementById('reviewsModalClose');

    // Gallery Modal Open Function
    const openGallery = () => {
        galleryModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    // Gallery Modal Close Function
    const closeGallery = () => {
        galleryModal.classList.remove('active');
        document.body.style.overflow = '';
    };

    // Reviews Modal Open Function
    const openReviews = () => {
        reviewsModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    // Reviews Modal Close Function
    const closeReviews = () => {
        reviewsModal.classList.remove('active');
        document.body.style.overflow = '';
    };

    // Gallery Trigger Event Listeners
    galleryBtn.addEventListener('click', openGallery);
    document.querySelectorAll('a[href="#gallery"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            openGallery();
        });
    });

    galleryModalClose.addEventListener('click', closeGallery);
    galleryModal.addEventListener('click', (e) => {
        if (e.target === galleryModal) {
            closeGallery();
        }
    });

    // Reviews Trigger Event Listeners
    reviewsBtn.addEventListener('click', openReviews);
    document.querySelectorAll('a[href="#testimonials"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            openReviews();
        });
    });

    reviewsModalClose.addEventListener('click', closeReviews);
    reviewsModal.addEventListener('click', (e) => {
        if (e.target === reviewsModal) {
            closeReviews();
        }
    });

    // Close modals on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeGallery();
            closeReviews();
        }
    });

    // 7. FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            // Close others
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            // Toggle current
            item.classList.toggle('active');
        });
    });

    // 8. WhatsApp Order Form Handler
    const enquiryForm = document.getElementById('enquiryForm');
    const BAKER_WHATSAPP = '919500351474'; // Primary WhatsApp number

    if (enquiryForm) {
        enquiryForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Collect field values
            const name       = document.getElementById('wa_name').value.trim();
            const phone      = document.getElementById('wa_phone').value.trim();
            const occasion   = document.getElementById('wa_occasion').value.trim();
            const cakeType   = document.getElementById('wa_cake_type').value.trim();
            const dateRaw    = document.getElementById('wa_date').value;
            const weight     = document.getElementById('wa_weight').value.trim();
            const customMsg  = document.getElementById('wa_message').value.trim();

            // Basic validation — highlight missing required fields
            let valid = true;
            ['wa_name','wa_phone','wa_occasion','wa_cake_type','wa_date'].forEach(id => {
                const el = document.getElementById(id);
                if (!el.value.trim()) {
                    el.style.borderColor = '#e53e3e';
                    el.focus();
                    valid = false;
                } else {
                    el.style.borderColor = '';
                }
            });
            if (!valid) return;

            // Format date nicely
            let dateFormatted = dateRaw;
            if (dateRaw) {
                const d = new Date(dateRaw);
                dateFormatted = d.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
            }

            // Build the WhatsApp message
            let msg = `Hello Seba's Home Baker! 🎂\n\nI'd like to place a cake order.\n\n`;
            msg += `👤 *Name:* ${name}\n`;
            msg += `📞 *Phone:* ${phone}\n`;
            msg += `🎉 *Occasion:* ${occasion}\n`;
            msg += `🎂 *Cake Type / Flavour:* ${cakeType}\n`;
            msg += `📅 *Date Required:* ${dateFormatted}\n`;
            if (weight) msg += `⚖️ *Weight:* ${weight}\n`;
            if (customMsg) msg += `✍️ *Custom Message / Details:* ${customMsg}\n`;
            msg += `\nPlease contact me to discuss the design and confirm the order. Thank you! 🙏`;

            // Animate button
            const btn = document.getElementById('waSubmitBtn');
            const originalHTML = btn.innerHTML;
            btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Opening WhatsApp...';
            btn.disabled = true;

            setTimeout(() => {
                const waURL = `https://wa.me/${BAKER_WHATSAPP}?text=${encodeURIComponent(msg)}`;
                window.open(waURL, '_blank');
                btn.innerHTML = originalHTML;
                btn.disabled = false;
                enquiryForm.reset();
            }, 800);
        });

        // Clear red border on input
        enquiryForm.querySelectorAll('input, textarea').forEach(el => {
            el.addEventListener('input', () => { el.style.borderColor = ''; });
        });
    }

    // 9. Dark Mode Toggle
    const themeToggle = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;
    const themeIcon = themeToggle.querySelector('i');

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        htmlElement.setAttribute('data-theme', 'dark');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }

    themeToggle.addEventListener('click', () => {
        if (htmlElement.getAttribute('data-theme') === 'dark') {
            htmlElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        } else {
            htmlElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }
    });
});
