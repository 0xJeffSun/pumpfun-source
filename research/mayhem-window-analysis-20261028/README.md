# mayhem — Deployed Binary Analysis

## Source
- Binary: `evidence/original/mayhem/deployed.so`
- SHA-256: `a87fa9f866272514e6acb852b668c4a08aeb173d56c883039991d114d1199bdb`
- File size: 777,408 bytes

## .text Section
- Start: `0x120`
- End: `0xac9d8`
- Size: 706,744 bytes (88,343 BPF instructions)

## Window Summary
| Metric | Value |
|--------|-------|
| Total windows | 441 |
| Named functions | 2 |
| Unnamed windows | 439 |
| Total call edges | 4768 |
| Total relocations | 2117 |

## Size Distribution
| Range (bytes) | Count |
|---------------|-------|
| 0-64 | 72 |
| 65-256 | 74 |
| 257-1024 | 162 |
| 1025-4096 | 83 |
| 4097-16384 | 43 |
| 16385+ | 7 |

## Largest Windows (potential handler bodies)
| Address | Size (bytes) | BPF Instructions | Name |
|---------|-------------|-----------------|------|
| 0x46378 | 19,256 | 2,407 | (unnamed) |
| 0x4cc98 | 18,656 | 2,332 | (unnamed) |
| 0x224e0 | 18,648 | 2,331 | (unnamed) |
| 0x26db8 | 18,096 | 2,262 | (unnamed) |
| 0x61b40 | 17,704 | 2,213 | (unnamed) |
| 0x5c6d8 | 17,664 | 2,208 | (unnamed) |
| 0x17668 | 17,312 | 2,164 | (unnamed) |
| 0x525f8 | 15,008 | 1,876 | (unnamed) |
| 0x56f08 | 14,728 | 1,841 | (unnamed) |
| 0x1bc08 | 13,848 | 1,731 | (unnamed) |
| 0x1f220 | 12,992 | 1,624 | (unnamed) |
| 0x38670 | 10,568 | 1,321 | (unnamed) |
| 0x14e60 | 9,736 | 1,217 | (unnamed) |
| 0x34c90 | 9,376 | 1,172 | (unnamed) |
| 0x890a8 | 8,944 | 1,118 | (unnamed) |
| 0x692f8 | 8,784 | 1,098 | (unnamed) |
| 0x8c9d0 | 8,616 | 1,077 | (unnamed) |
| 0x12d90 | 8,400 | 1,050 | (unnamed) |
| 0x9bf50 | 8,072 | 1,009 | (unnamed) |
| 0x10e48 | 8,008 | 1,001 | (unnamed) |

## Files
| File | Description |
|------|-------------|
| summary.json | Program-level statistics |
| window-inventory.json | Per-window detail (address, size, calls, relocations, hashes) |
| call-graph.json | All inter-window call edges |
| function-index.json | Symbol name → address mapping |
| section-layout.json | ELF section sizes and hashes |

## Verification
```bash
python3 verify.py
```
