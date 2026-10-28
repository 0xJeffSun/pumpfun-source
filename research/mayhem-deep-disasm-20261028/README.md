# mayhem — Deep Disassembly Analysis

## Scope
Full BPF instruction-level decode of the deployed mayhem program binary,
including syscall identification, error string extraction, Anchor dispatch table
recovery, control flow graph construction, stack frame analysis, and bytecode
fingerprinting for cross-window pattern matching.

## Binary Identity
- SHA-256: `a87fa9f866272514e6acb852b668c4a08aeb173d56c883039991d114d1199bdb`
- .text section: 706,744 bytes

## Statistics
| Metric | Value |
|--------|-------|
| Total windows | 441 |
| Total instructions | 83,947 |
| Total syscalls | 0 |
| Unique syscalls | 0 |
| Internal calls | 0 |
| External calls | 4,902 |
| Branches | 10,752 |
| Error strings | 13 |
| Dispatch selectors | 4 |
| Largest stack frame | 4096 bytes |

## Syscall Usage


## Files
| File | Description |
|------|-------------|
| windows-deep.json | Per-window analysis (syscalls, strings, stack, fingerprint) |
| disassembly.json.gz | Full instruction-level disassembly (gzipped) |
| dispatch-table.json | Recovered Anchor instruction selector dispatch |
| syscall-usage.json | Syscall frequency across all windows |
| extern-usage.json | External symbol call frequency |
| rodata-strings.json | All extracted .rodata printable strings |
| error-strings.json | Strings matching error/validation patterns |
| fingerprints.json | Bytecode signature fingerprints per window |

## Verification
```bash
python3 verify.py
```
