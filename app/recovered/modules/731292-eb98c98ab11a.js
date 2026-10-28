// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  t.exports = {
    id: "google-maps-embed",
    description: "Embed a Google Maps embed on your webpage",
    website:
      "https://developers.google.com/maps/documentation/embed/get-started",
    html: {
      element: "iframe",
      attributes: {
        loading: "lazy",
        src: {
          url: "https://www.google.com/maps/embed/v1/place",
          slugParam: "mode",
          params: [
            "key",
            "q",
            "center",
            "zoom",
            "maptype",
            "language",
            "region",
          ],
        },
        referrerpolicy: "no-referrer-when-downgrade",
        frameborder: "0",
        style: "border:0",
        allowfullscreen: !0,
        width: null,
        height: null,
      },
    },
  };
};
