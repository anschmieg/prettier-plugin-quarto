# npm Publish Guide for prettier-plugin-pandoc

## ✅ Pre-Publish Checklist

- [x] README.md updated with package name `prettier-plugin-pandoc`
- [x] LICENSE exists (MIT)
- [x] package.json metadata updated (homepage, bugs)
- [x] .npmignore configured
- [x] Build passes (`npm run build`)
- [x] Tests pass (`npm test`)
- [x] Git committed and pushed

## 📦 Publishing Steps

### 1. Login to npm (first time only)

```bash
npm login
```

You'll be prompted for:
- Username
- Password
- Email
- 2FA code (if enabled)

### 2. Verify Package Contents

```bash
npm pack --dry-run
```

This shows what will be included in the package. Should see:
- `dist/` folder (compiled code)
- `README.md`
- `LICENSE`
- `package.json`

Should NOT see:
- `src/` folder
- `tests/` folder
- `.github/` folder

### 3. Publish

```bash
npm publish --access public
```

**Note:** No `--tag` is needed, this will publish as `latest`.

### 4. Verify Publication

Visit: https://www.npmjs.com/package/prettier-plugin-pandoc

Check that:
- Version shows `0.1.0`
- README renders correctly with the disclaimer

### 5. Test Installation

In a test directory:
```bash
mkdir test-install
cd test-install
npm init -y
npm install prettier prettier-plugin-pandoc
```

Create `test.md`:
```markdown
Term
:   Definition
```

Format it:
```bash
npx prettier --write test.md --plugin prettier-plugin-pandoc --parser pandoc
```

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

### Deprecate (after 72 hours)
```bash
npm deprecate prettier-plugin-pandoc@0.1.0 "This version has issues, use @latest"
```

## 📊 After Publishing

1. **Announce** - Share on social media, Quarto community forum
2. **Monitor** - Watch GitHub issues for bug reports
3. **Gather feedback** - Ask early adopters for input
