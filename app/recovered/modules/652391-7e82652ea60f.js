// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t) => {
  "use strict";
  let e = /\r?\n|\r/gm;
  class i {
    writable;
    readable;
    constructor(t) {
      let e = new r(t);
      ((this.writable = new WritableStream({
        write(t) {
          e.transform(t);
        },
        close() {
          e.close();
        },
      })),
        (this.readable = new ReadableStream({
          start(t) {
            ((e.onLine = (e) => t.enqueue(e)), (e.onClose = () => t.close()));
          },
        })));
    }
  }
  class r {
    a = "";
    b;
    onLine;
    onClose;
    constructor(t) {
      this.b = new TextDecoder(t);
    }
    transform(t) {
      this.a += this.b.decode(t, { stream: !0 });
      let i = this.a.split(e);
      this.a = i.pop() || "";
      for (let t = 0; t < i.length; t++) this.onLine(i[t].trim());
    }
    close() {
      (this.a && this.onLine(this.a.trim()), (this.a = ""), this.onClose());
    }
  }
  async function s(t, i) {
    return n(
      new ReadableStream({
        start(i) {
          for (let r of t.split(e)) i.enqueue(r);
          i.close();
        },
      }),
      i,
    );
  }
  async function n(e, i) {
    let r,
      s,
      n = i?.type ?? "vtt";
    if ("string" == typeof n)
      switch (n) {
        case "srt":
          r = (await t.A(734270)).default;
          break;
        case "ssa":
        case "ass":
          r = (await t.A(295170)).default;
          break;
        default:
          r = (
            await Promise.resolve().then(function () {
              return N;
            })
          ).default;
      }
    else r = n;
    let l = e.getReader(),
      a = r(),
      o = !!i?.strict || !!i?.errors;
    await a.init({
      strict: !1,
      ...i,
      errors: o,
      type: n,
      cancel() {
        (l.cancel(), (s = a.done(!0)));
      },
    });
    let h = 1;
    for (;;) {
      let { value: t, done: e } = await l.read();
      if (e) {
        (a.parse("", h), (s = a.done(!1)));
        break;
      }
      (a.parse(t, h), h++);
    }
    return s;
  }
  async function l(t, e) {
    let i = await t;
    if (!i.ok || !i.body)
      return { metadata: {}, cues: [], regions: [], errors: [void 0] };
    let r = i.headers.get("content-type") || "",
      s = r.match(/text\/(.*?)(?:;|$)/)?.[1],
      n = r.match(/charset=(.*?)(?:;|$)/)?.[1];
    return a(i.body, { type: s, encoding: n, ...e });
  }
  async function a(t, { encoding: e = "utf-8", ...r } = {}) {
    return n(t.pipeThrough(new i(e)), r);
  }
  class o extends EventTarget {
    id = "";
    startTime;
    endTime;
    text;
    pauseOnExit = !1;
    constructor(t, e, i) {
      (super(), (this.startTime = t), (this.endTime = e), (this.text = i));
    }
    addEventListener(t, e, i) {
      super.addEventListener(t, e, i);
    }
    removeEventListener(t, e, i) {
      super.removeEventListener(t, e, i);
    }
  }
  let h = "u" < typeof document,
    c = h ? o : window.VTTCue;
  class u extends c {
    region = null;
    vertical = "";
    snapToLines = !0;
    line = "auto";
    lineAlign = "start";
    position = "auto";
    positionAlign = "auto";
    size = 100;
    align = "center";
    style;
  }
  class d {
    id = "";
    width = 100;
    lines = 3;
    regionAnchorX = 0;
    regionAnchorY = 100;
    viewportAnchorX = 0;
    viewportAnchorY = 100;
    scroll = "";
  }
  function f(t) {
    let e = parseInt(t.replace("%", ""), 10);
    return !Number.isNaN(e) && e >= 0 && e <= 100 ? e : null;
  }
  function p(t) {
    if (!t.includes(",")) return null;
    let [e, i] = t.split(",").map(f);
    return null !== e && null !== i ? [e, i] : null;
  }
  let g = /[:=]/,
    m = /^[\s\t]*(region|vertical|line|position|size|align)[:=]/,
    b = /^REGION:?[\s\t]+/,
    w = /[\s\t]+/,
    v = /[\s\t]*-->[\s\t]+/,
    y = /start|center|end|left|right/,
    T = /start|center|end/,
    k = /line-(?:left|right)|center|auto/,
    x = /^(?:(\d{1,2}):)?(\d{2}):(\d{2})(?:\.(\d{1,3}))?$/;
  var A,
    C =
      (((A = C || {})[(A.None = 0)] = "None"),
      (A[(A.Header = 1)] = "Header"),
      (A[(A.Cue = 2)] = "Cue"),
      (A[(A.Region = 3)] = "Region"),
      (A[(A.Note = 4)] = "Note"),
      A);
  class E {
    h;
    e = 0;
    i = {};
    j = {};
    l = [];
    c = null;
    d = null;
    m = [];
    f;
    n = "";
    async init(e) {
      ((this.h = e),
        e.strict && (this.e = 1),
        e.errors && (this.f = (await t.A(409079)).ParseErrorBuilder));
    }
    parse(t, e) {
      if ("" === t)
        (this.c
          ? (this.l.push(this.c), this.h.onCue?.(this.c), (this.c = null))
          : this.d
            ? ((this.j[this.d.id] = this.d),
              this.h.onRegion?.(this.d),
              (this.d = null))
            : 1 === this.e && (this.k(t, e), this.h.onHeaderMetadata?.(this.i)),
          (this.e = 0));
      else if (this.e)
        switch (this.e) {
          case 1:
            this.k(t, e);
            break;
          case 2:
            if (this.c) {
              let i = this.c.text.length > 0;
              !i && m.test(t)
                ? this.o(t.split(w), e)
                : (this.c.text += (i ? "\n" : "") + t);
            }
            break;
          case 3:
            this.p(t.split(w), e);
        }
      else if (t.startsWith("NOTE")) this.e = 4;
      else if (t.startsWith("REGION"))
        ((this.e = 3),
          (this.d = new d()),
          this.p(t.replace(b, "").split(w), e));
      else if (t.includes("-->")) {
        let i = this.q(t, e);
        (i &&
          ((this.c = new u(i[0], i[1], "")),
          (this.c.id = this.n),
          this.o(i[2], e)),
          (this.e = 2));
      } else 1 === e && this.k(t, e);
      this.n = t;
    }
    done() {
      return {
        metadata: this.i,
        cues: this.l,
        regions: Object.values(this.j),
        errors: this.m,
      };
    }
    k(t, e) {
      if (e > 1) {
        if (g.test(t)) {
          let [e, i] = t.split(g);
          e && (this.i[e] = (i || "").replace(w, ""));
        }
      } else t.startsWith("WEBVTT") ? (this.e = 1) : this.g(this.f?.r());
    }
    q(t, e) {
      let [i, r = ""] = t.split(v),
        [s, ...n] = r.split(w),
        l = j(i),
        a = j(s);
      if (null !== l && null !== a && a > l) return [l, a, n];
      (null === l && this.g(this.f?.s(i, e)),
        null === a && this.g(this.f?.t(s, e)),
        null != l && null !== a && a > l && this.g(this.f?.u(l, a, e)));
    }
    p(t, e) {
      let i;
      for (let r = 0; r < t.length; r++)
        if (g.test(t[r])) {
          i = !1;
          let [s, n] = t[r].split(g);
          switch (s) {
            case "id":
              this.d.id = n;
              break;
            case "width":
              let l = f(n);
              null !== l ? (this.d.width = l) : (i = !0);
              break;
            case "lines":
              let a = (function (t) {
                let e = parseInt(t, 10);
                return Number.isNaN(e) ? null : e;
              })(n);
              null !== a ? (this.d.lines = a) : (i = !0);
              break;
            case "regionanchor":
              let o = p(n);
              null !== o
                ? ((this.d.regionAnchorX = o[0]), (this.d.regionAnchorY = o[1]))
                : (i = !0);
              break;
            case "viewportanchor":
              let h = p(n);
              null !== h
                ? ((this.d.viewportAnchorX = h[0]),
                  (this.d.viewportAnchorY = h[1]))
                : (i = !0);
              break;
            case "scroll":
              "up" === n ? (this.d.scroll = "up") : (i = !0);
              break;
            default:
              this.g(this.f?.v(s, n, e));
          }
          i && this.g(this.f?.w(s, n, e));
        }
    }
    o(t, e) {
      let i;
      for (let r = 0; r < t.length; r++)
        if (((i = !1), g.test(t[r]))) {
          let [s, n] = t[r].split(g);
          switch (s) {
            case "region":
              let l = this.j[n];
              l && (this.c.region = l);
              break;
            case "vertical":
              "lr" === n || "rl" === n
                ? ((this.c.vertical = n), (this.c.region = null))
                : (i = !0);
              break;
            case "line":
              let [a, o] = n.split(",");
              if (a.includes("%")) {
                let t = f(a);
                null !== t
                  ? ((this.c.line = t), (this.c.snapToLines = !1))
                  : (i = !0);
              } else {
                let t = (function (t) {
                  let e = parseFloat(t);
                  return Number.isNaN(e) ? null : e;
                })(a);
                null !== t ? (this.c.line = t) : (i = !0);
              }
              (T.test(o) ? (this.c.lineAlign = o) : o && (i = !0),
                "auto" !== this.c.line && (this.c.region = null));
              break;
            case "position":
              let [h, c] = n.split(","),
                u = f(h);
              (null !== u ? (this.c.position = u) : (i = !0),
                c && k.test(c) ? (this.c.positionAlign = c) : c && (i = !0));
              break;
            case "size":
              let d = f(n);
              null !== d
                ? ((this.c.size = d), d < 100 && (this.c.region = null))
                : (i = !0);
              break;
            case "align":
              y.test(n) ? (this.c.align = n) : (i = !0);
              break;
            default:
              this.g(this.f?.x(s, n, e));
          }
          i && this.g(this.f?.y(s, n, e));
        }
    }
    g(t) {
      if (t) {
        if ((this.m.push(t), this.h.strict)) throw (this.h.cancel(), t);
        this.h.onError?.(t);
      }
    }
  }
  function j(t) {
    let e = t.match(x);
    if (!e) return null;
    let i = e[1] ? parseInt(e[1], 10) : 0,
      r = parseInt(e[2], 10),
      s = parseInt(e[3], 10),
      n = e[4] ? parseInt(e[4].padEnd(3, "0"), 10) : 0;
    return i < 0 || r < 0 || s < 0 || n < 0 || r > 59 || s > 59
      ? null
      : 3600 * i + 60 * r + s + n / 1e3;
  }
  var N = Object.freeze({
    __proto__: null,
    VTTBlock: C,
    VTTParser: E,
    default: function () {
      return new E();
    },
    parseVTTTimestamp: j,
  });
  let S = /[0-9]/,
    z = /[\s\t]+/,
    L = {
      c: "span",
      i: "i",
      b: "b",
      u: "u",
      ruby: "ruby",
      rt: "rt",
      v: "span",
      lang: "span",
      timestamp: "span",
    },
    $ = {
      "&amp;": "&",
      "&lt;": "<",
      "&gt;": ">",
      "&quot;": '"',
      "&#39;": "'",
      "&nbsp;": " ",
      "&lrm;": "‎",
      "&rlm;": "‏",
    },
    M = /&(?:amp|lt|gt|quot|#(0+)?39|nbsp|lrm|rlm);/g,
    V = new Set([
      "white",
      "lime",
      "cyan",
      "red",
      "yellow",
      "magenta",
      "blue",
      "black",
    ]),
    B = new Set(Object.keys(L));
  function P(t) {
    let e = "",
      i = 1,
      r = [],
      s = [],
      n;
    for (let r = 0; r < t.text.length; r++) {
      let h = t.text[r];
      switch (i) {
        case 1:
          "<" === h ? (o(), (i = 2)) : (e += h);
          break;
        case 2:
          switch (h) {
            case "\n":
            case "	":
            case " ":
              (l(), (i = 4));
              break;
            case ".":
              (l(), (i = 3));
              break;
            case "/":
              i = 5;
              break;
            case ">":
              (l(), (i = 1));
              break;
            default:
              (!e && S.test(h) && (i = 6), (e += h));
          }
          break;
        case 3:
          switch (h) {
            case "	":
            case " ":
            case "\n":
              (a(), n && n.class?.trim(), (i = 4));
              break;
            case ".":
              a();
              break;
            case ">":
              (a(), n && n.class?.trim(), (i = 1));
              break;
            default:
              e += h;
          }
          break;
        case 4:
          ">" === h
            ? ((e = e.replace(z, " ")),
              n?.type === "v"
                ? (n.voice = R(e))
                : n?.type === "lang" && (n.lang = R(e)),
              (e = ""),
              (i = 1))
            : (e += h);
          break;
        case 5:
          ">" === h && ((e = ""), (n = s.pop()), (i = 1));
          break;
        case 6:
          if (">" === h) {
            let r = j(e);
            (null !== r &&
              r >= t.startTime &&
              r <= t.endTime &&
              ((e = "timestamp"), l(), (n.time = r)),
              (e = ""),
              (i = 1));
          } else e += h;
      }
    }
    function l() {
      if (B.has(e)) {
        var t;
        let i = n;
        ((n = { tagName: L[(t = e)], type: t, children: [] }),
          i
            ? (s[s.length - 1] !== i && s.push(i), i.children.push(n))
            : r.push(n));
      }
      ((e = ""), (i = 1));
    }
    function a() {
      if (n && e) {
        let t = e.replace("bg_", "");
        V.has(t)
          ? (n[e.startsWith("bg_") ? "bgColor" : "color"] = t)
          : (n.class = n.class ? n.class + " " + e : e);
      }
      e = "";
    }
    function o() {
      if (!e) return;
      let t = { type: "text", data: R(e) };
      (n ? n.children.push(t) : r.push(t), (e = ""));
    }
    return (1 === i && o(), r);
  }
  function R(t) {
    return t.replace(M, (t) => $[t] || "'");
  }
  function H(t, e, i) {
    t.style.setProperty(`--${e}`, i + "");
  }
  function O(t, e, i = !0) {
    t.setAttribute(`data-${e}`, !0 === i ? "" : i + "");
  }
  function q(t, e) {
    t.setAttribute("data-part", e);
  }
  function F(t, e = 0) {
    return I(P(t), e);
  }
  function I(t, e = 0) {
    let i,
      r = "";
    for (let s of t)
      if ("text" === s.type) r += s.data;
      else {
        let t = "timestamp" === s.type;
        (((i = {}).class = s.class),
          (i.title = "v" === s.type && s.voice),
          (i.lang = "lang" === s.type && s.lang),
          (i["data-part"] = "v" === s.type && "voice"),
          t &&
            ((i["data-part"] = "timed"),
            (i["data-time"] = s.time),
            (i["data-future"] = s.time > e),
            (i["data-past"] = s.time < e)),
          (i.style = `${s.color ? `color: ${s.color};` : ""}${s.bgColor ? `background-color: ${s.bgColor};` : ""}`));
        let n = Object.entries(i)
          .filter((t) => t[1])
          .map((t) => `${t[0]}="${!0 === t[1] ? "" : t[1]}"`)
          .join(" ");
        r += `<${s.tagName}${n ? " " + n : ""}>${I(s.children)}</${s.tagName}>`;
      }
    return r;
  }
  function W(t, e) {
    if (!h)
      for (let i of t.querySelectorAll('[data-part="timed"]')) {
        let t = Number(i.getAttribute("data-time"));
        Number.isNaN(t) ||
          (t > e ? O(i, "future") : i.removeAttribute("data-future"),
          t < e ? O(i, "past") : i.removeAttribute("data-past"));
      }
  }
  let _ = Symbol(0);
  function X(t) {
    return t instanceof HTMLElement
      ? {
          top: t.offsetTop,
          width: t.clientWidth,
          height: t.clientHeight,
          left: t.offsetLeft,
          right: t.offsetLeft + t.clientWidth,
          bottom: t.offsetTop + t.clientHeight,
        }
      : { ...t };
  }
  function Y(t, e, i) {
    switch (e) {
      case "+x":
        ((t.left += i), (t.right += i));
        break;
      case "-x":
        ((t.left -= i), (t.right -= i));
        break;
      case "+y":
        ((t.top += i), (t.bottom += i));
        break;
      case "-y":
        ((t.top -= i), (t.bottom -= i));
    }
  }
  function D(t, e) {
    return (
      e.top >= 0 && e.bottom <= t.height && e.left >= 0 && e.right <= t.width
    );
  }
  function G(t, e) {
    return {
      top: e.top / t.height,
      left: e.left / t.width,
      right: (t.width - e.right) / t.width,
      bottom: (t.height - e.bottom) / t.height,
    };
  }
  function K(t, e) {
    return (
      (e.top = e.top * t.height),
      (e.left = e.left * t.width),
      (e.right = t.width - e.right * t.width),
      (e.bottom = t.height - e.bottom * t.height),
      e
    );
  }
  let U = ["top", "left", "right", "bottom"];
  function J(t, e, i, r) {
    let s = G(e, i);
    for (let e of U) H(t, `${r}-${e}`, 100 * s[e] + "%");
  }
  function Q(t, e, i, r) {
    let s = 1,
      n,
      l = { ...e };
    for (let h = 0; h < r.length; h++) {
      for (
        var a, o;
        (function (t, e, i) {
          switch (i) {
            case "+x":
              return e.left < 0;
            case "-x":
              return e.right > t.width;
            case "+y":
              return e.top < 0;
            case "-y":
              return e.bottom > t.height;
          }
        })(t, e, r[h]) ||
        (D(t, e) &&
          (function (t, e) {
            for (let r = 0; r < e.length; r++) {
              var i;
              if (
                ((i = e[r]),
                t.left <= i.right &&
                  t.right >= i.left &&
                  t.top <= i.bottom &&
                  t.bottom >= i.top)
              )
                return e[r];
            }
            return null;
          })(e, i));

      )
        Y(e, r[h], 1);
      if (D(t, e)) return e;
      let c =
        ((a = t),
        (o = e),
        (Math.max(0, Math.min(a.width, o.right) - Math.max(0, o.left)) *
          Math.max(0, Math.min(a.height, o.bottom) - Math.max(0, o.top))) /
          (a.height * a.width));
      (s > c && ((n = { ...e }), (s = c)), (e = { ...l }));
    }
    return n || l;
  }
  let Z = Symbol(0),
    tt = ["-y", "+y", "-x", "+x"];
  t.s([
    "C",
    0,
    class {
      overlay;
      z;
      A = 0;
      C = "ltr";
      B = [];
      D = !1;
      E;
      j = new Map();
      l = new Map();
      get dir() {
        return this.C;
      }
      set dir(t) {
        ((this.C = t), O(this.overlay, "dir", t));
      }
      get currentTime() {
        return this.A;
      }
      set currentTime(t) {
        ((this.A = t), this.update());
      }
      constructor(t, e) {
        ((this.overlay = t),
          (this.dir = e?.dir ?? "ltr"),
          t.setAttribute("translate", "yes"),
          t.setAttribute("aria-live", "off"),
          t.setAttribute("aria-atomic", "true"),
          q(t, "captions"),
          this.G(),
          (this.E = new ResizeObserver(this.I.bind(this))),
          this.E.observe(t));
      }
      changeTrack({ regions: t, cues: e }) {
        for (let i of (this.reset(), this.J(t), e)) this.l.set(i, null);
        this.update();
      }
      addCue(t) {
        (this.l.set(t, null), this.update());
      }
      removeCue(t) {
        (this.l.delete(t), this.update());
      }
      update(t = !1) {
        this.H(t);
      }
      reset() {
        (this.l.clear(),
          this.j.clear(),
          (this.B = []),
          (this.overlay.textContent = ""));
      }
      destroy() {
        (this.reset(), this.E.disconnect());
      }
      I() {
        ((this.D = !0), this.K());
      }
      K = (function (t) {
        let e = null,
          i;
        function r() {
          (s(), t(...i), (i = void 0));
        }
        function s() {
          (clearTimeout(e), (e = null));
        }
        return function () {
          ((i = [].slice.call(arguments)), s(), (e = setTimeout(r, 50)));
        };
      })(() => {
        for (let t of ((this.D = !1), this.G(), this.j.values())) t[_] = null;
        for (let t of this.l.values()) t && (t[_] = null);
        this.H(!0);
      });
      G() {
        ((this.z = X(this.overlay)),
          H(this.overlay, "overlay-width", this.z.width + "px"),
          H(this.overlay, "overlay-height", this.z.height + "px"));
      }
      H(t = !1) {
        if (!this.l.size || this.D) return;
        let e,
          i = [...this.l.keys()]
            .filter((t) => this.A >= t.startTime && this.A <= t.endTime)
            .sort((t, e) =>
              t.startTime !== e.startTime
                ? t.startTime - e.startTime
                : t.endTime - e.endTime,
            ),
          r = i.map((t) => t.region);
        for (let s = 0; s < this.B.length; s++) {
          if (((e = this.B[s]), i[s] === e)) continue;
          if (e.region && !r.includes(e.region)) {
            let i = this.j.get(e.region.id);
            i && (i.removeAttribute("data-active"), (t = !0));
          }
          let n = this.l.get(e);
          n && (n.remove(), (t = !0));
        }
        for (let r = 0; r < i.length; r++) {
          e = i[r];
          let s = this.l.get(e);
          s || this.l.set(e, (s = this.L(e)));
          let n = this.F(e) && this.j.get(e.region.id);
          (n &&
            !n.hasAttribute("data-active") &&
            (requestAnimationFrame(() => O(n, "active")), (t = !0)),
            s.isConnected || ((n || this.overlay).append(s), (t = !0)));
        }
        if (t) {
          let t = [],
            r = new Set();
          for (let s = i.length - 1; s >= 0; s--) {
            if (((e = i[s]), r.has(e.region || e))) continue;
            let n = this.F(e),
              l = n ? this.j.get(e.region.id) : this.l.get(e);
            (n
              ? t.push(
                  (function (t, e, i, r) {
                    let s = Array.from(
                        i.querySelectorAll('[data-part="cue-display"]'),
                      ),
                      n = 0,
                      l = Math.max(0, s.length - e.lines);
                    for (let t = s.length - 1; t >= l; t--)
                      n += s[t].offsetHeight;
                    (H(i, "region-height", n + "px"),
                      i[_] || (i[_] = G(t, X(i))));
                    let a = { ...i[_] };
                    return (
                      ((a = K(t, a)).width = i.clientWidth),
                      (a.height = n),
                      (a.right = a.left + a.width),
                      (a.bottom = a.top + n),
                      (a = Q(t, a, r, tt)),
                      J(i, t, a, "region"),
                      a
                    );
                  })(this.z, e.region, l, t),
                )
              : t.push(
                  (function (t, e, i, r) {
                    let s = i.firstElementChild,
                      n = (function (t) {
                        if ("auto" === t.line)
                          if (!t.snapToLines) return 100;
                          else return -1;
                        return t.line;
                      })(e),
                      l,
                      a = [];
                    if (
                      (i[_] ||
                        (i[_] = (function (t, e) {
                          let i = X(e),
                            r = (function (t) {
                              let e = {};
                              for (let i of U)
                                e[i] = parseFloat(
                                  t.style.getPropertyValue(`--cue-${i}`),
                                );
                              return e;
                            })(e);
                          if (
                            ((e[Z] = !1),
                            r.top &&
                              ((i.top = r.top),
                              (i.bottom = r.top + i.height),
                              (e[Z] = "top")),
                            r.bottom)
                          ) {
                            let s = t.height - r.bottom;
                            ((i.top = s - i.height),
                              (i.bottom = s),
                              (e[Z] = "bottom"));
                          }
                          return (
                            r.left && (i.left = r.left),
                            r.right && (i.right = t.width - r.right),
                            G(t, i)
                          );
                        })(t, i)),
                      (l = K(t, { ...i[_] })),
                      i[Z])
                    )
                      a = ["top" === i[Z] ? "+y" : "-y", "+x", "-x"];
                    else if (e.snapToLines) {
                      let i;
                      switch (e.vertical) {
                        case "":
                          ((a = ["+y", "-y"]), (i = "height"));
                          break;
                        case "rl":
                          ((a = ["+x", "-x"]), (i = "width"));
                          break;
                        case "lr":
                          ((a = ["-x", "+x"]), (i = "width"));
                      }
                      let r = parseFloat(getComputedStyle(s).lineHeight) || 0,
                        o = r * Math.round(n),
                        h = t[i] + r,
                        c = a[0];
                      (Math.abs(o) > h &&
                        (o = Math.ceil(h / r) * r * (o < 0 ? -1 : 1)),
                        n < 0 &&
                          ((o += "" === e.vertical ? t.height : t.width),
                          (a = a.reverse())),
                        Y(l, c, o));
                    } else {
                      let i = "" === e.vertical,
                        r = i ? "+y" : "+x",
                        s = i ? l.height : l.width;
                      (Y(l, r, ((i ? t.height : t.width) * n) / 100),
                        Y(
                          l,
                          r,
                          "center" === e.lineAlign
                            ? s / 2
                            : "end" === e.lineAlign
                              ? s
                              : 0,
                        ),
                        (a = i
                          ? ["-y", "+y", "-x", "+x"]
                          : ["-x", "+x", "-y", "+y"]));
                    }
                    return ((l = Q(t, l, r, a)), J(i, t, l, "cue"), l);
                  })(this.z, e, l, t),
                ),
              r.add(n ? e.region : e));
          }
        }
        (W(this.overlay, this.A), (this.B = i));
      }
      J(t) {
        if (t)
          for (let e of t) {
            let t = this.M(e);
            (this.j.set(e.id, t), this.overlay.append(t));
          }
      }
      M(t) {
        let e = document.createElement("div");
        return (
          q(e, "region"),
          O(e, "id", t.id),
          O(e, "scroll", t.scroll),
          H(e, "region-width", t.width + "%"),
          H(e, "region-anchor-x", t.regionAnchorX),
          H(e, "region-anchor-y", t.regionAnchorY),
          H(e, "region-viewport-anchor-x", t.viewportAnchorX),
          H(e, "region-viewport-anchor-y", t.viewportAnchorY),
          H(e, "region-lines", t.lines),
          e
        );
      }
      L(t) {
        let e = document.createElement("div"),
          i = (function (t) {
            if ("auto" === t.position)
              switch (t.align) {
                case "start":
                case "left":
                  return 0;
                case "right":
                case "end":
                  return 100;
                default:
                  return 50;
              }
            return t.position;
          })(t),
          r = (function (t, e) {
            if ("auto" === t.positionAlign)
              switch (t.align) {
                case "start":
                  return "ltr" === e ? "line-left" : "line-right";
                case "end":
                  return "ltr" === e ? "line-right" : "line-left";
                case "center":
                  return "center";
                default:
                  return `line-${t.align}`;
              }
            return t.positionAlign;
          })(t, this.C);
        if (
          (q(e, "cue-display"),
          "" !== t.vertical && O(e, "vertical"),
          H(e, "cue-text-align", t.align),
          t.style)
        )
          for (let i of Object.keys(t.style))
            e.style.setProperty(i, t.style[i]);
        if (this.F(t))
          H(
            e,
            "cue-offset",
            `${i - ("line-right" === r ? 100 : 50 * ("center" === r))}%`,
          );
        else if (
          (H(
            e,
            "cue-writing-mode",
            "" === t.vertical
              ? "horizontal-tb"
              : "lr" === t.vertical
                ? "vertical-lr"
                : "vertical-rl",
          ),
          !t.style?.["--cue-width"])
        ) {
          let s = i;
          "line-left" === r
            ? (s = 100 - i)
            : "center" === r && i <= 50
              ? (s = 2 * i)
              : "center" === r && i > 50 && (s = (100 - i) * 2);
          let n = t.size < s ? t.size : s;
          "" === t.vertical
            ? H(e, "cue-width", n + "%")
            : H(e, "cue-height", n + "%");
        }
        let s = document.createElement("div");
        return (
          q(s, "cue"),
          t.id && O(s, "id", t.id),
          (s.innerHTML = F(t)),
          e.append(s),
          e
        );
      }
      F(t) {
        return (
          t.region && 100 === t.size && "" === t.vertical && "auto" === t.line
        );
      }
    },
    "P",
    0,
    class extends Error {
      code;
      line;
      constructor(t) {
        (super(t.reason), (this.code = t.code), (this.line = t.line));
      }
    },
    "T",
    0,
    o,
    "V",
    0,
    E,
    "a",
    0,
    C,
    "b",
    0,
    u,
    "c",
    0,
    {
      LoadFail: 0,
      BadSignature: 1,
      BadTimestamp: 2,
      BadSettingValue: 3,
      BadFormat: 4,
      UnknownSetting: 5,
    },
    "d",
    0,
    l,
    "e",
    0,
    a,
    "f",
    0,
    s,
    "g",
    0,
    n,
    "h",
    0,
    d,
    "i",
    0,
    function (t) {
      if (h)
        throw Error(
          "[media-captions] called `createVTTCueTemplate` on the server - use `renderVTTCueString`",
        );
      let e = document.createElement("template");
      return ((e.innerHTML = F(t)), { cue: t, content: e.content });
    },
    "j",
    0,
    I,
    "p",
    0,
    j,
    "r",
    0,
    F,
    "t",
    0,
    P,
    "u",
    0,
    W,
  ]);
};
