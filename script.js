// Modern Interactive Portfolio with Discovery Mechanics

// Discovery State
let discoveryState = {
    discovered: new Set(),
    totalSections: 0,
    allRevealed: false
};

// GitHub Configuration
const GITHUB_USERNAME = 'iggydv';
const GITHUB_API_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos`;

// Bot Detection and Protection
function initBotProtection() {
    // Detect headless browsers and bots
    const isBot = /bot|crawler|spider|crawling|headless|phantom|slurp|scraper/i.test(navigator.userAgent);
    const hasWebDriver = navigator.webdriver;
    const hasPlugins = navigator.plugins.length === 0;
    const hasLanguages = navigator.languages.length === 0;
    
    // Bot score (higher = more likely a bot)
    let botScore = 0;
    if (isBot) botScore += 3;
    if (hasWebDriver) botScore += 2;
    if (hasPlugins && hasLanguages) botScore += 1;
    
    // If likely malicious bot, add honeypot
    if (botScore >= 3) {
        const honeypot = document.createElement('a');
        honeypot.href = '/admin-login';
        honeypot.style.display = 'none';
        honeypot.setAttribute('aria-hidden', 'true');
        document.body.appendChild(honeypot);
    }
    
    return botScore < 3; // Return false if definitely a bot
}

// Rate limiting for API calls
const rateLimiter = {
    calls: [],
    maxCalls: 10,
    timeWindow: 60000, // 1 minute
    
    canMakeCall() {
        const now = Date.now();
        this.calls = this.calls.filter(time => now - time < this.timeWindow);
        
        if (this.calls.length >= this.maxCalls) {
            console.warn('Rate limit exceeded. Please wait before making more requests.');
            return false;
        }
        
        this.calls.push(now);
        return true;
    }
};

document.addEventListener('DOMContentLoaded', function() {
    const isHuman = initBotProtection();
    
    if (isHuman) {
        initPortfolio();
        initCompanyLogoFallbacks();
        initCustomCursor();
    } else {
        // Render basic content for bots without interactive features
        document.querySelectorAll('.discoverable').forEach(section => {
            section.classList.add('discovered');
            section.style.filter = 'none';
        });
    }
});

function initPortfolio() {
    // Initialize discovery mechanics
    initDiscoveryMechanics();
    
    // Load GitHub projects
    loadGitHubProjects();
    
    // Load Goodreads books
    loadGoodreadsBooks();
    
    // Initialize animations
    initAnimations();
    
    // Initialize particles
    initParticles();
    
    // Check for saved discovery state
    loadDiscoveryState();
    
    // Initialize download button
    initDownloadButton();
}

// Discovery Mechanics
function initDiscoveryMechanics() {
    const sections = document.querySelectorAll('.discoverable');
    discoveryState.totalSections = sections.length;
    
    // Update total sections display
    document.getElementById('total-sections').textContent = discoveryState.totalSections;
    
    sections.forEach(section => {
        // Hover to discover
        section.addEventListener('mouseenter', function() {
            if (!section.classList.contains('discovered') && !discoveryState.allRevealed) {
                discoverSection(section);
            }
        });
        
        // Click to discover on mobile
        section.addEventListener('click', function() {
            if (!section.classList.contains('discovered') && !discoveryState.allRevealed) {
                discoverSection(section);
            }
        });
    });
}

function discoverSection(section) {
    const sectionId = section.dataset.sectionId;
    
    if (discoveryState.discovered.has(sectionId)) {
        return;
    }
    
    // Mark as discovered
    section.classList.add('discovered');
    section.classList.add('revealed');
    discoveryState.discovered.add(sectionId);
    
    // Play discovery sound
    playDiscoverySound();
    
    // Update progress
    updateDiscoveryProgress();
    
    // Save state
    saveDiscoveryState();
    
    // Animate skill bars if this is the skills section
    if (sectionId === 'skills') {
        animateSkillBars(section);
    }
    
    // Animate level bar if this is in header
    animateLevelBar();
    
    // Check if all discovered
    if (discoveryState.discovered.size === discoveryState.totalSections) {
        setTimeout(() => {
            revealAllSections();
        }, 1000);
    }
}

function updateDiscoveryProgress() {
    const count = discoveryState.discovered.size;
    const percentage = (count / discoveryState.totalSections) * 100;
    
    document.getElementById('discovered-count').textContent = count;
    document.getElementById('progress-fill').style.width = percentage + '%';
    
    // Animate the counter
    animateProgressCounter();
}

function animateProgressCounter() {
    const progressDiv = document.querySelector('.discovery-progress');
    progressDiv.style.transform = 'scale(1.1)';
    setTimeout(() => {
        progressDiv.style.transform = 'scale(1)';
    }, 300);
}

function revealAllSections(silent = false) {
    discoveryState.allRevealed = true;
    
    const sections = document.querySelectorAll('.discoverable');
    sections.forEach(section => {
        if (!section.classList.contains('discovered')) {
            section.classList.add('discovered');
            section.classList.add('revealed');
        }
    });
    
    // Only show celebrations if not silent mode (for downloads)
    if (!silent) {
        // Play completion sound
        playCompletionSound();
        
        // Show celebration effect
        showCelebration();
    }
    
    // Update progress indicator
    const progressDiv = document.querySelector('.discovery-progress');
    progressDiv.style.background = 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)';
    document.querySelector('.progress-text').textContent = 'All Discovered! 🎉';
}

function showCelebration() {
    // Create elegant particle effect - staggered release
    for (let i = 0; i < 80; i++) {
        setTimeout(() => createConfetti(), i * 15); // Staggered for smooth effect
    }
}

function createConfetti() {
    const particle = document.createElement('div');
    
    // Varied particle types for elegance
    const types = ['circle', 'square', 'line', 'star'];
    const type = types[Math.floor(Math.random() * types.length)];
    
    // Elegant color palette
    const colors = [
        'rgba(102, 126, 234, 0.8)',   // Primary blue
        'rgba(118, 75, 162, 0.8)',    // Purple
        'rgba(240, 147, 251, 0.8)',   // Pink
        'rgba(255, 255, 255, 0.9)'    // White sparkle
    ];
    
    const size = Math.random() * 6 + 3; // 3-9px
    const color = colors[Math.floor(Math.random() * colors.length)];
    const startX = Math.random() * window.innerWidth;
    const drift = (Math.random() - 0.5) * 200; // Subtle horizontal drift
    
    // Base styles
    particle.style.position = 'fixed';
    particle.style.left = startX + 'px';
    particle.style.top = '-20px';
    particle.style.zIndex = '10000';
    particle.style.pointerEvents = 'none';
    
    // Shape-specific styling
    if (type === 'circle') {
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.borderRadius = '50%';
        particle.style.background = color;
        particle.style.boxShadow = `0 0 ${size * 2}px ${color}`;
    } else if (type === 'square') {
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.background = color;
        particle.style.borderRadius = '2px';
        particle.style.boxShadow = `0 0 ${size}px ${color}`;
    } else if (type === 'line') {
        particle.style.width = size * 2 + 'px';
        particle.style.height = '2px';
        particle.style.background = color;
        particle.style.boxShadow = `0 0 ${size}px ${color}`;
    } else if (type === 'star') {
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.background = color;
        particle.style.clipPath = 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)';
        particle.style.boxShadow = `0 0 ${size * 3}px ${color}`;
    }
    
    document.body.appendChild(particle);
    
    // Elegant animation with physics
    const duration = 2000 + Math.random() * 1500; // 2-3.5s
    const fallDistance = window.innerHeight + 50;
    const rotation = (Math.random() - 0.5) * 360;
    const scale = Math.random() * 0.5 + 0.5; // 0.5-1
    
    particle.animate([
        { 
            transform: 'translateY(0) translateX(0) rotate(0deg) scale(1)', 
            opacity: 0 
        },
        { 
            transform: `translateY(${fallDistance * 0.3}px) translateX(${drift * 0.3}px) rotate(${rotation * 0.3}deg) scale(${scale})`, 
            opacity: 1,
            offset: 0.1
        },
        { 
            transform: `translateY(${fallDistance * 0.7}px) translateX(${drift * 0.7}px) rotate(${rotation * 0.7}deg) scale(${scale})`, 
            opacity: 0.8,
            offset: 0.6
        },
        { 
            transform: `translateY(${fallDistance}px) translateX(${drift}px) rotate(${rotation}deg) scale(0.3)`, 
            opacity: 0 
        }
    ], {
        duration: duration,
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    });
    
    setTimeout(() => {
        particle.remove();
    }, duration);
}

// Save and Load Discovery State
function saveDiscoveryState() {
    localStorage.setItem('portfolioDiscoveryState', JSON.stringify({
        discovered: Array.from(discoveryState.discovered),
        allRevealed: discoveryState.allRevealed
    }));
}

function loadDiscoveryState() {
    const saved = localStorage.getItem('portfolioDiscoveryState');
    if (saved) {
        const state = JSON.parse(saved);
        discoveryState.discovered = new Set(state.discovered);
        discoveryState.allRevealed = state.allRevealed;
        
        // Apply discovered state
        state.discovered.forEach(sectionId => {
            const section = document.querySelector(`[data-section-id="${sectionId}"]`);
            if (section) {
                section.classList.add('discovered');
            }
        });
        
        // Update progress
        updateDiscoveryProgress();
        
        // If all revealed, update UI
        if (state.allRevealed) {
            const progressDiv = document.querySelector('.discovery-progress');
            progressDiv.style.background = 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)';
            document.querySelector('.progress-text').textContent = 'All Discovered! 🎉';
        }
        
        // Animate skill bars if skills section is discovered
        if (state.discovered.includes('skills')) {
            const skillsSection = document.querySelector('[data-section-id="skills"]');
            if (skillsSection) {
                animateSkillBars(skillsSection);
            }
        }
        
        // Animate level bar
        animateLevelBar();
    }
}

// GitHub Projects Integration
async function loadGitHubProjects() {
    const container = document.getElementById('github-projects');
    
    // Check rate limit before making API call
    if (!rateLimiter.canMakeCall()) {
        container.innerHTML = '<div class="github-loading">Rate limit reached. Please refresh in a moment.</div>';
        return;
    }
    
    try {
        const response = await fetch(GITHUB_API_URL + '?sort=updated&per_page=20');
        
        if (!response.ok) {
            throw new Error('Failed to fetch GitHub projects');
        }
        
        const repos = await response.json();
        
        // Clear loading message
        container.innerHTML = '';
        
        // Filter out forks and sort by stars
        const filteredRepos = repos
            .filter(repo => !repo.fork)
            .sort((a, b) => b.stargazers_count - a.stargazers_count)
            .slice(0, 10);
        
        if (filteredRepos.length === 0) {
            container.innerHTML = '<div class="github-loading">No public repositories found.</div>';
            return;
        }
        
        // Display repositories
        filteredRepos.forEach(repo => {
            const projectDiv = createProjectCard(repo);
            container.appendChild(projectDiv);
        });
        
        // Add smooth scroll behavior
        initCarouselScroll(container);
        
    } catch (error) {
        console.error('Error loading GitHub projects:', error);
        container.innerHTML = `
            <div class="github-loading">
                Unable to load projects. 
                <a href="https://github.com/${GITHUB_USERNAME}" target="_blank" style="color: white; text-decoration: underline;">
                    Visit my GitHub
                </a>
            </div>
        `;
    }
}

function initCarouselScroll(container) {
    // Improved scroll for both mouse wheel and trackpad
    container.addEventListener('wheel', (e) => {
        e.preventDefault();
        // Use deltaY directly for more responsive scrolling
        container.scrollTop += e.deltaY;
    }, { passive: false });
}

function initGoodreadsCarouselScroll(container) {
    // Improved scroll for both mouse wheel and trackpad
    container.addEventListener('wheel', (e) => {
        e.preventDefault();
        // Use deltaY directly for more responsive trackpad scrolling
        container.scrollTop += e.deltaY;
    }, { passive: false });
}

function createProjectCard(repo) {
    const card = document.createElement('div');
    card.className = 'github-project';
    
    const name = document.createElement('div');
    name.className = 'project-name';
    name.innerHTML = `
        <span>📦</span>
        <a href="${repo.html_url}" target="_blank">${repo.name}</a>
    `;
    
    const description = document.createElement('div');
    description.className = 'project-description';
    description.textContent = repo.description || 'No description available';
    
    const stats = document.createElement('div');
    stats.className = 'project-stats';
    stats.innerHTML = `
        <div class="project-stat">⭐ ${repo.stargazers_count}</div>
        <div class="project-stat">🔱 ${repo.forks_count}</div>
        ${repo.language ? `<span class="project-language">${repo.language}</span>` : ''}
    `;
    
    card.appendChild(name);
    card.appendChild(description);
    card.appendChild(stats);
    
    return card;
}

// Animations
function initAnimations() {
    // Animate header on load
    const header = document.querySelector('.glass-header');
    header.style.opacity = '0';
    header.style.transform = 'translateY(-20px)';
    
    setTimeout(() => {
        header.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        header.style.opacity = '1';
        header.style.transform = 'translateY(0)';
    }, 100);
    
    // Stagger section animations
    const sections = document.querySelectorAll('.glass-section, .glass-footer');
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            section.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, 200 + (index * 100));
    });
}

function animateSkillBars(section) {
    const skillBars = section.querySelectorAll('.skill-fill');
    skillBars.forEach((bar, index) => {
        setTimeout(() => {
            const skillLevel = bar.dataset.skill;
            bar.style.width = skillLevel + '%';
        }, index * 100);
    });
}

function animateLevelBar() {
    const levelBar = document.querySelector('.level-fill');
    if (levelBar) {
        setTimeout(() => {
            const level = levelBar.dataset.level;
            levelBar.style.width = level + '%';
        }, 500);
    }
}

// Particles Background
function initParticles() {
    const canvas = document.getElementById('particles-canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    const particleCount = 80;
    
    const colors = ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe', '#43e97b'];
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.radius = Math.random() * 2 + 1;
            this.color = colors[Math.floor(Math.random() * colors.length)];
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    }
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Update and draw particles
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        // Draw connections
        particles.forEach((p1, i) => {
            particles.slice(i + 1).forEach(p2 => {
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 150) {
                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.strokeStyle = `rgba(255, 255, 255, ${0.2 * (1 - distance / 150)})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            });
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Sound Effects
function playDiscoverySound() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    // Pleasant chime sound
    const frequencies = [523.25, 659.25, 783.99]; // C5, E5, G5
    frequencies.forEach((freq, index) => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(freq, audioContext.currentTime + index * 0.1);
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime + index * 0.1);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + index * 0.1 + 0.5);
        
        oscillator.start(audioContext.currentTime + index * 0.1);
        oscillator.stop(audioContext.currentTime + index * 0.1 + 0.5);
    });
}

