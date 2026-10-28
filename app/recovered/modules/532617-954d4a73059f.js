// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t = "2.43.3",
    n = {
      getDocsUrl: ({ docsBaseUrl: e, docsPath: t = "", docsSlug: n }) =>
        t ? `${e ?? "https://viem.sh"}${t}${n ? `#${n}` : ""}` : void 0,
      version: `viem@${t}`,
    };
  e.s(
    [
      "f",
      0,
      class e extends Error {
        constructor(r, i = {}) {
          let o =
              i.cause instanceof e
                ? i.cause.details
                : i.cause?.message
                  ? i.cause.message
                  : i.details,
            s = (i.cause instanceof e && i.cause.docsPath) || i.docsPath,
            a = n.getDocsUrl?.({ ...i, docsPath: s });
          (super(
            [
              r || "An error occurred.",
              "",
              ...(i.metaMessages ? [...i.metaMessages, ""] : []),
              ...(a ? [`Docs: ${a}`] : []),
              ...(o ? [`Details: ${o}`] : []),
              ...(n.version ? [`Version: ${n.version}`] : []),
            ].join("\n"),
            i.cause ? { cause: i.cause } : void 0,
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
            (this.details = o),
            (this.docsPath = s),
            (this.metaMessages = i.metaMessages),
            (this.name = i.name ?? this.name),
            (this.shortMessage = r),
            (this.version = t));
        }
        walk(e) {
          return (function e(t, n) {
            return n?.(t)
              ? t
              : t && "object" == typeof t && "cause" in t && void 0 !== t.cause
                ? e(t.cause, n)
                : n
                  ? null
                  : t;
          })(this, e);
        }
      },
    ],
    532617,
  );
};
