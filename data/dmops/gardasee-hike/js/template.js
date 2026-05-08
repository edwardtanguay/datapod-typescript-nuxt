document.addEventListener('DOMContentLoaded', () => {
    // Fade-in helper
    const fadeIn = (el) => {
        el.style.transition = 'opacity 0.3s ease-out, transform 0.3s ease-out';
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
    };

    // Initial fade-in for the softgate area if it exists
    // Keypad and Content Area Logic
    let currentCode = "";
    const dotContainer = document.querySelector('.dot-container');
    const validHash = "131343"; 
    const softgateArea = document.getElementById('softgate-area');
    const contentArea = document.getElementById('content-area');

    const updateDots = () => {
        if (!dotContainer) return;
        dotContainer.innerHTML = "";
        for (let i = 0; i < currentCode.length; i++) {
            const dot = document.createElement('span');
            dot.className = 'dot active';
            dotContainer.appendChild(dot);
        }
    };

    const unlockSite = (saveToStorage = true) => {
        if (softgateArea) softgateArea.style.display = 'none';
        if (contentArea) {
            contentArea.style.display = 'block';
            setTimeout(() => fadeIn(contentArea), 10);
        }
        if (saveToStorage) {
            localStorage.setItem('gs_logged_in', 'true');
        }
    };

    const lockSite = () => {
        if (contentArea) {
            contentArea.style.display = 'none';
            contentArea.style.opacity = '0';
            contentArea.style.transform = 'translateY(30px)';
        }
        if (softgateArea) {
            softgateArea.style.display = 'block';
            fadeIn(softgateArea);
        }
        currentCode = "";
        updateDots();
        localStorage.removeItem('gs_logged_in');
    };

    // Check initial state
    if (localStorage.getItem('gs_logged_in') === 'true') {
        unlockSite(false);
    } else {
        if (softgateArea) {
            setTimeout(() => fadeIn(softgateArea), 100);
        }
    }

    document.querySelectorAll('.key[data-val]').forEach(key => {
        key.addEventListener('click', () => {
            if (currentCode.length < 10) {
                currentCode += key.getAttribute('data-val');
                updateDots();
                
                if (checkSoftgatePassword(currentCode, validHash)) {
                    unlockSite();
                }
            }
        });
    });

    document.getElementById('btn-logout')?.addEventListener('click', () => {
        lockSite();
    });

    document.getElementById('btn-clear')?.addEventListener('click', () => {
        currentCode = "";
        updateDots();
    });

    document.getElementById('btn-del')?.addEventListener('click', () => {
        currentCode = currentCode.slice(0, -1);
        updateDots();
    });

    // Parallax effect
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (header) {
            let offset = window.pageYOffset;
            header.style.backgroundPositionY = (offset * 0.7) + 'px';
        }
    });

    // Font Size Controls
    let currentScale = parseInt(localStorage.getItem('gs_font_scale')) || 100;
    const updateFontScale = (saveToStorage = true) => {
        document.documentElement.style.setProperty('--content-scale', `${currentScale}%`);
        if (saveToStorage) localStorage.setItem('gs_font_scale', currentScale);
    };
    updateFontScale(false); // Apply initial scale

    document.getElementById('btn-font-inc')?.addEventListener('click', () => {
        if (currentScale < 250) {
            currentScale += 10;
            updateFontScale();
        }
    });

    document.getElementById('btn-font-dec')?.addEventListener('click', () => {
        if (currentScale > 50) {
            currentScale -= 10;
            updateFontScale();
        }
    });

    // Theme Toggle Logic
    const themeBtn = document.getElementById('btn-theme-toggle');
    const sunIcon = themeBtn?.querySelector('.icon-sun');
    const moonIcon = themeBtn?.querySelector('.icon-moon');
    const containers = document.querySelectorAll('.container');

    const applyTheme = (isDark, saveToStorage = true) => {
        containers.forEach(container => {
            if (isDark) {
                container.classList.add('dark-mode');
            } else {
                container.classList.remove('dark-mode');
            }
        });
        if (sunIcon) sunIcon.style.display = isDark ? 'none' : 'block';
        if (moonIcon) moonIcon.style.display = isDark ? 'block' : 'none';
        if (saveToStorage) localStorage.setItem('gs_theme', isDark ? 'dark' : 'light');
    };

    // Load initial theme
    const savedTheme = localStorage.getItem('gs_theme') || 'dark';
    if (savedTheme === 'dark') {
        applyTheme(true, false);
    } else {
        applyTheme(false, false);
    }

    themeBtn?.addEventListener('click', () => {
        if (containers.length > 0) {
            // Trigger animation
            themeBtn.classList.remove('flip-anim');
            void themeBtn.offsetWidth; // Force reflow
            themeBtn.classList.add('flip-anim');

            // Stabilize in flat position before allowing hover tilt to return
            setTimeout(() => {
                themeBtn.classList.remove('flip-anim');
            }, 600);

            const isNowDark = !containers[0].classList.contains('dark-mode');
            applyTheme(isNowDark);
        }
    });
});

const createSoftgateHash = (password) => {
    let hex = "";
    for (let i = 0; i < password.length; i++) {
        hex += password.charCodeAt(i).toString(16).padStart(2, '0');
    }
    return hex.split("").reverse().join("");
};

const checkSoftgatePassword = (password, hash) => {
    try {
        const hex = hash.split("").reverse().join("");
        let decryptedPassword = "";
        for (let i = 0; i < hex.length; i += 2) {
            decryptedPassword += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
        }
        return decryptedPassword === password;
    } catch (e) {
        return false;
    }
};
