/**
 * i18n.js — Bilingual language switcher: English ↔ Moroccan Arabic (Darija)
 */

const translations = {
    en: {
        'nav.home': 'Home',
        'nav.collection': 'Drops',
        'nav.lookbook': 'Lookbook',
        'nav.order': 'Order Now',
        'nav.shop': 'Shop Now',
        'hero.title': 'Not Made to <span class="highlight">BLEND IN.</span>',
        'hero.subtitle': 'JERSEYS NOW, EVERYTHING LATER.',
        'hero.cta1': 'Explore Drops',
        'hero.cta2': 'Custom Order',
        'collection.title': 'LATEST <span class="highlight">DROPS</span>',
        'collection.sub': 'Wear your passion with our exclusive design.',
        
        'lookbook.title': 'STREET <span class="highlight">LENS</span>',
        'lookbook.sub': 'How the community wears it.',

        'product.badge': 'First drop',
        'product.name': 'Moroccan Team Fan Made Kit - "THE SPLIT"',
        'product.name2': 'Moroccan Team Fan Made Kit - "THE MAP"',
        'product.short_sleeve': 'Short Sleeve',
        'product.long_sleeve': 'Long Sleeve',
        'product.order': 'Order Now',
        'order.title': 'READY TO <span class="highlight">ORDER?</span>',
        'order.desc': 'Fill out the form below to secure your jersey. Once submitted, our team will review the details and get back to you with payment instructions and delivery estimations.',
        'order.perk1': '✓ Shipping across Morocco',
        'order.perk2': '✓ Secure Packaging',
        'order.perk3': '✓ Good Quality',
        'footer.tagline': 'Your premier destination for verified, high-quality football jerseys.',
        'footer.copy': '© 2026 Syrcle. All rights reserved.',
        
        'form.product.label': 'PRODUCT',
        'form.product.white': 'White Jersey',
        'form.product.black': 'Black Jersey',
        'form.name_jersey.label': 'NAME ON JERSEY',
        'form.name_jersey.desc': 'if you want it empty type "empty"',
        'form.number_jersey.label': 'NUMBER ON JERSEY',
        'form.number_jersey.desc': 'if you want it empty type "empty"',
        'form.size.label': 'SIZE',
        'form.sleeve.label': 'SLEEVE',
        'form.quantity.label': 'QUANTITY',
        'form.jersey_item.title': 'JERSEY',
        'form.full_name.label': 'YOUR FULL NAME FOR CONFIRMATION',
        'form.email.label': 'YOUR EMAIL',
        'form.phone.label': 'YOUR NUMBER / WHATSAPP FOR CONFIRMATION',
        'form.address.label': 'YOUR ADDRESS FOR DELIVERY',
        'form.preview.title': 'JERSEY PREVIEW',
        'form.preview.front': 'FRONT',
        'form.preview.back': 'BACK',
        'form.confirmation.desc': 'We will be contacting you in your number anytime soon so you confirm the order with us. <strong class="confirm-price">PRICE: 199 MAD W/ 49 MAD SHIPPING FEES</strong>',
        'form.submit': 'SUBMIT ORDER',
        'form.success.title': 'ORDER RECEIVED',
        'form.success.desc': 'Thank you! We will contact you shortly to confirm the details and proceed with shipping.',

        'copycat.marquee': '⚠️ BEWARE OF COPYCATS — OUR ORIGINAL DESIGN HAS BEEN COPIED — ONLY TRUST SYRCLE.&nbsp;&nbsp;&nbsp;⚠️ BEWARE OF COPYCATS — OUR ORIGINAL DESIGN HAS BEEN COPIED — ONLY TRUST SYRCLE.&nbsp;&nbsp;&nbsp;',
        'copycat.subtitle': 'We\'ve found identical attempts copying this unique design online. This is the <strong>only original</strong>. Don\'t get fooled.',
    },
    fr: {
        'nav.home': 'Accueil',
        'nav.collection': 'Éditions',
        'nav.lookbook': 'Lookbook',
        'nav.order': 'Commander',
        'nav.shop': 'Acheter',

        'hero.title': 'Pas fait pour <span class="highlight">SE FONDRE DANS LA MASSE.</span>',
        'hero.subtitle': 'DES MAILLOTS MAINTENANT, LE RESTE PLUS TARD.',

        'hero.cta1': 'Découvrir',
        'hero.cta2': 'Commande',

        'collection.title': 'DERNIÈRES <span class="highlight">ÉDITIONS</span>',
        'collection.sub': 'Révélez votre style avec nos designs exclusifs.',

        'lookbook.title': 'VISION <span class="highlight">URBAINE</span>',
        'lookbook.sub': 'Comment notre communauté le porte.',

        'product.badge': 'Première Édition',
        'product.name': 'Maillot Équipe Marocaine - "THE SPLIT"',
        'product.name2': 'Maillot Équipe Marocaine - "THE MAP"',
        'product.short_sleeve': 'Manches Courtes',
        'product.long_sleeve': 'Manches Longues',
        'product.order': 'Commander',

        'order.title': 'PRÊT À <span class="highlight">COMMANDER?</span>',
        'order.desc': 'Remplissez le formulaire ci-dessous pour réserver votre maillot. Une fois soumis, notre équipe examinera les détails et vous contactera pour les instructions de paiement et l\'estimation de la livraison.',

        'order.perk1': '✓ Livraison partout au Maroc',
        'order.perk2': '✓ Emballage sécurisé',
        'order.perk3': '✓ Qualité supérieure',

        'footer.tagline': 'Votre destination streetwear foot de haute qualité.',
        'footer.copy': '© 2026 Syrcle. Tous droits réservés.',
        
        'form.product.label': 'PRODUIT',
        'form.product.white': 'Maillot Blanc',
        'form.product.black': 'Maillot Noir',
        'form.name_jersey.label': 'NOM SUR LE MAILLOT',
        'form.name_jersey.desc': 'si vous le voulez vide tapez "vide"',
        'form.number_jersey.label': 'NUMÉRO SUR LE MAILLOT',
        'form.number_jersey.desc': 'si vous le voulez vide tapez "vide"',
        'form.size.label': 'TAILLE',
        'form.sleeve.label': 'MANCHES',
        'form.quantity.label': 'QUANTITÉ',
        'form.jersey_item.title': 'MAILLOT',
        'form.full_name.label': 'VOTRE NOM COMPLET POUR CONFIRMATION',
        'form.email.label': 'VOTRE EMAIL',
        'form.phone.label': 'VOTRE NUMÉRO / WHATSAPP POUR CONFIRMATION',
        'form.address.label': 'VOTRE ADRESSE POUR LA LIVRAISON',
        'form.preview.title': 'APERÇU DU MAILLOT',
        'form.preview.front': 'DEVANT',
        'form.preview.back': 'DOS',
        'form.confirmation.desc': 'Nous vous contacterons sur votre numéro très prochainement pour confirmer la commande avec nous. <strong class="confirm-price">PRIX : 199 MAD AVEC 49 MAD DE FRAIS DE LIVRAISON</strong>',
        'form.submit': 'SOUMETTRE LA COMMANDE',
        'form.success.title': 'COMMANDE REÇUE',
        'form.success.desc': 'Merci ! Nous vous contacterons sous peu pour confirmer les détails et procéder à l\'expédition.',

        'copycat.marquee': '⚠️ ATTENTION AUX COPIES — NOTRE DESIGN ORIGINAL A ÉTÉ COPIÉ — FAITES CONFIANCE UNIQUEMENT À SYRCLE.&nbsp;&nbsp;&nbsp;⚠️ ATTENTION AUX COPIES — NOTRE DESIGN ORIGINAL A ÉTÉ COPIÉ — FAITES CONFIANCE UNIQUEMENT À SYRCLE.&nbsp;&nbsp;&nbsp;',
        'copycat.subtitle': 'Nous avons découvert des tentatives identiques copiant ce design unique en ligne. Ceci est le <strong>seul original</strong>. Ne vous faites pas avoir.',
    },
    ar: {

        'nav.home': 'الرئيسية',
        'nav.collection': 'الإصدارات',
        'nav.lookbook': 'معرض الصور',
        'nav.order': 'اطلب الآن',
        'nav.shop': 'تسوّق الآن',

        'hero.title': 'لست هنا لكي <span class="highlight">تندمج.</span>',
        'hero.subtitle': 'القمصان الآن، والباقي لاحقاً.',

        'hero.cta1': 'اكتشف الإصدارات',
        'hero.cta2': 'طلب خاص',

        'collection.title': 'أحدث <span class="highlight">الإصدارات</span>',
        'collection.sub': 'عبّر عن أسلوبك بتصاميمنا الحصرية.',
        
        'lookbook.title': 'عدسة <span class="highlight">الشارع</span>',
        'lookbook.sub': 'هكذا يرتديه مجتمعنا.',

        'product.badge': 'الإصدار الأول',
        'product.name': 'قميص المنتخب المغربي (تصميم جماهيري) - "THE SPLIT"',
        'product.name2': 'قميص المنتخب المغربي (تصميم جماهيري) - "THE MAP"',
        'product.short_sleeve': 'أكمام قصيرة',
        'product.long_sleeve': 'أكمام طويلة',
        'product.order': 'اطلب الآن',

        'order.title': 'جاهز <span class="highlight">للطلب؟</span>',
        'order.desc': 'املأ النموذج بالأسفل لحجز قطعتك. بعد إرسال الطلب، سيقوم فريقنا بمراجعة التفاصيل والتواصل معك بخصوص الدفع وموعد التوصيل.',

        'order.perk1': '✓ توصيل في جميع أنحاء المغرب',
        'order.perk2': '✓ تغليف آمن',
        'order.perk3': '✓ جودة عالية',

        'footer.tagline': 'وجهتك لقطع ستريتوير المميزة المستوحاة من ثقافة كرة القدم.',
        'footer.copy': '© 2026 Syrcle. جميع الحقوق محفوظة.',
        
        'form.product.label': 'المنتج',
        'form.product.white': 'القميص الأبيض',
        'form.product.black': 'القميص الأسود',
        'form.name_jersey.label': 'الاسم على القميص',
        'form.name_jersey.desc': 'إذا كنت تريده فارغاً، اكتب "فارغ"',
        'form.number_jersey.label': 'أرقام على القميص',
        'form.number_jersey.desc': 'إذا كنت تريده فارغاً، اكتب "فارغ"',
        'form.size.label': 'الحجم',
        'form.sleeve.label': 'الأكمام',
        'form.quantity.label': 'الكمية',
        'form.jersey_item.title': 'قميص',
        'form.full_name.label': 'اسمك الكامل للتأكيد',
        'form.email.label': 'بريدك الإلكتروني',
        'form.phone.label': 'رقمك / واتساب للتأكيد',
        'form.address.label': 'عنوانك للتسليم',
        'form.preview.title': 'معاينة القميص',
        'form.preview.front': 'الأمام',
        'form.preview.back': 'الخلف',
        'form.confirmation.desc': 'سنتصل بك على رقمك في أقرب وقت لتأكيد الطلب معنا. <strong class="confirm-price">السعر: 199 درهم مع 49 درهم رسوم التوصيل</strong>',
        'form.submit': 'تأكيد الطلب',
        'form.success.title': 'تم استلام الطلب',
        'form.success.desc': 'شكراً لك! سنتواصل معك قريباً لتأكيد التفاصيل ومتابعة الشحن.',

        'copycat.marquee': '⚠️ حذاري من المقلّدين — التصميم ديالنا الأصلي تم نسخه — ثق فقط في SYRCLE.&nbsp;&nbsp;&nbsp;⚠️ حذاري من المقلّدين — التصميم ديالنا الأصلي تم نسخه — ثق فقط في SYRCLE.&nbsp;&nbsp;&nbsp;',
        'copycat.subtitle': 'لقينا محاولات متطابقة كيقلّدو هاد التصميم الفريد على الإنترنت. هادا هو <strong>الأصلي الوحيد</strong>. ما تخلّيوش حد يغشّكم.',
    }
};

