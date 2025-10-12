# 🌐 Iggy de Villiers - Portfolio Website

A modern, interactive portfolio website featuring glassmorphism design, discovery mechanics, and an interactive world map showcasing my professional journey.

**Live Site:** [iggydv.me](https://iggydv.me)

## 🚀 Technologies & Tools

### Frontend Stack
- **HTML5** - Semantic markup with structured data (JSON-LD)
- **CSS3** - Custom properties, animations, glassmorphism effects
- **JavaScript (ES6+)** - Modern vanilla JS, no frameworks
- **Google Fonts** - [Inter](https://fonts.google.com/specimen/Inter) font family

### Libraries & Frameworks
- **[Leaflet.js](https://leafletjs.com/)** `v1.9.4` - Interactive map library
- **[OpenStreetMap](https://www.openstreetmap.org/)** - Map tiles provider

### APIs & Integrations
- **[GitHub API](https://docs.github.com/en/rest)** - Automatically fetches and displays public repositories
- **[Spotify Embed API](https://developer.spotify.com/documentation/embeds)** - Displays current playlist
- **Goodreads** - Book reading list integration
- **Canvas API** - Particle background effects

### Build & Deployment
- **GitHub Pages** - Static site hosting
- **Git** - Version control
- **Python HTTP Server** - Local development server

## 📁 Project Structure

```
iggydv.github.io/
├── index.html              # Main portfolio page
├── map/
│   └── index.html          # Interactive world map
├── style.css               # Global styles & animations
├── script.js               # Interactive features & API integrations
├── logos/                  # Company & school logos
│   ├── creativefabrica.png
│   ├── wetransfer.png
│   ├── bol.png
│   ├── entersekt.png
│   ├── reutech.png
│   └── stellies.png
├── docs/                   # Research papers & thesis
├── latex-cv/               # Traditional LaTeX CV
├── favicon.png
├── og-image.png
├── robots.txt
├── sitemap.xml
├── _headers                # Netlify/Cloudflare headers
└── CNAME                   # Custom domain configuration
```

## ✨ Features

### Main Portfolio (`index.html`)
- 🔍 **Discovery Mechanics** - Sections blur until scrolled into view
- 🎨 **Glassmorphism Design** - iOS-inspired frosted glass effects
- 📊 **Dynamic Skills Display** - Years of experience for each technology
- 🌟 **Primary Language Highlight** - Golang marked as current focus
- 📚 **Goodreads Integration** - Live book reading list
- 🎵 **Spotify Integration** - Current playlist embed
- 🔗 **GitHub Showcase** - Auto-fetched repositories with stats
- 📥 **PDF Download** - Export portfolio functionality
- 🎯 **Responsive Design** - Mobile-first approach
- 🌈 **Particle Effects** - Canvas-based animated background
- ♿ **SEO Optimized** - Meta tags, structured data, sitemap

### Interactive Map (`map/index.html`)
- 🗺️ **Full-Screen World Map** - Powered by Leaflet.js
- 📍 **Company Markers** - All workplaces with custom logos
- 🎓 **Education Markers** - University with custom icon
- 🎯 **Interactive Legend** - Click to zoom to locations
- 📱 **Mobile Optimized** - Responsive legend and controls
- 🛤️ **Journey Path** - Dotted line showing career progression
- 💬 **Rich Popups** - Detailed info for each location

### Technical Highlights
- **Experience Calculation** - Years automatically calculated from work history
- **Dynamic Content** - Sections populate from data structures
- **Smooth Animations** - CSS transitions and keyframe animations
- **Print Optimization** - Special styles for PDF generation
- **Security Headers** - CSP, X-Frame-Options, etc.
- **Performance** - Lazy loading, optimized assets

## 🛠️ Development

### Quick Start

```bash
# Start local development server
python3 -m http.server 8000

# Open in browser
open http://localhost:8000
```

### Customization

#### Customize Colors
Edit `style.css`:
```css
/* Lines 7-15 */
:root {
    --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    --accent-color: #667eea;
    /* ... */
}
```

#### Update Map Locations
Edit `map/index.html`:
```javascript
// Lines 432-495
const locations = [
    {
        name: 'Company Name',
        type: 'company',
        coords: [lat, lng],
        period: 'Start - End',
        logo: '../logos/company.png'
    }
];
```


## 🌍 Map Locations

The interactive map showcases:
- **5 Companies**: Creative Fabrica, WeTransfer, bol.com, Entersekt, Reutech
- **1 University**: University of Stellenbosch
- **3 Countries**: Netherlands (Utrecht, Amsterdam), South Africa (Cape Town, Pretoria, Stellenbosch)

## 📱 Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🔒 Security & Performance

- **Security Headers** configured via `_headers`
- **Canonical URLs** for SEO
- **robots.txt** for crawler management
- **sitemap.xml** for search engine indexing
- **Lazy loading** for images and iframes
- **Optimized assets** for fast loading

## 📄 License

This is a personal portfolio. Feel free to take inspiration, but please don't copy it wholesale.

## 🤝 Connect

- **Website**: [iggydv.me](https://iggydv.me)
- **GitHub**: [@iggydv](https://github.com/iggydv)
- **LinkedIn**: [ignatius-de-villiers](https://www.linkedin.com/in/ignatius-de-villiers-11324b133)
- **Email**: iggydv12@gmail.com

---

**Last Updated**: October 2025
