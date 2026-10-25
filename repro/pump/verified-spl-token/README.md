# Independently reproduced SPL Token dependency

The pinned Linux build produced exactly the captured 108,600-byte program payload,
SHA-256 `8190d3f7ceb6cb7a7a8d8924bff89f9f611e15ce1f806f2b6237f3311a98f697`.
No original bytes were mounted into its build container. The comparison reads the
capture only after compilation. This is full byte equality, including the ending
zero bytes; it does not depend on normalized hashes or patched compiler output.

Source: `solana-program/token` commit
`a94dd19750dc3b2409f73e15bb74754935b2a489`, `pinocchio/program` package.
Image: `solanafoundation/solana-verifiable-build` digest
`sha256:d7079331a2696eca570fbeeb5caa556cb09084f89ca96f0a0edb86e1cf83e165`.
[Hosted run 40145016333](https://github.com/lalalune/pumpfun-source/actions/runs/40145016333)
records the source-only build and comparison. The source manifest, build log,
image inspection, generated executable and comparison are preserved here.
Both the integration agent and primary agent downloaded and compared the artifact.

The build explicitly selected platform-tools v1.54. `tool-versions.txt` is the
subsequent cargo-build-sbf default-version report, which identifies v1.52; it is
not the selected build compiler's identity. That post-build command also relinked
the container's default SBF toolchain, as recorded in build.log. No selected-rustc
executable digest was captured in this run. The pinned image, explicit command,
source hashes, locked dependencies and exact resulting bytes remain available.

This establishes one dependency rebuild. It neither completes the four Pump.fun
programs nor constitutes a security audit of SPL Token or its integrations.
