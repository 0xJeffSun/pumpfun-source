// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, n) => {
  Object.defineProperty(n, "__esModule", { value: !0 });
  var r = {
    cleanup: function () {
      return h;
    },
    deleteFromLru: function () {
      return f;
    },
    lruPut: function () {
      return c;
    },
    updateLruSize: function () {
      return s;
    },
  };
  for (var a in r) Object.defineProperty(n, a, { enumerable: !0, get: r[a] });
  let l = e.r(948176),
    u = e.r(685003),
    o = null,
    i = 0;
  function c(e) {
    if (o === e) return;
    let t = e.prev,
      n = e.next;
    if (
      (null === n || null === t
        ? ((i += e.size), d())
        : ((t.next = n), (n.prev = t)),
      null === o)
    )
      ((e.prev = e), (e.next = e));
    else {
      let t = o.prev;
      ((e.prev = t), null !== t && (t.next = e), (e.next = o), (o.prev = e));
    }
    o = e;
  }
  function s(e, t) {
    let n = e.size;
    ((e.size = t), null !== e.next && ((i = i - n + t), d()));
  }
  function f(e) {
    let t = e.next,
      n = e.prev;
    null !== t &&
      null !== n &&
      ((i -= e.size),
      (e.next = null),
      (e.prev = null),
      o === e
        ? t === o
          ? (o = null)
          : ((o = t), (n.next = t), (t.prev = n))
        : ((n.next = t), (t.prev = n)));
  }
  function d() {
    i <= 0x3200000 || (0, u.pingPrefetchScheduler)();
  }
  function h() {
    if (!(i <= 0x3200000))
      for (; i > 0x2d00000 && null !== o; ) {
        let e = o.prev;
        null !== e && (0, l.deleteMapEntry)(e);
      }
  }
  ("function" == typeof n.default ||
    ("object" == typeof n.default && null !== n.default)) &&
    void 0 === n.default.__esModule &&
    (Object.defineProperty(n.default, "__esModule", { value: !0 }),
    Object.assign(n.default, n),
    (t.exports = n.default));
};
