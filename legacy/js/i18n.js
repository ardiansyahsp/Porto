// js/i18n.js
const I18N_STORAGE_KEY = 'portfolio_lang';
const DEFAULT_LANG = 'en';

let currentLang = localStorage.getItem(I18N_STORAGE_KEY) || DEFAULT_LANG;
let translations = {};

async function loadTranslations(lang) {
    try {
        const response = await fetch(`lang/${lang}.json`);
        translations = await response.json();
        applyTranslations();
        updateLanguageToggleUI(lang);
    } catch (error) {
        console.error('Failed to load translations:', error);
    }
}

function applyTranslations() {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[key]) {
            el.innerHTML = translations[key];
        }
    });
    
    // special handling for placeholders
    const placeholders = document.querySelectorAll('[data-i18n-placeholder]');
    placeholders.forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (translations[key]) {
            el.setAttribute('placeholder', translations[key]);
        }
    });
}

function switchLang(lang) {
    currentLang = lang;
    localStorage.setItem(I18N_STORAGE_KEY, lang);
    loadTranslations(lang);
}

function updateLanguageToggleUI(lang) {
    const toggleBtn = document.getElementById('lang-toggle-text');
    if (toggleBtn) {
        toggleBtn.textContent = lang === 'id' ? 'IND' : 'ENG';
    }
    
    const engBtn = document.getElementById('lang-btn-en');
    const idBtn = document.getElementById('lang-btn-id');
    const mobToggle = document.getElementById('mob-lang-toggle');
    
    if (engBtn && idBtn) {
        if (lang === 'en') {
            engBtn.classList.add('text-laravel', 'font-semibold');
            engBtn.classList.remove('text-muted');
            idBtn.classList.add('text-muted');
            idBtn.classList.remove('text-laravel', 'font-semibold');
        } else {
            idBtn.classList.add('text-laravel', 'font-semibold');
            idBtn.classList.remove('text-muted');
            engBtn.classList.add('text-muted');
            engBtn.classList.remove('text-laravel', 'font-semibold');
        }
    }
    
    if(mobToggle) {
        mobToggle.textContent = lang === 'id' ? 'Switch to English' : 'Ganti ke Indonesia';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadTranslations(currentLang);
    
    const engBtn = document.getElementById('lang-btn-en');
    const idBtn = document.getElementById('lang-btn-id');
    const mobToggle = document.getElementById('mob-lang-toggle');
    
    if(engBtn) engBtn.addEventListener('click', (e) => { e.preventDefault(); switchLang('en'); });
    if(idBtn) idBtn.addEventListener('click', (e) => { e.preventDefault(); switchLang('id'); });
    if(mobToggle) mobToggle.addEventListener('click', (e) => { 
        e.preventDefault(); 
        switchLang(currentLang === 'id' ? 'en' : 'id'); 
    });
});
