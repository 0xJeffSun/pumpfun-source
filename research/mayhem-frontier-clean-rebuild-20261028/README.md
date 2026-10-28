# Historical Mayhem 432-source rebuild experiment

This packet provides a source materializer and build driver for the historical
432-window quote-pair source. The current qualified checkpoint is
[current436](../mayhem-current436-composition-20261027/README.md), whose source,
build records, artifacts and validation are archived separately. This experiment
does not replace that checkpoint or change its metrics.

## Retained and independently checkable evidence

The materializer composes 67 files from committed inputs and checks every output
against the quote-pair packet's `source-inputs.json`. Its snapshot archive is
hash-pinned. The accompanying inventory tool independently reproduces the old
published artifact's **100 raw / 332 normalized-only / 9 unmatched** partition,
covering **598,792 / 706,744** original text bytes.

The source layers are:

| Layer | Files |
| --- | --- |
| `research/mayhem-initializer-current-recovery-20261027/source.tar.gz` | 67-file base snapshot |
| `research/mayhem-sell-current-recovery-20261027/overrides/` | `src/instructions/sell_pump_swap.rs` |
| `research/mayhem-current-ownership-composition-20261027/sources/qualified.rs` | `src/instructions/pump_interface.rs` |
| `research/mayhem-quotes-current-recovery-20261027/overrides/` | `src/instructions/buy_pump_swap.rs`, `src/state.rs` |

## Author-reported clean-build result

The author reported two fresh source/target builds using a v1.54 installation
and the default linker, with these identical outputs:

| Artifact | Reported SHA-256 |
| --- | --- |
| Unstripped | `d6ea5caa34d876a29f790ef70690daeb7a5b41d7176c36412743b70d27b05440` |
| Stripped | `6fa1945d4041587226c5091258b61ad7e1d86590024c962228820d63d1485944` |

Reported coverage was **83 raw / 327 normalized-only / 31 unmatched**,
covering **557,664 / 706,744** bytes. The clean-build binaries, logs, full SDK
inventory and execution receipts are not retained in this packet. These results
therefore cannot be independently re-audited from its files alone.

The reported difference is 22 fewer normalized windows than the older 432-window
artifact. On its own it does not isolate a cause: compiler, target libraries,
dependency builds and linker recipe must be controlled separately before
attributing a window difference to layout. This packet does not prove that the
historical recipe is unreproducible. Later archived recipes and the current436
evidence have their own explicit reproduction and qualification scopes.

## Source-path remap control: one flag accounts for 20 of the 22 windows

A single-variable control isolates one cause. The first lost window, `O0095`
(`MayhemState::validate_quote`, 1,296 bytes), differs from the default-linker
build in **exactly one slot of 162**: `stdw [r10-224], imm` stores `36` in the
original and `12` in the clean build. Those are string lengths:
`len("programs/mayhem-program/src/state.rs") == 36` and
`len("src/state.rs") == 12`. The original binary embeds every source path under
the historical crate directory `programs/mayhem-program/`; a bare build embeds
`src/…`. The archived quote-pair and current436 recipes already carry
`--remap-path-prefix=src/=programs/mayhem-program/src/` in their rustc commands;
this control measures that flag's effect in isolation, with everything else
(toolchain installation, dependency builds, default linker) held fixed.

| Recipe (same source, same installation) | raw-equal | normalized-only | unmatched | matched text |
| --- | ---: | ---: | ---: | ---: |
| default linker, no remap | 83 | 327 | 31 | 557,664 B |
| default linker, `--remap-path-prefix=src/=programs/mayhem-program/src/` | 83 | 347 | 11 | 598,712 B |
| older published 432 artifact (layered toolchain + `ordered.ld`) | 100 | 332 | 9 | 598,792 B |

