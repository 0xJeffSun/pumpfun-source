# Reviewed Metaplex positive guard: measured negative result

[Hosted run 40233083060](https://github.com/lalalune/pumpfun-source/actions/runs/40233083060), checkpoint `5bb3dec06cccecc8cea529fc17815aa1bf78d17a`, compiled the reviewed positive remaining-use guard in a clean pinned Linux/amd64 source build. Unlike earlier run 40191551052, this run actually binds the current reviewed source patch (`c6256bf2…`).

Compilation succeeded. The comparison step correctly exited nonzero: the generated raw ELF SHA256 is `4f039033a3cde9d47aa8ee0f68c13c2c4d55a9d6ee0ab50df9d4ef93a4a02edf`, exactly the rejected candidate12 bytes. The extra unconditional jump remains. After verified zero allocation padding, 196,601 positions differ from the target. Candidate11 remains the better retained comparison at 1,509 differences.

The symbolic positive `if` and checked subtraction therefore generate the same executable under this recipe. The patch is rejected as an identity repair. The prepared diagnostic-coordinate trial was not dispatched because its guard prerequisite failed.

`verify.py` checks the actual generated binaries, original capture, complete comparison fields, build log, source manifest and exact proposed source patch. It confirms raw equality to candidate12 without requiring a compiler, network or VM. No shared contract source or accepted candidate was replaced.
