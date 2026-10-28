/*
 * First-visit terms dialog ("clickwrap"). The captured pages decide its visibility
 * in a pre-paint script; this reconstructs that behavior from the captured script
 * and inline style: out-of-scope paths and accepted visitors never see the dialog.
 */

export const CLICKWRAP_COOKIE = 'clickwrap_accepted';
export const CLICKWRAP_MAX_AGE = 60 * 60 * 24 * 365;

/** Path prefixes the captured script treats as out of scope (`data-clickwrap-oos`). */
const OUT_OF_SCOPE_PREFIXES = ['/docs', '/landing', '/u', '/join', '/livechat', '/moderation', '/blocked', '/r', '/voice-chat', '/coin-share', '/c'];
/** Solana or EVM address profile paths, optionally with `/@name`. */
const OUT_OF_SCOPE_PROFILE = '^/([1-9A-HJ-NP-Za-km-z]{32,44}|0x[0-9a-fA-F]{40})(?:/@([^/]+))?/?$';

export function isClickwrapOutOfScope(pathname: string): boolean {
  return (
    OUT_OF_SCOPE_PREFIXES.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)) ||
    new RegExp(OUT_OF_SCOPE_PROFILE).test(pathname)
  );
}

/** Runs at the start of <body>: marks out-of-scope or accepted visits before the dialog paints. */
export const CLICKWRAP_STATE_SCRIPT =
  `(function(){try{var d=document.documentElement,p=location.pathname,o=${JSON.stringify(OUT_OF_SCOPE_PREFIXES)};` +
  `for(var i=0;i<o.length;i++){if(p===o[i]||p.indexOf(o[i]+'/')===0){d.setAttribute('data-clickwrap-oos','');return;}}` +
  `if(new RegExp(${JSON.stringify(OUT_OF_SCOPE_PROFILE)}).test(p)){d.setAttribute('data-clickwrap-oos','');return;}` +
  `if(document.cookie.split('; ').indexOf('${CLICKWRAP_COOKIE}=true')>-1)d.setAttribute('data-clickwrap-accepted','');}catch(e){}})();`;

/** Runs after the shell markup: while the dialog is visible, the shell behind it is inert. */
export const CLICKWRAP_INERT_SCRIPT =
  `(function(){try{var d=document.documentElement;if(d.hasAttribute('data-clickwrap-oos')||d.hasAttribute('data-clickwrap-accepted'))return;` +
  `var s=document.querySelector('[data-app-shell]');if(s)s.setAttribute('inert','');}catch(e){}})();`;
