// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t) => {
  var e = t.i(753887),
    r = class extends Error {
      constructor(t, e, r) {
        (super(t),
          (this.statusCode = e),
          (this.details = r),
          (this.name = "PinataError"));
      }
    },
    a = class extends r {
      constructor(t, e, r) {
        (super(t, e, r), (this.name = "NetworkError"));
      }
    },
    i = class extends r {
      constructor(t, e, r) {
        (super(t, e, r), (this.name = "AuthenticationError"));
      }
    },
    n = class extends r {
      constructor(t, e) {
        (super(t, void 0, e), (this.name = "ValidationError"));
      }
    };
  function o(t) {
    var e, r;
    return (
      (e = t = t.trim()),
      /^Qm[1-9A-HJ-NP-Za-km-z]{44}$/.test(e) ||
        ((r = t), /^b[a-z2-7]{58,}$/.test(r))
    );
  }
  async function s(t) {
    let e;
    if ("string" != typeof t) throw Error("Input is not a string");
    let r = (t) => {
        let e = t.split("/");
        return o(e[0]) ? e[0] : null;
      },
      a = r(t);
    if (a) return { containsCid: !0, cid: a };
    try {
      e = new URL(t);
    } catch (e) {
      for (let e of t.split(/\/|\?/)) {
        let t = r(e);
        if (t) return { containsCid: !0, cid: t };
      }
      return { containsCid: !1, cid: null };
    }
    for (let t of e.hostname.split("."))
      if (o(t)) return { containsCid: !0, cid: t };
    for (let t of e.pathname.split("/")) {
      let e = r(t);
      if (e) return { containsCid: !0, cid: e };
    }
    return { containsCid: !1, cid: null };
  }
  async function u(t, e) {
    let r = await s(t);
    if (!0 !== r.containsCid) throw Error("url does not contain CID");
    if (!t.startsWith("https") && !t.startsWith("ipfs://"))
      return `${e}/ipfs/${t}`;
    let a = new URL(t),
      i = a.pathname + a.search + a.hash;
    if (t.startsWith(`ipfs://${r.cid}`)) return `${e}/ipfs/${r.cid}${i}`;
    if (t.includes(`/ipfs/${r.cid}`) || t.includes(`/ipns/${r.cid}`))
      return `${e}${i}`;
    if (a.hostname.includes(r.cid)) return `${e}/ipfs/${r.cid}${i}`;
    throw Error(
      "unsupported URL pattern, please submit a github issue with the URL utilized",
    );
  }
  var c = (t) => {
      let e = t?.pinataGateway;
      return (
        t &&
          e &&
          (e && !e.startsWith("https://") && (e = `https://${e}`),
          (t.pinataGateway = e)),
        t
      );
    },
    l = async (t, e) => {
      if (!t) throw new n("Pinata configuration is missing");
      let o = new URLSearchParams();
      if (e) {
        let {
          cid: t,
          gateway_domain: r,
          start_date: a,
          end_date: i,
          file_name: n,
          user_agent: s,
          country: u,
          region: c,
          referer: l,
          limit: d,
          sort_order: h,
          date_interval: p,
          sort_by: w,
        } = e;
        (t && o.append("cid", t),
          r && o.append("gateway_domain", r),
          a && o.append("start_date", a),
          i && o.append("end_date", i),
          n && o.append("file_name", n),
          s && o.append("user_agent", s.toString()),
          u && o.append("country", u.toString()),
          c && o.append("region", c),
          l && o.append("referer", l.toString()),
          d && o.append("limit", d.toString()),
          h && o.append("sort_order", h),
          w && o.append("sort_by", w),
          p && o.append("by", p));
      }
      let s = "https://api.pinata.cloud/v3";
      t.endpointUrl && (s = t.endpointUrl);
      let u = `${s}/ipfs/gateway_analytics_time_series?${o.toString()}`;
      try {
        let e;
        e =
          t.customHeaders && Object.keys(t.customHeaders).length > 0
            ? { ...t.customHeaders }
            : {
                Authorization: `Bearer ${t.pinataJwt}`,
                Source: "sdk/analyticsDateInterval",
              };
        let r = await fetch(u, { method: "GET", headers: e });
        if (!r.ok) {
          let t = await r.text();
          if (401 === r.status || 403 === r.status)
            throw new i(`Authentication failed: ${t}`, r.status, {
              error: t,
              code: "AUTH_ERROR",
              metadata: { requestUrl: r.url },
            });
          throw new a(`HTTP error: ${t}`, r.status, {
            error: t,
            code: "HTTP_ERROR",
            metadata: { requestUrl: r.url },
          });
        }
        return (await r.json()).data;
      } catch (t) {
        if (t instanceof r) throw t;
        if (t instanceof Error)
          throw new r(`Error processing anaytics usage: ${t.message}`);
        throw new r("An unknown error occurred while fetching gateway usage");
      }
    },
    d = async (t, e) => {
      if (!t) throw new n("Pinata configuration is missing");
      let o = new URLSearchParams();
      if (e) {
        let {
            cid: r,
            gateway_domain: a,
            start_date: i,
            end_date: n,
            file_name: s,
            user_agent: u,
            country: c,
            region: l,
            referer: d,
            limit: h,
            sort_order: p,
            sort_by: w,
            attribute: f,
          } = e,
          g = a || t.pinataGateway;
        if (g) {
          let t = g.replace(/^https?:\/\//, "");
          o.append("gateway_domain", t);
        }
        (r && o.append("cid", r),
          i && o.append("start_date", i),
          n && o.append("end_date", n),
          s && o.append("file_name", s),
          u && o.append("user_agent", u.toString()),
          c && o.append("country", c.toString()),
          l && o.append("region", l),
          d && o.append("referer", d.toString()),
          h && o.append("limit", h.toString()),
          p && o.append("sort_order", p),
          w && o.append("sort_by", w),
          f && o.append("by", f));
      }
      let s = "https://api.pinata.cloud/v3";
      t.endpointUrl && (s = t.endpointUrl);
      let u = `${s}/ipfs/gateway_analytics_top?${o.toString()}`;
      try {
        let e;
        e =
          t.customHeaders && Object.keys(t.customHeaders).length > 0
            ? { ...t.customHeaders }
            : {
                Authorization: `Bearer ${t.pinataJwt}`,
                Source: "sdk/analyticsTopUsage",
              };
        let r = await fetch(u, { method: "GET", headers: e });
        if (!r.ok) {
          let t = await r.text();
          if (401 === r.status || 403 === r.status)
            throw new i(`Authentication failed: ${t}`, r.status, {
              error: t,
              code: "AUTH_ERROR",
              metadata: { requestUrl: r.url },
            });
          throw new a(`HTTP error: ${t}`, r.status, {
            error: t,
            code: "HTTP_ERROR",
            metadata: { requestUrl: r.url },
          });
        }
        return await r.json();
      } catch (t) {
        if (t instanceof r) throw t;
        if (t instanceof Error)
          throw new r(`Error processing anaytics usage: ${t.message}`);
        throw new r("An unknown error occurred while fetching gateway usage");
      }
    },
    h = async (t) => {
      let e;
      if (!t) throw new n("Pinata configuration is missing");
      let o = "https://api.pinata.cloud";
      (t.endpointUrl && (o = t.endpointUrl),
        (e =
          t.customHeaders && Object.keys(t.customHeaders).length > 0
            ? { Authorization: `Bearer ${t.pinataJwt}`, ...t.customHeaders }
            : {
                Authorization: `Bearer ${t.pinataJwt}`,
                Source: "sdk/testAuthentication",
              }));
      try {
        let t = await fetch(`${o}/data/testAuthentication`, {
          method: "GET",
          headers: e,
        });
        if (!t.ok) {
          let e = await t.text();
          if (401 === t.status || 403 === t.status)
            throw new i(`Authentication failed: ${e}`, t.status, {
              error: e,
              code: "AUTH_ERROR",
              metadata: { requestUrl: t.url },
            });
          throw new a(`HTTP error: ${e}`, t.status, {
            error: e,
            code: "HTTP_ERROR",
            metadata: { requestUrl: t.url },
          });
        }
        return await t.json();
      } catch (t) {
        if (t instanceof r) throw t;
        if (t instanceof Error)
          throw new r(`Error processing authentication: ${t.message}`);
        throw new r("An unknown error occurred while testing authentication");
      }
    },
    p = (t) =>
      new Promise((e) => {
        setTimeout(e, t);
      }),
    w = async (t, e, o) => {
      let s;
      if (!t) throw new n("Pinata configuration is missing");
      let u = [];
      s =
        t.customHeaders && Object.keys(t.customHeaders).length > 0
          ? { Authorization: `Bearer ${t.pinataJwt}`, ...t.customHeaders }
          : {
              Authorization: `Bearer ${t.pinataJwt}`,
              Source: "sdk/deleteFile",
            };
      let c = "https://api.pinata.cloud/v3";
      for (let n of (t.endpointUrl && (c = t.endpointUrl), e))
        try {
          let t = await fetch(`${c}/files/${o}/${n}`, {
            method: "DELETE",
            headers: s,
          });
          if ((await p(300), !t.ok)) {
            let e = await t.text();
            if (401 === t.status)
              throw new i(`Authentication failed: ${e}`, t.status, {
                error: e,
                code: "HTTP_ERROR",
                metadata: { requestUrl: t.url },
              });
            throw new a("HTTP error", t.status, {
              error: e,
              code: "HTTP_ERROR",
              metadata: { requestUrl: t.url },
            });
          }
          u.push({ id: n, status: t.statusText });
        } catch (e) {
          let t;
          ((t =
            e instanceof r
              ? e.message
              : e instanceof Error
                ? `Error deleting file ${n}: ${e.message}`
                : `An unknown error occurred while deleting file ${n}`),
            u.push({ id: n, status: t }));
        }
      return u;
    },
    f = async (t, e) => {
      let o;
      if (!t) throw new n("Pinata configuration is missing");
      o =
        t.customHeaders && Object.keys(t.customHeaders).length > 0
          ? { Authorization: `Bearer ${t.pinataJwt}`, ...t.customHeaders }
          : {
              Authorization: `Bearer ${t.pinataJwt}`,
              Source: "sdk/vectorizeFile",
            };
      let s = "https://uploads.pinata.cloud/v3";
      t.uploadUrl && (s = t.uploadUrl);
      try {
        let t = await fetch(`${s}/vectorize/files/${e}`, {
          method: "DELETE",
          headers: o,
        });
        if (!t.ok) {
          let e = await t.text();
          if (401 === t.status || 403 === t.status)
            throw new i(`Authentication failed: ${e}`, t.status, {
              error: e,
              code: "AUTH_ERROR",
              metadata: { requestUrl: t.url },
            });
          throw new a(`HTTP error: ${e}`, t.status, {
            error: e,
            code: "HTTP_ERROR",
            metadata: { requestUrl: t.url },
          });
        }
        return await t.json();
      } catch (t) {
        if (t instanceof r) throw t;
        if (t instanceof Error)
          throw new r(`Error processing vectorize file: ${t.message}`);
        throw new r("An unknown error occurred while vectorizing file");
      }
    },
    g = async (t, e, o) => {
      let s;
      if (!t) throw new n("Pinata configuration is missing");
      s =
        t.customHeaders && Object.keys(t.customHeaders).length > 0
          ? {
              Authorization: `Bearer ${t.pinataJwt}`,
              "Content-Type": "application/json",
              ...t.customHeaders,
            }
          : {
              Authorization: `Bearer ${t.pinataJwt}`,
              "Content-Type": "application/json",
              Source: "sdk/deleteSwap",
            };
      let u = "https://api.pinata.cloud/v3";
      t.endpointUrl && (u = t.endpointUrl);
      try {
        let t = await fetch(`${u}/files/${o}/swap/${e}`, {
          method: "DELETE",
          headers: s,
        });
        if (!t.ok) {
          let e = await t.text();
          if (401 === t.status || 403 === t.status)
            throw new i("Authentication failed", t.status, {
              error: e,
              code: "AUTH_ERROR",
            });
          if (403 === t.status)
            throw new r("Unauthorized CID Swap Deletion", t.status, {
              error: e,
              code: "UNAUTHORIZED",
            });
          if (404 === t.status)
            throw new r("CID not pinned to account", t.status, {
              error: e,
              code: "NOT_FOUND",
            });
          throw new a("HTTP error occurred", t.status, {
            error: e,
            code: "NETWORK_ERROR",
          });
        }
        return t.statusText;
      } catch (t) {
        if (t instanceof r) throw t;
        if (t instanceof Error)
          throw new r(`Error processing deleteSwap: ${t.message}`, void 0, {
            code: "DELETE_SWAP_ERROR",
          });
        throw new r("An unknown error occurred while deleting swap", void 0, {
          code: "UNKNOWN_ERROR",
        });
      }
    },
    m = async (t, e, o) => {
      if (!t) throw new n("Pinata configuration is missing");
      let s = new URLSearchParams();
      if (o) {
        let {
          name: t,
          group: e,
          cid: r,
          order: a,
          limit: i,
          mimeType: n,
          pageToken: u,
          cidPending: c,
          metadata: l,
          noGroup: d,
        } = o;
        (i && s.append("limit", i.toString()),
          t && s.append("name", t),
          e && s.append("group", e),
          r && s.append("cid", r),
          n && s.append("mimeType", n),
          a && s.append("order", a),
          u && s.append("pageToken", u),
          c && s.append("cidPending", "true"),
          d && s.append("group", "null"),
          l &&
            "object" == typeof l &&
            Object.entries(l).forEach(([t, e]) => {
              s.append(`keyvalues[${t.toString()}]`, e.toString());
            }));
      }
      let u = "https://api.pinata.cloud/v3";
      t.endpointUrl && (u = t.endpointUrl);
      let c = `${u}/files/${e}?${s.toString()}`;
      try {
        let e;
        e =
          t.customHeaders && Object.keys(t.customHeaders).length > 0
            ? { Authorization: `Bearer ${t.pinataJwt}`, ...t.customHeaders }
            : {
                Authorization: `Bearer ${t.pinataJwt}`,
                Source: "sdk/listFiles",
              };
        let r = await fetch(c, { method: "GET", headers: e });
        if (!r.ok) {
          let t = await r.text();
          if (401 === r.status || 403 === r.status)
            throw new i(`Authentication failed: ${t}`, r.status, {
              error: t,
              code: "AUTH_ERROR",
              metadata: { requestUrl: r.url },
            });
          throw new a(`HTTP error: ${t}`, r.status, {
            error: t,
            code: "HTTP_ERROR",
            metadata: { requestUrl: r.url },
          });
        }
        return (await r.json()).data;
      } catch (t) {
        if (t instanceof r) throw t;
        if (t instanceof Error)
          throw new r(`Error processing list files: ${t.message}`);
        throw new r("An unknown error occurred while listing files");
      }
    },
    y = async (t, e, o) => {
      let s;
      if (!t) throw new n("Pinata configuration is missing");
      let u = JSON.stringify({ swap_cid: e.swapCid });
      s =
        t.customHeaders && Object.keys(t.customHeaders).length > 0
          ? {
              Authorization: `Bearer ${t.pinataJwt}`,
              "Content-Type": "application/json",
              ...t.customHeaders,
            }
          : {
              Authorization: `Bearer ${t.pinataJwt}`,
              "Content-Type": "application/json",
              Source: "sdk/swapCid",
            };
      let c = "https://api.pinata.cloud/v3";
      t.endpointUrl && (c = t.endpointUrl);
      try {
        let t = await fetch(`${c}/files/${o}/swap/${e.cid}`, {
          method: "PUT",
          headers: s,
          body: u,
        });
        if (!t.ok) {
          let e = await t.text();
          if (401 === t.status || 403 === t.status)
            throw new i(`Authentication failed: ${e}`, t.status, {
              error: e,
              code: "AUTH_ERROR",
              metadata: { requestUrl: t.url },
            });
          if (403 === t.status)
            throw new r("Unauthorized CID Swap", t.status, {
              error: e,
              code: "AUTH_ERROR",
              metadata: { requestUrl: t.url },
            });
          if (404 === t.status)
            throw new r("CID not pinned to account", t.status, {
              error: e,
              code: "HTTP_ERROR",
              metadata: { requestUrl: t.url },
            });
          throw new a(`HTTP error: ${e}`, t.status, {
            error: e,
            code: "HTTP_ERROR",
            metadata: { requestUrl: t.url },
          });
        }
        return (await t.json()).data;
      } catch (t) {
        if (t instanceof r) throw t;
        if (t instanceof Error)
          throw new r(`Error processing CID Swap: ${t.message}`);
        throw new r("An unknown error occurred while swapping CID");
      }
    },
    T = async (t, e, o) => {
      let s;
      if (!t) throw new n("Pinata configuration is missing");
      s =
        t.customHeaders && Object.keys(t.customHeaders).length > 0
          ? {
              Authorization: `Bearer ${t.pinataJwt}`,
              "Content-Type": "application/json",
              ...t.customHeaders,
            }
          : {
              Authorization: `Bearer ${t.pinataJwt}`,
              "Content-Type": "application/json",
              Source: "sdk/swapHistory",
            };
      let u = "https://api.pinata.cloud/v3";
      t.endpointUrl && (u = t.endpointUrl);
      try {
        let t = await fetch(
          `${u}/files/${o}/swap/${e.cid}?domain=${e.domain}`,
          { method: "GET", headers: s },
        );
        if (!t.ok) {
          let e = await t.text();
          if (401 === t.status || 403 === t.status)
            throw new i(`Authentication failed: ${e}`, t.status, {
              error: e,
              code: "AUTH_ERROR",
              metadata: { requestUrl: t.url },
            });
          if (404 === t.status)
            throw new r("CID does not have history", t.status, {
              error: e,
              code: "HTTP_ERROR",
              metadata: { requestUrl: t.url },
            });
          throw new a(`HTTP error: ${e}`, t.status, {
            error: e,
            code: "HTTP_ERROR",
            metadata: { requestUrl: t.url },
          });
        }
        return (await t.json()).data;
      } catch (t) {
        if (t instanceof r) throw t;
        if (t instanceof Error)
          throw new r(`Error fetching swap history: ${t.message}`);
        throw new r("An unknown error occurred while fetching swap history");
      }
    },
    k = async (t, e, o) => {
      let s;
      if (!t) throw new n("Pinata configuration is missing");
      if (!e.name && (!e.keyvalues || 0 === Object.keys(e.keyvalues).length))
        throw new n("At least one of 'name' or 'keyvalues' must be provided");
      let u = {};
      (void 0 !== e.name && (u.name = e.name),
        e.keyvalues &&
          Object.keys(e.keyvalues).length > 0 &&
          (u.keyvalues = e.keyvalues));
      let c = JSON.stringify(u);
      s =
        t.customHeaders && Object.keys(t.customHeaders).length > 0
          ? {
              Authorization: `Bearer ${t.pinataJwt}`,
              "Content-Type": "application/json",
              ...t.customHeaders,
            }
          : {
              Authorization: `Bearer ${t.pinataJwt}`,
              "Content-Type": "application/json",
              Source: "sdk/updateMetadata",
            };
      let l = "https://api.pinata.cloud/v3";
      t.endpointUrl && (l = t.endpointUrl);
      try {
        let t = await fetch(`${l}/files/${o}/${e.id}`, {
          method: "PUT",
          headers: s,
          body: c,
        });
        if (!t.ok) {
          let e = await t.text();
          if (401 === t.status || 403 === t.status)
            throw new i(`Authentication failed: ${e}`, t.status, {
              error: e,
              code: "AUTH_ERROR",
              metadata: { requestUrl: t.url },
            });
          throw new a(`HTTP error: ${e}`, t.status, {
            error: e,
            code: "HTTP_ERROR",
            metadata: { requestUrl: t.url },
          });
        }
        return (await t.json()).data;
      } catch (t) {
        if (t instanceof r) throw t;
        if (t instanceof Error)
          throw new r(`Error processing updateFile: ${t.message}`);
        throw new r("An unknown error occurred while updating file");
      }
    },
    $ = async (t, e) => {
      let o;
      if (!t) throw new n("Pinata configuration is missing");
      o =
        t.customHeaders && Object.keys(t.customHeaders).length > 0
          ? { Authorization: `Bearer ${t.pinataJwt}`, ...t.customHeaders }
          : {
              Authorization: `Bearer ${t.pinataJwt}`,
              Source: "sdk/vectorizeFile",
            };
      let s = "https://uploads.pinata.cloud/v3";
      t.uploadUrl && (s = t.uploadUrl);
      try {
        let t = await fetch(`${s}/vectorize/files/${e}`, {
          method: "POST",
          headers: o,
        });
        if (!t.ok) {
          let e = await t.text();
          if (401 === t.status || 403 === t.status)
            throw new i(`Authentication failed: ${e}`, t.status, {
              error: e,
              code: "AUTH_ERROR",
              metadata: { requestUrl: t.url },
            });
          throw new a(`HTTP error: ${e}`, t.status, {
            error: e,
            code: "HTTP_ERROR",
            metadata: { requestUrl: t.url },
          });
        }
        return await t.json();
      } catch (t) {
        if (t instanceof r) throw t;
        if (t instanceof Error)
          throw new r(`Error processing vectorize file: ${t.message}`);
        throw new r("An unknown error occurred while vectorizing file");
      }
    },
    R = async (t, e) => {
      let o;
      if (!t) throw new n("Pinata configuration is missing");
      o =
        t.customHeaders && Object.keys(t.customHeaders).length > 0
          ? { Authorization: `Bearer ${t.pinataJwt}`, ...t.customHeaders }
          : {
              Authorization: `Bearer ${t.pinataJwt}`,
              Source: "sdk/vectorQuery",
            };
      let s = "https://uploads.pinata.cloud/v3";
      t.uploadUrl && (s = t.uploadUrl);
      let u = JSON.stringify({ text: e.query });
      try {
        let n = await fetch(`${s}/vectorize/groups/${e.groupId}/query`, {
          method: "POST",
          headers: o,
          body: u,
        });
        if (!n.ok) {
          let t = await n.text();
          if (401 === n.status || 403 === n.status)
            throw new i(`Authentication failed: ${t}`, n.status, {
              error: t,
              code: "AUTH_ERROR",
              metadata: { requestUrl: n.url },
            });
          throw new a(`HTTP error: ${t}`, n.status, {
            error: t,
            code: "HTTP_ERROR",
            metadata: { requestUrl: n.url },
          });
        }
        let c = (await n.json()).data;
        if (e.returnFile) {
          if (0 === c.matches.length)
            throw new r("No files returned in query to fetch");
          let e = c.matches[0].cid;
          return await E(t, e, "files");
        }
        return c;
      } catch (t) {
        if (t instanceof r) throw t;
        if (t instanceof Error)
          throw new r(`Error processing vectorize file: ${t.message}`);
        throw new r("An unknown error occurred while vectorizing file");
      }
    },
    b = async (t, e) => {
      let o;
      if (!t) throw new n("Pinata configuration is missing");
      let s = new URLSearchParams({ includesCount: "false" });
      if (e) {
        let { cid: t, status: r, sort: a, limit: i, pageToken: n } = e;
        (t && s.append("cid", t.toString()),
          r && s.append("status", r.toString()),
          a && s.append("sort", a.toString()),
          i && s.append("limit", i.toString()),
          n && s.append("pageToken", n.toString()));
      }
      let u = "https://api.pinata.cloud/v3";
      t.endpointUrl && (u = t.endpointUrl);
      let c = `${u}/files/public/pin_by_cid?${s.toString()}`;
      o =
        t.customHeaders && Object.keys(t.customHeaders).length > 0
          ? { Authorization: `Bearer ${t.pinataJwt}`, ...t.customHeaders }
          : { Authorization: `Bearer ${t.pinataJwt}`, Source: "sdk/pinJobs" };
      try {
        let t = await fetch(c, { method: "GET", headers: o });
        if (!t.ok) {
          let e = await t.text();
          if (401 === t.status || 403 === t.status)
            throw new i(`Authentication failed: ${e}`, t.status, {
              error: e,
              code: "AUTH_ERROR",
              metadata: { requestUrl: t.url },
            });
          throw new a(`HTTP error: ${e}`, t.status, {
            error: e,
            code: "HTTP_ERROR",
            metadata: { requestUrl: t.url },
          });
        }
        return (await t.json()).data;
      } catch (t) {
        if (t instanceof r) throw t;
        if (t instanceof Error)
          throw new r(`Error processing pinJobs: ${t.message}`);
        throw new r("An unknown error occurred while listing pin jobs");
      }
    },
    _ = async (t, e) => {
      let o;
      if (!t) throw new n("Pinata configuration is missing");
      o =
        t.customHeaders && Object.keys(t.customHeaders).length > 0
          ? { Authorization: `Bearer ${t.pinataJwt}`, ...t.customHeaders }
          : {
              Authorization: `Bearer ${t.pinataJwt}`,
              Source: "sdk/deletePinRequest",
            };
      let s = "https://api.pinata.cloud/v3";
      t.endpointUrl && (s = t.endpointUrl);
      try {
        let t = await fetch(`${s}/files/public/pin_by_cid/${e}`, {
          method: "DELETE",
          headers: o,
        });
        if (!t.ok) {
          let e = await t.text();
          if (401 === t.status)
            throw new i(`Authentication failed: ${e}`, t.status, {
              error: e,
              code: "HTTP_ERROR",
              metadata: { requestUrl: t.url },
            });
          throw new a("HTTP error", t.status, {
            error: e,
            code: "HTTP_ERROR",
            metadata: { requestUrl: t.url },
          });
        }
        return "OK";
      } catch (t) {
        if (t instanceof r) throw t;
        if (t instanceof Error)
          throw new r(`Error deleting pin by request: ${t.message}`);
        throw new r(
          "An unknown error occurred while deleting pin by CID request",
        );
      }
    },
    E = async (t, e, o, s) => {
      let u;
      if (!t) throw new n("Pinata configuration is missing");
      let c = `${t?.pinataGateway}/${o}/${e}`,
        l = new URLSearchParams();
      (s &&
        (s.width && l.append("img-width", s.width.toString()),
        s.height && l.append("img-height", s.height.toString()),
        s.dpr && l.append("img-dpr", s.dpr.toString()),
        s.fit && l.append("img-fit", s.fit),
        s.gravity && l.append("img-gravity", s.gravity),
        s.quality && l.append("img-quality", s.quality.toString()),
        s.format && l.append("img-format", s.format),
        void 0 !== s.animation && l.append("img-anim", s.animation.toString()),
        s.sharpen && l.append("img-sharpen", s.sharpen.toString()),
        !0 === s.onError && l.append("img-onerror", "redirect"),
        s.metadata && l.append("img-metadata", s.metadata)),
        t?.pinataGatewayKey &&
          l.append("pinataGatewayToken", t.pinataGatewayKey));
      let d = l.toString();
      if ((d && (c += `?${d}`), "ipfs" === o)) {
        let t = await fetch(c);
        if (!t.ok) {
          let e = await t.text();
          if (401 === t.status || 403 === t.status)
            throw new i(`Authentication Failed: ${e}`, t.status, {
              error: e,
              code: "AUTH_ERROR",
              metadata: { requestUrl: t.url },
            });
          throw new a(`HTTP error: ${e}`, t.status, {
            error: e,
            code: "HTTP_ERROR",
            metadata: { requestUrl: t.url },
          });
        }
        let e = t.headers.get("content-type")?.split(";")[0] || null;
        return {
          data: e?.includes("application/json")
            ? await t.json()
            : e?.includes("text/")
              ? await t.text()
              : await t.blob(),
          contentType: e,
        };
      }
      let h = JSON.stringify({
          url: c,
          date: Math.floor(new Date().getTime() / 1e3),
          expires: 30,
          method: "GET",
        }),
        p = "https://api.pinata.cloud/v3";
      (t.endpointUrl && (p = t.endpointUrl),
        (u =
          t.customHeaders && Object.keys(t.customHeaders).length > 0
            ? {
                Authorization: `Bearer ${t.pinataJwt}`,
                "Content-Type": "application/json",
                ...t.customHeaders,
              }
            : {
                "Content-Type": "application/json",
                Authorization: `Bearer ${t.pinataJwt}`,
                Source: "sdk/getCid",
              }));
      let w = await fetch(`${p}/files/sign`, {
          method: "POST",
          headers: u,
          body: h,
        }),
        f = await w.json();
      try {
        let t = await fetch(f.data);
        if (!t.ok) {
          let e = await t.text();
          if (401 === t.status || 403 === t.status)
            throw new i(`Authentication Failed: ${e}`, t.status, {
              error: e,
              code: "AUTH_ERROR",
              metadata: { requestUrl: t.url },
            });
          throw new a(`HTTP error: ${e}`, t.status, {
            error: e,
            code: "HTTP_ERROR",
            metadata: { requestUrl: t.url },
          });
        }
        let e = t.headers.get("content-type")?.split(";")[0] || null;
        return {
          data: e?.includes("application/json")
            ? await t.json()
            : e?.includes("text/")
              ? await t.text()
              : await t.blob(),
          contentType: e,
        };
      } catch (t) {
        if (t instanceof r) throw t;
        if (t instanceof Error)
          throw new r(`Error processing getCid: ${t.message}`);
        throw new r("An unknown error occurred while getting CID contents");
      }
    },
    H = async (t, e, r) => {
      let a,
        i = r || t?.pinataGateway || "https://gateway.pinata.cloud";
      return (
        (a = await u(e, i)),
        t?.pinataGatewayKey && t?.pinataGatewayKey,
        a
      );
    },
    U = async (t, e, o) => {
      let s, u;
      if (!t) throw new n("Pinata configuration is missing");
      s = e?.gateway
        ? e.gateway.startsWith("https://")
          ? e.gateway
          : `https://${e.gateway}`
        : t.pinataGateway;
      let c = `${s}/files/${e.cid}`,
        l = new URLSearchParams();
      o &&
        (o.width && l.append("img-width", o.width.toString()),
        o.height && l.append("img-height", o.height.toString()),
        o.dpr && l.append("img-dpr", o.dpr.toString()),
        o.fit && l.append("img-fit", o.fit),
        o.gravity && l.append("img-gravity", o.gravity),
        o.quality && l.append("img-quality", o.quality.toString()),
        o.format && l.append("img-format", o.format),
        void 0 !== o.animation && l.append("img-anim", o.animation.toString()),
        o.sharpen && l.append("img-sharpen", o.sharpen.toString()),
        !0 === o.onError && l.append("img-onerror", "redirect"),
        o.metadata && l.append("img-metadata", o.metadata));
      let d = l.toString();
      d && (c += `?${d}`);
      let h = JSON.stringify({
          url: c,
          date: e?.date || Math.floor(new Date().getTime() / 1e3),
          expires: e.expires,
          method: "GET",
        }),
        p = "https://api.pinata.cloud/v3";
      (t.endpointUrl && (p = t.endpointUrl),
        (u =
          t.customHeaders && Object.keys(t.customHeaders).length > 0
            ? {
                Authorization: `Bearer ${t.pinataJwt}`,
                "Content-Type": "application/json",
                ...t.customHeaders,
              }
            : {
                "Content-Type": "application/json",
                Authorization: `Bearer ${t.pinataJwt}`,
                Source: "sdk/createSignURL",
              }));
      try {
        let t = await fetch(`${p}/files/private/download_link`, {
          method: "POST",
          headers: u,
          body: h,
        });
        if (!t.ok) {
          let e = await t.text();
          if (401 === t.status || 403 === t.status)
            throw new i(`Authentication Failed: ${e}`, t.status, {
              error: e,
              code: "AUTH_ERROR",
              metadata: { requestUrl: t.url },
            });
          throw new a(`HTTP error: ${e}`, t.status, {
            error: e,
            code: "HTTP_ERROR",
            metadata: { requestUrl: t.url },
          });
        }
        return (await t.json()).data;
      } catch (t) {
        if (t instanceof r) throw t;
        if (t instanceof Error)
          throw new r(`Error processing createSignedURL: ${t.message}`);
        throw new r("An unknown error occurred while getting signed url");
      }
    },
    A = async (t, e, o) => {
      let s;
      if (!t) throw new n("Pinata configuration is missing");
      let u = (t) =>
          new Promise((e) => {
            setTimeout(e, t);
          }),
        c = [];
      s =
        t.customHeaders && Object.keys(t.customHeaders).length > 0
          ? {
              Authorization: `Bearer ${t.pinataJwt}`,
              "Content-Type": "application/json",
              ...t.customHeaders,
            }
          : {
              Authorization: `Bearer ${t.pinataJwt}`,
              "Content-Type": "application/json",
              Source: "sdk/addToGroup",
            };
      let l = "https://api.pinata.cloud/v3";
      for (let n of (t.endpointUrl && (l = t.endpointUrl), e.files))
        try {
          let t = await fetch(`${l}/groups/${o}/${e.groupId}/ids/${n}`, {
            method: "PUT",
            headers: s,
          });
          if ((await u(300), !t.ok)) {
            let e = await t.text();
            if (401 === t.status)
              throw new i(`Authentication failed: ${e}`, t.status, {
                error: e,
                code: "AUTH_ERROR",
                metadata: { requestUrl: t.url },
              });
            throw new a(`HTTP error: ${e}`, t.status, {
              error: e,
              code: "HTTP_ERROR",
              metadata: { requestUrl: t.url },
            });
          }
          c.push({ id: n, status: t.statusText });
        } catch (e) {
          let t;
          ((t =
            e instanceof r
              ? e.message
              : e instanceof Error
                ? `Error adding file ${n} to group: ${e.message}`
                : `An unknown error occurred while adding file ${n} to group`),
            c.push({ id: n, status: t }));
        }
      return c;
    },
    P = async (t, e, o) => {
      let s;
      if (!t) throw new n("Pinata configuration is missing");
      let u = JSON.stringify({ name: e.name, is_public: e.isPublic });
      s =
        t.customHeaders && Object.keys(t.customHeaders).length > 0
          ? {
              Authorization: `Bearer ${t.pinataJwt}`,
              "Content-Type": "application/json",
              ...t.customHeaders,
            }
          : {
              Authorization: `Bearer ${t.pinataJwt}`,
              "Content-Type": "application/json",
              Source: "sdk/createGroup",
            };
      let c = "https://api.pinata.cloud/v3";
      t.endpointUrl && (c = t.endpointUrl);
      try {
        let t = await fetch(`${c}/groups/${o}`, {
          method: "POST",
          headers: s,
          body: u,
        });
        if (!t.ok) {
          let e = await t.text();
          if (401 === t.status || 403 === t.status)
            throw new i(`Authentication failed: ${e}`, t.status, {
              error: e,
              code: "AUTH_ERROR",
              metadata: { requestUrl: t.url },
            });
          throw new a(`HTTP error: ${e}`, t.status, {
            error: e,
            code: "HTTP_ERROR",
            metadata: { requestUrl: t.url },
          });
        }
        return (await t.json()).data;
      } catch (t) {
        if (t instanceof r) throw t;
        if (t instanceof Error)
          throw new r(`Error processing createGroup: ${t.message}`);
        throw new r("An unknown error occurred while creating a group");
      }
    },
    v = async (t, e, o) => {
      let s;
      if (!t) throw new n("Pinata configuration is missing");
      s =
        t.customHeaders && Object.keys(t.customHeaders).length > 0
          ? {
              Authorization: `Bearer ${t.pinataJwt}`,
              "Content-Type": "application/json",
              ...t.customHeaders,
            }
          : {
              Authorization: `Bearer ${t.pinataJwt}`,
              "Content-Type": "application/json",
              Source: "sdk/deleteGroup",
            };
      let u = "https://api.pinata.cloud/v3";
      t.endpointUrl && (u = t.endpointUrl);
      try {
        let t = await fetch(`${u}/groups/${o}/${e.groupId}`, {
          method: "DELETE",
          headers: s,
        });
        if (!t.ok) {
          let e = await t.text();
          if (401 === t.status || 403 === t.status)
            throw new i(`Authentication failed: ${e}`, t.status, {
              error: e,
              code: "AUTH_ERROR",
              metadata: { requestUrl: t.url },
            });
          throw new a(`HTTP error: ${e}`, t.status, {
            error: e,
            code: "HTTP_ERROR",
            metadata: { requestUrl: t.url },
          });
        }
        return t.statusText;
      } catch (t) {
        if (t instanceof r) throw t;
        if (t instanceof Error)
          throw new r(`Error processing deleteGroup: ${t.message}`);
        throw new r("An unknown error occurred while deleting a group");
      }
    },
    S = async (t, e, o) => {
      let s;
      if (!t) throw new n("Pinata configuration is missing");
      s =
        t.customHeaders && Object.keys(t.customHeaders).length > 0
          ? {
              Authorization: `Bearer ${t.pinataJwt}`,
              "Content-Type": "application/json",
              ...t.customHeaders,
            }
          : {
              Authorization: `Bearer ${t.pinataJwt}`,
              "Content-Type": "application/json",
              Source: "sdk/getGroup",
            };
      let u = "https://api.pinata.cloud/v3";
      t.endpointUrl && (u = t.endpointUrl);
      try {
        let t = await fetch(`${u}/groups/${o}/${e.groupId}`, {
          method: "GET",
          headers: s,
        });
        if (!t.ok) {
          let e = await t.text();
          if (401 === t.status || 403 === t.status)
            throw new i(`Authentication failed: ${e}`, t.status, {
              error: e,
              code: "AUTH_ERROR",
              metadata: { requestUrl: t.url },
            });
          throw new a(`HTTP error: ${e}`, t.status, {
            error: e,
            code: "HTTP_ERROR",
            metadata: { requestUrl: t.url },
          });
        }
        return (await t.json()).data;
      } catch (t) {
        if (t instanceof r) throw t;
        if (t instanceof Error)
          throw new r(`Error processing getGroup: ${t.message}`);
        throw new r("An unknown error occurred while getting info for a group");
      }
    },
    x = async (t, e, o) => {
      let s;
      if (!t) throw new n("Pinata configuration is missing");
      s =
        t.customHeaders && Object.keys(t.customHeaders).length > 0
          ? {
              Authorization: `Bearer ${t.pinataJwt}`,
              "Content-Type": "application/json",
              ...t.customHeaders,
            }
          : {
              Authorization: `Bearer ${t.pinataJwt}`,
              "Content-Type": "application/json",
              Source: "sdk/listGroups",
            };
      let u = new URLSearchParams();
      if (o) {
        let { pageToken: t, name: e, limit: r, isPublic: a } = o;
        (t && u.append("pageToken", t.toString()),
          a && u.append("isPublic", a.toString()),
          e && u.append("name", e),
          void 0 !== r && u.append("limit", r.toString()));
      }
      let c = "https://api.pinata.cloud/v3";
      t.endpointUrl && (c = t.endpointUrl);
      try {
        let t = await fetch(`${c}/groups/${e}?${u.toString()}`, {
          method: "GET",
          headers: s,
        });
        if (!t.ok) {
          let e = await t.text();
          if (401 === t.status || 403 === t.status)
            throw new i(`Authentication failed: ${e}`, t.status, {
              error: e,
              code: "AUTH_ERROR",
              metadata: { requestUrl: t.url },
            });
          throw new a(`HTTP error: ${e}`, t.status, {
            error: e,
            code: "HTTP_ERROR",
            metadata: { requestUrl: t.url },
          });
        }
        return (await t.json()).data;
      } catch (t) {
        if (t instanceof r) throw t;
        if (t instanceof Error)
          throw new r(`Error processing listGroups: ${t.message}`);
        throw new r("An unknown error occurred while listing groups");
      }
    },
    O = async (t, e, o) => {
      let s;
      if (!t) throw new n("Pinata configuration is missing");
      let u = (t) =>
          new Promise((e) => {
            setTimeout(e, t);
          }),
        c = [];
      s =
        t.customHeaders && Object.keys(t.customHeaders).length > 0
          ? {
              Authorization: `Bearer ${t.pinataJwt}`,
              "Content-Type": "application/json",
              ...t.customHeaders,
            }
          : {
              Authorization: `Bearer ${t.pinataJwt}`,
              "Content-Type": "application/json",
              Source: "sdk/addToGroup",
            };
      let l = "https://api.pinata.cloud/v3";
      for (let n of (t.endpointUrl && (l = t.endpointUrl), e.files))
        try {
          let t = await fetch(`${l}/groups/${o}/${e.groupId}/ids/${n}`, {
            method: "DELETE",
            headers: s,
          });
          if ((await u(300), !t.ok)) {
            let e = await t.text();
            if (401 === t.status)
              throw new i(`Authentication failed: ${e}`, t.status, {
                error: e,
                code: "AUTH_ERROR",
                metadata: { requestUrl: t.url },
              });
            throw new a(`HTTP error: ${e}`, t.status, {
              error: e,
              code: "HTTP_ERROR",
              metadata: { requestUrl: t.url },
            });
          }
          c.push({ id: n, status: t.statusText });
        } catch (e) {
          let t;
          ((t =
            e instanceof r
              ? e.message
              : e instanceof Error
                ? `Error adding file ${n} to group: ${e.message}`
                : `An unknown error occurred while adding file ${n} to group`),
            c.push({ id: n, status: t }));
        }
      return c;
    },
    q = async (t, e, o) => {
      let s;
      if (!t) throw new n("Pinata configuration is missing");
      let u = JSON.stringify({ name: e.name, is_public: e.isPublic });
      s =
        t.customHeaders && Object.keys(t.customHeaders).length > 0
          ? {
              Authorization: `Bearer ${t.pinataJwt}`,
              "Content-Type": "application/json",
              ...t.customHeaders,
            }
          : {
              Authorization: `Bearer ${t.pinataJwt}`,
              "Content-Type": "application/json",
              Source: "sdk/updateGroup",
            };
      let c = "https://api.pinata.cloud/v3";
      t.endpointUrl && (c = t.endpointUrl);
      try {
        let t = await fetch(`${c}/groups/${o}/${e.groupId}`, {
          method: "PUT",
          headers: s,
          body: u,
        });
        if (!t.ok) {
          let e = await t.text();
          if (401 === t.status || 403 === t.status)
            throw new i(`Authentication failed: ${e}`, t.status, {
              error: e,
              code: "AUTH_ERROR",
              metadata: { requestUrl: t.url },
            });
          throw new a(`HTTP error: ${e}`, t.status, {
            error: e,
            code: "HTTP_ERROR",
            metadata: { requestUrl: t.url },
          });
        }
        return (await t.json()).data;
      } catch (t) {
        if (t instanceof r) throw t;
        if (t instanceof Error)
          throw new r(`Error processing updateGroup: ${t.message}`);
        throw new r("An unknown error occurred while updating group");
      }
    },
    j = async (t, e) => {
      let o;
      if (!t) throw new n("Pinata configuration is missing");
      o =
        t.customHeaders && Object.keys(t.customHeaders).length > 0
          ? {
              Authorization: `Bearer ${t.pinataJwt}`,
              "Content-Type": "application/json",
              ...t.customHeaders,
            }
          : {
              Authorization: `Bearer ${t.pinataJwt}`,
              "Content-Type": "application/json",
              Source: "sdk/createKey",
            };
      let s = JSON.stringify(e),
        u = "https://api.pinata.cloud/v3";
      t.endpointUrl && (u = t.endpointUrl);
      try {
        let t = await fetch(`${u}/pinata/keys`, {
          method: "POST",
          headers: o,
          body: s,
        });
        if (!t.ok) {
          let e = await t.text();
          if (401 === t.status || 403 === t.status)
            throw new i(`Authentication failed: ${e}`, t.status, {
              error: e,
              code: "AUTH_ERROR",
              metadata: { requestUrl: t.url },
            });
          throw new a(`HTTP error: ${e}`, t.status, {
            error: e,
            code: "HTTP_ERROR",
            metadata: { requestUrl: t.url },
          });
        }
        return await t.json();
      } catch (t) {
        if (t instanceof r) throw t;
        if (t instanceof Error)
          throw new r(`Error processing createKey: ${t.message}`);
        throw new r("An unknown error occurred while creating API key");
      }
    },
    C = async (t, e) => {
      let o;
      if (!t) throw new n("Pinata configuration is missing");
      o =
        t.customHeaders && Object.keys(t.customHeaders).length > 0
          ? {
              Authorization: `Bearer ${t.pinataJwt}`,
              "Content-Type": "application/json",
              ...t.customHeaders,
            }
          : {
              Authorization: `Bearer ${t.pinataJwt}`,
              "Content-Type": "application/json",
              Source: "sdk/listKeys",
            };
      let s = new URLSearchParams();
      if (e) {
        let { offset: t, name: r, revoked: a, limitedUse: i, exhausted: n } = e;
        (t && s.append("offset", t.toString()),
          void 0 !== a && s.append("revoked", a.toString()),
          void 0 !== i && s.append("limitedUse", i.toString()),
          void 0 !== n && s.append("exhausted", n.toString()),
          r && s.append("name", r));
      }
      let u = "https://api.pinata.cloud/v3";
      t.endpointUrl && (u = t.endpointUrl);
      try {
        let t = await fetch(`${u}/pinata/keys?${s.toString()}`, {
          method: "GET",
          headers: o,
        });
        if (!t.ok) {
          let e = await t.text();
          if (401 === t.status || 403 === t.status)
            throw new i(`Authentication failed: ${e}`, t.status, {
              error: e,
              code: "AUTH_ERROR",
              metadata: { requestUrl: t.url },
            });
          throw new a(`HTTP error: ${e}`, t.status, {
            error: e,
            code: "HTTP_ERROR",
            metadata: { requestUrl: t.url },
          });
        }
        return (await t.json()).keys;
      } catch (t) {
        if (t instanceof r) throw t;
        if (t instanceof Error)
          throw new r(`Error processing listKeys: ${t.message}`);
        throw new r("An unknown error occurred while listing API keys");
      }
    },
    z = (t) =>
      new Promise((e) => {
        setTimeout(e, t);
      }),
    B = async (t, e) => {
      let o;
      if (!t) throw new n("Pinata configuration is missing");
      t.customHeaders && Object.keys(t.customHeaders).length > 0
        ? ((o = {
            Authorization: `Bearer ${t.pinataJwt}`,
            "Content-Type": "application/json",
            ...t.customHeaders,
          }),
          (o = { ...t.customHeaders }))
        : (o = {
            Authorization: `Bearer ${t.pinataJwt}`,
            "Content-Type": "application/json",
            Source: "sdk/revokeKeys",
          });
      let s = [],
        u = "https://api.pinata.cloud/v3";
      for (let n of (t.endpointUrl && (u = t.endpointUrl), e))
        try {
          let t = await fetch(`${u}/pinata/keys/${n}`, {
            method: "PUT",
            headers: o,
          });
          if ((await z(300), !t.ok)) {
            let e = await t.text();
            if (401 === t.status || 403 === t.status)
              throw new i(`Authentication failed: ${e}`, t.status, {
                error: e,
                code: "AUTH_ERROR",
                metadata: { requestUrl: t.url },
              });
            throw new a(`HTTP error: ${e}`, t.status, {
              error: e,
              code: "HTTP_ERROR",
              metadata: { requestUrl: t.url },
            });
          }
          let e = await t.json();
          s.push({ key: n, status: e });
        } catch (e) {
          let t;
          ((t =
            e instanceof r
              ? e.message
              : e instanceof Error
                ? `Error revoking key ${n}: ${e.message}`
                : `An unknown error occurred while revoking key ${n}`),
            s.push({ key: n, status: t }));
        }
      return s;
    },
    J = async (t, o, s, u) => {
      let c;
      if (!t) throw new n("Pinata configuration is missing");
      let l = u?.keys || t?.pinataJwt,
        d = u?.metadata?.name ? u?.metadata?.name : "base64 string",
        h = new Blob([e.Buffer.from(o, "base64")]),
        p = new FormData();
      (p.append("file", h, d),
        p.append("network", s),
        p.append("name", d),
        u?.groupId && p.append("group_id", u.groupId),
        u?.metadata?.keyvalues &&
          p.append("keyvalues", JSON.stringify(u.metadata.keyvalues)),
        (c =
          t.customHeaders && Object.keys(t.customHeaders).length > 0
            ? { Authorization: `Bearer ${l}`, ...t.customHeaders }
            : { Authorization: `Bearer ${l}`, Source: "sdk/base64" }));
      let w = "https://uploads.pinata.cloud/v3";
      if ((t.uploadUrl && (w = t.uploadUrl), u?.url))
        try {
          let t = await fetch(u.url, { method: "POST", body: p });
          if (!t.ok) {
            let e = await t.text();
            if (401 === t.status || 403 === t.status)
              throw new i(`Authentication failed: ${e}`, t.status, {
                error: e,
                code: "AUTH_ERROR",
                metadata: { requestUrl: t.url },
              });
            throw new a(`HTTP error: ${e}`, t.status, {
              error: e,
              code: "HTTP_ERROR",
              metadata: { requestUrl: t.url },
            });
          }
          return (await t.json()).data;
        } catch (t) {
          if (t instanceof r) throw t;
          if (t instanceof Error)
            throw new r(`Error processing base64: ${t.message}`);
          throw new r(
            "An unknown error occurred while trying to upload base64",
          );
        }
      try {
        let t = await fetch(`${w}/files`, {
          method: "POST",
          headers: c,
          body: p,
        });
        if (!t.ok) {
          let e = await t.text();
          if (401 === t.status || 403 === t.status)
            throw new i(`Authentication failed: ${e}`, t.status, {
              error: e,
              code: "AUTH_ERROR",
              metadata: { requestUrl: t.url },
            });
          throw new a(`HTTP error: ${e}`, t.status, {
            error: e,
            code: "HTTP_ERROR",
            metadata: { requestUrl: t.url },
          });
        }
        let e = (await t.json()).data;
        if (u?.vectorize) {
          let r = await fetch(`${w}/vectorize/files/${e.id}`, {
            method: "POST",
            headers: { Authorization: `Bearer ${l}` },
          });
          if (r.ok) e.vectorized = !0;
          else {
            let e = await r.text();
            throw new a(`HTTP error during vectorization: ${e}`, r.status, {
              error: e,
              code: "HTTP_ERROR",
              metadata: { requestUrl: t.url },
            });
          }
        }
        return e;
      } catch (t) {
        if (t instanceof r) throw t;
        if (t instanceof Error)
          throw new r(`Error processing base64: ${t.message}`);
        throw new r("An unknown error occurred while trying to upload base64");
      }
    },
    I = async (t, e, o) => {
      let s;
      if (!t) throw new n("Pinata configuration is missing");
      let u = {
        date: e?.date || Math.floor(new Date().getTime() / 1e3),
        expires: e.expires,
      };
      (e.groupId && (u.group_id = e.groupId),
        e.name && (u.filename = e.name),
        e.keyvalues && (u.keyvalues = e.keyvalues),
        o && (u.network = o),
        e.streamable && (u.streamable = e.streamable),
        e.maxFileSize && (u.max_file_size = e.maxFileSize),
        e.mimeTypes && (u.allow_mime_types = e.mimeTypes));
      let c = "https://uploads.pinata.cloud/v3";
      (t.uploadUrl && (c = t.uploadUrl),
        (s =
          t.customHeaders && Object.keys(t.customHeaders).length > 0
            ? {
                Authorization: `Bearer ${t.pinataJwt}`,
                "Content-Type": "application/json",
                ...t.customHeaders,
              }
            : {
                "Content-Type": "application/json",
                Authorization: `Bearer ${t.pinataJwt}`,
                Source: "sdk/createSignURL",
              }));
      for (let t = 0; t <= 3; t++)
        try {
          let t = await fetch(`${c}/files/sign`, {
            method: "POST",
            headers: s,
            cache: "no-store",
            body: JSON.stringify(u),
          });
          if (!t.ok) {
            let e = await t.text();
            if (401 === t.status || 403 === t.status)
              throw new i(`Authentication Failed: ${e}`, t.status, {
                error: e,
                code: "AUTH_ERROR",
                metadata: { requestUrl: t.url },
              });
            throw new a(`HTTP error: ${e}`, t.status, {
              error: e,
              code: "HTTP_ERROR",
              metadata: { requestUrl: t.url },
            });
          }
          return (await t.json()).data;
        } catch (n) {
          if (
            n instanceof i ||
            (n instanceof a &&
              n.statusCode &&
              n.statusCode >= 400 &&
              n.statusCode < 500 &&
              429 !== n.statusCode)
          )
            throw n;
          if (3 === t) {
            if (n instanceof r) throw n;
            if (n instanceof Error)
              throw new r(`Error processing createSignedURL: ${n.message}`);
            throw new r("An unknown error occurred while getting signed url");
          }
          let e = Math.min(1e3 * Math.pow(2, t), 4e3);
          await new Promise((t) => setTimeout(t, e));
        }
      throw new r("An unknown error occurred while getting signed url");
    },
    M = async (t, e, o, s) => {
      let u;
      if (!t) throw new n("Pinata configuration is missing");
      let c = s?.keys || t.pinataJwt,
        l = "https://uploads.pinata.cloud/v3";
      if ((t.uploadUrl && (l = t.uploadUrl), e.size > 0x5a00000)) {
        let r, i;
        r =
          t.customHeaders && Object.keys(t.customHeaders).length > 0
            ? { Authorization: `Bearer ${c}`, ...t.customHeaders }
            : { Authorization: `Bearer ${c}`, Source: "sdk/file" };
        let n = s?.metadata?.name || e.name || "File from SDK",
          u = `filename ${btoa(n)},filetype ${btoa(e.type)},network ${btoa(o)}`;
        (s?.groupId && (u += `,group_id ${btoa(s.groupId)}`),
          s?.metadata?.keyvalues &&
            (u += `,keyvalues ${btoa(JSON.stringify(s.metadata.keyvalues))}`),
          s?.streamable && (u += `,streamable ${btoa("true")}`),
          s?.car && (u += `,car ${btoa("true")}`),
          s?.cid_version !== void 0 &&
            (u += `,cid_version ${btoa(s.cid_version)}`));
        let d = `${l}/files`;
        s?.url && (d = s.url);
        let h = new URL(d);
        s?.cid_version !== void 0 &&
          h.searchParams.set(
            "X-Upload-Option-Cid-Version",
            s.cid_version.toString(),
          );
        let p = await fetch(h.toString(), {
            method: "POST",
            headers: {
              "Upload-Length": `${e.size}`,
              "Upload-Metadata": u,
              ...r,
            },
          }),
          w = p.headers.get("Location");
        if (!w) {
          let t = await p.text();
          throw new a("Upload URL not provided", p.status, {
            error: t,
            code: "HTTP_ERROR",
            metadata: { requestUrl: p.url, requestHeaders: p.headers },
          });
        }
        let f = Math.ceil(e.size / 0x3200001),
          g = 0;
        for (let t = 0; t < f; t++) {
          let t = e.slice(g, g + 0x3200001),
            n = 0;
          for (; n <= 5; )
            try {
              if (
                (i = await fetch(w, {
                  method: "PATCH",
                  headers: {
                    "Content-Type": "application/offset+octet-stream",
                    "Upload-Offset": g.toString(),
                    ...r,
                  },
                  body: t,
                })).ok
              )
                break;
              {
                let t = await i.text();
                throw Error(`HTTP ${i.status}: ${t}`);
              }
            } catch (e) {
              if (++n > 5) {
                let t = i
                  ? await i.text().catch(() => "Unknown error")
                  : e instanceof Error
                    ? e.message
                    : String(e);
                throw new a(
                  `HTTP error during chunk upload after 5 retries: ${t}`,
                  i?.status || 0,
                  {
                    error: t,
                    code: "HTTP_ERROR",
                    metadata: { requestUrl: i?.url || w, retriesAttempted: 5 },
                  },
                );
              }
              let t = Math.min(1e3 * Math.pow(2, n - 1), 1e4);
              await new Promise((e) => setTimeout(e, t));
            }
          g += t.size;
        }
        if (204 === i.status) {
          let r,
            n = i.headers.get("upload-cid");
          if (!t.pinataJwt)
            return {
              id: "",
              name: "",
              cid: n,
              size: e.size,
              created_at: "",
              number_of_files: 1,
              group_id: null,
              mime_type: "",
              keyvalues: {},
              vectorized: !1,
              network: "",
            };
          r = t.endpointUrl ? t.endpointUrl : "https://api.pinata.cloud/v3";
          let u = await fetch(`${r}/files/${o}?cid=${n}`, {
              method: "GET",
              headers: { Authorization: `Bearer ${c}` },
            }),
            d = (await u.json()).data.files[0];
          if (s?.vectorize) {
            let t = await fetch(`${l}/vectorize/files/${d.id}`, {
              method: "POST",
              headers: { Authorization: `Bearer ${c}` },
            });
            if (t.ok) d.vectorized = !0;
            else {
              let e = await t.text();
              throw new a(`HTTP error during vectorization: ${e}`, t.status, {
                error: e,
                code: "HTTP_ERROR",
                metadata: { requestUrl: t.url },
              });
            }
          }
          return d;
        }
      }
      u =
        t.customHeaders && Object.keys(t.customHeaders).length > 0
          ? { Authorization: `Bearer ${c}`, ...t.customHeaders }
          : { Authorization: `Bearer ${c}`, Source: "sdk/file" };
      let d = new FormData();
      if (
        (d.append("file", e, e.name),
        d.append("network", o),
        d.append("name", s?.metadata?.name || e.name || "File from SDK"),
        s?.groupId && d.append("group_id", s.groupId),
        s?.metadata?.keyvalues &&
          d.append("keyvalues", JSON.stringify(s.metadata.keyvalues)),
        s?.streamable && d.append("streamable", "true"),
        s?.car && d.append("car", "true"),
        s?.cid_version !== void 0 &&
          d.append("cid_version", s.cid_version.toString()),
        s?.url)
      )
        try {
          let t = new URL(s.url),
            e = await fetch(t.toString(), {
              method: "POST",
              headers: u,
              body: d,
            });
          if (!e.ok) {
            let t = await e.text();
            if (401 === e.status || 403 === e.status)
              throw new i(`Authentication failed: ${t}`, e.status, {
                error: t,
                code: "AUTH_ERROR",
                metadata: { requestUrl: e.url },
              });
            throw new a(`HTTP error: ${t}`, e.status, {
              error: t,
              code: "HTTP_ERROR",
              metadata: { requestUrl: e.url },
            });
          }
          return (await e.json()).data;
        } catch (t) {
          if (t instanceof r) throw t;
          if (t instanceof Error)
            throw new r(`Error uploading file: ${t.message}`, void 0, {
              error: t.toString(),
            });
          throw new r("An unknown error occurred while trying to upload file");
        }
      try {
        let t = await fetch(`${l}/files`, {
          method: "POST",
          headers: u,
          body: d,
        });
        if (!t.ok) {
          let e = await t.text();
          if (401 === t.status || 403 === t.status)
            throw new i(`Authentication failed: ${e}`, t.status, {
              error: e,
              code: "AUTH_ERROR",
              metadata: { requestUrl: t.url },
            });
          throw new a(`HTTP error: ${e}`, t.status, {
            error: e,
            code: "HTTP_ERROR",
            metadata: { requestUrl: t.url },
          });
        }
        let e = (await t.json()).data;
        if (s?.vectorize) {
          let r = await fetch(`${l}/vectorize/files/${e.id}`, {
            method: "POST",
            headers: { Authorization: `Bearer ${c}` },
          });
          if (r.ok) e.vectorized = !0;
          else {
            let e = await r.text();
            throw new a(`HTTP error during vectorization: ${e}`, r.status, {
              error: e,
              code: "HTTP_ERROR",
              metadata: { requestUrl: t.url },
            });
          }
        }
        return e;
      } catch (t) {
        if (t instanceof r) throw t;
        if (t instanceof Error)
          throw new r(`Error uploading file: ${t.message}`, void 0, {
            error: t.toString(),
          });
        throw new r("An unknown error occurred while trying to upload file");
      }
    },
    N = async (t, e, o, s) => {
      let u;
      if (!t) throw new n("Pinata configuration is missing");
      let c = s?.keys || t?.pinataJwt,
        l = s?.metadata?.name || "folder_from_sdk",
        d = new FormData();
      for (let t of Array.from(e)) {
        let e = t.webkitRelativePath || `${l}/${t.name}`;
        d.append("file", t, e);
      }
      (d.append(
        "pinataMetadata",
        JSON.stringify({ name: l, keyvalues: s?.metadata?.keyvalues }),
      ),
        d.append(
          "pinataOptions",
          JSON.stringify({ groupId: s?.groupId, cidVersion: 1 }),
        ),
        (u =
          t.customHeaders && Object.keys(t.customHeaders).length > 0
            ? { Authorization: `Bearer ${c}`, ...t.customHeaders }
            : { Authorization: `Bearer ${c}`, Source: "sdk/fileArray" }));
      let h = "https://api.pinata.cloud/pinning/pinFileToIPFS";
      t.legacyUploadUrl && (h = t.legacyUploadUrl);
      try {
        let t = await fetch(`${h}`, { method: "POST", headers: u, body: d });
        if (!t.ok) {
          let e = await t.text();
          if (401 === t.status || 403 === t.status)
            throw new i(`Authentication failed: ${e}`, t.status, {
              error: e,
              code: "AUTH_ERROR",
              metadata: { requestUrl: t.url },
            });
          throw new a(`HTTP error: ${e}`, t.status, {
            error: e,
            code: "HTTP_ERROR",
            metadata: { requestUrl: t.url },
          });
        }
        let e = await t.json();
        return {
          id: e.ID,
          name: e.Name,
          cid: e.IpfsHash,
          size: e.PinSize,
          created_at: e.Timestamp,
          number_of_files: e.NumberOfFiles,
          mime_type: e.MimeType,
          group_id: e.GroupId,
          keyvalues: e.Keyvalues,
          vectorized: !1,
          network: "public",
        };
      } catch (t) {
        if (t instanceof r) throw t;
        if (t instanceof Error)
          throw new r(`Error processing fileArray: ${t.message}`);
        throw new r(
          "An unknown error occurred while uploading an array of files",
        );
      }
    },
    D = async (t, e, o, s) => {
      let u;
      if (!t) throw new n("Pinata configuration is missing");
      let c = s?.keys || t?.pinataJwt,
        l = new File([new Blob([JSON.stringify(e)])], "data.json", {
          type: "application/json",
        }),
        d = new FormData();
      (d.append("file", l, l.name),
        d.append("network", o),
        d.append("name", s?.metadata?.name || l.name || "File from SDK"),
        s?.groupId && d.append("group_id", s.groupId),
        s?.metadata?.keyvalues &&
          d.append("keyvalues", JSON.stringify(s.metadata.keyvalues)),
        (u =
          t.customHeaders && Object.keys(t.customHeaders).length > 0
            ? { Authorization: `Bearer ${c}`, ...t.customHeaders }
            : { Authorization: `Bearer ${c}`, Source: "sdk/json" }));
      let h = "https://uploads.pinata.cloud/v3";
      if ((t.uploadUrl && (h = t.uploadUrl), s?.url))
        try {
          let t = await fetch(s.url, { method: "POST", body: d });
          if (!t.ok) {
            let e = await t.text();
            if (401 === t.status || 403 === t.status)
              throw new i(`Authentication failed: ${e}`, t.status, {
                error: e,
                code: "AUTH_ERROR",
                metadata: { requestUrl: t.url },
              });
            throw new a(`HTTP error: ${e}`, t.status, {
              error: e,
              code: "HTTP_ERROR",
              metadata: { requestUrl: t.url },
            });
          }
          return (await t.json()).data;
        } catch (t) {
          if (t instanceof r) throw t;
          if (t instanceof Error)
            throw new r(`Error processing base64: ${t.message}`);
          throw new r(
            "An unknown error occurred while trying to upload base64",
          );
        }
      try {
        let t = await fetch(`${h}/files`, {
          method: "POST",
          headers: u,
          body: d,
        });
        if (!t.ok) {
          let e = await t.text();
          if (401 === t.status || 403 === t.status)
            throw new i(`Authentication failed: ${e}`, t.status, {
              error: e,
              code: "AUTH_ERROR",
              metadata: { requestUrl: t.url },
            });
          throw new a(`HTTP error: ${e}`, t.status, {
            error: e,
            code: "HTTP_ERROR",
            metadata: { requestUrl: t.url },
          });
        }
        let e = (await t.json()).data;
        if (s?.vectorize) {
          let r = await fetch(`${h}/vectorize/files/${e.id}`, {
            method: "POST",
            headers: { Authorization: `Bearer ${c}` },
          });
          if (r.ok) e.vectorized = !0;
          else {
            let e = await r.text();
            throw new a(`HTTP error during vectorization: ${e}`, r.status, {
              error: e,
              code: "HTTP_ERROR",
              metadata: { requestUrl: t.url },
            });
          }
        }
        return e;
      } catch (t) {
        if (t instanceof r) throw t;
        if (t instanceof Error)
          throw new r(`Error processing json: ${t.message}`);
        throw new r("An unknown error occurred while uploading json");
      }
    },
    F = async (t, e, o, s) => {
      let u;
      if (!t) throw new n("Pinata configuration is missing");
      let c = s?.keys || t?.pinataJwt,
        l = new FormData(),
        d = await fetch(e);
      if (!d.ok) {
        let t = await d.text();
        throw new a(`HTTP error: ${t}`, d.status, {
          error: t,
          code: "HTTP_ERROR",
          metadata: { requestUrl: d.url },
        });
      }
      let h = new Blob([await d.arrayBuffer()]),
        p = s?.metadata?.name ?? "url_upload",
        w = new File([h], p);
      (l.append("file", w, p),
        l.append("network", o),
        l.append("name", p),
        s?.groupId && l.append("group_id", s.groupId),
        s?.metadata?.keyvalues &&
          l.append("keyvalues", JSON.stringify(s.metadata.keyvalues)),
        (u =
          t.customHeaders && Object.keys(t.customHeaders).length > 0
            ? { Authorization: `Bearer ${c}`, ...t.customHeaders }
            : { Authorization: `Bearer ${c}`, Source: "sdk/url" }));
      let f = "https://uploads.pinata.cloud/v3";
      if ((t.uploadUrl && (f = t.uploadUrl), s?.url))
        try {
          let t = await fetch(s.url, { method: "POST", body: l });
          if (!t.ok) {
            let e = await t.text();
            if (401 === t.status || 403 === t.status)
              throw new i(`Authentication failed: ${e}`, t.status, {
                error: e,
                code: "AUTH_ERROR",
                metadata: { requestUrl: t.url },
              });
            throw new a(`HTTP error: ${e}`, t.status, {
              error: e,
              code: "HTTP_ERROR",
              metadata: { requestUrl: t.url },
            });
          }
          return (await t.json()).data;
        } catch (t) {
          if (t instanceof r) throw t;
          if (t instanceof Error)
            throw new r(`Error processing base64: ${t.message}`);
          throw new r(
            "An unknown error occurred while trying to upload base64",
          );
        }
      try {
        let t = await fetch(`${f}/files`, {
          method: "POST",
          headers: u,
          body: l,
        });
        if (!t.ok) {
          let e = await t.text();
          if (401 === t.status || 403 === t.status)
            throw new i(`Authentication failed: ${e}`, t.status, {
              error: e,
              code: "AUTH_ERROR",
              metadata: { requestUrl: t.url },
            });
          throw new a(`HTTP error: ${e}`, t.status, {
            error: e,
            code: "HTTP_ERROR",
            metadata: { requestUrl: t.url },
          });
        }
        let e = (await t.json()).data;
        if (s?.vectorize) {
          let r = await fetch(`${f}/vectorize/files/${e.id}`, {
            method: "POST",
            headers: { Authorization: `Bearer ${c}` },
          });
          if (r.ok) e.vectorized = !0;
          else {
            let e = await r.text();
            throw new a(`HTTP error during vectorization: ${e}`, r.status, {
              error: e,
              code: "HTTP_ERROR",
              metadata: { requestUrl: t.url },
            });
          }
        }
        return e;
      } catch (t) {
        if (t instanceof r) throw t;
        if (t instanceof Error)
          throw new r(`Error processing url: ${t.message}`);
        throw new r("An unknown error occurred while uploading by url");
      }
    },
    G = async (t, e, o) => {
      let s;
      if (!t) throw new n("Pinata configuration is missing");
      let u = o?.keys || t?.pinataJwt;
      s =
        t.customHeaders && Object.keys(t.customHeaders).length > 0
          ? {
              Authorization: `Bearer ${u}`,
              "Content-Type": "application/json",
              ...t.customHeaders,
            }
          : {
              Authorization: `Bearer ${u}`,
              "Content-Type": "application/json",
              Source: "sdk/cid",
            };
      let c = JSON.stringify({
          cid: e,
          name: o?.metadata ? o?.metadata?.name : e,
          keyvalues: o?.metadata?.keyvalues,
          group_id: o?.groupId,
          host_nodes: o?.peerAddresses,
        }),
        l = "https://api.pinata.cloud/v3";
      t.endpointUrl && (l = t.endpointUrl);
      try {
        let t = await fetch(`${l}/files/public/pin_by_cid`, {
          method: "POST",
          headers: s,
          body: c,
        });
        if (!t.ok) {
          let e = await t.text();
          if (401 === t.status || 403 === t.status)
            throw new i(`Authentication failed: ${e}`, t.status, {
              error: e,
              code: "AUTH_ERROR",
              metadata: { requestUrl: t.url },
            });
          throw new a(`HTTP error: ${e}`, t.status, {
            error: e,
            code: "HTTP_ERROR",
            metadata: { requestUrl: t.url },
          });
        }
        return (await t.json()).data;
      } catch (t) {
        if (t instanceof r) throw t;
        if (t instanceof Error)
          throw new r(`Error processing cid: ${t.message}`);
        throw new r("An unknown error occurred while pinning by CID");
      }
    },
    K = class {
      constructor(t) {
        ((this.config = c(t)),
          (this.requests = new W(this.config)),
          (this.bandwidth = new V(this.config)));
      }
      updateConfig(t) {
        ((this.config = t),
          this.requests.updateConfig(t),
          this.bandwidth.updateConfig(t));
      }
      summary(t) {
        return new Y(this.config, t.domain, t.start, t.end, t.interval);
      }
    },
    L = class {
      constructor(t, e, r, a) {
        ((this.config = t),
          (this.query = {
            gateway_domain: e,
            start_date: r,
            end_date: a,
            sort_by: "requests",
            attribute: "cid",
          }));
      }
      cid(t) {
        return (
          (this.query.attribute = "cid"),
          t && (this.query.cid = t),
          this
        );
      }
      fileName(t) {
        return (
          (this.query.attribute = "file_name"),
          t && (this.query.file_name = t),
          this
        );
      }
      userAgent(t) {
        return (
          (this.query.attribute = "user_agent"),
          t && (this.query.user_agent = t),
          this
        );
      }
      country(t) {
        return (
          (this.query.attribute = "country"),
          t && (this.query.country = t),
          this
        );
      }
      region(t) {
        return (
          (this.query.attribute = "region"),
          t && (this.query.region = t),
          this
        );
      }
      referer(t) {
        return (
          (this.query.attribute = "referer"),
          t && (this.query.referer = t),
          this
        );
      }
      limit(t) {
        return ((this.query.limit = t), this);
      }
      sort(t) {
        return ((this.query.sort_order = t), this);
      }
      days(t) {
        let e,
          r,
          { start: a, end: i } =
            ((e = new Date()),
            (r = new Date()).setDate(r.getDate() - t),
            {
              start: r.toISOString().split("T")[0],
              end: e.toISOString().split("T")[0],
            });
        return ((this.query.start_date = a), (this.query.end_date = i), this);
      }
      then(t, e) {
        return d(this.config, this.query).then(t, e);
      }
    },
    V = class extends L {
      constructor(t) {
        (super(t, "", "", ""), (this.query.sort_by = "bandwidth"));
      }
      updateConfig(t) {
        this.config = t;
      }
      customDates(t, e) {
        return (
          t && (this.query.start_date = t),
          e && (this.query.end_date = e),
          this
        );
      }
      from(t) {
        return ((this.query.gateway_domain = t), this);
      }
    },
    Q = class {
      constructor(t, e) {
        ((this.requestCount = 0),
          (this.lastRequestTime = 0),
          (this.MAX_REQUESTS_PER_MINUTE = 30),
          (this.MINUTE_IN_MS = 6e4),
          (this.config = t),
          (this.query = e));
      }
      cid(t) {
        return ((this.query.cid = t), this);
      }
      fileName(t) {
        return ((this.query.file_name = t), this);
      }
      userAgent(t) {
        return ((this.query.user_agent = t), this);
      }
      country(t) {
        return ((this.query.country = t), this);
      }
      region(t) {
        return ((this.query.region = t), this);
      }
      referer(t) {
        return ((this.query.referer = t), this);
      }
      limit(t) {
        return ((this.query.limit = t), this);
      }
      sort(t) {
        return ((this.query.sort_order = t), this);
      }
      async getAnalytics() {
        throw Error("getAnalytics method must be implemented in derived class");
      }
      then(t, e) {
        return this.getAnalytics().then(t, e);
      }
    },
    W = class extends L {
      constructor(t) {
        (super(t, "", "", ""), (this.query.sort_by = "requests"));
      }
      updateConfig(t) {
        this.config = t;
      }
      customDates(t, e) {
        return (
          t && (this.query.start_date = t),
          e && (this.query.end_date = e),
          this
        );
      }
      from(t) {
        return ((this.query.gateway_domain = t), this);
      }
    },
    Y = class extends Q {
      constructor(t, e, r, a, i) {
        super(t, {
          gateway_domain: e,
          start_date: r,
          end_date: a,
          date_interval: i,
        });
      }
      sortBy(t) {
        return ((this.query.sort_by = t), this);
      }
      async getAnalytics() {
        return l(this.config, this.query);
      }
      async all() {
        return this.getAnalytics();
      }
    },
    X = class {
      constructor(t, e) {
        ((this.query = {}), (this.config = t), (this.privacy = e));
      }
      name(t) {
        return ((this.query.name = t), this);
      }
      limit(t) {
        return ((this.query.limit = t), this);
      }
      isPublic(t) {
        return ((this.query.isPublic = t), this);
      }
      pageToken(t) {
        return ((this.query.pageToken = t), this);
      }
      then(t, e) {
        return this.fetchPage()
          .then((t) => ((this.nextPageToken = t.next_page_token), t))
          .then(t, e);
      }
      async fetchPage() {
        return (
          this.nextPageToken && (this.query.pageToken = this.nextPageToken),
          x(this.config, this.privacy, this.query)
        );
      }
      async *[Symbol.asyncIterator]() {
        for (;;) {
          let t = await this.fetchPage();
          for (let e of t.groups) yield e;
          if (!t.next_page_token) break;
          this.nextPageToken = t.next_page_token;
        }
      }
      async all() {
        let t = [];
        for await (let e of this) t.push(e);
        return t;
      }
    },
    Z = class {
      constructor(t) {
        this.config = c(t);
      }
      updateConfig(t) {
        this.config = t;
      }
      create(t) {
        return P(this.config, t, "public");
      }
      list() {
        return new X(this.config, "public");
      }
      get(t) {
        return S(this.config, t, "public");
      }
      addFiles(t) {
        return A(this.config, t, "public");
      }
      removeFiles(t) {
        return O(this.config, t, "public");
      }
      update(t) {
        return q(this.config, t, "public");
      }
      delete(t) {
        return v(this.config, t, "public");
      }
    },
    tt = class {
      constructor(t) {
        this.config = c(t);
      }
      updateConfig(t) {
        this.config = t;
      }
      create(t) {
        return P(this.config, t, "private");
      }
      list() {
        return new X(this.config, "private");
      }
      get(t) {
        return S(this.config, t, "private");
      }
      addFiles(t) {
        return A(this.config, t, "private");
      }
      removeFiles(t) {
        return O(this.config, t, "private");
      }
      update(t) {
        return q(this.config, t, "private");
      }
      delete(t) {
        return v(this.config, t, "private");
      }
    },
    te = class {
      constructor(t) {
        ((this.config = c(t)),
          (this.public = new Z(t)),
          (this.private = new tt(t)));
      }
      updateConfig(t) {
        this.config = t;
      }
    },
    tr = class {
      constructor(t) {
        this.config = c(t);
      }
      updateConfig(t) {
        this.config = t;
      }
      create(t) {
        return j(this.config, t);
      }
      list() {
        return new ta(this.config);
      }
      revoke(t) {
        return B(this.config, t);
      }
    },
    ta = class {
      constructor(t) {
        ((this.query = {}), (this.config = t));
      }
      offset(t) {
        return ((this.query.offset = t), this);
      }
      revoked(t) {
        return ((this.query.revoked = t), this);
      }
      limitedUse(t) {
        return ((this.query.limitedUse = t), this);
      }
      exhausted(t) {
        return ((this.query.exhausted = t), this);
      }
      name(t) {
        return ((this.query.name = t), this);
      }
      then(t, e) {
        return C(this.config, this.query).then(t, e);
      }
      async *[Symbol.asyncIterator]() {
        let t = !0,
          e = 0;
        for (; t; ) {
          this.query.offset = e;
          let r = await C(this.config, this.query);
          for (let t of r) yield t;
          0 === r.length ? (t = !1) : (e += r.length);
        }
      }
      async all() {
        let t = [];
        for await (let e of this) t.push(e);
        return t;
      }
    },
    ti = class {
      constructor(t) {
        ((this.config = c(t)),
          (this.public = new tu(t)),
          (this.private = new ts(t)));
      }
      updateConfig(t) {
        this.config = t;
      }
    },
    tn = class {
      constructor(t, e) {
        ((this.imgOpts = {}), (this.config = t), (this.urlOpts = e));
      }
      optimizeImage(t) {
        return ((this.imgOpts = { ...this.imgOpts, ...t }), this);
      }
      then(t, e) {
        return U(this.config, this.urlOpts, this.imgOpts).then(t, e);
      }
    },
    to = class {
      constructor(t, e, r) {
        ((this.options = {}),
          (this.config = t),
          (this.cid = e),
          (this.gatewayType = r));
      }
      optimizeImage(t) {
        return ((this.options = { ...this.options, ...t }), this);
      }
      then(t, e) {
        return E(this.config, this.cid, this.gatewayType, this.options).then(
          t,
          e,
        );
      }
    },
    ts = class {
      constructor(t) {
        this.config = t;
      }
      get(t) {
        return new to(this.config, t, "files");
      }
      createAccessLink(t) {
        return new tn(this.config, t);
      }
    },
    tu = class {
      constructor(t) {
        this.config = t;
      }
      get(t) {
        return new to(this.config, t, "ipfs");
      }
      convert(t, e) {
        return H(this.config, t, e);
      }
    },
    tc = async (t, e, o) => {
      let s;
      if (!t) throw new n("Pinata configuration is missing");
      s =
        t.customHeaders && Object.keys(t.customHeaders).length > 0
          ? {
              Authorization: `Bearer ${t.pinataJwt}`,
              "Content-Type": "application/json",
              ...t.customHeaders,
            }
          : {
              Authorization: `Bearer ${t.pinataJwt}`,
              "Content-Type": "application/json",
              Source: "sdk/getFile",
            };
      let u = "https://api.pinata.cloud/v3";
      t.endpointUrl && (u = t.endpointUrl);
      try {
        let t = await fetch(`${u}/files/${o}/${e}`, {
          method: "GET",
          headers: s,
        });
        if (!t.ok) {
          let e = await t.text();
          if (401 === t.status || 403 === t.status)
            throw new i(`Authentication failed: ${e}`, t.status, {
              error: e,
              code: "AUTH_ERROR",
              metadata: { requestUrl: t.url },
            });
          throw new a(`HTTP error: ${e}`, t.status, {
            error: e,
            code: "HTTP_ERROR",
            metadata: { requestUrl: t.url },
          });
        }
        return (await t.json()).data;
      } catch (t) {
        if (t instanceof r) throw t;
        if (t instanceof Error)
          throw new r(`Error processing getGroup: ${t.message}`);
        throw new r("An unknown error occurred while getting info for a group");
      }
    },
    tl = class {
      constructor(t, e) {
        ((this.query = {}), (this.config = t), (this.privacy = e));
      }
      name(t) {
        return ((this.query.name = t), this);
      }
      group(t) {
        return ((this.query.group = t), this);
      }
      cid(t) {
        return ((this.query.cid = t), this);
      }
      mimeType(t) {
        return ((this.query.mimeType = t), this);
      }
      order(t) {
        return ((this.query.order = t), this);
      }
      limit(t) {
        return ((this.query.limit = t), this);
      }
      cidPending(t) {
        return ((this.query.cidPending = t), this);
      }
      keyvalues(t) {
        return ((this.query.metadata = t), this);
      }
      noGroup(t) {
        return ((this.query.noGroup = t), this);
      }
      pageToken(t) {
        return ((this.query.pageToken = t), this);
      }
      then(t, e) {
        return this.fetchPage().then(t, e);
      }
      async fetchPage() {
        this.currentPageToken && (this.query.pageToken = this.currentPageToken);
        let t = await m(this.config, this.privacy, this.query);
        return ((this.currentPageToken = t.next_page_token), t);
      }
      async *[Symbol.asyncIterator]() {
        for (;;) {
          for (let t of (await this.fetchPage()).files) yield t;
          if (!this.currentPageToken) break;
        }
      }
      async all() {
        let t = [];
        for await (let e of this) t.push(e);
        return t;
      }
    },
    td = class {
      constructor(t) {
        ((this.query = {}),
          (this.requestCount = 0),
          (this.lastRequestTime = 0),
          (this.MAX_REQUESTS_PER_MINUTE = 30),
          (this.MINUTE_IN_MS = 6e4),
          (this.config = t));
      }
      cid(t) {
        return ((this.query.cid = t), this);
      }
      status(t) {
        return ((this.query.status = t), this);
      }
      pageLimit(t) {
        return ((this.query.limit = t), this);
      }
      pageToken(t) {
        return ((this.query.pageToken = t), this);
      }
      async fetchPage() {
        this.currentPageToken && (this.query.pageToken = this.currentPageToken);
        let t = await b(this.config, this.query);
        return ((this.currentPageToken = t.next_page_token), t);
      }
      sort(t) {
        return ((this.query.sort = t), this);
      }
      then(t, e) {
        return b(this.config, this.query).then(t, e);
      }
      async rateLimit() {
        this.requestCount++;
        let t = Date.now();
        if (this.requestCount >= this.MAX_REQUESTS_PER_MINUTE) {
          let e = t - this.lastRequestTime;
          if (e < this.MINUTE_IN_MS) {
            let t = this.MINUTE_IN_MS - e;
            await new Promise((e) => setTimeout(e, t));
          }
          this.requestCount = 0;
        }
        this.lastRequestTime = Date.now();
      }
      async *[Symbol.asyncIterator]() {
        for (;;) {
          for (let t of (await this.fetchPage()).jobs) yield t;
          if (!this.currentPageToken) break;
        }
      }
      async all() {
        let t = [];
        for await (let e of this) t.push(e);
        return t;
      }
    },
    th = class {
      constructor(t) {
        this.config = c(t);
      }
      list() {
        return new tl(this.config, "public");
      }
      get(t) {
        return tc(this.config, t, "public");
      }
      delete(t) {
        return w(this.config, t, "public");
      }
      update(t) {
        return k(this.config, t, "public");
      }
      addSwap(t) {
        return y(this.config, t, "public");
      }
      getSwapHistory(t) {
        return T(this.config, t, "public");
      }
      deleteSwap(t) {
        return g(this.config, t, "public");
      }
      queue() {
        return new td(this.config);
      }
      deletePinRequest(t) {
        return _(this.config, t);
      }
    },
    tp = class {
      constructor(t) {
        this.config = c(t);
      }
      list() {
        return new tl(this.config, "private");
      }
      get(t) {
        return tc(this.config, t, "private");
      }
      delete(t) {
        return w(this.config, t, "private");
      }
      update(t) {
        return k(this.config, t, "private");
      }
      addSwap(t) {
        return y(this.config, t, "private");
      }
      getSwapHistory(t) {
        return T(this.config, t, "private");
      }
      deleteSwap(t) {
        return g(this.config, t, "private");
      }
      vectorize(t) {
        return $(this.config, t);
      }
      queryVectors(t) {
        return R(this.config, t);
      }
      deleteVectors(t) {
        return f(this.config, t);
      }
    },
    tw = class {
      constructor(t) {
        ((this.config = c(t)),
          (this.public = new th(t)),
          (this.private = new tp(t)));
      }
      updateConfig(t) {
        this.config = t;
      }
    },
    tf = class {
      constructor(t, e, ...r) {
        ((this.metadata = {}),
          (this.config = t),
          (this.uploadFunction = e),
          (this.args = r));
      }
      name(t) {
        return (
          this.metadata || (this.metadata = {}),
          (this.metadata.name = t),
          this
        );
      }
      keyvalues(t) {
        return (
          this.metadata || (this.metadata = {}),
          (this.metadata.keyvalues = t),
          this
        );
      }
      key(t) {
        return ((this.keys = t), this);
      }
      vectorize() {
        return ((this.vector = !0), this);
      }
      url(t) {
        return ((this.uploadUrl = t), this);
      }
      cidVersion(t) {
        return ((this._cidVersion = t), this);
      }
      group(t) {
        return ((this.groupId = t), this);
      }
      streamable() {
        return ((this.isStreamable = !0), this);
      }
      car() {
        return ((this.carFormat = !0), this);
      }
      peerAddress(t) {
        return ((this.peerAddresses = t), this);
      }
      then(t, e) {
        let r = this.args[this.args.length - 1] || {};
        return (
          this.metadata && (r.metadata = this.metadata),
          this.keys && (r.keys = this.keys),
          this.groupId && (r.groupId = this.groupId),
          this.vector && (r.vectorize = this.vector),
          this.uploadUrl && (r.url = this.uploadUrl),
          this.isStreamable && (r.streamable = this.isStreamable),
          this.peerAddresses && (r.peerAddresses = this.peerAddresses),
          this.carFormat && (r.car = this.carFormat),
          void 0 !== this._cidVersion && (r.cid_version = this._cidVersion),
          (this.args[this.args.length - 1] = r),
          this.uploadFunction(this.config, ...this.args).then(t, e)
        );
      }
    },
    tg = class {
      constructor(t) {
        this.config = c(t);
      }
      updateConfig(t) {
        this.config = t;
      }
      file(t, e) {
        return new tf(this.config, (t, e, r) => M(t, e, "public", r), t, e);
      }
      fileArray(t, e) {
        return new tf(this.config, (t, e, r) => N(t, e, "public", r), t, e);
      }
      base64(t, e) {
        return new tf(this.config, (t, e, r) => J(t, e, "public", r), t, e);
      }
      url(t, e) {
        return new tf(this.config, (t, e, r) => F(t, e, "public", r), t, e);
      }
      json(t, e) {
        return new tf(this.config, (t, e, r) => D(t, e, "public", r), t, e);
      }
      cid(t, e) {
        return new tf(this.config, (t, e, r) => G(t, e, r), t, e);
      }
      createSignedURL(t) {
        return I(this.config, t, "public");
      }
    },
    tm = class {
      constructor(t) {
        this.config = c(t);
      }
      updateConfig(t) {
        this.config = t;
      }
      file(t, e) {
        return new tf(this.config, (t, e, r) => M(t, e, "private", r), t, e);
      }
      base64(t, e) {
        return new tf(this.config, (t, e, r) => J(t, e, "private", r), t, e);
      }
      url(t, e) {
        return new tf(this.config, (t, e, r) => F(t, e, "private", r), t, e);
      }
      json(t, e) {
        return new tf(this.config, (t, e, r) => D(t, e, "private", r), t, e);
      }
      createSignedURL(t) {
        return I(this.config, t, "private");
      }
    },
    ty = class {
      constructor(t) {
        ((this.config = c(t)),
          (this.public = new tg(t)),
          (this.private = new tm(t)));
      }
      updateConfig(t) {
        this.config = t;
      }
    },
    tT = async (t, e, o) => {
      let s;
      if (!t) throw new n("Pinata configuration is missing");
      let u = JSON.stringify({ signature: e.signature, address: e.address });
      s =
        t.customHeaders && Object.keys(t.customHeaders).length > 0
          ? { ...t.customHeaders }
          : {
              Authorization: `Bearer ${t.pinataJwt}`,
              "Content-Type": "application/json",
              Source: "sdk/addSignature",
            };
      let c = "https://api.pinata.cloud/v3";
      t.endpointUrl && (c = t.endpointUrl);
      try {
        let t = await fetch(`${c}/files/${o}/signature/${e.cid}`, {
          method: "POST",
          headers: s,
          body: u,
        });
        if (!t.ok) {
          let e = await t.text();
          if (401 === t.status || 403 === t.status)
            throw new i(`Authentication failed: ${e}`, t.status, {
              error: e,
              code: "AUTH_ERROR",
              metadata: { requestUrl: t.url },
            });
          if (403 === t.status)
            throw new r(
              "Unauthorized signing, you must be the original owner of the file and it must not have a signature",
              t.status,
              { error: e, code: "HTTP_ERROR", metadata: { requestUrl: t.url } },
            );
          throw new a(`HTTP error: ${e}`, t.status, {
            error: e,
            code: "HTTP_ERROR",
            metadata: { requestUrl: t.url },
          });
        }
        return (await t.json()).data;
      } catch (t) {
        if (t instanceof r) throw t;
        if (t instanceof Error)
          throw new r(`Error processing addSignature: ${t.message}`);
        throw new r("An unknown error occurred while adding signature to CID");
      }
    },
    tk = async (t, e, o) => {
      let s;
      if (!t) throw new n("Pinata configuration is missing");
      s =
        t.customHeaders && Object.keys(t.customHeaders).length > 0
          ? { ...t.customHeaders }
          : {
              Authorization: `Bearer ${t.pinataJwt}`,
              "Content-Type": "application/json",
              Source: "sdk/getSignature",
            };
      let u = "https://api.pinata.cloud/v3";
      t.endpointUrl && (u = t.endpointUrl);
      try {
        let t = await fetch(`${u}/files/${o}/signature/${e}`, {
          method: "GET",
          headers: s,
        });
        if (!t.ok) {
          let e = await t.text();
          if (401 === t.status || 403 === t.status)
            throw new i(`Authentication failed: ${e}`, t.status, {
              error: e,
              code: "AUTH_ERROR",
              metadata: { requestUrl: t.url },
            });
          throw new a(`HTTP error: ${e}`, t.status, {
            error: e,
            code: "HTTP_ERROR",
            metadata: { requestUrl: t.url },
          });
        }
        return (await t.json()).data;
      } catch (t) {
        if (t instanceof r) throw t;
        if (t instanceof Error)
          throw new r(`Error processing getSignature: ${t.message}`);
        throw new r(
          "An unknown error occurred while fetching signature for CID",
        );
      }
    },
    t$ = async (t, e, o) => {
      let s;
      if (!t) throw new n("Pinata configuration is missing");
      s =
        t.customHeaders && Object.keys(t.customHeaders).length > 0
          ? { ...t.customHeaders }
          : {
              Authorization: `Bearer ${t.pinataJwt}`,
              "Content-Type": "application/json",
              Source: "sdk/removeSignature",
            };
      let u = "https://api.pinata.cloud/v3";
      t.endpointUrl && (u = t.endpointUrl);
      try {
        let t = await fetch(`${u}/files/${o}/signature/${e}`, {
          method: "DELETE",
          headers: s,
        });
        if (!t.ok) {
          let e = await t.text();
          if (401 === t.status || 403 === t.status)
            throw new i(`Authentication failed: ${e}`, t.status, {
              error: e,
              code: "AUTH_ERROR",
              metadata: { requestUrl: t.url },
            });
          throw new a(`HTTP error: ${e}`, t.status, {
            error: e,
            code: "HTTP_ERROR",
            metadata: { requestUrl: t.url },
          });
        }
        return "OK";
      } catch (t) {
        if (t instanceof r) throw t;
        if (t instanceof Error)
          throw new r(`Error processing addSignature: ${t.message}`);
        throw new r("An unknown error occurred while adding signature to CID");
      }
    },
    tR = class {
      constructor(t) {
        this.config = c(t);
      }
      updateConfig(t) {
        this.config = t;
      }
      add(t) {
        return tT(this.config, t, "public");
      }
      get(t) {
        return tk(this.config, t, "public");
      }
      delete(t) {
        return t$(this.config, t, "public");
      }
    },
    tb = class {
      constructor(t) {
        ((this.config = c(t)), (this.public = new tR(t)));
      }
      updateConfig(t) {
        this.config = t;
      }
    },
    t_ = class {
      constructor(t) {
        ((this.config = c(t)),
          (this.files = new tw(this.config)),
          (this.upload = new ty(this.config)),
          (this.gateways = new ti(this.config)),
          (this.keys = new tr(this.config)),
          (this.groups = new te(this.config)),
          (this.analytics = new K(this.config)),
          (this.signatures = new tb(this.config)));
      }
      setNewHeaders(t) {
        (this.config || (this.config = { pinataJwt: "", customHeaders: {} }),
          (this.config.customHeaders = { ...this.config.customHeaders, ...t }),
          this.files.updateConfig(this.config),
          this.upload.updateConfig(this.config),
          this.gateways.updateConfig(this.config),
          this.keys.updateConfig(this.config),
          this.groups.updateConfig(this.config),
          this.analytics.updateConfig(this.config),
          this.signatures.updateConfig(this.config));
      }
      setNewJwt(t) {
        (this.config || (this.config = { pinataJwt: "" }),
          (this.config.pinataJwt = t),
          this.files.updateConfig(this.config),
          this.upload.updateConfig(this.config),
          this.gateways.updateConfig(this.config),
          this.keys.updateConfig(this.config),
          this.groups.updateConfig(this.config),
          this.analytics.updateConfig(this.config),
          this.signatures.updateConfig(this.config));
      }
      testAuthentication() {
        return h(this.config);
      }
    },
    tE = t.i(759257),
    tH = t.i(54567);
  let tU = new t_({ pinataGateway: "https://pump.mypinata.cloud/ipfs/" }),
    tA = async () => {
      let { presignedUri: t } = await (0, tE.j)()(
        "GET /ipfs/pinata-presigned",
        { credentials: "include" },
      );
      return t;
    },
    tP = async (t) => {
      try {
        let e = await tA();
        return await tU.upload.public.file(t).url(e);
      } catch (t) {
        throw (
          tH.logger.error("[pinataUpload] Error during upload:", { error: t }),
          t
        );
      }
    },
    tv = async (t) => {
      try {
        let e = await tA(),
          r = await tU.upload.public.json(t).url(e);
        return { metadata: t, metadataUri: `https://ipfs.io/ipfs/${r.cid}` };
      } catch (t) {
        throw (
          tH.logger.error("[uploadMetadata] Error during upload:", {
            error: t,
          }),
          t
        );
      }
    };
  t.s(["w", 0, tP, "o", 0, tv], 729047);
};