const RTL_LANGS = new Set(['ar']);

function setLanguage(lang) {
    const html = document.documentElement;

    // Flip direction & lang attribute
    html.setAttribute('lang', lang);
    html.setAttribute('dir', RTL_LANGS.has(lang) ? 'rtl' : 'ltr');

    const t = translations[lang] || translations.en;

    // Plain text elements
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key] !== undefined) el.textContent = t[key];
    });

    // HTML elements (allow <span class="highlight"> inside)
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
        const key = el.getAttribute('data-i18n-html');
        if (t[key] !== undefined) el.innerHTML = t[key];
    });

    // Update active state on toggle buttons
    document.querySelectorAll('.lang-option').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });

    // Flip the Order Now arrow direction (excluding carousel buttons)
    document.querySelectorAll('a.btn-icon .arrow').forEach(arrow => {
        arrow.textContent = RTL_LANGS.has(lang) ? '←' : '→';
    });

    // Persist choice
    localStorage.setItem('syrcle-lang', lang);
}

// Wire up the toggle
document.addEventListener('DOMContentLoaded', () => {
    const saved = localStorage.getItem('syrcle-lang') || 'en';
    setLanguage(saved);

    document.getElementById('langToggle').addEventListener('click', (e) => {
        const clicked = e.target.closest('[data-lang]');
        if (clicked) {
            setLanguage(clicked.getAttribute('data-lang'));
        } else {
            // Toggle if clicked on divider etc.
            const current = document.documentElement.getAttribute('lang') || 'en';
            const nextLang = current === 'en' ? 'fr' : (current === 'fr' ? 'ar' : 'en');
            setLanguage(nextLang);
        }
    });
});
