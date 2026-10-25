# Bounded inventory of independent recovery gaps

This is a read-only inventory, not an implementation or runtime assignment. It uses
published Git `49e4ccc17ab45308ff3160d20c3d580512b772af` and snapshots the current
working source separately. No build, new fixture, runtime probe, source variant,
signer workaround, program change, or central-document edit was performed.
`inventory.json` and `input-manifest.json` bind the sources and existing evidence.

## Coverage and ownership

| Program | Published checkpoint | Missing handlers at that checkpoint | Current coordination |
|---|---|---|---|
| Pump | 42 implemented + 4 partial; 56 IDL instructions | 6 quote-control, 2 incentives, `multi_hop_curve_swap`, `set_mayhem_virtual_params` | Six quote-control wrappers are now in working source, owned by `amm_serializer` and being packaged. Multi-hop is owned by `amm_remaining`. Incentives are stopped. Mayhem-virtual-params is static-only with no genuine signer invocation established. |
| PumpSwap | 37/38 implemented | `create_config` | Fixed-admin initialization lacks a successful ordinary test-owned signer path. No initializer/signature workaround proposed. |
| Fees | 31/31 bounded bodies, including two deprecated rejection bodies | None | Full historical source, call/data fidelity and whole-ELF identity remain unresolved. |
| Mayhem | 24/25 identified paths | `initialize_mayhem_state` | Stopped initializer lane is excluded. Neutral account-field names and bounded diagnostic differences remain. |

The public status file still describes Pump42 at inventory time; the working
source has 52 IDL wrappers (48 implemented candidates plus the four partial paths).
Do not count those six pending handlers as a second recovery or infer their
publication from this inventory. Both active owners confirmed their scopes.
All four published candidate ELFs still differ from their originals.

There is **no unassigned missing-handler implementation lane** outside these
active, stopped, or invocation-constrained paths. The independent opportunities
below improve source fidelity or explain already-recovered behavior. Each needs
coordinator assignment before further work.

## Highest-evidence independent next work

1. **PumpSwap Pool codec static comparison.** Current `programs/pump-amm/src/state.rs`
   lines 220–224 still explicitly map both serializer errors through
   `ProgramError::BorshIoError`. The accepted GlobalConfig checkpoint replaced a
   superficially similar conversion only after proving the original's full exit
   body. Its published match covers GlobalConfig's 1,648-byte exit and 24 direct
   targets, not Pool's serializer. A useful bounded next task is to locate and
   compare the complete original/candidate Pool exit and its conversion callees,
   retaining raw operands and literal error data. **The analogous source shape is
   a lead, not proof that Pool has the same mismatch or needs the same edit.**
   No codec modification or malformed-account runtime matrix is authorized here.
   The active Pump multi-hop lane does not own an AMM codec change, but coordinate
   shared artifact use before any future implementation.

2. **Fees transitive call and rodata closure for already-matched bodies.** The
   immutable `fee-config-serialization-v144` report establishes FeeConfig exit,
   update-admin body/parser/dispatcher and their direct targets, while explicitly
   excluding recursive call-graph/rodata proof. Its existing function report has
   512 candidate ranges, 399 any normalized matches, 398 bounded call-consistent
   matches and only 68 raw exact bodies. Crate-named bodies have 69 normalized
   matches out of 165. A narrow static-only next task could trace one already
   matched update-admin/exit call closure and compare referenced literal/data
   objects. This is more justified than guessing compiler flags or replacing a
   handler merely because its current body lacks a normalized match. These
   counts are function-window evidence, not uncovered behavior counts.

3. **Pump TradeEvent suffix provenance.** `programs/pump/src/trade_types.rs:62`
   retains `unparsed_trailing_field: u64`; current event constructors write zero.
   The captured official TradeEvent type ends at `creator_fee_unclaimed` and
   does not name this extra field. A bounded static next task could trace the
   trailing eight-byte store from a normal existing legacy buy body to the
   serialized event and reconcile it with already-saved receipt bytes. Restrict
   this to existing ordinary baseline evidence; do not enter sell-v2 fee,
   token-extension, incentives, quote-control, or multi-hop work. An unnamed
   field is a semantic/source-provenance gap; it does not by itself prove an
   incorrect zero or a behavioral defect.

4. **Mayhem account-role annotation from accepted trade bodies.** Current
   GlobalParams keeps `field_0..field_15` option/event names and opaque arrays;
   MayhemState retains neutral offsets and unproven historical signedness/type
   names. Existing ordinary trade code already interprets some positions as
   intervals, minimum reserves, per-trade caps, overall risk and per-coin risk:
   `buy.rs:58,63,79,97–98`, `buy_v2.rs:76,81,94,112–113`, and corresponding
   PumpSwap reads. A bounded static crosswalk of those accepted bodies to their
   retained original offsets can distinguish **observed role** from unavailable
   historical field name, without following the initializer or changing layouts.
   The 24-handler package also explicitly retains 26 panic diagnostic
   differences, eight with unwrap-message detail differences; these are known
   limits, not fresh bug findings or a request for runtime probing.

## Deferred rather than independently owned

Pump `create_v2` still rejects Mayhem mode explicitly and supports only a
non-complete depth-zero SOL parent for its nested branch. Deeper/migrated/non-SOL
parent behavior remains partial. Those paths share quote-chain state with active
multi-hop work and the stopped initializer boundary, so this inventory does not
recommend a parallel implementation. The partial v3 restrictions and explicit
`ReconstructionBranchUnsupported` errors likewise remain visible without
reopening the stopped extension lane.

The general compiler/dependency attribution remains unresolved for all four
programs. Existing fingerprints narrow source families but do not pin historical
toolchains; no new compiler matrix, metadata/flag search, executable patch, or
source-padding experiment is justified by this inventory. Root's newer Metaplex
candidate11 report is separate dependency work; no source/build/runtime variant
was started here.

## Documentation drift observed

`audit/mayhem/RECOVERY.md` retains old opening statements of twenty paths and a
five-missing-path section. The immutable Mayhem24 README and actual current
dispatch/source show one missing path. Treat those early audit paragraphs as
historical observations, not the current coverage inventory. This report does
not edit the audit or central documents.

The old `work/pump-remaining-handlers.md` belonged to Pump29 and must not be used
as current assignment evidence. The portable static publication preserves it as
an original historical reference with that limitation explicit.
