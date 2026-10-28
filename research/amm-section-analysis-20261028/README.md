# pump_amm — 5-Layer Deep Section Analysis

## Scope
Comprehensive cross-section analysis of the deployed pump_amm binary,
covering data layout, relocations, data dependencies, Anchor IDL recovery,
and mathematical pattern extraction.

## Binary
- SHA-256: `6a7ad34596d83b4c435b32f458a56e718e9f82eb4ad38e4316616d15d24d8ff7`
- .text: 1,162,040 bytes

## Layer Results

### Layer 1: Data Layout
- Sections analyzed: 2
- Strings extracted: 68
- Pointer-like values: 1

### Layer 2: Relocation Map
- Total relocations: 4399
- In .text: 3904
- In .rodata: 0
- Unique symbols: 15

### Layer 3: Cross-Section Correlation
- Windows referencing .rodata: 380
- Windows referencing .data.rel.ro: 326
- Total data references: 2504

### Layer 4: Anchor IDL Recovery
- Instruction discriminators: 5
- Unique allocation sizes: 0
- Deserialization patterns: 100

### Layer 5: Bonding Curve Math
- Math-intensive windows: 463
- Constant product candidates: 0
- Fee calculation candidates: 1
- Overflow-protected windows: 63

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