function playCompletionSound() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    // Victory fanfare
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, index) => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(freq, audioContext.currentTime + index * 0.15);
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.15, audioContext.currentTime + index * 0.15);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + index * 0.15 + 0.4);
        
        oscillator.start(audioContext.currentTime + index * 0.15);
        oscillator.stop(audioContext.currentTime + index * 0.15 + 0.4);
    });
}

// Easter Egg: Konami Code
let konamiCode = [];
const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.keyCode);
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        activateEasterEgg();
        konamiCode = [];
    }
});

function activateEasterEgg() {
    // Reveal all sections instantly
    revealAllSections();
    
    // Extra celebration - elegant particle burst
    for (let i = 0; i < 150; i++) {
        setTimeout(() => createConfetti(), i * 20);
    }
    
    // Show message
    const message = document.createElement('div');
    message.style.position = 'fixed';
    message.style.top = '50%';
    message.style.left = '50%';
    message.style.transform = 'translate(-50%, -50%)';
    message.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    message.style.color = 'white';
    message.style.padding = '32px 48px';
    message.style.borderRadius = '24px';
    message.style.fontSize = '24px';
    message.style.fontWeight = 'bold';
    message.style.zIndex = '10001';
    message.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.3)';
    message.textContent = '🎮 Secret Unlocked! 🎮';
    
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.style.transition = 'all 0.5s ease';
        message.style.opacity = '0';
        message.style.transform = 'translate(-50%, -50%) scale(0.8)';
        setTimeout(() => message.remove(), 500);
    }, 2000);
}

