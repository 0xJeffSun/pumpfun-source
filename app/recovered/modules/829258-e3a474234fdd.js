// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  (Object.defineProperty(r, "__esModule", { value: !0 }),
    (r.userPortfolioRoutes = void 0));
  let o = e.r(876543),
    n = e.r(183184),
    s = e.r(785036),
    a = e.r(984870),
    i = o.z.object({ dustFloorUsd: o.z.number().nullable() });
  r.userPortfolioRoutes = (0, n.defineRoutes)({
    "GET /user-portfolio/dust-floor": {
      summary:
        "The authed wallet's dust floor in USD, or null when none is set",
      response: i,
    },
    "POST /user-portfolio/dust-floor": {
      summary:
        "Set the authed wallet's dust floor: on the owner's own authed /user-portfolio read (OptionalAuthGuard, JWT wallet == userId) its open positions quoting a valueUsd strictly below the floor serve dustFloorFiltered true — a public read of the wallet serves every row dustFloorFiltered false (exited rows are never marked; grouping only — nothing is hidden, totals and positionCount are untouched; clients drop or collapse the marked rows). One floor per wallet — setting replaces the previous value",
      body: o.z.object({ valueUsd: o.z.number().min(0).max(1e9) }),
      response: o.z.object({
        dustFloorUsd: o.z.number().describe("Echoes the floor just set"),
      }),
    },
    "DELETE /user-portfolio/dust-floor": {
      summary:
        "Remove the authed wallet's dust floor: every /user-portfolio position serves dustFloorFiltered false again on the owner's own read too (public reads never carry the floor)",
      response: o.z.object({ dustFloorUsd: o.z.null() }),
    },
    "GET /user-portfolio/{userId}": (0, s.publicRead)("positions.read", {
      summary:
        "A user's whole-portfolio positions (open/closed/all) with net PnL. totalsOnly returns just the summary (positionCount, no list); the summary carries no PnL or value totals. filterSpam=true serves pages from the non-spam set (filtered before the page slice, positionCount = filtered total); spamOnly=true serves pages from the spam group alone, for clients excluding flagged coins from balance rows that carry no verdict (positionCount = spam total; mutually exclusive with filterSpam, 400). userId takes a wallet or a cc user id. A group id serves the group's member-aggregate portfolio (SUM over active members' positions) with every row's walletAddress null. Group and over-cap reads are paged by the serving source, so their positionCount is that source's and clients stop on an empty page. Owner-only marks (spam / not-spam, the owner's dust floor, dustFloorFiltered) apply only to a read the owner makes signed in, never on the API host; every other read serves the public spam verdict and the callout exemption alone, never a rescue, and every row dustFloorFiltered false. HyperCore perp rows, summary.cash and hlAccount ride this route only, read for the wallet paired with its linked EVM wallet; /user-positions stays mints-only. query narrows OPEN, CLOSED and ALL to the rows whose coin symbol or name contains the term (case-insensitive) or whose mint equals an address-shaped term, paged by the serving source with positionCount the matching count; page 0's perp and TON rows and every page's NEAR rows are filtered by the same rule; a Starknet account refuses a term (400); cc refuses a term on a group id (400)",
      params: o.z.object({ userId: o.z.string() }),
      query: o.z.object({
        filter: o.z
          .string()
          .transform((e) => e.trim().toUpperCase() || void 0)
          .pipe(o.z.enum(["OPEN", "CLOSED", "ALL"]).optional())
          .optional()
          .describe("Position set to serve; omitted defaults to OPEN"),
        sortBy: o.z
          .string()
          .transform((e) => e.trim().toUpperCase() || void 0)
          .pipe(o.z.enum(["POSITION_SIZE", "RECENCY", "PNL"]).optional())
          .optional()
          .describe("Row order; omitted defaults to PNL"),
        totalsOnly: o.z
          .boolean()
          .optional()
          .describe(
            "Return only the summary (positionCount), skipping the positions list",
          ),
        filterSpam: o.z
          .boolean()
          .optional()
          .describe(
            "true drops the spam-grouped rows (potentialSpam && !userMarkedNonSpam) before the page slice, with summary.positionCount reporting the filtered total",
          ),
        spamOnly: o.z
          .boolean()
          .optional()
          .describe(
            "true serves ONLY the spam-grouped rows (potentialSpam && !userMarkedNonSpam) before the page slice — the inverse of filterSpam, with summary.positionCount reporting the spam total; mutually exclusive with filterSpam (400)",
          ),
        page: o.z.number().int().min(0).optional(),
        pageSize: o.z.number().int().min(1).max(200).optional(),
        chainId: o.z
          .number()
          .int()
          .optional()
          .describe(
            "Codex network id to restrict to one chain; omitted means all chains",
          ),
        query: o.z
          .string()
          .regex(
            /^\s*[^\x00-\x1f\x7f-\x9f]{0,64}\s*$/u,
            "query must be at most 64 characters with no control characters",
          )
          .transform((e) => e.trim() || void 0)
          .optional()
          .describe(
            "Search term (trimmed, at most 64 characters, 400 beyond): case-insensitive substring over the coin symbol and name, or an exact mint (base58 decoding to 32 bytes, or 0x + 40 hex compared lowercase); summary.positionCount is the matching count; omitted or blank serves the unsearched list; a Starknet account refuses a term (400); cc refuses a term on a group id (400)",
          ),
      }),
      response: o.z.object({
        positions: o.z
          .array(a.userPositionDto)
          .describe(
            "The filtered positions for the requested page; empty when totalsOnly",
          ),
        summary: o.z.object({
          positionCount: o.z
            .number()
            .describe(
              "Rows in the filtered set (filterSpam/spamOnly: the kept rows); paginate until a page comes back empty",
            ),
          cash: o.z
            .array(
              o.z.object({
                chain: o.z
                  .string()
                  .describe("CAIP-2 chain of the cash balance"),
                amount: o.z.number(),
                valueUsd: o.z.number().nullable(),
              }),
            )
            .optional()
            .describe(
              "HyperCore account cash; never a positions row, absent when the account reports none",
            ),
          withdrawable: o.z
            .array(
              o.z.object({
                chain: o.z.string().describe("CAIP-2 chain of the balance"),
                amount: o.z.number(),
                valueUsd: o.z.number().nullable(),
              }),
            )
            .optional()
            .describe(
              "HyperCore withdrawable USDC beside cash; absent when the HyperCore snapshot is missing",
            ),
          hlAccount: o.z
            .enum(["unknown", "missing", "active"])
            .optional()
            .describe(
              "HyperCore account state; absent when the account reports none",
            ),
        }),
        updatesApplied: o.z
          .boolean()
          .describe(
            'Honored-marker for callout.updates: true only when cc actually ran the updates join for every row on this page (or trivially had nothing to enrich); clients must read empty updates as "unknown" when this is false',
          ),
      }),
      emits: ["PORTFOLIO_BUILDING"],
    }),
    "POST /user-portfolio/non-spam/{mint}": {
      summary:
        'Mark a mint as "not spam" for the authed wallet: its /user-portfolio positions report userMarkedNonSpam true (potentialSpam carries the scam-gate verdict; clients combine the two). Replaces any spam mark — one verdict per wallet+mint',
      params: o.z.object({ mint: o.z.string() }),
      response: o.z.object({ marked: o.z.boolean() }),
    },
    "DELETE /user-portfolio/non-spam/{mint}": {
      summary:
        'Remove the authed wallet\'s "not spam" mark for a mint: its /user-portfolio positions report userMarkedNonSpam false again (a spam mark is left untouched)',
      params: o.z.object({ mint: o.z.string() }),
      response: o.z.object({ marked: o.z.boolean() }),
    },
    "POST /user-portfolio/spam/{mint}": {
      summary:
        "Mark a mint as spam for the authed wallet: its /user-portfolio positions report potentialSpam true (the owner's verdict ORs with the scam gate's and outranks the callout exemption). Replaces any \"not spam\" mark — one verdict per wallet+mint",
      params: o.z.object({ mint: o.z.string() }),
      response: o.z.object({ marked: o.z.boolean() }),
    },
    "DELETE /user-portfolio/spam/{mint}": {
      summary:
        "Remove the authed wallet's spam mark for a mint: potentialSpam reverts to the scam gate's own verdict (a \"not spam\" mark is left untouched)",
      params: o.z.object({ mint: o.z.string() }),
      response: o.z.object({ marked: o.z.boolean() }),
    },
  });
};
