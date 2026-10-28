// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, r, t) => {
  let s = e.r(247071);
  r.exports = (e, r) =>
    new s(e, r).set.map((e) =>
      e
        .map((e) => e.value)
        .join(" ")
        .trim()
        .split(" "),
    );
};
