# pump — Deep Disassembly Analysis

## Scope
Full BPF instruction-level decode of the deployed pump program binary,
including syscall identification, error string extraction, Anchor dispatch table
recovery, control flow graph construction, stack frame analysis, and bytecode
fingerprinting for cross-window pattern matching.

## Binary Identity
- SHA-256: `7a19affaa2c6187e04a5fe0ea298cee81fa5eb8c24cfcc30d85f615e89f7b02d`
- .text section: 1,792,208 bytes

## Statistics
| Metric | Value |
|--------|-------|
| Total windows | 1035 |
| Total instructions | 215,873 |
| Total syscalls | 0 |
| Unique syscalls | 0 |
| Internal calls | 0 |
| External calls | 10,861 |
| Branches | 22,018 |
| Error strings | 14 |
| Dispatch selectors | 0 |
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
