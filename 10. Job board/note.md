### 🔐 Security Note: target="_blank"

- Using `target="_blank"` allows the opened page to access `window.opener`
- A malicious external site can redirect the original tab (tabnabbing attack)
- This is a client-side browser vulnerability (no server access needed)
- Always add:
  rel="noopener noreferrer"
- This prevents phishing, credential theft, and page hijacking

#### ❌ Vulnerable example
<a href="https://evil-site.com" target="_blank">Job Listing</a>

The opened page can run:
window.opener.location = "https://fake-login.com";

#### ✅ Safe example
<a href="https://trusted-site.com" target="_blank" rel="noopener noreferrer">
  Job Listing
</a>

Rule:
Always use `rel="noopener noreferrer"` with `target="_blank"` on external links.