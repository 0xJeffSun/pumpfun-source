// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  var a = "u" > typeof Element,
    n = "function" == typeof Map,
    o = "function" == typeof Set,
    i = "function" == typeof ArrayBuffer && !!ArrayBuffer.isView;
  t.exports = function (e, t) {
    try {
      return (function e(t, r) {
        if (t === r) return !0;
        if (t && r && "object" == typeof t && "object" == typeof r) {
          var l, s, u, c;
          if (t.constructor !== r.constructor) return !1;
          if (Array.isArray(t)) {
            if ((l = t.length) != r.length) return !1;
            for (s = l; 0 != s--; ) if (!e(t[s], r[s])) return !1;
            return !0;
          }
          if (n && t instanceof Map && r instanceof Map) {
            if (t.size !== r.size) return !1;
            for (c = t.entries(); !(s = c.next()).done; )
              if (!r.has(s.value[0])) return !1;
            for (c = t.entries(); !(s = c.next()).done; )
              if (!e(s.value[1], r.get(s.value[0]))) return !1;
            return !0;
          }
          if (o && t instanceof Set && r instanceof Set) {
            if (t.size !== r.size) return !1;
            for (c = t.entries(); !(s = c.next()).done; )
              if (!r.has(s.value[0])) return !1;
            return !0;
          }
          if (i && ArrayBuffer.isView(t) && ArrayBuffer.isView(r)) {
            if ((l = t.length) != r.length) return !1;
            for (s = l; 0 != s--; ) if (t[s] !== r[s]) return !1;
            return !0;
          }
          if (t.constructor === RegExp)
            return t.source === r.source && t.flags === r.flags;
          if (
            t.valueOf !== Object.prototype.valueOf &&
            "function" == typeof t.valueOf &&
            "function" == typeof r.valueOf
          )
            return t.valueOf() === r.valueOf();
          if (
            t.toString !== Object.prototype.toString &&
            "function" == typeof t.toString &&
            "function" == typeof r.toString
          )
            return t.toString() === r.toString();
          if ((l = (u = Object.keys(t)).length) !== Object.keys(r).length)
            return !1;
          for (s = l; 0 != s--; )
            if (!Object.prototype.hasOwnProperty.call(r, u[s])) return !1;
          if (a && t instanceof Element) return !1;
          for (s = l; 0 != s--; )
            if (
              (("_owner" !== u[s] && "__v" !== u[s] && "__o" !== u[s]) ||
                !t.$$typeof) &&
              !e(t[u[s]], r[u[s]])
            )
              return !1;
          return !0;
        }
        return t != t && r != r;
      })(e, t);
    } catch (e) {
      if ((e.message || "").match(/stack|recursion/i))
        return (
          console.warn("react-fast-compare cannot handle circular refs"),
          !1
        );
      throw e;
    }
  };
};
