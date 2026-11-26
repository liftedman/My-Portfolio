# Editing your portfolio (Sanity Studio)

Your content (projects, experience, awards, skills, testimonials, email, social links,
profile photo and CV) is edited at **`yoursite.com/studio`**. No code and no redeploy:
change something, press **Publish**, and the site updates within a minute.

Sanity's free plan is enough for a portfolio. It needs no credit card.

---

## One-time setup (about 15 minutes)

### 1. Create a Sanity project
1. Go to **https://www.sanity.io/manage** and sign up (Google or GitHub is fastest).
2. Click **Create new project**. Name it `My Portfolio`.
3. If it asks for a dataset, use **`production`** with **Public** visibility.
4. On the project page, copy the **Project ID** (a short code like `ab12cd34`).

### 2. Connect it to your code
Open `.env.local` in the project folder and add:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=ab12cd34
NEXT_PUBLIC_SANITY_DATASET=production
```

### 3. Copy your current content into Sanity (once)
1. In sanity.io/manage → your project → **API** → **Tokens** → **Add API token**.
   Name: `import`, Permissions: **Editor**. Copy the token. It is only shown once.
2. Add it to `.env.local`:
   ```
   SANITY_API_WRITE_TOKEN=paste-token-here
   ```
3. Run:
   ```
   npm run sanity:import
   ```
   This uploads your projects, images, experience, skills, testimonials, profile photo and CV.
   It is safe to run again: it never overwrites anything you have edited.
4. When it says **Done**, you can delete the token in sanity.io/manage (you won't need it again).

### 4. Let the Studio talk to Sanity
sanity.io/manage → **API** → **CORS origins** → **Add CORS origin**:
- `http://localhost:3000`, with **Allow credentials** ticked.

(If you forget, the Studio shows a screen with a button that does this for you.)

### 5. Try it on your computer
```
npm run dev
```
Open **http://localhost:3000/studio**, log in with the same Sanity account, and you'll see
everything. Change a word, click **Publish**, then reload http://localhost:3000.

### 6. Put it live (Vercel)
1. Vercel → your project → **Settings → Environment Variables**, add:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID` = your project ID
   - `NEXT_PUBLIC_SANITY_DATASET` = `production`
2. Redeploy (Deployments → ⋯ → Redeploy).
3. sanity.io/manage → **API → CORS origins** → add your live address
   (e.g. `https://my-portfolio-deeu.vercel.app`) with **Allow credentials** ticked.
4. Open **https://your-site/studio** and you're editing the live site.

Without step 7, changes appear on the live site **within about a minute**.

### 7. (Optional) Make updates instant
1. Make up a long random password, e.g. from https://1password.com/password-generator.
2. Vercel → Environment Variables → add `SANITY_REVALIDATE_SECRET` = that password. Redeploy.
3. sanity.io/manage → **API → Webhooks → Create webhook**:
   - URL: `https://your-site/api/revalidate`
   - Dataset: `production`
   - Trigger on: **Create, Update, Delete**
   - HTTP method: **POST**
   - Secret: the same password
4. Save. Now every Publish refreshes the site in a few seconds.

---

## Everyday editing

**Nothing goes live until you press Publish.** Until then your change is a draft that only you see.

| I want to… | Do this in /studio |
|---|---|
| Fix a typo in a project | **Projects** → pick it → edit → **Publish** |
| Change a project's link | Projects → pick it → **Live website / app link** → Publish |
| Mark a project offline | Projects → pick it → Status: **Archived** → write a short note → Publish |
| Add a new project | Projects → **+** (top) → fill in → upload a **Cover image** → **Generate** the page address → Publish |
| Add / replace screenshots | Projects → pick it → **Images** tab → drag images in → Publish |
| Change the order of projects | Set **Position** (1 = first) on each project |
| Add an award | **Awards** → **+** → name, who gave it, date (+ link/photo if you have one) → Publish. The Awards section appears on the site automatically. |
| Add a job | **Experience** → **+** → Publish |
| Update your CV | **Site settings** → Résumé → upload the new PDF → Publish |
| Change photo, email or social links | **Site settings** → Publish |
| Remove something | Open it → **⋯** (bottom right) → **Delete** |

Made a mistake? Open the document → the clock icon (**History**) → pick an earlier version → **Restore**.

---

## For developers

- Content is read in `lib/content.ts`. If Sanity isn't configured or can't be reached, the site
  falls back to the files in `config/`, so those files are now only a backup.
- Forms (schemas) live in `sanity/schemaTypes/`. The Studio route is `app/studio/[[...tool]]`.
- Public pages are in the `app/(site)` route group, so the Studio doesn't load the custom cursor,
  smooth scroll or ambient background.
