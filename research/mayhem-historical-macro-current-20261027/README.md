# Complete historical Anchor macro in current Mayhem source

The complete historical `declare_program!` macro now reproduces the current
allocator-context artifact, without a manually rendered parser. Two new native
root compilations produce identical stripped and symbol ELFs. Applying the actual
upstream Solana gate to that macro reproduces the prior parent's stripped ELF.

This closes the current-source composition gap left by the
[older historical-macro experiment](../mayhem-historical-macro-context/README.md).
It adds no complete original function match: the result remains **429/441
normalized, 139 raw-local and twelve unmatched windows**. The existing 39-body raw
gain and allocator call are preserved; they are not counted again.

| Control | Stripped SHA-256 | Meaning |
| --- | --- | --- |
| Historical macro + historical CreateEvent, both root builds | `ed5b4020ca2659b427739a384bc7c014e2b192f81cce60d7d9b770d4978f0232` | Exactly the previously published current parser-context artifact |
| Same current program sources, historical macro with upstream Solana gate | `f4f6a36829043aac0a49f1604b84cdf3650c88d3acee49ef6bf1e5f32a63e583` | Exactly the current parent artifact |

The two enabled symbol ELFs also agree:
`281c2f67a587bd913fd7f84a4faf3f9e2e9543890a9a2fb8d61ca1d7d5e938ba`.
Compared with the previous parser-context symbol ELF, only `.symtab` and `.strtab`
section payloads differ. Section-header metadata is outside that statement.

## Source and compilation scope

The 67-file program source set changes only the curve crate's IDL and its
`declare_program!` invocation. The IDL retains the three existing CPI instructions
and takes CreateEvent from the historical public IDL. The invocation names the
complete historical macro explicitly. The existing token-interface re-export and
every program handler remain unchanged.

Both enabled and gated host macros are freshly compiled on the current native
SDK from the 121 authenticated historical Anchor files, the recorded lockfile
and ten supplemental crates already retained by the parent packet. The gate is
the exact upstream change whose resulting Git blob is
`4fb84b0879c07819886ba419fee5b6434436555d`. These host builds do not establish the
original Mayhem toolchain.

The target compiler is the existing mixed Mac-host/Linux-target v1.54 recipe.
An independently recompiled current curve crate retains all 29 original
executable sections; only `finish_grow` changes from 312 to 328 bytes. Ten
generated sections are added and discarded by the final link. The gate leaves
all original executable sections unchanged. Root builds reuse the current
baseline's target libraries and the unchanged qualified linker ordering; they
are **incremental compilations, not fresh full dependency builds**. Post-run
archive hashes are labeled accordingly.

The initial collector expected `libmayhem_recovered.so`, while the successful
target compiler emitted `mayhem_recovered.so`. Its failed collection assertion,
both successful compiler records and the subsequent collection receipt are
retained. The output was copied and stripped; compilation was not repeated to
conceal that failure.

The binary is identical to the already tested parser-context artifact, so the
earlier 6,636 trade and 69 initializer comparisons retain their original artifact
bindings. **No new target execution is claimed here.** Original historical
source identity, a wholly historical framework/runtime, selected promotion and
whole-original ELF identity remain unproven.

## Nine additional source controls

`controls/` preserves the exact source bases, each changed state file, compiler
inputs, native outputs and measurements for six quote-cap controls and three
initializer ownership controls. All use ordinary source changes and unchanged
normalization. They add no full original body match.

- Compound/explicit cap comparisons and reversed equality operands reproduce
  already observed quote artifacts. The best remains 1,120 bytes with 124/140
  equal-position slots and 125 aligned slots; its ten callee shapes and typed
  references remain separately checked.
- Passing the mint account by value or reference produces the same 960-byte
  initializer, with 97 equal-position slots. Passing its borrowed key produces
  920 bytes. Neither improves the prior 960-byte, 101-slot control.

These diagnostics do not replace the current source or create new accepted
coverage. No stopped sweep experiment was resumed.

## Verify

```sh
python -I -B research/mayhem-historical-macro-current-20261027/verify.py
python -I -B research/mayhem-historical-macro-current-20261027/test_verify.py
```

Verification reads saved evidence only. `controllers/` preserves the actual
workspace-specific commands and their failure history; it is not a portable
turnkey rebuild interface. The historical sources and their Apache-2.0 license
remain in the parent packet; the source/build and artifact distinctions above
apply even when all checks pass.
