/**
 * Main JavaScript File
 * This file contains the primary JavaScript functionality for the website
 * Author: Performance Test Website
 * Date: 2026-03-30
 * Version: 1.0.0
 * 
 * This file is intentionally verbose and unminified to demonstrate
 * performance issues with large, unoptimized JavaScript files.
 * 
 * NOTE: This script is render-blocking and loaded in the <head> without
 * async or defer attributes, which is a major performance anti-pattern.
 */

// Immediately Invoked Function Expression to avoid global namespace pollution
(function() {
    'use strict';
    
    // ========================================================================
    // GLOBAL VARIABLES AND CONSTANTS
    // ========================================================================
    
    const ANIMATION_DURATION = 300;
    const SCROLL_THRESHOLD = 100;
    const MOBILE_BREAKPOINT = 768;
    
    let isScrolling = false;
    let scrollTimeout = null;
    let currentScrollPosition = 0;
    let previousScrollPosition = 0;
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;
    
    // ========================================================================
    // DOM READY EVENT HANDLER
    // ========================================================================
    
    /**
     * Initialize all functionality when the DOM is fully loaded
     * This provides verbose logging for debugging purposes
     */
    function initializeApplication() {
        console.log('Application initializing...');
        console.log('Window width:', windowWidth);
        console.log('Window height:', windowHeight);
        
        // Initialize various components
        initializeNavigationMenu();
        initializeScrollEffects();
        initializeFormValidation();
        initializeSmoothScrolling();
        initializeBackToTopButton();
        initializeAnimationsOnScroll();
        initializeImageLazyLoading(); // This won't work since loading="eager"!
        initializePerformanceMonitoring();
        
        console.log('Application initialized successfully!');
    }
    
    // ========================================================================
    // NAVIGATION MENU FUNCTIONALITY
    // ========================================================================
    
    /**
     * Initialize the mobile navigation menu toggle functionality
     */
    function initializeNavigationMenu() {
        console.log('Initializing navigation menu...');
        
        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        const mainNavigation = document.querySelector('.main-navigation');
        
        if (mobileMenuToggle && mainNavigation) {
            mobileMenuToggle.addEventListener('click', function(event) {
                event.preventDefault();
                event.stopPropagation();
                
                console.log('Mobile menu toggle clicked');
                
                // Toggle active class on button
                mobileMenuToggle.classList.toggle('active');
                
                // Toggle active class on navigation
                mainNavigation.classList.toggle('active');
                
                // Toggle body scroll lock
                if (mainNavigation.classList.contains('active')) {
                    document.body.style.overflow = 'hidden';
                    console.log('Mobile menu opened');
                } else {
                    document.body.style.overflow = '';
                    console.log('Mobile menu closed');
                }
            });
            
            // Close menu when clicking on a link
            const navLinks = mainNavigation.querySelectorAll('.nav-menu-link');
            navLinks.forEach(function(link) {
                link.addEventListener('click', function() {
                    if (windowWidth <= MOBILE_BREAKPOINT) {
                        mobileMenuToggle.classList.remove('active');
                        mainNavigation.classList.remove('active');
                        document.body.style.overflow = '';
                        console.log('Mobile menu closed after link click');
                    }
                });
            });
        }
        
        console.log('Navigation menu initialized');
    }
    
    // ========================================================================
    // SCROLL EFFECTS
    // ========================================================================
    
    /**
     * Initialize scroll-based effects like header styling changes
     */
    function initializeScrollEffects() {
        console.log('Initializing scroll effects...');
        
        window.addEventListener('scroll', function() {
            currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
            
            // Update header styling based on scroll position
            updateHeaderOnScroll();
            
            // Update back to top button visibility
            updateBackToTopButton();
            
            // Log scroll position occasionally (every 100px)
            if (Math.floor(currentScrollPosition / 100) !== Math.floor(previousScrollPosition / 100)) {
                console.log('Scroll position:', currentScrollPosition);
            }
            
            previousScrollPosition = currentScrollPosition;
        });
        
        console.log('Scroll effects initialized');
    }
    
    /**
     * Update header styling based on scroll position
     */
    function updateHeaderOnScroll() {
        const header = document.querySelector('.site-header');
        
        if (header) {
            if (currentScrollPosition > SCROLL_THRESHOLD) {
                if (!header.classList.contains('scrolled')) {
                    header.classList.add('scrolled');
                    console.log('Header scrolled state activated');
                }
            } else {
                if (header.classList.contains('scrolled')) {
                    header.classList.remove('scrolled');
                    console.log('Header scrolled state deactivated');
                }
            }
        }
    }
    
    // ========================================================================
    // FORM VALIDATION
    // ========================================================================
    
    /**
     * Initialize form validation for the contact form
     */
    function initializeFormValidation() {
        console.log('Initializing form validation...');
        
        const contactForm = document.querySelector('.contact-form');
        
        if (contactForm) {
            contactForm.addEventListener('submit', function(event) {
                event.preventDefault();
                console.log('Form submission intercepted for validation');
                
                let isFormValid = true;
                const formData = new FormData(contactForm);
                
                // Validate each field
                for (let [fieldName, fieldValue] of formData.entries()) {
                    console.log('Validating field:', fieldName, 'Value:', fieldValue);
                    
                    if (!fieldValue || fieldValue.trim() === '') {
                        isFormValid = false;
                        console.error('Validation failed for field:', fieldName);
                        alert('Please fill in the ' + fieldName + ' field');
                        break;
                    }
                }
                
                if (isFormValid) {
                    console.log('Form validation passed!');
                    alert('Form submitted successfully! (This is a demo - no actual submission)');
                    contactForm.reset();
                } else {
                    console.error('Form validation failed');
                }
            });
        }
        
        console.log('Form validation initialized');
    }
    
    // ========================================================================
    // SMOOTH SCROLLING
    // ========================================================================
    
    /**
     * Initialize smooth scrolling for anchor links
     */
    function initializeSmoothScrolling() {
        console.log('Initializing smooth scrolling...');
        
        const anchorLinks = document.querySelectorAll('a[href^="#"]');
        
        anchorLinks.forEach(function(link) {
            link.addEventListener('click', function(event) {
                const href = link.getAttribute('href');
                
                // Ignore empty hash or just "#"
                if (href === '#' || href === '') {
                    return;
                }
                
                const targetElement = document.querySelector(href);
                
                if (targetElement) {
                    event.preventDefault();
                    console.log('Smooth scrolling to:', href);
                    
                    const targetPosition = targetElement.offsetTop - 80; // Account for fixed header
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        console.log('Smooth scrolling initialized');
    }
    
    // ========================================================================
    // BACK TO TOP BUTTON
    // ========================================================================
    
    /**
     * Initialize the back to top button functionality
     */
    function initializeBackToTopButton() {
        console.log('Initializing back to top button...');
        
        const backToTopButton = document.querySelector('.back-to-top');
        
        if (backToTopButton) {
            backToTopButton.addEventListener('click', function(event) {
                event.preventDefault();
                console.log('Back to top button clicked');
                
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
        
        console.log('Back to top button initialized');
    }
    
    /**
     * Update back to top button visibility based on scroll position
     */
    function updateBackToTopButton() {
        const backToTopButton = document.querySelector('.back-to-top');
        
        if (backToTopButton) {
            if (currentScrollPosition > 500) {
                if (!backToTopButton.classList.contains('visible')) {
                    backToTopButton.classList.add('visible');
                }
            } else {
                if (backToTopButton.classList.contains('visible')) {
                    backToTopButton.classList.remove('visible');
                }
            }
        }
    }
    
    // ========================================================================
    // ANIMATIONS ON SCROLL
    // ========================================================================
    
    /**
     * Initialize animations that trigger when elements come into view
     */
    function initializeAnimationsOnScroll() {
        console.log('Initializing scroll animations...');
        
        const animatedElements = document.querySelectorAll('.animated');
        
        if (animatedElements.length > 0) {
            const observer = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        console.log('Element entered viewport:', entry.target);
                        entry.target.classList.add('visible');
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });
            
            animatedElements.forEach(function(element) {
                observer.observe(element);
            });
        }
        
        console.log('Scroll animations initialized');
    }
    
    // ========================================================================
    // LAZY LOADING (Won't work with loading="eager"!)
    // ========================================================================
    
    /**
     * Initialize lazy loading for images
     * NOTE: This won't actually work because all images have loading="eager"
     * This is intentionally ineffective code to demonstrate wasted resources
     */
    function initializeImageLazyLoading() {
        const images = document.querySelectorAll('img[loading="lazy"]');
        
        console.log('Found', images.length, 'lazy-loading images (should be 0!)');
        
        if (images.length > 0) {
            const imageObserver = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        const image = entry.target;
                        const imageSrc = image.getAttribute('data-src');
                        
                        if (imageSrc) {
                            image.src = imageSrc;
                            image.removeAttribute('data-src');
                            imageObserver.unobserve(image);
                            console.log('Lazy loaded image:', imageSrc);
                        }
                    }
                });
            });
            
            images.forEach(function(image) {
                imageObserver.observe(image);
            });
        }
        
        console.log('Image lazy loading initialized (but ineffective!)');
    }
    
    // ========================================================================
    // PERFORMANCE MONITORING
    // ========================================================================
    
    /**
     * Monitor and log performance metrics
     * This adds additional overhead but provides visibility into the poor performance
     */
    function initializePerformanceMonitoring() {
        console.log('Initializing performance monitoring...');
        
        // Log performance timing information
        window.addEventListener('load', function() {
            setTimeout(function() {
                if (window.performance && window.performance.timing) {
                    const perfData = window.performance.timing;
                    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
                    const domReadyTime = perfData.domContentLoadedEventEnd - perfData.navigationStart;
                    const connectTime = perfData.responseEnd - perfData.requestStart;
                    
                    console.log('=== Performance Metrics ===');
                    console.log('Page Load Time:', pageLoadTime, 'ms');
                    console.log('DOM Ready Time:', domReadyTime, 'ms');
                    console.log('Connect Time:', connectTime, 'ms');
                    console.log('===========================');
                    
                    // Log resource timing
                    if (window.performance.getEntriesByType) {
                        const resources = window.performance.getEntriesByType('resource');
                        console.log('Total Resources Loaded:', resources.length);
                        
                        let totalSize = 0;
                        resources.forEach(function(resource) {
                            if (resource.transferSize) {
                                totalSize += resource.transferSize;
                            }
                            console.log('Resource:', resource.name, 'Duration:', resource.duration.toFixed(2), 'ms');
                        });
                        
                        console.log('Total Transfer Size:', (totalSize / 1024 / 1024).toFixed(2), 'MB');
                    }
                }
            }, 1000);
        });
        
        console.log('Performance monitoring initialized');
    }
    
    // ========================================================================
    // WINDOW RESIZE HANDLER
    // ========================================================================
    
    /**
     * Handle window resize events
     */
    window.addEventListener('resize', function() {
        windowWidth = window.innerWidth;
        windowHeight = window.innerHeight;
        
        console.log('Window resized to:', windowWidth, 'x', windowHeight);
        
        // Close mobile menu if window is resized above mobile breakpoint
        if (windowWidth > MOBILE_BREAKPOINT) {
            const mainNavigation = document.querySelector('.main-navigation');
            const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
            
            if (mainNavigation && mainNavigation.classList.contains('active')) {
                mainNavigation.classList.remove('active');
                if (mobileMenuToggle) {
                    mobileMenuToggle.classList.remove('active');
                }
                document.body.style.overflow = '';
                console.log('Mobile menu closed due to window resize');
            }
        }
    });
    
    // ========================================================================
    // INITIALIZATION
    // ========================================================================
    
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeApplication);
    } else {
        // DOM is already ready
        initializeApplication();
    }
    
    // Also log when everything (including images) is fully loaded
    window.addEventListener('load', function() {
        console.log('All resources (including images) fully loaded!');
        console.log('This message appears late because of all the render-blocking resources!');
    });
    
})();

