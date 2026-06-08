# Deploying Mint Portfolio to Render

This repo is configured for one-click deployment on [Render](https://render.com) using Docker + a managed PostgreSQL-compatible MySQL database.

---

## Prerequisites

- A [Render](https://render.com) account (free tier works)
- This repo pushed to GitHub (already done)

---

## Deploy Steps

### 1. Connect repo to Render

1. Go to [https://dashboard.render.com](https://dashboard.render.com)
2. Click **New** → **Blueprint**
3. Connect your GitHub account and select this repository (`wordpress-portfolio-website`)
4. Render will detect `render.yaml` and provision:
   - A **Web Service** (Docker-based WordPress)
   - A **MySQL-compatible database** (`mint-portfolio-db`)

### 2. Set Secret Environment Variables

After the blueprint deploys, go to your **Web Service → Environment** and add these secret keys (generate them at https://api.wordpress.org/secret-key/1.1/salt/):

```
WORDPRESS_AUTH_KEY
WORDPRESS_SECURE_AUTH_KEY
WORDPRESS_LOGGED_IN_KEY
WORDPRESS_NONCE_KEY
WORDPRESS_AUTH_SALT
WORDPRESS_SECURE_AUTH_SALT
WORDPRESS_LOGGED_IN_SALT
WORDPRESS_NONCE_SALT
```

### 3. Finish WordPress Setup

Once the service is live (green), visit your Render URL (e.g. `https://mint-portfolio-wordpress.onrender.com`) and complete the WordPress 5-minute install:

- Set site title, admin username, password, and email
- Log in to **wp-admin**

### 4. Activate the Mint Theme

1. Go to **Appearance → Themes**
2. Activate **Mint**
3. Install and activate **Elementor** plugin
4. *(Optional)* Import demo templates from `/demo-content/*.json` via **Templates → Import**

### 5. Install the `.wpress` Demo (Optional)

The `demo-content/mint-demo.wpress` file is an All-in-One WP Migration export. To use it:

1. Install the **All-in-One WP Migration** plugin
2. Go to **All-in-One WP Migration → Import**
3. Upload `mint-demo.wpress`

> ⚠️ This will overwrite your WordPress database — only do this on a fresh install.

---

## File Structure

```
wordpress-portfolio-website/
├── Dockerfile                    # Docker image: WordPress + Mint theme
├── render.yaml                   # Render Blueprint (web service + DB)
├── docker-entrypoint-custom.sh   # Startup script
├── .gitignore
├── style.css                     # Theme stylesheet header
├── functions.php                 # Theme functions
├── assets/
│   ├── css/custom-styles.css
│   └── js/mint-js.js
└── demo-content/                 # Elementor templates + wpress backup
```

---

## Notes

- **Persistent storage**: Render's free/starter tier does not provide persistent disks. WordPress uploads will reset on redeploy. Upgrade to a paid plan and add a **Disk** for persistence, or use an S3-compatible storage plugin (e.g. WP Offload Media).
- **Database**: The `render.yaml` provisions a managed MySQL database. Credentials are injected automatically via environment variables.
- **HTTPS**: Render provides free TLS automatically on all web services.
