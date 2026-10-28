// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(352386),
    r = e.i(304153),
    n = e.i(824627),
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
    var r = (function (e) {
      var t = e.name;
      if (t && -1 !== t.lastIndexOf(".") && !e.type) {
        var r = t.split(".").pop().toLowerCase(),
          n = i.get(r);
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
  var a = [".DS_Store", "Thumbs.db"];
  function l(e) {
    return "object" == typeof e && null !== e;
  }
  function c(e) {
    return e.filter(function (e) {
      return -1 === a.indexOf(e.name);
    });
  }
  function s(e) {
    if (null === e) return [];
    for (var t = [], r = 0; r < e.length; r++) {
      var n = e[r];
      t.push(n);
    }
    return t;
  }
  function u(e) {
    if ("function" != typeof e.webkitGetAsEntry) return f(e);
    var t = e.webkitGetAsEntry();
    return t && t.isDirectory ? p(t) : f(e);
  }
  function f(e) {
    var t = e.getAsFile();
    return t
      ? Promise.resolve(o(t))
      : Promise.reject("".concat(e, " is not a File"));
  }
  function d(e) {
    return (0, n.W)(this, void 0, void 0, function () {
      return (0, n.t)(this, function (t) {
        return [
          2,
          e.isDirectory
            ? p(e)
            : (function (e) {
                return (0, n.W)(this, void 0, void 0, function () {
                  return (0, n.t)(this, function (t) {
                    return [
                      2,
                      new Promise(function (t, r) {
                        e.file(
                          function (r) {
                            t(o(r, e.fullPath));
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
  function p(e) {
    var t = e.createReader();
    return new Promise(function (e, r) {
      var i = [];
      !(function o() {
        var a = this;
        t.readEntries(
          function (t) {
            return (0, n.W)(a, void 0, void 0, function () {
              var a;
              return (0, n.t)(this, function (n) {
                switch (n.label) {
                  case 0:
                    if (t.length) return [3, 5];
                    n.label = 1;
                  case 1:
                    return (n.trys.push([1, 3, , 4]), [4, Promise.all(i)]);
                  case 2:
                    return (e(n.sent()), [3, 4]);
                  case 3:
                    return (r(n.sent()), [3, 4]);
                  case 4:
                    return [3, 6];
                  case 5:
                    ((a = Promise.all(t.map(d))),
                      i.push(a),
                      o(),
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
  var m = e.i(775592);
  function b(e) {
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
      x(e) ||
      (function () {
        throw TypeError(
          "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
        );
      })()
    );
  }
  function g(e, t) {
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
  function v(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = null != arguments[t] ? arguments[t] : {};
      t % 2
        ? g(Object(r), !0).forEach(function (t) {
            y(e, t, r[t]);
          })
        : Object.getOwnPropertyDescriptors
          ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
          : g(Object(r)).forEach(function (t) {
              Object.defineProperty(
                e,
                t,
                Object.getOwnPropertyDescriptor(r, t),
              );
            });
    }
    return e;
  }
  function y(e, t, r) {
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
  function h(e, t) {
    return (
      (function (e) {
        if (Array.isArray(e)) return e;
      })(e) ||
      (function (e, t) {
        var r,
          n,
          i =
            null == e
              ? null
              : ("u" > typeof Symbol && e[Symbol.iterator]) || e["@@iterator"];
        if (null != i) {
          var o = [],
            a = !0,
            l = !1;
          try {
            for (
              i = i.call(e);
              !(a = (r = i.next()).done) &&
              (o.push(r.value), !t || o.length !== t);
              a = !0
            );
          } catch (e) {
            ((l = !0), (n = e));
          } finally {
            try {
              a || null == i.return || i.return();
            } finally {
              if (l) throw n;
            }
          }
          return o;
        }
      })(e, t) ||
      x(e, t) ||
      (function () {
        throw TypeError(
          "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
        );
      })()
    );
  }
  function x(e, t) {
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
    k = function (e) {
      return {
        code: "file-too-small",
        message: "File is smaller than "
          .concat(e, " ")
          .concat(1 === e ? "byte" : "bytes"),
      };
    },
    O = { code: "too-many-files", message: "Too many files" };
  function A(e, t) {
    var r = "application/x-moz-file" === e.type || (0, m.default)(e, t);
    return [r, r ? null : j(t)];
  }
  function S(e, t, r) {
    if (E(e.size)) {
      if (E(t) && E(r)) {
        if (e.size > r) return [!1, D(r)];
        if (e.size < t) return [!1, k(t)];
      } else if (E(t) && e.size < t) return [!1, k(t)];
      else if (E(r) && e.size > r) return [!1, D(r)];
    }
    return [!0, null];
  }
  function E(e) {
    return null != e;
  }
  function F(e) {
    return "function" == typeof e.isPropagationStopped
      ? e.isPropagationStopped()
      : void 0 !== e.cancelBubble && e.cancelBubble;
  }
  function _(e) {
    return e.dataTransfer
      ? Array.prototype.some.call(e.dataTransfer.types, function (e) {
          return "Files" === e || "application/x-moz-file" === e;
        })
      : !!e.target && !!e.target.files;
  }
  function C(e) {
    e.preventDefault();
  }
  function P() {
    for (var e = arguments.length, t = Array(e), r = 0; r < e; r++)
      t[r] = arguments[r];
    return function (e) {
      for (
        var r = arguments.length, n = Array(r > 1 ? r - 1 : 0), i = 1;
        i < r;
        i++
      )
        n[i - 1] = arguments[i];
      return t.some(function (t) {
        return (!F(e) && t && t.apply(void 0, [e].concat(n)), F(e));
      });
    };
  }
  function z(e) {
    return (
      "audio/*" === e ||
      "video/*" === e ||
      "image/*" === e ||
      "text/*" === e ||
      /\w+\/[-+.\w]+/g.test(e)
    );
  }
  function R(e) {
    return /^.*\.[\w]+$/.test(e);
  }
  var N = ["children"],
    T = ["open"],
    M = [
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
          i =
            null == e
              ? null
              : ("u" > typeof Symbol && e[Symbol.iterator]) || e["@@iterator"];
        if (null != i) {
          var o = [],
            a = !0,
            l = !1;
          try {
            for (
              i = i.call(e);
              !(a = (r = i.next()).done) &&
              (o.push(r.value), !t || o.length !== t);
              a = !0
            );
          } catch (e) {
            ((l = !0), (n = e));
          } finally {
            try {
              a || null == i.return || i.return();
            } finally {
              if (l) throw n;
            }
          }
          return o;
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
      if ("string" == typeof e) return K(e, t);
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
        return K(e, t);
    }
  }
  function K(e, t) {
    (null == t || t > e.length) && (t = e.length);
    for (var r = 0, n = Array(t); r < t; r++) n[r] = e[r];
    return n;
  }
  function U(e, t) {
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
  function $(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = null != arguments[t] ? arguments[t] : {};
      t % 2
        ? U(Object(r), !0).forEach(function (t) {
            W(e, t, r[t]);
          })
        : Object.getOwnPropertyDescriptors
          ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
          : U(Object(r)).forEach(function (t) {
              Object.defineProperty(
                e,
                t,
                Object.getOwnPropertyDescriptor(r, t),
              );
            });
    }
    return e;
  }
  function W(e, t, r) {
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
  function q(e, t) {
    if (null == e) return {};
    var r,
      n,
      i = (function (e, t) {
        if (null == e) return {};
        var r,
          n,
          i = {},
          o = Object.keys(e);
        for (n = 0; n < o.length; n++)
          ((r = o[n]), t.indexOf(r) >= 0 || (i[r] = e[r]));
        return i;
      })(e, t);
    if (Object.getOwnPropertySymbols) {
      var o = Object.getOwnPropertySymbols(e);
      for (n = 0; n < o.length; n++)
        ((r = o[n]),
          !(t.indexOf(r) >= 0) &&
            Object.prototype.propertyIsEnumerable.call(e, r) &&
            (i[r] = e[r]));
    }
    return i;
  }
  var Y = (0, t.forwardRef)(function (e, r) {
    var n = e.children,
      i = J(q(e, N)),
      o = i.open,
      a = q(i, T);
    return (
      (0, t.useImperativeHandle)(
        r,
        function () {
          return { open: o };
        },
        [o],
      ),
      t.default.createElement(t.Fragment, null, n($($({}, a), {}, { open: o })))
    );
  });
  Y.displayName = "Dropzone";
  var G = {
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
                  return (0, n.t)(this, function (i) {
                    switch (i.label) {
                      case 0:
                        if (!e.items) return [3, 2];
                        if (
                          ((r = s(e.items).filter(function (e) {
                            return "file" === e.kind;
                          })),
                          "drop" !== t)
                        )
                          return [2, r];
                        return [4, Promise.all(r.map(u))];
                      case 1:
                        return [
                          2,
                          c(
                            (function e(t) {
                              return t.reduce(function (t, r) {
                                return (0, n.p)(
                                  (0, n.p)([], (0, n.J)(t), !1),
                                  (0, n.J)(Array.isArray(r) ? e(r) : [r]),
                                  !1,
                                );
                              }, []);
                            })(i.sent()),
                          ),
                        ];
                      case 2:
                        return [
                          2,
                          c(
                            s(e.files).map(function (e) {
                              return o(e);
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
              s(e.target.files).map(function (e) {
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
  ((Y.defaultProps = G),
    (Y.propTypes = {
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
      r = $($({}, G), e),
      n = r.accept,
      i = r.disabled,
      o = r.getFilesFromEvent,
      a = r.maxSize,
      l = r.minSize,
      c = r.multiple,
      s = r.maxFiles,
      u = r.onDragEnter,
      f = r.onDragLeave,
      d = r.onDragOver,
      p = r.onDrop,
      m = r.onDropAccepted,
      g = r.onDropRejected,
      x = r.onFileDialogCancel,
      w = r.onFileDialogOpen,
      j = r.useFsAccessApi,
      D = r.autoFocus,
      k = r.preventDropOnDocument,
      N = r.noClick,
      T = r.noKeyboard,
      U = r.noDrag,
      Y = r.noDragEventsBubbling,
      J = r.onError,
      X = r.validator,
      Z = (0, t.useMemo)(
        function () {
          return E(n)
            ? Object.entries(n)
                .reduce(function (e, t) {
                  var r = h(t, 2),
                    n = r[0],
                    i = r[1];
                  return [].concat(b(e), [n], b(i));
                }, [])
                .filter(function (e) {
                  return z(e) || R(e);
                })
                .join(",")
            : void 0;
        },
        [n],
      ),
      ee = (0, t.useMemo)(
        function () {
          return E(n)
            ? [
                {
                  description: "Files",
                  accept: Object.entries(n)
                    .filter(function (e) {
                      var t = h(e, 2),
                        r = t[0],
                        n = t[1],
                        i = !0;
                      return (
                        z(r) ||
                          (console.warn(
                            'Skipped "'.concat(
                              r,
                              '" because it is not a valid MIME type. Check https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types for a list of valid MIME types.',
                            ),
                          ),
                          (i = !1)),
                        (Array.isArray(n) && n.every(R)) ||
                          (console.warn(
                            'Skipped "'.concat(
                              r,
                              '" because an invalid file extension was provided.',
                            ),
                          ),
                          (i = !1)),
                        i
                      );
                    })
                    .reduce(function (e, t) {
                      var r = h(t, 2),
                        n = r[0],
                        i = r[1];
                      return v(v({}, e), {}, y({}, n, i));
                    }, {}),
                },
              ]
            : n;
        },
        [n],
      ),
      et = (0, t.useMemo)(
        function () {
          return "function" == typeof w ? w : V;
        },
        [w],
      ),
      er = (0, t.useMemo)(
        function () {
          return "function" == typeof x ? x : V;
        },
        [x],
      ),
      en = (0, t.useRef)(null),
      ei = (0, t.useRef)(null),
      eo = L((0, t.useReducer)(Q, H), 2),
      ea = eo[0],
      el = eo[1],
      ec = ea.isFocused,
      es = ea.isFileDialogActive,
      eu = (0, t.useRef)(
        "u" > typeof window &&
          window.isSecureContext &&
          j &&
          "showOpenFilePicker" in window,
      ),
      ef = function () {
        !eu.current &&
          es &&
          setTimeout(function () {
            ei.current &&
              (ei.current.files.length || (el({ type: "closeDialog" }), er()));
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
      [ei, es, er, eu],
    );
    var ed = (0, t.useRef)([]),
      ep = function (e) {
        (en.current && en.current.contains(e.target)) ||
          (e.preventDefault(), (ed.current = []));
      };
    ((0, t.useEffect)(
      function () {
        return (
          k &&
            (document.addEventListener("dragover", C, !1),
            document.addEventListener("drop", ep, !1)),
          function () {
            k &&
              (document.removeEventListener("dragover", C),
              document.removeEventListener("drop", ep));
          }
        );
      },
      [en, k],
    ),
      (0, t.useEffect)(
        function () {
          return (!i && D && en.current && en.current.focus(), function () {});
        },
        [en, D, i],
      ));
    var em = (0, t.useCallback)(
        function (e) {
          J ? J(e) : console.error(e);
        },
        [J],
      ),
      eb = (0, t.useCallback)(
        function (e) {
          var t;
          (e.preventDefault(),
            e.persist(),
            eE(e),
            (ed.current = [].concat(
              (function (e) {
                if (Array.isArray(e)) return K(e);
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
            _(e) &&
              Promise.resolve(o(e))
                .then(function (t) {
                  if (!F(e) || Y) {
                    var r,
                      n,
                      i,
                      o,
                      f,
                      d,
                      p,
                      m,
                      b = t.length,
                      g =
                        b > 0 &&
                        ((n = (r = {
                          files: t,
                          accept: Z,
                          minSize: l,
                          maxSize: a,
                          multiple: c,
                          maxFiles: s,
                          validator: X,
                        }).files),
                        (i = r.accept),
                        (o = r.minSize),
                        (f = r.maxSize),
                        (d = r.multiple),
                        (p = r.maxFiles),
                        (m = r.validator),
                        (!!d || !(n.length > 1)) &&
                          (!d || !(p >= 1) || !(n.length > p)) &&
                          n.every(function (e) {
                            var t = h(A(e, i), 1)[0],
                              r = h(S(e, o, f), 1)[0],
                              n = m ? m(e) : null;
                            return t && r && !n;
                          }));
                    (el({
                      isDragAccept: g,
                      isDragReject: b > 0 && !g,
                      isDragActive: !0,
                      type: "setDraggedFiles",
                    }),
                      u && u(e));
                  }
                })
                .catch(function (e) {
                  return em(e);
                }));
        },
        [o, u, em, Y, Z, l, a, c, s, X],
      ),
      eg = (0, t.useCallback)(
        function (e) {
          (e.preventDefault(), e.persist(), eE(e));
          var t = _(e);
          if (t && e.dataTransfer)
            try {
              e.dataTransfer.dropEffect = "copy";
            } catch (e) {}
          return (t && d && d(e), !1);
        },
        [d, Y],
      ),
      ev = (0, t.useCallback)(
        function (e) {
          (e.preventDefault(), e.persist(), eE(e));
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
              _(e) && f && f(e)));
        },
        [en, f, Y],
      ),
      ey = (0, t.useCallback)(
        function (e, t) {
          var r = [],
            n = [];
          (e.forEach(function (e) {
            var t = L(A(e, Z), 2),
              i = t[0],
              o = t[1],
              c = L(S(e, l, a), 2),
              s = c[0],
              u = c[1],
              f = X ? X(e) : null;
            if (i && s && !f) r.push(e);
            else {
              var d = [o, u];
              (f && (d = d.concat(f)),
                n.push({
                  file: e,
                  errors: d.filter(function (e) {
                    return e;
                  }),
                }));
            }
          }),
            ((!c && r.length > 1) || (c && s >= 1 && r.length > s)) &&
              (r.forEach(function (e) {
                n.push({ file: e, errors: [O] });
              }),
              r.splice(0)),
            el({ acceptedFiles: r, fileRejections: n, type: "setFiles" }),
            p && p(r, n, t),
            n.length > 0 && g && g(n, t),
            r.length > 0 && m && m(r, t));
        },
        [el, c, Z, l, a, s, p, m, g, X],
      ),
      eh = (0, t.useCallback)(
        function (e) {
          (e.preventDefault(),
            e.persist(),
            eE(e),
            (ed.current = []),
            _(e) &&
              Promise.resolve(o(e))
                .then(function (t) {
                  (!F(e) || Y) && ey(t, e);
                })
                .catch(function (e) {
                  return em(e);
                }),
            el({ type: "reset" }));
        },
        [o, ey, em, Y],
      ),
      ex = (0, t.useCallback)(
        function () {
          if (eu.current) {
            (el({ type: "openDialog" }),
              et(),
              window
                .showOpenFilePicker({ multiple: c, types: ee })
                .then(function (e) {
                  return o(e);
                })
                .then(function (e) {
                  (ey(e, null), el({ type: "closeDialog" }));
                })
                .catch(function (e) {
                  e instanceof DOMException &&
                  ("AbortError" === e.name || e.code === e.ABORT_ERR)
                    ? (er(e), el({ type: "closeDialog" }))
                    : e instanceof DOMException &&
                        ("SecurityError" === e.name ||
                          e.code === e.SECURITY_ERR)
                      ? ((eu.current = !1),
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
            (el({ type: "openDialog" }),
            et(),
            (ei.current.value = null),
            ei.current.click());
        },
        [el, et, er, j, ey, em, ee, c],
      ),
      ew = (0, t.useCallback)(
        function (e) {
          en.current &&
            en.current.isEqualNode(e.target) &&
            (" " === e.key ||
              "Enter" === e.key ||
              32 === e.keyCode ||
              13 === e.keyCode) &&
            (e.preventDefault(), ex());
        },
        [en, ex],
      ),
      ej = (0, t.useCallback)(function () {
        el({ type: "focus" });
      }, []),
      eD = (0, t.useCallback)(function () {
        el({ type: "blur" });
      }, []),
      ek = (0, t.useCallback)(
        function () {
          N ||
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
              ? setTimeout(ex, 0)
              : ex());
        },
        [N, ex],
      ),
      eO = function (e) {
        return i ? null : e;
      },
      eA = function (e) {
        return T ? null : eO(e);
      },
      eS = function (e) {
        return U ? null : eO(e);
      },
      eE = function (e) {
        Y && e.stopPropagation();
      },
      eF = (0, t.useMemo)(
        function () {
          return function () {
            var e =
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : {},
              t = e.refKey,
              r = e.role,
              n = e.onKeyDown,
              o = e.onFocus,
              a = e.onBlur,
              l = e.onClick,
              c = e.onDragEnter,
              s = e.onDragOver,
              u = e.onDragLeave,
              f = e.onDrop,
              d = q(e, M);
            return $(
              $(
                W(
                  {
                    onKeyDown: eA(P(n, ew)),
                    onFocus: eA(P(o, ej)),
                    onBlur: eA(P(a, eD)),
                    onClick: eO(P(l, ek)),
                    onDragEnter: eS(P(c, eb)),
                    onDragOver: eS(P(s, eg)),
                    onDragLeave: eS(P(u, ev)),
                    onDrop: eS(P(f, eh)),
                    role: "string" == typeof r && "" !== r ? r : "presentation",
                  },
                  void 0 === t ? "ref" : t,
                  en,
                ),
                i || T ? {} : { tabIndex: 0 },
              ),
              d,
            );
          };
        },
        [en, ew, ej, eD, ek, eb, eg, ev, eh, T, U, i],
      ),
      e_ = (0, t.useCallback)(function (e) {
        e.stopPropagation();
      }, []),
      eC = (0, t.useMemo)(
        function () {
          return function () {
            var e =
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : {},
              t = e.refKey,
              r = e.onChange,
              n = e.onClick,
              i = q(e, I);
            return $(
              $(
                {},
                W(
                  {
                    accept: Z,
                    multiple: c,
                    type: "file",
                    style: { display: "none" },
                    onChange: eO(P(r, eh)),
                    onClick: eO(P(n, e_)),
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
        [ei, n, c, eh, i],
      );
    return $(
      $({}, ea),
      {},
      {
        isFocused: ec && !i,
        getRootProps: eF,
        getInputProps: eC,
        rootRef: en,
        inputRef: ei,
        open: eO(ex),
      },
    );
  }
  function Q(e, t) {
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
  e.s(["U", 0, Y, "B", 0, J], 179236);
};
