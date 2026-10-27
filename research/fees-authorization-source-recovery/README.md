# Fees authorization helper recovered from Rust

The complete 1,208-byte shared authorization helper at original address 234096
now matches under the unchanged normalization. Its **nine actual direct callees
and all eleven directly referenced objects match**. This raises the composed
Fees frontier from 563 to **564/585 normalized original functions**, with
**143 raw local matches, 168 matching Location observations and 21 unmatched
functions**. No previous normalized, raw, Location or positive callee match is
lost. Whole-ELF and whole-capture equality remain false.

## Source recovery

The disassembly reads the authority key through the signer reference inside the
helper. It reports authorization and active-state failures from lines 97 and 99
of `instructions/fee_sharing/mod.rs`. The recovered ordinary Rust helper uses
that reference ABI and source location, a plain conversion for revoked-admin
failure, and an explicit inequality guard for authorization. With the existing
public module visibility, this reproduces the original complete branch layout.
Earlier signer-reference and `require!` controls retained a different layout.
The explicit inequality is an inferred sufficient source spelling, not proof
of the exact historical source text.

Only `sharing_update.rs` and `instructions/fee_sharing/mod.rs` differ from the
43-input parent. Both sharing-update entrypoints call the recovered helper.
The previous helper's vacated lines remain blank to retain other coordinates.
No assembly, machine-code constants, synthetic Source object, compiler change
or post-build binary patch is introduced.

## Complete-body and data checks

The original and reconstructed caller have the same registers, stack layout,
branches, scalar constants and imported calls under the parent normalizer.
All nine resolved direct-callee bodies match. Every actual relocated LDDW is
classified and checked at its semantic extent:

- Four references to the actual four-byte error enum variants.
- Two 48-byte formatting-writer vtables and one 32-byte display vtable, including
  their size/alignment and every complete pointed-to function body.
- The 55-byte formatting panic message and its complete Rust Location.
- Two references to the complete 54-byte fee-sharing source filename.

These are direct obligations. They do not establish all transitive data or whole
program equivalence. The parent payout-preparation callee remains unmatched.

## Native and runtime evidence

Two separate root compilations reproduce stripped SHA-256
`559402825d4184d39d9a92679b58af416690481f225139ecd16f2046047034c2`
and unstripped SHA-256
`ded6e9bca2f3d8c0264de4d83755f3a1d32893aecda6cafd0f27e1eecdbc1975`.
They use the parent's Linux platform-tools v1.44, existing dependency cache,
locked/offline mode, math source mappings and v1.52 stripper. These are not
clean all-dependency builds. Both source maps, commands and logs are included.
The controller's absolute paths identify the observed environment; rebuilding
elsewhere requires equivalent SDK, registry and mounts.

Fresh regression passes **17,331 cases across 18 suites**, retaining each
suite's own observation limits. The verifier reads these saved results without
executing target code. Finite synthetic cases do not prove exhaustive behavior,
universal application-log equality or whole-program identity.

```sh
python3 -B research/fees-authorization-source-recovery/verify.py
python3 -B research/fees-authorization-source-recovery/test_scope.py
```

The first command authenticates and verifies the parent composition, then
recomputes this source delta, full-window match, direct callees and objects.
Negative controls reject unsealed claims, replacing the candidate with the
parent, and an omitted runtime case. Canonical selected checkpoints are unchanged.
