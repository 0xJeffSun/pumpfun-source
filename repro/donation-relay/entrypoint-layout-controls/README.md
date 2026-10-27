# Relay entrypoint, crate identity and instruction boundary controls

These three ordinary Rust source builds investigate the function-placement
residual independently of the four unmatched donation bodies. All retain
488/492 normalized windows. None restores the original runtime-function order
or whole-file identity, and none replaces the accepted artifact.

| Control | Source change | Raw-local matches |
| --- | --- | ---: |
| Native entrypoint | Enable Anchor's generated entrypoint, remove the manual root macro and forwarding function | 143 |
| Contracts name | Additionally name the crate and program module `contracts`, suggested by embedded source paths; historical name remains unverified | 140 |
| Instruction boundaries | Move the five settlement entry bodies into their corresponding instruction modules and delegate from the Anchor program methods | 140 |

The baseline has142 raw-local matches. Enabling the generated entrypoint adds
one raw body match but leaves the larger placement error; the other two controls
lose raw matches. Function matching alone cannot select a full-layout candidate.
Every control still emits the entrypoint at581552 rather than the capture's
566024. The original orders entrypoint/allocator/panic functions before five
settlement entry bodies; none of these source changes reproduces that order.

The native entrypoint change uses the existing Anchor macro, whose entrypoint
is disabled by the baseline's `no-entrypoint` default. The crate-name trial is a
bounded source-provenance hypothesis, not an authenticated historical name.
The boundary trial uses real Context-taking Rust functions with unchanged
instruction interfaces. No source reordering script or captured machine-code
bytes is fed to the linker, and no inline/no-inline attributes are introduced.

Each run has one actual root invocation using the pinned offline Linux v1.48
recipe and a verified dependency cache. The packet binds all60 source inputs,
unchanged checks, logs and stripped/unstripped files. Ordinary source overrides
are retained and applied to the accepted settlement source by the verifier.
The shorter symbol table in the crate-name control is not a stripped-ELF gain.

```sh
python3 -I -B repro/donation-relay/entrypoint-layout-controls/verify.py
```

The verifier resolves bodies by symbols, checks complete original windows and
preserves strict CALL/relocation-only normalization. It does not compile or
execute the target. The recorded controllers require adapting work/container
paths for another build. No runtime or source-authenticity claim is transferred
to these variants. The independent [ELF audit](../elf-layout-488-audit/README.md)
retains section, relocation, function-order and captured-allocation boundaries.
