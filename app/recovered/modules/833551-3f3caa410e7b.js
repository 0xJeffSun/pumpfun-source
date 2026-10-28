// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t,
    n,
    r = e.i(810954);
  let i =
      (((t = {}).open = "data-open"),
      (t.closed = "data-closed"),
      (t[(t.startingStyle = r.S.startingStyle)] = "startingStyle"),
      (t[(t.endingStyle = r.S.endingStyle)] = "endingStyle"),
      (t.anchorHidden = "data-anchor-hidden"),
      (t.side = "data-side"),
      (t.align = "data-align"),
      t),
    o =
      (((n = {}).popupOpen = "data-popup-open"),
      (n.pressed = "data-pressed"),
      n),
    l = { [o.popupOpen]: "" },
    s = { [o.popupOpen]: "", [o.pressed]: "" },
    u = { [i.open]: "" },
    a = { [i.closed]: "" },
    c = { [i.anchorHidden]: "" };
  e.s([
    "q",
    0,
    i,
    "Y",
    0,
    o,
    "E",
    0,
    { open: (e) => (e ? u : a), anchorHidden: (e) => (e ? c : null) },
    "f",
    0,
    { open: (e) => (e ? s : null) },
    "J",
    0,
    { open: (e) => (e ? l : null) },
  ]);
};