// Goodreads state for infinite scroll
const goodreadsState = {
    userId: '184024809',
    currentlyReadingBooks: [],
    readBooks: [],
    allReadBooks: [],
    displayedCount: 0,
    booksPerLoad: 10,
    isLoading: false,
    allLoaded: false
};

// Goodreads Books Integration with infinite scroll
async function loadGoodreadsBooks() {
    const container = document.getElementById('goodreads-widget');
    
    container.innerHTML = '<div class="goodreads-loading">Loading your books...</div>';
    
    console.log('=== GOODREADS FETCH START ===');
    
    // Fetch currently-reading and ALL read books in parallel
    const [currentlyReading, allReadBooks] = await Promise.all([
        fetchGoodreadsShelf(goodreadsState.userId, 'currently-reading', 50), // Get all currently reading
        fetchGoodreadsShelf(goodreadsState.userId, 'read', 1000) // Get all read books (max RSS limit)
    ]);
    
    // Store in state
    goodreadsState.currentlyReadingBooks = currentlyReading;
    goodreadsState.allReadBooks = allReadBooks;
    
    console.log(`✅ Fetched ${currentlyReading.length} currently-reading + ${allReadBooks.length} read books`);
    
    if (currentlyReading.length > 0 || allReadBooks.length > 0) {
        // Display initial batch
        loadMoreGoodreadsBooks(container, true);
        
        // Setup infinite scroll
        setupGoodreadsInfiniteScroll(container);
        
        console.log('=== GOODREADS FETCH END ===');
    } else {
        console.error('❌ No books loaded');
        displayGoodreadsFallback(container);
    }
}