// Create a global utilities namespace
window.WebsiteUtils = (function() {
    'use strict';
    
    // ========================================================================
    // STRING UTILITIES
    // ========================================================================
    
    /**
     * Capitalize the first letter of a string
     * @param {string} str - The input string
     * @returns {string} The capitalized string
     */
    function capitalizeFirstLetter(str) {
        if (!str || typeof str !== 'string') {
            console.warn('capitalizeFirstLetter: Invalid input');
            return '';
        }
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    
    /**
     * Convert a string to title case
     * @param {string} str - The input string
     * @returns {string} The title cased string
     */
    function toTitleCase(str) {
        if (!str || typeof str !== 'string') {
            console.warn('toTitleCase: Invalid input');
            return '';
        }
        return str.toLowerCase().split(' ').map(function(word) {
            return capitalizeFirstLetter(word);
        }).join(' ');
    }
    
    /**
     * Truncate a string to a specified length
     * @param {string} str - The input string
     * @param {number} maxLength - Maximum length
     * @param {string} suffix - Suffix to add if truncated (default: '...')
     * @returns {string} The truncated string
     */
    function truncateString(str, maxLength, suffix) {
        suffix = suffix || '...';
        
        if (!str || typeof str !== 'string') {
            console.warn('truncateString: Invalid input');
            return '';
        }
        
        if (str.length <= maxLength) {
            return str;
        }
        
        return str.substring(0, maxLength - suffix.length) + suffix;
    }
    
    /**
     * Remove HTML tags from a string
     * @param {string} str - The input string
     * @returns {string} The string without HTML tags
     */
    function stripHtmlTags(str) {
        if (!str || typeof str !== 'string') {
            console.warn('stripHtmlTags: Invalid input');
            return '';
        }
        
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = str;
        return tempDiv.textContent || tempDiv.innerText || '';
    }
    
    // ========================================================================
    // ARRAY UTILITIES
    // ========================================================================
    
    /**
     * Shuffle an array randomly
     * @param {Array} array - The input array
     * @returns {Array} A new shuffled array
     */
    function shuffleArray(array) {
        if (!Array.isArray(array)) {
            console.warn('shuffleArray: Input is not an array');
            return [];
        }
        
        const shuffled = array.slice();
        
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = shuffled[i];
            shuffled[i] = shuffled[j];
            shuffled[j] = temp;
        }
        
        return shuffled;
    }
    
    /**
     * Get unique values from an array
     * @param {Array} array - The input array
     * @returns {Array} Array with unique values only
     */
    function getUniqueValues(array) {
        if (!Array.isArray(array)) {
            console.warn('getUniqueValues: Input is not an array');
            return [];
        }
        
        return array.filter(function(value, index, self) {
            return self.indexOf(value) === index;
        });
    }
    
    /**
     * Chunk an array into smaller arrays of specified size
     * @param {Array} array - The input array
     * @param {number} size - The chunk size
     * @returns {Array} Array of chunks
     */
    function chunkArray(array, size) {
        if (!Array.isArray(array)) {
            console.warn('chunkArray: Input is not an array');
            return [];
        }
        
        const chunks = [];
        for (let i = 0; i < array.length; i += size) {
            chunks.push(array.slice(i, i + size));
        }
        return chunks;
    }
    
    // ========================================================================
    // NUMBER UTILITIES
    // ========================================================================
    
    /**
     * Format a number with thousands separators
     * @param {number} num - The input number
     * @returns {string} Formatted number string
     */
    function formatNumber(num) {
        if (typeof num !== 'number' && typeof num !== 'string') {
            console.warn('formatNumber: Invalid input');
            return '0';
        }
        
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    
    /**
     * Generate a random number between min and max
     * @param {number} min - Minimum value
     * @param {number} max - Maximum value
     * @returns {number} Random number
     */
    function getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
    /**
     * Round a number to specified decimal places
     * @param {number} num - The input number
     * @param {number} decimals - Number of decimal places
     * @returns {number} Rounded number
     */
    function roundToDecimals(num, decimals) {
        const multiplier = Math.pow(10, decimals);
        return Math.round(num * multiplier) / multiplier;
    }
    
    // ========================================================================
    // DATE UTILITIES
    // ========================================================================
    
    /**
     * Format a date object to a readable string
     * @param {Date} date - The input date
     * @param {string} format - Format string (default: 'YYYY-MM-DD')
     * @returns {string} Formatted date string
     */
    function formatDate(date, format) {
        if (!(date instanceof Date) || isNaN(date)) {
            console.warn('formatDate: Invalid date');
            return '';
        }
        
        format = format || 'YYYY-MM-DD';
        
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        
        return format
            .replace('YYYY', year)
            .replace('MM', month)
            .replace('DD', day)
            .replace('HH', hours)
            .replace('mm', minutes)
            .replace('ss', seconds);
    }
    
    /**
     * Get the difference between two dates in days
     * @param {Date} date1 - First date
     * @param {Date} date2 - Second date
     * @returns {number} Number of days difference
     */
    function getDaysDifference(date1, date2) {
        if (!(date1 instanceof Date) || !(date2 instanceof Date)) {
            console.warn('getDaysDifference: Invalid dates');
            return 0;
        }
        
        const oneDay = 24 * 60 * 60 * 1000; // milliseconds in a day
        return Math.round(Math.abs((date1 - date2) / oneDay));
    }
    
    // ========================================================================
    // DOM UTILITIES
    // ========================================================================
    
    /**
     * Add a class to an element
     * @param {HTMLElement} element - The DOM element
     * @param {string} className - The class name to add
     */
    function addClass(element, className) {
        if (!element || !className) {
            console.warn('addClass: Invalid parameters');
            return;
        }
        
        if (element.classList) {
            element.classList.add(className);
        } else {
            element.className += ' ' + className;
        }
    }
    
    /**
     * Remove a class from an element
     * @param {HTMLElement} element - The DOM element
     * @param {string} className - The class name to remove
     */
    function removeClass(element, className) {
        if (!element || !className) {
            console.warn('removeClass: Invalid parameters');
            return;
        }
        
        if (element.classList) {
            element.classList.remove(className);
        } else {
            element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        }
    }
    
    /**
     * Toggle a class on an element
     * @param {HTMLElement} element - The DOM element
     * @param {string} className - The class name to toggle
     */
    function toggleClass(element, className) {
        if (!element || !className) {
            console.warn('toggleClass: Invalid parameters');
            return;
        }
        
        if (element.classList) {
            element.classList.toggle(className);
        } else {
            if (element.className.indexOf(className) >= 0) {
                removeClass(element, className);
            } else {
                addClass(element, className);
            }
        }
    }
    
    /**
     * Check if an element has a specific class
     * @param {HTMLElement} element - The DOM element
     * @param {string} className - The class name to check
     * @returns {boolean} True if element has the class
     */
    function hasClass(element, className) {
        if (!element || !className) {
            console.warn('hasClass: Invalid parameters');
            return false;
        }
        
        if (element.classList) {
            return element.classList.contains(className);
        } else {
            return new RegExp('(^| )' + className + '( |$)', 'gi').test(element.className);
        }
    }
    
    // ========================================================================
    // LOCAL STORAGE UTILITIES
    // ========================================================================
    
    /**
     * Save data to localStorage
     * @param {string} key - The storage key
     * @param {*} value - The value to store
     */
    function saveToStorage(key, value) {
        if (!key) {
            console.warn('saveToStorage: Key is required');
            return;
        }
        
        try {
            const serialized = JSON.stringify(value);
            localStorage.setItem(key, serialized);
            console.log('Saved to storage:', key);
        } catch (error) {
            console.error('Error saving to storage:', error);
        }
    }
    
    /**
     * Retrieve data from localStorage
     * @param {string} key - The storage key
     * @returns {*} The stored value or null
     */
    function getFromStorage(key) {
        if (!key) {
            console.warn('getFromStorage: Key is required');
            return null;
        }
        
        try {
            const serialized = localStorage.getItem(key);
            if (serialized === null) {
                return null;
            }
            return JSON.parse(serialized);
        } catch (error) {
            console.error('Error reading from storage:', error);
            return null;
        }
    }
    
    /**
     * Remove data from localStorage
     * @param {string} key - The storage key
     */
    function removeFromStorage(key) {
        if (!key) {
            console.warn('removeFromStorage: Key is required');
            return;
        }
        
        try {
            localStorage.removeItem(key);
            console.log('Removed from storage:', key);
        } catch (error) {
            console.error('Error removing from storage:', error);
        }
    }
    
    // ========================================================================
    // VALIDATION UTILITIES
    // ========================================================================
    
    /**
     * Validate an email address
     * @param {string} email - The email address to validate
     * @returns {boolean} True if valid
     */
    function isValidEmail(email) {
        if (!email || typeof email !== 'string') {
            return false;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    /**
     * Validate a URL
     * @param {string} url - The URL to validate
     * @returns {boolean} True if valid
     */
    function isValidUrl(url) {
        if (!url || typeof url !== 'string') {
            return false;
        }
        
        try {
            new URL(url);
            return true;
        } catch (error) {
            return false;
        }
    }
    
    /**
     * Validate a phone number (basic validation)
     * @param {string} phone - The phone number to validate
     * @returns {boolean} True if valid
     */
    function isValidPhone(phone) {
        if (!phone || typeof phone !== 'string') {
            return false;
        }
        
        const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
        return phoneRegex.test(phone);
    }
    
    // ========================================================================
    // PUBLIC API
    // ========================================================================
    
    return {
        // String utilities
        capitalizeFirstLetter: capitalizeFirstLetter,
        toTitleCase: toTitleCase,
        truncateString: truncateString,
        stripHtmlTags: stripHtmlTags,
        
        // Array utilities
        shuffleArray: shuffleArray,
        getUniqueValues: getUniqueValues,
        chunkArray: chunkArray,
        
        // Number utilities
        formatNumber: formatNumber,
        getRandomNumber: getRandomNumber,
        roundToDecimals: roundToDecimals,
        
        // Date utilities
        formatDate: formatDate,
        getDaysDifference: getDaysDifference,
        
        // DOM utilities
        addClass: addClass,
        removeClass: removeClass,
        toggleClass: toggleClass,
        hasClass: hasClass,
        
        // Storage utilities
        saveToStorage: saveToStorage,
        getFromStorage: getFromStorage,
        removeFromStorage: removeFromStorage,
        
        // Validation utilities
        isValidEmail: isValidEmail,
        isValidUrl: isValidUrl,
        isValidPhone: isValidPhone
    };
    
})();

// Log that utilities are loaded
console.log('Website utilities loaded successfully!');
console.log('Available utilities:', Object.keys(window.WebsiteUtils));