// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    r = e.i(352386);
  let n = (e, t) => `${e ?? ""}\0${t}`,
    i = new Map(),
    a = new Map(),
    l = new Map(),
    s = [],
    o = [],
    c = new Set(),
    u = () => {
      for (let e of c) e();
    },
    d = () => "u" > typeof URL && "function" == typeof URL.createObjectURL,
    f = (e) =>
      void 0 === e.image
        ? { content: e.content }
        : {
            content: e.content,
            image: {
              ...e.image,
              previewUrl: d() ? URL.createObjectURL(e.image.file) : "",
            },
          },
    m = (e) => {
      let t = i.get(e);
      if (void 0 !== t) {
        if (d())
          for (let e of t.links)
            void 0 !== e.image &&
              "" !== e.image.previewUrl &&
              URL.revokeObjectURL(e.image.previewUrl);
        i.delete(e);
      }
    },
    p = (e) => (
      c.add(e),
      () => {
        c.delete(e);
      }
    ),
    h = () => void 0,
    g = () => s,
    x = () => o;
  e.s([
    "S",
    0,
    (e, t) => {
      let r = i.get(e);
      if (void 0 === r) return;
      let n = r.inFlightIndex + 1;
      (n >= r.links.length
        ? m(e)
        : i.set(e, { ...r, inFlightIndex: n, submittedAt: t }),
        u());
    },
    "r",
    0,
    (e) => {
      i.has(e) && (m(e), u());
    },
    "I",
    0,
    () => {
      if (0 !== i.size || 0 !== a.size || 0 !== l.size) {
        for (let e of Array.from(i.keys())) m(e);
        (a.clear(), l.clear(), u());
      }
    },
    "n",
    0,
    n,
    "E",
    0,
    (e, t) => {
      let r = i.get(e);
      void 0 !== r &&
        (i.set(e, { ...r, failure: t }),
        l.set(
          e,
          r.links
            .slice(t.linkIndex)
            .flatMap((e) =>
              void 0 === e.image || "" === e.image.previewUrl
                ? []
                : [e.image.previewUrl],
            ),
        ),
        u());
    },
    "V",
    0,
    (e) => i.get(e),
    "U",
    0,
    (e) => {
      let t = i.get(e);
      return void 0 !== t && void 0 === t.failure;
    },
    "X",
    0,
    (e, t, r, n) => {
      let a = i.get(e);
      if (void 0 === a || a.links !== t) return;
      let l = new Map(a.landedMessageIds);
      (l.set(r, n), i.set(e, { ...a, landedMessageIds: l }), u());
    },
    "L",
    0,
    (e, t, r) => {
      i.get(e)?.links === t && (a.set(e, [...(a.get(e) ?? s), r]), u());
    },
    "y",
    0,
    (e, t, r) => {
      (m(e), a.delete(e), l.delete(e));
      let n = { links: t.map(f), inFlightIndex: 0, submittedAt: r };
      return (i.set(e, n), u(), n);
    },
    "z",
    0,
    (e, a) => {
      let l,
        s,
        o = (0, t.c)(5);
      o[0] !== a || o[1] !== e
        ? ((l = n(e, a)), (o[0] = a), (o[1] = e), (o[2] = l))
        : (l = o[2]);
      let c = l;
      return (
        o[3] !== c
          ? ((s = () => i.get(c)), (o[3] = c), (o[4] = s))
          : (s = o[4]),
        (0, r.useSyncExternalStore)(p, s, h)
      );
    },
    "A",
    0,
    (e, i) => {
      let l,
        o,
        c = (0, t.c)(5);
      c[0] !== i || c[1] !== e
        ? ((l = n(e, i)), (c[0] = i), (c[1] = e), (c[2] = l))
        : (l = c[2]);
      let u = l;
      return (
        c[3] !== u
          ? ((o = () => a.get(u) ?? s), (c[3] = u), (c[4] = o))
          : (o = c[4]),
        (0, r.useSyncExternalStore)(p, o, g)
      );
    },
    "G",
    0,
    (e, i) => {
      let a,
        s,
        c = (0, t.c)(5);
      c[0] !== i || c[1] !== e
        ? ((a = n(e, i)), (c[0] = i), (c[1] = e), (c[2] = a))
        : (a = c[2]);
      let u = a;
      return (
        c[3] !== u
          ? ((s = () => l.get(u) ?? o), (c[3] = u), (c[4] = s))
          : (s = c[4]),
        (0, r.useSyncExternalStore)(p, s, x)
      );
    },
  ]);
};
