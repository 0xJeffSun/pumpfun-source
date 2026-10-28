// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    n = e.i(745018),
    i = e.i(439587),
    o = e.i(426091),
    a = e.i(352386),
    l = e.i(179236);
  e.i(12692);
  var c = e.i(398902),
    s = e.i(63289),
    u = e.i(944410),
    f = e.i(711902),
    d = e.i(777683),
    p = e.i(886599);
  function m(e) {
    return "success" !== e.status;
  }
  function b(e) {
    return "error" === e.status;
  }
  function g(e) {
    return (
      "pending" === e.status ||
      "requesting" === e.status ||
      "uploading" === e.status
    );
  }
  function v(e) {
    return { ...e, status: "requesting", progress: 0, error: void 0 };
  }
  function y(e) {
    return e.abort();
  }
  function h(e) {
    return (
      "pending" === e.status ||
      "requesting" === e.status ||
      "uploading" === e.status
    );
  }
  function x(e) {
    let a,
      l,
      s,
      u,
      f,
      d,
      p,
      m,
      b = (0, r.c)(21),
      { t: g } = (0, c.f)(),
      { isDisabled: v, reachedMax: y, helperText: h, onChooseFiles: x } = e,
      w = (v || y) && "opacity-60";
    (b[0] !== w
      ? ((a = (0, o.c)(
          "flex flex-wrap items-center justify-between gap-3 rounded-[14px] border border-dashed border-border-tertiary bg-bg-secondary px-4 py-3",
          w,
        )),
        (b[0] = w),
        (b[1] = a))
      : (a = b[1]),
      b[2] !== h || b[3] !== y || b[4] !== g
        ? ((l = y
            ? g("web.bounties.file_limit_reached")
            : g("web.bounties.drag_more_files", { helper: h })),
          (b[2] = h),
          (b[3] = y),
          (b[4] = g),
          (b[5] = l))
        : (l = b[5]),
      b[6] !== l
        ? ((s = (0, t.jsx)("p", {
            className: "text-xs leading-5 text-text-secondary",
            children: l,
          })),
          (b[6] = l),
          (b[7] = s))
        : (s = b[7]));
    let j = v || y;
    return (
      b[8] === Symbol.for("react.memo_cache_sentinel")
        ? ((u = (0, t.jsx)(n.YC, {})), (b[8] = u))
        : (u = b[8]),
      b[9] !== x
        ? ((f = (e) => {
            (e.preventDefault(), e.stopPropagation(), x());
          }),
          (b[9] = x),
          (b[10] = f))
        : (f = b[10]),
      b[11] !== g
        ? ((d = g("web.bounties.add_files")), (b[11] = g), (b[12] = d))
        : (d = b[12]),
      b[13] !== j || b[14] !== f || b[15] !== d
        ? ((p = (0, t.jsx)(i.K, {
            isDisabled: j,
            iconStart: u,
            onClick: f,
            type: "button",
            variant: "secondary",
            children: d,
          })),
          (b[13] = j),
          (b[14] = f),
          (b[15] = d),
          (b[16] = p))
        : (p = b[16]),
      b[17] !== a || b[18] !== s || b[19] !== p
        ? ((m = (0, t.jsxs)("div", { className: a, children: [s, p] })),
          (b[17] = a),
          (b[18] = s),
          (b[19] = p),
          (b[20] = m))
        : (m = b[20]),
      m
    );
  }
  function w(e) {
    let i,
      o,
      a,
      l,
      s,
      u,
      f,
      d,
      m,
      b,
      g,
      v,
      y,
      h,
      x,
      w = (0, r.c)(41),
      { t: j } = (0, c.f)(),
      { attachment: k, onRemove: O, isDisabled: A } = e;
    (w[0] !== k.kind || w[1] !== k.url
      ? ((i = (0, t.jsx)(D, { fullSize: !0, kind: k.kind, src: k.url })),
        (w[0] = k.kind),
        (w[1] = k.url),
        (w[2] = i))
      : (i = w[2]),
      w[3] !== k.size
        ? ((o = (0, p.e)(k.size)), (w[3] = k.size), (w[4] = o))
        : (o = w[4]),
      w[5] !== k.kind || w[6] !== o
        ? ((a = (0, t.jsxs)("p", {
            className: "text-xs text-text-secondary",
            children: [o, " · ", k.kind],
          })),
          (w[5] = k.kind),
          (w[6] = o),
          (w[7] = a))
        : (a = w[7]));
    let S = k.url;
    (w[8] !== j
      ? ((l = j("web.bounties.open_file")), (w[8] = j), (w[9] = l))
      : (l = w[9]),
      w[10] !== k.url || w[11] !== l
        ? ((s = (0, t.jsx)("a", {
            className:
              "inline-flex text-xs text-text-secondary underline-offset-2 transition-colors hover:text-white hover:underline",
            href: S,
            rel: "noreferrer",
            target: "_blank",
            children: l,
          })),
          (w[10] = k.url),
          (w[11] = l),
          (w[12] = s))
        : (s = w[12]));
    let E = k.filename,
      F = k.url;
    return (
      w[13] !== j
        ? ((u = j("common.download")), (w[13] = j), (w[14] = u))
        : (u = w[14]),
      w[15] !== k.filename || w[16] !== k.url || w[17] !== u
        ? ((f = (0, t.jsx)("a", {
            className:
              "inline-flex text-xs text-text-secondary underline-offset-2 transition-colors hover:text-white hover:underline",
            download: E,
            href: F,
            children: u,
          })),
          (w[15] = k.filename),
          (w[16] = k.url),
          (w[17] = u),
          (w[18] = f))
        : (f = w[18]),
      w[19] !== s || w[20] !== f
        ? ((d = (0, t.jsxs)("div", {
            className: "mt-1 flex flex-wrap items-center gap-2",
            children: [s, f],
          })),
          (w[19] = s),
          (w[20] = f),
          (w[21] = d))
        : (d = w[21]),
      w[22] !== d || w[23] !== a
        ? ((m = (0, t.jsxs)("div", { className: "min-w-0", children: [a, d] })),
          (w[22] = d),
          (w[23] = a),
          (w[24] = m))
        : (m = w[24]),
      w[25] !== k.filename || w[26] !== j
        ? ((b = j("web.bounties.remove_file", { name: k.filename })),
          (w[25] = k.filename),
          (w[26] = j),
          (w[27] = b))
        : (b = w[27]),
      w[28] !== O
        ? ((g = (e) => {
            (e.preventDefault(), O());
          }),
          (w[28] = O),
          (w[29] = g))
        : (g = w[29]),
      w[30] === Symbol.for("react.memo_cache_sentinel")
        ? ((v = (0, t.jsx)(n.Ps, { className: "h-4 w-4" })), (w[30] = v))
        : (v = w[30]),
      w[31] !== A || w[32] !== b || w[33] !== g
        ? ((y = (0, t.jsx)("button", {
            "aria-label": b,
            className:
              "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-text-secondary transition-colors hover:bg-white/5 hover:text-white disabled:opacity-50",
            disabled: A,
            onClick: g,
            type: "button",
            children: v,
          })),
          (w[31] = A),
          (w[32] = b),
          (w[33] = g),
          (w[34] = y))
        : (y = w[34]),
      w[35] !== m || w[36] !== y
        ? ((h = (0, t.jsxs)("div", {
            className: "flex items-start justify-between gap-3",
            children: [m, y],
          })),
          (w[35] = m),
          (w[36] = y),
          (w[37] = h))
        : (h = w[37]),
      w[38] !== i || w[39] !== h
        ? ((x = (0, t.jsxs)("div", {
            className:
              "flex flex-col gap-3 rounded-[14px] border border-border-secondary bg-bg-secondary px-3 py-3",
            children: [i, h],
          })),
          (w[38] = i),
          (w[39] = h),
          (w[40] = x))
        : (x = w[40]),
      x
    );
  }
  function j(e) {
    var i, l;
    let s,
      u,
      f,
      d,
      m,
      b,
      g,
      v,
      y,
      h,
      x,
      w,
      j,
      k,
      O,
      A,
      S,
      E,
      F,
      _,
      C,
      P = (0, r.c)(51),
      { t: z } = (0, c.f)(),
      { upload: R, onCancel: N, onRetry: T, isDisabled: M } = e,
      { file: I, status: L, progress: B, error: K } = R;
    P[0] !== I.type
      ? ((b = (0, p.i)(I.type)), (P[0] = I.type), (P[1] = b))
      : (b = P[1]);
    let U = b,
      $ =
        ((i = I),
        (l = "image" === U || "video" === U),
        (d = (0, r.c)(6))[0] !== l || d[1] !== i
          ? ((s = l ? URL.createObjectURL(i) : null),
            (d[0] = l),
            (d[1] = i),
            (d[2] = s))
          : (s = d[2]),
        (m = s),
        d[3] !== m
          ? ((u = () => {
              if (m)
                return () => {
                  URL.revokeObjectURL(m);
                };
            }),
            (f = [m]),
            (d[3] = m),
            (d[4] = u),
            (d[5] = f))
          : ((u = d[4]), (f = d[5])),
        (0, a.useEffect)(u, f),
        m),
      W = "pending" === L || "requesting" === L || "uploading" === L;
    P[2] !== K || P[3] !== B || P[4] !== L || P[5] !== z || P[6] !== U
      ? ((g =
          "pending" === L
            ? z("web.bounties.upload_queued")
            : "requesting" === L
              ? z(
                  "image" === U
                    ? "web.bounties.upload_checking_image"
                    : "web.bounties.upload_preparing",
                )
              : "uploading" === L
                ? z("web.bounties.upload_progress", { progress: B })
                : "error" === L
                  ? (K ?? z("web.bounties.upload_failed"))
                  : z("common.done")),
        (P[2] = K),
        (P[3] = B),
        (P[4] = L),
        (P[5] = z),
        (P[6] = U),
        (P[7] = g))
      : (g = P[7]);
    let q = g,
      Y = "error" === L && "border-red-400/30";
    (P[8] !== Y
      ? ((v = (0, o.c)(
          "flex flex-col gap-2 rounded-[14px] border border-border-secondary bg-bg-secondary px-3 py-3",
          Y,
        )),
        (P[8] = Y),
        (P[9] = v))
      : (v = P[9]),
      P[10] !== $ || P[11] !== U
        ? ((y = (0, t.jsx)(D, { fullSize: !0, kind: U, src: $ })),
          (P[10] = $),
          (P[11] = U),
          (P[12] = y))
        : (y = P[12]));
    let G = "error" === L && "text-red-300";
    return (
      P[13] !== G
        ? ((h = (0, o.c)("text-xs text-text-secondary", G)),
          (P[13] = G),
          (P[14] = h))
        : (h = P[14]),
      P[15] !== I.size
        ? ((x = (0, p.e)(I.size)), (P[15] = I.size), (P[16] = x))
        : (x = P[16]),
      P[17] !== q || P[18] !== h || P[19] !== x
        ? ((w = (0, t.jsx)("div", {
            className: "min-w-0 flex-1",
            children: (0, t.jsxs)("p", {
              className: h,
              children: [x, " · ", q],
            }),
          })),
          (P[17] = q),
          (P[18] = h),
          (P[19] = x),
          (P[20] = w))
        : (w = P[20]),
      P[21] !== M || P[22] !== T || P[23] !== L || P[24] !== z
        ? ((j =
            "error" === L &&
            (0, t.jsx)("button", {
              className:
                "text-xs font-medium text-white underline-offset-2 hover:underline disabled:opacity-50",
              disabled: M,
              onClick: (e) => {
                (e.preventDefault(), T());
              },
              type: "button",
              children: z("common.retry"),
            })),
          (P[21] = M),
          (P[22] = T),
          (P[23] = L),
          (P[24] = z),
          (P[25] = j))
        : (j = P[25]),
      P[26] !== I.name || P[27] !== W || P[28] !== z
        ? ((k = z(
            W ? "web.bounties.cancel_file" : "web.bounties.dismiss_file",
            { name: I.name },
          )),
          (P[26] = I.name),
          (P[27] = W),
          (P[28] = z),
          (P[29] = k))
        : (k = P[29]),
      P[30] !== N
        ? ((O = (e) => {
            (e.preventDefault(), N());
          }),
          (P[30] = N),
          (P[31] = O))
        : (O = P[31]),
      P[32] === Symbol.for("react.memo_cache_sentinel")
        ? ((A = (0, t.jsx)(n.Ps, { className: "h-4 w-4" })), (P[32] = A))
        : (A = P[32]),
      P[33] !== M || P[34] !== k || P[35] !== O
        ? ((S = (0, t.jsx)("button", {
            "aria-label": k,
            className:
              "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-text-secondary transition-colors hover:bg-white/5 hover:text-white disabled:opacity-50",
            disabled: M,
            onClick: O,
            type: "button",
            children: A,
          })),
          (P[33] = M),
          (P[34] = k),
          (P[35] = O),
          (P[36] = S))
        : (S = P[36]),
      P[37] !== S || P[38] !== j
        ? ((E = (0, t.jsxs)("div", {
            className: "flex items-center gap-2",
            children: [j, S],
          })),
          (P[37] = S),
          (P[38] = j),
          (P[39] = E))
        : (E = P[39]),
      P[40] !== E || P[41] !== w
        ? ((F = (0, t.jsxs)("div", {
            className: "flex items-start justify-between gap-3",
            children: [w, E],
          })),
          (P[40] = E),
          (P[41] = w),
          (P[42] = F))
        : (F = P[42]),
      P[43] !== W || P[44] !== B
        ? ((_ =
            W &&
            (0, t.jsx)("div", {
              className:
                "h-1 w-full overflow-hidden rounded-full bg-bg-tertiary",
              children: (0, t.jsx)("div", {
                className:
                  "h-full bg-[#34D399] transition-[width] duration-200",
                style: { width: `${Math.max(5, B)}%` },
              }),
            })),
          (P[43] = W),
          (P[44] = B),
          (P[45] = _))
        : (_ = P[45]),
      P[46] !== F || P[47] !== _ || P[48] !== v || P[49] !== y
        ? ((C = (0, t.jsxs)("div", { className: v, children: [y, F, _] })),
          (P[46] = F),
          (P[47] = _),
          (P[48] = v),
          (P[49] = y),
          (P[50] = C))
        : (C = P[50]),
      C
    );
  }
  function D(e) {
    let n,
      i,
      a,
      l = (0, r.c)(22),
      { t: s } = (0, c.f)(),
      { kind: u, src: f, fullSize: d } = e,
      p = void 0 !== d && d;
    if ("image" === u && f) {
      let e, r, n;
      l[0] !== s
        ? ((e = s("web.bounties.attachment_preview")), (l[0] = s), (l[1] = e))
        : (e = l[1]);
      let i = p
        ? "max-h-[420px] w-full bg-black/20 object-contain"
        : "h-14 w-14 shrink-0 object-cover";
      return (
        l[2] !== i
          ? ((r = (0, o.c)("rounded-[10px] border border-border-secondary", i)),
            (l[2] = i),
            (l[3] = r))
          : (r = l[3]),
        l[4] !== f || l[5] !== e || l[6] !== r
          ? ((n = (0, t.jsx)("img", { alt: e, className: r, src: f })),
            (l[4] = f),
            (l[5] = e),
            (l[6] = r),
            (l[7] = n))
          : (n = l[7]),
        n
      );
    }
    if ("video" === u && f) {
      let e,
        r,
        n,
        i = p
          ? "max-h-[420px] w-full object-contain"
          : "h-14 w-14 shrink-0 object-cover";
      return (
        l[8] !== i
          ? ((e = (0, o.c)(
              "rounded-[10px] border border-border-secondary bg-black",
              i,
            )),
            (l[8] = i),
            (l[9] = e))
          : (e = l[9]),
        l[10] === Symbol.for("react.memo_cache_sentinel")
          ? ((r = (0, t.jsx)("track", { default: !0, kind: "captions" })),
            (l[10] = r))
          : (r = l[10]),
        l[11] !== p || l[12] !== f || l[13] !== e
          ? ((n = (0, t.jsx)("video", {
              className: e,
              controls: p,
              muted: !0,
              playsInline: !0,
              preload: "metadata",
              src: f,
              children: r,
            })),
            (l[11] = p),
            (l[12] = f),
            (l[13] = e),
            (l[14] = n))
          : (n = l[14]),
        n
      );
    }
    let m = p ? "min-h-16 w-full px-3 py-3" : "h-14 w-14 shrink-0";
    return (
      l[15] !== m
        ? ((n = (0, o.c)(
            "inline-flex items-center justify-center rounded-[10px] border border-border-secondary bg-bg-tertiary text-[10px] font-medium uppercase tracking-[0.08em] text-text-secondary",
            m,
          )),
          (l[15] = m),
          (l[16] = n))
        : (n = l[16]),
      l[17] !== s
        ? ((i = s("web.bounties.file_label")), (l[17] = s), (l[18] = i))
        : (i = l[18]),
      l[19] !== n || l[20] !== i
        ? ((a = (0, t.jsx)("div", { className: n, children: i })),
          (l[19] = n),
          (l[20] = i),
          (l[21] = a))
        : (a = l[21]),
      a
    );
  }
  e.s(
    [
      "BountyAttachmentUploader",
      0,
      function (e) {
        let D,
          k,
          O,
          A,
          S,
          E,
          F,
          _,
          C,
          P,
          z,
          R,
          N,
          T,
          M,
          I,
          L,
          B,
          K,
          U,
          $,
          W,
          q,
          Y,
          G,
          H,
          J,
          Q,
          V = (0, r.c)(63),
          { t: X } = (0, c.f)(),
          {
            attachments: Z,
            onAttachmentsChange: ee,
            onUploadingChange: et,
            onFailedUploadsChange: er,
            maxCount: en,
            label: ei,
            helperText: eo,
            isDisabled: ea,
            id: el,
          } = e,
          ec = void 0 === en ? p.$ : en,
          es = void 0 !== ea && ea;
        V[0] !== ei || V[1] !== X
          ? ((D = ei ?? X("web.bounties.attach_files")),
            (V[0] = ei),
            (V[1] = X),
            (V[2] = D))
          : (D = V[2]);
        let eu = D,
          ef =
            ((H = (0, r.c)(2)),
            (J = (0, u.useLivestreamApiClient)()),
            H[0] !== J
              ? ((G = async (e, t) => {
                  let r = await J.post("bounties/attachments/presigned-url", {
                    json: e,
                    signal: t?.signal,
                  }).json();
                  return f.A.parse(r);
                }),
                (H[0] = J),
                (H[1] = G))
              : (G = H[1]),
            G),
          ed =
            ((Q = (0, u.useLivestreamApiClient)()),
            (0, a.useCallback)(
              async (e, t) => {
                let r = await (0, p.M)(e.file, t?.signal);
                try {
                  let n = await Q.post("bounties/attachments/image", {
                    json: {
                      filename: e.file.name,
                      contentType: e.contentType,
                      data: r,
                    },
                    signal: t?.signal,
                  }).json();
                  return f.W.parse(n);
                } catch (t) {
                  if (t instanceof DOMException && "AbortError" === t.name)
                    throw t;
                  let e = await (0, d.u)(t, "Image upload failed");
                  throw new p.K(
                    e,
                    ((e) => {
                      if ("object" != typeof e || null === e) return;
                      let t = "response" in e ? e.response : void 0;
                      return t instanceof Response ? t.status : void 0;
                    })(t),
                  );
                }
              },
              [Q],
            ));
        V[3] === Symbol.for("react.memo_cache_sentinel")
          ? ((k = []), (V[3] = k))
          : (k = V[3]);
        let [ep, em] = (0, a.useState)(k),
          eb = (0, a.useRef)(Z);
        (V[4] !== Z
          ? ((O = () => {
              eb.current = Z;
            }),
            (A = [Z]),
            (V[4] = Z),
            (V[5] = O),
            (V[6] = A))
          : ((O = V[5]), (A = V[6])),
          (0, a.useEffect)(O, A));
        let eg = (0, a.useRef)(0);
        V[7] === Symbol.for("react.memo_cache_sentinel")
          ? ((S = (e) => {
              em((t) => {
                let r = e(t),
                  n = 0;
                for (let e of r) h(e) && (n += 1);
                return ((eg.current = n), r);
              });
            }),
            (V[7] = S))
          : (S = V[7]);
        let ev = S;
        V[8] === Symbol.for("react.memo_cache_sentinel")
          ? ((E = new Map()), (V[8] = E))
          : (E = V[8]);
        let ey = (0, a.useRef)(E);
        (V[9] === Symbol.for("react.memo_cache_sentinel")
          ? ((F = () => {
              let e = ey.current;
              return () => {
                (e.forEach(y), e.clear());
              };
            }),
            (_ = []),
            (V[9] = F),
            (V[10] = _))
          : ((F = V[9]), (_ = V[10])),
          (0, a.useEffect)(F, _),
          V[11] === Symbol.for("react.memo_cache_sentinel")
            ? ((C = (e, t) => {
                ev((r) => r.map((r) => (r.id === e ? t(r) : r)));
              }),
              (V[11] = C))
            : (C = V[11]));
        let eh = C;
        V[12] !== ec ||
        V[13] !== ee ||
        V[14] !== ef ||
        V[15] !== X ||
        V[16] !== ed
          ? ((P = (e) => {
              let t = new AbortController();
              (ey.current.set(e.id, t),
                eh(e.id, v),
                (async () => {
                  let r = e.file.type || "application/octet-stream";
                  if ("image" === (0, p.i)(r))
                    return (
                      await ed(
                        { file: e.file, contentType: r },
                        { signal: t.signal },
                      )
                    ).attachment;
                  let n = await ef(
                    {
                      filename: e.file.name,
                      contentType: r,
                      contentLength: e.file.size,
                    },
                    { signal: t.signal },
                  );
                  return (
                    await (0, p.p)({
                      file: e.file,
                      uploadUrl: n.uploadUrl,
                      contentType: n.attachment.contentType,
                      signal: t.signal,
                      onProgress: (t) => {
                        eh(e.id, (e) =>
                          "requesting" === e.status || "uploading" === e.status
                            ? { ...e, status: "uploading", progress: t }
                            : e,
                        );
                      },
                    }),
                    n.attachment
                  );
                })()
                  .then((t) => {
                    (ey.current.delete(e.id),
                      eh(e.id, (e) => ({
                        ...e,
                        status: "success",
                        progress: 100,
                        attachment: t,
                      })));
                    let r = [...eb.current, t].slice(0, ec);
                    ((eb.current = r), ee(r));
                  })
                  .catch((t) => {
                    if (
                      (ey.current.delete(e.id),
                      t instanceof DOMException && "AbortError" === t.name)
                    )
                      return void ev((t) => t.filter((t) => t.id !== e.id));
                    let r =
                      t instanceof p.K || t instanceof Error
                        ? t.message
                        : X("web.bounties.upload_failed");
                    (eh(e.id, (e) => ({ ...e, status: "error", error: r })),
                      s.c.error(r));
                  }));
            }),
            (V[12] = ec),
            (V[13] = ee),
            (V[14] = ef),
            (V[15] = X),
            (V[16] = ed),
            (V[17] = P))
          : (P = V[17]);
        let ex = P;
        V[18] !== ec || V[19] !== ex
          ? ((z = (e) => {
              let t = Math.max(0, ec - (eb.current.length + eg.current));
              if (0 === t)
                return void s.c.error(`You can attach at most ${ec} files`);
              let r = [];
              for (let n of e.slice(0, t)) {
                let e = (0, p.m)(n);
                if (!e.ok) {
                  s.c.error(e.message);
                  continue;
                }
                r.push({
                  id: `upload-${Math.random().toString(36).slice(2, 10)}-${Date.now()}`,
                  file: n,
                  status: "pending",
                  progress: 0,
                });
              }
              0 !== r.length &&
                (ev((e) => [...e, ...r]),
                queueMicrotask(() => {
                  r.forEach((e) => ex(e));
                }));
            }),
            (V[18] = ec),
            (V[19] = ex),
            (V[20] = z))
          : (z = V[20]);
        let ew = z;
        V[21] !== ew || V[22] !== ec
          ? ((R = (e, t) => {
              let r = t[0];
              (r &&
                s.c.error(
                  (function (e, t) {
                    let r = e.file.name || "File";
                    switch (e.errors[0]?.code) {
                      case "file-invalid-type":
                        return `"${r}" isn't a supported file type. Please upload ${p.S}.`;
                      case "file-too-large":
                        return `"${r}" is larger than ${(0, p.e)(t.maxSizeBytes)}. Please upload a smaller file.`;
                      case "file-too-small":
                        return `"${r}" is empty.`;
                      case "too-many-files":
                        return `You can attach at most ${t.maxCount} files.`;
                      default:
                        return e.errors[0]?.message ?? "File rejected";
                    }
                  })(r, { maxCount: ec, maxSizeBytes: p.b }),
                ),
                e.length > 0 && ew(e));
            }),
            (V[21] = ew),
            (V[22] = ec),
            (V[23] = R))
          : (R = V[23]);
        let ej = R;
        V[24] !== ee
          ? ((N = (e) => {
              let t = eb.current.filter((t) => t.key !== e.key);
              ((eb.current = t),
                ee(t),
                ev((t) =>
                  t.filter(
                    (t) =>
                      "success" !== t.status || t.attachment?.key !== e.key,
                  ),
                ));
            }),
            (V[24] = ee),
            (V[25] = N))
          : (N = V[25]);
        let eD = N;
        V[26] === Symbol.for("react.memo_cache_sentinel")
          ? ((T = (e) => {
              let t = ey.current.get(e);
              t ? t.abort() : ev((t) => t.filter((t) => t.id !== e));
            }),
            (V[26] = T))
          : (T = V[26]);
        let ek = T;
        V[27] !== ex
          ? ((M = (e) => {
              "error" === e.status && ex(e);
            }),
            (V[27] = ex),
            (V[28] = M))
          : (M = V[28]);
        let eO = M;
        V[29] !== ep
          ? ((I = ep.filter(g)), (V[29] = ep), (V[30] = I))
          : (I = V[30]);
        let eA = I.length,
          eS = Z.length + eA,
          eE = eS >= ec,
          eF = eA > 0,
          e_ = (0, a.useRef)(eF);
        (V[31] !== eF || V[32] !== et
          ? ((L = () => {
              e_.current !== eF && ((e_.current = eF), et?.(eF));
            }),
            (B = [eF, et]),
            (V[31] = eF),
            (V[32] = et),
            (V[33] = L),
            (V[34] = B))
          : ((L = V[33]), (B = V[34])),
          (0, a.useEffect)(L, B),
          V[35] !== ep
            ? ((K = ep.some(b)), (V[35] = ep), (V[36] = K))
            : (K = V[36]));
        let eC = K,
          eP = (0, a.useRef)(eC);
        (V[37] !== eC || V[38] !== er
          ? ((U = () => {
              eP.current !== eC && ((eP.current = eC), er?.(eC));
            }),
            ($ = [eC, er]),
            (V[37] = eC),
            (V[38] = er),
            (V[39] = U),
            (V[40] = $))
          : ((U = V[39]), ($ = V[40])),
          (0, a.useEffect)(U, $),
          V[41] !== ep
            ? ((W = ep.filter(m)), (V[41] = ep), (V[42] = W))
            : (W = V[42]));
        let ez = W,
          eR = Z.length > 0 || ez.length > 0,
          eN = es || eE;
        return (
          V[43] !== Z ||
          V[44] !== eR ||
          V[45] !== eo ||
          V[46] !== el ||
          V[47] !== es ||
          V[48] !== eu ||
          V[49] !== ec ||
          V[50] !== eE ||
          V[51] !== eD ||
          V[52] !== eO ||
          V[53] !== X ||
          V[54] !== eS ||
          V[55] !== ez
            ? ((q = (e) => {
                let {
                  getRootProps: r,
                  getInputProps: a,
                  isDragAccept: l,
                  isDragReject: c,
                  open: s,
                } = e;
                return (0, t.jsxs)("div", {
                  ...r({
                    className: (0, o.c)(
                      "flex flex-col gap-3 rounded-[18px] border border-border-secondary bg-bg-tertiary p-4 transition-colors",
                      l && "border-[#34D399]/60 bg-[#34D399]/5",
                      c && "border-red-400/60 bg-red-500/5",
                    ),
                  }),
                  children: [
                    (0, t.jsx)("input", { ...a(), id: el }),
                    eR
                      ? (0, t.jsxs)(t.Fragment, {
                          children: [
                            (0, t.jsxs)("div", {
                              className:
                                "grid grid-cols-2 gap-3 md:grid-cols-3",
                              children: [
                                Z.map((e) =>
                                  (0, t.jsx)(
                                    w,
                                    {
                                      attachment: e,
                                      isDisabled: es,
                                      onRemove: () => eD(e),
                                    },
                                    e.key,
                                  ),
                                ),
                                ez.map((e) =>
                                  (0, t.jsx)(
                                    j,
                                    {
                                      isDisabled: es,
                                      onCancel: () => ek(e.id),
                                      onRetry: () => eO(e),
                                      upload: e,
                                    },
                                    e.id,
                                  ),
                                ),
                              ],
                            }),
                            (0, t.jsx)(x, {
                              helperText: X("web.bounties.files_added_count", {
                                count: eS,
                                max: ec,
                              }),
                              isDisabled: es,
                              onChooseFiles: s,
                              reachedMax: eE,
                            }),
                          ],
                        })
                      : (0, t.jsxs)("div", {
                          className: (0, o.c)(
                            "flex cursor-pointer flex-col items-center gap-4 rounded-[16px] border border-dashed border-border-tertiary bg-bg-secondary px-5 py-6 text-center",
                            (es || eE) && "cursor-not-allowed opacity-60",
                          ),
                          children: [
                            (0, t.jsx)("span", {
                              className:
                                "inline-flex h-12 w-12 items-center justify-center rounded-full border border-border-secondary bg-bg-tertiary text-text-secondary",
                              children: (0, t.jsx)(n.jG, {
                                className: "h-6 w-6",
                              }),
                            }),
                            (0, t.jsxs)("div", {
                              className: "max-w-[440px]",
                              children: [
                                (0, t.jsx)("p", {
                                  className: "text-sm font-medium text-white",
                                  children: X("web.bounties.drag_drop_here", {
                                    label: eu,
                                  }),
                                }),
                                (0, t.jsx)("p", {
                                  className:
                                    "mt-1 text-sm leading-6 text-text-secondary",
                                  children:
                                    eo ??
                                    X("web.bounties.uploader_helper", {
                                      max: ec,
                                    }),
                                }),
                              ],
                            }),
                            (0, t.jsx)(i.K, {
                              isDisabled: es || eE,
                              onClick: (e) => {
                                (e.preventDefault(), e.stopPropagation(), s());
                              },
                              type: "button",
                              variant: "secondary",
                              children: eE
                                ? X("web.bounties.max_files_reached")
                                : X("web.bounties.choose_files"),
                            }),
                          ],
                        }),
                  ],
                });
              }),
              (V[43] = Z),
              (V[44] = eR),
              (V[45] = eo),
              (V[46] = el),
              (V[47] = es),
              (V[48] = eu),
              (V[49] = ec),
              (V[50] = eE),
              (V[51] = eD),
              (V[52] = eO),
              (V[53] = X),
              (V[54] = eS),
              (V[55] = ez),
              (V[56] = q))
            : (q = V[56]),
          V[57] !== ej ||
          V[58] !== eR ||
          V[59] !== ec ||
          V[60] !== eN ||
          V[61] !== q
            ? ((Y = (0, t.jsx)(l.U, {
                accept: p.Y,
                disabled: eN,
                maxFiles: ec,
                maxSize: p.b,
                multiple: !0,
                noClick: eR,
                onDrop: ej,
                children: q,
              })),
              (V[57] = ej),
              (V[58] = eR),
              (V[59] = ec),
              (V[60] = eN),
              (V[61] = q),
              (V[62] = Y))
            : (Y = V[62]),
          Y
        );
      },
    ],
    739386,
  );
};
