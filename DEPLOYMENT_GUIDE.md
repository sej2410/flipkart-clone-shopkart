# ShopKart: Deployment Master Guide 🚀💎

Follow this step-by-step guide to launch your ShopKart masterpiece to a live URL using Vercel. This project is pre-packaged with a `vercel.json` configuration for a seamless, full-stack deployment.

---

## 1. Prepare Your GitHub Repository
1.  Ensure all your latest code is pushed to your repository:
    `https://github.com/sej2410/flipkart-clone-shopkart`
2.  Your repository must be **PUBLIC** for the fastest deployment.

## 2. Launching on Vercel
1.  **Login**: Go to [Vercel.com](https://vercel.com) and sign in with your GitHub account.
2.  **New Project**: Click the **"Add New"** button, then select **"Project"**.
3.  **Import**: Find your `flipkart-clone-shopkart` repo and click **"Import"**.

## 3. The "Zero-Issue" Configuration
On the "Configure Project" screen, ensure these settings are followed exactly:

### A. Basic Settings
- **Vercel Team**: Select your Hobby/Personal account.
- **Project Name**: `shopkart-masterpiece` (or any name you like).
- **Framework Preset**: Leave as **"Other"** (Vercel will automatically read our `vercel.json` file).
- **Root Directory**: Keep as `./`.

### B. Environment Variables (CRITICAL) 🔑
This is the most important step for your database connection:
1.  Scroll down to the **"Environment Variables"** section.
2.  **Name**: `DATABASE_URL`
3.  **Value**: Paste your Supabase connection string:
    `postgresql://postgres.mwbnnynouvyglomyhtmr:Rathu@sejal24@aws-1-ap-southeast-1.pooler.supabase.com:6543/postgres`
4.  Click **"Add"**.

### C. Build and Output Settings
You do **not** need to change anything here. The pre-packaged `vercel.json` and root `package.json` will handle the build automatically.

## 4. Final Deploy 🧨
1.  Click the big white **"Deploy"** button.
2.  **Wait ~60 seconds**: You will see a progress bar. Vercel will:
    - Install `client` dependencies.
    - Build the React frontend.
    - Setup the Express API as a serverless function.
3.  **Success!**: Once you see the "Congratulations!" screen, click your live link (e.g., `shopkart-masterpiece.vercel.app`).

---

## Troubleshooting Tips
- **Empty Products?**: Triple-check that your `DATABASE_URL` environment variable was added correctly without any extra spaces.
- **Build Errors?**: Ensure your root `package.json` has the appropriate build scripts (I have already confirmed this for you!).

---
**Happy Launching!** 💎🌟🚀
