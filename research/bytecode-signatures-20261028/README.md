# Cross-Program Bytecode Signature Analysis

## Scope
Bytecode pattern detection across all three incomplete Solana programs,
identifying shared code patterns, error handling, CPI (Cross-Program
Invocation), token transfer, serialization, and account validation patterns.

## Programs Analyzed
- **pump**: 1035 windows
- **pump_amm**: 785 windows
- **mayhem**: 441 windows

## Pattern Detection Results

| Program | Error Patterns | CPI Patterns | Token Patterns | Serialization | Validation |
|---------|---------------|-------------|----------------|---------------|------------|
| pump | 557 | 0 | 0 | 271 | 36 |
| pump_amm | 420 | 0 | 0 | 169 | 30 |
| mayhem | 1722 | 0 | 0 | 78 | 82 |

## Cross-Program Sharing
- **360** unique bytecode signatures shared across programs
- **1252** total windows with shared code

## Files
| File | Description |
|------|-------------|
| {program}-signatures.json | Per-window bytecode signatures |
| {program}-patterns.json | Detected patterns (errors, CPI, tokens, serialization) |
| shared-signatures.json | Windows with identical opcodes across programs |
| top-ngrams.json | Most common instruction 4-grams |
| summary.json | Aggregate statistics |

## Verification
```bash
python3 verify.py
```
