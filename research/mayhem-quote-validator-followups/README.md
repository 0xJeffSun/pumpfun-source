# Mayhem validator follow-up controls

These five native root-build controls extend the earlier seven-control packet.
All 188 prior examined matches and 58 literal bodies remain; O0095 still does not
match. The original is 1,296 bytes. No compiler or matching mask was changed.

| Source control | Emitted bytes |
| --- | ---: |
| Boolean result from quote branches | 1,344 |
| Owned Pubkey parameter | 1,232 |
| Scoped status and separate checks | 1,240 |
| Structural constant patterns | 2,096 |
| Private GlobalParams threshold method | 1,232 |

The owned key and private getter reproduce the comparison-order control's ELF
bytes exactly, despite different debug symbol identities. These boundaries do
not explain the remaining mismatch. The original retains separate quote paths
for its reserve comparisons; the controls either merge them or generate extra
branches. Sources, input hashes, actual build logs, stripped/symbol artifacts and
strict full-window comparisons are retained. No VM run or new body gain is
claimed for these controls. No canonical source or prior packet is changed.

The retained original arithmetic disassembly is an additional lead: the same
state.rs 321:26 subtraction location occurs in the admitted trade bodies and
previously opaque O0092/O0093. It is not a new semantic or byte-identity claim.

Run `python3 -B research/mayhem-quote-validator-followups/verify.py` for saved
source/build/artifact binding and complete-body checks. It does not execute
the compiler or target. Tools use the same recorded private Darwin v1.54 and
v1.52 strip recipe; recorded absolute paths must be adapted for another checkout.
