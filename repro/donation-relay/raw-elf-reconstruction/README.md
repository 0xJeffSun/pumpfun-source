# Relay: raw ELF reconstruction with an inferred linker layout

**The source-compiled 818,280-byte ELF is byte-identical to the meaningful ELF
in the captured Relay binary.** This is a separately labeled **nonhistorical
reconstruction recipe**, not a claim to have recovered the original build recipe.
The four core programs are still not fully byte-identical (0/4); Relay is a fifth
dependency, not the whole project.

| Object | Length | SHA-256 |
| --- | ---: | --- |
| Source-compiled, stripped ELF | 818280 | `56d81ec64a0ba070d3d23f3c1547b31d659e85716dfa2198ec4b0ce6cd355333` |
| Captured loader allocation image | 830448 | `367f07a62e3f74d358187d175cf3228848e81a56c781a9a75b9df7fed1268563` |

Every ELF header, program header, section header, code byte, data byte, dynamic
symbol and relocation byte matches directly. There are **zero differences**, no
address masks, relocation normalization, mapped-window substitution or copied
original machine/data bytes. The compiler output is shorter than the capture:
the capture has an additional **12,168 all-zero allocation bytes** after its ELF.

## What changed

Use the exact 60-input ordinary-source reconstruction published in
[PR189](https://github.com/lalalune/pumpfun-source/pull/189), which recovered all 492
complete normalized windows but still differed at 18,623 raw file positions.
Add one metadata-only linker script, `inferred-text-layout.ld`. Its 492 unique
object/section selectors put the compiler's own input sections in the inferred
original order. Archive/member qualification distinguishes duplicate local
symbol names. It contains no bytes, integer addresses, fill directives, included
binary data or output patching. LLD resolves all calls, data pointers and
relocations normally. No captured executable payload, assembly template or ELF artifact enters the
compiler inputs. Semantic source constants were legitimately recovered through
reverse engineering.

The ordering was derived from a complete one-to-one correspondence: each
original and rebuilt function is used once, with 4,320 direct-call edges,
1,869 relocated instruction references, 359 data pointers, 507 nonpointer words
and 2,327 relocation records checked. The final claim is stronger and simpler:
unmodified file bytes compare equal over the entire meaningful ELF extent.

A same-candidate-order control reproduces the prior ELF and symbols exactly.
Two root-clean ordered builds reproduce both hashes. A third build in an
empty-root filesystem namespace, mounting only the reviewed source, SDK,
registry, dependency seed and fresh output, reproduces both hashes with captured
originals, comparison outputs, checkout evidence, Git and user home absent.
Cargo runs offline; that check does **not** claim a separate network namespace.
A fourth build starts from an entirely empty target in the same filesystem
allowlist and recompiles all pinned dependencies and the root without any seed;
both hashes again match exactly. These are local observations, not archived
build receipts in this packet.
Fresh finite offline replay also passed all 536 saved signed records (534 unique
fixtures); this is not exhaustive semantic verification. No binary, archive,
encoded executable, transaction fixture or build/runtime receipt is published.

Natural-source/historical-recipe work remains separate; a linker-order file is
an explicit inferred reconstruction input. No selected checkpoint is replaced.

## Reproduce from public source

Materialize the `complete492` default source with the pinned PR189 packet:

```sh
W=repro/donation-relay/donation-wrapper-source-proposal
python3 -I -B "$W/verify.py" --materialize work/relay-492-base
P=repro/donation-relay/raw-elf-reconstruction
python3 -B "$P/verify.py"
python3 -B "$P/test_verify.py"
python3 -B "$P/prepare.py" work/relay-492-base work/relay-raw-source
```

`prepare.py` rejects any difference in the complete 60-input map and adds only the
script. Authenticate official Anza platform-tools **v1.48**, the same 253
Cargo.lock registry packages, and ordinary build-script/proc-macro sources before
running the native build. Preserve default features/release profile. The SDK
archive SHA-256 is
`a9d3157f937d5f6faf4321a35a8035e0f827114a663b0150db492e893ec27597`;
`rustc` SHA-256 is
`89fd4ccdd6e678a24c2cda074b498b46a352fcfce21018119c9526751afc678d`;
`llvm-objcopy` SHA-256 is
`3a871eab7279dee53f2580e8a022c980305738b575755b7d3529a6230ec4f672`.

```sh
sh "$P/build.sh" /absolute/relay-raw-source /absolute/platform-tools-v1.48 \
  /absolute/checksum-verified-cargo-home /absolute/new-build
python3 -B "$P/verify.py" --original /path/to/captured-original.so \
  --compiled /absolute/new-build/candidate.so
```

The standalone build starts with an empty target. `build.sh` reads no captured
program. Comparing after compilation is separate from build inputs. Inspect the
linker map to confirm all intended selectors matched; quoted filename wildcard
patterns were a rejected no-op control, so this script uses ordinary unquoted
filename globs and quoted exact section names.

## Separate captured-allocation reproduction

`allocate.py` does not modify an ELF. It creates a new, explicitly sized loader
allocation image: the compiled ELF followed by zeros. The allocation size is
metadata, not inferred by reading a capture during generation. For this capture:

```sh
python3 -B "$P/allocate.py" /absolute/new-build/candidate.so \
  /absolute/new-build/relay-allocation.bin --size 830448
python3 -B "$P/verify.py" --original /path/to/captured-original.so \
  --compiled /absolute/new-build/candidate.so \
  --allocation /absolute/new-build/relay-allocation.bin
```

The generated allocation image must compare
byte-for-byte equal over all 830,448 bytes and have the captured SHA-256 above.
This is a loader-container reproduction, **not** a claim that the compiler emits
the allocation tail or that the historical deployment process is recovered.
The ELF itself is never rewritten, patched or replaced.

Default verification checks only packet integrity and metadata grammar. It
reports `comparison_performed=false`, `compiler_executed=false` and
`runtime_verified=false`; only explicit local comparison can establish equality.
