// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  (Object.defineProperty(r, "__esModule", { value: !0 }),
    Object.defineProperty(r, "default", {
      enumerable: !0,
      get: function () {
        return a;
      },
    }),
    e.r(836437));
  let n = e.r(732486);
  e.r(352386);
  let o = e.r(128612),
    i = e.r(26555),
    a = function ({ error: e }) {
      let t = e?.digest,
        r = !!t;
      return (
        (0, o.handleISRError)({ error: e }),
        (0, n.jsxs)("html", {
          id: "__next_error__",
          children: [
            (0, n.jsx)("head", {
              children: (0, n.jsx)("style", {
                dangerouslySetInnerHTML: { __html: i.errorThemeCss },
              }),
            }),
            (0, n.jsxs)("body", {
              children: [
                (0, n.jsx)("div", {
                  style: i.errorStyles.container,
                  children: (0, n.jsxs)("div", {
                    style: i.errorStyles.card,
                    children: [
                      (0, n.jsx)(i.WarningIcon, {}),
                      (0, n.jsx)("h1", {
                        style: i.errorStyles.title,
                        children: "This page couldn’t load",
                      }),
                      (0, n.jsx)("p", {
                        style: i.errorStyles.message,
                        children: r
                          ? "A server error occurred. Reload to try again."
                          : "Reload to try again, or go back.",
                      }),
                      (0, n.jsxs)("div", {
                        style: i.errorStyles.buttonGroup,
                        children: [
                          (0, n.jsx)("form", {
                            style: i.errorStyles.form,
                            children: (0, n.jsx)("button", {
                              type: "submit",
                              style: i.errorStyles.button,
                              children: "Reload",
                            }),
                          }),
                          !r &&
                            (0, n.jsx)("button", {
                              type: "button",
                              style: i.errorStyles.buttonSecondary,
                              onClick: () => {
                                window.history.length > 1
                                  ? window.history.back()
                                  : (window.location.href = "/");
                              },
                              children: "Back",
                            }),
                        ],
                      }),
                    ],
                  }),
                }),
                t &&
                  (0, n.jsxs)("p", {
                    style: i.errorStyles.digestFooter,
                    children: ["ERROR ", t],
                  }),
              ],
            }),
          ],
        })
      );
    };
  ("function" == typeof r.default ||
    ("object" == typeof r.default && null !== r.default)) &&
    void 0 === r.default.__esModule &&
    (Object.defineProperty(r.default, "__esModule", { value: !0 }),
    Object.assign(r.default, r),
    (t.exports = r.default));
};
