// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  (Object.defineProperty(r, "__esModule", { value: !0 }),
    (r.createContractClient = void 0));
  let o = e.r(858694),
    n = e.r(402030),
    s = e.r(233815),
    a = e.r(4171),
    i = (e) => {
      let t = n.contract[e];
      return t?.multipart ? (t.multipartFiles ?? ["image"]) : void 0;
    },
    l = (e) =>
      "object" == typeof e &&
      null !== e &&
      ["uri", "name", "type"].every((t) => "string" == typeof e[t]),
    d = (e, t, r) =>
      TypeError(
        r instanceof Blob
          ? `${e}: ${t} is a Blob, which React Native's FormData cannot send; pass a { uri, name, type } descriptor`
          : l(r)
            ? `${e}: ${t} is a { uri, name, type } descriptor, which only React Native's FormData can send; pass a Blob`
            : `${e}: ${t} is neither a Blob nor a { uri, name, type } descriptor`,
      ),
    c = async (e, t) => {
      let r,
        i = ((e) => {
          if ("object" != typeof e || null === e) return;
          let t = e.response;
          if ("object" != typeof t || null === t) return;
          let { status: r, text: o } = t;
          return "number" == typeof r && "function" == typeof o ? t : void 0;
        })(t);
      if (!i) return;
      try {
        let e = await i.text();
        try {
          r = JSON.parse(e);
        } catch {
          r = e;
        }
      } catch {
        r = void 0;
      }
      let l = n.contract[e],
        d = l ? (0, s.routeErrorSchema)(l, i.status) : void 0,
        c = d && !0 !== d ? d.safeParse(r) : void 0,
        u = a.contractErrorBody.safeParse(r);
      return new o.ContractError(
        e,
        i.status,
        r,
        c?.success ? c.data : u.success ? u.data : { statusCode: i.status },
        ((e) => {
          if ("object" != typeof e || null === e) return;
          let { message: t } = e;
          return "string" == typeof t
            ? t
            : Array.isArray(t)
              ? t.filter((e) => "string" == typeof e).join("; ")
              : void 0;
        })(r),
        t,
      );
    };
  r.createContractClient =
    (e) =>
    async (t, r = {}) => {
      let [o, s] = t.split(" ", 2),
        { params: a, query: u, body: h, ...m } = r,
        p = ((e, t) => {
          if (!t) return;
          let r = n.contract[e]?.query?.shape,
            o = {};
          for (let [n, s] of Object.entries(t))
            if (void 0 !== s)
              if (Array.isArray(s)) {
                let t = s.map(String);
                if (0 === t.length) {
                  if (r?.[n]?.safeParse(void 0).success) continue;
                  throw TypeError(
                    `${e}: query.${n} requires at least one item`,
                  );
                }
                let a = t.find((e) => e.includes(","));
                if (void 0 !== a)
                  throw TypeError(
                    `${e}: query.${n} item ${JSON.stringify(a)} contains a comma, which is the array separator`,
                  );
                o[n] = t.join(",");
              } else o[n] = String(s);
          return o;
        })(t, u),
        b = ((e, t) => {
          if ("object" == typeof t && null !== t && i(e)) {
            if (t instanceof FormData)
              throw TypeError(
                `${e}: a hand-built FormData is not accepted (contract 0.57.0, TASK-5101); pass the JSON fields and the file parts as one object`,
              );
            return i(e)?.some((e) => null != t[e])
              ? ((e, t) => {
                  let r = new FormData(),
                    o = new Set(i(e)),
                    n = "function" == typeof r.getParts;
                  for (let [s, a] of Object.entries(t))
                    if (void 0 !== a)
                      if (o.has(s))
                        if (null === a) continue;
                        else if (n ? l(a) : a instanceof Blob) r.append(s, a);
                        else throw d(e, s, a);
                      else
                        r.append(
                          s,
                          "object" == typeof a ? JSON.stringify(a) : String(a),
                        );
                  return r;
                })(e, t)
              : void 0;
          }
        })(t, h);
      try {
        return await e(
          ((e, t = {}) =>
            e
              .slice(1)
              .replace(/\{(\w+)\}/g, (e, r) =>
                encodeURIComponent(String(t[r])),
              ))(s, a),
          {
            method: o.toLowerCase(),
            ...(p && { searchParams: p }),
            ...(b ? { body: b } : void 0 !== h && { json: h }),
            ...m,
          },
        ).json();
      } catch (e) {
        throw (await c(t, e)) ?? e;
      }
    };
};
