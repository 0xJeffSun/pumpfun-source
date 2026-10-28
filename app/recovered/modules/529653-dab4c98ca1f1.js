// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(352386),
    r = e.i(759257),
    l = e.i(466931);
  e.s([
    "f",
    0,
    function () {
      let [e, a] = (0, t.useState)(!1),
        i = (0, t.useRef)(!1),
        n = (0, t.useRef)(new Map());
      return {
        render: async ({
          foregroundPng: e,
          compose: t,
          width: s,
          height: o,
          cacheKey: d,
        }) => {
          let c,
            u = n.current.get(d);
          if (u) return { status: "ok", videoUrl: u };
          if (i.current) return { status: "busy" };
          ((i.current = !0), a(!0));
          try {
            let l =
                "tier" in t
                  ? { tier: t.tier }
                  : "backgroundUrl" in t
                    ? { backgroundUrl: t.backgroundUrl, fit: t.fit }
                    : { background: t.file, fit: t.fit },
              a =
                "durationSeconds" in t && null != t.durationSeconds
                  ? Math.min(15, Math.max(1, t.durationSeconds))
                  : void 0,
              { videoUrl: i } = await (0, r.j)({
                hooks: {
                  afterResponse: [
                    (e, t, r) => {
                      c = r.status;
                    },
                  ],
                },
              })("POST /share-video/pnl", {
                body: {
                  foreground: new File([e], "foreground.png", {
                    type: "image/png",
                  }),
                  ...l,
                  durationSeconds: a,
                  width: s,
                  height: o,
                },
                credentials: "include",
              });
            return (n.current.set(d, i), { status: "ok", videoUrl: i });
          } catch (t) {
            if (void 0 === c)
              return (
                (0, l.l)({
                  error: t,
                  feature: "share",
                  operation: "pnl-video-export",
                  context: { reason: "network" },
                }),
                { status: "error", reason: "network" }
              );
            let e = 401 === c || 403 === c ? "unauthorized" : "composite";
            return (
              (0, l.l)({
                error: t,
                feature: "share",
                operation: "pnl-video-export",
                context: { status: c, reason: e },
              }),
              { status: "error", reason: e }
            );
          } finally {
            ((i.current = !1), a(!1));
          }
        },
        forget: (e) => {
          n.current.delete(e);
        },
        isRendering: e,
      };
    },
  ]);
};
