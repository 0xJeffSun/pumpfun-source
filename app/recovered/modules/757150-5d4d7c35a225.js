// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(__turbopack_context__, module, exports) => {
  !(function () {
    var __webpack_modules__ = {
      285: function (__unused_webpack_module, exports) {
        var indexOf = function ($, Y) {
            if ($.indexOf) return $.indexOf(Y);
            for (var J = 0; J < $.length; J++) if ($[J] === Y) return J;
            return -1;
          },
          Object_keys = function ($) {
            if (Object.keys) return Object.keys($);
            var Y = [];
            for (var J in $) Y.push(J);
            return Y;
          },
          forEach = function ($, Y) {
            if ($.forEach) return $.forEach(Y);
            for (var J = 0; J < $.length; J++) Y($[J], J, $);
          },
          defineProp = (function () {
            try {
              return (
                Object.defineProperty({}, "_", {}),
                function ($, Y, J) {
                  Object.defineProperty($, Y, {
                    writable: !0,
                    enumerable: !1,
                    configurable: !0,
                    value: J,
                  });
                }
              );
            } catch ($) {
              return function ($, Y, J) {
                $[Y] = J;
              };
            }
          })(),
          globals = [
            "Array",
            "Boolean",
            "Date",
            "Error",
            "EvalError",
            "Function",
            "Infinity",
            "JSON",
            "Math",
            "NaN",
            "Number",
            "Object",
            "RangeError",
            "ReferenceError",
            "RegExp",
            "String",
            "SyntaxError",
            "TypeError",
            "URIError",
            "decodeURI",
            "decodeURIComponent",
            "encodeURI",
            "encodeURIComponent",
            "escape",
            "eval",
            "isFinite",
            "isNaN",
            "parseFloat",
            "parseInt",
            "undefined",
            "unescape",
          ];
        function Context() {}
        Context.prototype = {};
        var Script = (exports.Script = function ($) {
          if (!(this instanceof Script)) return new Script($);
          this.code = $;
        });
        ((Script.prototype.runInContext = function ($) {
          if (!($ instanceof Context))
            throw TypeError("needs a 'context' argument.");
          var Y = document.createElement("iframe");
          (Y.style || (Y.style = {}),
            (Y.style.display = "none"),
            document.body.appendChild(Y));
          var J = Y.contentWindow,
            Q = J.eval,
            ee = J.execScript;
          (!Q && ee && (ee.call(J, "null"), (Q = J.eval)),
            forEach(Object_keys($), function (Y) {
              J[Y] = $[Y];
            }),
            forEach(globals, function (Y) {
              $[Y] && (J[Y] = $[Y]);
            }));
          var et = Object_keys(J),
            er = Q.call(J, this.code);
          return (
            forEach(Object_keys(J), function (Y) {
              (Y in $ || -1 === indexOf(et, Y)) && ($[Y] = J[Y]);
            }),
            forEach(globals, function (Y) {
              Y in $ || defineProp($, Y, J[Y]);
            }),
            document.body.removeChild(Y),
            er
          );
        }),
          (Script.prototype.runInThisContext = function () {
            return eval(this.code);
          }),
          (Script.prototype.runInNewContext = function ($) {
            var Y = Script.createContext($),
              J = this.runInContext(Y);
            return (
              $ &&
                forEach(Object_keys(Y), function (J) {
                  $[J] = Y[J];
                }),
              J
            );
          }),
          forEach(Object_keys(Script.prototype), function ($) {
            exports[$] = Script[$] = function (Y) {
              var J = Script(Y);
              return J[$].apply(J, [].slice.call(arguments, 1));
            };
          }),
          (exports.isContext = function ($) {
            return $ instanceof Context;
          }),
          (exports.createScript = function ($) {
            return exports.Script($);
          }),
          (exports.createContext = Script.createContext =
            function ($) {
              var Y = new Context();
              return (
                "object" == typeof $ &&
                  forEach(Object_keys($), function (J) {
                    Y[J] = $[J];
                  }),
                Y
              );
            }));
      },
    };
    "u" > typeof __nccwpck_require__ &&
      (__nccwpck_require__.ab =
        "/ROOT/node_modules/.pnpm/next@16.4.1_@babel+core@7.29.0_@opentelemetry+api@1.9.1_@playwright+test@1.49.1_@types+_bcb9db139f81fdd5b4a85697a943afb2/node_modules/next/dist/compiled/vm-browserify/");
    var __webpack_exports__ = {};
    (__webpack_modules__[285](0, __webpack_exports__),
      (module.exports = __webpack_exports__));
  })();
};
