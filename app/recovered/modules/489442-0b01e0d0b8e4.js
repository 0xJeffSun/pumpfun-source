// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
($, Y, J) => {
  var Q = $.i(753887),
    ee = $.i(149502),
    et = {
      9186: function ($, Y, J) {
        ((Y.bignum = J(5944)),
          (Y.define = J(5673).define),
          (Y.base = J(8747)),
          (Y.constants = J(8063)),
          (Y.decoders = J(2455)),
          (Y.encoders = J(5555)));
      },
      5673: function ($, Y, J) {
        var Q = J(9186),
          ee = J(1638);
        function et($, Y) {
          ((this.name = $),
            (this.body = Y),
            (this.decoders = {}),
            (this.encoders = {}));
        }
        ((Y.define = function ($, Y) {
          return new et($, Y);
        }),
          (et.prototype._createNamed = function ($) {
            var Y;
            try {
              Y = J(9154).runInThisContext(
                "(function " +
                  this.name +
                  "(entity) {\n  this._initNamed(entity);\n})",
              );
            } catch ($) {
              Y = function ($) {
                this._initNamed($);
              };
            }
            return (
              ee(Y, $),
              (Y.prototype._initNamed = function (Y) {
                $.call(this, Y);
              }),
              new Y(this)
            );
          }),
          (et.prototype._getDecoder = function ($) {
            return (
              ($ = $ || "der"),
              this.decoders.hasOwnProperty($) ||
                (this.decoders[$] = this._createNamed(Q.decoders[$])),
              this.decoders[$]
            );
          }),
          (et.prototype.decode = function ($, Y, J) {
            return this._getDecoder(Y).decode($, J);
          }),
          (et.prototype._getEncoder = function ($) {
            return (
              ($ = $ || "der"),
              this.encoders.hasOwnProperty($) ||
                (this.encoders[$] = this._createNamed(Q.encoders[$])),
              this.encoders[$]
            );
          }),
          (et.prototype.encode = function ($, Y, J) {
            return this._getEncoder(Y).encode($, J);
          }));
      },
      5781: function ($, Y, J) {
        var Q = J(1638),
          ee = J(8747).Reporter,
          et = J(181).Buffer;
        function er($, Y) {
          (ee.call(this, Y), et.isBuffer($))
            ? ((this.base = $), (this.offset = 0), (this.length = $.length))
            : this.error("Input not Buffer");
        }
        function ei($, Y) {
          if (Array.isArray($))
            ((this.length = 0),
              (this.value = $.map(function ($) {
                return (
                  $ instanceof ei || ($ = new ei($, Y)),
                  (this.length += $.length),
                  $
                );
              }, this)));
          else if ("number" == typeof $) {
            if (!(0 <= $ && $ <= 255))
              return Y.error("non-byte EncoderBuffer value");
            ((this.value = $), (this.length = 1));
          } else if ("string" == typeof $)
            ((this.value = $), (this.length = et.byteLength($)));
          else {
            if (!et.isBuffer($))
              return Y.error("Unsupported type: " + typeof $);
            ((this.value = $), (this.length = $.length));
          }
        }
        (Q(er, ee),
          (Y.t = er),
          (er.prototype.save = function () {
            return {
              offset: this.offset,
              reporter: ee.prototype.save.call(this),
            };
          }),
          (er.prototype.restore = function ($) {
            var Y = new er(this.base);
            return (
              (Y.offset = $.offset),
              (Y.length = this.offset),
              (this.offset = $.offset),
              ee.prototype.restore.call(this, $.reporter),
              Y
            );
          }),
          (er.prototype.isEmpty = function () {
            return this.offset === this.length;
          }),
          (er.prototype.readUInt8 = function ($) {
            return this.offset + 1 <= this.length
              ? this.base.readUInt8(this.offset++, !0)
              : this.error($ || "DecoderBuffer overrun");
          }),
          (er.prototype.skip = function ($, Y) {
            if (!(this.offset + $ <= this.length))
              return this.error(Y || "DecoderBuffer overrun");
            var J = new er(this.base);
            return (
              (J._reporterState = this._reporterState),
              (J.offset = this.offset),
              (J.length = this.offset + $),
              (this.offset += $),
              J
            );
          }),
          (er.prototype.raw = function ($) {
            return this.base.slice($ ? $.offset : this.offset, this.length);
          }),
          (Y.d = ei),
          (ei.prototype.join = function ($, Y) {
            return (
              $ || ($ = new et(this.length)),
              Y || (Y = 0),
              0 === this.length ||
                (Array.isArray(this.value)
                  ? this.value.forEach(function (J) {
                      (J.join($, Y), (Y += J.length));
                    })
                  : ("number" == typeof this.value
                      ? ($[Y] = this.value)
                      : "string" == typeof this.value
                        ? $.write(this.value, Y)
                        : et.isBuffer(this.value) && this.value.copy($, Y),
                    (Y += this.length))),
              $
            );
          }));
      },
      8747: function ($, Y, J) {
        ((Y.Reporter = J(9257).a),
          (Y.DecoderBuffer = J(5781).t),
          (Y.EncoderBuffer = J(5781).d),
          (Y.Node = J(763)));
      },
      763: function ($, Y, J) {
        var Q = J(8747).Reporter,
          ee = J(8747).EncoderBuffer,
          et = J(8747).DecoderBuffer,
          er = J(7551),
          ei = [
            "seq",
            "seqof",
            "set",
            "setof",
            "objid",
            "bool",
            "gentime",
            "utctime",
            "null_",
            "enum",
            "int",
            "objDesc",
            "bitstr",
            "bmpstr",
            "charstr",
            "genstr",
            "graphstr",
            "ia5str",
            "iso646str",
            "numstr",
            "octstr",
            "printstr",
            "t61str",
            "unistr",
            "utf8str",
            "videostr",
          ],
          en = [
            "key",
            "obj",
            "use",
            "optional",
            "explicit",
            "implicit",
            "def",
            "choice",
            "any",
            "contains",
          ].concat(ei);
        function ea($, Y) {
          var J = {};
          ((this._baseState = J),
            (J.enc = $),
            (J.parent = Y || null),
            (J.children = null),
            (J.tag = null),
            (J.args = null),
            (J.reverseArgs = null),
            (J.choice = null),
            (J.optional = !1),
            (J.any = !1),
            (J.obj = !1),
            (J.use = null),
            (J.useDecoder = null),
            (J.key = null),
            (J.default = null),
            (J.explicit = null),
            (J.implicit = null),
            (J.contains = null),
            J.parent || ((J.children = []), this._wrap()));
        }
        $.exports = ea;
        var ef = [
          "enc",
          "parent",
          "children",
          "tag",
          "args",
          "reverseArgs",
          "choice",
          "optional",
          "any",
          "obj",
          "use",
          "alteredUse",
          "key",
          "default",
          "explicit",
          "implicit",
          "contains",
        ];
        ((ea.prototype.clone = function () {
          var $ = this._baseState,
            Y = {};
          ef.forEach(function (J) {
            Y[J] = $[J];
          });
          var J = new this.constructor(Y.parent);
          return ((J._baseState = Y), J);
        }),
          (ea.prototype._wrap = function () {
            var $ = this._baseState;
            en.forEach(function (Y) {
              this[Y] = function () {
                var J = new this.constructor(this);
                return ($.children.push(J), J[Y].apply(J, arguments));
              };
            }, this);
          }),
          (ea.prototype._init = function ($) {
            var Y = this._baseState;
            (er(null === Y.parent),
              $.call(this),
              (Y.children = Y.children.filter(function ($) {
                return $._baseState.parent === this;
              }, this)),
              er.equal(
                Y.children.length,
                1,
                "Root node can have only one child",
              ));
          }),
          (ea.prototype._useArgs = function ($) {
            var Y = this._baseState,
              J = $.filter(function ($) {
                return $ instanceof this.constructor;
              }, this);
            (($ = $.filter(function ($) {
              return !($ instanceof this.constructor);
            }, this)),
              0 !== J.length &&
                (er(null === Y.children),
                (Y.children = J),
                J.forEach(function ($) {
                  $._baseState.parent = this;
                }, this)),
              0 !== $.length &&
                (er(null === Y.args),
                (Y.args = $),
                (Y.reverseArgs = $.map(function ($) {
                  if ("object" != typeof $ || $.constructor !== Object)
                    return $;
                  var Y = {};
                  return (
                    Object.keys($).forEach(function (J) {
                      (J == (0 | J) && (J |= 0), (Y[$[J]] = J));
                    }),
                    Y
                  );
                }))));
          }),
          [
            "_peekTag",
            "_decodeTag",
            "_use",
            "_decodeStr",
            "_decodeObjid",
            "_decodeTime",
            "_decodeNull",
            "_decodeInt",
            "_decodeBool",
            "_decodeList",
            "_encodeComposite",
            "_encodeStr",
            "_encodeObjid",
            "_encodeTime",
            "_encodeNull",
            "_encodeInt",
            "_encodeBool",
          ].forEach(function ($) {
            ea.prototype[$] = function () {
              throw Error(
                $ + " not implemented for encoding: " + this._baseState.enc,
              );
            };
          }),
          ei.forEach(function ($) {
            ea.prototype[$] = function () {
              var Y = this._baseState,
                J = Array.prototype.slice.call(arguments);
              return (er(null === Y.tag), (Y.tag = $), this._useArgs(J), this);
            };
          }),
          (ea.prototype.use = function ($) {
            er($);
            var Y = this._baseState;
            return (er(null === Y.use), (Y.use = $), this);
          }),
          (ea.prototype.optional = function () {
            return ((this._baseState.optional = !0), this);
          }),
          (ea.prototype.def = function ($) {
            var Y = this._baseState;
            return (
              er(null === Y.default),
              (Y.default = $),
              (Y.optional = !0),
              this
            );
          }),
          (ea.prototype.explicit = function ($) {
            var Y = this._baseState;
            return (
              er(null === Y.explicit && null === Y.implicit),
              (Y.explicit = $),
              this
            );
          }),
          (ea.prototype.implicit = function ($) {
            var Y = this._baseState;
            return (
              er(null === Y.explicit && null === Y.implicit),
              (Y.implicit = $),
              this
            );
          }),
          (ea.prototype.obj = function () {
            var $ = this._baseState,
              Y = Array.prototype.slice.call(arguments);
            return (($.obj = !0), 0 !== Y.length && this._useArgs(Y), this);
          }),
          (ea.prototype.key = function ($) {
            var Y = this._baseState;
            return (er(null === Y.key), (Y.key = $), this);
          }),
          (ea.prototype.any = function () {
            return ((this._baseState.any = !0), this);
          }),
          (ea.prototype.choice = function ($) {
            var Y = this._baseState;
            return (
              er(null === Y.choice),
              (Y.choice = $),
              this._useArgs(
                Object.keys($).map(function (Y) {
                  return $[Y];
                }),
              ),
              this
            );
          }),
          (ea.prototype.contains = function ($) {
            var Y = this._baseState;
            return (er(null === Y.use), (Y.contains = $), this);
          }),
          (ea.prototype._decode = function ($, Y) {
            var J,
              Q = this._baseState;
            if (null === Q.parent)
              return $.wrapResult(Q.children[0]._decode($, Y));
            var ee = Q.default,
              er = !0,
              ei = null;
            if ((null !== Q.key && (ei = $.enterKey(Q.key)), Q.optional)) {
              var en = null;
              if (
                (null !== Q.explicit
                  ? (en = Q.explicit)
                  : null !== Q.implicit
                    ? (en = Q.implicit)
                    : null !== Q.tag && (en = Q.tag),
                null !== en || Q.any)
              ) {
                if (((er = this._peekTag($, en, Q.any)), $.isError(er)))
                  return er;
              } else {
                var ea = $.save();
                try {
                  (null === Q.choice
                    ? this._decodeGeneric(Q.tag, $, Y)
                    : this._decodeChoice($, Y),
                    (er = !0));
                } catch ($) {
                  er = !1;
                }
                $.restore(ea);
              }
            }
            if ((Q.obj && er && (J = $.enterObject()), er)) {
              if (null !== Q.explicit) {
                var ef = this._decodeTag($, Q.explicit);
                if ($.isError(ef)) return ef;
                $ = ef;
              }
              var eo = $.offset;
              if (null === Q.use && null === Q.choice) {
                if (Q.any) var ea = $.save();
                var es = this._decodeTag(
                  $,
                  null !== Q.implicit ? Q.implicit : Q.tag,
                  Q.any,
                );
                if ($.isError(es)) return es;
                Q.any ? (ee = $.raw(ea)) : ($ = es);
              }
              if (
                (Y &&
                  Y.track &&
                  null !== Q.tag &&
                  Y.track($.path(), eo, $.length, "tagged"),
                Y &&
                  Y.track &&
                  null !== Q.tag &&
                  Y.track($.path(), $.offset, $.length, "content"),
                Q.any ||
                  (ee =
                    null === Q.choice
                      ? this._decodeGeneric(Q.tag, $, Y)
                      : this._decodeChoice($, Y)),
                $.isError(ee))
              )
                return ee;
              if (
                (Q.any ||
                  null !== Q.choice ||
                  null === Q.children ||
                  Q.children.forEach(function (J) {
                    J._decode($, Y);
                  }),
                Q.contains && ("octstr" === Q.tag || "bitstr" === Q.tag))
              ) {
                var eh = new et(ee);
                ee = this._getUse(Q.contains, $._reporterState.obj)._decode(
                  eh,
                  Y,
                );
              }
            }
            return (
              Q.obj && er && (ee = $.leaveObject(J)),
              null !== Q.key && (null !== ee || !0 === er)
                ? $.leaveKey(ei, Q.key, ee)
                : null !== ei && $.exitKey(ei),
              ee
            );
          }),
          (ea.prototype._decodeGeneric = function ($, Y, J) {
            var Q = this._baseState;
            if ("seq" === $ || "set" === $) return null;
            if ("seqof" === $ || "setof" === $)
              return this._decodeList(Y, $, Q.args[0], J);
            if (/str$/.test($)) return this._decodeStr(Y, $, J);
            if ("objid" === $ && Q.args)
              return this._decodeObjid(Y, Q.args[0], Q.args[1], J);
            if ("objid" === $) return this._decodeObjid(Y, null, null, J);
            if ("gentime" === $ || "utctime" === $)
              return this._decodeTime(Y, $, J);
            else if ("null_" === $) return this._decodeNull(Y, J);
            else if ("bool" === $) return this._decodeBool(Y, J);
            else if ("objDesc" === $) return this._decodeStr(Y, $, J);
            else if ("int" === $ || "enum" === $)
              return this._decodeInt(Y, Q.args && Q.args[0], J);
            return null !== Q.use
              ? this._getUse(Q.use, Y._reporterState.obj)._decode(Y, J)
              : Y.error("unknown tag: " + $);
          }),
          (ea.prototype._getUse = function ($, Y) {
            var J = this._baseState;
            return (
              (J.useDecoder = this._use($, Y)),
              er(null === J.useDecoder._baseState.parent),
              (J.useDecoder = J.useDecoder._baseState.children[0]),
              J.implicit !== J.useDecoder._baseState.implicit &&
                ((J.useDecoder = J.useDecoder.clone()),
                (J.useDecoder._baseState.implicit = J.implicit)),
              J.useDecoder
            );
          }),
          (ea.prototype._decodeChoice = function ($, Y) {
            var J = this._baseState,
              Q = null,
              ee = !1;
            return (Object.keys(J.choice).some(function (et) {
              var er = $.save(),
                ei = J.choice[et];
              try {
                var en = ei._decode($, Y);
                if ($.isError(en)) return !1;
                ((Q = { type: et, value: en }), (ee = !0));
              } catch (Y) {
                return ($.restore(er), !1);
              }
              return !0;
            }, this),
            ee)
              ? Q
              : $.error("Choice not matched");
          }),
          (ea.prototype._createEncoderBuffer = function ($) {
            return new ee($, this.reporter);
          }),
          (ea.prototype._encode = function ($, Y, J) {
            var Q = this._baseState;
            if (null === Q.default || Q.default !== $) {
              var ee = this._encodeValue($, Y, J);
              if (void 0 !== ee && !this._skipDefault(ee, Y, J)) return ee;
            }
          }),
          (ea.prototype._encodeValue = function ($, Y, J) {
            var ee,
              et = this._baseState;
            if (null === et.parent)
              return et.children[0]._encode($, Y || new Q());
            var ee = null;
            if (((this.reporter = Y), et.optional && void 0 === $))
              if (null === et.default) return;
              else $ = et.default;
            var er = null,
              ei = !1;
            if (et.any) ee = this._createEncoderBuffer($);
            else if (et.choice) ee = this._encodeChoice($, Y);
            else if (et.contains)
              ((er = this._getUse(et.contains, J)._encode($, Y)), (ei = !0));
            else if (et.children)
              ((er = et.children
                .map(function (J) {
                  if ("null_" === J._baseState.tag)
                    return J._encode(null, Y, $);
                  if (null === J._baseState.key)
                    return Y.error("Child should have a key");
                  var Q = Y.enterKey(J._baseState.key);
                  if ("object" != typeof $)
                    return Y.error("Child expected, but input is not object");
                  var ee = J._encode($[J._baseState.key], Y, $);
                  return (Y.leaveKey(Q), ee);
                }, this)
                .filter(function ($) {
                  return $;
                })),
                (er = this._createEncoderBuffer(er)));
            else if ("seqof" === et.tag || "setof" === et.tag) {
              if (!(et.args && 1 === et.args.length))
                return Y.error("Too many args for : " + et.tag);
              if (!Array.isArray($))
                return Y.error("seqof/setof, but data is not Array");
              var en = this.clone();
              ((en._baseState.implicit = null),
                (er = this._createEncoderBuffer(
                  $.map(function (J) {
                    var Q = this._baseState;
                    return this._getUse(Q.args[0], $)._encode(J, Y);
                  }, en),
                )));
            } else
              null !== et.use
                ? (ee = this._getUse(et.use, J)._encode($, Y))
                : ((er = this._encodePrimitive(et.tag, $)), (ei = !0));
            if (!et.any && null === et.choice) {
              var ea = null !== et.implicit ? et.implicit : et.tag,
                ef = null === et.implicit ? "universal" : "context";
              null === ea
                ? null === et.use &&
                  Y.error("Tag could be omitted only for .use()")
                : null === et.use &&
                  (ee = this._encodeComposite(ea, ei, ef, er));
            }
            return (
              null !== et.explicit &&
                (ee = this._encodeComposite(et.explicit, !1, "context", ee)),
              ee
            );
          }),
          (ea.prototype._encodeChoice = function ($, Y) {
            var J = this._baseState,
              Q = J.choice[$.type];
            return (
              Q ||
                er(
                  !1,
                  $.type +
                    " not found in " +
                    JSON.stringify(Object.keys(J.choice)),
                ),
              Q._encode($.value, Y)
            );
          }),
          (ea.prototype._encodePrimitive = function ($, Y) {
            var J = this._baseState;
            if (/str$/.test($)) return this._encodeStr(Y, $);
            if ("objid" === $ && J.args)
              return this._encodeObjid(Y, J.reverseArgs[0], J.args[1]);
            if ("objid" === $) return this._encodeObjid(Y, null, null);
            if ("gentime" === $ || "utctime" === $)
              return this._encodeTime(Y, $);
            if ("null_" === $) return this._encodeNull();
            else if ("int" === $ || "enum" === $)
              return this._encodeInt(Y, J.args && J.reverseArgs[0]);
            else if ("bool" === $) return this._encodeBool(Y);
            else if ("objDesc" === $) return this._encodeStr(Y, $);
            else throw Error("Unsupported tag: " + $);
          }),
          (ea.prototype._isNumstr = function ($) {
            return /^[0-9 ]*$/.test($);
          }),
          (ea.prototype._isPrintstr = function ($) {
            return /^[A-Za-z0-9 '\(\)\+,\-\.\/:=\?]*$/.test($);
          }));
      },
      9257: function ($, Y, J) {
        var Q = J(1638);
        function ee($) {
          this._reporterState = {
            obj: null,
            path: [],
            options: $ || {},
            errors: [],
          };
        }
        function et($, Y) {
          ((this.path = $), this.rethrow(Y));
        }
        ((Y.a = ee),
          (ee.prototype.isError = function ($) {
            return $ instanceof et;
          }),
          (ee.prototype.save = function () {
            var $ = this._reporterState;
            return { obj: $.obj, pathLen: $.path.length };
          }),
          (ee.prototype.restore = function ($) {
            var Y = this._reporterState;
            ((Y.obj = $.obj), (Y.path = Y.path.slice(0, $.pathLen)));
          }),
          (ee.prototype.enterKey = function ($) {
            return this._reporterState.path.push($);
          }),
          (ee.prototype.exitKey = function ($) {
            var Y = this._reporterState;
            Y.path = Y.path.slice(0, $ - 1);
          }),
          (ee.prototype.leaveKey = function ($, Y, J) {
            var Q = this._reporterState;
            (this.exitKey($), null !== Q.obj && (Q.obj[Y] = J));
          }),
          (ee.prototype.path = function () {
            return this._reporterState.path.join("/");
          }),
          (ee.prototype.enterObject = function () {
            var $ = this._reporterState,
              Y = $.obj;
            return (($.obj = {}), Y);
          }),
          (ee.prototype.leaveObject = function ($) {
            var Y = this._reporterState,
              J = Y.obj;
            return ((Y.obj = $), J);
          }),
          (ee.prototype.error = function ($) {
            var Y,
              J = this._reporterState,
              Q = $ instanceof et;
            if (
              ((Y = Q
                ? $
                : new et(
                    J.path
                      .map(function ($) {
                        return "[" + JSON.stringify($) + "]";
                      })
                      .join(""),
                    $.message || $,
                    $.stack,
                  )),
              !J.options.partial)
            )
              throw Y;
            return (Q || J.errors.push(Y), Y);
          }),
          (ee.prototype.wrapResult = function ($) {
            var Y = this._reporterState;
            return Y.options.partial
              ? { result: this.isError($) ? null : $, errors: Y.errors }
              : $;
          }),
          Q(et, Error),
          (et.prototype.rethrow = function ($) {
            if (
              ((this.message = $ + " at: " + (this.path || "(shallow)")),
              Error.captureStackTrace && Error.captureStackTrace(this, et),
              !this.stack)
            )
              try {
                throw Error(this.message);
              } catch ($) {
                this.stack = $.stack;
              }
            return this;
          }));
      },
      8060: function ($, Y, J) {
        var Q = J(8063);
        ((Y.tagClass = {
          0: "universal",
          1: "application",
          2: "context",
          3: "private",
        }),
          (Y.tagClassByName = Q._reverse(Y.tagClass)),
          (Y.tag = {
            0: "end",
            1: "bool",
            2: "int",
            3: "bitstr",
            4: "octstr",
            5: "null_",
            6: "objid",
            7: "objDesc",
            8: "external",
            9: "real",
            10: "enum",
            11: "embed",
            12: "utf8str",
            13: "relativeOid",
            16: "seq",
            17: "set",
            18: "numstr",
            19: "printstr",
            20: "t61str",
            21: "videostr",
            22: "ia5str",
            23: "utctime",
            24: "gentime",
            25: "graphstr",
            26: "iso646str",
            27: "genstr",
            28: "unistr",
            29: "charstr",
            30: "bmpstr",
          }),
          (Y.tagByName = Q._reverse(Y.tag)));
      },
      8063: function ($, Y, J) {
        ((Y._reverse = function ($) {
          var Y = {};
          return (
            Object.keys($).forEach(function (J) {
              ((0 | J) == J && (J |= 0), (Y[$[J]] = J));
            }),
            Y
          );
        }),
          (Y.der = J(8060)));
      },
      8788: function ($, Y, J) {
        var Q = J(1638),
          ee = J(9186),
          et = ee.base,
          er = ee.bignum,
          ei = ee.constants.der;
        function en($) {
          ((this.enc = "der"),
            (this.name = $.name),
            (this.entity = $),
            (this.tree = new ea()),
            this.tree._init($.body));
        }
        function ea($) {
          et.Node.call(this, "der", $);
        }
        function ef($, Y) {
          var J = $.readUInt8(Y);
          if ($.isError(J)) return J;
          var Q = ei.tagClass[J >> 6],
            ee = (32 & J) == 0;
          if ((31 & J) == 31) {
            var et = J;
            for (J = 0; (128 & et) == 128; ) {
              if (((et = $.readUInt8(Y)), $.isError(et))) return et;
              ((J <<= 7), (J |= 127 & et));
            }
          } else J &= 31;
          var er = ei.tag[J];
          return { cls: Q, primitive: ee, tag: J, tagStr: er };
        }
        function eo($, Y, J) {
          var Q = $.readUInt8(J);
          if ($.isError(Q)) return Q;
          if (!Y && 128 === Q) return null;
          if ((128 & Q) == 0) return Q;
          var ee = 127 & Q;
          if (ee > 4) return $.error("length octect is too long");
          Q = 0;
          for (var et = 0; et < ee; et++) {
            Q <<= 8;
            var er = $.readUInt8(J);
            if ($.isError(er)) return er;
            Q |= er;
          }
          return Q;
        }
        (($.exports = en),
          (en.prototype.decode = function ($, Y) {
            return (
              $ instanceof et.DecoderBuffer || ($ = new et.DecoderBuffer($, Y)),
              this.tree._decode($, Y)
            );
          }),
          Q(ea, et.Node),
          (ea.prototype._peekTag = function ($, Y, J) {
            if ($.isEmpty()) return !1;
            var Q = $.save(),
              ee = ef($, 'Failed to peek tag: "' + Y + '"');
            return $.isError(ee)
              ? ee
              : ($.restore(Q),
                ee.tag === Y || ee.tagStr === Y || ee.tagStr + "of" === Y || J);
          }),
          (ea.prototype._decodeTag = function ($, Y, J) {
            var Q = ef($, 'Failed to decode tag of "' + Y + '"');
            if ($.isError(Q)) return Q;
            var ee = eo($, Q.primitive, 'Failed to get length of "' + Y + '"');
            if ($.isError(ee)) return ee;
            if (!J && Q.tag !== Y && Q.tagStr !== Y && Q.tagStr + "of" !== Y)
              return $.error('Failed to match tag: "' + Y + '"');
            if (Q.primitive || null !== ee)
              return $.skip(ee, 'Failed to match body of: "' + Y + '"');
            var et = $.save(),
              er = this._skipUntilEnd(
                $,
                'Failed to skip indefinite length body: "' + this.tag + '"',
              );
            return $.isError(er)
              ? er
              : ((ee = $.offset - et.offset),
                $.restore(et),
                $.skip(ee, 'Failed to match body of: "' + Y + '"'));
          }),
          (ea.prototype._skipUntilEnd = function ($, Y) {
            for (;;) {
              var J,
                Q = ef($, Y);
              if ($.isError(Q)) return Q;
              var ee = eo($, Q.primitive, Y);
              if ($.isError(ee)) return ee;
              if (
                ((J =
                  Q.primitive || null !== ee
                    ? $.skip(ee)
                    : this._skipUntilEnd($, Y)),
                $.isError(J))
              )
                return J;
              if ("end" === Q.tagStr) break;
            }
          }),
          (ea.prototype._decodeList = function ($, Y, J, Q) {
            for (var ee = []; !$.isEmpty(); ) {
              var et = this._peekTag($, "end");
              if ($.isError(et)) return et;
              var er = J.decode($, "der", Q);
              if ($.isError(er) && et) break;
              ee.push(er);
            }
            return ee;
          }),
          (ea.prototype._decodeStr = function ($, Y) {
            if ("bitstr" === Y) {
              var J = $.readUInt8();
              return $.isError(J) ? J : { unused: J, data: $.raw() };
            }
            if ("bmpstr" === Y) {
              var Q = $.raw();
              if (Q.length % 2 == 1)
                return $.error(
                  "Decoding of string type: bmpstr length mismatch",
                );
              for (var ee = "", et = 0; et < Q.length / 2; et++)
                ee += String.fromCharCode(Q.readUInt16BE(2 * et));
              return ee;
            }
            if ("numstr" === Y) {
              var er = $.raw().toString("ascii");
              return this._isNumstr(er)
                ? er
                : $.error(
                    "Decoding of string type: numstr unsupported characters",
                  );
            }
            if ("octstr" === Y) return $.raw();
            if ("objDesc" === Y) return $.raw();
            else if ("printstr" === Y) {
              var ei = $.raw().toString("ascii");
              return this._isPrintstr(ei)
                ? ei
                : $.error(
                    "Decoding of string type: printstr unsupported characters",
                  );
            } else if (/str$/.test(Y)) return $.raw().toString();
            else
              return $.error("Decoding of string type: " + Y + " unsupported");
          }),
          (ea.prototype._decodeObjid = function ($, Y, J) {
            for (var Q, ee = [], et = 0; !$.isEmpty(); ) {
              var er = $.readUInt8();
              ((et <<= 7),
                (et |= 127 & er),
                (128 & er) == 0 && (ee.push(et), (et = 0)));
            }
            128 & er && ee.push(et);
            var ei = (ee[0] / 40) | 0,
              en = ee[0] % 40;
            if (((Q = J ? ee : [ei, en].concat(ee.slice(1))), Y)) {
              var ea = Y[Q.join(" ")];
              (void 0 === ea && (ea = Y[Q.join(".")]),
                void 0 !== ea && (Q = ea));
            }
            return Q;
          }),
          (ea.prototype._decodeTime = function ($, Y) {
            var J = $.raw().toString();
            if ("gentime" === Y)
              var Q = 0 | J.slice(0, 4),
                ee = 0 | J.slice(4, 6),
                et = 0 | J.slice(6, 8),
                er = 0 | J.slice(8, 10),
                ei = 0 | J.slice(10, 12),
                en = 0 | J.slice(12, 14);
            else {
              if ("utctime" !== Y)
                return $.error("Decoding " + Y + " time is not supported yet");
              var Q = 0 | J.slice(0, 2),
                ee = 0 | J.slice(2, 4),
                et = 0 | J.slice(4, 6),
                er = 0 | J.slice(6, 8),
                ei = 0 | J.slice(8, 10),
                en = 0 | J.slice(10, 12);
              Q = Q < 70 ? 2e3 + Q : 1900 + Q;
            }
            return Date.UTC(Q, ee - 1, et, er, ei, en, 0);
          }),
          (ea.prototype._decodeNull = function ($) {
            return null;
          }),
          (ea.prototype._decodeBool = function ($) {
            var Y = $.readUInt8();
            return $.isError(Y) ? Y : 0 !== Y;
          }),
          (ea.prototype._decodeInt = function ($, Y) {
            var J = new er($.raw());
            return (Y && (J = Y[J.toString(10)] || J), J);
          }),
          (ea.prototype._use = function ($, Y) {
            return (
              "function" == typeof $ && ($ = $(Y)),
              $._getDecoder("der").tree
            );
          }));
      },
      2455: function ($, Y, J) {
        ((Y.der = J(8788)), (Y.pem = J(3093)));
      },
      3093: function ($, Y, J) {
        var Q = J(1638),
          ee = J(181).Buffer,
          et = J(8788);
        function er($) {
          (et.call(this, $), (this.enc = "pem"));
        }
        (Q(er, et),
          ($.exports = er),
          (er.prototype.decode = function ($, Y) {
            for (
              var J = $.toString().split(/[\r\n]+/g),
                Q = Y.label.toUpperCase(),
                er = /^-----(BEGIN|END) ([^-]+)-----$/,
                ei = -1,
                en = -1,
                ea = 0;
              ea < J.length;
              ea++
            ) {
              var ef = J[ea].match(er);
              if (null !== ef && ef[2] === Q)
                if (-1 === ei) {
                  if ("BEGIN" !== ef[1]) break;
                  ei = ea;
                } else {
                  if ("END" !== ef[1]) break;
                  en = ea;
                  break;
                }
            }
            if (-1 === ei || -1 === en)
              throw Error("PEM section not found for: " + Q);
            var eo = J.slice(ei + 1, en).join("");
            eo.replace(/[^a-z0-9\+\/=]+/gi, "");
            var es = new ee(eo, "base64");
            return et.prototype.decode.call(this, es, Y);
          }));
      },
      5640: function ($, Y, J) {
        var Q = J(1638),
          ee = J(181).Buffer,
          et = J(9186),
          er = et.base,
          ei = et.constants.der;
        function en($) {
          ((this.enc = "der"),
            (this.name = $.name),
            (this.entity = $),
            (this.tree = new ea()),
            this.tree._init($.body));
        }
        function ea($) {
          er.Node.call(this, "der", $);
        }
        function ef($) {
          return $ < 10 ? "0" + $ : $;
        }
        (($.exports = en),
          (en.prototype.encode = function ($, Y) {
            return this.tree._encode($, Y).join();
          }),
          Q(ea, er.Node),
          (ea.prototype._encodeComposite = function ($, Y, J, Q) {
            var et = (function ($, Y, J, Q) {
              var ee;
              if (
                ("seqof" === $ ? ($ = "seq") : "setof" === $ && ($ = "set"),
                ei.tagByName.hasOwnProperty($))
              )
                ee = ei.tagByName[$];
              else {
                if ("number" != typeof $ || (0 | $) !== $)
                  return Q.error("Unknown tag: " + $);
                ee = $;
              }
              return ee >= 31
                ? Q.error("Multi-octet tag encoding unsupported")
                : (Y || (ee |= 32),
                  (ee |= ei.tagClassByName[J || "universal"] << 6));
            })($, Y, J, this.reporter);
            if (Q.length < 128) {
              var er = new ee(2);
              return (
                (er[0] = et),
                (er[1] = Q.length),
                this._createEncoderBuffer([er, Q])
              );
            }
            for (var en = 1, ea = Q.length; ea >= 256; ea >>= 8) en++;
            var er = new ee(2 + en);
            ((er[0] = et), (er[1] = 128 | en));
            for (var ea = 1 + en, ef = Q.length; ef > 0; ea--, ef >>= 8)
              er[ea] = 255 & ef;
            return this._createEncoderBuffer([er, Q]);
          }),
          (ea.prototype._encodeStr = function ($, Y) {
            if ("bitstr" === Y)
              return this._createEncoderBuffer([0 | $.unused, $.data]);
            if ("bmpstr" === Y) {
              for (var J = new ee(2 * $.length), Q = 0; Q < $.length; Q++)
                J.writeUInt16BE($.charCodeAt(Q), 2 * Q);
              return this._createEncoderBuffer(J);
            }
            if ("numstr" === Y)
              return this._isNumstr($)
                ? this._createEncoderBuffer($)
                : this.reporter.error(
                    "Encoding of string type: numstr supports only digits and space",
                  );
            if ("printstr" === Y)
              return this._isPrintstr($)
                ? this._createEncoderBuffer($)
                : this.reporter.error(
                    "Encoding of string type: printstr supports only latin upper and lower case letters, digits, space, apostrophe, left and rigth parenthesis, plus sign, comma, hyphen, dot, slash, colon, equal sign, question mark",
                  );
            if (/str$/.test(Y)) return this._createEncoderBuffer($);
            else if ("objDesc" === Y) return this._createEncoderBuffer($);
            else
              return this.reporter.error(
                "Encoding of string type: " + Y + " unsupported",
              );
          }),
          (ea.prototype._encodeObjid = function ($, Y, J) {
            if ("string" == typeof $) {
              if (!Y)
                return this.reporter.error(
                  "string objid given, but no values map found",
                );
              if (!Y.hasOwnProperty($))
                return this.reporter.error("objid not found in values map");
              $ = Y[$].split(/[\s\.]+/g);
              for (var Q = 0; Q < $.length; Q++) $[Q] |= 0;
            } else if (Array.isArray($)) {
              $ = $.slice();
              for (var Q = 0; Q < $.length; Q++) $[Q] |= 0;
            }
            if (!Array.isArray($))
              return this.reporter.error(
                "objid() should be either array or string, got: " +
                  JSON.stringify($),
              );
            if (!J) {
              if ($[1] >= 40)
                return this.reporter.error("Second objid identifier OOB");
              $.splice(0, 2, 40 * $[0] + $[1]);
            }
            for (var et = 0, Q = 0; Q < $.length; Q++) {
              var er = $[Q];
              for (et++; er >= 128; er >>= 7) et++;
            }
            for (
              var ei = new ee(et), en = ei.length - 1, Q = $.length - 1;
              Q >= 0;
              Q--
            ) {
              var er = $[Q];
              for (ei[en--] = 127 & er; (er >>= 7) > 0; )
                ei[en--] = 128 | (127 & er);
            }
            return this._createEncoderBuffer(ei);
          }),
          (ea.prototype._encodeTime = function ($, Y) {
            var J,
              Q = new Date($);
            return (
              "gentime" === Y
                ? (J = [
                    ef(Q.getFullYear()),
                    ef(Q.getUTCMonth() + 1),
                    ef(Q.getUTCDate()),
                    ef(Q.getUTCHours()),
                    ef(Q.getUTCMinutes()),
                    ef(Q.getUTCSeconds()),
                    "Z",
                  ].join(""))
                : "utctime" === Y
                  ? (J = [
                      ef(Q.getFullYear() % 100),
                      ef(Q.getUTCMonth() + 1),
                      ef(Q.getUTCDate()),
                      ef(Q.getUTCHours()),
                      ef(Q.getUTCMinutes()),
                      ef(Q.getUTCSeconds()),
                      "Z",
                    ].join(""))
                  : this.reporter.error(
                      "Encoding " + Y + " time is not supported yet",
                    ),
              this._encodeStr(J, "octstr")
            );
          }),
          (ea.prototype._encodeNull = function () {
            return this._createEncoderBuffer("");
          }),
          (ea.prototype._encodeInt = function ($, Y) {
            if ("string" == typeof $) {
              if (!Y)
                return this.reporter.error(
                  "String int or enum given, but no values map",
                );
              if (!Y.hasOwnProperty($))
                return this.reporter.error(
                  "Values map doesn't contain: " + JSON.stringify($),
                );
              $ = Y[$];
            }
            if ("number" != typeof $ && !ee.isBuffer($)) {
              var J = $.toArray();
              (!$.sign && 128 & J[0] && J.unshift(0), ($ = new ee(J)));
            }
            if (ee.isBuffer($)) {
              var Q = $.length;
              0 === $.length && Q++;
              var et = new ee(Q);
              return (
                $.copy(et),
                0 === $.length && (et[0] = 0),
                this._createEncoderBuffer(et)
              );
            }
            if ($ < 128) return this._createEncoderBuffer($);
            if ($ < 256) return this._createEncoderBuffer([0, $]);
            for (var Q = 1, er = $; er >= 256; er >>= 8) Q++;
            for (var et = Array(Q), er = et.length - 1; er >= 0; er--)
              ((et[er] = 255 & $), ($ >>= 8));
            return (
              128 & et[0] && et.unshift(0),
              this._createEncoderBuffer(new ee(et))
            );
          }),
          (ea.prototype._encodeBool = function ($) {
            return this._createEncoderBuffer(255 * !!$);
          }),
          (ea.prototype._use = function ($, Y) {
            return (
              "function" == typeof $ && ($ = $(Y)),
              $._getEncoder("der").tree
            );
          }),
          (ea.prototype._skipDefault = function ($, Y, J) {
            var Q,
              ee = this._baseState;
            if (null === ee.default) return !1;
            var et = $.join();
            if (
              (void 0 === ee.defaultBuffer &&
                (ee.defaultBuffer = this._encodeValue(ee.default, Y, J).join()),
              et.length !== ee.defaultBuffer.length)
            )
              return !1;
            for (Q = 0; Q < et.length; Q++)
              if (et[Q] !== ee.defaultBuffer[Q]) return !1;
            return !0;
          }));
      },
      5555: function ($, Y, J) {
        ((Y.der = J(5640)), (Y.pem = J(969)));
      },
      969: function ($, Y, J) {
        var Q = J(1638),
          ee = J(5640);
        function et($) {
          (ee.call(this, $), (this.enc = "pem"));
        }
        (Q(et, ee),
          ($.exports = et),
          (et.prototype.encode = function ($, Y) {
            for (
              var J = ee.prototype.encode.call(this, $).toString("base64"),
                Q = ["-----BEGIN " + Y.label + "-----"],
                et = 0;
              et < J.length;
              et += 64
            )
              Q.push(J.slice(et, et + 64));
            return (Q.push("-----END " + Y.label + "-----"), Q.join("\n"));
          }));
      },
      5944: function ($, Y, J) {
        !(function ($, Y) {
          "use strict";
          function Q($, Y) {
            if (!$) throw Error(Y || "Assertion failed");
          }
          function ee($, Y) {
            $.super_ = Y;
            var J = function () {};
            ((J.prototype = Y.prototype),
              ($.prototype = new J()),
              ($.prototype.constructor = $));
          }
          function et($, Y, J) {
            if (et.isBN($)) return $;
            ((this.negative = 0),
              (this.words = null),
              (this.length = 0),
              (this.red = null),
              null !== $ &&
                (("le" === Y || "be" === Y) && ((J = Y), (Y = 10)),
                this._init($ || 0, Y || 10, J || "be")));
          }
          ("object" == typeof $ ? ($.exports = et) : (Y.BN = et),
            (et.BN = et),
            (et.wordSize = 26));
          try {
            en = J(181).Buffer;
          } catch ($) {}
          function er($, Y, J) {
            for (var Q = 0, ee = Math.min($.length, J), et = Y; et < ee; et++) {
              var er = $.charCodeAt(et) - 48;
              ((Q <<= 4),
                er >= 49 && er <= 54
                  ? (Q |= er - 49 + 10)
                  : er >= 17 && er <= 22
                    ? (Q |= er - 17 + 10)
                    : (Q |= 15 & er));
            }
            return Q;
          }
          function ei($, Y, J, Q) {
            for (
              var ee = 0, et = Math.min($.length, J), er = Y;
              er < et;
              er++
            ) {
              var ei = $.charCodeAt(er) - 48;
              ((ee *= Q),
                ei >= 49
                  ? (ee += ei - 49 + 10)
                  : ei >= 17
                    ? (ee += ei - 17 + 10)
                    : (ee += ei));
            }
            return ee;
          }
          ((et.isBN = function ($) {
            return (
              $ instanceof et ||
              (null !== $ &&
                "object" == typeof $ &&
                $.constructor.wordSize === et.wordSize &&
                Array.isArray($.words))
            );
          }),
            (et.max = function ($, Y) {
              return $.cmp(Y) > 0 ? $ : Y;
            }),
            (et.min = function ($, Y) {
              return 0 > $.cmp(Y) ? $ : Y;
            }),
            (et.prototype._init = function ($, Y, J) {
              if ("number" == typeof $) return this._initNumber($, Y, J);
              if ("object" == typeof $) return this._initArray($, Y, J);
              ("hex" === Y && (Y = 16), Q(Y === (0 | Y) && Y >= 2 && Y <= 36));
              var ee = 0;
              ("-" === ($ = $.toString().replace(/\s+/g, ""))[0] && ee++,
                16 === Y ? this._parseHex($, ee) : this._parseBase($, Y, ee),
                "-" === $[0] && (this.negative = 1),
                this.strip(),
                "le" === J && this._initArray(this.toArray(), Y, J));
            }),
            (et.prototype._initNumber = function ($, Y, J) {
              ($ < 0 && ((this.negative = 1), ($ = -$)),
                $ < 0x4000000
                  ? ((this.words = [0x3ffffff & $]), (this.length = 1))
                  : $ < 0x10000000000000
                    ? ((this.words = [
                        0x3ffffff & $,
                        ($ / 0x4000000) & 0x3ffffff,
                      ]),
                      (this.length = 2))
                    : (Q($ < 0x20000000000000),
                      (this.words = [
                        0x3ffffff & $,
                        ($ / 0x4000000) & 0x3ffffff,
                        1,
                      ]),
                      (this.length = 3)),
                "le" === J && this._initArray(this.toArray(), Y, J));
            }),
            (et.prototype._initArray = function ($, Y, J) {
              if ((Q("number" == typeof $.length), $.length <= 0))
                return ((this.words = [0]), (this.length = 1), this);
              ((this.length = Math.ceil($.length / 3)),
                (this.words = Array(this.length)));
              for (var ee, et, er = 0; er < this.length; er++)
                this.words[er] = 0;
              var ei = 0;
              if ("be" === J)
                for (er = $.length - 1, ee = 0; er >= 0; er -= 3)
                  ((et = $[er] | ($[er - 1] << 8) | ($[er - 2] << 16)),
                    (this.words[ee] |= (et << ei) & 0x3ffffff),
                    (this.words[ee + 1] = (et >>> (26 - ei)) & 0x3ffffff),
                    (ei += 24) >= 26 && ((ei -= 26), ee++));
              else if ("le" === J)
                for (er = 0, ee = 0; er < $.length; er += 3)
                  ((et = $[er] | ($[er + 1] << 8) | ($[er + 2] << 16)),
                    (this.words[ee] |= (et << ei) & 0x3ffffff),
                    (this.words[ee + 1] = (et >>> (26 - ei)) & 0x3ffffff),
                    (ei += 24) >= 26 && ((ei -= 26), ee++));
              return this.strip();
            }),
            (et.prototype._parseHex = function ($, Y) {
              ((this.length = Math.ceil(($.length - Y) / 6)),
                (this.words = Array(this.length)));
              for (var J, Q, ee = 0; ee < this.length; ee++) this.words[ee] = 0;
              var et = 0;
              for (ee = $.length - 6, J = 0; ee >= Y; ee -= 6)
                ((Q = er($, ee, ee + 6)),
                  (this.words[J] |= (Q << et) & 0x3ffffff),
                  (this.words[J + 1] |= (Q >>> (26 - et)) & 4194303),
                  (et += 24) >= 26 && ((et -= 26), J++));
              (ee + 6 !== Y &&
                ((Q = er($, Y, ee + 6)),
                (this.words[J] |= (Q << et) & 0x3ffffff),
                (this.words[J + 1] |= (Q >>> (26 - et)) & 4194303)),
                this.strip());
            }),
            (et.prototype._parseBase = function ($, Y, J) {
              ((this.words = [0]), (this.length = 1));
              for (var Q = 0, ee = 1; ee <= 0x3ffffff; ee *= Y) Q++;
              (Q--, (ee = (ee / Y) | 0));
              for (
                var et = $.length - J,
                  er = et % Q,
                  en = Math.min(et, et - er) + J,
                  ea = 0,
                  ef = J;
                ef < en;
                ef += Q
              )
                ((ea = ei($, ef, ef + Q, Y)),
                  this.imuln(ee),
                  this.words[0] + ea < 0x4000000
                    ? (this.words[0] += ea)
                    : this._iaddn(ea));
              if (0 !== er) {
                var eo = 1;
                for (ea = ei($, ef, $.length, Y), ef = 0; ef < er; ef++)
                  eo *= Y;
                (this.imuln(eo),
                  this.words[0] + ea < 0x4000000
                    ? (this.words[0] += ea)
                    : this._iaddn(ea));
              }
            }),
            (et.prototype.copy = function ($) {
              $.words = Array(this.length);
              for (var Y = 0; Y < this.length; Y++) $.words[Y] = this.words[Y];
              (($.length = this.length),
                ($.negative = this.negative),
                ($.red = this.red));
            }),
            (et.prototype.clone = function () {
              var $ = new et(null);
              return (this.copy($), $);
            }),
            (et.prototype._expand = function ($) {
              for (; this.length < $; ) this.words[this.length++] = 0;
              return this;
            }),
            (et.prototype.strip = function () {
              for (; this.length > 1 && 0 === this.words[this.length - 1]; )
                this.length--;
              return this._normSign();
            }),
            (et.prototype._normSign = function () {
              return (
                1 === this.length && 0 === this.words[0] && (this.negative = 0),
                this
              );
            }),
            (et.prototype.inspect = function () {
              return (this.red ? "<BN-R: " : "<BN: ") + this.toString(16) + ">";
            }));
          var en,
            ea = [
              "",
              "0",
              "00",
              "000",
              "0000",
              "00000",
              "000000",
              "0000000",
              "00000000",
              "000000000",
              "0000000000",
              "00000000000",
              "000000000000",
              "0000000000000",
              "00000000000000",
              "000000000000000",
              "0000000000000000",
              "00000000000000000",
              "000000000000000000",
              "0000000000000000000",
              "00000000000000000000",
              "000000000000000000000",
              "0000000000000000000000",
              "00000000000000000000000",
              "000000000000000000000000",
              "0000000000000000000000000",
            ],
            ef = [
              0, 0, 25, 16, 12, 11, 10, 9, 8, 8, 7, 7, 7, 7, 6, 6, 6, 6, 6, 6,
              6, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5,
            ],
            eo = [
              0, 0, 0x2000000, 0x290d741, 0x1000000, 0x2e90edd, 0x39aa400,
              0x267bf47, 0x1000000, 0x290d741, 1e7, 0x12959c3, 0x222c000,
              0x3bd7765, 7529536, 0xadcea1, 0x1000000, 0x1704f61, 0x206fc40,
              0x2cddcf9, 64e6, 4084101, 5153632, 6436343, 7962624, 9765625,
              0xb54ba0, 0xdaf26b, 0x1069c00, 0x138f9ad, 243e5, 0x1b4d89f,
              0x2000000, 0x25528a1, 0x2b54a20, 0x3216b93, 0x39aa400,
            ];
          function es($, Y, J) {
            J.negative = Y.negative ^ $.negative;
            var Q = ($.length + Y.length) | 0;
            ((J.length = Q), (Q = (Q - 1) | 0));
            var ee = 0 | $.words[0],
              et = 0 | Y.words[0],
              er = ee * et,
              ei = 0x3ffffff & er,
              en = (er / 0x4000000) | 0;
            J.words[0] = ei;
            for (var ea = 1; ea < Q; ea++) {
              for (
                var ef = en >>> 26,
                  eo = 0x3ffffff & en,
                  es = Math.min(ea, Y.length - 1),
                  eh = Math.max(0, ea - $.length + 1);
                eh <= es;
                eh++
              ) {
                var ed = (ea - eh) | 0;
                ((ef +=
                  ((er = (ee = 0 | $.words[ed]) * (et = 0 | Y.words[eh]) + eo) /
                    0x4000000) |
                  0),
                  (eo = 0x3ffffff & er));
              }
              ((J.words[ea] = 0 | eo), (en = 0 | ef));
            }
            return (0 !== en ? (J.words[ea] = 0 | en) : J.length--, J.strip());
          }
          ((et.prototype.toString = function ($, Y) {
            if (((Y = 0 | Y || 1), 16 === ($ = $ || 10) || "hex" === $)) {
              for (var J = "", ee = 0, et = 0, er = 0; er < this.length; er++) {
                var ei = this.words[er],
                  en = (((ei << ee) | et) & 0xffffff).toString(16);
                ((J =
                  0 != (et = (ei >>> (24 - ee)) & 0xffffff) ||
                  er !== this.length - 1
                    ? ea[6 - en.length] + en + J
                    : en + J),
                  (ee += 2) >= 26 && ((ee -= 26), er--));
              }
              for (0 !== et && (J = et.toString(16) + J); J.length % Y != 0; )
                J = "0" + J;
              return (0 !== this.negative && (J = "-" + J), J);
            }
            if ($ === (0 | $) && $ >= 2 && $ <= 36) {
              var es = ef[$],
                eh = eo[$];
              J = "";
              var ed = this.clone();
              for (ed.negative = 0; !ed.isZero(); ) {
                var ec = ed.modn(eh).toString($);
                J = (ed = ed.idivn(eh)).isZero()
                  ? ec + J
                  : ea[es - ec.length] + ec + J;
              }
              for (this.isZero() && (J = "0" + J); J.length % Y != 0; )
                J = "0" + J;
              return (0 !== this.negative && (J = "-" + J), J);
            }
            Q(!1, "Base should be between 2 and 36");
          }),
            (et.prototype.toNumber = function () {
              var $ = this.words[0];
              return (
                2 === this.length
                  ? ($ += 0x4000000 * this.words[1])
                  : 3 === this.length && 1 === this.words[2]
                    ? ($ += 0x10000000000000 + 0x4000000 * this.words[1])
                    : this.length > 2 &&
                      Q(!1, "Number can only safely store up to 53 bits"),
                0 !== this.negative ? -$ : $
              );
            }),
            (et.prototype.toJSON = function () {
              return this.toString(16);
            }),
            (et.prototype.toBuffer = function ($, Y) {
              return (Q(void 0 !== en), this.toArrayLike(en, $, Y));
            }),
            (et.prototype.toArray = function ($, Y) {
              return this.toArrayLike(Array, $, Y);
            }),
            (et.prototype.toArrayLike = function ($, Y, J) {
              var ee,
                et,
                er = this.byteLength(),
                ei = J || Math.max(1, er);
              (Q(er <= ei, "byte array longer than desired length"),
                Q(ei > 0, "Requested array length <= 0"),
                this.strip());
              var en = new $(ei),
                ea = this.clone();
              if ("le" === Y) {
                for (et = 0; !ea.isZero(); et++)
                  ((ee = ea.andln(255)), ea.iushrn(8), (en[et] = ee));
                for (; et < ei; et++) en[et] = 0;
              } else {
                for (et = 0; et < ei - er; et++) en[et] = 0;
                for (et = 0; !ea.isZero(); et++)
                  ((ee = ea.andln(255)), ea.iushrn(8), (en[ei - et - 1] = ee));
              }
              return en;
            }),
            Math.clz32
              ? (et.prototype._countBits = function ($) {
                  return 32 - Math.clz32($);
                })
              : (et.prototype._countBits = function ($) {
                  var Y = $,
                    J = 0;
                  return (
                    Y >= 4096 && ((J += 13), (Y >>>= 13)),
                    Y >= 64 && ((J += 7), (Y >>>= 7)),
                    Y >= 8 && ((J += 4), (Y >>>= 4)),
                    Y >= 2 && ((J += 2), (Y >>>= 2)),
                    J + Y
                  );
                }),
            (et.prototype._zeroBits = function ($) {
              if (0 === $) return 26;
              var Y = $,
                J = 0;
              return (
                (8191 & Y) == 0 && ((J += 13), (Y >>>= 13)),
                (127 & Y) == 0 && ((J += 7), (Y >>>= 7)),
                (15 & Y) == 0 && ((J += 4), (Y >>>= 4)),
                (3 & Y) == 0 && ((J += 2), (Y >>>= 2)),
                (1 & Y) == 0 && J++,
                J
              );
            }),
            (et.prototype.bitLength = function () {
              var $ = this.words[this.length - 1],
                Y = this._countBits($);
              return (this.length - 1) * 26 + Y;
            }),
            (et.prototype.zeroBits = function () {
              if (this.isZero()) return 0;
              for (var $ = 0, Y = 0; Y < this.length; Y++) {
                var J = this._zeroBits(this.words[Y]);
                if ((($ += J), 26 !== J)) break;
              }
              return $;
            }),
            (et.prototype.byteLength = function () {
              return Math.ceil(this.bitLength() / 8);
            }),
            (et.prototype.toTwos = function ($) {
              return 0 !== this.negative
                ? this.abs().inotn($).iaddn(1)
                : this.clone();
            }),
            (et.prototype.fromTwos = function ($) {
              return this.testn($ - 1)
                ? this.notn($).iaddn(1).ineg()
                : this.clone();
            }),
            (et.prototype.isNeg = function () {
              return 0 !== this.negative;
            }),
            (et.prototype.neg = function () {
              return this.clone().ineg();
            }),
            (et.prototype.ineg = function () {
              return (this.isZero() || (this.negative ^= 1), this);
            }),
            (et.prototype.iuor = function ($) {
              for (; this.length < $.length; ) this.words[this.length++] = 0;
              for (var Y = 0; Y < $.length; Y++)
                this.words[Y] = this.words[Y] | $.words[Y];
              return this.strip();
            }),
            (et.prototype.ior = function ($) {
              return (Q((this.negative | $.negative) == 0), this.iuor($));
            }),
            (et.prototype.or = function ($) {
              return this.length > $.length
                ? this.clone().ior($)
                : $.clone().ior(this);
            }),
            (et.prototype.uor = function ($) {
              return this.length > $.length
                ? this.clone().iuor($)
                : $.clone().iuor(this);
            }),
            (et.prototype.iuand = function ($) {
              var Y;
              Y = this.length > $.length ? $ : this;
              for (var J = 0; J < Y.length; J++)
                this.words[J] = this.words[J] & $.words[J];
              return ((this.length = Y.length), this.strip());
            }),
            (et.prototype.iand = function ($) {
              return (Q((this.negative | $.negative) == 0), this.iuand($));
            }),
            (et.prototype.and = function ($) {
              return this.length > $.length
                ? this.clone().iand($)
                : $.clone().iand(this);
            }),
            (et.prototype.uand = function ($) {
              return this.length > $.length
                ? this.clone().iuand($)
                : $.clone().iuand(this);
            }),
            (et.prototype.iuxor = function ($) {
              this.length > $.length
                ? ((Y = this), (J = $))
                : ((Y = $), (J = this));
              for (var Y, J, Q = 0; Q < J.length; Q++)
                this.words[Q] = Y.words[Q] ^ J.words[Q];
              if (this !== Y)
                for (; Q < Y.length; Q++) this.words[Q] = Y.words[Q];
              return ((this.length = Y.length), this.strip());
            }),
            (et.prototype.ixor = function ($) {
              return (Q((this.negative | $.negative) == 0), this.iuxor($));
            }),
            (et.prototype.xor = function ($) {
              return this.length > $.length
                ? this.clone().ixor($)
                : $.clone().ixor(this);
            }),
            (et.prototype.uxor = function ($) {
              return this.length > $.length
                ? this.clone().iuxor($)
                : $.clone().iuxor(this);
            }),
            (et.prototype.inotn = function ($) {
              Q("number" == typeof $ && $ >= 0);
              var Y = 0 | Math.ceil($ / 26),
                J = $ % 26;
              (this._expand(Y), J > 0 && Y--);
              for (var ee = 0; ee < Y; ee++)
                this.words[ee] = 0x3ffffff & ~this.words[ee];
              return (
                J > 0 &&
                  (this.words[ee] = ~this.words[ee] & (0x3ffffff >> (26 - J))),
                this.strip()
              );
            }),
            (et.prototype.notn = function ($) {
              return this.clone().inotn($);
            }),
            (et.prototype.setn = function ($, Y) {
              Q("number" == typeof $ && $ >= 0);
              var J = ($ / 26) | 0,
                ee = $ % 26;
              return (
                this._expand(J + 1),
                Y
                  ? (this.words[J] = this.words[J] | (1 << ee))
                  : (this.words[J] = this.words[J] & ~(1 << ee)),
                this.strip()
              );
            }),
            (et.prototype.iadd = function ($) {
              if (0 !== this.negative && 0 === $.negative)
                return (
                  (this.negative = 0),
                  (Y = this.isub($)),
                  (this.negative ^= 1),
                  this._normSign()
                );
              if (0 === this.negative && 0 !== $.negative)
                return (
                  ($.negative = 0),
                  (Y = this.isub($)),
                  ($.negative = 1),
                  Y._normSign()
                );
              this.length > $.length
                ? ((J = this), (Q = $))
                : ((J = $), (Q = this));
              for (var Y, J, Q, ee = 0, et = 0; et < Q.length; et++)
                ((Y = (0 | J.words[et]) + (0 | Q.words[et]) + ee),
                  (this.words[et] = 0x3ffffff & Y),
                  (ee = Y >>> 26));
              for (; 0 !== ee && et < J.length; et++)
                ((Y = (0 | J.words[et]) + ee),
                  (this.words[et] = 0x3ffffff & Y),
                  (ee = Y >>> 26));
              if (((this.length = J.length), 0 !== ee))
                ((this.words[this.length] = ee), this.length++);
              else if (J !== this)
                for (; et < J.length; et++) this.words[et] = J.words[et];
              return this;
            }),
            (et.prototype.add = function ($) {
              var Y;
              return 0 !== $.negative && 0 === this.negative
                ? (($.negative = 0), (Y = this.sub($)), ($.negative ^= 1), Y)
                : 0 === $.negative && 0 !== this.negative
                  ? ((this.negative = 0),
                    (Y = $.sub(this)),
                    (this.negative = 1),
                    Y)
                  : this.length > $.length
                    ? this.clone().iadd($)
                    : $.clone().iadd(this);
            }),
            (et.prototype.isub = function ($) {
              if (0 !== $.negative) {
                $.negative = 0;
                var Y,
                  J,
                  Q = this.iadd($);
                return (($.negative = 1), Q._normSign());
              }
              if (0 !== this.negative)
                return (
                  (this.negative = 0),
                  this.iadd($),
                  (this.negative = 1),
                  this._normSign()
                );
              var ee = this.cmp($);
              if (0 === ee)
                return (
                  (this.negative = 0),
                  (this.length = 1),
                  (this.words[0] = 0),
                  this
                );
              ee > 0 ? ((Y = this), (J = $)) : ((Y = $), (J = this));
              for (var et = 0, er = 0; er < J.length; er++)
                ((et = (Q = (0 | Y.words[er]) - (0 | J.words[er]) + et) >> 26),
                  (this.words[er] = 0x3ffffff & Q));
              for (; 0 !== et && er < Y.length; er++)
                ((et = (Q = (0 | Y.words[er]) + et) >> 26),
                  (this.words[er] = 0x3ffffff & Q));
              if (0 === et && er < Y.length && Y !== this)
                for (; er < Y.length; er++) this.words[er] = Y.words[er];
              return (
                (this.length = Math.max(this.length, er)),
                Y !== this && (this.negative = 1),
                this.strip()
              );
            }),
            (et.prototype.sub = function ($) {
              return this.clone().isub($);
            }));
          var eh = function ($, Y, J) {
            var Q,
              ee,
              et,
              er = $.words,
              ei = Y.words,
              en = J.words,
              ea = 0,
              ef = 0 | er[0],
              eo = 8191 & ef,
              es = ef >>> 13,
              eh = 0 | er[1],
              ed = 8191 & eh,
              ec = eh >>> 13,
              eu = 0 | er[2],
              el = 8191 & eu,
              ep = eu >>> 13,
              eb = 0 | er[3],
              em = 8191 & eb,
              eg = eb >>> 13,
              ey = 0 | er[4],
              ev = 8191 & ey,
              e_ = ey >>> 13,
              ew = 0 | er[5],
              ex = 8191 & ew,
              eM = ew >>> 13,
              eS = 0 | er[6],
              eE = 8191 & eS,
              ek = eS >>> 13,
              eA = 0 | er[7],
              eR = 8191 & eA,
              eI = eA >>> 13,
              eB = 0 | er[8],
              eT = 8191 & eB,
              eP = eB >>> 13,
              eO = 0 | er[9],
              eC = 8191 & eO,
              eN = eO >>> 13,
              ej = 0 | ei[0],
              eD = 8191 & ej,
              eL = ej >>> 13,
              eq = 0 | ei[1],
              eU = 8191 & eq,
              ez = eq >>> 13,
              eF = 0 | ei[2],
              eH = 8191 & eF,
              eK = eF >>> 13,
              eW = 0 | ei[3],
              eV = 8191 & eW,
              eZ = eW >>> 13,
              eG = 0 | ei[4],
              eX = 8191 & eG,
              e$ = eG >>> 13,
              eY = 0 | ei[5],
              eJ = 8191 & eY,
              eQ = eY >>> 13,
              e0 = 0 | ei[6],
              e1 = 8191 & e0,
              e2 = e0 >>> 13,
              e6 = 0 | ei[7],
              e3 = 8191 & e6,
              e4 = e6 >>> 13,
              e8 = 0 | ei[8],
              e5 = 8191 & e8,
              e9 = e8 >>> 13,
              e7 = 0 | ei[9],
              te = 8191 & e7,
              tt = e7 >>> 13;
            ((J.negative = $.negative ^ Y.negative),
              (J.length = 19),
              (Q = Math.imul(eo, eD)));
            var tr =
              (((ea + Q) | 0) +
                ((8191 &
                  (ee = ((ee = Math.imul(eo, eL)) + Math.imul(es, eD)) | 0)) <<
                  13)) |
              0;
            ((ea =
              ((((et = Math.imul(es, eL)) + (ee >>> 13)) | 0) + (tr >>> 26)) |
              0),
              (tr &= 0x3ffffff),
              (Q = Math.imul(ed, eD)),
              (ee = ((ee = Math.imul(ed, eL)) + Math.imul(ec, eD)) | 0),
              (et = Math.imul(ec, eL)),
              (Q = (Q + Math.imul(eo, eU)) | 0));
            var ti =
              (((ea + Q) | 0) +
                ((8191 &
                  (ee =
                    ((ee = (ee + Math.imul(eo, ez)) | 0) + Math.imul(es, eU)) |
                    0)) <<
                  13)) |
              0;
            ((ea =
              ((((et = (et + Math.imul(es, ez)) | 0) + (ee >>> 13)) | 0) +
                (ti >>> 26)) |
              0),
              (ti &= 0x3ffffff),
              (Q = Math.imul(el, eD)),
              (ee = ((ee = Math.imul(el, eL)) + Math.imul(ep, eD)) | 0),
              (et = Math.imul(ep, eL)),
              (Q = (Q + Math.imul(ed, eU)) | 0),
              (ee =
                ((ee = (ee + Math.imul(ed, ez)) | 0) + Math.imul(ec, eU)) | 0),
              (et = (et + Math.imul(ec, ez)) | 0),
              (Q = (Q + Math.imul(eo, eH)) | 0));
            var tn =
              (((ea + Q) | 0) +
                ((8191 &
                  (ee =
                    ((ee = (ee + Math.imul(eo, eK)) | 0) + Math.imul(es, eH)) |
                    0)) <<
                  13)) |
              0;
            ((ea =
              ((((et = (et + Math.imul(es, eK)) | 0) + (ee >>> 13)) | 0) +
                (tn >>> 26)) |
              0),
              (tn &= 0x3ffffff),
              (Q = Math.imul(em, eD)),
              (ee = ((ee = Math.imul(em, eL)) + Math.imul(eg, eD)) | 0),
              (et = Math.imul(eg, eL)),
              (Q = (Q + Math.imul(el, eU)) | 0),
              (ee =
                ((ee = (ee + Math.imul(el, ez)) | 0) + Math.imul(ep, eU)) | 0),
              (et = (et + Math.imul(ep, ez)) | 0),
              (Q = (Q + Math.imul(ed, eH)) | 0),
              (ee =
                ((ee = (ee + Math.imul(ed, eK)) | 0) + Math.imul(ec, eH)) | 0),
              (et = (et + Math.imul(ec, eK)) | 0),
              (Q = (Q + Math.imul(eo, eV)) | 0));
            var ta =
              (((ea + Q) | 0) +
                ((8191 &
                  (ee =
                    ((ee = (ee + Math.imul(eo, eZ)) | 0) + Math.imul(es, eV)) |
                    0)) <<
                  13)) |
              0;
            ((ea =
              ((((et = (et + Math.imul(es, eZ)) | 0) + (ee >>> 13)) | 0) +
                (ta >>> 26)) |
              0),
              (ta &= 0x3ffffff),
              (Q = Math.imul(ev, eD)),
              (ee = ((ee = Math.imul(ev, eL)) + Math.imul(e_, eD)) | 0),
              (et = Math.imul(e_, eL)),
              (Q = (Q + Math.imul(em, eU)) | 0),
              (ee =
                ((ee = (ee + Math.imul(em, ez)) | 0) + Math.imul(eg, eU)) | 0),
              (et = (et + Math.imul(eg, ez)) | 0),
              (Q = (Q + Math.imul(el, eH)) | 0),
              (ee =
                ((ee = (ee + Math.imul(el, eK)) | 0) + Math.imul(ep, eH)) | 0),
              (et = (et + Math.imul(ep, eK)) | 0),
              (Q = (Q + Math.imul(ed, eV)) | 0),
              (ee =
                ((ee = (ee + Math.imul(ed, eZ)) | 0) + Math.imul(ec, eV)) | 0),
              (et = (et + Math.imul(ec, eZ)) | 0),
              (Q = (Q + Math.imul(eo, eX)) | 0));
            var tf =
              (((ea + Q) | 0) +
                ((8191 &
                  (ee =
                    ((ee = (ee + Math.imul(eo, e$)) | 0) + Math.imul(es, eX)) |
                    0)) <<
                  13)) |
              0;
            ((ea =
              ((((et = (et + Math.imul(es, e$)) | 0) + (ee >>> 13)) | 0) +
                (tf >>> 26)) |
              0),
              (tf &= 0x3ffffff),
              (Q = Math.imul(ex, eD)),
              (ee = ((ee = Math.imul(ex, eL)) + Math.imul(eM, eD)) | 0),
              (et = Math.imul(eM, eL)),
              (Q = (Q + Math.imul(ev, eU)) | 0),
              (ee =
                ((ee = (ee + Math.imul(ev, ez)) | 0) + Math.imul(e_, eU)) | 0),
              (et = (et + Math.imul(e_, ez)) | 0),
              (Q = (Q + Math.imul(em, eH)) | 0),
              (ee =
                ((ee = (ee + Math.imul(em, eK)) | 0) + Math.imul(eg, eH)) | 0),
              (et = (et + Math.imul(eg, eK)) | 0),
              (Q = (Q + Math.imul(el, eV)) | 0),
              (ee =
                ((ee = (ee + Math.imul(el, eZ)) | 0) + Math.imul(ep, eV)) | 0),
              (et = (et + Math.imul(ep, eZ)) | 0),
              (Q = (Q + Math.imul(ed, eX)) | 0),
              (ee =
                ((ee = (ee + Math.imul(ed, e$)) | 0) + Math.imul(ec, eX)) | 0),
              (et = (et + Math.imul(ec, e$)) | 0),
              (Q = (Q + Math.imul(eo, eJ)) | 0));
            var to =
              (((ea + Q) | 0) +
                ((8191 &
                  (ee =
                    ((ee = (ee + Math.imul(eo, eQ)) | 0) + Math.imul(es, eJ)) |
                    0)) <<
                  13)) |
              0;
            ((ea =
              ((((et = (et + Math.imul(es, eQ)) | 0) + (ee >>> 13)) | 0) +
                (to >>> 26)) |
              0),
              (to &= 0x3ffffff),
              (Q = Math.imul(eE, eD)),
              (ee = ((ee = Math.imul(eE, eL)) + Math.imul(ek, eD)) | 0),
              (et = Math.imul(ek, eL)),
              (Q = (Q + Math.imul(ex, eU)) | 0),
              (ee =
                ((ee = (ee + Math.imul(ex, ez)) | 0) + Math.imul(eM, eU)) | 0),
              (et = (et + Math.imul(eM, ez)) | 0),
              (Q = (Q + Math.imul(ev, eH)) | 0),
              (ee =
                ((ee = (ee + Math.imul(ev, eK)) | 0) + Math.imul(e_, eH)) | 0),
              (et = (et + Math.imul(e_, eK)) | 0),
              (Q = (Q + Math.imul(em, eV)) | 0),
              (ee =
                ((ee = (ee + Math.imul(em, eZ)) | 0) + Math.imul(eg, eV)) | 0),
              (et = (et + Math.imul(eg, eZ)) | 0),
              (Q = (Q + Math.imul(el, eX)) | 0),
              (ee =
                ((ee = (ee + Math.imul(el, e$)) | 0) + Math.imul(ep, eX)) | 0),
              (et = (et + Math.imul(ep, e$)) | 0),
              (Q = (Q + Math.imul(ed, eJ)) | 0),
              (ee =
                ((ee = (ee + Math.imul(ed, eQ)) | 0) + Math.imul(ec, eJ)) | 0),
              (et = (et + Math.imul(ec, eQ)) | 0),
              (Q = (Q + Math.imul(eo, e1)) | 0));
            var ts =
              (((ea + Q) | 0) +
                ((8191 &
                  (ee =
                    ((ee = (ee + Math.imul(eo, e2)) | 0) + Math.imul(es, e1)) |
                    0)) <<
                  13)) |
              0;
            ((ea =
              ((((et = (et + Math.imul(es, e2)) | 0) + (ee >>> 13)) | 0) +
                (ts >>> 26)) |
              0),
              (ts &= 0x3ffffff),
              (Q = Math.imul(eR, eD)),
              (ee = ((ee = Math.imul(eR, eL)) + Math.imul(eI, eD)) | 0),
              (et = Math.imul(eI, eL)),
              (Q = (Q + Math.imul(eE, eU)) | 0),
              (ee =
                ((ee = (ee + Math.imul(eE, ez)) | 0) + Math.imul(ek, eU)) | 0),
              (et = (et + Math.imul(ek, ez)) | 0),
              (Q = (Q + Math.imul(ex, eH)) | 0),
              (ee =
                ((ee = (ee + Math.imul(ex, eK)) | 0) + Math.imul(eM, eH)) | 0),
              (et = (et + Math.imul(eM, eK)) | 0),
              (Q = (Q + Math.imul(ev, eV)) | 0),
              (ee =
                ((ee = (ee + Math.imul(ev, eZ)) | 0) + Math.imul(e_, eV)) | 0),
              (et = (et + Math.imul(e_, eZ)) | 0),
              (Q = (Q + Math.imul(em, eX)) | 0),
              (ee =
                ((ee = (ee + Math.imul(em, e$)) | 0) + Math.imul(eg, eX)) | 0),
              (et = (et + Math.imul(eg, e$)) | 0),
              (Q = (Q + Math.imul(el, eJ)) | 0),
              (ee =
                ((ee = (ee + Math.imul(el, eQ)) | 0) + Math.imul(ep, eJ)) | 0),
              (et = (et + Math.imul(ep, eQ)) | 0),
              (Q = (Q + Math.imul(ed, e1)) | 0),
              (ee =
                ((ee = (ee + Math.imul(ed, e2)) | 0) + Math.imul(ec, e1)) | 0),
              (et = (et + Math.imul(ec, e2)) | 0),
              (Q = (Q + Math.imul(eo, e3)) | 0));
            var th =
              (((ea + Q) | 0) +
                ((8191 &
                  (ee =
                    ((ee = (ee + Math.imul(eo, e4)) | 0) + Math.imul(es, e3)) |
                    0)) <<
                  13)) |
              0;
            ((ea =
              ((((et = (et + Math.imul(es, e4)) | 0) + (ee >>> 13)) | 0) +
                (th >>> 26)) |
              0),
              (th &= 0x3ffffff),
              (Q = Math.imul(eT, eD)),
              (ee = ((ee = Math.imul(eT, eL)) + Math.imul(eP, eD)) | 0),
              (et = Math.imul(eP, eL)),
              (Q = (Q + Math.imul(eR, eU)) | 0),
              (ee =
                ((ee = (ee + Math.imul(eR, ez)) | 0) + Math.imul(eI, eU)) | 0),
              (et = (et + Math.imul(eI, ez)) | 0),
              (Q = (Q + Math.imul(eE, eH)) | 0),
              (ee =
                ((ee = (ee + Math.imul(eE, eK)) | 0) + Math.imul(ek, eH)) | 0),
              (et = (et + Math.imul(ek, eK)) | 0),
              (Q = (Q + Math.imul(ex, eV)) | 0),
              (ee =
                ((ee = (ee + Math.imul(ex, eZ)) | 0) + Math.imul(eM, eV)) | 0),
              (et = (et + Math.imul(eM, eZ)) | 0),
              (Q = (Q + Math.imul(ev, eX)) | 0),
              (ee =
                ((ee = (ee + Math.imul(ev, e$)) | 0) + Math.imul(e_, eX)) | 0),
              (et = (et + Math.imul(e_, e$)) | 0),
              (Q = (Q + Math.imul(em, eJ)) | 0),
              (ee =
                ((ee = (ee + Math.imul(em, eQ)) | 0) + Math.imul(eg, eJ)) | 0),
              (et = (et + Math.imul(eg, eQ)) | 0),
              (Q = (Q + Math.imul(el, e1)) | 0),
              (ee =
                ((ee = (ee + Math.imul(el, e2)) | 0) + Math.imul(ep, e1)) | 0),
              (et = (et + Math.imul(ep, e2)) | 0),
              (Q = (Q + Math.imul(ed, e3)) | 0),
              (ee =
                ((ee = (ee + Math.imul(ed, e4)) | 0) + Math.imul(ec, e3)) | 0),
              (et = (et + Math.imul(ec, e4)) | 0),
              (Q = (Q + Math.imul(eo, e5)) | 0));
            var td =
              (((ea + Q) | 0) +
                ((8191 &
                  (ee =
                    ((ee = (ee + Math.imul(eo, e9)) | 0) + Math.imul(es, e5)) |
                    0)) <<
                  13)) |
              0;
            ((ea =
              ((((et = (et + Math.imul(es, e9)) | 0) + (ee >>> 13)) | 0) +
                (td >>> 26)) |
              0),
              (td &= 0x3ffffff),
              (Q = Math.imul(eC, eD)),
              (ee = ((ee = Math.imul(eC, eL)) + Math.imul(eN, eD)) | 0),
              (et = Math.imul(eN, eL)),
              (Q = (Q + Math.imul(eT, eU)) | 0),
              (ee =
                ((ee = (ee + Math.imul(eT, ez)) | 0) + Math.imul(eP, eU)) | 0),
              (et = (et + Math.imul(eP, ez)) | 0),
              (Q = (Q + Math.imul(eR, eH)) | 0),
              (ee =
                ((ee = (ee + Math.imul(eR, eK)) | 0) + Math.imul(eI, eH)) | 0),
              (et = (et + Math.imul(eI, eK)) | 0),
              (Q = (Q + Math.imul(eE, eV)) | 0),
              (ee =
                ((ee = (ee + Math.imul(eE, eZ)) | 0) + Math.imul(ek, eV)) | 0),
              (et = (et + Math.imul(ek, eZ)) | 0),
              (Q = (Q + Math.imul(ex, eX)) | 0),
              (ee =
                ((ee = (ee + Math.imul(ex, e$)) | 0) + Math.imul(eM, eX)) | 0),
              (et = (et + Math.imul(eM, e$)) | 0),
              (Q = (Q + Math.imul(ev, eJ)) | 0),
              (ee =
                ((ee = (ee + Math.imul(ev, eQ)) | 0) + Math.imul(e_, eJ)) | 0),
              (et = (et + Math.imul(e_, eQ)) | 0),
              (Q = (Q + Math.imul(em, e1)) | 0),
              (ee =
                ((ee = (ee + Math.imul(em, e2)) | 0) + Math.imul(eg, e1)) | 0),
              (et = (et + Math.imul(eg, e2)) | 0),
              (Q = (Q + Math.imul(el, e3)) | 0),
              (ee =
                ((ee = (ee + Math.imul(el, e4)) | 0) + Math.imul(ep, e3)) | 0),
              (et = (et + Math.imul(ep, e4)) | 0),
              (Q = (Q + Math.imul(ed, e5)) | 0),
              (ee =
                ((ee = (ee + Math.imul(ed, e9)) | 0) + Math.imul(ec, e5)) | 0),
              (et = (et + Math.imul(ec, e9)) | 0),
              (Q = (Q + Math.imul(eo, te)) | 0));
            var tc =
              (((ea + Q) | 0) +
                ((8191 &
                  (ee =
                    ((ee = (ee + Math.imul(eo, tt)) | 0) + Math.imul(es, te)) |
                    0)) <<
                  13)) |
              0;
            ((ea =
              ((((et = (et + Math.imul(es, tt)) | 0) + (ee >>> 13)) | 0) +
                (tc >>> 26)) |
              0),
              (tc &= 0x3ffffff),
              (Q = Math.imul(eC, eU)),
              (ee = ((ee = Math.imul(eC, ez)) + Math.imul(eN, eU)) | 0),
              (et = Math.imul(eN, ez)),
              (Q = (Q + Math.imul(eT, eH)) | 0),
              (ee =
                ((ee = (ee + Math.imul(eT, eK)) | 0) + Math.imul(eP, eH)) | 0),
              (et = (et + Math.imul(eP, eK)) | 0),
              (Q = (Q + Math.imul(eR, eV)) | 0),
              (ee =
                ((ee = (ee + Math.imul(eR, eZ)) | 0) + Math.imul(eI, eV)) | 0),
              (et = (et + Math.imul(eI, eZ)) | 0),
              (Q = (Q + Math.imul(eE, eX)) | 0),
              (ee =
                ((ee = (ee + Math.imul(eE, e$)) | 0) + Math.imul(ek, eX)) | 0),
              (et = (et + Math.imul(ek, e$)) | 0),
              (Q = (Q + Math.imul(ex, eJ)) | 0),
              (ee =
                ((ee = (ee + Math.imul(ex, eQ)) | 0) + Math.imul(eM, eJ)) | 0),
              (et = (et + Math.imul(eM, eQ)) | 0),
              (Q = (Q + Math.imul(ev, e1)) | 0),
              (ee =
                ((ee = (ee + Math.imul(ev, e2)) | 0) + Math.imul(e_, e1)) | 0),
              (et = (et + Math.imul(e_, e2)) | 0),
              (Q = (Q + Math.imul(em, e3)) | 0),
              (ee =
                ((ee = (ee + Math.imul(em, e4)) | 0) + Math.imul(eg, e3)) | 0),
              (et = (et + Math.imul(eg, e4)) | 0),
              (Q = (Q + Math.imul(el, e5)) | 0),
              (ee =
                ((ee = (ee + Math.imul(el, e9)) | 0) + Math.imul(ep, e5)) | 0),
              (et = (et + Math.imul(ep, e9)) | 0),
              (Q = (Q + Math.imul(ed, te)) | 0));
            var tu =
              (((ea + Q) | 0) +
                ((8191 &
                  (ee =
                    ((ee = (ee + Math.imul(ed, tt)) | 0) + Math.imul(ec, te)) |
                    0)) <<
                  13)) |
              0;
            ((ea =
              ((((et = (et + Math.imul(ec, tt)) | 0) + (ee >>> 13)) | 0) +
                (tu >>> 26)) |
              0),
              (tu &= 0x3ffffff),
              (Q = Math.imul(eC, eH)),
              (ee = ((ee = Math.imul(eC, eK)) + Math.imul(eN, eH)) | 0),
              (et = Math.imul(eN, eK)),
              (Q = (Q + Math.imul(eT, eV)) | 0),
              (ee =
                ((ee = (ee + Math.imul(eT, eZ)) | 0) + Math.imul(eP, eV)) | 0),
              (et = (et + Math.imul(eP, eZ)) | 0),
              (Q = (Q + Math.imul(eR, eX)) | 0),
              (ee =
                ((ee = (ee + Math.imul(eR, e$)) | 0) + Math.imul(eI, eX)) | 0),
              (et = (et + Math.imul(eI, e$)) | 0),
              (Q = (Q + Math.imul(eE, eJ)) | 0),
              (ee =
                ((ee = (ee + Math.imul(eE, eQ)) | 0) + Math.imul(ek, eJ)) | 0),
              (et = (et + Math.imul(ek, eQ)) | 0),
              (Q = (Q + Math.imul(ex, e1)) | 0),
              (ee =
                ((ee = (ee + Math.imul(ex, e2)) | 0) + Math.imul(eM, e1)) | 0),
              (et = (et + Math.imul(eM, e2)) | 0),
              (Q = (Q + Math.imul(ev, e3)) | 0),
              (ee =
                ((ee = (ee + Math.imul(ev, e4)) | 0) + Math.imul(e_, e3)) | 0),
              (et = (et + Math.imul(e_, e4)) | 0),
              (Q = (Q + Math.imul(em, e5)) | 0),
              (ee =
                ((ee = (ee + Math.imul(em, e9)) | 0) + Math.imul(eg, e5)) | 0),
              (et = (et + Math.imul(eg, e9)) | 0),
              (Q = (Q + Math.imul(el, te)) | 0));
            var tl =
              (((ea + Q) | 0) +
                ((8191 &
                  (ee =
                    ((ee = (ee + Math.imul(el, tt)) | 0) + Math.imul(ep, te)) |
                    0)) <<
                  13)) |
              0;
            ((ea =
              ((((et = (et + Math.imul(ep, tt)) | 0) + (ee >>> 13)) | 0) +
                (tl >>> 26)) |
              0),
              (tl &= 0x3ffffff),
              (Q = Math.imul(eC, eV)),
              (ee = ((ee = Math.imul(eC, eZ)) + Math.imul(eN, eV)) | 0),
              (et = Math.imul(eN, eZ)),
              (Q = (Q + Math.imul(eT, eX)) | 0),
              (ee =
                ((ee = (ee + Math.imul(eT, e$)) | 0) + Math.imul(eP, eX)) | 0),
              (et = (et + Math.imul(eP, e$)) | 0),
              (Q = (Q + Math.imul(eR, eJ)) | 0),
              (ee =
                ((ee = (ee + Math.imul(eR, eQ)) | 0) + Math.imul(eI, eJ)) | 0),
              (et = (et + Math.imul(eI, eQ)) | 0),
              (Q = (Q + Math.imul(eE, e1)) | 0),
              (ee =
                ((ee = (ee + Math.imul(eE, e2)) | 0) + Math.imul(ek, e1)) | 0),
              (et = (et + Math.imul(ek, e2)) | 0),
              (Q = (Q + Math.imul(ex, e3)) | 0),
              (ee =
                ((ee = (ee + Math.imul(ex, e4)) | 0) + Math.imul(eM, e3)) | 0),
              (et = (et + Math.imul(eM, e4)) | 0),
              (Q = (Q + Math.imul(ev, e5)) | 0),
              (ee =
                ((ee = (ee + Math.imul(ev, e9)) | 0) + Math.imul(e_, e5)) | 0),
              (et = (et + Math.imul(e_, e9)) | 0),
              (Q = (Q + Math.imul(em, te)) | 0));
            var tp =
              (((ea + Q) | 0) +
                ((8191 &
                  (ee =
                    ((ee = (ee + Math.imul(em, tt)) | 0) + Math.imul(eg, te)) |
                    0)) <<
                  13)) |
              0;
            ((ea =
              ((((et = (et + Math.imul(eg, tt)) | 0) + (ee >>> 13)) | 0) +
                (tp >>> 26)) |
              0),
              (tp &= 0x3ffffff),
              (Q = Math.imul(eC, eX)),
              (ee = ((ee = Math.imul(eC, e$)) + Math.imul(eN, eX)) | 0),
              (et = Math.imul(eN, e$)),
              (Q = (Q + Math.imul(eT, eJ)) | 0),
              (ee =
                ((ee = (ee + Math.imul(eT, eQ)) | 0) + Math.imul(eP, eJ)) | 0),
              (et = (et + Math.imul(eP, eQ)) | 0),
              (Q = (Q + Math.imul(eR, e1)) | 0),
              (ee =
                ((ee = (ee + Math.imul(eR, e2)) | 0) + Math.imul(eI, e1)) | 0),
              (et = (et + Math.imul(eI, e2)) | 0),
              (Q = (Q + Math.imul(eE, e3)) | 0),
              (ee =
                ((ee = (ee + Math.imul(eE, e4)) | 0) + Math.imul(ek, e3)) | 0),
              (et = (et + Math.imul(ek, e4)) | 0),
              (Q = (Q + Math.imul(ex, e5)) | 0),
              (ee =
                ((ee = (ee + Math.imul(ex, e9)) | 0) + Math.imul(eM, e5)) | 0),
              (et = (et + Math.imul(eM, e9)) | 0),
              (Q = (Q + Math.imul(ev, te)) | 0));
            var tb =
              (((ea + Q) | 0) +
                ((8191 &
                  (ee =
                    ((ee = (ee + Math.imul(ev, tt)) | 0) + Math.imul(e_, te)) |
                    0)) <<
                  13)) |
              0;
            ((ea =
              ((((et = (et + Math.imul(e_, tt)) | 0) + (ee >>> 13)) | 0) +
                (tb >>> 26)) |
              0),
              (tb &= 0x3ffffff),
              (Q = Math.imul(eC, eJ)),
              (ee = ((ee = Math.imul(eC, eQ)) + Math.imul(eN, eJ)) | 0),
              (et = Math.imul(eN, eQ)),
              (Q = (Q + Math.imul(eT, e1)) | 0),
              (ee =
                ((ee = (ee + Math.imul(eT, e2)) | 0) + Math.imul(eP, e1)) | 0),
              (et = (et + Math.imul(eP, e2)) | 0),
              (Q = (Q + Math.imul(eR, e3)) | 0),
              (ee =
                ((ee = (ee + Math.imul(eR, e4)) | 0) + Math.imul(eI, e3)) | 0),
              (et = (et + Math.imul(eI, e4)) | 0),
              (Q = (Q + Math.imul(eE, e5)) | 0),
              (ee =
                ((ee = (ee + Math.imul(eE, e9)) | 0) + Math.imul(ek, e5)) | 0),
              (et = (et + Math.imul(ek, e9)) | 0),
              (Q = (Q + Math.imul(ex, te)) | 0));
            var tm =
              (((ea + Q) | 0) +
                ((8191 &
                  (ee =
                    ((ee = (ee + Math.imul(ex, tt)) | 0) + Math.imul(eM, te)) |
                    0)) <<
                  13)) |
              0;
            ((ea =
              ((((et = (et + Math.imul(eM, tt)) | 0) + (ee >>> 13)) | 0) +
                (tm >>> 26)) |
              0),
              (tm &= 0x3ffffff),
              (Q = Math.imul(eC, e1)),
              (ee = ((ee = Math.imul(eC, e2)) + Math.imul(eN, e1)) | 0),
              (et = Math.imul(eN, e2)),
              (Q = (Q + Math.imul(eT, e3)) | 0),
              (ee =
                ((ee = (ee + Math.imul(eT, e4)) | 0) + Math.imul(eP, e3)) | 0),
              (et = (et + Math.imul(eP, e4)) | 0),
              (Q = (Q + Math.imul(eR, e5)) | 0),
              (ee =
                ((ee = (ee + Math.imul(eR, e9)) | 0) + Math.imul(eI, e5)) | 0),
              (et = (et + Math.imul(eI, e9)) | 0),
              (Q = (Q + Math.imul(eE, te)) | 0));
            var tg =
              (((ea + Q) | 0) +
                ((8191 &
                  (ee =
                    ((ee = (ee + Math.imul(eE, tt)) | 0) + Math.imul(ek, te)) |
                    0)) <<
                  13)) |
              0;
            ((ea =
              ((((et = (et + Math.imul(ek, tt)) | 0) + (ee >>> 13)) | 0) +
                (tg >>> 26)) |
              0),
              (tg &= 0x3ffffff),
              (Q = Math.imul(eC, e3)),
              (ee = ((ee = Math.imul(eC, e4)) + Math.imul(eN, e3)) | 0),
              (et = Math.imul(eN, e4)),
              (Q = (Q + Math.imul(eT, e5)) | 0),
              (ee =
                ((ee = (ee + Math.imul(eT, e9)) | 0) + Math.imul(eP, e5)) | 0),
              (et = (et + Math.imul(eP, e9)) | 0),
              (Q = (Q + Math.imul(eR, te)) | 0));
            var ty =
              (((ea + Q) | 0) +
                ((8191 &
                  (ee =
                    ((ee = (ee + Math.imul(eR, tt)) | 0) + Math.imul(eI, te)) |
                    0)) <<
                  13)) |
              0;
            ((ea =
              ((((et = (et + Math.imul(eI, tt)) | 0) + (ee >>> 13)) | 0) +
                (ty >>> 26)) |
              0),
              (ty &= 0x3ffffff),
              (Q = Math.imul(eC, e5)),
              (ee = ((ee = Math.imul(eC, e9)) + Math.imul(eN, e5)) | 0),
              (et = Math.imul(eN, e9)),
              (Q = (Q + Math.imul(eT, te)) | 0));
            var tv =
              (((ea + Q) | 0) +
                ((8191 &
                  (ee =
                    ((ee = (ee + Math.imul(eT, tt)) | 0) + Math.imul(eP, te)) |
                    0)) <<
                  13)) |
              0;
            ((ea =
              ((((et = (et + Math.imul(eP, tt)) | 0) + (ee >>> 13)) | 0) +
                (tv >>> 26)) |
              0),
              (tv &= 0x3ffffff),
              (Q = Math.imul(eC, te)));
            var t_ =
              (((ea + Q) | 0) +
                ((8191 &
                  (ee = ((ee = Math.imul(eC, tt)) + Math.imul(eN, te)) | 0)) <<
                  13)) |
              0;
            return (
              (ea =
                ((((et = Math.imul(eN, tt)) + (ee >>> 13)) | 0) + (t_ >>> 26)) |
                0),
              (t_ &= 0x3ffffff),
              (en[0] = tr),
              (en[1] = ti),
              (en[2] = tn),
              (en[3] = ta),
              (en[4] = tf),
              (en[5] = to),
              (en[6] = ts),
              (en[7] = th),
              (en[8] = td),
              (en[9] = tc),
              (en[10] = tu),
              (en[11] = tl),
              (en[12] = tp),
              (en[13] = tb),
              (en[14] = tm),
              (en[15] = tg),
              (en[16] = ty),
              (en[17] = tv),
              (en[18] = t_),
              0 !== ea && ((en[19] = ea), J.length++),
              J
            );
          };
          function ed($, Y, J) {
            return new ec().mulp($, Y, J);
          }
          function ec($, Y) {
            ((this.x = $), (this.y = Y));
          }
          (Math.imul || (eh = es),
            (et.prototype.mulTo = function ($, Y) {
              var J = this.length + $.length;
              return 10 === this.length && 10 === $.length
                ? eh(this, $, Y)
                : J < 63
                  ? es(this, $, Y)
                  : J < 1024
                    ? (function ($, Y, J) {
                        ((J.negative = Y.negative ^ $.negative),
                          (J.length = $.length + Y.length));
                        for (
                          var Q = 0, ee = 0, et = 0;
                          et < J.length - 1;
                          et++
                        ) {
                          var er = ee;
                          ee = 0;
                          for (
                            var ei = 0x3ffffff & Q,
                              en = Math.min(et, Y.length - 1),
                              ea = Math.max(0, et - $.length + 1);
                            ea <= en;
                            ea++
                          ) {
                            var ef = et - ea,
                              eo = (0 | $.words[ef]) * (0 | Y.words[ea]),
                              es = 0x3ffffff & eo;
                            ((er = (er + ((eo / 0x4000000) | 0)) | 0),
                              (ei = 0x3ffffff & (es = (es + ei) | 0)),
                              (ee += (er = (er + (es >>> 26)) | 0) >>> 26),
                              (er &= 0x3ffffff));
                          }
                          ((J.words[et] = ei), (Q = er), (er = ee));
                        }
                        return (
                          0 !== Q ? (J.words[et] = Q) : J.length--,
                          J.strip()
                        );
                      })(this, $, Y)
                    : ed(this, $, Y);
            }),
            (ec.prototype.makeRBT = function ($) {
              for (
                var Y = Array($), J = et.prototype._countBits($) - 1, Q = 0;
                Q < $;
                Q++
              )
                Y[Q] = this.revBin(Q, J, $);
              return Y;
            }),
            (ec.prototype.revBin = function ($, Y, J) {
              if (0 === $ || $ === J - 1) return $;
              for (var Q = 0, ee = 0; ee < Y; ee++)
                ((Q |= (1 & $) << (Y - ee - 1)), ($ >>= 1));
              return Q;
            }),
            (ec.prototype.permute = function ($, Y, J, Q, ee, et) {
              for (var er = 0; er < et; er++)
                ((Q[er] = Y[$[er]]), (ee[er] = J[$[er]]));
            }),
            (ec.prototype.transform = function ($, Y, J, Q, ee, et) {
              this.permute(et, $, Y, J, Q, ee);
              for (var er = 1; er < ee; er <<= 1)
                for (
                  var ei = er << 1,
                    en = Math.cos((2 * Math.PI) / ei),
                    ea = Math.sin((2 * Math.PI) / ei),
                    ef = 0;
                  ef < ee;
                  ef += ei
                )
                  for (var eo = en, es = ea, eh = 0; eh < er; eh++) {
                    var ed = J[ef + eh],
                      ec = Q[ef + eh],
                      eu = J[ef + eh + er],
                      el = Q[ef + eh + er],
                      ep = eo * eu - es * el;
                    ((el = eo * el + es * eu),
                      (eu = ep),
                      (J[ef + eh] = ed + eu),
                      (Q[ef + eh] = ec + el),
                      (J[ef + eh + er] = ed - eu),
                      (Q[ef + eh + er] = ec - el),
                      eh !== ei &&
                        ((ep = en * eo - ea * es),
                        (es = en * es + ea * eo),
                        (eo = ep)));
                  }
            }),
            (ec.prototype.guessLen13b = function ($, Y) {
              var J = 1 | Math.max(Y, $),
                Q = 1 & J,
                ee = 0;
              for (J = (J / 2) | 0; J; J >>>= 1) ee++;
              return 1 << (ee + 1 + Q);
            }),
            (ec.prototype.conjugate = function ($, Y, J) {
              if (!(J <= 1))
                for (var Q = 0; Q < J / 2; Q++) {
                  var ee = $[Q];
                  (($[Q] = $[J - Q - 1]),
                    ($[J - Q - 1] = ee),
                    (ee = Y[Q]),
                    (Y[Q] = -Y[J - Q - 1]),
                    (Y[J - Q - 1] = -ee));
                }
            }),
            (ec.prototype.normalize13b = function ($, Y) {
              for (var J = 0, Q = 0; Q < Y / 2; Q++) {
                var ee =
                  8192 * Math.round($[2 * Q + 1] / Y) +
                  Math.round($[2 * Q] / Y) +
                  J;
                (($[Q] = 0x3ffffff & ee),
                  (J = ee < 0x4000000 ? 0 : (ee / 0x4000000) | 0));
              }
              return $;
            }),
            (ec.prototype.convert13b = function ($, Y, J, ee) {
              for (var et = 0, er = 0; er < Y; er++)
                ((et += 0 | $[er]),
                  (J[2 * er] = 8191 & et),
                  (et >>>= 13),
                  (J[2 * er + 1] = 8191 & et),
                  (et >>>= 13));
              for (er = 2 * Y; er < ee; ++er) J[er] = 0;
              (Q(0 === et), Q((-8192 & et) == 0));
            }),
            (ec.prototype.stub = function ($) {
              for (var Y = Array($), J = 0; J < $; J++) Y[J] = 0;
              return Y;
            }),
            (ec.prototype.mulp = function ($, Y, J) {
              var Q = 2 * this.guessLen13b($.length, Y.length),
                ee = this.makeRBT(Q),
                et = this.stub(Q),
                er = Array(Q),
                ei = Array(Q),
                en = Array(Q),
                ea = Array(Q),
                ef = Array(Q),
                eo = Array(Q),
                es = J.words;
              ((es.length = Q),
                this.convert13b($.words, $.length, er, Q),
                this.convert13b(Y.words, Y.length, ea, Q),
                this.transform(er, et, ei, en, Q, ee),
                this.transform(ea, et, ef, eo, Q, ee));
              for (var eh = 0; eh < Q; eh++) {
                var ed = ei[eh] * ef[eh] - en[eh] * eo[eh];
                ((en[eh] = ei[eh] * eo[eh] + en[eh] * ef[eh]), (ei[eh] = ed));
              }
              return (
                this.conjugate(ei, en, Q),
                this.transform(ei, en, es, et, Q, ee),
                this.conjugate(es, et, Q),
                this.normalize13b(es, Q),
                (J.negative = $.negative ^ Y.negative),
                (J.length = $.length + Y.length),
                J.strip()
              );
            }),
            (et.prototype.mul = function ($) {
              var Y = new et(null);
              return (
                (Y.words = Array(this.length + $.length)),
                this.mulTo($, Y)
              );
            }),
            (et.prototype.mulf = function ($) {
              var Y = new et(null);
              return (
                (Y.words = Array(this.length + $.length)),
                ed(this, $, Y)
              );
            }),
            (et.prototype.imul = function ($) {
              return this.clone().mulTo($, this);
            }),
            (et.prototype.imuln = function ($) {
              (Q("number" == typeof $), Q($ < 0x4000000));
              for (var Y = 0, J = 0; J < this.length; J++) {
                var ee = (0 | this.words[J]) * $,
                  et = (0x3ffffff & ee) + (0x3ffffff & Y);
                ((Y >>= 26),
                  (Y += ((ee / 0x4000000) | 0) + (et >>> 26)),
                  (this.words[J] = 0x3ffffff & et));
              }
              return (0 !== Y && ((this.words[J] = Y), this.length++), this);
            }),
            (et.prototype.muln = function ($) {
              return this.clone().imuln($);
            }),
            (et.prototype.sqr = function () {
              return this.mul(this);
            }),
            (et.prototype.isqr = function () {
              return this.imul(this.clone());
            }),
            (et.prototype.pow = function ($) {
              var Y = (function ($) {
                for (var Y = Array($.bitLength()), J = 0; J < Y.length; J++) {
                  var Q = (J / 26) | 0,
                    ee = J % 26;
                  Y[J] = ($.words[Q] & (1 << ee)) >>> ee;
                }
                return Y;
              })($);
              if (0 === Y.length) return new et(1);
              for (
                var J = this, Q = 0;
                Q < Y.length && 0 === Y[Q];
                Q++, J = J.sqr()
              );
              if (++Q < Y.length)
                for (var ee = J.sqr(); Q < Y.length; Q++, ee = ee.sqr())
                  0 !== Y[Q] && (J = J.mul(ee));
              return J;
            }),
            (et.prototype.iushln = function ($) {
              Q("number" == typeof $ && $ >= 0);
              var Y,
                J = $ % 26,
                ee = ($ - J) / 26,
                et = (0x3ffffff >>> (26 - J)) << (26 - J);
              if (0 !== J) {
                var er = 0;
                for (Y = 0; Y < this.length; Y++) {
                  var ei = this.words[Y] & et,
                    en = ((0 | this.words[Y]) - ei) << J;
                  ((this.words[Y] = en | er), (er = ei >>> (26 - J)));
                }
                er && ((this.words[Y] = er), this.length++);
              }
              if (0 !== ee) {
                for (Y = this.length - 1; Y >= 0; Y--)
                  this.words[Y + ee] = this.words[Y];
                for (Y = 0; Y < ee; Y++) this.words[Y] = 0;
                this.length += ee;
              }
              return this.strip();
            }),
            (et.prototype.ishln = function ($) {
              return (Q(0 === this.negative), this.iushln($));
            }),
            (et.prototype.iushrn = function ($, Y, J) {
              Q("number" == typeof $ && $ >= 0);
              var ee = Y ? (Y - (Y % 26)) / 26 : 0,
                et = $ % 26,
                er = Math.min(($ - et) / 26, this.length),
                ei = 0x3ffffff ^ ((0x3ffffff >>> et) << et);
              if (((ee -= er), (ee = Math.max(0, ee)), J)) {
                for (var en = 0; en < er; en++) J.words[en] = this.words[en];
                J.length = er;
              }
              if (0 === er);
              else if (this.length > er)
                for (this.length -= er, en = 0; en < this.length; en++)
                  this.words[en] = this.words[en + er];
              else ((this.words[0] = 0), (this.length = 1));
              var ea = 0;
              for (
                en = this.length - 1;
                en >= 0 && (0 !== ea || en >= ee);
                en--
              ) {
                var ef = 0 | this.words[en];
                ((this.words[en] = (ea << (26 - et)) | (ef >>> et)),
                  (ea = ef & ei));
              }
              return (
                J && 0 !== ea && (J.words[J.length++] = ea),
                0 === this.length && ((this.words[0] = 0), (this.length = 1)),
                this.strip()
              );
            }),
            (et.prototype.ishrn = function ($, Y, J) {
              return (Q(0 === this.negative), this.iushrn($, Y, J));
            }),
            (et.prototype.shln = function ($) {
              return this.clone().ishln($);
            }),
            (et.prototype.ushln = function ($) {
              return this.clone().iushln($);
            }),
            (et.prototype.shrn = function ($) {
              return this.clone().ishrn($);
            }),
            (et.prototype.ushrn = function ($) {
              return this.clone().iushrn($);
            }),
            (et.prototype.testn = function ($) {
              Q("number" == typeof $ && $ >= 0);
              var Y = $ % 26,
                J = ($ - Y) / 26;
              return !(this.length <= J) && !!(this.words[J] & (1 << Y));
            }),
            (et.prototype.imaskn = function ($) {
              Q("number" == typeof $ && $ >= 0);
              var Y = $ % 26,
                J = ($ - Y) / 26;
              return (Q(
                0 === this.negative,
                "imaskn works only with positive numbers",
              ),
              this.length <= J)
                ? this
                : (0 !== Y && J++,
                  (this.length = Math.min(J, this.length)),
                  0 !== Y &&
                    (this.words[this.length - 1] &=
                      0x3ffffff ^ ((0x3ffffff >>> Y) << Y)),
                  this.strip());
            }),
            (et.prototype.maskn = function ($) {
              return this.clone().imaskn($);
            }),
            (et.prototype.iaddn = function ($) {
              return (Q("number" == typeof $), Q($ < 0x4000000), $ < 0)
                ? this.isubn(-$)
                : 0 !== this.negative
                  ? (1 === this.length && (0 | this.words[0]) < $
                      ? ((this.words[0] = $ - (0 | this.words[0])),
                        (this.negative = 0))
                      : ((this.negative = 0),
                        this.isubn($),
                        (this.negative = 1)),
                    this)
                  : this._iaddn($);
            }),
            (et.prototype._iaddn = function ($) {
              this.words[0] += $;
              for (
                var Y = 0;
                Y < this.length && this.words[Y] >= 0x4000000;
                Y++
              )
                ((this.words[Y] -= 0x4000000),
                  Y === this.length - 1
                    ? (this.words[Y + 1] = 1)
                    : this.words[Y + 1]++);
              return ((this.length = Math.max(this.length, Y + 1)), this);
            }),
            (et.prototype.isubn = function ($) {
              if ((Q("number" == typeof $), Q($ < 0x4000000), $ < 0))
                return this.iaddn(-$);
              if (0 !== this.negative)
                return (
                  (this.negative = 0),
                  this.iaddn($),
                  (this.negative = 1),
                  this
                );
              if (
                ((this.words[0] -= $), 1 === this.length && this.words[0] < 0)
              )
                ((this.words[0] = -this.words[0]), (this.negative = 1));
              else
                for (var Y = 0; Y < this.length && this.words[Y] < 0; Y++)
                  ((this.words[Y] += 0x4000000), (this.words[Y + 1] -= 1));
              return this.strip();
            }),
            (et.prototype.addn = function ($) {
              return this.clone().iaddn($);
            }),
            (et.prototype.subn = function ($) {
              return this.clone().isubn($);
            }),
            (et.prototype.iabs = function () {
              return ((this.negative = 0), this);
            }),
            (et.prototype.abs = function () {
              return this.clone().iabs();
            }),
            (et.prototype._ishlnsubmul = function ($, Y, J) {
              var ee,
                et,
                er = $.length + J;
              this._expand(er);
              var ei = 0;
              for (ee = 0; ee < $.length; ee++) {
                et = (0 | this.words[ee + J]) + ei;
                var en = (0 | $.words[ee]) * Y;
                ((et -= 0x3ffffff & en),
                  (ei = (et >> 26) - ((en / 0x4000000) | 0)),
                  (this.words[ee + J] = 0x3ffffff & et));
              }
              for (; ee < this.length - J; ee++)
                ((ei = (et = (0 | this.words[ee + J]) + ei) >> 26),
                  (this.words[ee + J] = 0x3ffffff & et));
              if (0 === ei) return this.strip();
              for (Q(-1 === ei), ei = 0, ee = 0; ee < this.length; ee++)
                ((ei = (et = -(0 | this.words[ee]) + ei) >> 26),
                  (this.words[ee] = 0x3ffffff & et));
              return ((this.negative = 1), this.strip());
            }),
            (et.prototype._wordDiv = function ($, Y) {
              var J,
                Q = this.length - $.length,
                ee = this.clone(),
                er = $,
                ei = 0 | er.words[er.length - 1];
              0 != (Q = 26 - this._countBits(ei)) &&
                ((er = er.ushln(Q)),
                ee.iushln(Q),
                (ei = 0 | er.words[er.length - 1]));
              var en = ee.length - er.length;
              if ("mod" !== Y) {
                (((J = new et(null)).length = en + 1),
                  (J.words = Array(J.length)));
                for (var ea = 0; ea < J.length; ea++) J.words[ea] = 0;
              }
              var ef = ee.clone()._ishlnsubmul(er, 1, en);
              0 === ef.negative && ((ee = ef), J && (J.words[en] = 1));
              for (var eo = en - 1; eo >= 0; eo--) {
                var es =
                  (0 | ee.words[er.length + eo]) * 0x4000000 +
                  (0 | ee.words[er.length + eo - 1]);
                for (
                  es = Math.min((es / ei) | 0, 0x3ffffff),
                    ee._ishlnsubmul(er, es, eo);
                  0 !== ee.negative;

                )
                  (es--,
                    (ee.negative = 0),
                    ee._ishlnsubmul(er, 1, eo),
                    ee.isZero() || (ee.negative ^= 1));
                J && (J.words[eo] = es);
              }
              return (
                J && J.strip(),
                ee.strip(),
                "div" !== Y && 0 !== Q && ee.iushrn(Q),
                { div: J || null, mod: ee }
              );
            }),
            (et.prototype.divmod = function ($, Y, J) {
              var ee, er, ei;
              return (Q(!$.isZero()), this.isZero())
                ? { div: new et(0), mod: new et(0) }
                : 0 !== this.negative && 0 === $.negative
                  ? ((ei = this.neg().divmod($, Y)),
                    "mod" !== Y && (ee = ei.div.neg()),
                    "div" !== Y &&
                      ((er = ei.mod.neg()),
                      J && 0 !== er.negative && er.iadd($)),
                    { div: ee, mod: er })
                  : 0 === this.negative && 0 !== $.negative
                    ? ((ei = this.divmod($.neg(), Y)),
                      "mod" !== Y && (ee = ei.div.neg()),
                      { div: ee, mod: ei.mod })
                    : (this.negative & $.negative) != 0
                      ? ((ei = this.neg().divmod($.neg(), Y)),
                        "div" !== Y &&
                          ((er = ei.mod.neg()),
                          J && 0 !== er.negative && er.isub($)),
                        { div: ei.div, mod: er })
                      : $.length > this.length || 0 > this.cmp($)
                        ? { div: new et(0), mod: this }
                        : 1 === $.length
                          ? "div" === Y
                            ? { div: this.divn($.words[0]), mod: null }
                            : "mod" === Y
                              ? {
                                  div: null,
                                  mod: new et(this.modn($.words[0])),
                                }
                              : {
                                  div: this.divn($.words[0]),
                                  mod: new et(this.modn($.words[0])),
                                }
                          : this._wordDiv($, Y);
            }),
            (et.prototype.div = function ($) {
              return this.divmod($, "div", !1).div;
            }),
            (et.prototype.mod = function ($) {
              return this.divmod($, "mod", !1).mod;
            }),
            (et.prototype.umod = function ($) {
              return this.divmod($, "mod", !0).mod;
            }),
            (et.prototype.divRound = function ($) {
              var Y = this.divmod($);
              if (Y.mod.isZero()) return Y.div;
              var J = 0 !== Y.div.negative ? Y.mod.isub($) : Y.mod,
                Q = $.ushrn(1),
                ee = $.andln(1),
                et = J.cmp(Q);
              return et < 0 || (1 === ee && 0 === et)
                ? Y.div
                : 0 !== Y.div.negative
                  ? Y.div.isubn(1)
                  : Y.div.iaddn(1);
            }),
            (et.prototype.modn = function ($) {
              Q($ <= 0x3ffffff);
              for (
                var Y = 0x4000000 % $, J = 0, ee = this.length - 1;
                ee >= 0;
                ee--
              )
                J = (Y * J + (0 | this.words[ee])) % $;
              return J;
            }),
            (et.prototype.idivn = function ($) {
              Q($ <= 0x3ffffff);
              for (var Y = 0, J = this.length - 1; J >= 0; J--) {
                var ee = (0 | this.words[J]) + 0x4000000 * Y;
                ((this.words[J] = (ee / $) | 0), (Y = ee % $));
              }
              return this.strip();
            }),
            (et.prototype.divn = function ($) {
              return this.clone().idivn($);
            }),
            (et.prototype.egcd = function ($) {
              (Q(0 === $.negative), Q(!$.isZero()));
              var Y = this,
                J = $.clone();
              Y = 0 !== Y.negative ? Y.umod($) : Y.clone();
              for (
                var ee = new et(1),
                  er = new et(0),
                  ei = new et(0),
                  en = new et(1),
                  ea = 0;
                Y.isEven() && J.isEven();

              )
                (Y.iushrn(1), J.iushrn(1), ++ea);
              for (var ef = J.clone(), eo = Y.clone(); !Y.isZero(); ) {
                for (
                  var es = 0, eh = 1;
                  (Y.words[0] & eh) == 0 && es < 26;
                  ++es, eh <<= 1
                );
                if (es > 0)
                  for (Y.iushrn(es); es-- > 0; )
                    ((ee.isOdd() || er.isOdd()) && (ee.iadd(ef), er.isub(eo)),
                      ee.iushrn(1),
                      er.iushrn(1));
                for (
                  var ed = 0, ec = 1;
                  (J.words[0] & ec) == 0 && ed < 26;
                  ++ed, ec <<= 1
                );
                if (ed > 0)
                  for (J.iushrn(ed); ed-- > 0; )
                    ((ei.isOdd() || en.isOdd()) && (ei.iadd(ef), en.isub(eo)),
                      ei.iushrn(1),
                      en.iushrn(1));
                Y.cmp(J) >= 0
                  ? (Y.isub(J), ee.isub(ei), er.isub(en))
                  : (J.isub(Y), ei.isub(ee), en.isub(er));
              }
              return { a: ei, b: en, gcd: J.iushln(ea) };
            }),
            (et.prototype._invmp = function ($) {
              (Q(0 === $.negative), Q(!$.isZero()));
              var Y,
                J = this,
                ee = $.clone();
              J = 0 !== J.negative ? J.umod($) : J.clone();
              for (
                var er = new et(1), ei = new et(0), en = ee.clone();
                J.cmpn(1) > 0 && ee.cmpn(1) > 0;

              ) {
                for (
                  var ea = 0, ef = 1;
                  (J.words[0] & ef) == 0 && ea < 26;
                  ++ea, ef <<= 1
                );
                if (ea > 0)
                  for (J.iushrn(ea); ea-- > 0; )
                    (er.isOdd() && er.iadd(en), er.iushrn(1));
                for (
                  var eo = 0, es = 1;
                  (ee.words[0] & es) == 0 && eo < 26;
                  ++eo, es <<= 1
                );
                if (eo > 0)
                  for (ee.iushrn(eo); eo-- > 0; )
                    (ei.isOdd() && ei.iadd(en), ei.iushrn(1));
                J.cmp(ee) >= 0
                  ? (J.isub(ee), er.isub(ei))
                  : (ee.isub(J), ei.isub(er));
              }
              return (
                0 > (Y = 0 === J.cmpn(1) ? er : ei).cmpn(0) && Y.iadd($),
                Y
              );
            }),
            (et.prototype.gcd = function ($) {
              if (this.isZero()) return $.abs();
              if ($.isZero()) return this.abs();
              var Y = this.clone(),
                J = $.clone();
              ((Y.negative = 0), (J.negative = 0));
              for (var Q = 0; Y.isEven() && J.isEven(); Q++)
                (Y.iushrn(1), J.iushrn(1));
              for (;;) {
                for (; Y.isEven(); ) Y.iushrn(1);
                for (; J.isEven(); ) J.iushrn(1);
                var ee = Y.cmp(J);
                if (ee < 0) {
                  var et = Y;
                  ((Y = J), (J = et));
                } else if (0 === ee || 0 === J.cmpn(1)) break;
                Y.isub(J);
              }
              return J.iushln(Q);
            }),
            (et.prototype.invm = function ($) {
              return this.egcd($).a.umod($);
            }),
            (et.prototype.isEven = function () {
              return (1 & this.words[0]) == 0;
            }),
            (et.prototype.isOdd = function () {
              return (1 & this.words[0]) == 1;
            }),
            (et.prototype.andln = function ($) {
              return this.words[0] & $;
            }),
            (et.prototype.bincn = function ($) {
              Q("number" == typeof $);
              var Y = $ % 26,
                J = ($ - Y) / 26,
                ee = 1 << Y;
              if (this.length <= J)
                return (this._expand(J + 1), (this.words[J] |= ee), this);
              for (var et = ee, er = J; 0 !== et && er < this.length; er++) {
                var ei = 0 | this.words[er];
                ((ei += et),
                  (et = ei >>> 26),
                  (ei &= 0x3ffffff),
                  (this.words[er] = ei));
              }
              return (0 !== et && ((this.words[er] = et), this.length++), this);
            }),
            (et.prototype.isZero = function () {
              return 1 === this.length && 0 === this.words[0];
            }),
            (et.prototype.cmpn = function ($) {
              var Y,
                J = $ < 0;
              if (0 !== this.negative && !J) return -1;
              if (0 === this.negative && J) return 1;
              if ((this.strip(), this.length > 1)) Y = 1;
              else {
                (J && ($ = -$), Q($ <= 0x3ffffff, "Number is too big"));
                var ee = 0 | this.words[0];
                Y = ee === $ ? 0 : ee < $ ? -1 : 1;
              }
              return 0 !== this.negative ? 0 | -Y : Y;
            }),
            (et.prototype.cmp = function ($) {
              if (0 !== this.negative && 0 === $.negative) return -1;
              if (0 === this.negative && 0 !== $.negative) return 1;
              var Y = this.ucmp($);
              return 0 !== this.negative ? 0 | -Y : Y;
            }),
            (et.prototype.ucmp = function ($) {
              if (this.length > $.length) return 1;
              if (this.length < $.length) return -1;
              for (var Y = 0, J = this.length - 1; J >= 0; J--) {
                var Q = 0 | this.words[J],
                  ee = 0 | $.words[J];
                if (Q !== ee) {
                  Q < ee ? (Y = -1) : Q > ee && (Y = 1);
                  break;
                }
              }
              return Y;
            }),
            (et.prototype.gtn = function ($) {
              return 1 === this.cmpn($);
            }),
            (et.prototype.gt = function ($) {
              return 1 === this.cmp($);
            }),
            (et.prototype.gten = function ($) {
              return this.cmpn($) >= 0;
            }),
            (et.prototype.gte = function ($) {
              return this.cmp($) >= 0;
            }),
            (et.prototype.ltn = function ($) {
              return -1 === this.cmpn($);
            }),
            (et.prototype.lt = function ($) {
              return -1 === this.cmp($);
            }),
            (et.prototype.lten = function ($) {
              return 0 >= this.cmpn($);
            }),
            (et.prototype.lte = function ($) {
              return 0 >= this.cmp($);
            }),
            (et.prototype.eqn = function ($) {
              return 0 === this.cmpn($);
            }),
            (et.prototype.eq = function ($) {
              return 0 === this.cmp($);
            }),
            (et.red = function ($) {
              return new ey($);
            }),
            (et.prototype.toRed = function ($) {
              return (
                Q(!this.red, "Already a number in reduction context"),
                Q(0 === this.negative, "red works only with positives"),
                $.convertTo(this)._forceRed($)
              );
            }),
            (et.prototype.fromRed = function () {
              return (
                Q(
                  this.red,
                  "fromRed works only with numbers in reduction context",
                ),
                this.red.convertFrom(this)
              );
            }),
            (et.prototype._forceRed = function ($) {
              return ((this.red = $), this);
            }),
            (et.prototype.forceRed = function ($) {
              return (
                Q(!this.red, "Already a number in reduction context"),
                this._forceRed($)
              );
            }),
            (et.prototype.redAdd = function ($) {
              return (
                Q(this.red, "redAdd works only with red numbers"),
                this.red.add(this, $)
              );
            }),
            (et.prototype.redIAdd = function ($) {
              return (
                Q(this.red, "redIAdd works only with red numbers"),
                this.red.iadd(this, $)
              );
            }),
            (et.prototype.redSub = function ($) {
              return (
                Q(this.red, "redSub works only with red numbers"),
                this.red.sub(this, $)
              );
            }),
            (et.prototype.redISub = function ($) {
              return (
                Q(this.red, "redISub works only with red numbers"),
                this.red.isub(this, $)
              );
            }),
            (et.prototype.redShl = function ($) {
              return (
                Q(this.red, "redShl works only with red numbers"),
                this.red.shl(this, $)
              );
            }),
            (et.prototype.redMul = function ($) {
              return (
                Q(this.red, "redMul works only with red numbers"),
                this.red._verify2(this, $),
                this.red.mul(this, $)
              );
            }),
            (et.prototype.redIMul = function ($) {
              return (
                Q(this.red, "redMul works only with red numbers"),
                this.red._verify2(this, $),
                this.red.imul(this, $)
              );
            }),
            (et.prototype.redSqr = function () {
              return (
                Q(this.red, "redSqr works only with red numbers"),
                this.red._verify1(this),
                this.red.sqr(this)
              );
            }),
            (et.prototype.redISqr = function () {
              return (
                Q(this.red, "redISqr works only with red numbers"),
                this.red._verify1(this),
                this.red.isqr(this)
              );
            }),
            (et.prototype.redSqrt = function () {
              return (
                Q(this.red, "redSqrt works only with red numbers"),
                this.red._verify1(this),
                this.red.sqrt(this)
              );
            }),
            (et.prototype.redInvm = function () {
              return (
                Q(this.red, "redInvm works only with red numbers"),
                this.red._verify1(this),
                this.red.invm(this)
              );
            }),
            (et.prototype.redNeg = function () {
              return (
                Q(this.red, "redNeg works only with red numbers"),
                this.red._verify1(this),
                this.red.neg(this)
              );
            }),
            (et.prototype.redPow = function ($) {
              return (
                Q(this.red && !$.red, "redPow(normalNum)"),
                this.red._verify1(this),
                this.red.pow(this, $)
              );
            }));
          var eu = { k256: null, p224: null, p192: null, p25519: null };
          function el($, Y) {
            ((this.name = $),
              (this.p = new et(Y, 16)),
              (this.n = this.p.bitLength()),
              (this.k = new et(1).iushln(this.n).isub(this.p)),
              (this.tmp = this._tmp()));
          }
          function ep() {
            el.call(
              this,
              "k256",
              "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f",
            );
          }
          function eb() {
            el.call(
              this,
              "p224",
              "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001",
            );
          }
          function em() {
            el.call(
              this,
              "p192",
              "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff",
            );
          }
          function eg() {
            el.call(
              this,
              "25519",
              "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed",
            );
          }
          function ey($) {
            if ("string" == typeof $) {
              var Y = et._prime($);
              ((this.m = Y.p), (this.prime = Y));
            } else
              (Q($.gtn(1), "modulus must be greater than 1"),
                (this.m = $),
                (this.prime = null));
          }
          function ev($) {
            (ey.call(this, $),
              (this.shift = this.m.bitLength()),
              this.shift % 26 != 0 && (this.shift += 26 - (this.shift % 26)),
              (this.r = new et(1).iushln(this.shift)),
              (this.r2 = this.imod(this.r.sqr())),
              (this.rinv = this.r._invmp(this.m)),
              (this.minv = this.rinv.mul(this.r).isubn(1).div(this.m)),
              (this.minv = this.minv.umod(this.r)),
              (this.minv = this.r.sub(this.minv)));
          }
          ((el.prototype._tmp = function () {
            var $ = new et(null);
            return (($.words = Array(Math.ceil(this.n / 13))), $);
          }),
            (el.prototype.ireduce = function ($) {
              var Y,
                J = $;
              do
                (this.split(J, this.tmp),
                  (Y = (J = (J = this.imulK(J)).iadd(this.tmp)).bitLength()));
              while (Y > this.n);
              var Q = Y < this.n ? -1 : J.ucmp(this.p);
              return (
                0 === Q
                  ? ((J.words[0] = 0), (J.length = 1))
                  : Q > 0
                    ? J.isub(this.p)
                    : void 0 !== J.strip
                      ? J.strip()
                      : J._strip(),
                J
              );
            }),
            (el.prototype.split = function ($, Y) {
              $.iushrn(this.n, 0, Y);
            }),
            (el.prototype.imulK = function ($) {
              return $.imul(this.k);
            }),
            ee(ep, el),
            (ep.prototype.split = function ($, Y) {
              for (var J = Math.min($.length, 9), Q = 0; Q < J; Q++)
                Y.words[Q] = $.words[Q];
              if (((Y.length = J), $.length <= 9)) {
                (($.words[0] = 0), ($.length = 1));
                return;
              }
              var ee = $.words[9];
              for (
                Y.words[Y.length++] = 4194303 & ee, Q = 10;
                Q < $.length;
                Q++
              ) {
                var et = 0 | $.words[Q];
                (($.words[Q - 10] = ((4194303 & et) << 4) | (ee >>> 22)),
                  (ee = et));
              }
              ((ee >>>= 22),
                ($.words[Q - 10] = ee),
                0 === ee && $.length > 10 ? ($.length -= 10) : ($.length -= 9));
            }),
            (ep.prototype.imulK = function ($) {
              (($.words[$.length] = 0),
                ($.words[$.length + 1] = 0),
                ($.length += 2));
              for (var Y = 0, J = 0; J < $.length; J++) {
                var Q = 0 | $.words[J];
                ((Y += 977 * Q),
                  ($.words[J] = 0x3ffffff & Y),
                  (Y = 64 * Q + ((Y / 0x4000000) | 0)));
              }
              return (
                0 === $.words[$.length - 1] &&
                  ($.length--, 0 === $.words[$.length - 1] && $.length--),
                $
              );
            }),
            ee(eb, el),
            ee(em, el),
            ee(eg, el),
            (eg.prototype.imulK = function ($) {
              for (var Y = 0, J = 0; J < $.length; J++) {
                var Q = (0 | $.words[J]) * 19 + Y,
                  ee = 0x3ffffff & Q;
                ((Q >>>= 26), ($.words[J] = ee), (Y = Q));
              }
              return (0 !== Y && ($.words[$.length++] = Y), $);
            }),
            (et._prime = function ($) {
              var Y;
              if (eu[$]) return eu[$];
              if ("k256" === $) Y = new ep();
              else if ("p224" === $) Y = new eb();
              else if ("p192" === $) Y = new em();
              else if ("p25519" === $) Y = new eg();
              else throw Error("Unknown prime " + $);
              return ((eu[$] = Y), Y);
            }),
            (ey.prototype._verify1 = function ($) {
              (Q(0 === $.negative, "red works only with positives"),
                Q($.red, "red works only with red numbers"));
            }),
            (ey.prototype._verify2 = function ($, Y) {
              (Q(
                ($.negative | Y.negative) == 0,
                "red works only with positives",
              ),
                Q($.red && $.red === Y.red, "red works only with red numbers"));
            }),
            (ey.prototype.imod = function ($) {
              return this.prime
                ? this.prime.ireduce($)._forceRed(this)
                : $.umod(this.m)._forceRed(this);
            }),
            (ey.prototype.neg = function ($) {
              return $.isZero() ? $.clone() : this.m.sub($)._forceRed(this);
            }),
            (ey.prototype.add = function ($, Y) {
              this._verify2($, Y);
              var J = $.add(Y);
              return (J.cmp(this.m) >= 0 && J.isub(this.m), J._forceRed(this));
            }),
            (ey.prototype.iadd = function ($, Y) {
              this._verify2($, Y);
              var J = $.iadd(Y);
              return (J.cmp(this.m) >= 0 && J.isub(this.m), J);
            }),
            (ey.prototype.sub = function ($, Y) {
              this._verify2($, Y);
              var J = $.sub(Y);
              return (0 > J.cmpn(0) && J.iadd(this.m), J._forceRed(this));
            }),
            (ey.prototype.isub = function ($, Y) {
              this._verify2($, Y);
              var J = $.isub(Y);
              return (0 > J.cmpn(0) && J.iadd(this.m), J);
            }),
            (ey.prototype.shl = function ($, Y) {
              return (this._verify1($), this.imod($.ushln(Y)));
            }),
            (ey.prototype.imul = function ($, Y) {
              return (this._verify2($, Y), this.imod($.imul(Y)));
            }),
            (ey.prototype.mul = function ($, Y) {
              return (this._verify2($, Y), this.imod($.mul(Y)));
            }),
            (ey.prototype.isqr = function ($) {
              return this.imul($, $.clone());
            }),
            (ey.prototype.sqr = function ($) {
              return this.mul($, $);
            }),
            (ey.prototype.sqrt = function ($) {
              if ($.isZero()) return $.clone();
              var Y = this.m.andln(3);
              if ((Q(Y % 2 == 1), 3 === Y)) {
                var J = this.m.add(new et(1)).iushrn(2);
                return this.pow($, J);
              }
              for (
                var ee = this.m.subn(1), er = 0;
                !ee.isZero() && 0 === ee.andln(1);

              )
                (er++, ee.iushrn(1));
              Q(!ee.isZero());
              var ei = new et(1).toRed(this),
                en = ei.redNeg(),
                ea = this.m.subn(1).iushrn(1),
                ef = this.m.bitLength();
              for (
                ef = new et(2 * ef * ef).toRed(this);
                0 !== this.pow(ef, ea).cmp(en);

              )
                ef.redIAdd(en);
              for (
                var eo = this.pow(ef, ee),
                  es = this.pow($, ee.addn(1).iushrn(1)),
                  eh = this.pow($, ee),
                  ed = er;
                0 !== eh.cmp(ei);

              ) {
                for (var ec = eh, eu = 0; 0 !== ec.cmp(ei); eu++)
                  ec = ec.redSqr();
                Q(eu < ed);
                var el = this.pow(eo, new et(1).iushln(ed - eu - 1));
                ((es = es.redMul(el)),
                  (eo = el.redSqr()),
                  (eh = eh.redMul(eo)),
                  (ed = eu));
              }
              return es;
            }),
            (ey.prototype.invm = function ($) {
              var Y = $._invmp(this.m);
              return 0 !== Y.negative
                ? ((Y.negative = 0), this.imod(Y).redNeg())
                : this.imod(Y);
            }),
            (ey.prototype.pow = function ($, Y) {
              if (Y.isZero()) return new et(1).toRed(this);
              if (0 === Y.cmpn(1)) return $.clone();
              var J = Array(16);
              ((J[0] = new et(1).toRed(this)), (J[1] = $));
              for (var Q = 2; Q < J.length; Q++) J[Q] = this.mul(J[Q - 1], $);
              var ee = J[0],
                er = 0,
                ei = 0,
                en = Y.bitLength() % 26;
              for (0 === en && (en = 26), Q = Y.length - 1; Q >= 0; Q--) {
                for (var ea = Y.words[Q], ef = en - 1; ef >= 0; ef--) {
                  var eo = (ea >> ef) & 1;
                  if (
                    (ee !== J[0] && (ee = this.sqr(ee)), 0 === eo && 0 === er)
                  ) {
                    ei = 0;
                    continue;
                  }
                  ((er <<= 1),
                    (er |= eo),
                    (4 == ++ei || (0 === Q && 0 === ef)) &&
                      ((ee = this.mul(ee, J[er])), (ei = 0), (er = 0)));
                }
                en = 26;
              }
              return ee;
            }),
            (ey.prototype.convertTo = function ($) {
              var Y = $.umod(this.m);
              return Y === $ ? Y.clone() : Y;
            }),
            (ey.prototype.convertFrom = function ($) {
              var Y = $.clone();
              return ((Y.red = null), Y);
            }),
            (et.mont = function ($) {
              return new ev($);
            }),
            ee(ev, ey),
            (ev.prototype.convertTo = function ($) {
              return this.imod($.ushln(this.shift));
            }),
            (ev.prototype.convertFrom = function ($) {
              var Y = this.imod($.mul(this.rinv));
              return ((Y.red = null), Y);
            }),
            (ev.prototype.imul = function ($, Y) {
              if ($.isZero() || Y.isZero())
                return (($.words[0] = 0), ($.length = 1), $);
              var J = $.imul(Y),
                Q = J.maskn(this.shift)
                  .mul(this.minv)
                  .imaskn(this.shift)
                  .mul(this.m),
                ee = J.isub(Q).iushrn(this.shift),
                et = ee;
              return (
                ee.cmp(this.m) >= 0
                  ? (et = ee.isub(this.m))
                  : 0 > ee.cmpn(0) && (et = ee.iadd(this.m)),
                et._forceRed(this)
              );
            }),
            (ev.prototype.mul = function ($, Y) {
              if ($.isZero() || Y.isZero()) return new et(0)._forceRed(this);
              var J = $.mul(Y),
                Q = J.maskn(this.shift)
                  .mul(this.minv)
                  .imaskn(this.shift)
                  .mul(this.m),
                ee = J.isub(Q).iushrn(this.shift),
                er = ee;
              return (
                ee.cmp(this.m) >= 0
                  ? (er = ee.isub(this.m))
                  : 0 > ee.cmpn(0) && (er = ee.iadd(this.m)),
                er._forceRed(this)
              );
            }),
            (ev.prototype.invm = function ($) {
              return this.imod($._invmp(this.m).mul(this.r2))._forceRed(this);
            }));
        })(($ = J.nmd($)), this);
      },
      1315: function ($, Y, J) {
        !(function ($, Y) {
          "use strict";
          function Q($, Y) {
            if (!$) throw Error(Y || "Assertion failed");
          }
          function ee($, Y) {
            $.super_ = Y;
            var J = function () {};
            ((J.prototype = Y.prototype),
              ($.prototype = new J()),
              ($.prototype.constructor = $));
          }
          function et($, Y, J) {
            if (et.isBN($)) return $;
            ((this.negative = 0),
              (this.words = null),
              (this.length = 0),
              (this.red = null),
              null !== $ &&
                (("le" === Y || "be" === Y) && ((J = Y), (Y = 10)),
                this._init($ || 0, Y || 10, J || "be")));
          }
          ("object" == typeof $ ? ($.exports = et) : (Y.BN = et),
            (et.BN = et),
            (et.wordSize = 26));
          try {
            ef = J(181).Buffer;
          } catch ($) {}
          function er($, Y, J) {
            for (
              var ee = 0, et = Math.min($.length, J), er = 0, ei = Y;
              ei < et;
              ei++
            ) {
              var en,
                ea = $.charCodeAt(ei) - 48;
              ((ee <<= 4),
                (ee |= en =
                  ea >= 49 && ea <= 54
                    ? ea - 49 + 10
                    : ea >= 17 && ea <= 22
                      ? ea - 17 + 10
                      : ea),
                (er |= en));
            }
            return (Q(!(240 & er), "Invalid character in " + $), ee);
          }
          function ei($, Y, J, ee) {
            for (
              var et = 0, er = 0, ei = Math.min($.length, J), en = Y;
              en < ei;
              en++
            ) {
              var ea = $.charCodeAt(en) - 48;
              ((et *= ee),
                (er = ea >= 49 ? ea - 49 + 10 : ea >= 17 ? ea - 17 + 10 : ea),
                Q(ea >= 0 && er < ee, "Invalid character"),
                (et += er));
            }
            return et;
          }
          function en($, Y) {
            (($.words = Y.words),
              ($.length = Y.length),
              ($.negative = Y.negative),
              ($.red = Y.red));
          }
          function ea() {
            return (this.red ? "<BN-R: " : "<BN: ") + this.toString(16) + ">";
          }
          ((et.isBN = function ($) {
            return (
              $ instanceof et ||
              (null !== $ &&
                "object" == typeof $ &&
                $.constructor.wordSize === et.wordSize &&
                Array.isArray($.words))
            );
          }),
            (et.max = function ($, Y) {
              return $.cmp(Y) > 0 ? $ : Y;
            }),
            (et.min = function ($, Y) {
              return 0 > $.cmp(Y) ? $ : Y;
            }),
            (et.prototype._init = function ($, Y, J) {
              if ("number" == typeof $) return this._initNumber($, Y, J);
              if ("object" == typeof $) return this._initArray($, Y, J);
              ("hex" === Y && (Y = 16), Q(Y === (0 | Y) && Y >= 2 && Y <= 36));
              var ee = 0;
              ("-" === ($ = $.toString().replace(/\s+/g, ""))[0] && ee++,
                16 === Y ? this._parseHex($, ee) : this._parseBase($, Y, ee),
                "-" === $[0] && (this.negative = 1),
                this._strip(),
                "le" === J && this._initArray(this.toArray(), Y, J));
            }),
            (et.prototype._initNumber = function ($, Y, J) {
              ($ < 0 && ((this.negative = 1), ($ = -$)),
                $ < 0x4000000
                  ? ((this.words = [0x3ffffff & $]), (this.length = 1))
                  : $ < 0x10000000000000
                    ? ((this.words = [
                        0x3ffffff & $,
                        ($ / 0x4000000) & 0x3ffffff,
                      ]),
                      (this.length = 2))
                    : (Q($ < 0x20000000000000),
                      (this.words = [
                        0x3ffffff & $,
                        ($ / 0x4000000) & 0x3ffffff,
                        1,
                      ]),
                      (this.length = 3)),
                "le" === J && this._initArray(this.toArray(), Y, J));
            }),
            (et.prototype._initArray = function ($, Y, J) {
              if ((Q("number" == typeof $.length), $.length <= 0))
                return ((this.words = [0]), (this.length = 1), this);
              ((this.length = Math.ceil($.length / 3)),
                (this.words = Array(this.length)));
              for (var ee, et, er = 0; er < this.length; er++)
                this.words[er] = 0;
              var ei = 0;
              if ("be" === J)
                for (er = $.length - 1, ee = 0; er >= 0; er -= 3)
                  ((et = $[er] | ($[er - 1] << 8) | ($[er - 2] << 16)),
                    (this.words[ee] |= (et << ei) & 0x3ffffff),
                    (this.words[ee + 1] = (et >>> (26 - ei)) & 0x3ffffff),
                    (ei += 24) >= 26 && ((ei -= 26), ee++));
              else if ("le" === J)
                for (er = 0, ee = 0; er < $.length; er += 3)
                  ((et = $[er] | ($[er + 1] << 8) | ($[er + 2] << 16)),
                    (this.words[ee] |= (et << ei) & 0x3ffffff),
                    (this.words[ee + 1] = (et >>> (26 - ei)) & 0x3ffffff),
                    (ei += 24) >= 26 && ((ei -= 26), ee++));
              return this._strip();
            }),
            (et.prototype._parseHex = function ($, Y) {
              ((this.length = Math.ceil(($.length - Y) / 6)),
                (this.words = Array(this.length)));
              for (var J, Q, ee = 0; ee < this.length; ee++) this.words[ee] = 0;
              var et = 0;
              for (ee = $.length - 6, J = 0; ee >= Y; ee -= 6)
                ((Q = er($, ee, ee + 6)),
                  (this.words[J] |= (Q << et) & 0x3ffffff),
                  (this.words[J + 1] |= (Q >>> (26 - et)) & 4194303),
                  (et += 24) >= 26 && ((et -= 26), J++));
              (ee + 6 !== Y &&
                ((Q = er($, Y, ee + 6)),
                (this.words[J] |= (Q << et) & 0x3ffffff),
                (this.words[J + 1] |= (Q >>> (26 - et)) & 4194303)),
                this._strip());
            }),
            (et.prototype._parseBase = function ($, Y, J) {
              ((this.words = [0]), (this.length = 1));
              for (var Q = 0, ee = 1; ee <= 0x3ffffff; ee *= Y) Q++;
              (Q--, (ee = (ee / Y) | 0));
              for (
                var et = $.length - J,
                  er = et % Q,
                  en = Math.min(et, et - er) + J,
                  ea = 0,
                  ef = J;
                ef < en;
                ef += Q
              )
                ((ea = ei($, ef, ef + Q, Y)),
                  this.imuln(ee),
                  this.words[0] + ea < 0x4000000
                    ? (this.words[0] += ea)
                    : this._iaddn(ea));
              if (0 !== er) {
                var eo = 1;
                for (ea = ei($, ef, $.length, Y), ef = 0; ef < er; ef++)
                  eo *= Y;
                (this.imuln(eo),
                  this.words[0] + ea < 0x4000000
                    ? (this.words[0] += ea)
                    : this._iaddn(ea));
              }
            }),
            (et.prototype.copy = function ($) {
              $.words = Array(this.length);
              for (var Y = 0; Y < this.length; Y++) $.words[Y] = this.words[Y];
              (($.length = this.length),
                ($.negative = this.negative),
                ($.red = this.red));
            }),
            (et.prototype._move = function ($) {
              en($, this);
            }),
            (et.prototype.clone = function () {
              var $ = new et(null);
              return (this.copy($), $);
            }),
            (et.prototype._expand = function ($) {
              for (; this.length < $; ) this.words[this.length++] = 0;
              return this;
            }),
            (et.prototype._strip = function () {
              for (; this.length > 1 && 0 === this.words[this.length - 1]; )
                this.length--;
              return this._normSign();
            }),
            (et.prototype._normSign = function () {
              return (
                1 === this.length && 0 === this.words[0] && (this.negative = 0),
                this
              );
            }),
            "u" > typeof Symbol && "function" == typeof Symbol.for
              ? (et.prototype[Symbol.for("nodejs.util.inspect.custom")] = ea)
              : (et.prototype.inspect = ea));
          var ef,
            eo = [
              "",
              "0",
              "00",
              "000",
              "0000",
              "00000",
              "000000",
              "0000000",
              "00000000",
              "000000000",
              "0000000000",
              "00000000000",
              "000000000000",
              "0000000000000",
              "00000000000000",
              "000000000000000",
              "0000000000000000",
              "00000000000000000",
              "000000000000000000",
              "0000000000000000000",
              "00000000000000000000",
              "000000000000000000000",
              "0000000000000000000000",
              "00000000000000000000000",
              "000000000000000000000000",
              "0000000000000000000000000",
            ],
            es = [
              0, 0, 25, 16, 12, 11, 10, 9, 8, 8, 7, 7, 7, 7, 6, 6, 6, 6, 6, 6,
              6, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5,
            ],
            eh = [
              0, 0, 0x2000000, 0x290d741, 0x1000000, 0x2e90edd, 0x39aa400,
              0x267bf47, 0x1000000, 0x290d741, 1e7, 0x12959c3, 0x222c000,
              0x3bd7765, 7529536, 0xadcea1, 0x1000000, 0x1704f61, 0x206fc40,
              0x2cddcf9, 64e6, 4084101, 5153632, 6436343, 7962624, 9765625,
              0xb54ba0, 0xdaf26b, 0x1069c00, 0x138f9ad, 243e5, 0x1b4d89f,
              0x2000000, 0x25528a1, 0x2b54a20, 0x3216b93, 0x39aa400,
            ];
          function ed($, Y, J) {
            J.negative = Y.negative ^ $.negative;
            var Q = ($.length + Y.length) | 0;
            ((J.length = Q), (Q = (Q - 1) | 0));
            var ee = 0 | $.words[0],
              et = 0 | Y.words[0],
              er = ee * et,
              ei = 0x3ffffff & er,
              en = (er / 0x4000000) | 0;
            J.words[0] = ei;
            for (var ea = 1; ea < Q; ea++) {
              for (
                var ef = en >>> 26,
                  eo = 0x3ffffff & en,
                  es = Math.min(ea, Y.length - 1),
                  eh = Math.max(0, ea - $.length + 1);
                eh <= es;
                eh++
              ) {
                var ed = (ea - eh) | 0;
                ((ef +=
                  ((er = (ee = 0 | $.words[ed]) * (et = 0 | Y.words[eh]) + eo) /
                    0x4000000) |
                  0),
                  (eo = 0x3ffffff & er));
              }
              ((J.words[ea] = 0 | eo), (en = 0 | ef));
            }
            return (0 !== en ? (J.words[ea] = 0 | en) : J.length--, J._strip());
          }
          ((et.prototype.toString = function ($, Y) {
            if (((Y = 0 | Y || 1), 16 === ($ = $ || 10) || "hex" === $)) {
              for (var J = "", ee = 0, et = 0, er = 0; er < this.length; er++) {
                var ei = this.words[er],
                  en = (((ei << ee) | et) & 0xffffff).toString(16);
                ((J =
                  0 != (et = (ei >>> (24 - ee)) & 0xffffff) ||
                  er !== this.length - 1
                    ? eo[6 - en.length] + en + J
                    : en + J),
                  (ee += 2) >= 26 && ((ee -= 26), er--));
              }
              for (0 !== et && (J = et.toString(16) + J); J.length % Y != 0; )
                J = "0" + J;
              return (0 !== this.negative && (J = "-" + J), J);
            }
            if ($ === (0 | $) && $ >= 2 && $ <= 36) {
              var ea = es[$],
                ef = eh[$];
              J = "";
              var ed = this.clone();
              for (ed.negative = 0; !ed.isZero(); ) {
                var ec = ed.modrn(ef).toString($);
                J = (ed = ed.idivn(ef)).isZero()
                  ? ec + J
                  : eo[ea - ec.length] + ec + J;
              }
              for (this.isZero() && (J = "0" + J); J.length % Y != 0; )
                J = "0" + J;
              return (0 !== this.negative && (J = "-" + J), J);
            }
            Q(!1, "Base should be between 2 and 36");
          }),
            (et.prototype.toNumber = function () {
              var $ = this.words[0];
              return (
                2 === this.length
                  ? ($ += 0x4000000 * this.words[1])
                  : 3 === this.length && 1 === this.words[2]
                    ? ($ += 0x10000000000000 + 0x4000000 * this.words[1])
                    : this.length > 2 &&
                      Q(!1, "Number can only safely store up to 53 bits"),
                0 !== this.negative ? -$ : $
              );
            }),
            (et.prototype.toJSON = function () {
              return this.toString(16, 2);
            }),
            ef &&
              (et.prototype.toBuffer = function ($, Y) {
                return this.toArrayLike(ef, $, Y);
              }),
            (et.prototype.toArray = function ($, Y) {
              return this.toArrayLike(Array, $, Y);
            }),
            (et.prototype.toArrayLike = function ($, Y, J) {
              this._strip();
              var ee = this.byteLength(),
                et = J || Math.max(1, ee);
              (Q(ee <= et, "byte array longer than desired length"),
                Q(et > 0, "Requested array length <= 0"));
              var er = $.allocUnsafe ? $.allocUnsafe(et) : new $(et);
              return (
                this["_toArrayLike" + ("le" === Y ? "LE" : "BE")](er, ee),
                er
              );
            }),
            (et.prototype._toArrayLikeLE = function ($, Y) {
              for (var J = 0, Q = 0, ee = 0, et = 0; ee < this.length; ee++) {
                var er = (this.words[ee] << et) | Q;
                (($[J++] = 255 & er),
                  J < $.length && ($[J++] = (er >> 8) & 255),
                  J < $.length && ($[J++] = (er >> 16) & 255),
                  6 === et
                    ? (J < $.length && ($[J++] = (er >> 24) & 255),
                      (Q = 0),
                      (et = 0))
                    : ((Q = er >>> 24), (et += 2)));
              }
              if (J < $.length) for ($[J++] = Q; J < $.length; ) $[J++] = 0;
            }),
            (et.prototype._toArrayLikeBE = function ($, Y) {
              for (
                var J = $.length - 1, Q = 0, ee = 0, et = 0;
                ee < this.length;
                ee++
              ) {
                var er = (this.words[ee] << et) | Q;
                (($[J--] = 255 & er),
                  J >= 0 && ($[J--] = (er >> 8) & 255),
                  J >= 0 && ($[J--] = (er >> 16) & 255),
                  6 === et
                    ? (J >= 0 && ($[J--] = (er >> 24) & 255), (Q = 0), (et = 0))
                    : ((Q = er >>> 24), (et += 2)));
              }
              if (J >= 0) for ($[J--] = Q; J >= 0; ) $[J--] = 0;
            }),
            Math.clz32
              ? (et.prototype._countBits = function ($) {
                  return 32 - Math.clz32($);
                })
              : (et.prototype._countBits = function ($) {
                  var Y = $,
                    J = 0;
                  return (
                    Y >= 4096 && ((J += 13), (Y >>>= 13)),
                    Y >= 64 && ((J += 7), (Y >>>= 7)),
                    Y >= 8 && ((J += 4), (Y >>>= 4)),
                    Y >= 2 && ((J += 2), (Y >>>= 2)),
                    J + Y
                  );
                }),
            (et.prototype._zeroBits = function ($) {
              if (0 === $) return 26;
              var Y = $,
                J = 0;
              return (
                (8191 & Y) == 0 && ((J += 13), (Y >>>= 13)),
                (127 & Y) == 0 && ((J += 7), (Y >>>= 7)),
                (15 & Y) == 0 && ((J += 4), (Y >>>= 4)),
                (3 & Y) == 0 && ((J += 2), (Y >>>= 2)),
                (1 & Y) == 0 && J++,
                J
              );
            }),
            (et.prototype.bitLength = function () {
              var $ = this.words[this.length - 1],
                Y = this._countBits($);
              return (this.length - 1) * 26 + Y;
            }),
            (et.prototype.zeroBits = function () {
              if (this.isZero()) return 0;
              for (var $ = 0, Y = 0; Y < this.length; Y++) {
                var J = this._zeroBits(this.words[Y]);
                if ((($ += J), 26 !== J)) break;
              }
              return $;
            }),
            (et.prototype.byteLength = function () {
              return Math.ceil(this.bitLength() / 8);
            }),
            (et.prototype.toTwos = function ($) {
              return 0 !== this.negative
                ? this.abs().inotn($).iaddn(1)
                : this.clone();
            }),
            (et.prototype.fromTwos = function ($) {
              return this.testn($ - 1)
                ? this.notn($).iaddn(1).ineg()
                : this.clone();
            }),
            (et.prototype.isNeg = function () {
              return 0 !== this.negative;
            }),
            (et.prototype.neg = function () {
              return this.clone().ineg();
            }),
            (et.prototype.ineg = function () {
              return (this.isZero() || (this.negative ^= 1), this);
            }),
            (et.prototype.iuor = function ($) {
              for (; this.length < $.length; ) this.words[this.length++] = 0;
              for (var Y = 0; Y < $.length; Y++)
                this.words[Y] = this.words[Y] | $.words[Y];
              return this._strip();
            }),
            (et.prototype.ior = function ($) {
              return (Q((this.negative | $.negative) == 0), this.iuor($));
            }),
            (et.prototype.or = function ($) {
              return this.length > $.length
                ? this.clone().ior($)
                : $.clone().ior(this);
            }),
            (et.prototype.uor = function ($) {
              return this.length > $.length
                ? this.clone().iuor($)
                : $.clone().iuor(this);
            }),
            (et.prototype.iuand = function ($) {
              var Y;
              Y = this.length > $.length ? $ : this;
              for (var J = 0; J < Y.length; J++)
                this.words[J] = this.words[J] & $.words[J];
              return ((this.length = Y.length), this._strip());
            }),
            (et.prototype.iand = function ($) {
              return (Q((this.negative | $.negative) == 0), this.iuand($));
            }),
            (et.prototype.and = function ($) {
              return this.length > $.length
                ? this.clone().iand($)
                : $.clone().iand(this);
            }),
            (et.prototype.uand = function ($) {
              return this.length > $.length
                ? this.clone().iuand($)
                : $.clone().iuand(this);
            }),
            (et.prototype.iuxor = function ($) {
              this.length > $.length
                ? ((Y = this), (J = $))
                : ((Y = $), (J = this));
              for (var Y, J, Q = 0; Q < J.length; Q++)
                this.words[Q] = Y.words[Q] ^ J.words[Q];
              if (this !== Y)
                for (; Q < Y.length; Q++) this.words[Q] = Y.words[Q];
              return ((this.length = Y.length), this._strip());
            }),
            (et.prototype.ixor = function ($) {
              return (Q((this.negative | $.negative) == 0), this.iuxor($));
            }),
            (et.prototype.xor = function ($) {
              return this.length > $.length
                ? this.clone().ixor($)
                : $.clone().ixor(this);
            }),
            (et.prototype.uxor = function ($) {
              return this.length > $.length
                ? this.clone().iuxor($)
                : $.clone().iuxor(this);
            }),
            (et.prototype.inotn = function ($) {
              Q("number" == typeof $ && $ >= 0);
              var Y = 0 | Math.ceil($ / 26),
                J = $ % 26;
              (this._expand(Y), J > 0 && Y--);
              for (var ee = 0; ee < Y; ee++)
                this.words[ee] = 0x3ffffff & ~this.words[ee];
              return (
                J > 0 &&
                  (this.words[ee] = ~this.words[ee] & (0x3ffffff >> (26 - J))),
                this._strip()
              );
            }),
            (et.prototype.notn = function ($) {
              return this.clone().inotn($);
            }),
            (et.prototype.setn = function ($, Y) {
              Q("number" == typeof $ && $ >= 0);
              var J = ($ / 26) | 0,
                ee = $ % 26;
              return (
                this._expand(J + 1),
                Y
                  ? (this.words[J] = this.words[J] | (1 << ee))
                  : (this.words[J] = this.words[J] & ~(1 << ee)),
                this._strip()
              );
            }),
            (et.prototype.iadd = function ($) {
              if (0 !== this.negative && 0 === $.negative)
                return (
                  (this.negative = 0),
                  (Y = this.isub($)),
                  (this.negative ^= 1),
                  this._normSign()
                );
              if (0 === this.negative && 0 !== $.negative)
                return (
                  ($.negative = 0),
                  (Y = this.isub($)),
                  ($.negative = 1),
                  Y._normSign()
                );
              this.length > $.length
                ? ((J = this), (Q = $))
                : ((J = $), (Q = this));
              for (var Y, J, Q, ee = 0, et = 0; et < Q.length; et++)
                ((Y = (0 | J.words[et]) + (0 | Q.words[et]) + ee),
                  (this.words[et] = 0x3ffffff & Y),
                  (ee = Y >>> 26));
              for (; 0 !== ee && et < J.length; et++)
                ((Y = (0 | J.words[et]) + ee),
                  (this.words[et] = 0x3ffffff & Y),
                  (ee = Y >>> 26));
              if (((this.length = J.length), 0 !== ee))
                ((this.words[this.length] = ee), this.length++);
              else if (J !== this)
                for (; et < J.length; et++) this.words[et] = J.words[et];
              return this;
            }),
            (et.prototype.add = function ($) {
              var Y;
              return 0 !== $.negative && 0 === this.negative
                ? (($.negative = 0), (Y = this.sub($)), ($.negative ^= 1), Y)
                : 0 === $.negative && 0 !== this.negative
                  ? ((this.negative = 0),
                    (Y = $.sub(this)),
                    (this.negative = 1),
                    Y)
                  : this.length > $.length
                    ? this.clone().iadd($)
                    : $.clone().iadd(this);
            }),
            (et.prototype.isub = function ($) {
              if (0 !== $.negative) {
                $.negative = 0;
                var Y,
                  J,
                  Q = this.iadd($);
                return (($.negative = 1), Q._normSign());
              }
              if (0 !== this.negative)
                return (
                  (this.negative = 0),
                  this.iadd($),
                  (this.negative = 1),
                  this._normSign()
                );
              var ee = this.cmp($);
              if (0 === ee)
                return (
                  (this.negative = 0),
                  (this.length = 1),
                  (this.words[0] = 0),
                  this
                );
              ee > 0 ? ((Y = this), (J = $)) : ((Y = $), (J = this));
              for (var et = 0, er = 0; er < J.length; er++)
                ((et = (Q = (0 | Y.words[er]) - (0 | J.words[er]) + et) >> 26),
                  (this.words[er] = 0x3ffffff & Q));
              for (; 0 !== et && er < Y.length; er++)
                ((et = (Q = (0 | Y.words[er]) + et) >> 26),
                  (this.words[er] = 0x3ffffff & Q));
              if (0 === et && er < Y.length && Y !== this)
                for (; er < Y.length; er++) this.words[er] = Y.words[er];
              return (
                (this.length = Math.max(this.length, er)),
                Y !== this && (this.negative = 1),
                this._strip()
              );
            }),
            (et.prototype.sub = function ($) {
              return this.clone().isub($);
            }));
          var ec = function ($, Y, J) {
            var Q,
              ee,
              et,
              er = $.words,
              ei = Y.words,
              en = J.words,
              ea = 0,
              ef = 0 | er[0],
              eo = 8191 & ef,
              es = ef >>> 13,
              eh = 0 | er[1],
              ed = 8191 & eh,
              ec = eh >>> 13,
              eu = 0 | er[2],
              el = 8191 & eu,
              ep = eu >>> 13,
              eb = 0 | er[3],
              em = 8191 & eb,
              eg = eb >>> 13,
              ey = 0 | er[4],
              ev = 8191 & ey,
              e_ = ey >>> 13,
              ew = 0 | er[5],
              ex = 8191 & ew,
              eM = ew >>> 13,
              eS = 0 | er[6],
              eE = 8191 & eS,
              ek = eS >>> 13,
              eA = 0 | er[7],
              eR = 8191 & eA,
              eI = eA >>> 13,
              eB = 0 | er[8],
              eT = 8191 & eB,
              eP = eB >>> 13,
              eO = 0 | er[9],
              eC = 8191 & eO,
              eN = eO >>> 13,
              ej = 0 | ei[0],
              eD = 8191 & ej,
              eL = ej >>> 13,
              eq = 0 | ei[1],
              eU = 8191 & eq,
              ez = eq >>> 13,
              eF = 0 | ei[2],
              eH = 8191 & eF,
              eK = eF >>> 13,
              eW = 0 | ei[3],
              eV = 8191 & eW,
              eZ = eW >>> 13,
              eG = 0 | ei[4],
              eX = 8191 & eG,
              e$ = eG >>> 13,
              eY = 0 | ei[5],
              eJ = 8191 & eY,
              eQ = eY >>> 13,
              e0 = 0 | ei[6],
              e1 = 8191 & e0,
              e2 = e0 >>> 13,
              e6 = 0 | ei[7],
              e3 = 8191 & e6,
              e4 = e6 >>> 13,
              e8 = 0 | ei[8],
              e5 = 8191 & e8,
              e9 = e8 >>> 13,
              e7 = 0 | ei[9],
              te = 8191 & e7,
              tt = e7 >>> 13;
            ((J.negative = $.negative ^ Y.negative),
              (J.length = 19),
              (Q = Math.imul(eo, eD)));
            var tr =
              (((ea + Q) | 0) +
                ((8191 &
                  (ee = ((ee = Math.imul(eo, eL)) + Math.imul(es, eD)) | 0)) <<
                  13)) |
              0;
            ((ea =
              ((((et = Math.imul(es, eL)) + (ee >>> 13)) | 0) + (tr >>> 26)) |
              0),
              (tr &= 0x3ffffff),
              (Q = Math.imul(ed, eD)),
              (ee = ((ee = Math.imul(ed, eL)) + Math.imul(ec, eD)) | 0),
              (et = Math.imul(ec, eL)),
              (Q = (Q + Math.imul(eo, eU)) | 0));
            var ti =
              (((ea + Q) | 0) +
                ((8191 &
                  (ee =
                    ((ee = (ee + Math.imul(eo, ez)) | 0) + Math.imul(es, eU)) |
                    0)) <<
                  13)) |
              0;
            ((ea =
              ((((et = (et + Math.imul(es, ez)) | 0) + (ee >>> 13)) | 0) +
                (ti >>> 26)) |
              0),
              (ti &= 0x3ffffff),
              (Q = Math.imul(el, eD)),
              (ee = ((ee = Math.imul(el, eL)) + Math.imul(ep, eD)) | 0),
              (et = Math.imul(ep, eL)),
              (Q = (Q + Math.imul(ed, eU)) | 0),
              (ee =
                ((ee = (ee + Math.imul(ed, ez)) | 0) + Math.imul(ec, eU)) | 0),
              (et = (et + Math.imul(ec, ez)) | 0),
              (Q = (Q + Math.imul(eo, eH)) | 0));
            var tn =
              (((ea + Q) | 0) +
                ((8191 &
                  (ee =
                    ((ee = (ee + Math.imul(eo, eK)) | 0) + Math.imul(es, eH)) |
                    0)) <<
                  13)) |
              0;
            ((ea =
              ((((et = (et + Math.imul(es, eK)) | 0) + (ee >>> 13)) | 0) +
                (tn >>> 26)) |
              0),
              (tn &= 0x3ffffff),
              (Q = Math.imul(em, eD)),
              (ee = ((ee = Math.imul(em, eL)) + Math.imul(eg, eD)) | 0),
              (et = Math.imul(eg, eL)),
              (Q = (Q + Math.imul(el, eU)) | 0),
              (ee =
                ((ee = (ee + Math.imul(el, ez)) | 0) + Math.imul(ep, eU)) | 0),
              (et = (et + Math.imul(ep, ez)) | 0),
              (Q = (Q + Math.imul(ed, eH)) | 0),
              (ee =
                ((ee = (ee + Math.imul(ed, eK)) | 0) + Math.imul(ec, eH)) | 0),
              (et = (et + Math.imul(ec, eK)) | 0),
              (Q = (Q + Math.imul(eo, eV)) | 0));
            var ta =
              (((ea + Q) | 0) +
                ((8191 &
                  (ee =
                    ((ee = (ee + Math.imul(eo, eZ)) | 0) + Math.imul(es, eV)) |
                    0)) <<
                  13)) |
              0;
            ((ea =
              ((((et = (et + Math.imul(es, eZ)) | 0) + (ee >>> 13)) | 0) +
                (ta >>> 26)) |
              0),
              (ta &= 0x3ffffff),
              (Q = Math.imul(ev, eD)),
              (ee = ((ee = Math.imul(ev, eL)) + Math.imul(e_, eD)) | 0),
              (et = Math.imul(e_, eL)),
              (Q = (Q + Math.imul(em, eU)) | 0),
              (ee =
                ((ee = (ee + Math.imul(em, ez)) | 0) + Math.imul(eg, eU)) | 0),
              (et = (et + Math.imul(eg, ez)) | 0),
              (Q = (Q + Math.imul(el, eH)) | 0),
              (ee =
                ((ee = (ee + Math.imul(el, eK)) | 0) + Math.imul(ep, eH)) | 0),
              (et = (et + Math.imul(ep, eK)) | 0),
              (Q = (Q + Math.imul(ed, eV)) | 0),
              (ee =
                ((ee = (ee + Math.imul(ed, eZ)) | 0) + Math.imul(ec, eV)) | 0),
              (et = (et + Math.imul(ec, eZ)) | 0),
              (Q = (Q + Math.imul(eo, eX)) | 0));
            var tf =
              (((ea + Q) | 0) +
                ((8191 &
                  (ee =
                    ((ee = (ee + Math.imul(eo, e$)) | 0) + Math.imul(es, eX)) |
                    0)) <<
                  13)) |
              0;
            ((ea =
              ((((et = (et + Math.imul(es, e$)) | 0) + (ee >>> 13)) | 0) +
                (tf >>> 26)) |
              0),
              (tf &= 0x3ffffff),
              (Q = Math.imul(ex, eD)),
              (ee = ((ee = Math.imul(ex, eL)) + Math.imul(eM, eD)) | 0),
              (et = Math.imul(eM, eL)),
              (Q = (Q + Math.imul(ev, eU)) | 0),
              (ee =
                ((ee = (ee + Math.imul(ev, ez)) | 0) + Math.imul(e_, eU)) | 0),
              (et = (et + Math.imul(e_, ez)) | 0),
              (Q = (Q + Math.imul(em, eH)) | 0),
              (ee =
                ((ee = (ee + Math.imul(em, eK)) | 0) + Math.imul(eg, eH)) | 0),
              (et = (et + Math.imul(eg, eK)) | 0),
              (Q = (Q + Math.imul(el, eV)) | 0),
              (ee =
                ((ee = (ee + Math.imul(el, eZ)) | 0) + Math.imul(ep, eV)) | 0),
              (et = (et + Math.imul(ep, eZ)) | 0),
              (Q = (Q + Math.imul(ed, eX)) | 0),
              (ee =
                ((ee = (ee + Math.imul(ed, e$)) | 0) + Math.imul(ec, eX)) | 0),
              (et = (et + Math.imul(ec, e$)) | 0),
              (Q = (Q + Math.imul(eo, eJ)) | 0));
            var to =
              (((ea + Q) | 0) +
                ((8191 &
                  (ee =
                    ((ee = (ee + Math.imul(eo, eQ)) | 0) + Math.imul(es, eJ)) |
                    0)) <<
                  13)) |
              0;
            ((ea =
              ((((et = (et + Math.imul(es, eQ)) | 0) + (ee >>> 13)) | 0) +
                (to >>> 26)) |
              0),
              (to &= 0x3ffffff),
              (Q = Math.imul(eE, eD)),
              (ee = ((ee = Math.imul(eE, eL)) + Math.imul(ek, eD)) | 0),
              (et = Math.imul(ek, eL)),
              (Q = (Q + Math.imul(ex, eU)) | 0),
              (ee =
                ((ee = (ee + Math.imul(ex, ez)) | 0) + Math.imul(eM, eU)) | 0),
              (et = (et + Math.imul(eM, ez)) | 0),
              (Q = (Q + Math.imul(ev, eH)) | 0),
              (ee =
                ((ee = (ee + Math.imul(ev, eK)) | 0) + Math.imul(e_, eH)) | 0),
              (et = (et + Math.imul(e_, eK)) | 0),
              (Q = (Q + Math.imul(em, eV)) | 0),
              (ee =
                ((ee = (ee + Math.imul(em, eZ)) | 0) + Math.imul(eg, eV)) | 0),
              (et = (et + Math.imul(eg, eZ)) | 0),
              (Q = (Q + Math.imul(el, eX)) | 0),
              (ee =
                ((ee = (ee + Math.imul(el, e$)) | 0) + Math.imul(ep, eX)) | 0),
              (et = (et + Math.imul(ep, e$)) | 0),
              (Q = (Q + Math.imul(ed, eJ)) | 0),
              (ee =
                ((ee = (ee + Math.imul(ed, eQ)) | 0) + Math.imul(ec, eJ)) | 0),
              (et = (et + Math.imul(ec, eQ)) | 0),
              (Q = (Q + Math.imul(eo, e1)) | 0));
            var ts =
              (((ea + Q) | 0) +
                ((8191 &
                  (ee =
                    ((ee = (ee + Math.imul(eo, e2)) | 0) + Math.imul(es, e1)) |
                    0)) <<
                  13)) |
              0;
            ((ea =
              ((((et = (et + Math.imul(es, e2)) | 0) + (ee >>> 13)) | 0) +
                (ts >>> 26)) |
              0),
              (ts &= 0x3ffffff),
              (Q = Math.imul(eR, eD)),
              (ee = ((ee = Math.imul(eR, eL)) + Math.imul(eI, eD)) | 0),
              (et = Math.imul(eI, eL)),
              (Q = (Q + Math.imul(eE, eU)) | 0),
              (ee =
                ((ee = (ee + Math.imul(eE, ez)) | 0) + Math.imul(ek, eU)) | 0),
              (et = (et + Math.imul(ek, ez)) | 0),
              (Q = (Q + Math.imul(ex, eH)) | 0),
              (ee =
                ((ee = (ee + Math.imul(ex, eK)) | 0) + Math.imul(eM, eH)) | 0),
              (et = (et + Math.imul(eM, eK)) | 0),
              (Q = (Q + Math.imul(ev, eV)) | 0),
              (ee =
                ((ee = (ee + Math.imul(ev, eZ)) | 0) + Math.imul(e_, eV)) | 0),
              (et = (et + Math.imul(e_, eZ)) | 0),
              (Q = (Q + Math.imul(em, eX)) | 0),
              (ee =
                ((ee = (ee + Math.imul(em, e$)) | 0) + Math.imul(eg, eX)) | 0),
              (et = (et + Math.imul(eg, e$)) | 0),
              (Q = (Q + Math.imul(el, eJ)) | 0),
              (ee =
                ((ee = (ee + Math.imul(el, eQ)) | 0) + Math.imul(ep, eJ)) | 0),
              (et = (et + Math.imul(ep, eQ)) | 0),
              (Q = (Q + Math.imul(ed, e1)) | 0),
              (ee =
                ((ee = (ee + Math.imul(ed, e2)) | 0) + Math.imul(ec, e1)) | 0),
              (et = (et + Math.imul(ec, e2)) | 0),
              (Q = (Q + Math.imul(eo, e3)) | 0));
            var th =
              (((ea + Q) | 0) +
                ((8191 &
                  (ee =
                    ((ee = (ee + Math.imul(eo, e4)) | 0) + Math.imul(es, e3)) |
                    0)) <<
                  13)) |
              0;
            ((ea =
              ((((et = (et + Math.imul(es, e4)) | 0) + (ee >>> 13)) | 0) +
                (th >>> 26)) |
              0),
              (th &= 0x3ffffff),
              (Q = Math.imul(eT, eD)),
              (ee = ((ee = Math.imul(eT, eL)) + Math.imul(eP, eD)) | 0),
              (et = Math.imul(eP, eL)),
              (Q = (Q + Math.imul(eR, eU)) | 0),
              (ee =
                ((ee = (ee + Math.imul(eR, ez)) | 0) + Math.imul(eI, eU)) | 0),
              (et = (et + Math.imul(eI, ez)) | 0),
              (Q = (Q + Math.imul(eE, eH)) | 0),
              (ee =
                ((ee = (ee + Math.imul(eE, eK)) | 0) + Math.imul(ek, eH)) | 0),
              (et = (et + Math.imul(ek, eK)) | 0),
              (Q = (Q + Math.imul(ex, eV)) | 0),
              (ee =
                ((ee = (ee + Math.imul(ex, eZ)) | 0) + Math.imul(eM, eV)) | 0),
              (et = (et + Math.imul(eM, eZ)) | 0),
              (Q = (Q + Math.imul(ev, eX)) | 0),
              (ee =
                ((ee = (ee + Math.imul(ev, e$)) | 0) + Math.imul(e_, eX)) | 0),
              (et = (et + Math.imul(e_, e$)) | 0),
              (Q = (Q + Math.imul(em, eJ)) | 0),
              (ee =
                ((ee = (ee + Math.imul(em, eQ)) | 0) + Math.imul(eg, eJ)) | 0),
              (et = (et + Math.imul(eg, eQ)) | 0),
              (Q = (Q + Math.imul(el, e1)) | 0),
              (ee =
                ((ee = (ee + Math.imul(el, e2)) | 0) + Math.imul(ep, e1)) | 0),
              (et = (et + Math.imul(ep, e2)) | 0),
              (Q = (Q + Math.imul(ed, e3)) | 0),
              (ee =
                ((ee = (ee + Math.imul(ed, e4)) | 0) + Math.imul(ec, e3)) | 0),
              (et = (et + Math.imul(ec, e4)) | 0),
              (Q = (Q + Math.imul(eo, e5)) | 0));
            var td =
              (((ea + Q) | 0) +
                ((8191 &
                  (ee =
                    ((ee = (ee + Math.imul(eo, e9)) | 0) + Math.imul(es, e5)) |
                    0)) <<
                  13)) |
              0;
            ((ea =
              ((((et = (et + Math.imul(es, e9)) | 0) + (ee >>> 13)) | 0) +
                (td >>> 26)) |
              0),
              (td &= 0x3ffffff),
              (Q = Math.imul(eC, eD)),
              (ee = ((ee = Math.imul(eC, eL)) + Math.imul(eN, eD)) | 0),
              (et = Math.imul(eN, eL)),
              (Q = (Q + Math.imul(eT, eU)) | 0),
              (ee =
                ((ee = (ee + Math.imul(eT, ez)) | 0) + Math.imul(eP, eU)) | 0),
              (et = (et + Math.imul(eP, ez)) | 0),
              (Q = (Q + Math.imul(eR, eH)) | 0),
              (ee =
                ((ee = (ee + Math.imul(eR, eK)) | 0) + Math.imul(eI, eH)) | 0),
              (et = (et + Math.imul(eI, eK)) | 0),
              (Q = (Q + Math.imul(eE, eV)) | 0),
              (ee =
                ((ee = (ee + Math.imul(eE, eZ)) | 0) + Math.imul(ek, eV)) | 0),
              (et = (et + Math.imul(ek, eZ)) | 0),
              (Q = (Q + Math.imul(ex, eX)) | 0),
              (ee =
                ((ee = (ee + Math.imul(ex, e$)) | 0) + Math.imul(eM, eX)) | 0),
              (et = (et + Math.imul(eM, e$)) | 0),
              (Q = (Q + Math.imul(ev, eJ)) | 0),
              (ee =
                ((ee = (ee + Math.imul(ev, eQ)) | 0) + Math.imul(e_, eJ)) | 0),
              (et = (et + Math.imul(e_, eQ)) | 0),
              (Q = (Q + Math.imul(em, e1)) | 0),
              (ee =
                ((ee = (ee + Math.imul(em, e2)) | 0) + Math.imul(eg, e1)) | 0),
              (et = (et + Math.imul(eg, e2)) | 0),
              (Q = (Q + Math.imul(el, e3)) | 0),
              (ee =
                ((ee = (ee + Math.imul(el, e4)) | 0) + Math.imul(ep, e3)) | 0),
              (et = (et + Math.imul(ep, e4)) | 0),
              (Q = (Q + Math.imul(ed, e5)) | 0),
              (ee =
                ((ee = (ee + Math.imul(ed, e9)) | 0) + Math.imul(ec, e5)) | 0),
              (et = (et + Math.imul(ec, e9)) | 0),
              (Q = (Q + Math.imul(eo, te)) | 0));
            var tc =
              (((ea + Q) | 0) +
                ((8191 &
                  (ee =
                    ((ee = (ee + Math.imul(eo, tt)) | 0) + Math.imul(es, te)) |
                    0)) <<
                  13)) |
              0;
            ((ea =
              ((((et = (et + Math.imul(es, tt)) | 0) + (ee >>> 13)) | 0) +
                (tc >>> 26)) |
              0),
              (tc &= 0x3ffffff),
              (Q = Math.imul(eC, eU)),
              (ee = ((ee = Math.imul(eC, ez)) + Math.imul(eN, eU)) | 0),
              (et = Math.imul(eN, ez)),
              (Q = (Q + Math.imul(eT, eH)) | 0),
              (ee =
                ((ee = (ee + Math.imul(eT, eK)) | 0) + Math.imul(eP, eH)) | 0),
              (et = (et + Math.imul(eP, eK)) | 0),
              (Q = (Q + Math.imul(eR, eV)) | 0),
              (ee =
                ((ee = (ee + Math.imul(eR, eZ)) | 0) + Math.imul(eI, eV)) | 0),
              (et = (et + Math.imul(eI, eZ)) | 0),
              (Q = (Q + Math.imul(eE, eX)) | 0),
              (ee =
                ((ee = (ee + Math.imul(eE, e$)) | 0) + Math.imul(ek, eX)) | 0),
              (et = (et + Math.imul(ek, e$)) | 0),
              (Q = (Q + Math.imul(ex, eJ)) | 0),
              (ee =
                ((ee = (ee + Math.imul(ex, eQ)) | 0) + Math.imul(eM, eJ)) | 0),
              (et = (et + Math.imul(eM, eQ)) | 0),
              (Q = (Q + Math.imul(ev, e1)) | 0),
              (ee =
                ((ee = (ee + Math.imul(ev, e2)) | 0) + Math.imul(e_, e1)) | 0),
              (et = (et + Math.imul(e_, e2)) | 0),
              (Q = (Q + Math.imul(em, e3)) | 0),
              (ee =
                ((ee = (ee + Math.imul(em, e4)) | 0) + Math.imul(eg, e3)) | 0),
              (et = (et + Math.imul(eg, e4)) | 0),
              (Q = (Q + Math.imul(el, e5)) | 0),
              (ee =
                ((ee = (ee + Math.imul(el, e9)) | 0) + Math.imul(ep, e5)) | 0),
              (et = (et + Math.imul(ep, e9)) | 0),
              (Q = (Q + Math.imul(ed, te)) | 0));
            var tu =
              (((ea + Q) | 0) +
                ((8191 &
                  (ee =
                    ((ee = (ee + Math.imul(ed, tt)) | 0) + Math.imul(ec, te)) |
                    0)) <<
                  13)) |
              0;
            ((ea =
              ((((et = (et + Math.imul(ec, tt)) | 0) + (ee >>> 13)) | 0) +
                (tu >>> 26)) |
              0),
              (tu &= 0x3ffffff),
              (Q = Math.imul(eC, eH)),
              (ee = ((ee = Math.imul(eC, eK)) + Math.imul(eN, eH)) | 0),
              (et = Math.imul(eN, eK)),
              (Q = (Q + Math.imul(eT, eV)) | 0),
              (ee =
                ((ee = (ee + Math.imul(eT, eZ)) | 0) + Math.imul(eP, eV)) | 0),
              (et = (et + Math.imul(eP, eZ)) | 0),
              (Q = (Q + Math.imul(eR, eX)) | 0),
              (ee =
                ((ee = (ee + Math.imul(eR, e$)) | 0) + Math.imul(eI, eX)) | 0),
              (et = (et + Math.imul(eI, e$)) | 0),
              (Q = (Q + Math.imul(eE, eJ)) | 0),
              (ee =
                ((ee = (ee + Math.imul(eE, eQ)) | 0) + Math.imul(ek, eJ)) | 0),
              (et = (et + Math.imul(ek, eQ)) | 0),
              (Q = (Q + Math.imul(ex, e1)) | 0),
              (ee =
                ((ee = (ee + Math.imul(ex, e2)) | 0) + Math.imul(eM, e1)) | 0),
              (et = (et + Math.imul(eM, e2)) | 0),
              (Q = (Q + Math.imul(ev, e3)) | 0),
              (ee =
                ((ee = (ee + Math.imul(ev, e4)) | 0) + Math.imul(e_, e3)) | 0),
              (et = (et + Math.imul(e_, e4)) | 0),
              (Q = (Q + Math.imul(em, e5)) | 0),
              (ee =
                ((ee = (ee + Math.imul(em, e9)) | 0) + Math.imul(eg, e5)) | 0),
              (et = (et + Math.imul(eg, e9)) | 0),
              (Q = (Q + Math.imul(el, te)) | 0));
            var tl =
              (((ea + Q) | 0) +
                ((8191 &
                  (ee =
                    ((ee = (ee + Math.imul(el, tt)) | 0) + Math.imul(ep, te)) |
                    0)) <<
                  13)) |
              0;
            ((ea =
              ((((et = (et + Math.imul(ep, tt)) | 0) + (ee >>> 13)) | 0) +
                (tl >>> 26)) |
              0),
              (tl &= 0x3ffffff),
              (Q = Math.imul(eC, eV)),
              (ee = ((ee = Math.imul(eC, eZ)) + Math.imul(eN, eV)) | 0),
              (et = Math.imul(eN, eZ)),
              (Q = (Q + Math.imul(eT, eX)) | 0),
              (ee =
                ((ee = (ee + Math.imul(eT, e$)) | 0) + Math.imul(eP, eX)) | 0),
              (et = (et + Math.imul(eP, e$)) | 0),
              (Q = (Q + Math.imul(eR, eJ)) | 0),
              (ee =
                ((ee = (ee + Math.imul(eR, eQ)) | 0) + Math.imul(eI, eJ)) | 0),
              (et = (et + Math.imul(eI, eQ)) | 0),
              (Q = (Q + Math.imul(eE, e1)) | 0),
              (ee =
                ((ee = (ee + Math.imul(eE, e2)) | 0) + Math.imul(ek, e1)) | 0),
              (et = (et + Math.imul(ek, e2)) | 0),
              (Q = (Q + Math.imul(ex, e3)) | 0),
              (ee =
                ((ee = (ee + Math.imul(ex, e4)) | 0) + Math.imul(eM, e3)) | 0),
              (et = (et + Math.imul(eM, e4)) | 0),
              (Q = (Q + Math.imul(ev, e5)) | 0),
              (ee =
                ((ee = (ee + Math.imul(ev, e9)) | 0) + Math.imul(e_, e5)) | 0),
              (et = (et + Math.imul(e_, e9)) | 0),
              (Q = (Q + Math.imul(em, te)) | 0));
            var tp =
              (((ea + Q) | 0) +
                ((8191 &
                  (ee =
                    ((ee = (ee + Math.imul(em, tt)) | 0) + Math.imul(eg, te)) |
                    0)) <<
                  13)) |
              0;
            ((ea =
              ((((et = (et + Math.imul(eg, tt)) | 0) + (ee >>> 13)) | 0) +
                (tp >>> 26)) |
              0),
              (tp &= 0x3ffffff),
              (Q = Math.imul(eC, eX)),
              (ee = ((ee = Math.imul(eC, e$)) + Math.imul(eN, eX)) | 0),
              (et = Math.imul(eN, e$)),
              (Q = (Q + Math.imul(eT, eJ)) | 0),
              (ee =
                ((ee = (ee + Math.imul(eT, eQ)) | 0) + Math.imul(eP, eJ)) | 0),
              (et = (et + Math.imul(eP, eQ)) | 0),
              (Q = (Q + Math.imul(eR, e1)) | 0),
              (ee =
                ((ee = (ee + Math.imul(eR, e2)) | 0) + Math.imul(eI, e1)) | 0),
              (et = (et + Math.imul(eI, e2)) | 0),
              (Q = (Q + Math.imul(eE, e3)) | 0),
              (ee =
                ((ee = (ee + Math.imul(eE, e4)) | 0) + Math.imul(ek, e3)) | 0),
              (et = (et + Math.imul(ek, e4)) | 0),
              (Q = (Q + Math.imul(ex, e5)) | 0),
              (ee =
                ((ee = (ee + Math.imul(ex, e9)) | 0) + Math.imul(eM, e5)) | 0),
              (et = (et + Math.imul(eM, e9)) | 0),
              (Q = (Q + Math.imul(ev, te)) | 0));
            var tb =
              (((ea + Q) | 0) +
                ((8191 &
                  (ee =
                    ((ee = (ee + Math.imul(ev, tt)) | 0) + Math.imul(e_, te)) |
                    0)) <<
                  13)) |
              0;
            ((ea =
              ((((et = (et + Math.imul(e_, tt)) | 0) + (ee >>> 13)) | 0) +
                (tb >>> 26)) |
              0),
              (tb &= 0x3ffffff),
              (Q = Math.imul(eC, eJ)),
              (ee = ((ee = Math.imul(eC, eQ)) + Math.imul(eN, eJ)) | 0),
              (et = Math.imul(eN, eQ)),
              (Q = (Q + Math.imul(eT, e1)) | 0),
              (ee =
                ((ee = (ee + Math.imul(eT, e2)) | 0) + Math.imul(eP, e1)) | 0),
              (et = (et + Math.imul(eP, e2)) | 0),
              (Q = (Q + Math.imul(eR, e3)) | 0),
              (ee =
                ((ee = (ee + Math.imul(eR, e4)) | 0) + Math.imul(eI, e3)) | 0),
              (et = (et + Math.imul(eI, e4)) | 0),
              (Q = (Q + Math.imul(eE, e5)) | 0),
              (ee =
                ((ee = (ee + Math.imul(eE, e9)) | 0) + Math.imul(ek, e5)) | 0),
              (et = (et + Math.imul(ek, e9)) | 0),
              (Q = (Q + Math.imul(ex, te)) | 0));
            var tm =
              (((ea + Q) | 0) +
                ((8191 &
                  (ee =
                    ((ee = (ee + Math.imul(ex, tt)) | 0) + Math.imul(eM, te)) |
                    0)) <<
                  13)) |
              0;
            ((ea =
              ((((et = (et + Math.imul(eM, tt)) | 0) + (ee >>> 13)) | 0) +
                (tm >>> 26)) |
              0),
              (tm &= 0x3ffffff),
              (Q = Math.imul(eC, e1)),
              (ee = ((ee = Math.imul(eC, e2)) + Math.imul(eN, e1)) | 0),
              (et = Math.imul(eN, e2)),
              (Q = (Q + Math.imul(eT, e3)) | 0),
              (ee =
                ((ee = (ee + Math.imul(eT, e4)) | 0) + Math.imul(eP, e3)) | 0),
              (et = (et + Math.imul(eP, e4)) | 0),
              (Q = (Q + Math.imul(eR, e5)) | 0),
              (ee =
                ((ee = (ee + Math.imul(eR, e9)) | 0) + Math.imul(eI, e5)) | 0),
              (et = (et + Math.imul(eI, e9)) | 0),
              (Q = (Q + Math.imul(eE, te)) | 0));
            var tg =
              (((ea + Q) | 0) +
                ((8191 &
                  (ee =
                    ((ee = (ee + Math.imul(eE, tt)) | 0) + Math.imul(ek, te)) |
                    0)) <<
                  13)) |
              0;
            ((ea =
              ((((et = (et + Math.imul(ek, tt)) | 0) + (ee >>> 13)) | 0) +
                (tg >>> 26)) |
              0),
              (tg &= 0x3ffffff),
              (Q = Math.imul(eC, e3)),
              (ee = ((ee = Math.imul(eC, e4)) + Math.imul(eN, e3)) | 0),
              (et = Math.imul(eN, e4)),
              (Q = (Q + Math.imul(eT, e5)) | 0),
              (ee =
                ((ee = (ee + Math.imul(eT, e9)) | 0) + Math.imul(eP, e5)) | 0),
              (et = (et + Math.imul(eP, e9)) | 0),
              (Q = (Q + Math.imul(eR, te)) | 0));
            var ty =
              (((ea + Q) | 0) +
                ((8191 &
                  (ee =
                    ((ee = (ee + Math.imul(eR, tt)) | 0) + Math.imul(eI, te)) |
                    0)) <<
                  13)) |
              0;
            ((ea =
              ((((et = (et + Math.imul(eI, tt)) | 0) + (ee >>> 13)) | 0) +
                (ty >>> 26)) |
              0),
              (ty &= 0x3ffffff),
              (Q = Math.imul(eC, e5)),
              (ee = ((ee = Math.imul(eC, e9)) + Math.imul(eN, e5)) | 0),
              (et = Math.imul(eN, e9)),
              (Q = (Q + Math.imul(eT, te)) | 0));
            var tv =
              (((ea + Q) | 0) +
                ((8191 &
                  (ee =
                    ((ee = (ee + Math.imul(eT, tt)) | 0) + Math.imul(eP, te)) |
                    0)) <<
                  13)) |
              0;
            ((ea =
              ((((et = (et + Math.imul(eP, tt)) | 0) + (ee >>> 13)) | 0) +
                (tv >>> 26)) |
              0),
              (tv &= 0x3ffffff),
              (Q = Math.imul(eC, te)));
            var t_ =
              (((ea + Q) | 0) +
                ((8191 &
                  (ee = ((ee = Math.imul(eC, tt)) + Math.imul(eN, te)) | 0)) <<
                  13)) |
              0;
            return (
              (ea =
                ((((et = Math.imul(eN, tt)) + (ee >>> 13)) | 0) + (t_ >>> 26)) |
                0),
              (t_ &= 0x3ffffff),
              (en[0] = tr),
              (en[1] = ti),
              (en[2] = tn),
              (en[3] = ta),
              (en[4] = tf),
              (en[5] = to),
              (en[6] = ts),
              (en[7] = th),
              (en[8] = td),
              (en[9] = tc),
              (en[10] = tu),
              (en[11] = tl),
              (en[12] = tp),
              (en[13] = tb),
              (en[14] = tm),
              (en[15] = tg),
              (en[16] = ty),
              (en[17] = tv),
              (en[18] = t_),
              0 !== ea && ((en[19] = ea), J.length++),
              J
            );
          };
          function eu($, Y, J) {
            ((J.negative = Y.negative ^ $.negative),
              (J.length = $.length + Y.length));
            for (var Q = 0, ee = 0, et = 0; et < J.length - 1; et++) {
              var er = ee;
              ee = 0;
              for (
                var ei = 0x3ffffff & Q,
                  en = Math.min(et, Y.length - 1),
                  ea = Math.max(0, et - $.length + 1);
                ea <= en;
                ea++
              ) {
                var ef = et - ea,
                  eo = (0 | $.words[ef]) * (0 | Y.words[ea]),
                  es = 0x3ffffff & eo;
                ((er = (er + ((eo / 0x4000000) | 0)) | 0),
                  (ei = 0x3ffffff & (es = (es + ei) | 0)),
                  (ee += (er = (er + (es >>> 26)) | 0) >>> 26),
                  (er &= 0x3ffffff));
              }
              ((J.words[et] = ei), (Q = er), (er = ee));
            }
            return (0 !== Q ? (J.words[et] = Q) : J.length--, J._strip());
          }
          function el($, Y) {
            ((this.x = $), (this.y = Y));
          }
          (Math.imul || (ec = ed),
            (et.prototype.mulTo = function ($, Y) {
              var J,
                Q = this.length + $.length;
              return (
                10 === this.length && 10 === $.length
                  ? (J = ec(this, $, Y))
                  : Q < 63
                    ? (J = ed(this, $, Y))
                    : (J = eu(this, $, Y)),
                J
              );
            }),
            (el.prototype.makeRBT = function ($) {
              for (
                var Y = Array($), J = et.prototype._countBits($) - 1, Q = 0;
                Q < $;
                Q++
              )
                Y[Q] = this.revBin(Q, J, $);
              return Y;
            }),
            (el.prototype.revBin = function ($, Y, J) {
              if (0 === $ || $ === J - 1) return $;
              for (var Q = 0, ee = 0; ee < Y; ee++)
                ((Q |= (1 & $) << (Y - ee - 1)), ($ >>= 1));
              return Q;
            }),
            (el.prototype.permute = function ($, Y, J, Q, ee, et) {
              for (var er = 0; er < et; er++)
                ((Q[er] = Y[$[er]]), (ee[er] = J[$[er]]));
            }),
            (el.prototype.transform = function ($, Y, J, Q, ee, et) {
              this.permute(et, $, Y, J, Q, ee);
              for (var er = 1; er < ee; er <<= 1)
                for (
                  var ei = er << 1,
                    en = Math.cos((2 * Math.PI) / ei),
                    ea = Math.sin((2 * Math.PI) / ei),
                    ef = 0;
                  ef < ee;
                  ef += ei
                )
                  for (var eo = en, es = ea, eh = 0; eh < er; eh++) {
                    var ed = J[ef + eh],
                      ec = Q[ef + eh],
                      eu = J[ef + eh + er],
                      el = Q[ef + eh + er],
                      ep = eo * eu - es * el;
                    ((el = eo * el + es * eu),
                      (eu = ep),
                      (J[ef + eh] = ed + eu),
                      (Q[ef + eh] = ec + el),
                      (J[ef + eh + er] = ed - eu),
                      (Q[ef + eh + er] = ec - el),
                      eh !== ei &&
                        ((ep = en * eo - ea * es),
                        (es = en * es + ea * eo),
                        (eo = ep)));
                  }
            }),
            (el.prototype.guessLen13b = function ($, Y) {
              var J = 1 | Math.max(Y, $),
                Q = 1 & J,
                ee = 0;
              for (J = (J / 2) | 0; J; J >>>= 1) ee++;
              return 1 << (ee + 1 + Q);
            }),
            (el.prototype.conjugate = function ($, Y, J) {
              if (!(J <= 1))
                for (var Q = 0; Q < J / 2; Q++) {
                  var ee = $[Q];
                  (($[Q] = $[J - Q - 1]),
                    ($[J - Q - 1] = ee),
                    (ee = Y[Q]),
                    (Y[Q] = -Y[J - Q - 1]),
                    (Y[J - Q - 1] = -ee));
                }
            }),
            (el.prototype.normalize13b = function ($, Y) {
              for (var J = 0, Q = 0; Q < Y / 2; Q++) {
                var ee =
                  8192 * Math.round($[2 * Q + 1] / Y) +
                  Math.round($[2 * Q] / Y) +
                  J;
                (($[Q] = 0x3ffffff & ee),
                  (J = ee < 0x4000000 ? 0 : (ee / 0x4000000) | 0));
              }
              return $;
            }),
            (el.prototype.convert13b = function ($, Y, J, ee) {
              for (var et = 0, er = 0; er < Y; er++)
                ((et += 0 | $[er]),
                  (J[2 * er] = 8191 & et),
                  (et >>>= 13),
                  (J[2 * er + 1] = 8191 & et),
                  (et >>>= 13));
              for (er = 2 * Y; er < ee; ++er) J[er] = 0;
              (Q(0 === et), Q((-8192 & et) == 0));
            }),
            (el.prototype.stub = function ($) {
              for (var Y = Array($), J = 0; J < $; J++) Y[J] = 0;
              return Y;
            }),
            (el.prototype.mulp = function ($, Y, J) {
              var Q = 2 * this.guessLen13b($.length, Y.length),
                ee = this.makeRBT(Q),
                et = this.stub(Q),
                er = Array(Q),
                ei = Array(Q),
                en = Array(Q),
                ea = Array(Q),
                ef = Array(Q),
                eo = Array(Q),
                es = J.words;
              ((es.length = Q),
                this.convert13b($.words, $.length, er, Q),
                this.convert13b(Y.words, Y.length, ea, Q),
                this.transform(er, et, ei, en, Q, ee),
                this.transform(ea, et, ef, eo, Q, ee));
              for (var eh = 0; eh < Q; eh++) {
                var ed = ei[eh] * ef[eh] - en[eh] * eo[eh];
                ((en[eh] = ei[eh] * eo[eh] + en[eh] * ef[eh]), (ei[eh] = ed));
              }
              return (
                this.conjugate(ei, en, Q),
                this.transform(ei, en, es, et, Q, ee),
                this.conjugate(es, et, Q),
                this.normalize13b(es, Q),
                (J.negative = $.negative ^ Y.negative),
                (J.length = $.length + Y.length),
                J._strip()
              );
            }),
            (et.prototype.mul = function ($) {
              var Y = new et(null);
              return (
                (Y.words = Array(this.length + $.length)),
                this.mulTo($, Y)
              );
            }),
            (et.prototype.mulf = function ($) {
              var Y = new et(null);
              return (
                (Y.words = Array(this.length + $.length)),
                eu(this, $, Y)
              );
            }),
            (et.prototype.imul = function ($) {
              return this.clone().mulTo($, this);
            }),
            (et.prototype.imuln = function ($) {
              var Y = $ < 0;
              (Y && ($ = -$), Q("number" == typeof $), Q($ < 0x4000000));
              for (var J = 0, ee = 0; ee < this.length; ee++) {
                var et = (0 | this.words[ee]) * $,
                  er = (0x3ffffff & et) + (0x3ffffff & J);
                ((J >>= 26),
                  (J += ((et / 0x4000000) | 0) + (er >>> 26)),
                  (this.words[ee] = 0x3ffffff & er));
              }
              return (
                0 !== J && ((this.words[ee] = J), this.length++),
                Y ? this.ineg() : this
              );
            }),
            (et.prototype.muln = function ($) {
              return this.clone().imuln($);
            }),
            (et.prototype.sqr = function () {
              return this.mul(this);
            }),
            (et.prototype.isqr = function () {
              return this.imul(this.clone());
            }),
            (et.prototype.pow = function ($) {
              var Y = (function ($) {
                for (var Y = Array($.bitLength()), J = 0; J < Y.length; J++) {
                  var Q = (J / 26) | 0,
                    ee = J % 26;
                  Y[J] = ($.words[Q] >>> ee) & 1;
                }
                return Y;
              })($);
              if (0 === Y.length) return new et(1);
              for (
                var J = this, Q = 0;
                Q < Y.length && 0 === Y[Q];
                Q++, J = J.sqr()
              );
              if (++Q < Y.length)
                for (var ee = J.sqr(); Q < Y.length; Q++, ee = ee.sqr())
                  0 !== Y[Q] && (J = J.mul(ee));
              return J;
            }),
            (et.prototype.iushln = function ($) {
              Q("number" == typeof $ && $ >= 0);
              var Y,
                J = $ % 26,
                ee = ($ - J) / 26,
                et = (0x3ffffff >>> (26 - J)) << (26 - J);
              if (0 !== J) {
                var er = 0;
                for (Y = 0; Y < this.length; Y++) {
                  var ei = this.words[Y] & et,
                    en = ((0 | this.words[Y]) - ei) << J;
                  ((this.words[Y] = en | er), (er = ei >>> (26 - J)));
                }
                er && ((this.words[Y] = er), this.length++);
              }
              if (0 !== ee) {
                for (Y = this.length - 1; Y >= 0; Y--)
                  this.words[Y + ee] = this.words[Y];
                for (Y = 0; Y < ee; Y++) this.words[Y] = 0;
                this.length += ee;
              }
              return this._strip();
            }),
            (et.prototype.ishln = function ($) {
              return (Q(0 === this.negative), this.iushln($));
            }),
            (et.prototype.iushrn = function ($, Y, J) {
              Q("number" == typeof $ && $ >= 0);
              var ee = Y ? (Y - (Y % 26)) / 26 : 0,
                et = $ % 26,
                er = Math.min(($ - et) / 26, this.length),
                ei = 0x3ffffff ^ ((0x3ffffff >>> et) << et);
              if (((ee -= er), (ee = Math.max(0, ee)), J)) {
                for (var en = 0; en < er; en++) J.words[en] = this.words[en];
                J.length = er;
              }
              if (0 === er);
              else if (this.length > er)
                for (this.length -= er, en = 0; en < this.length; en++)
                  this.words[en] = this.words[en + er];
              else ((this.words[0] = 0), (this.length = 1));
              var ea = 0;
              for (
                en = this.length - 1;
                en >= 0 && (0 !== ea || en >= ee);
                en--
              ) {
                var ef = 0 | this.words[en];
                ((this.words[en] = (ea << (26 - et)) | (ef >>> et)),
                  (ea = ef & ei));
              }
              return (
                J && 0 !== ea && (J.words[J.length++] = ea),
                0 === this.length && ((this.words[0] = 0), (this.length = 1)),
                this._strip()
              );
            }),
            (et.prototype.ishrn = function ($, Y, J) {
              return (Q(0 === this.negative), this.iushrn($, Y, J));
            }),
            (et.prototype.shln = function ($) {
              return this.clone().ishln($);
            }),
            (et.prototype.ushln = function ($) {
              return this.clone().iushln($);
            }),
            (et.prototype.shrn = function ($) {
              return this.clone().ishrn($);
            }),
            (et.prototype.ushrn = function ($) {
              return this.clone().iushrn($);
            }),
            (et.prototype.testn = function ($) {
              Q("number" == typeof $ && $ >= 0);
              var Y = $ % 26,
                J = ($ - Y) / 26;
              return !(this.length <= J) && !!(this.words[J] & (1 << Y));
            }),
            (et.prototype.imaskn = function ($) {
              Q("number" == typeof $ && $ >= 0);
              var Y = $ % 26,
                J = ($ - Y) / 26;
              return (Q(
                0 === this.negative,
                "imaskn works only with positive numbers",
              ),
              this.length <= J)
                ? this
                : (0 !== Y && J++,
                  (this.length = Math.min(J, this.length)),
                  0 !== Y &&
                    (this.words[this.length - 1] &=
                      0x3ffffff ^ ((0x3ffffff >>> Y) << Y)),
                  this._strip());
            }),
            (et.prototype.maskn = function ($) {
              return this.clone().imaskn($);
            }),
            (et.prototype.iaddn = function ($) {
              return (Q("number" == typeof $), Q($ < 0x4000000), $ < 0)
                ? this.isubn(-$)
                : 0 !== this.negative
                  ? (1 === this.length && (0 | this.words[0]) <= $
                      ? ((this.words[0] = $ - (0 | this.words[0])),
                        (this.negative = 0))
                      : ((this.negative = 0),
                        this.isubn($),
                        (this.negative = 1)),
                    this)
                  : this._iaddn($);
            }),
            (et.prototype._iaddn = function ($) {
              this.words[0] += $;
              for (
                var Y = 0;
                Y < this.length && this.words[Y] >= 0x4000000;
                Y++
              )
                ((this.words[Y] -= 0x4000000),
                  Y === this.length - 1
                    ? (this.words[Y + 1] = 1)
                    : this.words[Y + 1]++);
              return ((this.length = Math.max(this.length, Y + 1)), this);
            }),
            (et.prototype.isubn = function ($) {
              if ((Q("number" == typeof $), Q($ < 0x4000000), $ < 0))
                return this.iaddn(-$);
              if (0 !== this.negative)
                return (
                  (this.negative = 0),
                  this.iaddn($),
                  (this.negative = 1),
                  this
                );
              if (
                ((this.words[0] -= $), 1 === this.length && this.words[0] < 0)
              )
                ((this.words[0] = -this.words[0]), (this.negative = 1));
              else
                for (var Y = 0; Y < this.length && this.words[Y] < 0; Y++)
                  ((this.words[Y] += 0x4000000), (this.words[Y + 1] -= 1));
              return this._strip();
            }),
            (et.prototype.addn = function ($) {
              return this.clone().iaddn($);
            }),
            (et.prototype.subn = function ($) {
              return this.clone().isubn($);
            }),
            (et.prototype.iabs = function () {
              return ((this.negative = 0), this);
            }),
            (et.prototype.abs = function () {
              return this.clone().iabs();
            }),
            (et.prototype._ishlnsubmul = function ($, Y, J) {
              var ee,
                et,
                er = $.length + J;
              this._expand(er);
              var ei = 0;
              for (ee = 0; ee < $.length; ee++) {
                et = (0 | this.words[ee + J]) + ei;
                var en = (0 | $.words[ee]) * Y;
                ((et -= 0x3ffffff & en),
                  (ei = (et >> 26) - ((en / 0x4000000) | 0)),
                  (this.words[ee + J] = 0x3ffffff & et));
              }
              for (; ee < this.length - J; ee++)
                ((ei = (et = (0 | this.words[ee + J]) + ei) >> 26),
                  (this.words[ee + J] = 0x3ffffff & et));
              if (0 === ei) return this._strip();
              for (Q(-1 === ei), ei = 0, ee = 0; ee < this.length; ee++)
                ((ei = (et = -(0 | this.words[ee]) + ei) >> 26),
                  (this.words[ee] = 0x3ffffff & et));
              return ((this.negative = 1), this._strip());
            }),
            (et.prototype._wordDiv = function ($, Y) {
              var J,
                Q = this.length - $.length,
                ee = this.clone(),
                er = $,
                ei = 0 | er.words[er.length - 1];
              0 != (Q = 26 - this._countBits(ei)) &&
                ((er = er.ushln(Q)),
                ee.iushln(Q),
                (ei = 0 | er.words[er.length - 1]));
              var en = ee.length - er.length;
              if ("mod" !== Y) {
                (((J = new et(null)).length = en + 1),
                  (J.words = Array(J.length)));
                for (var ea = 0; ea < J.length; ea++) J.words[ea] = 0;
              }
              var ef = ee.clone()._ishlnsubmul(er, 1, en);
              0 === ef.negative && ((ee = ef), J && (J.words[en] = 1));
              for (var eo = en - 1; eo >= 0; eo--) {
                var es =
                  (0 | ee.words[er.length + eo]) * 0x4000000 +
                  (0 | ee.words[er.length + eo - 1]);
                for (
                  es = Math.min((es / ei) | 0, 0x3ffffff),
                    ee._ishlnsubmul(er, es, eo);
                  0 !== ee.negative;

                )
                  (es--,
                    (ee.negative = 0),
                    ee._ishlnsubmul(er, 1, eo),
                    ee.isZero() || (ee.negative ^= 1));
                J && (J.words[eo] = es);
              }
              return (
                J && J._strip(),
                ee._strip(),
                "div" !== Y && 0 !== Q && ee.iushrn(Q),
                { div: J || null, mod: ee }
              );
            }),
            (et.prototype.divmod = function ($, Y, J) {
              var ee, er, ei;
              return (Q(!$.isZero()), this.isZero())
                ? { div: new et(0), mod: new et(0) }
                : 0 !== this.negative && 0 === $.negative
                  ? ((ei = this.neg().divmod($, Y)),
                    "mod" !== Y && (ee = ei.div.neg()),
                    "div" !== Y &&
                      ((er = ei.mod.neg()),
                      J && 0 !== er.negative && er.iadd($)),
                    { div: ee, mod: er })
                  : 0 === this.negative && 0 !== $.negative
                    ? ((ei = this.divmod($.neg(), Y)),
                      "mod" !== Y && (ee = ei.div.neg()),
                      { div: ee, mod: ei.mod })
                    : (this.negative & $.negative) != 0
                      ? ((ei = this.neg().divmod($.neg(), Y)),
                        "div" !== Y &&
                          ((er = ei.mod.neg()),
                          J && 0 !== er.negative && er.isub($)),
                        { div: ei.div, mod: er })
                      : $.length > this.length || 0 > this.cmp($)
                        ? { div: new et(0), mod: this }
                        : 1 === $.length
                          ? "div" === Y
                            ? { div: this.divn($.words[0]), mod: null }
                            : "mod" === Y
                              ? {
                                  div: null,
                                  mod: new et(this.modrn($.words[0])),
                                }
                              : {
                                  div: this.divn($.words[0]),
                                  mod: new et(this.modrn($.words[0])),
                                }
                          : this._wordDiv($, Y);
            }),
            (et.prototype.div = function ($) {
              return this.divmod($, "div", !1).div;
            }),
            (et.prototype.mod = function ($) {
              return this.divmod($, "mod", !1).mod;
            }),
            (et.prototype.umod = function ($) {
              return this.divmod($, "mod", !0).mod;
            }),
            (et.prototype.divRound = function ($) {
              var Y = this.divmod($);
              if (Y.mod.isZero()) return Y.div;
              var J = 0 !== Y.div.negative ? Y.mod.isub($) : Y.mod,
                Q = $.ushrn(1),
                ee = $.andln(1),
                et = J.cmp(Q);
              return et < 0 || (1 === ee && 0 === et)
                ? Y.div
                : 0 !== Y.div.negative
                  ? Y.div.isubn(1)
                  : Y.div.iaddn(1);
            }),
            (et.prototype.modrn = function ($) {
              var Y = $ < 0;
              (Y && ($ = -$), Q($ <= 0x3ffffff));
              for (
                var J = 0x4000000 % $, ee = 0, et = this.length - 1;
                et >= 0;
                et--
              )
                ee = (J * ee + (0 | this.words[et])) % $;
              return Y ? -ee : ee;
            }),
            (et.prototype.modn = function ($) {
              return this.modrn($);
            }),
            (et.prototype.idivn = function ($) {
              var Y = $ < 0;
              (Y && ($ = -$), Q($ <= 0x3ffffff));
              for (var J = 0, ee = this.length - 1; ee >= 0; ee--) {
                var et = (0 | this.words[ee]) + 0x4000000 * J;
                ((this.words[ee] = (et / $) | 0), (J = et % $));
              }
              return (this._strip(), Y ? this.ineg() : this);
            }),
            (et.prototype.divn = function ($) {
              return this.clone().idivn($);
            }),
            (et.prototype.egcd = function ($) {
              (Q(0 === $.negative), Q(!$.isZero()));
              var Y = this,
                J = $.clone();
              Y = 0 !== Y.negative ? Y.umod($) : Y.clone();
              for (
                var ee = new et(1),
                  er = new et(0),
                  ei = new et(0),
                  en = new et(1),
                  ea = 0;
                Y.isEven() && J.isEven();

              )
                (Y.iushrn(1), J.iushrn(1), ++ea);
              for (var ef = J.clone(), eo = Y.clone(); !Y.isZero(); ) {
                for (
                  var es = 0, eh = 1;
                  (Y.words[0] & eh) == 0 && es < 26;
                  ++es, eh <<= 1
                );
                if (es > 0)
                  for (Y.iushrn(es); es-- > 0; )
                    ((ee.isOdd() || er.isOdd()) && (ee.iadd(ef), er.isub(eo)),
                      ee.iushrn(1),
                      er.iushrn(1));
                for (
                  var ed = 0, ec = 1;
                  (J.words[0] & ec) == 0 && ed < 26;
                  ++ed, ec <<= 1
                );
                if (ed > 0)
                  for (J.iushrn(ed); ed-- > 0; )
                    ((ei.isOdd() || en.isOdd()) && (ei.iadd(ef), en.isub(eo)),
                      ei.iushrn(1),
                      en.iushrn(1));
                Y.cmp(J) >= 0
                  ? (Y.isub(J), ee.isub(ei), er.isub(en))
                  : (J.isub(Y), ei.isub(ee), en.isub(er));
              }
              return { a: ei, b: en, gcd: J.iushln(ea) };
            }),
            (et.prototype._invmp = function ($) {
              (Q(0 === $.negative), Q(!$.isZero()));
              var Y,
                J = this,
                ee = $.clone();
              J = 0 !== J.negative ? J.umod($) : J.clone();
              for (
                var er = new et(1), ei = new et(0), en = ee.clone();
                J.cmpn(1) > 0 && ee.cmpn(1) > 0;

              ) {
                for (
                  var ea = 0, ef = 1;
                  (J.words[0] & ef) == 0 && ea < 26;
                  ++ea, ef <<= 1
                );
                if (ea > 0)
                  for (J.iushrn(ea); ea-- > 0; )
                    (er.isOdd() && er.iadd(en), er.iushrn(1));
                for (
                  var eo = 0, es = 1;
                  (ee.words[0] & es) == 0 && eo < 26;
                  ++eo, es <<= 1
                );
                if (eo > 0)
                  for (ee.iushrn(eo); eo-- > 0; )
                    (ei.isOdd() && ei.iadd(en), ei.iushrn(1));
                J.cmp(ee) >= 0
                  ? (J.isub(ee), er.isub(ei))
                  : (ee.isub(J), ei.isub(er));
              }
              return (
                0 > (Y = 0 === J.cmpn(1) ? er : ei).cmpn(0) && Y.iadd($),
                Y
              );
            }),
            (et.prototype.gcd = function ($) {
              if (this.isZero()) return $.abs();
              if ($.isZero()) return this.abs();
              var Y = this.clone(),
                J = $.clone();
              ((Y.negative = 0), (J.negative = 0));
              for (var Q = 0; Y.isEven() && J.isEven(); Q++)
                (Y.iushrn(1), J.iushrn(1));
              for (;;) {
                for (; Y.isEven(); ) Y.iushrn(1);
                for (; J.isEven(); ) J.iushrn(1);
                var ee = Y.cmp(J);
                if (ee < 0) {
                  var et = Y;
                  ((Y = J), (J = et));
                } else if (0 === ee || 0 === J.cmpn(1)) break;
                Y.isub(J);
              }
              return J.iushln(Q);
            }),
            (et.prototype.invm = function ($) {
              return this.egcd($).a.umod($);
            }),
            (et.prototype.isEven = function () {
              return (1 & this.words[0]) == 0;
            }),
            (et.prototype.isOdd = function () {
              return (1 & this.words[0]) == 1;
            }),
            (et.prototype.andln = function ($) {
              return this.words[0] & $;
            }),
            (et.prototype.bincn = function ($) {
              Q("number" == typeof $);
              var Y = $ % 26,
                J = ($ - Y) / 26,
                ee = 1 << Y;
              if (this.length <= J)
                return (this._expand(J + 1), (this.words[J] |= ee), this);
              for (var et = ee, er = J; 0 !== et && er < this.length; er++) {
                var ei = 0 | this.words[er];
                ((ei += et),
                  (et = ei >>> 26),
                  (ei &= 0x3ffffff),
                  (this.words[er] = ei));
              }
              return (0 !== et && ((this.words[er] = et), this.length++), this);
            }),
            (et.prototype.isZero = function () {
              return 1 === this.length && 0 === this.words[0];
            }),
            (et.prototype.cmpn = function ($) {
              var Y,
                J = $ < 0;
              if (0 !== this.negative && !J) return -1;
              if (0 === this.negative && J) return 1;
              if ((this._strip(), this.length > 1)) Y = 1;
              else {
                (J && ($ = -$), Q($ <= 0x3ffffff, "Number is too big"));
                var ee = 0 | this.words[0];
                Y = ee === $ ? 0 : ee < $ ? -1 : 1;
              }
              return 0 !== this.negative ? 0 | -Y : Y;
            }),
            (et.prototype.cmp = function ($) {
              if (0 !== this.negative && 0 === $.negative) return -1;
              if (0 === this.negative && 0 !== $.negative) return 1;
              var Y = this.ucmp($);
              return 0 !== this.negative ? 0 | -Y : Y;
            }),
            (et.prototype.ucmp = function ($) {
              if (this.length > $.length) return 1;
              if (this.length < $.length) return -1;
              for (var Y = 0, J = this.length - 1; J >= 0; J--) {
                var Q = 0 | this.words[J],
                  ee = 0 | $.words[J];
                if (Q !== ee) {
                  Q < ee ? (Y = -1) : Q > ee && (Y = 1);
                  break;
                }
              }
              return Y;
            }),
            (et.prototype.gtn = function ($) {
              return 1 === this.cmpn($);
            }),
            (et.prototype.gt = function ($) {
              return 1 === this.cmp($);
            }),
            (et.prototype.gten = function ($) {
              return this.cmpn($) >= 0;
            }),
            (et.prototype.gte = function ($) {
              return this.cmp($) >= 0;
            }),
            (et.prototype.ltn = function ($) {
              return -1 === this.cmpn($);
            }),
            (et.prototype.lt = function ($) {
              return -1 === this.cmp($);
            }),
            (et.prototype.lten = function ($) {
              return 0 >= this.cmpn($);
            }),
            (et.prototype.lte = function ($) {
              return 0 >= this.cmp($);
            }),
            (et.prototype.eqn = function ($) {
              return 0 === this.cmpn($);
            }),
            (et.prototype.eq = function ($) {
              return 0 === this.cmp($);
            }),
            (et.red = function ($) {
              return new e_($);
            }),
            (et.prototype.toRed = function ($) {
              return (
                Q(!this.red, "Already a number in reduction context"),
                Q(0 === this.negative, "red works only with positives"),
                $.convertTo(this)._forceRed($)
              );
            }),
            (et.prototype.fromRed = function () {
              return (
                Q(
                  this.red,
                  "fromRed works only with numbers in reduction context",
                ),
                this.red.convertFrom(this)
              );
            }),
            (et.prototype._forceRed = function ($) {
              return ((this.red = $), this);
            }),
            (et.prototype.forceRed = function ($) {
              return (
                Q(!this.red, "Already a number in reduction context"),
                this._forceRed($)
              );
            }),
            (et.prototype.redAdd = function ($) {
              return (
                Q(this.red, "redAdd works only with red numbers"),
                this.red.add(this, $)
              );
            }),
            (et.prototype.redIAdd = function ($) {
              return (
                Q(this.red, "redIAdd works only with red numbers"),
                this.red.iadd(this, $)
              );
            }),
            (et.prototype.redSub = function ($) {
              return (
                Q(this.red, "redSub works only with red numbers"),
                this.red.sub(this, $)
              );
            }),
            (et.prototype.redISub = function ($) {
              return (
                Q(this.red, "redISub works only with red numbers"),
                this.red.isub(this, $)
              );
            }),
            (et.prototype.redShl = function ($) {
              return (
                Q(this.red, "redShl works only with red numbers"),
                this.red.shl(this, $)
              );
            }),
            (et.prototype.redMul = function ($) {
              return (
                Q(this.red, "redMul works only with red numbers"),
                this.red._verify2(this, $),
                this.red.mul(this, $)
              );
            }),
            (et.prototype.redIMul = function ($) {
              return (
                Q(this.red, "redMul works only with red numbers"),
                this.red._verify2(this, $),
                this.red.imul(this, $)
              );
            }),
            (et.prototype.redSqr = function () {
              return (
                Q(this.red, "redSqr works only with red numbers"),
                this.red._verify1(this),
                this.red.sqr(this)
              );
            }),
            (et.prototype.redISqr = function () {
              return (
                Q(this.red, "redISqr works only with red numbers"),
                this.red._verify1(this),
                this.red.isqr(this)
              );
            }),
            (et.prototype.redSqrt = function () {
              return (
                Q(this.red, "redSqrt works only with red numbers"),
                this.red._verify1(this),
                this.red.sqrt(this)
              );
            }),
            (et.prototype.redInvm = function () {
              return (
                Q(this.red, "redInvm works only with red numbers"),
                this.red._verify1(this),
                this.red.invm(this)
              );
            }),
            (et.prototype.redNeg = function () {
              return (
                Q(this.red, "redNeg works only with red numbers"),
                this.red._verify1(this),
                this.red.neg(this)
              );
            }),
            (et.prototype.redPow = function ($) {
              return (
                Q(this.red && !$.red, "redPow(normalNum)"),
                this.red._verify1(this),
                this.red.pow(this, $)
              );
            }));
          var ep = { k256: null, p224: null, p192: null, p25519: null };
          function eb($, Y) {
            ((this.name = $),
              (this.p = new et(Y, 16)),
              (this.n = this.p.bitLength()),
              (this.k = new et(1).iushln(this.n).isub(this.p)),
              (this.tmp = this._tmp()));
          }
          function em() {
            eb.call(
              this,
              "k256",
              "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f",
            );
          }
          function eg() {
            eb.call(
              this,
              "p224",
              "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001",
            );
          }
          function ey() {
            eb.call(
              this,
              "p192",
              "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff",
            );
          }
          function ev() {
            eb.call(
              this,
              "25519",
              "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed",
            );
          }
          function e_($) {
            if ("string" == typeof $) {
              var Y = et._prime($);
              ((this.m = Y.p), (this.prime = Y));
            } else
              (Q($.gtn(1), "modulus must be greater than 1"),
                (this.m = $),
                (this.prime = null));
          }
          function ew($) {
            (e_.call(this, $),
              (this.shift = this.m.bitLength()),
              this.shift % 26 != 0 && (this.shift += 26 - (this.shift % 26)),
              (this.r = new et(1).iushln(this.shift)),
              (this.r2 = this.imod(this.r.sqr())),
              (this.rinv = this.r._invmp(this.m)),
              (this.minv = this.rinv.mul(this.r).isubn(1).div(this.m)),
              (this.minv = this.minv.umod(this.r)),
              (this.minv = this.r.sub(this.minv)));
          }
          ((eb.prototype._tmp = function () {
            var $ = new et(null);
            return (($.words = Array(Math.ceil(this.n / 13))), $);
          }),
            (eb.prototype.ireduce = function ($) {
              var Y,
                J = $;
              do
                (this.split(J, this.tmp),
                  (Y = (J = (J = this.imulK(J)).iadd(this.tmp)).bitLength()));
              while (Y > this.n);
              var Q = Y < this.n ? -1 : J.ucmp(this.p);
              return (
                0 === Q
                  ? ((J.words[0] = 0), (J.length = 1))
                  : Q > 0
                    ? J.isub(this.p)
                    : void 0 !== J.strip
                      ? J.strip()
                      : J._strip(),
                J
              );
            }),
            (eb.prototype.split = function ($, Y) {
              $.iushrn(this.n, 0, Y);
            }),
            (eb.prototype.imulK = function ($) {
              return $.imul(this.k);
            }),
            ee(em, eb),
            (em.prototype.split = function ($, Y) {
              for (var J = Math.min($.length, 9), Q = 0; Q < J; Q++)
                Y.words[Q] = $.words[Q];
              if (((Y.length = J), $.length <= 9)) {
                (($.words[0] = 0), ($.length = 1));
                return;
              }
              var ee = $.words[9];
              for (
                Y.words[Y.length++] = 4194303 & ee, Q = 10;
                Q < $.length;
                Q++
              ) {
                var et = 0 | $.words[Q];
                (($.words[Q - 10] = ((4194303 & et) << 4) | (ee >>> 22)),
                  (ee = et));
              }
              ((ee >>>= 22),
                ($.words[Q - 10] = ee),
                0 === ee && $.length > 10 ? ($.length -= 10) : ($.length -= 9));
            }),
            (em.prototype.imulK = function ($) {
              (($.words[$.length] = 0),
                ($.words[$.length + 1] = 0),
                ($.length += 2));
              for (var Y = 0, J = 0; J < $.length; J++) {
                var Q = 0 | $.words[J];
                ((Y += 977 * Q),
                  ($.words[J] = 0x3ffffff & Y),
                  (Y = 64 * Q + ((Y / 0x4000000) | 0)));
              }
              return (
                0 === $.words[$.length - 1] &&
                  ($.length--, 0 === $.words[$.length - 1] && $.length--),
                $
              );
            }),
            ee(eg, eb),
            ee(ey, eb),
            ee(ev, eb),
            (ev.prototype.imulK = function ($) {
              for (var Y = 0, J = 0; J < $.length; J++) {
                var Q = (0 | $.words[J]) * 19 + Y,
                  ee = 0x3ffffff & Q;
                ((Q >>>= 26), ($.words[J] = ee), (Y = Q));
              }
              return (0 !== Y && ($.words[$.length++] = Y), $);
            }),
            (et._prime = function ($) {
              var Y;
              if (ep[$]) return ep[$];
              if ("k256" === $) Y = new em();
              else if ("p224" === $) Y = new eg();
              else if ("p192" === $) Y = new ey();
              else if ("p25519" === $) Y = new ev();
              else throw Error("Unknown prime " + $);
              return ((ep[$] = Y), Y);
            }),
            (e_.prototype._verify1 = function ($) {
              (Q(0 === $.negative, "red works only with positives"),
                Q($.red, "red works only with red numbers"));
            }),
            (e_.prototype._verify2 = function ($, Y) {
              (Q(
                ($.negative | Y.negative) == 0,
                "red works only with positives",
              ),
                Q($.red && $.red === Y.red, "red works only with red numbers"));
            }),
            (e_.prototype.imod = function ($) {
              return this.prime
                ? this.prime.ireduce($)._forceRed(this)
                : (en($, $.umod(this.m)._forceRed(this)), $);
            }),
            (e_.prototype.neg = function ($) {
              return $.isZero() ? $.clone() : this.m.sub($)._forceRed(this);
            }),
            (e_.prototype.add = function ($, Y) {
              this._verify2($, Y);
              var J = $.add(Y);
              return (J.cmp(this.m) >= 0 && J.isub(this.m), J._forceRed(this));
            }),
            (e_.prototype.iadd = function ($, Y) {
              this._verify2($, Y);
              var J = $.iadd(Y);
              return (J.cmp(this.m) >= 0 && J.isub(this.m), J);
            }),
            (e_.prototype.sub = function ($, Y) {
              this._verify2($, Y);
              var J = $.sub(Y);
              return (0 > J.cmpn(0) && J.iadd(this.m), J._forceRed(this));
            }),
            (e_.prototype.isub = function ($, Y) {
              this._verify2($, Y);
              var J = $.isub(Y);
              return (0 > J.cmpn(0) && J.iadd(this.m), J);
            }),
            (e_.prototype.shl = function ($, Y) {
              return (this._verify1($), this.imod($.ushln(Y)));
            }),
            (e_.prototype.imul = function ($, Y) {
              return (this._verify2($, Y), this.imod($.imul(Y)));
            }),
            (e_.prototype.mul = function ($, Y) {
              return (this._verify2($, Y), this.imod($.mul(Y)));
            }),
            (e_.prototype.isqr = function ($) {
              return this.imul($, $.clone());
            }),
            (e_.prototype.sqr = function ($) {
              return this.mul($, $);
            }),
            (e_.prototype.sqrt = function ($) {
              if ($.isZero()) return $.clone();
              var Y = this.m.andln(3);
              if ((Q(Y % 2 == 1), 3 === Y)) {
                var J = this.m.add(new et(1)).iushrn(2);
                return this.pow($, J);
              }
              for (
                var ee = this.m.subn(1), er = 0;
                !ee.isZero() && 0 === ee.andln(1);

              )
                (er++, ee.iushrn(1));
              Q(!ee.isZero());
              var ei = new et(1).toRed(this),
                en = ei.redNeg(),
                ea = this.m.subn(1).iushrn(1),
                ef = this.m.bitLength();
              for (
                ef = new et(2 * ef * ef).toRed(this);
                0 !== this.pow(ef, ea).cmp(en);

              )
                ef.redIAdd(en);
              for (
                var eo = this.pow(ef, ee),
                  es = this.pow($, ee.addn(1).iushrn(1)),
                  eh = this.pow($, ee),
                  ed = er;
                0 !== eh.cmp(ei);

              ) {
                for (var ec = eh, eu = 0; 0 !== ec.cmp(ei); eu++)
                  ec = ec.redSqr();
                Q(eu < ed);
                var el = this.pow(eo, new et(1).iushln(ed - eu - 1));
                ((es = es.redMul(el)),
                  (eo = el.redSqr()),
                  (eh = eh.redMul(eo)),
                  (ed = eu));
              }
              return es;
            }),
            (e_.prototype.invm = function ($) {
              var Y = $._invmp(this.m);
              return 0 !== Y.negative
                ? ((Y.negative = 0), this.imod(Y).redNeg())
                : this.imod(Y);
            }),
            (e_.prototype.pow = function ($, Y) {
              if (Y.isZero()) return new et(1).toRed(this);
              if (0 === Y.cmpn(1)) return $.clone();
              var J = Array(16);
              ((J[0] = new et(1).toRed(this)), (J[1] = $));
              for (var Q = 2; Q < J.length; Q++) J[Q] = this.mul(J[Q - 1], $);
              var ee = J[0],
                er = 0,
                ei = 0,
                en = Y.bitLength() % 26;
              for (0 === en && (en = 26), Q = Y.length - 1; Q >= 0; Q--) {
                for (var ea = Y.words[Q], ef = en - 1; ef >= 0; ef--) {
                  var eo = (ea >> ef) & 1;
                  if (
                    (ee !== J[0] && (ee = this.sqr(ee)), 0 === eo && 0 === er)
                  ) {
                    ei = 0;
                    continue;
                  }
                  ((er <<= 1),
                    (er |= eo),
                    (4 == ++ei || (0 === Q && 0 === ef)) &&
                      ((ee = this.mul(ee, J[er])), (ei = 0), (er = 0)));
                }
                en = 26;
              }
              return ee;
            }),
            (e_.prototype.convertTo = function ($) {
              var Y = $.umod(this.m);
              return Y === $ ? Y.clone() : Y;
            }),
            (e_.prototype.convertFrom = function ($) {
              var Y = $.clone();
              return ((Y.red = null), Y);
            }),
            (et.mont = function ($) {
              return new ew($);
            }),
            ee(ew, e_),
            (ew.prototype.convertTo = function ($) {
              return this.imod($.ushln(this.shift));
            }),
            (ew.prototype.convertFrom = function ($) {
              var Y = this.imod($.mul(this.rinv));
              return ((Y.red = null), Y);
            }),
            (ew.prototype.imul = function ($, Y) {
              if ($.isZero() || Y.isZero())
                return (($.words[0] = 0), ($.length = 1), $);
              var J = $.imul(Y),
                Q = J.maskn(this.shift)
                  .mul(this.minv)
                  .imaskn(this.shift)
                  .mul(this.m),
                ee = J.isub(Q).iushrn(this.shift),
                et = ee;
              return (
                ee.cmp(this.m) >= 0
                  ? (et = ee.isub(this.m))
                  : 0 > ee.cmpn(0) && (et = ee.iadd(this.m)),
                et._forceRed(this)
              );
            }),
            (ew.prototype.mul = function ($, Y) {
              if ($.isZero() || Y.isZero()) return new et(0)._forceRed(this);
              var J = $.mul(Y),
                Q = J.maskn(this.shift)
                  .mul(this.minv)
                  .imaskn(this.shift)
                  .mul(this.m),
                ee = J.isub(Q).iushrn(this.shift),
                er = ee;
              return (
                ee.cmp(this.m) >= 0
                  ? (er = ee.isub(this.m))
                  : 0 > ee.cmpn(0) && (er = ee.iadd(this.m)),
                er._forceRed(this)
              );
            }),
            (ew.prototype.invm = function ($) {
              return this.imod($._invmp(this.m).mul(this.r2))._forceRed(this);
            }));
        })(($ = J.nmd($)), this);
      },
      4259: function ($, Y, J) {
        var Q;
        function ee($) {
          this.rand = $;
        }
        if (
          (($.exports = function ($) {
            return (Q || (Q = new ee(null)), Q.generate($));
          }),
          ($.exports.Rand = ee),
          (ee.prototype.generate = function ($) {
            return this._rand($);
          }),
          (ee.prototype._rand = function ($) {
            if (this.rand.getBytes) return this.rand.getBytes($);
            for (var Y = new Uint8Array($), J = 0; J < Y.length; J++)
              Y[J] = this.rand.getByte();
            return Y;
          }),
          "object" == typeof self)
        )
          self.crypto && self.crypto.getRandomValues
            ? (ee.prototype._rand = function ($) {
                var Y = new Uint8Array($);
                return (self.crypto.getRandomValues(Y), Y);
              })
            : self.msCrypto && self.msCrypto.getRandomValues
              ? (ee.prototype._rand = function ($) {
                  var Y = new Uint8Array($);
                  return (self.msCrypto.getRandomValues(Y), Y);
                })
              : "object" == typeof window &&
                (ee.prototype._rand = function () {
                  throw Error("Not implemented yet");
                });
        else
          try {
            var et = J(6982);
            if ("function" != typeof et.randomBytes)
              throw Error("Not supported");
            ee.prototype._rand = function ($) {
              return et.randomBytes($);
            };
          } catch ($) {}
      },
      6313: function ($, Y, J) {
        var Q = J(5725).Buffer;
        function ee($) {
          Q.isBuffer($) || ($ = Q.from($));
          for (var Y = ($.length / 4) | 0, J = Array(Y), ee = 0; ee < Y; ee++)
            J[ee] = $.readUInt32BE(4 * ee);
          return J;
        }
        function et($) {
          for (; 0 < $.length; $++) $[0] = 0;
        }
        function er($, Y, J, Q, ee) {
          for (
            var et,
              er,
              ei,
              en,
              ea = J[0],
              ef = J[1],
              eo = J[2],
              es = J[3],
              eh = $[0] ^ Y[0],
              ed = $[1] ^ Y[1],
              ec = $[2] ^ Y[2],
              eu = $[3] ^ Y[3],
              el = 4,
              ep = 1;
            ep < ee;
            ep++
          )
            ((et =
              ea[eh >>> 24] ^
              ef[(ed >>> 16) & 255] ^
              eo[(ec >>> 8) & 255] ^
              es[255 & eu] ^
              Y[el++]),
              (er =
                ea[ed >>> 24] ^
                ef[(ec >>> 16) & 255] ^
                eo[(eu >>> 8) & 255] ^
                es[255 & eh] ^
                Y[el++]),
              (ei =
                ea[ec >>> 24] ^
                ef[(eu >>> 16) & 255] ^
                eo[(eh >>> 8) & 255] ^
                es[255 & ed] ^
                Y[el++]),
              (en =
                ea[eu >>> 24] ^
                ef[(eh >>> 16) & 255] ^
                eo[(ed >>> 8) & 255] ^
                es[255 & ec] ^
                Y[el++]),
              (eh = et),
              (ed = er),
              (ec = ei),
              (eu = en));
          return (
            (et =
              ((Q[eh >>> 24] << 24) |
                (Q[(ed >>> 16) & 255] << 16) |
                (Q[(ec >>> 8) & 255] << 8) |
                Q[255 & eu]) ^
              Y[el++]),
            (er =
              ((Q[ed >>> 24] << 24) |
                (Q[(ec >>> 16) & 255] << 16) |
                (Q[(eu >>> 8) & 255] << 8) |
                Q[255 & eh]) ^
              Y[el++]),
            (ei =
              ((Q[ec >>> 24] << 24) |
                (Q[(eu >>> 16) & 255] << 16) |
                (Q[(eh >>> 8) & 255] << 8) |
                Q[255 & ed]) ^
              Y[el++]),
            [
              (et >>>= 0),
              (er >>>= 0),
              (ei >>>= 0),
              (en =
                (((Q[eu >>> 24] << 24) |
                  (Q[(eh >>> 16) & 255] << 16) |
                  (Q[(ed >>> 8) & 255] << 8) |
                  Q[255 & ec]) ^
                  Y[el++]) >>>
                0),
            ]
          );
        }
        var ei = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54],
          en = (function () {
            for (var $ = Array(256), Y = 0; Y < 256; Y++)
              Y < 128 ? ($[Y] = Y << 1) : ($[Y] = (Y << 1) ^ 283);
            for (
              var J = [],
                Q = [],
                ee = [[], [], [], []],
                et = [[], [], [], []],
                er = 0,
                ei = 0,
                en = 0;
              en < 256;
              ++en
            ) {
              var ea = ei ^ (ei << 1) ^ (ei << 2) ^ (ei << 3) ^ (ei << 4);
              ((ea = (ea >>> 8) ^ (255 & ea) ^ 99), (J[er] = ea), (Q[ea] = er));
              var ef = $[er],
                eo = $[ef],
                es = $[eo],
                eh = (257 * $[ea]) ^ (0x1010100 * ea);
              ((ee[0][er] = (eh << 24) | (eh >>> 8)),
                (ee[1][er] = (eh << 16) | (eh >>> 16)),
                (ee[2][er] = (eh << 8) | (eh >>> 24)),
                (ee[3][er] = eh),
                (eh =
                  (0x1010101 * es) ^
                  (65537 * eo) ^
                  (257 * ef) ^
                  (0x1010100 * er)),
                (et[0][ea] = (eh << 24) | (eh >>> 8)),
                (et[1][ea] = (eh << 16) | (eh >>> 16)),
                (et[2][ea] = (eh << 8) | (eh >>> 24)),
                (et[3][ea] = eh),
                0 === er
                  ? (er = ei = 1)
                  : ((er = ef ^ $[$[$[es ^ ef]]]), (ei ^= $[$[ei]])));
            }
            return { SBOX: J, INV_SBOX: Q, SUB_MIX: ee, INV_SUB_MIX: et };
          })();
        function ea($) {
          ((this._key = ee($)), this._reset());
        }
        ((ea.blockSize = 16),
          (ea.keySize = 32),
          (ea.prototype.blockSize = ea.blockSize),
          (ea.prototype.keySize = ea.keySize),
          (ea.prototype._reset = function () {
            for (
              var $ = this._key,
                Y = $.length,
                J = Y + 6,
                Q = (J + 1) * 4,
                ee = [],
                et = 0;
              et < Y;
              et++
            )
              ee[et] = $[et];
            for (et = Y; et < Q; et++) {
              var er = ee[et - 1];
              (et % Y == 0
                ? ((er = (er << 8) | (er >>> 24)),
                  (er =
                    ((en.SBOX[er >>> 24] << 24) |
                      (en.SBOX[(er >>> 16) & 255] << 16) |
                      (en.SBOX[(er >>> 8) & 255] << 8) |
                      en.SBOX[255 & er]) ^
                    (ei[(et / Y) | 0] << 24)))
                : Y > 6 &&
                  et % Y == 4 &&
                  (er =
                    (en.SBOX[er >>> 24] << 24) |
                    (en.SBOX[(er >>> 16) & 255] << 16) |
                    (en.SBOX[(er >>> 8) & 255] << 8) |
                    en.SBOX[255 & er]),
                (ee[et] = ee[et - Y] ^ er));
            }
            for (var ea = [], ef = 0; ef < Q; ef++) {
              var eo = Q - ef,
                es = ee[eo - (ef % 4 ? 0 : 4)];
              ef < 4 || eo <= 4
                ? (ea[ef] = es)
                : (ea[ef] =
                    en.INV_SUB_MIX[0][en.SBOX[es >>> 24]] ^
                    en.INV_SUB_MIX[1][en.SBOX[(es >>> 16) & 255]] ^
                    en.INV_SUB_MIX[2][en.SBOX[(es >>> 8) & 255]] ^
                    en.INV_SUB_MIX[3][en.SBOX[255 & es]]);
            }
            ((this._nRounds = J),
              (this._keySchedule = ee),
              (this._invKeySchedule = ea));
          }),
          (ea.prototype.encryptBlockRaw = function ($) {
            return er(
              ($ = ee($)),
              this._keySchedule,
              en.SUB_MIX,
              en.SBOX,
              this._nRounds,
            );
          }),
          (ea.prototype.encryptBlock = function ($) {
            var Y = this.encryptBlockRaw($),
              J = Q.allocUnsafe(16);
            return (
              J.writeUInt32BE(Y[0], 0),
              J.writeUInt32BE(Y[1], 4),
              J.writeUInt32BE(Y[2], 8),
              J.writeUInt32BE(Y[3], 12),
              J
            );
          }),
          (ea.prototype.decryptBlock = function ($) {
            var Y = ($ = ee($))[1];
            (($[1] = $[3]), ($[3] = Y));
            var J = er(
                $,
                this._invKeySchedule,
                en.INV_SUB_MIX,
                en.INV_SBOX,
                this._nRounds,
              ),
              et = Q.allocUnsafe(16);
            return (
              et.writeUInt32BE(J[0], 0),
              et.writeUInt32BE(J[3], 4),
              et.writeUInt32BE(J[2], 8),
              et.writeUInt32BE(J[1], 12),
              et
            );
          }),
          (ea.prototype.scrub = function () {
            (et(this._keySchedule), et(this._invKeySchedule), et(this._key));
          }),
          ($.exports.AES = ea));
      },
      1725: function ($, Y, J) {
        var Q = J(6313),
          ee = J(5725).Buffer,
          et = J(1888),
          er = J(1638),
          ei = J(1267),
          en = J(6481),
          ea = J(1995);
        function ef($, Y, J, er) {
          et.call(this);
          var en = ee.alloc(4, 0);
          this._cipher = new Q.AES(Y);
          var ef = this._cipher.encryptBlock(en);
          ((this._ghash = new ei(ef)),
            (J = (function ($, Y, J) {
              if (12 === Y.length)
                return (
                  ($._finID = ee.concat([Y, ee.from([0, 0, 0, 1])])),
                  ee.concat([Y, ee.from([0, 0, 0, 2])])
                );
              var Q = new ei(J),
                et = Y.length,
                er = et % 16;
              (Q.update(Y),
                er && ((er = 16 - er), Q.update(ee.alloc(er, 0))),
                Q.update(ee.alloc(8, 0)));
              var en = ee.alloc(8);
              (en.writeUIntBE(8 * et, 0, 8),
                Q.update(en),
                ($._finID = Q.state));
              var ef = ee.from($._finID);
              return (ea(ef), ef);
            })(this, J, ef)),
            (this._prev = ee.from(J)),
            (this._cache = ee.allocUnsafe(0)),
            (this._secCache = ee.allocUnsafe(0)),
            (this._decrypt = er),
            (this._alen = 0),
            (this._len = 0),
            (this._mode = $),
            (this._authTag = null),
            (this._called = !1));
        }
        (er(ef, et),
          (ef.prototype._update = function ($) {
            if (!this._called && this._alen) {
              var Y = 16 - (this._alen % 16);
              Y < 16 && ((Y = ee.alloc(Y, 0)), this._ghash.update(Y));
            }
            this._called = !0;
            var J = this._mode.encrypt(this, $);
            return (
              this._decrypt ? this._ghash.update($) : this._ghash.update(J),
              (this._len += $.length),
              J
            );
          }),
          (ef.prototype._final = function () {
            if (this._decrypt && !this._authTag)
              throw Error("Unsupported state or unable to authenticate data");
            var $ = en(
              this._ghash.final(8 * this._alen, 8 * this._len),
              this._cipher.encryptBlock(this._finID),
            );
            if (
              this._decrypt &&
              (function ($, Y) {
                var J = 0;
                $.length !== Y.length && J++;
                for (var Q = Math.min($.length, Y.length), ee = 0; ee < Q; ++ee)
                  J += $[ee] ^ Y[ee];
                return J;
              })($, this._authTag)
            )
              throw Error("Unsupported state or unable to authenticate data");
            ((this._authTag = $), this._cipher.scrub());
          }),
          (ef.prototype.getAuthTag = function () {
            if (this._decrypt || !ee.isBuffer(this._authTag))
              throw Error("Attempting to get auth tag in unsupported state");
            return this._authTag;
          }),
          (ef.prototype.setAuthTag = function ($) {
            if (!this._decrypt)
              throw Error("Attempting to set auth tag in unsupported state");
            this._authTag = $;
          }),
          (ef.prototype.setAAD = function ($) {
            if (this._called)
              throw Error("Attempting to set AAD in unsupported state");
            (this._ghash.update($), (this._alen += $.length));
          }),
          ($.exports = ef));
      },
      8642: function ($, Y, J) {
        var Q = J(9780),
          ee = J(7984),
          et = J(3349);
        ((Y.createCipher = Y.Cipher = Q.createCipher),
          (Y.createCipheriv = Y.Cipheriv = Q.createCipheriv),
          (Y.createDecipher = Y.Decipher = ee.createDecipher),
          (Y.createDecipheriv = Y.Decipheriv = ee.createDecipheriv),
          (Y.listCiphers = Y.getCiphers =
            function () {
              return Object.keys(et);
            }));
      },
      7984: function ($, Y, J) {
        var Q = J(1725),
          ee = J(5725).Buffer,
          et = J(8597),
          er = J(959),
          ei = J(1888),
          en = J(6313),
          ea = J(689);
        function ef($, Y, J) {
          (ei.call(this),
            (this._cache = new eo()),
            (this._last = void 0),
            (this._cipher = new en.AES(Y)),
            (this._prev = ee.from(J)),
            (this._mode = $),
            (this._autopadding = !0));
        }
        function eo() {
          this.cache = ee.allocUnsafe(0);
        }
        function es($, Y, J) {
          var ei = et[$.toLowerCase()];
          if (!ei) throw TypeError("invalid suite type");
          if (
            ("string" == typeof J && (J = ee.from(J)),
            "GCM" !== ei.mode && J.length !== ei.iv)
          )
            throw TypeError("invalid iv length " + J.length);
          if (
            ("string" == typeof Y && (Y = ee.from(Y)), Y.length !== ei.key / 8)
          )
            throw TypeError("invalid key length " + Y.length);
          return "stream" === ei.type
            ? new er(ei.module, Y, J, !0)
            : "auth" === ei.type
              ? new Q(ei.module, Y, J, !0)
              : new ef(ei.module, Y, J);
        }
        (J(1638)(ef, ei),
          (ef.prototype._update = function ($) {
            this._cache.add($);
            for (var Y, J, Q = []; (Y = this._cache.get(this._autopadding)); )
              ((J = this._mode.decrypt(this, Y)), Q.push(J));
            return ee.concat(Q);
          }),
          (ef.prototype._final = function () {
            var $ = this._cache.flush();
            if (this._autopadding) {
              var Y = this._mode.decrypt(this, $),
                J = Y[15];
              if (J < 1 || J > 16) throw Error("unable to decrypt data");
              for (var Q = -1; ++Q < J; )
                if (Y[Q + (16 - J)] !== J)
                  throw Error("unable to decrypt data");
              return 16 !== J ? Y.slice(0, 16 - J) : void 0;
            }
            if ($) throw Error("data not multiple of block length");
          }),
          (ef.prototype.setAutoPadding = function ($) {
            return ((this._autopadding = !!$), this);
          }),
          (eo.prototype.add = function ($) {
            this.cache = ee.concat([this.cache, $]);
          }),
          (eo.prototype.get = function ($) {
            var Y;
            if ($) {
              if (this.cache.length > 16)
                return (
                  (Y = this.cache.slice(0, 16)),
                  (this.cache = this.cache.slice(16)),
                  Y
                );
            } else if (this.cache.length >= 16)
              return (
                (Y = this.cache.slice(0, 16)),
                (this.cache = this.cache.slice(16)),
                Y
              );
            return null;
          }),
          (eo.prototype.flush = function () {
            if (this.cache.length) return this.cache;
          }),
          (Y.createDecipher = function ($, Y) {
            var J = et[$.toLowerCase()];
            if (!J) throw TypeError("invalid suite type");
            var Q = ea(Y, !1, J.key, J.iv);
            return es($, Q.key, Q.iv);
          }),
          (Y.createDecipheriv = es));
      },
      9780: function ($, Y, J) {
        var Q = J(8597),
          ee = J(1725),
          et = J(5725).Buffer,
          er = J(959),
          ei = J(1888),
          en = J(6313),
          ea = J(689);
        function ef($, Y, J) {
          (ei.call(this),
            (this._cache = new es()),
            (this._cipher = new en.AES(Y)),
            (this._prev = et.from(J)),
            (this._mode = $),
            (this._autopadding = !0));
        }
        (J(1638)(ef, ei),
          (ef.prototype._update = function ($) {
            this._cache.add($);
            for (var Y, J, Q = []; (Y = this._cache.get()); )
              ((J = this._mode.encrypt(this, Y)), Q.push(J));
            return et.concat(Q);
          }));
        var eo = et.alloc(16, 16);
        function es() {
          this.cache = et.allocUnsafe(0);
        }
        function eh($, Y, J) {
          var ei = Q[$.toLowerCase()];
          if (!ei) throw TypeError("invalid suite type");
          if (
            ("string" == typeof Y && (Y = et.from(Y)), Y.length !== ei.key / 8)
          )
            throw TypeError("invalid key length " + Y.length);
          if (
            ("string" == typeof J && (J = et.from(J)),
            "GCM" !== ei.mode && J.length !== ei.iv)
          )
            throw TypeError("invalid iv length " + J.length);
          return "stream" === ei.type
            ? new er(ei.module, Y, J)
            : "auth" === ei.type
              ? new ee(ei.module, Y, J)
              : new ef(ei.module, Y, J);
        }
        ((ef.prototype._final = function () {
          var $ = this._cache.flush();
          if (this._autopadding)
            return (($ = this._mode.encrypt(this, $)), this._cipher.scrub(), $);
          if (!$.equals(eo))
            throw (
              this._cipher.scrub(),
              Error("data not multiple of block length")
            );
        }),
          (ef.prototype.setAutoPadding = function ($) {
            return ((this._autopadding = !!$), this);
          }),
          (es.prototype.add = function ($) {
            this.cache = et.concat([this.cache, $]);
          }),
          (es.prototype.get = function () {
            if (this.cache.length > 15) {
              var $ = this.cache.slice(0, 16);
              return ((this.cache = this.cache.slice(16)), $);
            }
            return null;
          }),
          (es.prototype.flush = function () {
            for (
              var $ = 16 - this.cache.length, Y = et.allocUnsafe($), J = -1;
              ++J < $;

            )
              Y.writeUInt8($, J);
            return et.concat([this.cache, Y]);
          }),
          (Y.createCipheriv = eh),
          (Y.createCipher = function ($, Y) {
            var J = Q[$.toLowerCase()];
            if (!J) throw TypeError("invalid suite type");
            var ee = ea(Y, !1, J.key, J.iv);
            return eh($, ee.key, ee.iv);
          }));
      },
      1267: function ($, Y, J) {
        var Q = J(5725).Buffer,
          ee = Q.alloc(16, 0);
        function et($) {
          var Y = Q.allocUnsafe(16);
          return (
            Y.writeUInt32BE($[0] >>> 0, 0),
            Y.writeUInt32BE($[1] >>> 0, 4),
            Y.writeUInt32BE($[2] >>> 0, 8),
            Y.writeUInt32BE($[3] >>> 0, 12),
            Y
          );
        }
        function er($) {
          ((this.h = $),
            (this.state = Q.alloc(16, 0)),
            (this.cache = Q.allocUnsafe(0)));
        }
        ((er.prototype.ghash = function ($) {
          for (var Y = -1; ++Y < $.length; ) this.state[Y] ^= $[Y];
          this._multiply();
        }),
          (er.prototype._multiply = function () {
            for (
              var $,
                Y,
                J,
                Q = [
                  ($ = this.h).readUInt32BE(0),
                  $.readUInt32BE(4),
                  $.readUInt32BE(8),
                  $.readUInt32BE(12),
                ],
                ee = [0, 0, 0, 0],
                er = -1;
              ++er < 128;

            ) {
              for (
                (this.state[~~(er / 8)] & (1 << (7 - (er % 8)))) != 0 &&
                  ((ee[0] ^= Q[0]),
                  (ee[1] ^= Q[1]),
                  (ee[2] ^= Q[2]),
                  (ee[3] ^= Q[3])),
                  J = (1 & Q[3]) != 0,
                  Y = 3;
                Y > 0;
                Y--
              )
                Q[Y] = (Q[Y] >>> 1) | ((1 & Q[Y - 1]) << 31);
              ((Q[0] = Q[0] >>> 1), J && (Q[0] = -0x1f000000 ^ Q[0]));
            }
            this.state = et(ee);
          }),
          (er.prototype.update = function ($) {
            var Y;
            for (
              this.cache = Q.concat([this.cache, $]);
              this.cache.length >= 16;

            )
              ((Y = this.cache.slice(0, 16)),
                (this.cache = this.cache.slice(16)),
                this.ghash(Y));
          }),
          (er.prototype.final = function ($, Y) {
            return (
              this.cache.length && this.ghash(Q.concat([this.cache, ee], 16)),
              this.ghash(et([0, $, 0, Y])),
              this.state
            );
          }),
          ($.exports = er));
      },
      1995: function ($) {
        $.exports = function ($) {
          for (var Y, J = $.length; J--; )
            if (255 === (Y = $.readUInt8(J))) $.writeUInt8(0, J);
            else {
              (Y++, $.writeUInt8(Y, J));
              break;
            }
        };
      },
      1635: function ($, Y, J) {
        var Q = J(6481);
        ((Y.encrypt = function ($, Y) {
          var J = Q(Y, $._prev);
          return (($._prev = $._cipher.encryptBlock(J)), $._prev);
        }),
          (Y.decrypt = function ($, Y) {
            var J = $._prev;
            return (($._prev = Y), Q($._cipher.decryptBlock(Y), J));
          }));
      },
      4312: function ($, Y, J) {
        var Q = J(5725).Buffer,
          ee = J(6481);
        function et($, Y, J) {
          var et = Y.length,
            er = ee(Y, $._cache);
          return (
            ($._cache = $._cache.slice(et)),
            ($._prev = Q.concat([$._prev, J ? Y : er])),
            er
          );
        }
        Y.encrypt = function ($, Y, J) {
          for (var ee, er = Q.allocUnsafe(0); Y.length; )
            if (
              (0 === $._cache.length &&
                (($._cache = $._cipher.encryptBlock($._prev)),
                ($._prev = Q.allocUnsafe(0))),
              $._cache.length <= Y.length)
            )
              ((ee = $._cache.length),
                (er = Q.concat([er, et($, Y.slice(0, ee), J)])),
                (Y = Y.slice(ee)));
            else {
              er = Q.concat([er, et($, Y, J)]);
              break;
            }
          return er;
        };
      },
      9225: function ($, Y, J) {
        var Q = J(5725).Buffer;
        Y.encrypt = function ($, Y, J) {
          for (var ee = Y.length, et = Q.allocUnsafe(ee), er = -1; ++er < ee; )
            et[er] = (function ($, Y, J) {
              for (var ee, et, er, ei = -1, en = 0; ++ei < 8; )
                ((ee = $._cipher.encryptBlock($._prev)),
                  (et = Y & (1 << (7 - ei)) ? 128 : 0),
                  (en += (128 & (er = ee[0] ^ et)) >> ei % 8),
                  ($._prev = (function ($, Y) {
                    var J = $.length,
                      ee = -1,
                      et = Q.allocUnsafe($.length);
                    for ($ = Q.concat([$, Q.from([Y])]); ++ee < J; )
                      et[ee] = ($[ee] << 1) | ($[ee + 1] >> 7);
                    return et;
                  })($._prev, J ? et : er)));
              return en;
            })($, Y[er], J);
          return et;
        };
      },
      610: function ($, Y, J) {
        var Q = J(5725).Buffer;
        Y.encrypt = function ($, Y, J) {
          for (var ee = Y.length, et = Q.allocUnsafe(ee), er = -1; ++er < ee; )
            et[er] = (function ($, Y, J) {
              var ee = $._cipher.encryptBlock($._prev)[0] ^ Y;
              return (
                ($._prev = Q.concat([$._prev.slice(1), Q.from([J ? Y : ee])])),
                ee
              );
            })($, Y[er], J);
          return et;
        };
      },
      8714: function ($, Y, J) {
        var Q = J(6481),
          ee = J(5725).Buffer,
          et = J(1995);
        Y.encrypt = function ($, Y) {
          var J = Math.ceil(Y.length / 16),
            er = $._cache.length;
          $._cache = ee.concat([$._cache, ee.allocUnsafe(16 * J)]);
          for (var ei = 0; ei < J; ei++) {
            var en = (function ($) {
                var Y = $._cipher.encryptBlockRaw($._prev);
                return (et($._prev), Y);
              })($),
              ea = er + 16 * ei;
            ($._cache.writeUInt32BE(en[0], ea + 0),
              $._cache.writeUInt32BE(en[1], ea + 4),
              $._cache.writeUInt32BE(en[2], ea + 8),
              $._cache.writeUInt32BE(en[3], ea + 12));
          }
          var ef = $._cache.slice(0, Y.length);
          return (($._cache = $._cache.slice(Y.length)), Q(Y, ef));
        };
      },
      6083: function ($, Y) {
        ((Y.encrypt = function ($, Y) {
          return $._cipher.encryptBlock(Y);
        }),
          (Y.decrypt = function ($, Y) {
            return $._cipher.decryptBlock(Y);
          }));
      },
      8597: function ($, Y, J) {
        var Q = {
            ECB: J(6083),
            CBC: J(1635),
            CFB: J(4312),
            CFB8: J(610),
            CFB1: J(9225),
            OFB: J(4076),
            CTR: J(8714),
            GCM: J(8714),
          },
          ee = J(3349);
        for (var et in ee) ee[et].module = Q[ee[et].mode];
        $.exports = ee;
      },
      4076: function ($, Y, J) {
        var ee = J(6481);
        Y.encrypt = function ($, Y) {
          for (; $._cache.length < Y.length; )
            $._cache = Q.Buffer.concat([
              $._cache,
              (($._prev = $._cipher.encryptBlock($._prev)), $._prev),
            ]);
          var J = $._cache.slice(0, Y.length);
          return (($._cache = $._cache.slice(Y.length)), ee(Y, J));
        };
      },
      959: function ($, Y, J) {
        var Q = J(6313),
          ee = J(5725).Buffer,
          et = J(1888);
        function er($, Y, J, er) {
          (et.call(this),
            (this._cipher = new Q.AES(Y)),
            (this._prev = ee.from(J)),
            (this._cache = ee.allocUnsafe(0)),
            (this._secCache = ee.allocUnsafe(0)),
            (this._decrypt = er),
            (this._mode = $));
        }
        (J(1638)(er, et),
          (er.prototype._update = function ($) {
            return this._mode.encrypt(this, $, this._decrypt);
          }),
          (er.prototype._final = function () {
            this._cipher.scrub();
          }),
          ($.exports = er));
      },
      9131: function ($, Y, J) {
        var Q = J(1862),
          ee = J(8642),
          et = J(8597),
          er = J(1730),
          ei = J(689);
        function en($, Y, J) {
          if (et[($ = $.toLowerCase())]) return ee.createCipheriv($, Y, J);
          if (er[$]) return new Q({ key: Y, iv: J, mode: $ });
          throw TypeError("invalid suite type");
        }
        function ea($, Y, J) {
          if (et[($ = $.toLowerCase())]) return ee.createDecipheriv($, Y, J);
          if (er[$]) return new Q({ key: Y, iv: J, mode: $, decrypt: !0 });
          throw TypeError("invalid suite type");
        }
        ((Y.createCipher = Y.Cipher =
          function ($, Y) {
            if (et[($ = $.toLowerCase())]) ((J = et[$].key), (Q = et[$].iv));
            else if (er[$]) ((J = 8 * er[$].key), (Q = er[$].iv));
            else throw TypeError("invalid suite type");
            var J,
              Q,
              ee = ei(Y, !1, J, Q);
            return en($, ee.key, ee.iv);
          }),
          (Y.createCipheriv = Y.Cipheriv = en),
          (Y.createDecipher = Y.Decipher =
            function ($, Y) {
              if (et[($ = $.toLowerCase())]) ((J = et[$].key), (Q = et[$].iv));
              else if (er[$]) ((J = 8 * er[$].key), (Q = er[$].iv));
              else throw TypeError("invalid suite type");
              var J,
                Q,
                ee = ei(Y, !1, J, Q);
              return ea($, ee.key, ee.iv);
            }),
          (Y.createDecipheriv = Y.Decipheriv = ea),
          (Y.listCiphers = Y.getCiphers =
            function () {
              return Object.keys(er).concat(ee.getCiphers());
            }));
      },
      1862: function ($, Y, J) {
        var Q = J(1888),
          ee = J(55),
          et = J(1638),
          er = J(5725).Buffer,
          ei = {
            "des-ede3-cbc": ee.CBC.instantiate(ee.EDE),
            "des-ede3": ee.EDE,
            "des-ede-cbc": ee.CBC.instantiate(ee.EDE),
            "des-ede": ee.EDE,
            "des-cbc": ee.CBC.instantiate(ee.DES),
            "des-ecb": ee.DES,
          };
        function en($) {
          Q.call(this);
          var Y,
            J = $.mode.toLowerCase(),
            ee = ei[J];
          Y = $.decrypt ? "decrypt" : "encrypt";
          var et = $.key;
          (er.isBuffer(et) || (et = er.from(et)),
            ("des-ede" === J || "des-ede-cbc" === J) &&
              (et = er.concat([et, et.slice(0, 8)])));
          var en = $.iv;
          (er.isBuffer(en) || (en = er.from(en)),
            (this._des = ee.create({ key: et, iv: en, type: Y })));
        }
        ((ei.des = ei["des-cbc"]),
          (ei.des3 = ei["des-ede3-cbc"]),
          ($.exports = en),
          et(en, Q),
          (en.prototype._update = function ($) {
            return er.from(this._des.update($));
          }),
          (en.prototype._final = function () {
            return er.from(this._des.final());
          }));
      },
      1730: function ($, Y) {
        ((Y["des-ecb"] = { key: 8, iv: 0 }),
          (Y["des-cbc"] = Y.des = { key: 8, iv: 8 }),
          (Y["des-ede3-cbc"] = Y.des3 = { key: 24, iv: 8 }),
          (Y["des-ede3"] = { key: 24, iv: 0 }),
          (Y["des-ede-cbc"] = { key: 16, iv: 8 }),
          (Y["des-ede"] = { key: 16, iv: 0 }));
      },
      640: function ($, Y, J) {
        var ee = J(5944),
          et = J(376);
        function er($, Y) {
          var J,
            et = {
              blinder: (J = ei(Y))
                .toRed(ee.mont(Y.modulus))
                .redPow(new ee(Y.publicExponent))
                .fromRed(),
              unblinder: J.invm(Y.modulus),
            },
            er = Y.modulus.byteLength();
          ee.mont(Y.modulus);
          var en = new ee($).mul(et.blinder).umod(Y.modulus),
            ea = en.toRed(ee.mont(Y.prime1)),
            ef = en.toRed(ee.mont(Y.prime2)),
            eo = Y.coefficient,
            es = Y.prime1,
            eh = Y.prime2,
            ed = ea.redPow(Y.exponent1),
            ec = ef.redPow(Y.exponent2);
          ((ed = ed.fromRed()), (ec = ec.fromRed()));
          var eu = ed.isub(ec).imul(eo).umod(es);
          return (
            eu.imul(eh),
            ec.iadd(eu),
            new Q.Buffer(ec.imul(et.unblinder).umod(Y.modulus).toArray(!1, er))
          );
        }
        function ei($) {
          for (
            var Y = $.modulus.byteLength(), J = new ee(et(Y));
            J.cmp($.modulus) >= 0 || !J.umod($.prime1) || !J.umod($.prime2);

          )
            J = new ee(et(Y));
          return J;
        }
        (($.exports = er), (er.getr = ei));
      },
      6713: function ($, Y, J) {
        $.exports = J(3678);
      },
      2926: function ($, Y, J) {
        var Q = J(5725).Buffer,
          ee = J(762),
          et = J(5486),
          er = J(1638),
          ei = J(261),
          en = J(1541),
          ea = J(3678);
        function ef($) {
          et.Writable.call(this);
          var Y = ea[$];
          if (!Y) throw Error("Unknown message digest");
          ((this._hashType = Y.hash),
            (this._hash = ee(Y.hash)),
            (this._tag = Y.id),
            (this._signType = Y.sign));
        }
        function eo($) {
          et.Writable.call(this);
          var Y = ea[$];
          if (!Y) throw Error("Unknown message digest");
          ((this._hash = ee(Y.hash)),
            (this._tag = Y.id),
            (this._signType = Y.sign));
        }
        function es($) {
          return new ef($);
        }
        function eh($) {
          return new eo($);
        }
        (Object.keys(ea).forEach(function ($) {
          ((ea[$].id = Q.from(ea[$].id, "hex")), (ea[$.toLowerCase()] = ea[$]));
        }),
          er(ef, et.Writable),
          (ef.prototype._write = function ($, Y, J) {
            (this._hash.update($), J());
          }),
          (ef.prototype.update = function ($, Y) {
            return (
              "string" == typeof $ && ($ = Q.from($, Y)),
              this._hash.update($),
              this
            );
          }),
          (ef.prototype.sign = function ($, Y) {
            this.end();
            var J = ei(
              this._hash.digest(),
              $,
              this._hashType,
              this._signType,
              this._tag,
            );
            return Y ? J.toString(Y) : J;
          }),
          er(eo, et.Writable),
          (eo.prototype._write = function ($, Y, J) {
            (this._hash.update($), J());
          }),
          (eo.prototype.update = function ($, Y) {
            return (
              "string" == typeof $ && ($ = Q.from($, Y)),
              this._hash.update($),
              this
            );
          }),
          (eo.prototype.verify = function ($, Y, J) {
            return (
              "string" == typeof Y && (Y = Q.from(Y, J)),
              this.end(),
              en(Y, this._hash.digest(), $, this._signType, this._tag)
            );
          }),
          ($.exports = {
            Sign: es,
            Verify: eh,
            createSign: es,
            createVerify: eh,
          }));
      },
      261: function ($, Y, J) {
        var Q = J(5725).Buffer,
          ee = J(3256),
          et = J(640),
          er = J(2049).ec,
          ei = J(1315),
          en = J(8012),
          ea = J(6456);
        function ef($, Y, J, et) {
          if (($ = Q.from($.toArray())).length < Y.byteLength()) {
            var er = Q.alloc(Y.byteLength() - $.length);
            $ = Q.concat([er, $]);
          }
          var ei = J.length,
            en = (function ($, Y) {
              $ = ($ = eo($, Y)).mod(Y);
              var J = Q.from($.toArray());
              if (J.length < Y.byteLength()) {
                var ee = Q.alloc(Y.byteLength() - J.length);
                J = Q.concat([ee, J]);
              }
              return J;
            })(J, Y),
            ea = Q.alloc(ei);
          ea.fill(1);
          var ef = Q.alloc(ei);
          return (
            (ef = ee(et, ef)
              .update(ea)
              .update(Q.from([0]))
              .update($)
              .update(en)
              .digest()),
            (ea = ee(et, ef).update(ea).digest()),
            (ef = ee(et, ef)
              .update(ea)
              .update(Q.from([1]))
              .update($)
              .update(en)
              .digest()),
            (ea = ee(et, ef).update(ea).digest()),
            { k: ef, v: ea }
          );
        }
        function eo($, Y) {
          var J = new ei($),
            Q = ($.length << 3) - Y.bitLength();
          return (Q > 0 && J.ishrn(Q), J);
        }
        function es($, Y, J) {
          var et, er;
          do {
            for (et = Q.alloc(0); 8 * et.length < $.bitLength(); )
              ((Y.v = ee(J, Y.k).update(Y.v).digest()),
                (et = Q.concat([et, Y.v])));
            ((er = eo(et, $)),
              (Y.k = ee(J, Y.k)
                .update(Y.v)
                .update(Q.from([0]))
                .digest()),
              (Y.v = ee(J, Y.k).update(Y.v).digest()));
          } while (-1 !== er.cmp($));
          return er;
        }
        (($.exports = function ($, Y, J, ee, eh) {
          var ed = en(Y);
          if (ed.curve) {
            if ("ecdsa" !== ee && "ecdsa/rsa" !== ee)
              throw Error("wrong private key type");
            var ec = $,
              eu = ed,
              el = ea[eu.curve.join(".")];
            if (!el) throw Error("unknown curve " + eu.curve.join("."));
            var ep = new er(el).keyFromPrivate(eu.privateKey).sign(ec);
            return Q.from(ep.toDER());
          }
          if ("dsa" === ed.type) {
            if ("dsa" !== ee) throw Error("wrong private key type");
            return (function ($, Y, J) {
              for (
                var ee,
                  et,
                  er,
                  en,
                  ea,
                  eh,
                  ed,
                  ec,
                  eu = Y.params.priv_key,
                  el = Y.params.p,
                  ep = Y.params.q,
                  eb = Y.params.g,
                  em = new ei(0),
                  eg = eo($, ep).mod(ep),
                  ey = !1,
                  ev = ef(eu, ep, $, J);
                !1 === ey;

              ) {
                ((ee = eb),
                  (et = ec = es(ep, ev, J)),
                  (er = el),
                  (en = ep),
                  (em = ee.toRed(ei.mont(er)).redPow(et).fromRed().mod(en)),
                  0 ===
                    (ey = ec
                      .invm(ep)
                      .imul(eg.add(eu.mul(em)))
                      .mod(ep)).cmpn(0) && ((ey = !1), (em = new ei(0))));
              }
              return (
                (ea = em),
                (eh = ey),
                (ea = ea.toArray()),
                (eh = eh.toArray()),
                128 & ea[0] && (ea = [0].concat(ea)),
                128 & eh[0] && (eh = [0].concat(eh)),
                (ed = (ed = [
                  48,
                  ea.length + eh.length + 4,
                  2,
                  ea.length,
                ]).concat(ea, [2, eh.length], eh)),
                Q.from(ed)
              );
            })($, ed, J);
          }
          if ("rsa" !== ee && "ecdsa/rsa" !== ee)
            throw Error("wrong private key type");
          $ = Q.concat([eh, $]);
          for (
            var eb = ed.modulus.byteLength(), em = [0, 1];
            $.length + em.length + 1 < eb;

          )
            em.push(255);
          em.push(0);
          for (var eg = -1; ++eg < $.length; ) em.push($[eg]);
          return et(em, ed);
        }),
          ($.exports.getKey = ef),
          ($.exports.makeKey = es));
      },
      1541: function ($, Y, J) {
        var Q = J(5725).Buffer,
          ee = J(1315),
          et = J(2049).ec,
          er = J(8012),
          ei = J(6456);
        function en($, Y) {
          if (0 >= $.cmpn(0) || $.cmp(Y) >= Y) throw Error("invalid sig");
        }
        $.exports = function ($, Y, J, ea, ef) {
          var eo,
            es,
            eh,
            ed,
            ec,
            eu,
            el,
            ep,
            eb,
            em,
            eg,
            ey,
            ev = er(J);
          if ("ec" === ev.type) {
            if ("ecdsa" !== ea && "ecdsa/rsa" !== ea)
              throw Error("wrong public key type");
            var e_ = $,
              ew = Y,
              ex = ev,
              eM = ei[ex.data.algorithm.curve.join(".")];
            if (!eM)
              throw Error("unknown curve " + ex.data.algorithm.curve.join("."));
            var eS = new et(eM),
              eE = ex.data.subjectPrivateKey.data;
            return eS.verify(ew, e_, eE);
          }
          if ("dsa" === ev.type) {
            if ("dsa" !== ea) throw Error("wrong public key type");
            return (
              (eo = $),
              (es = Y),
              (ed = (eh = ev).data.p),
              (ec = eh.data.q),
              (eu = eh.data.g),
              (el = eh.data.pub_key),
              (eb = (ep = er.signature.decode(eo, "der")).s),
              (em = ep.r),
              en(eb, ec),
              en(em, ec),
              (eg = ee.mont(ed)),
              (ey = eb.invm(ec)),
              0 ===
                eu
                  .toRed(eg)
                  .redPow(new ee(es).mul(ey).mod(ec))
                  .fromRed()
                  .mul(el.toRed(eg).redPow(em.mul(ey).mod(ec)).fromRed())
                  .mod(ed)
                  .mod(ec)
                  .cmp(em)
            );
          }
          if ("rsa" !== ea && "ecdsa/rsa" !== ea)
            throw Error("wrong public key type");
          Y = Q.concat([ef, Y]);
          for (
            var ek = ev.modulus.byteLength(), eA = [1], eR = 0;
            Y.length + eA.length + 2 < ek;

          )
            (eA.push(255), eR++);
          eA.push(0);
          for (var eI = -1; ++eI < Y.length; ) eA.push(Y[eI]);
          eA = Q.from(eA);
          var eB = ee.mont(ev.modulus);
          $ = ($ = new ee($).toRed(eB)).redPow(new ee(ev.publicExponent));
          var eT = +(eR < 8);
          for (
            ek = Math.min(
              ($ = Q.from($.fromRed().toArray())).length,
              eA.length,
            ),
              $.length !== eA.length && (eT = 1),
              eI = -1;
            ++eI < ek;

          )
            eT |= $[eI] ^ eA[eI];
          return 0 === eT;
        };
      },
      6481: function ($) {
        $.exports = function ($, Y) {
          for (
            var J = Math.min($.length, Y.length), ee = new Q.Buffer(J), et = 0;
            et < J;
            ++et
          )
            ee[et] = $[et] ^ Y[et];
          return ee;
        };
      },
      1888: function ($, Y, J) {
        var Q = J(5725).Buffer,
          ee = J(2203).Transform,
          et = J(3193).StringDecoder;
        function er($) {
          (ee.call(this),
            (this.hashMode = "string" == typeof $),
            this.hashMode
              ? (this[$] = this._finalOrDigest)
              : (this.final = this._finalOrDigest),
            this._final && ((this.__final = this._final), (this._final = null)),
            (this._decoder = null),
            (this._encoding = null));
        }
        (J(1638)(er, ee),
          (er.prototype.update = function ($, Y, J) {
            "string" == typeof $ && ($ = Q.from($, Y));
            var ee = this._update($);
            return this.hashMode
              ? this
              : (J && (ee = this._toString(ee, J)), ee);
          }),
          (er.prototype.setAutoPadding = function () {}),
          (er.prototype.getAuthTag = function () {
            throw Error("trying to get auth tag in unsupported state");
          }),
          (er.prototype.setAuthTag = function () {
            throw Error("trying to set auth tag in unsupported state");
          }),
          (er.prototype.setAAD = function () {
            throw Error("trying to set aad in unsupported state");
          }),
          (er.prototype._transform = function ($, Y, J) {
            var Q;
            try {
              this.hashMode ? this._update($) : this.push(this._update($));
            } catch ($) {
              Q = $;
            } finally {
              J(Q);
            }
          }),
          (er.prototype._flush = function ($) {
            var Y;
            try {
              this.push(this.__final());
            } catch ($) {
              Y = $;
            }
            $(Y);
          }),
          (er.prototype._finalOrDigest = function ($) {
            var Y = this.__final() || Q.alloc(0);
            return ($ && (Y = this._toString(Y, $, !0)), Y);
          }),
          (er.prototype._toString = function ($, Y, J) {
            if (
              (this._decoder ||
                ((this._decoder = new et(Y)), (this._encoding = Y)),
              this._encoding !== Y)
            )
              throw Error("can't switch encodings");
            var Q = this._decoder.write($);
            return (J && (Q += this._decoder.end()), Q);
          }),
          ($.exports = er));
      },
      8814: function ($, Y, J) {
        var ee = J(2049),
          et = J(5944);
        $.exports = function ($) {
          return new ei($);
        };
        var er = {
          secp256k1: { name: "secp256k1", byteLength: 32 },
          secp224r1: { name: "p224", byteLength: 28 },
          prime256v1: { name: "p256", byteLength: 32 },
          prime192v1: { name: "p192", byteLength: 24 },
          ed25519: { name: "ed25519", byteLength: 32 },
          secp384r1: { name: "p384", byteLength: 48 },
          secp521r1: { name: "p521", byteLength: 66 },
        };
        function ei($) {
          ((this.curveType = er[$]),
            this.curveType || (this.curveType = { name: $ }),
            (this.curve = new ee.ec(this.curveType.name)),
            (this.keys = void 0));
        }
        function en($, Y, J) {
          Array.isArray($) || ($ = $.toArray());
          var ee = new Q.Buffer($);
          if (J && ee.length < J) {
            var et = new Q.Buffer(J - ee.length);
            (et.fill(0), (ee = Q.Buffer.concat([et, ee])));
          }
          return Y ? ee.toString(Y) : ee;
        }
        ((er.p224 = er.secp224r1),
          (er.p256 = er.secp256r1 = er.prime256v1),
          (er.p192 = er.secp192r1 = er.prime192v1),
          (er.p384 = er.secp384r1),
          (er.p521 = er.secp521r1),
          (ei.prototype.generateKeys = function ($, Y) {
            return (
              (this.keys = this.curve.genKeyPair()),
              this.getPublicKey($, Y)
            );
          }),
          (ei.prototype.computeSecret = function ($, Y, J) {
            return (
              (Y = Y || "utf8"),
              Q.Buffer.isBuffer($) || ($ = new Q.Buffer($, Y)),
              en(
                this.curve
                  .keyFromPublic($)
                  .getPublic()
                  .mul(this.keys.getPrivate())
                  .getX(),
                J,
                this.curveType.byteLength,
              )
            );
          }),
          (ei.prototype.getPublicKey = function ($, Y) {
            var J = this.keys.getPublic("compressed" === Y, !0);
            return (
              "hybrid" === Y && (J[J.length - 1] % 2 ? (J[0] = 7) : (J[0] = 6)),
              en(J, $)
            );
          }),
          (ei.prototype.getPrivateKey = function ($) {
            return en(this.keys.getPrivate(), $);
          }),
          (ei.prototype.setPublicKey = function ($, Y) {
            return (
              (Y = Y || "utf8"),
              Q.Buffer.isBuffer($) || ($ = new Q.Buffer($, Y)),
              this.keys._importPublic($),
              this
            );
          }),
          (ei.prototype.setPrivateKey = function ($, Y) {
            ((Y = Y || "utf8"),
              Q.Buffer.isBuffer($) || ($ = new Q.Buffer($, Y)));
            var J = new et($);
            return (
              (J = J.toString(16)),
              (this.keys = this.curve.genKeyPair()),
              this.keys._importPrivate(J),
              this
            );
          }));
      },
      762: function ($, Y, J) {
        "use strict";
        var Q = J(1638),
          ee = J(3858),
          et = J(8987),
          er = J(3251),
          ei = J(1888);
        function en($) {
          (ei.call(this, "digest"), (this._hash = $));
        }
        (Q(en, ei),
          (en.prototype._update = function ($) {
            this._hash.update($);
          }),
          (en.prototype._final = function () {
            return this._hash.digest();
          }),
          ($.exports = function ($) {
            return "md5" === ($ = $.toLowerCase())
              ? new ee()
              : "rmd160" === $ || "ripemd160" === $
                ? new et()
                : new en(er($));
          }));
      },
      1334: function ($, Y, J) {
        var Q = J(3858);
        $.exports = function ($) {
          return new Q().update($).digest();
        };
      },
      3256: function ($, Y, J) {
        "use strict";
        var Q = J(1638),
          ee = J(9189),
          et = J(1888),
          er = J(5725).Buffer,
          ei = J(1334),
          en = J(8987),
          ea = J(3251),
          ef = er.alloc(128);
        function eo($, Y) {
          (et.call(this, "digest"), "string" == typeof Y && (Y = er.from(Y)));
          var J = "sha512" === $ || "sha384" === $ ? 128 : 64;
          ((this._alg = $),
            (this._key = Y),
            Y.length > J
              ? (Y = ("rmd160" === $ ? new en() : ea($)).update(Y).digest())
              : Y.length < J && (Y = er.concat([Y, ef], J)));
          for (
            var Q = (this._ipad = er.allocUnsafe(J)),
              ee = (this._opad = er.allocUnsafe(J)),
              ei = 0;
            ei < J;
            ei++
          )
            ((Q[ei] = 54 ^ Y[ei]), (ee[ei] = 92 ^ Y[ei]));
          ((this._hash = "rmd160" === $ ? new en() : ea($)),
            this._hash.update(Q));
        }
        (Q(eo, et),
          (eo.prototype._update = function ($) {
            this._hash.update($);
          }),
          (eo.prototype._final = function () {
            var $ = this._hash.digest();
            return ("rmd160" === this._alg ? new en() : ea(this._alg))
              .update(this._opad)
              .update($)
              .digest();
          }),
          ($.exports = function ($, Y) {
            return "rmd160" === ($ = $.toLowerCase()) || "ripemd160" === $
              ? new eo("rmd160", Y)
              : "md5" === $
                ? new ee(ei, Y)
                : new eo($, Y);
          }));
      },
      9189: function ($, Y, J) {
        "use strict";
        var Q = J(1638),
          ee = J(5725).Buffer,
          et = J(1888),
          er = ee.alloc(128);
        function ei($, Y) {
          (et.call(this, "digest"),
            "string" == typeof Y && (Y = ee.from(Y)),
            (this._alg = $),
            (this._key = Y),
            Y.length > 64
              ? (Y = $(Y))
              : Y.length < 64 && (Y = ee.concat([Y, er], 64)));
          for (
            var J = (this._ipad = ee.allocUnsafe(64)),
              Q = (this._opad = ee.allocUnsafe(64)),
              ei = 0;
            ei < 64;
            ei++
          )
            ((J[ei] = 54 ^ Y[ei]), (Q[ei] = 92 ^ Y[ei]));
          this._hash = [J];
        }
        (Q(ei, et),
          (ei.prototype._update = function ($) {
            this._hash.push($);
          }),
          (ei.prototype._final = function () {
            var $ = this._alg(ee.concat(this._hash));
            return this._alg(ee.concat([this._opad, $]));
          }),
          ($.exports = ei));
      },
      55: function ($, Y, J) {
        "use strict";
        ((Y.utils = J(4569)),
          (Y.Cipher = J(4309)),
          (Y.DES = J(8992)),
          (Y.CBC = J(42)),
          (Y.EDE = J(4960)));
      },
      42: function ($, Y, J) {
        "use strict";
        var Q = J(7551),
          ee = J(1638),
          et = {};
        function er($) {
          (Q.equal($.length, 8, "Invalid IV length"), (this.iv = Array(8)));
          for (var Y = 0; Y < this.iv.length; Y++) this.iv[Y] = $[Y];
        }
        ((Y.instantiate = function ($) {
          function Y(Y) {
            ($.call(this, Y), this._cbcInit());
          }
          ee(Y, $);
          for (var J = Object.keys(et), Q = 0; Q < J.length; Q++) {
            var er = J[Q];
            Y.prototype[er] = et[er];
          }
          return (
            (Y.create = function ($) {
              return new Y($);
            }),
            Y
          );
        }),
          (et._cbcInit = function () {
            var $ = new er(this.options.iv);
            this._cbcState = $;
          }),
          (et._update = function ($, Y, J, Q) {
            var ee = this._cbcState,
              et = this.constructor.super_.prototype,
              er = ee.iv;
            if ("encrypt" === this.type) {
              for (var ei = 0; ei < this.blockSize; ei++) er[ei] ^= $[Y + ei];
              et._update.call(this, er, 0, J, Q);
              for (var ei = 0; ei < this.blockSize; ei++) er[ei] = J[Q + ei];
            } else {
              et._update.call(this, $, Y, J, Q);
              for (var ei = 0; ei < this.blockSize; ei++) J[Q + ei] ^= er[ei];
              for (var ei = 0; ei < this.blockSize; ei++) er[ei] = $[Y + ei];
            }
          }));
      },
      4309: function ($, Y, J) {
        "use strict";
        var Q = J(7551);
        function ee($) {
          ((this.options = $),
            (this.type = this.options.type),
            (this.blockSize = 8),
            this._init(),
            (this.buffer = Array(this.blockSize)),
            (this.bufferOff = 0));
        }
        (($.exports = ee),
          (ee.prototype._init = function () {}),
          (ee.prototype.update = function ($) {
            return 0 === $.length
              ? []
              : "decrypt" === this.type
                ? this._updateDecrypt($)
                : this._updateEncrypt($);
          }),
          (ee.prototype._buffer = function ($, Y) {
            for (
              var J = Math.min(
                  this.buffer.length - this.bufferOff,
                  $.length - Y,
                ),
                Q = 0;
              Q < J;
              Q++
            )
              this.buffer[this.bufferOff + Q] = $[Y + Q];
            return ((this.bufferOff += J), J);
          }),
          (ee.prototype._flushBuffer = function ($, Y) {
            return (
              this._update(this.buffer, 0, $, Y),
              (this.bufferOff = 0),
              this.blockSize
            );
          }),
          (ee.prototype._updateEncrypt = function ($) {
            var Y = 0,
              J = 0,
              Q = Array(
                (((this.bufferOff + $.length) / this.blockSize) | 0) *
                  this.blockSize,
              );
            0 !== this.bufferOff &&
              ((Y += this._buffer($, Y)),
              this.bufferOff === this.buffer.length &&
                (J += this._flushBuffer(Q, J)));
            for (
              var ee = $.length - (($.length - Y) % this.blockSize);
              Y < ee;
              Y += this.blockSize
            )
              (this._update($, Y, Q, J), (J += this.blockSize));
            for (; Y < $.length; Y++, this.bufferOff++)
              this.buffer[this.bufferOff] = $[Y];
            return Q;
          }),
          (ee.prototype._updateDecrypt = function ($) {
            for (
              var Y = 0,
                J = 0,
                Q = Math.ceil((this.bufferOff + $.length) / this.blockSize) - 1,
                ee = Array(Q * this.blockSize);
              Q > 0;
              Q--
            )
              ((Y += this._buffer($, Y)), (J += this._flushBuffer(ee, J)));
            return ((Y += this._buffer($, Y)), ee);
          }),
          (ee.prototype.final = function ($) {
            var Y, J;
            return ($ && (Y = this.update($)),
            (J =
              "encrypt" === this.type
                ? this._finalEncrypt()
                : this._finalDecrypt()),
            Y)
              ? Y.concat(J)
              : J;
          }),
          (ee.prototype._pad = function ($, Y) {
            if (0 === Y) return !1;
            for (; Y < $.length; ) $[Y++] = 0;
            return !0;
          }),
          (ee.prototype._finalEncrypt = function () {
            if (!this._pad(this.buffer, this.bufferOff)) return [];
            var $ = Array(this.blockSize);
            return (this._update(this.buffer, 0, $, 0), $);
          }),
          (ee.prototype._unpad = function ($) {
            return $;
          }),
          (ee.prototype._finalDecrypt = function () {
            Q.equal(
              this.bufferOff,
              this.blockSize,
              "Not enough data to decrypt",
            );
            var $ = Array(this.blockSize);
            return (this._flushBuffer($, 0), this._unpad($));
          }));
      },
      8992: function ($, Y, J) {
        "use strict";
        var Q = J(7551),
          ee = J(1638),
          et = J(4569),
          er = J(4309);
        function ei() {
          ((this.tmp = [, ,]), (this.keys = null));
        }
        function en($) {
          er.call(this, $);
          var Y = new ei();
          ((this._desState = Y), this.deriveKeys(Y, $.key));
        }
        (ee(en, er),
          ($.exports = en),
          (en.create = function ($) {
            return new en($);
          }));
        var ea = [1, 1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1];
        ((en.prototype.deriveKeys = function ($, Y) {
          (($.keys = Array(32)),
            Q.equal(Y.length, this.blockSize, "Invalid key length"));
          var J = et.readUInt32BE(Y, 0),
            ee = et.readUInt32BE(Y, 4);
          (et.pc1(J, ee, $.tmp, 0), (J = $.tmp[0]), (ee = $.tmp[1]));
          for (var er = 0; er < $.keys.length; er += 2) {
            var ei = ea[er >>> 1];
            ((J = et.r28shl(J, ei)),
              (ee = et.r28shl(ee, ei)),
              et.pc2(J, ee, $.keys, er));
          }
        }),
          (en.prototype._update = function ($, Y, J, Q) {
            var ee = this._desState,
              er = et.readUInt32BE($, Y),
              ei = et.readUInt32BE($, Y + 4);
            (et.ip(er, ei, ee.tmp, 0),
              (er = ee.tmp[0]),
              (ei = ee.tmp[1]),
              "encrypt" === this.type
                ? this._encrypt(ee, er, ei, ee.tmp, 0)
                : this._decrypt(ee, er, ei, ee.tmp, 0),
              (er = ee.tmp[0]),
              (ei = ee.tmp[1]),
              et.writeUInt32BE(J, er, Q),
              et.writeUInt32BE(J, ei, Q + 4));
          }),
          (en.prototype._pad = function ($, Y) {
            for (var J = $.length - Y, Q = Y; Q < $.length; Q++) $[Q] = J;
            return !0;
          }),
          (en.prototype._unpad = function ($) {
            for (var Y = $[$.length - 1], J = $.length - Y; J < $.length; J++)
              Q.equal($[J], Y);
            return $.slice(0, $.length - Y);
          }),
          (en.prototype._encrypt = function ($, Y, J, Q, ee) {
            for (var er = Y, ei = J, en = 0; en < $.keys.length; en += 2) {
              var ea = $.keys[en],
                ef = $.keys[en + 1];
              (et.expand(ei, $.tmp, 0), (ea ^= $.tmp[0]), (ef ^= $.tmp[1]));
              var eo = et.substitute(ea, ef),
                es = et.permute(eo),
                eh = ei;
              ((ei = (er ^ es) >>> 0), (er = eh));
            }
            et.rip(ei, er, Q, ee);
          }),
          (en.prototype._decrypt = function ($, Y, J, Q, ee) {
            for (var er = J, ei = Y, en = $.keys.length - 2; en >= 0; en -= 2) {
              var ea = $.keys[en],
                ef = $.keys[en + 1];
              (et.expand(er, $.tmp, 0), (ea ^= $.tmp[0]), (ef ^= $.tmp[1]));
              var eo = et.substitute(ea, ef),
                es = et.permute(eo),
                eh = er;
              ((er = (ei ^ es) >>> 0), (ei = eh));
            }
            et.rip(er, ei, Q, ee);
          }));
      },
      4960: function ($, Y, J) {
        "use strict";
        var Q = J(7551),
          ee = J(1638),
          et = J(4309),
          er = J(8992);
        function ei($, Y) {
          Q.equal(Y.length, 24, "Invalid key length");
          var J = Y.slice(0, 8),
            ee = Y.slice(8, 16),
            et = Y.slice(16, 24);
          "encrypt" === $
            ? (this.ciphers = [
                er.create({ type: "encrypt", key: J }),
                er.create({ type: "decrypt", key: ee }),
                er.create({ type: "encrypt", key: et }),
              ])
            : (this.ciphers = [
                er.create({ type: "decrypt", key: et }),
                er.create({ type: "encrypt", key: ee }),
                er.create({ type: "decrypt", key: J }),
              ]);
        }
        function en($) {
          et.call(this, $);
          var Y = new ei(this.type, this.options.key);
          this._edeState = Y;
        }
        (ee(en, et),
          ($.exports = en),
          (en.create = function ($) {
            return new en($);
          }),
          (en.prototype._update = function ($, Y, J, Q) {
            var ee = this._edeState;
            (ee.ciphers[0]._update($, Y, J, Q),
              ee.ciphers[1]._update(J, Q, J, Q),
              ee.ciphers[2]._update(J, Q, J, Q));
          }),
          (en.prototype._pad = er.prototype._pad),
          (en.prototype._unpad = er.prototype._unpad));
      },
      4569: function ($, Y) {
        "use strict";
        ((Y.readUInt32BE = function ($, Y) {
          return (
            (($[0 + Y] << 24) |
              ($[1 + Y] << 16) |
              ($[2 + Y] << 8) |
              $[3 + Y]) >>>
            0
          );
        }),
          (Y.writeUInt32BE = function ($, Y, J) {
            (($[0 + J] = Y >>> 24),
              ($[1 + J] = (Y >>> 16) & 255),
              ($[2 + J] = (Y >>> 8) & 255),
              ($[3 + J] = 255 & Y));
          }),
          (Y.ip = function ($, Y, J, Q) {
            for (var ee = 0, et = 0, er = 6; er >= 0; er -= 2) {
              for (var ei = 0; ei <= 24; ei += 8)
                ((ee <<= 1), (ee |= (Y >>> (ei + er)) & 1));
              for (var ei = 0; ei <= 24; ei += 8)
                ((ee <<= 1), (ee |= ($ >>> (ei + er)) & 1));
            }
            for (var er = 6; er >= 0; er -= 2) {
              for (var ei = 1; ei <= 25; ei += 8)
                ((et <<= 1), (et |= (Y >>> (ei + er)) & 1));
              for (var ei = 1; ei <= 25; ei += 8)
                ((et <<= 1), (et |= ($ >>> (ei + er)) & 1));
            }
            ((J[Q + 0] = ee >>> 0), (J[Q + 1] = et >>> 0));
          }),
          (Y.rip = function ($, Y, J, Q) {
            for (var ee = 0, et = 0, er = 0; er < 4; er++)
              for (var ei = 24; ei >= 0; ei -= 8)
                ((ee <<= 1),
                  (ee |= (Y >>> (ei + er)) & 1),
                  (ee <<= 1),
                  (ee |= ($ >>> (ei + er)) & 1));
            for (var er = 4; er < 8; er++)
              for (var ei = 24; ei >= 0; ei -= 8)
                ((et <<= 1),
                  (et |= (Y >>> (ei + er)) & 1),
                  (et <<= 1),
                  (et |= ($ >>> (ei + er)) & 1));
            ((J[Q + 0] = ee >>> 0), (J[Q + 1] = et >>> 0));
          }),
          (Y.pc1 = function ($, Y, J, Q) {
            for (var ee = 0, et = 0, er = 7; er >= 5; er--) {
              for (var ei = 0; ei <= 24; ei += 8)
                ((ee <<= 1), (ee |= (Y >> (ei + er)) & 1));
              for (var ei = 0; ei <= 24; ei += 8)
                ((ee <<= 1), (ee |= ($ >> (ei + er)) & 1));
            }
            for (var ei = 0; ei <= 24; ei += 8)
              ((ee <<= 1), (ee |= (Y >> (ei + er)) & 1));
            for (var er = 1; er <= 3; er++) {
              for (var ei = 0; ei <= 24; ei += 8)
                ((et <<= 1), (et |= (Y >> (ei + er)) & 1));
              for (var ei = 0; ei <= 24; ei += 8)
                ((et <<= 1), (et |= ($ >> (ei + er)) & 1));
            }
            for (var ei = 0; ei <= 24; ei += 8)
              ((et <<= 1), (et |= ($ >> (ei + er)) & 1));
            ((J[Q + 0] = ee >>> 0), (J[Q + 1] = et >>> 0));
          }),
          (Y.r28shl = function ($, Y) {
            return (($ << Y) & 0xfffffff) | ($ >>> (28 - Y));
          }));
        var J = [
          14, 11, 17, 4, 27, 23, 25, 0, 13, 22, 7, 18, 5, 9, 16, 24, 2, 20, 12,
          21, 1, 8, 15, 26, 15, 4, 25, 19, 9, 1, 26, 16, 5, 11, 23, 8, 12, 7,
          17, 0, 22, 3, 10, 14, 6, 20, 27, 24,
        ];
        ((Y.pc2 = function ($, Y, Q, ee) {
          for (var et = 0, er = 0, ei = J.length >>> 1, en = 0; en < ei; en++)
            ((et <<= 1), (et |= ($ >>> J[en]) & 1));
          for (var en = ei; en < J.length; en++)
            ((er <<= 1), (er |= (Y >>> J[en]) & 1));
          ((Q[ee + 0] = et >>> 0), (Q[ee + 1] = er >>> 0));
        }),
          (Y.expand = function ($, Y, J) {
            var Q = 0,
              ee = 0;
            Q = ((1 & $) << 5) | ($ >>> 27);
            for (var et = 23; et >= 15; et -= 4)
              ((Q <<= 6), (Q |= ($ >>> et) & 63));
            for (var et = 11; et >= 3; et -= 4)
              ((ee |= ($ >>> et) & 63), (ee <<= 6));
            ((ee |= ((31 & $) << 1) | ($ >>> 31)),
              (Y[J + 0] = Q >>> 0),
              (Y[J + 1] = ee >>> 0));
          }));
        var Q = [
          14, 0, 4, 15, 13, 7, 1, 4, 2, 14, 15, 2, 11, 13, 8, 1, 3, 10, 10, 6,
          6, 12, 12, 11, 5, 9, 9, 5, 0, 3, 7, 8, 4, 15, 1, 12, 14, 8, 8, 2, 13,
          4, 6, 9, 2, 1, 11, 7, 15, 5, 12, 11, 9, 3, 7, 14, 3, 10, 10, 0, 5, 6,
          0, 13, 15, 3, 1, 13, 8, 4, 14, 7, 6, 15, 11, 2, 3, 8, 4, 14, 9, 12, 7,
          0, 2, 1, 13, 10, 12, 6, 0, 9, 5, 11, 10, 5, 0, 13, 14, 8, 7, 10, 11,
          1, 10, 3, 4, 15, 13, 4, 1, 2, 5, 11, 8, 6, 12, 7, 6, 12, 9, 0, 3, 5,
          2, 14, 15, 9, 10, 13, 0, 7, 9, 0, 14, 9, 6, 3, 3, 4, 15, 6, 5, 10, 1,
          2, 13, 8, 12, 5, 7, 14, 11, 12, 4, 11, 2, 15, 8, 1, 13, 1, 6, 10, 4,
          13, 9, 0, 8, 6, 15, 9, 3, 8, 0, 7, 11, 4, 1, 15, 2, 14, 12, 3, 5, 11,
          10, 5, 14, 2, 7, 12, 7, 13, 13, 8, 14, 11, 3, 5, 0, 6, 6, 15, 9, 0,
          10, 3, 1, 4, 2, 7, 8, 2, 5, 12, 11, 1, 12, 10, 4, 14, 15, 9, 10, 3, 6,
          15, 9, 0, 0, 6, 12, 10, 11, 1, 7, 13, 13, 8, 15, 9, 1, 4, 3, 5, 14,
          11, 5, 12, 2, 7, 8, 2, 4, 14, 2, 14, 12, 11, 4, 2, 1, 12, 7, 4, 10, 7,
          11, 13, 6, 1, 8, 5, 5, 0, 3, 15, 15, 10, 13, 3, 0, 9, 14, 8, 9, 6, 4,
          11, 2, 8, 1, 12, 11, 7, 10, 1, 13, 14, 7, 2, 8, 13, 15, 6, 9, 15, 12,
          0, 5, 9, 6, 10, 3, 4, 0, 5, 14, 3, 12, 10, 1, 15, 10, 4, 15, 2, 9, 7,
          2, 12, 6, 9, 8, 5, 0, 6, 13, 1, 3, 13, 4, 14, 14, 0, 7, 11, 5, 3, 11,
          8, 9, 4, 14, 3, 15, 2, 5, 12, 2, 9, 8, 5, 12, 15, 3, 10, 7, 11, 0, 14,
          4, 1, 10, 7, 1, 6, 13, 0, 11, 8, 6, 13, 4, 13, 11, 0, 2, 11, 14, 7,
          15, 4, 0, 9, 8, 1, 13, 10, 3, 14, 12, 3, 9, 5, 7, 12, 5, 2, 10, 15, 6,
          8, 1, 6, 1, 6, 4, 11, 11, 13, 13, 8, 12, 1, 3, 4, 7, 10, 14, 7, 10, 9,
          15, 5, 6, 0, 8, 15, 0, 14, 5, 2, 9, 3, 2, 12, 13, 1, 2, 15, 8, 13, 4,
          8, 6, 10, 15, 3, 11, 7, 1, 4, 10, 12, 9, 5, 3, 6, 14, 11, 5, 0, 0, 14,
          12, 9, 7, 2, 7, 2, 11, 1, 4, 14, 1, 7, 9, 4, 12, 10, 14, 8, 2, 13, 0,
          15, 6, 12, 10, 9, 13, 0, 15, 3, 3, 5, 5, 6, 8, 11,
        ];
        Y.substitute = function ($, Y) {
          for (var J = 0, ee = 0; ee < 4; ee++) {
            var et = ($ >>> (18 - 6 * ee)) & 63,
              er = Q[64 * ee + et];
            ((J <<= 4), (J |= er));
          }
          for (var ee = 0; ee < 4; ee++) {
            var et = (Y >>> (18 - 6 * ee)) & 63,
              er = Q[256 + 64 * ee + et];
            ((J <<= 4), (J |= er));
          }
          return J >>> 0;
        };
        var ee = [
          16, 25, 12, 11, 3, 20, 4, 15, 31, 17, 9, 6, 27, 14, 1, 22, 30, 24, 8,
          18, 0, 5, 29, 23, 13, 19, 2, 26, 10, 21, 28, 7,
        ];
        ((Y.permute = function ($) {
          for (var Y = 0, J = 0; J < ee.length; J++)
            ((Y <<= 1), (Y |= ($ >>> ee[J]) & 1));
          return Y >>> 0;
        }),
          (Y.padSplit = function ($, Y, J) {
            for (var Q = $.toString(2); Q.length < Y; ) Q = "0" + Q;
            for (var ee = [], et = 0; et < Y; et += J)
              ee.push(Q.slice(et, et + J));
            return ee.join(" ");
          }));
      },
      857: function ($, Y, J) {
        var ee = J(3895),
          et = J(7821),
          er = J(2913),
          ei = { binary: !0, hex: !0, base64: !0 };
        ((Y.DiffieHellmanGroup =
          Y.createDiffieHellmanGroup =
          Y.getDiffieHellman =
            function ($) {
              return new er(
                new Q.Buffer(et[$].prime, "hex"),
                new Q.Buffer(et[$].gen, "hex"),
              );
            }),
          (Y.createDiffieHellman = Y.DiffieHellman =
            function $(Y, J, et, en) {
              return Q.Buffer.isBuffer(J) || void 0 === ei[J]
                ? $(Y, "binary", J, et)
                : ((J = J || "binary"),
                    (en = en || "binary"),
                    (et = et || new Q.Buffer([2])),
                    Q.Buffer.isBuffer(et) || (et = new Q.Buffer(et, en)),
                    "number" == typeof Y)
                  ? new er(ee(Y, et), et, !0)
                  : (Q.Buffer.isBuffer(Y) || (Y = new Q.Buffer(Y, J)),
                    new er(Y, et, !0));
            }));
      },
      2913: function ($, Y, J) {
        var ee = J(5944),
          et = new (J(6821))(),
          er = new ee(24),
          ei = new ee(11),
          en = new ee(10),
          ea = new ee(3),
          ef = new ee(7),
          eo = J(3895),
          es = J(376);
        function eh($, Y) {
          return (
            (Y = Y || "utf8"),
            Q.Buffer.isBuffer($) || ($ = new Q.Buffer($, Y)),
            (this._pub = new ee($)),
            this
          );
        }
        function ed($, Y) {
          return (
            (Y = Y || "utf8"),
            Q.Buffer.isBuffer($) || ($ = new Q.Buffer($, Y)),
            (this._priv = new ee($)),
            this
          );
        }
        $.exports = eu;
        var ec = {};
        function eu($, Y, J) {
          (this.setGenerator(Y),
            (this.__prime = new ee($)),
            (this._prime = ee.mont(this.__prime)),
            (this._primeLen = $.length),
            (this._pub = void 0),
            (this._priv = void 0),
            (this._primeCode = void 0),
            J
              ? ((this.setPublicKey = eh), (this.setPrivateKey = ed))
              : (this._primeCode = 8));
        }
        function el($, Y) {
          var J = new Q.Buffer($.toArray());
          return Y ? J.toString(Y) : J;
        }
        (Object.defineProperty(eu.prototype, "verifyError", {
          enumerable: !0,
          get: function () {
            return (
              "number" != typeof this._primeCode &&
                (this._primeCode = (function ($, Y) {
                  var J,
                    Q = Y.toString("hex"),
                    ee = [Q, $.toString(16)].join("_");
                  if (ee in ec) return ec[ee];
                  var es = 0;
                  if (
                    $.isEven() ||
                    !eo.simpleSieve ||
                    !eo.fermatTest($) ||
                    !et.test($)
                  )
                    return (
                      (es += 1),
                      "02" === Q || "05" === Q ? (es += 8) : (es += 4),
                      (ec[ee] = es),
                      es
                    );
                  switch ((!et.test($.shrn(1)) && (es += 2), Q)) {
                    case "02":
                      $.mod(er).cmp(ei) && (es += 8);
                      break;
                    case "05":
                      (J = $.mod(en)).cmp(ea) && J.cmp(ef) && (es += 8);
                      break;
                    default:
                      es += 4;
                  }
                  return ((ec[ee] = es), es);
                })(this.__prime, this.__gen)),
              this._primeCode
            );
          },
        }),
          (eu.prototype.generateKeys = function () {
            return (
              this._priv || (this._priv = new ee(es(this._primeLen))),
              (this._pub = this._gen
                .toRed(this._prime)
                .redPow(this._priv)
                .fromRed()),
              this.getPublicKey()
            );
          }),
          (eu.prototype.computeSecret = function ($) {
            var Y = ($ = ($ = new ee($)).toRed(this._prime))
                .redPow(this._priv)
                .fromRed(),
              J = new Q.Buffer(Y.toArray()),
              et = this.getPrime();
            if (J.length < et.length) {
              var er = new Q.Buffer(et.length - J.length);
              (er.fill(0), (J = Q.Buffer.concat([er, J])));
            }
            return J;
          }),
          (eu.prototype.getPublicKey = function ($) {
            return el(this._pub, $);
          }),
          (eu.prototype.getPrivateKey = function ($) {
            return el(this._priv, $);
          }),
          (eu.prototype.getPrime = function ($) {
            return el(this.__prime, $);
          }),
          (eu.prototype.getGenerator = function ($) {
            return el(this._gen, $);
          }),
          (eu.prototype.setGenerator = function ($, Y) {
            return (
              (Y = Y || "utf8"),
              Q.Buffer.isBuffer($) || ($ = new Q.Buffer($, Y)),
              (this.__gen = $),
              (this._gen = new ee($)),
              this
            );
          }));
      },
      3895: function ($, Y, J) {
        var Q = J(376);
        (($.exports = el), (el.simpleSieve = ec), (el.fermatTest = eu));
        var ee = J(5944),
          et = new ee(24),
          er = new (J(6821))(),
          ei = new ee(1),
          en = new ee(2),
          ea = new ee(5);
        (new ee(16), new ee(8));
        var ef = new ee(10),
          eo = new ee(3);
        new ee(7);
        var es = new ee(11),
          eh = new ee(4);
        new ee(12);
        var ed = null;
        function ec($) {
          for (
            var Y = (function () {
                if (null !== ed) return ed;
                var $ = [];
                $[0] = 2;
                for (var Y = 1, J = 3; J < 1048576; J += 2) {
                  for (
                    var Q = Math.ceil(Math.sqrt(J)), ee = 0;
                    ee < Y && $[ee] <= Q && J % $[ee] != 0;
                    ee++
                  );
                  (Y !== ee && $[ee] <= Q) || ($[Y++] = J);
                }
                return ((ed = $), $);
              })(),
              J = 0;
            J < Y.length;
            J++
          )
            if (0 === $.modn(Y[J]))
              if (0 !== $.cmpn(Y[J])) return !1;
              else break;
          return !0;
        }
        function eu($) {
          var Y = ee.mont($);
          return 0 === en.toRed(Y).redPow($.subn(1)).fromRed().cmpn(1);
        }
        function el($, Y) {
          var J, ed;
          if ($ < 16)
            if (2 === Y || 5 === Y) return new ee([140, 123]);
            else return new ee([140, 39]);
          for (Y = new ee(Y); ; ) {
            for (J = new ee(Q(Math.ceil($ / 8))); J.bitLength() > $; )
              J.ishrn(1);
            if (
              (J.isEven() && J.iadd(ei), J.testn(1) || J.iadd(en), Y.cmp(en))
            ) {
              if (!Y.cmp(ea)) for (; J.mod(ef).cmp(eo); ) J.iadd(eh);
            } else for (; J.mod(et).cmp(es); ) J.iadd(eh);
            if (
              ec((ed = J.shrn(1))) &&
              ec(J) &&
              eu(ed) &&
              eu(J) &&
              er.test(ed) &&
              er.test(J)
            )
              return J;
          }
        }
      },
      2049: function ($, Y, J) {
        "use strict";
        ((Y.version = J(4497).rE),
          (Y.utils = J(3355)),
          (Y.rand = J(4259)),
          (Y.curve = J(7942)),
          (Y.curves = J(7736)),
          (Y.ec = J(1039)),
          (Y.eddsa = J(4226)));
      },
      4285: function ($, Y, J) {
        "use strict";
        var Q = J(5944),
          ee = J(3355),
          et = ee.getNAF,
          er = ee.getJSF,
          ei = ee.assert;
        function en($, Y) {
          ((this.type = $),
            (this.p = new Q(Y.p, 16)),
            (this.red = Y.prime ? Q.red(Y.prime) : Q.mont(this.p)),
            (this.zero = new Q(0).toRed(this.red)),
            (this.one = new Q(1).toRed(this.red)),
            (this.two = new Q(2).toRed(this.red)),
            (this.n = Y.n && new Q(Y.n, 16)),
            (this.g = Y.g && this.pointFromJSON(Y.g, Y.gRed)),
            (this._wnafT1 = [, , , ,]),
            (this._wnafT2 = [, , , ,]),
            (this._wnafT3 = [, , , ,]),
            (this._wnafT4 = [, , , ,]),
            (this._bitLength = this.n ? this.n.bitLength() : 0));
          var J = this.n && this.p.div(this.n);
          !J || J.cmpn(100) > 0
            ? (this.redN = null)
            : ((this._maxwellTrick = !0), (this.redN = this.n.toRed(this.red)));
        }
        function ea($, Y) {
          ((this.curve = $), (this.type = Y), (this.precomputed = null));
        }
        (($.exports = en),
          (en.prototype.point = function () {
            throw Error("Not implemented");
          }),
          (en.prototype.validate = function () {
            throw Error("Not implemented");
          }),
          (en.prototype._fixedNafMul = function ($, Y) {
            ei($.precomputed);
            var J = $._getDoubles(),
              Q = et(Y, 1, this._bitLength),
              ee = (1 << (J.step + 1)) - (J.step % 2 == 0 ? 2 : 1);
            ee /= 3;
            for (var er = [], en = 0; en < Q.length; en += J.step) {
              for (var ea = 0, Y = en + J.step - 1; Y >= en; Y--)
                ea = (ea << 1) + Q[Y];
              er.push(ea);
            }
            for (
              var ef = this.jpoint(null, null, null),
                eo = this.jpoint(null, null, null),
                es = ee;
              es > 0;
              es--
            ) {
              for (var en = 0; en < er.length; en++) {
                var ea = er[en];
                ea === es
                  ? (eo = eo.mixedAdd(J.points[en]))
                  : ea === -es && (eo = eo.mixedAdd(J.points[en].neg()));
              }
              ef = ef.add(eo);
            }
            return ef.toP();
          }),
          (en.prototype._wnafMul = function ($, Y) {
            var J = 4,
              Q = $._getNAFPoints(J);
            J = Q.wnd;
            for (
              var ee = Q.points,
                er = et(Y, J, this._bitLength),
                en = this.jpoint(null, null, null),
                ea = er.length - 1;
              ea >= 0;
              ea--
            ) {
              for (var Y = 0; ea >= 0 && 0 === er[ea]; ea--) Y++;
              if ((ea >= 0 && Y++, (en = en.dblp(Y)), ea < 0)) break;
              var ef = er[ea];
              (ei(0 !== ef),
                (en =
                  "affine" === $.type
                    ? ef > 0
                      ? en.mixedAdd(ee[(ef - 1) >> 1])
                      : en.mixedAdd(ee[(-ef - 1) >> 1].neg())
                    : ef > 0
                      ? en.add(ee[(ef - 1) >> 1])
                      : en.add(ee[(-ef - 1) >> 1].neg())));
            }
            return "affine" === $.type ? en.toP() : en;
          }),
          (en.prototype._wnafMulAdd = function ($, Y, J, Q, ee) {
            for (
              var ei = this._wnafT1,
                en = this._wnafT2,
                ea = this._wnafT3,
                ef = 0,
                eo = 0;
              eo < Q;
              eo++
            ) {
              var es = Y[eo],
                eh = es._getNAFPoints($);
              ((ei[eo] = eh.wnd), (en[eo] = eh.points));
            }
            for (var eo = Q - 1; eo >= 1; eo -= 2) {
              var ed = eo - 1,
                ec = eo;
              if (1 !== ei[ed] || 1 !== ei[ec]) {
                ((ea[ed] = et(J[ed], ei[ed], this._bitLength)),
                  (ea[ec] = et(J[ec], ei[ec], this._bitLength)),
                  (ef = Math.max(ea[ed].length, ef)),
                  (ef = Math.max(ea[ec].length, ef)));
                continue;
              }
              var eu = [Y[ed], null, null, Y[ec]];
              0 === Y[ed].y.cmp(Y[ec].y)
                ? ((eu[1] = Y[ed].add(Y[ec])),
                  (eu[2] = Y[ed].toJ().mixedAdd(Y[ec].neg())))
                : 0 === Y[ed].y.cmp(Y[ec].y.redNeg())
                  ? ((eu[1] = Y[ed].toJ().mixedAdd(Y[ec])),
                    (eu[2] = Y[ed].add(Y[ec].neg())))
                  : ((eu[1] = Y[ed].toJ().mixedAdd(Y[ec])),
                    (eu[2] = Y[ed].toJ().mixedAdd(Y[ec].neg())));
              var el = [-3, -1, -5, -7, 0, 7, 5, 1, 3],
                ep = er(J[ed], J[ec]);
              ((ef = Math.max(ep[0].length, ef)),
                (ea[ed] = Array(ef)),
                (ea[ec] = Array(ef)));
              for (var eb = 0; eb < ef; eb++) {
                var em = 0 | ep[0][eb],
                  eg = 0 | ep[1][eb];
                ((ea[ed][eb] = el[(em + 1) * 3 + (eg + 1)]),
                  (ea[ec][eb] = 0),
                  (en[ed] = eu));
              }
            }
            for (
              var ey = this.jpoint(null, null, null),
                ev = this._wnafT4,
                eo = ef;
              eo >= 0;
              eo--
            ) {
              for (var e_ = 0; eo >= 0; ) {
                for (var ew = !0, eb = 0; eb < Q; eb++)
                  ((ev[eb] = 0 | ea[eb][eo]), 0 !== ev[eb] && (ew = !1));
                if (!ew) break;
                (e_++, eo--);
              }
              if ((eo >= 0 && e_++, (ey = ey.dblp(e_)), eo < 0)) break;
              for (var eb = 0; eb < Q; eb++) {
                var es,
                  ex = ev[eb];
                0 !== ex &&
                  (ex > 0
                    ? (es = en[eb][(ex - 1) >> 1])
                    : ex < 0 && (es = en[eb][(-ex - 1) >> 1].neg()),
                  (ey = "affine" === es.type ? ey.mixedAdd(es) : ey.add(es)));
              }
            }
            for (var eo = 0; eo < Q; eo++) en[eo] = null;
            return ee ? ey : ey.toP();
          }),
          (en.BasePoint = ea),
          (ea.prototype.eq = function () {
            throw Error("Not implemented");
          }),
          (ea.prototype.validate = function () {
            return this.curve.validate(this);
          }),
          (en.prototype.decodePoint = function ($, Y) {
            $ = ee.toArray($, Y);
            var J = this.p.byteLength();
            if (
              (4 === $[0] || 6 === $[0] || 7 === $[0]) &&
              $.length - 1 == 2 * J
            )
              return (
                6 === $[0]
                  ? ei($[$.length - 1] % 2 == 0)
                  : 7 === $[0] && ei($[$.length - 1] % 2 == 1),
                this.point($.slice(1, 1 + J), $.slice(1 + J, 1 + 2 * J))
              );
            if ((2 === $[0] || 3 === $[0]) && $.length - 1 === J)
              return this.pointFromX($.slice(1, 1 + J), 3 === $[0]);
            throw Error("Unknown point format");
          }),
          (ea.prototype.encodeCompressed = function ($) {
            return this.encode($, !0);
          }),
          (ea.prototype._encode = function ($) {
            var Y = this.curve.p.byteLength(),
              J = this.getX().toArray("be", Y);
            return $
              ? [this.getY().isEven() ? 2 : 3].concat(J)
              : [4].concat(J, this.getY().toArray("be", Y));
          }),
          (ea.prototype.encode = function ($, Y) {
            return ee.encode(this._encode(Y), $);
          }),
          (ea.prototype.precompute = function ($) {
            if (this.precomputed) return this;
            var Y = { doubles: null, naf: null, beta: null };
            return (
              (Y.naf = this._getNAFPoints(8)),
              (Y.doubles = this._getDoubles(4, $)),
              (Y.beta = this._getBeta()),
              (this.precomputed = Y),
              this
            );
          }),
          (ea.prototype._hasDoubles = function ($) {
            if (!this.precomputed) return !1;
            var Y = this.precomputed.doubles;
            return (
              !!Y && Y.points.length >= Math.ceil(($.bitLength() + 1) / Y.step)
            );
          }),
          (ea.prototype._getDoubles = function ($, Y) {
            if (this.precomputed && this.precomputed.doubles)
              return this.precomputed.doubles;
            for (var J = [this], Q = this, ee = 0; ee < Y; ee += $) {
              for (var et = 0; et < $; et++) Q = Q.dbl();
              J.push(Q);
            }
            return { step: $, points: J };
          }),
          (ea.prototype._getNAFPoints = function ($) {
            if (this.precomputed && this.precomputed.naf)
              return this.precomputed.naf;
            for (
              var Y = [this],
                J = (1 << $) - 1,
                Q = 1 === J ? null : this.dbl(),
                ee = 1;
              ee < J;
              ee++
            )
              Y[ee] = Y[ee - 1].add(Q);
            return { wnd: $, points: Y };
          }),
          (ea.prototype._getBeta = function () {
            return null;
          }),
          (ea.prototype.dblp = function ($) {
            for (var Y = this, J = 0; J < $; J++) Y = Y.dbl();
            return Y;
          }));
      },
      3546: function ($, Y, J) {
        "use strict";
        var Q = J(3355),
          ee = J(5944),
          et = J(1638),
          er = J(4285),
          ei = Q.assert;
        function en($) {
          ((this.twisted = (0 | $.a) != 1),
            (this.mOneA = this.twisted && (0 | $.a) == -1),
            (this.extended = this.mOneA),
            er.call(this, "edwards", $),
            (this.a = new ee($.a, 16).umod(this.red.m)),
            (this.a = this.a.toRed(this.red)),
            (this.c = new ee($.c, 16).toRed(this.red)),
            (this.c2 = this.c.redSqr()),
            (this.d = new ee($.d, 16).toRed(this.red)),
            (this.dd = this.d.redAdd(this.d)),
            ei(!this.twisted || 0 === this.c.fromRed().cmpn(1)),
            (this.oneC = (0 | $.c) == 1));
        }
        function ea($, Y, J, Q, et) {
          (er.BasePoint.call(this, $, "projective"),
            null === Y && null === J && null === Q
              ? ((this.x = this.curve.zero),
                (this.y = this.curve.one),
                (this.z = this.curve.one),
                (this.t = this.curve.zero),
                (this.zOne = !0))
              : ((this.x = new ee(Y, 16)),
                (this.y = new ee(J, 16)),
                (this.z = Q ? new ee(Q, 16) : this.curve.one),
                (this.t = et && new ee(et, 16)),
                this.x.red || (this.x = this.x.toRed(this.curve.red)),
                this.y.red || (this.y = this.y.toRed(this.curve.red)),
                this.z.red || (this.z = this.z.toRed(this.curve.red)),
                this.t &&
                  !this.t.red &&
                  (this.t = this.t.toRed(this.curve.red)),
                (this.zOne = this.z === this.curve.one),
                this.curve.extended &&
                  !this.t &&
                  ((this.t = this.x.redMul(this.y)),
                  this.zOne || (this.t = this.t.redMul(this.z.redInvm())))));
        }
        (et(en, er),
          ($.exports = en),
          (en.prototype._mulA = function ($) {
            return this.mOneA ? $.redNeg() : this.a.redMul($);
          }),
          (en.prototype._mulC = function ($) {
            return this.oneC ? $ : this.c.redMul($);
          }),
          (en.prototype.jpoint = function ($, Y, J, Q) {
            return this.point($, Y, J, Q);
          }),
          (en.prototype.pointFromX = function ($, Y) {
            ($ = new ee($, 16)).red || ($ = $.toRed(this.red));
            var J = $.redSqr(),
              Q = this.c2.redSub(this.a.redMul(J)),
              et = this.one.redSub(this.c2.redMul(this.d).redMul(J)),
              er = Q.redMul(et.redInvm()),
              ei = er.redSqrt();
            if (0 !== ei.redSqr().redSub(er).cmp(this.zero))
              throw Error("invalid point");
            var en = ei.fromRed().isOdd();
            return (
              ((Y && !en) || (!Y && en)) && (ei = ei.redNeg()),
              this.point($, ei)
            );
          }),
          (en.prototype.pointFromY = function ($, Y) {
            ($ = new ee($, 16)).red || ($ = $.toRed(this.red));
            var J = $.redSqr(),
              Q = J.redSub(this.c2),
              et = J.redMul(this.d).redMul(this.c2).redSub(this.a),
              er = Q.redMul(et.redInvm());
            if (0 === er.cmp(this.zero))
              if (!Y) return this.point(this.zero, $);
              else throw Error("invalid point");
            var ei = er.redSqrt();
            if (0 !== ei.redSqr().redSub(er).cmp(this.zero))
              throw Error("invalid point");
            return (
              ei.fromRed().isOdd() !== Y && (ei = ei.redNeg()),
              this.point(ei, $)
            );
          }),
          (en.prototype.validate = function ($) {
            if ($.isInfinity()) return !0;
            $.normalize();
            var Y = $.x.redSqr(),
              J = $.y.redSqr(),
              Q = Y.redMul(this.a).redAdd(J),
              ee = this.c2.redMul(this.one.redAdd(this.d.redMul(Y).redMul(J)));
            return 0 === Q.cmp(ee);
          }),
          et(ea, er.BasePoint),
          (en.prototype.pointFromJSON = function ($) {
            return ea.fromJSON(this, $);
          }),
          (en.prototype.point = function ($, Y, J, Q) {
            return new ea(this, $, Y, J, Q);
          }),
          (ea.fromJSON = function ($, Y) {
            return new ea($, Y[0], Y[1], Y[2]);
          }),
          (ea.prototype.inspect = function () {
            return this.isInfinity()
              ? "<EC Point Infinity>"
              : "<EC Point x: " +
                  this.x.fromRed().toString(16, 2) +
                  " y: " +
                  this.y.fromRed().toString(16, 2) +
                  " z: " +
                  this.z.fromRed().toString(16, 2) +
                  ">";
          }),
          (ea.prototype.isInfinity = function () {
            return (
              0 === this.x.cmpn(0) &&
              (0 === this.y.cmp(this.z) ||
                (this.zOne && 0 === this.y.cmp(this.curve.c)))
            );
          }),
          (ea.prototype._extDbl = function () {
            var $ = this.x.redSqr(),
              Y = this.y.redSqr(),
              J = this.z.redSqr();
            J = J.redIAdd(J);
            var Q = this.curve._mulA($),
              ee = this.x.redAdd(this.y).redSqr().redISub($).redISub(Y),
              et = Q.redAdd(Y),
              er = et.redSub(J),
              ei = Q.redSub(Y),
              en = ee.redMul(er),
              ea = et.redMul(ei),
              ef = ee.redMul(ei),
              eo = er.redMul(et);
            return this.curve.point(en, ea, eo, ef);
          }),
          (ea.prototype._projDbl = function () {
            var $,
              Y,
              J,
              Q = this.x.redAdd(this.y).redSqr(),
              ee = this.x.redSqr(),
              et = this.y.redSqr();
            if (this.curve.twisted) {
              var er = this.curve._mulA(ee),
                ei = er.redAdd(et);
              if (this.zOne)
                (($ = Q.redSub(ee)
                  .redSub(et)
                  .redMul(ei.redSub(this.curve.two))),
                  (Y = ei.redMul(er.redSub(et))),
                  (J = ei.redSqr().redSub(ei).redSub(ei)));
              else {
                var en = this.z.redSqr(),
                  ea = ei.redSub(en).redISub(en);
                (($ = Q.redSub(ee).redISub(et).redMul(ea)),
                  (Y = ei.redMul(er.redSub(et))),
                  (J = ei.redMul(ea)));
              }
            } else {
              var er = ee.redAdd(et),
                en = this.curve._mulC(this.z).redSqr(),
                ea = er.redSub(en).redSub(en);
              (($ = this.curve._mulC(Q.redISub(er)).redMul(ea)),
                (Y = this.curve._mulC(er).redMul(ee.redISub(et))),
                (J = er.redMul(ea)));
            }
            return this.curve.point($, Y, J);
          }),
          (ea.prototype.dbl = function () {
            return this.isInfinity()
              ? this
              : this.curve.extended
                ? this._extDbl()
                : this._projDbl();
          }),
          (ea.prototype._extAdd = function ($) {
            var Y = this.y.redSub(this.x).redMul($.y.redSub($.x)),
              J = this.y.redAdd(this.x).redMul($.y.redAdd($.x)),
              Q = this.t.redMul(this.curve.dd).redMul($.t),
              ee = this.z.redMul($.z.redAdd($.z)),
              et = J.redSub(Y),
              er = ee.redSub(Q),
              ei = ee.redAdd(Q),
              en = J.redAdd(Y),
              ea = et.redMul(er),
              ef = ei.redMul(en),
              eo = et.redMul(en),
              es = er.redMul(ei);
            return this.curve.point(ea, ef, es, eo);
          }),
          (ea.prototype._projAdd = function ($) {
            var Y,
              J,
              Q = this.z.redMul($.z),
              ee = Q.redSqr(),
              et = this.x.redMul($.x),
              er = this.y.redMul($.y),
              ei = this.curve.d.redMul(et).redMul(er),
              en = ee.redSub(ei),
              ea = ee.redAdd(ei),
              ef = this.x
                .redAdd(this.y)
                .redMul($.x.redAdd($.y))
                .redISub(et)
                .redISub(er),
              eo = Q.redMul(en).redMul(ef);
            return (
              this.curve.twisted
                ? ((Y = Q.redMul(ea).redMul(er.redSub(this.curve._mulA(et)))),
                  (J = en.redMul(ea)))
                : ((Y = Q.redMul(ea).redMul(er.redSub(et))),
                  (J = this.curve._mulC(en).redMul(ea))),
              this.curve.point(eo, Y, J)
            );
          }),
          (ea.prototype.add = function ($) {
            return this.isInfinity()
              ? $
              : $.isInfinity()
                ? this
                : this.curve.extended
                  ? this._extAdd($)
                  : this._projAdd($);
          }),
          (ea.prototype.mul = function ($) {
            return this._hasDoubles($)
              ? this.curve._fixedNafMul(this, $)
              : this.curve._wnafMul(this, $);
          }),
          (ea.prototype.mulAdd = function ($, Y, J) {
            return this.curve._wnafMulAdd(1, [this, Y], [$, J], 2, !1);
          }),
          (ea.prototype.jmulAdd = function ($, Y, J) {
            return this.curve._wnafMulAdd(1, [this, Y], [$, J], 2, !0);
          }),
          (ea.prototype.normalize = function () {
            if (this.zOne) return this;
            var $ = this.z.redInvm();
            return (
              (this.x = this.x.redMul($)),
              (this.y = this.y.redMul($)),
              this.t && (this.t = this.t.redMul($)),
              (this.z = this.curve.one),
              (this.zOne = !0),
              this
            );
          }),
          (ea.prototype.neg = function () {
            return this.curve.point(
              this.x.redNeg(),
              this.y,
              this.z,
              this.t && this.t.redNeg(),
            );
          }),
          (ea.prototype.getX = function () {
            return (this.normalize(), this.x.fromRed());
          }),
          (ea.prototype.getY = function () {
            return (this.normalize(), this.y.fromRed());
          }),
          (ea.prototype.eq = function ($) {
            return (
              this === $ ||
              (0 === this.getX().cmp($.getX()) &&
                0 === this.getY().cmp($.getY()))
            );
          }),
          (ea.prototype.eqXToP = function ($) {
            var Y = $.toRed(this.curve.red).redMul(this.z);
            if (0 === this.x.cmp(Y)) return !0;
            for (var J = $.clone(), Q = this.curve.redN.redMul(this.z); ; ) {
              if ((J.iadd(this.curve.n), J.cmp(this.curve.p) >= 0)) return !1;
              if ((Y.redIAdd(Q), 0 === this.x.cmp(Y))) return !0;
            }
          }),
          (ea.prototype.toP = ea.prototype.normalize),
          (ea.prototype.mixedAdd = ea.prototype.add));
      },
      7942: function ($, Y, J) {
        "use strict";
        ((Y.base = J(4285)),
          (Y.short = J(2252)),
          (Y.mont = J(5274)),
          (Y.edwards = J(3546)));
      },
      5274: function ($, Y, J) {
        "use strict";
        var Q = J(5944),
          ee = J(1638),
          et = J(4285),
          er = J(3355);
        function ei($) {
          (et.call(this, "mont", $),
            (this.a = new Q($.a, 16).toRed(this.red)),
            (this.b = new Q($.b, 16).toRed(this.red)),
            (this.i4 = new Q(4).toRed(this.red).redInvm()),
            (this.two = new Q(2).toRed(this.red)),
            (this.a24 = this.i4.redMul(this.a.redAdd(this.two))));
        }
        function en($, Y, J) {
          (et.BasePoint.call(this, $, "projective"),
            null === Y && null === J
              ? ((this.x = this.curve.one), (this.z = this.curve.zero))
              : ((this.x = new Q(Y, 16)),
                (this.z = new Q(J, 16)),
                this.x.red || (this.x = this.x.toRed(this.curve.red)),
                this.z.red || (this.z = this.z.toRed(this.curve.red))));
        }
        (ee(ei, et),
          ($.exports = ei),
          (ei.prototype.validate = function ($) {
            var Y = $.normalize().x,
              J = Y.redSqr(),
              Q = J.redMul(Y).redAdd(J.redMul(this.a)).redAdd(Y);
            return 0 === Q.redSqrt().redSqr().cmp(Q);
          }),
          ee(en, et.BasePoint),
          (ei.prototype.decodePoint = function ($, Y) {
            return this.point(er.toArray($, Y), 1);
          }),
          (ei.prototype.point = function ($, Y) {
            return new en(this, $, Y);
          }),
          (ei.prototype.pointFromJSON = function ($) {
            return en.fromJSON(this, $);
          }),
          (en.prototype.precompute = function () {}),
          (en.prototype._encode = function () {
            return this.getX().toArray("be", this.curve.p.byteLength());
          }),
          (en.fromJSON = function ($, Y) {
            return new en($, Y[0], Y[1] || $.one);
          }),
          (en.prototype.inspect = function () {
            return this.isInfinity()
              ? "<EC Point Infinity>"
              : "<EC Point x: " +
                  this.x.fromRed().toString(16, 2) +
                  " z: " +
                  this.z.fromRed().toString(16, 2) +
                  ">";
          }),
          (en.prototype.isInfinity = function () {
            return 0 === this.z.cmpn(0);
          }),
          (en.prototype.dbl = function () {
            var $ = this.x.redAdd(this.z).redSqr(),
              Y = this.x.redSub(this.z).redSqr(),
              J = $.redSub(Y),
              Q = $.redMul(Y),
              ee = J.redMul(Y.redAdd(this.curve.a24.redMul(J)));
            return this.curve.point(Q, ee);
          }),
          (en.prototype.add = function () {
            throw Error("Not supported on Montgomery curve");
          }),
          (en.prototype.diffAdd = function ($, Y) {
            var J = this.x.redAdd(this.z),
              Q = this.x.redSub(this.z),
              ee = $.x.redAdd($.z),
              et = $.x.redSub($.z).redMul(J),
              er = ee.redMul(Q),
              ei = Y.z.redMul(et.redAdd(er).redSqr()),
              en = Y.x.redMul(et.redISub(er).redSqr());
            return this.curve.point(ei, en);
          }),
          (en.prototype.mul = function ($) {
            for (
              var Y = $.clone(),
                J = this,
                Q = this.curve.point(null, null),
                ee = [];
              0 !== Y.cmpn(0);
              Y.iushrn(1)
            )
              ee.push(Y.andln(1));
            for (var et = ee.length - 1; et >= 0; et--)
              0 === ee[et]
                ? ((J = J.diffAdd(Q, this)), (Q = Q.dbl()))
                : ((Q = J.diffAdd(Q, this)), (J = J.dbl()));
            return Q;
          }),
          (en.prototype.mulAdd = function () {
            throw Error("Not supported on Montgomery curve");
          }),
          (en.prototype.jumlAdd = function () {
            throw Error("Not supported on Montgomery curve");
          }),
          (en.prototype.eq = function ($) {
            return 0 === this.getX().cmp($.getX());
          }),
          (en.prototype.normalize = function () {
            return (
              (this.x = this.x.redMul(this.z.redInvm())),
              (this.z = this.curve.one),
              this
            );
          }),
          (en.prototype.getX = function () {
            return (this.normalize(), this.x.fromRed());
          }));
      },
      2252: function ($, Y, J) {
        "use strict";
        var Q = J(3355),
          ee = J(5944),
          et = J(1638),
          er = J(4285),
          ei = Q.assert;
        function en($) {
          (er.call(this, "short", $),
            (this.a = new ee($.a, 16).toRed(this.red)),
            (this.b = new ee($.b, 16).toRed(this.red)),
            (this.tinv = this.two.redInvm()),
            (this.zeroA = 0 === this.a.fromRed().cmpn(0)),
            (this.threeA = 0 === this.a.fromRed().sub(this.p).cmpn(-3)),
            (this.endo = this._getEndomorphism($)),
            (this._endoWnafT1 = [, , , ,]),
            (this._endoWnafT2 = [, , , ,]));
        }
        function ea($, Y, J, Q) {
          (er.BasePoint.call(this, $, "affine"),
            null === Y && null === J
              ? ((this.x = null), (this.y = null), (this.inf = !0))
              : ((this.x = new ee(Y, 16)),
                (this.y = new ee(J, 16)),
                Q &&
                  (this.x.forceRed(this.curve.red),
                  this.y.forceRed(this.curve.red)),
                this.x.red || (this.x = this.x.toRed(this.curve.red)),
                this.y.red || (this.y = this.y.toRed(this.curve.red)),
                (this.inf = !1)));
        }
        function ef($, Y, J, Q) {
          (er.BasePoint.call(this, $, "jacobian"),
            null === Y && null === J && null === Q
              ? ((this.x = this.curve.one),
                (this.y = this.curve.one),
                (this.z = new ee(0)))
              : ((this.x = new ee(Y, 16)),
                (this.y = new ee(J, 16)),
                (this.z = new ee(Q, 16))),
            this.x.red || (this.x = this.x.toRed(this.curve.red)),
            this.y.red || (this.y = this.y.toRed(this.curve.red)),
            this.z.red || (this.z = this.z.toRed(this.curve.red)),
            (this.zOne = this.z === this.curve.one));
        }
        (et(en, er),
          ($.exports = en),
          (en.prototype._getEndomorphism = function ($) {
            if (this.zeroA && this.g && this.n && 1 === this.p.modn(3)) {
              if ($.beta) Y = new ee($.beta, 16).toRed(this.red);
              else {
                var Y,
                  J,
                  Q,
                  et = this._getEndoRoots(this.p);
                Y = (Y = 0 > et[0].cmp(et[1]) ? et[0] : et[1]).toRed(this.red);
              }
              if ($.lambda) J = new ee($.lambda, 16);
              else {
                var er = this._getEndoRoots(this.n);
                0 === this.g.mul(er[0]).x.cmp(this.g.x.redMul(Y))
                  ? (J = er[0])
                  : ((J = er[1]),
                    ei(0 === this.g.mul(J).x.cmp(this.g.x.redMul(Y))));
              }
              return (
                (Q = $.basis
                  ? $.basis.map(function ($) {
                      return { a: new ee($.a, 16), b: new ee($.b, 16) };
                    })
                  : this._getEndoBasis(J)),
                { beta: Y, lambda: J, basis: Q }
              );
            }
          }),
          (en.prototype._getEndoRoots = function ($) {
            var Y = $ === this.p ? this.red : ee.mont($),
              J = new ee(2).toRed(Y).redInvm(),
              Q = J.redNeg(),
              et = new ee(3).toRed(Y).redNeg().redSqrt().redMul(J);
            return [Q.redAdd(et).fromRed(), Q.redSub(et).fromRed()];
          }),
          (en.prototype._getEndoBasis = function ($) {
            for (
              var Y,
                J,
                Q,
                et,
                er,
                ei,
                en,
                ea,
                ef,
                eo = this.n.ushrn(Math.floor(this.n.bitLength() / 2)),
                es = $,
                eh = this.n.clone(),
                ed = new ee(1),
                ec = new ee(0),
                eu = new ee(0),
                el = new ee(1),
                ep = 0;
              0 !== es.cmpn(0);

            ) {
              var eb = eh.div(es);
              ((ea = eh.sub(eb.mul(es))), (ef = eu.sub(eb.mul(ed))));
              var em = el.sub(eb.mul(ec));
              if (!Q && 0 > ea.cmp(eo))
                ((Y = en.neg()), (J = ed), (Q = ea.neg()), (et = ef));
              else if (Q && 2 == ++ep) break;
              ((en = ea),
                (eh = es),
                (es = ea),
                (eu = ed),
                (ed = ef),
                (el = ec),
                (ec = em));
            }
            ((er = ea.neg()), (ei = ef));
            var eg = Q.sqr().add(et.sqr());
            return (
              er.sqr().add(ei.sqr()).cmp(eg) >= 0 && ((er = Y), (ei = J)),
              Q.negative && ((Q = Q.neg()), (et = et.neg())),
              er.negative && ((er = er.neg()), (ei = ei.neg())),
              [
                { a: Q, b: et },
                { a: er, b: ei },
              ]
            );
          }),
          (en.prototype._endoSplit = function ($) {
            var Y = this.endo.basis,
              J = Y[0],
              Q = Y[1],
              ee = Q.b.mul($).divRound(this.n),
              et = J.b.neg().mul($).divRound(this.n),
              er = ee.mul(J.a),
              ei = et.mul(Q.a),
              en = ee.mul(J.b),
              ea = et.mul(Q.b);
            return { k1: $.sub(er).sub(ei), k2: en.add(ea).neg() };
          }),
          (en.prototype.pointFromX = function ($, Y) {
            ($ = new ee($, 16)).red || ($ = $.toRed(this.red));
            var J = $.redSqr()
                .redMul($)
                .redIAdd($.redMul(this.a))
                .redIAdd(this.b),
              Q = J.redSqrt();
            if (0 !== Q.redSqr().redSub(J).cmp(this.zero))
              throw Error("invalid point");
            var et = Q.fromRed().isOdd();
            return (
              ((Y && !et) || (!Y && et)) && (Q = Q.redNeg()),
              this.point($, Q)
            );
          }),
          (en.prototype.validate = function ($) {
            if ($.inf) return !0;
            var Y = $.x,
              J = $.y,
              Q = this.a.redMul(Y),
              ee = Y.redSqr().redMul(Y).redIAdd(Q).redIAdd(this.b);
            return 0 === J.redSqr().redISub(ee).cmpn(0);
          }),
          (en.prototype._endoWnafMulAdd = function ($, Y, J) {
            for (
              var Q = this._endoWnafT1, ee = this._endoWnafT2, et = 0;
              et < $.length;
              et++
            ) {
              var er = this._endoSplit(Y[et]),
                ei = $[et],
                en = ei._getBeta();
              (er.k1.negative && (er.k1.ineg(), (ei = ei.neg(!0))),
                er.k2.negative && (er.k2.ineg(), (en = en.neg(!0))),
                (Q[2 * et] = ei),
                (Q[2 * et + 1] = en),
                (ee[2 * et] = er.k1),
                (ee[2 * et + 1] = er.k2));
            }
            for (
              var ea = this._wnafMulAdd(1, Q, ee, 2 * et, J), ef = 0;
              ef < 2 * et;
              ef++
            )
              ((Q[ef] = null), (ee[ef] = null));
            return ea;
          }),
          et(ea, er.BasePoint),
          (en.prototype.point = function ($, Y, J) {
            return new ea(this, $, Y, J);
          }),
          (en.prototype.pointFromJSON = function ($, Y) {
            return ea.fromJSON(this, $, Y);
          }),
          (ea.prototype._getBeta = function () {
            if (this.curve.endo) {
              var $ = this.precomputed;
              if ($ && $.beta) return $.beta;
              var Y = this.curve.point(
                this.x.redMul(this.curve.endo.beta),
                this.y,
              );
              if ($) {
                var J = this.curve,
                  Q = function ($) {
                    return J.point($.x.redMul(J.endo.beta), $.y);
                  };
                (($.beta = Y),
                  (Y.precomputed = {
                    beta: null,
                    naf: $.naf && {
                      wnd: $.naf.wnd,
                      points: $.naf.points.map(Q),
                    },
                    doubles: $.doubles && {
                      step: $.doubles.step,
                      points: $.doubles.points.map(Q),
                    },
                  }));
              }
              return Y;
            }
          }),
          (ea.prototype.toJSON = function () {
            return this.precomputed
              ? [
                  this.x,
                  this.y,
                  this.precomputed && {
                    doubles: this.precomputed.doubles && {
                      step: this.precomputed.doubles.step,
                      points: this.precomputed.doubles.points.slice(1),
                    },
                    naf: this.precomputed.naf && {
                      wnd: this.precomputed.naf.wnd,
                      points: this.precomputed.naf.points.slice(1),
                    },
                  },
                ]
              : [this.x, this.y];
          }),
          (ea.fromJSON = function ($, Y, J) {
            "string" == typeof Y && (Y = JSON.parse(Y));
            var Q = $.point(Y[0], Y[1], J);
            if (!Y[2]) return Q;
            function ee(Y) {
              return $.point(Y[0], Y[1], J);
            }
            var et = Y[2];
            return (
              (Q.precomputed = {
                beta: null,
                doubles: et.doubles && {
                  step: et.doubles.step,
                  points: [Q].concat(et.doubles.points.map(ee)),
                },
                naf: et.naf && {
                  wnd: et.naf.wnd,
                  points: [Q].concat(et.naf.points.map(ee)),
                },
              }),
              Q
            );
          }),
          (ea.prototype.inspect = function () {
            return this.isInfinity()
              ? "<EC Point Infinity>"
              : "<EC Point x: " +
                  this.x.fromRed().toString(16, 2) +
                  " y: " +
                  this.y.fromRed().toString(16, 2) +
                  ">";
          }),
          (ea.prototype.isInfinity = function () {
            return this.inf;
          }),
          (ea.prototype.add = function ($) {
            if (this.inf) return $;
            if ($.inf) return this;
            if (this.eq($)) return this.dbl();
            if (this.neg().eq($) || 0 === this.x.cmp($.x))
              return this.curve.point(null, null);
            var Y = this.y.redSub($.y);
            0 !== Y.cmpn(0) && (Y = Y.redMul(this.x.redSub($.x).redInvm()));
            var J = Y.redSqr().redISub(this.x).redISub($.x),
              Q = Y.redMul(this.x.redSub(J)).redISub(this.y);
            return this.curve.point(J, Q);
          }),
          (ea.prototype.dbl = function () {
            if (this.inf) return this;
            var $ = this.y.redAdd(this.y);
            if (0 === $.cmpn(0)) return this.curve.point(null, null);
            var Y = this.curve.a,
              J = this.x.redSqr(),
              Q = $.redInvm(),
              ee = J.redAdd(J).redIAdd(J).redIAdd(Y).redMul(Q),
              et = ee.redSqr().redISub(this.x.redAdd(this.x)),
              er = ee.redMul(this.x.redSub(et)).redISub(this.y);
            return this.curve.point(et, er);
          }),
          (ea.prototype.getX = function () {
            return this.x.fromRed();
          }),
          (ea.prototype.getY = function () {
            return this.y.fromRed();
          }),
          (ea.prototype.mul = function ($) {
            return (($ = new ee($, 16)), this.isInfinity())
              ? this
              : this._hasDoubles($)
                ? this.curve._fixedNafMul(this, $)
                : this.curve.endo
                  ? this.curve._endoWnafMulAdd([this], [$])
                  : this.curve._wnafMul(this, $);
          }),
          (ea.prototype.mulAdd = function ($, Y, J) {
            var Q = [this, Y],
              ee = [$, J];
            return this.curve.endo
              ? this.curve._endoWnafMulAdd(Q, ee)
              : this.curve._wnafMulAdd(1, Q, ee, 2);
          }),
          (ea.prototype.jmulAdd = function ($, Y, J) {
            var Q = [this, Y],
              ee = [$, J];
            return this.curve.endo
              ? this.curve._endoWnafMulAdd(Q, ee, !0)
              : this.curve._wnafMulAdd(1, Q, ee, 2, !0);
          }),
          (ea.prototype.eq = function ($) {
            return (
              this === $ ||
              (this.inf === $.inf &&
                (this.inf || (0 === this.x.cmp($.x) && 0 === this.y.cmp($.y))))
            );
          }),
          (ea.prototype.neg = function ($) {
            if (this.inf) return this;
            var Y = this.curve.point(this.x, this.y.redNeg());
            if ($ && this.precomputed) {
              var J = this.precomputed,
                Q = function ($) {
                  return $.neg();
                };
              Y.precomputed = {
                naf: J.naf && { wnd: J.naf.wnd, points: J.naf.points.map(Q) },
                doubles: J.doubles && {
                  step: J.doubles.step,
                  points: J.doubles.points.map(Q),
                },
              };
            }
            return Y;
          }),
          (ea.prototype.toJ = function () {
            return this.inf
              ? this.curve.jpoint(null, null, null)
              : this.curve.jpoint(this.x, this.y, this.curve.one);
          }),
          et(ef, er.BasePoint),
          (en.prototype.jpoint = function ($, Y, J) {
            return new ef(this, $, Y, J);
          }),
          (ef.prototype.toP = function () {
            if (this.isInfinity()) return this.curve.point(null, null);
            var $ = this.z.redInvm(),
              Y = $.redSqr(),
              J = this.x.redMul(Y),
              Q = this.y.redMul(Y).redMul($);
            return this.curve.point(J, Q);
          }),
          (ef.prototype.neg = function () {
            return this.curve.jpoint(this.x, this.y.redNeg(), this.z);
          }),
          (ef.prototype.add = function ($) {
            if (this.isInfinity()) return $;
            if ($.isInfinity()) return this;
            var Y = $.z.redSqr(),
              J = this.z.redSqr(),
              Q = this.x.redMul(Y),
              ee = $.x.redMul(J),
              et = this.y.redMul(Y.redMul($.z)),
              er = $.y.redMul(J.redMul(this.z)),
              ei = Q.redSub(ee),
              en = et.redSub(er);
            if (0 === ei.cmpn(0))
              if (0 !== en.cmpn(0)) return this.curve.jpoint(null, null, null);
              else return this.dbl();
            var ea = ei.redSqr(),
              ef = ea.redMul(ei),
              eo = Q.redMul(ea),
              es = en.redSqr().redIAdd(ef).redISub(eo).redISub(eo),
              eh = en.redMul(eo.redISub(es)).redISub(et.redMul(ef)),
              ed = this.z.redMul($.z).redMul(ei);
            return this.curve.jpoint(es, eh, ed);
          }),
          (ef.prototype.mixedAdd = function ($) {
            if (this.isInfinity()) return $.toJ();
            if ($.isInfinity()) return this;
            var Y = this.z.redSqr(),
              J = this.x,
              Q = $.x.redMul(Y),
              ee = this.y,
              et = $.y.redMul(Y).redMul(this.z),
              er = J.redSub(Q),
              ei = ee.redSub(et);
            if (0 === er.cmpn(0))
              if (0 !== ei.cmpn(0)) return this.curve.jpoint(null, null, null);
              else return this.dbl();
            var en = er.redSqr(),
              ea = en.redMul(er),
              ef = J.redMul(en),
              eo = ei.redSqr().redIAdd(ea).redISub(ef).redISub(ef),
              es = ei.redMul(ef.redISub(eo)).redISub(ee.redMul(ea)),
              eh = this.z.redMul(er);
            return this.curve.jpoint(eo, es, eh);
          }),
          (ef.prototype.dblp = function ($) {
            if (0 === $ || this.isInfinity()) return this;
            if (!$) return this.dbl();
            if (this.curve.zeroA || this.curve.threeA) {
              for (var Y = this, J = 0; J < $; J++) Y = Y.dbl();
              return Y;
            }
            for (
              var Q = this.curve.a,
                ee = this.curve.tinv,
                et = this.x,
                er = this.y,
                ei = this.z,
                en = ei.redSqr().redSqr(),
                ea = er.redAdd(er),
                J = 0;
              J < $;
              J++
            ) {
              var ef = et.redSqr(),
                eo = ea.redSqr(),
                es = eo.redSqr(),
                eh = ef.redAdd(ef).redIAdd(ef).redIAdd(Q.redMul(en)),
                ed = et.redMul(eo),
                ec = eh.redSqr().redISub(ed.redAdd(ed)),
                eu = ed.redISub(ec),
                el = eh.redMul(eu);
              el = el.redIAdd(el).redISub(es);
              var ep = ea.redMul(ei);
              (J + 1 < $ && (en = en.redMul(es)),
                (et = ec),
                (ei = ep),
                (ea = el));
            }
            return this.curve.jpoint(et, ea.redMul(ee), ei);
          }),
          (ef.prototype.dbl = function () {
            return this.isInfinity()
              ? this
              : this.curve.zeroA
                ? this._zeroDbl()
                : this.curve.threeA
                  ? this._threeDbl()
                  : this._dbl();
          }),
          (ef.prototype._zeroDbl = function () {
            if (this.zOne) {
              var $,
                Y,
                J,
                Q = this.x.redSqr(),
                ee = this.y.redSqr(),
                et = ee.redSqr(),
                er = this.x.redAdd(ee).redSqr().redISub(Q).redISub(et);
              er = er.redIAdd(er);
              var ei = Q.redAdd(Q).redIAdd(Q),
                en = ei.redSqr().redISub(er).redISub(er),
                ea = et.redIAdd(et);
              ((ea = (ea = ea.redIAdd(ea)).redIAdd(ea)),
                ($ = en),
                (Y = ei.redMul(er.redISub(en)).redISub(ea)),
                (J = this.y.redAdd(this.y)));
            } else {
              var ef = this.x.redSqr(),
                eo = this.y.redSqr(),
                es = eo.redSqr(),
                eh = this.x.redAdd(eo).redSqr().redISub(ef).redISub(es);
              eh = eh.redIAdd(eh);
              var ed = ef.redAdd(ef).redIAdd(ef),
                ec = ed.redSqr(),
                eu = es.redIAdd(es);
              ((eu = (eu = eu.redIAdd(eu)).redIAdd(eu)),
                ($ = ec.redISub(eh).redISub(eh)),
                (Y = ed.redMul(eh.redISub($)).redISub(eu)),
                (J = (J = this.y.redMul(this.z)).redIAdd(J)));
            }
            return this.curve.jpoint($, Y, J);
          }),
          (ef.prototype._threeDbl = function () {
            if (this.zOne) {
              var $,
                Y,
                J,
                Q = this.x.redSqr(),
                ee = this.y.redSqr(),
                et = ee.redSqr(),
                er = this.x.redAdd(ee).redSqr().redISub(Q).redISub(et);
              er = er.redIAdd(er);
              var ei = Q.redAdd(Q).redIAdd(Q).redIAdd(this.curve.a),
                en = ei.redSqr().redISub(er).redISub(er);
              $ = en;
              var ea = et.redIAdd(et);
              ((ea = (ea = ea.redIAdd(ea)).redIAdd(ea)),
                (Y = ei.redMul(er.redISub(en)).redISub(ea)),
                (J = this.y.redAdd(this.y)));
            } else {
              var ef = this.z.redSqr(),
                eo = this.y.redSqr(),
                es = this.x.redMul(eo),
                eh = this.x.redSub(ef).redMul(this.x.redAdd(ef));
              eh = eh.redAdd(eh).redIAdd(eh);
              var ed = es.redIAdd(es),
                ec = (ed = ed.redIAdd(ed)).redAdd(ed);
              (($ = eh.redSqr().redISub(ec)),
                (J = this.y.redAdd(this.z).redSqr().redISub(eo).redISub(ef)));
              var eu = eo.redSqr();
              ((eu = (eu = (eu = eu.redIAdd(eu)).redIAdd(eu)).redIAdd(eu)),
                (Y = eh.redMul(ed.redISub($)).redISub(eu)));
            }
            return this.curve.jpoint($, Y, J);
          }),
          (ef.prototype._dbl = function () {
            var $ = this.curve.a,
              Y = this.x,
              J = this.y,
              Q = this.z,
              ee = Q.redSqr().redSqr(),
              et = Y.redSqr(),
              er = J.redSqr(),
              ei = et.redAdd(et).redIAdd(et).redIAdd($.redMul(ee)),
              en = Y.redAdd(Y),
              ea = (en = en.redIAdd(en)).redMul(er),
              ef = ei.redSqr().redISub(ea.redAdd(ea)),
              eo = ea.redISub(ef),
              es = er.redSqr();
            es = (es = (es = es.redIAdd(es)).redIAdd(es)).redIAdd(es);
            var eh = ei.redMul(eo).redISub(es),
              ed = J.redAdd(J).redMul(Q);
            return this.curve.jpoint(ef, eh, ed);
          }),
          (ef.prototype.trpl = function () {
            if (!this.curve.zeroA) return this.dbl().add(this);
            var $ = this.x.redSqr(),
              Y = this.y.redSqr(),
              J = this.z.redSqr(),
              Q = Y.redSqr(),
              ee = $.redAdd($).redIAdd($),
              et = ee.redSqr(),
              er = this.x.redAdd(Y).redSqr().redISub($).redISub(Q),
              ei = (er = (er = (er = er.redIAdd(er))
                .redAdd(er)
                .redIAdd(er)).redISub(et)).redSqr(),
              en = Q.redIAdd(Q);
            en = (en = (en = en.redIAdd(en)).redIAdd(en)).redIAdd(en);
            var ea = ee
                .redIAdd(er)
                .redSqr()
                .redISub(et)
                .redISub(ei)
                .redISub(en),
              ef = Y.redMul(ea);
            ef = (ef = ef.redIAdd(ef)).redIAdd(ef);
            var eo = this.x.redMul(ei).redISub(ef);
            eo = (eo = eo.redIAdd(eo)).redIAdd(eo);
            var es = this.y.redMul(
              ea.redMul(en.redISub(ea)).redISub(er.redMul(ei)),
            );
            es = (es = (es = es.redIAdd(es)).redIAdd(es)).redIAdd(es);
            var eh = this.z.redAdd(er).redSqr().redISub(J).redISub(ei);
            return this.curve.jpoint(eo, es, eh);
          }),
          (ef.prototype.mul = function ($, Y) {
            return (($ = new ee($, Y)), this.curve._wnafMul(this, $));
          }),
          (ef.prototype.eq = function ($) {
            if ("affine" === $.type) return this.eq($.toJ());
            if (this === $) return !0;
            var Y = this.z.redSqr(),
              J = $.z.redSqr();
            if (0 !== this.x.redMul(J).redISub($.x.redMul(Y)).cmpn(0))
              return !1;
            var Q = Y.redMul(this.z),
              ee = J.redMul($.z);
            return 0 === this.y.redMul(ee).redISub($.y.redMul(Q)).cmpn(0);
          }),
          (ef.prototype.eqXToP = function ($) {
            var Y = this.z.redSqr(),
              J = $.toRed(this.curve.red).redMul(Y);
            if (0 === this.x.cmp(J)) return !0;
            for (var Q = $.clone(), ee = this.curve.redN.redMul(Y); ; ) {
              if ((Q.iadd(this.curve.n), Q.cmp(this.curve.p) >= 0)) return !1;
              if ((J.redIAdd(ee), 0 === this.x.cmp(J))) return !0;
            }
          }),
          (ef.prototype.inspect = function () {
            return this.isInfinity()
              ? "<EC JPoint Infinity>"
              : "<EC JPoint x: " +
                  this.x.toString(16, 2) +
                  " y: " +
                  this.y.toString(16, 2) +
                  " z: " +
                  this.z.toString(16, 2) +
                  ">";
          }),
          (ef.prototype.isInfinity = function () {
            return 0 === this.z.cmpn(0);
          }));
      },
      7736: function ($, Y, J) {
        "use strict";
        var Q,
          ee = J(8044),
          et = J(7942),
          er = J(3355).assert;
        function ei($) {
          ("short" === $.type
            ? (this.curve = new et.short($))
            : "edwards" === $.type
              ? (this.curve = new et.edwards($))
              : (this.curve = new et.mont($)),
            (this.g = this.curve.g),
            (this.n = this.curve.n),
            (this.hash = $.hash),
            er(this.g.validate(), "Invalid curve"),
            er(this.g.mul(this.n).isInfinity(), "Invalid curve, G*N != O"));
        }
        function en($, J) {
          Object.defineProperty(Y, $, {
            configurable: !0,
            enumerable: !0,
            get: function () {
              var Q = new ei(J);
              return (
                Object.defineProperty(Y, $, {
                  configurable: !0,
                  enumerable: !0,
                  value: Q,
                }),
                Q
              );
            },
          });
        }
        ((Y.PresetCurve = ei),
          en("p192", {
            type: "short",
            prime: "p192",
            p: "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff",
            a: "ffffffff ffffffff ffffffff fffffffe ffffffff fffffffc",
            b: "64210519 e59c80e7 0fa7e9ab 72243049 feb8deec c146b9b1",
            n: "ffffffff ffffffff ffffffff 99def836 146bc9b1 b4d22831",
            hash: ee.sha256,
            gRed: !1,
            g: [
              "188da80e b03090f6 7cbf20eb 43a18800 f4ff0afd 82ff1012",
              "07192b95 ffc8da78 631011ed 6b24cdd5 73f977a1 1e794811",
            ],
          }),
          en("p224", {
            type: "short",
            prime: "p224",
            p: "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001",
            a: "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff fffffffe",
            b: "b4050a85 0c04b3ab f5413256 5044b0b7 d7bfd8ba 270b3943 2355ffb4",
            n: "ffffffff ffffffff ffffffff ffff16a2 e0b8f03e 13dd2945 5c5c2a3d",
            hash: ee.sha256,
            gRed: !1,
            g: [
              "b70e0cbd 6bb4bf7f 321390b9 4a03c1d3 56c21122 343280d6 115c1d21",
              "bd376388 b5f723fb 4c22dfe6 cd4375a0 5a074764 44d58199 85007e34",
            ],
          }),
          en("p256", {
            type: "short",
            prime: null,
            p: "ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff ffffffff",
            a: "ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff fffffffc",
            b: "5ac635d8 aa3a93e7 b3ebbd55 769886bc 651d06b0 cc53b0f6 3bce3c3e 27d2604b",
            n: "ffffffff 00000000 ffffffff ffffffff bce6faad a7179e84 f3b9cac2 fc632551",
            hash: ee.sha256,
            gRed: !1,
            g: [
              "6b17d1f2 e12c4247 f8bce6e5 63a440f2 77037d81 2deb33a0 f4a13945 d898c296",
              "4fe342e2 fe1a7f9b 8ee7eb4a 7c0f9e16 2bce3357 6b315ece cbb64068 37bf51f5",
            ],
          }),
          en("p384", {
            type: "short",
            prime: null,
            p: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe ffffffff 00000000 00000000 ffffffff",
            a: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe ffffffff 00000000 00000000 fffffffc",
            b: "b3312fa7 e23ee7e4 988e056b e3f82d19 181d9c6e fe814112 0314088f 5013875a c656398d 8a2ed19d 2a85c8ed d3ec2aef",
            n: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff c7634d81 f4372ddf 581a0db2 48b0a77a ecec196a ccc52973",
            hash: ee.sha384,
            gRed: !1,
            g: [
              "aa87ca22 be8b0537 8eb1c71e f320ad74 6e1d3b62 8ba79b98 59f741e0 82542a38 5502f25d bf55296c 3a545e38 72760ab7",
              "3617de4a 96262c6f 5d9e98bf 9292dc29 f8f41dbd 289a147c e9da3113 b5f0b8c0 0a60b1ce 1d7e819d 7a431d7c 90ea0e5f",
            ],
          }),
          en("p521", {
            type: "short",
            prime: null,
            p: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff",
            a: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffc",
            b: "00000051 953eb961 8e1c9a1f 929a21a0 b68540ee a2da725b 99b315f3 b8b48991 8ef109e1 56193951 ec7e937b 1652c0bd 3bb1bf07 3573df88 3d2c34f1 ef451fd4 6b503f00",
            n: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffa 51868783 bf2f966b 7fcc0148 f709a5d0 3bb5c9b8 899c47ae bb6fb71e 91386409",
            hash: ee.sha512,
            gRed: !1,
            g: [
              "000000c6 858e06b7 0404e9cd 9e3ecb66 2395b442 9c648139 053fb521 f828af60 6b4d3dba a14b5e77 efe75928 fe1dc127 a2ffa8de 3348b3c1 856a429b f97e7e31 c2e5bd66",
              "00000118 39296a78 9a3bc004 5c8a5fb4 2c7d1bd9 98f54449 579b4468 17afbd17 273e662c 97ee7299 5ef42640 c550b901 3fad0761 353c7086 a272c240 88be9476 9fd16650",
            ],
          }),
          en("curve25519", {
            type: "mont",
            prime: "p25519",
            p: "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed",
            a: "76d06",
            b: "1",
            n: "1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed",
            hash: ee.sha256,
            gRed: !1,
            g: ["9"],
          }),
          en("ed25519", {
            type: "edwards",
            prime: "p25519",
            p: "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed",
            a: "-1",
            c: "1",
            d: "52036cee2b6ffe73 8cc740797779e898 00700a4d4141d8ab 75eb4dca135978a3",
            n: "1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed",
            hash: ee.sha256,
            gRed: !1,
            g: [
              "216936d3cd6e53fec0a4e231fdd6dc5c692cc7609525a7b2c9562d608f25d51a",
              "6666666666666666666666666666666666666666666666666666666666666658",
            ],
          }));
        try {
          Q = J(5827);
        } catch ($) {
          Q = void 0;
        }
        en("secp256k1", {
          type: "short",
          prime: "k256",
          p: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f",
          a: "0",
          b: "7",
          n: "ffffffff ffffffff ffffffff fffffffe baaedce6 af48a03b bfd25e8c d0364141",
          h: "1",
          hash: ee.sha256,
          beta: "7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee",
          lambda:
            "5363ad4cc05c30e0a5261c028812645a122e22ea20816678df02967c1b23bd72",
          basis: [
            {
              a: "3086d221a7d46bcde86c90e49284eb15",
              b: "-e4437ed6010e88286f547fa90abfe4c3",
            },
            {
              a: "114ca50f7a8e2f3f657c1108d9d44cfd8",
              b: "3086d221a7d46bcde86c90e49284eb15",
            },
          ],
          gRed: !1,
          g: [
            "79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798",
            "483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8",
            Q,
          ],
        });
      },
      1039: function ($, Y, J) {
        "use strict";
        var Q = J(5944),
          ee = J(3730),
          et = J(3355),
          er = J(7736),
          ei = J(4259),
          en = et.assert,
          ea = J(2632),
          ef = J(4233);
        function eo($) {
          if (!(this instanceof eo)) return new eo($);
          ("string" == typeof $ &&
            (en(er.hasOwnProperty($), "Unknown curve " + $), ($ = er[$])),
            $ instanceof er.PresetCurve && ($ = { curve: $ }),
            (this.curve = $.curve.curve),
            (this.n = this.curve.n),
            (this.nh = this.n.ushrn(1)),
            (this.g = this.curve.g),
            (this.g = $.curve.g),
            this.g.precompute($.curve.n.bitLength() + 1),
            (this.hash = $.hash || $.curve.hash));
        }
        (($.exports = eo),
          (eo.prototype.keyPair = function ($) {
            return new ea(this, $);
          }),
          (eo.prototype.keyFromPrivate = function ($, Y) {
            return ea.fromPrivate(this, $, Y);
          }),
          (eo.prototype.keyFromPublic = function ($, Y) {
            return ea.fromPublic(this, $, Y);
          }),
          (eo.prototype.genKeyPair = function ($) {
            $ || ($ = {});
            for (
              var Y = new ee({
                  hash: this.hash,
                  pers: $.pers,
                  persEnc: $.persEnc || "utf8",
                  entropy: $.entropy || ei(this.hash.hmacStrength),
                  entropyEnc: ($.entropy && $.entropyEnc) || "utf8",
                  nonce: this.n.toArray(),
                }),
                J = this.n.byteLength(),
                et = this.n.sub(new Q(2));
              ;

            ) {
              var er = new Q(Y.generate(J));
              if (!(er.cmp(et) > 0))
                return (er.iaddn(1), this.keyFromPrivate(er));
            }
          }),
          (eo.prototype._truncateToN = function ($, Y) {
            var J = 8 * $.byteLength() - this.n.bitLength();
            return (J > 0 && ($ = $.ushrn(J)), !Y && $.cmp(this.n) >= 0)
              ? $.sub(this.n)
              : $;
          }),
          (eo.prototype.sign = function ($, Y, J, et) {
            ("object" == typeof J && ((et = J), (J = null)),
              et || (et = {}),
              (Y = this.keyFromPrivate(Y, J)),
              ($ = this._truncateToN(new Q($, 16))));
            for (
              var er = this.n.byteLength(),
                ei = Y.getPrivate().toArray("be", er),
                en = $.toArray("be", er),
                ea = new ee({
                  hash: this.hash,
                  entropy: ei,
                  nonce: en,
                  pers: et.pers,
                  persEnc: et.persEnc || "utf8",
                }),
                eo = this.n.sub(new Q(1)),
                es = 0;
              ;
              es++
            ) {
              var eh = et.k
                ? et.k(es)
                : new Q(ea.generate(this.n.byteLength()));
              if (
                0 >= (eh = this._truncateToN(eh, !0)).cmpn(1) ||
                eh.cmp(eo) >= 0
              )
                continue;
              var ed = this.g.mul(eh);
              if (!ed.isInfinity()) {
                var ec = ed.getX(),
                  eu = ec.umod(this.n);
                if (0 !== eu.cmpn(0)) {
                  var el = eh.invm(this.n).mul(eu.mul(Y.getPrivate()).iadd($));
                  if (0 !== (el = el.umod(this.n)).cmpn(0)) {
                    var ep = !!ed.getY().isOdd() | (2 * (0 !== ec.cmp(eu)));
                    return (
                      et.canonical &&
                        el.cmp(this.nh) > 0 &&
                        ((el = this.n.sub(el)), (ep ^= 1)),
                      new ef({ r: eu, s: el, recoveryParam: ep })
                    );
                  }
                }
              }
            }
          }),
          (eo.prototype.verify = function ($, Y, J, ee) {
            (($ = this._truncateToN(new Q($, 16))),
              (J = this.keyFromPublic(J, ee)));
            var et = (Y = new ef(Y, "hex")).r,
              er = Y.s;
            if (
              0 > et.cmpn(1) ||
              et.cmp(this.n) >= 0 ||
              0 > er.cmpn(1) ||
              er.cmp(this.n) >= 0
            )
              return !1;
            var ei = er.invm(this.n),
              en = ei.mul($).umod(this.n),
              ea = ei.mul(et).umod(this.n);
            if (!this.curve._maxwellTrick) {
              var eo = this.g.mulAdd(en, J.getPublic(), ea);
              return !eo.isInfinity() && 0 === eo.getX().umod(this.n).cmp(et);
            }
            var eo = this.g.jmulAdd(en, J.getPublic(), ea);
            return !eo.isInfinity() && eo.eqXToP(et);
          }),
          (eo.prototype.recoverPubKey = function ($, Y, J, ee) {
            (en((3 & J) === J, "The recovery param is more than two bits"),
              (Y = new ef(Y, ee)));
            var et = this.n,
              er = new Q($),
              ei = Y.r,
              ea = Y.s,
              eo = 1 & J,
              es = J >> 1;
            if (ei.cmp(this.curve.p.umod(this.curve.n)) >= 0 && es)
              throw Error("Unable to find sencond key candinate");
            ei = es
              ? this.curve.pointFromX(ei.add(this.curve.n), eo)
              : this.curve.pointFromX(ei, eo);
            var eh = Y.r.invm(et),
              ed = et.sub(er).mul(eh).umod(et),
              ec = ea.mul(eh).umod(et);
            return this.g.mulAdd(ed, ei, ec);
          }),
          (eo.prototype.getKeyRecoveryParam = function ($, Y, J, Q) {
            if (null !== (Y = new ef(Y, Q)).recoveryParam)
              return Y.recoveryParam;
            for (var ee, et = 0; et < 4; et++) {
              try {
                ee = this.recoverPubKey($, Y, et);
              } catch ($) {
                continue;
              }
              if (ee.eq(J)) return et;
            }
            throw Error("Unable to find valid recovery factor");
          }));
      },
      2632: function ($, Y, J) {
        "use strict";
        var Q = J(5944),
          ee = J(3355).assert;
        function et($, Y) {
          ((this.ec = $),
            (this.priv = null),
            (this.pub = null),
            Y.priv && this._importPrivate(Y.priv, Y.privEnc),
            Y.pub && this._importPublic(Y.pub, Y.pubEnc));
        }
        (($.exports = et),
          (et.fromPublic = function ($, Y, J) {
            return Y instanceof et ? Y : new et($, { pub: Y, pubEnc: J });
          }),
          (et.fromPrivate = function ($, Y, J) {
            return Y instanceof et ? Y : new et($, { priv: Y, privEnc: J });
          }),
          (et.prototype.validate = function () {
            var $ = this.getPublic();
            return $.isInfinity()
              ? { result: !1, reason: "Invalid public key" }
              : $.validate()
                ? $.mul(this.ec.curve.n).isInfinity()
                  ? { result: !0, reason: null }
                  : { result: !1, reason: "Public key * N != O" }
                : { result: !1, reason: "Public key is not a point" };
          }),
          (et.prototype.getPublic = function ($, Y) {
            return ("string" == typeof $ && ((Y = $), ($ = null)),
            this.pub || (this.pub = this.ec.g.mul(this.priv)),
            Y)
              ? this.pub.encode(Y, $)
              : this.pub;
          }),
          (et.prototype.getPrivate = function ($) {
            return "hex" === $ ? this.priv.toString(16, 2) : this.priv;
          }),
          (et.prototype._importPrivate = function ($, Y) {
            ((this.priv = new Q($, Y || 16)),
              (this.priv = this.priv.umod(this.ec.curve.n)));
          }),
          (et.prototype._importPublic = function ($, Y) {
            if ($.x || $.y) {
              ("mont" === this.ec.curve.type
                ? ee($.x, "Need x coordinate")
                : ("short" === this.ec.curve.type ||
                    "edwards" === this.ec.curve.type) &&
                  ee($.x && $.y, "Need both x and y coordinate"),
                (this.pub = this.ec.curve.point($.x, $.y)));
              return;
            }
            this.pub = this.ec.curve.decodePoint($, Y);
          }),
          (et.prototype.derive = function ($) {
            return $.mul(this.priv).getX();
          }),
          (et.prototype.sign = function ($, Y, J) {
            return this.ec.sign($, this, Y, J);
          }),
          (et.prototype.verify = function ($, Y) {
            return this.ec.verify($, Y, this);
          }),
          (et.prototype.inspect = function () {
            return (
              "<Key priv: " +
              (this.priv && this.priv.toString(16, 2)) +
              " pub: " +
              (this.pub && this.pub.inspect()) +
              " >"
            );
          }));
      },
      4233: function ($, Y, J) {
        "use strict";
        var Q = J(5944),
          ee = J(3355),
          et = ee.assert;
        function er($, Y) {
          if ($ instanceof er) return $;
          this._importDER($, Y) ||
            (et($.r && $.s, "Signature without r or s"),
            (this.r = new Q($.r, 16)),
            (this.s = new Q($.s, 16)),
            void 0 === $.recoveryParam
              ? (this.recoveryParam = null)
              : (this.recoveryParam = $.recoveryParam));
        }
        function ei() {
          this.place = 0;
        }
        function en($, Y) {
          var J = $[Y.place++];
          if (!(128 & J)) return J;
          var Q = 15 & J;
          if (0 === Q || Q > 4) return !1;
          for (var ee = 0, et = 0, er = Y.place; et < Q; et++, er++)
            ((ee <<= 8), (ee |= $[er]), (ee >>>= 0));
          return !(ee <= 127) && ((Y.place = er), ee);
        }
        function ea($) {
          for (
            var Y = 0, J = $.length - 1;
            !$[Y] && !(128 & $[Y + 1]) && Y < J;

          )
            Y++;
          return 0 === Y ? $ : $.slice(Y);
        }
        function ef($, Y) {
          if (Y < 128) return void $.push(Y);
          var J = 1 + ((Math.log(Y) / Math.LN2) >>> 3);
          for ($.push(128 | J); --J; ) $.push((Y >>> (J << 3)) & 255);
          $.push(Y);
        }
        (($.exports = er),
          (er.prototype._importDER = function ($, Y) {
            $ = ee.toArray($, Y);
            var J = new ei();
            if (48 !== $[J.place++]) return !1;
            var et = en($, J);
            if (!1 === et || et + J.place !== $.length || 2 !== $[J.place++])
              return !1;
            var er = en($, J);
            if (!1 === er) return !1;
            var ea = $.slice(J.place, er + J.place);
            if (((J.place += er), 2 !== $[J.place++])) return !1;
            var ef = en($, J);
            if (!1 === ef || $.length !== ef + J.place) return !1;
            var eo = $.slice(J.place, ef + J.place);
            if (0 === ea[0])
              if (!(128 & ea[1])) return !1;
              else ea = ea.slice(1);
            if (0 === eo[0])
              if (!(128 & eo[1])) return !1;
              else eo = eo.slice(1);
            return (
              (this.r = new Q(ea)),
              (this.s = new Q(eo)),
              (this.recoveryParam = null),
              !0
            );
          }),
          (er.prototype.toDER = function ($) {
            var Y = this.r.toArray(),
              J = this.s.toArray();
            for (
              128 & Y[0] && (Y = [0].concat(Y)),
                128 & J[0] && (J = [0].concat(J)),
                Y = ea(Y),
                J = ea(J);
              !J[0] && !(128 & J[1]);

            )
              J = J.slice(1);
            var Q = [2];
            (ef(Q, Y.length), (Q = Q.concat(Y)).push(2), ef(Q, J.length));
            var et = Q.concat(J),
              er = [48];
            return (ef(er, et.length), (er = er.concat(et)), ee.encode(er, $));
          }));
      },
      4226: function ($, Y, J) {
        "use strict";
        var Q = J(8044),
          ee = J(7736),
          et = J(3355),
          er = et.assert,
          ei = et.parseBytes,
          en = J(1101),
          ea = J(2164);
        function ef($) {
          if (
            (er("ed25519" === $, "only tested with ed25519 so far"),
            !(this instanceof ef))
          )
            return new ef($);
          var $ = ee[$].curve;
          ((this.curve = $),
            (this.g = $.g),
            this.g.precompute($.n.bitLength() + 1),
            (this.pointClass = $.point().constructor),
            (this.encodingLength = Math.ceil($.n.bitLength() / 8)),
            (this.hash = Q.sha512));
        }
        (($.exports = ef),
          (ef.prototype.sign = function ($, Y) {
            $ = ei($);
            var J = this.keyFromSecret(Y),
              Q = this.hashInt(J.messagePrefix(), $),
              ee = this.g.mul(Q),
              et = this.encodePoint(ee),
              er = this.hashInt(et, J.pubBytes(), $).mul(J.priv()),
              en = Q.add(er).umod(this.curve.n);
            return this.makeSignature({ R: ee, S: en, Rencoded: et });
          }),
          (ef.prototype.verify = function ($, Y, J) {
            (($ = ei($)), (Y = this.makeSignature(Y)));
            var Q = this.keyFromPublic(J),
              ee = this.hashInt(Y.Rencoded(), Q.pubBytes(), $),
              et = this.g.mul(Y.S());
            return Y.R().add(Q.pub().mul(ee)).eq(et);
          }),
          (ef.prototype.hashInt = function () {
            for (var $ = this.hash(), Y = 0; Y < arguments.length; Y++)
              $.update(arguments[Y]);
            return et.intFromLE($.digest()).umod(this.curve.n);
          }),
          (ef.prototype.keyFromPublic = function ($) {
            return en.fromPublic(this, $);
          }),
          (ef.prototype.keyFromSecret = function ($) {
            return en.fromSecret(this, $);
          }),
          (ef.prototype.makeSignature = function ($) {
            return $ instanceof ea ? $ : new ea(this, $);
          }),
          (ef.prototype.encodePoint = function ($) {
            var Y = $.getY().toArray("le", this.encodingLength);
            return (
              (Y[this.encodingLength - 1] |= 128 * !!$.getX().isOdd()),
              Y
            );
          }),
          (ef.prototype.decodePoint = function ($) {
            var Y = ($ = et.parseBytes($)).length - 1,
              J = $.slice(0, Y).concat(-129 & $[Y]),
              Q = (128 & $[Y]) != 0,
              ee = et.intFromLE(J);
            return this.curve.pointFromY(ee, Q);
          }),
          (ef.prototype.encodeInt = function ($) {
            return $.toArray("le", this.encodingLength);
          }),
          (ef.prototype.decodeInt = function ($) {
            return et.intFromLE($);
          }),
          (ef.prototype.isPoint = function ($) {
            return $ instanceof this.pointClass;
          }));
      },
      1101: function ($, Y, J) {
        "use strict";
        var Q = J(3355),
          ee = Q.assert,
          et = Q.parseBytes,
          er = Q.cachedProperty;
        function ei($, Y) {
          ((this.eddsa = $),
            (this._secret = et(Y.secret)),
            $.isPoint(Y.pub)
              ? (this._pub = Y.pub)
              : (this._pubBytes = et(Y.pub)));
        }
        ((ei.fromPublic = function ($, Y) {
          return Y instanceof ei ? Y : new ei($, { pub: Y });
        }),
          (ei.fromSecret = function ($, Y) {
            return Y instanceof ei ? Y : new ei($, { secret: Y });
          }),
          (ei.prototype.secret = function () {
            return this._secret;
          }),
          er(ei, "pubBytes", function () {
            return this.eddsa.encodePoint(this.pub());
          }),
          er(ei, "pub", function () {
            return this._pubBytes
              ? this.eddsa.decodePoint(this._pubBytes)
              : this.eddsa.g.mul(this.priv());
          }),
          er(ei, "privBytes", function () {
            var $ = this.eddsa,
              Y = this.hash(),
              J = $.encodingLength - 1,
              Q = Y.slice(0, $.encodingLength);
            return ((Q[0] &= 248), (Q[J] &= 127), (Q[J] |= 64), Q);
          }),
          er(ei, "priv", function () {
            return this.eddsa.decodeInt(this.privBytes());
          }),
          er(ei, "hash", function () {
            return this.eddsa.hash().update(this.secret()).digest();
          }),
          er(ei, "messagePrefix", function () {
            return this.hash().slice(this.eddsa.encodingLength);
          }),
          (ei.prototype.sign = function ($) {
            return (
              ee(this._secret, "KeyPair can only verify"),
              this.eddsa.sign($, this)
            );
          }),
          (ei.prototype.verify = function ($, Y) {
            return this.eddsa.verify($, Y, this);
          }),
          (ei.prototype.getSecret = function ($) {
            return (
              ee(this._secret, "KeyPair is public only"),
              Q.encode(this.secret(), $)
            );
          }),
          (ei.prototype.getPublic = function ($) {
            return Q.encode(this.pubBytes(), $);
          }),
          ($.exports = ei));
      },
      2164: function ($, Y, J) {
        "use strict";
        var Q = J(5944),
          ee = J(3355),
          et = ee.assert,
          er = ee.cachedProperty,
          ei = ee.parseBytes;
        function en($, Y) {
          ((this.eddsa = $),
            "object" != typeof Y && (Y = ei(Y)),
            Array.isArray(Y) &&
              (Y = {
                R: Y.slice(0, $.encodingLength),
                S: Y.slice($.encodingLength),
              }),
            et(Y.R && Y.S, "Signature without R or S"),
            $.isPoint(Y.R) && (this._R = Y.R),
            Y.S instanceof Q && (this._S = Y.S),
            (this._Rencoded = Array.isArray(Y.R) ? Y.R : Y.Rencoded),
            (this._Sencoded = Array.isArray(Y.S) ? Y.S : Y.Sencoded));
        }
        (er(en, "S", function () {
          return this.eddsa.decodeInt(this.Sencoded());
        }),
          er(en, "R", function () {
            return this.eddsa.decodePoint(this.Rencoded());
          }),
          er(en, "Rencoded", function () {
            return this.eddsa.encodePoint(this.R());
          }),
          er(en, "Sencoded", function () {
            return this.eddsa.encodeInt(this.S());
          }),
          (en.prototype.toBytes = function () {
            return this.Rencoded().concat(this.Sencoded());
          }),
          (en.prototype.toHex = function () {
            return ee.encode(this.toBytes(), "hex").toUpperCase();
          }),
          ($.exports = en));
      },
      5827: function ($) {
        $.exports = {
          doubles: {
            step: 4,
            points: [
              [
                "e60fce93b59e9ec53011aabc21c23e97b2a31369b87a5ae9c44ee89e2a6dec0a",
                "f7e3507399e595929db99f34f57937101296891e44d23f0be1f32cce69616821",
              ],
              [
                "8282263212c609d9ea2a6e3e172de238d8c39cabd5ac1ca10646e23fd5f51508",
                "11f8a8098557dfe45e8256e830b60ace62d613ac2f7b17bed31b6eaff6e26caf",
              ],
              [
                "175e159f728b865a72f99cc6c6fc846de0b93833fd2222ed73fce5b551e5b739",
                "d3506e0d9e3c79eba4ef97a51ff71f5eacb5955add24345c6efa6ffee9fed695",
              ],
              [
                "363d90d447b00c9c99ceac05b6262ee053441c7e55552ffe526bad8f83ff4640",
                "4e273adfc732221953b445397f3363145b9a89008199ecb62003c7f3bee9de9",
              ],
              [
                "8b4b5f165df3c2be8c6244b5b745638843e4a781a15bcd1b69f79a55dffdf80c",
                "4aad0a6f68d308b4b3fbd7813ab0da04f9e336546162ee56b3eff0c65fd4fd36",
              ],
              [
                "723cbaa6e5db996d6bf771c00bd548c7b700dbffa6c0e77bcb6115925232fcda",
                "96e867b5595cc498a921137488824d6e2660a0653779494801dc069d9eb39f5f",
              ],
              [
                "eebfa4d493bebf98ba5feec812c2d3b50947961237a919839a533eca0e7dd7fa",
                "5d9a8ca3970ef0f269ee7edaf178089d9ae4cdc3a711f712ddfd4fdae1de8999",
              ],
              [
                "100f44da696e71672791d0a09b7bde459f1215a29b3c03bfefd7835b39a48db0",
                "cdd9e13192a00b772ec8f3300c090666b7ff4a18ff5195ac0fbd5cd62bc65a09",
              ],
              [
                "e1031be262c7ed1b1dc9227a4a04c017a77f8d4464f3b3852c8acde6e534fd2d",
                "9d7061928940405e6bb6a4176597535af292dd419e1ced79a44f18f29456a00d",
              ],
              [
                "feea6cae46d55b530ac2839f143bd7ec5cf8b266a41d6af52d5e688d9094696d",
                "e57c6b6c97dce1bab06e4e12bf3ecd5c981c8957cc41442d3155debf18090088",
              ],
              [
                "da67a91d91049cdcb367be4be6ffca3cfeed657d808583de33fa978bc1ec6cb1",
                "9bacaa35481642bc41f463f7ec9780e5dec7adc508f740a17e9ea8e27a68be1d",
              ],
              [
                "53904faa0b334cdda6e000935ef22151ec08d0f7bb11069f57545ccc1a37b7c0",
                "5bc087d0bc80106d88c9eccac20d3c1c13999981e14434699dcb096b022771c8",
              ],
              [
                "8e7bcd0bd35983a7719cca7764ca906779b53a043a9b8bcaeff959f43ad86047",
                "10b7770b2a3da4b3940310420ca9514579e88e2e47fd68b3ea10047e8460372a",
              ],
              [
                "385eed34c1cdff21e6d0818689b81bde71a7f4f18397e6690a841e1599c43862",
                "283bebc3e8ea23f56701de19e9ebf4576b304eec2086dc8cc0458fe5542e5453",
              ],
              [
                "6f9d9b803ecf191637c73a4413dfa180fddf84a5947fbc9c606ed86c3fac3a7",
                "7c80c68e603059ba69b8e2a30e45c4d47ea4dd2f5c281002d86890603a842160",
              ],
              [
                "3322d401243c4e2582a2147c104d6ecbf774d163db0f5e5313b7e0e742d0e6bd",
                "56e70797e9664ef5bfb019bc4ddaf9b72805f63ea2873af624f3a2e96c28b2a0",
              ],
              [
                "85672c7d2de0b7da2bd1770d89665868741b3f9af7643397721d74d28134ab83",
                "7c481b9b5b43b2eb6374049bfa62c2e5e77f17fcc5298f44c8e3094f790313a6",
              ],
              [
                "948bf809b1988a46b06c9f1919413b10f9226c60f668832ffd959af60c82a0a",
                "53a562856dcb6646dc6b74c5d1c3418c6d4dff08c97cd2bed4cb7f88d8c8e589",
              ],
              [
                "6260ce7f461801c34f067ce0f02873a8f1b0e44dfc69752accecd819f38fd8e8",
                "bc2da82b6fa5b571a7f09049776a1ef7ecd292238051c198c1a84e95b2b4ae17",
              ],
              [
                "e5037de0afc1d8d43d8348414bbf4103043ec8f575bfdc432953cc8d2037fa2d",
                "4571534baa94d3b5f9f98d09fb990bddbd5f5b03ec481f10e0e5dc841d755bda",
              ],
              [
                "e06372b0f4a207adf5ea905e8f1771b4e7e8dbd1c6a6c5b725866a0ae4fce725",
                "7a908974bce18cfe12a27bb2ad5a488cd7484a7787104870b27034f94eee31dd",
              ],
              [
                "213c7a715cd5d45358d0bbf9dc0ce02204b10bdde2a3f58540ad6908d0559754",
                "4b6dad0b5ae462507013ad06245ba190bb4850f5f36a7eeddff2c27534b458f2",
              ],
              [
                "4e7c272a7af4b34e8dbb9352a5419a87e2838c70adc62cddf0cc3a3b08fbd53c",
                "17749c766c9d0b18e16fd09f6def681b530b9614bff7dd33e0b3941817dcaae6",
              ],
              [
                "fea74e3dbe778b1b10f238ad61686aa5c76e3db2be43057632427e2840fb27b6",
                "6e0568db9b0b13297cf674deccb6af93126b596b973f7b77701d3db7f23cb96f",
              ],
              [
                "76e64113f677cf0e10a2570d599968d31544e179b760432952c02a4417bdde39",
                "c90ddf8dee4e95cf577066d70681f0d35e2a33d2b56d2032b4b1752d1901ac01",
              ],
              [
                "c738c56b03b2abe1e8281baa743f8f9a8f7cc643df26cbee3ab150242bcbb891",
                "893fb578951ad2537f718f2eacbfbbbb82314eef7880cfe917e735d9699a84c3",
              ],
              [
                "d895626548b65b81e264c7637c972877d1d72e5f3a925014372e9f6588f6c14b",
                "febfaa38f2bc7eae728ec60818c340eb03428d632bb067e179363ed75d7d991f",
              ],
              [
                "b8da94032a957518eb0f6433571e8761ceffc73693e84edd49150a564f676e03",
                "2804dfa44805a1e4d7c99cc9762808b092cc584d95ff3b511488e4e74efdf6e7",
              ],
              [
                "e80fea14441fb33a7d8adab9475d7fab2019effb5156a792f1a11778e3c0df5d",
                "eed1de7f638e00771e89768ca3ca94472d155e80af322ea9fcb4291b6ac9ec78",
              ],
              [
                "a301697bdfcd704313ba48e51d567543f2a182031efd6915ddc07bbcc4e16070",
                "7370f91cfb67e4f5081809fa25d40f9b1735dbf7c0a11a130c0d1a041e177ea1",
              ],
              [
                "90ad85b389d6b936463f9d0512678de208cc330b11307fffab7ac63e3fb04ed4",
                "e507a3620a38261affdcbd9427222b839aefabe1582894d991d4d48cb6ef150",
              ],
              [
                "8f68b9d2f63b5f339239c1ad981f162ee88c5678723ea3351b7b444c9ec4c0da",
                "662a9f2dba063986de1d90c2b6be215dbbea2cfe95510bfdf23cbf79501fff82",
              ],
              [
                "e4f3fb0176af85d65ff99ff9198c36091f48e86503681e3e6686fd5053231e11",
                "1e63633ad0ef4f1c1661a6d0ea02b7286cc7e74ec951d1c9822c38576feb73bc",
              ],
              [
                "8c00fa9b18ebf331eb961537a45a4266c7034f2f0d4e1d0716fb6eae20eae29e",
                "efa47267fea521a1a9dc343a3736c974c2fadafa81e36c54e7d2a4c66702414b",
              ],
              [
                "e7a26ce69dd4829f3e10cec0a9e98ed3143d084f308b92c0997fddfc60cb3e41",
                "2a758e300fa7984b471b006a1aafbb18d0a6b2c0420e83e20e8a9421cf2cfd51",
              ],
              [
                "b6459e0ee3662ec8d23540c223bcbdc571cbcb967d79424f3cf29eb3de6b80ef",
                "67c876d06f3e06de1dadf16e5661db3c4b3ae6d48e35b2ff30bf0b61a71ba45",
              ],
              [
                "d68a80c8280bb840793234aa118f06231d6f1fc67e73c5a5deda0f5b496943e8",
                "db8ba9fff4b586d00c4b1f9177b0e28b5b0e7b8f7845295a294c84266b133120",
              ],
              [
                "324aed7df65c804252dc0270907a30b09612aeb973449cea4095980fc28d3d5d",
                "648a365774b61f2ff130c0c35aec1f4f19213b0c7e332843967224af96ab7c84",
              ],
              [
                "4df9c14919cde61f6d51dfdbe5fee5dceec4143ba8d1ca888e8bd373fd054c96",
                "35ec51092d8728050974c23a1d85d4b5d506cdc288490192ebac06cad10d5d",
              ],
              [
                "9c3919a84a474870faed8a9c1cc66021523489054d7f0308cbfc99c8ac1f98cd",
                "ddb84f0f4a4ddd57584f044bf260e641905326f76c64c8e6be7e5e03d4fc599d",
              ],
              [
                "6057170b1dd12fdf8de05f281d8e06bb91e1493a8b91d4cc5a21382120a959e5",
                "9a1af0b26a6a4807add9a2daf71df262465152bc3ee24c65e899be932385a2a8",
              ],
              [
                "a576df8e23a08411421439a4518da31880cef0fba7d4df12b1a6973eecb94266",
                "40a6bf20e76640b2c92b97afe58cd82c432e10a7f514d9f3ee8be11ae1b28ec8",
              ],
              [
                "7778a78c28dec3e30a05fe9629de8c38bb30d1f5cf9a3a208f763889be58ad71",
                "34626d9ab5a5b22ff7098e12f2ff580087b38411ff24ac563b513fc1fd9f43ac",
              ],
              [
                "928955ee637a84463729fd30e7afd2ed5f96274e5ad7e5cb09eda9c06d903ac",
                "c25621003d3f42a827b78a13093a95eeac3d26efa8a8d83fc5180e935bcd091f",
              ],
              [
                "85d0fef3ec6db109399064f3a0e3b2855645b4a907ad354527aae75163d82751",
                "1f03648413a38c0be29d496e582cf5663e8751e96877331582c237a24eb1f962",
              ],
              [
                "ff2b0dce97eece97c1c9b6041798b85dfdfb6d8882da20308f5404824526087e",
                "493d13fef524ba188af4c4dc54d07936c7b7ed6fb90e2ceb2c951e01f0c29907",
              ],
              [
                "827fbbe4b1e880ea9ed2b2e6301b212b57f1ee148cd6dd28780e5e2cf856e241",
                "c60f9c923c727b0b71bef2c67d1d12687ff7a63186903166d605b68baec293ec",
              ],
              [
                "eaa649f21f51bdbae7be4ae34ce6e5217a58fdce7f47f9aa7f3b58fa2120e2b3",
                "be3279ed5bbbb03ac69a80f89879aa5a01a6b965f13f7e59d47a5305ba5ad93d",
              ],
              [
                "e4a42d43c5cf169d9391df6decf42ee541b6d8f0c9a137401e23632dda34d24f",
                "4d9f92e716d1c73526fc99ccfb8ad34ce886eedfa8d8e4f13a7f7131deba9414",
              ],
              [
                "1ec80fef360cbdd954160fadab352b6b92b53576a88fea4947173b9d4300bf19",
                "aeefe93756b5340d2f3a4958a7abbf5e0146e77f6295a07b671cdc1cc107cefd",
              ],
              [
                "146a778c04670c2f91b00af4680dfa8bce3490717d58ba889ddb5928366642be",
                "b318e0ec3354028add669827f9d4b2870aaa971d2f7e5ed1d0b297483d83efd0",
              ],
              [
                "fa50c0f61d22e5f07e3acebb1aa07b128d0012209a28b9776d76a8793180eef9",
                "6b84c6922397eba9b72cd2872281a68a5e683293a57a213b38cd8d7d3f4f2811",
              ],
              [
                "da1d61d0ca721a11b1a5bf6b7d88e8421a288ab5d5bba5220e53d32b5f067ec2",
                "8157f55a7c99306c79c0766161c91e2966a73899d279b48a655fba0f1ad836f1",
              ],
              [
                "a8e282ff0c9706907215ff98e8fd416615311de0446f1e062a73b0610d064e13",
                "7f97355b8db81c09abfb7f3c5b2515888b679a3e50dd6bd6cef7c73111f4cc0c",
              ],
              [
                "174a53b9c9a285872d39e56e6913cab15d59b1fa512508c022f382de8319497c",
                "ccc9dc37abfc9c1657b4155f2c47f9e6646b3a1d8cb9854383da13ac079afa73",
              ],
              [
                "959396981943785c3d3e57edf5018cdbe039e730e4918b3d884fdff09475b7ba",
                "2e7e552888c331dd8ba0386a4b9cd6849c653f64c8709385e9b8abf87524f2fd",
              ],
              [
                "d2a63a50ae401e56d645a1153b109a8fcca0a43d561fba2dbb51340c9d82b151",
                "e82d86fb6443fcb7565aee58b2948220a70f750af484ca52d4142174dcf89405",
              ],
              [
                "64587e2335471eb890ee7896d7cfdc866bacbdbd3839317b3436f9b45617e073",
                "d99fcdd5bf6902e2ae96dd6447c299a185b90a39133aeab358299e5e9faf6589",
              ],
              [
                "8481bde0e4e4d885b3a546d3e549de042f0aa6cea250e7fd358d6c86dd45e458",
                "38ee7b8cba5404dd84a25bf39cecb2ca900a79c42b262e556d64b1b59779057e",
              ],
              [
                "13464a57a78102aa62b6979ae817f4637ffcfed3c4b1ce30bcd6303f6caf666b",
                "69be159004614580ef7e433453ccb0ca48f300a81d0942e13f495a907f6ecc27",
              ],
              [
                "bc4a9df5b713fe2e9aef430bcc1dc97a0cd9ccede2f28588cada3a0d2d83f366",
                "d3a81ca6e785c06383937adf4b798caa6e8a9fbfa547b16d758d666581f33c1",
              ],
              [
                "8c28a97bf8298bc0d23d8c749452a32e694b65e30a9472a3954ab30fe5324caa",
                "40a30463a3305193378fedf31f7cc0eb7ae784f0451cb9459e71dc73cbef9482",
              ],
              [
                "8ea9666139527a8c1dd94ce4f071fd23c8b350c5a4bb33748c4ba111faccae0",
                "620efabbc8ee2782e24e7c0cfb95c5d735b783be9cf0f8e955af34a30e62b945",
              ],
              [
                "dd3625faef5ba06074669716bbd3788d89bdde815959968092f76cc4eb9a9787",
                "7a188fa3520e30d461da2501045731ca941461982883395937f68d00c644a573",
              ],
              [
                "f710d79d9eb962297e4f6232b40e8f7feb2bc63814614d692c12de752408221e",
                "ea98e67232d3b3295d3b535532115ccac8612c721851617526ae47a9c77bfc82",
              ],
            ],
          },
          naf: {
            wnd: 7,
            points: [
              [
                "f9308a019258c31049344f85f89d5229b531c845836f99b08601f113bce036f9",
                "388f7b0f632de8140fe337e62a37f3566500a99934c2231b6cb9fd7584b8e672",
              ],
              [
                "2f8bde4d1a07209355b4a7250a5c5128e88b84bddc619ab7cba8d569b240efe4",
                "d8ac222636e5e3d6d4dba9dda6c9c426f788271bab0d6840dca87d3aa6ac62d6",
              ],
              [
                "5cbdf0646e5db4eaa398f365f2ea7a0e3d419b7e0330e39ce92bddedcac4f9bc",
                "6aebca40ba255960a3178d6d861a54dba813d0b813fde7b5a5082628087264da",
              ],
              [
                "acd484e2f0c7f65309ad178a9f559abde09796974c57e714c35f110dfc27ccbe",
                "cc338921b0a7d9fd64380971763b61e9add888a4375f8e0f05cc262ac64f9c37",
              ],
              [
                "774ae7f858a9411e5ef4246b70c65aac5649980be5c17891bbec17895da008cb",
                "d984a032eb6b5e190243dd56d7b7b365372db1e2dff9d6a8301d74c9c953c61b",
              ],
              [
                "f28773c2d975288bc7d1d205c3748651b075fbc6610e58cddeeddf8f19405aa8",
                "ab0902e8d880a89758212eb65cdaf473a1a06da521fa91f29b5cb52db03ed81",
              ],
              [
                "d7924d4f7d43ea965a465ae3095ff41131e5946f3c85f79e44adbcf8e27e080e",
                "581e2872a86c72a683842ec228cc6defea40af2bd896d3a5c504dc9ff6a26b58",
              ],
              [
                "defdea4cdb677750a420fee807eacf21eb9898ae79b9768766e4faa04a2d4a34",
                "4211ab0694635168e997b0ead2a93daeced1f4a04a95c0f6cfb199f69e56eb77",
              ],
              [
                "2b4ea0a797a443d293ef5cff444f4979f06acfebd7e86d277475656138385b6c",
                "85e89bc037945d93b343083b5a1c86131a01f60c50269763b570c854e5c09b7a",
              ],
              [
                "352bbf4a4cdd12564f93fa332ce333301d9ad40271f8107181340aef25be59d5",
                "321eb4075348f534d59c18259dda3e1f4a1b3b2e71b1039c67bd3d8bcf81998c",
              ],
              [
                "2fa2104d6b38d11b0230010559879124e42ab8dfeff5ff29dc9cdadd4ecacc3f",
                "2de1068295dd865b64569335bd5dd80181d70ecfc882648423ba76b532b7d67",
              ],
              [
                "9248279b09b4d68dab21a9b066edda83263c3d84e09572e269ca0cd7f5453714",
                "73016f7bf234aade5d1aa71bdea2b1ff3fc0de2a887912ffe54a32ce97cb3402",
              ],
              [
                "daed4f2be3a8bf278e70132fb0beb7522f570e144bf615c07e996d443dee8729",
                "a69dce4a7d6c98e8d4a1aca87ef8d7003f83c230f3afa726ab40e52290be1c55",
              ],
              [
                "c44d12c7065d812e8acf28d7cbb19f9011ecd9e9fdf281b0e6a3b5e87d22e7db",
                "2119a460ce326cdc76c45926c982fdac0e106e861edf61c5a039063f0e0e6482",
              ],
              [
                "6a245bf6dc698504c89a20cfded60853152b695336c28063b61c65cbd269e6b4",
                "e022cf42c2bd4a708b3f5126f16a24ad8b33ba48d0423b6efd5e6348100d8a82",
              ],
              [
                "1697ffa6fd9de627c077e3d2fe541084ce13300b0bec1146f95ae57f0d0bd6a5",
                "b9c398f186806f5d27561506e4557433a2cf15009e498ae7adee9d63d01b2396",
              ],
              [
                "605bdb019981718b986d0f07e834cb0d9deb8360ffb7f61df982345ef27a7479",
                "2972d2de4f8d20681a78d93ec96fe23c26bfae84fb14db43b01e1e9056b8c49",
              ],
              [
                "62d14dab4150bf497402fdc45a215e10dcb01c354959b10cfe31c7e9d87ff33d",
                "80fc06bd8cc5b01098088a1950eed0db01aa132967ab472235f5642483b25eaf",
              ],
              [
                "80c60ad0040f27dade5b4b06c408e56b2c50e9f56b9b8b425e555c2f86308b6f",
                "1c38303f1cc5c30f26e66bad7fe72f70a65eed4cbe7024eb1aa01f56430bd57a",
              ],
              [
                "7a9375ad6167ad54aa74c6348cc54d344cc5dc9487d847049d5eabb0fa03c8fb",
                "d0e3fa9eca8726909559e0d79269046bdc59ea10c70ce2b02d499ec224dc7f7",
              ],
              [
                "d528ecd9b696b54c907a9ed045447a79bb408ec39b68df504bb51f459bc3ffc9",
                "eecf41253136e5f99966f21881fd656ebc4345405c520dbc063465b521409933",
              ],
              [
                "49370a4b5f43412ea25f514e8ecdad05266115e4a7ecb1387231808f8b45963",
                "758f3f41afd6ed428b3081b0512fd62a54c3f3afbb5b6764b653052a12949c9a",
              ],
              [
                "77f230936ee88cbbd73df930d64702ef881d811e0e1498e2f1c13eb1fc345d74",
                "958ef42a7886b6400a08266e9ba1b37896c95330d97077cbbe8eb3c7671c60d6",
              ],
              [
                "f2dac991cc4ce4b9ea44887e5c7c0bce58c80074ab9d4dbaeb28531b7739f530",
                "e0dedc9b3b2f8dad4da1f32dec2531df9eb5fbeb0598e4fd1a117dba703a3c37",
              ],
              [
                "463b3d9f662621fb1b4be8fbbe2520125a216cdfc9dae3debcba4850c690d45b",
                "5ed430d78c296c3543114306dd8622d7c622e27c970a1de31cb377b01af7307e",
              ],
              [
                "f16f804244e46e2a09232d4aff3b59976b98fac14328a2d1a32496b49998f247",
                "cedabd9b82203f7e13d206fcdf4e33d92a6c53c26e5cce26d6579962c4e31df6",
              ],
              [
                "caf754272dc84563b0352b7a14311af55d245315ace27c65369e15f7151d41d1",
                "cb474660ef35f5f2a41b643fa5e460575f4fa9b7962232a5c32f908318a04476",
              ],
              [
                "2600ca4b282cb986f85d0f1709979d8b44a09c07cb86d7c124497bc86f082120",
                "4119b88753c15bd6a693b03fcddbb45d5ac6be74ab5f0ef44b0be9475a7e4b40",
              ],
              [
                "7635ca72d7e8432c338ec53cd12220bc01c48685e24f7dc8c602a7746998e435",
                "91b649609489d613d1d5e590f78e6d74ecfc061d57048bad9e76f302c5b9c61",
              ],
              [
                "754e3239f325570cdbbf4a87deee8a66b7f2b33479d468fbc1a50743bf56cc18",
                "673fb86e5bda30fb3cd0ed304ea49a023ee33d0197a695d0c5d98093c536683",
              ],
              [
                "e3e6bd1071a1e96aff57859c82d570f0330800661d1c952f9fe2694691d9b9e8",
                "59c9e0bba394e76f40c0aa58379a3cb6a5a2283993e90c4167002af4920e37f5",
              ],
              [
                "186b483d056a033826ae73d88f732985c4ccb1f32ba35f4b4cc47fdcf04aa6eb",
                "3b952d32c67cf77e2e17446e204180ab21fb8090895138b4a4a797f86e80888b",
              ],
              [
                "df9d70a6b9876ce544c98561f4be4f725442e6d2b737d9c91a8321724ce0963f",
                "55eb2dafd84d6ccd5f862b785dc39d4ab157222720ef9da217b8c45cf2ba2417",
              ],
              [
                "5edd5cc23c51e87a497ca815d5dce0f8ab52554f849ed8995de64c5f34ce7143",
                "efae9c8dbc14130661e8cec030c89ad0c13c66c0d17a2905cdc706ab7399a868",
              ],
              [
                "290798c2b6476830da12fe02287e9e777aa3fba1c355b17a722d362f84614fba",
                "e38da76dcd440621988d00bcf79af25d5b29c094db2a23146d003afd41943e7a",
              ],
              [
                "af3c423a95d9f5b3054754efa150ac39cd29552fe360257362dfdecef4053b45",
                "f98a3fd831eb2b749a93b0e6f35cfb40c8cd5aa667a15581bc2feded498fd9c6",
              ],
              [
                "766dbb24d134e745cccaa28c99bf274906bb66b26dcf98df8d2fed50d884249a",
                "744b1152eacbe5e38dcc887980da38b897584a65fa06cedd2c924f97cbac5996",
              ],
              [
                "59dbf46f8c94759ba21277c33784f41645f7b44f6c596a58ce92e666191abe3e",
                "c534ad44175fbc300f4ea6ce648309a042ce739a7919798cd85e216c4a307f6e",
              ],
              [
                "f13ada95103c4537305e691e74e9a4a8dd647e711a95e73cb62dc6018cfd87b8",
                "e13817b44ee14de663bf4bc808341f326949e21a6a75c2570778419bdaf5733d",
              ],
              [
                "7754b4fa0e8aced06d4167a2c59cca4cda1869c06ebadfb6488550015a88522c",
                "30e93e864e669d82224b967c3020b8fa8d1e4e350b6cbcc537a48b57841163a2",
              ],
              [
                "948dcadf5990e048aa3874d46abef9d701858f95de8041d2a6828c99e2262519",
                "e491a42537f6e597d5d28a3224b1bc25df9154efbd2ef1d2cbba2cae5347d57e",
              ],
              [
                "7962414450c76c1689c7b48f8202ec37fb224cf5ac0bfa1570328a8a3d7c77ab",
                "100b610ec4ffb4760d5c1fc133ef6f6b12507a051f04ac5760afa5b29db83437",
              ],
              [
                "3514087834964b54b15b160644d915485a16977225b8847bb0dd085137ec47ca",
                "ef0afbb2056205448e1652c48e8127fc6039e77c15c2378b7e7d15a0de293311",
              ],
              [
                "d3cc30ad6b483e4bc79ce2c9dd8bc54993e947eb8df787b442943d3f7b527eaf",
                "8b378a22d827278d89c5e9be8f9508ae3c2ad46290358630afb34db04eede0a4",
              ],
              [
                "1624d84780732860ce1c78fcbfefe08b2b29823db913f6493975ba0ff4847610",
                "68651cf9b6da903e0914448c6cd9d4ca896878f5282be4c8cc06e2a404078575",
              ],
              [
                "733ce80da955a8a26902c95633e62a985192474b5af207da6df7b4fd5fc61cd4",
                "f5435a2bd2badf7d485a4d8b8db9fcce3e1ef8e0201e4578c54673bc1dc5ea1d",
              ],
              [
                "15d9441254945064cf1a1c33bbd3b49f8966c5092171e699ef258dfab81c045c",
                "d56eb30b69463e7234f5137b73b84177434800bacebfc685fc37bbe9efe4070d",
              ],
              [
                "a1d0fcf2ec9de675b612136e5ce70d271c21417c9d2b8aaaac138599d0717940",
                "edd77f50bcb5a3cab2e90737309667f2641462a54070f3d519212d39c197a629",
              ],
              [
                "e22fbe15c0af8ccc5780c0735f84dbe9a790badee8245c06c7ca37331cb36980",
                "a855babad5cd60c88b430a69f53a1a7a38289154964799be43d06d77d31da06",
              ],
              [
                "311091dd9860e8e20ee13473c1155f5f69635e394704eaa74009452246cfa9b3",
                "66db656f87d1f04fffd1f04788c06830871ec5a64feee685bd80f0b1286d8374",
              ],
              [
                "34c1fd04d301be89b31c0442d3e6ac24883928b45a9340781867d4232ec2dbdf",
                "9414685e97b1b5954bd46f730174136d57f1ceeb487443dc5321857ba73abee",
              ],
              [
                "f219ea5d6b54701c1c14de5b557eb42a8d13f3abbcd08affcc2a5e6b049b8d63",
                "4cb95957e83d40b0f73af4544cccf6b1f4b08d3c07b27fb8d8c2962a400766d1",
              ],
              [
                "d7b8740f74a8fbaab1f683db8f45de26543a5490bca627087236912469a0b448",
                "fa77968128d9c92ee1010f337ad4717eff15db5ed3c049b3411e0315eaa4593b",
              ],
              [
                "32d31c222f8f6f0ef86f7c98d3a3335ead5bcd32abdd94289fe4d3091aa824bf",
                "5f3032f5892156e39ccd3d7915b9e1da2e6dac9e6f26e961118d14b8462e1661",
              ],
              [
                "7461f371914ab32671045a155d9831ea8793d77cd59592c4340f86cbc18347b5",
                "8ec0ba238b96bec0cbdddcae0aa442542eee1ff50c986ea6b39847b3cc092ff6",
              ],
              [
                "ee079adb1df1860074356a25aa38206a6d716b2c3e67453d287698bad7b2b2d6",
                "8dc2412aafe3be5c4c5f37e0ecc5f9f6a446989af04c4e25ebaac479ec1c8c1e",
              ],
              [
                "16ec93e447ec83f0467b18302ee620f7e65de331874c9dc72bfd8616ba9da6b5",
                "5e4631150e62fb40d0e8c2a7ca5804a39d58186a50e497139626778e25b0674d",
              ],
              [
                "eaa5f980c245f6f038978290afa70b6bd8855897f98b6aa485b96065d537bd99",
                "f65f5d3e292c2e0819a528391c994624d784869d7e6ea67fb18041024edc07dc",
              ],
              [
                "78c9407544ac132692ee1910a02439958ae04877151342ea96c4b6b35a49f51",
                "f3e0319169eb9b85d5404795539a5e68fa1fbd583c064d2462b675f194a3ddb4",
              ],
              [
                "494f4be219a1a77016dcd838431aea0001cdc8ae7a6fc688726578d9702857a5",
                "42242a969283a5f339ba7f075e36ba2af925ce30d767ed6e55f4b031880d562c",
              ],
              [
                "a598a8030da6d86c6bc7f2f5144ea549d28211ea58faa70ebf4c1e665c1fe9b5",
                "204b5d6f84822c307e4b4a7140737aec23fc63b65b35f86a10026dbd2d864e6b",
              ],
              [
                "c41916365abb2b5d09192f5f2dbeafec208f020f12570a184dbadc3e58595997",
                "4f14351d0087efa49d245b328984989d5caf9450f34bfc0ed16e96b58fa9913",
              ],
              [
                "841d6063a586fa475a724604da03bc5b92a2e0d2e0a36acfe4c73a5514742881",
                "73867f59c0659e81904f9a1c7543698e62562d6744c169ce7a36de01a8d6154",
              ],
              [
                "5e95bb399a6971d376026947f89bde2f282b33810928be4ded112ac4d70e20d5",
                "39f23f366809085beebfc71181313775a99c9aed7d8ba38b161384c746012865",
              ],
              [
                "36e4641a53948fd476c39f8a99fd974e5ec07564b5315d8bf99471bca0ef2f66",
                "d2424b1b1abe4eb8164227b085c9aa9456ea13493fd563e06fd51cf5694c78fc",
              ],
              [
                "336581ea7bfbbb290c191a2f507a41cf5643842170e914faeab27c2c579f726",
                "ead12168595fe1be99252129b6e56b3391f7ab1410cd1e0ef3dcdcabd2fda224",
              ],
              [
                "8ab89816dadfd6b6a1f2634fcf00ec8403781025ed6890c4849742706bd43ede",
                "6fdcef09f2f6d0a044e654aef624136f503d459c3e89845858a47a9129cdd24e",
              ],
              [
                "1e33f1a746c9c5778133344d9299fcaa20b0938e8acff2544bb40284b8c5fb94",
                "60660257dd11b3aa9c8ed618d24edff2306d320f1d03010e33a7d2057f3b3b6",
              ],
              [
                "85b7c1dcb3cec1b7ee7f30ded79dd20a0ed1f4cc18cbcfcfa410361fd8f08f31",
                "3d98a9cdd026dd43f39048f25a8847f4fcafad1895d7a633c6fed3c35e999511",
              ],
              [
                "29df9fbd8d9e46509275f4b125d6d45d7fbe9a3b878a7af872a2800661ac5f51",
                "b4c4fe99c775a606e2d8862179139ffda61dc861c019e55cd2876eb2a27d84b",
              ],
              [
                "a0b1cae06b0a847a3fea6e671aaf8adfdfe58ca2f768105c8082b2e449fce252",
                "ae434102edde0958ec4b19d917a6a28e6b72da1834aff0e650f049503a296cf2",
              ],
              [
                "4e8ceafb9b3e9a136dc7ff67e840295b499dfb3b2133e4ba113f2e4c0e121e5",
                "cf2174118c8b6d7a4b48f6d534ce5c79422c086a63460502b827ce62a326683c",
              ],
              [
                "d24a44e047e19b6f5afb81c7ca2f69080a5076689a010919f42725c2b789a33b",
                "6fb8d5591b466f8fc63db50f1c0f1c69013f996887b8244d2cdec417afea8fa3",
              ],
              [
                "ea01606a7a6c9cdd249fdfcfacb99584001edd28abbab77b5104e98e8e3b35d4",
                "322af4908c7312b0cfbfe369f7a7b3cdb7d4494bc2823700cfd652188a3ea98d",
              ],
              [
                "af8addbf2b661c8a6c6328655eb96651252007d8c5ea31be4ad196de8ce2131f",
                "6749e67c029b85f52a034eafd096836b2520818680e26ac8f3dfbcdb71749700",
              ],
              [
                "e3ae1974566ca06cc516d47e0fb165a674a3dabcfca15e722f0e3450f45889",
                "2aeabe7e4531510116217f07bf4d07300de97e4874f81f533420a72eeb0bd6a4",
              ],
              [
                "591ee355313d99721cf6993ffed1e3e301993ff3ed258802075ea8ced397e246",
                "b0ea558a113c30bea60fc4775460c7901ff0b053d25ca2bdeee98f1a4be5d196",
              ],
              [
                "11396d55fda54c49f19aa97318d8da61fa8584e47b084945077cf03255b52984",
                "998c74a8cd45ac01289d5833a7beb4744ff536b01b257be4c5767bea93ea57a4",
              ],
              [
                "3c5d2a1ba39c5a1790000738c9e0c40b8dcdfd5468754b6405540157e017aa7a",
                "b2284279995a34e2f9d4de7396fc18b80f9b8b9fdd270f6661f79ca4c81bd257",
              ],
              [
                "cc8704b8a60a0defa3a99a7299f2e9c3fbc395afb04ac078425ef8a1793cc030",
                "bdd46039feed17881d1e0862db347f8cf395b74fc4bcdc4e940b74e3ac1f1b13",
              ],
              [
                "c533e4f7ea8555aacd9777ac5cad29b97dd4defccc53ee7ea204119b2889b197",
                "6f0a256bc5efdf429a2fb6242f1a43a2d9b925bb4a4b3a26bb8e0f45eb596096",
              ],
              [
                "c14f8f2ccb27d6f109f6d08d03cc96a69ba8c34eec07bbcf566d48e33da6593",
                "c359d6923bb398f7fd4473e16fe1c28475b740dd098075e6c0e8649113dc3a38",
              ],
              [
                "a6cbc3046bc6a450bac24789fa17115a4c9739ed75f8f21ce441f72e0b90e6ef",
                "21ae7f4680e889bb130619e2c0f95a360ceb573c70603139862afd617fa9b9f",
              ],
              [
                "347d6d9a02c48927ebfb86c1359b1caf130a3c0267d11ce6344b39f99d43cc38",
                "60ea7f61a353524d1c987f6ecec92f086d565ab687870cb12689ff1e31c74448",
              ],
              [
                "da6545d2181db8d983f7dcb375ef5866d47c67b1bf31c8cf855ef7437b72656a",
                "49b96715ab6878a79e78f07ce5680c5d6673051b4935bd897fea824b77dc208a",
              ],
              [
                "c40747cc9d012cb1a13b8148309c6de7ec25d6945d657146b9d5994b8feb1111",
                "5ca560753be2a12fc6de6caf2cb489565db936156b9514e1bb5e83037e0fa2d4",
              ],
              [
                "4e42c8ec82c99798ccf3a610be870e78338c7f713348bd34c8203ef4037f3502",
                "7571d74ee5e0fb92a7a8b33a07783341a5492144cc54bcc40a94473693606437",
              ],
              [
                "3775ab7089bc6af823aba2e1af70b236d251cadb0c86743287522a1b3b0dedea",
                "be52d107bcfa09d8bcb9736a828cfa7fac8db17bf7a76a2c42ad961409018cf7",
              ],
              [
                "cee31cbf7e34ec379d94fb814d3d775ad954595d1314ba8846959e3e82f74e26",
                "8fd64a14c06b589c26b947ae2bcf6bfa0149ef0be14ed4d80f448a01c43b1c6d",
              ],
              [
                "b4f9eaea09b6917619f6ea6a4eb5464efddb58fd45b1ebefcdc1a01d08b47986",
                "39e5c9925b5a54b07433a4f18c61726f8bb131c012ca542eb24a8ac07200682a",
              ],
              [
                "d4263dfc3d2df923a0179a48966d30ce84e2515afc3dccc1b77907792ebcc60e",
                "62dfaf07a0f78feb30e30d6295853ce189e127760ad6cf7fae164e122a208d54",
              ],
              [
                "48457524820fa65a4f8d35eb6930857c0032acc0a4a2de422233eeda897612c4",
                "25a748ab367979d98733c38a1fa1c2e7dc6cc07db2d60a9ae7a76aaa49bd0f77",
              ],
              [
                "dfeeef1881101f2cb11644f3a2afdfc2045e19919152923f367a1767c11cceda",
                "ecfb7056cf1de042f9420bab396793c0c390bde74b4bbdff16a83ae09a9a7517",
              ],
              [
                "6d7ef6b17543f8373c573f44e1f389835d89bcbc6062ced36c82df83b8fae859",
                "cd450ec335438986dfefa10c57fea9bcc521a0959b2d80bbf74b190dca712d10",
              ],
              [
                "e75605d59102a5a2684500d3b991f2e3f3c88b93225547035af25af66e04541f",
                "f5c54754a8f71ee540b9b48728473e314f729ac5308b06938360990e2bfad125",
              ],
              [
                "eb98660f4c4dfaa06a2be453d5020bc99a0c2e60abe388457dd43fefb1ed620c",
                "6cb9a8876d9cb8520609af3add26cd20a0a7cd8a9411131ce85f44100099223e",
              ],
              [
                "13e87b027d8514d35939f2e6892b19922154596941888336dc3563e3b8dba942",
                "fef5a3c68059a6dec5d624114bf1e91aac2b9da568d6abeb2570d55646b8adf1",
              ],
              [
                "ee163026e9fd6fe017c38f06a5be6fc125424b371ce2708e7bf4491691e5764a",
                "1acb250f255dd61c43d94ccc670d0f58f49ae3fa15b96623e5430da0ad6c62b2",
              ],
              [
                "b268f5ef9ad51e4d78de3a750c2dc89b1e626d43505867999932e5db33af3d80",
                "5f310d4b3c99b9ebb19f77d41c1dee018cf0d34fd4191614003e945a1216e423",
              ],
              [
                "ff07f3118a9df035e9fad85eb6c7bfe42b02f01ca99ceea3bf7ffdba93c4750d",
                "438136d603e858a3a5c440c38eccbaddc1d2942114e2eddd4740d098ced1f0d8",
              ],
              [
                "8d8b9855c7c052a34146fd20ffb658bea4b9f69e0d825ebec16e8c3ce2b526a1",
                "cdb559eedc2d79f926baf44fb84ea4d44bcf50fee51d7ceb30e2e7f463036758",
              ],
              [
                "52db0b5384dfbf05bfa9d472d7ae26dfe4b851ceca91b1eba54263180da32b63",
                "c3b997d050ee5d423ebaf66a6db9f57b3180c902875679de924b69d84a7b375",
              ],
              [
                "e62f9490d3d51da6395efd24e80919cc7d0f29c3f3fa48c6fff543becbd43352",
                "6d89ad7ba4876b0b22c2ca280c682862f342c8591f1daf5170e07bfd9ccafa7d",
              ],
              [
                "7f30ea2476b399b4957509c88f77d0191afa2ff5cb7b14fd6d8e7d65aaab1193",
                "ca5ef7d4b231c94c3b15389a5f6311e9daff7bb67b103e9880ef4bff637acaec",
              ],
              [
                "5098ff1e1d9f14fb46a210fada6c903fef0fb7b4a1dd1d9ac60a0361800b7a00",
                "9731141d81fc8f8084d37c6e7542006b3ee1b40d60dfe5362a5b132fd17ddc0",
              ],
              [
                "32b78c7de9ee512a72895be6b9cbefa6e2f3c4ccce445c96b9f2c81e2778ad58",
                "ee1849f513df71e32efc3896ee28260c73bb80547ae2275ba497237794c8753c",
              ],
              [
                "e2cb74fddc8e9fbcd076eef2a7c72b0ce37d50f08269dfc074b581550547a4f7",
                "d3aa2ed71c9dd2247a62df062736eb0baddea9e36122d2be8641abcb005cc4a4",
              ],
              [
                "8438447566d4d7bedadc299496ab357426009a35f235cb141be0d99cd10ae3a8",
                "c4e1020916980a4da5d01ac5e6ad330734ef0d7906631c4f2390426b2edd791f",
              ],
              [
                "4162d488b89402039b584c6fc6c308870587d9c46f660b878ab65c82c711d67e",
                "67163e903236289f776f22c25fb8a3afc1732f2b84b4e95dbda47ae5a0852649",
              ],
              [
                "3fad3fa84caf0f34f0f89bfd2dcf54fc175d767aec3e50684f3ba4a4bf5f683d",
                "cd1bc7cb6cc407bb2f0ca647c718a730cf71872e7d0d2a53fa20efcdfe61826",
              ],
              [
                "674f2600a3007a00568c1a7ce05d0816c1fb84bf1370798f1c69532faeb1a86b",
                "299d21f9413f33b3edf43b257004580b70db57da0b182259e09eecc69e0d38a5",
              ],
              [
                "d32f4da54ade74abb81b815ad1fb3b263d82d6c692714bcff87d29bd5ee9f08f",
                "f9429e738b8e53b968e99016c059707782e14f4535359d582fc416910b3eea87",
              ],
              [
                "30e4e670435385556e593657135845d36fbb6931f72b08cb1ed954f1e3ce3ff6",
                "462f9bce619898638499350113bbc9b10a878d35da70740dc695a559eb88db7b",
              ],
              [
                "be2062003c51cc3004682904330e4dee7f3dcd10b01e580bf1971b04d4cad297",
                "62188bc49d61e5428573d48a74e1c655b1c61090905682a0d5558ed72dccb9bc",
              ],
              [
                "93144423ace3451ed29e0fb9ac2af211cb6e84a601df5993c419859fff5df04a",
                "7c10dfb164c3425f5c71a3f9d7992038f1065224f72bb9d1d902a6d13037b47c",
              ],
              [
                "b015f8044f5fcbdcf21ca26d6c34fb8197829205c7b7d2a7cb66418c157b112c",
                "ab8c1e086d04e813744a655b2df8d5f83b3cdc6faa3088c1d3aea1454e3a1d5f",
              ],
              [
                "d5e9e1da649d97d89e4868117a465a3a4f8a18de57a140d36b3f2af341a21b52",
                "4cb04437f391ed73111a13cc1d4dd0db1693465c2240480d8955e8592f27447a",
              ],
              [
                "d3ae41047dd7ca065dbf8ed77b992439983005cd72e16d6f996a5316d36966bb",
                "bd1aeb21ad22ebb22a10f0303417c6d964f8cdd7df0aca614b10dc14d125ac46",
              ],
              [
                "463e2763d885f958fc66cdd22800f0a487197d0a82e377b49f80af87c897b065",
                "bfefacdb0e5d0fd7df3a311a94de062b26b80c61fbc97508b79992671ef7ca7f",
              ],
              [
                "7985fdfd127c0567c6f53ec1bb63ec3158e597c40bfe747c83cddfc910641917",
                "603c12daf3d9862ef2b25fe1de289aed24ed291e0ec6708703a5bd567f32ed03",
              ],
              [
                "74a1ad6b5f76e39db2dd249410eac7f99e74c59cb83d2d0ed5ff1543da7703e9",
                "cc6157ef18c9c63cd6193d83631bbea0093e0968942e8c33d5737fd790e0db08",
              ],
              [
                "30682a50703375f602d416664ba19b7fc9bab42c72747463a71d0896b22f6da3",
                "553e04f6b018b4fa6c8f39e7f311d3176290d0e0f19ca73f17714d9977a22ff8",
              ],
              [
                "9e2158f0d7c0d5f26c3791efefa79597654e7a2b2464f52b1ee6c1347769ef57",
                "712fcdd1b9053f09003a3481fa7762e9ffd7c8ef35a38509e2fbf2629008373",
              ],
              [
                "176e26989a43c9cfeba4029c202538c28172e566e3c4fce7322857f3be327d66",
                "ed8cc9d04b29eb877d270b4878dc43c19aefd31f4eee09ee7b47834c1fa4b1c3",
              ],
              [
                "75d46efea3771e6e68abb89a13ad747ecf1892393dfc4f1b7004788c50374da8",
                "9852390a99507679fd0b86fd2b39a868d7efc22151346e1a3ca4726586a6bed8",
              ],
              [
                "809a20c67d64900ffb698c4c825f6d5f2310fb0451c869345b7319f645605721",
                "9e994980d9917e22b76b061927fa04143d096ccc54963e6a5ebfa5f3f8e286c1",
              ],
              [
                "1b38903a43f7f114ed4500b4eac7083fdefece1cf29c63528d563446f972c180",
                "4036edc931a60ae889353f77fd53de4a2708b26b6f5da72ad3394119daf408f9",
              ],
            ],
          },
        };
      },
      3355: function ($, Y, J) {
        "use strict";
        var Q = J(5944),
          ee = J(7551),
          et = J(7356);
        ((Y.assert = ee),
          (Y.toArray = et.toArray),
          (Y.zero2 = et.zero2),
          (Y.toHex = et.toHex),
          (Y.encode = et.encode),
          (Y.getNAF = function ($, Y, J) {
            var Q = Array(Math.max($.bitLength(), J) + 1);
            Q.fill(0);
            for (
              var ee = 1 << (Y + 1), et = $.clone(), er = 0;
              er < Q.length;
              er++
            ) {
              var ei,
                en = et.andln(ee - 1);
              (et.isOdd()
                ? ((ei = en > (ee >> 1) - 1 ? (ee >> 1) - en : en),
                  et.isubn(ei))
                : (ei = 0),
                (Q[er] = ei),
                et.iushrn(1));
            }
            return Q;
          }),
          (Y.getJSF = function ($, Y) {
            var J = [[], []];
            (($ = $.clone()), (Y = Y.clone()));
            for (var Q = 0, ee = 0; $.cmpn(-Q) > 0 || Y.cmpn(-ee) > 0; ) {
              var et,
                er,
                ei = ($.andln(3) + Q) & 3,
                en = (Y.andln(3) + ee) & 3;
              if ((3 === ei && (ei = -1), 3 === en && (en = -1), (1 & ei) == 0))
                et = 0;
              else {
                var ea = ($.andln(7) + Q) & 7;
                et = (3 === ea || 5 === ea) && 2 === en ? -ei : ei;
              }
              if ((J[0].push(et), (1 & en) == 0)) er = 0;
              else {
                var ea = (Y.andln(7) + ee) & 7;
                er = (3 === ea || 5 === ea) && 2 === ei ? -en : en;
              }
              (J[1].push(er),
                2 * Q === et + 1 && (Q = 1 - Q),
                2 * ee === er + 1 && (ee = 1 - ee),
                $.iushrn(1),
                Y.iushrn(1));
            }
            return J;
          }),
          (Y.cachedProperty = function ($, Y, J) {
            var Q = "_" + Y;
            $.prototype[Y] = function () {
              return void 0 !== this[Q] ? this[Q] : (this[Q] = J.call(this));
            };
          }),
          (Y.parseBytes = function ($) {
            return "string" == typeof $ ? Y.toArray($, "hex") : $;
          }),
          (Y.intFromLE = function ($) {
            return new Q($, "hex", "le");
          }));
      },
      689: function ($, Y, J) {
        var Q = J(5725).Buffer,
          ee = J(3858);
        $.exports = function ($, Y, J, et) {
          if (
            (Q.isBuffer($) || ($ = Q.from($, "binary")),
            Y && (Q.isBuffer(Y) || (Y = Q.from(Y, "binary")), 8 !== Y.length))
          )
            throw RangeError("salt should be Buffer with 8 byte length");
          for (
            var er = J / 8,
              ei = Q.alloc(er),
              en = Q.alloc(et || 0),
              ea = Q.alloc(0);
            er > 0 || et > 0;

          ) {
            var ef = new ee();
            (ef.update(ea),
              ef.update($),
              Y && ef.update(Y),
              (ea = ef.digest()));
            var eo = 0;
            if (er > 0) {
              var es = ei.length - er;
              ((eo = Math.min(er, ea.length)),
                ea.copy(ei, es, 0, eo),
                (er -= eo));
            }
            if (eo < ea.length && et > 0) {
              var eh = en.length - et,
                ed = Math.min(et, ea.length - eo);
              (ea.copy(en, eh, eo, eo + ed), (et -= ed));
            }
          }
          return (ea.fill(0), { key: ei, iv: en });
        };
      },
      2321: function ($, Y, J) {
        "use strict";
        var Q = J(5725).Buffer,
          ee = J(5486).Transform;
        function et($) {
          (ee.call(this),
            (this._block = Q.allocUnsafe($)),
            (this._blockSize = $),
            (this._blockOffset = 0),
            (this._length = [0, 0, 0, 0]),
            (this._finalized = !1));
        }
        (J(1638)(et, ee),
          (et.prototype._transform = function ($, Y, J) {
            var Q = null;
            try {
              this.update($, Y);
            } catch ($) {
              Q = $;
            }
            J(Q);
          }),
          (et.prototype._flush = function ($) {
            var Y = null;
            try {
              this.push(this.digest());
            } catch ($) {
              Y = $;
            }
            $(Y);
          }),
          (et.prototype.update = function ($, Y) {
            var J = $;
            if (!Q.isBuffer(J) && "string" != typeof J)
              throw TypeError("Data must be a string or a buffer");
            if (this._finalized) throw Error("Digest already called");
            Q.isBuffer($) || ($ = Q.from($, Y));
            for (
              var ee = this._block, et = 0;
              this._blockOffset + $.length - et >= this._blockSize;

            ) {
              for (var er = this._blockOffset; er < this._blockSize; )
                ee[er++] = $[et++];
              (this._update(), (this._blockOffset = 0));
            }
            for (; et < $.length; ) ee[this._blockOffset++] = $[et++];
            for (var ei = 0, en = 8 * $.length; en > 0; ++ei)
              ((this._length[ei] += en),
                (en = (this._length[ei] / 0x100000000) | 0) > 0 &&
                  (this._length[ei] -= 0x100000000 * en));
            return this;
          }),
          (et.prototype._update = function () {
            throw Error("_update is not implemented");
          }),
          (et.prototype.digest = function ($) {
            if (this._finalized) throw Error("Digest already called");
            this._finalized = !0;
            var Y = this._digest();
            (void 0 !== $ && (Y = Y.toString($)),
              this._block.fill(0),
              (this._blockOffset = 0));
            for (var J = 0; J < 4; ++J) this._length[J] = 0;
            return Y;
          }),
          (et.prototype._digest = function () {
            throw Error("_digest is not implemented");
          }),
          ($.exports = et));
      },
      8044: function ($, Y, J) {
        ((Y.utils = J(6302)),
          (Y.common = J(1226)),
          (Y.sha = J(4857)),
          (Y.ripemd = J(9956)),
          (Y.hmac = J(2184)),
          (Y.sha1 = Y.sha.sha1),
          (Y.sha256 = Y.sha.sha256),
          (Y.sha224 = Y.sha.sha224),
          (Y.sha384 = Y.sha.sha384),
          (Y.sha512 = Y.sha.sha512),
          (Y.ripemd160 = Y.ripemd.ripemd160));
      },
      1226: function ($, Y, J) {
        "use strict";
        var Q = J(6302),
          ee = J(7551);
        function et() {
          ((this.pending = null),
            (this.pendingTotal = 0),
            (this.blockSize = this.constructor.blockSize),
            (this.outSize = this.constructor.outSize),
            (this.hmacStrength = this.constructor.hmacStrength),
            (this.padLength = this.constructor.padLength / 8),
            (this.endian = "big"),
            (this._delta8 = this.blockSize / 8),
            (this._delta32 = this.blockSize / 32));
        }
        ((Y.BlockHash = et),
          (et.prototype.update = function ($, Y) {
            if (
              (($ = Q.toArray($, Y)),
              this.pending
                ? (this.pending = this.pending.concat($))
                : (this.pending = $),
              (this.pendingTotal += $.length),
              this.pending.length >= this._delta8)
            ) {
              var J = ($ = this.pending).length % this._delta8;
              ((this.pending = $.slice($.length - J, $.length)),
                0 === this.pending.length && (this.pending = null),
                ($ = Q.join32($, 0, $.length - J, this.endian)));
              for (var ee = 0; ee < $.length; ee += this._delta32)
                this._update($, ee, ee + this._delta32);
            }
            return this;
          }),
          (et.prototype.digest = function ($) {
            return (
              this.update(this._pad()),
              ee(null === this.pending),
              this._digest($)
            );
          }),
          (et.prototype._pad = function () {
            var $ = this.pendingTotal,
              Y = this._delta8,
              J = Y - (($ + this.padLength) % Y),
              Q = Array(J + this.padLength);
            Q[0] = 128;
            for (var ee = 1; ee < J; ee++) Q[ee] = 0;
            if ((($ <<= 3), "big" === this.endian)) {
              for (var et = 8; et < this.padLength; et++) Q[ee++] = 0;
              ((Q[ee++] = 0),
                (Q[ee++] = 0),
                (Q[ee++] = 0),
                (Q[ee++] = 0),
                (Q[ee++] = ($ >>> 24) & 255),
                (Q[ee++] = ($ >>> 16) & 255),
                (Q[ee++] = ($ >>> 8) & 255),
                (Q[ee++] = 255 & $));
            } else
              for (
                Q[ee++] = 255 & $,
                  Q[ee++] = ($ >>> 8) & 255,
                  Q[ee++] = ($ >>> 16) & 255,
                  Q[ee++] = ($ >>> 24) & 255,
                  Q[ee++] = 0,
                  Q[ee++] = 0,
                  Q[ee++] = 0,
                  Q[ee++] = 0,
                  et = 8;
                et < this.padLength;
                et++
              )
                Q[ee++] = 0;
            return Q;
          }));
      },
      2184: function ($, Y, J) {
        "use strict";
        var Q = J(6302),
          ee = J(7551);
        function et($, Y, J) {
          if (!(this instanceof et)) return new et($, Y, J);
          ((this.Hash = $),
            (this.blockSize = $.blockSize / 8),
            (this.outSize = $.outSize / 8),
            (this.inner = null),
            (this.outer = null),
            this._init(Q.toArray(Y, J)));
        }
        (($.exports = et),
          (et.prototype._init = function ($) {
            ($.length > this.blockSize &&
              ($ = new this.Hash().update($).digest()),
              ee($.length <= this.blockSize));
            for (var Y = $.length; Y < this.blockSize; Y++) $.push(0);
            for (Y = 0; Y < $.length; Y++) $[Y] ^= 54;
            for (
              this.inner = new this.Hash().update($), Y = 0;
              Y < $.length;
              Y++
            )
              $[Y] ^= 106;
            this.outer = new this.Hash().update($);
          }),
          (et.prototype.update = function ($, Y) {
            return (this.inner.update($, Y), this);
          }),
          (et.prototype.digest = function ($) {
            return (
              this.outer.update(this.inner.digest()),
              this.outer.digest($)
            );
          }));
      },
      9956: function ($, Y, J) {
        "use strict";
        var Q = J(6302),
          ee = J(1226),
          et = Q.rotl32,
          er = Q.sum32,
          ei = Q.sum32_3,
          en = Q.sum32_4,
          ea = ee.BlockHash;
        function ef() {
          if (!(this instanceof ef)) return new ef();
          (ea.call(this),
            (this.h = [
              0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476, 0xc3d2e1f0,
            ]),
            (this.endian = "little"));
        }
        function eo($, Y, J, Q) {
          return $ <= 15
            ? Y ^ J ^ Q
            : $ <= 31
              ? (Y & J) | (~Y & Q)
              : $ <= 47
                ? (Y | ~J) ^ Q
                : $ <= 63
                  ? (Y & Q) | (J & ~Q)
                  : Y ^ (J | ~Q);
        }
        (Q.inherits(ef, ea),
          (Y.ripemd160 = ef),
          (ef.blockSize = 512),
          (ef.outSize = 160),
          (ef.hmacStrength = 192),
          (ef.padLength = 64),
          (ef.prototype._update = function ($, Y) {
            for (
              var J = this.h[0],
                Q = this.h[1],
                ee = this.h[2],
                ea = this.h[3],
                ef = this.h[4],
                eu = J,
                el = Q,
                ep = ee,
                eb = ea,
                em = ef,
                eg = 0;
              eg < 80;
              eg++
            ) {
              var ey,
                ev,
                e_ = er(
                  et(
                    en(
                      J,
                      eo(eg, Q, ee, ea),
                      $[es[eg] + Y],
                      (ey = eg) <= 15
                        ? 0
                        : ey <= 31
                          ? 0x5a827999
                          : ey <= 47
                            ? 0x6ed9eba1
                            : ey <= 63
                              ? 0x8f1bbcdc
                              : 0xa953fd4e,
                    ),
                    ed[eg],
                  ),
                  ef,
                );
              ((J = ef),
                (ef = ea),
                (ea = et(ee, 10)),
                (ee = Q),
                (Q = e_),
                (e_ = er(
                  et(
                    en(
                      eu,
                      eo(79 - eg, el, ep, eb),
                      $[eh[eg] + Y],
                      (ev = eg) <= 15
                        ? 0x50a28be6
                        : ev <= 31
                          ? 0x5c4dd124
                          : ev <= 47
                            ? 0x6d703ef3
                            : 0x7a6d76e9 * !!(ev <= 63),
                    ),
                    ec[eg],
                  ),
                  em,
                )),
                (eu = em),
                (em = eb),
                (eb = et(ep, 10)),
                (ep = el),
                (el = e_));
            }
            ((e_ = ei(this.h[1], ee, eb)),
              (this.h[1] = ei(this.h[2], ea, em)),
              (this.h[2] = ei(this.h[3], ef, eu)),
              (this.h[3] = ei(this.h[4], J, el)),
              (this.h[4] = ei(this.h[0], Q, ep)),
              (this.h[0] = e_));
          }),
          (ef.prototype._digest = function ($) {
            return "hex" === $
              ? Q.toHex32(this.h, "little")
              : Q.split32(this.h, "little");
          }));
        var es = [
            0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 7, 4, 13, 1,
            10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8, 3, 10, 14, 4, 9, 15, 8, 1,
            2, 7, 0, 6, 13, 11, 5, 12, 1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15,
            14, 5, 6, 2, 4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13,
          ],
          eh = [
            5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12, 6, 11, 3, 7,
            0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2, 15, 5, 1, 3, 7, 14, 6, 9,
            11, 8, 12, 2, 10, 0, 4, 13, 8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13,
            9, 7, 10, 14, 12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11,
          ],
          ed = [
            11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8, 7, 6, 8, 13,
            11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12, 11, 13, 6, 7, 14, 9, 13,
            15, 14, 8, 13, 6, 5, 12, 7, 5, 11, 12, 14, 15, 14, 15, 9, 8, 9, 14,
            5, 6, 8, 6, 5, 12, 9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8,
            5, 6,
          ],
          ec = [
            8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6, 9, 13, 15,
            7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11, 9, 7, 15, 11, 8, 6, 6,
            14, 12, 13, 5, 14, 13, 13, 7, 5, 15, 5, 8, 11, 14, 14, 6, 14, 6, 9,
            12, 9, 12, 5, 15, 8, 8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13,
            11, 11,
          ];
      },
      4857: function ($, Y, J) {
        "use strict";
        ((Y.sha1 = J(2953)),
          (Y.sha224 = J(5334)),
          (Y.sha256 = J(5563)),
          (Y.sha384 = J(4811)),
          (Y.sha512 = J(5978)));
      },
      2953: function ($, Y, J) {
        "use strict";
        var Q = J(6302),
          ee = J(1226),
          et = J(9101),
          er = Q.rotl32,
          ei = Q.sum32,
          en = Q.sum32_5,
          ea = et.ft_1,
          ef = ee.BlockHash,
          eo = [0x5a827999, 0x6ed9eba1, 0x8f1bbcdc, 0xca62c1d6];
        function es() {
          if (!(this instanceof es)) return new es();
          (ef.call(this),
            (this.h = [
              0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476, 0xc3d2e1f0,
            ]),
            (this.W = Array(80)));
        }
        (Q.inherits(es, ef),
          ($.exports = es),
          (es.blockSize = 512),
          (es.outSize = 160),
          (es.hmacStrength = 80),
          (es.padLength = 64),
          (es.prototype._update = function ($, Y) {
            for (var J = this.W, Q = 0; Q < 16; Q++) J[Q] = $[Y + Q];
            for (; Q < J.length; Q++)
              J[Q] = er(J[Q - 3] ^ J[Q - 8] ^ J[Q - 14] ^ J[Q - 16], 1);
            var ee = this.h[0],
              et = this.h[1],
              ef = this.h[2],
              es = this.h[3],
              eh = this.h[4];
            for (Q = 0; Q < J.length; Q++) {
              var ed = ~~(Q / 20),
                ec = en(er(ee, 5), ea(ed, et, ef, es), eh, J[Q], eo[ed]);
              ((eh = es), (es = ef), (ef = er(et, 30)), (et = ee), (ee = ec));
            }
            ((this.h[0] = ei(this.h[0], ee)),
              (this.h[1] = ei(this.h[1], et)),
              (this.h[2] = ei(this.h[2], ef)),
              (this.h[3] = ei(this.h[3], es)),
              (this.h[4] = ei(this.h[4], eh)));
          }),
          (es.prototype._digest = function ($) {
            return "hex" === $
              ? Q.toHex32(this.h, "big")
              : Q.split32(this.h, "big");
          }));
      },
      5334: function ($, Y, J) {
        "use strict";
        var Q = J(6302),
          ee = J(5563);
        function et() {
          if (!(this instanceof et)) return new et();
          (ee.call(this),
            (this.h = [
              0xc1059ed8, 0x367cd507, 0x3070dd17, 0xf70e5939, 0xffc00b31,
              0x68581511, 0x64f98fa7, 0xbefa4fa4,
            ]));
        }
        (Q.inherits(et, ee),
          ($.exports = et),
          (et.blockSize = 512),
          (et.outSize = 224),
          (et.hmacStrength = 192),
          (et.padLength = 64),
          (et.prototype._digest = function ($) {
            return "hex" === $
              ? Q.toHex32(this.h.slice(0, 7), "big")
              : Q.split32(this.h.slice(0, 7), "big");
          }));
      },
      5563: function ($, Y, J) {
        "use strict";
        var Q = J(6302),
          ee = J(1226),
          et = J(9101),
          er = J(7551),
          ei = Q.sum32,
          en = Q.sum32_4,
          ea = Q.sum32_5,
          ef = et.ch32,
          eo = et.maj32,
          es = et.s0_256,
          eh = et.s1_256,
          ed = et.g0_256,
          ec = et.g1_256,
          eu = ee.BlockHash,
          el = [
            0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b,
            0x59f111f1, 0x923f82a4, 0xab1c5ed5, 0xd807aa98, 0x12835b01,
            0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7,
            0xc19bf174, 0xe49b69c1, 0xefbe4786, 0xfc19dc6, 0x240ca1cc,
            0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da, 0x983e5152,
            0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147,
            0x6ca6351, 0x14292967, 0x27b70a85, 0x2e1b2138, 0x4d2c6dfc,
            0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
            0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819,
            0xd6990624, 0xf40e3585, 0x106aa070, 0x19a4c116, 0x1e376c08,
            0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f,
            0x682e6ff3, 0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208,
            0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2,
          ];
        function ep() {
          if (!(this instanceof ep)) return new ep();
          (eu.call(this),
            (this.h = [
              0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f,
              0x9b05688c, 0x1f83d9ab, 0x5be0cd19,
            ]),
            (this.k = el),
            (this.W = Array(64)));
        }
        (Q.inherits(ep, eu),
          ($.exports = ep),
          (ep.blockSize = 512),
          (ep.outSize = 256),
          (ep.hmacStrength = 192),
          (ep.padLength = 64),
          (ep.prototype._update = function ($, Y) {
            for (var J = this.W, Q = 0; Q < 16; Q++) J[Q] = $[Y + Q];
            for (; Q < J.length; Q++)
              J[Q] = en(ec(J[Q - 2]), J[Q - 7], ed(J[Q - 15]), J[Q - 16]);
            var ee = this.h[0],
              et = this.h[1],
              eu = this.h[2],
              el = this.h[3],
              ep = this.h[4],
              eb = this.h[5],
              em = this.h[6],
              eg = this.h[7];
            for (er(this.k.length === J.length), Q = 0; Q < J.length; Q++) {
              var ey = ea(eg, eh(ep), ef(ep, eb, em), this.k[Q], J[Q]),
                ev = ei(es(ee), eo(ee, et, eu));
              ((eg = em),
                (em = eb),
                (eb = ep),
                (ep = ei(el, ey)),
                (el = eu),
                (eu = et),
                (et = ee),
                (ee = ei(ey, ev)));
            }
            ((this.h[0] = ei(this.h[0], ee)),
              (this.h[1] = ei(this.h[1], et)),
              (this.h[2] = ei(this.h[2], eu)),
              (this.h[3] = ei(this.h[3], el)),
              (this.h[4] = ei(this.h[4], ep)),
              (this.h[5] = ei(this.h[5], eb)),
              (this.h[6] = ei(this.h[6], em)),
              (this.h[7] = ei(this.h[7], eg)));
          }),
          (ep.prototype._digest = function ($) {
            return "hex" === $
              ? Q.toHex32(this.h, "big")
              : Q.split32(this.h, "big");
          }));
      },
      4811: function ($, Y, J) {
        "use strict";
        var Q = J(6302),
          ee = J(5978);
        function et() {
          if (!(this instanceof et)) return new et();
          (ee.call(this),
            (this.h = [
              0xcbbb9d5d, 0xc1059ed8, 0x629a292a, 0x367cd507, 0x9159015a,
              0x3070dd17, 0x152fecd8, 0xf70e5939, 0x67332667, 0xffc00b31,
              0x8eb44a87, 0x68581511, 0xdb0c2e0d, 0x64f98fa7, 0x47b5481d,
              0xbefa4fa4,
            ]));
        }
        (Q.inherits(et, ee),
          ($.exports = et),
          (et.blockSize = 1024),
          (et.outSize = 384),
          (et.hmacStrength = 192),
          (et.padLength = 128),
          (et.prototype._digest = function ($) {
            return "hex" === $
              ? Q.toHex32(this.h.slice(0, 12), "big")
              : Q.split32(this.h.slice(0, 12), "big");
          }));
      },
      5978: function ($, Y, J) {
        "use strict";
        var Q = J(6302),
          ee = J(1226),
          et = J(7551),
          er = Q.rotr64_hi,
          ei = Q.rotr64_lo,
          en = Q.shr64_hi,
          ea = Q.shr64_lo,
          ef = Q.sum64,
          eo = Q.sum64_hi,
          es = Q.sum64_lo,
          eh = Q.sum64_4_hi,
          ed = Q.sum64_4_lo,
          ec = Q.sum64_5_hi,
          eu = Q.sum64_5_lo,
          el = ee.BlockHash,
          ep = [
            0x428a2f98, 0xd728ae22, 0x71374491, 0x23ef65cd, 0xb5c0fbcf,
            0xec4d3b2f, 0xe9b5dba5, 0x8189dbbc, 0x3956c25b, 0xf348b538,
            0x59f111f1, 0xb605d019, 0x923f82a4, 0xaf194f9b, 0xab1c5ed5,
            0xda6d8118, 0xd807aa98, 0xa3030242, 0x12835b01, 0x45706fbe,
            0x243185be, 0x4ee4b28c, 0x550c7dc3, 0xd5ffb4e2, 0x72be5d74,
            0xf27b896f, 0x80deb1fe, 0x3b1696b1, 0x9bdc06a7, 0x25c71235,
            0xc19bf174, 0xcf692694, 0xe49b69c1, 0x9ef14ad2, 0xefbe4786,
            0x384f25e3, 0xfc19dc6, 0x8b8cd5b5, 0x240ca1cc, 0x77ac9c65,
            0x2de92c6f, 0x592b0275, 0x4a7484aa, 0x6ea6e483, 0x5cb0a9dc,
            0xbd41fbd4, 0x76f988da, 0x831153b5, 0x983e5152, 0xee66dfab,
            0xa831c66d, 0x2db43210, 0xb00327c8, 0x98fb213f, 0xbf597fc7,
            0xbeef0ee4, 0xc6e00bf3, 0x3da88fc2, 0xd5a79147, 0x930aa725,
            0x6ca6351, 0xe003826f, 0x14292967, 0xa0e6e70, 0x27b70a85,
            0x46d22ffc, 0x2e1b2138, 0x5c26c926, 0x4d2c6dfc, 0x5ac42aed,
            0x53380d13, 0x9d95b3df, 0x650a7354, 0x8baf63de, 0x766a0abb,
            0x3c77b2a8, 0x81c2c92e, 0x47edaee6, 0x92722c85, 0x1482353b,
            0xa2bfe8a1, 0x4cf10364, 0xa81a664b, 0xbc423001, 0xc24b8b70,
            0xd0f89791, 0xc76c51a3, 0x654be30, 0xd192e819, 0xd6ef5218,
            0xd6990624, 0x5565a910, 0xf40e3585, 0x5771202a, 0x106aa070,
            0x32bbd1b8, 0x19a4c116, 0xb8d2d0c8, 0x1e376c08, 0x5141ab53,
            0x2748774c, 0xdf8eeb99, 0x34b0bcb5, 0xe19b48a8, 0x391c0cb3,
            0xc5c95a63, 0x4ed8aa4a, 0xe3418acb, 0x5b9cca4f, 0x7763e373,
            0x682e6ff3, 0xd6b2b8a3, 0x748f82ee, 0x5defb2fc, 0x78a5636f,
            0x43172f60, 0x84c87814, 0xa1f0ab72, 0x8cc70208, 0x1a6439ec,
            0x90befffa, 0x23631e28, 0xa4506ceb, 0xde82bde9, 0xbef9a3f7,
            0xb2c67915, 0xc67178f2, 0xe372532b, 0xca273ece, 0xea26619c,
            0xd186b8c7, 0x21c0c207, 0xeada7dd6, 0xcde0eb1e, 0xf57d4f7f,
            0xee6ed178, 0x6f067aa, 0x72176fba, 0xa637dc5, 0xa2c898a6,
            0x113f9804, 0xbef90dae, 0x1b710b35, 0x131c471b, 0x28db77f5,
            0x23047d84, 0x32caab7b, 0x40c72493, 0x3c9ebe0a, 0x15c9bebc,
            0x431d67c4, 0x9c100d4c, 0x4cc5d4be, 0xcb3e42b6, 0x597f299c,
            0xfc657e2a, 0x5fcb6fab, 0x3ad6faec, 0x6c44198c, 0x4a475817,
          ];
        function eb() {
          if (!(this instanceof eb)) return new eb();
          (el.call(this),
            (this.h = [
              0x6a09e667, 0xf3bcc908, 0xbb67ae85, 0x84caa73b, 0x3c6ef372,
              0xfe94f82b, 0xa54ff53a, 0x5f1d36f1, 0x510e527f, 0xade682d1,
              0x9b05688c, 0x2b3e6c1f, 0x1f83d9ab, 0xfb41bd6b, 0x5be0cd19,
              0x137e2179,
            ]),
            (this.k = ep),
            (this.W = Array(160)));
        }
        (Q.inherits(eb, el),
          ($.exports = eb),
          (eb.blockSize = 1024),
          (eb.outSize = 512),
          (eb.hmacStrength = 192),
          (eb.padLength = 128),
          (eb.prototype._prepareBlock = function ($, Y) {
            for (var J = this.W, Q = 0; Q < 32; Q++) J[Q] = $[Y + Q];
            for (; Q < J.length; Q += 2) {
              var ee = (function ($, Y) {
                  var J = er($, Y, 19) ^ er(Y, $, 29) ^ en($, Y, 6);
                  return (J < 0 && (J += 0x100000000), J);
                })(J[Q - 4], J[Q - 3]),
                et = (function ($, Y) {
                  var J = ei($, Y, 19) ^ ei(Y, $, 29) ^ ea($, Y, 6);
                  return (J < 0 && (J += 0x100000000), J);
                })(J[Q - 4], J[Q - 3]),
                ef = J[Q - 14],
                eo = J[Q - 13],
                es = (function ($, Y) {
                  var J = er($, Y, 1) ^ er($, Y, 8) ^ en($, Y, 7);
                  return (J < 0 && (J += 0x100000000), J);
                })(J[Q - 30], J[Q - 29]),
                ec = (function ($, Y) {
                  var J = ei($, Y, 1) ^ ei($, Y, 8) ^ ea($, Y, 7);
                  return (J < 0 && (J += 0x100000000), J);
                })(J[Q - 30], J[Q - 29]),
                eu = J[Q - 32],
                el = J[Q - 31];
              ((J[Q] = eh(ee, et, ef, eo, es, ec, eu, el)),
                (J[Q + 1] = ed(ee, et, ef, eo, es, ec, eu, el)));
            }
          }),
          (eb.prototype._update = function ($, Y) {
            this._prepareBlock($, Y);
            var J = this.W,
              Q = this.h[0],
              ee = this.h[1],
              en = this.h[2],
              ea = this.h[3],
              eh = this.h[4],
              ed = this.h[5],
              el = this.h[6],
              ep = this.h[7],
              eb = this.h[8],
              em = this.h[9],
              eg = this.h[10],
              ey = this.h[11],
              ev = this.h[12],
              e_ = this.h[13],
              ew = this.h[14],
              ex = this.h[15];
            et(this.k.length === J.length);
            for (var eM = 0; eM < J.length; eM += 2) {
              var eS = ew,
                eE = ex,
                ek = (function ($, Y) {
                  var J = er($, Y, 14) ^ er($, Y, 18) ^ er(Y, $, 9);
                  return (J < 0 && (J += 0x100000000), J);
                })(eb, em),
                eA = (function ($, Y) {
                  var J = ei($, Y, 14) ^ ei($, Y, 18) ^ ei(Y, $, 9);
                  return (J < 0 && (J += 0x100000000), J);
                })(eb, em),
                eR = (function ($, Y, J) {
                  var Q = ($ & Y) ^ (~$ & J);
                  return (Q < 0 && (Q += 0x100000000), Q);
                })(eb, eg, ev),
                eI = (function ($, Y, J) {
                  var Q = ($ & Y) ^ (~$ & J);
                  return (Q < 0 && (Q += 0x100000000), Q);
                })(em, ey, e_),
                eB = this.k[eM],
                eT = this.k[eM + 1],
                eP = J[eM],
                eO = J[eM + 1],
                eC = ec(eS, eE, ek, eA, eR, eI, eB, eT, eP, eO),
                eN = eu(eS, eE, ek, eA, eR, eI, eB, eT, eP, eO);
              ((eS = (function ($, Y) {
                var J = er($, Y, 28) ^ er(Y, $, 2) ^ er(Y, $, 7);
                return (J < 0 && (J += 0x100000000), J);
              })(Q, ee)),
                (eE = (function ($, Y) {
                  var J = ei($, Y, 28) ^ ei(Y, $, 2) ^ ei(Y, $, 7);
                  return (J < 0 && (J += 0x100000000), J);
                })(Q, ee)));
              var ej = eo(
                  eS,
                  eE,
                  (ek = (function ($, Y, J) {
                    var Q = ($ & Y) ^ ($ & J) ^ (Y & J);
                    return (Q < 0 && (Q += 0x100000000), Q);
                  })(Q, en, eh)),
                  (eA = (function ($, Y, J) {
                    var Q = ($ & Y) ^ ($ & J) ^ (Y & J);
                    return (Q < 0 && (Q += 0x100000000), Q);
                  })(ee, ea, ed)),
                ),
                eD = es(eS, eE, ek, eA);
              ((ew = ev),
                (ex = e_),
                (ev = eg),
                (e_ = ey),
                (eg = eb),
                (ey = em),
                (eb = eo(el, ep, eC, eN)),
                (em = es(ep, ep, eC, eN)),
                (el = eh),
                (ep = ed),
                (eh = en),
                (ed = ea),
                (en = Q),
                (ea = ee),
                (Q = eo(eC, eN, ej, eD)),
                (ee = es(eC, eN, ej, eD)));
            }
            (ef(this.h, 0, Q, ee),
              ef(this.h, 2, en, ea),
              ef(this.h, 4, eh, ed),
              ef(this.h, 6, el, ep),
              ef(this.h, 8, eb, em),
              ef(this.h, 10, eg, ey),
              ef(this.h, 12, ev, e_),
              ef(this.h, 14, ew, ex));
          }),
          (eb.prototype._digest = function ($) {
            return "hex" === $
              ? Q.toHex32(this.h, "big")
              : Q.split32(this.h, "big");
          }));
      },
      9101: function ($, Y, J) {
        "use strict";
        var Q = J(6302).rotr32;
        function ee($, Y, J) {
          return ($ & Y) ^ ($ & J) ^ (Y & J);
        }
        ((Y.ft_1 = function ($, Y, J, Q) {
          var et;
          return 0 === $
            ? ((et = Y) & J) ^ (~et & Q)
            : 1 === $ || 3 === $
              ? Y ^ J ^ Q
              : 2 === $
                ? ee(Y, J, Q)
                : void 0;
        }),
          (Y.ch32 = function ($, Y, J) {
            return ($ & Y) ^ (~$ & J);
          }),
          (Y.maj32 = ee),
          (Y.p32 = function ($, Y, J) {
            return $ ^ Y ^ J;
          }),
          (Y.s0_256 = function ($) {
            return Q($, 2) ^ Q($, 13) ^ Q($, 22);
          }),
          (Y.s1_256 = function ($) {
            return Q($, 6) ^ Q($, 11) ^ Q($, 25);
          }),
          (Y.g0_256 = function ($) {
            return Q($, 7) ^ Q($, 18) ^ ($ >>> 3);
          }),
          (Y.g1_256 = function ($) {
            return Q($, 17) ^ Q($, 19) ^ ($ >>> 10);
          }));
      },
      6302: function ($, Y, J) {
        "use strict";
        var Q = J(7551);
        function ee($) {
          return (
            (($ >>> 24) |
              (($ >>> 8) & 65280) |
              (($ << 8) & 0xff0000) |
              ((255 & $) << 24)) >>>
            0
          );
        }
        function et($) {
          return 1 === $.length ? "0" + $ : $;
        }
        function er($) {
          if (7 === $.length) return "0" + $;
          if (6 === $.length) return "00" + $;
          if (5 === $.length) return "000" + $;
          if (4 === $.length) return "0000" + $;
          if (3 === $.length) return "00000" + $;
          else if (2 === $.length) return "000000" + $;
          else if (1 === $.length) return "0000000" + $;
          else return $;
        }
        ((Y.inherits = J(1638)),
          (Y.toArray = function ($, Y) {
            if (Array.isArray($)) return $.slice();
            if (!$) return [];
            var J = [];
            if ("string" == typeof $)
              if (Y) {
                if ("hex" === Y)
                  for (
                    ($ = $.replace(/[^a-z0-9]+/gi, "")).length % 2 != 0 &&
                      ($ = "0" + $),
                      ee = 0;
                    ee < $.length;
                    ee += 2
                  )
                    J.push(parseInt($[ee] + $[ee + 1], 16));
              } else
                for (var Q = 0, ee = 0; ee < $.length; ee++) {
                  var et,
                    er,
                    ei = $.charCodeAt(ee);
                  ei < 128
                    ? (J[Q++] = ei)
                    : (ei < 2048
                        ? (J[Q++] = (ei >> 6) | 192)
                        : (((et = $),
                          (er = ee),
                          (64512 & et.charCodeAt(er)) != 55296 ||
                          er < 0 ||
                          er + 1 >= et.length
                            ? 1
                            : (64512 & et.charCodeAt(er + 1)) != 56320)
                            ? (J[Q++] = (ei >> 12) | 224)
                            : ((ei =
                                65536 +
                                ((1023 & ei) << 10) +
                                (1023 & $.charCodeAt(++ee))),
                              (J[Q++] = (ei >> 18) | 240),
                              (J[Q++] = ((ei >> 12) & 63) | 128)),
                          (J[Q++] = ((ei >> 6) & 63) | 128)),
                      (J[Q++] = (63 & ei) | 128));
                }
            else for (ee = 0; ee < $.length; ee++) J[ee] = 0 | $[ee];
            return J;
          }),
          (Y.toHex = function ($) {
            for (var Y = "", J = 0; J < $.length; J++)
              Y += et($[J].toString(16));
            return Y;
          }),
          (Y.htonl = ee),
          (Y.toHex32 = function ($, Y) {
            for (var J = "", Q = 0; Q < $.length; Q++) {
              var et = $[Q];
              ("little" === Y && (et = ee(et)), (J += er(et.toString(16))));
            }
            return J;
          }),
          (Y.zero2 = et),
          (Y.zero8 = er),
          (Y.join32 = function ($, Y, J, ee) {
            var et,
              er = J - Y;
            Q(er % 4 == 0);
            for (
              var ei = Array(er / 4), en = 0, ea = Y;
              en < ei.length;
              en++, ea += 4
            )
              ((et =
                "big" === ee
                  ? ($[ea] << 24) |
                    ($[ea + 1] << 16) |
                    ($[ea + 2] << 8) |
                    $[ea + 3]
                  : ($[ea + 3] << 24) |
                    ($[ea + 2] << 16) |
                    ($[ea + 1] << 8) |
                    $[ea]),
                (ei[en] = et >>> 0));
            return ei;
          }),
          (Y.split32 = function ($, Y) {
            for (
              var J = Array(4 * $.length), Q = 0, ee = 0;
              Q < $.length;
              Q++, ee += 4
            ) {
              var et = $[Q];
              "big" === Y
                ? ((J[ee] = et >>> 24),
                  (J[ee + 1] = (et >>> 16) & 255),
                  (J[ee + 2] = (et >>> 8) & 255),
                  (J[ee + 3] = 255 & et))
                : ((J[ee + 3] = et >>> 24),
                  (J[ee + 2] = (et >>> 16) & 255),
                  (J[ee + 1] = (et >>> 8) & 255),
                  (J[ee] = 255 & et));
            }
            return J;
          }),
          (Y.rotr32 = function ($, Y) {
            return ($ >>> Y) | ($ << (32 - Y));
          }),
          (Y.rotl32 = function ($, Y) {
            return ($ << Y) | ($ >>> (32 - Y));
          }),
          (Y.sum32 = function ($, Y) {
            return ($ + Y) >>> 0;
          }),
          (Y.sum32_3 = function ($, Y, J) {
            return ($ + Y + J) >>> 0;
          }),
          (Y.sum32_4 = function ($, Y, J, Q) {
            return ($ + Y + J + Q) >>> 0;
          }),
          (Y.sum32_5 = function ($, Y, J, Q, ee) {
            return ($ + Y + J + Q + ee) >>> 0;
          }),
          (Y.sum64 = function ($, Y, J, Q) {
            var ee = $[Y],
              et = (Q + $[Y + 1]) >>> 0;
            (($[Y] = (+(et < Q) + J + ee) >>> 0), ($[Y + 1] = et));
          }),
          (Y.sum64_hi = function ($, Y, J, Q) {
            return (+((Y + Q) >>> 0 < Y) + $ + J) >>> 0;
          }),
          (Y.sum64_lo = function ($, Y, J, Q) {
            return (Y + Q) >>> 0;
          }),
          (Y.sum64_4_hi = function ($, Y, J, Q, ee, et, er, ei) {
            var en,
              ea = Y;
            return (
              ($ +
                J +
                ee +
                er +
                (en =
                  0 +
                  +((ea = (ea + Q) >>> 0) < Y) +
                  +((ea = (ea + et) >>> 0) < et) +
                  +((ea = (ea + ei) >>> 0) < ei))) >>>
              0
            );
          }),
          (Y.sum64_4_lo = function ($, Y, J, Q, ee, et, er, ei) {
            return (Y + Q + et + ei) >>> 0;
          }),
          (Y.sum64_5_hi = function ($, Y, J, Q, ee, et, er, ei, en, ea) {
            var ef,
              eo = Y;
            return (
              ($ +
                J +
                ee +
                er +
                en +
                (ef =
                  0 +
                  +((eo = (eo + Q) >>> 0) < Y) +
                  +((eo = (eo + et) >>> 0) < et) +
                  +((eo = (eo + ei) >>> 0) < ei) +
                  +((eo = (eo + ea) >>> 0) < ea))) >>>
              0
            );
          }),
          (Y.sum64_5_lo = function ($, Y, J, Q, ee, et, er, ei, en, ea) {
            return (Y + Q + et + ei + ea) >>> 0;
          }),
          (Y.rotr64_hi = function ($, Y, J) {
            return ((Y << (32 - J)) | ($ >>> J)) >>> 0;
          }),
          (Y.rotr64_lo = function ($, Y, J) {
            return (($ << (32 - J)) | (Y >>> J)) >>> 0;
          }),
          (Y.shr64_hi = function ($, Y, J) {
            return $ >>> J;
          }),
          (Y.shr64_lo = function ($, Y, J) {
            return (($ << (32 - J)) | (Y >>> J)) >>> 0;
          }));
      },
      3730: function ($, Y, J) {
        "use strict";
        var Q = J(8044),
          ee = J(7356),
          et = J(7551);
        function er($) {
          if (!(this instanceof er)) return new er($);
          ((this.hash = $.hash),
            (this.predResist = !!$.predResist),
            (this.outLen = this.hash.outSize),
            (this.minEntropy = $.minEntropy || this.hash.hmacStrength),
            (this._reseed = null),
            (this.reseedInterval = null),
            (this.K = null),
            (this.V = null));
          var Y = ee.toArray($.entropy, $.entropyEnc || "hex"),
            J = ee.toArray($.nonce, $.nonceEnc || "hex"),
            Q = ee.toArray($.pers, $.persEnc || "hex");
          (et(
            Y.length >= this.minEntropy / 8,
            "Not enough entropy. Minimum is: " + this.minEntropy + " bits",
          ),
            this._init(Y, J, Q));
        }
        (($.exports = er),
          (er.prototype._init = function ($, Y, J) {
            var Q = $.concat(Y).concat(J);
            ((this.K = Array(this.outLen / 8)),
              (this.V = Array(this.outLen / 8)));
            for (var ee = 0; ee < this.V.length; ee++)
              ((this.K[ee] = 0), (this.V[ee] = 1));
            (this._update(Q),
              (this._reseed = 1),
              (this.reseedInterval = 0x1000000000000));
          }),
          (er.prototype._hmac = function () {
            return new Q.hmac(this.hash, this.K);
          }),
          (er.prototype._update = function ($) {
            var Y = this._hmac().update(this.V).update([0]);
            ($ && (Y = Y.update($)),
              (this.K = Y.digest()),
              (this.V = this._hmac().update(this.V).digest()),
              $ &&
                ((this.K = this._hmac()
                  .update(this.V)
                  .update([1])
                  .update($)
                  .digest()),
                (this.V = this._hmac().update(this.V).digest())));
          }),
          (er.prototype.reseed = function ($, Y, J, Q) {
            ("string" != typeof Y && ((Q = J), (J = Y), (Y = null)),
              ($ = ee.toArray($, Y)),
              (J = ee.toArray(J, Q)),
              et(
                $.length >= this.minEntropy / 8,
                "Not enough entropy. Minimum is: " + this.minEntropy + " bits",
              ),
              this._update($.concat(J || [])),
              (this._reseed = 1));
          }),
          (er.prototype.generate = function ($, Y, J, Q) {
            if (this._reseed > this.reseedInterval)
              throw Error("Reseed is required");
            ("string" != typeof Y && ((Q = J), (J = Y), (Y = null)),
              J && ((J = ee.toArray(J, Q || "hex")), this._update(J)));
            for (var et = []; et.length < $; )
              ((this.V = this._hmac().update(this.V).digest()),
                (et = et.concat(this.V)));
            var er = et.slice(0, $);
            return (this._update(J), this._reseed++, ee.encode(er, Y));
          }));
      },
      1638: function ($) {
        "function" == typeof Object.create
          ? ($.exports = function ($, Y) {
              Y &&
                (($.super_ = Y),
                ($.prototype = Object.create(Y.prototype, {
                  constructor: {
                    value: $,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0,
                  },
                })));
            })
          : ($.exports = function ($, Y) {
              if (Y) {
                $.super_ = Y;
                var J = function () {};
                ((J.prototype = Y.prototype),
                  ($.prototype = new J()),
                  ($.prototype.constructor = $));
              }
            });
      },
      3858: function ($, Y, J) {
        "use strict";
        var Q = J(1638),
          ee = J(2321),
          et = J(5725).Buffer,
          er = Array(16);
        function ei() {
          (ee.call(this, 64),
            (this._a = 0x67452301),
            (this._b = 0xefcdab89),
            (this._c = 0x98badcfe),
            (this._d = 0x10325476));
        }
        function en($, Y) {
          return ($ << Y) | ($ >>> (32 - Y));
        }
        function ea($, Y, J, Q, ee, et, er) {
          return (en(($ + ((Y & J) | (~Y & Q)) + ee + et) | 0, er) + Y) | 0;
        }
        function ef($, Y, J, Q, ee, et, er) {
          return (en(($ + ((Y & Q) | (J & ~Q)) + ee + et) | 0, er) + Y) | 0;
        }
        function eo($, Y, J, Q, ee, et, er) {
          return (en(($ + (Y ^ J ^ Q) + ee + et) | 0, er) + Y) | 0;
        }
        function es($, Y, J, Q, ee, et, er) {
          return (en(($ + (J ^ (Y | ~Q)) + ee + et) | 0, er) + Y) | 0;
        }
        (Q(ei, ee),
          (ei.prototype._update = function () {
            for (var $ = 0; $ < 16; ++$) er[$] = this._block.readInt32LE(4 * $);
            var Y = this._a,
              J = this._b,
              Q = this._c,
              ee = this._d;
            ((Y = ea(Y, J, Q, ee, er[0], 0xd76aa478, 7)),
              (ee = ea(ee, Y, J, Q, er[1], 0xe8c7b756, 12)),
              (Q = ea(Q, ee, Y, J, er[2], 0x242070db, 17)),
              (J = ea(J, Q, ee, Y, er[3], 0xc1bdceee, 22)),
              (Y = ea(Y, J, Q, ee, er[4], 0xf57c0faf, 7)),
              (ee = ea(ee, Y, J, Q, er[5], 0x4787c62a, 12)),
              (Q = ea(Q, ee, Y, J, er[6], 0xa8304613, 17)),
              (J = ea(J, Q, ee, Y, er[7], 0xfd469501, 22)),
              (Y = ea(Y, J, Q, ee, er[8], 0x698098d8, 7)),
              (ee = ea(ee, Y, J, Q, er[9], 0x8b44f7af, 12)),
              (Q = ea(Q, ee, Y, J, er[10], 0xffff5bb1, 17)),
              (J = ea(J, Q, ee, Y, er[11], 0x895cd7be, 22)),
              (Y = ea(Y, J, Q, ee, er[12], 0x6b901122, 7)),
              (ee = ea(ee, Y, J, Q, er[13], 0xfd987193, 12)),
              (Q = ea(Q, ee, Y, J, er[14], 0xa679438e, 17)),
              (J = ea(J, Q, ee, Y, er[15], 0x49b40821, 22)),
              (Y = ef(Y, J, Q, ee, er[1], 0xf61e2562, 5)),
              (ee = ef(ee, Y, J, Q, er[6], 0xc040b340, 9)),
              (Q = ef(Q, ee, Y, J, er[11], 0x265e5a51, 14)),
              (J = ef(J, Q, ee, Y, er[0], 0xe9b6c7aa, 20)),
              (Y = ef(Y, J, Q, ee, er[5], 0xd62f105d, 5)),
              (ee = ef(ee, Y, J, Q, er[10], 0x2441453, 9)),
              (Q = ef(Q, ee, Y, J, er[15], 0xd8a1e681, 14)),
              (J = ef(J, Q, ee, Y, er[4], 0xe7d3fbc8, 20)),
              (Y = ef(Y, J, Q, ee, er[9], 0x21e1cde6, 5)),
              (ee = ef(ee, Y, J, Q, er[14], 0xc33707d6, 9)),
              (Q = ef(Q, ee, Y, J, er[3], 0xf4d50d87, 14)),
              (J = ef(J, Q, ee, Y, er[8], 0x455a14ed, 20)),
              (Y = ef(Y, J, Q, ee, er[13], 0xa9e3e905, 5)),
              (ee = ef(ee, Y, J, Q, er[2], 0xfcefa3f8, 9)),
              (Q = ef(Q, ee, Y, J, er[7], 0x676f02d9, 14)),
              (J = ef(J, Q, ee, Y, er[12], 0x8d2a4c8a, 20)),
              (Y = eo(Y, J, Q, ee, er[5], 0xfffa3942, 4)),
              (ee = eo(ee, Y, J, Q, er[8], 0x8771f681, 11)),
              (Q = eo(Q, ee, Y, J, er[11], 0x6d9d6122, 16)),
              (J = eo(J, Q, ee, Y, er[14], 0xfde5380c, 23)),
              (Y = eo(Y, J, Q, ee, er[1], 0xa4beea44, 4)),
              (ee = eo(ee, Y, J, Q, er[4], 0x4bdecfa9, 11)),
              (Q = eo(Q, ee, Y, J, er[7], 0xf6bb4b60, 16)),
              (J = eo(J, Q, ee, Y, er[10], 0xbebfbc70, 23)),
              (Y = eo(Y, J, Q, ee, er[13], 0x289b7ec6, 4)),
              (ee = eo(ee, Y, J, Q, er[0], 0xeaa127fa, 11)),
              (Q = eo(Q, ee, Y, J, er[3], 0xd4ef3085, 16)),
              (J = eo(J, Q, ee, Y, er[6], 0x4881d05, 23)),
              (Y = eo(Y, J, Q, ee, er[9], 0xd9d4d039, 4)),
              (ee = eo(ee, Y, J, Q, er[12], 0xe6db99e5, 11)),
              (Q = eo(Q, ee, Y, J, er[15], 0x1fa27cf8, 16)),
              (J = eo(J, Q, ee, Y, er[2], 0xc4ac5665, 23)),
              (Y = es(Y, J, Q, ee, er[0], 0xf4292244, 6)),
              (ee = es(ee, Y, J, Q, er[7], 0x432aff97, 10)),
              (Q = es(Q, ee, Y, J, er[14], 0xab9423a7, 15)),
              (J = es(J, Q, ee, Y, er[5], 0xfc93a039, 21)),
              (Y = es(Y, J, Q, ee, er[12], 0x655b59c3, 6)),
              (ee = es(ee, Y, J, Q, er[3], 0x8f0ccc92, 10)),
              (Q = es(Q, ee, Y, J, er[10], 0xffeff47d, 15)),
              (J = es(J, Q, ee, Y, er[1], 0x85845dd1, 21)),
              (Y = es(Y, J, Q, ee, er[8], 0x6fa87e4f, 6)),
              (ee = es(ee, Y, J, Q, er[15], 0xfe2ce6e0, 10)),
              (Q = es(Q, ee, Y, J, er[6], 0xa3014314, 15)),
              (J = es(J, Q, ee, Y, er[13], 0x4e0811a1, 21)),
              (Y = es(Y, J, Q, ee, er[4], 0xf7537e82, 6)),
              (ee = es(ee, Y, J, Q, er[11], 0xbd3af235, 10)),
              (Q = es(Q, ee, Y, J, er[2], 0x2ad7d2bb, 15)),
              (J = es(J, Q, ee, Y, er[9], 0xeb86d391, 21)),
              (this._a = (this._a + Y) | 0),
              (this._b = (this._b + J) | 0),
              (this._c = (this._c + Q) | 0),
              (this._d = (this._d + ee) | 0));
          }),
          (ei.prototype._digest = function () {
            ((this._block[this._blockOffset++] = 128),
              this._blockOffset > 56 &&
                (this._block.fill(0, this._blockOffset, 64),
                this._update(),
                (this._blockOffset = 0)),
              this._block.fill(0, this._blockOffset, 56),
              this._block.writeUInt32LE(this._length[0], 56),
              this._block.writeUInt32LE(this._length[1], 60),
              this._update());
            var $ = et.allocUnsafe(16);
            return (
              $.writeInt32LE(this._a, 0),
              $.writeInt32LE(this._b, 4),
              $.writeInt32LE(this._c, 8),
              $.writeInt32LE(this._d, 12),
              $
            );
          }),
          ($.exports = ei));
      },
      6821: function ($, Y, J) {
        var Q = J(5944),
          ee = J(4259);
        function et($) {
          this.rand = $ || new ee.Rand();
        }
        (($.exports = et),
          (et.create = function ($) {
            return new et($);
          }),
          (et.prototype._randbelow = function ($) {
            var Y = Math.ceil($.bitLength() / 8);
            do var J = new Q(this.rand.generate(Y));
            while (J.cmp($) >= 0);
            return J;
          }),
          (et.prototype._randrange = function ($, Y) {
            var J = Y.sub($);
            return $.add(this._randbelow(J));
          }),
          (et.prototype.test = function ($, Y, J) {
            var ee = $.bitLength(),
              et = Q.mont($),
              er = new Q(1).toRed(et);
            Y || (Y = Math.max(1, (ee / 48) | 0));
            for (var ei = $.subn(1), en = 0; !ei.testn(en); en++);
            for (var ea = $.shrn(en), ef = ei.toRed(et); Y > 0; Y--) {
              var eo = this._randrange(new Q(2), ei);
              J && J(eo);
              var es = eo.toRed(et).redPow(ea);
              if (0 !== es.cmp(er) && 0 !== es.cmp(ef)) {
                for (var eh = 1; eh < en; eh++) {
                  if (0 === (es = es.redSqr()).cmp(er)) return !1;
                  if (0 === es.cmp(ef)) break;
                }
                if (eh === en) return !1;
              }
            }
            return !0;
          }),
          (et.prototype.getDivisor = function ($, Y) {
            var J = $.bitLength(),
              ee = Q.mont($),
              et = new Q(1).toRed(ee);
            Y || (Y = Math.max(1, (J / 48) | 0));
            for (var er = $.subn(1), ei = 0; !er.testn(ei); ei++);
            for (var en = $.shrn(ei), ea = er.toRed(ee); Y > 0; Y--) {
              var ef = this._randrange(new Q(2), er),
                eo = $.gcd(ef);
              if (0 !== eo.cmpn(1)) return eo;
              var es = ef.toRed(ee).redPow(en);
              if (0 !== es.cmp(et) && 0 !== es.cmp(ea)) {
                for (var eh = 1; eh < ei; eh++) {
                  if (0 === (es = es.redSqr()).cmp(et))
                    return es.fromRed().subn(1).gcd($);
                  if (0 === es.cmp(ea)) break;
                }
                if (eh === ei)
                  return (es = es.redSqr()).fromRed().subn(1).gcd($);
              }
            }
            return !1;
          }));
      },
      7551: function ($) {
        function Y($, Y) {
          if (!$) throw Error(Y || "Assertion failed");
        }
        (($.exports = Y),
          (Y.equal = function ($, Y, J) {
            if ($ != Y) throw Error(J || "Assertion failed: " + $ + " != " + Y);
          }));
      },
      7356: function ($, Y) {
        "use strict";
        function J($) {
          return 1 === $.length ? "0" + $ : $;
        }
        function Q($) {
          for (var Y = "", Q = 0; Q < $.length; Q++) Y += J($[Q].toString(16));
          return Y;
        }
        ((Y.toArray = function ($, Y) {
          if (Array.isArray($)) return $.slice();
          if (!$) return [];
          var J = [];
          if ("string" != typeof $) {
            for (var Q = 0; Q < $.length; Q++) J[Q] = 0 | $[Q];
            return J;
          }
          if ("hex" === Y) {
            ($ = $.replace(/[^a-z0-9]+/gi, "")).length % 2 != 0 &&
              ($ = "0" + $);
            for (var Q = 0; Q < $.length; Q += 2)
              J.push(parseInt($[Q] + $[Q + 1], 16));
          } else
            for (var Q = 0; Q < $.length; Q++) {
              var ee = $.charCodeAt(Q),
                et = ee >> 8,
                er = 255 & ee;
              et ? J.push(et, er) : J.push(er);
            }
          return J;
        }),
          (Y.zero2 = J),
          (Y.toHex = Q),
          (Y.encode = function ($, Y) {
            return "hex" === Y ? Q($) : $;
          }));
      },
      1907: function ($, Y, J) {
        "use strict";
        var Q = J(9186);
        ((Y.certificate = J(5627)),
          (Y.RSAPrivateKey = Q.define("RSAPrivateKey", function () {
            this.seq().obj(
              this.key("version").int(),
              this.key("modulus").int(),
              this.key("publicExponent").int(),
              this.key("privateExponent").int(),
              this.key("prime1").int(),
              this.key("prime2").int(),
              this.key("exponent1").int(),
              this.key("exponent2").int(),
              this.key("coefficient").int(),
            );
          })),
          (Y.RSAPublicKey = Q.define("RSAPublicKey", function () {
            this.seq().obj(
              this.key("modulus").int(),
              this.key("publicExponent").int(),
            );
          })),
          (Y.PublicKey = Q.define("SubjectPublicKeyInfo", function () {
            this.seq().obj(
              this.key("algorithm").use(ee),
              this.key("subjectPublicKey").bitstr(),
            );
          })));
        var ee = Q.define("AlgorithmIdentifier", function () {
          this.seq().obj(
            this.key("algorithm").objid(),
            this.key("none").null_().optional(),
            this.key("curve").objid().optional(),
            this.key("params")
              .seq()
              .obj(
                this.key("p").int(),
                this.key("q").int(),
                this.key("g").int(),
              )
              .optional(),
          );
        });
        ((Y.PrivateKey = Q.define("PrivateKeyInfo", function () {
          this.seq().obj(
            this.key("version").int(),
            this.key("algorithm").use(ee),
            this.key("subjectPrivateKey").octstr(),
          );
        })),
          (Y.EncryptedPrivateKey = Q.define(
            "EncryptedPrivateKeyInfo",
            function () {
              this.seq().obj(
                this.key("algorithm")
                  .seq()
                  .obj(
                    this.key("id").objid(),
                    this.key("decrypt")
                      .seq()
                      .obj(
                        this.key("kde")
                          .seq()
                          .obj(
                            this.key("id").objid(),
                            this.key("kdeparams")
                              .seq()
                              .obj(
                                this.key("salt").octstr(),
                                this.key("iters").int(),
                              ),
                          ),
                        this.key("cipher")
                          .seq()
                          .obj(
                            this.key("algo").objid(),
                            this.key("iv").octstr(),
                          ),
                      ),
                  ),
                this.key("subjectPrivateKey").octstr(),
              );
            },
          )),
          (Y.DSAPrivateKey = Q.define("DSAPrivateKey", function () {
            this.seq().obj(
              this.key("version").int(),
              this.key("p").int(),
              this.key("q").int(),
              this.key("g").int(),
              this.key("pub_key").int(),
              this.key("priv_key").int(),
            );
          })),
          (Y.DSAparam = Q.define("DSAparam", function () {
            this.int();
          })),
          (Y.ECPrivateKey = Q.define("ECPrivateKey", function () {
            this.seq().obj(
              this.key("version").int(),
              this.key("privateKey").octstr(),
              this.key("parameters").optional().explicit(0).use(et),
              this.key("publicKey").optional().explicit(1).bitstr(),
            );
          })));
        var et = Q.define("ECParameters", function () {
          this.choice({ namedCurve: this.objid() });
        });
        Y.signature = Q.define("signature", function () {
          this.seq().obj(this.key("r").int(), this.key("s").int());
        });
      },
      5627: function ($, Y, J) {
        "use strict";
        var Q = J(9186),
          ee = Q.define("Time", function () {
            this.choice({
              utcTime: this.utctime(),
              generalTime: this.gentime(),
            });
          }),
          et = Q.define("AttributeTypeValue", function () {
            this.seq().obj(this.key("type").objid(), this.key("value").any());
          }),
          er = Q.define("AlgorithmIdentifier", function () {
            this.seq().obj(
              this.key("algorithm").objid(),
              this.key("parameters").optional(),
              this.key("curve").objid().optional(),
            );
          }),
          ei = Q.define("SubjectPublicKeyInfo", function () {
            this.seq().obj(
              this.key("algorithm").use(er),
              this.key("subjectPublicKey").bitstr(),
            );
          }),
          en = Q.define("RelativeDistinguishedName", function () {
            this.setof(et);
          }),
          ea = Q.define("RDNSequence", function () {
            this.seqof(en);
          }),
          ef = Q.define("Name", function () {
            this.choice({ rdnSequence: this.use(ea) });
          }),
          eo = Q.define("Validity", function () {
            this.seq().obj(
              this.key("notBefore").use(ee),
              this.key("notAfter").use(ee),
            );
          }),
          es = Q.define("Extension", function () {
            this.seq().obj(
              this.key("extnID").objid(),
              this.key("critical").bool().def(!1),
              this.key("extnValue").octstr(),
            );
          }),
          eh = Q.define("TBSCertificate", function () {
            this.seq().obj(
              this.key("version").explicit(0).int().optional(),
              this.key("serialNumber").int(),
              this.key("signature").use(er),
              this.key("issuer").use(ef),
              this.key("validity").use(eo),
              this.key("subject").use(ef),
              this.key("subjectPublicKeyInfo").use(ei),
              this.key("issuerUniqueID").implicit(1).bitstr().optional(),
              this.key("subjectUniqueID").implicit(2).bitstr().optional(),
              this.key("extensions").explicit(3).seqof(es).optional(),
            );
          });
        $.exports = Q.define("X509Certificate", function () {
          this.seq().obj(
            this.key("tbsCertificate").use(eh),
            this.key("signatureAlgorithm").use(er),
            this.key("signatureValue").bitstr(),
          );
        });
      },
      4059: function ($, Y, J) {
        var Q =
            /Proc-Type: 4,ENCRYPTED[\n\r]+DEK-Info: AES-((?:128)|(?:192)|(?:256))-CBC,([0-9A-H]+)[\n\r]+([0-9A-z\n\r\+\/\=]+)[\n\r]+/m,
          ee = /^-----BEGIN ((?:.*? KEY)|CERTIFICATE)-----/m,
          et =
            /^-----BEGIN ((?:.*? KEY)|CERTIFICATE)-----([0-9A-z\n\r\+\/\=]+)-----END \1-----$/m,
          er = J(689),
          ei = J(8642),
          en = J(5725).Buffer;
        $.exports = function ($, Y) {
          var J,
            ea = $.toString(),
            ef = ea.match(Q);
          if (ef) {
            var eo = "aes" + ef[1],
              es = en.from(ef[2], "hex"),
              eh = en.from(ef[3].replace(/[\r\n]/g, ""), "base64"),
              ed = er(Y, es.slice(0, 8), parseInt(ef[1], 10)).key,
              ec = [],
              eu = ei.createDecipheriv(eo, ed, es);
            (ec.push(eu.update(eh)), ec.push(eu.final()), (J = en.concat(ec)));
          } else J = new en(ea.match(et)[2].replace(/[\r\n]/g, ""), "base64");
          return { tag: ea.match(ee)[1], data: J };
        };
      },
      8012: function ($, Y, J) {
        var Q = J(1907),
          ee = J(7016),
          et = J(4059),
          er = J(8642),
          ei = J(4542),
          en = J(5725).Buffer;
        function ea($) {
          ("object" != typeof $ ||
            en.isBuffer($) ||
            ((ep = $.passphrase), ($ = $.key)),
            "string" == typeof $ && ($ = en.from($)));
          var Y,
            J,
            ea,
            ef,
            eo,
            es,
            eh,
            ed,
            ec,
            eu,
            el,
            ep,
            eb,
            em,
            eg = et($, ep),
            ey = eg.tag,
            ev = eg.data;
          switch (ey) {
            case "CERTIFICATE":
              em = Q.certificate.decode(ev, "der").tbsCertificate
                .subjectPublicKeyInfo;
            case "PUBLIC KEY":
              switch (
                (!em && (em = Q.PublicKey.decode(ev, "der")),
                (eb = em.algorithm.algorithm.join(".")))
              ) {
                case "1.2.840.113549.1.1.1":
                  return Q.RSAPublicKey.decode(em.subjectPublicKey.data, "der");
                case "1.2.840.10045.2.1":
                  return (
                    (em.subjectPrivateKey = em.subjectPublicKey),
                    { type: "ec", data: em }
                  );
                case "1.2.840.10040.4.1":
                  return (
                    (em.algorithm.params.pub_key = Q.DSAparam.decode(
                      em.subjectPublicKey.data,
                      "der",
                    )),
                    { type: "dsa", data: em.algorithm.params }
                  );
                default:
                  throw Error("unknown key id " + eb);
              }
            case "ENCRYPTED PRIVATE KEY":
              ((Y = ev = Q.EncryptedPrivateKey.decode(ev, "der")),
                (J = ep),
                (ea = Y.algorithm.decrypt.kde.kdeparams.salt),
                (ef = parseInt(
                  Y.algorithm.decrypt.kde.kdeparams.iters.toString(),
                  10,
                )),
                (eo = ee[Y.algorithm.decrypt.cipher.algo.join(".")]),
                (es = Y.algorithm.decrypt.cipher.iv),
                (eh = Y.subjectPrivateKey),
                (ed = parseInt(eo.split("-")[1], 10) / 8),
                (ec = ei.pbkdf2Sync(J, ea, ef, ed, "sha1")),
                (eu = er.createDecipheriv(eo, ec, es)),
                (el = []).push(eu.update(eh)),
                el.push(eu.final()),
                (ev = en.concat(el)));
            case "PRIVATE KEY":
              switch (
                (eb = (em = Q.PrivateKey.decode(
                  ev,
                  "der",
                )).algorithm.algorithm.join("."))
              ) {
                case "1.2.840.113549.1.1.1":
                  return Q.RSAPrivateKey.decode(em.subjectPrivateKey, "der");
                case "1.2.840.10045.2.1":
                  return {
                    curve: em.algorithm.curve,
                    privateKey: Q.ECPrivateKey.decode(
                      em.subjectPrivateKey,
                      "der",
                    ).privateKey,
                  };
                case "1.2.840.10040.4.1":
                  return (
                    (em.algorithm.params.priv_key = Q.DSAparam.decode(
                      em.subjectPrivateKey,
                      "der",
                    )),
                    { type: "dsa", params: em.algorithm.params }
                  );
                default:
                  throw Error("unknown key id " + eb);
              }
            case "RSA PUBLIC KEY":
              return Q.RSAPublicKey.decode(ev, "der");
            case "RSA PRIVATE KEY":
              return Q.RSAPrivateKey.decode(ev, "der");
            case "DSA PRIVATE KEY":
              return { type: "dsa", params: Q.DSAPrivateKey.decode(ev, "der") };
            case "EC PRIVATE KEY":
              return {
                curve: (ev = Q.ECPrivateKey.decode(ev, "der")).parameters.value,
                privateKey: ev.privateKey,
              };
            default:
              throw Error("unknown key type " + ey);
          }
        }
        (($.exports = ea), (ea.signature = Q.signature));
      },
      4542: function ($, Y, J) {
        var Q = J(6982),
          ee = J(4410),
          et = J(741),
          er = J(508);
        Q.pbkdf2Sync && -1 !== Q.pbkdf2Sync.toString().indexOf("keylen, digest")
          ? ((Y.pbkdf2Sync = function ($, Y, J, ei, en) {
              return (
                ee(J, ei),
                ($ = er($, et, "Password")),
                (Y = er(Y, et, "Salt")),
                (en = en || "sha1"),
                Q.pbkdf2Sync($, Y, J, ei, en)
              );
            }),
            (Y.pbkdf2 = function ($, Y, J, ei, en, ea) {
              if (
                (ee(J, ei),
                ($ = er($, et, "Password")),
                (Y = er(Y, et, "Salt")),
                "function" == typeof en && ((ea = en), (en = "sha1")),
                "function" != typeof ea)
              )
                throw Error("No callback provided to pbkdf2");
              return Q.pbkdf2($, Y, J, ei, en, ea);
            }))
          : ((Y.pbkdf2Sync = J(8291)), (Y.pbkdf2 = J(9958)));
      },
      9958: function (Y, J, Q) {
        var et,
          er = Q(5725).Buffer,
          ei = Q(4410),
          en = Q(741),
          ea = Q(8291),
          ef = Q(508),
          eo = $.g.crypto && $.g.crypto.subtle,
          es = {
            sha: "SHA-1",
            "sha-1": "SHA-1",
            sha1: "SHA-1",
            sha256: "SHA-256",
            "sha-256": "SHA-256",
            sha384: "SHA-384",
            "sha-384": "SHA-384",
            "sha-512": "SHA-512",
            sha512: "SHA-512",
          },
          eh = [];
        function ed($, Y, J, Q, ee) {
          return eo
            .importKey("raw", $, { name: "PBKDF2" }, !1, ["deriveBits"])
            .then(function ($) {
              return eo.deriveBits(
                { name: "PBKDF2", salt: Y, iterations: J, hash: { name: ee } },
                $,
                Q << 3,
              );
            })
            .then(function ($) {
              return er.from($);
            });
        }
        Y.exports = function (Y, J, Q, ec, eu, el) {
          "function" == typeof eu && ((el = eu), (eu = void 0));
          var ep,
            eb,
            em = es[(eu = eu || "sha1").toLowerCase()];
          if (!em || "function" != typeof $.g.Promise)
            return ee.default.nextTick(function () {
              var $;
              try {
                $ = ea(Y, J, Q, ec, eu);
              } catch ($) {
                return el($);
              }
              el(null, $);
            });
          if (
            (ei(Q, ec),
            (Y = ef(Y, en, "Password")),
            (J = ef(J, en, "Salt")),
            "function" != typeof el)
          )
            throw Error("No callback provided to pbkdf2");
          ((ep = (function (Y) {
            if (
              ($.g.process && !$.g.process.browser) ||
              !eo ||
              !eo.importKey ||
              !eo.deriveBits
            )
              return Promise.resolve(!1);
            if (void 0 !== eh[Y]) return eh[Y];
            var J = ed((et = et || er.alloc(8)), et, 10, 128, Y)
              .then(function () {
                return !0;
              })
              .catch(function () {
                return !1;
              });
            return ((eh[Y] = J), J);
          })(em).then(function ($) {
            return $ ? ed(Y, J, Q, ec, em) : ea(Y, J, Q, ec, eu);
          })),
            (eb = el),
            ep.then(
              function ($) {
                ee.default.nextTick(function () {
                  eb(null, $);
                });
              },
              function ($) {
                ee.default.nextTick(function () {
                  eb($);
                });
              },
            ));
        };
      },
      741: function ($) {
        $.exports = "utf-8";
      },
      4410: function ($) {
        $.exports = function ($, Y) {
          if ("number" != typeof $) throw TypeError("Iterations not a number");
          if ($ < 0) throw TypeError("Bad iterations");
          if ("number" != typeof Y) throw TypeError("Key length not a number");
          if (Y < 0 || Y > 0x3fffffff || Y != Y)
            throw TypeError("Bad key length");
        };
      },
      8291: function ($, Y, J) {
        var Q = {
            md5: 16,
            sha1: 20,
            sha224: 28,
            sha256: 32,
            sha384: 48,
            sha512: 64,
            rmd160: 20,
            ripemd160: 20,
          },
          ee = J(3256),
          et = J(5725).Buffer,
          er = J(4410),
          ei = J(741),
          en = J(508);
        $.exports = function ($, Y, J, ea, ef) {
          (er(J, ea),
            ($ = en($, ei, "Password")),
            (Y = en(Y, ei, "Salt")),
            (ef = ef || "sha1"));
          var eo = et.allocUnsafe(ea),
            es = et.allocUnsafe(Y.length + 4);
          Y.copy(es, 0, 0, Y.length);
          for (
            var eh = 0, ed = Q[ef], ec = Math.ceil(ea / ed), eu = 1;
            eu <= ec;
            eu++
          ) {
            es.writeUInt32BE(eu, Y.length);
            for (
              var el = ee(ef, $).update(es).digest(), ep = el, eb = 1;
              eb < J;
              eb++
            ) {
              ep = ee(ef, $).update(ep).digest();
              for (var em = 0; em < ed; em++) el[em] ^= ep[em];
            }
            (el.copy(eo, eh), (eh += ed));
          }
          return eo;
        };
      },
      508: function ($, Y, J) {
        var Q = J(5725).Buffer;
        $.exports = function ($, Y, J) {
          if (Q.isBuffer($)) return $;
          if ("string" == typeof $) return Q.from($, Y);
          if (ArrayBuffer.isView($)) return Q.from($.buffer);
          throw TypeError(
            J + " must be a string, a Buffer, a typed array or a DataView",
          );
        };
      },
      6734: function ($, Y, J) {
        ((Y.publicEncrypt = J(6480)),
          (Y.privateDecrypt = J(8284)),
          (Y.privateEncrypt = function ($, J) {
            return Y.publicEncrypt($, J, !0);
          }),
          (Y.publicDecrypt = function ($, J) {
            return Y.privateDecrypt($, J, !0);
          }));
      },
      6228: function ($, Y, J) {
        var Q = J(762),
          ee = J(5725).Buffer;
        $.exports = function ($, Y) {
          for (var J, et = ee.alloc(0), er = 0; et.length < Y; )
            ((J = (function ($) {
              var Y = ee.allocUnsafe(4);
              return (Y.writeUInt32BE($, 0), Y);
            })(er++)),
              (et = ee.concat([et, Q("sha1").update($).update(J).digest()])));
          return et.slice(0, Y);
        };
      },
      8284: function ($, Y, J) {
        var Q = J(8012),
          ee = J(6228),
          et = J(8723),
          er = J(5944),
          ei = J(640),
          en = J(762),
          ea = J(5037),
          ef = J(5725).Buffer;
        $.exports = function ($, Y, J) {
          var eo,
            es = $.padding ? $.padding : J ? 1 : 4,
            eh = Q($),
            ed = eh.modulus.byteLength();
          if (Y.length > ed || new er(Y).cmp(eh.modulus) >= 0)
            throw Error("decryption error");
          eo = J ? ea(new er(Y), eh) : ei(Y, eh);
          var ec = ef.alloc(ed - eo.length);
          if (((eo = ef.concat([ec, eo], ed)), 4 === es))
            return (function ($, Y) {
              var J = $.modulus.byteLength(),
                Q = en("sha1").update(ef.alloc(0)).digest(),
                er = Q.length;
              if (0 !== Y[0]) throw Error("decryption error");
              var ei = Y.slice(1, er + 1),
                ea = Y.slice(er + 1),
                eo = et(ei, ee(ea, er)),
                es = et(ea, ee(eo, J - er - 1));
              if (
                (function ($, Y) {
                  (($ = ef.from($)), (Y = ef.from(Y)));
                  var J = 0,
                    Q = $.length;
                  $.length !== Y.length &&
                    (J++, (Q = Math.min($.length, Y.length)));
                  for (var ee = -1; ++ee < Q; ) J += $[ee] ^ Y[ee];
                  return J;
                })(Q, es.slice(0, er))
              )
                throw Error("decryption error");
              for (var eh = er; 0 === es[eh]; ) eh++;
              if (1 !== es[eh++]) throw Error("decryption error");
              return es.slice(eh);
            })(eh, eo);
          if (1 === es) {
            for (
              var eu = eo, el = J, ep = eu.slice(0, 2), eb = 2, em = 0;
              0 !== eu[eb++];

            )
              if (eb >= eu.length) {
                em++;
                break;
              }
            var eg = eu.slice(2, eb - 1);
            if (
              ((("0002" !== ep.toString("hex") && !el) ||
                ("0001" !== ep.toString("hex") && el)) &&
                em++,
              eg.length < 8 && em++,
              em)
            )
              throw Error("decryption error");
            return eu.slice(eb);
          }
          if (3 === es) return eo;
          throw Error("unknown padding");
        };
      },
      6480: function ($, Y, J) {
        var Q = J(8012),
          ee = J(376),
          et = J(762),
          er = J(6228),
          ei = J(8723),
          en = J(5944),
          ea = J(5037),
          ef = J(640),
          eo = J(5725).Buffer;
        $.exports = function ($, Y, J) {
          var es,
            eh = $.padding ? $.padding : J ? 1 : 4,
            ed = Q($);
          if (4 === eh)
            es = (function ($, Y) {
              var J = $.modulus.byteLength(),
                Q = Y.length,
                ea = et("sha1").update(eo.alloc(0)).digest(),
                ef = ea.length,
                es = 2 * ef;
              if (Q > J - es - 2) throw Error("message too long");
              var eh = eo.alloc(J - Q - es - 2),
                ed = J - ef - 1,
                ec = ee(ef),
                eu = ei(eo.concat([ea, eh, eo.alloc(1, 1), Y], ed), er(ec, ed)),
                el = ei(ec, er(eu, ef));
              return new en(eo.concat([eo.alloc(1), el, eu], J));
            })(ed, Y);
          else if (1 === eh)
            es = (function ($, Y, J) {
              var Q,
                et = Y.length,
                er = $.modulus.byteLength();
              if (et > er - 11) throw Error("message too long");
              return (
                (Q = J
                  ? eo.alloc(er - et - 3, 255)
                  : (function ($) {
                      for (
                        var Y,
                          J = eo.allocUnsafe($),
                          Q = 0,
                          et = ee(2 * $),
                          er = 0;
                        Q < $;

                      )
                        (er === et.length && ((et = ee(2 * $)), (er = 0)),
                          (Y = et[er++]) && (J[Q++] = Y));
                      return J;
                    })(er - et - 3)),
                new en(
                  eo.concat([eo.from([0, J ? 1 : 2]), Q, eo.alloc(1), Y], er),
                )
              );
            })(ed, Y, J);
          else if (3 === eh) {
            if ((es = new en(Y)).cmp(ed.modulus) >= 0)
              throw Error("data too long for modulus");
          } else throw Error("unknown padding");
          return J ? ef(es, ed) : ea(es, ed);
        };
      },
      5037: function ($, Y, J) {
        var Q = J(5944),
          ee = J(5725).Buffer;
        $.exports = function ($, Y) {
          return ee.from(
            $.toRed(Q.mont(Y.modulus))
              .redPow(new Q(Y.publicExponent))
              .fromRed()
              .toArray(),
          );
        };
      },
      8723: function ($) {
        $.exports = function ($, Y) {
          for (var J = $.length, Q = -1; ++Q < J; ) $[Q] ^= Y[Q];
          return $;
        };
      },
      376: function (Y, J, Q) {
        "use strict";
        var et = Q(5725).Buffer,
          er = $.g.crypto || $.g.msCrypto;
        er && er.getRandomValues
          ? (Y.exports = function ($, Y) {
              if ($ > 0xffffffff)
                throw RangeError("requested too many random bytes");
              var J = et.allocUnsafe($);
              if ($ > 0)
                if ($ > 65536)
                  for (var Q = 0; Q < $; Q += 65536)
                    er.getRandomValues(J.slice(Q, Q + 65536));
                else er.getRandomValues(J);
              return "function" == typeof Y
                ? ee.default.nextTick(function () {
                    Y(null, J);
                  })
                : J;
            })
          : (Y.exports = function () {
              throw Error(
                "Secure random number generation is not supported by this browser.\nUse Chrome, Firefox or Internet Explorer 11",
              );
            });
      },
      236: function (Y, J, Q) {
        "use strict";
        function et() {
          throw Error(
            "secure random number generation not supported by this browser\nuse chrome, FireFox or Internet Explorer 11",
          );
        }
        var er = Q(5725);
        Q(376);
        var ei = er.Buffer,
          en = er.kMaxLength,
          ea = $.g.crypto || $.g.msCrypto;
        function ef($, Y) {
          if ("number" != typeof $ || $ != $)
            throw TypeError("offset must be a number");
          if ($ > 0xffffffff || $ < 0)
            throw TypeError("offset must be a uint32");
          if ($ > en || $ > Y) throw RangeError("offset out of range");
        }
        function eo($, Y, J) {
          if ("number" != typeof $ || $ != $)
            throw TypeError("size must be a number");
          if ($ > 0xffffffff || $ < 0) throw TypeError("size must be a uint32");
          if ($ + Y > J || $ > en) throw RangeError("buffer too small");
        }
        function es($, Y, J, Q) {
          var et = new Uint8Array($.buffer, Y, J);
          return (ea.getRandomValues(et), Q)
            ? void ee.default.nextTick(function () {
                Q(null, $);
              })
            : $;
        }
        ea && ea.getRandomValues
          ? ((J.randomFill = function (Y, J, Q, ee) {
              if (!ei.isBuffer(Y) && !(Y instanceof $.g.Uint8Array))
                throw TypeError(
                  '"buf" argument must be a Buffer or Uint8Array',
                );
              if ("function" == typeof J) ((ee = J), (J = 0), (Q = Y.length));
              else if ("function" == typeof Q) ((ee = Q), (Q = Y.length - J));
              else if ("function" != typeof ee)
                throw TypeError('"cb" argument must be a function');
              return (ef(J, Y.length), eo(Q, J, Y.length), es(Y, J, Q, ee));
            }),
            (J.randomFillSync = function (Y, J, Q) {
              if (
                (void 0 === J && (J = 0),
                !ei.isBuffer(Y) && !(Y instanceof $.g.Uint8Array))
              )
                throw TypeError(
                  '"buf" argument must be a Buffer or Uint8Array',
                );
              return (
                ef(J, Y.length),
                void 0 === Q && (Q = Y.length - J),
                eo(Q, J, Y.length),
                es(Y, J, Q)
              );
            }))
          : ((J.randomFill = et), (J.randomFillSync = et));
      },
      4329: function ($) {
        "use strict";
        let Y = {};
        function J($, J, Q) {
          Q || (Q = Error);
          class ee extends Q {
            constructor($, Y, Q) {
              super("string" == typeof J ? J : J($, Y, Q));
            }
          }
          ((ee.prototype.name = Q.name), (ee.prototype.code = $), (Y[$] = ee));
        }
        function Q($, Y) {
          if (!Array.isArray($)) return `of ${Y} ${String($)}`;
          {
            let J = $.length;
            return (($ = $.map(($) => String($))), J > 2)
              ? `one of ${Y} ${$.slice(0, J - 1).join(", ")}, or ` + $[J - 1]
              : 2 === J
                ? `one of ${Y} ${$[0]} or ${$[1]}`
                : `of ${Y} ${$[0]}`;
          }
        }
        (J(
          "ERR_INVALID_OPT_VALUE",
          function ($, Y) {
            return 'The value "' + Y + '" is invalid for option "' + $ + '"';
          },
          TypeError,
        ),
          J(
            "ERR_INVALID_ARG_TYPE",
            function ($, Y, J) {
              var ee, et, er, ei;
              let en, ea;
              if (
                ("string" == typeof Y &&
                ((ee = "not "), Y.substr(0, ee.length) === ee)
                  ? ((en = "must not be"), (Y = Y.replace(/^not /, "")))
                  : (en = "must be"),
                (et = " argument"),
                (void 0 === er || er > $.length) && (er = $.length),
                $.substring(er - et.length, er) === et)
              )
                ea = `The ${$} ${en} ${Q(Y, "type")}`;
              else {
                let J = ("number" != typeof ei && (ei = 0),
                ei + 1 > $.length || -1 === $.indexOf(".", ei))
                  ? "argument"
                  : "property";
                ea = `The "${$}" ${J} ${en} ${Q(Y, "type")}`;
              }
              return ea + `. Received type ${typeof J}`;
            },
            TypeError,
          ),
          J("ERR_STREAM_PUSH_AFTER_EOF", "stream.push() after EOF"),
          J("ERR_METHOD_NOT_IMPLEMENTED", function ($) {
            return "The " + $ + " method is not implemented";
          }),
          J("ERR_STREAM_PREMATURE_CLOSE", "Premature close"),
          J("ERR_STREAM_DESTROYED", function ($) {
            return "Cannot call " + $ + " after a stream was destroyed";
          }),
          J("ERR_MULTIPLE_CALLBACK", "Callback called multiple times"),
          J("ERR_STREAM_CANNOT_PIPE", "Cannot pipe, not readable"),
          J("ERR_STREAM_WRITE_AFTER_END", "write after end"),
          J(
            "ERR_STREAM_NULL_VALUES",
            "May not write null values to stream",
            TypeError,
          ),
          J(
            "ERR_UNKNOWN_ENCODING",
            function ($) {
              return "Unknown encoding: " + $;
            },
            TypeError,
          ),
          J(
            "ERR_STREAM_UNSHIFT_AFTER_END_EVENT",
            "stream.unshift() after end event",
          ),
          ($.exports.F = Y));
      },
      8686: function ($, Y, J) {
        "use strict";
        var Q =
          Object.keys ||
          function ($) {
            var Y = [];
            for (var J in $) Y.push(J);
            return Y;
          };
        $.exports = ef;
        var et = J(7276),
          er = J(4732);
        J(1638)(ef, et);
        for (var ei = Q(er.prototype), en = 0; en < ei.length; en++) {
          var ea = ei[en];
          ef.prototype[ea] || (ef.prototype[ea] = er.prototype[ea]);
        }
        function ef($) {
          if (!(this instanceof ef)) return new ef($);
          (et.call(this, $),
            er.call(this, $),
            (this.allowHalfOpen = !0),
            $ &&
              (!1 === $.readable && (this.readable = !1),
              !1 === $.writable && (this.writable = !1),
              !1 === $.allowHalfOpen &&
                ((this.allowHalfOpen = !1), this.once("end", eo))));
        }
        function eo() {
          this._writableState.ended || ee.default.nextTick(es, this);
        }
        function es($) {
          $.end();
        }
        (Object.defineProperty(ef.prototype, "writableHighWaterMark", {
          enumerable: !1,
          get: function () {
            return this._writableState.highWaterMark;
          },
        }),
          Object.defineProperty(ef.prototype, "writableBuffer", {
            enumerable: !1,
            get: function () {
              return this._writableState && this._writableState.getBuffer();
            },
          }),
          Object.defineProperty(ef.prototype, "writableLength", {
            enumerable: !1,
            get: function () {
              return this._writableState.length;
            },
          }),
          Object.defineProperty(ef.prototype, "destroyed", {
            enumerable: !1,
            get: function () {
              return (
                void 0 !== this._readableState &&
                void 0 !== this._writableState &&
                this._readableState.destroyed &&
                this._writableState.destroyed
              );
            },
            set: function ($) {
              void 0 !== this._readableState &&
                void 0 !== this._writableState &&
                ((this._readableState.destroyed = $),
                (this._writableState.destroyed = $));
            },
          }));
      },
      5512: function ($, Y, J) {
        "use strict";
        $.exports = ee;
        var Q = J(586);
        function ee($) {
          if (!(this instanceof ee)) return new ee($);
          Q.call(this, $);
        }
        (J(1638)(ee, Q),
          (ee.prototype._transform = function ($, Y, J) {
            J(null, $);
          }));
      },
      7276: function (Y, J, Q) {
        "use strict";
        ((Y.exports = ex), (ex.ReadableState = ew), Q(4434).EventEmitter);
        var et,
          er,
          ei,
          en,
          ea,
          ef = function ($, Y) {
            return $.listeners(Y).length;
          },
          eo = Q(5120),
          es = Q(181).Buffer,
          eh = $.g.Uint8Array || function () {},
          ed = Q(9023);
        er = ed && ed.debuglog ? ed.debuglog("stream") : function () {};
        var ec = Q(1137),
          eu = Q(2528),
          el = Q(771).getHighWaterMark,
          ep = Q(4329).F,
          eb = ep.ERR_INVALID_ARG_TYPE,
          em = ep.ERR_STREAM_PUSH_AFTER_EOF,
          eg = ep.ERR_METHOD_NOT_IMPLEMENTED,
          ey = ep.ERR_STREAM_UNSHIFT_AFTER_END_EVENT;
        Q(1638)(ex, eo);
        var ev = eu.errorOrDestroy,
          e_ = ["error", "close", "destroy", "pause", "resume"];
        function ew($, Y, J) {
          ((et = et || Q(8686)),
            ($ = $ || {}),
            "boolean" != typeof J && (J = Y instanceof et),
            (this.objectMode = !!$.objectMode),
            J && (this.objectMode = this.objectMode || !!$.readableObjectMode),
            (this.highWaterMark = el(this, $, "readableHighWaterMark", J)),
            (this.buffer = new ec()),
            (this.length = 0),
            (this.pipes = null),
            (this.pipesCount = 0),
            (this.flowing = null),
            (this.ended = !1),
            (this.endEmitted = !1),
            (this.reading = !1),
            (this.sync = !0),
            (this.needReadable = !1),
            (this.emittedReadable = !1),
            (this.readableListening = !1),
            (this.resumeScheduled = !1),
            (this.paused = !0),
            (this.emitClose = !1 !== $.emitClose),
            (this.autoDestroy = !!$.autoDestroy),
            (this.destroyed = !1),
            (this.defaultEncoding = $.defaultEncoding || "utf8"),
            (this.awaitDrain = 0),
            (this.readingMore = !1),
            (this.decoder = null),
            (this.encoding = null),
            $.encoding &&
              (ei || (ei = Q(7319).I),
              (this.decoder = new ei($.encoding)),
              (this.encoding = $.encoding)));
        }
        function ex($) {
          if (((et = et || Q(8686)), !(this instanceof ex))) return new ex($);
          var Y = this instanceof et;
          ((this._readableState = new ew($, this, Y)),
            (this.readable = !0),
            $ &&
              ("function" == typeof $.read && (this._read = $.read),
              "function" == typeof $.destroy && (this._destroy = $.destroy)),
            eo.call(this));
        }
        function eM($, Y, J, Q, ee) {
          er("readableAddChunk", Y);
          var et,
            ei,
            en = $._readableState;
          if (null === Y)
            ((en.reading = !1),
              (function ($, Y) {
                if ((er("onEofChunk"), !Y.ended)) {
                  if (Y.decoder) {
                    var J = Y.decoder.end();
                    J &&
                      J.length &&
                      (Y.buffer.push(J),
                      (Y.length += Y.objectMode ? 1 : J.length));
                  }
                  ((Y.ended = !0),
                    Y.sync
                      ? ek($)
                      : ((Y.needReadable = !1),
                        Y.emittedReadable ||
                          ((Y.emittedReadable = !0), eA($))));
                }
              })($, en));
          else if (
            (ee ||
              (ei = (function ($, Y) {
                var J;
                return (
                  es.isBuffer(Y) ||
                    Y instanceof eh ||
                    "string" == typeof Y ||
                    void 0 === Y ||
                    $.objectMode ||
                    (J = new eb(
                      "chunk",
                      ["string", "Buffer", "Uint8Array"],
                      Y,
                    )),
                  J
                );
              })(en, Y)),
            ei)
          )
            ev($, ei);
          else if (en.objectMode || (Y && Y.length > 0))
            if (
              ("string" == typeof Y ||
                en.objectMode ||
                Object.getPrototypeOf(Y) === es.prototype ||
                ((et = Y), (Y = es.from(et))),
              Q)
            )
              en.endEmitted ? ev($, new ey()) : eS($, en, Y, !0);
            else if (en.ended) ev($, new em());
            else {
              if (en.destroyed) return !1;
              ((en.reading = !1),
                en.decoder && !J
                  ? ((Y = en.decoder.write(Y)),
                    en.objectMode || 0 !== Y.length
                      ? eS($, en, Y, !1)
                      : eR($, en))
                  : eS($, en, Y, !1));
            }
          else Q || ((en.reading = !1), eR($, en));
          return !en.ended && (en.length < en.highWaterMark || 0 === en.length);
        }
        function eS($, Y, J, Q) {
          (Y.flowing && 0 === Y.length && !Y.sync
            ? ((Y.awaitDrain = 0), $.emit("data", J))
            : ((Y.length += Y.objectMode ? 1 : J.length),
              Q ? Y.buffer.unshift(J) : Y.buffer.push(J),
              Y.needReadable && ek($)),
            eR($, Y));
        }
        function eE($, Y) {
          var J;
          if ($ <= 0 || (0 === Y.length && Y.ended)) return 0;
          if (Y.objectMode) return 1;
          if ($ != $)
            if (Y.flowing && Y.length) return Y.buffer.head.data.length;
            else return Y.length;
          return ($ > Y.highWaterMark &&
            ((J = $) >= 0x40000000
              ? (J = 0x40000000)
              : (J--,
                (J |= J >>> 1),
                (J |= J >>> 2),
                (J |= J >>> 4),
                (J |= J >>> 8),
                (J |= J >>> 16),
                J++),
            (Y.highWaterMark = J)),
          $ <= Y.length)
            ? $
            : Y.ended
              ? Y.length
              : ((Y.needReadable = !0), 0);
        }
        function ek($) {
          var Y = $._readableState;
          (er("emitReadable", Y.needReadable, Y.emittedReadable),
            (Y.needReadable = !1),
            Y.emittedReadable ||
              (er("emitReadable", Y.flowing),
              (Y.emittedReadable = !0),
              ee.default.nextTick(eA, $)));
        }
        function eA($) {
          var Y = $._readableState;
          (er("emitReadable_", Y.destroyed, Y.length, Y.ended),
            !Y.destroyed &&
              (Y.length || Y.ended) &&
              ($.emit("readable"), (Y.emittedReadable = !1)),
            (Y.needReadable =
              !Y.flowing && !Y.ended && Y.length <= Y.highWaterMark),
            eO($));
        }
        function eR($, Y) {
          Y.readingMore ||
            ((Y.readingMore = !0), ee.default.nextTick(eI, $, Y));
        }
        function eI($, Y) {
          for (
            ;
            !Y.reading &&
            !Y.ended &&
            (Y.length < Y.highWaterMark || (Y.flowing && 0 === Y.length));

          ) {
            var J = Y.length;
            if ((er("maybeReadMore read 0"), $.read(0), J === Y.length)) break;
          }
          Y.readingMore = !1;
        }
        function eB($) {
          var Y = $._readableState;
          ((Y.readableListening = $.listenerCount("readable") > 0),
            Y.resumeScheduled && !Y.paused
              ? (Y.flowing = !0)
              : $.listenerCount("data") > 0 && $.resume());
        }
        function eT($) {
          (er("readable nexttick read 0"), $.read(0));
        }
        function eP($, Y) {
          (er("resume", Y.reading),
            Y.reading || $.read(0),
            (Y.resumeScheduled = !1),
            $.emit("resume"),
            eO($),
            Y.flowing && !Y.reading && $.read(0));
        }
        function eO($) {
          var Y = $._readableState;
          for (er("flow", Y.flowing); Y.flowing && null !== $.read(); );
        }
        function eC($, Y) {
          var J;
          return 0 === Y.length
            ? null
            : (Y.objectMode
                ? (J = Y.buffer.shift())
                : !$ || $ >= Y.length
                  ? ((J = Y.decoder
                      ? Y.buffer.join("")
                      : 1 === Y.buffer.length
                        ? Y.buffer.first()
                        : Y.buffer.concat(Y.length)),
                    Y.buffer.clear())
                  : (J = Y.buffer.consume($, Y.decoder)),
              J);
        }
        function eN($) {
          var Y = $._readableState;
          (er("endReadable", Y.endEmitted),
            Y.endEmitted || ((Y.ended = !0), ee.default.nextTick(ej, Y, $)));
        }
        function ej($, Y) {
          if (
            (er("endReadableNT", $.endEmitted, $.length),
            !$.endEmitted &&
              0 === $.length &&
              (($.endEmitted = !0),
              (Y.readable = !1),
              Y.emit("end"),
              $.autoDestroy))
          ) {
            var J = Y._writableState;
            (!J || (J.autoDestroy && J.finished)) && Y.destroy();
          }
        }
        function eD($, Y) {
          for (var J = 0, Q = $.length; J < Q; J++) if ($[J] === Y) return J;
          return -1;
        }
        (Object.defineProperty(ex.prototype, "destroyed", {
          enumerable: !1,
          get: function () {
            return (
              void 0 !== this._readableState && this._readableState.destroyed
            );
          },
          set: function ($) {
            this._readableState && (this._readableState.destroyed = $);
          },
        }),
          (ex.prototype.destroy = eu.destroy),
          (ex.prototype._undestroy = eu.undestroy),
          (ex.prototype._destroy = function ($, Y) {
            Y($);
          }),
          (ex.prototype.push = function ($, Y) {
            var J,
              Q = this._readableState;
            return (
              Q.objectMode
                ? (J = !0)
                : "string" == typeof $ &&
                  ((Y = Y || Q.defaultEncoding) !== Q.encoding &&
                    (($ = es.from($, Y)), (Y = "")),
                  (J = !0)),
              eM(this, $, Y, !1, J)
            );
          }),
          (ex.prototype.unshift = function ($) {
            return eM(this, $, null, !0, !1);
          }),
          (ex.prototype.isPaused = function () {
            return !1 === this._readableState.flowing;
          }),
          (ex.prototype.setEncoding = function ($) {
            ei || (ei = Q(7319).I);
            var Y = new ei($);
            ((this._readableState.decoder = Y),
              (this._readableState.encoding =
                this._readableState.decoder.encoding));
            for (var J = this._readableState.buffer.head, ee = ""; null !== J; )
              ((ee += Y.write(J.data)), (J = J.next));
            return (
              this._readableState.buffer.clear(),
              "" !== ee && this._readableState.buffer.push(ee),
              (this._readableState.length = ee.length),
              this
            );
          }),
          (ex.prototype.read = function ($) {
            (er("read", $), ($ = parseInt($, 10)));
            var Y,
              J = this._readableState,
              Q = $;
            if (
              (0 !== $ && (J.emittedReadable = !1),
              0 === $ &&
                J.needReadable &&
                ((0 !== J.highWaterMark
                  ? J.length >= J.highWaterMark
                  : J.length > 0) ||
                  J.ended))
            )
              return (
                er("read: emitReadable", J.length, J.ended),
                0 === J.length && J.ended ? eN(this) : ek(this),
                null
              );
            if (0 === ($ = eE($, J)) && J.ended)
              return (0 === J.length && eN(this), null);
            var ee = J.needReadable;
            return (
              er("need readable", ee),
              (0 === J.length || J.length - $ < J.highWaterMark) &&
                er("length less than watermark", (ee = !0)),
              J.ended || J.reading
                ? er("reading or ended", (ee = !1))
                : ee &&
                  (er("do read"),
                  (J.reading = !0),
                  (J.sync = !0),
                  0 === J.length && (J.needReadable = !0),
                  this._read(J.highWaterMark),
                  (J.sync = !1),
                  J.reading || ($ = eE(Q, J))),
              null === (Y = $ > 0 ? eC($, J) : null)
                ? ((J.needReadable = J.length <= J.highWaterMark), ($ = 0))
                : ((J.length -= $), (J.awaitDrain = 0)),
              0 === J.length &&
                (J.ended || (J.needReadable = !0),
                Q !== $ && J.ended && eN(this)),
              null !== Y && this.emit("data", Y),
              Y
            );
          }),
          (ex.prototype._read = function ($) {
            ev(this, new eg("_read()"));
          }),
          (ex.prototype.pipe = function ($, Y) {
            var J,
              Q = this,
              et = this._readableState;
            switch (et.pipesCount) {
              case 0:
                et.pipes = $;
                break;
              case 1:
                et.pipes = [et.pipes, $];
                break;
              default:
                et.pipes.push($);
            }
            ((et.pipesCount += 1),
              er("pipe count=%d opts=%j", et.pipesCount, Y));
            var ei =
              (Y && !1 === Y.end) ||
              $ === ee.default.stdout ||
              $ === ee.default.stderr
                ? eu
                : en;
            function en() {
              (er("onend"), $.end());
            }
            (et.endEmitted ? ee.default.nextTick(ei) : Q.once("end", ei),
              $.on("unpipe", function Y(J, ee) {
                (er("onunpipe"),
                  J === Q &&
                    ee &&
                    !1 === ee.hasUnpiped &&
                    ((ee.hasUnpiped = !0),
                    er("cleanup"),
                    $.removeListener("close", ed),
                    $.removeListener("finish", ec),
                    $.removeListener("drain", ea),
                    $.removeListener("error", eh),
                    $.removeListener("unpipe", Y),
                    Q.removeListener("end", en),
                    Q.removeListener("end", eu),
                    Q.removeListener("data", es),
                    (eo = !0),
                    et.awaitDrain &&
                      (!$._writableState || $._writableState.needDrain) &&
                      ea()));
              }));
            var ea =
              ((J = Q),
              function () {
                var $ = J._readableState;
                (er("pipeOnDrain", $.awaitDrain),
                  $.awaitDrain && $.awaitDrain--,
                  0 === $.awaitDrain &&
                    ef(J, "data") &&
                    (($.flowing = !0), eO(J)));
              });
            $.on("drain", ea);
            var eo = !1;
            function es(Y) {
              er("ondata");
              var J = $.write(Y);
              (er("dest.write", J),
                !1 === J &&
                  (((1 === et.pipesCount && et.pipes === $) ||
                    (et.pipesCount > 1 && -1 !== eD(et.pipes, $))) &&
                    !eo &&
                    (er("false write response, pause", et.awaitDrain),
                    et.awaitDrain++),
                  Q.pause()));
            }
            function eh(Y) {
              (er("onerror", Y),
                eu(),
                $.removeListener("error", eh),
                0 === ef($, "error") && ev($, Y));
            }
            function ed() {
              ($.removeListener("finish", ec), eu());
            }
            function ec() {
              (er("onfinish"), $.removeListener("close", ed), eu());
            }
            function eu() {
              (er("unpipe"), Q.unpipe($));
            }
            return (
              Q.on("data", es),
              !(function ($, Y, J) {
                if ("function" == typeof $.prependListener)
                  return $.prependListener(Y, J);
                $._events && $._events[Y]
                  ? Array.isArray($._events[Y])
                    ? $._events[Y].unshift(J)
                    : ($._events[Y] = [J, $._events[Y]])
                  : $.on(Y, J);
              })($, "error", eh),
              $.once("close", ed),
              $.once("finish", ec),
              $.emit("pipe", Q),
              et.flowing || (er("pipe resume"), Q.resume()),
              $
            );
          }),
          (ex.prototype.unpipe = function ($) {
            var Y = this._readableState,
              J = { hasUnpiped: !1 };
            if (0 === Y.pipesCount) return this;
            if (1 === Y.pipesCount)
              return (
                ($ && $ !== Y.pipes) ||
                  ($ || ($ = Y.pipes),
                  (Y.pipes = null),
                  (Y.pipesCount = 0),
                  (Y.flowing = !1),
                  $ && $.emit("unpipe", this, J)),
                this
              );
            if (!$) {
              var Q = Y.pipes,
                ee = Y.pipesCount;
              ((Y.pipes = null), (Y.pipesCount = 0), (Y.flowing = !1));
              for (var et = 0; et < ee; et++)
                Q[et].emit("unpipe", this, { hasUnpiped: !1 });
              return this;
            }
            var er = eD(Y.pipes, $);
            return (
              -1 === er ||
                (Y.pipes.splice(er, 1),
                (Y.pipesCount -= 1),
                1 === Y.pipesCount && (Y.pipes = Y.pipes[0]),
                $.emit("unpipe", this, J)),
              this
            );
          }),
          (ex.prototype.on = function ($, Y) {
            var J = eo.prototype.on.call(this, $, Y),
              Q = this._readableState;
            return (
              "data" === $
                ? ((Q.readableListening = this.listenerCount("readable") > 0),
                  !1 !== Q.flowing && this.resume())
                : "readable" !== $ ||
                  Q.endEmitted ||
                  Q.readableListening ||
                  ((Q.readableListening = Q.needReadable = !0),
                  (Q.flowing = !1),
                  (Q.emittedReadable = !1),
                  er("on readable", Q.length, Q.reading),
                  Q.length
                    ? ek(this)
                    : Q.reading || ee.default.nextTick(eT, this)),
              J
            );
          }),
          (ex.prototype.addListener = ex.prototype.on),
          (ex.prototype.removeListener = function ($, Y) {
            var J = eo.prototype.removeListener.call(this, $, Y);
            return ("readable" === $ && ee.default.nextTick(eB, this), J);
          }),
          (ex.prototype.removeAllListeners = function ($) {
            var Y = eo.prototype.removeAllListeners.apply(this, arguments);
            return (
              ("readable" === $ || void 0 === $) &&
                ee.default.nextTick(eB, this),
              Y
            );
          }),
          (ex.prototype.resume = function () {
            var $,
              Y,
              J = this._readableState;
            return (
              J.flowing ||
                (er("resume"),
                (J.flowing = !J.readableListening),
                ($ = this),
                (Y = J).resumeScheduled ||
                  ((Y.resumeScheduled = !0), ee.default.nextTick(eP, $, Y))),
              (J.paused = !1),
              this
            );
          }),
          (ex.prototype.pause = function () {
            return (
              er("call pause flowing=%j", this._readableState.flowing),
              !1 !== this._readableState.flowing &&
                (er("pause"),
                (this._readableState.flowing = !1),
                this.emit("pause")),
              (this._readableState.paused = !0),
              this
            );
          }),
          (ex.prototype.wrap = function ($) {
            var Y = this,
              J = this._readableState,
              Q = !1;
            for (var ee in ($.on("end", function () {
              if ((er("wrapped end"), J.decoder && !J.ended)) {
                var $ = J.decoder.end();
                $ && $.length && Y.push($);
              }
              Y.push(null);
            }),
            $.on("data", function (ee) {
              (er("wrapped data"),
                J.decoder && (ee = J.decoder.write(ee)),
                (J.objectMode && null == ee) ||
                  ((J.objectMode || (ee && ee.length)) &&
                    (Y.push(ee) || ((Q = !0), $.pause()))));
            }),
            $))
              void 0 === this[ee] &&
                "function" == typeof $[ee] &&
                (this[ee] = (function (Y) {
                  return function () {
                    return $[Y].apply($, arguments);
                  };
                })(ee));
            for (var et = 0; et < e_.length; et++)
              $.on(e_[et], this.emit.bind(this, e_[et]));
            return (
              (this._read = function (Y) {
                (er("wrapped _read", Y), Q && ((Q = !1), $.resume()));
              }),
              this
            );
          }),
          "function" == typeof Symbol &&
            (ex.prototype[Symbol.asyncIterator] = function () {
              return (void 0 === en && (en = Q(531)), en(this));
            }),
          Object.defineProperty(ex.prototype, "readableHighWaterMark", {
            enumerable: !1,
            get: function () {
              return this._readableState.highWaterMark;
            },
          }),
          Object.defineProperty(ex.prototype, "readableBuffer", {
            enumerable: !1,
            get: function () {
              return this._readableState && this._readableState.buffer;
            },
          }),
          Object.defineProperty(ex.prototype, "readableFlowing", {
            enumerable: !1,
            get: function () {
              return this._readableState.flowing;
            },
            set: function ($) {
              this._readableState && (this._readableState.flowing = $);
            },
          }),
          (ex._fromList = eC),
          Object.defineProperty(ex.prototype, "readableLength", {
            enumerable: !1,
            get: function () {
              return this._readableState.length;
            },
          }),
          "function" == typeof Symbol &&
            (ex.from = function ($, Y) {
              return (void 0 === ea && (ea = Q(8812)), ea(ex, $, Y));
            }));
      },
      586: function ($, Y, J) {
        "use strict";
        $.exports = ef;
        var Q = J(4329).F,
          ee = Q.ERR_METHOD_NOT_IMPLEMENTED,
          et = Q.ERR_MULTIPLE_CALLBACK,
          er = Q.ERR_TRANSFORM_ALREADY_TRANSFORMING,
          ei = Q.ERR_TRANSFORM_WITH_LENGTH_0,
          en = J(8686);
        function ea($, Y) {
          var J = this._transformState;
          J.transforming = !1;
          var Q = J.writecb;
          if (null === Q) return this.emit("error", new et());
          ((J.writechunk = null),
            (J.writecb = null),
            null != Y && this.push(Y),
            Q($));
          var ee = this._readableState;
          ((ee.reading = !1),
            (ee.needReadable || ee.length < ee.highWaterMark) &&
              this._read(ee.highWaterMark));
        }
        function ef($) {
          if (!(this instanceof ef)) return new ef($);
          (en.call(this, $),
            (this._transformState = {
              afterTransform: ea.bind(this),
              needTransform: !1,
              transforming: !1,
              writecb: null,
              writechunk: null,
              writeencoding: null,
            }),
            (this._readableState.needReadable = !0),
            (this._readableState.sync = !1),
            $ &&
              ("function" == typeof $.transform &&
                (this._transform = $.transform),
              "function" == typeof $.flush && (this._flush = $.flush)),
            this.on("prefinish", eo));
        }
        function eo() {
          var $ = this;
          "function" != typeof this._flush || this._readableState.destroyed
            ? es(this, null, null)
            : this._flush(function (Y, J) {
                es($, Y, J);
              });
        }
        function es($, Y, J) {
          if (Y) return $.emit("error", Y);
          if ((null != J && $.push(J), $._writableState.length)) throw new ei();
          if ($._transformState.transforming) throw new er();
          return $.push(null);
        }
        (J(1638)(ef, en),
          (ef.prototype.push = function ($, Y) {
            return (
              (this._transformState.needTransform = !1),
              en.prototype.push.call(this, $, Y)
            );
          }),
          (ef.prototype._transform = function ($, Y, J) {
            J(new ee("_transform()"));
          }),
          (ef.prototype._write = function ($, Y, J) {
            var Q = this._transformState;
            if (
              ((Q.writecb = J),
              (Q.writechunk = $),
              (Q.writeencoding = Y),
              !Q.transforming)
            ) {
              var ee = this._readableState;
              (Q.needTransform ||
                ee.needReadable ||
                ee.length < ee.highWaterMark) &&
                this._read(ee.highWaterMark);
            }
          }),
          (ef.prototype._read = function ($) {
            var Y = this._transformState;
            null === Y.writechunk || Y.transforming
              ? (Y.needTransform = !0)
              : ((Y.transforming = !0),
                this._transform(
                  Y.writechunk,
                  Y.writeencoding,
                  Y.afterTransform,
                ));
          }),
          (ef.prototype._destroy = function ($, Y) {
            en.prototype._destroy.call(this, $, function ($) {
              Y($);
            });
          }));
      },
      4732: function (Y, J, Q) {
        "use strict";
        function et($) {
          var Y = this;
          ((this.next = null),
            (this.entry = null),
            (this.finish = function () {
              var J = Y,
                Q = $,
                ee = J.entry;
              for (J.entry = null; ee; ) {
                var et = ee.callback;
                (Q.pendingcb--, et(void 0), (ee = ee.next));
              }
              Q.corkedRequestsFree.next = J;
            }));
        }
        ((Y.exports = ex), (ex.WritableState = ew));
        var er,
          ei,
          en = { deprecate: Q(4774) },
          ea = Q(5120),
          ef = Q(181).Buffer,
          eo = $.g.Uint8Array || function () {},
          es = Q(2528),
          eh = Q(771).getHighWaterMark,
          ed = Q(4329).F,
          ec = ed.ERR_INVALID_ARG_TYPE,
          eu = ed.ERR_METHOD_NOT_IMPLEMENTED,
          el = ed.ERR_MULTIPLE_CALLBACK,
          ep = ed.ERR_STREAM_CANNOT_PIPE,
          eb = ed.ERR_STREAM_DESTROYED,
          em = ed.ERR_STREAM_NULL_VALUES,
          eg = ed.ERR_STREAM_WRITE_AFTER_END,
          ey = ed.ERR_UNKNOWN_ENCODING,
          ev = es.errorOrDestroy;
        function e_() {}
        function ew($, Y, J) {
          ((er = er || Q(8686)),
            ($ = $ || {}),
            "boolean" != typeof J && (J = Y instanceof er),
            (this.objectMode = !!$.objectMode),
            J && (this.objectMode = this.objectMode || !!$.writableObjectMode),
            (this.highWaterMark = eh(this, $, "writableHighWaterMark", J)),
            (this.finalCalled = !1),
            (this.needDrain = !1),
            (this.ending = !1),
            (this.ended = !1),
            (this.finished = !1),
            (this.destroyed = !1));
          var ei = !1 === $.decodeStrings;
          ((this.decodeStrings = !ei),
            (this.defaultEncoding = $.defaultEncoding || "utf8"),
            (this.length = 0),
            (this.writing = !1),
            (this.corked = 0),
            (this.sync = !0),
            (this.bufferProcessing = !1),
            (this.onwrite = function ($) {
              !(function ($, Y) {
                var J = $._writableState,
                  Q = J.sync,
                  et = J.writecb;
                if ("function" != typeof et) throw new el();
                if (
                  ((J.writing = !1),
                  (J.writecb = null),
                  (J.length -= J.writelen),
                  (J.writelen = 0),
                  Y)
                )
                  (--J.pendingcb,
                    Q
                      ? (ee.default.nextTick(et, Y),
                        ee.default.nextTick(eR, $, J),
                        ($._writableState.errorEmitted = !0),
                        ev($, Y))
                      : (et(Y),
                        ($._writableState.errorEmitted = !0),
                        ev($, Y),
                        eR($, J)));
                else {
                  var er = ek(J) || $.destroyed;
                  (er ||
                    J.corked ||
                    J.bufferProcessing ||
                    !J.bufferedRequest ||
                    eE($, J),
                    Q
                      ? ee.default.nextTick(eS, $, J, er, et)
                      : eS($, J, er, et));
                }
              })(Y, $);
            }),
            (this.writecb = null),
            (this.writelen = 0),
            (this.bufferedRequest = null),
            (this.lastBufferedRequest = null),
            (this.pendingcb = 0),
            (this.prefinished = !1),
            (this.errorEmitted = !1),
            (this.emitClose = !1 !== $.emitClose),
            (this.autoDestroy = !!$.autoDestroy),
            (this.bufferedRequestCount = 0),
            (this.corkedRequestsFree = new et(this)));
        }
        (Q(1638)(ex, ea),
          (ew.prototype.getBuffer = function () {
            for (var $ = this.bufferedRequest, Y = []; $; )
              (Y.push($), ($ = $.next));
            return Y;
          }));
        try {
          Object.defineProperty(ew.prototype, "buffer", {
            get: en.deprecate(
              function () {
                return this.getBuffer();
              },
              "_writableState.buffer is deprecated. Use _writableState.getBuffer instead.",
              "DEP0003",
            ),
          });
        } catch ($) {}
        function ex($) {
          var Y = this instanceof (er = er || Q(8686));
          if (!Y && !ei.call(ex, this)) return new ex($);
          ((this._writableState = new ew($, this, Y)),
            (this.writable = !0),
            $ &&
              ("function" == typeof $.write && (this._write = $.write),
              "function" == typeof $.writev && (this._writev = $.writev),
              "function" == typeof $.destroy && (this._destroy = $.destroy),
              "function" == typeof $.final && (this._final = $.final)),
            ea.call(this));
        }
        function eM($, Y, J, Q, ee, et, er) {
          ((Y.writelen = Q),
            (Y.writecb = er),
            (Y.writing = !0),
            (Y.sync = !0),
            Y.destroyed
              ? Y.onwrite(new eb("write"))
              : J
                ? $._writev(ee, Y.onwrite)
                : $._write(ee, et, Y.onwrite),
            (Y.sync = !1));
        }
        function eS($, Y, J, Q) {
          var ee, et;
          (J ||
            ((ee = $),
            0 === (et = Y).length &&
              et.needDrain &&
              ((et.needDrain = !1), ee.emit("drain"))),
            Y.pendingcb--,
            Q(),
            eR($, Y));
        }
        function eE($, Y) {
          Y.bufferProcessing = !0;
          var J = Y.bufferedRequest;
          if ($._writev && J && J.next) {
            var Q = Array(Y.bufferedRequestCount),
              ee = Y.corkedRequestsFree;
            ee.entry = J;
            for (var er = 0, ei = !0; J; )
              ((Q[er] = J), J.isBuf || (ei = !1), (J = J.next), (er += 1));
            ((Q.allBuffers = ei),
              eM($, Y, !0, Y.length, Q, "", ee.finish),
              Y.pendingcb++,
              (Y.lastBufferedRequest = null),
              ee.next
                ? ((Y.corkedRequestsFree = ee.next), (ee.next = null))
                : (Y.corkedRequestsFree = new et(Y)),
              (Y.bufferedRequestCount = 0));
          } else {
            for (; J; ) {
              var en = J.chunk,
                ea = J.encoding,
                ef = J.callback,
                eo = Y.objectMode ? 1 : en.length;
              if (
                (eM($, Y, !1, eo, en, ea, ef),
                (J = J.next),
                Y.bufferedRequestCount--,
                Y.writing)
              )
                break;
            }
            null === J && (Y.lastBufferedRequest = null);
          }
          ((Y.bufferedRequest = J), (Y.bufferProcessing = !1));
        }
        function ek($) {
          return (
            $.ending &&
            0 === $.length &&
            null === $.bufferedRequest &&
            !$.finished &&
            !$.writing
          );
        }
        function eA($, Y) {
          $._final(function (J) {
            (Y.pendingcb--,
              J && ev($, J),
              (Y.prefinished = !0),
              $.emit("prefinish"),
              eR($, Y));
          });
        }
        function eR($, Y) {
          var J = ek(Y);
          if (
            J &&
            (Y.prefinished ||
              Y.finalCalled ||
              ("function" != typeof $._final || Y.destroyed
                ? ((Y.prefinished = !0), $.emit("prefinish"))
                : (Y.pendingcb++,
                  (Y.finalCalled = !0),
                  ee.default.nextTick(eA, $, Y))),
            0 === Y.pendingcb &&
              ((Y.finished = !0), $.emit("finish"), Y.autoDestroy))
          ) {
            var Q = $._readableState;
            (!Q || (Q.autoDestroy && Q.endEmitted)) && $.destroy();
          }
          return J;
        }
        ("function" == typeof Symbol &&
        Symbol.hasInstance &&
        "function" == typeof Function.prototype[Symbol.hasInstance]
          ? ((ei = Function.prototype[Symbol.hasInstance]),
            Object.defineProperty(ex, Symbol.hasInstance, {
              value: function ($) {
                return (
                  !!ei.call(this, $) ||
                  (this === ex && $ && $._writableState instanceof ew)
                );
              },
            }))
          : (ei = function ($) {
              return $ instanceof this;
            }),
          (ex.prototype.pipe = function () {
            ev(this, new ep());
          }),
          (ex.prototype.write = function ($, Y, J) {
            var Q,
              et,
              er,
              ei,
              en,
              ea,
              es,
              eh = this._writableState,
              ed = !1,
              eu =
                !eh.objectMode && ((Q = $), ef.isBuffer(Q) || Q instanceof eo);
            return (
              (eu && !ef.isBuffer($) && ((et = $), ($ = ef.from(et))),
              "function" == typeof Y && ((J = Y), (Y = null)),
              eu ? (Y = "buffer") : Y || (Y = eh.defaultEncoding),
              "function" != typeof J && (J = e_),
              eh.ending)
                ? ((er = J),
                  ev(this, (ei = new eg())),
                  ee.default.nextTick(er, ei))
                : (eu ||
                    ((en = $),
                    (ea = J),
                    null === en
                      ? (es = new em())
                      : "string" == typeof en ||
                        eh.objectMode ||
                        (es = new ec("chunk", ["string", "Buffer"], en)),
                    !es || (ev(this, es), ee.default.nextTick(ea, es), 0))) &&
                  (eh.pendingcb++,
                  (ed = (function ($, Y, J, Q, ee, et) {
                    if (!J) {
                      var er,
                        ei,
                        en =
                          ((er = Q),
                          (ei = ee),
                          Y.objectMode ||
                            !1 === Y.decodeStrings ||
                            "string" != typeof er ||
                            (er = ef.from(er, ei)),
                          er);
                      Q !== en && ((J = !0), (ee = "buffer"), (Q = en));
                    }
                    var ea = Y.objectMode ? 1 : Q.length;
                    Y.length += ea;
                    var eo = Y.length < Y.highWaterMark;
                    if ((eo || (Y.needDrain = !0), Y.writing || Y.corked)) {
                      var es = Y.lastBufferedRequest;
                      ((Y.lastBufferedRequest = {
                        chunk: Q,
                        encoding: ee,
                        isBuf: J,
                        callback: et,
                        next: null,
                      }),
                        es
                          ? (es.next = Y.lastBufferedRequest)
                          : (Y.bufferedRequest = Y.lastBufferedRequest),
                        (Y.bufferedRequestCount += 1));
                    } else eM($, Y, !1, ea, Q, ee, et);
                    return eo;
                  })(this, eh, eu, $, Y, J))),
              ed
            );
          }),
          (ex.prototype.cork = function () {
            this._writableState.corked++;
          }),
          (ex.prototype.uncork = function () {
            var $ = this._writableState;
            $.corked &&
              ($.corked--,
              $.writing ||
                $.corked ||
                $.bufferProcessing ||
                !$.bufferedRequest ||
                eE(this, $));
          }),
          (ex.prototype.setDefaultEncoding = function ($) {
            if (
              ("string" == typeof $ && ($ = $.toLowerCase()),
              !(
                [
                  "hex",
                  "utf8",
                  "utf-8",
                  "ascii",
                  "binary",
                  "base64",
                  "ucs2",
                  "ucs-2",
                  "utf16le",
                  "utf-16le",
                  "raw",
                ].indexOf(($ + "").toLowerCase()) > -1
              ))
            )
              throw new ey($);
            return ((this._writableState.defaultEncoding = $), this);
          }),
          Object.defineProperty(ex.prototype, "writableBuffer", {
            enumerable: !1,
            get: function () {
              return this._writableState && this._writableState.getBuffer();
            },
          }),
          Object.defineProperty(ex.prototype, "writableHighWaterMark", {
            enumerable: !1,
            get: function () {
              return this._writableState.highWaterMark;
            },
          }),
          (ex.prototype._write = function ($, Y, J) {
            J(new eu("_write()"));
          }),
          (ex.prototype._writev = null),
          (ex.prototype.end = function ($, Y, J) {
            var Q,
              et,
              er,
              ei = this._writableState;
            return (
              "function" == typeof $
                ? ((J = $), ($ = null), (Y = null))
                : "function" == typeof Y && ((J = Y), (Y = null)),
              null != $ && this.write($, Y),
              ei.corked && ((ei.corked = 1), this.uncork()),
              ei.ending ||
                ((Q = this),
                (et = ei),
                (er = J),
                (et.ending = !0),
                eR(Q, et),
                er &&
                  (et.finished
                    ? ee.default.nextTick(er)
                    : Q.once("finish", er)),
                (et.ended = !0),
                (Q.writable = !1)),
              this
            );
          }),
          Object.defineProperty(ex.prototype, "writableLength", {
            enumerable: !1,
            get: function () {
              return this._writableState.length;
            },
          }),
          Object.defineProperty(ex.prototype, "destroyed", {
            enumerable: !1,
            get: function () {
              return (
                void 0 !== this._writableState && this._writableState.destroyed
              );
            },
            set: function ($) {
              this._writableState && (this._writableState.destroyed = $);
            },
          }),
          (ex.prototype.destroy = es.destroy),
          (ex.prototype._undestroy = es.undestroy),
          (ex.prototype._destroy = function ($, Y) {
            Y($);
          }));
      },
      531: function ($, Y, J) {
        "use strict";
        function Q($, Y, J) {
          return (
            Y in $
              ? Object.defineProperty($, Y, {
                  value: J,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                })
              : ($[Y] = J),
            $
          );
        }
        var et,
          er = J(8134),
          ei = Symbol("lastResolve"),
          en = Symbol("lastReject"),
          ea = Symbol("error"),
          ef = Symbol("ended"),
          eo = Symbol("lastPromise"),
          es = Symbol("handlePromise"),
          eh = Symbol("stream");
        function ed($, Y) {
          return { value: $, done: Y };
        }
        function ec($) {
          var Y = $[ei];
          if (null !== Y) {
            var J = $[eh].read();
            null !== J &&
              (($[eo] = null), ($[ei] = null), ($[en] = null), Y(ed(J, !1)));
          }
        }
        function eu($) {
          ee.default.nextTick(ec, $);
        }
        var el = Object.getPrototypeOf(function () {}),
          ep = Object.setPrototypeOf(
            (Q(
              (et = {
                get stream() {
                  return this[eh];
                },
                next: function () {
                  var $,
                    Y,
                    J = this,
                    Q = this[ea];
                  if (null !== Q) return Promise.reject(Q);
                  if (this[ef]) return Promise.resolve(ed(void 0, !0));
                  if (this[eh].destroyed)
                    return new Promise(function ($, Y) {
                      ee.default.nextTick(function () {
                        J[ea] ? Y(J[ea]) : $(ed(void 0, !0));
                      });
                    });
                  var et = this[eo];
                  if (et)
                    Y = new Promise(
                      (($ = this),
                      function (Y, J) {
                        et.then(function () {
                          $[ef] ? Y(ed(void 0, !0)) : $[es](Y, J);
                        }, J);
                      }),
                    );
                  else {
                    var er = this[eh].read();
                    if (null !== er) return Promise.resolve(ed(er, !1));
                    Y = new Promise(this[es]);
                  }
                  return ((this[eo] = Y), Y);
                },
              }),
              Symbol.asyncIterator,
              function () {
                return this;
              },
            ),
            Q(et, "return", function () {
              var $ = this;
              return new Promise(function (Y, J) {
                $[eh].destroy(null, function ($) {
                  $ ? J($) : Y(ed(void 0, !0));
                });
              });
            }),
            et),
            el,
          );
        $.exports = function ($) {
          var Y,
            J = Object.create(
              ep,
              (Q((Y = {}), eh, { value: $, writable: !0 }),
              Q(Y, ei, { value: null, writable: !0 }),
              Q(Y, en, { value: null, writable: !0 }),
              Q(Y, ea, { value: null, writable: !0 }),
              Q(Y, ef, { value: $._readableState.endEmitted, writable: !0 }),
              Q(Y, es, {
                value: function ($, Y) {
                  var Q = J[eh].read();
                  Q
                    ? ((J[eo] = null),
                      (J[ei] = null),
                      (J[en] = null),
                      $(ed(Q, !1)))
                    : ((J[ei] = $), (J[en] = Y));
                },
                writable: !0,
              }),
              Y),
            );
          return (
            (J[eo] = null),
            er($, function ($) {
              if ($ && "ERR_STREAM_PREMATURE_CLOSE" !== $.code) {
                var Y = J[en];
                (null !== Y &&
                  ((J[eo] = null), (J[ei] = null), (J[en] = null), Y($)),
                  (J[ea] = $));
                return;
              }
              var Q = J[ei];
              (null !== Q &&
                ((J[eo] = null),
                (J[ei] = null),
                (J[en] = null),
                Q(ed(void 0, !0))),
                (J[ef] = !0));
            }),
            $.on("readable", eu.bind(null, J)),
            J
          );
        };
      },
      1137: function ($, Y, J) {
        "use strict";
        function Q($, Y) {
          var J = Object.keys($);
          if (Object.getOwnPropertySymbols) {
            var Q = Object.getOwnPropertySymbols($);
            (Y &&
              (Q = Q.filter(function (Y) {
                return Object.getOwnPropertyDescriptor($, Y).enumerable;
              })),
              J.push.apply(J, Q));
          }
          return J;
        }
        var ee = J(181).Buffer,
          et = J(9023).inspect,
          er = (et && et.custom) || "inspect";
        $.exports = (function () {
          var $;
          function Y() {
            if (!(this instanceof Y))
              throw TypeError("Cannot call a class as a function");
            ((this.head = null), (this.tail = null), (this.length = 0));
          }
          return (
            ($ = [
              {
                key: "push",
                value: function ($) {
                  var Y = { data: $, next: null };
                  (this.length > 0 ? (this.tail.next = Y) : (this.head = Y),
                    (this.tail = Y),
                    ++this.length);
                },
              },
              {
                key: "unshift",
                value: function ($) {
                  var Y = { data: $, next: this.head };
                  (0 === this.length && (this.tail = Y),
                    (this.head = Y),
                    ++this.length);
                },
              },
              {
                key: "shift",
                value: function () {
                  if (0 !== this.length) {
                    var $ = this.head.data;
                    return (
                      1 === this.length
                        ? (this.head = this.tail = null)
                        : (this.head = this.head.next),
                      --this.length,
                      $
                    );
                  }
                },
              },
              {
                key: "clear",
                value: function () {
                  ((this.head = this.tail = null), (this.length = 0));
                },
              },
              {
                key: "join",
                value: function ($) {
                  if (0 === this.length) return "";
                  for (var Y = this.head, J = "" + Y.data; (Y = Y.next); )
                    J += $ + Y.data;
                  return J;
                },
              },
              {
                key: "concat",
                value: function ($) {
                  if (0 === this.length) return ee.alloc(0);
                  for (
                    var Y,
                      J,
                      Q = ee.allocUnsafe($ >>> 0),
                      et = this.head,
                      er = 0;
                    et;

                  )
                    ((Y = et.data),
                      (J = er),
                      ee.prototype.copy.call(Y, Q, J),
                      (er += et.data.length),
                      (et = et.next));
                  return Q;
                },
              },
              {
                key: "consume",
                value: function ($, Y) {
                  var J;
                  return (
                    $ < this.head.data.length
                      ? ((J = this.head.data.slice(0, $)),
                        (this.head.data = this.head.data.slice($)))
                      : (J =
                          $ === this.head.data.length
                            ? this.shift()
                            : Y
                              ? this._getString($)
                              : this._getBuffer($)),
                    J
                  );
                },
              },
              {
                key: "first",
                value: function () {
                  return this.head.data;
                },
              },
              {
                key: "_getString",
                value: function ($) {
                  var Y = this.head,
                    J = 1,
                    Q = Y.data;
                  for ($ -= Q.length; (Y = Y.next); ) {
                    var ee = Y.data,
                      et = $ > ee.length ? ee.length : $;
                    if (
                      (et === ee.length ? (Q += ee) : (Q += ee.slice(0, $)),
                      0 == ($ -= et))
                    ) {
                      et === ee.length
                        ? (++J,
                          Y.next
                            ? (this.head = Y.next)
                            : (this.head = this.tail = null))
                        : ((this.head = Y), (Y.data = ee.slice(et)));
                      break;
                    }
                    ++J;
                  }
                  return ((this.length -= J), Q);
                },
              },
              {
                key: "_getBuffer",
                value: function ($) {
                  var Y = ee.allocUnsafe($),
                    J = this.head,
                    Q = 1;
                  for (J.data.copy(Y), $ -= J.data.length; (J = J.next); ) {
                    var et = J.data,
                      er = $ > et.length ? et.length : $;
                    if ((et.copy(Y, Y.length - $, 0, er), 0 == ($ -= er))) {
                      er === et.length
                        ? (++Q,
                          J.next
                            ? (this.head = J.next)
                            : (this.head = this.tail = null))
                        : ((this.head = J), (J.data = et.slice(er)));
                      break;
                    }
                    ++Q;
                  }
                  return ((this.length -= Q), Y);
                },
              },
              {
                key: er,
                value: function ($, Y) {
                  return et(
                    this,
                    (function ($) {
                      for (var Y = 1; Y < arguments.length; Y++) {
                        var J = null != arguments[Y] ? arguments[Y] : {};
                        Y % 2
                          ? Q(Object(J), !0).forEach(function (Y) {
                              var Q, ee, et;
                              ((Q = $),
                                (ee = Y),
                                (et = J[Y]),
                                ee in Q
                                  ? Object.defineProperty(Q, ee, {
                                      value: et,
                                      enumerable: !0,
                                      configurable: !0,
                                      writable: !0,
                                    })
                                  : (Q[ee] = et));
                            })
                          : Object.getOwnPropertyDescriptors
                            ? Object.defineProperties(
                                $,
                                Object.getOwnPropertyDescriptors(J),
                              )
                            : Q(Object(J)).forEach(function (Y) {
                                Object.defineProperty(
                                  $,
                                  Y,
                                  Object.getOwnPropertyDescriptor(J, Y),
                                );
                              });
                      }
                      return $;
                    })({}, Y, { depth: 0, customInspect: !1 }),
                  );
                },
              },
            ]),
            (function ($, Y) {
              for (var J = 0; J < Y.length; J++) {
                var Q = Y[J];
                ((Q.enumerable = Q.enumerable || !1),
                  (Q.configurable = !0),
                  "value" in Q && (Q.writable = !0),
                  Object.defineProperty($, Q.key, Q));
              }
            })(Y.prototype, $),
            Y
          );
        })();
      },
      2528: function ($) {
        "use strict";
        function Y($, Y) {
          (Q($, Y), J($));
        }
        function J($) {
          ($._writableState && !$._writableState.emitClose) ||
            ((!$._readableState || $._readableState.emitClose) &&
              $.emit("close"));
        }
        function Q($, Y) {
          $.emit("error", Y);
        }
        $.exports = {
          destroy: function ($, et) {
            var er = this,
              ei = this._readableState && this._readableState.destroyed,
              en = this._writableState && this._writableState.destroyed;
            return (
              ei || en
                ? et
                  ? et($)
                  : $ &&
                    (this._writableState
                      ? this._writableState.errorEmitted ||
                        ((this._writableState.errorEmitted = !0),
                        ee.default.nextTick(Q, this, $))
                      : ee.default.nextTick(Q, this, $))
                : (this._readableState && (this._readableState.destroyed = !0),
                  this._writableState && (this._writableState.destroyed = !0),
                  this._destroy($ || null, function ($) {
                    !et && $
                      ? er._writableState
                        ? er._writableState.errorEmitted
                          ? ee.default.nextTick(J, er)
                          : ((er._writableState.errorEmitted = !0),
                            ee.default.nextTick(Y, er, $))
                        : ee.default.nextTick(Y, er, $)
                      : et
                        ? (ee.default.nextTick(J, er), et($))
                        : ee.default.nextTick(J, er);
                  })),
              this
            );
          },
          undestroy: function () {
            (this._readableState &&
              ((this._readableState.destroyed = !1),
              (this._readableState.reading = !1),
              (this._readableState.ended = !1),
              (this._readableState.endEmitted = !1)),
              this._writableState &&
                ((this._writableState.destroyed = !1),
                (this._writableState.ended = !1),
                (this._writableState.ending = !1),
                (this._writableState.finalCalled = !1),
                (this._writableState.prefinished = !1),
                (this._writableState.finished = !1),
                (this._writableState.errorEmitted = !1)));
          },
          errorOrDestroy: function ($, Y) {
            var J = $._readableState,
              Q = $._writableState;
            (J && J.autoDestroy) || (Q && Q.autoDestroy)
              ? $.destroy(Y)
              : $.emit("error", Y);
          },
        };
      },
      8134: function ($, Y, J) {
        "use strict";
        var Q = J(4329).F.ERR_STREAM_PREMATURE_CLOSE;
        function ee() {}
        $.exports = function $(Y, J, et) {
          if ("function" == typeof J) return $(Y, null, J);
          (J || (J = {}),
            (er = et || ee),
            (ei = !1),
            (et = function () {
              if (!ei) {
                ei = !0;
                for (var $ = arguments.length, Y = Array($), J = 0; J < $; J++)
                  Y[J] = arguments[J];
                er.apply(this, Y);
              }
            }));
          var er,
            ei,
            en = J.readable || (!1 !== J.readable && Y.readable),
            ea = J.writable || (!1 !== J.writable && Y.writable),
            ef = function () {
              Y.writable || es();
            },
            eo = Y._writableState && Y._writableState.finished,
            es = function () {
              ((ea = !1), (eo = !0), en || et.call(Y));
            },
            eh = Y._readableState && Y._readableState.endEmitted,
            ed = function () {
              ((en = !1), (eh = !0), ea || et.call(Y));
            },
            ec = function ($) {
              et.call(Y, $);
            },
            eu = function () {
              var $;
              return en && !eh
                ? ((Y._readableState && Y._readableState.ended) ||
                    ($ = new Q()),
                  et.call(Y, $))
                : ea && !eo
                  ? ((Y._writableState && Y._writableState.ended) ||
                      ($ = new Q()),
                    et.call(Y, $))
                  : void 0;
            },
            el = function () {
              Y.req.on("finish", es);
            };
          return (
            Y.setHeader && "function" == typeof Y.abort
              ? (Y.on("complete", es),
                Y.on("abort", eu),
                Y.req ? el() : Y.on("request", el))
              : ea && !Y._writableState && (Y.on("end", ef), Y.on("close", ef)),
            Y.on("end", ed),
            Y.on("finish", es),
            !1 !== J.error && Y.on("error", ec),
            Y.on("close", eu),
            function () {
              (Y.removeListener("complete", es),
                Y.removeListener("abort", eu),
                Y.removeListener("request", el),
                Y.req && Y.req.removeListener("finish", es),
                Y.removeListener("end", ef),
                Y.removeListener("close", ef),
                Y.removeListener("finish", es),
                Y.removeListener("end", ed),
                Y.removeListener("error", ec),
                Y.removeListener("close", eu));
            }
          );
        };
      },
      8812: function ($, Y, J) {
        "use strict";
        function Q($, Y, J, Q, ee, et, er) {
          try {
            var ei = $[et](er),
              en = ei.value;
          } catch ($) {
            J($);
            return;
          }
          ei.done ? Y(en) : Promise.resolve(en).then(Q, ee);
        }
        function ee($, Y) {
          var J = Object.keys($);
          if (Object.getOwnPropertySymbols) {
            var Q = Object.getOwnPropertySymbols($);
            (Y &&
              (Q = Q.filter(function (Y) {
                return Object.getOwnPropertyDescriptor($, Y).enumerable;
              })),
              J.push.apply(J, Q));
          }
          return J;
        }
        var et = J(4329).F.ERR_INVALID_ARG_TYPE;
        $.exports = function ($, Y, J) {
          if (Y && "function" == typeof Y.next) er = Y;
          else if (Y && Y[Symbol.asyncIterator]) er = Y[Symbol.asyncIterator]();
          else if (Y && Y[Symbol.iterator]) er = Y[Symbol.iterator]();
          else throw new et("iterable", ["Iterable"], Y);
          var er,
            ei = new $(
              (function ($) {
                for (var Y = 1; Y < arguments.length; Y++) {
                  var J = null != arguments[Y] ? arguments[Y] : {};
                  Y % 2
                    ? ee(Object(J), !0).forEach(function (Y) {
                        var Q, ee, et;
                        ((Q = $),
                          (ee = Y),
                          (et = J[Y]),
                          ee in Q
                            ? Object.defineProperty(Q, ee, {
                                value: et,
                                enumerable: !0,
                                configurable: !0,
                                writable: !0,
                              })
                            : (Q[ee] = et));
                      })
                    : Object.getOwnPropertyDescriptors
                      ? Object.defineProperties(
                          $,
                          Object.getOwnPropertyDescriptors(J),
                        )
                      : ee(Object(J)).forEach(function (Y) {
                          Object.defineProperty(
                            $,
                            Y,
                            Object.getOwnPropertyDescriptor(J, Y),
                          );
                        });
                }
                return $;
              })({ objectMode: !0 }, J),
            ),
            en = !1;
          function ea() {
            return ef.apply(this, arguments);
          }
          function ef() {
            var $;
            return (
              ($ = function* () {
                try {
                  var $ = yield er.next(),
                    Y = $.value;
                  $.done ? ei.push(null) : ei.push(yield Y) ? ea() : (en = !1);
                } catch ($) {
                  ei.destroy($);
                }
              }),
              (ef = function () {
                var Y = this,
                  J = arguments;
                return new Promise(function (ee, et) {
                  var er = $.apply(Y, J);
                  function ei($) {
                    Q(er, ee, et, ei, en, "next", $);
                  }
                  function en($) {
                    Q(er, ee, et, ei, en, "throw", $);
                  }
                  ei(void 0);
                });
              }).apply(this, arguments)
            );
          }
          return (
            (ei._read = function () {
              en || ((en = !0), ea());
            }),
            ei
          );
        };
      },
      694: function ($, Y, J) {
        "use strict";
        var Q,
          ee = J(4329).F,
          et = ee.ERR_MISSING_ARGS,
          er = ee.ERR_STREAM_DESTROYED;
        function ei($) {
          if ($) throw $;
        }
        function en($) {
          $();
        }
        function ea($, Y) {
          return $.pipe(Y);
        }
        $.exports = function () {
          for (
            var $, Y, ee = arguments.length, ef = Array(ee), eo = 0;
            eo < ee;
            eo++
          )
            ef[eo] = arguments[eo];
          var es =
            ($ = ef).length && "function" == typeof $[$.length - 1]
              ? $.pop()
              : ei;
          if ((Array.isArray(ef[0]) && (ef = ef[0]), ef.length < 2))
            throw new et("streams");
          var eh = ef.map(function ($, ee) {
            var et,
              ei,
              ea,
              eo,
              ed,
              ec,
              eu = ee < ef.length - 1;
            return (
              (et = ee > 0),
              (ea = ei =
                function ($) {
                  (Y || (Y = $),
                    $ && eh.forEach(en),
                    eu || (eh.forEach(en), es(Y)));
                }),
              (eo = !1),
              (ei = function () {
                eo || ((eo = !0), ea.apply(void 0, arguments));
              }),
              (ed = !1),
              $.on("close", function () {
                ed = !0;
              }),
              void 0 === Q && (Q = J(8134)),
              Q($, { readable: eu, writable: et }, function ($) {
                if ($) return ei($);
                ((ed = !0), ei());
              }),
              (ec = !1),
              function (Y) {
                if (!ed && !ec) {
                  if (((ec = !0), $.setHeader && "function" == typeof $.abort))
                    return $.abort();
                  if ("function" == typeof $.destroy) return $.destroy();
                  ei(Y || new er("pipe"));
                }
              }
            );
          });
          return ef.reduce(ea);
        };
      },
      771: function ($, Y, J) {
        "use strict";
        var Q = J(4329).F.ERR_INVALID_OPT_VALUE;
        $.exports = {
          getHighWaterMark: function ($, Y, J, ee) {
            var et =
              null != Y.highWaterMark ? Y.highWaterMark : ee ? Y[J] : null;
            if (null != et) {
              if (!(isFinite(et) && Math.floor(et) === et) || et < 0)
                throw new Q(ee ? J : "highWaterMark", et);
              return Math.floor(et);
            }
            return $.objectMode ? 16 : 16384;
          },
        };
      },
      5120: function ($, Y, J) {
        $.exports = J(2203);
      },
      5486: function ($, Y, J) {
        var Q = J(2203);
        "disable" === ee.default.env.READABLE_STREAM && Q
          ? (($.exports = Q.Readable),
            Object.assign($.exports, Q),
            ($.exports.Stream = Q))
          : (((Y = $.exports = J(7276)).Stream = Q || Y),
            (Y.Readable = Y),
            (Y.Writable = J(4732)),
            (Y.Duplex = J(8686)),
            (Y.Transform = J(586)),
            (Y.PassThrough = J(5512)),
            (Y.finished = J(8134)),
            (Y.pipeline = J(694)));
      },
      8987: function ($, Y, J) {
        "use strict";
        var Q = J(181).Buffer,
          ee = J(1638),
          et = J(2321),
          er = Array(16),
          ei = [
            0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 7, 4, 13, 1,
            10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8, 3, 10, 14, 4, 9, 15, 8, 1,
            2, 7, 0, 6, 13, 11, 5, 12, 1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15,
            14, 5, 6, 2, 4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13,
          ],
          en = [
            5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12, 6, 11, 3, 7,
            0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2, 15, 5, 1, 3, 7, 14, 6, 9,
            11, 8, 12, 2, 10, 0, 4, 13, 8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13,
            9, 7, 10, 14, 12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11,
          ],
          ea = [
            11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8, 7, 6, 8, 13,
            11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12, 11, 13, 6, 7, 14, 9, 13,
            15, 14, 8, 13, 6, 5, 12, 7, 5, 11, 12, 14, 15, 14, 15, 9, 8, 9, 14,
            5, 6, 8, 6, 5, 12, 9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8,
            5, 6,
          ],
          ef = [
            8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6, 9, 13, 15,
            7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11, 9, 7, 15, 11, 8, 6, 6,
            14, 12, 13, 5, 14, 13, 13, 7, 5, 15, 5, 8, 11, 14, 14, 6, 14, 6, 9,
            12, 9, 12, 5, 15, 8, 8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13,
            11, 11,
          ];
        function eo() {
          (et.call(this, 64),
            (this._a = 0x67452301),
            (this._b = 0xefcdab89),
            (this._c = 0x98badcfe),
            (this._d = 0x10325476),
            (this._e = 0xc3d2e1f0));
        }
        function es($, Y) {
          return ($ << Y) | ($ >>> (32 - Y));
        }
        (ee(eo, et),
          (eo.prototype._update = function () {
            for (
              var $,
                Y,
                J,
                Q,
                ee,
                et,
                eo,
                eh,
                ed,
                ec,
                eu,
                el,
                ep,
                eb,
                em,
                eg,
                ey,
                ev,
                e_,
                ew,
                ex,
                eM,
                eS,
                eE,
                ek,
                eA,
                eR,
                eI,
                eB,
                eT,
                eP,
                eO,
                eC,
                eN,
                ej,
                eD,
                eL,
                eq,
                eU,
                ez,
                eF,
                eH,
                eK,
                eW,
                eV,
                eZ,
                eG,
                eX,
                e$,
                eY,
                eJ,
                eQ,
                e0 = 0;
              e0 < 16;
              ++e0
            )
              er[e0] = this._block.readInt32LE(4 * e0);
            for (
              var e1 = 0 | this._a,
                e2 = 0 | this._b,
                e6 = 0 | this._c,
                e3 = 0 | this._d,
                e4 = 0 | this._e,
                e8 = 0 | this._a,
                e5 = 0 | this._b,
                e9 = 0 | this._c,
                e7 = 0 | this._d,
                te = 0 | this._e,
                tt = 0;
              tt < 80;
              tt += 1
            ) {
              (tt < 16
                ? (($ = e1),
                  (Y = e2),
                  (J = e6),
                  (Q = e3),
                  (ee = e4),
                  (eJ =
                    (es(($ + (Y ^ J ^ Q) + er[ei[tt]] + 0) | 0, ea[tt]) + ee) |
                    0),
                  (et = e8),
                  (eo = e5),
                  (eh = e9),
                  (ed = e7),
                  (ec = te),
                  (eQ =
                    (es(
                      (et + (eo ^ (eh | ~ed)) + er[en[tt]] + 0x50a28be6) | 0,
                      ef[tt],
                    ) +
                      ec) |
                    0))
                : tt < 32
                  ? ((eu = e1),
                    (el = e2),
                    (ep = e6),
                    (eb = e3),
                    (em = e4),
                    (eJ =
                      (es(
                        (eu +
                          ((el & ep) | (~el & eb)) +
                          er[ei[tt]] +
                          0x5a827999) |
                          0,
                        ea[tt],
                      ) +
                        em) |
                      0),
                    (eg = e8),
                    (ey = e5),
                    (ev = e9),
                    (e_ = e7),
                    (ew = te),
                    (eQ =
                      (es(
                        (eg +
                          ((ey & e_) | (ev & ~e_)) +
                          er[en[tt]] +
                          0x5c4dd124) |
                          0,
                        ef[tt],
                      ) +
                        ew) |
                      0))
                  : tt < 48
                    ? ((ex = e1),
                      (eM = e2),
                      (eS = e6),
                      (eE = e3),
                      (ek = e4),
                      (eJ =
                        (es(
                          (ex + ((eM | ~eS) ^ eE) + er[ei[tt]] + 0x6ed9eba1) |
                            0,
                          ea[tt],
                        ) +
                          ek) |
                        0),
                      (eA = e8),
                      (eR = e5),
                      (eI = e9),
                      (eB = e7),
                      (eT = te),
                      (eQ =
                        (es(
                          (eA + ((eR | ~eI) ^ eB) + er[en[tt]] + 0x6d703ef3) |
                            0,
                          ef[tt],
                        ) +
                          eT) |
                        0))
                    : tt < 64
                      ? ((eP = e1),
                        (eO = e2),
                        (eC = e6),
                        (eN = e3),
                        (ej = e4),
                        (eJ =
                          (es(
                            (eP +
                              ((eO & eN) | (eC & ~eN)) +
                              er[ei[tt]] +
                              0x8f1bbcdc) |
                              0,
                            ea[tt],
                          ) +
                            ej) |
                          0),
                        (eD = e8),
                        (eL = e5),
                        (eq = e9),
                        (eU = e7),
                        (ez = te),
                        (eQ =
                          (es(
                            (eD +
                              ((eL & eq) | (~eL & eU)) +
                              er[en[tt]] +
                              0x7a6d76e9) |
                              0,
                            ef[tt],
                          ) +
                            ez) |
                          0))
                      : ((eF = e1),
                        (eH = e2),
                        (eK = e6),
                        (eW = e3),
                        (eV = e4),
                        (eJ =
                          (es(
                            (eF + (eH ^ (eK | ~eW)) + er[ei[tt]] + 0xa953fd4e) |
                              0,
                            ea[tt],
                          ) +
                            eV) |
                          0),
                        (eZ = e8),
                        (eG = e5),
                        (eX = e9),
                        (e$ = e7),
                        (eY = te),
                        (eQ =
                          (es(
                            (eZ + (eG ^ eX ^ e$) + er[en[tt]] + 0) | 0,
                            ef[tt],
                          ) +
                            eY) |
                          0)),
                (e1 = e4),
                (e4 = e3),
                (e3 = es(e6, 10)),
                (e6 = e2),
                (e2 = eJ),
                (e8 = te),
                (te = e7),
                (e7 = es(e9, 10)),
                (e9 = e5),
                (e5 = eQ));
            }
            var tr = (this._b + e6 + e7) | 0;
            ((this._b = (this._c + e3 + te) | 0),
              (this._c = (this._d + e4 + e8) | 0),
              (this._d = (this._e + e1 + e5) | 0),
              (this._e = (this._a + e2 + e9) | 0),
              (this._a = tr));
          }),
          (eo.prototype._digest = function () {
            ((this._block[this._blockOffset++] = 128),
              this._blockOffset > 56 &&
                (this._block.fill(0, this._blockOffset, 64),
                this._update(),
                (this._blockOffset = 0)),
              this._block.fill(0, this._blockOffset, 56),
              this._block.writeUInt32LE(this._length[0], 56),
              this._block.writeUInt32LE(this._length[1], 60),
              this._update());
            var $ = Q.alloc ? Q.alloc(20) : new Q(20);
            return (
              $.writeInt32LE(this._a, 0),
              $.writeInt32LE(this._b, 4),
              $.writeInt32LE(this._c, 8),
              $.writeInt32LE(this._d, 12),
              $.writeInt32LE(this._e, 16),
              $
            );
          }),
          ($.exports = eo));
      },
      5056: function ($, Y, J) {
        var Q = J(181),
          ee = Q.Buffer;
        function et($, Y) {
          for (var J in $) Y[J] = $[J];
        }
        function er($, Y, J) {
          return ee($, Y, J);
        }
        (ee.from && ee.alloc && ee.allocUnsafe && ee.allocUnsafeSlow
          ? ($.exports = Q)
          : (et(Q, Y), (Y.Buffer = er)),
          (er.prototype = Object.create(ee.prototype)),
          et(ee, er),
          (er.from = function ($, Y, J) {
            if ("number" == typeof $)
              throw TypeError("Argument must not be a number");
            return ee($, Y, J);
          }),
          (er.alloc = function ($, Y, J) {
            if ("number" != typeof $)
              throw TypeError("Argument must be a number");
            var Q = ee($);
            return (
              void 0 !== Y
                ? "string" == typeof J
                  ? Q.fill(Y, J)
                  : Q.fill(Y)
                : Q.fill(0),
              Q
            );
          }),
          (er.allocUnsafe = function ($) {
            if ("number" != typeof $)
              throw TypeError("Argument must be a number");
            return ee($);
          }),
          (er.allocUnsafeSlow = function ($) {
            if ("number" != typeof $)
              throw TypeError("Argument must be a number");
            return Q.SlowBuffer($);
          }));
      },
      5725: function ($, Y, J) {
        var Q = J(181),
          ee = Q.Buffer;
        function et($, Y) {
          for (var J in $) Y[J] = $[J];
        }
        function er($, Y, J) {
          return ee($, Y, J);
        }
        (ee.from && ee.alloc && ee.allocUnsafe && ee.allocUnsafeSlow
          ? ($.exports = Q)
          : (et(Q, Y), (Y.Buffer = er)),
          (er.prototype = Object.create(ee.prototype)),
          et(ee, er),
          (er.from = function ($, Y, J) {
            if ("number" == typeof $)
              throw TypeError("Argument must not be a number");
            return ee($, Y, J);
          }),
          (er.alloc = function ($, Y, J) {
            if ("number" != typeof $)
              throw TypeError("Argument must be a number");
            var Q = ee($);
            return (
              void 0 !== Y
                ? "string" == typeof J
                  ? Q.fill(Y, J)
                  : Q.fill(Y)
                : Q.fill(0),
              Q
            );
          }),
          (er.allocUnsafe = function ($) {
            if ("number" != typeof $)
              throw TypeError("Argument must be a number");
            return ee($);
          }),
          (er.allocUnsafeSlow = function ($) {
            if ("number" != typeof $)
              throw TypeError("Argument must be a number");
            return Q.SlowBuffer($);
          }));
      },
      1007: function ($, Y, J) {
        var Q = J(5725).Buffer;
        function ee($, Y) {
          ((this._block = Q.alloc($)),
            (this._finalSize = Y),
            (this._blockSize = $),
            (this._len = 0));
        }
        ((ee.prototype.update = function ($, Y) {
          "string" == typeof $ && ((Y = Y || "utf8"), ($ = Q.from($, Y)));
          for (
            var J = this._block,
              ee = this._blockSize,
              et = $.length,
              er = this._len,
              ei = 0;
            ei < et;

          ) {
            for (
              var en = er % ee, ea = Math.min(et - ei, ee - en), ef = 0;
              ef < ea;
              ef++
            )
              J[en + ef] = $[ei + ef];
            ((er += ea), (ei += ea), er % ee == 0 && this._update(J));
          }
          return ((this._len += et), this);
        }),
          (ee.prototype.digest = function ($) {
            var Y = this._len % this._blockSize;
            ((this._block[Y] = 128),
              this._block.fill(0, Y + 1),
              Y >= this._finalSize &&
                (this._update(this._block), this._block.fill(0)));
            var J = 8 * this._len;
            if (J <= 0xffffffff)
              this._block.writeUInt32BE(J, this._blockSize - 4);
            else {
              var Q = J >>> 0;
              (this._block.writeUInt32BE(
                (J - Q) / 0x100000000,
                this._blockSize - 8,
              ),
                this._block.writeUInt32BE(Q, this._blockSize - 4));
            }
            this._update(this._block);
            var ee = this._hash();
            return $ ? ee.toString($) : ee;
          }),
          (ee.prototype._update = function () {
            throw Error("_update must be implemented by subclass");
          }),
          ($.exports = ee));
      },
      3251: function ($, Y, J) {
        var Q = ($.exports = function ($) {
          var Y = Q[($ = $.toLowerCase())];
          if (!Y)
            throw Error($ + " is not supported (we accept pull requests)");
          return new Y();
        });
        ((Q.sha = J(569)),
          (Q.sha1 = J(822)),
          (Q.sha224 = J(5365)),
          (Q.sha256 = J(1380)),
          (Q.sha384 = J(3840)),
          (Q.sha512 = J(7921)));
      },
      569: function ($, Y, J) {
        var Q = J(1638),
          ee = J(1007),
          et = J(5725).Buffer,
          er = [0x5a827999, 0x6ed9eba1, -0x70e44324, -0x359d3e2a],
          ei = Array(80);
        function en() {
          (this.init(), (this._w = ei), ee.call(this, 64, 56));
        }
        (Q(en, ee),
          (en.prototype.init = function () {
            return (
              (this._a = 0x67452301),
              (this._b = 0xefcdab89),
              (this._c = 0x98badcfe),
              (this._d = 0x10325476),
              (this._e = 0xc3d2e1f0),
              this
            );
          }),
          (en.prototype._update = function ($) {
            for (
              var Y = this._w,
                J = 0 | this._a,
                Q = 0 | this._b,
                ee = 0 | this._c,
                et = 0 | this._d,
                ei = 0 | this._e,
                en = 0;
              en < 16;
              ++en
            )
              Y[en] = $.readInt32BE(4 * en);
            for (; en < 80; ++en)
              Y[en] = Y[en - 3] ^ Y[en - 8] ^ Y[en - 14] ^ Y[en - 16];
            for (var ea = 0; ea < 80; ++ea) {
              var ef,
                eo,
                es,
                eh,
                ed,
                ec = ~~(ea / 20),
                eu =
                  ((((ef = J) << 5) | (ef >>> 27)) +
                    ((eo = Q),
                    (es = ee),
                    (eh = et),
                    0 === ec
                      ? (eo & es) | (~eo & eh)
                      : 2 === ec
                        ? (eo & es) | (eo & eh) | (es & eh)
                        : eo ^ es ^ eh) +
                    ei +
                    Y[ea] +
                    er[ec]) |
                  0;
              ((ei = et),
                (et = ee),
                (ee = ((ed = Q) << 30) | (ed >>> 2)),
                (Q = J),
                (J = eu));
            }
            ((this._a = (J + this._a) | 0),
              (this._b = (Q + this._b) | 0),
              (this._c = (ee + this._c) | 0),
              (this._d = (et + this._d) | 0),
              (this._e = (ei + this._e) | 0));
          }),
          (en.prototype._hash = function () {
            var $ = et.allocUnsafe(20);
            return (
              $.writeInt32BE(0 | this._a, 0),
              $.writeInt32BE(0 | this._b, 4),
              $.writeInt32BE(0 | this._c, 8),
              $.writeInt32BE(0 | this._d, 12),
              $.writeInt32BE(0 | this._e, 16),
              $
            );
          }),
          ($.exports = en));
      },
      822: function ($, Y, J) {
        var Q = J(1638),
          ee = J(1007),
          et = J(5725).Buffer,
          er = [0x5a827999, 0x6ed9eba1, -0x70e44324, -0x359d3e2a],
          ei = Array(80);
        function en() {
          (this.init(), (this._w = ei), ee.call(this, 64, 56));
        }
        (Q(en, ee),
          (en.prototype.init = function () {
            return (
              (this._a = 0x67452301),
              (this._b = 0xefcdab89),
              (this._c = 0x98badcfe),
              (this._d = 0x10325476),
              (this._e = 0xc3d2e1f0),
              this
            );
          }),
          (en.prototype._update = function ($) {
            for (
              var Y = this._w,
                J = 0 | this._a,
                Q = 0 | this._b,
                ee = 0 | this._c,
                et = 0 | this._d,
                ei = 0 | this._e,
                en = 0;
              en < 16;
              ++en
            )
              Y[en] = $.readInt32BE(4 * en);
            for (; en < 80; ++en)
              Y[en] =
                ((ef = Y[en - 3] ^ Y[en - 8] ^ Y[en - 14] ^ Y[en - 16]) << 1) |
                (ef >>> 31);
            for (var ea = 0; ea < 80; ++ea) {
              var ef,
                eo,
                es,
                eh,
                ed,
                ec,
                eu = ~~(ea / 20),
                el =
                  ((((eo = J) << 5) | (eo >>> 27)) +
                    ((es = Q),
                    (eh = ee),
                    (ed = et),
                    0 === eu
                      ? (es & eh) | (~es & ed)
                      : 2 === eu
                        ? (es & eh) | (es & ed) | (eh & ed)
                        : es ^ eh ^ ed) +
                    ei +
                    Y[ea] +
                    er[eu]) |
                  0;
              ((ei = et),
                (et = ee),
                (ee = ((ec = Q) << 30) | (ec >>> 2)),
                (Q = J),
                (J = el));
            }
            ((this._a = (J + this._a) | 0),
              (this._b = (Q + this._b) | 0),
              (this._c = (ee + this._c) | 0),
              (this._d = (et + this._d) | 0),
              (this._e = (ei + this._e) | 0));
          }),
          (en.prototype._hash = function () {
            var $ = et.allocUnsafe(20);
            return (
              $.writeInt32BE(0 | this._a, 0),
              $.writeInt32BE(0 | this._b, 4),
              $.writeInt32BE(0 | this._c, 8),
              $.writeInt32BE(0 | this._d, 12),
              $.writeInt32BE(0 | this._e, 16),
              $
            );
          }),
          ($.exports = en));
      },
      5365: function ($, Y, J) {
        var Q = J(1638),
          ee = J(1380),
          et = J(1007),
          er = J(5725).Buffer,
          ei = Array(64);
        function en() {
          (this.init(), (this._w = ei), et.call(this, 64, 56));
        }
        (Q(en, ee),
          (en.prototype.init = function () {
            return (
              (this._a = 0xc1059ed8),
              (this._b = 0x367cd507),
              (this._c = 0x3070dd17),
              (this._d = 0xf70e5939),
              (this._e = 0xffc00b31),
              (this._f = 0x68581511),
              (this._g = 0x64f98fa7),
              (this._h = 0xbefa4fa4),
              this
            );
          }),
          (en.prototype._hash = function () {
            var $ = er.allocUnsafe(28);
            return (
              $.writeInt32BE(this._a, 0),
              $.writeInt32BE(this._b, 4),
              $.writeInt32BE(this._c, 8),
              $.writeInt32BE(this._d, 12),
              $.writeInt32BE(this._e, 16),
              $.writeInt32BE(this._f, 20),
              $.writeInt32BE(this._g, 24),
              $
            );
          }),
          ($.exports = en));
      },
      1380: function ($, Y, J) {
        var Q = J(1638),
          ee = J(1007),
          et = J(5725).Buffer,
          er = [
            0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b,
            0x59f111f1, 0x923f82a4, 0xab1c5ed5, 0xd807aa98, 0x12835b01,
            0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7,
            0xc19bf174, 0xe49b69c1, 0xefbe4786, 0xfc19dc6, 0x240ca1cc,
            0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da, 0x983e5152,
            0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147,
            0x6ca6351, 0x14292967, 0x27b70a85, 0x2e1b2138, 0x4d2c6dfc,
            0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
            0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819,
            0xd6990624, 0xf40e3585, 0x106aa070, 0x19a4c116, 0x1e376c08,
            0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f,
            0x682e6ff3, 0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208,
            0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2,
          ],
          ei = Array(64);
        function en() {
          (this.init(), (this._w = ei), ee.call(this, 64, 56));
        }
        (Q(en, ee),
          (en.prototype.init = function () {
            return (
              (this._a = 0x6a09e667),
              (this._b = 0xbb67ae85),
              (this._c = 0x3c6ef372),
              (this._d = 0xa54ff53a),
              (this._e = 0x510e527f),
              (this._f = 0x9b05688c),
              (this._g = 0x1f83d9ab),
              (this._h = 0x5be0cd19),
              this
            );
          }),
          (en.prototype._update = function ($) {
            for (
              var Y = this._w,
                J = 0 | this._a,
                Q = 0 | this._b,
                ee = 0 | this._c,
                et = 0 | this._d,
                ei = 0 | this._e,
                en = 0 | this._f,
                ea = 0 | this._g,
                ef = 0 | this._h,
                eo = 0;
              eo < 16;
              ++eo
            )
              Y[eo] = $.readInt32BE(4 * eo);
            for (; eo < 64; ++eo)
              Y[eo] =
                (((((eh = Y[eo - 2]) >>> 17) | (eh << 15)) ^
                  ((eh >>> 19) | (eh << 13)) ^
                  (eh >>> 10)) +
                  Y[eo - 7] +
                  ((((ed = Y[eo - 15]) >>> 7) | (ed << 25)) ^
                    ((ed >>> 18) | (ed << 14)) ^
                    (ed >>> 3)) +
                  Y[eo - 16]) |
                0;
            for (var es = 0; es < 64; ++es) {
              var eh,
                ed,
                ec,
                eu,
                el,
                ep,
                eb,
                em,
                eg,
                ey =
                  (ef +
                    ((((ec = ei) >>> 6) | (ec << 26)) ^
                      ((ec >>> 11) | (ec << 21)) ^
                      ((ec >>> 25) | (ec << 7))) +
                    ((eu = ei), (el = en), (ep = ea) ^ (eu & (el ^ ep))) +
                    er[es] +
                    Y[es]) |
                  0,
                ev =
                  (((((eb = J) >>> 2) | (eb << 30)) ^
                    ((eb >>> 13) | (eb << 19)) ^
                    ((eb >>> 22) | (eb << 10))) +
                    (((em = J) & (eg = Q)) | (ee & (em | eg)))) |
                  0;
              ((ef = ea),
                (ea = en),
                (en = ei),
                (ei = (et + ey) | 0),
                (et = ee),
                (ee = Q),
                (Q = J),
                (J = (ey + ev) | 0));
            }
            ((this._a = (J + this._a) | 0),
              (this._b = (Q + this._b) | 0),
              (this._c = (ee + this._c) | 0),
              (this._d = (et + this._d) | 0),
              (this._e = (ei + this._e) | 0),
              (this._f = (en + this._f) | 0),
              (this._g = (ea + this._g) | 0),
              (this._h = (ef + this._h) | 0));
          }),
          (en.prototype._hash = function () {
            var $ = et.allocUnsafe(32);
            return (
              $.writeInt32BE(this._a, 0),
              $.writeInt32BE(this._b, 4),
              $.writeInt32BE(this._c, 8),
              $.writeInt32BE(this._d, 12),
              $.writeInt32BE(this._e, 16),
              $.writeInt32BE(this._f, 20),
              $.writeInt32BE(this._g, 24),
              $.writeInt32BE(this._h, 28),
              $
            );
          }),
          ($.exports = en));
      },
      3840: function ($, Y, J) {
        var Q = J(1638),
          ee = J(7921),
          et = J(1007),
          er = J(5725).Buffer,
          ei = Array(160);
        function en() {
          (this.init(), (this._w = ei), et.call(this, 128, 112));
        }
        (Q(en, ee),
          (en.prototype.init = function () {
            return (
              (this._ah = 0xcbbb9d5d),
              (this._bh = 0x629a292a),
              (this._ch = 0x9159015a),
              (this._dh = 0x152fecd8),
              (this._eh = 0x67332667),
              (this._fh = 0x8eb44a87),
              (this._gh = 0xdb0c2e0d),
              (this._hh = 0x47b5481d),
              (this._al = 0xc1059ed8),
              (this._bl = 0x367cd507),
              (this._cl = 0x3070dd17),
              (this._dl = 0xf70e5939),
              (this._el = 0xffc00b31),
              (this._fl = 0x68581511),
              (this._gl = 0x64f98fa7),
              (this._hl = 0xbefa4fa4),
              this
            );
          }),
          (en.prototype._hash = function () {
            var $ = er.allocUnsafe(48);
            function Y(Y, J, Q) {
              ($.writeInt32BE(Y, Q), $.writeInt32BE(J, Q + 4));
            }
            return (
              Y(this._ah, this._al, 0),
              Y(this._bh, this._bl, 8),
              Y(this._ch, this._cl, 16),
              Y(this._dh, this._dl, 24),
              Y(this._eh, this._el, 32),
              Y(this._fh, this._fl, 40),
              $
            );
          }),
          ($.exports = en));
      },
      7921: function ($, Y, J) {
        var Q = J(1638),
          ee = J(1007),
          et = J(5725).Buffer,
          er = [
            0x428a2f98, 0xd728ae22, 0x71374491, 0x23ef65cd, 0xb5c0fbcf,
            0xec4d3b2f, 0xe9b5dba5, 0x8189dbbc, 0x3956c25b, 0xf348b538,
            0x59f111f1, 0xb605d019, 0x923f82a4, 0xaf194f9b, 0xab1c5ed5,
            0xda6d8118, 0xd807aa98, 0xa3030242, 0x12835b01, 0x45706fbe,
            0x243185be, 0x4ee4b28c, 0x550c7dc3, 0xd5ffb4e2, 0x72be5d74,
            0xf27b896f, 0x80deb1fe, 0x3b1696b1, 0x9bdc06a7, 0x25c71235,
            0xc19bf174, 0xcf692694, 0xe49b69c1, 0x9ef14ad2, 0xefbe4786,
            0x384f25e3, 0xfc19dc6, 0x8b8cd5b5, 0x240ca1cc, 0x77ac9c65,
            0x2de92c6f, 0x592b0275, 0x4a7484aa, 0x6ea6e483, 0x5cb0a9dc,
            0xbd41fbd4, 0x76f988da, 0x831153b5, 0x983e5152, 0xee66dfab,
            0xa831c66d, 0x2db43210, 0xb00327c8, 0x98fb213f, 0xbf597fc7,
            0xbeef0ee4, 0xc6e00bf3, 0x3da88fc2, 0xd5a79147, 0x930aa725,
            0x6ca6351, 0xe003826f, 0x14292967, 0xa0e6e70, 0x27b70a85,
            0x46d22ffc, 0x2e1b2138, 0x5c26c926, 0x4d2c6dfc, 0x5ac42aed,
            0x53380d13, 0x9d95b3df, 0x650a7354, 0x8baf63de, 0x766a0abb,
            0x3c77b2a8, 0x81c2c92e, 0x47edaee6, 0x92722c85, 0x1482353b,
            0xa2bfe8a1, 0x4cf10364, 0xa81a664b, 0xbc423001, 0xc24b8b70,
            0xd0f89791, 0xc76c51a3, 0x654be30, 0xd192e819, 0xd6ef5218,
            0xd6990624, 0x5565a910, 0xf40e3585, 0x5771202a, 0x106aa070,
            0x32bbd1b8, 0x19a4c116, 0xb8d2d0c8, 0x1e376c08, 0x5141ab53,
            0x2748774c, 0xdf8eeb99, 0x34b0bcb5, 0xe19b48a8, 0x391c0cb3,
            0xc5c95a63, 0x4ed8aa4a, 0xe3418acb, 0x5b9cca4f, 0x7763e373,
            0x682e6ff3, 0xd6b2b8a3, 0x748f82ee, 0x5defb2fc, 0x78a5636f,
            0x43172f60, 0x84c87814, 0xa1f0ab72, 0x8cc70208, 0x1a6439ec,
            0x90befffa, 0x23631e28, 0xa4506ceb, 0xde82bde9, 0xbef9a3f7,
            0xb2c67915, 0xc67178f2, 0xe372532b, 0xca273ece, 0xea26619c,
            0xd186b8c7, 0x21c0c207, 0xeada7dd6, 0xcde0eb1e, 0xf57d4f7f,
            0xee6ed178, 0x6f067aa, 0x72176fba, 0xa637dc5, 0xa2c898a6,
            0x113f9804, 0xbef90dae, 0x1b710b35, 0x131c471b, 0x28db77f5,
            0x23047d84, 0x32caab7b, 0x40c72493, 0x3c9ebe0a, 0x15c9bebc,
            0x431d67c4, 0x9c100d4c, 0x4cc5d4be, 0xcb3e42b6, 0x597f299c,
            0xfc657e2a, 0x5fcb6fab, 0x3ad6faec, 0x6c44198c, 0x4a475817,
          ],
          ei = Array(160);
        function en() {
          (this.init(), (this._w = ei), ee.call(this, 128, 112));
        }
        function ea($, Y) {
          return (
            (($ >>> 28) | (Y << 4)) ^
            ((Y >>> 2) | ($ << 30)) ^
            ((Y >>> 7) | ($ << 25))
          );
        }
        function ef($, Y) {
          return (
            (($ >>> 14) | (Y << 18)) ^
            (($ >>> 18) | (Y << 14)) ^
            ((Y >>> 9) | ($ << 23))
          );
        }
        function eo($, Y) {
          return +($ >>> 0 < Y >>> 0);
        }
        (Q(en, ee),
          (en.prototype.init = function () {
            return (
              (this._ah = 0x6a09e667),
              (this._bh = 0xbb67ae85),
              (this._ch = 0x3c6ef372),
              (this._dh = 0xa54ff53a),
              (this._eh = 0x510e527f),
              (this._fh = 0x9b05688c),
              (this._gh = 0x1f83d9ab),
              (this._hh = 0x5be0cd19),
              (this._al = 0xf3bcc908),
              (this._bl = 0x84caa73b),
              (this._cl = 0xfe94f82b),
              (this._dl = 0x5f1d36f1),
              (this._el = 0xade682d1),
              (this._fl = 0x2b3e6c1f),
              (this._gl = 0xfb41bd6b),
              (this._hl = 0x137e2179),
              this
            );
          }),
          (en.prototype._update = function ($) {
            for (
              var Y = this._w,
                J = 0 | this._ah,
                Q = 0 | this._bh,
                ee = 0 | this._ch,
                et = 0 | this._dh,
                ei = 0 | this._eh,
                en = 0 | this._fh,
                es = 0 | this._gh,
                eh = 0 | this._hh,
                ed = 0 | this._al,
                ec = 0 | this._bl,
                eu = 0 | this._cl,
                el = 0 | this._dl,
                ep = 0 | this._el,
                eb = 0 | this._fl,
                em = 0 | this._gl,
                eg = 0 | this._hl,
                ey = 0;
              ey < 32;
              ey += 2
            )
              ((Y[ey] = $.readInt32BE(4 * ey)),
                (Y[ey + 1] = $.readInt32BE(4 * ey + 4)));
            for (; ey < 160; ey += 2) {
              var ev,
                e_,
                ew,
                ex,
                eM,
                eS,
                eE,
                ek,
                eA = Y[ey - 30],
                eR = Y[ey - 30 + 1],
                eI =
                  (((ev = eA) >>> 1) | ((e_ = eR) << 31)) ^
                  ((ev >>> 8) | (e_ << 24)) ^
                  (ev >>> 7),
                eB =
                  (((ew = eR) >>> 1) | ((ex = eA) << 31)) ^
                  ((ew >>> 8) | (ex << 24)) ^
                  ((ew >>> 7) | (ex << 25));
              ((eA = Y[ey - 4]), (eR = Y[ey - 4 + 1]));
              var eT =
                  (((eM = eA) >>> 19) | ((eS = eR) << 13)) ^
                  ((eS >>> 29) | (eM << 3)) ^
                  (eM >>> 6),
                eP =
                  (((eE = eR) >>> 19) | ((ek = eA) << 13)) ^
                  ((ek >>> 29) | (eE << 3)) ^
                  ((eE >>> 6) | (ek << 26)),
                eO = Y[ey - 14],
                eC = Y[ey - 14 + 1],
                eN = Y[ey - 32],
                ej = Y[ey - 32 + 1],
                eD = (eB + eC) | 0,
                eL = (eI + eO + eo(eD, eB)) | 0;
              ((eL =
                ((eL = (eL + eT + eo((eD = (eD + eP) | 0), eP)) | 0) +
                  eN +
                  eo((eD = (eD + ej) | 0), ej)) |
                0),
                (Y[ey] = eL),
                (Y[ey + 1] = eD));
            }
            for (var eq = 0; eq < 160; eq += 2) {
              ((eL = Y[eq]), (eD = Y[eq + 1]));
              var eU,
                ez,
                eF,
                eH,
                eK,
                eW,
                eV,
                eZ,
                eG,
                eX,
                e$ = ((eU = J) & (ez = Q)) | (ee & (eU | ez)),
                eY = ((eF = ed) & (eH = ec)) | (eu & (eF | eH)),
                eJ = ea(J, ed),
                eQ = ea(ed, J),
                e0 = ef(ei, ep),
                e1 = ef(ep, ei),
                e2 = er[eq],
                e6 = er[eq + 1],
                e3 = ((eK = ei), (eW = en), (eV = es) ^ (eK & (eW ^ eV))),
                e4 = ((eZ = ep), (eG = eb), (eX = em) ^ (eZ & (eG ^ eX))),
                e8 = (eg + e1) | 0,
                e5 = (eh + e0 + eo(e8, eg)) | 0;
              e5 =
                ((e5 =
                  ((e5 = (e5 + e3 + eo((e8 = (e8 + e4) | 0), e4)) | 0) +
                    e2 +
                    eo((e8 = (e8 + e6) | 0), e6)) |
                  0) +
                  eL +
                  eo((e8 = (e8 + eD) | 0), eD)) |
                0;
              var e9 = (eQ + eY) | 0,
                e7 = (eJ + e$ + eo(e9, eQ)) | 0;
              ((eh = es),
                (eg = em),
                (es = en),
                (em = eb),
                (en = ei),
                (eb = ep),
                (ei = (et + e5 + eo((ep = (el + e8) | 0), el)) | 0),
                (et = ee),
                (el = eu),
                (ee = Q),
                (eu = ec),
                (Q = J),
                (ec = ed),
                (J = (e5 + e7 + eo((ed = (e8 + e9) | 0), e8)) | 0));
            }
            ((this._al = (this._al + ed) | 0),
              (this._bl = (this._bl + ec) | 0),
              (this._cl = (this._cl + eu) | 0),
              (this._dl = (this._dl + el) | 0),
              (this._el = (this._el + ep) | 0),
              (this._fl = (this._fl + eb) | 0),
              (this._gl = (this._gl + em) | 0),
              (this._hl = (this._hl + eg) | 0),
              (this._ah = (this._ah + J + eo(this._al, ed)) | 0),
              (this._bh = (this._bh + Q + eo(this._bl, ec)) | 0),
              (this._ch = (this._ch + ee + eo(this._cl, eu)) | 0),
              (this._dh = (this._dh + et + eo(this._dl, el)) | 0),
              (this._eh = (this._eh + ei + eo(this._el, ep)) | 0),
              (this._fh = (this._fh + en + eo(this._fl, eb)) | 0),
              (this._gh = (this._gh + es + eo(this._gl, em)) | 0),
              (this._hh = (this._hh + eh + eo(this._hl, eg)) | 0));
          }),
          (en.prototype._hash = function () {
            var $ = et.allocUnsafe(64);
            function Y(Y, J, Q) {
              ($.writeInt32BE(Y, Q), $.writeInt32BE(J, Q + 4));
            }
            return (
              Y(this._ah, this._al, 0),
              Y(this._bh, this._bl, 8),
              Y(this._ch, this._cl, 16),
              Y(this._dh, this._dl, 24),
              Y(this._eh, this._el, 32),
              Y(this._fh, this._fl, 40),
              Y(this._gh, this._gl, 48),
              Y(this._hh, this._hl, 56),
              $
            );
          }),
          ($.exports = en));
      },
      7319: function ($, Y, J) {
        "use strict";
        var Q = J(5056).Buffer,
          ee =
            Q.isEncoding ||
            function ($) {
              switch (($ = "" + $) && $.toLowerCase()) {
                case "hex":
                case "utf8":
                case "utf-8":
                case "ascii":
                case "binary":
                case "base64":
                case "ucs2":
                case "ucs-2":
                case "utf16le":
                case "utf-16le":
                case "raw":
                  return !0;
                default:
                  return !1;
              }
            };
        function et($) {
          var Y;
          switch (
            ((this.encoding = (function ($) {
              var Y = (function ($) {
                var Y;
                if (!$) return "utf8";
                for (;;)
                  switch ($) {
                    case "utf8":
                    case "utf-8":
                      return "utf8";
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                      return "utf16le";
                    case "latin1":
                    case "binary":
                      return "latin1";
                    case "base64":
                    case "ascii":
                    case "hex":
                      return $;
                    default:
                      if (Y) return;
                      (($ = ("" + $).toLowerCase()), (Y = !0));
                  }
              })($);
              if ("string" != typeof Y && (Q.isEncoding === ee || !ee($)))
                throw Error("Unknown encoding: " + $);
              return Y || $;
            })($)),
            this.encoding)
          ) {
            case "utf16le":
              ((this.text = en), (this.end = ea), (Y = 4));
              break;
            case "utf8":
              ((this.fillLast = ei), (Y = 4));
              break;
            case "base64":
              ((this.text = ef), (this.end = eo), (Y = 3));
              break;
            default:
              ((this.write = es), (this.end = eh));
              return;
          }
          ((this.lastNeed = 0),
            (this.lastTotal = 0),
            (this.lastChar = Q.allocUnsafe(Y)));
        }
        function er($) {
          return $ <= 127
            ? 0
            : $ >> 5 == 6
              ? 2
              : $ >> 4 == 14
                ? 3
                : $ >> 3 == 30
                  ? 4
                  : $ >> 6 == 2
                    ? -1
                    : -2;
        }
        function ei($) {
          var Y = this.lastTotal - this.lastNeed,
            J = (function ($, Y) {
              if ((192 & Y[0]) != 128) return (($.lastNeed = 0), "�");
              if ($.lastNeed > 1 && Y.length > 1) {
                if ((192 & Y[1]) != 128) return (($.lastNeed = 1), "�");
                if ($.lastNeed > 2 && Y.length > 2 && (192 & Y[2]) != 128)
                  return (($.lastNeed = 2), "�");
              }
            })(this, $);
          return void 0 !== J
            ? J
            : this.lastNeed <= $.length
              ? ($.copy(this.lastChar, Y, 0, this.lastNeed),
                this.lastChar.toString(this.encoding, 0, this.lastTotal))
              : void ($.copy(this.lastChar, Y, 0, $.length),
                (this.lastNeed -= $.length));
        }
        function en($, Y) {
          if (($.length - Y) % 2 == 0) {
            var J = $.toString("utf16le", Y);
            if (J) {
              var Q = J.charCodeAt(J.length - 1);
              if (Q >= 55296 && Q <= 56319)
                return (
                  (this.lastNeed = 2),
                  (this.lastTotal = 4),
                  (this.lastChar[0] = $[$.length - 2]),
                  (this.lastChar[1] = $[$.length - 1]),
                  J.slice(0, -1)
                );
            }
            return J;
          }
          return (
            (this.lastNeed = 1),
            (this.lastTotal = 2),
            (this.lastChar[0] = $[$.length - 1]),
            $.toString("utf16le", Y, $.length - 1)
          );
        }
        function ea($) {
          var Y = $ && $.length ? this.write($) : "";
          if (this.lastNeed) {
            var J = this.lastTotal - this.lastNeed;
            return Y + this.lastChar.toString("utf16le", 0, J);
          }
          return Y;
        }
        function ef($, Y) {
          var J = ($.length - Y) % 3;
          return 0 === J
            ? $.toString("base64", Y)
            : ((this.lastNeed = 3 - J),
              (this.lastTotal = 3),
              1 === J
                ? (this.lastChar[0] = $[$.length - 1])
                : ((this.lastChar[0] = $[$.length - 2]),
                  (this.lastChar[1] = $[$.length - 1])),
              $.toString("base64", Y, $.length - J));
        }
        function eo($) {
          var Y = $ && $.length ? this.write($) : "";
          return this.lastNeed
            ? Y + this.lastChar.toString("base64", 0, 3 - this.lastNeed)
            : Y;
        }
        function es($) {
          return $.toString(this.encoding);
        }
        function eh($) {
          return $ && $.length ? this.write($) : "";
        }
        ((Y.I = et),
          (et.prototype.write = function ($) {
            var Y, J;
            if (0 === $.length) return "";
            if (this.lastNeed) {
              if (void 0 === (Y = this.fillLast($))) return "";
              ((J = this.lastNeed), (this.lastNeed = 0));
            } else J = 0;
            return J < $.length
              ? Y
                ? Y + this.text($, J)
                : this.text($, J)
              : Y || "";
          }),
          (et.prototype.end = function ($) {
            var Y = $ && $.length ? this.write($) : "";
            return this.lastNeed ? Y + "�" : Y;
          }),
          (et.prototype.text = function ($, Y) {
            var J = (function ($, Y, J) {
              var Q = Y.length - 1;
              if (Q < J) return 0;
              var ee = er(Y[Q]);
              return ee >= 0
                ? (ee > 0 && ($.lastNeed = ee - 1), ee)
                : --Q < J || -2 === ee
                  ? 0
                  : (ee = er(Y[Q])) >= 0
                    ? (ee > 0 && ($.lastNeed = ee - 2), ee)
                    : --Q < J || -2 === ee
                      ? 0
                      : (ee = er(Y[Q])) >= 0
                        ? (ee > 0 &&
                            (2 === ee ? (ee = 0) : ($.lastNeed = ee - 3)),
                          ee)
                        : 0;
            })(this, $, Y);
            if (!this.lastNeed) return $.toString("utf8", Y);
            this.lastTotal = J;
            var Q = $.length - (J - this.lastNeed);
            return ($.copy(this.lastChar, 0, Q), $.toString("utf8", Y, Q));
          }),
          (et.prototype.fillLast = function ($) {
            if (this.lastNeed <= $.length)
              return (
                $.copy(
                  this.lastChar,
                  this.lastTotal - this.lastNeed,
                  0,
                  this.lastNeed,
                ),
                this.lastChar.toString(this.encoding, 0, this.lastTotal)
              );
            ($.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, $.length),
              (this.lastNeed -= $.length));
          }));
      },
      4774: function (Y) {
        Y.exports = function ($, Y) {
          if (J("noDeprecation")) return $;
          var Q = !1;
          return function () {
            if (!Q) {
              if (J("throwDeprecation")) throw Error(Y);
              (J("traceDeprecation") ? console.trace(Y) : console.warn(Y),
                (Q = !0));
            }
            return $.apply(this, arguments);
          };
        };
        function J(Y) {
          try {
            if (!$.g.localStorage) return !1;
          } catch ($) {
            return !1;
          }
          var J = $.g.localStorage[Y];
          return null != J && "true" === String(J).toLowerCase();
        }
      },
      181: function (Y) {
        "use strict";
        Y.exports = $.r(259390);
      },
      6982: function (Y) {
        "use strict";
        Y.exports = $.r(489442);
      },
      4434: function (Y) {
        "use strict";
        Y.exports = $.r(679877);
      },
      2203: function (Y) {
        "use strict";
        Y.exports = $.r(636185);
      },
      3193: function (Y) {
        "use strict";
        Y.exports = $.r(924753);
      },
      9023: function (Y) {
        "use strict";
        Y.exports = $.r(824885);
      },
      9154: function (Y) {
        "use strict";
        Y.exports = $.r(757150);
      },
      3349: function ($) {
        "use strict";
        $.exports = JSON.parse(
          '{"aes-128-ecb":{"cipher":"AES","key":128,"iv":0,"mode":"ECB","type":"block"},"aes-192-ecb":{"cipher":"AES","key":192,"iv":0,"mode":"ECB","type":"block"},"aes-256-ecb":{"cipher":"AES","key":256,"iv":0,"mode":"ECB","type":"block"},"aes-128-cbc":{"cipher":"AES","key":128,"iv":16,"mode":"CBC","type":"block"},"aes-192-cbc":{"cipher":"AES","key":192,"iv":16,"mode":"CBC","type":"block"},"aes-256-cbc":{"cipher":"AES","key":256,"iv":16,"mode":"CBC","type":"block"},"aes128":{"cipher":"AES","key":128,"iv":16,"mode":"CBC","type":"block"},"aes192":{"cipher":"AES","key":192,"iv":16,"mode":"CBC","type":"block"},"aes256":{"cipher":"AES","key":256,"iv":16,"mode":"CBC","type":"block"},"aes-128-cfb":{"cipher":"AES","key":128,"iv":16,"mode":"CFB","type":"stream"},"aes-192-cfb":{"cipher":"AES","key":192,"iv":16,"mode":"CFB","type":"stream"},"aes-256-cfb":{"cipher":"AES","key":256,"iv":16,"mode":"CFB","type":"stream"},"aes-128-cfb8":{"cipher":"AES","key":128,"iv":16,"mode":"CFB8","type":"stream"},"aes-192-cfb8":{"cipher":"AES","key":192,"iv":16,"mode":"CFB8","type":"stream"},"aes-256-cfb8":{"cipher":"AES","key":256,"iv":16,"mode":"CFB8","type":"stream"},"aes-128-cfb1":{"cipher":"AES","key":128,"iv":16,"mode":"CFB1","type":"stream"},"aes-192-cfb1":{"cipher":"AES","key":192,"iv":16,"mode":"CFB1","type":"stream"},"aes-256-cfb1":{"cipher":"AES","key":256,"iv":16,"mode":"CFB1","type":"stream"},"aes-128-ofb":{"cipher":"AES","key":128,"iv":16,"mode":"OFB","type":"stream"},"aes-192-ofb":{"cipher":"AES","key":192,"iv":16,"mode":"OFB","type":"stream"},"aes-256-ofb":{"cipher":"AES","key":256,"iv":16,"mode":"OFB","type":"stream"},"aes-128-ctr":{"cipher":"AES","key":128,"iv":16,"mode":"CTR","type":"stream"},"aes-192-ctr":{"cipher":"AES","key":192,"iv":16,"mode":"CTR","type":"stream"},"aes-256-ctr":{"cipher":"AES","key":256,"iv":16,"mode":"CTR","type":"stream"},"aes-128-gcm":{"cipher":"AES","key":128,"iv":12,"mode":"GCM","type":"auth"},"aes-192-gcm":{"cipher":"AES","key":192,"iv":12,"mode":"GCM","type":"auth"},"aes-256-gcm":{"cipher":"AES","key":256,"iv":12,"mode":"GCM","type":"auth"}}',
        );
      },
      3678: function ($) {
        "use strict";
        $.exports = JSON.parse(
          '{"sha224WithRSAEncryption":{"sign":"rsa","hash":"sha224","id":"302d300d06096086480165030402040500041c"},"RSA-SHA224":{"sign":"ecdsa/rsa","hash":"sha224","id":"302d300d06096086480165030402040500041c"},"sha256WithRSAEncryption":{"sign":"rsa","hash":"sha256","id":"3031300d060960864801650304020105000420"},"RSA-SHA256":{"sign":"ecdsa/rsa","hash":"sha256","id":"3031300d060960864801650304020105000420"},"sha384WithRSAEncryption":{"sign":"rsa","hash":"sha384","id":"3041300d060960864801650304020205000430"},"RSA-SHA384":{"sign":"ecdsa/rsa","hash":"sha384","id":"3041300d060960864801650304020205000430"},"sha512WithRSAEncryption":{"sign":"rsa","hash":"sha512","id":"3051300d060960864801650304020305000440"},"RSA-SHA512":{"sign":"ecdsa/rsa","hash":"sha512","id":"3051300d060960864801650304020305000440"},"RSA-SHA1":{"sign":"rsa","hash":"sha1","id":"3021300906052b0e03021a05000414"},"ecdsa-with-SHA1":{"sign":"ecdsa","hash":"sha1","id":""},"sha256":{"sign":"ecdsa","hash":"sha256","id":""},"sha224":{"sign":"ecdsa","hash":"sha224","id":""},"sha384":{"sign":"ecdsa","hash":"sha384","id":""},"sha512":{"sign":"ecdsa","hash":"sha512","id":""},"DSA-SHA":{"sign":"dsa","hash":"sha1","id":""},"DSA-SHA1":{"sign":"dsa","hash":"sha1","id":""},"DSA":{"sign":"dsa","hash":"sha1","id":""},"DSA-WITH-SHA224":{"sign":"dsa","hash":"sha224","id":""},"DSA-SHA224":{"sign":"dsa","hash":"sha224","id":""},"DSA-WITH-SHA256":{"sign":"dsa","hash":"sha256","id":""},"DSA-SHA256":{"sign":"dsa","hash":"sha256","id":""},"DSA-WITH-SHA384":{"sign":"dsa","hash":"sha384","id":""},"DSA-SHA384":{"sign":"dsa","hash":"sha384","id":""},"DSA-WITH-SHA512":{"sign":"dsa","hash":"sha512","id":""},"DSA-SHA512":{"sign":"dsa","hash":"sha512","id":""},"DSA-RIPEMD160":{"sign":"dsa","hash":"rmd160","id":""},"ripemd160WithRSA":{"sign":"rsa","hash":"rmd160","id":"3021300906052b2403020105000414"},"RSA-RIPEMD160":{"sign":"rsa","hash":"rmd160","id":"3021300906052b2403020105000414"},"md5WithRSAEncryption":{"sign":"rsa","hash":"md5","id":"3020300c06082a864886f70d020505000410"},"RSA-MD5":{"sign":"rsa","hash":"md5","id":"3020300c06082a864886f70d020505000410"}}',
        );
      },
      6456: function ($) {
        "use strict";
        $.exports = JSON.parse(
          '{"1.3.132.0.10":"secp256k1","1.3.132.0.33":"p224","1.2.840.10045.3.1.1":"p192","1.2.840.10045.3.1.7":"p256","1.3.132.0.34":"p384","1.3.132.0.35":"p521"}',
        );
      },
      7821: function ($) {
        "use strict";
        $.exports = JSON.parse(
          '{"modp1":{"gen":"02","prime":"ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a63a3620ffffffffffffffff"},"modp2":{"gen":"02","prime":"ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece65381ffffffffffffffff"},"modp5":{"gen":"02","prime":"ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca237327ffffffffffffffff"},"modp14":{"gen":"02","prime":"ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca18217c32905e462e36ce3be39e772c180e86039b2783a2ec07a28fb5c55df06f4c52c9de2bcbf6955817183995497cea956ae515d2261898fa051015728e5a8aacaa68ffffffffffffffff"},"modp15":{"gen":"02","prime":"ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca18217c32905e462e36ce3be39e772c180e86039b2783a2ec07a28fb5c55df06f4c52c9de2bcbf6955817183995497cea956ae515d2261898fa051015728e5a8aaac42dad33170d04507a33a85521abdf1cba64ecfb850458dbef0a8aea71575d060c7db3970f85a6e1e4c7abf5ae8cdb0933d71e8c94e04a25619dcee3d2261ad2ee6bf12ffa06d98a0864d87602733ec86a64521f2b18177b200cbbe117577a615d6c770988c0bad946e208e24fa074e5ab3143db5bfce0fd108e4b82d120a93ad2caffffffffffffffff"},"modp16":{"gen":"02","prime":"ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca18217c32905e462e36ce3be39e772c180e86039b2783a2ec07a28fb5c55df06f4c52c9de2bcbf6955817183995497cea956ae515d2261898fa051015728e5a8aaac42dad33170d04507a33a85521abdf1cba64ecfb850458dbef0a8aea71575d060c7db3970f85a6e1e4c7abf5ae8cdb0933d71e8c94e04a25619dcee3d2261ad2ee6bf12ffa06d98a0864d87602733ec86a64521f2b18177b200cbbe117577a615d6c770988c0bad946e208e24fa074e5ab3143db5bfce0fd108e4b82d120a92108011a723c12a787e6d788719a10bdba5b2699c327186af4e23c1a946834b6150bda2583e9ca2ad44ce8dbbbc2db04de8ef92e8efc141fbecaa6287c59474e6bc05d99b2964fa090c3a2233ba186515be7ed1f612970cee2d7afb81bdd762170481cd0069127d5b05aa993b4ea988d8fddc186ffb7dc90a6c08f4df435c934063199ffffffffffffffff"},"modp17":{"gen":"02","prime":"ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca18217c32905e462e36ce3be39e772c180e86039b2783a2ec07a28fb5c55df06f4c52c9de2bcbf6955817183995497cea956ae515d2261898fa051015728e5a8aaac42dad33170d04507a33a85521abdf1cba64ecfb850458dbef0a8aea71575d060c7db3970f85a6e1e4c7abf5ae8cdb0933d71e8c94e04a25619dcee3d2261ad2ee6bf12ffa06d98a0864d87602733ec86a64521f2b18177b200cbbe117577a615d6c770988c0bad946e208e24fa074e5ab3143db5bfce0fd108e4b82d120a92108011a723c12a787e6d788719a10bdba5b2699c327186af4e23c1a946834b6150bda2583e9ca2ad44ce8dbbbc2db04de8ef92e8efc141fbecaa6287c59474e6bc05d99b2964fa090c3a2233ba186515be7ed1f612970cee2d7afb81bdd762170481cd0069127d5b05aa993b4ea988d8fddc186ffb7dc90a6c08f4df435c93402849236c3fab4d27c7026c1d4dcb2602646dec9751e763dba37bdf8ff9406ad9e530ee5db382f413001aeb06a53ed9027d831179727b0865a8918da3edbebcf9b14ed44ce6cbaced4bb1bdb7f1447e6cc254b332051512bd7af426fb8f401378cd2bf5983ca01c64b92ecf032ea15d1721d03f482d7ce6e74fef6d55e702f46980c82b5a84031900b1c9e59e7c97fbec7e8f323a97a7e36cc88be0f1d45b7ff585ac54bd407b22b4154aacc8f6d7ebf48e1d814cc5ed20f8037e0a79715eef29be32806a1d58bb7c5da76f550aa3d8a1fbff0eb19ccb1a313d55cda56c9ec2ef29632387fe8d76e3c0468043e8f663f4860ee12bf2d5b0b7474d6e694f91e6dcc4024ffffffffffffffff"},"modp18":{"gen":"02","prime":"ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca18217c32905e462e36ce3be39e772c180e86039b2783a2ec07a28fb5c55df06f4c52c9de2bcbf6955817183995497cea956ae515d2261898fa051015728e5a8aaac42dad33170d04507a33a85521abdf1cba64ecfb850458dbef0a8aea71575d060c7db3970f85a6e1e4c7abf5ae8cdb0933d71e8c94e04a25619dcee3d2261ad2ee6bf12ffa06d98a0864d87602733ec86a64521f2b18177b200cbbe117577a615d6c770988c0bad946e208e24fa074e5ab3143db5bfce0fd108e4b82d120a92108011a723c12a787e6d788719a10bdba5b2699c327186af4e23c1a946834b6150bda2583e9ca2ad44ce8dbbbc2db04de8ef92e8efc141fbecaa6287c59474e6bc05d99b2964fa090c3a2233ba186515be7ed1f612970cee2d7afb81bdd762170481cd0069127d5b05aa993b4ea988d8fddc186ffb7dc90a6c08f4df435c93402849236c3fab4d27c7026c1d4dcb2602646dec9751e763dba37bdf8ff9406ad9e530ee5db382f413001aeb06a53ed9027d831179727b0865a8918da3edbebcf9b14ed44ce6cbaced4bb1bdb7f1447e6cc254b332051512bd7af426fb8f401378cd2bf5983ca01c64b92ecf032ea15d1721d03f482d7ce6e74fef6d55e702f46980c82b5a84031900b1c9e59e7c97fbec7e8f323a97a7e36cc88be0f1d45b7ff585ac54bd407b22b4154aacc8f6d7ebf48e1d814cc5ed20f8037e0a79715eef29be32806a1d58bb7c5da76f550aa3d8a1fbff0eb19ccb1a313d55cda56c9ec2ef29632387fe8d76e3c0468043e8f663f4860ee12bf2d5b0b7474d6e694f91e6dbe115974a3926f12fee5e438777cb6a932df8cd8bec4d073b931ba3bc832b68d9dd300741fa7bf8afc47ed2576f6936ba424663aab639c5ae4f5683423b4742bf1c978238f16cbe39d652de3fdb8befc848ad922222e04a4037c0713eb57a81a23f0c73473fc646cea306b4bcbc8862f8385ddfa9d4b7fa2c087e879683303ed5bdd3a062b3cf5b3a278a66d2a13f83f44f82ddf310ee074ab6a364597e899a0255dc164f31cc50846851df9ab48195ded7ea1b1d510bd7ee74d73faf36bc31ecfa268359046f4eb879f924009438b481c6cd7889a002ed5ee382bc9190da6fc026e479558e4475677e9aa9e3050e2765694dfc81f56e880b96e7160c980dd98edd3dfffffffffffffffff"}}',
        );
      },
      4497: function ($) {
        "use strict";
        $.exports = { rE: "6.5.3" };
      },
      7016: function ($) {
        "use strict";
        $.exports = JSON.parse(
          '{"2.16.840.1.101.3.4.1.1":"aes-128-ecb","2.16.840.1.101.3.4.1.2":"aes-128-cbc","2.16.840.1.101.3.4.1.3":"aes-128-ofb","2.16.840.1.101.3.4.1.4":"aes-128-cfb","2.16.840.1.101.3.4.1.21":"aes-192-ecb","2.16.840.1.101.3.4.1.22":"aes-192-cbc","2.16.840.1.101.3.4.1.23":"aes-192-ofb","2.16.840.1.101.3.4.1.24":"aes-192-cfb","2.16.840.1.101.3.4.1.41":"aes-256-ecb","2.16.840.1.101.3.4.1.42":"aes-256-cbc","2.16.840.1.101.3.4.1.43":"aes-256-ofb","2.16.840.1.101.3.4.1.44":"aes-256-cfb"}',
        );
      },
    },
    er = {};
  function ei($) {
    var Y = er[$];
    if (void 0 !== Y) return Y.exports;
    var J = (er[$] = { id: $, loaded: !1, exports: {} }),
      Q = !0;
    try {
      (et[$].call(J.exports, J, J.exports, ei), (Q = !1));
    } finally {
      Q && delete er[$];
    }
    return ((J.loaded = !0), J.exports);
  }
  ((ei.nmd = function ($) {
    return (($.paths = []), $.children || ($.children = []), $);
  }),
    (ei.ab =
      "/ROOT/node_modules/.pnpm/next@16.4.1_@babel+core@7.29.0_@opentelemetry+api@1.9.1_@playwright+test@1.49.1_@types+_bcb9db139f81fdd5b4a85697a943afb2/node_modules/next/dist/compiled/crypto-browserify/"));
  var en = {};
  (!(function () {
    "use strict";
    ((en.randomBytes = en.rng = en.pseudoRandomBytes = en.prng = ei(376)),
      (en.createHash = en.Hash = ei(762)),
      (en.createHmac = en.Hmac = ei(3256)));
    var $ = [
      "sha1",
      "sha224",
      "sha256",
      "sha384",
      "sha512",
      "md5",
      "rmd160",
    ].concat(Object.keys(ei(6713)));
    en.getHashes = function () {
      return $;
    };
    var Y = ei(4542);
    ((en.pbkdf2 = Y.pbkdf2), (en.pbkdf2Sync = Y.pbkdf2Sync));
    var J = ei(9131);
    ((en.Cipher = J.Cipher),
      (en.createCipher = J.createCipher),
      (en.Cipheriv = J.Cipheriv),
      (en.createCipheriv = J.createCipheriv),
      (en.Decipher = J.Decipher),
      (en.createDecipher = J.createDecipher),
      (en.Decipheriv = J.Decipheriv),
      (en.createDecipheriv = J.createDecipheriv),
      (en.getCiphers = J.getCiphers),
      (en.listCiphers = J.listCiphers));
    var Q = ei(857);
    ((en.DiffieHellmanGroup = Q.DiffieHellmanGroup),
      (en.createDiffieHellmanGroup = Q.createDiffieHellmanGroup),
      (en.getDiffieHellman = Q.getDiffieHellman),
      (en.createDiffieHellman = Q.createDiffieHellman),
      (en.DiffieHellman = Q.DiffieHellman));
    var ee = ei(2926);
    ((en.createSign = ee.createSign),
      (en.Sign = ee.Sign),
      (en.createVerify = ee.createVerify),
      (en.Verify = ee.Verify),
      (en.createECDH = ei(8814)));
    var et = ei(6734);
    ((en.publicEncrypt = et.publicEncrypt),
      (en.privateEncrypt = et.privateEncrypt),
      (en.publicDecrypt = et.publicDecrypt),
      (en.privateDecrypt = et.privateDecrypt));
    var er = ei(236);
    ((en.randomFill = er.randomFill),
      (en.randomFillSync = er.randomFillSync),
      (en.createCredentials = function () {
        throw Error(
          "sorry, createCredentials is not implemented yet\nwe accept pull requests\nhttps://github.com/crypto-browserify/crypto-browserify",
        );
      }),
      (en.constants = {
        DH_CHECK_P_NOT_SAFE_PRIME: 2,
        DH_CHECK_P_NOT_PRIME: 1,
        DH_UNABLE_TO_CHECK_GENERATOR: 4,
        DH_NOT_SUITABLE_GENERATOR: 8,
        NPN_ENABLED: 1,
        ALPN_ENABLED: 1,
        RSA_PKCS1_PADDING: 1,
        RSA_SSLV23_PADDING: 2,
        RSA_NO_PADDING: 3,
        RSA_PKCS1_OAEP_PADDING: 4,
        RSA_X931_PADDING: 5,
        RSA_PKCS1_PSS_PADDING: 6,
        POINT_CONVERSION_COMPRESSED: 2,
        POINT_CONVERSION_UNCOMPRESSED: 4,
        POINT_CONVERSION_HYBRID: 6,
      }));
  })(),
    (Y.exports = en));
};
