# 🌐 Hosting Guide for iggydv.me

This guide will walk you through hosting your portfolio on the custom domain `iggydv.me` for free (or very low cost).

## Option 1: GitHub Pages (100% Free) ⭐ RECOMMENDED

### Step 1: Get Your Domain Name

1. **Purchase the domain `iggydv.me`** from a registrar:
   - **Namecheap**: ~$2-5/year for `.me` domains
   - **Cloudflare Registrar**: At-cost pricing (~$10/year)
   - **Google Domains**: ~$12/year
   - **Porkbun**: Often cheapest, ~$3-8/year

### Step 2: Set Up GitHub Repository

1. **Create a new GitHub repository**:
   ```bash
   # In your project directory
   git init
   git add .
   git commit -m "Initial commit: Modern portfolio"
   git branch -M main
   git remote add origin https://github.com/iggydv/iggydv.github.io.git
   git push -u origin main
   ```

2. **Repository name options**:
   - `iggydv.github.io` (recommended) - will be accessible at `https://iggydv.github.io`
   - Or any name like `portfolio` - will be at `https://iggydv.github.io/portfolio`

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages** (left sidebar)
3. Under **Source**, select:
   - Branch: `main`
   - Folder: `/ (root)`
4. Click **Save**
5. Wait 1-2 minutes, your site will be live at `https://iggydv.github.io`

### Step 4: Configure Custom Domain

1. **In GitHub Repository Settings → Pages**:
   - Under "Custom domain", enter: `iggydv.me`
   - Click **Save**
   - Check **Enforce HTTPS** (wait for it to be available)

2. **Add CNAME file to your repository**:
   ```bash
   echo "iggydv.me" > CNAME
   git add CNAME
   git commit -m "Add custom domain"
   git push
   ```

### Step 5: Configure DNS Settings

Go to your domain registrar's DNS settings and add these records:

#### For Root Domain (iggydv.me):

**Option A: Using A Records** (Most registrars):
```
Type: A
Name: @
Value: 185.199.108.153
TTL: 3600

Type: A
Name: @
Value: 185.199.109.153
TTL: 3600

Type: A
Name: @
Value: 185.199.110.153
TTL: 3600

Type: A
Name: @
Value: 185.199.111.153
TTL: 3600
```

#### For WWW subdomain:
```
Type: CNAME
Name: www
Value: iggydv.github.io
TTL: 3600
```

### Step 6: Wait for DNS Propagation

- DNS changes can take 5 minutes to 48 hours
- Usually works within 15-30 minutes
- Check status: https://dnschecker.org

### Step 7: Enable HTTPS

1. Back in GitHub Pages settings
2. Check **Enforce HTTPS** (if not already enabled)
3. Wait for SSL certificate to be provisioned (~10 minutes)

✅ **Done!** Your site will be live at `https://iggydv.me`

---

## Option 2: Netlify (Free with more features)

### Step 1: Create Netlify Account

