# business_chatbot
A free, no-code chat widget that captures leads on any website and emails them to you. One file, no backend.
Free Lead-Capture Chatbot Widget
A lightweight chat widget you can add to any website with one line of code. It chats with your visitors, collects their info, and emails the lead straight to you — no server or coding needed.
Setup

Make a free account at EmailJS, add an email service, and create a template. Copy your Service ID, Template ID, and Public Key.
Open chatbot-widget.js and edit the CONFIG block at the top — paste in your EmailJS values, set your email, brand name, colors, and the questions you want the bot to ask.
Host chatbot-widget.js somewhere (your server, GitHub Pages, etc.).
Add this line to your site before the closing </body> tag:

html<script src="chatbot-widget.js" defer></script>

Refresh your page and the chat bubble appears.
Prefer a webhook?
Set DELIVERY_METHOD to "webhook" and paste your Zapier/Make/custom URL into WEBHOOK_URL instead.
Note
Your EmailJS public key is visible in the browser (normal for EmailJS). Turn on EmailJS's allowed-domains setting to keep it safe.

## 💼 Want it done for you?

This widget is free to use and customize yourself. But if you'd rather
skip the setup, I offer done-for-you installation:

- **Quick Setup** — I install it on your site, branded with your colors
  and logo, with lead delivery wired up to your inbox. Ready to capture
  leads the same day.

- **Setup + Hosting** — Everything above, plus I host and maintain it for
  you, handle any tweaks, and make sure it keeps running. No technical
  work on your end, ever.

- **Custom Build** — Need extra questions, integrations (CRM, Zapier,
  Calendly), or a unique design? I'll build it to spec.

📩 **Interested? Reach out at **mattheubenny@gmail.com** and tell me a bit
about your business.
