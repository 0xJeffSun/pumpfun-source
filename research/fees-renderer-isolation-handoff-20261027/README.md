# Fees formatter isolation — incomplete research handoff

The execution workspace went offline during the final build request. This note preserves observations from completed builds and the next investigation step. **No new accepted match, runtime validation, full data binding, or ELF identity is claimed.** The qualified frontier remains [583/585 normalized and 200 raw-local matches in PR #301](https://github.com/lalalune/pumpfun-source/pull/301).

The native artifacts and complete new source workspaces were not exported before the outage. Hashes below identify observed local outputs; they are not a substitute for retained, independently verified artifacts. The existing [residual packet](https://github.com/shawkkkkk/pumpfun-source/blob/aafecfeda4408193048bbd7df16afd6e95c493fc/research/fees-residual-current583-20261027/README.md), published in [PR #304](https://github.com/lalalune/pumpfun-source/pull/304), remains the reproducible starting point.

## Completed observations

| Local build label | Reported original signature matches | Compiled windows | Create bytes | Result |
| --- | ---: | ---: | ---: | --- |
| `create583-mir-inline` | 390 | 588 | 15,120 | Global MIR inlining rejected: 193 fewer matches |
| `create583-isolated-renderer-retry` | 582 | 594 | 13,880 | Formatting improved; error-name implementation regressed |
| `create583-renderer-bridge` | 583 | 594 | 13,880 | Root error-name callback restored the original 8,904-byte name body |
| `create583-renderer-root-constructors` | 583 | 585 | 13,880 | Root error construction removed nine duplicate helper windows |
| `create583-renderer-merged-message` | 583 | 585 | 13,880 | Shared message storage removed the duplicated message literal |

These are the exploratory reader's signature-membership measurements. Injective original bindings and a complete reference audit still need to be rerun before qualification. The original Create body is 13,800 bytes; **the recovered candidate remains 80 bytes too long and fails full normalized identity**.

For the last completed build:

- Create has 1,651 decoded instructions.
- Its direct-call target signature multiset matches the original, with no missing or extra targets. This is a multiset check, not a check of call positions or recursive closure.
- The readonly section is 21,075 bytes, versus 21,079 original bytes. Byte-frequency comparison differs only by four fewer zero bytes; **ordering and pointer bindings are not verified**.
- The relocated-data section is 6,744 bytes.
- Symbol artifact SHA-256: `edc1b41a7023fbd55313c9f37816d80f21b28879a6ed6a20bad25af2a869a130`.
- Stripped artifact SHA-256: `a801f34da8acb295a3b2172f7d93279e215841e57eddc366def2911803ef02e0`.

Fifteen event-field controls read config/base/quote/creator public keys from the state rather than the callback inputs in all nonempty combinations. Their complete comparisons failed; body sizes ranged from 13,880 to 13,952 bytes. They added no original match.

Additional Crank controls also failed: outer-scope raw CPI error propagation produced 15,504 bytes; standard account reload produced 15,936; grouping the first or last two explicit account drops reproduced the 15,952-byte parent shape. Dropping the whole array introduced extra drop helpers. None recovers the 15,976-byte original.

## Source and compiler arrangement

The experiment uses the unchanged pinned Linux v1.44 SDK and the existing macro dependency. The SDK archive SHA-256 is `6719b889d60677a8a2fcf4c82f68441a1afe0ab093edd2efe9f84a67a808b3e9`.

Two small workspace crates isolate the existing error type and formatting operation:

1. `fees-error-types` declares the same 37 error variants, representation, messages, and conversions. Its allocation-heavy name and Anchor-error construction operations forward through typed Rust-ABI declarations to implementations in the main crate.
2. `fees-error-renderer` contains an always-inline `render_pool_error() -> String` that calls `FeeError::InvalidPool.to_string()`.
3. A rustc wrapper adds `-Zinline-mir=yes -Zinline-mir-hint-threshold=1000 -Zinline-mir-threshold=500` **only** for the renderer crate. Applying these settings to the entire program was rejected.
4. The main crate retains its allocator-visible error-name and error-construction implementations. The first is a complete normalized match for the original name function; the latter arrangement restores the 585-window count.
5. A normal linker wrapper reads the actual main-object function symbols and adds two `PROVIDE_HIDDEN` aliases to the otherwise unchanged SDK script. It rewrites no object or machine-code bytes.

The two typed declarations are:

```rust
extern "Rust" {
    #[link_name = "__fees_error_name"]
    fn host_error_name(error: &FeeError) -> String;
    #[link_name = "__fees_error_into_error"]
    fn host_error_into_error(error: FeeError) -> anchor_lang::error::Error;
}
```

Both sides use the same concrete dependency type and toolchain. Their ABI, references, and runtime behavior still require qualification; the earlier checkpoint's runtime results do not transfer.

Moving error allocation out of the main crate initially changed its name function from 8,904 to 4,776 bytes because the dependency could not inline the main crate's bump allocator. Keeping name and error construction in the main crate repaired the missing name signature and eliminated nine extra helper windows.

The duplicate message was exactly `Claim rate limit exceeded`. A public immutable 25-byte array in the error-type crate supplies the two social log sites through an always-inline UTF-8 view. The display arm retains `write!(fmt, "Claim rate limit exceeded")`; replacing it with an out-of-line formatter `write_str` call regressed the formatter body and was rejected. The successful variant allowed the compiler to merge the literal with the shared array.

## Next step and interrupted request

The next hypothesis is that linker-only aliases hide the real callback definitions from LLVM. The original allocator-visible name and error-construction functions are in the same module as Create. Directly naming those definitions may restore optimization information and change the remaining 80 bytes.

The observed main-crate symbols remained stable across the completed builds:

```text
_ZN19pump_fees_candidate24recovered_fee_error_name17hd3fad0b07befc218E
_ZN19pump_fees_candidate30recovered_fee_error_into_error17h85b7e0d2ff622284E
```

The interrupted command requested replacement of the two helper `link_name` values with those exact symbols, followed by a normal Cargo build using the default SDK linker, labeled `create583-renderer-direct-symbols`. **No execution receipt was returned. Neither the source edit nor the build's completion is established.** These names depend on the recorded package/toolchain configuration and must be rediscovered if that configuration changes.

After workspace recovery, inspect existing files and receipts before rerunning anything. In particular:

```text
/workspace/fees-recovery/create583-renderer-direct-symbols/
/workspace/fees-recovery/renderer-direct-symbols.log
/workspace/fees-recovery/source-renderer/
/workspace/fees-recovery/renderer-merged-source.tar.gz
/workspace/fees-recovery/renderer-event-fields.log
/workspace/fees-recovery/build_renderer.py
/workspace/fees-recovery/build_renderer_bridge.py
/workspace/fees-recovery/renderer_rustc.py
/workspace/fees-recovery/renderer_link.py
/workspace/fees-recovery/measure_create.py
```

Other snapshots retain earlier arrangements: `renderer-initial-source.tar.gz`, `renderer-bridge-source.tar.gz`, and `renderer-constructors-source.tar.gz`. The event-field runner restores its baseline library source on normal completion.

Recover and export the actual source archives, compiler/linker receipts and native artifacts before treating this investigation as a reproducible result. Any winning body still needs stable repeat Cargo builds, preservation of prior matches, complete reference/data/Source checks, and fresh canonical runtime execution.
