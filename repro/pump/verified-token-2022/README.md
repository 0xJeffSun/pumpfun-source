# Independently reproduced Token2022 dependency

The generated 611,056-byte ELF matches the captured prefix exactly. The captured
allocation has 770,960 additional zero bytes. Appending that many newly generated
zeros produces the full 1,382,016-byte payload, SHA-256
`15a2e615a42e20f31714bbaaee43002ae6f1cda2e8d7118243117ab3c1342e2d`.
Both the unmodified compiler output and padded allocation image are preserved.
Original capture bytes were read only after source compilation and were not
mounted into the build container. No original code was copied into either output.

Source: `solana-program/token-2022` commit
`8867f751c0f69367ba03af4f85510b5611989491`, `program` package.
Pinned image digest:
`sha256:6c73adc767ee7ff212f2532d4695472b12f3d4ac20aea3db22b89d8c614dac50`.
The source pins CLI 4.0.1; its selected build compiler was platform-tools v1.53,
rustc 1.89.0-dev, LLVM 20.1.7. The selected executable's SHA-256, resolved path,
and full version are recorded in `tool-versions.json`.

[Hosted run 40145370873](https://github.com/lalalune/pumpfun-source/actions/runs/40145370873)
completed the source build and full comparison. The agent and primary agent each
verified raw prefix equality, zero-only padding, full allocation equality and
recorded manifest/log hashes. This is build identity evidence, not a completed
security audit or proof that the four Pump.fun programs are reconstructed.
