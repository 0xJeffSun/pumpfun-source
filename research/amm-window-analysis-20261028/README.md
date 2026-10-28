# pump_amm — Deployed Binary Analysis

## Source
- Binary: `evidence/original/pump_amm/deployed.so`
- SHA-256: `6a7ad34596d83b4c435b32f458a56e718e9f82eb4ad38e4316616d15d24d8ff7`
- File size: 10,485,715 bytes

## .text Section
- Start: `0x120`
- End: `0x11bc58`
- Size: 1,162,040 bytes (145,255 BPF instructions)

## Window Summary
| Metric | Value |
|--------|-------|
| Total windows | 785 |
| Named functions | 2 |
| Unnamed windows | 783 |
| Total call edges | 7223 |
| Total relocations | 3904 |

## Size Distribution
| Range (bytes) | Count |
|---------------|-------|
| 0-64 | 119 |
| 65-256 | 111 |
| 257-1024 | 281 |
| 1025-4096 | 200 |
| 4097-16384 | 71 |
| 16385+ | 3 |

## Largest Windows (potential handler bodies)
| Address | Size (bytes) | BPF Instructions | Name |
|---------|-------------|-----------------|------|
| 0x753f8 | 21,936 | 2,742 | (unnamed) |
| 0xaafd8 | 17,368 | 2,171 | (unnamed) |
| 0x45940 | 16,912 | 2,114 | (unnamed) |
| 0x9a6a8 | 15,624 | 1,953 | (unnamed) |
| 0x40a08 | 15,512 | 1,939 | (unnamed) |
| 0xbfa90 | 14,120 | 1,765 | (unnamed) |
| 0x3a5a0 | 12,936 | 1,617 | (unnamed) |
| 0x1fed8 | 11,688 | 1,461 | (unnamed) |
| 0xba720 | 11,408 | 1,426 | (unnamed) |
| 0x28dd0 | 11,024 | 1,378 | (unnamed) |
| 0x97bf8 | 10,528 | 1,316 | (unnamed) |
| 0x8d7d0 | 10,392 | 1,299 | (unnamed) |
| 0x89430 | 10,352 | 1,294 | (unnamed) |
| 0xc8588 | 10,344 | 1,293 | (unnamed) |
| 0x2ba60 | 10,240 | 1,280 | (unnamed) |
| 0x376b0 | 9,936 | 1,242 | (unnamed) |
| 0x3dbc0 | 9,536 | 1,192 | (unnamed) |
| 0xb3668 | 9,256 | 1,157 | (unnamed) |
| 0x95648 | 9,248 | 1,156 | (unnamed) |
| 0x49b50 | 9,184 | 1,148 | (unnamed) |

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
