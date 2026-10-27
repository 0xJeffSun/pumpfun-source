# Relay donation close-order controls on the 488-window build

Two fresh root-crate compilations test the four remaining original donation
windows (92–95). Neither recovers a complete window: **488/492 normalized and
142 raw-local matches remain unchanged**, with no gains or losses. These are
rejected research controls, not a replacement for the accepted
[settlement artifact](../settlement-artifact-recovery/README.md).

The first control moves event construction after `close_account` in the two
native donation handlers. This restores a sixth direct call, whose target
matches the original cleanup helper. The earlier candidate had five calls.
However, the native wrappers become 6,232 bytes against the original 6,272;
their complete instruction bodies still differ. The regular/payer wrappers
remain 2,552 bytes against 2,568 original bytes. Restoring the call sequence is
useful diagnostic evidence, not complete byte recovery or proof of cleanup
behavior on all paths.

The second control adds an ordinary `DonationArgs::new` constructor accepting
a borrowed configuration key and copying it inside, applied to all five source
handlers. This builds to **exactly the same stripped and unstripped binaries**
as the first control. A similar constructor had recovered other settlement
bodies, but this particular donation constructor adds no evidence of recovery.

| Original window | Original bytes | Accepted 488 build | Event after close | Added borrowed-key constructor |
| --- | ---: | ---: | ---: | ---: |
| 92 native | 6,272 | 6,344 | 6,232 | 6,232 |
| 93 native pubkey | 6,272 | 6,344 | 6,232 | 6,232 |
| 94 regular | 2,568 | 2,552 | 2,552 | 2,552 |
| 95 payer | 2,568 | 2,552 | 2,552 | 2,552 |

The first two native call offsets remain equal to the original. The later calls
remain 40 bytes earlier than the original after the change. Regular/payer calls
remain 16 bytes earlier. The next investigation must explain the residual
caller instruction/stack construction differences; it must not accept matching
call counts or a smaller ELF as identity.

## Reproduction and scope

`verify.py` reconstructs each exact 60-file source map from the accepted source
packet plus explicit transformations. The retained launch records bind those
maps, the v1.48 compiler hash, locked/offline recipe, actual root compiler
invocation, unchanged-source checks and output hashes. The builds reuse the
accepted dependency target cache; they are **not fresh all-dependency builds**.
The target compiler and network-disabled container are the same as the parent
artifact study. `builds/*/build.py` records the concrete local launch scripts;
paths must be adapted for another workspace.

One content-identical artifact pair is retained for both controls. The checker
rehashes it and reruns the complete 492-window analysis with the existing strict
CALL/relocation normalization. `report.json` binds complete summaries, all matched
ordinals and selected direct-call targets. It does not add register, stack or
instruction-alignment normalization to the identity test.

```sh
python3 -I -B repro/donation-relay/donation-close-order-controls/verify.py
python3 -I -B repro/donation-relay/donation-close-order-controls/test_controls.py
```

The verifier compiles and executes no target code. No fresh runtime replay was
run for either rejected candidate; the accepted artifact retains its own 536
record replay. No original executable bytes are compiler inputs. Whole-file
identity and the four complete donation bodies remain unresolved.
