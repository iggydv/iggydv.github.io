# 🎨 Iggy de Villiers - Modern Portfolio

A beautiful, interactive portfolio website featuring glassmorphism design, discovery mechanics, and GitHub integration.

![Portfolio Preview](https://img.shields.io/badge/Status-Live-success?style=for-the-badge)
![GitHub](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)

## ✨ Features

### 🔍 Discovery Mechanics
- All sections start blurred by default
- Hover over sections to discover them
- Progress tracker shows discovery status
- State persists across page reloads
- Confetti celebration when all sections discovered
- Konami code easter egg (↑↑↓↓←→←→BA) for instant reveal

### 🎨 Modern Design
- iOS-inspired glassmorphism aesthetic
- Smooth gradient animations
- Particle background effects
- Company logos as iOS-style icons
- Responsive design for all screen sizes
- Light, colorful theme with smooth transitions

### 💼 GitHub Integration
- Automatically fetches your latest repositories
- Vertical scrolling carousel with blurred edges
- Shows stars, forks, and programming language
- Displays top 10 non-fork repositories
- Smooth scroll interaction

### 📥 Download Portfolio
- One-click download button
- Triggers browser print dialog
- Can save as PDF
- Automatically reveals all sections before printing
- Print-optimized styling

### 🚀 Interactive Elements
- Smooth animations and transitions
- Hover effects on all interactive elements
- Sound effects for discoveries
- Progress tracking
- Company logo hover effects

## 🛠️ Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Glassmorphism, gradients, animations
- **JavaScript (ES6+)** - Interactive features, GitHub API
- **GitHub API** - Repository integration
- **Clearbit Logo API** - Company logos
- **LocalStorage** - Progress persistence

## 📂 Project Structure

```
IT_de_Villiers___CV/
│
├── web/                    # Modern Web Portfolio
│   ├── index.html         # Main portfolio webpage
│   ├── style.css          # Glassmorphism styles, animations, print styles
│   └── script.js          # Interactive features, GitHub API, discovery mechanics
│
├── latex-cv/              # LaTeX CV (Alternative Format)
│   ├── template.tex       # LaTeX CV source
│   ├── friggeri-cv.cls    # LaTeX class file
│   ├── bibliography.bib   # Bibliography references
│   ├── publications.bib   # Publications list
│   ├── template.pdf       # Generated PDF
│   └── *.aux/log/out      # Build files (ignored by git)
│
├── README.md              # Project documentation
├── HOSTING_GUIDE.md       # Step-by-step hosting guide for iggydv.me
├── .gitignore            # Git ignore rules
└── retro-cv-readme.md    # Previous theme documentation
```

### Web Portfolio (`web/`)

Modern, interactive glassmorphism portfolio with:
- **index.html** - Discovery mechanics, responsive design
- **style.css** - iOS-inspired styling, print optimization
- **script.js** - GitHub integration, animations, download functionality

### LaTeX CV (`latex-cv/`)

Traditional academic CV format:
- **template.tex** - LaTeX source file
- **template.pdf** - Compiled PDF output

Both formats showcase the same professional experience and can be used for different contexts.

## 🚀 Getting Started

### Local Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/iggydv/portfolio.git
   cd portfolio/web
   ```

2. **Open in browser**:
   - Simply open `index.html` in your browser
   - Or use a local server:
     ```bash
     # From the web folder
     python3 -m http.server 8000
     # Visit http://localhost:8000
     ```

3. **Customize**:
   - Update personal information in `web/index.html`
   - Change GitHub username in `web/script.js` (line 11):
     ```javascript
     const GITHUB_USERNAME = 'iggydv';
     ```
   - Adjust colors in `web/style.css` (`:root` variables)

### Deploy to GitHub Pages

See [HOSTING_GUIDE.md](./HOSTING_GUIDE.md) for detailed instructions.

**Quick setup**:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/iggydv/iggydv.github.io.git
git push -u origin main
```

Then enable GitHub Pages in repository settings.

## 🎯 Key Sections

1. **Contact** - Email, GitHub, LinkedIn, location
2. **Education** - Academic background with thesis link
3. **Skills** - Animated skill bars for technologies
4. **GitHub Projects** - Live feed from GitHub (scrollable carousel)
5. **Experience** - Work history with company logos
6. **Notable Projects** - Highlighted achievements
7. **Leadership** - Community involvement

## 🎨 Customization Guide

### Change Colors

Edit CSS variables in `web/style.css`:
```css
:root {
    --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    --secondary-gradient: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    --accent-gradient: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
    --success-gradient: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
}
```

### Update Content

All content is in `web/index.html`. Key sections:
- Lines 26-50: Header and personal info
- Lines 59-107: Contact and Education
- Lines 109-161: Skills
- Lines 164-173: GitHub projects (auto-populated)
- Lines 177-292: Work experience
- Lines 289-346: Notable projects
- Lines 349-376: Leadership

### Modify GitHub Integration

In `web/script.js`:
```javascript
// Line 11: Change username
const GITHUB_USERNAME = 'iggydv';

// Line 231: Adjust number of repos to fetch
const response = await fetch(GITHUB_API_URL + '?sort=updated&per_page=20');

// Line 246: Change number displayed
.slice(0, 10);
```

## 📱 Responsive Design

- **Desktop**: Full glassmorphism with side-by-side layout
- **Tablet**: Single column, adjusted spacing
- **Mobile**: Optimized touch interactions, stacked layout

## 🎭 Easter Eggs

1. **Konami Code**: Type ↑↑↓↓←→←→BA to reveal all sections instantly
2. **Console Messages**: Check browser console for hidden messages
3. **Discovery Progress**: Hover pattern creates unique experience

## 🔧 Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers

## 📊 Performance

- Lightweight: ~50KB total (HTML + CSS + JS)
- Fast load times: < 1 second
- Optimized animations: 60 FPS
- Efficient API calls: Cached locally

## 🤝 Contributing

This is a personal portfolio, but feel free to:
- Fork for your own use
- Submit bug reports
- Suggest improvements
- Share feedback

## 📄 License

MIT License - feel free to use this template for your own portfolio!

## 📞 Contact

- **Email**: iggydv12@gmail.com
- **GitHub**: [@iggydv](https://github.com/iggydv)
- **LinkedIn**: [Ignatius de Villiers](https://www.linkedin.com/in/ignatius-de-villiers-11324b133)
- **Website**: https://iggydv.me (coming soon!)

## 🙏 Acknowledgments

- Inspired by iOS design language
- GitHub API for repository data
- Clearbit for company logos
- Modern web design trends

---

**Built with ❤️ by Iggy de Villiers**

*Last updated: October 2025*