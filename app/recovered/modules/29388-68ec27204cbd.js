// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, n) => {
  Object.defineProperty(n, "__esModule", { value: !0 });
  var r = {
    createLinkPrefetchPartialError: function () {
      return u;
    },
    createUnrenderedSegmentError: function () {
      return l;
    },
  };
  for (var a in r) Object.defineProperty(n, a, { enumerable: !0, get: r[a] });
  function l(e, t) {
    let n = `Route "${e}": Could not validate that a segment in your UI has instant navigation.`;
    if (t.length > 0) {
      let e = 1 === t.length ? "Dropped segment" : "Dropped segments";
      n += `

This segment was dropped from rendering. Issues that would prevent instant navigation will go undetected.

${e}:
${t.map((e) => `  ${e}`).join("\n")}

Ways to fix this:
  - [render] Render the dropped segment
  - [ignore] Set \`export const instant = false\` to opt the dropped segment out of instant-navigation validation

Learn more: https://nextjs.org/docs/messages/instant-unrendered-segment`;
    }
    return Error(n);
  }
  function u(e) {
    return Error(`Next.js encountered dynamic data during prefetching for "${e}".

This will lead to slower, more expensive prefetches.

Ways to fix this:
  - [upgrade] Opt into Partial Prefetching by exporting \`const prefetch = 'partial'\` from the page or layout, or by setting \`partialPrefetching: true\` in next.config to opt the whole app in
  - [disable] Remove \`prefetch={true}\` from the <Link> to use the default prefetch
  - [ignore] Set \`export const instant = false\` to opt the route out of instant-navigation validation

Learn more: https://nextjs.org/docs/messages/instant-link-prefetch-partial`);
  }
};