1. Go to [netlify.com](https://netlify.com)
2. Sign up with GitHub

### Step 2: Deploy Your Site

1. Click **Add new site** → **Import an existing project**
2. Choose **GitHub** and select your repository
3. Build settings:
   - Build command: (leave empty)
   - Publish directory: `.` or `/`
4. Click **Deploy site**

### Step 3: Add Custom Domain

1. Go to **Domain settings**
2. Click **Add custom domain**
3. Enter `iggydv.me`
4. Netlify will provide DNS instructions

### Step 4: Configure DNS

**Option A: Use Netlify DNS** (Easiest):
1. Update nameservers at your registrar to Netlify's nameservers
2. Netlify handles everything automatically

**Option B: Keep existing DNS**:
```
Type: A
Name: @
Value: 75.2.60.5
TTL: 3600

Type: CNAME  
Name: www
Value: [your-site-name].netlify.app
TTL: 3600
```

### Step 5: Enable HTTPS

- Netlify automatically provisions SSL certificate
- Usually ready in 1-5 minutes

✅ **Done!** Site live at `https://iggydv.me`

**Netlify Benefits**:
- Automatic deploys on git push
- Form handling
- Serverless functions
- Better build performance
- Deploy previews for branches

---

## Option 3: Cloudflare Pages (Free + CDN)

### Step 1: Create Cloudflare Account

1. Go to [cloudflare.com](https://cloudflare.com)
2. Sign up and verify email

### Step 2: Deploy Site

1. Go to **Pages**
2. Click **Create a project**
3. Connect your GitHub account
4. Select your repository
5. Deploy settings:
   - Build command: (leave empty)
   - Build output directory: `/`
6. Click **Save and Deploy**

### Step 3: Add Custom Domain

1. Go to **Custom domains**
2. Click **Set up a custom domain**
3. Enter `iggydv.me`
4. Follow DNS instructions

### Step 4: Configure DNS

Transfer your domain to Cloudflare or add these records:
```
Type: CNAME
Name: @
Value: [your-project].pages.dev
Proxied: Yes

Type: CNAME
Name: www
Value: [your-project].pages.dev
Proxied: Yes
```

✅ **Done!** Site live with Cloudflare's CDN at `https://iggydv.me`

**Cloudflare Benefits**:
- World-class CDN
- DDoS protection
- Web analytics
- Zero cold starts

---

## Recommended Setup

### Best: GitHub Pages + Cloudflare

1. **Host on GitHub Pages** (free, reliable)
2. **Use Cloudflare for DNS** (free CDN, analytics, protection)
3. **Point Cloudflare to GitHub Pages**:
   - Add domain to Cloudflare (free plan)
   - Update nameservers at registrar to Cloudflare
   - In Cloudflare DNS, add:
     ```
     Type: CNAME
     Name: @
     Value: iggydv.github.io
     Proxied: Yes (orange cloud)
     
     Type: CNAME
     Name: www
     Value: iggydv.github.io
     Proxied: Yes (orange cloud)
     ```

**Benefits**:
- 100% free
- GitHub's reliability
- Cloudflare's CDN and security
- Analytics and caching
- DDoS protection

---

## Cost Breakdown

| Item | Cost | Frequency |
|------|------|-----------|
| Domain (.me) | $3-12 | Per year |
| GitHub Pages | FREE | Forever |
| Netlify | FREE | Forever |
| Cloudflare Pages | FREE | Forever |
| Cloudflare DNS | FREE | Forever |
| SSL Certificate | FREE | Auto-renewed |

**Total: $3-12/year** (just domain cost!)

---

## Quick Command Reference

### Deploy to GitHub Pages

**Option 1: Deploy only the web portfolio** (Recommended)
```bash
# Initial setup - from the web folder
cd /Users/ignatiusdevilliers/Development/IT_de_Villiers___CV/web
git init
git add index.html style.css script.js
git commit -m "Initial commit: Modern portfolio"
git branch -M main
git remote add origin https://github.com/iggydv/iggydv.github.io.git
git push -u origin main

# Add custom domain
echo "iggydv.me" > CNAME
git add CNAME
git commit -m "Add custom domain"
git push

# Future updates
git add index.html style.css script.js
git commit -m "Update portfolio content"
git push
```

**Option 2: Deploy entire project**
```bash
# From project root
git init
git add web/ README.md HOSTING_GUIDE.md .gitignore
git commit -m "Initial commit: Portfolio project"
git branch -M main
git remote add origin https://github.com/iggydv/portfolio.git
git push -u origin main

# Then configure GitHub Pages to serve from /web folder:
# Settings → Pages → Source: /web folder
```

**Note**: For GitHub Pages to work at `iggydv.github.io`, you only need the files from the `web/` folder. The LaTeX CV files in `latex-cv/` can stay in your local repository or be pushed to a separate branch.

### Test Locally
```bash
# From the web folder
cd /Users/ignatiusdevilliers/Development/IT_de_Villiers___CV/web
python3 -m http.server 8000
# Open http://localhost:8000

# Or with Node.js
npx http-server -p 8000
```

---

## Troubleshooting

### Site not loading?
1. Check DNS propagation: https://dnschecker.org
2. Wait 30 minutes after DNS changes
3. Clear browser cache (Cmd/Ctrl + Shift + R)
4. Check GitHub Pages settings are correct

### HTTPS not working?
1. Wait 10-15 minutes after enabling
2. Make sure DNS is pointing correctly
3. Try disabling and re-enabling HTTPS

### Custom domain not working?
1. Verify CNAME file exists in repository root
2. Check DNS records are correct
3. Ensure GitHub Pages custom domain is set
4. Wait for DNS propagation (up to 48h, usually 15min)

---

## Monitoring Your Site

### Free Tools:
- **Google Search Console**: SEO monitoring
- **Google Analytics**: Visitor tracking
- **Cloudflare Analytics**: Traffic insights (if using Cloudflare)
- **GitHub Actions**: Automated deployments

---

## Need Help?

- GitHub Pages docs: https://docs.github.com/en/pages
- Cloudflare docs: https://developers.cloudflare.com/pages
- DNS checker: https://dnschecker.org
- SSL checker: https://www.ssllabs.com/ssltest/

---

**Recommended Next Steps:**

1. ✅ Buy domain from Namecheap or Porkbun (~$3-8)
2. ✅ Push code to GitHub (create `iggydv.github.io` repo)
3. ✅ Enable GitHub Pages in repo settings
4. ✅ Add custom domain in GitHub Pages settings
5. ✅ Update DNS records at registrar
6. ✅ Wait 15-30 minutes
7. ✅ Visit https://iggydv.me 🎉

Good luck! Your portfolio will look amazing on your custom domain! 🚀
