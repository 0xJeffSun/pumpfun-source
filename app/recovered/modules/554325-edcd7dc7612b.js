// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    s = e.i(445242),
    n = e.i(745018),
    l = e.i(439587),
    r = e.i(365089),
    i = e.i(352386);
  e.i(12692);
  var a = e.i(398902),
    o = e.i(536925),
    c = e.i(116549),
    d = e.i(753192),
    m = e.i(844510);
  e.i(12641);
  var u = e.i(34011),
    f = e.i(116830),
    h = e.i(693124),
    x = e.i(441315),
    p = e.i(167958),
    g = e.i(787773),
    b = e.i(724423),
    v = e.i(51206),
    y = e.i(935302),
    w = e.i(607122),
    j = e.i(248496),
    _ = e.i(908163),
    N = e.i(813792),
    k = e.i(379705),
    S = e.i(600775),
    M = e.i(791898),
    C = e.i(943331),
    I = e.i(338319),
    P = e.i(45329),
    U = e.i(358893),
    E = e.i(187611);
  let T = {
      terminal:
        "flex h-9 w-full items-center gap-3 px-3 text-left transition-colors hover:bg-bg-tertiary focus-inset disabled:cursor-default disabled:opacity-40",
      comfortable:
        "flex h-11 w-full items-center gap-3 px-5 text-left transition-colors hover:bg-bg-tertiary focus-inset disabled:cursor-default disabled:opacity-40",
    },
    A = { terminal: "-mx-3", comfortable: "-mx-5" },
    R = { terminal: "text-[13px] leading-4", comfortable: "text-sm leading-5" };
  function F(e) {
    let n,
      l,
      r = (0, s.c)(7),
      { title: i, onClose: a, children: o } = e,
      d = (0, c.x)();
    return (
      r[0] !== a
        ? ((n = (e) => {
            e || a();
          }),
          (r[0] = a),
          (r[1] = n))
        : (n = r[1]),
      r[2] !== o || r[3] !== d || r[4] !== n || r[5] !== i
        ? ((l = (0, t.jsx)(p.N, {
            open: !0,
            onOpenChange: n,
            density: d,
            size: "md",
            title: i,
            "data-testid": "screeners-column-config-dialog",
            children: o,
          })),
          (r[2] = o),
          (r[3] = d),
          (r[4] = n),
          (r[5] = i),
          (r[6] = l))
        : (l = r[6]),
      l
    );
  }
  function $(e) {
    let n,
      l,
      r,
      o,
      c,
      d = (0, s.c)(19),
      { title: m, kind: u, onPick: f, onClose: h } = e,
      { t: x } = (0, a.f)(),
      [p, g] = (0, i.useState)("");
    d[0] !== u || d[1] !== x
      ? ((n = x(
          "coin" === u
            ? "web.screeners.search_coins_placeholder"
            : "web.screeners.search_users_placeholder",
        )),
        (d[0] = u),
        (d[1] = x),
        (d[2] = n))
      : (n = d[2]);
    let b = n;
    return (
      d[3] !== u || d[4] !== x
        ? ((l = x(
            "coin" === u
              ? "web.screeners.pick_coin_hint"
              : "web.screeners.pick_user_hint",
          )),
          (d[3] = u),
          (d[4] = x),
          (d[5] = l))
        : (l = d[5]),
      d[6] !== u || d[7] !== f || d[8] !== p
        ? ((r =
            "coin" === u
              ? (0, t.jsx)(W, { term: p, onPick: f })
              : (0, t.jsx)(K, { term: p, onPick: f })),
          (d[6] = u),
          (d[7] = f),
          (d[8] = p),
          (d[9] = r))
        : (r = d[9]),
      d[10] !== b || d[11] !== l || d[12] !== r || d[13] !== p
        ? ((o = (0, t.jsx)(z, {
            hint: l,
            term: p,
            onTermChange: g,
            placeholder: b,
            children: r,
          })),
          (d[10] = b),
          (d[11] = l),
          (d[12] = r),
          (d[13] = p),
          (d[14] = o))
        : (o = d[14]),
      d[15] !== h || d[16] !== o || d[17] !== m
        ? ((c = (0, t.jsx)(F, { title: m, onClose: h, children: o })),
          (d[15] = h),
          (d[16] = o),
          (d[17] = m),
          (d[18] = c))
        : (c = d[18]),
      c
    );
  }
  function z(e) {
    let n,
      l,
      r,
      i,
      a,
      o = (0, s.c)(17),
      { hint: c, term: d, onTermChange: u, placeholder: f, children: h } = e,
      x = (0, p.M)(),
      g = m.L[x];
    (o[0] !== c || o[1] !== g
      ? ((n = (0, t.jsx)("p", { className: g, children: c })),
        (o[0] = c),
        (o[1] = g),
        (o[2] = n))
      : (n = o[2]),
      o[3] !== x || o[4] !== u || o[5] !== f || o[6] !== d
        ? ((l = (0, t.jsx)(y.o, {
            density: x,
            value: d,
            onValueChange: u,
            label: f,
            autoFocus: !0,
          })),
          (o[3] = x),
          (o[4] = u),
          (o[5] = f),
          (o[6] = d),
          (o[7] = l))
        : (l = o[7]));
    let b = A[x];
    return (
      o[8] !== b
        ? ((r = (0, I.c)(b, "min-h-[240px]")), (o[8] = b), (o[9] = r))
        : (r = o[9]),
      o[10] !== h || o[11] !== r
        ? ((i = (0, t.jsx)("div", { className: r, children: h })),
          (o[10] = h),
          (o[11] = r),
          (o[12] = i))
        : (i = o[12]),
      o[13] !== n || o[14] !== l || o[15] !== i
        ? ((a = (0, t.jsxs)(p.K, {
            className: "flex flex-col gap-2",
            children: [n, l, i],
          })),
          (o[13] = n),
          (o[14] = l),
          (o[15] = i),
          (o[16] = a))
        : (a = o[16]),
      a
    );
  }
  function D(e) {
    let r,
      o,
      u,
      f,
      h,
      x,
      b,
      y,
      w,
      j,
      k,
      S,
      M = (0, s.c)(69),
      { title: C, onPick: U, onClose: E } = e,
      { t: $ } = (0, a.f)(),
      z = (0, c.x)(),
      D = (0, P.V)(O),
      { createList: L, updateList: q, deleteList: W } = (0, d.f)(),
      [K, H] = (0, i.useState)(null),
      V = m.t[z];
    if (K) {
      let e,
        s,
        l,
        r,
        i,
        a,
        o,
        c,
        d,
        m,
        u,
        f = null === K.list;
      M[0] !== L ||
      M[1] !== K.kind ||
      M[2] !== K.list ||
      M[3] !== K.members ||
      M[4] !== K.name ||
      M[5] !== f ||
      M[6] !== U ||
      M[7] !== q
        ? ((e = () => {
            if (0 !== K.members.length && 0 !== K.name.trim().length) {
              if (f) return void U(L(K.name, K.kind, K.members).id);
              K.list &&
                (q(K.list, { name: K.name, members: K.members }), U(K.list.id));
            }
          }),
          (M[0] = L),
          (M[1] = K.kind),
          (M[2] = K.list),
          (M[3] = K.members),
          (M[4] = K.name),
          (M[5] = f),
          (M[6] = U),
          (M[7] = q),
          (M[8] = e))
        : (e = M[8]);
      let h = e;
      return (
        M[9] !== $
          ? ((s = $("common.back")), (M[9] = $), (M[10] = s))
          : (s = M[10]),
        M[11] === Symbol.for("react.memo_cache_sentinel")
          ? ((l = () => H(null)), (M[11] = l))
          : (l = M[11]),
        M[12] === Symbol.for("react.memo_cache_sentinel")
          ? ((r = (0, t.jsx)(n.S, { "aria-hidden": !0 })), (M[12] = r))
          : (r = M[12]),
        M[13] !== z || M[14] !== V || M[15] !== s
          ? ((i = (0, t.jsx)(v._, {
              density: z,
              size: V,
              "aria-label": s,
              onClick: l,
              className: "-ml-1",
              children: r,
            })),
            (M[13] = z),
            (M[14] = V),
            (M[15] = s),
            (M[16] = i))
          : (i = M[16]),
        M[17] !== f || M[18] !== $
          ? ((a = f
              ? $("web.screeners.new_list")
              : $("web.screeners.edit_list")),
            (M[17] = f),
            (M[18] = $),
            (M[19] = a))
          : (a = M[19]),
        M[20] !== a
          ? ((o = (0, t.jsx)("span", { className: "truncate", children: a })),
            (M[20] = a),
            (M[21] = o))
          : (o = M[21]),
        M[22] !== i || M[23] !== o
          ? ((c = (0, t.jsxs)("span", {
              className: "flex min-w-0 items-center gap-1",
              children: [i, o],
            })),
            (M[22] = i),
            (M[23] = o),
            (M[24] = c))
          : (c = M[24]),
        M[25] !== W || M[26] !== K.list
          ? ((d = K.list
              ? () => {
                  (K.list && W(K.list), H(null));
                }
              : void 0),
            (M[25] = W),
            (M[26] = K.list),
            (M[27] = d))
          : (d = M[27]),
        M[28] !== h || M[29] !== K || M[30] !== d
          ? ((m = (0, t.jsx)(B, {
              editor: K,
              onChange: H,
              onDelete: d,
              onCommit: h,
            })),
            (M[28] = h),
            (M[29] = K),
            (M[30] = d),
            (M[31] = m))
          : (m = M[31]),
        M[32] !== E || M[33] !== m || M[34] !== c
          ? ((u = (0, t.jsx)(F, { title: c, onClose: E, children: m })),
            (M[32] = E),
            (M[33] = m),
            (M[34] = c),
            (M[35] = u))
          : (u = M[35]),
        u
      );
    }
    let G = m.L[z];
    (M[36] !== $
      ? ((r = $("web.screeners.pick_list_hint")), (M[36] = $), (M[37] = r))
      : (r = M[37]),
      M[38] !== G || M[39] !== r
        ? ((o = (0, t.jsx)("p", { className: G, children: r })),
          (M[38] = G),
          (M[39] = r),
          (M[40] = o))
        : (o = M[40]));
    let Q = m.L[z];
    return (
      M[41] !== Q
        ? ((u = (0, I.c)(Q, "font-medium")), (M[41] = Q), (M[42] = u))
        : (u = M[42]),
      M[43] !== $
        ? ((f = $("web.screeners.my_lists")), (M[43] = $), (M[44] = f))
        : (f = M[44]),
      M[45] !== u || M[46] !== f
        ? ((h = (0, t.jsx)("p", { className: u, children: f })),
          (M[45] = u),
          (M[46] = f),
          (M[47] = h))
        : (h = M[47]),
      M[48] !== z || M[49] !== V || M[50] !== D || M[51] !== U || M[52] !== $
        ? ((x =
            0 === D.length
              ? (0, t.jsx)(g.L, {
                  density: z,
                  children: $("web.screeners.no_lists"),
                })
              : (0, t.jsx)("ul", {
                  className: (0, I.c)(
                    A[z],
                    "flex max-h-[300px] flex-col overflow-y-auto",
                  ),
                  children: D.map((e) =>
                    (0, t.jsxs)(
                      "li",
                      {
                        className: "flex items-center",
                        children: [
                          (0, t.jsxs)("button", {
                            type: "button",
                            onClick: () => U(e.id),
                            "data-testid": `screeners-list-pick-${e.id}`,
                            className: (0, I.c)(T[z], "min-w-0 flex-1 pr-1"),
                            children: [
                              (0, t.jsx)(n.cb, {
                                "aria-hidden": !0,
                                className:
                                  "size-3.5 shrink-0 text-text-tertiary",
                              }),
                              (0, t.jsx)("span", {
                                className: (0, I.c)(
                                  "min-w-0 truncate font-medium text-text-primary",
                                  R[z],
                                ),
                                children: e.name,
                              }),
                              (0, t.jsxs)("span", {
                                className:
                                  "ml-auto flex shrink-0 items-center gap-1.5 text-xs leading-4 text-text-quaternary",
                                children: [
                                  (0, t.jsx)(_.E, {
                                    density: z,
                                    children:
                                      "users" === e.kind
                                        ? $("web.screeners.list_kind_users")
                                        : $("web.screeners.list_kind_coins"),
                                  }),
                                  $("web.screeners.members_count", {
                                    count: e.members.length,
                                  }),
                                ],
                              }),
                            ],
                          }),
                          (0, t.jsx)(N.f, {
                            content: $("web.screeners.edit_list"),
                            density: z,
                            children: (0, t.jsx)(v._, {
                              density: z,
                              size: V,
                              "aria-label": $("web.screeners.edit_list_a11y", {
                                name: e.name,
                              }),
                              "data-testid": `screeners-list-edit-${e.id}`,
                              onClick: () =>
                                H({
                                  list: e,
                                  name: e.name,
                                  kind: e.kind,
                                  members: [...e.members],
                                  labels: {},
                                }),
                              className: "terminal" === z ? "mr-3" : "mr-5",
                              children: (0, t.jsx)(n.yR, { "aria-hidden": !0 }),
                            }),
                          }),
                        ],
                      },
                      e.id,
                    ),
                  ),
                })),
          (M[48] = z),
          (M[49] = V),
          (M[50] = D),
          (M[51] = U),
          (M[52] = $),
          (M[53] = x))
        : (x = M[53]),
      M[54] !== o || M[55] !== h || M[56] !== x
        ? ((b = (0, t.jsxs)(p.K, {
            className: "flex min-h-[240px] flex-col gap-2",
            children: [o, h, x],
          })),
          (M[54] = o),
          (M[55] = h),
          (M[56] = x),
          (M[57] = b))
        : (b = M[57]),
      M[58] === Symbol.for("react.memo_cache_sentinel")
        ? ((y = (0, t.jsx)(n.HB, { size: 16, "aria-hidden": !0 })),
          (w = () =>
            H({
              list: null,
              name: "",
              kind: "users",
              members: [],
              labels: {},
            })),
          (M[58] = y),
          (M[59] = w))
        : ((y = M[58]), (w = M[59])),
      M[60] !== $
        ? ((j = $("web.screeners.new_list")), (M[60] = $), (M[61] = j))
        : (j = M[61]),
      M[62] !== j
        ? ((k = (0, t.jsx)(p.c, {
            children: (0, t.jsx)(l.K, {
              type: "button",
              variant: "secondary",
              size: p.Z,
              "data-testid": "screeners-list-new",
              iconStart: y,
              onClick: w,
              children: j,
            }),
          })),
          (M[62] = j),
          (M[63] = k))
        : (k = M[63]),
      M[64] !== E || M[65] !== k || M[66] !== b || M[67] !== C
        ? ((S = (0, t.jsxs)(F, { title: C, onClose: E, children: [b, k] })),
          (M[64] = E),
          (M[65] = k),
          (M[66] = b),
          (M[67] = C),
          (M[68] = S))
        : (S = M[68]),
      S
    );
  }
  function O(e) {
    return e.lists;
  }
  function B(e) {
    let o,
      c,
      d,
      u,
      f,
      h,
      g,
      j,
      _,
      N,
      k,
      S,
      M,
      P,
      U,
      E,
      T,
      R,
      F,
      $,
      z,
      D,
      O,
      B,
      L = (0, s.c)(84),
      { editor: q, onChange: H, onDelete: V, onCommit: G } = e,
      { t: Q } = (0, a.f)(),
      J = (0, p.M)(),
      X = null === q.list,
      [Y, Z] = (0, i.useState)("");
    L[0] !== q || L[1] !== H
      ? ((o = (e, t) => {
          q.members.includes(e) ||
            q.members.length >= C.f ||
            H({
              ...q,
              members: [...q.members, e],
              labels: { ...q.labels, [e]: t },
            });
        }),
        (L[0] = q),
        (L[1] = H),
        (L[2] = o))
      : (o = L[2]);
    let ee = o;
    L[3] !== q || L[4] !== H
      ? ((c = (e) => H({ ...q, members: q.members.filter((t) => t !== e) })),
        (L[3] = q),
        (L[4] = H),
        (L[5] = c))
      : (c = L[5]);
    let et = c;
    L[6] !== q.members.length || L[7] !== q.name
      ? ((d = q.name.trim().length > 0 && q.members.length > 0),
        (L[6] = q.members.length),
        (L[7] = q.name),
        (L[8] = d))
      : (d = L[8]);
    let es = d;
    L[9] !== q.kind || L[10] !== Q
      ? ((u =
          "coins" === q.kind
            ? Q("web.screeners.search_coins_placeholder")
            : Q("web.screeners.search_users_placeholder")),
        (L[9] = q.kind),
        (L[10] = Q),
        (L[11] = u))
      : (u = L[11]);
    let en = u,
      el = q.name;
    (L[12] !== q || L[13] !== H
      ? ((f = (e) => H({ ...q, name: e })),
        (L[12] = q),
        (L[13] = H),
        (L[14] = f))
      : (f = L[14]),
      L[15] !== Q
        ? ((h = Q("web.screeners.list_name")), (L[15] = Q), (L[16] = h))
        : (h = L[16]),
      L[17] !== Q
        ? ((g = Q("web.screeners.list_name")), (L[17] = Q), (L[18] = g))
        : (g = L[18]),
      L[19] !== J ||
      L[20] !== q.name ||
      L[21] !== f ||
      L[22] !== h ||
      L[23] !== g
        ? ((j = (0, t.jsx)("div", {
            className: "min-w-0 flex-1",
            children: (0, t.jsx)(b.N, {
              density: J,
              type: "text",
              value: el,
              maxLength: C.c,
              onValueChange: f,
              placeholder: h,
              "aria-label": g,
              "data-testid": "screeners-list-name",
            }),
          })),
          (L[19] = J),
          (L[20] = q.name),
          (L[21] = f),
          (L[22] = h),
          (L[23] = g),
          (L[24] = j))
        : (j = L[24]),
      L[25] !== J || L[26] !== q || L[27] !== X || L[28] !== H || L[29] !== Q
        ? ((_ = X
            ? (0, t.jsx)(w.X, {
                density: J,
                size: 32,
                value: q.kind,
                onValueChange: (e) =>
                  H({ ...q, kind: e, members: [], labels: {} }),
                options: [
                  { value: "users", label: Q("web.screeners.list_kind_users") },
                  { value: "coins", label: Q("web.screeners.list_kind_coins") },
                ],
              })
            : null),
          (L[25] = J),
          (L[26] = q),
          (L[27] = X),
          (L[28] = H),
          (L[29] = Q),
          (L[30] = _))
        : (_ = L[30]),
      L[31] !== _ || L[32] !== j
        ? ((N = (0, t.jsxs)("div", {
            className: "flex items-center gap-2",
            children: [j, _],
          })),
          (L[31] = _),
          (L[32] = j),
          (L[33] = N))
        : (N = L[33]),
      L[34] !== J ||
      L[35] !== q.labels ||
      L[36] !== q.members ||
      L[37] !== et ||
      L[38] !== Q
        ? ((k =
            q.members.length > 0
              ? (0, t.jsx)("div", {
                  className: "flex flex-wrap gap-1.5",
                  children: q.members.map((e) =>
                    (0, t.jsx)(
                      x.p,
                      {
                        as: "span",
                        density: J,
                        variant: "raised",
                        className: "pr-1",
                        trailing: (0, t.jsx)(v._, {
                          density: J,
                          size: 20,
                          "aria-label": Q("web.screeners.remove_member_a11y", {
                            name: q.labels[e] ?? e,
                          }),
                          onClick: () => et(e),
                          children: (0, t.jsx)(n.AD, { "aria-hidden": !0 }),
                        }),
                        children: q.labels[e] ?? (0, r.d)(e, 4, 4),
                      },
                      e,
                    ),
                  ),
                })
              : null),
          (L[34] = J),
          (L[35] = q.labels),
          (L[36] = q.members),
          (L[37] = et),
          (L[38] = Q),
          (L[39] = k))
        : (k = L[39]));
    let er = m.L[J];
    (L[40] !== q.kind || L[41] !== Q
      ? ((S =
          "users" === q.kind
            ? Q("web.screeners.add_members_users")
            : Q("web.screeners.add_members_coins")),
        (L[40] = q.kind),
        (L[41] = Q),
        (L[42] = S))
      : (S = L[42]),
      L[43] !== er || L[44] !== S
        ? ((M = (0, t.jsx)("p", { className: er, children: S })),
          (L[43] = er),
          (L[44] = S),
          (L[45] = M))
        : (M = L[45]),
      L[46] !== J || L[47] !== en || L[48] !== Y
        ? ((P = (0, t.jsx)(y.o, {
            density: J,
            value: Y,
            onValueChange: Z,
            label: en,
          })),
          (L[46] = J),
          (L[47] = en),
          (L[48] = Y),
          (L[49] = P))
        : (P = L[49]));
    let ei = A[J];
    (L[50] !== ei
      ? ((U = (0, I.c)(ei, "min-h-[160px]")), (L[50] = ei), (L[51] = U))
      : (U = L[51]),
      L[52] !== ee || L[53] !== q.kind || L[54] !== q.members || L[55] !== Y
        ? ((E =
            "coins" === q.kind
              ? (0, t.jsx)(W, {
                  term: Y,
                  pickedValues: q.members,
                  onPick: (e, t) => ee(e, t),
                })
              : (0, t.jsx)(K, {
                  term: Y,
                  pickedValues: q.members,
                  onPick: (e, t) => ee(e, t),
                })),
          (L[52] = ee),
          (L[53] = q.kind),
          (L[54] = q.members),
          (L[55] = Y),
          (L[56] = E))
        : (E = L[56]),
      L[57] !== U || L[58] !== E
        ? ((T = (0, t.jsx)("div", { className: U, children: E })),
          (L[57] = U),
          (L[58] = E),
          (L[59] = T))
        : (T = L[59]),
      L[60] !== M || L[61] !== P || L[62] !== T
        ? ((R = (0, t.jsxs)("div", {
            className: "flex flex-col gap-1.5",
            children: [M, P, T],
          })),
          (L[60] = M),
          (L[61] = P),
          (L[62] = T),
          (L[63] = R))
        : (R = L[63]),
      L[64] !== N || L[65] !== k || L[66] !== R
        ? ((F = (0, t.jsxs)(p.K, {
            className: "flex flex-col gap-3",
            children: [N, k, R],
          })),
          (L[64] = N),
          (L[65] = k),
          (L[66] = R),
          (L[67] = F))
        : (F = L[67]),
      L[68] !== V || L[69] !== Q
        ? (($ = V
            ? (0, t.jsx)(l.K, {
                type: "button",
                variant: "ghost",
                size: p.Z,
                "data-testid": "screeners-list-delete",
                onClick: V,
                className: "mr-auto !text-loss",
                children: Q("web.screeners.delete_list"),
              })
            : null),
          (L[68] = V),
          (L[69] = Q),
          (L[70] = $))
        : ($ = L[70]));
    let ea = !es;
    return (
      L[71] !== X || L[72] !== Q
        ? ((z = X ? Q("web.screeners.create_list") : Q("common.save")),
          (L[71] = X),
          (L[72] = Q),
          (L[73] = z))
        : (z = L[73]),
      L[74] !== G || L[75] !== ea || L[76] !== z
        ? ((D = (0, t.jsx)(l.K, {
            type: "submit",
            variant: "primary",
            size: p.$,
            isDisabled: ea,
            "data-testid": "screeners-list-save",
            onClick: G,
            children: z,
          })),
          (L[74] = G),
          (L[75] = ea),
          (L[76] = z),
          (L[77] = D))
        : (D = L[77]),
      L[78] !== $ || L[79] !== D
        ? ((O = (0, t.jsxs)(p.c, { children: [$, D] })),
          (L[78] = $),
          (L[79] = D),
          (L[80] = O))
        : (O = L[80]),
      L[81] !== F || L[82] !== O
        ? ((B = (0, t.jsxs)(t.Fragment, { children: [F, O] })),
          (L[81] = F),
          (L[82] = O),
          (L[83] = B))
        : (B = L[83]),
      B
    );
  }
  function L() {
    let e,
      n,
      l = (0, s.c)(3),
      r = (0, p.M)();
    return (
      l[0] === Symbol.for("react.memo_cache_sentinel")
        ? ((e = Array.from({ length: 4 })), (l[0] = e))
        : (e = l[0]),
      l[1] !== r
        ? ((n = (0, t.jsx)("div", {
            "aria-hidden": !0,
            className: "flex flex-col",
            children: e.map((e, s) =>
              (0, t.jsxs)(
                "div",
                {
                  className: (0, I.c)(
                    "flex items-center",
                    "terminal" === r ? "h-9 gap-3 px-3" : "h-11 gap-3 px-5",
                  ),
                  children: [
                    (0, t.jsx)(j.l, { variant: "art", size: 28 }),
                    (0, t.jsx)(j.l, {
                      height: "terminal" === r ? 12 : 14,
                      width: 144,
                    }),
                  ],
                },
                s,
              ),
            ),
          })),
          (l[1] = r),
          (l[2] = n))
        : (n = l[2]),
      n
    );
  }
  function q() {
    let e,
      l = (0, s.c)(1);
    return (
      l[0] === Symbol.for("react.memo_cache_sentinel")
        ? ((e = (0, t.jsx)(n.R5, {
            "aria-hidden": !0,
            className: "ml-auto size-3.5 shrink-0 text-text-accent",
          })),
          (l[0] = e))
        : (e = l[0]),
      e
    );
  }
  function W(e) {
    let n,
      l,
      i,
      c,
      d,
      m = (0, s.c)(28),
      { term: h, pickedValues: x, onPick: g } = e,
      { t: b } = (0, a.f)(),
      v = (0, p.M)(),
      y = (0, U.M)();
    m[0] !== h ? ((n = h.trim()), (m[0] = h), (m[1] = n)) : (n = m[1]);
    let [w] = (0, o.r)(n, 500);
    m[2] !== w || m[3] !== y
      ? ((l = {
          sort: "market_cap",
          offset: 0,
          limit: 10,
          includeNsfw: y,
          isSearchMode: !0,
          useUnrestrictedSearch: !0,
          searchTerm: w,
        }),
        (m[2] = w),
        (m[3] = y),
        (m[4] = l))
      : (l = m[4]);
    let { coins: j, loading: _ } = (0, k.f)(l);
    if (0 === w.length) {
      let e, s;
      return (
        m[5] !== b
          ? ((e = b("web.screeners.type_to_search_coins")),
            (m[5] = b),
            (m[6] = e))
          : (e = m[6]),
        m[7] !== e
          ? ((s = (0, t.jsx)(H, { children: e })), (m[7] = e), (m[8] = s))
          : (s = m[8]),
        s
      );
    }
    if (_ && 0 === j.length) {
      let e;
      return (
        m[9] === Symbol.for("react.memo_cache_sentinel")
          ? ((e = (0, t.jsx)(L, {})), (m[9] = e))
          : (e = m[9]),
        e
      );
    }
    if (0 === j.length) {
      let e, s;
      return (
        m[10] !== b
          ? ((e = b("web.screeners.no_coins_found")), (m[10] = b), (m[11] = e))
          : (e = m[11]),
        m[12] !== e
          ? ((s = (0, t.jsx)(H, { children: e })), (m[12] = e), (m[13] = s))
          : (s = m[13]),
        s
      );
    }
    if (
      (m[14] !== b
        ? ((i = b("web.screeners.coin_results")), (m[14] = b), (m[15] = i))
        : (i = m[15]),
      m[16] !== j || m[17] !== v || m[18] !== g || m[19] !== x)
    ) {
      let e;
      (m[21] !== v || m[22] !== g || m[23] !== x
        ? ((e = (e) => {
            let s = e.symbol?.replace(/^\$/, ""),
              n = s || e.name || (0, r.d)(e.mint, 4, 4),
              l = x?.includes(e.mint) ?? !1;
            return (0, t.jsx)(
              "li",
              {
                children: (0, t.jsxs)("button", {
                  type: "button",
                  disabled: l,
                  onClick: () => g(e.mint, n),
                  className: T[v],
                  children: [
                    (0, t.jsx)(u.CoinAvatar, {
                      optimisticImage: !0,
                      coin: e,
                      size: 28,
                    }),
                    (0, t.jsxs)("span", {
                      className: "flex min-w-0 flex-1 items-center gap-1.5",
                      children: [
                        (0, t.jsx)(f.f, { coin: e, nameClassName: R[v] }),
                        s
                          ? (0, t.jsx)("span", {
                              className:
                                "shrink-0 text-xs leading-4 text-text-quaternary",
                              children: s,
                            })
                          : null,
                      ],
                    }),
                    l ? (0, t.jsx)(q, {}) : null,
                  ],
                }),
              },
              e.mint,
            );
          }),
          (m[21] = v),
          (m[22] = g),
          (m[23] = x),
          (m[24] = e))
        : (e = m[24]),
        (c = j.map(e)),
        (m[16] = j),
        (m[17] = v),
        (m[18] = g),
        (m[19] = x),
        (m[20] = c));
    } else c = m[20];
    return (
      m[25] !== i || m[26] !== c
        ? ((d = (0, t.jsx)("ul", {
            className: "flex max-h-[280px] flex-col overflow-y-auto",
            "aria-label": i,
            children: c,
          })),
          (m[25] = i),
          (m[26] = c),
          (m[27] = d))
        : (d = m[27]),
      d
    );
  }
  function K(e) {
    let n,
      l,
      i,
      o,
      c = (0, s.c)(29),
      { term: d, pickedValues: m, onPick: u } = e,
      { t: f } = (0, a.f)(),
      x = (0, p.M)();
    c[0] !== d ? ((n = { searchTerm: d }), (c[0] = d), (c[1] = n)) : (n = c[1]);
    let { users: g, loading: b, isSearchTermTooShort: v } = (0, S.N)(n);
    if (0 === d.trim().length) {
      let e, s;
      return (
        c[2] !== f
          ? ((e = f("web.screeners.type_to_search_users")),
            (c[2] = f),
            (c[3] = e))
          : (e = c[3]),
        c[4] !== e
          ? ((s = (0, t.jsx)(H, { children: e })), (c[4] = e), (c[5] = s))
          : (s = c[5]),
        s
      );
    }
    if (v) {
      let e, s;
      return (
        c[6] !== f
          ? ((e = f("web.screeners.keep_typing")), (c[6] = f), (c[7] = e))
          : (e = c[7]),
        c[8] !== e
          ? ((s = (0, t.jsx)(H, { children: e })), (c[8] = e), (c[9] = s))
          : (s = c[9]),
        s
      );
    }
    if (b && 0 === g.length) {
      let e;
      return (
        c[10] === Symbol.for("react.memo_cache_sentinel")
          ? ((e = (0, t.jsx)(L, {})), (c[10] = e))
          : (e = c[10]),
        e
      );
    }
    if (0 === g.length) {
      let e, s;
      return (
        c[11] !== f
          ? ((e = f("web.screeners.no_users_found")), (c[11] = f), (c[12] = e))
          : (e = c[12]),
        c[13] !== e
          ? ((s = (0, t.jsx)(H, { children: e })), (c[13] = e), (c[14] = s))
          : (s = c[14]),
        s
      );
    }
    if (
      (c[15] !== f
        ? ((l = f("web.screeners.user_results")), (c[15] = f), (c[16] = l))
        : (l = c[16]),
      c[17] !== x || c[18] !== u || c[19] !== m || c[20] !== g)
    ) {
      let e;
      (c[22] !== x || c[23] !== u || c[24] !== m
        ? ((e = (e) => {
            let s = e.username || (0, r.d)(e.address, 4, 4),
              n = m?.includes(e.address) ?? !1;
            return (0, t.jsx)(
              "li",
              {
                children: (0, t.jsxs)("button", {
                  type: "button",
                  disabled: n,
                  onClick: () => u(e.address, s),
                  className: T[x],
                  children: [
                    (0, t.jsx)(h.S, {
                      address: e.address,
                      username: e.username,
                      profileImage: e.profile_image,
                      size: 28,
                      density: x,
                      link: !1,
                      hoverCard: !1,
                      subline: "address",
                      className: "min-w-0 flex-1",
                    }),
                    n ? (0, t.jsx)(q, {}) : null,
                  ],
                }),
              },
              e.address,
            );
          }),
          (c[22] = x),
          (c[23] = u),
          (c[24] = m),
          (c[25] = e))
        : (e = c[25]),
        (i = g.map(e)),
        (c[17] = x),
        (c[18] = u),
        (c[19] = m),
        (c[20] = g),
        (c[21] = i));
    } else i = c[21];
    return (
      c[26] !== l || c[27] !== i
        ? ((o = (0, t.jsx)("ul", {
            className: "flex max-h-[280px] flex-col overflow-y-auto",
            "aria-label": l,
            children: i,
          })),
          (c[26] = l),
          (c[27] = i),
          (c[28] = o))
        : (o = c[28]),
      o
    );
  }
  function H(e) {
    let n,
      l = (0, s.c)(3),
      { children: r } = e,
      i = (0, p.M)();
    return (
      l[0] !== r || l[1] !== i
        ? ((n = (0, t.jsx)(g.L, { density: i, children: r })),
          (l[0] = r),
          (l[1] = i),
          (l[2] = n))
        : (n = l[2]),
      n
    );
  }
  e.s([
    "f",
    0,
    function (e) {
      let n,
        l,
        r,
        i = (0, s.c)(19),
        { type: o, heading: c, onPick: d, onClose: m } = e,
        { t: u } = (0, a.f)(),
        f = M.J[o],
        h = f.param;
      if (!h) return null;
      i[0] !== f.label || i[1] !== c || i[2] !== u
        ? ((n = c ?? u("web.screeners.add_view", { view: (0, E.G)(f.label) })),
          (i[0] = f.label),
          (i[1] = c),
          (i[2] = u),
          (i[3] = n))
        : (n = i[3]);
      let x = n;
      if ("list" === h.kind) {
        let e, s;
        return (
          i[4] !== d || i[5] !== h.key
            ? ((e = (e) => d({ [h.key]: e })),
              (i[4] = d),
              (i[5] = h.key),
              (i[6] = e))
            : (e = i[6]),
          i[7] !== m || i[8] !== e || i[9] !== x
            ? ((s = (0, t.jsx)(D, { title: x, onPick: e, onClose: m })),
              (i[7] = m),
              (i[8] = e),
              (i[9] = x),
              (i[10] = s))
            : (s = i[10]),
          s
        );
      }
      return (
        i[11] !== d || i[12] !== h.key
          ? ((l = (e) => d({ [h.key]: e })),
            (i[11] = d),
            (i[12] = h.key),
            (i[13] = l))
          : (l = i[13]),
        i[14] !== m || i[15] !== h.kind || i[16] !== l || i[17] !== x
          ? ((r = (0, t.jsx)($, {
              title: x,
              kind: h.kind,
              onPick: l,
              onClose: m,
            })),
            (i[14] = m),
            (i[15] = h.kind),
            (i[16] = l),
            (i[17] = x),
            (i[18] = r))
          : (r = i[18]),
        r
      );
    },
  ]);
};
