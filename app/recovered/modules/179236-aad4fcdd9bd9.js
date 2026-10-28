// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(352386),
    n = e.i(304153),
    r = e.i(824627),
    i = new Map([
      ["aac", "audio/aac"],
      ["abw", "application/x-abiword"],
      ["arc", "application/x-freearc"],
      ["avif", "image/avif"],
      ["avi", "video/x-msvideo"],
      ["azw", "application/vnd.amazon.ebook"],
      ["bin", "application/octet-stream"],
      ["bmp", "image/bmp"],
      ["bz", "application/x-bzip"],
      ["bz2", "application/x-bzip2"],
      ["cda", "application/x-cdf"],
      ["csh", "application/x-csh"],
      ["css", "text/css"],
      ["csv", "text/csv"],
      ["doc", "application/msword"],
      [
        "docx",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ],
      ["eot", "application/vnd.ms-fontobject"],
      ["epub", "application/epub+zip"],
      ["gz", "application/gzip"],
      ["gif", "image/gif"],
      ["heic", "image/heic"],
      ["heif", "image/heif"],
      ["htm", "text/html"],
      ["html", "text/html"],
      ["ico", "image/vnd.microsoft.icon"],
      ["ics", "text/calendar"],
      ["jar", "application/java-archive"],
      ["jpeg", "image/jpeg"],
      ["jpg", "image/jpeg"],
      ["js", "text/javascript"],
      ["json", "application/json"],
      ["jsonld", "application/ld+json"],
      ["mid", "audio/midi"],
      ["midi", "audio/midi"],
      ["mjs", "text/javascript"],
      ["mp3", "audio/mpeg"],
      ["mp4", "video/mp4"],
      ["mpeg", "video/mpeg"],
      ["mpkg", "application/vnd.apple.installer+xml"],
      ["odp", "application/vnd.oasis.opendocument.presentation"],
      ["ods", "application/vnd.oasis.opendocument.spreadsheet"],
      ["odt", "application/vnd.oasis.opendocument.text"],
      ["oga", "audio/ogg"],
      ["ogv", "video/ogg"],
      ["ogx", "application/ogg"],
      ["opus", "audio/opus"],
      ["otf", "font/otf"],
      ["png", "image/png"],
      ["pdf", "application/pdf"],
      ["php", "application/x-httpd-php"],
      ["ppt", "application/vnd.ms-powerpoint"],
      [
        "pptx",
        "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      ],
      ["rar", "application/vnd.rar"],
      ["rtf", "application/rtf"],
      ["sh", "application/x-sh"],
      ["svg", "image/svg+xml"],
      ["swf", "application/x-shockwave-flash"],
      ["tar", "application/x-tar"],
      ["tif", "image/tiff"],
      ["tiff", "image/tiff"],
      ["ts", "video/mp2t"],
      ["ttf", "font/ttf"],
      ["txt", "text/plain"],
      ["vsd", "application/vnd.visio"],
      ["wav", "audio/wav"],
      ["weba", "audio/webm"],
      ["webm", "video/webm"],
      ["webp", "image/webp"],
      ["woff", "font/woff"],
      ["woff2", "font/woff2"],
      ["xhtml", "application/xhtml+xml"],
      ["xls", "application/vnd.ms-excel"],
      [
        "xlsx",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      ],
      ["xml", "application/xml"],
      ["xul", "application/vnd.mozilla.xul+xml"],
      ["zip", "application/zip"],
      ["7z", "application/x-7z-compressed"],
      ["mkv", "video/x-matroska"],
      ["mov", "video/quicktime"],
      ["msg", "application/vnd.ms-outlook"],
    ]);
  function o(e, t) {
    var n = (function (e) {
      var t = e.name;
      if (t && -1 !== t.lastIndexOf(".") && !e.type) {
        var n = t.split(".").pop().toLowerCase(),
          r = i.get(n);
        r &&
          Object.defineProperty(e, "type", {
            value: r,
            writable: !1,
            configurable: !1,
            enumerable: !0,
          });
      }
      return e;
    })(e);
    if ("string" != typeof n.path) {
      var r = e.webkitRelativePath;
      Object.defineProperty(n, "path", {
        value:
          "string" == typeof t
            ? t
            : "string" == typeof r && r.length > 0
              ? r
              : e.name,
        writable: !1,
        configurable: !1,
        enumerable: !0,
      });
    }
    return n;
  }
  var a = [".DS_Store", "Thumbs.db"];
  function u(e) {
    return "object" == typeof e && null !== e;
  }
  function l(e) {
    return e.filter(function (e) {
      return -1 === a.indexOf(e.name);
    });
  }
  function c(e) {
    if (null === e) return [];
    for (var t = [], n = 0; n < e.length; n++) {
      var r = e[n];
      t.push(r);
    }
    return t;
  }
  function s(e) {
    if ("function" != typeof e.webkitGetAsEntry) return f(e);
    var t = e.webkitGetAsEntry();
    return t && t.isDirectory ? d(t) : f(e);
  }
  function f(e) {
    var t = e.getAsFile();
    return t
      ? Promise.resolve(o(t))
      : Promise.reject("".concat(e, " is not a File"));
  }
  function p(e) {
    return (0, r.W)(this, void 0, void 0, function () {
      return (0, r.t)(this, function (t) {
        return [
          2,
          e.isDirectory
            ? d(e)
            : (function (e) {
                return (0, r.W)(this, void 0, void 0, function () {
                  return (0, r.t)(this, function (t) {
                    return [
                      2,
                      new Promise(function (t, n) {
                        e.file(
                          function (n) {
                            t(o(n, e.fullPath));
                          },
                          function (e) {
                            n(e);
                          },
                        );
                      }),
                    ];
                  });
                });
              })(e),
        ];
      });
    });
  }
  function d(e) {
    var t = e.createReader();
    return new Promise(function (e, n) {
      var i = [];
      !(function o() {
        var a = this;
        t.readEntries(
          function (t) {
            return (0, r.W)(a, void 0, void 0, function () {
              var a;
              return (0, r.t)(this, function (r) {
                switch (r.label) {
                  case 0:
                    if (t.length) return [3, 5];
                    r.label = 1;
                  case 1:
                    return (r.trys.push([1, 3, , 4]), [4, Promise.all(i)]);
                  case 2:
                    return (e(r.sent()), [3, 4]);
                  case 3:
                    return (n(r.sent()), [3, 4]);
                  case 4:
                    return [3, 6];
                  case 5:
                    ((a = Promise.all(t.map(p))),
                      i.push(a),
                      o(),
                      (r.label = 6));
                  case 6:
                    return [2];
                }
              });
            });
          },
          function (e) {
            n(e);
          },
        );
      })();
    });
  }
  var m = e.i(775592);
  function v(e) {
    return (
      (function (e) {
        if (Array.isArray(e)) return x(e);
      })(e) ||
      (function (e) {
        if (
          ("u" > typeof Symbol && null != e[Symbol.iterator]) ||
          null != e["@@iterator"]
        )
          return Array.from(e);
      })(e) ||
      w(e) ||
      (function () {
        throw TypeError(
          "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
        );
      })()
    );
  }
  function g(e, t) {
    var n = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var r = Object.getOwnPropertySymbols(e);
      (t &&
        (r = r.filter(function (t) {
          return Object.getOwnPropertyDescriptor(e, t).enumerable;
        })),
        n.push.apply(n, r));
    }
    return n;
  }
  function y(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = null != arguments[t] ? arguments[t] : {};
      t % 2
        ? g(Object(n), !0).forEach(function (t) {
            b(e, t, n[t]);
          })
        : Object.getOwnPropertyDescriptors
          ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
          : g(Object(n)).forEach(function (t) {
              Object.defineProperty(
                e,
                t,
                Object.getOwnPropertyDescriptor(n, t),
              );
            });
    }
    return e;
  }
  function b(e, t, n) {
    return (
      t in e
        ? Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[t] = n),
      e
    );
  }
  function h(e, t) {
    return (
      (function (e) {
        if (Array.isArray(e)) return e;
      })(e) ||
      (function (e, t) {
        var n,
          r,
          i =
            null == e
              ? null
              : ("u" > typeof Symbol && e[Symbol.iterator]) || e["@@iterator"];
        if (null != i) {
          var o = [],
            a = !0,
            u = !1;
          try {
            for (
              i = i.call(e);
              !(a = (n = i.next()).done) &&
              (o.push(n.value), !t || o.length !== t);
              a = !0
            );
          } catch (e) {
            ((u = !0), (r = e));
          } finally {
            try {
              a || null == i.return || i.return();
            } finally {
              if (u) throw r;
            }
          }
          return o;
        }
      })(e, t) ||
      w(e, t) ||
      (function () {
        throw TypeError(
          "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
        );
      })()
    );
  }
  function w(e, t) {
    if (e) {
      if ("string" == typeof e) return x(e, t);
      var n = Object.prototype.toString.call(e).slice(8, -1);
      if (
        ("Object" === n && e.constructor && (n = e.constructor.name),
        "Map" === n || "Set" === n)
      )
        return Array.from(e);
      if (
        "Arguments" === n ||
        /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
      )
        return x(e, t);
    }
  }
  function x(e, t) {
    (null == t || t > e.length) && (t = e.length);
    for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
    return r;
  }
  var j = function (e) {
      var t = Array.isArray((e = Array.isArray(e) && 1 === e.length ? e[0] : e))
        ? "one of ".concat(e.join(", "))
        : e;
      return {
        code: "file-invalid-type",
        message: "File type must be ".concat(t),
      };
    },
    D = function (e) {
      return {
        code: "file-too-large",
        message: "File is larger than "
          .concat(e, " ")
          .concat(1 === e ? "byte" : "bytes"),
      };
    },
    A = function (e) {
      return {
        code: "file-too-small",
        message: "File is smaller than "
          .concat(e, " ")
          .concat(1 === e ? "byte" : "bytes"),
      };
    },
    O = { code: "too-many-files", message: "Too many files" };
  function C(e, t) {
    var n = "application/x-moz-file" === e.type || (0, m.default)(e, t);
    return [n, n ? null : j(t)];
  }
  function z(e, t, n) {
    if (F(e.size)) {
      if (F(t) && F(n)) {
        if (e.size > n) return [!1, D(n)];
        if (e.size < t) return [!1, A(t)];
      } else if (F(t) && e.size < t) return [!1, A(t)];
      else if (F(n) && e.size > n) return [!1, D(n)];
    }
    return [!0, null];
  }
  function F(e) {
    return null != e;
  }
  function E(e) {
    return "function" == typeof e.isPropagationStopped
      ? e.isPropagationStopped()
      : void 0 !== e.cancelBubble && e.cancelBubble;
  }
  function P(e) {
    return e.dataTransfer
      ? Array.prototype.some.call(e.dataTransfer.types, function (e) {
          return "Files" === e || "application/x-moz-file" === e;
        })
      : !!e.target && !!e.target.files;
  }
  function S(e) {
    e.preventDefault();
  }
  function k() {
    for (var e = arguments.length, t = Array(e), n = 0; n < e; n++)
      t[n] = arguments[n];
    return function (e) {
      for (
        var n = arguments.length, r = Array(n > 1 ? n - 1 : 0), i = 1;
        i < n;
        i++
      )
        r[i - 1] = arguments[i];
      return t.some(function (t) {
        return (!E(e) && t && t.apply(void 0, [e].concat(r)), E(e));
      });
    };
  }
  function R(e) {
    return (
      "audio/*" === e ||
      "video/*" === e ||
      "image/*" === e ||
      "text/*" === e ||
      /\w+\/[-+.\w]+/g.test(e)
    );
  }
  function I(e) {
    return /^.*\.[\w]+$/.test(e);
  }
  var T = ["children"],
    U = ["open"],
    L = [
      "refKey",
      "role",
      "onKeyDown",
      "onFocus",
      "onBlur",
      "onClick",
      "onDragEnter",
      "onDragOver",
      "onDragLeave",
      "onDrop",
    ],
    _ = ["refKey", "onChange", "onClick"];
  function M(e, t) {
    return (
      (function (e) {
        if (Array.isArray(e)) return e;
      })(e) ||
      (function (e, t) {
        var n,
          r,
          i =
            null == e
              ? null
              : ("u" > typeof Symbol && e[Symbol.iterator]) || e["@@iterator"];
        if (null != i) {
          var o = [],
            a = !0,
            u = !1;
          try {
            for (
              i = i.call(e);
              !(a = (n = i.next()).done) &&
              (o.push(n.value), !t || o.length !== t);
              a = !0
            );
          } catch (e) {
            ((u = !0), (r = e));
          } finally {
            try {
              a || null == i.return || i.return();
            } finally {
              if (u) throw r;
            }
          }
          return o;
        }
      })(e, t) ||
      K(e, t) ||
      (function () {
        throw TypeError(
          "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
        );
      })()
    );
  }
  function K(e, t) {
    if (e) {
      if ("string" == typeof e) return B(e, t);
      var n = Object.prototype.toString.call(e).slice(8, -1);
      if (
        ("Object" === n && e.constructor && (n = e.constructor.name),
        "Map" === n || "Set" === n)
      )
        return Array.from(e);
      if (
        "Arguments" === n ||
        /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
      )
        return B(e, t);
    }
  }
  function B(e, t) {
    (null == t || t > e.length) && (t = e.length);
    for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
    return r;
  }
  function N(e, t) {
    var n = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var r = Object.getOwnPropertySymbols(e);
      (t &&
        (r = r.filter(function (t) {
          return Object.getOwnPropertyDescriptor(e, t).enumerable;
        })),
        n.push.apply(n, r));
    }
    return n;
  }
  function $(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = null != arguments[t] ? arguments[t] : {};
      t % 2
        ? N(Object(n), !0).forEach(function (t) {
            Q(e, t, n[t]);
          })
        : Object.getOwnPropertyDescriptors
          ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
          : N(Object(n)).forEach(function (t) {
              Object.defineProperty(
                e,
                t,
                Object.getOwnPropertyDescriptor(n, t),
              );
            });
    }
    return e;
  }
  function Q(e, t, n) {
    return (
      t in e
        ? Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[t] = n),
      e
    );
  }
  function W(e, t) {
    if (null == e) return {};
    var n,
      r,
      i = (function (e, t) {
        if (null == e) return {};
        var n,
          r,
          i = {},
          o = Object.keys(e);
        for (r = 0; r < o.length; r++)
          ((n = o[r]), t.indexOf(n) >= 0 || (i[n] = e[n]));
        return i;
      })(e, t);
    if (Object.getOwnPropertySymbols) {
      var o = Object.getOwnPropertySymbols(e);
      for (r = 0; r < o.length; r++)
        ((n = o[r]),
          !(t.indexOf(n) >= 0) &&
            Object.prototype.propertyIsEnumerable.call(e, n) &&
            (i[n] = e[n]));
    }
    return i;
  }
  var q = (0, t.forwardRef)(function (e, n) {
    var r = e.children,
      i = J(W(e, T)),
      o = i.open,
      a = W(i, U);
    return (
      (0, t.useImperativeHandle)(
        n,
        function () {
          return { open: o };
        },
        [o],
      ),
      t.default.createElement(t.Fragment, null, r($($({}, a), {}, { open: o })))
    );
  });
  q.displayName = "Dropzone";
  var G = {
    disabled: !1,
    getFilesFromEvent: function (e) {
      return (0, r.W)(this, void 0, void 0, function () {
        return (0, r.t)(this, function (t) {
          var n;
          if (u(e) && u(e.dataTransfer))
            return [
              2,
              (function (e, t) {
                return (0, r.W)(this, void 0, void 0, function () {
                  var n;
                  return (0, r.t)(this, function (i) {
                    switch (i.label) {
                      case 0:
                        if (!e.items) return [3, 2];
                        if (
                          ((n = c(e.items).filter(function (e) {
                            return "file" === e.kind;
                          })),
                          "drop" !== t)
                        )
                          return [2, n];
                        return [4, Promise.all(n.map(s))];
                      case 1:
                        return [
                          2,
                          l(
                            (function e(t) {
                              return t.reduce(function (t, n) {
                                return (0, r.p)(
                                  (0, r.p)([], (0, r.J)(t), !1),
                                  (0, r.J)(Array.isArray(n) ? e(n) : [n]),
                                  !1,
                                );
                              }, []);
                            })(i.sent()),
                          ),
                        ];
                      case 2:
                        return [
                          2,
                          l(
                            c(e.files).map(function (e) {
                              return o(e);
                            }),
                          ),
                        ];
                    }
                  });
                });
              })(e.dataTransfer, e.type),
            ];
          if (u((n = e)) && u(n.target))
            return [
              2,
              c(e.target.files).map(function (e) {
                return o(e);
              }),
            ];
          return Array.isArray(e) &&
            e.every(function (e) {
              return "getFile" in e && "function" == typeof e.getFile;
            })
            ? [
                2,
                (function (e) {
                  return (0, r.W)(this, void 0, void 0, function () {
                    return (0, r.t)(this, function (t) {
                      switch (t.label) {
                        case 0:
                          return [
                            4,
                            Promise.all(
                              e.map(function (e) {
                                return e.getFile();
                              }),
                            ),
                          ];
                        case 1:
                          return [
                            2,
                            t.sent().map(function (e) {
                              return o(e);
                            }),
                          ];
                      }
                    });
                  });
                })(e),
              ]
            : [2, []];
        });
      });
    },
    maxSize: 1 / 0,
    minSize: 0,
    multiple: !0,
    maxFiles: 0,
    preventDropOnDocument: !0,
    noClick: !1,
    noKeyboard: !1,
    noDrag: !1,
    noDragEventsBubbling: !1,
    validator: null,
    useFsAccessApi: !0,
    autoFocus: !1,
  };
  ((q.defaultProps = G),
    (q.propTypes = {
      children: n.default.func,
      accept: n.default.objectOf(n.default.arrayOf(n.default.string)),
      multiple: n.default.bool,
      preventDropOnDocument: n.default.bool,
      noClick: n.default.bool,
      noKeyboard: n.default.bool,
      noDrag: n.default.bool,
      noDragEventsBubbling: n.default.bool,
      minSize: n.default.number,
      maxSize: n.default.number,
      maxFiles: n.default.number,
      disabled: n.default.bool,
      getFilesFromEvent: n.default.func,
      onFileDialogCancel: n.default.func,
      onFileDialogOpen: n.default.func,
      useFsAccessApi: n.default.bool,
      autoFocus: n.default.bool,
      onDragEnter: n.default.func,
      onDragLeave: n.default.func,
      onDragOver: n.default.func,
      onDrop: n.default.func,
      onDropAccepted: n.default.func,
      onDropRejected: n.default.func,
      onError: n.default.func,
      validator: n.default.func,
    }));
  var H = {
    isFocused: !1,
    isFileDialogActive: !1,
    isDragActive: !1,
    isDragAccept: !1,
    isDragReject: !1,
    acceptedFiles: [],
    fileRejections: [],
  };
  function J() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
      n = $($({}, G), e),
      r = n.accept,
      i = n.disabled,
      o = n.getFilesFromEvent,
      a = n.maxSize,
      u = n.minSize,
      l = n.multiple,
      c = n.maxFiles,
      s = n.onDragEnter,
      f = n.onDragLeave,
      p = n.onDragOver,
      d = n.onDrop,
      m = n.onDropAccepted,
      g = n.onDropRejected,
      w = n.onFileDialogCancel,
      x = n.onFileDialogOpen,
      j = n.useFsAccessApi,
      D = n.autoFocus,
      A = n.preventDropOnDocument,
      T = n.noClick,
      U = n.noKeyboard,
      N = n.noDrag,
      q = n.noDragEventsBubbling,
      J = n.onError,
      X = n.validator,
      Z = (0, t.useMemo)(
        function () {
          return F(r)
            ? Object.entries(r)
                .reduce(function (e, t) {
                  var n = h(t, 2),
                    r = n[0],
                    i = n[1];
                  return [].concat(v(e), [r], v(i));
                }, [])
                .filter(function (e) {
                  return R(e) || I(e);
                })
                .join(",")
            : void 0;
        },
        [r],
      ),
      ee = (0, t.useMemo)(
        function () {
          return F(r)
            ? [
                {
                  description: "Files",
                  accept: Object.entries(r)
                    .filter(function (e) {
                      var t = h(e, 2),
                        n = t[0],
                        r = t[1],
                        i = !0;
                      return (
                        R(n) ||
                          (console.warn(
                            'Skipped "'.concat(
                              n,
                              '" because it is not a valid MIME type. Check https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types for a list of valid MIME types.',
                            ),
                          ),
                          (i = !1)),
                        (Array.isArray(r) && r.every(I)) ||
                          (console.warn(
                            'Skipped "'.concat(
                              n,
                              '" because an invalid file extension was provided.',
                            ),
                          ),
                          (i = !1)),
                        i
                      );
                    })
                    .reduce(function (e, t) {
                      var n = h(t, 2),
                        r = n[0],
                        i = n[1];
                      return y(y({}, e), {}, b({}, r, i));
                    }, {}),
                },
              ]
            : r;
        },
        [r],
      ),
      et = (0, t.useMemo)(
        function () {
          return "function" == typeof x ? x : V;
        },
        [x],
      ),
      en = (0, t.useMemo)(
        function () {
          return "function" == typeof w ? w : V;
        },
        [w],
      ),
      er = (0, t.useRef)(null),
      ei = (0, t.useRef)(null),
      eo = M((0, t.useReducer)(Y, H), 2),
      ea = eo[0],
      eu = eo[1],
      el = ea.isFocused,
      ec = ea.isFileDialogActive,
      es = (0, t.useRef)(
        "u" > typeof window &&
          window.isSecureContext &&
          j &&
          "showOpenFilePicker" in window,
      ),
      ef = function () {
        !es.current &&
          ec &&
          setTimeout(function () {
            ei.current &&
              (ei.current.files.length || (eu({ type: "closeDialog" }), en()));
          }, 300);
      };
    (0, t.useEffect)(
      function () {
        return (
          window.addEventListener("focus", ef, !1),
          function () {
            window.removeEventListener("focus", ef, !1);
          }
        );
      },
      [ei, ec, en, es],
    );
    var ep = (0, t.useRef)([]),
      ed = function (e) {
        (er.current && er.current.contains(e.target)) ||
          (e.preventDefault(), (ep.current = []));
      };
    ((0, t.useEffect)(
      function () {
        return (
          A &&
            (document.addEventListener("dragover", S, !1),
            document.addEventListener("drop", ed, !1)),
          function () {
            A &&
              (document.removeEventListener("dragover", S),
              document.removeEventListener("drop", ed));
          }
        );
      },
      [er, A],
    ),
      (0, t.useEffect)(
        function () {
          return (!i && D && er.current && er.current.focus(), function () {});
        },
        [er, D, i],
      ));
    var em = (0, t.useCallback)(
        function (e) {
          J ? J(e) : console.error(e);
        },
        [J],
      ),
      ev = (0, t.useCallback)(
        function (e) {
          var t;
          (e.preventDefault(),
            e.persist(),
            eF(e),
            (ep.current = [].concat(
              (function (e) {
                if (Array.isArray(e)) return B(e);
              })((t = ep.current)) ||
                (function (e) {
                  if (
                    ("u" > typeof Symbol && null != e[Symbol.iterator]) ||
                    null != e["@@iterator"]
                  )
                    return Array.from(e);
                })(t) ||
                K(t) ||
                (function () {
                  throw TypeError(
                    "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
                  );
                })(),
              [e.target],
            )),
            P(e) &&
              Promise.resolve(o(e))
                .then(function (t) {
                  if (!E(e) || q) {
                    var n,
                      r,
                      i,
                      o,
                      f,
                      p,
                      d,
                      m,
                      v = t.length,
                      g =
                        v > 0 &&
                        ((r = (n = {
                          files: t,
                          accept: Z,
                          minSize: u,
                          maxSize: a,
                          multiple: l,
                          maxFiles: c,
                          validator: X,
                        }).files),
                        (i = n.accept),
                        (o = n.minSize),
                        (f = n.maxSize),
                        (p = n.multiple),
                        (d = n.maxFiles),
                        (m = n.validator),
                        (!!p || !(r.length > 1)) &&
                          (!p || !(d >= 1) || !(r.length > d)) &&
                          r.every(function (e) {
                            var t = h(C(e, i), 1)[0],
                              n = h(z(e, o, f), 1)[0],
                              r = m ? m(e) : null;
                            return t && n && !r;
                          }));
                    (eu({
                      isDragAccept: g,
                      isDragReject: v > 0 && !g,
                      isDragActive: !0,
                      type: "setDraggedFiles",
                    }),
                      s && s(e));
                  }
                })
                .catch(function (e) {
                  return em(e);
                }));
        },
        [o, s, em, q, Z, u, a, l, c, X],
      ),
      eg = (0, t.useCallback)(
        function (e) {
          (e.preventDefault(), e.persist(), eF(e));
          var t = P(e);
          if (t && e.dataTransfer)
            try {
              e.dataTransfer.dropEffect = "copy";
            } catch (e) {}
          return (t && p && p(e), !1);
        },
        [p, q],
      ),
      ey = (0, t.useCallback)(
        function (e) {
          (e.preventDefault(), e.persist(), eF(e));
          var t = ep.current.filter(function (e) {
              return er.current && er.current.contains(e);
            }),
            n = t.indexOf(e.target);
          (-1 !== n && t.splice(n, 1),
            (ep.current = t),
            !(t.length > 0) &&
              (eu({
                type: "setDraggedFiles",
                isDragActive: !1,
                isDragAccept: !1,
                isDragReject: !1,
              }),
              P(e) && f && f(e)));
        },
        [er, f, q],
      ),
      eb = (0, t.useCallback)(
        function (e, t) {
          var n = [],
            r = [];
          (e.forEach(function (e) {
            var t = M(C(e, Z), 2),
              i = t[0],
              o = t[1],
              l = M(z(e, u, a), 2),
              c = l[0],
              s = l[1],
              f = X ? X(e) : null;
            if (i && c && !f) n.push(e);
            else {
              var p = [o, s];
              (f && (p = p.concat(f)),
                r.push({
                  file: e,
                  errors: p.filter(function (e) {
                    return e;
                  }),
                }));
            }
          }),
            ((!l && n.length > 1) || (l && c >= 1 && n.length > c)) &&
              (n.forEach(function (e) {
                r.push({ file: e, errors: [O] });
              }),
              n.splice(0)),
            eu({ acceptedFiles: n, fileRejections: r, type: "setFiles" }),
            d && d(n, r, t),
            r.length > 0 && g && g(r, t),
            n.length > 0 && m && m(n, t));
        },
        [eu, l, Z, u, a, c, d, m, g, X],
      ),
      eh = (0, t.useCallback)(
        function (e) {
          (e.preventDefault(),
            e.persist(),
            eF(e),
            (ep.current = []),
            P(e) &&
              Promise.resolve(o(e))
                .then(function (t) {
                  (!E(e) || q) && eb(t, e);
                })
                .catch(function (e) {
                  return em(e);
                }),
            eu({ type: "reset" }));
        },
        [o, eb, em, q],
      ),
      ew = (0, t.useCallback)(
        function () {
          if (es.current) {
            (eu({ type: "openDialog" }),
              et(),
              window
                .showOpenFilePicker({ multiple: l, types: ee })
                .then(function (e) {
                  return o(e);
                })
                .then(function (e) {
                  (eb(e, null), eu({ type: "closeDialog" }));
                })
                .catch(function (e) {
                  e instanceof DOMException &&
                  ("AbortError" === e.name || e.code === e.ABORT_ERR)
                    ? (en(e), eu({ type: "closeDialog" }))
                    : e instanceof DOMException &&
                        ("SecurityError" === e.name ||
                          e.code === e.SECURITY_ERR)
                      ? ((es.current = !1),
                        ei.current
                          ? ((ei.current.value = null), ei.current.click())
                          : em(
                              Error(
                                "Cannot open the file picker because the https://developer.mozilla.org/en-US/docs/Web/API/File_System_Access_API is not supported and no <input> was provided.",
                              ),
                            ))
                      : em(e);
                }));
            return;
          }
          ei.current &&
            (eu({ type: "openDialog" }),
            et(),
            (ei.current.value = null),
            ei.current.click());
        },
        [eu, et, en, j, eb, em, ee, l],
      ),
      ex = (0, t.useCallback)(
        function (e) {
          er.current &&
            er.current.isEqualNode(e.target) &&
            (" " === e.key ||
              "Enter" === e.key ||
              32 === e.keyCode ||
              13 === e.keyCode) &&
            (e.preventDefault(), ew());
        },
        [er, ew],
      ),
      ej = (0, t.useCallback)(function () {
        eu({ type: "focus" });
      }, []),
      eD = (0, t.useCallback)(function () {
        eu({ type: "blur" });
      }, []),
      eA = (0, t.useCallback)(
        function () {
          T ||
            ((function () {
              var e =
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : window.navigator.userAgent;
              return (
                -1 !== e.indexOf("MSIE") ||
                -1 !== e.indexOf("Trident/") ||
                -1 !== e.indexOf("Edge/")
              );
            })()
              ? setTimeout(ew, 0)
              : ew());
        },
        [T, ew],
      ),
      eO = function (e) {
        return i ? null : e;
      },
      eC = function (e) {
        return U ? null : eO(e);
      },
      ez = function (e) {
        return N ? null : eO(e);
      },
      eF = function (e) {
        q && e.stopPropagation();
      },
      eE = (0, t.useMemo)(
        function () {
          return function () {
            var e =
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : {},
              t = e.refKey,
              n = e.role,
              r = e.onKeyDown,
              o = e.onFocus,
              a = e.onBlur,
              u = e.onClick,
              l = e.onDragEnter,
              c = e.onDragOver,
              s = e.onDragLeave,
              f = e.onDrop,
              p = W(e, L);
            return $(
              $(
                Q(
                  {
                    onKeyDown: eC(k(r, ex)),
                    onFocus: eC(k(o, ej)),
                    onBlur: eC(k(a, eD)),
                    onClick: eO(k(u, eA)),
                    onDragEnter: ez(k(l, ev)),
                    onDragOver: ez(k(c, eg)),
                    onDragLeave: ez(k(s, ey)),
                    onDrop: ez(k(f, eh)),
                    role: "string" == typeof n && "" !== n ? n : "presentation",
                  },
                  void 0 === t ? "ref" : t,
                  er,
                ),
                i || U ? {} : { tabIndex: 0 },
              ),
              p,
            );
          };
        },
        [er, ex, ej, eD, eA, ev, eg, ey, eh, U, N, i],
      ),
      eP = (0, t.useCallback)(function (e) {
        e.stopPropagation();
      }, []),
      eS = (0, t.useMemo)(
        function () {
          return function () {
            var e =
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : {},
              t = e.refKey,
              n = e.onChange,
              r = e.onClick,
              i = W(e, _);
            return $(
              $(
                {},
                Q(
                  {
                    accept: Z,
                    multiple: l,
                    type: "file",
                    style: { display: "none" },
                    onChange: eO(k(n, eh)),
                    onClick: eO(k(r, eP)),
                    tabIndex: -1,
                  },
                  void 0 === t ? "ref" : t,
                  ei,
                ),
              ),
              i,
            );
          };
        },
        [ei, r, l, eh, i],
      );
    return $(
      $({}, ea),
      {},
      {
        isFocused: el && !i,
        getRootProps: eE,
        getInputProps: eS,
        rootRef: er,
        inputRef: ei,
        open: eO(ew),
      },
    );
  }
  function Y(e, t) {
    switch (t.type) {
      case "focus":
        return $($({}, e), {}, { isFocused: !0 });
      case "blur":
        return $($({}, e), {}, { isFocused: !1 });
      case "openDialog":
        return $($({}, H), {}, { isFileDialogActive: !0 });
      case "closeDialog":
        return $($({}, e), {}, { isFileDialogActive: !1 });
      case "setDraggedFiles":
        return $(
          $({}, e),
          {},
          {
            isDragActive: t.isDragActive,
            isDragAccept: t.isDragAccept,
            isDragReject: t.isDragReject,
          },
        );
      case "setFiles":
        return $(
          $({}, e),
          {},
          { acceptedFiles: t.acceptedFiles, fileRejections: t.fileRejections },
        );
      case "reset":
        return $({}, H);
      default:
        return e;
    }
  }
  function V() {}
  e.s(["U", 0, q, "B", 0, J], 179236);
};
