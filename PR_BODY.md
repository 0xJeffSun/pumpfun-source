# research(mayhem): count Anchor log formatter pieces

## Disclosure

provider=`Cursor`
model=`grok-4.7`
client=`grok-build`

Made via @slopdotcash

## What this proves

Qualified437 `ProgramErrorWithOrigin::log` (O0276) and `AnchorError::log` (O0277) each build `fmt::Arguments` and call the matched `format_inner`. This packet binds every piece-array count from that call setup, reads each 16-byte descriptor, and compares the counted `.rodata` bytes with the other image and with vendored `anchor-lang` 1.0.0 format literals.

It also counts the four direct `sol_log_` calls for bare `Left:` and `Right:`.

## Coverage

| | Before | After |
| --- | ---: | ---: |
| Payload bytes proved | 16,678 / 26,180 | 17,440 / 26,180 |
| Newly proved |  | 762 |
| Still unproved | 9,502 | 8,740 |

The 762 bytes are 250 raw string bytes plus 512 descriptor bytes (384 raw, 128 pointer correspondence). No new function match. The relation stays 437 / 141 / 431 / 581. Whole-ELF identity is not claimed.

## Limits

- A trailing empty source piece after a final placeholder is absent from these images. Empty pieces in any other position are rejected.
- The proof stops at `format_inner`'s piece-count walk. It does not claim formatted output, writer callbacks, or allocation.
- Account-name strings in O0134/O0136/O0124 are still open. O0077/O0083/O0084 bodies are untouched.

## Verify

```sh
PYTHONDONTWRITEBYTECODE=1 python3 -B research/mayhem-current437-format-pieces-20261028/verify.py --repo .
PYTHONDONTWRITEBYTECODE=1 python3 -B research/mayhem-current437-format-pieces-20261028/test_verify.py
PYTHONDONTWRITEBYTECODE=1 python3 -B scripts/verify_evidence.py
PYTHONDONTWRITEBYTECODE=1 python3 -B scripts/test_tooling.py
```
