// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  var n =
      ("u" > typeof globalThis && globalThis) ||
      ("u" > typeof self && self) ||
      e.g,
    i = (function () {
      function e() {
        ((this.fetch = !1), (this.DOMException = n.DOMException));
      }
      return ((e.prototype = n), new e());
    })();
  ((function (t) {
    var r = (void 0 !== i && i) || ("u" > typeof self && self) || e.g || {},
      n = {
        searchParams: "URLSearchParams" in r,
        iterable: "Symbol" in r && "iterator" in Symbol,
        blob:
          "FileReader" in r &&
          "Blob" in r &&
          (function () {
            try {
              return (new Blob(), !0);
            } catch (e) {
              return !1;
            }
          })(),
        formData: "FormData" in r,
        arrayBuffer: "ArrayBuffer" in r,
      };
    if (n.arrayBuffer)
      var o = [
          "[object Int8Array]",
          "[object Uint8Array]",
          "[object Uint8ClampedArray]",
          "[object Int16Array]",
          "[object Uint16Array]",
          "[object Int32Array]",
          "[object Uint32Array]",
          "[object Float32Array]",
          "[object Float64Array]",
        ],
        s =
          ArrayBuffer.isView ||
          function (e) {
            return e && o.indexOf(Object.prototype.toString.call(e)) > -1;
          };
    function a(e) {
      if (
        ("string" != typeof e && (e = String(e)),
        /[^a-z0-9\-#$%&'*+.^_`|~!]/i.test(e) || "" === e)
      )
        throw TypeError('Invalid character in header field name: "' + e + '"');
      return e.toLowerCase();
    }
    function c(e) {
      return ("string" != typeof e && (e = String(e)), e);
    }
    function l(e) {
      var t = {
        next: function () {
          var t = e.shift();
          return { done: void 0 === t, value: t };
        },
      };
      return (
        n.iterable &&
          (t[Symbol.iterator] = function () {
            return t;
          }),
        t
      );
    }
    function u(e) {
      ((this.map = {}),
        e instanceof u
          ? e.forEach(function (e, t) {
              this.append(t, e);
            }, this)
          : Array.isArray(e)
            ? e.forEach(function (e) {
                if (2 != e.length)
                  throw TypeError(
                    "Headers constructor: expected name/value pair to be length 2, found" +
                      e.length,
                  );
                this.append(e[0], e[1]);
              }, this)
            : e &&
              Object.getOwnPropertyNames(e).forEach(function (t) {
                this.append(t, e[t]);
              }, this));
    }
    function f(e) {
      if (!e._noBody) {
        if (e.bodyUsed) return Promise.reject(TypeError("Already read"));
        e.bodyUsed = !0;
      }
    }
    function h(e) {
      return new Promise(function (t, r) {
        ((e.onload = function () {
          t(e.result);
        }),
          (e.onerror = function () {
            r(e.error);
          }));
      });
    }
    function d(e) {
      var t = new FileReader(),
        r = h(t);
      return (t.readAsArrayBuffer(e), r);
    }
    function p(e) {
      if (e.slice) return e.slice(0);
      var t = new Uint8Array(e.byteLength);
      return (t.set(new Uint8Array(e)), t.buffer);
    }
    function b() {
      return (
        (this.bodyUsed = !1),
        (this._initBody = function (e) {
          if (((this.bodyUsed = this.bodyUsed), (this._bodyInit = e), e))
            if ("string" == typeof e) this._bodyText = e;
            else if (n.blob && Blob.prototype.isPrototypeOf(e))
              this._bodyBlob = e;
            else if (n.formData && FormData.prototype.isPrototypeOf(e))
              this._bodyFormData = e;
            else if (
              n.searchParams &&
              URLSearchParams.prototype.isPrototypeOf(e)
            )
              this._bodyText = e.toString();
            else {
              var t;
              n.arrayBuffer &&
              n.blob &&
              (t = e) &&
              DataView.prototype.isPrototypeOf(t)
                ? ((this._bodyArrayBuffer = p(e.buffer)),
                  (this._bodyInit = new Blob([this._bodyArrayBuffer])))
                : n.arrayBuffer &&
                    (ArrayBuffer.prototype.isPrototypeOf(e) || s(e))
                  ? (this._bodyArrayBuffer = p(e))
                  : (this._bodyText = e = Object.prototype.toString.call(e));
            }
          else ((this._noBody = !0), (this._bodyText = ""));
          !this.headers.get("content-type") &&
            ("string" == typeof e
              ? this.headers.set("content-type", "text/plain;charset=UTF-8")
              : this._bodyBlob && this._bodyBlob.type
                ? this.headers.set("content-type", this._bodyBlob.type)
                : n.searchParams &&
                  URLSearchParams.prototype.isPrototypeOf(e) &&
                  this.headers.set(
                    "content-type",
                    "application/x-www-form-urlencoded;charset=UTF-8",
                  ));
        }),
        n.blob &&
          (this.blob = function () {
            var e = f(this);
            if (e) return e;
            if (this._bodyBlob) return Promise.resolve(this._bodyBlob);
            if (this._bodyArrayBuffer)
              return Promise.resolve(new Blob([this._bodyArrayBuffer]));
            if (!this._bodyFormData)
              return Promise.resolve(new Blob([this._bodyText]));
            throw Error("could not read FormData body as blob");
          }),
        (this.arrayBuffer = function () {
          if (this._bodyArrayBuffer) {
            var e = f(this);
            return (
              e ||
              (ArrayBuffer.isView(this._bodyArrayBuffer)
                ? Promise.resolve(
                    this._bodyArrayBuffer.buffer.slice(
                      this._bodyArrayBuffer.byteOffset,
                      this._bodyArrayBuffer.byteOffset +
                        this._bodyArrayBuffer.byteLength,
                    ),
                  )
                : Promise.resolve(this._bodyArrayBuffer))
            );
          }
          if (n.blob) return this.blob().then(d);
          throw Error("could not read as ArrayBuffer");
        }),
        (this.text = function () {
          var e,
            t,
            r,
            n,
            i,
            o = f(this);
          if (o) return o;
          if (this._bodyBlob)
            return (
              (e = this._bodyBlob),
              (r = h((t = new FileReader()))),
              (i = (n = /charset=([A-Za-z0-9_-]+)/.exec(e.type))
                ? n[1]
                : "utf-8"),
              t.readAsText(e, i),
              r
            );
          if (this._bodyArrayBuffer)
            return Promise.resolve(
              (function (e) {
                for (
                  var t = new Uint8Array(e), r = Array(t.length), n = 0;
                  n < t.length;
                  n++
                )
                  r[n] = String.fromCharCode(t[n]);
                return r.join("");
              })(this._bodyArrayBuffer),
            );
          if (!this._bodyFormData) return Promise.resolve(this._bodyText);
          throw Error("could not read FormData body as text");
        }),
        n.formData &&
          (this.formData = function () {
            return this.text().then(m);
          }),
        (this.json = function () {
          return this.text().then(JSON.parse);
        }),
        this
      );
    }
    ((u.prototype.append = function (e, t) {
      ((e = a(e)), (t = c(t)));
      var r = this.map[e];
      this.map[e] = r ? r + ", " + t : t;
    }),
      (u.prototype.delete = function (e) {
        delete this.map[a(e)];
      }),
      (u.prototype.get = function (e) {
        return ((e = a(e)), this.has(e) ? this.map[e] : null);
      }),
      (u.prototype.has = function (e) {
        return this.map.hasOwnProperty(a(e));
      }),
      (u.prototype.set = function (e, t) {
        this.map[a(e)] = c(t);
      }),
      (u.prototype.forEach = function (e, t) {
        for (var r in this.map)
          this.map.hasOwnProperty(r) && e.call(t, this.map[r], r, this);
      }),
      (u.prototype.keys = function () {
        var e = [];
        return (
          this.forEach(function (t, r) {
            e.push(r);
          }),
          l(e)
        );
      }),
      (u.prototype.values = function () {
        var e = [];
        return (
          this.forEach(function (t) {
            e.push(t);
          }),
          l(e)
        );
      }),
      (u.prototype.entries = function () {
        var e = [];
        return (
          this.forEach(function (t, r) {
            e.push([r, t]);
          }),
          l(e)
        );
      }),
      n.iterable && (u.prototype[Symbol.iterator] = u.prototype.entries));
    var y = [
      "CONNECT",
      "DELETE",
      "GET",
      "HEAD",
      "OPTIONS",
      "PATCH",
      "POST",
      "PUT",
      "TRACE",
    ];
    function g(e, t) {
      if (!(this instanceof g))
        throw TypeError(
          'Please use the "new" operator, this DOM object constructor cannot be called as a function.',
        );
      var n,
        i,
        o = (t = t || {}).body;
      if (e instanceof g) {
        if (e.bodyUsed) throw TypeError("Already read");
        ((this.url = e.url),
          (this.credentials = e.credentials),
          t.headers || (this.headers = new u(e.headers)),
          (this.method = e.method),
          (this.mode = e.mode),
          (this.signal = e.signal),
          o || null == e._bodyInit || ((o = e._bodyInit), (e.bodyUsed = !0)));
      } else this.url = String(e);
      if (
        ((this.credentials =
          t.credentials || this.credentials || "same-origin"),
        (t.headers || !this.headers) && (this.headers = new u(t.headers)),
        (this.method =
          ((i = (n = t.method || this.method || "GET").toUpperCase()),
          y.indexOf(i) > -1 ? i : n)),
        (this.mode = t.mode || this.mode || null),
        (this.signal =
          t.signal ||
          this.signal ||
          (function () {
            if ("AbortController" in r) return new AbortController().signal;
          })()),
        (this.referrer = null),
        ("GET" === this.method || "HEAD" === this.method) && o)
      )
        throw TypeError("Body not allowed for GET or HEAD requests");
      if (
        (this._initBody(o),
        ("GET" === this.method || "HEAD" === this.method) &&
          ("no-store" === t.cache || "no-cache" === t.cache))
      ) {
        var s = /([?&])_=[^&]*/;
        s.test(this.url)
          ? (this.url = this.url.replace(s, "$1_=" + new Date().getTime()))
          : (this.url +=
              (/\?/.test(this.url) ? "&" : "?") + "_=" + new Date().getTime());
      }
    }
    function m(e) {
      var t = new FormData();
      return (
        e
          .trim()
          .split("&")
          .forEach(function (e) {
            if (e) {
              var r = e.split("="),
                n = r.shift().replace(/\+/g, " "),
                i = r.join("=").replace(/\+/g, " ");
              t.append(decodeURIComponent(n), decodeURIComponent(i));
            }
          }),
        t
      );
    }
    function w(e, t) {
      if (!(this instanceof w))
        throw TypeError(
          'Please use the "new" operator, this DOM object constructor cannot be called as a function.',
        );
      if (
        (t || (t = {}),
        (this.type = "default"),
        (this.status = void 0 === t.status ? 200 : t.status),
        this.status < 200 || this.status > 599)
      )
        throw RangeError(
          "Failed to construct 'Response': The status provided (0) is outside the range [200, 599].",
        );
      ((this.ok = this.status >= 200 && this.status < 300),
        (this.statusText = void 0 === t.statusText ? "" : "" + t.statusText),
        (this.headers = new u(t.headers)),
        (this.url = t.url || ""),
        this._initBody(e));
    }
    ((g.prototype.clone = function () {
      return new g(this, { body: this._bodyInit });
    }),
      b.call(g.prototype),
      b.call(w.prototype),
      (w.prototype.clone = function () {
        return new w(this._bodyInit, {
          status: this.status,
          statusText: this.statusText,
          headers: new u(this.headers),
          url: this.url,
        });
      }),
      (w.error = function () {
        var e = new w(null, { status: 200, statusText: "" });
        return ((e.ok = !1), (e.status = 0), (e.type = "error"), e);
      }));
    var v = [301, 302, 303, 307, 308];
    ((w.redirect = function (e, t) {
      if (-1 === v.indexOf(t)) throw RangeError("Invalid status code");
      return new w(null, { status: t, headers: { location: e } });
    }),
      (t.DOMException = r.DOMException));
    try {
      new t.DOMException();
    } catch (e) {
      ((t.DOMException = function (e, t) {
        ((this.message = e), (this.name = t));
        var r = Error(e);
        this.stack = r.stack;
      }),
        (t.DOMException.prototype = Object.create(Error.prototype)),
        (t.DOMException.prototype.constructor = t.DOMException));
    }
    function x(e, i) {
      return new Promise(function (o, s) {
        var l = new g(e, i);
        if (l.signal && l.signal.aborted)
          return s(new t.DOMException("Aborted", "AbortError"));
        var f = new XMLHttpRequest();
        function h() {
          f.abort();
        }
        if (
          ((f.onload = function () {
            var e,
              t,
              r = {
                statusText: f.statusText,
                headers:
                  ((e = f.getAllResponseHeaders() || ""),
                  (t = new u()),
                  e
                    .replace(/\r?\n[\t ]+/g, " ")
                    .split("\r")
                    .map(function (e) {
                      return 0 === e.indexOf("\n") ? e.substr(1, e.length) : e;
                    })
                    .forEach(function (e) {
                      var r = e.split(":"),
                        n = r.shift().trim();
                      if (n) {
                        var i = r.join(":").trim();
                        try {
                          t.append(n, i);
                        } catch (e) {
                          console.warn("Response " + e.message);
                        }
                      }
                    }),
                  t),
              };
            (0 === l.url.indexOf("file://") &&
            (f.status < 200 || f.status > 599)
              ? (r.status = 200)
              : (r.status = f.status),
              (r.url =
                "responseURL" in f
                  ? f.responseURL
                  : r.headers.get("X-Request-URL")));
            var n = "response" in f ? f.response : f.responseText;
            setTimeout(function () {
              o(new w(n, r));
            }, 0);
          }),
          (f.onerror = function () {
            setTimeout(function () {
              s(TypeError("Network request failed"));
            }, 0);
          }),
          (f.ontimeout = function () {
            setTimeout(function () {
              s(TypeError("Network request timed out"));
            }, 0);
          }),
          (f.onabort = function () {
            setTimeout(function () {
              s(new t.DOMException("Aborted", "AbortError"));
            }, 0);
          }),
          f.open(
            l.method,
            (function (e) {
              try {
                return "" === e && r.location.href ? r.location.href : e;
              } catch (t) {
                return e;
              }
            })(l.url),
            !0,
          ),
          "include" === l.credentials
            ? (f.withCredentials = !0)
            : "omit" === l.credentials && (f.withCredentials = !1),
          "responseType" in f &&
            (n.blob
              ? (f.responseType = "blob")
              : n.arrayBuffer && (f.responseType = "arraybuffer")),
          i &&
            "object" == typeof i.headers &&
            !(
              i.headers instanceof u ||
              (r.Headers && i.headers instanceof r.Headers)
            ))
        ) {
          var d = [];
          (Object.getOwnPropertyNames(i.headers).forEach(function (e) {
            (d.push(a(e)), f.setRequestHeader(e, c(i.headers[e])));
          }),
            l.headers.forEach(function (e, t) {
              -1 === d.indexOf(t) && f.setRequestHeader(t, e);
            }));
        } else
          l.headers.forEach(function (e, t) {
            f.setRequestHeader(t, e);
          });
        (l.signal &&
          (l.signal.addEventListener("abort", h),
          (f.onreadystatechange = function () {
            4 === f.readyState && l.signal.removeEventListener("abort", h);
          })),
          f.send(void 0 === l._bodyInit ? null : l._bodyInit));
      });
    }
    ((x.polyfill = !0),
      r.fetch ||
        ((r.fetch = x), (r.Headers = u), (r.Request = g), (r.Response = w)),
      (t.Headers = u),
      (t.Request = g),
      (t.Response = w),
      (t.fetch = x),
      Object.defineProperty(t, "__esModule", { value: !0 }));
  })({}),
    (i.fetch.ponyfill = !0),
    delete i.fetch.polyfill);
  var o = n.fetch ? n : i;
  (((r = o.fetch).default = o.fetch),
    (r.fetch = o.fetch),
    (r.Headers = o.Headers),
    (r.Request = o.Request),
    (r.Response = o.Response),
    (t.exports = r));
};
