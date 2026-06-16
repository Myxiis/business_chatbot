/* =====================================================================
 * Free Lead-Capture Chatbot Widget  (customize & embed on any site)
 * ---------------------------------------------------------------------
 * Self-contained, dependency-free. Add to any page with one tag:
 *
 *     <script src="chatbot-widget.js" defer></script>
 *
 * Styles inject themselves automatically — no separate CSS file needed.
 * The ONLY part you need to edit is the CONFIG block below.
 * ===================================================================== */
(function () {
  "use strict";

  /* ===================================================================
   * 1. CONFIG  —  *** EDIT THIS BLOCK, LEAVE THE REST ALONE ***
   * =================================================================== */
  var CONFIG = {
    // ---- Where leads are sent --------------------------------------
    OWNER_EMAIL: "you@yourbusiness.com",

    // ---- Delivery method: "emailjs" or "webhook" -------------------
    //   emailjs -> sends client-side via EmailJS (no backend needed)
    //   webhook -> POSTs the lead as JSON to WEBHOOK_URL (Zapier/Make)
    DELIVERY_METHOD: "emailjs",

    // ---- EmailJS settings (only used if DELIVERY_METHOD = "emailjs")-
    //   1. Free account at https://www.emailjs.com/
    //   2. Add an email service  -> Service ID
    //   3. Create an email template -> Template ID
    //   4. Account > API Keys    -> Public Key
    EMAILJS_PUBLIC_KEY: "YOUR_PUBLIC_KEY",
    EMAILJS_SERVICE_ID: "YOUR_SERVICE_ID",
    EMAILJS_TEMPLATE_ID: "YOUR_TEMPLATE_ID",

    // ---- Webhook settings (only used if DELIVERY_METHOD = "webhook")-
    WEBHOOK_URL: "https://example.com/your-webhook-endpoint",

    // ---- Branding --------------------------------------------------
    BRAND_NAME: "Your Business",
    AVATAR_TEXT: "YB",                 // 1-3 letters shown in the avatar
    GREETING: "Hi! 👋 Welcome to {brand}. I can help connect you with us. " +
              "What can we help you with?",
    COLORS: {
      navy:       "#0f1f3d",           // header / dark accent
      accent:     "#f97316",           // launcher + buttons
      accentDark: "#ea580c"            // hover state
    },

    // ---- Conversation options (edit freely) ------------------------
    SERVICES: ["General Inquiry", "Sales", "Support", "Quote", "Other"],
    CITIES:   ["My City", "Other"],    // set to [] to skip the location step
    URGENCY:  ["ASAP", "Within a week", "Just getting quotes"],

    // ---- Behavior --------------------------------------------------
    TYPING_DELAY_MS: 700,
    OPEN_ON_LOAD: false
  };

  /* ===================================================================
   * 2. STYLES (injected)
   * =================================================================== */
  var CSS = [
    ":root{",
    "  --cb-navy:" + CONFIG.COLORS.navy + ";",
    "  --cb-accent:" + CONFIG.COLORS.accent + ";",
    "  --cb-accent-dark:" + CONFIG.COLORS.accentDark + ";",
    "}",
    ".cb-root{position:fixed;bottom:20px;right:20px;z-index:2147483000;",
    "  font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;}",
    ".cb-root *{box-sizing:border-box;}",
    /* Launcher */
    ".cb-launcher{width:60px;height:60px;border-radius:50%;border:none;cursor:pointer;",
    "  background:var(--cb-accent);color:#fff;display:flex;align-items:center;justify-content:center;",
    "  box-shadow:0 6px 20px rgba(0,0,0,.25);transition:transform .15s ease,background .15s ease;}",
    ".cb-launcher:hover{background:var(--cb-accent-dark);transform:scale(1.05);}",
    ".cb-launcher:focus-visible{outline:3px solid #fff;outline-offset:2px;}",
    ".cb-launcher svg{width:28px;height:28px;}",
    ".cb-launcher.cb-hidden{display:none;}",
    /* Window */
    ".cb-window{position:absolute;bottom:0;right:0;width:350px;height:500px;max-height:80vh;",
    "  background:#fff;border-radius:16px;overflow:hidden;display:flex;flex-direction:column;",
    "  box-shadow:0 12px 40px rgba(0,0,0,.3);transform:translateY(20px) scale(.96);",
    "  opacity:0;pointer-events:none;transition:transform .22s ease,opacity .22s ease;}",
    ".cb-window.cb-open{transform:translateY(0) scale(1);opacity:1;pointer-events:auto;}",
    /* Header */
    ".cb-header{background:var(--cb-navy);color:#fff;padding:14px 16px;display:flex;align-items:center;gap:10px;}",
    ".cb-avatar{width:38px;height:38px;border-radius:50%;background:var(--cb-accent);",
    "  display:flex;align-items:center;justify-content:center;font-weight:700;font-size:13px;flex-shrink:0;}",
    ".cb-htext{flex:1;line-height:1.2;}",
    ".cb-htext strong{display:block;font-size:15px;}",
    ".cb-htext span{font-size:12px;opacity:.8;display:flex;align-items:center;gap:5px;}",
    ".cb-dot{width:8px;height:8px;border-radius:50%;background:#22c55e;display:inline-block;}",
    ".cb-close{background:none;border:none;color:#fff;cursor:pointer;padding:4px;border-radius:6px;opacity:.85;}",
    ".cb-close:hover{opacity:1;background:rgba(255,255,255,.12);}",
    ".cb-close:focus-visible{outline:2px solid #fff;}",
    /* Messages */
    ".cb-msgs{flex:1;overflow-y:auto;padding:16px;background:#f7f8fa;display:flex;flex-direction:column;gap:10px;}",
    ".cb-row{display:flex;gap:8px;align-items:flex-end;max-width:100%;}",
    ".cb-row.cb-user{flex-direction:row-reverse;}",
    ".cb-bubble{padding:10px 13px;border-radius:14px;font-size:14px;line-height:1.4;max-width:78%;",
    "  word-wrap:break-word;white-space:pre-wrap;}",
    ".cb-bot .cb-bubble{background:#fff;color:#1a2233;border:1px solid #e6e9ef;border-bottom-left-radius:4px;}",
    ".cb-user .cb-bubble{background:#e9edf3;color:#1a2233;border-bottom-right-radius:4px;}",
    ".cb-mini-avatar{width:26px;height:26px;border-radius:50%;background:var(--cb-accent);color:#fff;",
    "  display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;flex-shrink:0;}",
    /* Typing */
    ".cb-typing{display:flex;gap:4px;padding:4px 2px;}",
    ".cb-typing span{width:7px;height:7px;border-radius:50%;background:#bbb;display:inline-block;",
    "  animation:cb-bounce 1.2s infinite ease-in-out;}",
    ".cb-typing span:nth-child(2){animation-delay:.15s;}",
    ".cb-typing span:nth-child(3){animation-delay:.3s;}",
    "@keyframes cb-bounce{0%,80%,100%{transform:scale(.7);opacity:.5;}40%{transform:scale(1);opacity:1;}}",
    /* Quick reply chips */
    ".cb-quick{display:flex;flex-wrap:wrap;gap:8px;padding:0 16px 10px;background:#f7f8fa;}",
    ".cb-chip{border:1px solid var(--cb-accent);background:#fff;color:var(--cb-accent-dark);",
    "  border-radius:18px;padding:7px 13px;font-size:13px;cursor:pointer;transition:.12s;}",
    ".cb-chip:hover{background:var(--cb-accent);color:#fff;}",
    /* Summary */
    ".cb-summary{font-size:13px;}",
    ".cb-srow{display:flex;justify-content:space-between;gap:10px;padding:3px 0;border-bottom:1px solid #eef0f4;}",
    ".cb-skey{color:#7a8190;font-weight:600;}",
    ".cb-sval{color:#1a2233;text-align:right;}",
    /* Input */
    ".cb-input-bar{display:flex;gap:8px;padding:12px;border-top:1px solid #e6e9ef;background:#fff;}",
    ".cb-input{flex:1;border:1px solid #d8dce4;border-radius:22px;padding:10px 14px;font-size:14px;outline:none;}",
    ".cb-input:focus{border-color:var(--cb-accent);}",
    ".cb-input:disabled{background:#f1f2f5;cursor:not-allowed;}",
    ".cb-send{width:42px;height:42px;border:none;border-radius:50%;background:var(--cb-accent);color:#fff;",
    "  cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;}",
    ".cb-send:hover{background:var(--cb-accent-dark);}",
    ".cb-send:disabled{opacity:.5;cursor:not-allowed;}",
    "@media(max-width:420px){.cb-window{width:calc(100vw - 32px);height:calc(100vh - 100px);}}"
  ].join("");

  function injectStyles() {
    var s = document.createElement("style");
    s.textContent = CSS;
    document.head.appendChild(s);
  }

  /* ===================================================================
   * 3. ICONS
   * =================================================================== */
  var ICON_CHAT =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" ' +
    'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7' +
    'a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>';
  var ICON_CLOSE =
    '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
    'stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg>';
  var ICON_SEND =
    '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
    'stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>';

  /* ===================================================================
   * 4. STATE
   * =================================================================== */
  var STEP = {
    SERVICE: 0, CITY: 1, CITY_OTHER: 2, JOB: 3, URGENCY: 4,
    NAME: 5, CONTACT: 6, CONFIRM: 7, DONE: 8
  };
  var lead = {
    service: "", city: "", job: "", urgency: "",
    name: "", contact: "", timestamp: ""
  };
  var step = STEP.SERVICE;
  var el = {}; // DOM refs assigned in build()

  /* ===================================================================
   * 5. HELPERS
   * =================================================================== */
  function $(tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  }
  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }
  function scrollDown() { el.msgs.scrollTop = el.msgs.scrollHeight; }

  function addUserMsg(text) {
    var row = $("div", "cb-row cb-user");
    row.appendChild($("div", "cb-bubble", escapeHtml(text)));
    el.msgs.appendChild(row);
    scrollDown();
  }
  // Adds a bot message after a typing indicator. cb runs after it lands.
  function addBotMsg(html, cb) {
    var typing = $("div", "cb-row cb-bot");
    typing.appendChild($("div", "cb-mini-avatar", escapeHtml(CONFIG.AVATAR_TEXT)));
    var bubble = $("div", "cb-bubble");
    bubble.appendChild($("div", "cb-typing", "<span></span><span></span><span></span>"));
    typing.appendChild(bubble);
    el.msgs.appendChild(typing);
    scrollDown();
    setTimeout(function () {
      el.msgs.removeChild(typing);
      var row = $("div", "cb-row cb-bot");
      row.appendChild($("div", "cb-mini-avatar", escapeHtml(CONFIG.AVATAR_TEXT)));
      row.appendChild($("div", "cb-bubble", html));
      el.msgs.appendChild(row);
      scrollDown();
      if (cb) cb();
    }, CONFIG.TYPING_DELAY_MS);
  }
  function clearQuick() { el.quick.innerHTML = ""; }
  function showQuick(options, onPick) {
    clearQuick();
    options.forEach(function (opt) {
      var chip = $("button", "cb-chip", escapeHtml(opt));
      chip.type = "button";
      chip.addEventListener("click", function () {
        addUserMsg(opt);
        clearQuick();
        onPick(opt);
      });
      el.quick.appendChild(chip);
    });
  }
  function setInputEnabled(enabled, placeholder) {
    el.input.disabled = !enabled;
    el.send.disabled = !enabled;
    if (enabled) {
      el.input.placeholder = placeholder || "Type your message…";
      el.input.value = "";
      el.input.focus();
    }
  }
  function validContact(v) {
    if (v.indexOf("@") !== -1) return true;          // looks like email
    var digits = v.replace(/\D/g, "");
    return digits.length >= 10;                       // 10+ digits = phone
  }

  /* ===================================================================
   * 6. CONVERSATION FLOW
   * =================================================================== */
  function startConversation() {
    if (el.msgs.dataset.started) return;
    el.msgs.dataset.started = "1";
    askService();
  }
  function askService() {
    step = STEP.SERVICE;
    setInputEnabled(false);
    var greet = CONFIG.GREETING.replace("{brand}", escapeHtml(CONFIG.BRAND_NAME));
    addBotMsg(greet, function () {
      showQuick(CONFIG.SERVICES, function (val) {
        lead.service = val;
        askCity();
      });
    });
  }
  function askCity() {
    if (!CONFIG.CITIES || !CONFIG.CITIES.length) { askJob(); return; }
    step = STEP.CITY;
    setInputEnabled(false);
    addBotMsg("Great! What city/area are you located in?", function () {
      showQuick(CONFIG.CITIES, function (val) {
        if (val === "Other") {
          step = STEP.CITY_OTHER;
          setInputEnabled(true, "Type your city…");
        } else {
          lead.city = val;
          askJob();
        }
      });
    });
  }
  function askJob() {
    step = STEP.JOB;
    addBotMsg("Can you briefly describe what you need help with?", function () {
      setInputEnabled(true, "Describe your request…");
    });
  }
  function askUrgency() {
    step = STEP.URGENCY;
    setInputEnabled(false);
    addBotMsg("How soon do you need this?", function () {
      showQuick(CONFIG.URGENCY, function (val) {
        lead.urgency = val;
        askName();
      });
    });
  }
  function askName() {
    step = STEP.NAME;
    addBotMsg("Perfect. What's your name?", function () {
      setInputEnabled(true, "Your name…");
    });
  }
  function askContact() {
    step = STEP.CONTACT;
    addBotMsg("And the best email or phone number to reach you?", function () {
      setInputEnabled(true, "Email or phone…");
    });
  }
  function confirmLead() {
    step = STEP.CONFIRM;
    setInputEnabled(false);
    lead.timestamp = new Date().toLocaleString();

    var intro = "Thanks, " + escapeHtml(lead.name) + "! We'll review your request" +
      (lead.service ? " about " + escapeHtml(lead.service) : "") +
      " and be in touch soon. 🏠";

    addBotMsg(intro, function () {
      var rows = [
        ["Service", lead.service],
        ["Location", lead.city],
        ["Details", lead.job],
        ["Urgency", lead.urgency],
        ["Name", lead.name],
        ["Contact", lead.contact]
      ];
      var html = '<div class="cb-summary">';
      rows.forEach(function (r) {
        if (!r[1]) return;
        html += '<div class="cb-srow"><span class="cb-skey">' + escapeHtml(r[0]) +
          '</span><span class="cb-sval">' + escapeHtml(r[1]) + "</span></div>";
      });
      html += "</div>";
      addBotMsg(html, function () {
        submitLead();
        step = STEP.DONE;
      });
    });
  }

  // Routes free-text input depending on the current step
  function handleText(text) {
    text = text.trim();
    if (!text) return;
    switch (step) {
      case STEP.CITY_OTHER:
        addUserMsg(text); lead.city = text; askJob(); break;
      case STEP.JOB:
        addUserMsg(text); lead.job = text; askUrgency(); break;
      case STEP.NAME:
        addUserMsg(text); lead.name = text; askContact(); break;
      case STEP.CONTACT:
        addUserMsg(text);
        if (!validContact(text)) {
          addBotMsg("Hmm, that doesn't look quite right. Please enter a valid " +
            "email address or a 10-digit phone number. 🙂");
          return;
        }
        lead.contact = text; confirmLead(); break;
      default:
        break;
    }
  }

  /* ===================================================================
   * 7. SUBMISSION
   * =================================================================== */
  function submitLead() {
    if (CONFIG.DELIVERY_METHOD === "webhook") {
      sendWebhook();
    } else {
      sendEmailJS();
    }
  }
  function sendWebhook() {
    try {
      fetch(CONFIG.WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead)
      });
    } catch (e) { /* fail silently — user already saw confirmation */ }
  }
  function sendEmailJS() {
    function send() {
      if (!window.emailjs) return;
      try {
        window.emailjs.init(CONFIG.EMAILJS_PUBLIC_KEY);
        window.emailjs.send(CONFIG.EMAILJS_SERVICE_ID, CONFIG.EMAILJS_TEMPLATE_ID, {
          to_email: CONFIG.OWNER_EMAIL,
          service: lead.service,
          city: lead.city,
          job: lead.job,
          urgency: lead.urgency,
          name: lead.name,
          contact: lead.contact,
          timestamp: lead.timestamp
        });
      } catch (e) { /* fail silently */ }
    }
    if (window.emailjs) { send(); return; }
    // Lazy-load the EmailJS SDK if it's not already on the page
    var s = document.createElement("script");
    s.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";
    s.onload = send;
    document.head.appendChild(s);
  }

  /* ===================================================================
   * 8. BUILD UI
   * =================================================================== */
  function build() {
    injectStyles();

    var root = $("div", "cb-root");

    // Launcher
    var launcher = $("button", "cb-launcher", ICON_CHAT);
    launcher.type = "button";
    launcher.setAttribute("aria-label", "Open chat");

    // Window
    var win = $("div", "cb-window");

    // Header
    var header = $("div", "cb-header");
    header.appendChild($("div", "cb-avatar", escapeHtml(CONFIG.AVATAR_TEXT)));
    var htext = $("div", "cb-htext",
      "<strong>" + escapeHtml(CONFIG.BRAND_NAME) + "</strong>" +
      '<span><span class="cb-dot"></span>Typically replies in minutes</span>');
    header.appendChild(htext);
    var close = $("button", "cb-close", ICON_CLOSE);
    close.type = "button";
    close.setAttribute("aria-label", "Close chat");
    header.appendChild(close);

    // Body
    var msgs = $("div", "cb-msgs");
    var quick = $("div", "cb-quick");

    // Input bar
    var bar = $("div", "cb-input-bar");
    var input = $("input", "cb-input");
    input.type = "text";
    input.placeholder = "Type your message…";
    input.disabled = true;
    var send = $("button", "cb-send", ICON_SEND);
    send.type = "button";
    send.disabled = true;
    send.setAttribute("aria-label", "Send");
    bar.appendChild(input);
    bar.appendChild(send);

    win.appendChild(header);
    win.appendChild(msgs);
    win.appendChild(quick);
    win.appendChild(bar);
    root.appendChild(win);
    root.appendChild(launcher);
    document.body.appendChild(root);

    el = { root: root, launcher: launcher, win: win, msgs: msgs, quick: quick, input: input, send: send };

    function open() {
      win.classList.add("cb-open");
      launcher.classList.add("cb-hidden");
      startConversation();
    }
    function closeWin() {
      win.classList.remove("cb-open");
      launcher.classList.remove("cb-hidden");
    }

    launcher.addEventListener("click", open);
    close.addEventListener("click", closeWin);
    send.addEventListener("click", function () { handleText(input.value); });
    input.addEventListener("keydown", function (e) {
      if (e.key === "Enter") { e.preventDefault(); handleText(input.value); }
    });

    if (CONFIG.OPEN_ON_LOAD) open();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", build);
  } else {
    build();
  }
})();
