# Byte-checked original disassembly, Linux v1.44

The four captured core programs were disassembled with the official Linux
platform-tools v1.44 `llvm-objdump` (LLVM 18.1.7-rust-dev). Every executable
file-section byte was checked against its listing. The independent checker
accepted all 4,460,640 executable bytes, with no missing, repeated, mutated,
unparsed, or `<unknown>` instruction rows. These are original-derived analytical
listings, not candidate compiler output or reconstructed programs.

| Program | Executable bytes | Instruction rows | Eight-byte slots | LDDW rows |
| --- | ---: | ---: | ---: | ---: |
| Pump | 1,792,208 | 215,873 | 224,026 | 8,153 |
| PumpSwap | 1,162,040 | 139,524 | 145,255 | 5,731 |
| Fees | 799,648 | 96,083 | 99,956 | 3,873 |
| Mayhem | 706,744 | 83,947 | 88,343 | 4,396 |

LLVM prints decimal SBF instruction-slot addresses. A sixteen-byte LDDW occupies
two slots but one listing row. The verifier checks those widths and addresses,
compares all raw bytes, and requires complete coverage of every executable file
section. It does not infer control-flow reachability or function boundaries and
does not independently validate LLVM's mnemonic/operand semantics.

`manifest.json` pins the official archive URL, length and SHA-256, the actual
decoder executable hash/version, the generator/checker source hashes, and every
original/listing hash. Original hashes agree with the existing
`evidence/disassembly-manifest.json`. Before/after hashes of the originals and
tool agree for the successful capture. Historical disassembly evidence is untouched.

To reproduce from a checkout, extract the pinned official archive into a separate
tool directory without changing its bytes, then choose a fresh output directory:

```sh
python3 scripts/disassemble.py --objdump /path/to/v1.44/llvm/bin/llvm-objdump \
  --output work/disassembly-v144-new
python3 scripts/verify_disassembly.py evidence/original/pump/deployed.so \
  work/disassembly-v144-new/pump.asm
python3 scripts/test_disassembly.py
```

The generator uses repository-relative binary arguments, so checkout root paths
do not enter the listings. Regenerated output hashes can be compared with the
manifest. The large listings are reproducible and are not duplicated in this
packet. No source reconstruction, candidate binary, accepted handler count,
runtime coverage, historical compiler attribution, or whole-file identity status
is changed by this checkpoint. Core binary identity remains 0/4.
