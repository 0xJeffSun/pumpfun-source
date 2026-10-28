# Fresh AMM union6 compiler controls

The union6 packet's two workspace crates were rebuilt over an existing dependency cache. This packet independently
builds its **unchanged 62-file workspace**, including host macros and target dependencies, from the 257 packages pinned
by its Cargo.lock. Every successful run starts with a new target directory and records **215 rustc commands: 91 host
and 124 target**, with zero Cargo `Fresh` lines. No SBPF program is executed.

The source is the Git-bound archive at `51e7dbe3f9bf16ea00a193c2468a42ecdff1fa18`, merged in PR494. PR480's exact mint
scanner remains raw-identical in every successful build. PR489 separately supplies whole-program integration and
runtime work; this packet does not duplicate or inherit its runtime qualification.

| Build | Normalized original windows | Raw original windows |
|---|---:|---:|
| Archived Linux union6 | 779/785 | 220 |
| Fresh Windows v1.44, shipped target libraries | 774/785 | 211 |
| Same Windows tools, official Linux v1.44 target libraries | 779/785 | 221 |

The Linux-library runs preserve every archived normalized and raw match, and add the raw 1,424-byte Borsh array
serializer at original `0xcaa8`. The complete emitted ELF repeats across three fresh builds, including the supplied
`build.py`. The Windows-library output repeats with implicit and explicit selection of the same shipped linker.

## What the controls establish

The source, registry packages, compiler and linker remain fixed in the explicit-linker controls; the target-library
cohort changes. The five recovered 56-byte windows are
`0xa9b0`, `0xf8ca0`, `0x1016a8`, `0x10efd8`, and `0x111b38`, labeled `Error::type_id` / `Any::type_id` by the candidate.
Four original windows share one byte pattern; these are five window matches, not five uniquely identified types.
This is a controlled compiler-input result, not proof that the deployed program historically used this SDK.

The extra serializer match comes from ordinary relative placement. The archived serializer differs in exactly eight
call instructions, at offsets 72, 256, 432, 608, 792, 968, 1144, and 1304. In the fresh output, both the serializer and
its reserve helper sit 360 bytes before their original addresses, yielding all original relative call distances.
The serializer's full raw hash is `f4fde9c4a57ec6533d67d38b6a07e73d4bddf5a9c39447b11e7582fc9d3bef63`.
All eight calls reach the actual 328-byte reserve helper. That callee matches **only after normalization**, so this
does not establish raw transitive call-graph identity. `raw-gain.json` and `verify.py` retain and recompute this limit.

No workspace source, registry source, IR, object, binary, instruction bytes, or linker layout is modified. No
original-derived layout or metadata map is supplied. The unused vendored `solana-pubkey` files in the input archive
are preserved; they are not substituted for the registry dependency.

## Exact outputs and retained failures

| Cohort | Compiler-produced ELF SHA-256 | Ordinary `--strip-all` ELF SHA-256 |
|---|---|---|
| Windows target libraries | `94f25e576e4b9a4516b065e163a65997916c434697fa77d1f88b4fca8c878ee3` | `0a69e3c2d808943a987bb5b867a9f9dd29aefe4bbd71b85d89a969c581942eb4` |
| Linux target libraries | `4c0411c27e14e9c718f7956981dbf5ffa8966011c23764cbf81cffd695edb978` | `8962cf8c2b16720c2683e97fee8a1626f6945e5616df19c80e233aa60eeeb8ff` |

Five successful builds contain 1,075 compiler commands. The failed initial Linux-sysroot run contains 189 compiler
commands and stops because `rust-lld` is not found under the relocated sysroot. Its full launch, logs, outcome, and
artifact inventory remain in `builds/02-linux-sysroot`. Selecting the existing Windows SDK linker explicitly fixes
that locator problem; the Windows control proves this explicit selection does not change its complete ELF.
The inherited `admin_update_token_incentives` frame-overwrite diagnostic remains in all successful logs.

Both official SDK archives declare Rust revision `08b7341888ab480dfaaa0698300cbbbbb2d75b53` and Cargo revision
`804e325435de2e669e3833b7abab018a99113b16`. The Windows compiler reports 1.79.0-dev / LLVM18.1.7 and an unknown commit
in `-vV`; the revision above comes from `version.md`. The Linux archive SHA-256 is
`6719b889d60677a8a2fcf4c82f68441a1afe0ab093edd2efe9f84a67a808b3e9`. Only its 25 target-library files and version file
are used. `sdk-components.json.gz` pins the 1,831 selected Windows SDK files; `vendor-files.json.gz` pins 8,437 files.
Registry archive hashes are verified against the unchanged Cargo.lock. Receipts establish reproducibility and
internal consistency, not cryptographic execution attestation.

## Replay

Python 3.11 or newer, standard library only, no compiler, network, target VM, or repository-relative dependencies:

```sh
python -I -B research/amm-fresh-v144-20261028/verify.py
python -I -B research/amm-fresh-v144-20261028/test_verify.py
```

All 14 evidence tests pass, including relocated replay with network/process creation forbidden, changed compiler
flags, changed source bindings, reused-cache claims, rewritten compiler output, and overstated callee identity.

For a new compilation, supply the pinned Windows v1.44 SDK, the unchanged locked vendor directory, MSVC14.44.35207,
Windows SDK10.0.26100.0, and an absent output directory. The optional Linux input directory contains `version.md` and
`rust/lib/rustlib/sbpf-solana-solana/lib/`. The controller verifies inputs before and after the offline Cargo build.

```sh
python -I -B build.py --sdk WINDOWS_SDK --vendor LOCKED_VENDOR --linux-sysroot LINUX_INPUTS --msvc MSVC_DIR --windows-sdk WINDOWS_KITS_DIR --output NEW_DIRECTORY
```

Omit `--linux-sysroot` for the Windows target-library control. The input archives are the official
[Windows v1.44 release](https://github.com/anza-xyz/platform-tools/releases/download/v1.44/platform-tools-windows-x86_64.tar.bz2)
and [Linux v1.44 release](https://github.com/anza-xyz/platform-tools/releases/download/v1.44/platform-tools-linux-x86_64.tar.bz2).
`vendor-acquisition.json` lists each checksum-bound registry URL. Historical local acquisition/build controllers are
retained under `controllers/`; their paths describe the recorded experiment. `build.py` is the tested parameterized
entry point. Whole-file equality was tested with fresh output directories on this host; other installation/vendor
paths and tool installations are not claimed to produce these whole-file hashes.

## Limits

The six original windows still unmatched are `0x19138 0x2ba60 0x351a8 0x40a08 0x4c750 0x6db20`. Neither compiler output
equals the archived Linux ELF or the original allocation capture. No allocation tail is synthesized. Normalized
matches mask address/call operands and do not prove data-reference or behavioral equivalence. Runtime and log parity
for these fresh artifacts remain unmeasured. There is no maintained checkpoint promotion, completeness, security,
historical source attribution, or new global coverage claim.
