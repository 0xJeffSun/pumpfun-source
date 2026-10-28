// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(352386),
    r = e.i(304153),
    n = e.i(824627),
    a = new Map([
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
  function i(e, t) {
    var r = (function (e) {
      var t = e.name;
      if (t && -1 !== t.lastIndexOf(".") && !e.type) {
        var r = t.split(".").pop().toLowerCase(),
          n = a.get(r);
        n &&
          Object.defineProperty(e, "type", {
            value: n,
            writable: !1,
            configurable: !1,
            enumerable: !0,
          });
      }
      return e;
    })(e);
    if ("string" != typeof r.path) {
      var n = e.webkitRelativePath;
      Object.defineProperty(r, "path", {
        value:
          "string" == typeof t
            ? t
            : "string" == typeof n && n.length > 0
              ? n
              : e.name,
        writable: !1,
        configurable: !1,
        enumerable: !0,
      });
    }
    return r;
  }
  var o = [".DS_Store", "Thumbs.db"];
  function l(e) {
    return "object" == typeof e && null !== e;
  }
  function s(e) {
    return e.filter(function (e) {
      return -1 === o.indexOf(e.name);
    });
  }
  function c(e) {
    if (null === e) return [];
    for (var t = [], r = 0; r < e.length; r++) {
      var n = e[r];
      t.push(n);
    }
    return t;
  }
  function u(e) {
    if ("function" != typeof e.webkitGetAsEntry) return m(e);
    var t = e.webkitGetAsEntry();
    return t && t.isDirectory ? f(t) : m(e);
  }
  function m(e) {
    var t = e.getAsFile();
    return t
      ? Promise.resolve(i(t))
      : Promise.reject("".concat(e, " is not a File"));
  }
  function d(e) {
    return (0, n.W)(this, void 0, void 0, function () {
      return (0, n.t)(this, function (t) {
        return [
          2,
          e.isDirectory
            ? f(e)
            : (function (e) {
                return (0, n.W)(this, void 0, void 0, function () {
                  return (0, n.t)(this, function (t) {
                    return [
                      2,
                      new Promise(function (t, r) {
                        e.file(
                          function (r) {
                            t(i(r, e.fullPath));
                          },
                          function (e) {
                            r(e);
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
  function f(e) {
    var t = e.createReader();
    return new Promise(function (e, r) {
      var a = [];
      !(function i() {
        var o = this;
        t.readEntries(
          function (t) {
            return (0, n.W)(o, void 0, void 0, function () {
              var o;
              return (0, n.t)(this, function (n) {
                switch (n.label) {
                  case 0:
                    if (t.length) return [3, 5];
                    n.label = 1;
                  case 1:
                    return (n.trys.push([1, 3, , 4]), [4, Promise.all(a)]);
                  case 2:
                    return (e(n.sent()), [3, 4]);
                  case 3:
                    return (r(n.sent()), [3, 4]);
                  case 4:
                    return [3, 6];
                  case 5:
                    ((o = Promise.all(t.map(d))),
                      a.push(o),
                      i(),
                      (n.label = 6));
                  case 6:
                    return [2];
                }
              });
            });
          },
          function (e) {
            r(e);
          },
        );
      })();
    });
  }
  var p = e.i(775592);
  function h(e) {
    return (
      (function (e) {
        if (Array.isArray(e)) return w(e);
      })(e) ||
      (function (e) {
        if (
          ("u" > typeof Symbol && null != e[Symbol.iterator]) ||
          null != e["@@iterator"]
        )
          return Array.from(e);
      })(e) ||
      v(e) ||
      (function () {
        throw TypeError(
          "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
        );
      })()
    );
  }
  function y(e, t) {
    var r = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var n = Object.getOwnPropertySymbols(e);
      (t &&
        (n = n.filter(function (t) {
          return Object.getOwnPropertyDescriptor(e, t).enumerable;
        })),
        r.push.apply(r, n));
    }
    return r;
  }
  function x(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = null != arguments[t] ? arguments[t] : {};
      t % 2
        ? y(Object(r), !0).forEach(function (t) {
            b(e, t, r[t]);
          })
        : Object.getOwnPropertyDescriptors
          ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
          : y(Object(r)).forEach(function (t) {
              Object.defineProperty(
                e,
                t,
                Object.getOwnPropertyDescriptor(r, t),
              );
            });
    }
    return e;
  }
  function b(e, t, r) {
    return (
      t in e
        ? Object.defineProperty(e, t, {
            value: r,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[t] = r),
      e
    );
  }
  function g(e, t) {
    return (
      (function (e) {
        if (Array.isArray(e)) return e;
      })(e) ||
      (function (e, t) {
        var r,
          n,
          a =
            null == e
              ? null
              : ("u" > typeof Symbol && e[Symbol.iterator]) || e["@@iterator"];
        if (null != a) {
          var i = [],
            o = !0,
            l = !1;
          try {
            for (
              a = a.call(e);
              !(o = (r = a.next()).done) &&
              (i.push(r.value), !t || i.length !== t);
              o = !0
            );
          } catch (e) {
            ((l = !0), (n = e));
          } finally {
            try {
              o || null == a.return || a.return();
            } finally {
              if (l) throw n;
            }
          }
          return i;
        }
      })(e, t) ||
      v(e, t) ||
      (function () {
        throw TypeError(
          "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
        );
      })()
    );
  }
  function v(e, t) {
    if (e) {
      if ("string" == typeof e) return w(e, t);
      var r = Object.prototype.toString.call(e).slice(8, -1);
      if (
        ("Object" === r && e.constructor && (r = e.constructor.name),
        "Map" === r || "Set" === r)
      )
        return Array.from(e);
      if (
        "Arguments" === r ||
        /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
      )
        return w(e, t);
    }
  }
  function w(e, t) {
    (null == t || t > e.length) && (t = e.length);
    for (var r = 0, n = Array(t); r < t; r++) n[r] = e[r];
    return n;
  }
  var _ = function (e) {
      var t = Array.isArray((e = Array.isArray(e) && 1 === e.length ? e[0] : e))
        ? "one of ".concat(e.join(", "))
        : e;
      return {
        code: "file-invalid-type",
        message: "File type must be ".concat(t),
      };
    },
    j = function (e) {
      return {
        code: "file-too-large",
        message: "File is larger than "
          .concat(e, " ")
          .concat(1 === e ? "byte" : "bytes"),
      };
    },
    k = function (e) {
      return {
        code: "file-too-small",
        message: "File is smaller than "
          .concat(e, " ")
          .concat(1 === e ? "byte" : "bytes"),
      };
    },
    N = { code: "too-many-files", message: "Too many files" };
  function E(e, t) {
    var r = "application/x-moz-file" === e.type || (0, p.default)(e, t);
    return [r, r ? null : _(t)];
  }
  function A(e, t, r) {
    if (S(e.size)) {
      if (S(t) && S(r)) {
        if (e.size > r) return [!1, j(r)];
        if (e.size < t) return [!1, k(t)];
      } else if (S(t) && e.size < t) return [!1, k(t)];
      else if (S(r) && e.size > r) return [!1, j(r)];
    }
    return [!0, null];
  }
  function S(e) {
    return null != e;
  }
  function D(e) {
    return "function" == typeof e.isPropagationStopped
      ? e.isPropagationStopped()
      : void 0 !== e.cancelBubble && e.cancelBubble;
  }
  function C(e) {
    return e.dataTransfer
      ? Array.prototype.some.call(e.dataTransfer.types, function (e) {
          return "Files" === e || "application/x-moz-file" === e;
        })
      : !!e.target && !!e.target.files;
  }
  function O(e) {
    e.preventDefault();
  }
  function M() {
    for (var e = arguments.length, t = Array(e), r = 0; r < e; r++)
      t[r] = arguments[r];
    return function (e) {
      for (
        var r = arguments.length, n = Array(r > 1 ? r - 1 : 0), a = 1;
        a < r;
        a++
      )
        n[a - 1] = arguments[a];
      return t.some(function (t) {
        return (!D(e) && t && t.apply(void 0, [e].concat(n)), D(e));
      });
    };
  }
  function T(e) {
    return (
      "audio/*" === e ||
      "video/*" === e ||
      "image/*" === e ||
      "text/*" === e ||
      /\w+\/[-+.\w]+/g.test(e)
    );
  }
  function F(e) {
    return /^.*\.[\w]+$/.test(e);
  }
  var P = ["children"],
    z = ["open"],
    R = [
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
    I = ["refKey", "onChange", "onClick"];
  function L(e, t) {
    return (
      (function (e) {
        if (Array.isArray(e)) return e;
      })(e) ||
      (function (e, t) {
        var r,
          n,
          a =
            null == e
              ? null
              : ("u" > typeof Symbol && e[Symbol.iterator]) || e["@@iterator"];
        if (null != a) {
          var i = [],
            o = !0,
            l = !1;
          try {
            for (
              a = a.call(e);
              !(o = (r = a.next()).done) &&
              (i.push(r.value), !t || i.length !== t);
              o = !0
            );
          } catch (e) {
            ((l = !0), (n = e));
          } finally {
            try {
              o || null == a.return || a.return();
            } finally {
              if (l) throw n;
            }
          }
          return i;
        }
      })(e, t) ||
      B(e, t) ||
      (function () {
        throw TypeError(
          "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
        );
      })()
    );
  }
  function B(e, t) {
    if (e) {
      if ("string" == typeof e) return $(e, t);
      var r = Object.prototype.toString.call(e).slice(8, -1);
      if (
        ("Object" === r && e.constructor && (r = e.constructor.name),
        "Map" === r || "Set" === r)
      )
        return Array.from(e);
      if (
        "Arguments" === r ||
        /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
      )
        return $(e, t);
    }
  }
  function $(e, t) {
    (null == t || t > e.length) && (t = e.length);
    for (var r = 0, n = Array(t); r < t; r++) n[r] = e[r];
    return n;
  }
  function H(e, t) {
    var r = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var n = Object.getOwnPropertySymbols(e);
      (t &&
        (n = n.filter(function (t) {
          return Object.getOwnPropertyDescriptor(e, t).enumerable;
        })),
        r.push.apply(r, n));
    }
    return r;
  }
  function K(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = null != arguments[t] ? arguments[t] : {};
      t % 2
        ? H(Object(r), !0).forEach(function (t) {
            U(e, t, r[t]);
          })
        : Object.getOwnPropertyDescriptors
          ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
          : H(Object(r)).forEach(function (t) {
              Object.defineProperty(
                e,
                t,
                Object.getOwnPropertyDescriptor(r, t),
              );
            });
    }
    return e;
  }
  function U(e, t, r) {
    return (
      t in e
        ? Object.defineProperty(e, t, {
            value: r,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[t] = r),
      e
    );
  }
  function W(e, t) {
    if (null == e) return {};
    var r,
      n,
      a = (function (e, t) {
        if (null == e) return {};
        var r,
          n,
          a = {},
          i = Object.keys(e);
        for (n = 0; n < i.length; n++)
          ((r = i[n]), t.indexOf(r) >= 0 || (a[r] = e[r]));
        return a;
      })(e, t);
    if (Object.getOwnPropertySymbols) {
      var i = Object.getOwnPropertySymbols(e);
      for (n = 0; n < i.length; n++)
        ((r = i[n]),
          !(t.indexOf(r) >= 0) &&
            Object.prototype.propertyIsEnumerable.call(e, r) &&
            (a[r] = e[r]));
    }
    return a;
  }
  var G = (0, t.forwardRef)(function (e, r) {
    var n = e.children,
      a = X(W(e, P)),
      i = a.open,
      o = W(a, z);
    return (
      (0, t.useImperativeHandle)(
        r,
        function () {
          return { open: i };
        },
        [i],
      ),
      t.default.createElement(t.Fragment, null, n(K(K({}, o), {}, { open: i })))
    );
  });
  G.displayName = "Dropzone";
  var q = {
    disabled: !1,
    getFilesFromEvent: function (e) {
      return (0, n.W)(this, void 0, void 0, function () {
        return (0, n.t)(this, function (t) {
          var r;
          if (l(e) && l(e.dataTransfer))
            return [
              2,
              (function (e, t) {
                return (0, n.W)(this, void 0, void 0, function () {
                  var r;
                  return (0, n.t)(this, function (a) {
                    switch (a.label) {
                      case 0:
                        if (!e.items) return [3, 2];
                        if (
                          ((r = c(e.items).filter(function (e) {
                            return "file" === e.kind;
                          })),
                          "drop" !== t)
                        )
                          return [2, r];
                        return [4, Promise.all(r.map(u))];
                      case 1:
                        return [
                          2,
                          s(
                            (function e(t) {
                              return t.reduce(function (t, r) {
                                return (0, n.p)(
                                  (0, n.p)([], (0, n.J)(t), !1),
                                  (0, n.J)(Array.isArray(r) ? e(r) : [r]),
                                  !1,
                                );
                              }, []);
                            })(a.sent()),
                          ),
                        ];
                      case 2:
                        return [
                          2,
                          s(
                            c(e.files).map(function (e) {
                              return i(e);
                            }),
                          ),
                        ];
                    }
                  });
                });
              })(e.dataTransfer, e.type),
            ];
          if (l((r = e)) && l(r.target))
            return [
              2,
              c(e.target.files).map(function (e) {
                return i(e);
              }),
            ];
          return Array.isArray(e) &&
            e.every(function (e) {
              return "getFile" in e && "function" == typeof e.getFile;
            })
            ? [
                2,
                (function (e) {
                  return (0, n.W)(this, void 0, void 0, function () {
                    return (0, n.t)(this, function (t) {
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
                              return i(e);
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
  ((G.defaultProps = q),
    (G.propTypes = {
      children: r.default.func,
      accept: r.default.objectOf(r.default.arrayOf(r.default.string)),
      multiple: r.default.bool,
      preventDropOnDocument: r.default.bool,
      noClick: r.default.bool,
      noKeyboard: r.default.bool,
      noDrag: r.default.bool,
      noDragEventsBubbling: r.default.bool,
      minSize: r.default.number,
      maxSize: r.default.number,
      maxFiles: r.default.number,
      disabled: r.default.bool,
      getFilesFromEvent: r.default.func,
      onFileDialogCancel: r.default.func,
      onFileDialogOpen: r.default.func,
      useFsAccessApi: r.default.bool,
      autoFocus: r.default.bool,
      onDragEnter: r.default.func,
      onDragLeave: r.default.func,
      onDragOver: r.default.func,
      onDrop: r.default.func,
      onDropAccepted: r.default.func,
      onDropRejected: r.default.func,
      onError: r.default.func,
      validator: r.default.func,
    }));
  var V = {
    isFocused: !1,
    isFileDialogActive: !1,
    isDragActive: !1,
    isDragAccept: !1,
    isDragReject: !1,
    acceptedFiles: [],
    fileRejections: [],
  };
  function X() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
      r = K(K({}, q), e),
      n = r.accept,
      a = r.disabled,
      i = r.getFilesFromEvent,
      o = r.maxSize,
      l = r.minSize,
      s = r.multiple,
      c = r.maxFiles,
      u = r.onDragEnter,
      m = r.onDragLeave,
      d = r.onDragOver,
      f = r.onDrop,
      p = r.onDropAccepted,
      y = r.onDropRejected,
      v = r.onFileDialogCancel,
      w = r.onFileDialogOpen,
      _ = r.useFsAccessApi,
      j = r.autoFocus,
      k = r.preventDropOnDocument,
      P = r.noClick,
      z = r.noKeyboard,
      H = r.noDrag,
      G = r.noDragEventsBubbling,
      X = r.onError,
      Z = r.validator,
      Q = (0, t.useMemo)(
        function () {
          return S(n)
            ? Object.entries(n)
                .reduce(function (e, t) {
                  var r = g(t, 2),
                    n = r[0],
                    a = r[1];
                  return [].concat(h(e), [n], h(a));
                }, [])
                .filter(function (e) {
                  return T(e) || F(e);
                })
                .join(",")
            : void 0;
        },
        [n],
      ),
      ee = (0, t.useMemo)(
        function () {
          return S(n)
            ? [
                {
                  description: "Files",
                  accept: Object.entries(n)
                    .filter(function (e) {
                      var t = g(e, 2),
                        r = t[0],
                        n = t[1],
                        a = !0;
                      return (
                        T(r) ||
                          (console.warn(
                            'Skipped "'.concat(
                              r,
                              '" because it is not a valid MIME type. Check https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types for a list of valid MIME types.',
                            ),
                          ),
                          (a = !1)),
                        (Array.isArray(n) && n.every(F)) ||
                          (console.warn(
                            'Skipped "'.concat(
                              r,
                              '" because an invalid file extension was provided.',
                            ),
                          ),
                          (a = !1)),
                        a
                      );
                    })
                    .reduce(function (e, t) {
                      var r = g(t, 2),
                        n = r[0],
                        a = r[1];
                      return x(x({}, e), {}, b({}, n, a));
                    }, {}),
                },
              ]
            : n;
        },
        [n],
      ),
      et = (0, t.useMemo)(
        function () {
          return "function" == typeof w ? w : J;
        },
        [w],
      ),
      er = (0, t.useMemo)(
        function () {
          return "function" == typeof v ? v : J;
        },
        [v],
      ),
      en = (0, t.useRef)(null),
      ea = (0, t.useRef)(null),
      ei = L((0, t.useReducer)(Y, V), 2),
      eo = ei[0],
      el = ei[1],
      es = eo.isFocused,
      ec = eo.isFileDialogActive,
      eu = (0, t.useRef)(
        "u" > typeof window &&
          window.isSecureContext &&
          _ &&
          "showOpenFilePicker" in window,
      ),
      em = function () {
        !eu.current &&
          ec &&
          setTimeout(function () {
            ea.current &&
              (ea.current.files.length || (el({ type: "closeDialog" }), er()));
          }, 300);
      };
    (0, t.useEffect)(
      function () {
        return (
          window.addEventListener("focus", em, !1),
          function () {
            window.removeEventListener("focus", em, !1);
          }
        );
      },
      [ea, ec, er, eu],
    );
    var ed = (0, t.useRef)([]),
      ef = function (e) {
        (en.current && en.current.contains(e.target)) ||
          (e.preventDefault(), (ed.current = []));
      };
    ((0, t.useEffect)(
      function () {
        return (
          k &&
            (document.addEventListener("dragover", O, !1),
            document.addEventListener("drop", ef, !1)),
          function () {
            k &&
              (document.removeEventListener("dragover", O),
              document.removeEventListener("drop", ef));
          }
        );
      },
      [en, k],
    ),
      (0, t.useEffect)(
        function () {
          return (!a && j && en.current && en.current.focus(), function () {});
        },
        [en, j, a],
      ));
    var ep = (0, t.useCallback)(
        function (e) {
          X ? X(e) : console.error(e);
        },
        [X],
      ),
      eh = (0, t.useCallback)(
        function (e) {
          var t;
          (e.preventDefault(),
            e.persist(),
            eS(e),
            (ed.current = [].concat(
              (function (e) {
                if (Array.isArray(e)) return $(e);
              })((t = ed.current)) ||
                (function (e) {
                  if (
                    ("u" > typeof Symbol && null != e[Symbol.iterator]) ||
                    null != e["@@iterator"]
                  )
                    return Array.from(e);
                })(t) ||
                B(t) ||
                (function () {
                  throw TypeError(
                    "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
                  );
                })(),
              [e.target],
            )),
            C(e) &&
              Promise.resolve(i(e))
                .then(function (t) {
                  if (!D(e) || G) {
                    var r,
                      n,
                      a,
                      i,
                      m,
                      d,
                      f,
                      p,
                      h = t.length,
                      y =
                        h > 0 &&
                        ((n = (r = {
                          files: t,
                          accept: Q,
                          minSize: l,
                          maxSize: o,
                          multiple: s,
                          maxFiles: c,
                          validator: Z,
                        }).files),
                        (a = r.accept),
                        (i = r.minSize),
                        (m = r.maxSize),
                        (d = r.multiple),
                        (f = r.maxFiles),
                        (p = r.validator),
                        (!!d || !(n.length > 1)) &&
                          (!d || !(f >= 1) || !(n.length > f)) &&
                          n.every(function (e) {
                            var t = g(E(e, a), 1)[0],
                              r = g(A(e, i, m), 1)[0],
                              n = p ? p(e) : null;
                            return t && r && !n;
                          }));
                    (el({
                      isDragAccept: y,
                      isDragReject: h > 0 && !y,
                      isDragActive: !0,
                      type: "setDraggedFiles",
                    }),
                      u && u(e));
                  }
                })
                .catch(function (e) {
                  return ep(e);
                }));
        },
        [i, u, ep, G, Q, l, o, s, c, Z],
      ),
      ey = (0, t.useCallback)(
        function (e) {
          (e.preventDefault(), e.persist(), eS(e));
          var t = C(e);
          if (t && e.dataTransfer)
            try {
              e.dataTransfer.dropEffect = "copy";
            } catch (e) {}
          return (t && d && d(e), !1);
        },
        [d, G],
      ),
      ex = (0, t.useCallback)(
        function (e) {
          (e.preventDefault(), e.persist(), eS(e));
          var t = ed.current.filter(function (e) {
              return en.current && en.current.contains(e);
            }),
            r = t.indexOf(e.target);
          (-1 !== r && t.splice(r, 1),
            (ed.current = t),
            !(t.length > 0) &&
              (el({
                type: "setDraggedFiles",
                isDragActive: !1,
                isDragAccept: !1,
                isDragReject: !1,
              }),
              C(e) && m && m(e)));
        },
        [en, m, G],
      ),
      eb = (0, t.useCallback)(
        function (e, t) {
          var r = [],
            n = [];
          (e.forEach(function (e) {
            var t = L(E(e, Q), 2),
              a = t[0],
              i = t[1],
              s = L(A(e, l, o), 2),
              c = s[0],
              u = s[1],
              m = Z ? Z(e) : null;
            if (a && c && !m) r.push(e);
            else {
              var d = [i, u];
              (m && (d = d.concat(m)),
                n.push({
                  file: e,
                  errors: d.filter(function (e) {
                    return e;
                  }),
                }));
            }
          }),
            ((!s && r.length > 1) || (s && c >= 1 && r.length > c)) &&
              (r.forEach(function (e) {
                n.push({ file: e, errors: [N] });
              }),
              r.splice(0)),
            el({ acceptedFiles: r, fileRejections: n, type: "setFiles" }),
            f && f(r, n, t),
            n.length > 0 && y && y(n, t),
            r.length > 0 && p && p(r, t));
        },
        [el, s, Q, l, o, c, f, p, y, Z],
      ),
      eg = (0, t.useCallback)(
        function (e) {
          (e.preventDefault(),
            e.persist(),
            eS(e),
            (ed.current = []),
            C(e) &&
              Promise.resolve(i(e))
                .then(function (t) {
                  (!D(e) || G) && eb(t, e);
                })
                .catch(function (e) {
                  return ep(e);
                }),
            el({ type: "reset" }));
        },
        [i, eb, ep, G],
      ),
      ev = (0, t.useCallback)(
        function () {
          if (eu.current) {
            (el({ type: "openDialog" }),
              et(),
              window
                .showOpenFilePicker({ multiple: s, types: ee })
                .then(function (e) {
                  return i(e);
                })
                .then(function (e) {
                  (eb(e, null), el({ type: "closeDialog" }));
                })
                .catch(function (e) {
                  e instanceof DOMException &&
                  ("AbortError" === e.name || e.code === e.ABORT_ERR)
                    ? (er(e), el({ type: "closeDialog" }))
                    : e instanceof DOMException &&
                        ("SecurityError" === e.name ||
                          e.code === e.SECURITY_ERR)
                      ? ((eu.current = !1),
                        ea.current
                          ? ((ea.current.value = null), ea.current.click())
                          : ep(
                              Error(
                                "Cannot open the file picker because the https://developer.mozilla.org/en-US/docs/Web/API/File_System_Access_API is not supported and no <input> was provided.",
                              ),
                            ))
                      : ep(e);
                }));
            return;
          }
          ea.current &&
            (el({ type: "openDialog" }),
            et(),
            (ea.current.value = null),
            ea.current.click());
        },
        [el, et, er, _, eb, ep, ee, s],
      ),
      ew = (0, t.useCallback)(
        function (e) {
          en.current &&
            en.current.isEqualNode(e.target) &&
            (" " === e.key ||
              "Enter" === e.key ||
              32 === e.keyCode ||
              13 === e.keyCode) &&
            (e.preventDefault(), ev());
        },
        [en, ev],
      ),
      e_ = (0, t.useCallback)(function () {
        el({ type: "focus" });
      }, []),
      ej = (0, t.useCallback)(function () {
        el({ type: "blur" });
      }, []),
      ek = (0, t.useCallback)(
        function () {
          P ||
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
              ? setTimeout(ev, 0)
              : ev());
        },
        [P, ev],
      ),
      eN = function (e) {
        return a ? null : e;
      },
      eE = function (e) {
        return z ? null : eN(e);
      },
      eA = function (e) {
        return H ? null : eN(e);
      },
      eS = function (e) {
        G && e.stopPropagation();
      },
      eD = (0, t.useMemo)(
        function () {
          return function () {
            var e =
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : {},
              t = e.refKey,
              r = e.role,
              n = e.onKeyDown,
              i = e.onFocus,
              o = e.onBlur,
              l = e.onClick,
              s = e.onDragEnter,
              c = e.onDragOver,
              u = e.onDragLeave,
              m = e.onDrop,
              d = W(e, R);
            return K(
              K(
                U(
                  {
                    onKeyDown: eE(M(n, ew)),
                    onFocus: eE(M(i, e_)),
                    onBlur: eE(M(o, ej)),
                    onClick: eN(M(l, ek)),
                    onDragEnter: eA(M(s, eh)),
                    onDragOver: eA(M(c, ey)),
                    onDragLeave: eA(M(u, ex)),
                    onDrop: eA(M(m, eg)),
                    role: "string" == typeof r && "" !== r ? r : "presentation",
                  },
                  void 0 === t ? "ref" : t,
                  en,
                ),
                a || z ? {} : { tabIndex: 0 },
              ),
              d,
            );
          };
        },
        [en, ew, e_, ej, ek, eh, ey, ex, eg, z, H, a],
      ),
      eC = (0, t.useCallback)(function (e) {
        e.stopPropagation();
      }, []),
      eO = (0, t.useMemo)(
        function () {
          return function () {
            var e =
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : {},
              t = e.refKey,
              r = e.onChange,
              n = e.onClick,
              a = W(e, I);
            return K(
              K(
                {},
                U(
                  {
                    accept: Q,
                    multiple: s,
                    type: "file",
                    style: { display: "none" },
                    onChange: eN(M(r, eg)),
                    onClick: eN(M(n, eC)),
                    tabIndex: -1,
                  },
                  void 0 === t ? "ref" : t,
                  ea,
                ),
              ),
              a,
            );
          };
        },
        [ea, n, s, eg, a],
      );
    return K(
      K({}, eo),
      {},
      {
        isFocused: es && !a,
        getRootProps: eD,
        getInputProps: eO,
        rootRef: en,
        inputRef: ea,
        open: eN(ev),
      },
    );
  }
  function Y(e, t) {
    switch (t.type) {
      case "focus":
        return K(K({}, e), {}, { isFocused: !0 });
      case "blur":
        return K(K({}, e), {}, { isFocused: !1 });
      case "openDialog":
        return K(K({}, V), {}, { isFileDialogActive: !0 });
      case "closeDialog":
        return K(K({}, e), {}, { isFileDialogActive: !1 });
      case "setDraggedFiles":
        return K(
          K({}, e),
          {},
          {
            isDragActive: t.isDragActive,
            isDragAccept: t.isDragAccept,
            isDragReject: t.isDragReject,
          },
        );
      case "setFiles":
        return K(
          K({}, e),
          {},
          { acceptedFiles: t.acceptedFiles, fileRejections: t.fileRejections },
        );
      case "reset":
        return K({}, V);
      default:
        return e;
    }
  }
  function J() {}
  e.s(["U", 0, G, "B", 0, X], 179236);
};
