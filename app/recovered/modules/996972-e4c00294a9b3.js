// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t) => {
  var e =
      'input:not([inert]):not([inert] *),select:not([inert]):not([inert] *),textarea:not([inert]):not([inert] *),a[href]:not([inert]):not([inert] *),button:not([inert]):not([inert] *),[tabindex]:not(slot):not([inert]):not([inert] *),audio[controls]:not([inert]):not([inert] *),video[controls]:not([inert]):not([inert] *),[contenteditable]:not([contenteditable="false"]):not([inert]):not([inert] *),details>summary:first-of-type:not([inert]):not([inert] *),details:not([inert]):not([inert] *)',
    r = "u" < typeof Element,
    o = r
      ? function () {}
      : Element.prototype.matches ||
        Element.prototype.msMatchesSelector ||
        Element.prototype.webkitMatchesSelector,
    n =
      !r && Element.prototype.getRootNode
        ? function (t) {
            var e;
            return null == t || null == (e = t.getRootNode)
              ? void 0
              : e.call(t);
          }
        : function (t) {
            return null == t ? void 0 : t.ownerDocument;
          },
    i = function (t, e) {
      void 0 === e && (e = !0);
      var r,
        o =
          null == t || null == (r = t.getAttribute)
            ? void 0
            : r.call(t, "inert");
      return (
        "" === o ||
        "true" === o ||
        (e &&
          t &&
          ("function" == typeof t.closest
            ? t.closest("[inert]")
            : i(t.parentNode)))
      );
    },
    s = function (t) {
      var e,
        r =
          null == t || null == (e = t.getAttribute)
            ? void 0
            : e.call(t, "contenteditable");
      return "" === r || "true" === r;
    },
    a = function (t, r, n) {
      if (i(t)) return [];
      var s = Array.prototype.slice.apply(t.querySelectorAll(e));
      return (r && o.call(t, e) && s.unshift(t), (s = s.filter(n)));
    },
    l = function (t, r, n) {
      for (var s = [], a = Array.from(t); a.length; ) {
        var u = a.shift();
        if (!i(u, !1))
          if ("SLOT" === u.tagName) {
            var c = u.assignedElements(),
              f = l(c.length ? c : u.children, !0, n);
            n.flatten
              ? s.push.apply(s, f)
              : s.push({ scopeParent: u, candidates: f });
          } else {
            o.call(u, e) && n.filter(u) && (r || !t.includes(u)) && s.push(u);
            var h =
                u.shadowRoot ||
                ("function" == typeof n.getShadowRoot && n.getShadowRoot(u)),
              p = !i(h, !1) && (!n.shadowRootFilter || n.shadowRootFilter(u));
            if (h && p) {
              var d = l(!0 === h ? u.children : h.children, !0, n);
              n.flatten
                ? s.push.apply(s, d)
                : s.push({ scopeParent: u, candidates: d });
            } else a.unshift.apply(a, u.children);
          }
      }
      return s;
    },
    u = function (t) {
      return !isNaN(parseInt(t.getAttribute("tabindex"), 10));
    },
    c = function (t) {
      if (!t) throw Error("No node provided");
      return t.tabIndex < 0 &&
        (/^(AUDIO|VIDEO|DETAILS)$/.test(t.tagName) || s(t)) &&
        !u(t)
        ? 0
        : t.tabIndex;
    },
    f = function (t, e) {
      var r = c(t);
      return r < 0 && e && !u(t) ? 0 : r;
    },
    h = function (t, e) {
      return t.tabIndex === e.tabIndex
        ? t.documentOrder - e.documentOrder
        : t.tabIndex - e.tabIndex;
    },
    p = function (t) {
      return "INPUT" === t.tagName;
    },
    d = function (t, e) {
      for (var r = 0; r < t.length; r++)
        if (t[r].checked && t[r].form === e) return t[r];
    },
    y = function (t) {
      if (!t.name) return !0;
      var e,
        r = t.form || n(t),
        o = function (t) {
          return r.querySelectorAll('input[type="radio"][name="' + t + '"]');
        };
      if (
        "u" > typeof window &&
        void 0 !== window.CSS &&
        "function" == typeof window.CSS.escape
      )
        e = o(window.CSS.escape(t.name));
      else
        try {
          e = o(t.name);
        } catch (t) {
          return (
            console.error(
              "Looks like you have a radio button with a name attribute containing invalid CSS selector characters and need the CSS.escape polyfill: %s",
              t.message,
            ),
            !1
          );
        }
      var i = d(e, t.form);
      return !i || i === t;
    },
    m = function (t) {
      return p(t) && "radio" === t.type && !y(t);
    },
    g = function (t) {
      var e,
        r,
        o,
        i,
        s,
        a,
        l,
        u = t && n(t),
        c = null == (e = u) ? void 0 : e.host,
        f = !1;
      if (u && u !== t)
        for (
          f = !!(
            (null != (r = c) &&
              null != (o = r.ownerDocument) &&
              o.contains(c)) ||
            (null != t && null != (i = t.ownerDocument) && i.contains(t))
          );
          !f && c;

        )
          f = !!(
            null != (a = c = null == (s = u = n(c)) ? void 0 : s.host) &&
            null != (l = a.ownerDocument) &&
            l.contains(c)
          );
      return f;
    },
    b = function (t) {
      var e = t.getBoundingClientRect(),
        r = e.width,
        o = e.height;
      return 0 === r && 0 === o;
    },
    w = function (t, e) {
      var r = e.displayCheck,
        i = e.getShadowRoot;
      if ("full-native" === r && "checkVisibility" in t)
        return !t.checkVisibility({
          checkOpacity: !1,
          opacityProperty: !1,
          contentVisibilityAuto: !0,
          visibilityProperty: !0,
          checkVisibilityCSS: !0,
        });
      if ("hidden" === getComputedStyle(t).visibility) return !0;
      var s = o.call(t, "details>summary:first-of-type") ? t.parentElement : t;
      if (o.call(s, "details:not([open]) *")) return !0;
      if (r && "full" !== r && "full-native" !== r && "legacy-full" !== r) {
        if ("non-zero-area" === r) return b(t);
      } else {
        if ("function" == typeof i) {
          for (var a = t; t; ) {
            var l = t.parentElement,
              u = n(t);
            if (l && !l.shadowRoot && !0 === i(l)) return b(t);
            t = t.assignedSlot
              ? t.assignedSlot
              : l || u === t.ownerDocument
                ? l
                : u.host;
          }
          t = a;
        }
        if (g(t)) return !t.getClientRects().length;
        if ("legacy-full" !== r) return !0;
      }
      return !1;
    },
    v = function (t) {
      if (/^(INPUT|BUTTON|SELECT|TEXTAREA)$/.test(t.tagName))
        for (var e = t.parentElement; e; ) {
          if ("FIELDSET" === e.tagName && e.disabled) {
            for (var r = 0; r < e.children.length; r++) {
              var n = e.children.item(r);
              if ("LEGEND" === n.tagName)
                return !!o.call(e, "fieldset[disabled] *") || !n.contains(t);
            }
            return !0;
          }
          e = e.parentElement;
        }
      return !1;
    },
    R = function (t, e) {
      return !(
        e.disabled ||
        (p(e) && "hidden" === e.type) ||
        w(e, t) ||
        ("DETAILS" === e.tagName &&
          Array.prototype.slice.apply(e.children).some(function (t) {
            return "SUMMARY" === t.tagName;
          })) ||
        v(e)
      );
    },
    S = function (t, e) {
      return !(m(e) || 0 > c(e)) && !!R(t, e);
    },
    T = function (t) {
      var e = parseInt(t.getAttribute("tabindex"), 10);
      return !!isNaN(e) || !!(e >= 0);
    },
    E = function (t) {
      var e = [],
        r = [];
      return (
        t.forEach(function (t, o) {
          var n = !!t.scopeParent,
            i = n ? t.scopeParent : t,
            s = f(i, n),
            a = n ? E(t.candidates) : i;
          0 === s
            ? n
              ? e.push.apply(e, a)
              : e.push(i)
            : r.push({
                documentOrder: o,
                tabIndex: s,
                item: t,
                isScope: n,
                content: a,
              });
        }),
        r
          .sort(h)
          .reduce(function (t, e) {
            return (
              e.isScope ? t.push.apply(t, e.content) : t.push(e.content),
              t
            );
          }, [])
          .concat(e)
      );
    };
  t.s([
    "J",
    0,
    function (t, e) {
      return (e = e || {}).getShadowRoot
        ? l([t], e.includeContainer, {
            filter: R.bind(null, e),
            flatten: !0,
            getShadowRoot: e.getShadowRoot,
          })
        : a(t, e.includeContainer, R.bind(null, e));
    },
    "m",
    0,
    function (t, r) {
      if (((r = r || {}), !t)) throw Error("No node provided");
      return !1 !== o.call(t, e) && S(r, t);
    },
    "T",
    0,
    function (t, e) {
      return E(
        (e = e || {}).getShadowRoot
          ? l([t], e.includeContainer, {
              filter: S.bind(null, e),
              flatten: !1,
              getShadowRoot: e.getShadowRoot,
              shadowRootFilter: T,
            })
          : a(t, e.includeContainer, S.bind(null, e)),
      );
    },
  ]);
};
