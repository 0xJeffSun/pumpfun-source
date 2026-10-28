// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var r = e.i(732486),
    t = e.i(445242),
    l = e.i(426091),
    a = e.i(352386);
  let o = a.forwardRef((e, a) => {
    let o,
      s,
      i,
      d,
      c = (0, t.c)(9);
    return (
      c[0] !== e
        ? (({ className: o, ...s } = e), (c[0] = e), (c[1] = o), (c[2] = s))
        : ((o = c[1]), (s = c[2])),
      c[3] !== o
        ? ((i = (0, l.c)("w-full caption-bottom text-sm", o)),
          (c[3] = o),
          (c[4] = i))
        : (i = c[4]),
      c[5] !== s || c[6] !== a || c[7] !== i
        ? ((d = (0, r.jsx)("div", {
            className: "relative w-full min-w-0 overflow-auto",
            children: (0, r.jsx)("table", { ref: a, className: i, ...s }),
          })),
          (c[5] = s),
          (c[6] = a),
          (c[7] = i),
          (c[8] = d))
        : (d = c[8]),
      d
    );
  });
  o.displayName = "Table";
  let s = a.forwardRef((e, a) => {
    let o,
      s,
      i,
      d,
      c = (0, t.c)(9);
    return (
      c[0] !== e
        ? (({ className: o, ...s } = e), (c[0] = e), (c[1] = o), (c[2] = s))
        : ((o = c[1]), (s = c[2])),
      c[3] !== o
        ? ((i = (0, l.c)("[&_tr]:border-b", o)), (c[3] = o), (c[4] = i))
        : (i = c[4]),
      c[5] !== s || c[6] !== a || c[7] !== i
        ? ((d = (0, r.jsx)("thead", { ref: a, className: i, ...s })),
          (c[5] = s),
          (c[6] = a),
          (c[7] = i),
          (c[8] = d))
        : (d = c[8]),
      d
    );
  });
  s.displayName = "TableHeader";
  let i = a.forwardRef((e, a) => {
    let o,
      s,
      i,
      d,
      c = (0, t.c)(9);
    return (
      c[0] !== e
        ? (({ className: o, ...s } = e), (c[0] = e), (c[1] = o), (c[2] = s))
        : ((o = c[1]), (s = c[2])),
      c[3] !== o
        ? ((i = (0, l.c)("[&_tr:last-child]:border-0", o)),
          (c[3] = o),
          (c[4] = i))
        : (i = c[4]),
      c[5] !== s || c[6] !== a || c[7] !== i
        ? ((d = (0, r.jsx)("tbody", { ref: a, className: i, ...s })),
          (c[5] = s),
          (c[6] = a),
          (c[7] = i),
          (c[8] = d))
        : (d = c[8]),
      d
    );
  });
  ((i.displayName = "TableBody"),
    (a.forwardRef((e, a) => {
      let o,
        s,
        i,
        d,
        c = (0, t.c)(9);
      return (
        c[0] !== e
          ? (({ className: o, ...s } = e), (c[0] = e), (c[1] = o), (c[2] = s))
          : ((o = c[1]), (s = c[2])),
        c[3] !== o
          ? ((i = (0, l.c)(
              "border-border-secondary border-t bg-bg-secondary/50 font-medium text-text-primary [&>tr]:last:border-b-0",
              o,
            )),
            (c[3] = o),
            (c[4] = i))
          : (i = c[4]),
        c[5] !== s || c[6] !== a || c[7] !== i
          ? ((d = (0, r.jsx)("tfoot", { ref: a, className: i, ...s })),
            (c[5] = s),
            (c[6] = a),
            (c[7] = i),
            (c[8] = d))
          : (d = c[8]),
        d
      );
    }).displayName = "TableFooter"));
  let d = a.forwardRef((e, a) => {
    let o,
      s,
      i,
      d,
      c = (0, t.c)(9);
    return (
      c[0] !== e
        ? (({ className: o, ...s } = e), (c[0] = e), (c[1] = o), (c[2] = s))
        : ((o = c[1]), (s = c[2])),
      c[3] !== o
        ? ((i = (0, l.c)(
            "border-b border-border-secondary transition-colors hover:bg-bg-secondary/70 data-[state=selected]:bg-bg-secondary",
            o,
          )),
          (c[3] = o),
          (c[4] = i))
        : (i = c[4]),
      c[5] !== s || c[6] !== a || c[7] !== i
        ? ((d = (0, r.jsx)("tr", { ref: a, className: i, ...s })),
          (c[5] = s),
          (c[6] = a),
          (c[7] = i),
          (c[8] = d))
        : (d = c[8]),
      d
    );
  });
  d.displayName = "TableRow";
  let c = a.forwardRef((e, a) => {
    let o,
      s,
      i,
      d,
      c = (0, t.c)(9);
    return (
      c[0] !== e
        ? (({ className: o, ...s } = e), (c[0] = e), (c[1] = o), (c[2] = s))
        : ((o = c[1]), (s = c[2])),
      c[3] !== o
        ? ((i = (0, l.c)(
            "h-12 px-4 text-left align-middle font-medium text-text-secondary [&:has([role=checkbox])]:pr-0",
            o,
          )),
          (c[3] = o),
          (c[4] = i))
        : (i = c[4]),
      c[5] !== s || c[6] !== a || c[7] !== i
        ? ((d = (0, r.jsx)("th", { ref: a, className: i, ...s })),
          (c[5] = s),
          (c[6] = a),
          (c[7] = i),
          (c[8] = d))
        : (d = c[8]),
      d
    );
  });
  c.displayName = "TableHead";
  let n = a.forwardRef((e, a) => {
    let o,
      s,
      i,
      d,
      c = (0, t.c)(9);
    return (
      c[0] !== e
        ? (({ className: o, ...s } = e), (c[0] = e), (c[1] = o), (c[2] = s))
        : ((o = c[1]), (s = c[2])),
      c[3] !== o
        ? ((i = (0, l.c)(
            "text-text-primary p-4 align-middle [&:has([role=checkbox])]:pr-0",
            o,
          )),
          (c[3] = o),
          (c[4] = i))
        : (i = c[4]),
      c[5] !== s || c[6] !== a || c[7] !== i
        ? ((d = (0, r.jsx)("td", { ref: a, className: i, ...s })),
          (c[5] = s),
          (c[6] = a),
          (c[7] = i),
          (c[8] = d))
        : (d = c[8]),
      d
    );
  });
  ((n.displayName = "TableCell"),
    (a.forwardRef((e, a) => {
      let o,
        s,
        i,
        d,
        c = (0, t.c)(9);
      return (
        c[0] !== e
          ? (({ className: o, ...s } = e), (c[0] = e), (c[1] = o), (c[2] = s))
          : ((o = c[1]), (s = c[2])),
        c[3] !== o
          ? ((i = (0, l.c)("mt-4 text-sm text-text-tertiary", o)),
            (c[3] = o),
            (c[4] = i))
          : (i = c[4]),
        c[5] !== s || c[6] !== a || c[7] !== i
          ? ((d = (0, r.jsx)("caption", { ref: a, className: i, ...s })),
            (c[5] = s),
            (c[6] = a),
            (c[7] = i),
            (c[8] = d))
          : (d = c[8]),
        d
      );
    }).displayName = "TableCaption"),
    e.s(["s", 0, o, "z", 0, i, "d", 0, n, "U", 0, c, "E", 0, s, "N", 0, d]));
};
