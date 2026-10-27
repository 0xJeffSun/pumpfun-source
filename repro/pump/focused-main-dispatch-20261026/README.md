# Main Pump: final dispatcher entry and reserve helper

The main Pump source now declares all **56 captured IDL instructions**. This
closes the missing-dispatch inventory, not the full reverse-engineering goal.
Whole-file identity remains false, and no full reserve-handler body match is
claimed.

This pass adds the main contract's `set_mayhem_virtual_params` entry. It changes
no companion-program source. An existing frozen signer-forwarder fixture is
used only to exercise Pump's PDA-signature boundary in a local VM. That synthetic
caller does not establish a production caller or live reachability.

## Recovered differences

The earlier isolated implementation differs in 23 of the expanded 192 cases.
The recovered implementation matches all 192, including:

- Completed curves skip calculation, including arithmetic that would fail.
- Non-native quotes use a 1,000,000 threshold; native quotes use 10,000,000.
- The numerator is evaluated with checked wide arithmetic. Conversion to u64
  fails with Anchor `InvalidNumericConversion` (4102) before applying the cap.
- An absent PDA signature returns `ConstraintSigner` (2002), preserving the
  explicit account constraint rather than using a `Signer` wrapper's error.

The denominator and reserve thresholds, native/non-native caps, account-state
changes and event bytes are checked alongside errors, inner instructions and
return data. Cases cover arithmetic extremes, denominator boundaries, completed
and inactive modes, account ownership/lengths, readonly accounts and the direct
unsigned call. All outer transaction signatures are verified normally.

The captured dispatcher reaches wrapper `0x1255a8`, body `0x137fc0`, and the
1,168-byte calculation helper at `0xa23f0`. Their full assembly windows are
included and the verifier compares every encoded instruction to the original
ELF. Labels are analyst attributions; original Rust symbols are unavailable.
The reconstructed calculation is a separate Rust helper. Its full instruction
body still differs from the original.

The raw-body inventory of the unstripped build finds 112 byte-equal original
windows (15,896 bytes) out of 1,035 windows / 1,792,208 original text bytes. It
normalizes no instructions, calls, pointers, constants or locations. A local
match alone does not establish identical runtime call/data referents; the
inventory is not a semantic-completion percentage.

All 40 registered main-Pump suites pass on this exact artifact: 9,785 cases.
This includes the previous 9,593 cases plus the 192 reserve-sync cases.
The full aggregate receipt is `full-regression.json.gz`. These are bounded
comparisons, not an exhaustive proof of every handler.

## Build and evidence

The candidate is 1,677,992 bytes, SHA-256
`3ac7c9f5ab87a4a8c225d1b4a7b04e64f22e0080f911b0b70bedc04f31b86bff`.
A second build with a fresh target directory reproduces both stripped and
unstripped artifacts. The pinned v1.44 compiler runs directly with locked,
offline Cargo dependencies. This establishes reproducibility of this recipe,
not the unknown historical build environment.

Source snapshots, both artifacts, build records/logs, the frozen test caller,
192 before/after receipts and original assembly are retained here. The verifier
reads this saved evidence without executing any program:

```sh
work/test-env/bin/python repro/pump/focused-main-dispatch-20261026/verify.py
```

These are finite, synthetic local comparisons. They do not prove every input,
all companion-program behavior, live acceptance, or a perfectly reconstructed
main contract. No public-network transaction was sent.
