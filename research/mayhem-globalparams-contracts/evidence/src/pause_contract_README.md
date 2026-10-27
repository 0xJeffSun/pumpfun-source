# Mayhem pause/resume data contract

This independently checks every direct relocated data use in the recovered
`stop_trading`, `resume_trading` and their two dispatch wrappers on the pinned
375-window composition. It adds selected data evidence and **zero instruction,
raw-local or whole-file coverage**. The source recovery belongs to the parent. Later 411-window source composition
is outside this explicitly pinned audit.
No compiler, target execution, transaction replay or source modification occurs.

Four complete normalized bodies bind 16 direct data uses across eight shared
objects. Fourteen uses agree; both uses of the same standard-library panic
Location differ in their referenced source path. The full original and candidate
paths, line/column and record fields are retained in `expected.json`; the mismatch
is not normalized away. It is the same class of platform-path residual already
reported by the parent's Burn audit, independently established here for pause.

The compared semantic extents are a four-byte MayhemError discriminant, a
48-byte formatting vtable, the complete 36-byte state.rs filename, a 55-byte
formatting-panic literal, a 32-byte vtable, a 24-byte Rust Location and the two
26/24-byte instruction diagnostics. The error reader's actual 32-bit load proves
the enum extent; neighboring bytes are not included. Inline error code 6000 and
filename length 36 are checked. Relocation fields are decoded; vtable function
pointers bind complete normalized function bodies. All 20 immediate call sites
also bind matching complete callee shapes or exact import names.

These direct obligations do not prove recursive data closure, every vtable's
behavior, all authorization/state outcomes, historical identifiers or complete
program equivalence. Known unequal Location paths remain failures. The parent
retains 375 structural counterparts, 59 raw-local matches and 66 unmatched
windows; this audit does not freshly rebuild that parent or assert whole identity.
All four core whole identities remain unresolved. No selected checkpoint,
frozen script, workflow or ledger is changed.

```sh
python3 -I -B research/mayhem-pause-data-contract/verify.py
python3 -I -B research/mayhem-pause-data-contract/test_scope.py
```

Use a checkout containing the three exact paths recorded in `inputs.json`.
Verification authenticates each before reading it and uses no Git/history or
network fallback. Missing files are errors. The two local reader modules are
byte-preserved from PR228; `scripts/analyze.py` is the unchanged pinned parent
reader. Six mutations change actual enum/path/Location/vtable/CALL/scalar bytes,
including data-only changes that leave the instruction section identical.
