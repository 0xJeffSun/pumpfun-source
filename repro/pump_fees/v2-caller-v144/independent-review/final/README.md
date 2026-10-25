# Portable original Fees V2 parser-key review

This evidence package is an independent, static named-key review. It does not execute the target program, compile a candidate, modify the ELF, or search layouts. The initial report is preserved verbatim in `INITIAL-REVIEW.md`, including its earlier unresolved bonding-curve assumption. This README supersedes only that assumption and gives portable reproduction instructions.

## Reproduce

Using Python 3 and its standard library:

```
PYTHONDONTWRITEBYTECODE=1 python3 verify_parser_links.py
```

The verifier locates all dependencies relative to itself, verifies the original ELF SHA-256, and writes `parser-links.json`. `method/disasm.py` and `method/analyze_elf.py` are copied read-only evidence decoding dependencies. Their byte hashes are in `manifest.json`. They are used only for ELF loading, not candidate matching, normalization, or execution.

`parser-links.json` contains 18 named parser-call records with paths to the matching diagnostic and local preservation instruction, symbolic return-slot provenance, and final context stores. As in the initial review, the two caller-allocated objects appear as one possible allocation constant in the abstract trace; that is a selected CFG path, not a proof of a universal allocation address. Their copy interpretation is separate manual instruction evidence. The artifact also contains checked bonding-curve bridge instructions.

## Newly resolved bonding-curve AccountInfo bridge

- Outer named parser call 503752 invokes 9528 with result storage at caller frame-744.
- At 9552, primitive 9528 invokes 70520 with result storage at its frame-88.
- The successful account-consuming branch in 70520 loads the current AccountInfo pointer from the cursor at 70648, advances that cursor by 48 bytes, and passes the pointer to 28120 at 70688.
- Primitive 28120 saves the AccountInfo pointer from r2 into callee-saved r7 at 28120. There are no local writes to r7 before the successful result store `[r6+0]=r7` at 29104. This relies on the sBPF callee-saved-register convention for intervening calls, and says nothing about acceptance/error/borrow semantics.
- Primitive 9528 copies 88 bytes from its frame-88 into the allocated container at 9848. Thus container+0 contains that AccountInfo pointer. It returns the container at result+8 at 9856.
- The outer parser preserves result+8 at frame-2824 (503792), then writes the container pointer into context+584 (518504).

Therefore the original pointer path is `named bonding_curve → context+584 → container+0 → original AccountInfo → key+0`. This closes the initial report's narrowly scoped container-offset assumption. It does not prove all branching behavior inside 70520 or 28120.

## Other original representation bridges

The original disassembly supporting these points is retained in `primitive-bridges.asm`.

- Mint primitive 640 consumes an AccountInfo and passes it to 8392. Primitive 8392 preserves it in r7 at 8392 and writes result+88 at 9384. Outer mint/quote_mint final context offsets are +88/+216.
- Sharing-config primitive 71456 consumes an AccountInfo and passes it to 27096. Primitive 27096 preserves it in r7 at 27096 and writes result+96 at 28040. The named parser copies 104 bytes into an allocation at 503720, supporting context+576 -> container+96 -> AccountInfo.
- Inline AccountInfo primitive 6808 loads the input key at 7008 and stores it at result+0 at 7200. This supports the six inline named-key fields in the initial report.
- Original AccountInfo clone 63024 loads the key pointer at 63072 and stores it at 63272. It writes five u64 fields and three flag bytes, not padding bytes 43–47; the old six-u64 model establishes only key composition.

## Limitations and preserved failures

- This is fixed-key provenance evidence for the two Fees V2 CPI chains, conditional on successful account admission and applicable CPI branches. It is not full parser/error/owner/borrow/cleanup equivalence, target runtime semantics, signer/writable metadata proof, remaining-account ordering, historical source identity, or full ELF byte identity.
- A CFG path is a reachable instruction path under unconstrained branches, not proof that its conditions are jointly satisfiable, selected at runtime, or universal. The verifier intentionally does not invoke primitive code.
- The original `trace_cpi_keys.py` used straight-line branch fallthrough including unconditional jumps; its reported composition must not be described as an executable selected-path proof. The root agent was notified to correct its labels/clone abstraction. That tool is not a dependency of this package.
- During independent review a temporary experiment changed only unconditional-jump handling in memory; it encountered a refcount-backedge loop because the other conditions still used fallthrough and was manually interrupted. No output from that experiment is evidence. No binary file was altered.
- The first local verifier draft used preservation PC 505776 for `amm_event_authority` and failed with KeyError for frame-2992. Original-byte inspection identified the actual preservation store at 505808. The saved verifier uses 505808. This was a verifier-draft correction, not a target change.

Original input SHA-256: `4f2955d0f6b40cc9ff7daa18ccad7d19119ba1249759f4e7e3bb691beee6b35e`.
