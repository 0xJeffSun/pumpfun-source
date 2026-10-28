# pump — 5-Layer Deep Section Analysis

## Scope
Comprehensive cross-section analysis of the deployed pump binary,
covering data layout, relocations, data dependencies, Anchor IDL recovery,
and mathematical pattern extraction.

## Binary
- SHA-256: `7a19affaa2c6187e04a5fe0ea298cee81fa5eb8c24cfcc30d85f615e89f7b02d`
- .text: 1,792,208 bytes

## Layer Results

### Layer 1: Data Layout
- Sections analyzed: 2
- Strings extracted: 74
- Pointer-like values: 1

### Layer 2: Relocation Map
- Total relocations: 6147
- In .text: 5557
- In .rodata: 0
- Unique symbols: 17

### Layer 3: Cross-Section Correlation
- Windows referencing .rodata: 521
- Windows referencing .data.rel.ro: 435
- Total data references: 3628

### Layer 4: Anchor IDL Recovery
- Instruction discriminators: 46
- Unique allocation sizes: 0
- Deserialization patterns: 100

### Layer 5: Bonding Curve Math
- Math-intensive windows: 670
- Constant product candidates: 0
- Fee calculation candidates: 3
- Overflow-protected windows: 89

## Files
| File | Description |
|------|-------------|
| layer1-data-layout.json | .rodata/.data.rel.ro structure, strings, constants |
| layer2-relocation-map.json | Full relocation table with symbol resolution |
| layer3-cross-section.json | .text → data reference mapping per window |
| layer4-anchor-idl.json | Recovered discriminators, struct sizes, deser patterns |
| layer5-math-analysis.json | Arithmetic patterns, bonding curve, fee math |
| summary.json | Per-layer aggregate statistics |

## Verification
```bash
python3 verify.py
```
