# Register-call decoding successor

The archived deep disassembler has no case for opcode `0x8d`. Every retained
register call falls through to `raw_0x8d`, and the text names the zeroed
register nibbles rather than the register selected by the immediate. Mayhem
file offset `0x638` is the bytes `8d00000002000000`: the archived mnemonic is
`raw_0x8d r0,r0,0,2`, while the immediate form is `callx r2`.

On SBPF V0 and V1 the register number is that immediate. V2 reads the source
nibble and V3/V4 read the destination nibble
([`callx_uses_src_reg`](https://github.com/anza-xyz/sbpf/blob/main/src/program.rs),
[`callx_uses_dst_reg`](https://github.com/anza-xyz/sbpf/blob/main/src/program.rs);
the [disassembler](https://github.com/anza-xyz/sbpf/blob/main/src/disassembler.rs)
uses the immediate only when both predicates are false). All five retained
captures have `e_flags == 0`, and every `0x8d` instruction in them has both
nibbles and the offset clear, with an immediate in `r2`–`r9`.

```
python research/deep-disassembly-callx/test_generate.py
PYTHONHASHSEED=0 python research/deep-disassembly-callx/generate.py --program mayhem --output work/mayhem-callx
python work/mayhem-callx/verify.py
```

This entry point hash-checks the exact reviewed helper in its LF or CRLF
checkout form, adds only that immediate-form case in memory, and refuses an
existing output directory. It preserves root scripts, historical reports and
seals under the `scripts/README.md` convention. The comparison that produced
`validation.json` pins `PYTHONHASHSEED=0` because the archived helper turns
extern-symbol sets into lists. No callee is recovered, and no runtime
execution, source reconstruction, binary-build acceptance or security
assurance is claimed.
