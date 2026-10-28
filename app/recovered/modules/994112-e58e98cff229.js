// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(791898),
    a = e.i(27847),
    i = e.i(699738),
    n = e.i(849152),
    l = e.i(828424),
    r = e.i(937863),
    s = e.i(894327),
    d = e.i(994533),
    o = e.i(491208);
  let u = new Set(["trending", "movers"]),
    c = (e) => u.has(e),
    p = (e) => {
      if ("object" != typeof e || null === e) return;
      let { board: t, window: a } = e,
        i = {};
      return (
        (0, d._)(t) && (i.board = t),
        (0, o.M)(a) && (i.window = a),
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
          (0, d._)(t.board) && (a.board = t.board),
          (0, o.M)(t.window) && (a.window = t.window),
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
    k = () =>
      "u" > typeof crypto && "function" == typeof crypto.randomUUID
        ? crypto.randomUUID()
        : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`,
    y = (e) => e.byView?.[e.view] ?? {},
    w = (e, t) => {
      let a = { id: k(), view: e };
      return (t && (a.byView = { [e]: { params: t } }), a);
    },
    M = (e, t) => ({ id: k(), panes: [w(e, t)] }),
    C = ["trending", "global-callouts", "leaderboard"],
    U = { "global-callouts": 512, "latest-callouts": 512, trending: 336 },
    x = (e) => {
      let t = U[e];
      return void 0 === t ? void 0 : g(t);
    },
    _ = () =>
      C.map((e) => {
        let t = M(e),
          a = x(e);
        return (void 0 !== a && (t.width = a), t);
      }),
    S = (e) => {
      if (e.title) return e.title;
      let a = t.J[e.view],
        i = a.param ? y(e).params?.[a.param.key] : void 0;
      return i ? `${a.label} (${i})` : a.label;
    },
    T = (e, a) => {
      let i = t.J[e].param;
      if (!i || "object" != typeof a || null === a) return;
      let n = a[i.key];
      if ("string" == typeof n && 0 !== n.length) return { [i.key]: n };
    },
    A = (e, a) =>
      !t.J[e].param || !!(a.params && Object.keys(a.params).length > 0),
    F = {
      megaeth: !0,
      xlayer: !0,
      ton: !0,
      polygon: !0,
      near: !0,
      starknet: !0,
      arbitrum: !0,
    },
    B = {
      "movers-board": { view: "movers", board: s.b },
      "top-pnl": { view: "leaderboard", board: i.p },
      "top-earners": { view: "leaderboard", board: "earners" },
      "top-squads": { view: "leaderboard", board: "squads" },
    },
    j = (e) => ("object" == typeof e && null !== e ? e : void 0),
    P = (e) => {
      if ("object" != typeof e || null === e) return null;
      let {
        id: i,
        view: s,
        byView: d,
        pins: o,
        sound: u,
        size: m,
        accent: g,
        title: v,
      } = ((e) => {
        let { view: t, byView: a } = e,
          i = j(a) ?? {},
          n = t,
          l = i;
        for (let [e, a] of Object.entries(B)) {
          if (e !== t && !(e in i)) continue;
          let { [e]: r, ...s } = l,
            d = j(r)?.filters,
            o = j(s[a.view]);
          ((l = s),
            t === e
              ? ((n = a.view),
                (l = { ...s, [a.view]: { ...o, filters: d, board: a.board } }))
              : void 0 === o &&
                void 0 !== d &&
                (l = { ...s, [a.view]: { filters: d } }));
        }
        return l === i ? e : { ...e, view: n, byView: l };
      })(e);
      if ("string" != typeof i || 0 === i.length || !(0, t.g)(s)) return null;
      let k = { id: i, view: s },
        w = ((e) => {
          if ("object" != typeof e || null === e) return;
          let a = {};
          for (let [i, r] of Object.entries(e)) {
            if (!(0, t.g)(i) || "object" != typeof r || null === r) continue;
            let { params: e, filters: s, board: d, trending: o } = r,
              u = {},
              m = T(i, e);
            m && (u.params = m);
            let h = (0, l.V)(s, F, (0, l.Q)(i));
            h && (u.filters = h);
            let f = (0, n.X)(i, d);
            if ((f && (u.board = f), c(i))) {
              let e = p(o);
              e && (u.trending = e);
            }
            Object.keys(u).length > 0 && (a[i] = u);
          }
          return Object.keys(a).length > 0 ? a : void 0;
        })(d);
      w && (k.byView = w);
      let M = (0, r.b)(o);
      (M && (k.pins = M), (0, a.a)(u) && (k.sound = u), h(g) && (k.accent = g));
      let C = f(v);
      void 0 !== C && (k.title = C);
      let U =
        "number" == typeof m && Number.isFinite(m) && m > 0 ? b(m) : void 0;
      return (void 0 !== U && (k.size = U), A(k.view, y(k))) ? k : null;
    },
    O = (e) => {
      let { id: i, type: n, params: l, sound: r } = e;
      if ("string" != typeof i || 0 === i.length || !(0, t.g)(n)) return null;
      let s = { id: `${i}:p0`, view: n },
        d = T(n, l);
      return (d && (s.byView = { [n]: { params: d } }),
      (0, a.a)(r) && (s.sound = r),
      A(s.view, y(s)))
        ? { id: i, panes: [s] }
        : null;
    },
    D = (e) => {
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
            let t = P(e);
            !t || a.has(t.id) || (a.add(t.id), i.push(t));
          }
          if (i.length > 0) {
            e = { id: t, panes: i };
            let a = v(n.width);
            void 0 !== a && (e.width = a);
          }
        } else e = O(n);
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
      let l = (e, t, a) => Math.min(Math.max(e, t), a);
      return {
        x: l(t, 0, 8e3),
        y: l(a, 0, 8e3),
        w: l(i, 300, 720),
        h: l(n, 260, 1e3),
      };
    },
    I = ["top", "bottom"],
    W = (e) => "string" == typeof e && I.includes(e),
    V = (e) => (e.right < 2 ? "right" : e.left < 2 ? "left" : void 0),
    q = (e) => {
      let t;
      if ("object" != typeof e || null === e) return null;
      let { id: a, pane: i, side: n, float: l, shaded: r } = e;
      if ("string" != typeof a || 0 === a.length) return null;
      let s = P(i);
      if (!s) return null;
      let d = L(l);
      return {
        id: a,
        side: n,
        pane: s,
        ...(d ? { float: d } : {}),
        shaded: !0 === r,
        lifted: "string" == typeof (t = j(i)?.view) && t in B,
      };
    },
    H = (e) => "left" === e || "right" === e,
    E = "My deck",
    $ = (e, t = E) => {
      if ("string" != typeof e) return t;
      let a = e.trim().slice(0, 40);
      return a.length > 0 ? a : t;
    },
    z = (e) =>
      "number" == typeof e && Number.isFinite(e) && e > 0
        ? Math.round(e)
        : void 0,
    N = [
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
    K = (e, t) => Object.keys(e).every((e) => t.includes(e));
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
      _,
      "C",
      0,
      () => ({ id: k(), name: E, columns: _() }),
      "B",
      0,
      M,
      "T",
      0,
      w,
      "g",
      0,
      (e, t, a = "right") => ({ id: k(), pane: w(e, t), side: a }),
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
      D,
      "X",
      0,
      (e) => {
        if (!Array.isArray(e)) return [];
        let t = e.map(q).filter((e) => null !== e),
          a = new Set(
            t
              .filter((e) => !e.lifted && (H(e.side) || W(e.side)))
              .map((e) => e.pane.view),
          ),
          i = (e) => W(e.side) && !e.float,
          n = [...t.filter((e) => !i(e)), ...t.filter(i)],
          l = new Set(),
          r = new Set(),
          s = { left: 0, right: 0 },
          d = 0,
          o = [];
        for (let e of n) {
          if (
            l.has(e.id) ||
            r.has(e.pane.view) ||
            (e.lifted && a.has(e.pane.view))
          )
            continue;
          let t = W(e.side) ? (V(s) ?? (e.float ? "right" : void 0)) : e.side;
          if (!H(t)) continue;
          if (e.float) {
            if (d >= 3) continue;
            d += 1;
          } else {
            if (s[t] >= 2) continue;
            s[t] += 1;
          }
          (l.add(e.id), r.add(e.pane.view));
          let i = { id: e.id, pane: e.pane, side: t };
          (e.float && (i.float = e.float),
            e.shaded && (i.shaded = !0),
            o.push(i));
        }
        return o;
      },
      "Y",
      0,
      $,
      "u",
      0,
      (e) => {
        if (!Array.isArray(e)) return [];
        let t = new Set(),
          a = [];
        for (let i of e) {
          if (a.length >= 10) break;
          if ("object" != typeof i || null === i) continue;
          let { id: e, name: n, columns: l, fillPausedBelowPx: r } = i;
          if ("string" != typeof e || 0 === e.length || t.has(e)) continue;
          t.add(e);
          let s = { id: e, name: $(n, `List ${a.length + 1}`), columns: D(l) },
            d = z(r);
          (void 0 !== d && (s.fillPausedBelowPx = d), a.push(s));
        }
        return a;
      },
      "e",
      0,
      T,
      "s",
      0,
      L,
      "F",
      0,
      (e) => C.map((t) => ({ view: t, basis: x(t) ?? e })),
      "Q",
      0,
      h,
      "Z",
      0,
      (e) => {
        if (!Array.isArray(e) || 1 !== e.length) return !1;
        let t = j(e[0]);
        if (!t || !K(t, ["id", "name", "columns"]) || t.name !== E) return !1;
        let { columns: a } = t;
        return (
          !!Array.isArray(a) &&
          N.some(
            (e) =>
              e.length === a.length &&
              e.every((e, t) => {
                let i = j(a[t]);
                if (
                  !i ||
                  !K(i, ["id", "panes", "width"]) ||
                  i.width !== e.width ||
                  !Array.isArray(i.panes) ||
                  1 !== i.panes.length
                )
                  return !1;
                let n = j(i.panes[0]);
                return (
                  void 0 !== n &&
                  K(n, ["id", "view"]) &&
                  "string" == typeof n.view &&
                  e.views.includes(n.view)
                );
              }),
          )
        );
      },
      "f",
      0,
      k,
      "G",
      0,
      y,
      "M",
      0,
      (e) => {
        let t = y(e);
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
      A,
      "y",
      0,
      (e, t) => {
        if (!Array.isArray(e)) return [];
        let a = new Map(t.map((e) => [e.id, e])),
          i = new Set();
        for (let t of e) {
          if ("object" != typeof t || null === t) continue;
          let { id: e, side: n } = t;
          if (!W(n) || "string" != typeof e) continue;
          let l = a.get(e);
          l && !l.float && i.add(l.side);
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
        let a = S(t);
        return e.panes.length > 1 ? `${a} +${e.panes.length - 1}` : a;
      },
      "j",
      0,
      S,
    ],
    994112,
  );
};