// Load more books (for infinite scroll)
function loadMoreGoodreadsBooks(container, isInitial = false) {
    if (goodreadsState.isLoading || goodreadsState.allLoaded) return;
    
    goodreadsState.isLoading = true;
    
    // Get next batch
    const startIndex = isInitial ? 0 : goodreadsState.displayedCount - goodreadsState.currentlyReadingBooks.length;
    const endIndex = startIndex + goodreadsState.booksPerLoad;
    
    let booksToAdd = [];
    
    if (isInitial) {
        // Initial load: all currently reading + first batch of read books
        booksToAdd = [
            ...goodreadsState.currentlyReadingBooks,
            ...goodreadsState.allReadBooks.slice(0, goodreadsState.booksPerLoad)
        ];
        goodreadsState.displayedCount = booksToAdd.length;
    } else {
        // Subsequent loads: next batch of read books
        booksToAdd = goodreadsState.allReadBooks.slice(startIndex, endIndex);
        goodreadsState.displayedCount += booksToAdd.length;
    }
    
    // Check if all loaded
    if (goodreadsState.displayedCount >= goodreadsState.currentlyReadingBooks.length + goodreadsState.allReadBooks.length) {
        goodreadsState.allLoaded = true;
    }
    
    // Append books
    if (isInitial) {
        container.innerHTML = '';
    }
    
    booksToAdd.forEach(book => {
        const bookCard = createGoodreadsBookCard(book);
        container.appendChild(bookCard);
    });
    
    // Add smooth scroll behavior
    if (isInitial) {
        initGoodreadsCarouselScroll(container);
    }
    
    // Add loading indicator if more books available
    const existingLoader = container.querySelector('.loading-more');
    if (existingLoader) existingLoader.remove();
    
    if (!goodreadsState.allLoaded) {
        const loader = document.createElement('div');
        loader.className = 'loading-more';
        loader.innerHTML = '<div class="goodreads-loading">Scroll for more books...</div>';
        container.appendChild(loader);
    } else {
        const endMessage = document.createElement('div');
        endMessage.className = 'end-message';
        endMessage.innerHTML = `<div class="goodreads-loading">All ${goodreadsState.displayedCount} books loaded! 📚</div>`;
        container.appendChild(endMessage);
    }
    
    goodreadsState.isLoading = false;
    console.log(`📚 Displayed ${goodreadsState.displayedCount} / ${goodreadsState.currentlyReadingBooks.length + goodreadsState.allReadBooks.length} books`);
}

