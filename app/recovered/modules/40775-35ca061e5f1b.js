// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  t.exports = {
    id: "google-analytics",
    description: "Install a Google Analytics tag on your website",
    website: "https://analytics.google.com/analytics/web/",
    scripts: [
      {
        url: "https://www.googletagmanager.com/gtag/js",
        params: ["id"],
        strategy: "worker",
        location: "head",
        action: "append",
      },
      {
        code: "window.dataLayer=window.dataLayer||[];window.gtag=function gtag(){window.dataLayer.push(arguments);};gtag('js',new Date());gtag('config','${args.id}')",
        strategy: "worker",
        location: "head",
        action: "append",
      },
    ],
  };
};
