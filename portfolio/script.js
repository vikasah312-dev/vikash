// ======================= JAVASCRIPT FOR VIKASH PORTFOLIO =======================
// Features: Instagram & LinkedIn integration, Copy to clipboard, Dark mode, Skill interactions, Smooth scroll & Toasts

// ----------------------------- 1. SOCIAL MEDIA CONFIGURATION ---------------------------------
// Replace these URLs with your actual profile links
const INSTAGRAM_URL = "https://www.instagram.com/lovely__vikash/";
const LINKEDIN_URL = "https://www.linkedin.com/in/vikash-r-fullstack/";  // Update with your real LinkedIn profile
const GITHUB_URL = "https://github.com/vikash-dev";                       // Update with your GitHub

// ----------------------------- 2. HELPER: SHOW TOAST NOTIFICATION ---------------------------------
function showMessage(text, duration = 2000) {
    let toast = document.getElementById('toastMsg');
    
    // Create toast element if it doesn't exist
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toastMsg';
        toast.className = 'toast-notification';
        document.body.appendChild(toast);
    }
    
    toast.textContent = text;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, duration);
}

// ----------------------------- 3. INSTAGRAM & LINKEDIN EVENT HANDLERS ---------------------------------
function setupSocialLinks() {
    // Instagram row click
    const instagramRow = document.getElementById('instagramRow');
    if (instagramRow) {
        instagramRow.addEventListener('click', () => {
            window.open(INSTAGRAM_URL, '_blank');
            showMessage(`🌿 Opening Instagram: lovely__vikash`, 1500);
        });
    }
    
    // LinkedIn row click
    const linkedinRow = document.getElementById('linkedinRow');
    if (linkedinRow) {
        linkedinRow.addEventListener('click', () => {
            window.open(LINKEDIN_URL, '_blank');
            showMessage(`🔗 Redirecting to LinkedIn profile`, 1500);
        });
    }
    
    // Social icon links in home section
    const instagramIcon = document.getElementById('instagramLink');
    if (instagramIcon) {
        instagramIcon.href = INSTAGRAM_URL;
        instagramIcon.addEventListener('click', (e) => {
            showMessage(`✨ Instagram profile opened`, 1200);
        });
    }
    
    const linkedinIcon = document.getElementById('linkedinLink');
    if (linkedinIcon) {
        linkedinIcon.href = LINKEDIN_URL;
        linkedinIcon.addEventListener('click', (e) => {
            showMessage(`💼 LinkedIn opened`, 1200);
        });
    }
    
    const githubIcon = document.getElementById('githubMock');
    if (githubIcon) {
        githubIcon.href = GITHUB_URL;
        githubIcon.addEventListener('click', (e) => {
            showMessage(`🐙 GitHub portfolio preview`, 1200);
        });
    }
    
    // Handle username text click
    const instagramHandle = document.getElementById('instagramHandle');
    if (instagramHandle) {
        instagramHandle.style.cursor = "pointer";
        instagramHandle.addEventListener('click', () => {
            window.open(INSTAGRAM_URL, '_blank');
            showMessage(`🌐 Opening Instagram`, 1000);
        });
    }
    
    const linkedinHandle = document.getElementById('linkedinHandle');
    if (linkedinHandle) {
        linkedinHandle.style.cursor = "pointer";
        linkedinHandle.addEventListener('click', () => {
            window.open(LINKEDIN_URL, '_blank');
            showMessage(`💼 Opening LinkedIn`, 1000);
        });
    }
}

// ----------------------------- 4. COPY TO CLIPBOARD (EMAIL & PHONE) ---------------------------------
function setupCopyFeatures() {
    const emailRow = document.getElementById('emailRow');
    const phoneRow = document.getElementById('phoneRow');
    const emailText = "vikash.r@gmail.com";
    const phoneText = "+91 99527 26262";
    
    if (emailRow) {
        emailRow.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(emailText);
                const badge = document.getElementById('emailCopyBadge');
                if (badge) {
                    const originalText = badge.textContent;
                    badge.textContent = '✓ copied!';
                    setTimeout(() => { badge.textContent = originalText; }, 1800);
                }
                showMessage(`📧 Email copied: ${emailText}`, 1500);
            } catch(err) {
                showMessage("Could not copy email", 1000);
            }
        });
    }
    
    if (phoneRow) {
        phoneRow.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(phoneText);
                const badge = document.getElementById('phoneCopyBadge');
                if (badge) {
                    const originalText = badge.textContent;
                    badge.textContent = '✓ copied!';
                    setTimeout(() => { badge.textContent = originalText; }, 1800);
                }
                showMessage(`📞 Phone number copied`, 1500);
            } catch(err) {
                showMessage("Could not copy phone", 1000);
            }
        });
    }
}

