// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  if (
    (e.i(149502), /(?:^|;\s)__vercel_toolbar=1(?:;|$)/.test(document.cookie))
  ) {
    var n = document.createElement("script");
    ((n.src = "https://vercel.live/_next-live/feedback/feedback.js"),
      n.setAttribute("data-explicit-opt-in", "true"),
      n.setAttribute("data-cookie-opt-in", "true"),
      n.setAttribute("data-deployment-id", globalThis.NEXT_DEPLOYMENT_ID),
      (document.head || document.documentElement).appendChild(n));
  }
};
