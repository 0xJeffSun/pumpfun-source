# Fresh Linux replay of the qualified Fees 583 frontier

A new official Linux v1.44 build, starting with an empty target directory,
reproduces **both complete published PR308 outputs byte for byte**:

| Output | SHA-256 |
| --- | --- |
| Symbol ELF | `f150b4c68704c44584968d2fb9a20e67323fe074ff1e2c201445fa9a01eb444f` |
| Stripped ELF | `e5c3d2982a262b2bdc798b3799808b9a397e4f2ca3e72289ad310550e96a58c0` |

This independently confirms that the qualified artifact can be regenerated
with the complete 46-input workspace and 18-input macro vendor. Source and
recovery credit remain with [PR308](https://github.com/lalalune/pumpfun-source/pull/308)
and its ancestors. All source hashes equal that packet's published map.
`qualified-source-bindings.json` records the exact Git source blobs and overlay
chain. This is source authentication, not a rerun of every ancestor's verifier.

The SDK archive was downloaded from the official release and checked against
`6719b889d60677a8a2fcf4c82f68441a1afe0ab093edd2efe9f84a67a808b3e9`.
The recorded controller checks its selected compiler/linker and target-library
files before and after compilation; it does not inventory every host library.
The registry began with 111 matching archives; normal locked fetch supplied
the missing packages. The actual build used `--locked --offline`, normal Cargo,
the inherited qualified linker script, and a new target directory. Its build
log retains every invocation. The second source control reuses dependencies.

A one-expression safe Rust control converts Crank's CPI `ProgramError` to the
Anchor result before dropping the same three account references. Its source
line count stays fixed. Crank changes from 15,224 bytes / 1,862 instructions to
15,664 / 1,916; the original is 15,976 / 1,950. This composes the previously
reported error-lifetime idea on the exact qualified source, and still leaves
the complete body unequal. CreateDonation stays 11,112 bytes against 13,800.
Both controls retain exactly the same **583/585 normalized and 200 raw** original
windows under the unchanged decoder and normalization. No new match is claimed.

```sh
python3 -B research/fees-linux-qualified-replay/verify.py
```

The verifier uses only Python's standard library and the unchanged original
comparison file. `--original /absolute/path/deployed.so` supports an isolated
replay. It checks the sealed packet, all 66 archived source/linker/vendor inputs,
the reversible source patch, actual build bindings, stripped allocated sections,
complete output hashes, and injective window multiplicities.

`build_local.py` and `measure_local.py` preserve the actual private-path
controllers; their exact commands and environment are in each `launch.json`.
They are evidence of these executions, not a general fresh-host installer.
`inputs.tar.xz` contains the full prerequisite workspace and vendor; originals
were comparison inputs only and never compiler/linker inputs. No assembly,
binary patch, padding, new mask, SDK change or selected-source update is used.

There is no fresh VM execution or frontier promotion in this packet. Whole ELF
identity remains false, with Crank and CreateDonation still unmatched. The next
active investigation moves to maintained Pump Round37, per the user's fallback.
