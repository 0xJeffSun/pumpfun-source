# amm2 `integrate` lane — combined PumpSwap AMM candidates

Each `gNN-c<normalized>/` directory is one published composition of verified AMM gains on top of
main's AMM checkpoint, with full changed sources, `source.patch` against the checkpoint's canonical
source, a per-patch `ledger.json`, two Linux build records, gzipped ELFs, the repository measurement
and the full runtime replay summary. Maintained `programs/` is untouched (CI binds it to the
selected checkpoint); apply a packet's `source.patch` to the checkpoint's canonical source to
rebuild it.

| packet | base | Linux normalized / raw / unmatched | included | new windows | PR |
| --- | --- | --- | --- | --- | --- |
| [g01-c680](g01-c680/README.md) | event-decoder-recovery-20261027 (647/148/138) | **680 / 148 / 105** | amm-lo dda784ddc + amm-hi d92fefba8 | +33 (25 placement-dependent, counted separately in the packet) | this PR |

See `PROGRESS.md` for the composition ledger and continuation notes.
