// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(303232);
  function n() {
    return { callback: null, cleanup: null, refs: [] };
  }
  function r(e, t) {
    if (((e.refs = t), t.every((e) => null == e))) {
      e.callback = null;
      return;
    }
    e.callback = (n) => {
      if ((e.cleanup && (e.cleanup(), (e.cleanup = null)), null != n)) {
        let r = Array(t.length).fill(null);
        for (let e = 0; e < t.length; e += 1) {
          let i = t[e];
          if (null != i)
            switch (typeof i) {
              case "function": {
                let t = i(n);
                "function" == typeof t && (r[e] = t);
                break;
              }
              case "object":
                i.current = n;
            }
        }
        e.cleanup = () => {
          for (let e = 0; e < t.length; e += 1) {
            let n = t[e];
            if (null != n)
              switch (typeof n) {
                case "function": {
                  let t = r[e];
                  "function" == typeof t ? t() : n(null);
                  break;
                }
                case "object":
                  n.current = null;
              }
          }
        };
      }
    };
  }
  e.s([
    "A",
    0,
    function (e, i, o, l) {
      var s, u, a, c, f;
      let d = (0, t.f)(n).current;
      return (
        (s = d),
        (u = e),
        (a = i),
        (c = o),
        (f = l),
        (s.refs[0] !== u ||
          s.refs[1] !== a ||
          s.refs[2] !== c ||
          s.refs[3] !== f) &&
          r(d, [e, i, o, l]),
        d.callback
      );
    },
    "f",
    0,
    function (e) {
      var i, o;
      let l = (0, t.f)(n).current;
      return (
        (i = l),
        (o = e),
        (i.refs.length !== o.length || i.refs.some((e, t) => e !== o[t])) &&
          r(l, e),
        l.callback
      );
    },
  ]);
};
