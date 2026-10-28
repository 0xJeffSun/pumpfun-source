// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  (Object.defineProperty(r, "__esModule", { value: !0 }),
    (r.openEnum = r.OPEN_ENUM_META = void 0));
  let o = e.r(876543);
  ((r.OPEN_ENUM_META = "x-open-enum"),
    (r.openEnum = (e, t) =>
      o.z
        .union([o.z.enum(e), o.z.string()])
        .meta({ [r.OPEN_ENUM_META]: !0 })
        .describe(`${t}. Known values: ${e.join(", ")}`)));
};
