# Mayhem initializer staged snapshot recovery

This ordinary Rust source recovers the complete **960-byte O0193 initializer
window under the existing normalization**: 120/120 eight-byte slots, compared
with 104/120 for the prior owned-snapshot control. Scalar instructions,
registers, branches and stack displacements agree. Relocated addresses and
call displacements retain the established normalization. Raw-local and whole
ELF equality are not claimed.

The unqualified frontier is **430/441 normalized windows and 89 raw-local
windows**, retaining every prior body, positive call and Source observation.
The new match is O0193; eleven original windows remain unmatched. This source
starts from the frozen trade-origins-composed-01 baseline through the prior
owned snapshot control. It does not incorporate the separate historical-macro
parser source or claim its additional raw-local matches. No maintained source
selection or deployment is changed by this packet.

## Source and safety

The 67-file source archive differs from the
[trade-origins parent](../mayhem-trade-origins-validator/README.md) only in
`src/state.rs`. A real 80-byte snapshot owns the cloned `AccountInfo` and the
32-byte key. The earlier fully initialized aggregate let LLVM perform the key
copy before materializing the account. Two-phase construction now produces the
original order without padding, extra stores, assembly or output editing.

The temporary key is `MaybeUninit<Pubkey>`. Its single `write(info.key())`
unconditionally initializes all 32 key bytes before the sole
`assume_init_ref()` call. The snapshot remains alive for the complete borrowed
initializer call. `MaybeUninit` never drops an uninitialized `Pubkey`; the owned
`AccountInfo` is dropped normally once. A clone failure occurs before any assumed
key reference exists. The code adds no dummy initialization and no zero-fill.
This is a source-level safety argument for this fixed construction, not a claim
that arbitrary changes to unsafe code are safe.

## Binary and reference evidence

Two ordinary-controller builds reproduce these complete artifacts:

- Stripped candidate: `c2bce39dc49cdd1be2e3fe561ec16f4b412b30efd8cca44625d108f27439dca7`
- Symbol artifact: `fc835e0ad4b7aae0a4f594267a2c93445a64f593a0ba2aba2facae7671bb03d6`

The diagnostic IR build reproduces the stripped candidate. Its symbol file
contains different symbol metadata and is kept distinct. Pinned compiler and
target-library identities, actual commands, source maps, outputs and logs are
retained; caches were reused, so these are not fresh dependency builds or proof
of the historical build recipe.

The verifier compares all five ordered immediate callee shapes and all four
initializer data references: two Source descriptors, the counted unwrap
message, and the ProgramError debug vtable. It also checks the vtable method and
its immediate calls, and reads the actual add-overflow message through its
callee's relocated formatting tuple. Source positions remain
`state.rs:531:43` and `state.rs:532:32`. These bounded checks do not prove all
recursive library or syscall implementations.

## Fresh runtime evidence

The ordinary candidate passes 69 original/candidate case pairs: 53 rejection
cases and 16 genuine original-Pump-to-Mayhem CPI cases, with ten successful
creations and 168 signed execution records. Compared state, errors, events,
inner instructions, return data, signed transaction bytes and raw logs agree.
The producer reads the actual executable program accounts before each send.
The portable checker regenerates the exact case dictionaries and checks
execution multiplicity and program attestations. `--signatures` rechecks every
retained signature. No old receipt is relabeled as execution of this candidate.

```sh
python3 -B research/mayhem-initializer-staged-snapshot-20261027/verify.py
python3 -B research/mayhem-initializer-staged-snapshot-20261027/test_verify.py
# In a Python environment with solders:
python3 -B research/mayhem-initializer-staged-snapshot-20261027/verify.py --signatures
```

These commands compile and execute no target. The default verification reports
that signatures were not rechecked in that invocation; `--signatures` performs
that cryptographic check. Frozen pure case generators use a constant default
Pubkey value only to construct the excluded zero-creator case; this never signs
or executes a transaction. Original ELF inputs and the pinned parent packet are
required. Runtime and normalized-window evidence are finite, bounded results;
full original ELF identity, historical provenance and broader qualification
remain open.
