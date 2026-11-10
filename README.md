# Apostolic Message

This repository contains two static websites. There is no build or compile step; GitHub Pages serves the HTML, CSS, JavaScript, and images directly.

## Publish both sites with GitHub Pages

1. Create a GitHub repository and upload the contents of this folder, keeping the two website folders and their names intact.
2. In the repository, open **Settings → Pages** and set the build and deployment source to **GitHub Actions**.
3. Push or upload the files to the `main` branch. The included Pages workflow will publish the websites.
4. Share the published repository URL. The home page links to both sites, and each site can also be opened directly:
   - `https://<your-username>.github.io/<repository>/Apostolic%20Quotes%20(By%20AI)/`
   - `https://<your-username>.github.io/<repository>/My%20Version/`

The workflow runs again whenever you update the `main` branch. GitHub may take a minute or two to publish a change.

## Open locally

For a quick preview, open this folder's `index.html` in a browser. The links work without compiling anything. To test through a local web server instead, run `python -m http.server` from this folder and open `http://localhost:8000`.
