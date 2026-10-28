// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  "use strict";
  var t = e.i(350001),
    a = e.i(26566),
    s = e.i(548801),
    r = e.i(746685);
  class n extends s.f {
    constructor({
      callbackSelector: e,
      cause: t,
      data: a,
      extraData: s,
      sender: n,
      urls: o,
    }) {
      super(
        t.shortMessage ||
          "An error occurred while fetching for an offchain result.",
        {
          cause: t,
          metaMessages: [
            ...(t.metaMessages || []),
            t.metaMessages?.length ? "" : [],
            "Offchain Gateway Call:",
            o && ["  Gateway URL(s):", ...o.map((e) => `    ${(0, r.p)(e)}`)],
            `  Sender: ${n}`,
            `  Data: ${a}`,
            `  Callback selector: ${e}`,
            `  Extra data: ${s}`,
          ].flat(),
          name: "OffchainLookupError",
        },
      );
    }
  }
  class o extends s.f {
    constructor({ result: e, url: t }) {
      super(
        "Offchain gateway response is malformed. Response data must be a hex value.",
        {
          metaMessages: [
            `Gateway URL: ${(0, r.p)(t)}`,
            `Response: ${(0, a.f)(e)}`,
          ],
          name: "OffchainLookupResponseMalformedError",
        },
      );
    }
  }
  class c extends s.f {
    constructor({ sender: e, to: t }) {
      super(
        "Reverted sender address does not match target contract address (`to`).",
        {
          metaMessages: [
            `Contract address: ${t}`,
            `OffchainLookup sender address: ${e}`,
          ],
          name: "OffchainLookupSenderMismatchError",
        },
      );
    }
  }
  var i = e.i(738615),
    d = e.i(120110),
    f = e.i(141569),
    u = e.i(75015),
    l = e.i(296354),
    p = e.i(715928),
    h = e.i(825640);
  let y = {
    name: "OffchainLookup",
    type: "error",
    inputs: [
      { name: "sender", type: "address" },
      { name: "urls", type: "string[]" },
      { name: "callData", type: "bytes" },
      { name: "callbackFunction", type: "bytes4" },
      { name: "extraData", type: "bytes" },
    ],
  };
  async function m(e, { blockNumber: a, blockTag: s, data: r, to: o }) {
    let { args: i } = (0, d.f)({ data: r, abi: [y] }),
      [p, g, b, O, k] = i,
      { ccipRead: T } = e,
      L = T && "function" == typeof T?.request ? T.request : w;
    try {
      if (!(0, u.f)(o, p)) throw new c({ sender: p, to: o });
      let r = g.includes(h.o)
          ? await (0, h.V)({ data: b, ccipRequest: L })
          : await L({ data: b, sender: p, urls: g }),
        { data: n } = await (0, t.f)(e, {
          blockNumber: a,
          blockTag: s,
          data: (0, l.w)([
            O,
            (0, f.N)([{ type: "bytes" }, { type: "bytes" }], [r, k]),
          ]),
          to: o,
        });
      return n;
    } catch (e) {
      throw new n({
        callbackSelector: O,
        cause: e,
        data: r,
        extraData: k,
        sender: p,
        urls: g,
      });
    }
  }
  async function w({ data: e, sender: t, urls: s }) {
    let r = Error("An unknown error occurred.");
    for (let n = 0; n < s.length; n++) {
      let c = s[n],
        d = c.includes("{data}") ? "GET" : "POST",
        f = "POST" === d ? { data: e, sender: t } : void 0,
        u = "POST" === d ? { "Content-Type": "application/json" } : {};
      try {
        let s,
          n = await fetch(
            c.replace("{sender}", t.toLowerCase()).replace("{data}", e),
            { body: JSON.stringify(f), headers: u, method: d },
          );
        if (
          ((s = n.headers.get("Content-Type")?.startsWith("application/json")
            ? (await n.json()).data
            : await n.text()),
          !n.ok)
        ) {
          r = new i.y({
            body: f,
            details: s?.error ? (0, a.f)(s.error) : n.statusText,
            headers: n.headers,
            status: n.status,
            url: c,
          });
          continue;
        }
        if (!(0, p.f)(s)) {
          r = new o({ result: s, url: c });
          continue;
        }
        return s;
      } catch (e) {
        r = new i.y({ body: f, details: e.message, url: c });
      }
    }
    throw r;
  }
  e.s(
    ["offchainLookup", 0, m, "offchainLookupSignature", 0, "0x556f1830"],
    55885,
  );
};
