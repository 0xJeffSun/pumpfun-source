// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  Object.defineProperty(r, "__esModule", { value: !0 });
  var n = {
    MetadataBoundary: function () {
      return l;
    },
    OutletBoundary: function () {
      return s;
    },
    RootLayoutBoundary: function () {
      return c;
    },
    ViewportBoundary: function () {
      return u;
    },
  };
  for (var o in n) Object.defineProperty(r, o, { enumerable: !0, get: n[o] });
  let i = e.r(527320),
    a = {
      [i.METADATA_BOUNDARY_NAME]: function ({ children: e }) {
        return e;
      },
      [i.VIEWPORT_BOUNDARY_NAME]: function ({ children: e }) {
        return e;
      },
      [i.OUTLET_BOUNDARY_NAME]: function ({ children: e }) {
        return e;
      },
      [i.ROOT_LAYOUT_BOUNDARY_NAME]: function ({ children: e }) {
        return e;
      },
    },
    l = a[i.METADATA_BOUNDARY_NAME.slice(0)],
    u = a[i.VIEWPORT_BOUNDARY_NAME.slice(0)],
    s = a[i.OUTLET_BOUNDARY_NAME.slice(0)],
    c = a[i.ROOT_LAYOUT_BOUNDARY_NAME.slice(0)];
};
