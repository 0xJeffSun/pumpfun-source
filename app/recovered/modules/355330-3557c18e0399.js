// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    r = e.i(352386),
    l = e.i(192943);
  e.s(
    [
      "f",
      0,
      function (e) {
        let a,
          i,
          n = (0, t.c)(4),
          { path: s, enabled: o } = e,
          [d, c] = (0, r.useState)(null);
        return (
          n[0] !== o || n[1] !== s
            ? ((a = () => {
                if ((c(null), !o || !s)) return;
                let e = !1;
                return (
                  (0, l.Z)(s).then((t) => {
                    e || c(t);
                  }),
                  () => {
                    e = !0;
                  }
                );
              }),
              (i = [o, s]),
              (n[0] = o),
              (n[1] = s),
              (n[2] = a),
              (n[3] = i))
            : ((a = n[2]), (i = n[3])),
          (0, r.useEffect)(a, i),
          d
        );
      },
    ],
    355330,
  );
  let a = async (e, t) => {
    let r = await fetch("/api/share-video/download", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        url: ((e) => {
          let t = new TextEncoder().encode(e),
            r = "";
          for (let e of t) r += String.fromCharCode(e);
          return btoa(r)
            .replace(/\+/g, "-")
            .replace(/\//g, "_")
            .replace(/=+$/, "");
        })(e),
        filename: t,
      }),
    });
    if (!r.ok) throw Error(`share video download ${r.status}`);
    return r.blob();
  };
  e.s(["f", 0, a], 98642);
};
