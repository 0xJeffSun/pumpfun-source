// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = new WeakMap(),
    n = new WeakMap(),
    r = {},
    o = 0,
    a = function (e) {
      return e && (e.host || a(e.parentNode));
    },
    i = function (e, i, c, u) {
      var l = (Array.isArray(e) ? e : [e])
        .map(function (e) {
          if (i.contains(e)) return e;
          var t = a(e);
          return t && i.contains(t)
            ? t
            : (console.error(
                "aria-hidden",
                e,
                "in not contained inside",
                i,
                ". Doing nothing",
              ),
              null);
        })
        .filter(function (e) {
          return !!e;
        });
      r[c] || (r[c] = new WeakMap());
      var s = r[c],
        f = [],
        d = new Set(),
        p = new Set(l),
        v = function (e) {
          !e || d.has(e) || (d.add(e), v(e.parentNode));
        };
      l.forEach(v);
      var h = function (e) {
        !e ||
          p.has(e) ||
          Array.prototype.forEach.call(e.children, function (e) {
            if (d.has(e)) h(e);
            else
              try {
                var r = e.getAttribute(u),
                  o = null !== r && "false" !== r,
                  a = (t.get(e) || 0) + 1,
                  i = (s.get(e) || 0) + 1;
                (t.set(e, a),
                  s.set(e, i),
                  f.push(e),
                  1 === a && o && n.set(e, !0),
                  1 === i && e.setAttribute(c, "true"),
                  o || e.setAttribute(u, "true"));
              } catch (t) {
                console.error("aria-hidden: cannot operate on ", e, t);
              }
          });
      };
      return (
        h(i),
        d.clear(),
        o++,
        function () {
          (f.forEach(function (e) {
            var r = t.get(e) - 1,
              o = s.get(e) - 1;
            (t.set(e, r),
              s.set(e, o),
              r || (n.has(e) || e.removeAttribute(u), n.delete(e)),
              o || e.removeAttribute(c));
          }),
            --o ||
              ((t = new WeakMap()),
              (t = new WeakMap()),
              (n = new WeakMap()),
              (r = {})));
        }
      );
    };
  e.s([
    "f",
    0,
    function (e, t, n) {
      void 0 === n && (n = "data-aria-hidden");
      var r = Array.from(Array.isArray(e) ? e : [e]),
        o =
          t ||
          ("u" < typeof document
            ? null
            : (Array.isArray(e) ? e[0] : e).ownerDocument.body);
      return o
        ? (r.push.apply(
            r,
            Array.from(o.querySelectorAll("[aria-live], script")),
          ),
          i(r, o, n, "aria-hidden"))
        : function () {
            return null;
          };
    },
  ]);
};
