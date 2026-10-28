# mayhem — 5-Layer Deep Section Analysis

## Scope
Comprehensive cross-section analysis of the deployed mayhem binary,
covering data layout, relocations, data dependencies, Anchor IDL recovery,
and mathematical pattern extraction.

## Binary
- SHA-256: `a87fa9f866272514e6acb852b668c4a08aeb173d56c883039991d114d1199bdb`
- .text: 706,744 bytes

## Layer Results

### Layer 1: Data Layout
- Sections analyzed: 2
- Strings extracted: 91
- Pointer-like values: 0

### Layer 2: Relocation Map
- Total relocations: 2548
- In .text: 2117
- In .rodata: 0
- Unique symbols: 14

### Layer 3: Cross-Section Correlation
- Windows referencing .rodata: 170
- Windows referencing .data.rel.ro: 191
- Total data references: 1044

### Layer 4: Anchor IDL Recovery
- Instruction discriminators: 5
- Unique allocation sizes: 0
- Deserialization patterns: 100

### Layer 5: Bonding Curve Math
- Math-intensive windows: 218
- Constant product candidates: 0
- Fee calculation candidates: 2
- Overflow-protected windows: 36

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
