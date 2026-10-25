# Known AMM33 zero-fee cashback event gap

A post-checkpoint boundary probe sets cashback and sells one raw base unit, so the creator payout rounds to zero. The original keeps creator fee bps30 and cashback bps0; the published AMM33 candidate instead reports creator bps0 and cashback bps30. Both transactions succeed with identical watched state and payouts, but event bytes and the event CPI differ.

`probe.py` independently reproduces the mismatch with two ordinary test-owned signatures and explicit runtime signature/blockhash verification, using the published AMM33 executable and captured original. The receipt binds both ELF hashes and the script. Run `python3 repro/pump_amm/legacy-sell-zero-fee-gap/probe.py` from the repository root. A successful probe confirms the expected mismatch; it is not an equivalence pass. No live transactions are sent.

The earlier 15,194-case checkpoint remains valid only for its saved finite inputs. A corrected candidate and expanded regression are in progress. This fixture does not establish a live-program vulnerability.
