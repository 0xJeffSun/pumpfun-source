// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(352386),
    r = 0;
  function n() {
    let e = document.createElement("span");
    return (
      e.setAttribute("data-radix-focus-guard", ""),
      (e.tabIndex = 0),
      (e.style.outline = "none"),
      (e.style.opacity = "0"),
      (e.style.position = "fixed"),
      (e.style.pointerEvents = "none"),
      e
    );
  }
  e.s([
    "f",
    0,
    function () {
      t.useEffect(() => {
        let e = document.querySelectorAll("[data-radix-focus-guard]");
        return (
          document.body.insertAdjacentElement("afterbegin", e[0] ?? n()),
          document.body.insertAdjacentElement("beforeend", e[1] ?? n()),
          r++,
          () => {
            (1 === r &&
              document
                .querySelectorAll("[data-radix-focus-guard]")
                .forEach((e) => e.remove()),
              r--);
          }
        );
      }, []);
    },
  ]);
};
