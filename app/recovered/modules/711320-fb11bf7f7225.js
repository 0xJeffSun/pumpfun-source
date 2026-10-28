// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t) => {
  var e = t.i(970080),
    i = t.i(49997),
    s = t.i(968301);
  let r = new Set(["brightness", "contrast", "saturate", "opacity"]);
  function n(t) {
    let [e, i] = t.slice(0, -1).split("(");
    if ("drop-shadow" === e) return t;
    let [n] = i.match(s.f) || [];
    if (!n) return t;
    let a = i.replace(n, ""),
      o = +!!r.has(e);
    return (n !== i && (o *= 100), e + "(" + o + a + ")");
  }
  let a = /\b([a-z-]*)\(.*?\)/gu,
    o = {
      ...i.u,
      getAnimatableNone: (t) => {
        let e = t.match(a);
        return e ? e.map(n).join(" ") : t;
      },
    };
  t.s(["f", 0, o], 49946);
  let l = {
    ...i.u,
    getAnimatableNone: (t) => {
      let e = i.u.parse(t);
      return i.u.createTransformer(t)(
        e.map((t) =>
          "number" == typeof t
            ? 0
            : "object" == typeof t
              ? { ...t, alpha: 1 }
              : t,
        ),
      );
    },
  };
  t.s(["f", 0, l], 108645);
  var h = t.i(854022);
  let u = { ...h.H, transform: Math.round };
  var f = t.i(813968);
  let d = {
      rotate: f.b,
      pathRotation: f.b,
      rotateX: f.b,
      rotateY: f.b,
      rotateZ: f.b,
      scale: h.Z,
      scaleX: h.Z,
      scaleY: h.Z,
      scaleZ: h.Z,
      skew: f.b,
      skewX: f.b,
      skewY: f.b,
      distance: f.L,
      translateX: f.L,
      translateY: f.L,
      translateZ: f.L,
      x: f.L,
      y: f.L,
      z: f.L,
      perspective: f.L,
      transformPerspective: f.L,
      opacity: h._,
      originX: f.v,
      originY: f.v,
      originZ: f.L,
    },
    p = {
      borderWidth: f.L,
      borderTopWidth: f.L,
      borderRightWidth: f.L,
      borderBottomWidth: f.L,
      borderLeftWidth: f.L,
      borderRadius: f.L,
      borderTopLeftRadius: f.L,
      borderTopRightRadius: f.L,
      borderBottomRightRadius: f.L,
      borderBottomLeftRadius: f.L,
      width: f.L,
      maxWidth: f.L,
      height: f.L,
      maxHeight: f.L,
      top: f.L,
      right: f.L,
      bottom: f.L,
      left: f.L,
      inset: f.L,
      insetBlock: f.L,
      insetBlockStart: f.L,
      insetBlockEnd: f.L,
      insetInline: f.L,
      insetInlineStart: f.L,
      insetInlineEnd: f.L,
      padding: f.L,
      paddingTop: f.L,
      paddingRight: f.L,
      paddingBottom: f.L,
      paddingLeft: f.L,
      paddingBlock: f.L,
      paddingBlockStart: f.L,
      paddingBlockEnd: f.L,
      paddingInline: f.L,
      paddingInlineStart: f.L,
      paddingInlineEnd: f.L,
      margin: f.L,
      marginTop: f.L,
      marginRight: f.L,
      marginBottom: f.L,
      marginLeft: f.L,
      marginBlock: f.L,
      marginBlockStart: f.L,
      marginBlockEnd: f.L,
      marginInline: f.L,
      marginInlineStart: f.L,
      marginInlineEnd: f.L,
      fontSize: f.L,
      backgroundPositionX: f.L,
      backgroundPositionY: f.L,
      ...d,
      zIndex: u,
      fillOpacity: h._,
      strokeOpacity: h._,
      numOctaves: u,
    };
  t.s(["f", 0, p], 878124);
  let c = {
    ...p,
    color: e.f,
    backgroundColor: e.f,
    outlineColor: e.f,
    fill: e.f,
    stroke: e.f,
    borderColor: e.f,
    borderTopColor: e.f,
    borderRightColor: e.f,
    borderBottomColor: e.f,
    borderLeftColor: e.f,
    filter: o,
    WebkitFilter: o,
    mask: l,
    WebkitMask: l,
  };
  t.s(["f", 0, (t) => c[t]], 711320);
};