The remap restores the 20 windows whose bodies carry a source-path length:
`O0071` (Burn), `O0072`, `O0074`, `O0090`, `O0094`, `O0095`, the five
`try_deserialize` instances `O0114/O0139/O0143/O0150/O0158`, the GlobalParams
validators `O0085/O0086/O0088/O0089`, the CPI-failure wrappers `O0078/O0080`,
and `O0100/O0117/O0147`. The 11 remaining unmatched windows are the published
artifact's own nine (six trade bodies, `O0075`, `O0076`, `O0073`) plus
`O0236`/`O0337`.

What the remap does **not** explain, and why:

- **`O0236` / `O0337`** (40 bytes each) are `core::error::Error::type_id`
  stubs: two `lddw` immediates holding a 128-bit Rust `TypeId` hash. `TypeId`
  incorporates the crate `-C metadata` disambiguator of the type's defining
  crate. Cargo assigns the root crate the same `metadata=cf9f0934f5538f31` as
  the published command, so the differing hash belongs to a dependency crate
  whose compiled metadata differed between the two dependency builds. This is
  dependency-build provenance, not source; see
  `research/mayhem-alloc-typeid-provenance`.
- **17 raw-equal windows** (11,416 bytes) are normalized-only here but raw-equal
  in the published artifact. Their instruction bytes are identical after
  masking; only absolute call/data immediates differ, because the default
  linker places functions differently from `ordered.ld`. Raw-equal counts, not
  normalized counts, are the layout-sensitive measure.

Both recipes were run twice from scratch (fresh materialized source, fresh
target directory) with identical outputs:

| Recipe | Unstripped SHA-256 | Stripped SHA-256 |
| --- | --- | --- |
| default, no remap | `d6ea5caa34d876a29f790ef70690daeb7a5b41d7176c36412743b70d27b05440` | `6fa1945d4041587226c5091258b61ad7e1d86590024c962228820d63d1485944` |
| historical path remap | `1e12f53043efe10370cc60f470e1d90e3aa496fcba5f8b7118dfb61842d68458` | `3c33835363257b8012078cb04f9495f30c5aaeee447184a0d092de0c24b77f17` |

This control changes no checkpoint. It uses the same unauthenticated local
installation as the rest of this packet, and normalized matches do not
establish raw whole-body, recursive call/data or whole-ELF identity.

## Run the historical experiment

```sh
python3 -B research/mayhem-frontier-clean-rebuild-20261028/materialize_frontier_source.py <new-source-dir>
(cd <new-source-dir> && ~/.cache/solana/v1.54/platform-tools/rust/bin/cargo fetch --locked)
research/mayhem-frontier-clean-rebuild-20261028/build_and_measure.sh <new-output-dir>

# the same with the historical crate path remap
REMAP_FLAGS='--remap-path-prefix=src/=programs/mayhem-program/src/' \
  research/mayhem-frontier-clean-rebuild-20261028/build_and_measure.sh <new-output-dir>
```

The driver expects a v1.54 installation and v1.52 strip tool under
`~/.cache/solana/`, an offline Cargo cache and `.venv/bin/python`. It uses those
paths without independently authenticating the SDK binaries. Check the intended
tool installation against the repository's supported SDK policy before using
its outputs as toolchain evidence. The driver builds fresh dependencies in a
new target directory and uses the default linker.

No runtime replay is retained or claimed for these reported clean-build
artifacts. The older quote-pair packet's 6,636 trade pairs bind only to that
packet's own artifact. Normalized matches do not establish raw whole-body,
recursive call/data or whole-ELF identity.

## Recheck

```sh
.venv/bin/python research/mayhem-frontier-clean-rebuild-20261028/verify.py
```

Rebuilds both recipes into a fresh temporary directory from the pinned source
inputs and asserts the artifact hashes, 441-window counts and matched text
bytes recorded above. A zero exit means every recorded value reproduced on the
current host with its installed tools; it does not authenticate those tools.
Use `--only <recipe>` for one recipe or `--keep <dir>` to retain the outputs.
