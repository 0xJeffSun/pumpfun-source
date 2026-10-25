# Local validator for bounded SDK checks

This optional harness loads the four current candidate artifacts from `repro/status.json`
and four captured dependencies. It seeds the three retained global-account snapshots.
A clean clone still requires `solana-test-validator`, Python3, Git and the referenced
tracked files. The snapshots are test inputs, not proof of current chain state.

```sh
bash repro/parallel-work/2026-10-25/independent-reconstruction-review/localnet-sdk-testing/start-localnet.sh --check
# After inspecting the preflight, start with a new empty ledger path:
bash repro/parallel-work/2026-10-25/independent-reconstruction-review/localnet-sdk-testing/start-localnet.sh
```

The default ledger is `work/localnet-sdk-testing`; an existing path is refused.
`RPC_PORT=NNNN` changes the local port. Point an SDK at `http://127.0.0.1:8899`
(or the selected port). The script does not broadcast to another cluster.

The reconstructed programs pass their documented finite comparison corpora.
They are not proven exhaustively behaviorally/ABI equivalent, byte-identical,
or complete replacements for deployment. Seeded globals do not establish that
all dependent accounts or fixed-authority routes can be initialized successfully.
Use the current [remaining-work report](../../../../layered-passes/pass-15/REMAINING.md)
and each package's explicit coverage limits when interpreting local results.
Starting this validator is separate from the recorded regression acceptance.
No validator execution is claimed by this harness's preflight check.
