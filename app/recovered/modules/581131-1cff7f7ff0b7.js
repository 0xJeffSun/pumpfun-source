// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, n) => {
  let r;
  (e.i(149502), Object.defineProperty(n, "__esModule", { value: !0 }));
  var a = {
    createFetch: function () {
      return M;
    },
    createFromNextReadableStream: function () {
      return N;
    },
    decodeBufferedStage: function () {
      return C;
    },
    decodeStageUntilBoundary: function () {
      return w;
    },
    fetchServerResponse: function () {
      return b;
    },
    processFetch: function () {
      return T;
    },
    resolveShellStageResponse: function () {
      return O;
    },
  };
  for (var l in a) Object.defineProperty(n, l, { enumerable: !0, get: a[l] });
  let u = e.r(925142),
    o = e.r(487364),
    i = e.r(964724),
    c = e.r(674637),
    s = e.r(225599),
    f = e.r(730137),
    d = e.r(71223),
    h = e.r(963105),
    p = e.r(188294),
    y = e.r(185457),
    g = e.r(107793),
    v = e.r(369095),
    _ = e.r(85396),
    S = e.r(581761),
    m = u.createFromReadableStream,
    R = u.createFromFetch;
  function P(e) {
    return (0, p.urlToUrlWithoutFlightMarker)(
      new URL(e, location.origin),
    ).toString();
  }
  let E = !1;
  async function b(e, t) {
    let { flightRouterState: n, nextUrl: r } = t,
      a = {
        [c.RSC_HEADER]: "1",
        [c.NEXT_ROUTER_STATE_TREE_HEADER]: (0,
        d.prepareFlightRouterStateForRequest)(n, t.isHmrRefresh),
      };
    r && (a[c.NEXT_URL] = r);
    try {
      let n = await M(e, a, "auto", !0, t.signal),
        r = (0, p.urlToUrlWithoutFlightMarker)(new URL(n.url)),
        l = n.redirected ? r : e,
        u = n.headers.get("content-type") || "",
        o = !!n.headers.get("vary")?.includes(c.NEXT_URL),
        i = !!n.headers.get(c.NEXT_DID_POSTPONE_HEADER);
      if (!u.startsWith(c.RSC_CONTENT_TYPE_HEADER) || !n.ok || !n.body)
        return (e.hash && (r.hash = e.hash), P(r.toString()));
      let s = n.flightResponsePromise,
        [f, d] = await Promise.all([s, n.cacheData]);
      if (
        (n.headers.get(v.NEXT_NAV_DEPLOYMENT_ID_HEADER) ?? f.b) !==
        (0, g.getNavigationBuildId)()
      )
        return P(n.url);
      if (void 0 !== f.n) return P(f.n);
      let h = null !== d ? await A(d, f, a) : null;
      return {
        transportData: f.t ?? null,
        canonicalUrl: l,
        renderedSearch: f.q,
        couldBeIntercepted: o,
        supportsPerSegmentPrefetching: f.S,
        postponed: i,
        dynamicStaleTime: f.d ?? S.UnknownDynamicStaleTime,
        isResponsePartial: null !== d && d.isResponsePartial,
        staticStageResponse: h,
        runtimePrefetchStream: f.p ?? null,
        responseHeaders: n.headers,
        debugInfo: s._debugInfo ?? null,
        revealAfter: f._revealAfter ?? null,
      };
    } catch (n) {
      if (t.signal?.aborted) throw n;
      return (
        E ||
          console.error(
            `Failed to fetch RSC payload for ${e}. Falling back to browser navigation.`,
            n,
          ),
        e.toString()
      );
    }
  }
  async function T(e) {
    {
      let t, n;
      if (!e.body)
        throw new o.InvariantError(
          "Expected RSC navigation response to have a body",
        );
      let { stream: r, isPartial: a } = await (0, _.stripIsPartialByte)(e.body);
      {
        let [e, l] = r.tee(),
          [u, o] = l.tee();
        ((t = e),
          (n = {
            isResponsePartial: a,
            staticBodyClone: u,
            shellBodyClone: o,
          }));
      }
      let l = new Response(t, {
        headers: e.headers,
        status: e.status,
        statusText: e.statusText,
      });
      return (
        Object.defineProperty(l, "url", { value: e.url }),
        Object.defineProperty(l, "redirected", { value: e.redirected }),
        { response: l, cacheData: n }
      );
    }
  }
  async function A(e, t, n) {
    let { isResponsePartial: r, staticBodyClone: a } = e;
    if (a) {
      if (!r) return (a.cancel(), t);
      if (void 0 !== t.l) {
        let e = await t.l;
        return 0 === e ? (a.cancel(), null) : w(a, e, n);
      }
      a.cancel();
    }
    return null;
  }
  async function O(e, t, n) {
    let { shellBodyClone: r } = e;
    if (!r) return null;
    if (void 0 === t.a) return (r.cancel(), null);
    let a = await t.a;
    return 0 === a
      ? (r.cancel(), null)
      : null === a
        ? (r.cancel(), t)
        : w(r, a, n);
  }
  async function w(e, t, n) {
    try {
      let r = await (0, _.bufferPrefetchResponseBody)(e, t),
        a = C(r, n);
      return await new Promise((e) => {
        let t = setTimeout(() => e(null), 0);
        a.then(
          (n) => {
            (clearTimeout(t), e(n));
          },
          () => {
            (clearTimeout(t), e(null));
          },
        );
      });
    } catch {
      return null;
    }
  }
  function C(e, t) {
    return N(
      new ReadableStream({
        start(t) {
          (t.enqueue(e), t.close());
        },
      }),
      t,
      { allowPartialStream: !0 },
    );
  }
  async function M(e, t, n, r, a) {
    let l = (0, y.getDeploymentId)();
    l && (t["x-deployment-id"] = l);
    let u = {
        credentials: "same-origin",
        headers: t,
        priority: n || void 0,
        signal: a,
      },
      o = new URL(e);
    await (0, h.setCacheBustingSearchParam)(o, t);
    let s = (0, i.fetch)(o, u).then(T),
      f = s.then(({ response: e }) => e),
      d = r ? I(f, t) : null,
      p = await f,
      g = p.redirected;
    for (let e = 0; e < 20 && p.redirected; e++) {
      let e = new URL(p.url, o);
      if (
        e.origin !== o.origin ||
        e.searchParams.get(c.NEXT_RSC_UNION_QUERY) ===
          o.searchParams.get(c.NEXT_RSC_UNION_QUERY)
      )
        break;
      ((o = new URL(e)),
        await (0, h.setCacheBustingSearchParam)(o, t),
        (f = (s = (0, i.fetch)(o, u).then(T)).then(({ response: e }) => e)),
        (d = r ? I(f, t) : null),
        (p = await f),
        (g = !0));
    }
    let v = new URL(p.url, o);
    return (
      v.searchParams.delete(c.NEXT_RSC_UNION_QUERY),
      {
        url: v.href,
        redirected: g,
        ok: p.ok,
        headers: p.headers,
        body: p.body,
        status: p.status,
        flightResponsePromise: d,
        cacheData: s.then(({ cacheData: e }) => e),
      }
    );
  }
  function N(e, t, n) {
    return m(e, {
      callServer: s.callServer,
      findSourceMapURL: f.findSourceMapURL,
      debugChannel: r && r(t),
      unstable_allowPartialStream: n?.allowPartialStream,
    });
  }
  function I(e, t) {
    return R(e, {
      callServer: s.callServer,
      findSourceMapURL: f.findSourceMapURL,
      debugChannel: r && r(t),
    });
  }
  ("u" > typeof window &&
    (window.addEventListener("pagehide", () => {
      E = !0;
    }),
    window.addEventListener("pageshow", () => {
      E = !1;
    })),
    ("function" == typeof n.default ||
      ("object" == typeof n.default && null !== n.default)) &&
      void 0 === n.default.__esModule &&
      (Object.defineProperty(n.default, "__esModule", { value: !0 }),
      Object.assign(n.default, n),
      (t.exports = n.default)));
};
