# Open Graph Image Guide

## Current Status
❌ The OG image is a **placeholder** and won't work until you create it.

## Creating Your OG Image (1200x630px)

### Option 1: 🎨 Use the HTML Generator (Easiest)

I've created `create-og-image.html` for you!

**Steps:**
1. Open `create-og-image.html` in your browser
2. Right-click anywhere on the page
3. Select "Inspect" or "Inspect Element"
4. Press `Cmd + Shift + P` (Mac) or `Ctrl + Shift + P` (Windows)
5. Type "Capture full size screenshot" or "Screenshot"
6. Save as `og-image.png`
7. Save to your project root folder

**Or use browser screenshot:**
- Chrome: Right-click → Save as image
- Firefox: Right-click → Take a screenshot
- Safari: Develop → Show Web Inspector → Capture screenshot

---

### Option 2: 📸 Screenshot Your Portfolio

1. Open your portfolio in browser at 1200px width
2. Use a screenshot tool:
   - **macOS**: Cmd + Shift + 4 (select area)
   - **Windows**: Windows + Shift + S
   - **Tool**: https://www.screely.com/ (adds nice browser frame)
3. Crop/resize to exactly **1200x630px**
4. Save as `og-image.png` in project root folder

---

### Option 3: 🎯 Design Tools (Most Control)

**Canva (Free)**
1. Go to https://www.canva.com
2. Create custom size: 1200 x 630 px
3. Use their templates or design from scratch
4. Download as PNG

**Figma (Free)**
1. Go to https://figma.com
2. Create frame: 1200 x 630
3. Design your card
4. Export as PNG

**Free Templates:**
- https://www.opengraph.xyz/ (OG image templates)
- https://og-playground.vercel.app/ (Preview + generate)

---

### Option 4: 🤖 Online Generators

**Quick generators:**
- https://www.bannerbear.com/demos/og-image-generator/
- https://cards.microlink.io/ (automated)
- https://metatags.io/ (preview + generate)

---

## What Should Be in Your OG Image?

✅ **Your name** (large, prominent)
✅ **Job title** (Senior Software Engineer)
✅ **Key technologies** (Golang, Kubernetes, AWS, etc.)
✅ **Visual appeal** (colors matching your portfolio)
✅ **Domain name** (iggydv.me)
✅ **Professional look** (not cluttered)

❌ Avoid:
- Too much text
- Small fonts (minimum 24px)
- Low contrast
- Cluttered design

---

## Recommended Design

**Background:**
- Use your portfolio's gradient: `linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)`

**Layout:**
```
┌─────────────────────────────────────┐
│                                     │
│  [Avatar]  Iggy de Villiers         │
│            Senior Software Engineer │
│                                     │
│  🏷️ Golang  🏷️ Kubernetes  🏷️ AWS    │
│  🏷️ Docker  🏷️ Microservices        │
│                                     │
│  🎨 📦 🛒 🔐        iggydv.me        │
└─────────────────────────────────────┘
```

---

## After Creating the Image

1. **Save as:** `og-image.png` (exactly this name)
2. **Size:** 1200 x 630 pixels (crucial!)
3. **Format:** PNG or JPG (PNG recommended)
4. **Location:** Put it in the project root folder
5. **File size:** Keep under 1MB (ideally ~200-300KB)

---

## Testing Your OG Image

### Before deploying:
```bash
# Make sure image exists
ls -lh og-image.png
```

### After deploying:
1. **Facebook Debugger**: https://developers.facebook.com/tools/debug/
   - Enter: `https://iggydv.me`
   - Click "Scrape Again" if image doesn't show
   
2. **Twitter Validator**: https://cards-dev.twitter.com/validator
   - Enter: `https://iggydv.me`
   
3. **LinkedIn Inspector**: https://www.linkedin.com/post-inspector/
   - Enter: `https://iggydv.me`

---

## Alternative: Skip OG Image for Now

If you want to deploy without an OG image:

**Option A:** Remove the meta tag temporarily
```html
<!-- Comment out or remove these lines -->
<!-- <meta property="og:image" content="https://iggydv.me/og-image.png"> -->
<!-- <meta name="twitter:image" content="https://iggydv.me/og-image.png"> -->
```

**Option B:** Use GitHub avatar as fallback
```html
<meta property="og:image" content="https://github.com/iggydv.png">
```

---

## Quick Command to Add Image

Once you have `og-image.png`:

```bash
# Verify it's in project root
ls -lh og-image.png

# It's ready to deploy with your index.html!
```

Then deploy and test with the validators above!

---

## My Recommendation

Use **Option 1** (the HTML generator I created):
1. Open `create-og-image.html` in browser
2. Take screenshot (Cmd/Ctrl + Shift + 4)
3. Crop to 1200x630 if needed
4. Save as `og-image.png` in project root
5. Done! 🎉

This gives you a professional, on-brand image in under 2 minutes.
