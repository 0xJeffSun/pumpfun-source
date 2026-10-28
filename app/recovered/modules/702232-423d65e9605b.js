// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t = function (e, ...t) {
    let n = new URL("https://base-ui.com/production-error");
    return (
      n.searchParams.set("code", e.toString()),
      t.forEach((e) => n.searchParams.append("args[]", e)),
      `Base UI error #${e}; visit ${n} for the full message.`
    );
  };
  e.s(["f", 0, t], 702232);
  let n = parseInt(e.i(352386).version, 10);
  e.s(
    [
      "f",
      0,
      function (e) {
        return n >= e;
      },
    ],
    189572,
  );
};
