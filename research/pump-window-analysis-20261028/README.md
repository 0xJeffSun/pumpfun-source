# pump — Deployed Binary Analysis

## Source
- Binary: `evidence/original/pump/deployed.so`
- SHA-256: `7a19affaa2c6187e04a5fe0ea298cee81fa5eb8c24cfcc30d85f615e89f7b02d`
- File size: 10,485,715 bytes

## .text Section
- Start: `0x120`
- End: `0x1b59f0`
- Size: 1,792,208 bytes (224,026 BPF instructions)

## Window Summary
| Metric | Value |
|--------|-------|
| Total windows | 1035 |
| Named functions | 2 |
| Unnamed windows | 1033 |
| Total call edges | 10591 |
| Total relocations | 5557 |

## Size Distribution
| Range (bytes) | Count |
|---------------|-------|
| 0-64 | 129 |
| 65-256 | 111 |
| 257-1024 | 379 |
| 1025-4096 | 303 |
| 4097-16384 | 104 |
| 16385+ | 9 |

## Largest Windows (potential handler bodies)
| Address | Size (bytes) | BPF Instructions | Name |
|---------|-------------|-----------------|------|
| 0x22a10 | 27,400 | 3,425 | (unnamed) |
| 0x157380 | 26,896 | 3,362 | (unnamed) |
| 0xcf750 | 24,312 | 3,039 | (unnamed) |
| 0xd5af0 | 23,608 | 2,951 | (unnamed) |
| 0xb6578 | 23,440 | 2,930 | (unnamed) |
| 0xa4378 | 23,360 | 2,920 | (unnamed) |
| 0xe62a8 | 22,520 | 2,815 | (unnamed) |
| 0x13f630 | 20,184 | 2,523 | (unnamed) |
| 0x5b3b0 | 18,584 | 2,323 | (unnamed) |
| 0x1e7c0 | 15,576 | 1,947 | (unnamed) |
| 0x13b9b8 | 15,480 | 1,935 | (unnamed) |
| 0xac6c8 | 14,992 | 1,874 | (unnamed) |
| 0xb0158 | 14,904 | 1,863 | (unnamed) |
| 0x16e7f0 | 14,624 | 1,828 | (unnamed) |
| 0x34558 | 14,512 | 1,814 | (unnamed) |
| 0x144508 | 13,976 | 1,747 | (unnamed) |
| 0x102578 | 13,824 | 1,728 | (unnamed) |
| 0x14f4e0 | 13,224 | 1,653 | (unnamed) |
| 0x167528 | 11,960 | 1,495 | (unnamed) |
| 0x138b20 | 11,928 | 1,491 | (unnamed) |

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
