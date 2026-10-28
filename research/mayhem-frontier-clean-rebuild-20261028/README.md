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
artifact. It does not isolate a cause: compiler, target libraries, dependency
builds and linker recipe must be controlled separately before attributing a
window difference to layout. This packet does not prove that the historical
recipe is unreproducible. Later archived recipes and the current436 evidence
have their own explicit reproduction and qualification scopes.

## Run the historical experiment

```sh
python3 -B research/mayhem-frontier-clean-rebuild-20261028/materialize_frontier_source.py <new-source-dir>
(cd <new-source-dir> && ~/.cache/solana/v1.54/platform-tools/rust/bin/cargo fetch --locked)
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
