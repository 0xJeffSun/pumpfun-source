# Qualified437 format-crumb / `0x` text-site remainder

This packet counts **7 static `.rodata` crumbs totaling 11 bytes** inside the assigned leftover gap `[723439, 723663)`, and proves **18 classic text sites** as proof sites only. All checks run on both the original and candidate images. This packet adds data evidence, not a function match.

The prior obligations are preserved: **437 normalized functions, 141 raw functions, 431 closed windows and 581 candidate pairs**, with **0 rejected pairs**. No binary patch, no whole-binary equivalence, and no NUL or adjacency bound is claimed.

## Source

Only static bytes are read. Each crumb is bounded by the classic text-site grammar established in `research/mayhem-current437-rust-panic-messages-20261029/`: relocated `lddw` of a `.rodata` pointer followed immediately by `mov` of the exact length immediate. NUL, the following byte, and adjacency are not bounds. No descriptor is claimed.

Counted texts: `,\n`, `}`, ` }`, `(`, `(\n`, `,`, `0x`.

## Coverage

The baseline is the option-seeds-paths packet at **21,451 / 26,180** payload bytes (`.rodata` 14,627 / 18,396, `.data.rel.ro` 6,824 / 7,784).

These intervals were disjoint from that baseline. Payload coverage becomes **21,462 / 26,180 bytes (81.98%)**, leaving **4,718 unproved**. `.rodata` becomes **14,638 / 18,396** (+11). `.data.rel.ro` is unchanged. The added `.rodata` union is `[723447, 723458)`.

## Still open

Inside the assigned leftovers `[723439, 723663)`:

- `[723439, 723447)` — early format crumbs without a classic `lddw`+immediate-length pair at `pc+16`.
- `[723458, 723663)` — digit table / `[...]` placeholder (indexed base pointer; no countable full-span length bound). Tiny hole `[723373, 723376)` remains outside this packet.

Do not reclaim OPEN #819/#823/#851/#852/#879/#881 intervals, rust-panic sealed neighbors, or Codex `719929–723279` / grapheme-ranges areas.

## Verification

```sh
PYTHONDONTWRITEBYTECODE=1 python3.12 -B research/mayhem-current437-format-crumbs-0x-20261029/verify.py --repo .
PYTHONDONTWRITEBYTECODE=1 python3.12 -B research/mayhem-current437-format-crumbs-0x-20261029/test_verify.py
PYTHONDONTWRITEBYTECODE=1 python3.12 -B scripts/verify_evidence.py
PYTHONDONTWRITEBYTECODE=1 PYTHONPATH=scripts python3.12 -B scripts/test_tooling.py
```

## Attribution

provider=OpenCode model=opencode/deepseek-v4.1-flash-free client=opencode CLI 1.19.5
