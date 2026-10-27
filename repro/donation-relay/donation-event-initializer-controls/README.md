# Relay event initializer controls

Two disassembly-guided Rust source controls retain **488/492 complete normalized
original windows and 142 raw-local matches**. Both are rejected: the native
bodies remain 6,232 bytes against 6,272, and the regular/payer bodies remain
2,552 against 2,568. All four full normalized hashes remain unequal. Neither
artifact replaces the accepted settlement reconstruction.

The parent is the `after-close` source from
[donation-close-order-controls](../donation-close-order-controls/README.md).
Only the five `DonationMadeV1Event` expression initializer sequences change:

- `event-physical`: message, configuration, mint, epoch, gross amount, tip,
  credited-to, discriminant. This follows the observed event memory layout.
- `event-numeric`: retain the existing sequence except evaluate tip, gross
  amount, epoch in that order. This tests the original body's preservation of
  the high epoch word across the final memcpy, where the parent holds tip.

Neither changes the event declaration, serialized field order, ABI types,
field values, CPI sequence, error propagation or public interface. These two
sequences differ from the six retained result-shape controls. The initializer
experiments do not prove any historical source spelling or semantic equivalence.

## Build and verification evidence

The public 60-input Rust baseline was first rebuilt in a fresh Linux target
with pinned v1.48 tools. Its stripped SHA-256 was
`e98ef5d4453ea93ab8189b35d7183a0777b2bf3ee46f87497a11700c263f55a3`,
matching the accepted settlement artifact. Both controls then reuse that
verified dependency cache. Each retained control log contains an actual root
compiler invocation, an unchanged-input check and artifact hashes. The
compiler hash and exact input map are in each `launch.json`.

An initial `event-physical` attempt reused the cached root and emitted the
baseline. It is not counted or retained as a successful experiment. The
controller was corrected to refresh source mtimes before invoking Cargo;
source bytes were unchanged. The retained runs each show one root invocation.
`recorded-build-controller.py` archives that work-directory controller; its
original workspace/container paths need adapting for a new build.

```sh
python3 -I -B repro/donation-relay/donation-event-initializer-controls/verify.py
python3 -I -B repro/donation-relay/donation-event-initializer-controls/verify.py \
  --materialize /tmp/relay-event-numeric --variant event-numeric
```

The verifier reconstructs both complete source input maps from the pinned
parent, validates build receipts and reanalyzes every original function window.
It resolves the four subjects by symbol name, not assumed candidate indices.
CALL displacements and relocation words are the only normalized bytes. No
register, stack or branch masking is introduced. No captured executable bytes
enter the Rust build. No runtime execution is claimed for these rejected
controls. Whole captured-ELF identity and the four donation bodies remain open.
