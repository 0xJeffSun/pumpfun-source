// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
($, Y, J) => {
  "use strict";
  var Q = $.r(309870).Buffer,
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
  ((J.StringDecoder = et),
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
                  ? (ee > 0 && (2 === ee ? (ee = 0) : ($.lastNeed = ee - 3)),
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
};
