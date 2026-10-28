# mg-P-raw-01: main-Pump whole-ELF layout recipe (generated linker order) on L28

No source change (patch.diff empty). The raw gain comes from the LINK recipe only:
`recipe/ordered.ld` replaces the SDK default script's `.text`, `.rodata` and `.data.rel.ro` rules with explicit
input-section lists in the ORIGINAL order (everything else = SDK default script, byte for byte).

- .text: every original window (address order) -> the candidate input section of its normalized counterpart
  (duplicate-body groups resolved by call-target / data-content / incoming-call consistency); the 48 unmatched
  windows -> the candidate function their matched callers call (31 bound), placed in the window's slot;
  candidate-only functions (61, 91,560 B) after all windows.
- .rodata / .data.rel.ro: candidate objects bound to original offsets (lddw anchors of matched windows, pointer slots,
  unique content) and listed in original order; merged constant sections (.rodata.cst4/8/16/32) at their first
  anchored piece; unbound objects after the bound ones.

## Build (two-pass; the ordered.ld names hash-suffixed sections of THIS source, regenerate after any source edit)
    python3 recipe/tools/pbuild.py --src SRC --work WORK --out OUT1               # default link, records link inputs+map
    python3 recipe/tools/pgen.py OUT1 ordered.ld                                     # reads OUT1 + base/original.so
    python3 recipe/tools/pbuild.py --src SRC --work WORK --out OUT2 --ordered ordered.ld   # (or tools/prelink.py OUT1 ordered.ld OUT2: same bytes)
pbuild = harness fastbuild identity recipe + nested manifests; the root cdylib is linked via tools/plink.py
(-C linker added by tools/rwrap.py for that crate only) -> without --ordered the output equals fastbuild (verified:
L28 control 74345f6a.../f23fc43f... reproduced). With this ordered.ld: unstripped c528c1ea..., stripped d9699192...,
identical for the real build and the link-only replay.

## Result (score.py, baseline L28 inventory)
normalized 987 (0 gains, 0 losses), raw 166 -> 204 (+38 raw gains, 0 raw losses), runtime_valid, no stack warnings.
Actual raw is bounded while the 48 unmatched windows / 92 candidate-only functions keep .text 67,024 B longer
(every .rodata/.data.rel.ro lddw is shifted). End-state prediction (tools/prawready.py, rawready.json): 922/987
matched windows raw-ready; remaining classes: .rodata.cst4 merged-piece order (41 windows), panic Location
line/col/file differences in .data.rel.ro (21 windows), 3 windows calling a duplicate generic instance the original
does not have (Account<T>/Program<T>::try_accounts), 1 wrong .rodata object.