// Setup infinite scroll detection
function setupGoodreadsInfiniteScroll(container) {
    container.addEventListener('scroll', () => {
        // Check if near bottom (within 100px)
        const scrollPosition = container.scrollTop + container.clientHeight;
        const scrollHeight = container.scrollHeight;
        
        if (scrollPosition >= scrollHeight - 100 && !goodreadsState.isLoading && !goodreadsState.allLoaded) {
            console.log('📖 Loading more books...');
            loadMoreGoodreadsBooks(container, false);
        }
    });
}

// Create individual book card element
function createGoodreadsBookCard(book) {
    const card = document.createElement('a');
    card.href = book.link;
    card.target = '_blank';
    card.rel = 'noopener noreferrer';
    card.className = `book-card ${book.isCurrentlyReading ? 'currently-reading' : ''}`;
    
    card.innerHTML = `
        <img src="${book.imageUrl || 'https://via.placeholder.com/120x180?text=No+Cover'}" 
             alt="${book.title}" 
             class="book-cover"
             onerror="this.src='https://via.placeholder.com/120x180?text=No+Cover'">
        <div class="book-info">
            ${book.isCurrentlyReading ? '<div class="reading-badge">📖 Currently Reading</div>' : ''}
            <div class="book-title">${book.title}</div>
            <div class="book-author">${book.author}</div>
            ${book.rating > 0 ? `<div class="book-rating">★ ${book.rating}/5</div>` : ''}
        </div>
    `;
    
    return card;
}

