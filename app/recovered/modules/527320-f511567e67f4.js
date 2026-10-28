// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  Object.defineProperty(r, "__esModule", { value: !0 });
  var n = {
    METADATA_BOUNDARY_NAME: function () {
      return i;
    },
    OUTLET_BOUNDARY_NAME: function () {
      return l;
    },
    ROOT_LAYOUT_BOUNDARY_NAME: function () {
      return u;
    },
    VIEWPORT_BOUNDARY_NAME: function () {
      return a;
    },
  };
  for (var o in n) Object.defineProperty(r, o, { enumerable: !0, get: n[o] });
  let i = "__next_metadata_boundary__",
    a = "__next_viewport_boundary__",
    l = "__next_outlet_boundary__",
    u = "__next_root_layout_boundary__";
};
