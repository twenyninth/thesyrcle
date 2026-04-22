document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    let scrollTicking = false;

    window.addEventListener('scroll', () => {
        if (!scrollTicking) {
            requestAnimationFrame(() => {
                if (window.scrollY > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
                scrollTicking = false;
            });
            scrollTicking = true;
        }
    }, { passive: true });

    // Simple Intersection Observer for scroll animations (fade in)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply animation starting styles and observe components
    const animatedElements = document.querySelectorAll('.product-card, .section-header, .order-text, .lookbook');

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });


    // Sleeve Toggle Logic
    const BASE_PRICE = 199;
    const LONG_SLEEVE_EXTRA = 20;

    document.querySelectorAll('.sleeve-toggle').forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            const btn = e.target.closest('.sleeve-btn');
            if (!btn) return;
            toggle.querySelectorAll('.sleeve-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const sleeve = btn.getAttribute('data-sleeve');

            // Swap jersey image
            const card = toggle.closest('.product-card');
            const img = card.querySelector('.product-img.front');
            if (img) {
                const newSrc = sleeve === 'long' ? img.dataset.imgLong : img.dataset.imgShort;
                if (newSrc) img.src = newSrc;
            }

            // Update price display
            const wrapper = toggle.closest('.product-wrapper') || toggle.closest('.product-card');
            const priceEl = wrapper.querySelector('.product-price');
            if (priceEl) {
                const price = sleeve === 'long' ? BASE_PRICE + LONG_SLEEVE_EXTRA : BASE_PRICE;
                priceEl.textContent = price + ' MAD';
            }
        });
    });

    // Order form: update confirmation price when sleeve radio changes
    function updateConfirmationPrice() {
        const sleeveRadio = document.querySelector('input[name="sleeve_0"]:checked');
        const isLong = sleeveRadio && sleeveRadio.value === 'Long';
        const price = isLong ? BASE_PRICE + LONG_SLEEVE_EXTRA : BASE_PRICE;

        const confirmText = document.querySelector('.checkbox-text[data-i18n="form.confirmation.desc"]');
        if (confirmText) {
            const lang = document.documentElement.getAttribute('lang') || 'en';
            if (lang === 'ar') {
                confirmText.textContent = `سنتصل بك على رقمك في أقرب وقت لتأكيد الطلب معنا. السعر: ${price} درهم مع 49 درهم رسوم التوصيل`;
            } else if (lang === 'fr') {
                confirmText.textContent = `Nous vous contacterons sur votre numéro très prochainement pour confirmer la commande avec nous. PRIX : ${price} MAD AVEC 49 MAD DE FRAIS DE LIVRAISON`;
            } else {
                confirmText.textContent = `We will be contacting you in your number anytime soon so you confirm the order with us. PRICE: ${price} MAD W/ 49 MAD SHIPPING FEES`;
            }
        }
    }

    // Listen for sleeve radio changes in the order form
    document.addEventListener('change', (e) => {
        if (e.target.name && e.target.name.startsWith('sleeve_')) {
            updateConfirmationPrice();
        }
    });

    // Lookbook Carousel Drag Logic
    const track = document.getElementById('carouselTrack');
    if (track) {
        let isDown = false;
        let startX;
        let scrollLeft;

        track.addEventListener('mousedown', (e) => {
            isDown = true;
            track.classList.add('dragging');
            startX = e.pageX - track.offsetLeft;
            scrollLeft = track.scrollLeft;
        });

        track.addEventListener('mouseleave', () => {
            isDown = false;
            track.classList.remove('dragging');
        });

        track.addEventListener('mouseup', () => {
            isDown = false;
            track.classList.remove('dragging');
        });

        track.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - track.offsetLeft;
            const walk = (x - startX) * 2; // Scroll-fast multiplier
            track.scrollLeft = scrollLeft - walk;
        });

        // Arrow Navigation
        const slideWidth = 350 + 32; // width + gap
        document.getElementById('scrollLeft')?.addEventListener('click', () => {
            track.scrollBy({ left: -slideWidth, behavior: 'smooth' });
        });
        document.getElementById('scrollRight')?.addEventListener('click', () => {
            track.scrollBy({ left: slideWidth, behavior: 'smooth' });
        });
    }

    // Custom Cursor Logic
    const cursor = document.querySelector('.custom-cursor');
    if (cursor && window.matchMedia('(pointer: fine)').matches) {
        let mouseX = 0;
        let mouseY = 0;
        let cursorRAF = false;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            if (!cursorRAF) {
                requestAnimationFrame(() => {
                    cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
                    cursorRAF = false;
                });
                cursorRAF = true;
            }
        }, { passive: true });

        // Add hover effects for interactive elements
        const hoverElements = document.querySelectorAll('a, button, .btn, .product-card, .lang-toggle, .carousel-slide');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
        });

        // Hide custom cursor over iframe since we can't track it cross-origin
        const formWrapper = document.querySelector('.form-wrapper');
        if (formWrapper) {
            formWrapper.addEventListener('mouseenter', () => cursor.style.opacity = '0');
            formWrapper.addEventListener('mouseleave', () => cursor.style.opacity = '1');
        }
    }

    // Order Form Submission
    const orderForm = document.getElementById('orderForm');
    const successMessage = document.getElementById('successMessage');
    const submitBtn = document.getElementById('submitOrderBtn');
    const fullName = document.getElementById('full_name');
    const jerseyItemsContainer = document.getElementById('jerseyItems');

    // Prevent numbers in name fields
    const stripNumbers = function () {
        this.value = this.value.replace(/[0-9]/g, '');
    };
    if (fullName) fullName.addEventListener('input', stripNumbers);

    // Phone: only allow digits, +, spaces, dashes
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function () {
            this.value = this.value.replace(/[^0-9+\-\s]/g, '');
        });
    }

    // --- Dynamic Jersey Items ---
    const sizes = ['S', 'M', 'L', 'XL', 'XXL', '3XL', '4XL', '5XL'];

    function createJerseyCard(index) {
        const card = document.createElement('div');
        card.className = 'jersey-item-card';
        card.setAttribute('data-jersey-index', index);

        // Build size pills HTML
        const sizePills = sizes.map(s =>
            `<label class="radio-pill"><input type="radio" name="size_${index}" value="${s}" required><span>${s}</span></label>`
        ).join('');

        card.innerHTML = `
            <div class="jersey-item-header">
                <span class="jersey-item-title" data-i18n="form.jersey_item.title">JERSEY</span>
            </div>
            <div class="form-row">
                <div class="form-group half">
                    <label class="form-label" data-i18n="form.name_jersey.label">NAME ON JERSEY</label>
                    <span class="form-text" data-i18n="form.name_jersey.desc">if you want it empty type "empty"</span>
                    <input type="text" name="name_jersey_${index}" class="form-control jersey-name-input" maxlength="10" required>
                </div>
                <div class="form-group half">
                    <label class="form-label" data-i18n="form.number_jersey.label">NUMBER ON JERSEY</label>
                    <span class="form-text" data-i18n="form.number_jersey.desc">if you want it empty type "empty"</span>
                    <input type="text" name="number_jersey_${index}" class="form-control jersey-number-input" maxlength="5" required>
                </div>
            </div>
            <div class="form-group">
                <label class="form-label" data-i18n="form.size.label">SIZE</label>
                <div class="radio-pill-group">${sizePills}</div>
            </div>
            <div class="form-group">
                <label class="form-label" data-i18n="form.sleeve.label">SLEEVE</label>
                <div class="radio-pill-group">
                    <label class="radio-pill"><input type="radio" name="sleeve_${index}" value="Short" required><span data-i18n="product.short_sleeve">Short Sleeve</span></label>
                    <label class="radio-pill"><input type="radio" name="sleeve_${index}" value="Long" required><span data-i18n="product.long_sleeve">Long Sleeve</span></label>
                </div>
            </div>
        `;

        // Jersey name: only letters, spaces, dots — max 10 chars
        const nameInput = card.querySelector('.jersey-name-input');
        if (nameInput) {
            nameInput.addEventListener('input', function () {
                this.value = this.value.replace(/[^a-zA-Z\s.]/g, '').substring(0, 10);
            });
        }

        // Jersey number: only digits — max 3, OR the word "empty"
        const numberInput = card.querySelector('.jersey-number-input');
        if (numberInput) {
            numberInput.addEventListener('input', function () {
                const val = this.value.toLowerCase();
                if (val === 'e' || val === 'em' || val === 'emp' || val === 'empt' || val === 'empty') {
                    // Allow typing "empty"
                    return;
                }
                this.value = this.value.replace(/[^0-9]/g, '').substring(0, 3);
            });
        }

        return card;
    }

    function renderJerseyItems(count) {
        if (!jerseyItemsContainer) return;

        // Preserve existing data
        const existingData = [];
        jerseyItemsContainer.querySelectorAll('.jersey-item-card').forEach(card => {
            const idx = card.getAttribute('data-jersey-index');
            const name = card.querySelector(`[name="name_jersey_${idx}"]`)?.value || '';
            const number = card.querySelector(`[name="number_jersey_${idx}"]`)?.value || '';
            const sizeRadio = card.querySelector(`[name="size_${idx}"]:checked`);
            const sleeveRadio = card.querySelector(`[name="sleeve_${idx}"]:checked`);
            existingData.push({
                name,
                number,
                size: sizeRadio ? sizeRadio.value : '',
                sleeve: sleeveRadio ? sleeveRadio.value : ''
            });
        });

        // Clear and rebuild
        jerseyItemsContainer.innerHTML = '';
        for (let i = 0; i < count; i++) {
            const card = createJerseyCard(i);
            jerseyItemsContainer.appendChild(card);

            // Restore data if it existed
            if (existingData[i]) {
                card.querySelector(`[name="name_jersey_${i}"]`).value = existingData[i].name;
                card.querySelector(`[name="number_jersey_${i}"]`).value = existingData[i].number;
                if (existingData[i].size) {
                    const radio = card.querySelector(`[name="size_${i}"][value="${existingData[i].size}"]`);
                    if (radio) radio.checked = true;
                }
                if (existingData[i].sleeve) {
                    const radio = card.querySelector(`[name="sleeve_${i}"][value="${existingData[i].sleeve}"]`);
                    if (radio) radio.checked = true;
                }
            }
        }

        // Animate new cards in
        jerseyItemsContainer.querySelectorAll('.jersey-item-card').forEach((card, i) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(15px)';
            setTimeout(() => {
                card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, i * 80);
        });

        // Re-apply i18n translations to new elements
        if (typeof setLanguage === 'function') {
            const currentLang = document.documentElement.getAttribute('lang') || 'en';
            setLanguage(currentLang);
        }

        // Render matching preview cards
        renderJerseyPreviews(count);
    }

    // --- Live Jersey Previews ---
    const jerseyPreviewsContainer = document.getElementById('jerseyPreviewsContainer');

    function createJerseyPreview(index) {
        const previewDiv = document.createElement('div');
        previewDiv.className = 'jersey-preview-card';
        previewDiv.setAttribute('data-preview-index', index);

        // Pick images based on selected product
        const selectedProduct = document.querySelector('input[name="product"]:checked');
        const isMap = selectedProduct && selectedProduct.value.includes('THE MAP');
        const frontImg = isMap ? 'assets/map-jersey-front.webp' : 'assets/drawn%20jersey%20front%20empty.webp';
        const backImg = isMap ? 'assets/map-jersey-back.webp' : 'assets/drawn%20jersey%20back%20empty.webp';
        const mapClass = isMap ? ' map-preview' : '';
        const frontOverlay = isMap ? '' : `<span class="jersey-overlay jersey-overlay-front-num" id="previewFrontNum_${index}"></span>`;

        previewDiv.innerHTML = `
            <div class="jersey-preview-header">
                <span class="jersey-preview-icon">👁</span>
                <span class="jersey-preview-title" data-i18n="form.preview.title">JERSEY PREVIEW</span>
            </div>
            <div class="jersey-preview-images${mapClass}">
                <div class="jersey-preview-side">
                    <div class="jersey-img-wrapper">
                        <img src="${frontImg}" alt="Jersey Front View" class="jersey-preview-img" draggable="false">
                        ${frontOverlay}
                    </div>
                    <span class="jersey-preview-label" data-i18n="form.preview.front">FRONT</span>
                </div>
                <div class="jersey-preview-divider"></div>
                <div class="jersey-preview-side">
                    <div class="jersey-img-wrapper">
                        <img src="${backImg}" alt="Jersey Back View" class="jersey-preview-img" draggable="false">
                        <span class="jersey-overlay jersey-overlay-back-name" id="previewBackName_${index}"></span>
                        <span class="jersey-overlay jersey-overlay-back-num" id="previewBackNum_${index}"></span>
                    </div>
                    <span class="jersey-preview-label" data-i18n="form.preview.back">BACK</span>
                </div>
            </div>
        `;
        return previewDiv;
    }

    function renderJerseyPreviews(count) {
        if (!jerseyPreviewsContainer) return;

        jerseyPreviewsContainer.innerHTML = '';
        for (let i = 0; i < count; i++) {
            jerseyPreviewsContainer.appendChild(createJerseyPreview(i));
        }

        // Re-apply i18n translations for previews
        if (typeof setLanguage === 'function') {
            const currentLang = document.documentElement.getAttribute('lang') || 'en';
            setLanguage(currentLang);
        }

        attachPreviewListeners();
    }

    function updateJerseyPreview(index) {
        if (!jerseyItemsContainer || !jerseyPreviewsContainer) return;

        const card = jerseyItemsContainer.querySelector(`[data-jersey-index="${index}"]`);
        if (!card) return;

        const nameVal = card.querySelector(`[name="name_jersey_${index}"]`)?.value || '';
        const numVal = card.querySelector(`[name="number_jersey_${index}"]`)?.value || '';

        const previewFrontNum = document.getElementById(`previewFrontNum_${index}`);
        const previewBackName = document.getElementById(`previewBackName_${index}`);
        const previewBackNum = document.getElementById(`previewBackNum_${index}`);

        if (previewFrontNum) {
            previewFrontNum.textContent = numVal;
        }

        if (previewBackName) {
            const displayName = (nameVal && nameVal.toLowerCase() !== 'empty') ? nameVal : '';
            previewBackName.textContent = displayName;
        }

        if (previewBackNum) {
            previewBackNum.textContent = numVal;
        }
    }

    function attachPreviewListeners() {
        if (!jerseyItemsContainer) return;

        const cards = jerseyItemsContainer.querySelectorAll('.jersey-item-card');
        cards.forEach((card, index) => {
            const nameInput = card.querySelector(`[name="name_jersey_${index}"]`);
            const numInput = card.querySelector(`[name="number_jersey_${index}"]`);

            if (nameInput) {
                nameInput.addEventListener('input', () => updateJerseyPreview(index));
            }
            if (numInput) {
                numInput.addEventListener('input', () => updateJerseyPreview(index));
            }

            // Sync current values on attach (in case data was restored when count changed)
            updateJerseyPreview(index);
        });
    }



    // Initialize with 1 jersey card
    renderJerseyItems(1);

    // TODO: Paste your Google Apps Script Web App URL here!
    const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycby06w1hOqZ12YTBwuqh_0qohVf6ORhZQfzH2Tjqu46MIETzpstrlBKekRK2GhDPdnM-0g/exec';

    if (orderForm) {
        orderForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // --- Custom Validation ---
            // Clear previous warnings
            orderForm.querySelectorAll('.field-error').forEach(el => el.classList.remove('field-error'));
            orderForm.querySelectorAll('.error-msg').forEach(el => el.remove());

            let firstError = null;
            let hasError = false;

            const markError = (el, msg) => {
                hasError = true;
                el.classList.add('field-error');
                if (msg) {
                    const errorSpan = document.createElement('span');
                    errorSpan.className = 'error-msg';
                    errorSpan.textContent = msg;
                    el.parentElement.appendChild(errorSpan);
                }
                if (!firstError) firstError = el;
            };

            // Check all required text/email/tel inputs and textareas
            orderForm.querySelectorAll('input[required]:not([type="radio"]):not([type="checkbox"]), textarea[required]').forEach(input => {
                if (!input.value.trim()) {
                    markError(input, '⚠ This field is required');
                } else if (input.type === 'email' && !input.validity.valid) {
                    markError(input, '⚠ Enter a valid email');
                } else if (input.type === 'tel' && input.pattern && !new RegExp(input.pattern).test(input.value)) {
                    markError(input, '⚠ Enter a valid phone number');
                }
            });

            // Check required radio groups (size pills & product)
            const checkedRadioNames = new Set();
            orderForm.querySelectorAll('input[type="radio"]').forEach(r => {
                if (r.checked) checkedRadioNames.add(r.name);
            });
            orderForm.querySelectorAll('input[type="radio"][required]').forEach(r => {
                if (!checkedRadioNames.has(r.name)) {
                    const group = r.closest('.radio-pill-group') || r.closest('.product-select-group');
                    if (group && !group.classList.contains('field-error')) {
                        markError(group, '⚠ Please select an option');
                    }
                }
            });

            // Check confirmation checkbox
            const confirmBox = orderForm.querySelector('input[name="confirmation"]');
            if (confirmBox && !confirmBox.checked) {
                const container = confirmBox.closest('.confirmation-group');
                if (container) markError(container, '⚠ You must confirm to proceed');
            }

            if (hasError) {
                if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                return;
            }

            // Loading state
            const btnText = submitBtn.querySelector('.btn-text');
            if (btnText) btnText.style.opacity = '0.5';
            submitBtn.style.pointerEvents = 'none';

            // Gather form data
            const formData = new FormData(orderForm);

            // Collect jersey items as structured JSON
            const qty = 1;
            const jerseys = [];
            for (let i = 0; i < qty; i++) {
                jerseys.push({
                    name: formData.get(`name_jersey_${i}`) || 'empty',
                    number: formData.get(`number_jersey_${i}`) || 'empty',
                    size: formData.get(`size_${i}`) || 'N/A',
                    sleeve: formData.get(`sleeve_${i}`) || 'N/A'
                });
                // Clean up per-jersey fields from FormData
                formData.delete(`name_jersey_${i}`);
                formData.delete(`number_jersey_${i}`);
                formData.delete(`size_${i}`);
                formData.delete(`sleeve_${i}`);
            }

            // Add jerseys as JSON string
            formData.set('jerseys', JSON.stringify(jerseys));

            // Remove fields not needed by the backend
            formData.delete('confirmation');

            // Send to Google Sheets
            fetch(SCRIPT_URL, {
                method: 'POST',
                body: formData
            })
                .then(response => {
                    // Render previews now (after submission) so they use the correct product
                    const qty = 1;
                    renderJerseyPreviews(qty);

                    orderForm.style.display = 'none';
                    if (successMessage) {
                        successMessage.style.display = 'flex';
                        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                })
                .catch(error => {
                    console.error('Error submitting form!', error.message);
                    alert("An error occurred while submitting your order. Please check your connection or contact us directly.");
                    if (btnText) btnText.style.opacity = '1';
                    submitBtn.style.pointerEvents = 'auto';
                });
        });
    }
});

