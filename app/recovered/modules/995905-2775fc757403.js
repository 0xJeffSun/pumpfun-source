// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t) => {
  let e = (t) => (e) => "string" == typeof e && e.startsWith(t),
    i = e("--"),
    s = e("var(--"),
    r =
      /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;
  t.s([
    "t",
    0,
    function (t) {
      return "string" == typeof t && t.split("/*")[0].includes("var(--");
    },
    "A",
    0,
    i,
    "u",
    0,
    (t) => !!s(t) && r.test(t.split("/*")[0].trim()),
  ]);
};
