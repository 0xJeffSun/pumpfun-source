// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t) => {
  let e = "2.43.3",
    n = {
      getDocsUrl: ({ docsBaseUrl: t, docsPath: e = "", docsSlug: n }) =>
        e ? `${t ?? "https://viem.sh"}${e}${n ? `#${n}` : ""}` : void 0,
      version: `viem@${e}`,
    };
  t.s(
    [
      "f",
      0,
      class t extends Error {
        constructor(i, s = {}) {
          let r =
              s.cause instanceof t
                ? s.cause.details
                : s.cause?.message
                  ? s.cause.message
                  : s.details,
            o = (s.cause instanceof t && s.cause.docsPath) || s.docsPath,
            a = n.getDocsUrl?.({ ...s, docsPath: o });
          (super(
            [
              i || "An error occurred.",
              "",
              ...(s.metaMessages ? [...s.metaMessages, ""] : []),
              ...(a ? [`Docs: ${a}`] : []),
              ...(r ? [`Details: ${r}`] : []),
              ...(n.version ? [`Version: ${n.version}`] : []),
            ].join("\n"),
            s.cause ? { cause: s.cause } : void 0,
          ),
            Object.defineProperty(this, "details", {
              enumerable: !0,
              configurable: !0,
              writable: !0,
              value: void 0,
            }),
            Object.defineProperty(this, "docsPath", {
              enumerable: !0,
              configurable: !0,
              writable: !0,
              value: void 0,
            }),
            Object.defineProperty(this, "metaMessages", {
              enumerable: !0,
              configurable: !0,
              writable: !0,
              value: void 0,
            }),
            Object.defineProperty(this, "shortMessage", {
              enumerable: !0,
              configurable: !0,
              writable: !0,
              value: void 0,
            }),
            Object.defineProperty(this, "version", {
              enumerable: !0,
              configurable: !0,
              writable: !0,
              value: void 0,
            }),
            Object.defineProperty(this, "name", {
              enumerable: !0,
              configurable: !0,
              writable: !0,
              value: "BaseError",
            }),
            (this.details = r),
            (this.docsPath = o),
            (this.metaMessages = s.metaMessages),
            (this.name = s.name ?? this.name),
            (this.shortMessage = i),
            (this.version = e));
        }
        walk(t) {
          return (function t(e, n) {
            return n?.(e)
              ? e
              : e && "object" == typeof e && "cause" in e && void 0 !== e.cause
                ? t(e.cause, n)
                : n
                  ? null
                  : e;
          })(this, t);
        }
      },
    ],
    532617,
  );
};
