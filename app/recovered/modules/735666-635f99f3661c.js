// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    a = e.i(426091),
    i = e.i(352386);
  let l = i.forwardRef((e, i) => {
    let l,
      n,
      o,
      s,
      d = (0, r.c)(9);
    return (
      d[0] !== e
        ? (({ className: l, ...n } = e), (d[0] = e), (d[1] = l), (d[2] = n))
        : ((l = d[1]), (n = d[2])),
      d[3] !== l
        ? ((o = (0, a.c)("w-full caption-bottom text-sm", l)),
          (d[3] = l),
          (d[4] = o))
        : (o = d[4]),
      d[5] !== n || d[6] !== i || d[7] !== o
        ? ((s = (0, t.jsx)("div", {
            className: "relative w-full min-w-0 overflow-auto",
            children: (0, t.jsx)("table", { ref: i, className: o, ...n }),
          })),
          (d[5] = n),
          (d[6] = i),
          (d[7] = o),
          (d[8] = s))
        : (s = d[8]),
      s
    );
  });
  l.displayName = "Table";
  let n = i.forwardRef((e, i) => {
    let l,
      n,
      o,
      s,
      d = (0, r.c)(9);
    return (
      d[0] !== e
        ? (({ className: l, ...n } = e), (d[0] = e), (d[1] = l), (d[2] = n))
        : ((l = d[1]), (n = d[2])),
      d[3] !== l
        ? ((o = (0, a.c)("[&_tr]:border-b", l)), (d[3] = l), (d[4] = o))
        : (o = d[4]),
      d[5] !== n || d[6] !== i || d[7] !== o
        ? ((s = (0, t.jsx)("thead", { ref: i, className: o, ...n })),
          (d[5] = n),
          (d[6] = i),
          (d[7] = o),
          (d[8] = s))
        : (s = d[8]),
      s
    );
  });
  n.displayName = "TableHeader";
  let o = i.forwardRef((e, i) => {
    let l,
      n,
      o,
      s,
      d = (0, r.c)(9);
    return (
      d[0] !== e
        ? (({ className: l, ...n } = e), (d[0] = e), (d[1] = l), (d[2] = n))
        : ((l = d[1]), (n = d[2])),
      d[3] !== l
        ? ((o = (0, a.c)("[&_tr:last-child]:border-0", l)),
          (d[3] = l),
          (d[4] = o))
        : (o = d[4]),
      d[5] !== n || d[6] !== i || d[7] !== o
        ? ((s = (0, t.jsx)("tbody", { ref: i, className: o, ...n })),
          (d[5] = n),
          (d[6] = i),
          (d[7] = o),
          (d[8] = s))
        : (s = d[8]),
      s
    );
  });
  ((o.displayName = "TableBody"),
    (i.forwardRef((e, i) => {
      let l,
        n,
        o,
        s,
        d = (0, r.c)(9);
      return (
        d[0] !== e
          ? (({ className: l, ...n } = e), (d[0] = e), (d[1] = l), (d[2] = n))
          : ((l = d[1]), (n = d[2])),
        d[3] !== l
          ? ((o = (0, a.c)(
              "border-border-secondary border-t bg-bg-secondary/50 font-medium text-text-primary [&>tr]:last:border-b-0",
              l,
            )),
            (d[3] = l),
            (d[4] = o))
          : (o = d[4]),
        d[5] !== n || d[6] !== i || d[7] !== o
          ? ((s = (0, t.jsx)("tfoot", { ref: i, className: o, ...n })),
            (d[5] = n),
            (d[6] = i),
            (d[7] = o),
            (d[8] = s))
          : (s = d[8]),
        s
      );
    }).displayName = "TableFooter"));
  let s = i.forwardRef((e, i) => {
    let l,
      n,
      o,
      s,
      d = (0, r.c)(9);
    return (
      d[0] !== e
        ? (({ className: l, ...n } = e), (d[0] = e), (d[1] = l), (d[2] = n))
        : ((l = d[1]), (n = d[2])),
      d[3] !== l
        ? ((o = (0, a.c)(
            "border-b border-border-secondary transition-colors hover:bg-bg-secondary/70 data-[state=selected]:bg-bg-secondary",
            l,
          )),
          (d[3] = l),
          (d[4] = o))
        : (o = d[4]),
      d[5] !== n || d[6] !== i || d[7] !== o
        ? ((s = (0, t.jsx)("tr", { ref: i, className: o, ...n })),
          (d[5] = n),
          (d[6] = i),
          (d[7] = o),
          (d[8] = s))
        : (s = d[8]),
      s
    );
  });
  s.displayName = "TableRow";
  let d = i.forwardRef((e, i) => {
    let l,
      n,
      o,
      s,
      d = (0, r.c)(9);
    return (
      d[0] !== e
        ? (({ className: l, ...n } = e), (d[0] = e), (d[1] = l), (d[2] = n))
        : ((l = d[1]), (n = d[2])),
      d[3] !== l
        ? ((o = (0, a.c)(
            "h-12 px-4 text-left align-middle font-medium text-text-secondary [&:has([role=checkbox])]:pr-0",
            l,
          )),
          (d[3] = l),
          (d[4] = o))
        : (o = d[4]),
      d[5] !== n || d[6] !== i || d[7] !== o
        ? ((s = (0, t.jsx)("th", { ref: i, className: o, ...n })),
          (d[5] = n),
          (d[6] = i),
          (d[7] = o),
          (d[8] = s))
        : (s = d[8]),
      s
    );
  });
  d.displayName = "TableHead";
  let c = i.forwardRef((e, i) => {
    let l,
      n,
      o,
      s,
      d = (0, r.c)(9);
    return (
      d[0] !== e
        ? (({ className: l, ...n } = e), (d[0] = e), (d[1] = l), (d[2] = n))
        : ((l = d[1]), (n = d[2])),
      d[3] !== l
        ? ((o = (0, a.c)(
            "text-text-primary p-4 align-middle [&:has([role=checkbox])]:pr-0",
            l,
          )),
          (d[3] = l),
          (d[4] = o))
        : (o = d[4]),
      d[5] !== n || d[6] !== i || d[7] !== o
        ? ((s = (0, t.jsx)("td", { ref: i, className: o, ...n })),
          (d[5] = n),
          (d[6] = i),
          (d[7] = o),
          (d[8] = s))
        : (s = d[8]),
      s
    );
  });
  ((c.displayName = "TableCell"),
    (i.forwardRef((e, i) => {
      let l,
        n,
        o,
        s,
        d = (0, r.c)(9);
      return (
        d[0] !== e
          ? (({ className: l, ...n } = e), (d[0] = e), (d[1] = l), (d[2] = n))
          : ((l = d[1]), (n = d[2])),
        d[3] !== l
          ? ((o = (0, a.c)("mt-4 text-sm text-text-tertiary", l)),
            (d[3] = l),
            (d[4] = o))
          : (o = d[4]),
        d[5] !== n || d[6] !== i || d[7] !== o
          ? ((s = (0, t.jsx)("caption", { ref: i, className: o, ...n })),
            (d[5] = n),
            (d[6] = i),
            (d[7] = o),
            (d[8] = s))
          : (s = d[8]),
        s
      );
    }).displayName = "TableCaption"),
    e.s(["s", 0, l, "z", 0, o, "d", 0, c, "U", 0, d, "E", 0, n, "N", 0, s]));
};
