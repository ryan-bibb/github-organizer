## Github app settings

---

- Expire user authorization tokens — Leave unchecked for now. It's more secure (short-lived tokens + refresh flow), but it adds complexity (you'd need to handle refresh token rotation in NextAuth callbacks). Since you're just starting out, skip it and turn it on later once the basic auth flow works.
- Request user authorization (OAuth) during installation — Check this one. Since your app needs to log users in via GitHub (identity/OAuth), you need this enabled so users grant access when they install/authorize the app. Without it, you'd only get app-level access, not a user identity to sign them in with.
- Enable Device Flow — Leave unchecked. That's for CLI tools or devices without a browser (like gh CLI). Not relevant for a web app with a login page.

-> these are set this way to start //TODO: need to check the settings once app is deployed

---

- For webhooks will have to select active and provide a webhook URL

-> //TODO: when at the webhook phase set URL and select active in Github app

---

- Permissions CURRENTLY (may need to change)

- Repository

pull requests - read only
contents - read only
metadata - read only

- Rest of permissions

none

---

- only account -> ryan-bibb -> ryanbibb34@gmail.com can access this currently

- //TODO: when app is deployed select any account can install

## env variables

- //TODO: update local urls to vercel url when app is deploye

## UI

- //TODO: add skeletons
- //TODO: add empty badge for no repos

## CI/CD

- possibly add Github workflows for typecheck + lint

## Feats

- maybe make sure all normal github feats are the same plus our additional features
