# Fees: pinned 552-to-558 ordinary-source integration

This packet combines six complete-window recoveries on the exact public
[PR195 `origins` source](https://github.com/lalalune/pumpfun-source/blob/ce004d4e18da64cf7c58c302d445dea88ea2b393/research/fees-frontier-prefix-integration/README.md).
It has **43 source inputs**, a readable seven-file patch, and no dependency,
manifest, lock or feature changes. Every public parent's 42 input bytes was
independently checked before composition. The frozen result has **558/585
normalized counterparts, 143 raw local counterparts and 411 unique pairs**;
27 original windows remain unmatched. This is not full binary identity.

## Attribution and causal source changes

| Complete original body | Source recovery | Attribution |
| --- | --- | --- |
| 127776 / 4,968 bytes | Root-owned included AdminCto handler and real source spans | [PR200](https://github.com/lalalune/pumpfun-source/pull/200); earlier account context gains are already in the parent |
| 270136 / 1,400 bytes | Ordinary typed Relay argument serialization | Typed CPI control, measured separately before composition |
| 271536 / 5,136 bytes | Owned 13-account struct and fixed-array account-info construction | Same independently measured typed CPI source |
| 276672 / 4,304 bytes | Typed signed-CPI helper with observed allocation/evaluation order | Same source, including signer-seed evaluation before account-info construction |
| 295800 / 6,232 bytes | Unchanged admin Pubkey evaluated through a named constant | [PR204](https://github.com/lalalune/pumpfun-source/pull/204) |
| 650064 / 1,208 bytes | Public instruction-module boundary retains the real default bump store | [PR202](https://github.com/lalalune/pumpfun-source/pull/202) |

The typed CPI implementation derives instruction fields/account order from the
public IDL and static ABI evidence; its Rust type names and ownership topology
are reconstruction choices, not historical-source proof. No machine-code bytes,
assembly template, fake Source object or binary patch is injected. The existing
instruction discriminator is ordinary protocol data, not executable code.

Three already-published Crank diagnostics from [PR197](https://github.com/lalalune/pumpfun-source/pull/197)
are preserved: disabled/zero-amount messages and ordinary overflow error
conversion. Two independent source controls also compose here:

- Native SyncNative uses the observed writable/non-signer third account and the
  ordinary unsigned `invoke`, rather than adding signer seeds to that native CPI.
- Anchor's checked `sub_lamports` / `add_lamports` methods replace unchecked
  arithmetic. A newly added max-ATA-plus-one boundary exposed a panic in the
  earlier typed control where the original returned ArithmeticOverflow; the
  accepted source fixes that case and preserves its adjacent-success control.
  [PR205](https://github.com/lalalune/pumpfun-source/pull/205) independently
  publishes the same checked-credit correction; this union does not claim
  exclusive discovery of that boundary.

The native-privilege and typed-CPI controls were **parallel** experiments on
PR197's diagnostics source, not a fictitious sequential chain. The checked
arithmetic change followed the typed control. Their isolated artifacts remain
local; only their explicitly tested union is represented by this patch.
Later [PR201](https://github.com/lalalune/pumpfun-source/pull/201) native-only
Crank lifetime/zero-exit work is a separate source experiment, **not included**
here. This packet pins its exact baseline rather than claiming all moving
upstream behavioral changes are incorporated. The separate legacy/V2 distribution
helper recoveries in [PR206](https://github.com/lalalune/pumpfun-source/pull/206)
are also outside this frozen union, not extra gains claimed here.

## Fresh static comparison

Optional `compare.py` directly remeasures supplied local compiler outputs with
three hash-pinned public parser files. It consumes no saved measurement,
compiler or runtime receipt and performs no download, Git invocation, build or
VM run. Recorded static hashes/counts/addresses in `expected.json` were generated
by that same fresh comparison, not copied from execution evidence.

| Measure | Public parent | This union |
| --- | ---: | ---: |
| Normalized counterparts | 552 | 558 |
| Raw local counterparts | 118 | 143 |
| Unique complete-body pairs | 405 | 411 |
| Equal decoded Location uses | 163 | 165 |
| Candidate ELF bytes | 872,200 | 874,040 |
| Actual direct-edge observations | 3,249 | 3,332 |
| Common-position byte differences | 456,241 | 446,635 |

There are no prior normalized or raw-window losses. All **83 actual direct
callees** from the six gained bodies have complete matching shapes. All **3,233
previously equal direct-callee obligations** survive; **13 actual callee edges
still target unequal complete bodies**. Ambiguous duplicate shapes are not
arbitrarily assigned a unique identity. All 163 prior decoded Location values
remain equal, with two additional matched uses. These are one-hop callee/Location
checks, not unrestricted object, recursive, indirect or semantic closure.

The candidate is 784 bytes longer than the original 873,256-byte meaningful ELF;
446,635 common positions still differ. Section length deltas are `.text` +48,
`.rodata` -88, `.data.rel.ro` +248 and `.rel.dyn` +576. `.dynstr` and `.shstrtab`
are raw-equal. Complete capture equality (948,944 bytes) also remains false.
Window counts, size differences and positional distances are not percentages of
remaining work or semantic correctness. All four core whole identities remain
unresolved; no selected checkpoint is replaced.

Candidate SHA-256: `6813c01c8b72dc3f87f883e55a4ed45be8ec76c06729ef3a1aa56c25d9ec0341`.
Symbols SHA-256: `b17130a340dd550be7f62c8b3478917f7b59622b04c8038e9973c81aed191d47`.

## Local execution observations, not downloadable proof

The public control was independently reproduced exactly. Two accepted root-clean
native builds repeated both output hashes with a verified dependency/math cache;
these are not fresh all-dependency builds or OS-isolated compilation claims.
Local finite regression passed 17,331 cases / 18 suites, all 357 covered
application-log cases and both added arithmetic boundary fixtures; their saved
synthetic signatures were independently checked. Source-specific local audits
also bound the new Admin, initializer and Buyback direct objects and the typed
CPI helper/abort/caller boundary. None of those execution/build receipts, logs,
fixtures or encoded derivatives is published here.

**Authentic fixed-admin initializer success is not exercised by the standard
corpus.** Passing finite cases does not establish exhaustive behavior, complete
runtime log/compute-unit equality or unrecorded CPI privileges. The default
source tools explicitly report `native_build_verified=false`,
`runtime_verified=false` and `whole_binary_identity_verified=false`.

## Verify and materialize

```sh
P=research/fees-six-window-source-integration
python3 -B "$P/verify.py"
python3 -B "$P/test_scope.py"
python3 -B "$P/materialize.py" --parent-source /exact/public195-origins-source --output /fresh/source
```

`manifest.json` lists every exact public revision/path and both full source hash
maps. Materialization accepts only the 42-file parent, reverses every readable
patch hunk exactly, preserves unrelated inputs and writes a fresh 43-file tree.
Unsafe paths, symlink outputs/ancestors and altered source maps fail closed.
Thirteen stdlib tests cover patches, source drift, false runtime claims and paths.
No default mode reads a compiler output or runtime receipt.

Use the [pinned Linux v1.44 recipe](https://github.com/lalalune/pumpfun-source/blob/0b5b69c6d4396ac520d1723fa8bd005e2cbbe549/research/fees-current-source-integration/README.md#guarded-portable-build-recipe)
with official authenticated tools, the pinned stripper, unchanged locked 252
registry packages, entrypoint 2.2.1, separate math crate, default Anchor/SPL
features, source-path remapping and release profile. Require a real root
compiler invocation rather than accepting cache-only output; if rebuilding math
rather than using the verified cache, require its real compiler invocation too. Fresh dependency
and relocated-path reproduction remain separate checks. Never repair a binary
hash by replacing or patching its output.

For explicit static comparison, prepare the three public source files named in
`parser-inputs.json` at revision `fa8ef8040ee642302fd52f88656ddc8cf2b8cad9`,
preserving their repository-relative paths beneath a parser root:

```sh
python3 -B "$P/verify.py" --original /path/to/original.so \
  --baseline-build /path/to/public195-build --candidate-build /path/to/union-build \
  --parser-root /path/to/pinned-parser-root
```

Each build directory must contain `candidate.so` and `symbols.so`. All three
parser hashes are checked before import. The expected original SHA is pinned,
and the full result must match `expected.json`. No executable/archive payload
or archived build/runtime report is included in this source-only packet.

Review preserves significant source/patch whitespace with three exact package-local
Git attribute rules. The source verifier checks their literal contents. No compiler
input bytes or claimed execution scope changes.
