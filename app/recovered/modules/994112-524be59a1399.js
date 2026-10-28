// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(791898),
    a = e.i(27847),
    i = e.i(699738),
    n = e.i(849152),
    r = e.i(828424),
    l = e.i(937863),
    s = e.i(894327),
    o = e.i(994533),
    d = e.i(491208);
  let u = new Set(["trending", "movers"]),
    c = (e) => u.has(e),
    p = (e) => {
      if ("object" != typeof e || null === e) return;
      let { board: t, window: a } = e,
        i = {};
      return (
        (0, o._)(t) && (i.board = t),
        (0, d.M)(a) && (i.window = a),
        Object.keys(i).length > 0 ? i : void 0
      );
    };
  e.s(
    [
      "j",
      0,
      p,
      "r",
      0,
      c,
      "T",
      0,
      (e, t) => {
        let a = { ...e };
        return (
          (0, o._)(t.board) && (a.board = t.board),
          (0, d.M)(t.window) && (a.window = t.window),
          Object.keys(a).length > 0 ? a : void 0
        );
      },
    ],
    431798,
  );
  let m = ["green", "blue", "purple", "amber", "rose", "cyan"],
    h = (e) => m.includes(e),
    f = (e) => {
      if ("string" != typeof e) return;
      let t = e.trim().slice(0, 24).trim();
      return t.length > 0 ? t : void 0;
    },
    g = (e) => Math.round(Math.min(450, Math.max(280, e))),
    b = (e) => Math.min(4, Math.max(0.25, e)),
    v = (e) => ("number" == typeof e && Number.isFinite(e) ? g(e) : void 0),
    y = () =>
      "u" > typeof crypto && "function" == typeof crypto.randomUUID
        ? crypto.randomUUID()
        : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`,
    k = (e) => e.byView?.[e.view] ?? {},
    w = (e, t) => {
      let a = { id: y(), view: e };
      return (t && (a.byView = { [e]: { params: t } }), a);
    },
    C = (e, t) => ({ id: y(), panes: [w(e, t)] }),
    _ = ["trending", "global-callouts", "leaderboard"],
    M = { "global-callouts": 512, "latest-callouts": 512, trending: 336 },
    U = (e) => {
      let t = M[e];
      return void 0 === t ? void 0 : g(t);
    },
    x = () =>
      _.map((e) => {
        let t = C(e),
          a = U(e);
        return (void 0 !== a && (t.width = a), t);
      }),
    T = (e) => {
      if (e.title) return e.title;
      let a = t.J[e.view],
        i = a.param ? k(e).params?.[a.param.key] : void 0;
      return i ? `${a.label} (${i})` : a.label;
    },
    A = (e, a) => {
      let i = t.J[e].param;
      if (!i || "object" != typeof a || null === a) return;
      let n = a[i.key];
      if ("string" == typeof n && 0 !== n.length) return { [i.key]: n };
    },
    S = (e, a) =>
      !t.J[e].param || !!(a.params && Object.keys(a.params).length > 0),
    I = {
      megaeth: !0,
      xlayer: !0,
      ton: !0,
      polygon: !0,
      near: !0,
      starknet: !0,
      arbitrum: !0,
    },
    F = {
      "movers-board": { view: "movers", board: s.b },
      "top-pnl": { view: "leaderboard", board: i.p },
      "top-earners": { view: "leaderboard", board: "earners" },
      "top-squads": { view: "leaderboard", board: "squads" },
    },
    j = (e) => ("object" == typeof e && null !== e ? e : void 0),
    B = (e) => {
      if ("object" != typeof e || null === e) return null;
      let {
        id: i,
        view: s,
        byView: o,
        pins: d,
        sound: u,
        size: m,
        accent: g,
        title: v,
      } = ((e) => {
        let { view: t, byView: a } = e,
          i = j(a) ?? {},
          n = t,
          r = i;
        for (let [e, a] of Object.entries(F)) {
          if (e !== t && !(e in i)) continue;
          let { [e]: l, ...s } = r,
            o = j(l)?.filters,
            d = j(s[a.view]);
          ((r = s),
            t === e
              ? ((n = a.view),
                (r = { ...s, [a.view]: { ...d, filters: o, board: a.board } }))
              : void 0 === d &&
                void 0 !== o &&
                (r = { ...s, [a.view]: { filters: o } }));
        }
        return r === i ? e : { ...e, view: n, byView: r };
      })(e);
      if ("string" != typeof i || 0 === i.length || !(0, t.g)(s)) return null;
      let y = { id: i, view: s },
        w = ((e) => {
          if ("object" != typeof e || null === e) return;
          let a = {};
          for (let [i, l] of Object.entries(e)) {
            if (!(0, t.g)(i) || "object" != typeof l || null === l) continue;
            let { params: e, filters: s, board: o, trending: d } = l,
              u = {},
              m = A(i, e);
            m && (u.params = m);
            let h = (0, r.V)(s, I, (0, r.Q)(i));
            h && (u.filters = h);
            let f = (0, n.X)(i, o);
            if ((f && (u.board = f), c(i))) {
              let e = p(d);
              e && (u.trending = e);
            }
            Object.keys(u).length > 0 && (a[i] = u);
          }
          return Object.keys(a).length > 0 ? a : void 0;
        })(o);
      w && (y.byView = w);
      let C = (0, l.b)(d);
      (C && (y.pins = C), (0, a.a)(u) && (y.sound = u), h(g) && (y.accent = g));
      let _ = f(v);
      void 0 !== _ && (y.title = _);
      let M =
        "number" == typeof m && Number.isFinite(m) && m > 0 ? b(m) : void 0;
      return (void 0 !== M && (y.size = M), S(y.view, k(y))) ? y : null;
    },
    P = (e) => {
      let { id: i, type: n, params: r, sound: l } = e;
      if ("string" != typeof i || 0 === i.length || !(0, t.g)(n)) return null;
      let s = { id: `${i}:p0`, view: n },
        o = A(n, r);
      return (o && (s.byView = { [n]: { params: o } }),
      (0, a.a)(l) && (s.sound = l),
      S(s.view, k(s)))
        ? { id: i, panes: [s] }
        : null;
    },
    E = (e) => {
      if (!Array.isArray(e)) return [];
      let a = new Set(),
        i = [];
      for (let n of e) {
        if (i.length >= t.b) break;
        if ("object" != typeof n || null === n) continue;
        let e = null;
        if (Array.isArray(n.panes)) {
          let { id: t } = n;
          if ("string" != typeof t || 0 === t.length) continue;
          let a = new Set(),
            i = [];
          for (let e of n.panes) {
            if (i.length >= 5) break;
            let t = B(e);
            !t || a.has(t.id) || (a.add(t.id), i.push(t));
          }
          if (i.length > 0) {
            e = { id: t, panes: i };
            let a = v(n.width);
            void 0 !== a && (e.width = a);
          }
        } else e = P(n);
        !e || a.has(e.id) || (a.add(e.id), i.push(e));
      }
      return i;
    },
    L = (e) => {
      if ("object" != typeof e || null === e) return;
      let { x: t, y: a, w: i, h: n } = e;
      if (
        ![t, a, i, n].every((e) => "number" == typeof e && Number.isFinite(e))
      )
        return;
      let r = (e, t, a) => Math.min(Math.max(e, t), a);
      return {
        x: r(t, 0, 8e3),
        y: r(a, 0, 8e3),
        w: r(i, 300, 720),
        h: r(n, 260, 1e3),
      };
    },
    O = ["top", "bottom"],
    D = (e) => "string" == typeof e && O.includes(e),
    N = (e) => (e.right < 2 ? "right" : e.left < 2 ? "left" : void 0),
    W = (e) => {
      let t;
      if ("object" != typeof e || null === e) return null;
      let { id: a, pane: i, side: n, float: r, shaded: l } = e;
      if ("string" != typeof a || 0 === a.length) return null;
      let s = B(i);
      if (!s) return null;
      let o = L(r);
      return {
        id: a,
        side: n,
        pane: s,
        ...(o ? { float: o } : {}),
        shaded: !0 === l,
        lifted: "string" == typeof (t = j(i)?.view) && t in F,
      };
    },
    H = (e) => "left" === e || "right" === e,
    R = "My deck",
    q = (e, t = R) => {
      if ("string" != typeof e) return t;
      let a = e.trim().slice(0, 40);
      return a.length > 0 ? a : t;
    },
    $ = (e) =>
      "number" == typeof e && Number.isFinite(e) && e > 0
        ? Math.round(e)
        : void 0,
    V = [
      [
        { views: ["global-callouts"], width: 450 },
        { views: ["trending"], width: 336 },
      ],
      [
        { views: ["global-callouts"], width: 450 },
        { views: ["trending"], width: 336 },
        { views: ["top-pnl", "leaderboard"], width: 342 },
      ],
    ],
    z = (e, t) => Object.keys(e).every((e) => t.includes(e));
  e.s(
    [
      "W",
      0,
      450,
      "p",
      0,
      5,
      "t",
      0,
      3,
      "i",
      0,
      10,
      "_",
      0,
      2,
      "E",
      0,
      40,
      "A",
      0,
      24,
      "d",
      0,
      m,
      "$",
      0,
      1e3,
      "b",
      0,
      720,
      "L",
      0,
      260,
      "U",
      0,
      300,
      "c",
      0,
      x,
      "C",
      0,
      () => ({ id: y(), name: R, columns: x() }),
      "B",
      0,
      C,
      "T",
      0,
      w,
      "g",
      0,
      (e, t, a = "right") => ({ id: y(), pane: w(e, t), side: a }),
      "q",
      0,
      g,
      "o",
      0,
      b,
      "J",
      0,
      f,
      "D",
      0,
      E,
      "X",
      0,
      (e) => {
        if (!Array.isArray(e)) return [];
        let t = e.map(W).filter((e) => null !== e),
          a = new Set(
            t
              .filter((e) => !e.lifted && (H(e.side) || D(e.side)))
              .map((e) => e.pane.view),
          ),
          i = (e) => D(e.side) && !e.float,
          n = [...t.filter((e) => !i(e)), ...t.filter(i)],
          r = new Set(),
          l = new Set(),
          s = { left: 0, right: 0 },
          o = 0,
          d = [];
        for (let e of n) {
          if (
            r.has(e.id) ||
            l.has(e.pane.view) ||
            (e.lifted && a.has(e.pane.view))
          )
            continue;
          let t = D(e.side) ? (N(s) ?? (e.float ? "right" : void 0)) : e.side;
          if (!H(t)) continue;
          if (e.float) {
            if (o >= 3) continue;
            o += 1;
          } else {
            if (s[t] >= 2) continue;
            s[t] += 1;
          }
          (r.add(e.id), l.add(e.pane.view));
          let i = { id: e.id, pane: e.pane, side: t };
          (e.float && (i.float = e.float),
            e.shaded && (i.shaded = !0),
            d.push(i));
        }
        return d;
      },
      "Y",
      0,
      q,
      "u",
      0,
      (e) => {
        if (!Array.isArray(e)) return [];
        let t = new Set(),
          a = [];
        for (let i of e) {
          if (a.length >= 10) break;
          if ("object" != typeof i || null === i) continue;
          let { id: e, name: n, columns: r, fillPausedBelowPx: l } = i;
          if ("string" != typeof e || 0 === e.length || t.has(e)) continue;
          t.add(e);
          let s = { id: e, name: q(n, `List ${a.length + 1}`), columns: E(r) },
            o = $(l);
          (void 0 !== o && (s.fillPausedBelowPx = o), a.push(s));
        }
        return a;
      },
      "e",
      0,
      A,
      "s",
      0,
      L,
      "F",
      0,
      (e) => _.map((t) => ({ view: t, basis: U(t) ?? e })),
      "Q",
      0,
      h,
      "Z",
      0,
      (e) => {
        if (!Array.isArray(e) || 1 !== e.length) return !1;
        let t = j(e[0]);
        if (!t || !z(t, ["id", "name", "columns"]) || t.name !== R) return !1;
        let { columns: a } = t;
        return (
          !!Array.isArray(a) &&
          V.some(
            (e) =>
              e.length === a.length &&
              e.every((e, t) => {
                let i = j(a[t]);
                if (
                  !i ||
                  !z(i, ["id", "panes", "width"]) ||
                  i.width !== e.width ||
                  !Array.isArray(i.panes) ||
                  1 !== i.panes.length
                )
                  return !1;
                let n = j(i.panes[0]);
                return (
                  void 0 !== n &&
                  z(n, ["id", "view"]) &&
                  "string" == typeof n.view &&
                  e.views.includes(n.view)
                );
              }),
          )
        );
      },
      "f",
      0,
      y,
      "G",
      0,
      k,
      "M",
      0,
      (e) => {
        let t = k(e);
        return {
          id: e.id,
          type: e.view,
          params: t.params,
          sound: e.sound,
          filters: t.filters,
          board: t.board,
          trending: t.trending,
        };
      },
      "r",
      0,
      S,
      "y",
      0,
      (e, t) => {
        if (!Array.isArray(e)) return [];
        let a = new Map(t.map((e) => [e.id, e])),
          i = new Set();
        for (let t of e) {
          if ("object" != typeof t || null === t) continue;
          let { id: e, side: n } = t;
          if (!D(n) || "string" != typeof e) continue;
          let r = a.get(e);
          r && !r.float && i.add(r.side);
        }
        return [...i];
      },
      "h",
      0,
      ({ basisPx: e, renderedPx: t }) =>
        Number.isFinite(e) && e > 0 ? g(e) : g(t),
      "S",
      0,
      (e) => {
        let t = e.panes[0];
        if (!t) return "Column";
        let a = T(t);
        return e.panes.length > 1 ? `${a} +${e.panes.length - 1}` : a;
      },
      "j",
      0,
      T,
    ],
    994112,
  );
};
