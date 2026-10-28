# Original search request contract

This bounded recovery closes a captured search dependency chain that the
909-factory selection in [PR657](https://github.com/lalalune/pumpfun-source/pull/657)
stops at its lazy loader. It adds usable query declarations, request encoding
and resolver handling rather than another formatted copy of the bundles.

The inputs are the preserved public capture on upstream
`2fc654a20e9c7be2b9529f585942bb82c4c83ab2`, with the corrected nested-registration
index from dependency `7b52e2cfb780e246fe98c656122d95be769e17a3` (5,947 variants,
7,337 occurrences). Original shipped JavaScript retains
its original authorship. The descriptive names here are analyst names;
original TypeScript, source filenames and backend source have not been recovered.

## Recovered chain

The captured `/` and `/explore` HTML reference the shell and Turbopack runtime.
The runtime AST establishes `A(id)` calling the exported loader with an import
function, `v` exporting its value, and `l` loading a parent chunk. The shell's
factory400466 requests loader544865. Its literal fourteen-chunk list finishes
by importing SearchDialogLazy238128. That list selects coin-hook379705 with
factory hash `350da5b76741…`; other indexed variants are retained outside this
loading context. The complete fourteen physical chunks are independently parsed,
so an unindexed nested contender also causes an ambiguity failure. Numeric IDs
are not assumed to be globally unique.

The request path then follows website transport759257 → client30181 → origin
503630, and the `createContractClient` reexport402030 → encoder898661. This
binds these captured website calls to `https://frontend-api-v3.pump.fun`.
It does not replace the separately documented developer API origin or bearer
policy at `https://api.pump.fun/v1`.

[contract.json](contract.json) binds each relevant source expression to the
manifest's source URL, byte count, SHA-256, UTF-16 range, strict UTF-8 byte range
and expression hash. It contains:

- `GET /search/resolve`: one-identifier client request, declared 1–5 identifier
  query schema, and the dialog's first-result/definitive/kind fallback rules;
- `GET /coins/search-v2`: declared query schema and the observed include-cookie
  request options;
- `GET /coins/search-unrestricted`: its distinct query limit and request options.

The declarative query schemas come from the captured Zod AST without invoking
Zod or any captured function. The `querySchemas` member is a separate schema
document: select `properties[operation]` while retaining its `$defs`. The
captured string min/max checks count Unicode code points, while the source
positions remain UTF-16 offsets. Integer declarations retain the captured Zod
safe-integer bounds. Description text about server defaults,
clamping, recency, no-op filters or feature flags remains text, not an invented
server implementation. Full response DTOs are referenced by source witnesses;
this packet does not claim their complete reconstruction.

## Maintained adapter

[request.mjs](request.mjs) provides small adapters derived from the observed
client operations. It never performs a network request itself and requires an
explicit base URL when constructing a request:

```js
import {
  buildSearchRequest,
  readSearchResolution,
  resolveIdentifierWith,
} from './request.mjs';

const plan = buildSearchRequest(
  'GET /coins/search-v2',
  { searchTerm: 'cat', quoteMints: ['mintA', 'mintB'], limit: 48 },
  { baseUrl: 'http://127.0.0.1:3001' },
);
// plan contains URL + RequestInit. No local backend endpoint is added here.
```

The encoder omits undefined values, stringifies scalars, comma-joins arrays,
rejects commas inside array elements, and omits empty arrays only for declared
optional query fields. It deliberately does not validate ordinary values before
encoding: the original client does not do that either. For example, a limit over
the unrestricted schema's200 bound still encodes; the declared acceptance check
and the wire encoder answer different questions.

`readSearchResolution` preserves the observed truthiness checks. A definitive
coin with a truthy mint yields its mint and nullable chain; `user` and
`external_wallet` retain their kinds. Missing/nondefinitive/unsupported results,
including the schema's `squad`, yield `fallback`. Only the first result is used.
`resolveIdentifierWith` forwards the supplied AbortSignal and catches transport
errors as the original helper does. The caller remains responsible for cancellation
after that helper returns, HTTP status handling and retries.

The resolver's captured default credential mode is `same-origin`; the coin hook
explicitly overrides it to `include`. Both use WEB/web source headers; coin
requests also set JSON content type, and the JSON reader sets Accept to
`application/json`. These are observed browser RequestInit
options, not proof that a Node fetch sends browser cookies, nor a server auth policy.

## Reproduce

From `/app`, using the checked-in dependencies:

```sh
node scripts/original-search-contract.mjs --check
node --test tests/original_source.test.mjs tests/original_schema.test.mjs tests/original_search.test.mjs
```

`--write` regenerates only this contract after an intentional source review.
`--check` reauthenticates captures, reparses actual registrations and loader
structure, reextracts query declarations and compares the complete generated
document. Formatted `recovered/modules/*.js` files are not read. Retained object
paths are restricted before any file read; a forged manifest cannot authorize
reading an arbitrary repository file. Malformed UTF-8, split surrogate boundaries,
symlinks, false factory ranges, mismatching registration IDs and ambiguous contexts
fail closed.

The focused tests include a real loopback HTTP server receiving all three GET
requests, Unicode and array wire values, resolver payload/error/abort cases,
declared query boundaries, source and generated-artifact tampering, conflicting
loader contexts and unsupported loader syntax. They do not execute captured JS
or compare responses with production.

This adapter omits Ky retries and ContractError wrapping, coin normalization,
cache/pagination state, feature-flag resolution and the complete hook lifecycle.
No backend endpoint, feature-progress milestone, original runtime execution,
live API compatibility or complete original application is claimed.
