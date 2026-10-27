# Signed local caller fixture

This packet preserves the exact CPI forwarder used by the main-Pump reserve-sync tests. It supplies a program-derived signature through `invoke_signed` in the local VM; outer transactions are normally signed. It is a synthetic caller, not a reconstruction of the program ID under which the harness loads it, and it is never deployed or broadcast.

The 192 retained original/candidate cases include a direct call without the PDA signer, which is rejected. The independent verifier checks all available outer signatures and the fixture bytes. Original compiler/source-to-binary identity is unproven and is not needed to interpret the bounded main-Pump comparison.

The public harness path is `scripts/fixtures/signer_stub.so`; it must match `caller.so` here. No privileged key, forged transaction signature, or signature-verification bypass is used.
