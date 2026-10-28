# BuyV2 typed price and owned CPI error composition

This composes two ordinary Rust changes onto the exact current 67-input Mayhem
source: a shared typed price-check result and an owned CPI error conversion.
Only `src/instructions/buy_v2.rs` changes. The other 66 inputs, program namespace,
generated definitions/references, account parser, and existing Source coordinates
remain byte-identical.

The live BuyV2 body now has the same **49-callee multiset** as the original.
The current parent has 78 calls, including 27 extra standalone AccountInfo clone
calls and different error-conversion helpers. The typed price result removes
those extra choices; the owned CPI callback supplies the remaining original
AnchorError-to-Error conversion. The actual matched entry wrapper and its call
at offset760 identify both business bodies. No nearest-address attribution is
used.

This is a partial caller recovery. Ordered-call LCS is46/49, call positions and
the complete body still differ, and **zero new complete original windows** are
claimed. All432 normalized original counterparts,84 native raw-local windows and
4,383 positive immediate edges are preserved by exact set comparison. The
mixed-host qualified artifact's100 raw-local windows are a separate result.

## Actual builds and controls

| Actual source profile | BuyV2 body bytes | Calls | Original callee multiset |
| --- | ---: | ---: | --- |
| Current native parent | 7,688 | 78 | Different |
| Existing inline clone adapter | 7,688 | 78 | Different; both complete ELFs equal parent |
| Typed price result | 17,272 | 48 | One original Error conversion missing |
| Explicit AccountInfo construction | 17,336 | 51 | Different |
| Typed price plus owned CPI error | 17,376 | 49 | Equal |
| Actual second root compilation | 17,376 | 49 | Equal; both complete ELFs reproduce |

The original body spans18,648 bytes. More bytes or a closer length is not a match
criterion. All twelve complete ELF files, actual launch/results, compiler logs,
source maps/overrides, and six new standard SDK objcopy replays are retained.
Five new root compilations were executed for this study; the parent compilation
is reused with its original provenance. Dependencies are warm, not a clean
all-dependency rebuild. The official Linux SDK v1.54's six tool and26 target
library hashes agree before/after these experiments.

The proposed765,440-byte artifact is
`4dd7e106064ca03d9426acdcc7d41d6349a7ef17cc72f87de869d3a3e703c801`;
symbols hash
`c30567a241418026515bef73a6dcd26f7e4b4f74b128683203abf38886dc0c41`.
Two independent root compilations produce both files byte for byte.

## Fresh signed runtime comparisons

Both the actual native parent and proposed artifact run all613 frozen cases in
each quote family. These are **1,839 fresh original/candidate pairs per artifact**,
3,678 pairs and7,356 independently verified signed records in total. There are
no new unique cases. A preceding one-pair smoke is separate from these counts.

| Quote family, per artifact | Pairs | Successful pairs | Rejected pairs | Non-compute log differences | Raw log differences |
| --- | ---: | ---: | ---: | ---: | ---: |
| Native SOL | 613 | 284 | 329 | 0 | 466 |
| SPL Token | 613 | 210 | 403 | 0 | 466 |
| Token-2022 | 613 | 210 | 403 | 0 | 466 |

Both artifacts have zero compared error, account, event, return, CPI or signed
transaction mismatches. The unchanged independent verifier reconstructs successful
quote/state/event/CPI obligations, verifies signatures, and checks rejected
transaction rollback. A forwarding observer records the actual six loaded
program data hashes before and after every signed VM execution. Signature,
blockhash, authority, signer and CPI checks stay enabled; all seventeen frozen
input files remain unchanged.

The zero non-compute difference result belongs to this actual current parent and
proposal. The older118-difference result used an earlier artifact and is not
presented as a new improvement here. Raw compute logs still differ in1,398 pairs
per artifact. Finite successful/rejection matrices do not prove exhaustive
behavior, resource equivalence, or execution of the CPI-error callback.

## Remaining code and data differences

The original CPI error embeds filename length61 and line376 from
`instructions/pump_interface_v2.rs`; this current source embeds length50 and
line101 from `instructions/buy_v2.rs`. Those actual filename/line differences
remain explicit. This packet preserves the current macro location101:2 and
does not rename modules/files or substitute original Source fields.

The full instruction layouts and other data remain open. No whole-ELF identity,
complete call/data graph, transitive closure, historical source identity, or
canonical promotion follows from matching a callee multiset. Original binaries
are read-only comparison/VM inputs, never compiler or linker inputs. No assembly,
binary rewriting, padding, relaxed masks, selected program, frozen script,
workflow, status ledger, sweep, Burn or Relay changes are made.

## Recheck offline

Use Python3 with solders0.27.1 installed:

```sh
python3 -I -B research/mayhem-buy-v2-typed-ownership/verify.py
python3 -I -B research/mayhem-buy-v2-typed-ownership/test_scope.py
```

Verification authenticates every packet file and three external inputs,
recomputes all static observations with byte-exact existing readers, unpacks the
lossless runtime archives, and reruns the frozen independent signature/state
checker. It executes no VM, compiler, Git command, or network request. Source,
input and archive members are hash-bound; no unsealed cache is used.

The scope test changes actual in-memory ELF bytes. It rejects malformed Source
fields/routes, observes a changed valid line, leaves an adjacent byte outside the
counted filename, and detects a wrong callee that the unchanged ordinary call
normalization alone cannot distinguish. Reference files are never modified.

`controllers/` retains the actual producers and absolute commands as provenance.
For another VM replay, stage `runtime/inputs.tar.xz` and its bindings under the
observer's `buy-v2-current-ownership-runtime/inputs` directory; select the desired
actual ELF with `--candidate` and quote family with `--family`. A new compiler run
also needs the recorded SDK and compatible dependency cache. `preparation.json`
retains the failed strict store-order assumption and its bounded correction.
