# Verified byte-identical builds produced this session (via x86_64 CI)

Because this Apple Silicon machine cannot run the x86_64 `solana-verifiable-build` image
(Docker Desktop wouldn't boot headlessly; podman couldn't register amd64 emulation),
I triggered the repo's own x86_64 GitHub Actions pipeline — the environment that works —
to produce real, verified byte-identical binaries from source.

**CI run: [40175925548](https://github.com/lalalune/pumpfun-source/actions/runs/40175925548)** (`dependency-build.yml`, input `both`), conclusion **success**.

| Dependency | Bytes | Original SHA-256 | Candidate SHA-256 | full_byte_equality | first_difference |
|---|---:|---|---|---|---|
| SPL Token | 108,600 | `8190d3f7…a98f697` | `8190d3f7…a98f697` | **true** | null |
| Token-2022 | 1,382,016 | `15a2e615…c1342e2d` | `15a2e615…c1342e2d` | **true** | null |

Each was built fresh from pinned upstream source inside the pinned verifiable-build image
(SPL Token: `solana-program/token@a94dd19`, image `@sha256:d7079331…`; Token-2022:
image `@sha256:6c73adc7…`) and byte-compared to the captured on-chain payload under
`evidence/dependencies/`. The generated ELF, build log, source manifest and comparison
are preserved as CI artifacts (`spl-token-rebuild-40175925548`, `token-2022-rebuild-40175925548`).
No captured original was a build input; the comparison reads the capture only after compilation.

## This proves the method end-to-end — and bounds what's left

- **2 of the external dependencies are byte-identical from source, re-verified this session.**
- **Metaplex:** the recovered candidate is one guard-clause away in `.text` (Agent C's
  `Utilize` patch, predicted −1,479 B), but **full** byte-identicality is capped: ~30
  `.data.rel.ro` bytes are panic source-line numbers that depend on original source
  whitespace not present in the binary → not recoverable without the original source file.
- **ATA:** 307 bytes, 100% in the compiler-emitted `custom_panic`; closes only by building
  with the exact Solana 1.10.33 bpf-tools (the `associated_token` CI job needs that image).
- **The 4 core Pump.fun programs:** NOT reachable by any build I can run. They are `is_verified: false`
  on the registry (no published verifiable recipe), differ ~55% (mostly missing `.text`),
  and need Pump.fun's **internal historical build recipe** (toolchain + `Cargo.lock` + flags).
  That is the single blocking input, and only you can retrieve it.

Bottom line: the byte-identicality pipeline demonstrably works (2 verified binaries this
session); the core programs are gated on an input that does not exist in this environment,
and I did not fabricate or brute-force it. Your SDK-testing goal is already served by the
working localnet in `D-sdk-localnet/`.
