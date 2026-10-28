# pump_amm — Deep Disassembly Analysis

## Scope
Full BPF instruction-level decode of the deployed pump_amm program binary,
including syscall identification, error string extraction, Anchor dispatch table
recovery, control flow graph construction, stack frame analysis, and bytecode
fingerprinting for cross-window pattern matching.

## Binary Identity
- SHA-256: `6a7ad34596d83b4c435b32f458a56e718e9f82eb4ad38e4316616d15d24d8ff7`
- .text section: 1,162,040 bytes

## Statistics
| Metric | Value |
|--------|-------|
| Total windows | 785 |
| Total instructions | 139,524 |
| Total syscalls | 0 |
| Unique syscalls | 0 |
| Internal calls | 0 |
| External calls | 7,397 |
| Branches | 14,884 |
| Error strings | 14 |
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
