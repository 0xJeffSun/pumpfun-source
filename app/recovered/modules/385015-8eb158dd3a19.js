// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  "use strict";
  var t = e.i(149502),
    r = e.i(732486),
    o = e.i(445242),
    n = e.i(745018),
    l = e.i(352386);
  e.i(12692);
  var a = e.i(398902);
  e.i(290568);
  var i = e.i(310430),
    s = e.i(297053),
    u = e.i(928011),
    c = e.i(891974),
    d = e.i(200165),
    p = e.i(732392),
    m = e.i(711902),
    f = e.i(994675),
    h = e.i(944410),
    g = e.i(613677),
    y = e.i(342463),
    b = e.i(866890),
    v = e.i(637782),
    x = e.i(777683);
  let _ = g.z.object({ placeId: y.z.string(), label: y.z.string() }),
    w = g.z.object({ predictions: b.z.array(_) }),
    C = g.z.object({
      lat: v.z.number(),
      lng: v.z.number(),
      label: y.z.string(),
    }),
    S = () =>
      "u" > typeof crypto && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `session-${Math.random().toString(36).slice(2)}`;
  async function L(e) {
    let t = e.query.trim();
    if (t.length < 3) return { predictions: [], error: null };
    try {
      let r = await e.api
          .get("bounties/places/autocomplete", {
            searchParams: { query: t, sessionToken: e.sessionToken },
          })
          .json(),
        o = w.parse(r);
      return {
        predictions: o.predictions,
        error: 0 === o.predictions.length ? "No matching places found." : null,
      };
    } catch (e) {
      return {
        predictions: [],
        error: await (0, x.u)(
          e,
          "Couldn't search locations right now. Try again.",
        ),
      };
    }
  }
  async function M(e) {
    try {
      let t = await e.api
        .get("bounties/places/details", {
          searchParams: { placeId: e.placeId, sessionToken: e.sessionToken },
        })
        .json();
      return { result: C.parse(t), error: null };
    } catch (e) {
      return {
        result: null,
        error: await (0, x.u)(
          e,
          "Couldn't load place details right now. Try again.",
        ),
      };
    }
  }
  let E =
      t.default.env.NEXT_PUBLIC_MAP_STYLE_URL ??
      "https://tiles.openfreemap.org/styles/positron",
    j = { lat: 40.7549, lng: -73.984 };
  function P(e) {
    return e.preventDefault();
  }
  e.s(
    [
      "BountyLocationPicker",
      0,
      function (e) {
        let t,
          g,
          y,
          b,
          v,
          x,
          _,
          w,
          C,
          k,
          z,
          R,
          T,
          N,
          U,
          I,
          O,
          A,
          F,
          D,
          Z,
          W,
          B,
          H,
          q,
          $,
          V = (0, o.c)(91),
          { value: Y, onChange: K, disabled: G } = e,
          J = void 0 !== G && G,
          { t: X } = (0, a.f)(),
          Q = (0, l.useRef)(null),
          [ee, et] = (0, l.useState)(""),
          [er, eo] = (0, l.useState)(!1),
          [en, el] = (0, l.useState)(!1),
          [ea, ei] = (0, l.useState)(null),
          {
            visiblePredictions: es,
            visibleSearchError: eu,
            isSearching: ec,
            isSearchable: ed,
            resetSearch: ep,
            fetchPlaceDetails: em,
          } = (function (e) {
            let t,
              r,
              n,
              a,
              i,
              s,
              u,
              c,
              d,
              p,
              m = (0, o.c)(23),
              f = (0, h.useLivestreamApiClient)();
            m[0] === Symbol.for("react.memo_cache_sentinel")
              ? ((t = []), (m[0] = t))
              : (t = m[0]);
            let [g, y] = (0, l.useState)(t),
              [b, v] = (0, l.useState)(!1),
              [x, _] = (0, l.useState)(null),
              w = (0, l.useRef)(0);
            m[1] === Symbol.for("react.memo_cache_sentinel")
              ? ((r = S()), (m[1] = r))
              : (r = m[1]);
            let C = (0, l.useRef)(r);
            m[2] !== e ? ((n = e.trim()), (m[2] = e), (m[3] = n)) : (n = m[3]);
            let E = n.length >= 3;
            m[4] === Symbol.for("react.memo_cache_sentinel")
              ? ((a = () => {
                  C.current = S();
                }),
                (m[4] = a))
              : (a = m[4]);
            let j = a;
            (m[5] !== f || 450 !== m[6] || m[7] !== E || m[8] !== e
              ? ((i = () => {
                  if (!E) {
                    ((w.current = w.current + 1), y([]), _(null), v(!1));
                    return;
                  }
                  let t = setTimeout(() => {
                    let t = (w.current = w.current + 1);
                    (v(!0),
                      _(null),
                      L({ api: f, query: e, sessionToken: C.current }).then(
                        (e) => {
                          w.current === t &&
                            (y(e.predictions), _(e.error), v(!1));
                        },
                      ));
                  }, 450);
                  return () => {
                    (clearTimeout(t), (w.current = w.current + 1), v(!1));
                  };
                }),
                (s = [f, 450, E, e]),
                (m[5] = f),
                (m[6] = 450),
                (m[7] = E),
                (m[8] = e),
                (m[9] = i),
                (m[10] = s))
              : ((i = m[9]), (s = m[10])),
              (0, l.useEffect)(i, s),
              m[11] === Symbol.for("react.memo_cache_sentinel")
                ? ((u = () => {
                    ((w.current = w.current + 1), y([]), _(null), v(!1), j());
                  }),
                  (m[11] = u))
                : (u = m[11]));
            let P = u;
            m[12] !== f
              ? ((c = async (e) => {
                  let t = await M({
                    api: f,
                    placeId: e,
                    sessionToken: C.current,
                  });
                  return (j(), t);
                }),
                (m[12] = f),
                (m[13] = c))
              : (c = m[13]);
            let k = c;
            m[14] !== E || m[15] !== g
              ? ((d = E ? g : []), (m[14] = E), (m[15] = g), (m[16] = d))
              : (d = m[16]);
            let z = E ? x : null,
              R = E && b;
            return (
              m[17] !== k ||
              m[18] !== E ||
              m[19] !== z ||
              m[20] !== R ||
              m[21] !== d
                ? ((p = {
                    visiblePredictions: d,
                    visibleSearchError: z,
                    isSearching: R,
                    isSearchable: E,
                    resetSearch: P,
                    fetchPlaceDetails: k,
                  }),
                  (m[17] = k),
                  (m[18] = E),
                  (m[19] = z),
                  (m[20] = R),
                  (m[21] = d),
                  (m[22] = p))
                : (p = m[22]),
              p
            );
          })(er ? ee : "");
        V[0] !== Y
          ? ((t = Y ? { lat: Y.lat, lng: Y.lng } : j), (V[0] = Y), (V[1] = t))
          : (t = V[1]);
        let ef = t,
          eh = Y?.radiusMeters ?? 1e3;
        V[2] !== eh
          ? ((g = (0, f.f)({ meters: eh, minMeters: m.w, maxMeters: m.Y })),
            (V[2] = eh),
            (V[3] = g))
          : (g = V[3]);
        let eg = g;
        V[4] !== ef || V[5] !== eh || V[6] !== Y
          ? ((y = Y ? (0, f.K)({ center: ef, radiusMeters: eh }) : null),
            (V[4] = ef),
            (V[5] = eh),
            (V[6] = Y),
            (V[7] = y))
          : (y = V[7]);
        let ey = y;
        V[8] !== K || V[9] !== eh
          ? ((b = (e) => {
              K({
                lat: e.lat,
                lng: e.lng,
                radiusMeters: e.radiusMeters ?? eh,
                ...(void 0 !== e.label ? { label: e.label } : {}),
              });
            }),
            (V[8] = K),
            (V[9] = eh),
            (V[10] = b))
          : (b = V[10]);
        let eb = b;
        V[11] !== J ||
        V[12] !== em ||
        V[13] !== en ||
        V[14] !== ep ||
        V[15] !== eb ||
        V[16] !== X
          ? ((v = async (e) => {
              if (J || en) return;
              (el(!0), ei(null));
              let t = await em(e.placeId);
              if (!t.result) {
                (ei(t.error ?? X("web.bounties.location_place_details_error")),
                  el(!1));
                return;
              }
              (eb({
                lat: t.result.lat,
                lng: t.result.lng,
                label: t.result.label,
              }),
                ep(),
                eo(!1),
                et(t.result.label),
                ei(null),
                el(!1),
                Q.current?.flyTo({
                  center: [t.result.lng, t.result.lat],
                  zoom: 12,
                  duration: 800,
                }));
            }),
            (V[11] = J),
            (V[12] = em),
            (V[13] = en),
            (V[14] = ep),
            (V[15] = eb),
            (V[16] = X),
            (V[17] = v))
          : (v = V[17]);
        let ev = v;
        V[18] !== K || V[19] !== ep
          ? ((x = () => {
              (K(null), et(""), eo(!1), ei(null), ep());
            }),
            (V[18] = K),
            (V[19] = ep),
            (V[20] = x))
          : (x = V[20]);
        let ex = x;
        V[21] !== K || V[22] !== Y
          ? ((_ = (e) => {
              if (!Y) return;
              let t = Math.min(Math.max(Math.round(e), m.w), m.Y);
              K({ ...Y, radiusMeters: t });
            }),
            (V[21] = K),
            (V[22] = Y),
            (V[23] = _))
          : (_ = V[23]);
        let e_ = _;
        V[24] === Symbol.for("react.memo_cache_sentinel")
          ? ((w = (0, r.jsx)(n.L3, {
              "aria-hidden": !0,
              className:
                "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-tertiary",
            })),
            (V[24] = w))
          : (w = V[24]);
        let ew = J || en;
        (V[25] === Symbol.for("react.memo_cache_sentinel")
          ? ((C = (e) => {
              (et(e.target.value), eo(!0));
            }),
            (k = () => eo(!1)),
            (V[25] = C),
            (V[26] = k))
          : ((C = V[25]), (k = V[26])),
          V[27] !== X
            ? ((z = X("web.bounties.location_search_placeholder")),
              (V[27] = X),
              (V[28] = z))
            : (z = V[28]),
          V[29] !== ee || V[30] !== ew || V[31] !== z
            ? ((R = (0, r.jsx)(d.f, {
                className:
                  "h-11 rounded-[14px] border-border-secondary bg-bg-tertiary pl-9 pr-9 text-white placeholder:text-text-tertiary focus-visible:ring-1 focus-visible:ring-white/20 focus-visible:ring-offset-0 dark:border-border-secondary dark:bg-bg-tertiary",
                disabled: ew,
                onChange: C,
                onBlur: k,
                placeholder: z,
                value: ee,
              })),
              (V[29] = ee),
              (V[30] = ew),
              (V[31] = z),
              (V[32] = R))
            : (R = V[32]),
          V[33] !== ex || V[34] !== ee || V[35] !== X || V[36] !== Y
            ? ((T =
                Y || ee
                  ? (0, r.jsx)("button", {
                      "aria-label": X("web.bounties.location_clear"),
                      className:
                        "absolute right-2 top-1/2 inline-flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-text-tertiary transition-colors hover:text-white",
                      onClick: ex,
                      type: "button",
                      children: (0, r.jsx)(n.Ps, { className: "h-4 w-4" }),
                    })
                  : null),
              (V[33] = ex),
              (V[34] = ee),
              (V[35] = X),
              (V[36] = Y),
              (V[37] = T))
            : (T = V[37]),
          V[38] !== R || V[39] !== T
            ? ((N = (0, r.jsxs)("div", {
                className: "relative",
                children: [w, R, T],
              })),
              (V[38] = R),
              (V[39] = T),
              (V[40] = N))
            : (N = V[40]),
          V[41] !== J ||
          V[42] !== ev ||
          V[43] !== en ||
          V[44] !== er ||
          V[45] !== es
            ? ((U =
                er && es.length > 0
                  ? (0, r.jsx)("ul", {
                      className:
                        "absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-[14px] border border-border-secondary bg-bg-secondary py-1 shadow-xl",
                      children: es.map((e) =>
                        (0, r.jsx)(
                          "li",
                          {
                            children: (0, r.jsx)("button", {
                              className:
                                "block w-full px-3 py-2 text-left text-sm leading-5 text-text-secondary transition-colors hover:bg-white/5 hover:text-white disabled:cursor-not-allowed disabled:opacity-60",
                              disabled: J || en,
                              onMouseDown: P,
                              onClick: () => void ev(e),
                              type: "button",
                              children: e.label,
                            }),
                          },
                          e.placeId,
                        ),
                      ),
                    })
                  : null),
              (V[41] = J),
              (V[42] = ev),
              (V[43] = en),
              (V[44] = er),
              (V[45] = es),
              (V[46] = U))
            : (U = V[46]),
          V[47] !== ed || V[48] !== ec || V[49] !== en || V[50] !== X
            ? ((I =
                ed && (ec || en)
                  ? (0, r.jsx)("p", {
                      className: "mt-1 text-xs text-text-tertiary",
                      children: en
                        ? X("web.bounties.location_loading_place")
                        : X("web.bounties.searching"),
                    })
                  : null),
              (V[47] = ed),
              (V[48] = ec),
              (V[49] = en),
              (V[50] = X),
              (V[51] = I))
            : (I = V[51]),
          V[52] !== ea || V[53] !== eu
            ? ((O =
                eu || ea
                  ? (0, r.jsx)("p", {
                      className: "mt-1 text-xs text-text-error",
                      children: ea ?? eu,
                    })
                  : null),
              (V[52] = ea),
              (V[53] = eu),
              (V[54] = O))
            : (O = V[54]),
          V[55] !== N || V[56] !== U || V[57] !== I || V[58] !== O
            ? ((A = (0, r.jsxs)("div", {
                className: "relative",
                children: [N, U, I, O],
              })),
              (V[55] = N),
              (V[56] = U),
              (V[57] = I),
              (V[58] = O),
              (V[59] = A))
            : (A = V[59]));
        let eC = Y ? 12 : 9;
        return (
          V[60] !== ef.lat || V[61] !== ef.lng || V[62] !== eC
            ? ((F = { latitude: ef.lat, longitude: ef.lng, zoom: eC }),
              (V[60] = ef.lat),
              (V[61] = ef.lng),
              (V[62] = eC),
              (V[63] = F))
            : (F = V[63]),
          V[64] !== J || V[65] !== eb
            ? ((D = (e) => {
                J || eb({ lat: e.lngLat.lat, lng: e.lngLat.lng });
              }),
              (V[64] = J),
              (V[65] = eb),
              (V[66] = D))
            : (D = V[66]),
          V[67] === Symbol.for("react.memo_cache_sentinel")
            ? ((Z = { width: "100%", height: "100%" }), (V[67] = Z))
            : (Z = V[67]),
          V[68] !== ey
            ? ((W = ey
                ? (0, r.jsxs)(c.f, {
                    data: ey,
                    id: "bounty-geofence",
                    type: "geojson",
                    children: [
                      (0, r.jsx)(s.f, {
                        id: "bounty-geofence-fill",
                        paint: {
                          "fill-color": "#22c55e",
                          "fill-opacity": 0.18,
                        },
                        type: "fill",
                      }),
                      (0, r.jsx)(s.f, {
                        id: "bounty-geofence-outline",
                        paint: { "line-color": "#22c55e", "line-width": 2 },
                        type: "line",
                      }),
                    ],
                  })
                : null),
              (V[68] = ey),
              (V[69] = W))
            : (W = V[69]),
          V[70] !== J || V[71] !== eb || V[72] !== Y
            ? ((B = Y
                ? (0, r.jsx)(u.f, {
                    anchor: "bottom",
                    draggable: !J,
                    latitude: Y.lat,
                    longitude: Y.lng,
                    onDragEnd: (e) =>
                      eb({ lat: e.lngLat.lat, lng: e.lngLat.lng }),
                    children: (0, r.jsx)("div", {
                      className:
                        "h-3 w-3 rounded-full border-2 border-white bg-green-500 shadow-[0_0_0_4px_rgba(34,197,94,0.35)]",
                    }),
                  })
                : null),
              (V[70] = J),
              (V[71] = eb),
              (V[72] = Y),
              (V[73] = B))
            : (B = V[73]),
          V[74] !== F || V[75] !== D || V[76] !== W || V[77] !== B
            ? ((H = (0, r.jsx)("div", {
                className:
                  "h-[280px] overflow-hidden rounded-[18px] border border-border-secondary",
                children: (0, r.jsxs)(i.f, {
                  ref: Q,
                  attributionControl: !1,
                  initialViewState: F,
                  mapStyle: E,
                  onClick: D,
                  style: Z,
                  children: [W, B],
                }),
              })),
              (V[74] = F),
              (V[75] = D),
              (V[76] = W),
              (V[77] = B),
              (V[78] = H))
            : (H = V[78]),
          V[79] !== J ||
          V[80] !== e_ ||
          V[81] !== K ||
          V[82] !== eh ||
          V[83] !== eg ||
          V[84] !== X ||
          V[85] !== Y
            ? ((q = Y
                ? (0, r.jsxs)("div", {
                    className:
                      "flex flex-col gap-3 rounded-[18px] border border-border-secondary bg-bg-tertiary p-4",
                    children: [
                      (0, r.jsxs)("div", {
                        children: [
                          (0, r.jsxs)("div", {
                            className: "mb-2 flex items-center justify-between",
                            children: [
                              (0, r.jsx)(p.f, {
                                className: "text-white",
                                htmlFor: "bounty-location-radius",
                                children: X(
                                  "web.bounties.location_range_label",
                                ),
                              }),
                              (0, r.jsx)("span", {
                                className:
                                  "text-sm font-medium text-text-secondary",
                                children: (0, f.U)(eh),
                              }),
                            ],
                          }),
                          (0, r.jsx)("input", {
                            className: "w-full accent-green-500",
                            disabled: J,
                            id: "bounty-location-radius",
                            max: f.k,
                            min: 0,
                            onChange: (e) =>
                              e_(
                                (0, f.Z)({
                                  value: Number(e.target.value),
                                  minMeters: m.w,
                                  maxMeters: m.Y,
                                }),
                              ),
                            step: 1,
                            type: "range",
                            value: eg,
                          }),
                        ],
                      }),
                      (0, r.jsxs)("div", {
                        children: [
                          (0, r.jsx)(p.f, {
                            className: "mb-2 block text-white",
                            htmlFor: "bounty-location-label",
                            children: X("web.bounties.location_label_label"),
                          }),
                          (0, r.jsx)(d.f, {
                            className:
                              "h-11 rounded-[14px] border-border-secondary bg-bg-secondary text-white placeholder:text-text-tertiary focus-visible:ring-1 focus-visible:ring-white/20 focus-visible:ring-offset-0 dark:border-border-secondary dark:bg-bg-secondary",
                            disabled: J,
                            id: "bounty-location-label",
                            maxLength: m.P,
                            onChange: (e) => K({ ...Y, label: e.target.value }),
                            placeholder: X(
                              "web.bounties.location_label_placeholder",
                            ),
                            value: Y.label ?? "",
                          }),
                        ],
                      }),
                    ],
                  })
                : (0, r.jsx)("p", {
                    className: "text-xs leading-5 text-text-tertiary",
                    children: X("web.bounties.location_map_hint"),
                  })),
              (V[79] = J),
              (V[80] = e_),
              (V[81] = K),
              (V[82] = eh),
              (V[83] = eg),
              (V[84] = X),
              (V[85] = Y),
              (V[86] = q))
            : (q = V[86]),
          V[87] !== A || V[88] !== H || V[89] !== q
            ? (($ = (0, r.jsxs)("div", {
                className: "flex flex-col gap-3",
                children: [A, H, q],
              })),
              (V[87] = A),
              (V[88] = H),
              (V[89] = q),
              (V[90] = $))
            : ($ = V[90]),
          $
        );
      },
    ],
    385015,
  );
};
