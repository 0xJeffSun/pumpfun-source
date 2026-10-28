// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = (((t_ = {}).UNKNOWN = "unknown"), (t_.ANONYMOUS = "anonymous"), t_),
    a =
      (((tf = {}).HOST = "host"),
      (tf.CO_HOST = "co-host"),
      (tf.PARTICIPANT = "viewer"),
      (tf.MODERATOR = "moderator"),
      tf);
  e.s(["J", () => t, "E", () => a], 412427);
  var r = Object.create,
    n = Object.defineProperty,
    i = Object.getOwnPropertyDescriptor,
    o = Object.getOwnPropertyNames,
    s = Object.getPrototypeOf,
    l = Object.prototype.hasOwnProperty,
    d = function (e, t) {
      return function () {
        return (e && (t = e((e = 0))), t);
      };
    },
    u = function (e, t) {
      return function () {
        return (t || e((t = { exports: {} }).exports, t), t.exports);
      };
    },
    c = function (e, t, a, r) {
      if ((t && "object" == typeof t) || "function" == typeof t)
        for (var s, d = o(t), u = 0, c = d.length; u < c; u++)
          ((s = d[u]),
            l.call(e, s) ||
              s === a ||
              n(e, s, {
                get: function (e) {
                  return t[e];
                }.bind(null, s),
                enumerable: !(r = i(t, s)) || r.enumerable,
              }));
      return e;
    },
    p = function (e, t, a) {
      return (
        (a = null != e ? r(s(e)) : {}),
        c(
          !t && e && e.__esModule
            ? a
            : n(a, "default", { value: e, enumerable: !0 }),
          e,
        )
      );
    },
    m = u(function (t, a) {
      a.exports = "u" > typeof window ? window : e.g;
    });
  function h(e, t) {
    return null != t && "u" > typeof Symbol && t[Symbol.hasInstance]
      ? !!t[Symbol.hasInstance](e)
      : h(e, t);
  }
  var _ = d(function () {
    _();
  });
  function f(e) {
    return e && "u" > typeof Symbol && e.constructor === Symbol
      ? "symbol"
      : typeof e;
  }
  var v = d(function () {}),
    y = u(function (e, t) {
      var a = Array.prototype.slice;
      t.exports = function (e, t) {
        for (("length" in e) || (e = [e]), e = a.call(e); e.length; ) {
          var r = e.shift(),
            n = t(r);
          if (n) return n;
          r.childNodes &&
            r.childNodes.length &&
            (e = a.call(r.childNodes).concat(e));
        }
      };
    }),
    g = u(function (e, t) {
      function a(e, t) {
        if (!h(this, a)) return new a(e, t);
        ((this.data = e),
          (this.nodeValue = e),
          (this.length = e.length),
          (this.ownerDocument = t || null));
      }
      (_(),
        (t.exports = a),
        (a.prototype.nodeType = 8),
        (a.prototype.nodeName = "#comment"),
        (a.prototype.toString = function () {
          return "[object Comment]";
        }));
    }),
    b = u(function (e, t) {
      function a(e, t) {
        if (!h(this, a)) return new a(e);
        ((this.data = e || ""),
          (this.length = this.data.length),
          (this.ownerDocument = t || null));
      }
      (_(),
        (t.exports = a),
        (a.prototype.type = "DOMTextNode"),
        (a.prototype.nodeType = 3),
        (a.prototype.nodeName = "#text"),
        (a.prototype.toString = function () {
          return this.data;
        }),
        (a.prototype.replaceData = function (e, t, a) {
          var r = this.data,
            n = r.substring(0, e),
            i = r.substring(e + t, r.length);
          ((this.data = n + a + i), (this.length = this.data.length));
        }));
    }),
    w = u(function (e, t) {
      t.exports = function (e) {
        var t = this,
          a = e.type;
        (e.target || (e.target = t), t.listeners || (t.listeners = {}));
        var r = t.listeners[a];
        if (r)
          return r.forEach(function (a) {
            ((e.currentTarget = t),
              "function" == typeof a ? a(e) : a.handleEvent(e));
          });
        t.parentNode && t.parentNode.dispatchEvent(e);
      };
    }),
    E = u(function (e, t) {
      t.exports = function (e, t) {
        (this.listeners || (this.listeners = {}),
          this.listeners[e] || (this.listeners[e] = []),
          -1 === this.listeners[e].indexOf(t) && this.listeners[e].push(t));
      };
    }),
    T = u(function (e, t) {
      t.exports = function (e, t) {
        if (this.listeners && this.listeners[e]) {
          var a = this.listeners[e],
            r = a.indexOf(t);
          -1 !== r && a.splice(r, 1);
        }
      };
    }),
    k = u(function (e, t) {
      (v(),
        (t.exports = function e(t) {
          switch (t.nodeType) {
            case 3:
              return n(t.data);
            case 8:
              return "<!--" + t.data + "-->";
            default:
              var i, o, s;
              return (
                (o = []),
                (s = (i = t).tagName),
                "http://www.w3.org/1999/xhtml" === i.namespaceURI &&
                  (s = s.toLowerCase()),
                o.push(
                  "<" +
                    s +
                    (function (e) {
                      var t = [];
                      for (var a in e)
                        (function (e, t) {
                          var a = f(e[t]);
                          return (
                            ("style" === t &&
                              Object.keys(e.style).length > 0) ||
                            (e.hasOwnProperty(t) &&
                              ("string" === a ||
                                "boolean" === a ||
                                "number" === a) &&
                              "nodeName" !== t &&
                              "className" !== t &&
                              "tagName" !== t &&
                              "textContent" !== t &&
                              "innerText" !== t &&
                              "namespaceURI" !== t &&
                              "innerHTML" !== t)
                          );
                        })(e, a) && t.push({ name: a, value: e[a] });
                      for (var n in e._attributes)
                        for (var i in e._attributes[n]) {
                          var o = e._attributes[n][i],
                            s = (o.prefix ? o.prefix + ":" : "") + i;
                          t.push({ name: s, value: o.value });
                        }
                      return (
                        e.className &&
                          t.push({ name: "class", value: e.className }),
                        t.length ? r(t) : ""
                      );
                    })(i) +
                    (function (e) {
                      var t = e.dataset,
                        a = [];
                      for (var n in t)
                        a.push({ name: "data-" + n, value: t[n] });
                      return a.length ? r(a) : "";
                    })(i),
                ),
                a.indexOf(s) > -1
                  ? o.push(" />")
                  : (o.push(">"),
                    i.childNodes.length
                      ? o.push.apply(o, i.childNodes.map(e))
                      : i.textContent || i.innerText
                        ? o.push(n(i.textContent || i.innerText))
                        : i.innerHTML && o.push(i.innerHTML),
                    o.push("</" + s + ">")),
                o.join("")
              );
          }
        }));
      var a = [
        "area",
        "base",
        "br",
        "col",
        "embed",
        "hr",
        "img",
        "input",
        "keygen",
        "link",
        "menuitem",
        "meta",
        "param",
        "source",
        "track",
        "wbr",
      ];
      function r(e) {
        var t = [];
        return (
          e.forEach(function (e) {
            var a = e.name,
              r = e.value;
            ("style" === a &&
              (r = (function (e) {
                if ("string" == typeof e) return e;
                var t = "";
                return (
                  Object.keys(e).forEach(function (a) {
                    var r = e[a];
                    ((a = a.replace(/[A-Z]/g, function (e) {
                      return "-" + e.toLowerCase();
                    })),
                      (t += a + ":" + r + ";"));
                  }),
                  t
                );
              })(r)),
              t.push(a + '="' + n(r).replace(/"/g, "&quot;") + '"'));
          }),
          t.length ? " " + t.join(" ") : ""
        );
      }
      function n(e) {
        var t = "";
        return (
          "string" == typeof e ? (t = e) : e && (t = e.toString()),
          t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
        );
      }
    }),
    x = u(function (e, t) {
      _();
      var a = y(),
        r = w(),
        n = E(),
        i = T(),
        o = k(),
        s = "http://www.w3.org/1999/xhtml";
      function l(e, t, a) {
        if (!h(this, l)) return new l(e);
        var r = void 0 === a ? s : a || null;
        ((this.tagName = r === s ? String(e).toUpperCase() : e),
          (this.nodeName = this.tagName),
          (this.className = ""),
          (this.dataset = {}),
          (this.childNodes = []),
          (this.parentNode = null),
          (this.style = {}),
          (this.ownerDocument = t || null),
          (this.namespaceURI = r),
          (this._attributes = {}),
          "INPUT" === this.tagName && (this.type = "text"));
      }
      ((t.exports = l),
        (l.prototype.type = "DOMElement"),
        (l.prototype.nodeType = 1),
        (l.prototype.appendChild = function (e) {
          return (
            e.parentNode && e.parentNode.removeChild(e),
            this.childNodes.push(e),
            (e.parentNode = this),
            e
          );
        }),
        (l.prototype.replaceChild = function (e, t) {
          e.parentNode && e.parentNode.removeChild(e);
          var a = this.childNodes.indexOf(t);
          return (
            (t.parentNode = null),
            (this.childNodes[a] = e),
            (e.parentNode = this),
            t
          );
        }),
        (l.prototype.removeChild = function (e) {
          var t = this.childNodes.indexOf(e);
          return (this.childNodes.splice(t, 1), (e.parentNode = null), e);
        }),
        (l.prototype.insertBefore = function (e, t) {
          e.parentNode && e.parentNode.removeChild(e);
          var a = null == t ? -1 : this.childNodes.indexOf(t);
          return (
            a > -1 ? this.childNodes.splice(a, 0, e) : this.childNodes.push(e),
            (e.parentNode = this),
            e
          );
        }),
        (l.prototype.setAttributeNS = function (e, t, a) {
          var r = null,
            n = t,
            i = t.indexOf(":");
          (i > -1 && ((r = t.substr(0, i)), (n = t.substr(i + 1))),
          "INPUT" === this.tagName && "type" === t)
            ? (this.type = a)
            : ((this._attributes[e] || (this._attributes[e] = {}))[n] = {
                value: a,
                prefix: r,
              });
        }),
        (l.prototype.getAttributeNS = function (e, t) {
          var a = this._attributes[e],
            r = a && a[t] && a[t].value;
          return "INPUT" === this.tagName && "type" === t
            ? this.type
            : "string" != typeof r
              ? null
              : r;
        }),
        (l.prototype.removeAttributeNS = function (e, t) {
          var a = this._attributes[e];
          a && delete a[t];
        }),
        (l.prototype.hasAttributeNS = function (e, t) {
          var a = this._attributes[e];
          return !!a && t in a;
        }),
        (l.prototype.setAttribute = function (e, t) {
          return this.setAttributeNS(null, e, t);
        }),
        (l.prototype.getAttribute = function (e) {
          return this.getAttributeNS(null, e);
        }),
        (l.prototype.removeAttribute = function (e) {
          return this.removeAttributeNS(null, e);
        }),
        (l.prototype.hasAttribute = function (e) {
          return this.hasAttributeNS(null, e);
        }),
        (l.prototype.removeEventListener = i),
        (l.prototype.addEventListener = n),
        (l.prototype.dispatchEvent = r),
        (l.prototype.focus = function () {}),
        (l.prototype.toString = function () {
          return o(this);
        }),
        (l.prototype.getElementsByClassName = function (e) {
          var t = e.split(" "),
            r = [];
          return (
            a(this, function (e) {
              if (1 === e.nodeType) {
                var a = (e.className || "").split(" ");
                t.every(function (e) {
                  return -1 !== a.indexOf(e);
                }) && r.push(e);
              }
            }),
            r
          );
        }),
        (l.prototype.getElementsByTagName = function (e) {
          e = e.toLowerCase();
          var t = [];
          return (
            a(this.childNodes, function (a) {
              1 === a.nodeType &&
                ("*" === e || a.tagName.toLowerCase() === e) &&
                t.push(a);
            }),
            t
          );
        }),
        (l.prototype.contains = function (e) {
          return (
            a(this, function (t) {
              return e === t;
            }) || !1
          );
        }));
    }),
    R = u(function (e, t) {
      _();
      var a = x();
      function r(e) {
        if (!h(this, r)) return new r();
        ((this.childNodes = []),
          (this.parentNode = null),
          (this.ownerDocument = e || null));
      }
      ((t.exports = r),
        (r.prototype.type = "DocumentFragment"),
        (r.prototype.nodeType = 11),
        (r.prototype.nodeName = "#document-fragment"),
        (r.prototype.appendChild = a.prototype.appendChild),
        (r.prototype.replaceChild = a.prototype.replaceChild),
        (r.prototype.removeChild = a.prototype.removeChild),
        (r.prototype.toString = function () {
          return this.childNodes
            .map(function (e) {
              return String(e);
            })
            .join("");
        }));
    }),
    D = u(function (e, t) {
      function a(e) {}
      ((t.exports = a),
        (a.prototype.initEvent = function (e, t, a) {
          ((this.type = e), (this.bubbles = t), (this.cancelable = a));
        }),
        (a.prototype.preventDefault = function () {}));
    }),
    S = u(function (e, t) {
      _();
      var a = y(),
        r = g(),
        n = b(),
        i = x(),
        o = R(),
        s = D(),
        l = w(),
        d = E(),
        u = T();
      function c() {
        if (!h(this, c)) return new c();
        ((this.head = this.createElement("head")),
          (this.body = this.createElement("body")),
          (this.documentElement = this.createElement("html")),
          this.documentElement.appendChild(this.head),
          this.documentElement.appendChild(this.body),
          (this.childNodes = [this.documentElement]),
          (this.nodeType = 9));
      }
      t.exports = c;
      var p = c.prototype;
      ((p.createTextNode = function (e) {
        return new n(e, this);
      }),
        (p.createElementNS = function (e, t) {
          return new i(t, this, null === e ? null : String(e));
        }),
        (p.createElement = function (e) {
          return new i(e, this);
        }),
        (p.createDocumentFragment = function () {
          return new o(this);
        }),
        (p.createEvent = function (e) {
          return new s(e);
        }),
        (p.createComment = function (e) {
          return new r(e, this);
        }),
        (p.getElementById = function (e) {
          return (
            (e = String(e)),
            a(this.childNodes, function (t) {
              if (String(t.id) === e) return t;
            }) || null
          );
        }),
        (p.getElementsByClassName = i.prototype.getElementsByClassName),
        (p.getElementsByTagName = i.prototype.getElementsByTagName),
        (p.contains = i.prototype.contains),
        (p.removeEventListener = u),
        (p.addEventListener = d),
        (p.dispatchEvent = l));
    }),
    C = u(function (e, t) {
      t.exports = new (S())();
    }),
    P = u(function (t, a) {
      var r,
        n = e.g,
        i = C();
      ("u" > typeof document
        ? (r = document)
        : (r = n["__GLOBAL_DOCUMENT_CACHE@4"]) ||
          (r = n["__GLOBAL_DOCUMENT_CACHE@4"] = i),
        (a.exports = r));
    });
  function N(e, t) {
    (null == t || t > e.length) && (t = e.length);
    for (var a = 0, r = Array(t); a < t; a++) r[a] = e[a];
    return r;
  }
  function q(e, t) {
    if (e) {
      if ("string" == typeof e) return N(e, t);
      var a = Object.prototype.toString.call(e).slice(8, -1);
      if (
        ("Object" === a && e.constructor && (a = e.constructor.name),
        "Map" === a || "Set" === a)
      )
        return Array.from(a);
      if (
        "Arguments" === a ||
        /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)
      )
        return N(e, t);
    }
  }
  function O(e, t) {
    return (
      (function (e) {
        if (Array.isArray(e)) return e;
      })(e) ||
      (function (e, t) {
        var a =
          null == e
            ? null
            : ("u" > typeof Symbol && e[Symbol.iterator]) || e["@@iterator"];
        if (null != a) {
          var r,
            n,
            i = [],
            o = !0,
            s = !1;
          try {
            for (
              a = a.call(e);
              !(o = (r = a.next()).done) &&
              (i.push(r.value), !(t && i.length === t));
              o = !0
            );
          } catch (e) {
            ((s = !0), (n = e));
          } finally {
            try {
              o || null == a.return || a.return();
            } finally {
              if (s) throw n;
            }
          }
          return i;
        }
      })(e, t) ||
      q(e, t) ||
      (function () {
        throw TypeError(
          "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
        );
      })()
    );
  }
  var A = p(m()),
    L = p(m()),
    I = p(m()),
    M = function () {
      var e = I.default.performance,
        t = e && e.timing,
        a = t && t.navigationStart;
      return Math.round(
        "number" == typeof a && "function" == typeof e.now
          ? a + e.now()
          : Date.now(),
      );
    },
    H = function () {
      if (
        "function" ==
        typeof (null == (e = L.default.crypto) ? void 0 : e.getRandomValues)
      ) {
        ((a = new Uint8Array(32)), L.default.crypto.getRandomValues(a));
        for (var e, t, a, r = 0; r < 32; r++) a[r] = a[r] % 16;
      } else {
        a = [];
        for (var n = 0; n < 32; n++) a[n] = (16 * Math.random()) | 0;
      }
      var i = 0;
      t = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (e) {
        var t = "x" === e ? a[i] : (3 & a[i]) | 8;
        return (i++, t.toString(16));
      });
      var o = M(),
        s = null == o ? void 0 : o.toString(16).substring(3);
      return s ? t.substring(0, 28) + s : t;
    },
    j = function () {
      return ("000000" + ((0x81bf1000 * Math.random()) | 0).toString(36)).slice(
        -6,
      );
    },
    B = function (e) {
      var t;
      if (e && void 0 !== e.nodeName)
        return (e.muxId || (e.muxId = j()), e.muxId);
      try {
        t = document.querySelector(e);
      } catch (e) {}
      return (
        t && !t.muxId && (t.muxId = e),
        (null == t ? void 0 : t.muxId) || e
      );
    },
    U = function (e) {
      e && void 0 !== e.nodeName
        ? (e = B((t = e)))
        : (t = document.querySelector(e));
      var t,
        a = t && t.nodeName ? t.nodeName.toLowerCase() : "";
      return [t, e, a];
    };
  function F(e) {
    return (
      (function (e) {
        if (Array.isArray(e)) return N(e);
      })(e) ||
      (function (e) {
        if (
          ("u" > typeof Symbol && null != e[Symbol.iterator]) ||
          null != e["@@iterator"]
        )
          return Array.from(e);
      })(e) ||
      q(e) ||
      (function () {
        throw TypeError(
          "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
        );
      })()
    );
  }
  var V = (function (e) {
      var t,
        a,
        r,
        n,
        i,
        o = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 3,
        s = e ? [console, e] : [console],
        l = (t = console.trace).bind.apply(t, F(s)),
        d = (a = console.info).bind.apply(a, F(s)),
        u = (r = console.debug).bind.apply(r, F(s)),
        c = (n = console.warn).bind.apply(n, F(s)),
        p = (i = console.error).bind.apply(i, F(s)),
        m = o;
      return {
        trace: function () {
          for (var e = arguments.length, t = Array(e), a = 0; a < e; a++)
            t[a] = arguments[a];
          if (!(m > 0)) return l.apply(void 0, F(t));
        },
        debug: function () {
          for (var e = arguments.length, t = Array(e), a = 0; a < e; a++)
            t[a] = arguments[a];
          if (!(m > 1)) return u.apply(void 0, F(t));
        },
        info: function () {
          for (var e = arguments.length, t = Array(e), a = 0; a < e; a++)
            t[a] = arguments[a];
          if (!(m > 2)) return d.apply(void 0, F(t));
        },
        warn: function () {
          for (var e = arguments.length, t = Array(e), a = 0; a < e; a++)
            t[a] = arguments[a];
          if (!(m > 3)) return c.apply(void 0, F(t));
        },
        error: function () {
          for (var e = arguments.length, t = Array(e), a = 0; a < e; a++)
            t[a] = arguments[a];
          if (!(m > 4)) return p.apply(void 0, F(t));
        },
        get level() {
          return m;
        },
        set level(e) {
          e !== this.level && (m = null != e ? e : o);
        },
      };
    })("[mux]"),
    G = p(m());
  function Z() {
    return (
      "1" ===
      (G.default.doNotTrack ||
        (G.default.navigator && G.default.navigator.doNotTrack))
    );
  }
  function W(e) {
    if (void 0 === e)
      throw ReferenceError(
        "this hasn't been initialised - super() hasn't been called",
      );
    return e;
  }
  function Q(e, t) {
    if (!h(e, t)) throw TypeError("Cannot call a class as a function");
  }
  function z(e, t) {
    for (var a = 0; a < t.length; a++) {
      var r = t[a];
      ((r.enumerable = r.enumerable || !1),
        (r.configurable = !0),
        "value" in r && (r.writable = !0),
        Object.defineProperty(e, r.key, r));
    }
  }
  function K(e, t, a) {
    return (t && z(e.prototype, t), a && z(e, a), e);
  }
  function J(e, t, a) {
    return (
      t in e
        ? Object.defineProperty(e, t, {
            value: a,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[t] = a),
      e
    );
  }
  function $(e) {
    return ($ = Object.setPrototypeOf
      ? Object.getPrototypeOf
      : function (e) {
          return e.__proto__ || Object.getPrototypeOf(e);
        })(e);
  }
  function Y(e, t, a) {
    return (Y =
      "u" > typeof Reflect && Reflect.get
        ? Reflect.get
        : function (e, t, a) {
            var r = (function (e, t) {
              for (
                ;
                !Object.prototype.hasOwnProperty.call(e, t) &&
                null !== (e = $(e));

              );
              return e;
            })(e, t);
            if (r) {
              var n = Object.getOwnPropertyDescriptor(r, t);
              return n.get ? n.get.call(a || e) : n.value;
            }
          })(e, t, a || e);
  }
  function X(e, t) {
    return (X =
      Object.setPrototypeOf ||
      function (e, t) {
        return ((e.__proto__ = t), e);
      })(e, t);
  }
  (_(), v());
  var ee = function (e) {
      return et(e)[0];
    },
    et = function (e) {
      if ("string" != typeof e || "" === e) return ["localhost"];
      var t,
        a = (e.match(
          /^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/,
        ) || [])[4];
      return (a && (t = (a.match(/[^\.]+\.[^\.]+$/) || [])[0]), [a, t]);
    },
    ea = p(m()),
    er = function () {
      var e = ea.default.performance;
      return void 0 !== (e && e.timing);
    },
    en = function () {
      var e = ea.default.performance,
        t = e && e.timing;
      return t && t.domContentLoadedEventEnd;
    },
    ei = function () {
      var e = ea.default.performance,
        t = e && e.timing;
      return t && t.navigationStart;
    };
  function eo(e, t, a) {
    ((a = void 0 === a ? 1 : a), (e[t] = e[t] || 0), (e[t] += a));
  }
  function es(e) {
    for (var t = 1; t < arguments.length; t++) {
      var a = null != arguments[t] ? arguments[t] : {},
        r = Object.keys(a);
      ("function" == typeof Object.getOwnPropertySymbols &&
        (r = r.concat(
          Object.getOwnPropertySymbols(a).filter(function (e) {
            return Object.getOwnPropertyDescriptor(a, e).enumerable;
          }),
        )),
        r.forEach(function (t) {
          J(e, t, a[t]);
        }));
    }
    return e;
  }
  function el(e, t) {
    return (
      (t = null != t ? t : {}),
      Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t))
        : (function (e) {
            var t = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
              var a = Object.getOwnPropertySymbols(e);
              t.push.apply(t, a);
            }
            return t;
          })(Object(t)).forEach(function (a) {
            Object.defineProperty(e, a, Object.getOwnPropertyDescriptor(t, a));
          }),
      e
    );
  }
  var ed = ["x-request-id", "cf-ray", "x-amz-cf-id", "x-akamai-request-id"],
    eu = ["x-cdn", "content-type"].concat(ed);
  function ec(e) {
    var t = {};
    return (
      (e = e || "")
        .trim()
        .split(/[\r\n]+/)
        .forEach(function (e) {
          if (e) {
            var a = e.split(": "),
              r = a.shift();
            r &&
              (eu.indexOf(r.toLowerCase()) >= 0 ||
                0 === r.toLowerCase().indexOf("x-litix-")) &&
              (t[r] = a.join(": "));
          }
        }),
      t
    );
  }
  function ep(e) {
    if (e) {
      var t = ed.find(function (t) {
        return void 0 !== e[t];
      });
      return t ? e[t] : void 0;
    }
  }
  var em = function (e) {
      var t = {};
      for (var a in e) {
        var r = e[a];
        -1 !== r["DATA-ID"].search("io.litix.data.") &&
          (t[r["DATA-ID"].replace("io.litix.data.", "")] = r.VALUE);
      }
      return t;
    },
    eh = function (e) {
      if (!e) return {};
      var t = ei(),
        a = e.loading,
        r = a ? a.start : e.trequest,
        n = a ? a.first : e.tfirst,
        i = a ? a.end : e.tload;
      return {
        bytesLoaded: e.total,
        requestStart: Math.round(t + r),
        responseStart: Math.round(t + n),
        responseEnd: Math.round(t + i),
      };
    },
    e_ = function (e) {
      if (!(!e || "function" != typeof e.getAllResponseHeaders))
        return ec(e.getAllResponseHeaders());
    },
    ef = function (e, t, a) {
      arguments.length > 3 && void 0 !== arguments[3] && arguments[3];
      var r = arguments.length > 4 ? arguments[4] : void 0,
        n = e.log,
        i = e.utils.secondsToMs,
        o = function (e) {
          var t,
            a = parseInt(r.version);
          return (
            1 === a && null !== e.programDateTime && (t = e.programDateTime),
            0 === a && null !== e.pdt && (t = e.pdt),
            t
          );
        };
      if (!er())
        return void n.warn(
          "performance timing not supported. Not tracking HLS.js.",
        );
      var s = function (a, r) {
          return e.emit(t, a, r);
        },
        l = function (e, t) {
          var a = t.levels,
            r = t.audioTracks,
            n = t.url,
            i = t.stats,
            o = t.networkDetails,
            l = t.sessionData,
            d = {},
            u = {};
          (a.forEach(function (e, t) {
            d[t] = {
              width: e.width,
              height: e.height,
              bitrate: e.bitrate,
              attrs: e.attrs,
            };
          }),
            r.forEach(function (e, t) {
              u[t] = { name: e.name, language: e.lang, bitrate: e.bitrate };
            }));
          var c = eh(i),
            p = c.bytesLoaded,
            m = c.requestStart,
            h = c.responseStart,
            _ = c.responseEnd;
          s(
            "requestcompleted",
            el(es({}, em(l)), {
              request_event_type: e,
              request_bytes_loaded: p,
              request_start: m,
              request_response_start: h,
              request_response_end: _,
              request_type: "manifest",
              request_hostname: ee(n),
              request_response_headers: e_(o),
              request_rendition_lists: { media: d, audio: u, video: {} },
            }),
          );
        };
      a.on(r.Events.MANIFEST_LOADED, l);
      var d = function (e, t) {
        var a = t.details,
          r = t.level,
          n = t.networkDetails,
          l = eh(t.stats),
          d = l.bytesLoaded,
          u = l.requestStart,
          c = l.responseStart,
          p = l.responseEnd,
          m = a.fragments[a.fragments.length - 1],
          h = o(m) + i(m.duration);
        s("requestcompleted", {
          request_event_type: e,
          request_bytes_loaded: d,
          request_start: u,
          request_response_start: c,
          request_response_end: p,
          request_current_level: r,
          request_type: "manifest",
          request_hostname: ee(a.url),
          request_response_headers: e_(n),
          video_holdback: a.holdBack && i(a.holdBack),
          video_part_holdback: a.partHoldBack && i(a.partHoldBack),
          video_part_target_duration: a.partTarget && i(a.partTarget),
          video_target_duration: a.targetduration && i(a.targetduration),
          video_source_is_live: a.live,
          player_manifest_newest_program_time: isNaN(h) ? void 0 : h,
        });
      };
      a.on(r.Events.LEVEL_LOADED, d);
      var u = function (e, t) {
        var a = t.details,
          r = t.networkDetails,
          n = eh(t.stats);
        s("requestcompleted", {
          request_event_type: e,
          request_bytes_loaded: n.bytesLoaded,
          request_start: n.requestStart,
          request_response_start: n.responseStart,
          request_response_end: n.responseEnd,
          request_type: "manifest",
          request_hostname: ee(a.url),
          request_response_headers: e_(r),
        });
      };
      a.on(r.Events.AUDIO_TRACK_LOADED, u);
      var c = function (e, t) {
        var r = t.stats,
          n = t.networkDetails,
          i = t.frag,
          o = eh((r = r || i.stats)),
          l = o.bytesLoaded,
          d = o.requestStart,
          u = o.responseStart,
          c = o.responseEnd,
          p = n ? e_(n) : void 0,
          m = {
            request_event_type: e,
            request_bytes_loaded: l,
            request_start: d,
            request_response_start: u,
            request_response_end: c,
            request_hostname: n ? ee(n.responseURL) : void 0,
            request_id: p ? ep(p) : void 0,
            request_response_headers: p,
            request_media_duration: i.duration,
            request_url: null == n ? void 0 : n.responseURL,
          };
        ("main" === i.type
          ? ((m.request_type = "media"),
            (m.request_current_level = i.level),
            (m.request_video_width = (a.levels[i.level] || {}).width),
            (m.request_video_height = (a.levels[i.level] || {}).height),
            (m.request_labeled_bitrate = (a.levels[i.level] || {}).bitrate))
          : (m.request_type = i.type),
          s("requestcompleted", m));
      };
      a.on(r.Events.FRAG_LOADED, c);
      var p = function (e, t) {
        var a = t.frag,
          r = a.start;
        s("fragmentchange", {
          currentFragmentPDT: o(a),
          currentFragmentStart: i(r),
        });
      };
      a.on(r.Events.FRAG_CHANGED, p);
      var m = function (e, t) {
        var a,
          n = t.type,
          i = t.details,
          o = t.response,
          l = t.fatal,
          d = t.frag,
          u = t.networkDetails,
          c = (null == d ? void 0 : d.url) || t.url || "",
          p = u ? e_(u) : void 0;
        ((i === r.ErrorDetails.MANIFEST_LOAD_ERROR ||
          i === r.ErrorDetails.MANIFEST_LOAD_TIMEOUT ||
          i === r.ErrorDetails.FRAG_LOAD_ERROR ||
          i === r.ErrorDetails.FRAG_LOAD_TIMEOUT ||
          i === r.ErrorDetails.LEVEL_LOAD_ERROR ||
          i === r.ErrorDetails.LEVEL_LOAD_TIMEOUT ||
          i === r.ErrorDetails.AUDIO_TRACK_LOAD_ERROR ||
          i === r.ErrorDetails.AUDIO_TRACK_LOAD_TIMEOUT ||
          i === r.ErrorDetails.SUBTITLE_LOAD_ERROR ||
          i === r.ErrorDetails.SUBTITLE_LOAD_TIMEOUT ||
          i === r.ErrorDetails.KEY_LOAD_ERROR ||
          i === r.ErrorDetails.KEY_LOAD_TIMEOUT) &&
          s("requestfailed", {
            request_error: i,
            request_url: c,
            request_hostname: ee(c),
            request_id: p ? ep(p) : void 0,
            request_type:
              i === r.ErrorDetails.FRAG_LOAD_ERROR ||
              i === r.ErrorDetails.FRAG_LOAD_TIMEOUT
                ? "media"
                : i === r.ErrorDetails.AUDIO_TRACK_LOAD_ERROR ||
                    i === r.ErrorDetails.AUDIO_TRACK_LOAD_TIMEOUT
                  ? "audio"
                  : i === r.ErrorDetails.SUBTITLE_LOAD_ERROR ||
                      i === r.ErrorDetails.SUBTITLE_LOAD_TIMEOUT
                    ? "subtitle"
                    : i === r.ErrorDetails.KEY_LOAD_ERROR ||
                        i === r.ErrorDetails.KEY_LOAD_TIMEOUT
                      ? "encryption"
                      : "manifest",
            request_error_code: null == o ? void 0 : o.code,
            request_error_text: null == o ? void 0 : o.text,
          }),
          l &&
            s("error", {
              player_error_code: n,
              player_error_message: i,
              player_error_context:
                "".concat(c ? "url: ".concat(c, "\n") : "") +
                "".concat(
                  o && (o.code || o.text)
                    ? "response: ".concat(o.code, ", ").concat(o.text, "\n")
                    : "",
                ) +
                "".concat(
                  t.reason ? "failure reason: ".concat(t.reason, "\n") : "",
                ) +
                "".concat(t.level ? "level: ".concat(t.level, "\n") : "") +
                "".concat(
                  t.parent
                    ? "parent stream controller: ".concat(t.parent, "\n")
                    : "",
                ) +
                "".concat(
                  t.buffer ? "buffer length: ".concat(t.buffer, "\n") : "",
                ) +
                "".concat(t.error ? "error: ".concat(t.error, "\n") : "") +
                "".concat(t.event ? "event: ".concat(t.event, "\n") : "") +
                "".concat(
                  t.err
                    ? "error message: ".concat(
                        null == (a = t.err) ? void 0 : a.message,
                        "\n",
                      )
                    : "",
                ),
            }));
      };
      a.on(r.Events.ERROR, m);
      var h = function (e, t) {
        var a = t.frag,
          r = (a && a._url) || "";
        s("requestcanceled", {
          request_event_type: e,
          request_url: r,
          request_type: "media",
          request_hostname: ee(r),
        });
      };
      a.on(r.Events.FRAG_LOAD_EMERGENCY_ABORTED, h);
      var _ = function (e, t) {
        var r = t.level,
          i = a.levels[r];
        if (i && i.attrs && i.attrs.BANDWIDTH) {
          var o,
            l = i.attrs.BANDWIDTH,
            d = parseFloat(i.attrs["FRAME-RATE"]);
          (isNaN(d) || (o = d),
            l
              ? s("renditionchange", {
                  video_source_fps: o,
                  video_source_bitrate: l,
                  video_source_width: i.width,
                  video_source_height: i.height,
                  video_source_rendition_name: i.name,
                  video_source_codec: null == i ? void 0 : i.videoCodec,
                })
              : n.warn("missing BANDWIDTH from HLS manifest parsed by HLS.js"));
        }
      };
      (a.on(r.Events.LEVEL_SWITCHED, _),
        (a._stopMuxMonitor = function () {
          (a.off(r.Events.MANIFEST_LOADED, l),
            a.off(r.Events.LEVEL_LOADED, d),
            a.off(r.Events.AUDIO_TRACK_LOADED, u),
            a.off(r.Events.FRAG_LOADED, c),
            a.off(r.Events.FRAG_CHANGED, p),
            a.off(r.Events.ERROR, m),
            a.off(r.Events.FRAG_LOAD_EMERGENCY_ABORTED, h),
            a.off(r.Events.LEVEL_SWITCHED, _),
            a.off(r.Events.DESTROYING, a._stopMuxMonitor),
            delete a._stopMuxMonitor);
        }),
        a.on(r.Events.DESTROYING, a._stopMuxMonitor));
    },
    ev = function (e) {
      e && "function" == typeof e._stopMuxMonitor && e._stopMuxMonitor();
    },
    ey = function (e, t) {
      if (!e || !e.requestEndDate) return {};
      var a,
        r = ee(e.url),
        n = e.url,
        i = e.bytesLoaded,
        o = new Date(e.requestStartDate).getTime(),
        s = new Date(e.firstByteDate).getTime(),
        l = new Date(e.requestEndDate).getTime(),
        d = isNaN(e.duration) ? 0 : e.duration,
        u =
          "function" == typeof t.getMetricsFor
            ? t.getMetricsFor(e.mediaType).HttpList
            : t.getDashMetrics().getHttpRequests(e.mediaType);
      u.length > 0 && (a = ec(u[u.length - 1]._responseHeaders || ""));
      var c = a ? ep(a) : void 0;
      return {
        requestStart: o,
        requestResponseStart: s,
        requestResponseEnd: l,
        requestBytesLoaded: i,
        requestResponseHeaders: a,
        requestMediaDuration: d,
        requestHostname: r,
        requestUrl: n,
        requestId: c,
      };
    },
    eg = function (e, t) {
      var a = t.getQualityFor(e),
        r = t.getCurrentTrackFor(e).bitrateList;
      return r
        ? {
            currentLevel: a,
            renditionWidth: r[a].width || null,
            renditionHeight: r[a].height || null,
            renditionBitrate: r[a].bandwidth,
          }
        : {};
    },
    eb = function (e) {
      var t;
      return null == (t = e.match(/.*codecs\*?="(.*)"/)) ? void 0 : t[1];
    },
    ew = function (e) {
      try {
        var t, a;
        return null == (a = e.getVersion) || null == (t = a.call(e))
          ? void 0
          : t.split(".").map(function (e) {
              return parseInt(e);
            })[0];
      } catch (e) {
        return !1;
      }
    },
    eE = function (e, t, a) {
      arguments.length > 3 && void 0 !== arguments[3] && arguments[3];
      var r = e.log;
      if (!a || !a.on)
        return void r.warn(
          "Invalid dash.js player reference. Monitoring blocked.",
        );
      var n = ew(a),
        i = function (a, r) {
          return e.emit(t, a, r);
        },
        o = function (e) {
          var t = e.type,
            a = (e.data || {}).url;
          i("requestcompleted", {
            request_event_type: t,
            request_start: 0,
            request_response_start: 0,
            request_response_end: 0,
            request_bytes_loaded: -1,
            request_type: "manifest",
            request_hostname: ee(a),
            request_url: a,
          });
        };
      a.on("manifestLoaded", o);
      var s = {},
        l = function (e) {
          if ("function" != typeof e.getRequests) return null;
          var t = e.getRequests({ state: "executed" });
          return 0 === t.length ? null : t[t.length - 1];
        },
        d = function (e) {
          var t = e.type,
            r = e.chunk,
            n = e.request,
            o = (r || {}).mediaInfo || {},
            l = o.type,
            d = o.bitrateList,
            u = {};
          ((d = d || []).forEach(function (e, t) {
            ((u[t] = {}),
              (u[t].width = e.width),
              (u[t].height = e.height),
              (u[t].bitrate = e.bandwidth),
              (u[t].attrs = {}));
          }),
            "video" === l
              ? (s.video = u)
              : "audio" === l
                ? (s.audio = u)
                : (s.media = u));
          var c = ey(n, a),
            p = c.requestStart,
            m = c.requestResponseStart,
            h = c.requestResponseEnd,
            _ = c.requestResponseHeaders,
            f = c.requestMediaDuration,
            v = c.requestHostname,
            y = c.requestUrl;
          i("requestcompleted", {
            request_event_type: t,
            request_start: p,
            request_response_start: m,
            request_response_end: h,
            request_bytes_loaded: -1,
            request_type: l + "_init",
            request_response_headers: _,
            request_hostname: v,
            request_id: c.requestId,
            request_url: y,
            request_media_duration: f,
            request_rendition_lists: s,
          });
        };
      n >= 4
        ? a.on("initFragmentLoaded", d)
        : a.on("initFragmentLoaded", function (e) {
            var t = e.type,
              a = e.fragmentModel,
              r = e.chunk;
            d({ type: t, request: l(a), chunk: r });
          });
      var u = function (e) {
        var t = e.type,
          r = e.chunk,
          n = e.request,
          o = r || {},
          s = o.mediaInfo,
          l = o.start,
          d = (s || {}).type,
          u = ey(n, a),
          c = u.requestStart,
          p = u.requestResponseStart,
          m = u.requestResponseEnd,
          h = u.requestBytesLoaded,
          _ = u.requestResponseHeaders,
          f = u.requestMediaDuration,
          v = u.requestHostname,
          y = u.requestUrl,
          g = u.requestId,
          b = eg(d, a),
          w = b.currentLevel,
          E = b.renditionWidth,
          T = b.renditionHeight;
        i("requestcompleted", {
          request_event_type: t,
          request_start: c,
          request_response_start: p,
          request_response_end: m,
          request_bytes_loaded: h,
          request_type: d,
          request_response_headers: _,
          request_hostname: v,
          request_id: g,
          request_url: y,
          request_media_start_time: l,
          request_media_duration: f,
          request_current_level: w,
          request_labeled_bitrate: b.renditionBitrate,
          request_video_width: E,
          request_video_height: T,
        });
      };
      n >= 4
        ? a.on("mediaFragmentLoaded", u)
        : a.on("mediaFragmentLoaded", function (e) {
            var t = e.type,
              a = e.fragmentModel,
              r = e.chunk;
            u({ type: t, request: l(a), chunk: r });
          });
      var c = { video: void 0, audio: void 0, totalBitrate: void 0 },
        p = function () {
          if (c.video && "number" == typeof c.video.bitrate) {
            if (!(c.video.width && c.video.height))
              return void r.warn(
                "have bitrate info for video but missing width/height",
              );
            var e = c.video.bitrate;
            if (
              (c.audio &&
                "number" == typeof c.audio.bitrate &&
                (e += c.audio.bitrate),
              e !== c.totalBitrate)
            )
              return (
                (c.totalBitrate = e),
                {
                  video_source_bitrate: e,
                  video_source_height: c.video.height,
                  video_source_width: c.video.width,
                  video_source_codec: eb(c.video.codec),
                }
              );
          }
        },
        m = function (e, t, n) {
          if ("number" != typeof e.newQuality)
            return void r.warn(
              "missing evt.newQuality in qualityChangeRendered event",
              e,
            );
          var o = e.mediaType;
          if ("audio" === o || "video" === o) {
            var s = a.getBitrateInfoListFor(o).find(function (t) {
              return t.qualityIndex === e.newQuality;
            });
            if (!(s && "number" == typeof s.bitrate))
              return void r.warn("missing bitrate info for ".concat(o));
            c[o] = el(es({}, s), { codec: a.getCurrentTrackFor(o).codec });
            var l = p();
            l && i("renditionchange", l);
          }
        };
      a.on("qualityChangeRendered", m);
      var h = function (e) {
        var t = e.request,
          a = e.mediaType;
        i("requestcanceled", {
          request_event_type: (t = t || {}).type + "_" + t.action,
          request_url: t.url,
          request_type: a,
          request_hostname: ee(t.url),
        });
      };
      a.on("fragmentLoadingAbandoned", h);
      var _ = function (e) {
        var t,
          a,
          r = e.error,
          n = (null == r || null == (t = r.data) ? void 0 : t.request) || {},
          o = (null == r || null == (a = r.data) ? void 0 : a.response) || {};
        (null == r ? void 0 : r.code) === 27 &&
          i("requestfailed", {
            request_error: n.type + "_" + n.action,
            request_url: n.url,
            request_hostname: ee(n.url),
            request_type: n.mediaType,
            request_error_code: o.status,
            request_error_text: o.statusText,
          });
        var s =
          "".concat(null != n && n.url ? "url: ".concat(n.url, "\n") : "") +
          "".concat(
            (null != o && o.status) || (null != o && o.statusText)
              ? "response: "
                  .concat(null == o ? void 0 : o.status, ", ")
                  .concat(null == o ? void 0 : o.statusText, "\n")
              : "",
          );
        i("error", {
          player_error_code: null == r ? void 0 : r.code,
          player_error_message: null == r ? void 0 : r.message,
          player_error_context: s,
        });
      };
      (a.on("error", _),
        (a._stopMuxMonitor = function () {
          (a.off("manifestLoaded", o),
            a.off("initFragmentLoaded", d),
            a.off("mediaFragmentLoaded", u),
            a.off("qualityChangeRendered", m),
            a.off("error", _),
            a.off("fragmentLoadingAbandoned", h),
            delete a._stopMuxMonitor);
        }));
    },
    eT = function (e) {
      e && "function" == typeof e._stopMuxMonitor && e._stopMuxMonitor();
    },
    ek = 0,
    ex = (function () {
      function e() {
        (Q(this, e), J(this, "_listeners", void 0));
      }
      return (
        K(e, [
          {
            key: "on",
            value: function (e, t, a) {
              return (
                (t._eventEmitterGuid = t._eventEmitterGuid || ++ek),
                (this._listeners = this._listeners || {}),
                (this._listeners[e] = this._listeners[e] || []),
                a && (t = t.bind(a)),
                this._listeners[e].push(t),
                t
              );
            },
          },
          {
            key: "off",
            value: function (e, t) {
              var a = this._listeners && this._listeners[e];
              a &&
                a.forEach(function (e, r) {
                  e._eventEmitterGuid === t._eventEmitterGuid && a.splice(r, 1);
                });
            },
          },
          {
            key: "one",
            value: function (e, t, a) {
              var r = this;
              t._eventEmitterGuid = t._eventEmitterGuid || ++ek;
              var n = function () {
                (r.off(e, n), t.apply(a || this, arguments));
              };
              ((n._eventEmitterGuid = t._eventEmitterGuid), this.on(e, n));
            },
          },
          {
            key: "emit",
            value: function (e, t) {
              var a = this;
              if (this._listeners) {
                t = t || {};
                var r = this._listeners["before" + e] || [],
                  n = this._listeners["before*"] || [],
                  i = this._listeners[e] || [],
                  o = this._listeners["after" + e] || [],
                  s = function (t, r) {
                    (t = t.slice()).forEach(function (t) {
                      t.call(a, { type: e }, r);
                    });
                  };
                (s(r, t), s(n, t), s(i, t), s(o, t));
              }
            },
          },
        ]),
        e
      );
    })(),
    eR = p(m()),
    eD = (function () {
      function e(t) {
        var a = this;
        (Q(this, e),
          J(this, "_playbackHeartbeatInterval", void 0),
          J(this, "_playheadShouldBeProgressing", void 0),
          J(this, "pm", void 0),
          (this.pm = t),
          (this._playbackHeartbeatInterval = null),
          (this._playheadShouldBeProgressing = !1),
          t.on("playing", function () {
            a._playheadShouldBeProgressing = !0;
          }),
          t.on("play", this._startPlaybackHeartbeatInterval.bind(this)),
          t.on("playing", this._startPlaybackHeartbeatInterval.bind(this)),
          t.on("adbreakstart", this._startPlaybackHeartbeatInterval.bind(this)),
          t.on("adplay", this._startPlaybackHeartbeatInterval.bind(this)),
          t.on("adplaying", this._startPlaybackHeartbeatInterval.bind(this)),
          t.on("devicewake", this._startPlaybackHeartbeatInterval.bind(this)),
          t.on("viewstart", this._startPlaybackHeartbeatInterval.bind(this)),
          t.on(
            "rebufferstart",
            this._startPlaybackHeartbeatInterval.bind(this),
          ),
          t.on("pause", this._stopPlaybackHeartbeatInterval.bind(this)),
          t.on("ended", this._stopPlaybackHeartbeatInterval.bind(this)),
          t.on("viewend", this._stopPlaybackHeartbeatInterval.bind(this)),
          t.on("error", this._stopPlaybackHeartbeatInterval.bind(this)),
          t.on("aderror", this._stopPlaybackHeartbeatInterval.bind(this)),
          t.on("adpause", this._stopPlaybackHeartbeatInterval.bind(this)),
          t.on("adended", this._stopPlaybackHeartbeatInterval.bind(this)),
          t.on("adbreakend", this._stopPlaybackHeartbeatInterval.bind(this)),
          t.on("seeked", function () {
            t.data.player_is_paused
              ? a._stopPlaybackHeartbeatInterval()
              : a._startPlaybackHeartbeatInterval();
          }),
          t.on("timeupdate", function () {
            null !== a._playbackHeartbeatInterval &&
              t.emit("playbackheartbeat");
          }),
          t.on("devicesleep", function (e, r) {
            null !== a._playbackHeartbeatInterval &&
              (eR.default.clearInterval(a._playbackHeartbeatInterval),
              t.emit("playbackheartbeatend", { viewer_time: r.viewer_time }),
              (a._playbackHeartbeatInterval = null));
          }));
      }
      return (
        K(e, [
          {
            key: "_startPlaybackHeartbeatInterval",
            value: function () {
              var e = this;
              null === this._playbackHeartbeatInterval &&
                (this.pm.emit("playbackheartbeat"),
                (this._playbackHeartbeatInterval = eR.default.setInterval(
                  function () {
                    e.pm.emit("playbackheartbeat");
                  },
                  this.pm.playbackHeartbeatTime,
                )));
            },
          },
          {
            key: "_stopPlaybackHeartbeatInterval",
            value: function () {
              ((this._playheadShouldBeProgressing = !1),
                null !== this._playbackHeartbeatInterval &&
                  (eR.default.clearInterval(this._playbackHeartbeatInterval),
                  this.pm.emit("playbackheartbeatend"),
                  (this._playbackHeartbeatInterval = null)));
            },
          },
        ]),
        e
      );
    })(),
    eS = function e(t) {
      var a = this;
      (Q(this, e),
        J(this, "viewErrored", void 0),
        t.on("viewinit", function () {
          a.viewErrored = !1;
        }),
        t.on("error", function (e, r) {
          try {
            var n = t.errorTranslator({
              player_error_code: r.player_error_code,
              player_error_message: r.player_error_message,
              player_error_context: r.player_error_context,
              player_error_severity: r.player_error_severity,
              player_error_business_exception:
                r.player_error_business_exception,
            });
            n &&
              ((t.data.player_error_code =
                n.player_error_code || r.player_error_code),
              (t.data.player_error_message =
                n.player_error_message || r.player_error_message),
              (t.data.player_error_context =
                n.player_error_context || r.player_error_context),
              (t.data.player_error_severity =
                n.player_error_severity || r.player_error_severity),
              (t.data.player_error_business_exception =
                n.player_error_business_exception ||
                r.player_error_business_exception),
              (a.viewErrored = !0));
          } catch (e) {
            (t.mux.log.warn("Exception in error translator callback.", e),
              (a.viewErrored = !0));
          }
        }),
        t.on("aftererror", function () {
          var e, a, r, n, i;
          (null == (e = t.data) || delete e.player_error_code,
            null == (a = t.data) || delete a.player_error_message,
            null == (r = t.data) || delete r.player_error_context,
            null == (n = t.data) || delete n.player_error_severity,
            null == (i = t.data) || delete i.player_error_business_exception);
        }));
    },
    eC = (function () {
      function e(t) {
        (Q(this, e),
          J(this, "_watchTimeTrackerLastCheckedTime", void 0),
          J(this, "pm", void 0),
          (this.pm = t),
          (this._watchTimeTrackerLastCheckedTime = null),
          t.on("playbackheartbeat", this._updateWatchTime.bind(this)),
          t.on("playbackheartbeatend", this._clearWatchTimeState.bind(this)));
      }
      return (
        K(e, [
          {
            key: "_updateWatchTime",
            value: function (e, t) {
              var a = t.viewer_time;
              (null === this._watchTimeTrackerLastCheckedTime &&
                (this._watchTimeTrackerLastCheckedTime = a),
                eo(
                  this.pm.data,
                  "view_watch_time",
                  a - this._watchTimeTrackerLastCheckedTime,
                ),
                (this._watchTimeTrackerLastCheckedTime = a));
            },
          },
          {
            key: "_clearWatchTimeState",
            value: function (e, t) {
              (this._updateWatchTime(e, t),
                (this._watchTimeTrackerLastCheckedTime = null));
            },
          },
        ]),
        e
      );
    })(),
    eP = (function () {
      function e(t) {
        var a = this;
        (Q(this, e),
          J(this, "_playbackTimeTrackerLastPlayheadPosition", void 0),
          J(this, "_lastTime", void 0),
          J(this, "_isAdPlaying", void 0),
          J(this, "_callbackUpdatePlaybackTime", void 0),
          J(this, "pm", void 0),
          (this.pm = t),
          (this._playbackTimeTrackerLastPlayheadPosition = -1),
          (this._lastTime = M()),
          (this._isAdPlaying = !1),
          (this._callbackUpdatePlaybackTime = null),
          t.on("viewinit", function () {
            a.pm.data.view_playing_time_ms_cumulative = 0;
          }));
        var r = this._startPlaybackTimeTracking.bind(this);
        (t.on("playing", r),
          t.on("adplaying", r),
          t.on("seeked", r),
          t.on("rebufferend", r));
        var n = this._stopPlaybackTimeTracking.bind(this);
        (t.on("playbackheartbeatend", n),
          t.on("seeking", n),
          t.on("rebufferstart", n),
          t.on("adplaying", function () {
            a._isAdPlaying = !0;
          }),
          t.on("adended", function () {
            a._isAdPlaying = !1;
          }),
          t.on("adpause", function () {
            a._isAdPlaying = !1;
          }),
          t.on("adbreakstart", function () {
            a._isAdPlaying = !1;
          }),
          t.on("adbreakend", function () {
            a._isAdPlaying = !1;
          }),
          t.on("adplay", function () {
            a._isAdPlaying = !1;
          }),
          t.on("viewinit", function () {
            ((a._playbackTimeTrackerLastPlayheadPosition = -1),
              (a._lastTime = M()),
              (a._isAdPlaying = !1),
              (a._callbackUpdatePlaybackTime = null));
          }));
      }
      return (
        K(e, [
          {
            key: "_startPlaybackTimeTracking",
            value: function () {
              null === this._callbackUpdatePlaybackTime &&
                ((this._callbackUpdatePlaybackTime =
                  this._updatePlaybackTime.bind(this)),
                (this._playbackTimeTrackerLastPlayheadPosition =
                  this.pm.data.player_playhead_time),
                (this._lastTime = M()),
                this.pm.on(
                  "playbackheartbeat",
                  this._callbackUpdatePlaybackTime,
                ));
            },
          },
          {
            key: "_stopPlaybackTimeTracking",
            value: function () {
              this._callbackUpdatePlaybackTime &&
                (this._updatePlaybackTime(),
                this.pm.off(
                  "playbackheartbeat",
                  this._callbackUpdatePlaybackTime,
                ),
                (this._callbackUpdatePlaybackTime = null),
                (this._playbackTimeTrackerLastPlayheadPosition = -1));
            },
          },
          {
            key: "_updatePlaybackTime",
            value: function () {
              var e = this.pm.data.player_playhead_time || 0,
                t = M(),
                a = t - this._lastTime,
                r = -1;
              (this._playbackTimeTrackerLastPlayheadPosition >= 0 &&
              e > this._playbackTimeTrackerLastPlayheadPosition
                ? (r = e - this._playbackTimeTrackerLastPlayheadPosition)
                : this._isAdPlaying && (r = a),
                r > 0 &&
                  r <= 1e3 &&
                  eo(this.pm.data, "view_content_playback_time", r),
                null !== this._callbackUpdatePlaybackTime &&
                  a > 0 &&
                  a <= 1e3 &&
                  (this._isAdPlaying &&
                    eo(this.pm.data, "ad_playing_time_ms_cumulative", a),
                  eo(this.pm.data, "view_playing_time_ms_cumulative", a)),
                (this._playbackTimeTrackerLastPlayheadPosition = e),
                (this._lastTime = t));
            },
          },
        ]),
        e
      );
    })(),
    eN = (function () {
      function e(t) {
        (Q(this, e), J(this, "pm", void 0), (this.pm = t));
        var a = this._updatePlayheadTime.bind(this);
        (t.on("playbackheartbeat", a),
          t.on("playbackheartbeatend", a),
          t.on("timeupdate", a),
          t.on("destroy", function () {
            t.off("timeupdate", a);
          }));
      }
      return (
        K(e, [
          {
            key: "_updateMaxPlayheadPosition",
            value: function () {
              this.pm.data.view_max_playhead_position =
                void 0 === this.pm.data.view_max_playhead_position
                  ? this.pm.data.player_playhead_time
                  : Math.max(
                      this.pm.data.view_max_playhead_position,
                      this.pm.data.player_playhead_time,
                    );
            },
          },
          {
            key: "_updatePlayheadTime",
            value: function (e, t) {
              var a = this,
                r = function () {
                  a.pm.currentFragmentPDT &&
                    a.pm.currentFragmentStart &&
                    (a.pm.data.player_program_time =
                      a.pm.currentFragmentPDT +
                      a.pm.data.player_playhead_time -
                      a.pm.currentFragmentStart);
                };
              if (t && t.player_playhead_time)
                ((this.pm.data.player_playhead_time = t.player_playhead_time),
                  r(),
                  this._updateMaxPlayheadPosition());
              else if (this.pm.getPlayheadTime) {
                var n = this.pm.getPlayheadTime();
                void 0 !== n &&
                  ((this.pm.data.player_playhead_time = n),
                  r(),
                  this._updateMaxPlayheadPosition());
              }
            },
          },
        ]),
        e
      );
    })(),
    eq = function e(t) {
      if ((Q(this, e), !t.disableRebufferTracking)) {
        var a,
          r = function (e, t) {
            (n(t), (a = void 0));
          },
          n = function (e) {
            if (a) {
              var r = e.viewer_time - a;
              (eo(t.data, "view_rebuffer_duration", r),
                (a = e.viewer_time),
                t.data.view_rebuffer_duration > 3e5 &&
                  (t.emit("viewend"),
                  t.send("viewend"),
                  t.mux.log.warn(
                    "Ending view after rebuffering for longer than ".concat(
                      3e5,
                      "ms, future events will be ignored unless a programchange or videochange occurs.",
                    ),
                  )));
            }
            t.data.view_watch_time >= 0 &&
              t.data.view_rebuffer_count > 0 &&
              ((t.data.view_rebuffer_frequency =
                t.data.view_rebuffer_count / t.data.view_watch_time),
              (t.data.view_rebuffer_percentage =
                t.data.view_rebuffer_duration / t.data.view_watch_time));
          };
        (t.on("playbackheartbeat", function (e, t) {
          return n(t);
        }),
          t.on("rebufferstart", function (e, n) {
            a ||
              (eo(t.data, "view_rebuffer_count", 1),
              (a = n.viewer_time),
              t.one("rebufferend", r));
          }),
          t.on("viewinit", function () {
            ((a = void 0), t.off("rebufferend", r));
          }));
      }
    },
    eO = (function () {
      function e(t) {
        var a = this;
        (Q(this, e),
          J(this, "_lastCheckedTime", void 0),
          J(this, "_lastPlayheadTime", void 0),
          J(this, "_lastPlayheadTimeUpdatedTime", void 0),
          J(this, "_rebuffering", void 0),
          J(this, "pm", void 0),
          (this.pm = t),
          t.disableRebufferTracking ||
            t.disablePlayheadRebufferTracking ||
            ((this._lastCheckedTime = null),
            (this._lastPlayheadTime = null),
            (this._lastPlayheadTimeUpdatedTime = null),
            t.on("playbackheartbeat", this._checkIfRebuffering.bind(this)),
            t.on(
              "playbackheartbeatend",
              this._cleanupRebufferTracker.bind(this),
            ),
            t.on("seeking", function () {
              a._cleanupRebufferTracker(null, { viewer_time: M() });
            })));
      }
      return (
        K(e, [
          {
            key: "_checkIfRebuffering",
            value: function (e, t) {
              if (
                this.pm.seekingTracker.isSeeking ||
                this.pm.adTracker.isAdBreak ||
                !this.pm.playbackHeartbeat._playheadShouldBeProgressing
              )
                return void this._cleanupRebufferTracker(e, t);
              if (null === this._lastCheckedTime)
                return void this._prepareRebufferTrackerState(t.viewer_time);
              if (this._lastPlayheadTime !== this.pm.data.player_playhead_time)
                return void this._cleanupRebufferTracker(e, t, !0);
              var a = t.viewer_time - this._lastPlayheadTimeUpdatedTime;
              ("number" == typeof this.pm.sustainedRebufferThreshold &&
                a >= this.pm.sustainedRebufferThreshold &&
                (this._rebuffering ||
                  ((this._rebuffering = !0),
                  this.pm.emit("rebufferstart", {
                    viewer_time: this._lastPlayheadTimeUpdatedTime,
                  }))),
                (this._lastCheckedTime = t.viewer_time));
            },
          },
          {
            key: "_clearRebufferTrackerState",
            value: function () {
              ((this._lastCheckedTime = null),
                (this._lastPlayheadTime = null),
                (this._lastPlayheadTimeUpdatedTime = null));
            },
          },
          {
            key: "_prepareRebufferTrackerState",
            value: function (e) {
              ((this._lastCheckedTime = e),
                (this._lastPlayheadTime = this.pm.data.player_playhead_time),
                (this._lastPlayheadTimeUpdatedTime = e));
            },
          },
          {
            key: "_cleanupRebufferTracker",
            value: function (e, t) {
              var a =
                arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
              if (this._rebuffering)
                ((this._rebuffering = !1),
                  this.pm.emit("rebufferend", { viewer_time: t.viewer_time }));
              else {
                if (null === this._lastCheckedTime) return;
                var r =
                    this.pm.data.player_playhead_time - this._lastPlayheadTime,
                  n = t.viewer_time - this._lastPlayheadTimeUpdatedTime;
                "number" == typeof this.pm.minimumRebufferDuration &&
                  r > 0 &&
                  n - r > this.pm.minimumRebufferDuration &&
                  ((this._lastCheckedTime = null),
                  this.pm.emit("rebufferstart", {
                    viewer_time: this._lastPlayheadTimeUpdatedTime,
                  }),
                  this.pm.emit("rebufferend", {
                    viewer_time: this._lastPlayheadTimeUpdatedTime + n - r,
                  }));
              }
              a
                ? this._prepareRebufferTrackerState(t.viewer_time)
                : this._clearRebufferTrackerState();
            },
          },
        ]),
        e
      );
    })(),
    eA = (function () {
      function e(t) {
        var a = this;
        (Q(this, e),
          J(this, "pm", void 0),
          (this.pm = t),
          t.on("viewinit", function () {
            var e = t.data,
              r = e.view_id;
            if (!e.view_program_changed) {
              var n = function (e, n) {
                var i = n.viewer_time;
                "playing" === e.type &&
                void 0 === t.data.view_time_to_first_frame
                  ? a.calculateTimeToFirstFrame(i || M(), r)
                  : "adplaying" === e.type &&
                    (void 0 === t.data.view_time_to_first_frame ||
                      a._inPrerollPosition()) &&
                    a.calculateTimeToFirstFrame(i || M(), r);
              };
              (t.one("playing", n),
                t.one("adplaying", n),
                t.one("viewend", function () {
                  (t.off("playing", n), t.off("adplaying", n));
                }));
            }
          }));
      }
      return (
        K(e, [
          {
            key: "_inPrerollPosition",
            value: function () {
              return (
                void 0 === this.pm.data.view_content_playback_time ||
                this.pm.data.view_content_playback_time <= 1e3
              );
            },
          },
          {
            key: "calculateTimeToFirstFrame",
            value: function (e, t) {
              t === this.pm.data.view_id &&
                (this.pm.watchTimeTracker._updateWatchTime(null, {
                  viewer_time: e,
                }),
                (this.pm.data.view_time_to_first_frame =
                  this.pm.data.view_watch_time),
                (this.pm.data.player_autoplay_on ||
                  this.pm.data.video_is_autoplay) &&
                  this.pm.pageLoadInitTime &&
                  (this.pm.data.view_aggregate_startup_time =
                    this.pm.data.view_start +
                    this.pm.data.view_watch_time -
                    this.pm.pageLoadInitTime));
            },
          },
        ]),
        e
      );
    })(),
    eL = function e(t) {
      var a = this;
      (Q(this, e),
        J(this, "_lastPlayerHeight", void 0),
        J(this, "_lastPlayerWidth", void 0),
        J(this, "_lastPlayheadPosition", void 0),
        J(this, "_lastSourceHeight", void 0),
        J(this, "_lastSourceWidth", void 0),
        t.on("viewinit", function () {
          a._lastPlayheadPosition = -1;
        }),
        [
          "pause",
          "rebufferstart",
          "seeking",
          "error",
          "adbreakstart",
          "hb",
          "renditionchange",
          "orientationchange",
          "viewend",
          "playbackmodechange",
        ].forEach(function (e) {
          t.on(e, function () {
            if (
              a._lastPlayheadPosition >= 0 &&
              t.data.player_playhead_time >= 0 &&
              a._lastPlayerWidth >= 0 &&
              a._lastSourceWidth > 0 &&
              a._lastPlayerHeight >= 0 &&
              a._lastSourceHeight > 0
            ) {
              var e = t.data.player_playhead_time - a._lastPlayheadPosition;
              if (e < 0) {
                a._lastPlayheadPosition = -1;
                return;
              }
              var r = Math.min(
                  a._lastPlayerWidth / a._lastSourceWidth,
                  a._lastPlayerHeight / a._lastSourceHeight,
                ),
                n = Math.max(0, r - 1),
                i = Math.max(0, 1 - r);
              ((t.data.view_max_upscale_percentage = Math.max(
                t.data.view_max_upscale_percentage || 0,
                n,
              )),
                (t.data.view_max_downscale_percentage = Math.max(
                  t.data.view_max_downscale_percentage || 0,
                  i,
                )),
                eo(t.data, "view_total_content_playback_time", e),
                eo(t.data, "view_total_upscaling", n * e),
                eo(t.data, "view_total_downscaling", i * e));
            }
            a._lastPlayheadPosition = -1;
          });
        }),
        [
          "playing",
          "hb",
          "renditionchange",
          "orientationchange",
          "playbackmodechange",
        ].forEach(function (e) {
          t.on(e, function () {
            ((a._lastPlayheadPosition = t.data.player_playhead_time),
              (a._lastPlayerWidth = t.data.player_width),
              (a._lastPlayerHeight = t.data.player_height),
              (a._lastSourceWidth = t.data.video_source_width),
              (a._lastSourceHeight = t.data.video_source_height));
          });
        }));
    },
    eI = function e(t) {
      var a = this;
      (Q(this, e), J(this, "isSeeking", void 0), (this.isSeeking = !1));
      var r = -1,
        n = function () {
          var e = M(),
            n = (t.data.viewer_time || e) - (r || e);
          (eo(t.data, "view_seek_duration", n),
            (t.data.view_max_seek_time = Math.max(
              t.data.view_max_seek_time || 0,
              n,
            )),
            (a.isSeeking = !1),
            (r = -1));
        };
      (t.on("seeking", function (e, i) {
        if (
          (Object.assign(t.data, i), a.isSeeking && i.viewer_time - r <= 2e3)
        ) {
          r = i.viewer_time;
          return;
        }
        (a.isSeeking && n(),
          (a.isSeeking = !0),
          (r = i.viewer_time),
          eo(t.data, "view_seek_count", 1),
          t.send("seeking"));
      }),
        t.on("seeked", function () {
          n();
        }),
        t.on("viewend", function () {
          (a.isSeeking && (n(), t.send("seeked")),
            (a.isSeeking = !1),
            (r = -1));
        }));
    },
    eM = function (e, t) {
      (e.push(t),
        e.sort(function (e, t) {
          return e.viewer_time - t.viewer_time;
        }));
    },
    eH = [
      "adbreakstart",
      "adrequest",
      "adresponse",
      "adplay",
      "adplaying",
      "adpause",
      "adended",
      "adbreakend",
      "aderror",
      "adclicked",
      "adskipped",
    ],
    ej = (function () {
      function e(t) {
        var a = this;
        (Q(this, e),
          J(this, "_adHasPlayed", void 0),
          J(this, "_adRequests", void 0),
          J(this, "_adResponses", void 0),
          J(this, "_currentAdRequestNumber", void 0),
          J(this, "_currentAdResponseNumber", void 0),
          J(this, "_prerollPlayTime", void 0),
          J(this, "_wouldBeNewAdPlay", void 0),
          J(this, "isAdBreak", void 0),
          J(this, "pm", void 0),
          (this.pm = t),
          t.on("viewinit", function () {
            ((a.isAdBreak = !1),
              (a._currentAdRequestNumber = 0),
              (a._currentAdResponseNumber = 0),
              (a._adRequests = []),
              (a._adResponses = []),
              (a._adHasPlayed = !1),
              (a._wouldBeNewAdPlay = !0),
              (a._prerollPlayTime = void 0));
          }),
          eH.forEach(function (e) {
            return t.on(e, a._updateAdData.bind(a));
          }));
        var r = function () {
          a.isAdBreak = !1;
        };
        (t.on("adbreakstart", function () {
          a.isAdBreak = !0;
        }),
          t.on("play", r),
          t.on("playing", r),
          t.on("viewend", r),
          t.on("adrequest", function (e, r) {
            ((r = Object.assign(
              {
                ad_request_id:
                  "generatedAdRequestId" + a._currentAdRequestNumber++,
              },
              r,
            )),
              eM(a._adRequests, r),
              eo(t.data, "view_ad_request_count"),
              a.inPrerollPosition() &&
                ((t.data.view_preroll_requested = !0),
                a._adHasPlayed || eo(t.data, "view_preroll_request_count")));
          }),
          t.on("adresponse", function (e, r) {
            ((r = Object.assign(
              {
                ad_request_id:
                  "generatedAdRequestId" + a._currentAdResponseNumber++,
              },
              r,
            )),
              eM(a._adResponses, r));
            var n = a.findAdRequest(r.ad_request_id);
            n &&
              eo(
                t.data,
                "view_ad_request_time",
                Math.max(0, r.viewer_time - n.viewer_time),
              );
          }),
          t.on("adplay", function (e, r) {
            ((a._adHasPlayed = !0),
              a._wouldBeNewAdPlay &&
                ((a._wouldBeNewAdPlay = !1),
                eo(t.data, "view_ad_played_count")),
              a.inPrerollPosition() &&
                !t.data.view_preroll_played &&
                ((t.data.view_preroll_played = !0),
                a._adRequests.length > 0 &&
                  (t.data.view_preroll_request_time = Math.max(
                    0,
                    r.viewer_time - a._adRequests[0].viewer_time,
                  )),
                t.data.view_start &&
                  (t.data.view_startup_preroll_request_time = Math.max(
                    0,
                    r.viewer_time - t.data.view_start,
                  )),
                (a._prerollPlayTime = r.viewer_time)));
          }),
          t.on("adplaying", function (e, r) {
            a.inPrerollPosition() &&
              void 0 === t.data.view_preroll_load_time &&
              void 0 !== a._prerollPlayTime &&
              ((t.data.view_preroll_load_time =
                r.viewer_time - a._prerollPlayTime),
              (t.data.view_startup_preroll_load_time =
                r.viewer_time - a._prerollPlayTime));
          }),
          t.on("adclicked", function (e, r) {
            a._wouldBeNewAdPlay || eo(t.data, "view_ad_clicked_count");
          }),
          t.on("adskipped", function (e, r) {
            a._wouldBeNewAdPlay || eo(t.data, "view_ad_skipped_count");
          }),
          t.on("adended", function () {
            a._wouldBeNewAdPlay = !0;
          }),
          t.on("aderror", function () {
            a._wouldBeNewAdPlay = !0;
          }));
      }
      return (
        K(e, [
          {
            key: "inPrerollPosition",
            value: function () {
              return (
                void 0 === this.pm.data.view_content_playback_time ||
                this.pm.data.view_content_playback_time <= 1e3
              );
            },
          },
          {
            key: "findAdRequest",
            value: function (e) {
              for (var t = 0; t < this._adRequests.length; t++)
                if (this._adRequests[t].ad_request_id === e)
                  return this._adRequests[t];
            },
          },
          {
            key: "_updateAdData",
            value: function (e, t) {
              if (this.inPrerollPosition()) {
                if (
                  !this.pm.data.view_preroll_ad_tag_hostname &&
                  t.ad_tag_url
                ) {
                  var a = O(et(t.ad_tag_url), 2),
                    r = a[0],
                    n = a[1];
                  ((this.pm.data.view_preroll_ad_tag_domain = n),
                    (this.pm.data.view_preroll_ad_tag_hostname = r));
                }
                if (
                  !this.pm.data.view_preroll_ad_asset_hostname &&
                  t.ad_asset_url
                ) {
                  var i = O(et(t.ad_asset_url), 2),
                    o = i[0],
                    s = i[1];
                  ((this.pm.data.view_preroll_ad_asset_domain = s),
                    (this.pm.data.view_preroll_ad_asset_hostname = o));
                }
                this.pm.data.ad_type = "preroll";
              }
              ((this.pm.data.ad_asset_url =
                null == t ? void 0 : t.ad_asset_url),
                (this.pm.data.ad_tag_url = null == t ? void 0 : t.ad_tag_url),
                (this.pm.data.ad_creative_id =
                  null == t ? void 0 : t.ad_creative_id),
                (this.pm.data.ad_id = null == t ? void 0 : t.ad_id),
                (this.pm.data.ad_universal_id =
                  null == t ? void 0 : t.ad_universal_id),
                null != t &&
                  t.ad_type &&
                  (this.pm.data.ad_type = null == t ? void 0 : t.ad_type));
            },
          },
        ]),
        e
      );
    })(),
    eB = function e(t) {
      var a = this;
      (Q(this, e), J(this, "lastWallClockTime", void 0));
      var r = function () {
          ((a.lastWallClockTime = M()), t.on("before*", n));
        },
        n = function (e) {
          var r = M(),
            n = a.lastWallClockTime;
          ((a.lastWallClockTime = r),
            r - n > 3e4 &&
              (t.emit("devicesleep", { viewer_time: n }),
              Object.assign(t.data, { viewer_time: n }),
              t.send("devicesleep"),
              t.emit("devicewake", { viewer_time: r }),
              Object.assign(t.data, { viewer_time: r }),
              t.send("devicewake")));
        };
      (t.one("playbackheartbeat", r),
        t.on("playbackheartbeatend", function () {
          (t.off("before*", n), t.one("playbackheartbeat", r));
        }));
    },
    eU = p(m()),
    eF =
      ((th = function () {
        for (var e = 0, t = {}; e < arguments.length; e++) {
          var a = arguments[e];
          for (var r in a) t[r] = a[r];
        }
        return t;
      }),
      (function e(t) {
        function a(e, r, n) {
          var i;
          if ("u" > typeof document) {
            if (arguments.length > 1) {
              if (
                "number" ==
                typeof (n = th({ path: "/" }, a.defaults, n)).expires
              ) {
                var o = new Date();
                (o.setMilliseconds(o.getMilliseconds() + 864e5 * n.expires),
                  (n.expires = o));
              }
              try {
                ((i = JSON.stringify(r)), /^[\{\[]/.test(i) && (r = i));
              } catch (e) {}
              return (
                (r = t.write
                  ? t.write(r, e)
                  : encodeURIComponent(String(r)).replace(
                      /%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g,
                      decodeURIComponent,
                    )),
                (e = (e = (e = encodeURIComponent(String(e))).replace(
                  /%(23|24|26|2B|5E|60|7C)/g,
                  decodeURIComponent,
                )).replace(/[\(\)]/g, escape)),
                (document.cookie = [
                  e,
                  "=",
                  r,
                  n.expires ? "; expires=" + n.expires.toUTCString() : "",
                  n.path ? "; path=" + n.path : "",
                  n.domain ? "; domain=" + n.domain : "",
                  n.secure ? "; secure" : "",
                ].join(""))
              );
            }
            e || (i = {});
            for (
              var s = document.cookie ? document.cookie.split("; ") : [],
                l = /(%[0-9A-Z]{2})+/g,
                d = 0;
              d < s.length;
              d++
            ) {
              var u = s[d].split("="),
                c = u.slice(1).join("=");
              '"' === c.charAt(0) && (c = c.slice(1, -1));
              try {
                var p = u[0].replace(l, decodeURIComponent);
                if (
                  ((c = t.read
                    ? t.read(c, p)
                    : t(c, p) || c.replace(l, decodeURIComponent)),
                  this.json)
                )
                  try {
                    c = JSON.parse(c);
                  } catch (e) {}
                if (e === p) {
                  i = c;
                  break;
                }
                e || (i[p] = c);
              } catch (e) {}
            }
            return i;
          }
        }
        return (
          (a.set = a),
          (a.get = function (e) {
            return a.call(a, e);
          }),
          (a.getJSON = function () {
            return a.apply({ json: !0 }, [].slice.call(arguments));
          }),
          (a.defaults = {}),
          (a.remove = function (e, t) {
            a(e, "", th(t, { expires: -1 }));
          }),
          (a.withConverter = e),
          a
        );
      })(function () {})),
    eV = "muxData",
    eG = function () {
      var e;
      try {
        e = (eF.get(eV) || "").split("&").reduce(function (e, t) {
          var a = O(t.split("="), 2),
            r = a[0],
            n = a[1],
            i = +n;
          return ((e[r] = n && i == n ? i : n), e);
        }, {});
      } catch (t) {
        e = {};
      }
      return e;
    },
    eZ = function (e) {
      try {
        eF.set(
          eV,
          Object.entries(e)
            .map(function (e) {
              var t = O(e, 2),
                a = t[0],
                r = t[1];
              return "".concat(a, "=").concat(r);
            })
            .join("&"),
          { expires: 365 },
        );
      } catch (e) {}
    },
    eW = function () {
      var e = eG();
      return (
        (e.mux_viewer_id = e.mux_viewer_id || H()),
        (e.msn = e.msn || Math.random()),
        eZ(e),
        { mux_viewer_id: e.mux_viewer_id, mux_sample_number: e.msn }
      );
    },
    eQ = function () {
      var e = eG(),
        t = M();
      return (
        e.session_start && ((e.sst = e.session_start), delete e.session_start),
        e.session_id && ((e.sid = e.session_id), delete e.session_id),
        e.session_expires &&
          ((e.sex = e.session_expires), delete e.session_expires),
        (!e.sex || e.sex < t) && ((e.sid = H()), (e.sst = t)),
        (e.sex = t + 15e5),
        eZ(e),
        { session_id: e.sid, session_start: e.sst, session_expires: e.sex }
      );
    },
    ez = p(m()),
    eK = function () {
      var e;
      switch (eJ()) {
        case "cellular":
          e = "cellular";
          break;
        case "ethernet":
          e = "wired";
          break;
        case "wifi":
          e = "wifi";
          break;
        case void 0:
          break;
        default:
          e = "other";
      }
      return e;
    },
    eJ = function () {
      var e = ez.default.navigator,
        t = e && (e.connection || e.mozConnection || e.webkitConnection);
      return t && t.type;
    };
  eK.getConnectionFromAPI = eJ;
  var e$ = eX({
      a: "env",
      b: "beacon",
      c: "custom",
      d: "ad",
      e: "event",
      f: "experiment",
      i: "internal",
      m: "mux",
      n: "response",
      p: "player",
      q: "request",
      r: "retry",
      s: "session",
      t: "timestamp",
      u: "viewer",
      v: "video",
      w: "page",
      x: "view",
      y: "sub",
    }),
    eY = eX({
      ad: "ad",
      af: "affiliate",
      ag: "aggregate",
      ap: "api",
      al: "application",
      ao: "audio",
      ar: "architecture",
      as: "asset",
      au: "autoplay",
      av: "average",
      bi: "bitrate",
      bn: "brand",
      br: "break",
      bw: "browser",
      by: "bytes",
      bz: "business",
      ca: "cached",
      cb: "cancel",
      cc: "codec",
      cd: "code",
      cg: "category",
      ch: "changed",
      ci: "client",
      ck: "clicked",
      cl: "canceled",
      cm: "cmcd",
      cn: "config",
      co: "count",
      ce: "counter",
      cp: "complete",
      cq: "creator",
      cr: "creative",
      cs: "captions",
      ct: "content",
      cu: "current",
      cv: "cumulative",
      cx: "connection",
      cz: "context",
      da: "data",
      dg: "downscaling",
      dm: "domain",
      dn: "cdn",
      do: "downscale",
      dr: "drm",
      dp: "dropped",
      du: "duration",
      dv: "device",
      dy: "dynamic",
      eb: "enabled",
      ec: "encoding",
      ed: "edge",
      en: "end",
      eg: "engine",
      em: "embed",
      er: "error",
      ep: "experiments",
      es: "errorcode",
      et: "errortext",
      ee: "event",
      ev: "events",
      ex: "expires",
      ez: "exception",
      fa: "failed",
      fi: "first",
      fm: "family",
      ft: "format",
      fp: "fps",
      fq: "frequency",
      fr: "frame",
      fs: "fullscreen",
      ha: "has",
      hb: "holdback",
      he: "headers",
      ho: "host",
      hn: "hostname",
      ht: "height",
      id: "id",
      ii: "init",
      in: "instance",
      ip: "ip",
      is: "is",
      ke: "key",
      la: "language",
      lb: "labeled",
      le: "level",
      li: "live",
      ld: "loaded",
      lo: "load",
      ls: "lists",
      lt: "latency",
      ma: "max",
      md: "media",
      me: "message",
      mf: "manifest",
      mi: "mime",
      ml: "midroll",
      mm: "min",
      mn: "manufacturer",
      mo: "model",
      mp: "mode",
      ms: "ms",
      mx: "mux",
      ne: "newest",
      nm: "name",
      no: "number",
      on: "on",
      or: "origin",
      os: "os",
      pa: "paused",
      pb: "playback",
      pd: "producer",
      pe: "percentage",
      pf: "played",
      pg: "program",
      ph: "playhead",
      pi: "plugin",
      pl: "preroll",
      pn: "playing",
      po: "poster",
      pp: "pip",
      pr: "preload",
      ps: "position",
      pt: "part",
      pv: "previous",
      py: "property",
      px: "pop",
      pz: "plan",
      ra: "rate",
      rd: "requested",
      re: "rebuffer",
      rf: "rendition",
      rg: "range",
      rm: "remote",
      ro: "ratio",
      rp: "response",
      rq: "request",
      rs: "requests",
      sa: "sample",
      sd: "skipped",
      se: "session",
      sh: "shift",
      sk: "seek",
      sm: "stream",
      so: "source",
      sq: "sequence",
      sr: "series",
      ss: "status",
      st: "start",
      su: "startup",
      sv: "server",
      sw: "software",
      sy: "severity",
      ta: "tag",
      tc: "tech",
      te: "text",
      tg: "target",
      th: "throughput",
      ti: "time",
      tl: "total",
      to: "to",
      tt: "title",
      ty: "type",
      ug: "upscaling",
      un: "universal",
      up: "upscale",
      ur: "url",
      us: "user",
      va: "variant",
      vd: "viewed",
      vi: "video",
      ve: "version",
      vw: "view",
      vr: "viewer",
      wd: "width",
      wa: "watch",
      wt: "waiting",
    });
  function eX(e) {
    var t = {};
    for (var a in e) e.hasOwnProperty(a) && (t[e[a]] = a);
    return t;
  }
  function e0(e) {
    var t = {},
      a = {};
    return (
      Object.keys(e).forEach(function (r) {
        var n = !1;
        if (e.hasOwnProperty(r) && void 0 !== e[r]) {
          var i = r.split("_"),
            o = i[0],
            s = e$[o];
          (s ||
            (V.info("Data key word `" + i[0] + "` not expected in " + r),
            (s = o + "_")),
            i.splice(1).forEach(function (e) {
              ("url" === e && (n = !0),
                eY[e]
                  ? (s += eY[e])
                  : Number.isInteger(Number(e))
                    ? (s += e)
                    : (V.info("Data key word `" + e + "` not expected in " + r),
                      (s += "_" + e + "_")));
            }),
            n ? (a[s] = e[r]) : (t[s] = e[r]));
        }
      }),
      Object.assign(t, a)
    );
  }
  var e1 = p(m()),
    e2 = p(P()),
    e3 = {
      maxBeaconSize: 300,
      maxQueueLength: 3600,
      baseTimeBetweenBeacons: 1e4,
      maxPayloadKBSize: 500,
    },
    e5 = ["hb", "requestcompleted", "requestfailed", "requestcanceled"],
    e4 = function (e) {
      var t =
        arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
      ((this._beaconUrl = e || "https://img.litix.io"),
        (this._eventQueue = []),
        (this._postInFlight = !1),
        (this._resendAfterPost = !1),
        (this._failureCount = 0),
        (this._sendTimeout = !1),
        (this._options = Object.assign({}, e3, t)));
    };
  ((e4.prototype.queueEvent = function (e, t) {
    var a = Object.assign({}, t);
    return (
      (this._eventQueue.length <= this._options.maxQueueLength ||
        "eventrateexceeded" === e) &&
      (this._eventQueue.push(a),
      this._sendTimeout || this._startBeaconSending(),
      this._eventQueue.length <= this._options.maxQueueLength)
    );
  }),
    (e4.prototype.flushEvents = function () {
      var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
      e && 1 === this._eventQueue.length
        ? this._eventQueue.pop()
        : (this._eventQueue.length && this._sendBeaconQueue(),
          this._startBeaconSending());
    }),
    (e4.prototype.destroy = function () {
      var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
      ((this.destroyed = !0),
        e ? this._clearBeaconQueue() : this.flushEvents(),
        e1.default.clearTimeout(this._sendTimeout));
    }),
    (e4.prototype._clearBeaconQueue = function () {
      var e =
          this._eventQueue.length > this._options.maxBeaconSize
            ? this._eventQueue.length - this._options.maxBeaconSize
            : 0,
        t = this._eventQueue.slice(e);
      e > 0 &&
        Object.assign(
          t[t.length - 1],
          e0({ mux_view_message: "event queue truncated" }),
        );
      var a = this._createPayload(t);
      e9(this._beaconUrl, a, !0, function () {});
    }),
    (e4.prototype._sendBeaconQueue = function () {
      var e = this;
      if (this._postInFlight) {
        this._resendAfterPost = !0;
        return;
      }
      var t = this._eventQueue.slice(0, this._options.maxBeaconSize);
      ((this._eventQueue = this._eventQueue.slice(this._options.maxBeaconSize)),
        (this._postInFlight = !0));
      var a = this._createPayload(t),
        r = M();
      e9(this._beaconUrl, a, !1, function (a, n) {
        (n
          ? ((e._eventQueue = t.concat(e._eventQueue)),
            (e._failureCount += 1),
            V.info("Error sending beacon: " + n))
          : (e._failureCount = 0),
          (e._roundTripTime = M() - r),
          (e._postInFlight = !1),
          e._resendAfterPost &&
            ((e._resendAfterPost = !1),
            e._eventQueue.length > 0 && e._sendBeaconQueue()));
      });
    }),
    (e4.prototype._getNextBeaconTime = function () {
      if (!this._failureCount) return this._options.baseTimeBetweenBeacons;
      var e = Math.pow(2, this._failureCount - 1);
      return (1 + (e *= Math.random())) * this._options.baseTimeBetweenBeacons;
    }),
    (e4.prototype._startBeaconSending = function () {
      var e = this;
      (e1.default.clearTimeout(this._sendTimeout),
        this.destroyed ||
          (this._sendTimeout = e1.default.setTimeout(function () {
            (e._eventQueue.length && e._sendBeaconQueue(),
              e._startBeaconSending());
          }, this._getNextBeaconTime())));
    }),
    (e4.prototype._createPayload = function (e) {
      var t = this,
        a = { transmission_timestamp: Math.round(M()) };
      this._roundTripTime && (a.rtt_ms = Math.round(this._roundTripTime));
      var r,
        n,
        i,
        o = function () {
          i =
            (r = JSON.stringify({ metadata: a, events: n || e })).length / 1024;
        },
        s = function () {
          return i <= t._options.maxPayloadKBSize;
        };
      return (
        o(),
        s() ||
          (V.info(
            "Payload size is too big (" +
              i +
              " kb). Removing unnecessary events.",
          ),
          (n = e.filter(function (e) {
            return -1 === e5.indexOf(e.e);
          })),
          o()),
        s() ||
          (V.info(
            "Payload size still too big (" + i + " kb). Cropping fields..",
          ),
          n.forEach(function (e) {
            for (var t in e) {
              var a = e[t];
              "string" == typeof a &&
                a.length > 51200 &&
                (e[t] = a.substring(0, 51200));
            }
          }),
          o()),
        r
      );
    }));
  var e6 =
      "function" == typeof e2.default.exitPictureInPicture
        ? function (e) {
            return e.length <= 57344;
          }
        : function (e) {
            return !1;
          },
    e9 = function (e, t, a, r) {
      if (a && navigator && navigator.sendBeacon && navigator.sendBeacon(e, t))
        return void r();
      if (e1.default.fetch)
        return void e1.default
          .fetch(e, {
            method: "POST",
            body: t,
            headers: { "Content-Type": "text/plain" },
            keepalive: e6(t),
          })
          .then(function (e) {
            return r(null, e.ok ? null : "Error");
          })
          .catch(function (e) {
            return r(null, e);
          });
      if (e1.default.XMLHttpRequest) {
        var n = new e1.default.XMLHttpRequest();
        ((n.onreadystatechange = function () {
          if (4 === n.readyState)
            return r(null, 200 !== n.status ? "error" : void 0);
        }),
          n.open("POST", e),
          n.setRequestHeader("Content-Type", "text/plain"),
          n.send(t));
        return;
      }
      r();
    },
    e7 = [
      "env_key",
      "view_id",
      "view_sequence_number",
      "player_sequence_number",
      "beacon_domain",
      "player_playhead_time",
      "viewer_time",
      "mux_api_version",
      "event",
      "video_id",
      "player_instance_id",
      "player_error_code",
      "player_error_message",
      "player_error_context",
      "player_error_severity",
      "player_error_business_exception",
      "view_playing_time_ms_cumulative",
      "ad_playing_time_ms_cumulative",
    ],
    e8 = [
      "adplay",
      "adplaying",
      "adpause",
      "adfirstquartile",
      "admidpoint",
      "adthirdquartile",
      "adended",
      "adresponse",
      "adrequest",
    ],
    te = ["ad_id", "ad_creative_id", "ad_universal_id"],
    tt = ["viewstart", "error", "ended", "viewend"],
    ta = (function () {
      function e(t, a) {
        var r,
          n,
          i,
          o,
          s,
          l,
          d,
          u,
          c,
          p,
          m,
          h,
          _,
          f,
          v,
          y,
          g,
          b,
          w,
          E =
            arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
        (Q(this, e),
          J(this, "mux", void 0),
          J(this, "envKey", void 0),
          J(this, "options", void 0),
          J(this, "eventQueue", void 0),
          J(this, "sampleRate", void 0),
          J(this, "disableCookies", void 0),
          J(this, "respectDoNotTrack", void 0),
          J(this, "previousBeaconData", void 0),
          J(this, "lastEventTime", void 0),
          J(this, "rateLimited", void 0),
          J(this, "pageLevelData", void 0),
          J(this, "viewerData", void 0),
          (this.mux = t),
          (this.envKey = a),
          (this.options = E),
          (this.previousBeaconData = null),
          (this.lastEventTime = 0),
          (this.rateLimited = !1),
          (this.eventQueue = new e4(
            ((r = this.envKey),
            (i = (n = this.options).beaconCollectionDomain),
            (o = n.beaconDomain),
            i
              ? "https://" + i
              : (r = r || "inferred").match(/^[a-z0-9]+$/)
                ? "https://" + r + "." + (o || "litix.io")
                : "https://img.litix.io/a.gif"),
          )),
          (this.sampleRate = null != (g = this.options.sampleRate) ? g : 1),
          (this.disableCookies =
            null != (b = this.options.disableCookies) && b),
          (this.respectDoNotTrack =
            null != (w = this.options.respectDoNotTrack) && w),
          (this.previousBeaconData = null),
          (this.lastEventTime = 0),
          (this.rateLimited = !1),
          (this.pageLevelData = {
            mux_api_version: this.mux.API_VERSION,
            mux_embed: this.mux.NAME,
            mux_embed_version: this.mux.VERSION,
            viewer_application_name:
              null == (s = this.options.platform) ? void 0 : s.name,
            viewer_application_version:
              null == (l = this.options.platform) ? void 0 : l.version,
            viewer_application_engine:
              null == (d = this.options.platform) ? void 0 : d.layout,
            viewer_device_name:
              null == (u = this.options.platform) ? void 0 : u.product,
            viewer_device_category: "",
            viewer_device_manufacturer:
              null == (c = this.options.platform) ? void 0 : c.manufacturer,
            viewer_os_family:
              null == (m = this.options.platform) || null == (p = m.os)
                ? void 0
                : p.family,
            viewer_os_architecture:
              null == (_ = this.options.platform) || null == (h = _.os)
                ? void 0
                : h.architecture,
            viewer_os_version:
              null == (v = this.options.platform) || null == (f = v.os)
                ? void 0
                : f.version,
            viewer_connection_type: eK(),
            page_url:
              null === eU.default ||
              void 0 === eU.default ||
              null == (y = eU.default.location)
                ? void 0
                : y.href,
          }),
          (this.viewerData = this.disableCookies ? {} : eW()));
      }
      return (
        K(e, [
          {
            key: "send",
            value: function (e, t) {
              if (!(!e || !(null != t && t.view_id))) {
                if (this.respectDoNotTrack && Z())
                  return V.info(
                    "Not sending `" + e + "` because Do Not Track is enabled",
                  );
                if (!t || "object" != typeof t)
                  return V.error(
                    "A data object was expected in send() but was not provided",
                  );
                var a = this.disableCookies ? {} : eQ(),
                  r = el(es({}, this.pageLevelData, t, a, this.viewerData), {
                    event: e,
                    env_key: this.envKey,
                  });
                r.user_id && ((r.viewer_user_id = r.user_id), delete r.user_id);
                var n,
                  i =
                    (null != (n = r.mux_sample_number) ? n : 0) >=
                    this.sampleRate,
                  o = e0(this._deduplicateBeaconData(e, r));
                if (((this.lastEventTime = this.mux.utils.now()), i))
                  return V.info(
                    "Not sending event due to sample rate restriction",
                    e,
                    r,
                    o,
                  );
                if (
                  (this.envKey ||
                    V.info(
                      "Missing environment key (envKey) - beacons will be dropped if the video source is not a valid mux video URL",
                      e,
                      r,
                      o,
                    ),
                  !this.rateLimited)
                )
                  if (
                    (V.info("Sending event", e, r, o),
                    (this.rateLimited = !this.eventQueue.queueEvent(e, o)),
                    this.mux.WINDOW_UNLOADING && "viewend" === e)
                  )
                    this.eventQueue.destroy(!0);
                  else {
                    if (this.mux.WINDOW_HIDDEN && "hb" === e)
                      this.eventQueue.flushEvents(!0);
                    else if (tt.indexOf(e) >= 0) {
                      if (
                        "error" === e &&
                        "warning" === t.player_error_severity
                      )
                        return;
                      this.eventQueue.flushEvents();
                    }
                    if (this.rateLimited)
                      return (
                        (r.event = "eventrateexceeded"),
                        (o = e0(r)),
                        this.eventQueue.queueEvent(r.event, o),
                        V.error("Beaconing disabled due to rate limit.")
                      );
                  }
              }
            },
          },
          {
            key: "destroy",
            value: function () {
              this.eventQueue.destroy(!1);
            },
          },
          {
            key: "_deduplicateBeaconData",
            value: function (e, t) {
              var a = this,
                r = {},
                n = t.view_id;
              if (
                "-1" === n ||
                "viewstart" === e ||
                "viewend" === e ||
                !this.previousBeaconData ||
                this.mux.utils.now() - this.lastEventTime >= 6e5
              )
                ((r = es({}, t)),
                  n && (this.previousBeaconData = r),
                  n && "viewend" === e && (this.previousBeaconData = null));
              else {
                var i = 0 === e.indexOf("request");
                Object.entries(t).forEach(function (t) {
                  var n = O(t, 2),
                    o = n[0],
                    s = n[1];
                  a.previousBeaconData &&
                    (s !== a.previousBeaconData[o] ||
                      e7.indexOf(o) > -1 ||
                      a.objectHasChanged(i, o, s, a.previousBeaconData[o]) ||
                      a.eventRequiresKey(e, o)) &&
                    ((r[o] = s), (a.previousBeaconData[o] = s));
                });
              }
              return r;
            },
          },
          {
            key: "objectHasChanged",
            value: function (e, t, a, r) {
              return (
                !!e &&
                0 === t.indexOf("request_") &&
                ("request_response_headers" === t ||
                  "object" != typeof a ||
                  "object" != typeof r ||
                  Object.keys(a || {}).length !== Object.keys(r || {}).length)
              );
            },
          },
          {
            key: "eventRequiresKey",
            value: function (e, t) {
              return !!(
                ("renditionchange" === e && 0 === t.indexOf("video_source_")) ||
                (te.includes(t) && e8.includes(e))
              );
            },
          },
        ]),
        e
      );
    })(),
    tr = function e(t) {
      Q(this, e);
      var a = 0,
        r = 0,
        n = 0,
        i = 0,
        o = 0,
        s = 0,
        l = 0;
      (t.on("requestcompleted", function (e, s) {
        var l,
          d,
          u = s.request_start,
          c = s.request_response_start,
          p = s.request_response_end,
          m = s.request_bytes_loaded;
        if (
          (i++,
          c
            ? ((l = c - (null != u ? u : 0)), (d = (null != p ? p : 0) - c))
            : (d = (null != p ? p : 0) - (null != u ? u : 0)),
          d > 0 && m && m > 0)
        ) {
          var h = (m / d) * 8e3;
          (o++,
            (r += m),
            (n += d),
            (t.data.view_min_request_throughput = Math.min(
              t.data.view_min_request_throughput || 1 / 0,
              h,
            )),
            (t.data.view_average_request_throughput = (r / n) * 8e3),
            (t.data.view_request_count = i),
            l > 0 &&
              ((a += l),
              (t.data.view_max_request_latency = Math.max(
                t.data.view_max_request_latency || 0,
                l,
              )),
              (t.data.view_average_request_latency = a / o)));
        }
      }),
        t.on("requestfailed", function (e, a) {
          (i++,
            s++,
            (t.data.view_request_count = i),
            (t.data.view_request_failed_count = s));
        }),
        t.on("requestcanceled", function (e, a) {
          (i++,
            l++,
            (t.data.view_request_count = i),
            (t.data.view_request_canceled_count = l));
        }));
    },
    tn = function e(t) {
      var a = this;
      (Q(this, e),
        J(this, "_lastEventTime", void 0),
        t.on("before*", function (e, r) {
          var n = r.viewer_time,
            i = M(),
            o = a._lastEventTime;
          if (((a._lastEventTime = i), o && i - o > 36e5)) {
            var s = Object.keys(t.data).reduce(function (e, a) {
              return 0 === a.indexOf("video_")
                ? Object.assign(e, J({}, a, t.data[a]))
                : e;
            }, {});
            t.mux.log.info(
              "Received event after at least an hour inactivity, creating a new view",
            );
            var l = t.playbackHeartbeat._playheadShouldBeProgressing;
            (t._resetView(Object.assign({ viewer_time: n }, s)),
              (t.playbackHeartbeat._playheadShouldBeProgressing = l),
              t.playbackHeartbeat._playheadShouldBeProgressing &&
                "play" !== e.type &&
                "adbreakstart" !== e.type &&
                (t.emit("play", { viewer_time: n }),
                "playing" !== e.type && t.emit("playing", { viewer_time: n })));
          }
        }));
    };
  function ti(e, t) {
    return (
      (null == e ? void 0 : e.toLowerCase()) ===
      (null == t ? void 0 : t.toLowerCase())
    );
  }
  var to = function e(t) {
      Q(this, e);
      var a = function (e) {
          var a,
            r,
            n,
            s =
              null != (a = e) &&
              a.request_type &&
              ("media" === a.request_type || "video" === a.request_type) &&
              null != (r = a.request_response_headers) &&
              r["x-cdn"]
                ? a.request_response_headers["x-cdn"]
                : null != a && a.video_cdn
                  ? a.video_cdn
                  : null,
            l =
              null != (n = e) && n.request_start
                ? n.request_start
                : null != n && n.viewer_time
                  ? n.viewer_time
                  : Date.now();
          null != s &&
            !ti(s, i) &&
            o <= l &&
            ((i = s), (o = l), t.emit("cdnchange", { video_cdn: s }));
        },
        r = null,
        n = null,
        i = null,
        o = 0;
      (t.on("viewinit", function () {
        ((r = null), (n = null), (i = null), (o = 0));
      }),
        t.on("beforecdnchange", function (e, t) {
          var a = null == t ? void 0 : t.video_cdn;
          a &&
            (void 0 === t.video_previous_cdn ||
              null === t.video_previous_cdn) &&
            (ti(a, n)
              ? (t.video_previous_cdn = null != r ? r : void 0)
              : ((t.video_previous_cdn = null != n ? n : void 0),
                (r = n),
                (n = a)));
        }),
        t.on("requestcompleted", function (e, t) {
          a(t);
        }));
    },
    ts = function (e) {
      try {
        return (JSON.parse(e), !0);
      } catch (e) {
        return !1;
      }
    },
    tl = function e(t) {
      var a = this;
      (Q(this, e),
        J(this, "_emittingAutomaticEvent", !1),
        J(this, "_hasInitialized", !1),
        J(this, "_currentMode", "standard"),
        t.on("viewstart", function () {
          a._hasInitialized ||
            ((a._hasInitialized = !0),
            (a._emittingAutomaticEvent = !0),
            t.emit("playbackmodechange", {
              player_playback_mode: a._currentMode,
              player_playback_mode_data: "{}",
            }),
            (a._emittingAutomaticEvent = !1));
        }),
        t.on("viewend", function () {
          a._hasInitialized = !1;
        }),
        t.on("playbackmodechange", function (e, r) {
          a._emittingAutomaticEvent ||
            (r.player_playback_mode_data
              ? ts(r.player_playback_mode_data) ||
                (t.mux.log.warn(
                  "Invalid JSON string for player_playback_mode_data",
                ),
                (r.player_playback_mode_data = "{}"))
              : (r.player_playback_mode_data = "{}"),
            (t.data.player_playback_mode_data = r.player_playback_mode_data),
            (t.data.player_playback_mode = r.player_playback_mode),
            (a._currentMode = r.player_playback_mode));
        }));
    },
    td = [
      "viewstart",
      "ended",
      "loadstart",
      "pause",
      "play",
      "playing",
      "ratechange",
      "waiting",
      "adplay",
      "adpause",
      "adended",
      "aderror",
      "adplaying",
      "adrequest",
      "adresponse",
      "adbreakstart",
      "adbreakend",
      "adfirstquartile",
      "admidpoint",
      "adthirdquartile",
      "rebufferstart",
      "rebufferend",
      "seeked",
      "error",
      "hb",
      "requestcompleted",
      "requestfailed",
      "requestcanceled",
      "renditionchange",
      "cdnchange",
      "playbackmodechange",
    ],
    tu = new Set(["requestcompleted", "requestfailed", "requestcanceled"]),
    tc = (function (e) {
      if ("function" != typeof e && null !== e)
        throw TypeError("Super expression must either be null or a function");
      ((r.prototype = Object.create(e && e.prototype, {
        constructor: { value: r, writable: !0, configurable: !0 },
      })),
        e && X(r, e));
      var t,
        a =
          ((t = (function () {
            if (
              "u" < typeof Reflect ||
              !Reflect.construct ||
              Reflect.construct.sham
            )
              return !1;
            if ("function" == typeof Proxy) return !0;
            try {
              return (
                Boolean.prototype.valueOf.call(
                  Reflect.construct(Boolean, [], function () {}),
                ),
                !0
              );
            } catch (e) {
              return !1;
            }
          })()),
          function () {
            var e,
              a = $(r);
            return (
              (e = t
                ? Reflect.construct(a, arguments, $(this).constructor)
                : a.apply(this, arguments)),
              e && ("object" === f(e) || "function" == typeof e) ? e : W(this)
            );
          });
      function r(e, t, n) {
        (Q(this, r),
          J(W((i = a.call(this))), "pageLoadEndTime", void 0),
          J(W(i), "pageLoadInitTime", void 0),
          J(W(i), "_destroyed", void 0),
          J(W(i), "_heartBeatTimeout", void 0),
          J(W(i), "adTracker", void 0),
          J(W(i), "dashjs", void 0),
          J(W(i), "data", void 0),
          J(W(i), "disablePlayheadRebufferTracking", void 0),
          J(W(i), "disableRebufferTracking", void 0),
          J(W(i), "errorTracker", void 0),
          J(W(i), "errorTranslator", void 0),
          J(W(i), "emitTranslator", void 0),
          J(W(i), "getAdData", void 0),
          J(W(i), "getPlayheadTime", void 0),
          J(W(i), "getStateData", void 0),
          J(W(i), "stateDataTranslator", void 0),
          J(W(i), "hlsjs", void 0),
          J(W(i), "id", void 0),
          J(W(i), "longResumeTracker", void 0),
          J(W(i), "minimumRebufferDuration", void 0),
          J(W(i), "mux", void 0),
          J(W(i), "playbackEventDispatcher", void 0),
          J(W(i), "playbackHeartbeat", void 0),
          J(W(i), "playbackHeartbeatTime", void 0),
          J(W(i), "playheadTime", void 0),
          J(W(i), "seekingTracker", void 0),
          J(W(i), "sustainedRebufferThreshold", void 0),
          J(W(i), "watchTimeTracker", void 0),
          J(W(i), "currentFragmentPDT", void 0),
          J(W(i), "currentFragmentStart", void 0),
          (i.pageLoadInitTime = ei()),
          (i.pageLoadEndTime = en()),
          (i.mux = e),
          (i.id = t),
          null != n &&
            n.beaconDomain &&
            i.mux.log.warn(
              "The `beaconDomain` setting has been deprecated in favor of `beaconCollectionDomain`. Please change your integration to use `beaconCollectionDomain` instead of `beaconDomain`.",
            ),
          ((n = Object.assign(
            {
              debug: !1,
              minimumRebufferDuration: 250,
              sustainedRebufferThreshold: 1e3,
              playbackHeartbeatTime: 25,
              beaconDomain: "litix.io",
              sampleRate: 1,
              disableCookies: !1,
              respectDoNotTrack: !1,
              disableRebufferTracking: !1,
              disablePlayheadRebufferTracking: !1,
              errorTranslator: function (e) {
                return e;
              },
              emitTranslator: function () {
                for (var e = arguments.length, t = Array(e), a = 0; a < e; a++)
                  t[a] = arguments[a];
                return t;
              },
              stateDataTranslator: function (e) {
                return e;
              },
            },
            n,
          )).data = n.data || {}),
          n.data.property_key &&
            ((n.data.env_key = n.data.property_key),
            delete n.data.property_key),
          (V.level = n.debug ? 1 : 3),
          (i.getPlayheadTime = n.getPlayheadTime),
          (i.getStateData =
            n.getStateData ||
            function () {
              return {};
            }),
          (i.getAdData = n.getAdData || function () {}),
          (i.minimumRebufferDuration = n.minimumRebufferDuration),
          (i.sustainedRebufferThreshold = n.sustainedRebufferThreshold),
          (i.playbackHeartbeatTime = n.playbackHeartbeatTime),
          (i.disableRebufferTracking = n.disableRebufferTracking),
          i.disableRebufferTracking &&
            i.mux.log.warn(
              "Disabling rebuffer tracking. This should only be used in specific circumstances as a last resort when your player is known to unreliably track rebuffering.",
            ),
          (i.disablePlayheadRebufferTracking =
            n.disablePlayheadRebufferTracking),
          (i.errorTranslator = n.errorTranslator),
          (i.emitTranslator = n.emitTranslator),
          (i.stateDataTranslator = n.stateDataTranslator),
          (i.playbackEventDispatcher = new ta(e, n.data.env_key, n)),
          (i.data = {
            player_instance_id: H(),
            mux_sample_rate: n.sampleRate,
            beacon_domain: n.beaconCollectionDomain || n.beaconDomain,
          }),
          (i.data.view_sequence_number = 1),
          (i.data.player_sequence_number = 1));
        var i,
          o = function () {
            void 0 === this.data.view_start &&
              ((this.data.view_start = this.mux.utils.now()),
              this.emit("viewstart"),
              this.emit("renditionchange"));
          }.bind(W(i));
        if (
          (i.on("viewinit", function (e, t) {
            (this._resetVideoData(),
              this._resetViewData(),
              this._resetErrorData(),
              this._updateStateData(),
              Object.assign(this.data, t),
              this._initializeViewData(),
              this.one("play", o),
              this.one("adbreakstart", o));
          }),
          i.on("videochange", function (e, t) {
            this._resetView(t);
          }),
          i.on("programchange", function (e, t) {
            (this.data.player_is_paused &&
              this.mux.log.warn(
                "The `programchange` event is intended to be used when the content changes mid playback without the video source changing, however the video is not currently playing. If the video source is changing please use the videochange event otherwise you will lose startup time information.",
              ),
              this._resetView(Object.assign(t, { view_program_changed: !0 })),
              o(),
              this.emit("play"),
              this.emit("playing"));
          }),
          i.on("fragmentchange", function (e, t) {
            ((this.currentFragmentPDT = t.currentFragmentPDT),
              (this.currentFragmentStart = t.currentFragmentStart));
          }),
          i.on("destroy", i.destroy),
          "u" > typeof window &&
            "function" == typeof window.addEventListener &&
            "function" == typeof window.removeEventListener)
        ) {
          var s = function () {
            var e = void 0 !== i.data.view_start;
            ((i.mux.WINDOW_HIDDEN = "hidden" === document.visibilityState),
              e &&
                i.mux.WINDOW_HIDDEN &&
                (i.data.player_is_paused || i.emit("hb")));
          };
          window.addEventListener("visibilitychange", s, !1);
          var l = function (e) {
            e.persisted || i.destroy();
          };
          (window.addEventListener("pagehide", l, !1),
            i.on("destroy", function () {
              (window.removeEventListener("visibilitychange", s),
                window.removeEventListener("pagehide", l));
            }));
        }
        return (
          i.on("playerready", function (e, t) {
            Object.assign(this.data, t);
          }),
          td.forEach(function (e) {
            (i.on(e, function (t, a) {
              (0 !== e.indexOf("ad") && this._updateStateData(),
                Object.assign(this.data, a),
                this._sanitizeData());
            }),
              i.on("after" + e, function () {
                ("error" !== e || this.errorTracker.viewErrored) &&
                  this.send(e);
              }));
          }),
          i.on("viewend", function (e, t) {
            Object.assign(i.data, t);
          }),
          i.one("playerready", function (e) {
            var t = this.mux.utils.now();
            (this.data.player_init_time &&
              (this.data.player_startup_time = t - this.data.player_init_time),
              (this.pageLoadInitTime =
                this.data.page_load_init_time || this.pageLoadInitTime),
              (this.pageLoadEndTime =
                this.data.page_load_end_time || this.pageLoadEndTime),
              !this.mux.PLAYER_TRACKED &&
                this.pageLoadInitTime &&
                ((this.mux.PLAYER_TRACKED = !0),
                (this.data.player_init_time || this.pageLoadEndTime) &&
                  (this.data.page_load_time =
                    Math.min(
                      this.data.player_init_time || 1 / 0,
                      this.pageLoadEndTime || 1 / 0,
                    ) - this.pageLoadInitTime)),
              this.send("playerready"),
              delete this.data.player_startup_time,
              delete this.data.page_load_time);
          }),
          (i.longResumeTracker = new tn(W(i))),
          (i.errorTracker = new eS(W(i))),
          new eB(W(i)),
          (i.seekingTracker = new eI(W(i))),
          (i.playheadTime = new eN(W(i))),
          (i.playbackHeartbeat = new eD(W(i))),
          new eL(W(i)),
          (i.watchTimeTracker = new eC(W(i))),
          new eP(W(i)),
          (i.adTracker = new ej(W(i))),
          new eO(W(i)),
          new eq(W(i)),
          new eA(W(i)),
          new tr(W(i)),
          new to(W(i)),
          new tl(W(i)),
          n.hlsjs && i.addHLSJS(n),
          n.dashjs && i.addDashJS(n),
          i.emit("viewinit", n.data),
          i
        );
      }
      return (
        K(r, [
          {
            key: "emit",
            value: function (e, t) {
              var a,
                n = Object.assign({ viewer_time: this.mux.utils.now() }, t),
                i = [e, n];
              if (this.emitTranslator)
                try {
                  i = this.emitTranslator(e, n);
                } catch (e) {
                  this.mux.log.warn(
                    "Exception in emit translator callback.",
                    e,
                  );
                }
              null != i &&
                i.length &&
                (a = Y($(r.prototype), "emit", this)).call.apply(
                  a,
                  [this].concat(F(i)),
                );
            },
          },
          {
            key: "destroy",
            value: function () {
              this._destroyed ||
                ((this._destroyed = !0),
                void 0 !== this.data.view_start &&
                  (this.emit("viewend"), this.send("viewend")),
                this.playbackEventDispatcher.destroy(),
                this.removeHLSJS(),
                this.removeDashJS(),
                window.clearTimeout(this._heartBeatTimeout));
            },
          },
          {
            key: "send",
            value: function (e) {
              if (this.data.view_id) {
                var t = Object.assign({}, this.data);
                if (
                  (void 0 === t.video_source_is_live &&
                    (1 / 0 === t.player_source_duration ||
                    1 / 0 === t.video_source_duration
                      ? (t.video_source_is_live = !0)
                      : (t.player_source_duration > 0 ||
                          t.video_source_duration > 0) &&
                        (t.video_source_is_live = !1)),
                  t.video_source_is_live ||
                    [
                      "player_program_time",
                      "player_manifest_newest_program_time",
                      "player_live_edge_program_time",
                      "player_program_time",
                      "video_holdback",
                      "video_part_holdback",
                      "video_target_duration",
                      "video_part_target_duration",
                    ].forEach(function (e) {
                      t[e] = void 0;
                    }),
                  (t.video_source_url =
                    t.video_source_url || t.player_source_url),
                  t.video_source_url)
                ) {
                  var a = O(et(t.video_source_url), 2),
                    r = a[0];
                  ((t.video_source_domain = a[1]),
                    (t.video_source_hostname = r));
                }
                (delete t.ad_request_id,
                  this.playbackEventDispatcher.send(e, t),
                  this.data.view_sequence_number++,
                  this.data.player_sequence_number++,
                  tu.has(e) || this._restartHeartBeat(),
                  "viewend" === e && delete this.data.view_id);
              }
            },
          },
          {
            key: "_resetView",
            value: function (e) {
              (this.emit("viewend"),
                this.send("viewend"),
                this.emit("viewinit", e));
            },
          },
          {
            key: "_updateStateData",
            value: function () {
              var e,
                t = this.getStateData();
              if ("function" == typeof this.stateDataTranslator)
                try {
                  t = this.stateDataTranslator(t);
                } catch (e) {
                  this.mux.log.warn(
                    "Exception in stateDataTranslator translator callback.",
                    e,
                  );
                }
              (null != (e = this.data) &&
                e.video_cdn &&
                null != t &&
                t.video_cdn &&
                (t.video_cdn,
                (t = (function (e, t) {
                  if (null == e) return {};
                  var a,
                    r,
                    n = (function (e, t) {
                      if (null == e) return {};
                      var a,
                        r,
                        n = {},
                        i = Object.keys(e);
                      for (r = 0; r < i.length; r++)
                        ((a = i[r]), t.indexOf(a) >= 0 || (n[a] = e[a]));
                      return n;
                    })(e, t);
                  if (Object.getOwnPropertySymbols) {
                    var i = Object.getOwnPropertySymbols(e);
                    for (r = 0; r < i.length; r++)
                      ((a = i[r]),
                        !(t.indexOf(a) >= 0) &&
                          Object.prototype.propertyIsEnumerable.call(e, a) &&
                          (n[a] = e[a]));
                  }
                  return n;
                })(t, ["video_cdn"]))),
                Object.assign(this.data, t),
                this.playheadTime._updatePlayheadTime(),
                this._sanitizeData());
            },
          },
          {
            key: "_sanitizeData",
            value: function () {
              var e = this;
              ([
                "player_width",
                "player_height",
                "video_source_width",
                "video_source_height",
                "player_playhead_time",
                "video_source_bitrate",
              ].forEach(function (t) {
                var a = parseInt(e.data[t], 10);
                e.data[t] = isNaN(a) ? void 0 : a;
              }),
                ["player_source_url", "video_source_url"].forEach(function (t) {
                  if (e.data[t]) {
                    var a = e.data[t].toLowerCase();
                    (0 === a.indexOf("data:") || 0 === a.indexOf("blob:")) &&
                      (e.data[t] = "MSE style URL");
                  }
                }));
            },
          },
          {
            key: "_resetVideoData",
            value: function () {
              var e = this;
              Object.keys(this.data).forEach(function (t) {
                0 === t.indexOf("video_") && delete e.data[t];
              });
            },
          },
          {
            key: "_resetViewData",
            value: function () {
              var e = this;
              (Object.keys(this.data).forEach(function (t) {
                0 === t.indexOf("view_") && delete e.data[t];
              }),
                (this.data.view_sequence_number = 1));
            },
          },
          {
            key: "_resetErrorData",
            value: function () {
              (delete this.data.player_error_code,
                delete this.data.player_error_message,
                delete this.data.player_error_context,
                delete this.data.player_error_severity,
                delete this.data.player_error_business_exception);
            },
          },
          {
            key: "_initializeViewData",
            value: function () {
              var e = this,
                t = (this.data.view_id = H()),
                a = function () {
                  t === e.data.view_id && eo(e.data, "player_view_count", 1);
                };
              this.data.player_is_paused ? this.one("play", a) : a();
            },
          },
          {
            key: "_restartHeartBeat",
            value: function () {
              var e = this;
              (window.clearTimeout(this._heartBeatTimeout),
                (this._heartBeatTimeout = window.setTimeout(function () {
                  e.data.player_is_paused || e.emit("hb");
                }, 1e4)));
            },
          },
          {
            key: "addHLSJS",
            value: function (e) {
              e.hlsjs
                ? this.hlsjs
                  ? this.mux.log.warn(
                      "An instance of HLS.js is already being monitored for this player.",
                    )
                  : ((this.hlsjs = e.hlsjs),
                    ef(this.mux, this.id, e.hlsjs, {}, e.Hls || window.Hls))
                : this.mux.log.warn(
                    "You must pass a valid hlsjs instance in order to track it.",
                  );
            },
          },
          {
            key: "removeHLSJS",
            value: function () {
              this.hlsjs && (ev(this.hlsjs), (this.hlsjs = void 0));
            },
          },
          {
            key: "addDashJS",
            value: function (e) {
              e.dashjs
                ? this.dashjs
                  ? this.mux.log.warn(
                      "An instance of Dash.js is already being monitored for this player.",
                    )
                  : ((this.dashjs = e.dashjs), eE(this.mux, this.id, e.dashjs))
                : this.mux.log.warn(
                    "You must pass a valid dashjs instance in order to track it.",
                  );
            },
          },
          {
            key: "removeDashJS",
            value: function () {
              this.dashjs && (eT(this.dashjs), (this.dashjs = void 0));
            },
          },
        ]),
        r
      );
    })(ex),
    tp = p(P());
  function tm() {
    return (
      tp.default &&
      !!(
        tp.default.fullscreenElement ||
        tp.default.webkitFullscreenElement ||
        tp.default.mozFullScreenElement ||
        tp.default.msFullscreenElement
      )
    );
  }
  var th,
    t_,
    tf,
    tv,
    ty = [
      "loadstart",
      "pause",
      "play",
      "playing",
      "seeking",
      "seeked",
      "timeupdate",
      "ratechange",
      "stalled",
      "waiting",
      "error",
      "ended",
    ],
    tg = {
      1: "MEDIA_ERR_ABORTED",
      2: "MEDIA_ERR_NETWORK",
      3: "MEDIA_ERR_DECODE",
      4: "MEDIA_ERR_SRC_NOT_SUPPORTED",
    },
    tb = p(m());
  tb.default && tb.default.WeakMap && (tv = new WeakMap());
  var tw = function (e) {
    return (
      (this.buffer = ""),
      (this.manifest = { segments: [], serverControl: {}, sessionData: {} }),
      (this.currentUri = {}),
      this.process(e),
      this.manifest
    );
  };
  ((tw.prototype.process = function (e) {
    var t;
    for (
      this.buffer += e, t = this.buffer.indexOf("\n");
      t > -1;
      t = this.buffer.indexOf("\n")
    )
      (this.processLine(this.buffer.substring(0, t)),
        (this.buffer = this.buffer.substring(t + 1)));
  }),
    (tw.prototype.processLine = function (e) {
      var t = e.indexOf(":"),
        a = tS(e, t),
        r = a[0],
        n = 2 === a.length ? tk(a[1]) : void 0;
      if ("#" !== r[0])
        ((this.currentUri.uri = r),
          this.manifest.segments.push(this.currentUri),
          !this.manifest.targetDuration ||
            "duration" in this.currentUri ||
            (this.currentUri.duration = this.manifest.targetDuration),
          (this.currentUri = {}));
      else
        switch (r) {
          case "#EXT-X-TARGETDURATION":
            if (!isFinite(n) || n < 0) return;
            ((this.manifest.targetDuration = n), this.setHoldBack());
            break;
          case "#EXT-X-PART-INF":
            (tE(this.manifest, a),
              this.manifest.partInf.partTarget &&
                (this.manifest.partTargetDuration =
                  this.manifest.partInf.partTarget),
              this.setHoldBack());
            break;
          case "#EXT-X-SERVER-CONTROL":
            (tE(this.manifest, a), this.setHoldBack());
            break;
          case "#EXTINF":
            0 === n
              ? (this.currentUri.duration = 0.01)
              : n > 0 && (this.currentUri.duration = n);
            break;
          case "#EXT-X-PROGRAM-DATE-TIME":
            var i = new Date(n);
            (this.manifest.dateTimeString ||
              ((this.manifest.dateTimeString = n),
              (this.manifest.dateTimeObject = i)),
              (this.currentUri.dateTimeString = n),
              (this.currentUri.dateTimeObject = i));
            break;
          case "#EXT-X-VERSION":
            tE(this.manifest, a);
            break;
          case "#EXT-X-SESSION-DATA":
            var o = em(tC(a[1]));
            Object.assign(this.manifest.sessionData, o);
        }
    }),
    (tw.prototype.setHoldBack = function () {
      var e = this.manifest,
        t = e.serverControl,
        a = e.targetDuration,
        r = e.partTargetDuration;
      if (t) {
        var n = "holdBack",
          i = "partHoldBack",
          o = a && 3 * a,
          s = r && 2 * r;
        (a && !t.hasOwnProperty(n) && (t[n] = o),
          o && t[n] < o && (t[n] = o),
          r && !t.hasOwnProperty(i) && (t[i] = 3 * r),
          r && t[i] < s && (t[i] = s));
      }
    }));
  var tE = function (e, t) {
      var a,
        r = tT(t[0].replace("#EXT-X-", ""));
      (tD(t[1]) ? ((a = {}), (a = Object.assign(tR(t[1]), a))) : (a = tk(t[1])),
        (e[r] = a));
    },
    tT = function (e) {
      return e.toLowerCase().replace(/-(\w)/g, function (e) {
        return e[1].toUpperCase();
      });
    },
    tk = function (e) {
      if ("yes" === e.toLowerCase() || "no" === e.toLowerCase())
        return "yes" === e.toLowerCase();
      var t = -1 !== e.indexOf(":") ? e : parseFloat(e);
      return isNaN(t) ? e : t;
    },
    tx = function (e) {
      var t = {},
        a = e.split("=");
      return (a.length > 1 && (t[tT(a[0])] = tk(a[1])), t);
    },
    tR = function (e) {
      for (var t = e.split(","), a = {}, r = 0; t.length > r; r++)
        a = Object.assign(tx(t[r]), a);
      return a;
    },
    tD = function (e) {
      return e.indexOf("=") > -1;
    },
    tS = function (e, t) {
      return -1 === t ? [e] : [e.substring(0, t), e.substring(t + 1)];
    },
    tC = function (e) {
      var t = {};
      if (e) {
        var a = e.search(",");
        return (
          [e.slice(0, a), e.slice(a + 1)].forEach(function (e, a) {
            for (
              var r = e.replace(/['"]+/g, "").split("="), n = 0;
              n < r.length;
              n++
            )
              ("DATA-ID" === r[n] && (t["DATA-ID"] = r[1 - n]),
                "VALUE" === r[n] && (t.VALUE = r[1 - n]));
          }),
          { data: t }
        );
      }
    },
    tP = {
      safeCall: function (e, t, a, r) {
        var n = r;
        if (e && "function" == typeof e[t])
          try {
            n = e[t].apply(e, a);
          } catch (e) {
            V.info("safeCall error", e);
          }
        return n;
      },
      safeIncrement: eo,
      getComputedStyle: function (e, t) {
        var a;
        return e &&
          t &&
          tb.default &&
          "function" == typeof tb.default.getComputedStyle
          ? (tv && tv.has(e) && (a = tv.get(e)),
            a ||
              ((a = tb.default.getComputedStyle(e, null)), tv && tv.set(e, a)),
            a.getPropertyValue(t))
          : "";
      },
      secondsToMs: function (e) {
        return Math.floor(1e3 * e);
      },
      assign: Object.assign,
      headersStringToObject: ec,
      cdnHeadersToRequestId: ep,
      extractHostnameAndDomain: et,
      extractHostname: ee,
      manifestParser: tw,
      generateShortID: j,
      generateUUID: H,
      now: M,
      findMediaElement: U,
    },
    tN = {},
    tq = function (e) {
      var t = arguments;
      "string" == typeof e
        ? tq.hasOwnProperty(e)
          ? A.default.setTimeout(function () {
              ((t = Array.prototype.splice.call(t, 1)), tq[e].apply(null, t));
            }, 0)
          : V.warn("`" + e + "` is an unknown task")
        : "function" == typeof e
          ? A.default.setTimeout(function () {
              e(tq);
            }, 0)
          : V.warn("`" + e + "` is invalid.");
    },
    tO = {
      loaded: M(),
      NAME: "mux-embed",
      VERSION: "5.15.0",
      API_VERSION: "2.1",
      PLAYER_TRACKED: !1,
      monitor: function (e, t) {
        return (function (e, t, a) {
          var r = O(U(t), 3),
            n = r[0],
            i = r[1],
            o = r[2],
            s = e.log,
            l = e.utils.getComputedStyle,
            d = e.utils.secondsToMs;
          if (!n)
            return s.error(
              "No element was found with the `" + i + "` query selector.",
            );
          if ("video" !== o && "audio" !== o)
            return s.error(
              "The element of `" + i + "` was not a media element.",
            );
          (n.mux &&
            (n.mux.destroy(),
            delete n.mux,
            s.warn(
              "Already monitoring this video element, replacing existing event listeners",
            )),
            ((a = Object.assign({ automaticErrorTracking: !0 }, a, {
              getPlayheadTime: function () {
                return d(n.currentTime);
              },
              getStateData: function () {
                var e,
                  t,
                  a =
                    (null == (e = this.getPlayheadTime)
                      ? void 0
                      : e.call(this)) || d(n.currentTime),
                  r = this.hlsjs && this.hlsjs.url,
                  i =
                    this.dashjs &&
                    "function" == typeof this.dashjs.getSource &&
                    this.dashjs.getSource(),
                  o = {
                    player_is_paused: n.paused,
                    player_width: parseInt(l(n, "width")),
                    player_height: parseInt(l(n, "height")),
                    player_autoplay_on: n.autoplay,
                    player_preload_on: n.preload,
                    player_language_code: n.lang,
                    player_is_fullscreen: tm(),
                    video_poster_url: n.poster,
                    video_source_url: r || i || n.currentSrc,
                    video_source_duration: d(n.duration),
                    video_source_height: n.videoHeight,
                    video_source_width: n.videoWidth,
                    view_dropped_frame_count:
                      null == n || null == (t = n.getVideoPlaybackQuality)
                        ? void 0
                        : t.call(n).droppedVideoFrames,
                  };
                if (n.getStartDate && a > 0) {
                  var s = n.getStartDate();
                  if (s && "function" == typeof s.getTime && s.getTime()) {
                    var u = s.getTime();
                    ((o.player_program_time = u + a),
                      n.seekable.length > 0 &&
                        (o.player_live_edge_program_time =
                          u + n.seekable.end(n.seekable.length - 1)));
                  }
                }
                return o;
              },
            })).data = Object.assign(
              {
                player_software: "HTML5 Video Element",
                player_mux_plugin_name: "VideoElementMonitor",
                player_mux_plugin_version: e.VERSION,
              },
              a.data,
            )),
            (n.mux = n.mux || {}),
            (n.mux.deleted = !1),
            (n.mux.emit = function (t, a) {
              e.emit(i, t, a);
            }),
            (n.mux.updateData = function (e) {
              n.mux.emit("hb", e);
            }));
          var u = function () {
            s.error(
              "The monitor for this video element has already been destroyed.",
            );
          };
          ((n.mux.destroy = function () {
            (Object.keys(n.mux.listeners).forEach(function (e) {
              n.removeEventListener(e, n.mux.listeners[e], !1);
            }),
              delete n.mux.listeners,
              n.mux.fullscreenChangeListener &&
                (document.removeEventListener(
                  "fullscreenchange",
                  n.mux.fullscreenChangeListener,
                  !1,
                ),
                delete n.mux.fullscreenChangeListener),
              (n.mux.destroy = u),
              (n.mux.swapElement = u),
              (n.mux.emit = u),
              (n.mux.addHLSJS = u),
              (n.mux.addDashJS = u),
              (n.mux.removeHLSJS = u),
              (n.mux.removeDashJS = u),
              (n.mux.updateData = u),
              (n.mux.setEmitTranslator = u),
              (n.mux.setStateDataTranslator = u),
              (n.mux.setGetPlayheadTime = u),
              (n.mux.deleted = !0),
              e.emit(i, "destroy"));
          }),
            (n.mux.swapElement = function (t) {
              var a = O(U(t), 3),
                r = a[0],
                i = a[1],
                o = a[2];
              return r
                ? "video" !== o && "audio" !== o
                  ? e.log.error(
                      "The element of `" + i + "` was not a media element.",
                    )
                  : void ((r.muxId = n.muxId),
                    delete n.muxId,
                    (r.mux = r.mux || {}),
                    (r.mux.listeners = Object.assign({}, n.mux.listeners)),
                    delete n.mux.listeners,
                    Object.keys(r.mux.listeners).forEach(function (e) {
                      (n.removeEventListener(e, r.mux.listeners[e], !1),
                        r.addEventListener(e, r.mux.listeners[e], !1));
                    }),
                    (r.mux.fullscreenChangeListener =
                      n.mux.fullscreenChangeListener),
                    delete n.mux.fullscreenChangeListener,
                    (r.mux.swapElement = n.mux.swapElement),
                    (r.mux.destroy = n.mux.destroy),
                    delete n.mux,
                    (n = r))
                : e.log.error(
                    "No element was found with the `" + i + "` query selector.",
                  );
            }),
            (n.mux.addHLSJS = function (t) {
              e.addHLSJS(i, t);
            }),
            (n.mux.addDashJS = function (t) {
              e.addDashJS(i, t);
            }),
            (n.mux.removeHLSJS = function () {
              e.removeHLSJS(i);
            }),
            (n.mux.removeDashJS = function () {
              e.removeDashJS(i);
            }),
            (n.mux.setEmitTranslator = function (t) {
              e.setEmitTranslator(i, t);
            }),
            (n.mux.setStateDataTranslator = function (t) {
              e.setStateDataTranslator(i, t);
            }),
            (n.mux.setGetPlayheadTime = function (t) {
              (t || (t = a.getPlayheadTime), e.setGetPlayheadTime(i, t));
            }),
            e.init(i, a),
            e.emit(i, "playerready"),
            n.paused ||
              (e.emit(i, "play"), n.readyState > 2 && e.emit(i, "playing")),
            (n.mux.listeners = {}),
            ty.forEach(function (t) {
              ("error" !== t || a.automaticErrorTracking) &&
                ((n.mux.listeners[t] = function () {
                  var a = {};
                  if ("error" === t) {
                    if (!n.error || 1 === n.error.code) return;
                    ((a.player_error_code = n.error.code),
                      (a.player_error_message =
                        tg[n.error.code] || n.error.message));
                  }
                  e.emit(i, t, a);
                }),
                n.addEventListener(t, n.mux.listeners[t], !1));
            }),
            (n.mux.listeners.enterpictureinpicture = function () {
              e.emit(i, "playbackmodechange", {
                player_playback_mode: "pip",
                player_playback_mode_data: "{}",
              });
            }),
            (n.mux.listeners.leavepictureinpicture = function () {
              var t = tm() ? "fullscreen" : "standard";
              e.emit(i, "playbackmodechange", {
                player_playback_mode: t,
                player_playback_mode_data: "{}",
              });
            }),
            n.addEventListener(
              "enterpictureinpicture",
              n.mux.listeners.enterpictureinpicture,
              !1,
            ),
            n.addEventListener(
              "leavepictureinpicture",
              n.mux.listeners.leavepictureinpicture,
              !1,
            ),
            (n.mux.fullscreenChangeListener = function () {
              var t = tm(),
                a = document.fullscreenElement;
              if (t && (a === n || (null != a && a.contains(n))))
                e.emit(i, "playbackmodechange", {
                  player_playback_mode: "fullscreen",
                  player_playback_mode_data: "{}",
                });
              else if (!t) {
                var r = document.pictureInPictureElement === n;
                e.emit(i, "playbackmodechange", {
                  player_playback_mode: r ? "pip" : "standard",
                  player_playback_mode_data: "{}",
                });
              }
            }),
            document.addEventListener(
              "fullscreenchange",
              n.mux.fullscreenChangeListener,
              !1,
            ));
        })(tq, e, t);
      },
      destroyMonitor: function (e) {
        var t = O(U(e), 1)[0];
        t && t.mux && "function" == typeof t.mux.destroy
          ? t.mux.destroy()
          : V.error(
              "A video element monitor for `" +
                e +
                "` has not been initialized via `mux.monitor`.",
            );
      },
      addHLSJS: function (e, t) {
        var a = B(e);
        tN[a]
          ? tN[a].addHLSJS(t)
          : V.error("A monitor for `" + a + "` has not been initialized.");
      },
      addDashJS: function (e, t) {
        var a = B(e);
        tN[a]
          ? tN[a].addDashJS(t)
          : V.error("A monitor for `" + a + "` has not been initialized.");
      },
      removeHLSJS: function (e) {
        var t = B(e);
        tN[t]
          ? tN[t].removeHLSJS()
          : V.error("A monitor for `" + t + "` has not been initialized.");
      },
      removeDashJS: function (e) {
        var t = B(e);
        tN[t]
          ? tN[t].removeDashJS()
          : V.error("A monitor for `" + t + "` has not been initialized.");
      },
      init: function (e, t) {
        Z() &&
          t &&
          t.respectDoNotTrack &&
          V.info(
            "The browser's Do Not Track flag is enabled - Mux beaconing is disabled.",
          );
        var a = B(e);
        tN[a] = new tc(tq, a, t);
      },
      emit: function (e, t, a) {
        var r = B(e);
        tN[r]
          ? (tN[r].emit(t, a), "destroy" === t && delete tN[r])
          : V.error("A monitor for `" + r + "` has not been initialized.");
      },
      updateData: function (e, t) {
        var a = B(e);
        tN[a]
          ? tN[a].emit("hb", t)
          : V.error("A monitor for `" + a + "` has not been initialized.");
      },
      setEmitTranslator: function (e, t) {
        var a = B(e);
        tN[a]
          ? (tN[a].emitTranslator = t)
          : V.error("A monitor for `" + a + "` has not been initialized.");
      },
      setStateDataTranslator: function (e, t) {
        var a = B(e);
        tN[a]
          ? (tN[a].stateDataTranslator = t)
          : V.error("A monitor for `" + a + "` has not been initialized.");
      },
      setGetPlayheadTime: function (e, t) {
        var a = B(e);
        tN[a]
          ? (tN[a].getPlayheadTime = t)
          : V.error("A monitor for `" + a + "` has not been initialized.");
      },
      checkDoNotTrack: Z,
      log: V,
      utils: tP,
      events: {
        PLAYER_READY: "playerready",
        VIEW_INIT: "viewinit",
        VIDEO_CHANGE: "videochange",
        PLAY: "play",
        PAUSE: "pause",
        PLAYING: "playing",
        TIME_UPDATE: "timeupdate",
        SEEKING: "seeking",
        SEEKED: "seeked",
        REBUFFER_START: "rebufferstart",
        REBUFFER_END: "rebufferend",
        ERROR: "error",
        ENDED: "ended",
        RENDITION_CHANGE: "renditionchange",
        ORIENTATION_CHANGE: "orientationchange",
        PLAYBACK_MODE_CHANGE: "playbackmodechange",
        AD_REQUEST: "adrequest",
        AD_RESPONSE: "adresponse",
        AD_BREAK_START: "adbreakstart",
        AD_PLAY: "adplay",
        AD_PLAYING: "adplaying",
        AD_PAUSE: "adpause",
        AD_FIRST_QUARTILE: "adfirstquartile",
        AD_MID_POINT: "admidpoint",
        AD_THIRD_QUARTILE: "adthirdquartile",
        AD_ENDED: "adended",
        AD_BREAK_END: "adbreakend",
        AD_ERROR: "aderror",
        REQUEST_COMPLETED: "requestcompleted",
        REQUEST_FAILED: "requestfailed",
        REQUEST_CANCELLED: "requestcanceled",
        HEARTBEAT: "hb",
        DESTROY: "destroy",
      },
      WINDOW_HIDDEN: !1,
      WINDOW_UNLOADING: !1,
    };
  (Object.assign(tq, tO),
    void 0 !== A.default &&
      "function" == typeof A.default.addEventListener &&
      A.default.addEventListener(
        "pagehide",
        function (e) {
          e.persisted || (tq.WINDOW_UNLOADING = !0);
        },
        !1,
      ),
    e.s(["f", 0, tq], 520),
    e.s(["q", 0, 250, "G", 0, 300, "F", 0, tq], 827935));
  var tA = e.i(845785);
  let tL = "MuxAnalyticsBuilder";
  class tI {
    static instance = null;
    config;
    constructor(e) {
      this.config = e;
    }
    static init(e) {
      if (tI.instance)
        throw Error(
          `${tL} already initialized. Call MuxAnalytics.getInstance() instead.`,
        );
      return ((tI.instance = new tI(e)), tI.instance);
    }
    static getInstance() {
      if (!tI.instance)
        throw Error(`${tL} not initialized. Call MuxAnalytics.init() first.`);
      return tI.instance;
    }
    setEnvKey(e) {
      this.config.envKey = e;
    }
    hasEnvKey() {
      return !!this.config.envKey;
    }
    build(e, t, a) {
      let r,
        n = a.envKey ?? this.config.envKey;
      if (!n)
        throw Error(
          "MuxAnalytics: envKey not set. Call setEnvKey() before building analytics data or pass envKey in build args.",
        );
      let i = t === tA.J.LIVEKIT ? tA.u.LIVEKIT : tA.u.PUMP,
        o = this.config.deviceInfo?.() ?? {},
        s = {
          env_key: n,
          player_mux_plugin_name: "custom",
          player_mux_plugin_version: "1.0.0",
          player_init_time: Date.now(),
          player_software_name: t,
          video_cdn: i,
          viewer_device_name: o.deviceName,
          viewer_device_model: o.deviceModel,
          viewer_device_manufacturer: o.deviceManufacturer,
          viewer_device_category: o.deviceCategory,
          client_application_name: this.config.appName,
          view_client_application_name: this.config.appName,
          video_id: a.videoId,
          video_title: a.videoTitle,
          video_producer: a.mintId,
          video_creator_id: a.creatorId,
          viewer_user_id: a.viewerId,
          page_type: a.page,
          experiment_name: a.experimentName,
          custom_1: a.sessionId,
          custom_2: a.participantRole,
          custom_3: a.deviceId,
          custom_4: a.viewerCcUserId,
          custom_5: a.creatorCcUserId ?? a.creatorId,
          player_name: a.playerName,
          sub_property_id: a.property,
        };
      switch (e) {
        case tA.$.Vod:
          r = {
            ...s,
            video_content_type: tA.G.VOD,
            video_stream_type: tA.s.ON_DEMAND,
          };
          break;
        case tA.$.Clip:
          r = {
            ...s,
            video_content_type: tA.G.HIGHLIGHT,
            video_stream_type: tA.s.ON_DEMAND,
          };
          break;
        case tA.$.Livestream:
        case tA.$.VoiceChat:
          r = {
            ...s,
            video_content_type: tA.G.LIVE,
            video_stream_type: tA.s.LIVE,
          };
      }
      return r;
    }
  }
  e.s(["f", 0, tI], 113939);
};
