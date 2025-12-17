## 🔐 Setup Trusted Publishing (Recommended)

Instead of managing secrets, use npm's **Trusted Publishing** (OIDC) to securely link GitHub Actions to npm.

1.  **Go to npm:** [package settings](https://www.npmjs.com/package/prettier-plugin-pandoc/access)
2.  **Click:** "Publishing" (or "Settings" -> "Publishing")
3.  **Link GitHub Repository:**
    *   **Owner:** `anschmieg`
    *   **Repository:** `prettier-plugin-pandoc`
    *   **Workflow filename:** `.github/workflows/release.yml`
    *   **Environment:** (Leave empty if not using environments)
4.  **Click:** "Add Linked Repository"

*That's it! GitHub Actions will now automatically authenticate without needing `NPM_TOKEN`.*

## 🔄 Future Releases

### Patch Release (Bug Fixes)
```bash
npm version patch  # 0.1.0 → 0.1.1
npm publish
git push && git push --tags
```

### Minor Release (Features)
```bash
npm version minor # 0.1.0 → 0.2.0
npm publish
git push && git push --tags
```

## 🚨 If Something Goes Wrong

### Unpublish (within 72 hours)
```bash
npm unpublish prettier-plugin-pandoc@0.1.0
```

**Warning:** Can only unpublish within 72 hours of publishing.
