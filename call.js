  // Tap-to-dial bridge for Kai's Telegram reminders: Telegram strips tel: links,
  // so the reminder links here and this page forwards to tel:<n>.
  // After the dialer opens, the page tries to close itself so Telegram's in-app
  // browser does not stay on top of the chat: Telegram.WebApp.close() (only works
  // when opened as a Mini App), else window.close() (allowed for a fresh tab whose
  // history has one entry), and as a last resort a tg:// link back to the bot chat.
  // Mini App mode (preferred): the number links to t.me/<bot>?startapp=<code>, Telegram
  // opens this page as the bot's Main Mini App, and Telegram.WebApp.close() really closes
  // it (a plain in-app browser page cannot: iOS keeps it minimized as a bar).
  // start_param alphabet is [A-Za-z0-9_-], so * # + travel as s h p.
  var tg = (window.Telegram && Telegram.WebApp) ? Telegram.WebApp : null;
  var hp = new URLSearchParams(location.hash.slice(1));
  var startParam = (tg && tg.initDataUnsafe && tg.initDataUnsafe.start_param) || hp.get('tgWebAppStartParam') || '';
  var mini = !!(tg && (tg.initData || startParam));
  var q = new URLSearchParams(location.search);
  var n = startParam ? startParam.replace(/s/g, '*').replace(/h/g, '#').replace(/p/g, '+') : (q.get('n') || '');
  n = n.replace(/[^0-9*#+]/g, '');
  var bot = (q.get('b') || '').replace(/[^A-Za-z0-9_]/g, '');
  var href = 'tel:' + n.replace(/#/g, '%23');
  var a = document.getElementById('dial');
  var back = document.getElementById('back');
  var chat = bot ? 'tg://resolve?domain=' + bot : '';
  if (mini) { try { tg.ready(); } catch (e) {} back.textContent = 'סגירה'; back.href = '#'; back.style.display = 'block';
              back.onclick = function (e) { e.preventDefault(); closeMini(); }; }
  else if (chat) { back.href = chat; }

  function closeMini() { try { tg.close(); } catch (e) {} }

  function tryClose() {
    if (mini) { closeMini(); return; }
    try { window.close(); } catch (e) {}
    if (chat) { back.style.display = 'block'; }
  }

  var left = false;   // the dialer took the screen
  var closed = false;
  function afterDial() {
    if (closed) return;
    closed = true;
    tryClose();
    // Plain browser, still here a moment later (window.close ignored): jump back to the chat once.
    if (!mini && chat) { setTimeout(function () { if (document.visibilityState === 'visible') location.href = chat; }, 400); }
  }
  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'hidden') {
      left = true;
      // The call is under way: close the Mini App now so nothing is left when Omer returns.
      if (mini) { setTimeout(closeMini, 300); }
    }
    else if (left) { afterDial(); }
  });
  window.addEventListener('pagehide', function () { left = true; });

  // iOS Mini App: Telegram's WKWebView swallows every tel: navigation (href, location, and
  // WebApp.openLink accepts only http/https). macOS/desktop Mini Apps dial fine, so only iOS
  // detours on load: openLink this same page (?n=..&ext=1) in the real Safari app
  // (try_browser, Bot API 7.6+); Safari forwards to tel: and iOS shows its call prompt.
  // The green button inside ANY Mini App always takes the openLink path (a real tap is the
  // user gesture openLink needs). The grey line at the bottom is a debug readout.
  var iosMini = mini && tg.platform === 'ios';
  var ext = location.origin + location.pathname + '?n=' + encodeURIComponent(n) + '&ext=1' + (bot ? '&b=' + bot : '');
  var dbg = document.getElementById('dbg');
  var log = [];
  function show(msg) {
    if (msg) log.push(msg);
    if (!dbg) return;
    dbg.textContent = 'v' + (window.CALL_VER || '?') + ' | js=' + (tg ? 'yes' : 'no') +
      ' | platform=' + (tg ? tg.platform : '-') + ' | ver=' + (tg ? tg.version : '-') +
      ' | mini=' + mini + ' | ' + log.join(' | ');
  }
  function openExternal(why) {
    try { tg.openLink(ext, { try_browser: 'safari' }); show('openLink:' + why + ':ok'); return true; }
    catch (e) { show('openLink:' + why + ':ERR ' + (e && e.message ? e.message : e)); return false; }
  }

  if (n) {
    a.textContent = '📞 ' + n;
    if (mini) {
      a.href = '#';
      a.onclick = function (e) {
        e.preventDefault();
        if (openExternal('tap')) { setTimeout(closeMini, 2500); }
      };
      if (iosMini) { openExternal('load'); }
      else { location.replace(href); }
    } else {
      a.href = href;
      location.replace(href);
    }
  }
  show('');
