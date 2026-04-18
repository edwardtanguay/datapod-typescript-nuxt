document.addEventListener('DOMContentLoaded', () => {
    // Fade-in helper
    const fadeIn = (el) => {
        el.style.transition = 'opacity 1.2s ease-out, transform 1.2s ease-out';
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
    };

    // Initial fade-in for the softgate area if it exists
    const softgateArea = document.getElementById('softgate-area');
    if (softgateArea) {
        setTimeout(() => fadeIn(softgateArea), 200);
    }

    // Keypad Logic
    let currentCode = "";
    const dotContainer = document.querySelector('.dot-container');
    const validHash = "534343"; 
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

    document.querySelectorAll('.key[data-val]').forEach(key => {
        key.addEventListener('click', () => {
            if (currentCode.length < 10) {
                currentCode += key.getAttribute('data-val');
                updateDots();
                
                // Use the deobfuscated check function
                if (checkSoftgatePassword(currentCode, validHash)) {
                    if (softgateArea) softgateArea.style.display = 'none';
                    if (contentArea) {
                        contentArea.style.display = 'block';
                        setTimeout(() => fadeIn(contentArea), 10);
                    }
                }
            }
        });
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
