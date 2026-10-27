# Residual Fees research composed with the 583-window Sweep recovery

Fresh normal Cargo builds compose both strongest archived residual candidates with the newly qualified Sweep source from [PR #301](https://github.com/lalalune/pumpfun-source/pull/301). **All 17 retained builds preserve the 583 existing original normalized matches. No additional original body matches, runtime qualification or whole-ELF equality is claimed.**

The Create composition reproduces the archived 13,448-byte / 1,599-instruction candidate and removes the extra 648-byte `DonationFeePdaCreated::data` function. It has 585 compiled windows, matching the original window count, while Create and Crank remain unmatched. Its text is 798,544 bytes versus 799,648 original bytes; matching size or function count does not establish identity. Compared with the original Create body, its direct-target signature multiset lacks two `Display::fmt` calls and contains two extra `ToString` calls.

Eight Create controls test local error bindings, `format!`, `write!`, value/reference display adapters, explicit `ToString` reference types and the pinned SDK's formatter constructor. None recovers the body. Direct formatter construction removes the missing formatter targets but adds two extra panic calls; it is rejected. The constructor experiment enables the SDK's existing unstable public `fmt_internals` API without modifying the SDK or accessing private layouts. Its extra source attribution is not qualified. All alternatives remain individual diagnostic artifacts, not selected implementations.

The Crank composition reproduces the strongest archived **15,952-byte / 1,947-instruction** candidate against the original **15,976 bytes / 1,950 instructions**. Its direct-target signature multiset matches, but the full body does not. It retains a small experimental Anchor 0.31.1 dependency extension exposing the existing borrowed account-info reference and reload operation, plus an inline hint on reload. The complete dependency and each before/after input receipt are retained. This is a framework experiment, not evidence of original framework provenance.

Seven Crank controls test early/late error conversion, ordinary `?` propagation and placement of the owned lamport-credit account relative to rent lookup, the excess branch and the debit. They preserve the 583 matches but do not fix Crank. Changing result propagation can create additional drop helpers; fewer instructions or more aligned rows are not accepted as a recovery.

```sh
python3 -B research/fees-residual-current583-20261027/verify.py
```

The verifier independently recomputes function boundaries, injective normalized-signature counts, full body identity, same-offset and aligned row counts, direct-target signature multisets, retained source/vendor inputs and native artifact hashes. Aligned-row counts and target multisets are diagnostics only. All complete residual body comparisons must remain false in this packet.

The source archives retain each composition. Per-control source overrides and full native binaries, logs and receipts are included. The experimental Anchor source is preserved separately from the unchanged macro dependency. Captured scripts retain their actual `/workspace/fees-recovery` paths and document execution rather than providing a portable materializer. The pinned SDK archive digest is recorded in `index.json`.

The qualified result remains **583/585 normalized / 200 raw-local matches**, as verified in PR #301. These SDK-default-layout experiments have not repeated its data/reference/Source and runtime qualification. Its 17,331 runtime cases must not be transferred to these different binaries. Crank and CreateDonation remain the two unmatched original bodies, and complete ELF/capture equality remains false.
