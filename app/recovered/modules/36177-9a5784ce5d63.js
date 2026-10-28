// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(234006);
  e.s([
    "D",
    0,
    function (e) {
      let t = e.type;
      return (
        "click" === t || "mousedown" === t || "keydown" === t || "keyup" === t
      );
    },
    "J",
    0,
    function (e, t) {
      let n = ["mouse", "pen"];
      return (t || n.push("", void 0), n.includes(e));
    },
    "M",
    0,
    function (e) {
      return "nativeEvent" in e;
    },
    "E",
    0,
    function (e) {
      return (
        ("" === e.pointerType && !!e.isTrusted) ||
        (t.B && e.pointerType
          ? "click" === e.type && 1 === e.buttons
          : 0 === e.detail && !e.pointerType)
      );
    },
    "$",
    0,
    function (e) {
      return (
        !t.S &&
        ((!t.B && 0 === e.width && 0 === e.height) ||
          (t.B &&
            1 === e.width &&
            1 === e.height &&
            0 === e.pressure &&
            0 === e.detail &&
            "mouse" === e.pointerType) ||
          (e.width < 1 &&
            e.height < 1 &&
            0 === e.pressure &&
            0 === e.detail &&
            "touch" === e.pointerType))
      );
    },
    "Y",
    0,
    function (e) {
      (e.preventDefault(), e.stopPropagation());
    },
  ]);
};