// ----------------------------- 5. INTERACTIVE SKILL CHIPS (TOGGLE HIGHLIGHT) ---------------------------------
function setupSkillInteractions() {
    const skillChips = document.querySelectorAll('.skill-chip');
    const skillFeedbackDiv = document.getElementById('skillFeedback');
    
    skillChips.forEach(chip => {
        chip.addEventListener('click', (e) => {
            e.stopPropagation();
            chip.classList.toggle('active-skill');
            const skillName = chip.innerText;
            const isActive = chip.classList.contains('active-skill');
            
            if (skillFeedbackDiv) {
                if (isActive) {
                    skillFeedbackDiv.innerHTML = `✨ "${skillName}" highlighted — I'm proficient and always improving! ✨`;
                    setTimeout(() => {
                        if (skillFeedbackDiv.innerHTML.includes("highlighted")) {
                            skillFeedbackDiv.innerHTML = '';
                        }
                    }, 2000);
                } else {
                    skillFeedbackDiv.innerHTML = `🔍 ${skillName} — still one of my core tools.`;
                    setTimeout(() => {
                        if (skillFeedbackDiv.innerHTML.includes("core tools")) {
                            skillFeedbackDiv.innerHTML = '';
                        }
                    }, 1500);
                }
            }
            
            // Mini animation
            chip.style.transform = "scale(0.96)";
            setTimeout(() => { chip.style.transform = ""; }, 120);
        });
    });
}

// ----------------------------- 6. DARK MODE TOGGLE WITH LOCALSTORAGE ---------------------------------
function setupDarkMode() {
    const themeBtn = document.getElementById('themeToggle');
    if (!themeBtn) return;
    
    // Load saved theme
    const currentTheme = localStorage.getItem('portfolio-theme');
    if (currentTheme === 'dark') {
        document.body.classList.add('dark');
        themeBtn.innerHTML = '<i class="fas fa-sun"></i> Light';
    } else {
        themeBtn.innerHTML = '<i class="fas fa-moon"></i> Dark';
    }
    
    // Toggle theme
    themeBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark');
        const isDark = document.body.classList.contains('dark');
        localStorage.setItem('portfolio-theme', isDark ? 'dark' : 'light');
        themeBtn.innerHTML = isDark ? '<i class="fas fa-sun"></i> Light' : '<i class="fas fa-moon"></i> Dark';
        showMessage(isDark ? '🌙 Dark mode activated' : '☀️ Light mode restored', 1000);
    });
}

// ----------------------------- 7. SMOOTH SCROLL FOR NAVIGATION LINKS ---------------------------------
function setupSmoothScroll() {
    document.querySelectorAll('.nav-links a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                showMessage(`📍 Navigated to ${targetId}`, 800);
            }
        });
    });
}

// ----------------------------- 8. PROJECT CARD INTERACTIONS ---------------------------------
function setupProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const titleCard = card.querySelector('h3')?.innerText;
            showMessage(`🔍 More about "${titleCard}" — open to discuss!`, 1500);
        });
    });
    
    // Tech tags copy feature
    const techTags = document.querySelectorAll('.project-tech-tag');
    techTags.forEach(tag => {
        tag.addEventListener('click', (e) => {
            e.stopPropagation();
            const techText = tag.innerText;
            navigator.clipboard.writeText(techText).then(() => {
                showMessage(`📋 Tech stack tag copied: ${techText}`, 1200);
            }).catch(() => {});
        });
        tag.style.cursor = "pointer";
    });
}

// ----------------------------- 9. PROFILE IMAGE DOUBLE CLICK FUN ---------------------------------
function setupProfileImage() {
    const profileImg = document.querySelector('.profile-img');
    if (profileImg) {
        profileImg.addEventListener('dblclick', () => {
            showMessage("🌟 Thanks for stopping by! Let's build something great.", 1800);
        });
    }
}

// ----------------------------- 10. WELCOME TOAST ON PAGE LOAD ---------------------------------
function showWelcomeMessage() {
    setTimeout(() => {
        showMessage("👋 Hey! Click on any skill, dark mode toggle, or contact to explore!", 2800);
    }, 600);
}

// ----------------------------- 11. INITIALIZE ALL FEATURES ---------------------------------
function initPortfolio() {
    setupSocialLinks();
    setupCopyFeatures();
    setupSkillInteractions();
    setupDarkMode();
    setupSmoothScroll();
    setupProjectCards();
    setupProfileImage();
    showWelcomeMessage();
    
    console.log("Portfolio JS loaded — Instagram & LinkedIn connected with copy features & dark mode.");
}

// Start everything when DOM is fully loaded
document.addEventListener('DOMContentLoaded', initPortfolio);