// Fetch books from a specific Goodreads shelf with multiple proxy fallbacks
async function fetchGoodreadsShelf(userId, shelf, limit = 10) {
    const rssUrl = `https://www.goodreads.com/review/list_rss/${userId}?shelf=${shelf}&sort=date_read`;
    
    // Multiple proxy options to try
    const proxyOptions = [
        {
            name: 'AllOrigins (JSON)',
            url: `https://api.allorigins.win/get?url=${encodeURIComponent(rssUrl)}`,
            parseResponse: async (response) => {
                const data = await response.json();
                return data.contents;
            }
        },
        {
            name: 'CORS Proxy IO',
            url: `https://corsproxy.io/?${encodeURIComponent(rssUrl)}`,
            parseResponse: async (response) => {
                return await response.text();
            }
        },
        {
            name: 'ThingProxy',
            url: `https://thingproxy.freeboard.io/fetch/${rssUrl}`,
            parseResponse: async (response) => {
                return await response.text();
            }
        }
    ];
    
    console.log(`📚 Fetching ${shelf} shelf...`);
    
    // Try each proxy
    for (const proxy of proxyOptions) {
        try {
            console.log(`  Trying ${proxy.name}...`);
            
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 8000); // 8s timeout
            
            const response = await fetch(proxy.url, {
                method: 'GET',
                signal: controller.signal
            });
            
            clearTimeout(timeoutId);
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            
            const xmlContent = await proxy.parseResponse(response);
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlContent, 'text/xml');
            
            // Check for parsing errors
            const parseError = xmlDoc.querySelector('parsererror');
            if (parseError) {
                throw new Error('XML parsing failed');
            }
            
            const items = xmlDoc.querySelectorAll('item');
            
            if (items.length === 0) {
                throw new Error('No items in feed');
            }
            
            console.log(`  ✓ ${proxy.name}: Found ${items.length} books in ${shelf}`);
            
            const books = Array.from(items).slice(0, limit).map(item => {
                const title = item.querySelector('title')?.textContent || 'Unknown';
                const author = item.querySelector('author_name')?.textContent || 'Unknown Author';
                const rating = item.querySelector('user_rating')?.textContent || '0';
                const imageUrl = item.querySelector('book_large_image_url')?.textContent || 
                               item.querySelector('book_medium_image_url')?.textContent || 
                               item.querySelector('book_image_url')?.textContent || '';
                const link = item.querySelector('link')?.textContent || '#';
                const isCurrentlyReading = shelf === 'currently-reading';
                
                return { title, author, rating, imageUrl, link, isCurrentlyReading };
            });
            
            return books;
            
        } catch (error) {
            console.warn(`  ✗ ${proxy.name} failed:`, error.message);
            continue; // Try next proxy
        }
    }
    
    // All proxies failed
    console.error(`❌ All proxies failed for ${shelf} shelf`);
    return [];
}


