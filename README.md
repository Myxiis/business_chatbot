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
