# Company Logos Setup Guide

## Current Issue
Company logos from Clearbit API may not load on GitHub Pages due to:
- API rate limits
- CORS restrictions
- Blocked external requests
- Domain not in Clearbit database

## ✅ Current Solution (Multi-Fallback)

The portfolio now tries **4 different logo sources** before falling back to emojis:

1. **Clearbit Logo API** (primary)
2. **Google Favicon API** (128px)
3. **Clearbit with size parameter**
4. **Google Static Favicon API** (alternative)
5. **Emoji fallback** (if all fail)

This should work in most cases! 🎉

---

## 🏆 Best Solution: Host Logos Locally

For 100% reliability, download and host logos locally:

### Step 1: Download Company Logos

```bash
# Create logos directory
mkdir -p logos

# Download logos manually or use these commands:

# Creative Fabrica
curl -o logos/creativefabrica.png "https://logo.clearbit.com/creativefabrica.com"

# WeTransfer
curl -o logos/wetransfer.png "https://logo.clearbit.com/wetransfer.com"

# bol.com
curl -o logos/bol.png "https://logo.clearbit.com/bol.com"

# Entersekt
curl -o logos/entersekt.png "https://logo.clearbit.com/entersekt.com"
```

### Step 2: Update HTML

Replace the Clearbit URLs with local paths:

```html
<!-- From: -->
<img src="https://logo.clearbit.com/creativefabrica.com" ... >

<!-- To: -->
<img src="logos/creativefabrica.png" ... >
```

### Step 3: Optimize Images (Optional)

```bash
# If you have ImageMagick installed:
cd logos
for img in *.png; do
  convert "$img" -resize 128x128 -quality 90 "optimized_$img"
done
```

---

## 🎨 Alternative: Use Actual Company Logos

Download official logos from company websites:

### Creative Fabrica
- Go to: https://www.creativefabrica.com/about/
- Download their official logo
- Save as `logos/creativefabrica.png`

### WeTransfer
- Go to: https://wetransfer.com/about
- Download their press kit logo
- Save as `logos/wetransfer.png`

### bol.com
- Go to: https://www.bol.com/nl/nl/m/bol-com-pers/
- Download their logo
- Save as `logos/bol.png`

### Entersekt
- Go to: https://www.entersekt.com/
- Download from press/media section
- Save as `logos/entersekt.png`

---

## 📝 Quick Fix Command

To update all logo URLs in index.html at once:

```bash
cd /Users/ignatiusdevilliers/Development/IT_de_Villiers___CV

# Backup first
cp index.html index.html.backup

# Replace Clearbit URLs with local paths
sed -i '' 's|https://logo.clearbit.com/creativefabrica.com|logos/creativefabrica.png|g' index.html
sed -i '' 's|https://logo.clearbit.com/wetransfer.com|logos/wetransfer.png|g' index.html
sed -i '' 's|https://logo.clearbit.com/bol.com|logos/bol.png|g' index.html
sed -i '' 's|https://logo.clearbit.com/entersekt.com|logos/entersekt.png|g' index.html
```

---

## 🔍 Testing

After setting up local logos:

1. **Test locally:**
   ```bash
   open index.html
   ```

2. **Check DevTools Console** for any loading errors

3. **Deploy and test** on GitHub Pages

---

## 📊 Current Status

✅ **Multi-fallback system active** - Will try 4 sources before emoji  
⚠️ **If still showing emojis** - Download logos locally (see above)  
🎯 **Recommended** - Host locally for 100% reliability

---

## 🚀 Deployment Checklist

If using local logos:

- [ ] Create `logos/` directory
- [ ] Download all 4 company logos
- [ ] Optimize images (< 50KB each)
- [ ] Update HTML paths
- [ ] Test locally
- [ ] Commit logos to git
- [ ] Deploy to GitHub Pages
- [ ] Verify logos load correctly

---

## 💡 Pro Tips

1. **SVG > PNG**: If available, use SVG logos for crisp display at any size
2. **Optimize**: Keep logos under 50KB each for fast loading
3. **Square**: Logos should be square (1:1 ratio) for best display
4. **Transparent**: Use transparent backgrounds when possible
5. **WebP**: Consider WebP format for smaller file sizes with quality

---

## 🐛 Troubleshooting

**Logos still not loading?**
1. Check browser DevTools Network tab
2. Look for CORS or CSP errors
3. Verify file paths are correct
4. Ensure logos are committed to git
5. Clear browser cache

**Fallback emojis showing immediately?**
1. Check if Clearbit is blocked by your network
2. Try opening logo URL directly in browser
3. Consider using local hosting method above

---

Your portfolio now has a robust multi-fallback system! If logos still don't load, the local hosting method above is the most reliable solution. 🎨✨