function displayGoodreadsFallback(container) {
    console.log('📚 Using fallback display');
    container.innerHTML = `
        <div class="goodreads-loading" style="text-align: center; padding: 30px;">
            <p style="margin-bottom: 16px; font-size: 14px;">📚 Unable to load books at the moment</p>
            <p style="font-size: 12px; color: rgba(255, 255, 255, 0.7); margin-bottom: 12px;">
                Due to network restrictions, we couldn't fetch your reading list.
            </p>
            <p style="font-size: 12px; color: rgba(255, 255, 255, 0.7); margin-bottom: 16px;">
                36 books read with a 4.61 average rating
            </p>
            <a href="https://www.goodreads.com/user/show/184024809-iggy-de-villiers" 
               target="_blank" 
               rel="noopener noreferrer"
               style="display: inline-block; padding: 8px 16px; background: rgba(102, 126, 234, 0.5); 
                      color: white; text-decoration: none; border-radius: 20px; font-size: 12px; 
                      transition: all 0.3s ease; border: 1px solid rgba(255, 255, 255, 0.2);"
               onmouseover="this.style.background='rgba(102, 126, 234, 0.7)'"
               onmouseout="this.style.background='rgba(102, 126, 234, 0.5)'">
                View My Goodreads Profile →
            </a>
        </div>
    `;
}

// Company Logo Fallbacks
function initCompanyLogoFallbacks() {
    const logoImages = document.querySelectorAll('.company-logo-img');
    
    logoImages.forEach(img => {
        // Store original src and alternative sources
        const originalSrc = img.src;
        const domain = originalSrc.includes('logo.clearbit.com/') 
            ? originalSrc.split('logo.clearbit.com/')[1] 
            : '';
        
        // Alternative logo sources to try
        const alternativeSources = domain ? [
            `https://logo.clearbit.com/${domain}`,
            `https://www.google.com/s2/favicons?domain=${domain}&sz=128`,
            `https://logo.clearbit.com/${domain}?size=200`,
            `https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://${domain}&size=128`
        ] : [];
        
        let attemptIndex = 0;
        
        function tryNextSource() {
            if (attemptIndex < alternativeSources.length) {
                img.src = alternativeSources[attemptIndex];
                attemptIndex++;
            } else {
                // All sources failed, use emoji fallback
                const fallbackEmoji = img.dataset.fallbackEmoji || '🏢';
                
                // Create a fallback element
                const fallback = document.createElement('div');
                fallback.className = 'company-logo-fallback';
                fallback.style.fontSize = '32px';
                fallback.style.display = 'flex';
                fallback.style.alignItems = 'center';
                fallback.style.justifyContent = 'center';
                fallback.style.width = '100%';
                fallback.style.height = '100%';
                fallback.textContent = fallbackEmoji;
                
                // Replace image with fallback
                img.parentElement.appendChild(fallback);
                img.style.display = 'none';
            }
        }
        
        img.addEventListener('error', tryNextSource);
        
        // Also check if image loads successfully
        img.addEventListener('load', function() {
            // If image is too small (likely a placeholder/error), try next source
            if (this.naturalWidth < 10 || this.naturalHeight < 10) {
                tryNextSource();
            }
        });
    });
}

