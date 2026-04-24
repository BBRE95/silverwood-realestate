# Silverwood Real Estate — Deployment & Domain Transfer Guide

This guide walks you through hosting your new site on **Cloudflare Pages** (free forever, fastest global CDN) and moving your domain from **GoDaddy** to **Cloudflare Registrar** (at-cost pricing, typically ~$10/year).

Total one-time setup: roughly 45 minutes, split across two sittings because the domain transfer takes ~5–7 days to finalize.

---

## What you'll end up with

- **Hosting**: Cloudflare Pages — $0/month forever, unlimited bandwidth, SSL included
- **Domain**: Cloudflare Registrar — at-cost renewals (~$10/year vs. GoDaddy's ~$20+)
- **Email forwarding** (optional): Cloudflare Email Routing — free, forwards `brandon@silverwood-realestate.com` to your Gmail
- **Ongoing cost**: just the ~$10/year domain renewal. That's it.

You'll cancel your GoDaddy hosting + WordPress + Elementor subscriptions once the new site is live.

---

## PART 1 — Deploy the site to Cloudflare Pages (~20 min)

### Step 1. Create a free Cloudflare account
1. Go to https://dash.cloudflare.com/sign-up
2. Sign up with your email. No credit card needed for the free tier.

### Step 2. Create a GitHub account (if you don't have one)
This gives you a place to store the site files. Free.
1. Go to https://github.com/signup
2. Sign up.

### Step 3. Upload the site files to a new GitHub repository
1. Go to https://github.com/new
2. Repository name: `silverwood-realestate`
3. Set it to **Public** (Cloudflare can connect to private repos too, but public is simpler to start)
4. Check **"Add a README file"**
5. Click **Create repository**
6. On the new repo page, click **"Add file" → "Upload files"**
7. Drag **all** the files from the `silverwood/` folder into the upload area:
   - `index.html`
   - `services.html`
   - `about.html`
   - `team.html`
   - `contact.html`
   - `styles.css`
   - `script.js`
   - `favicon.svg`
   - `robots.txt`
   - `sitemap.xml`
8. Scroll down, click **"Commit changes"**.

### Step 4. Connect Cloudflare Pages to your repo
1. In Cloudflare dashboard, click **Workers & Pages** in the sidebar
2. Click **Create → Pages → Connect to Git**
3. Authorize Cloudflare to access GitHub (first time only)
4. Select the `silverwood-realestate` repository
5. On the build settings page, leave everything blank/default:
   - **Framework preset**: None
   - **Build command**: (leave empty)
   - **Build output directory**: (leave empty — defaults to root)
6. Click **Save and Deploy**

In about 60 seconds your site will be live at something like `silverwood-realestate.pages.dev`. Open it and confirm it looks right.

---

## PART 2 — Transfer domain from GoDaddy to Cloudflare Registrar (~5–7 days total, 15 min of your time)

### Step 1. Unlock the domain at GoDaddy
1. Log in to https://account.godaddy.com
2. Go to **My Products → Domains → silverwood-realestate.com → Manage**
3. Scroll to **Additional Settings** and toggle off **Domain Lock**.

### Step 2. Get the transfer authorization (EPP) code
1. On the same page, find **Transfer domain away from GoDaddy** (or similar wording)
2. Click to reveal or email yourself the **Authorization Code**. Copy it.

### Step 3. Start the transfer on Cloudflare
1. In Cloudflare dashboard, go to **Domain Registration → Transfer Domains**
2. Enter `silverwood-realestate.com` and search
3. Follow the prompts — you'll paste the Authorization Code from step 2
4. Pay the first year (~$10). This extends your domain by one year.
5. **Approve the transfer email** from GoDaddy when it arrives (check inbox + spam)

The transfer takes 5–7 days to complete in ICANN's system. Your site stays up on the old DNS during this time — no downtime.

### Step 4. While waiting — add the domain to Cloudflare as a "Site"
You can do this immediately, even before the transfer completes:
1. In Cloudflare, click **Add a Site** → enter `silverwood-realestate.com`
2. Pick the **Free plan**
3. Cloudflare will show you two **nameservers** (e.g., `bella.ns.cloudflare.com` and `matt.ns.cloudflare.com`)
4. In GoDaddy, go to **My Products → Domains → silverwood-realestate.com → DNS → Nameservers → Change**
5. Switch from "GoDaddy Nameservers" to **Custom** and paste the two Cloudflare nameservers
6. Save. This propagates in 1–24 hours.

> Note: You can do this nameserver switch even before the registrar transfer completes. This points your domain at Cloudflare's DNS immediately so the site goes live under your real domain, while the registrar transfer finishes in the background.

---

## PART 3 — Connect the domain to the site (~5 min, after nameservers have updated)

1. In Cloudflare, go to **Workers & Pages → your silverwood project → Custom Domains**
2. Click **Set up a custom domain**
3. Enter `silverwood-realestate.com` → Continue
4. Click **Activate domain**
5. Repeat for `www.silverwood-realestate.com` if you want both to work

Within a few minutes, https://silverwood-realestate.com will load your new site with a free SSL certificate.

---

## PART 4 — Cancel the old stuff (save money)

Once the new site is live on your domain and you're happy with it:

1. **GoDaddy hosting** — My Products → Web Hosting → cancel. Save ~$10–20/month.
2. **WordPress** — If you paid for WordPress.com or a premium plan, cancel it.
3. **Elementor** — Cancel any Pro subscription (~$59–$99/year).
4. **GoDaddy Managed WordPress** — if applicable, cancel.

Keep only:
- **Cloudflare domain registration** (~$10/year)
- **Your Gmail or branded email** (free via Gmail, or $6/month via Google Workspace if you want a `@silverwood-realestate.com` email)

---

## OPTIONAL — Set up a branded email (~10 min, free)

To get `brandon@silverwood-realestate.com` forwarding into your Gmail:

1. In Cloudflare, go to **Email → Email Routing** for your domain
2. Click **Get started** → Cloudflare auto-configures the DNS records
3. Add a routing rule: `brandon@silverwood-realestate.com` → `brandonbecker.realestate@gmail.com`
4. You can now receive mail at the branded address. To **send** from it, add it as an alias in Gmail settings (Settings → Accounts → Send mail as → Add another email). Follow the prompts; you'll authenticate via Cloudflare/SMTP.

Once that's set up, in `contact.html` and `script.js` swap `brandonbecker.realestate@gmail.com` back to `brandon@silverwood-realestate.com` and re-upload to GitHub — Cloudflare Pages auto-redeploys.

---

## Making future edits

Because everything is plain HTML/CSS, you have three options:

**Easiest (GitHub web editor):** Go to the repo on GitHub, click the file you want to edit, click the pencil icon, make your change, click **Commit changes**. Cloudflare Pages redeploys in ~60 seconds.

**Middle (VS Code + GitHub Desktop):** Free tools. Edit locally, commit, push. Same auto-deploy.

**Just ask me:** Send me the change you want and I'll produce the updated files.

---

## File inventory

| File | Purpose |
|------|---------|
| `index.html` | Home page |
| `services.html` | Full services listing |
| `about.html` | About the firm |
| `team.html` | Brandon's bio |
| `contact.html` | Contact form (opens mail client on submit) |
| `styles.css` | All shared styling |
| `script.js` | Mobile nav, scroll reveal, mailto form handler |
| `favicon.svg` | Browser tab icon |
| `robots.txt` | Search engine crawl guidance |
| `sitemap.xml` | Page index for search engines |

---

## Support

Cloudflare Pages docs: https://developers.cloudflare.com/pages/
Cloudflare Registrar transfer guide: https://developers.cloudflare.com/registrar/get-started/transfer-domain-to-cloudflare/
