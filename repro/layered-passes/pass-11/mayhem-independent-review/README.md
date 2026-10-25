# Independent mayhem change-boundary review

Run `python3 -B verify.py --repo /path/to/repository`. The preserved root review checks the exact source change and full binary identities, plus the admitted original and candidate error/control operands. It executes no target program. The original review run and any failures remain under `history/`. Operational path changes use the published frozen candidate and previous source snapshot; no assertion is weakened. Runtime regression and whole-main-build identity are separate evidence packages. Full original byte identity remains false.