// Download Portfolio Function
function initDownloadButton() {
    const downloadBtn = document.getElementById('download-btn');
    
    downloadBtn.addEventListener('click', function() {
        // Quietly reveal all sections before printing (no confetti or popups)
        const wasAllRevealed = discoveryState.allRevealed;
        
        if (!wasAllRevealed) {
            // Silently reveal all sections without animations
            const sections = document.querySelectorAll('.discoverable');
            sections.forEach(section => {
                section.classList.add('discovered');
                section.style.filter = 'none';
                section.style.opacity = '1';
            });
            
            discoveryState.allRevealed = true;
            
            // Update progress display
            discoveryState.discovered = new Set();
            sections.forEach(section => {
                const sectionId = section.dataset.sectionId;
                if (sectionId) {
                    discoveryState.discovered.add(sectionId);
                }
            });
            updateDiscoveryProgress();
        }
        
        // Small delay to ensure all sections are visible, then print
        setTimeout(() => {
            window.print();
        }, 300);
    });
}

// Custom Cursor with Paint Trail
function initCustomCursor() {
    // Create custom cursor
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);
    
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    
    // Track mouse position
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Create trail dot
        createTrailDot(e.clientX, e.clientY);
    });
    
    // Smooth cursor follow
    function updateCursor() {
        // Smooth easing
        cursorX += (mouseX - cursorX) * 0.15;
        cursorY += (mouseY - cursorY) * 0.15;
        
        cursor.style.left = cursorX - 10 + 'px';
        cursor.style.top = cursorY - 10 + 'px';
        
        requestAnimationFrame(updateCursor);
    }
    updateCursor();
    
    // Scale cursor on click
    document.addEventListener('mousedown', () => {
        cursor.style.transform = 'scale(0.8)';
    });
    
    document.addEventListener('mouseup', () => {
        cursor.style.transform = 'scale(1)';
    });
    
    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
    });
    
    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
    });
}

// Create paint trail dots with velocity tracking
let lastTrailTime = 0;
let lastX = 0;
let lastY = 0;
const trailDelay = 15; // milliseconds between trail dots (reduced for smoother trail)

function createTrailDot(x, y) {
    const now = Date.now();
    
    // Throttle trail creation
    if (now - lastTrailTime < trailDelay) {
        return;
    }
    
    // Calculate velocity for streaky effect
    const dx = x - lastX;
    const dy = y - lastY;
    const velocity = Math.sqrt(dx * dx + dy * dy);
    
    lastTrailTime = now;
    lastX = x;
    lastY = y;
    
    const dot = document.createElement('div');
    dot.className = 'cursor-trail';
    dot.style.left = x - 6 + 'px';
    dot.style.top = y - 6 + 'px';
    
    // Size based on velocity for paint-like effect
    const baseSize = 10;
    const velocityScale = Math.min(velocity / 10, 3); // Scale based on speed
    const size = baseSize + velocityScale + Math.random() * 4;
    dot.style.width = size + 'px';
    dot.style.height = size + 'px';
    
    // Vary opacity based on velocity (faster = more opaque)
    const opacity = 0.7 + Math.min(velocity / 50, 0.3);
    dot.style.opacity = opacity;
    
    // Add slight rotation for organic feel
    const rotation = Math.random() * 360;
    dot.style.transform = `rotate(${rotation}deg)`;
    
    document.body.appendChild(dot);
    
    // Remove dot after animation completes (0.5s)
    setTimeout(() => {
        dot.remove();
    }, 500);
}

// Console Easter Egg
console.log('%c🎨 Beautiful Portfolio 🎨', 'color: #667eea; font-size: 24px; font-weight: bold;');
console.log('%cDiscovering sections is fun, but you can also use:', 'color: #764ba2; font-size: 14px;');
console.log('%cKonami Code: ↑↑↓↓←→←→BA', 'color: #f093fb; font-size: 16px; font-weight: bold;');