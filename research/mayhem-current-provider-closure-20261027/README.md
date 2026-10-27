# Allocator-provider sharing on the current Mayhem source

Composing the complete historical Anchor macro context with the **current
432-window quote/initializer source** repairs the allocator call-target gap.
Eight additional original windows have a surviving recursively direct-closed
counterpart: **O0207, O0208, O0210, O0214, O0215, O0217, O0219 and O0222**.
The relation covers **422 windows**, versus **414** in both the fresh Linux
baseline and the gated control. The remaining ten failures lead to unmatched
business handlers.

All **432 normalized** windows survive. All 84 raw-local bodies of this Linux
baseline survive, and **O0207 becomes raw-equal**, giving **85 raw-local** bodies.
No new normalized window or complete business handler is recovered. The selected
qualified source retains its separate 100-raw result and is not replaced.

## The actual called allocator

The original O0210 reserve body calls O0209's 328-byte `finish_grow` at relative
offset 528. The fresh baseline has a matching 328-byte body elsewhere, but its
corresponding curve reserve calls a different 312-byte specialization.

The composed candidate's reserve at **520,168** calls **519,840**, the matching
328-byte specialization, at that same relative offset. Its complete normalized
body and target now survive the direct-call relation. O0207 and seven transitive
callers regain this bounded closure. Other superficially matching reserve
counterparts still call nonmatching specializations; the report retains all
four alternatives and does not assign them unproved identity.

The check is a greatest relation under ordered direct calls, including supported
recursion. It is not an injective global assignment or full code/data proof.
Indirect calls, data/vtables, external implementation identity and relocation
values remain unverified.

## Source/build controls

Only **two of the 67 program inputs** change: the curve macro invocation names
`historical_anchor_program::declare_program!`, and its Pump IDL uses the retained
historical CreateEvent definition. Every current program handler, initializer
and quote source remains unchanged. The complete source archive and both
changed files are retained.

The macro's 121 historical source files come from the authenticated parent
packet. A fresh native Linux host build compiles them with the recorded narrow
manifest, locked dependencies and ten checksum-bound supplemental packages.
The program runtime and derive macros remain current Anchor 1.0.0. This is a
**mixed-framework compiler-context diagnostic**, not authenticated original
Mayhem source or a complete historical-framework reconstruction.

Three curve/root build repetitions produce identical complete artifacts:

- Symbols: `5aad2a991fe54a2ad0f4c33bc99f34725795acaf936e4ac4b2042c0e7dbc6f75`
- Stripped: `78e3ccb13f531b0724bf1f60c82744092c8dcbdeb2162c0755dc88ecc0186932`

These incremental program builds reuse the fresh Linux baseline's target
libraries and default linker order; they are not fresh full-dependency builds.
The official Linux platform-tools v1.54 archive is SHA-256
`fcc41631c7f77561bf5412218bf297501dccf0305ea280f338f0ace2aab9f31e`.
Standard `llvm-objcopy --strip-all` is the only post-link operation.

The control restores Anchor's exact upstream Solana gate (Git blob
`4fb84b0879c07819886ba419fee5b6434436555d`). It returns the called helper to
312 bytes and the direct-closed count to 414, preserving the baseline's complete
432/84 window classification. Its whole ELF differs from the baseline; no
whole-artifact baseline reproduction is claimed for this gate. The initial
failed gated dependency-path attempt and its diagnostics remain archived.
Enabled and gated host dependency snapshots were separated before the third
enabled repetition to keep macro loading bound to the correct cohort.

`controllers/` preserves the executed workspace-specific builders and replay
commands. It is not advertised as a turnkey build interface. Rebuilding needs
the checked Linux SDK and baseline target libraries, the authenticated historical
macro/supplements, and the recorded explicit curve/root Rust commands.

## Fresh runtime qualification

All **6,636 fresh trade pairs / 13,272 signed transaction records** pass on this
exact stripped artifact across Legacy Buy/Sell, V2 and AMM native/token/token-2022
families. The independent verifier rechecks actual signatures, both executed
program-account hashes, account bytes and states, errors, inner instructions,
return data and complete logs after removing only compute-consumption lines.

These reuse the established corpus and are not new unique scenarios. Earlier
initializer and admin receipts remain bound to their own artifacts; they are
not transferred to this composition. Finite local replay is not exhaustive
semantic equivalence or current-chain acceptance. Whole-original ELF identity
remains false.

Static saved-evidence verification uses only the Python standard library:

```sh
python3 -B research/mayhem-current-provider-closure-20261027/verify.py --skip-runtime
```

With the repository requirements installed, verify runtime and signatures:

```sh
python3 -B research/mayhem-current-provider-closure-20261027/verify.py --signatures
python3 -B research/mayhem-current-provider-closure-20261027/test_verify.py
```
