// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(194672),
    n = e.i(163981);
  e.s([
    "f",
    0,
    function (e, r, i) {
      let o = e.getReader(),
        s = [],
        u = 0;
      function a() {
        let e, t;
        if ((o.cancel().catch(n.z), i.collectStreamBody)) {
          let n;
          if (1 === s.length) n = s[0];
          else {
            n = new Uint8Array(u);
            let e = 0;
            s.forEach((t) => {
              (n.set(t, e), (e += t.length));
            });
          }
          ((e = n.slice(0, i.bytesLimit)), (t = n.length > i.bytesLimit));
        }
        r(void 0, e, t);
      }
      !(function e() {
        o.read().then(
          (0, t.l)((t) => {
            t.done
              ? a()
              : (i.collectStreamBody && s.push(t.value),
                (u += t.value.length) > i.bytesLimit ? a() : e());
          }),
          (0, t.l)((e) => r(e)),
        );
      })();
    },
  ]);
};
