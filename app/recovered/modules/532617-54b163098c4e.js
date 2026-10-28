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
        constructor(s, i = {}) {
          let r =
              i.cause instanceof e
                ? i.cause.details
                : i.cause?.message
                  ? i.cause.message
                  : i.details,
            a = (i.cause instanceof e && i.cause.docsPath) || i.docsPath,
            l = n.getDocsUrl?.({ ...i, docsPath: a });
          (super(
            [
              s || "An error occurred.",
              "",
              ...(i.metaMessages ? [...i.metaMessages, ""] : []),
              ...(l ? [`Docs: ${l}`] : []),
              ...(r ? [`Details: ${r}`] : []),
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
            (this.details = r),
            (this.docsPath = a),
            (this.metaMessages = i.metaMessages),
            (this.name = i.name ?? this.name),
            (this.shortMessage = s),
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
