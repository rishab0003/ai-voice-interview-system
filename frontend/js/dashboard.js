// Dashboard functionality

// Initialize dashboard on page load
document.addEventListener('DOMContentLoaded', function () {
    loadUserData();
    loadStatistics();
    initializeAnimations();
});

/**
 * Load user data from localStorage
 */
function loadUserData() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    if (!user.email) {
        // Redirect to login if not authenticated
        window.location.href = 'index.html';
        return;
    }

    // Update user name display
    if (user.full_name) {
        const firstName = user.full_name.split(' ')[0];
        const userNameEl = document.getElementById('userName');
        if (userNameEl) {
            userNameEl.textContent = firstName;
        }

        // Update user initials in avatar
        const initials = user.full_name
            .split(' ')
            .map(n => n[0])
            .join('')
            .substring(0, 2)
            .toUpperCase();

        const userInitialsEl = document.getElementById('userInitials');
        if (userInitialsEl) {
            userInitialsEl.textContent = initials;
        }
    }
}

/**
 * Load statistics (mock data for now)
 */
function loadStatistics() {
    // In a real application, this would fetch from an API
    const stats = {
        totalInterviews: 12,
        averageScore: 8.2,
        practiceTime: 24,
        improvement: 85
    };

    // Animate counter numbers
    animateStatCounter('totalInterviews', stats.totalInterviews);
}

/**
 * Animate stat counter
 */
function animateStatCounter(elementId, targetValue) {
    const element = document.getElementById(elementId);
    if (!element) return;

    const duration = 1500;
    const start = 0;
    const increment = targetValue / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= targetValue) {
            element.textContent = Math.round(targetValue);
            clearInterval(timer);
        } else {
            element.textContent = Math.round(current);
        }
    }, 16);
}

/**
 * Initialize scroll animations
 */
function initializeAnimations() {
    const animatedElements = document.querySelectorAll('.animate-fade-in-up');

    animatedElements.forEach((el, index) => {
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

/**
 * Toggle user dropdown menu
 */
function toggleUserMenu() {
    const dropdown = document.getElementById('userDropdown');
    if (dropdown) {
        dropdown.classList.toggle('active');
    }
}

/**
 * Logout function
 */
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.clear();
        window.location.href = 'index.html';
    }
}

// Close dropdown when clicking outside
document.addEventListener('click', function (event) {
    const userMenu = document.querySelector('.user-menu');
    const dropdown = document.getElementById('userDropdown');

    if (userMenu && dropdown && !userMenu.contains(event.target)) {
        dropdown.classList.remove('active');
    }
});
