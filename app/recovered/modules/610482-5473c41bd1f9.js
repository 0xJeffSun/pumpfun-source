// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, n) => {
  var r = Object.prototype.hasOwnProperty,
    o = "~";
  function i() {}
  function u(e, t, n) {
    ((this.fn = e), (this.context = t), (this.once = n || !1));
  }
  function a(e, t, n, r, i) {
    if ("function" != typeof n)
      throw TypeError("The listener must be a function");
    var a = new u(n, r || e, i),
      l = o ? o + t : t;
    return (
      e._events[l]
        ? e._events[l].fn
          ? (e._events[l] = [e._events[l], a])
          : e._events[l].push(a)
        : ((e._events[l] = a), e._eventsCount++),
      e
    );
  }
  function l(e, t) {
    0 == --e._eventsCount ? (e._events = new i()) : delete e._events[t];
  }
  function c() {
    ((this._events = new i()), (this._eventsCount = 0));
  }
  (Object.create &&
    ((i.prototype = Object.create(null)), new i().__proto__ || (o = !1)),
    (c.prototype.eventNames = function () {
      var e,
        t,
        n = [];
      if (0 === this._eventsCount) return n;
      for (t in (e = this._events)) r.call(e, t) && n.push(o ? t.slice(1) : t);
      return Object.getOwnPropertySymbols
        ? n.concat(Object.getOwnPropertySymbols(e))
        : n;
    }),
    (c.prototype.listeners = function (e) {
      var t = o ? o + e : e,
        n = this._events[t];
      if (!n) return [];
      if (n.fn) return [n.fn];
      for (var r = 0, i = n.length, u = Array(i); r < i; r++) u[r] = n[r].fn;
      return u;
    }),
    (c.prototype.listenerCount = function (e) {
      var t = o ? o + e : e,
        n = this._events[t];
      return n ? (n.fn ? 1 : n.length) : 0;
    }),
    (c.prototype.emit = function (e, t, n, r, i, u) {
      var a = o ? o + e : e;
      if (!this._events[a]) return !1;
      var l,
        c,
        s = this._events[a],
        f = arguments.length;
      if (s.fn) {
        switch ((s.once && this.removeListener(e, s.fn, void 0, !0), f)) {
          case 1:
            return (s.fn.call(s.context), !0);
          case 2:
            return (s.fn.call(s.context, t), !0);
          case 3:
            return (s.fn.call(s.context, t, n), !0);
          case 4:
            return (s.fn.call(s.context, t, n, r), !0);
          case 5:
            return (s.fn.call(s.context, t, n, r, i), !0);
          case 6:
            return (s.fn.call(s.context, t, n, r, i, u), !0);
        }
        for (c = 1, l = Array(f - 1); c < f; c++) l[c - 1] = arguments[c];
        s.fn.apply(s.context, l);
      } else {
        var d,
          m = s.length;
        for (c = 0; c < m; c++)
          switch (
            (s[c].once && this.removeListener(e, s[c].fn, void 0, !0), f)
          ) {
            case 1:
              s[c].fn.call(s[c].context);
              break;
            case 2:
              s[c].fn.call(s[c].context, t);
              break;
            case 3:
              s[c].fn.call(s[c].context, t, n);
              break;
            case 4:
              s[c].fn.call(s[c].context, t, n, r);
              break;
            default:
              if (!l)
                for (d = 1, l = Array(f - 1); d < f; d++)
                  l[d - 1] = arguments[d];
              s[c].fn.apply(s[c].context, l);
          }
      }
      return !0;
    }),
    (c.prototype.on = function (e, t, n) {
      return a(this, e, t, n, !1);
    }),
    (c.prototype.once = function (e, t, n) {
      return a(this, e, t, n, !0);
    }),
    (c.prototype.removeListener = function (e, t, n, r) {
      var i = o ? o + e : e;
      if (!this._events[i]) return this;
      if (!t) return (l(this, i), this);
      var u = this._events[i];
      if (u.fn)
        u.fn !== t || (r && !u.once) || (n && u.context !== n) || l(this, i);
      else {
        for (var a = 0, c = [], s = u.length; a < s; a++)
          (u[a].fn !== t || (r && !u[a].once) || (n && u[a].context !== n)) &&
            c.push(u[a]);
        c.length ? (this._events[i] = 1 === c.length ? c[0] : c) : l(this, i);
      }
      return this;
    }),
    (c.prototype.removeAllListeners = function (e) {
      var t;
      return (
        e
          ? ((t = o ? o + e : e), this._events[t] && l(this, t))
          : ((this._events = new i()), (this._eventsCount = 0)),
        this
      );
    }),
    (c.prototype.off = c.prototype.removeListener),
    (c.prototype.addListener = c.prototype.on),
    (c.prefixed = o),
    (c.EventEmitter = c),
    (t.exports = c));
};
