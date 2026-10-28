// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(292686),
    r = e.i(886813),
    n = e.i(426091),
    o = e.i(192);
  let i = "pump-visitor-id",
    s = "pump_session_data";
  function a() {
    try {
      let e = "__storage_test__";
      return (localStorage.setItem(e, "test"), localStorage.removeItem(e), !0);
    } catch (e) {
      return (console.debug("localStorage not available:", e), !1);
    }
  }
  function l() {
    try {
      let e = "__storage_test__";
      return (
        sessionStorage.setItem(e, "test"),
        sessionStorage.removeItem(e),
        !0
      );
    } catch (e) {
      return (console.debug("sessionStorage not available:", e), !1);
    }
  }
  let u = "terminal",
    c = ["utm_source", "ref", "via"],
    d = new Set(["terminal", "padre"]),
    f = "pump-session-attribution";
  async function p() {
    if ("u" > typeof navigator) {
      let e = navigator;
      if (e.userAgentData)
        try {
          let t = e.userAgentData,
            r = await t.getHighEntropyValues([
              "platform",
              "platformVersion",
              "uaFullVersion",
              "architecture",
              "model",
            ]),
            n = (t.brands || [])[0],
            o = n?.brand || "Unknown",
            i = r.uaFullVersion || n?.version || "Unknown",
            s = "Unknown",
            a = (r.platform || t.platform || "").toLowerCase(),
            l = r.platformVersion || "";
          a.includes("win")
            ? ((s = "Windows"),
              l &&
                (l.startsWith("10.0") || l.startsWith("11.0")) &&
                (s = "Windows 10/11"))
            : a.includes("mac")
              ? ((s = "macOS"), l && (s = `macOS ${l}`))
              : a.includes("linux")
                ? (s = "Linux")
                : a.includes("android")
                  ? ((s = "Android"), l && (s = `Android ${l}`))
                  : (a.includes("iphone") || a.includes("ipad")) &&
                    ((s = "iOS"), l && (s = `iOS ${l}`));
          let u = "Desktop";
          return (
            t.mobile &&
              (u =
                a.includes("ipad") ||
                (r.model && r.model.toLowerCase().includes("ipad"))
                  ? "Tablet"
                  : "Mobile"),
            {
              browser: o.charAt(0).toUpperCase() + o.slice(1),
              browserVersion: i,
              operatingSystem: s,
              device: u,
            }
          );
        } catch (e) {
          console.warn(
            "User-Agent Client Hints API failed, falling back to UA parsing",
            e,
          );
        }
    }
    return (function (e) {
      let t = e.toLowerCase(),
        r = "Unknown",
        n = "Desktop",
        o = t.includes("iphone") || t.includes("ipad"),
        i = t.includes("android");
      if (o) {
        ((n = t.includes("ipad") ? "Tablet" : "Mobile"), (r = "iOS"));
        let e = t.match(/os ([0-9_]+)/);
        if (e) {
          let t = e[1].replace(/_/g, ".");
          r = `iOS ${t}`;
        }
      } else if (i) {
        ((n = "Mobile"), (r = "Android"));
        let e = t.match(/android ([0-9.]+)/);
        e && (r = `Android ${e[1]}`);
      } else if (t.includes("windows"))
        ((r = "Windows"),
          t.includes("windows nt 10.0")
            ? (r = "Windows 10/11")
            : t.includes("windows nt 6.3")
              ? (r = "Windows 8.1")
              : t.includes("windows nt 6.2")
                ? (r = "Windows 8")
                : t.includes("windows nt 6.1") && (r = "Windows 7"));
      else if (t.includes("mac os x") || t.includes("macos")) {
        r = "macOS";
        let e = t.match(/mac os x ([0-9_]+)/);
        if (e) {
          let t = e[1].replace(/_/g, ".");
          r = `macOS ${t}`;
        }
      } else t.includes("linux") && (r = "Linux");
      let s = "Unknown",
        a = "Unknown";
      if (!t.includes("chrome") || t.includes("edg") || t.includes("crios")) {
        if (t.includes("crios")) {
          s = "Chrome";
          let e = t.match(/crios\/([0-9.]+)/);
          a = e ? e[1] : "Unknown";
        } else if (t.includes("firefox")) {
          s = "Firefox";
          let e = t.match(/firefox\/([0-9.]+)/);
          a = e ? e[1] : "Unknown";
        } else if (t.includes("fxios")) {
          s = "Firefox";
          let e = t.match(/fxios\/([0-9.]+)/);
          a = e ? e[1] : "Unknown";
        } else if (t.includes("edg")) {
          s = "Edge";
          let e = t.match(/edg\/([0-9.]+)/);
          a = e ? e[1] : "Unknown";
        } else if (t.includes("edgios")) {
          s = "Edge";
          let e = t.match(/edgios\/([0-9.]+)/);
          a = e ? e[1] : "Unknown";
        } else if (t.includes("opera") || t.includes("opr")) {
          s = "Opera";
          let e = t.match(/(?:opera|opr)\/([0-9.]+)/);
          a = e ? e[1] : "Unknown";
        } else if (
          t.includes("safari") &&
          !t.includes("chrome") &&
          !t.includes("crios")
        )
          if (((s = "Safari"), o)) {
            let e = t.match(/version\/([0-9.]+)/);
            a = e ? e[1] : "Unknown";
          } else {
            let e = t.match(/version\/([0-9.]+)/);
            a = e ? e[1] : "Unknown";
          }
      } else {
        s = "Chrome";
        let e = t.match(/chrome\/([0-9.]+)/);
        a = e ? e[1] : "Unknown";
      }
      return { browser: s, browserVersion: a, operatingSystem: r, device: n };
    })("u" > typeof navigator ? navigator.userAgent : "");
  }
  let h = {
    privy: t.A2.PRIVY,
    phantom: t.A2.PHANTOM,
    solflare: t.A2.SOLFLARE,
    torus: t.A2.TORUS,
    "magic eden": t.A2.MAGIC_EDEN,
    ledger: t.A2.LEDGER,
    mathwallet: t.A2.MATHWALLET,
    tokenpocket: t.A2.TOKENPOCKET,
    "coinbase wallet": t.A2.COINBASE_WALLET,
    solong: t.A2.SOLONG,
    coin98: t.A2.COIN98,
    safepal: t.A2.SAFEPAL,
    bitpie: t.A2.BITPIE,
    bitget: t.A2.BITGET,
    "bitget wallet": t.A2.BITGET,
    clover: t.A2.CLOVER,
    coinhub: t.A2.COINHUB,
    walletconnect: t.A2.WALLETCONNECT,
  };
  e.s([
    "w",
    0,
    function () {
      let e = (function (e, t, r) {
        try {
          return ("local" === e ? localStorage : sessionStorage).getItem(t);
        } catch (e) {
          return (console.warn(r, e), null);
        }
      })(
        "local",
        i,
        "localStorage access failed for visitor ID, generating new ID",
      );
      if (e) return e;
      let t = (0, r.C)("visitor");
      try {
        localStorage.setItem(i, t);
      } catch (e) {
        console.warn("Failed to persist visitor ID to localStorage", e);
      }
      return t;
    },
    "z",
    0,
    function () {
      let e,
        r = (function () {
          if (!l()) return null;
          try {
            let e = sessionStorage.getItem(f);
            if (!e) return null;
            return JSON.parse(e);
          } catch (e) {
            return (
              console.warn(
                "Failed to read session attribution from storage",
                e,
              ),
              null
            );
          }
        })();
      if (r) return r;
      let n = document.referrer || "",
        o = window.location.href,
        i = t.a6.HOME_SCREEN;
      if (n)
        try {
          let e = new URL(n).origin;
          e && e !== window.location.origin && (i = t.a6.DEEPLINK);
        } catch {
          i = t.a6.DEEPLINK;
        }
      let s =
        (function (e) {
          if (!e) return null;
          try {
            let t = new URL(e).hostname.toLowerCase();
            if (
              !(
                "terminal.pump.fun" === t ||
                "padre.gg" === t ||
                t.endsWith(".padre.gg")
              )
            )
              return null;
            return { mediaSource: u, referralLink: e };
          } catch {
            return null;
          }
        })(n) ??
        (function (e) {
          if (!e) return null;
          try {
            let { searchParams: t } = new URL(e);
            for (let r of c) {
              let n = t.get(r)?.trim().toLowerCase();
              if (n && d.has(n)) return { mediaSource: u, referralLink: e };
            }
            return null;
          } catch {
            return null;
          }
        })(o);
      s && (i = t.a6.DEEPLINK);
      let a = (function (e) {
          try {
            return new URL(e).searchParams;
          } catch {
            return null;
          }
        })(o),
        p = a?.get("utm_source")?.trim(),
        h = a?.get("utm_campaign")?.trim();
      (p && (i = t.a6.DEEPLINK),
        a?.get("source") === "notification" && (i = t.a6.NOTIFICATION),
        i === t.a6.DEEPLINK &&
          ((e = { initialUrl: o }),
          s
            ? ((e.mediaSource = s.mediaSource), (e.afDp = s.referralLink))
            : p && (e.mediaSource = p),
          h && (e.campaign = h)));
      let g = {
        appIconVariant: "default",
        attribution: i,
        deeplinkAttribution: e,
        previousSessionJsCrash: !1,
        previousSessionJsCrashCount: 0,
        previousSessionNativeCrash: !1,
      };
      if (l())
        try {
          sessionStorage.setItem(f, JSON.stringify(g));
        } catch (e) {
          console.warn("Failed to persist session attribution", e);
        }
      return g;
    },
    "d",
    0,
    function () {
      let e = (0, o.r)();
      if (!a()) return e;
      try {
        let t = (function () {
          try {
            let e = localStorage.getItem(s);
            if (!e) return null;
            let t = JSON.parse(e);
            if (
              !t ||
              "string" != typeof t.pump_session_id ||
              "number" != typeof t.pump_session_start_time ||
              Date.now() - t.pump_session_start_time > 864e5
            )
              return null;
            return {
              pump_session_id: t.pump_session_id,
              pump_session_start_time: t.pump_session_start_time,
              navigation_history: Array.isArray(t.navigation_history)
                ? t.navigation_history
                : [],
            };
          } catch (e) {
            return (
              console.warn(
                "Failed to read session data from localStorage, using fallback",
                e,
              ),
              null
            );
          }
        })();
        return (
          t?.pump_session_id !== e &&
            (function (e) {
              try {
                localStorage.setItem(s, JSON.stringify(e));
              } catch (e) {
                console.warn(
                  "Failed to persist session data to localStorage, using fallback",
                  e,
                );
              }
            })({
              pump_session_id: e,
              pump_session_start_time: (0, o.l)(e) ?? Date.now(),
              navigation_history: [],
            }),
          e
        );
      } catch (t) {
        return (
          console.warn(
            "localStorage access failed for session ID, using cookie id",
            t,
          ),
          e
        );
      }
    },
    "l",
    0,
    function () {
      return (0, o.l)((0, o.r)()) ?? Date.now();
    },
    "c",
    0,
    p,
    "P",
    0,
    function () {
      let e = (0, n.Y)()?.toLowerCase();
      return e ? (h[e] ?? t.A2.UNSPECIFIED) : t.A2.UNSPECIFIED;
    },
    "V",
    0,
    a,
    "H",
    0,
    l,
  ]);
};
