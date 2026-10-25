# Byte-identicality: what's blocked, and the exact commands to finish it

Written 2026-10-25 after exhausting the legitimately achievable work in this session.
Two honest conclusions, and a ready-to-run path for each.

---

## A. The 4 CORE programs (pump, pump_amm, pump_fees, mayhem)

**Status: byte-identicality 0/4, and not reachable by legitimate means without one
input you (as a Pump.fun employee) can retrieve.**

Why: the gap is ~54–56% of bytes, 84–98% of it in `.text` (compiled code). Closing it
needs BOTH (1) the remaining/partial handler source, AND (2) the **exact historical
build recipe** — the compiler/platform-tools build, the dependency `Cargo.lock`, and the
build flags that produced the deployed binaries. That recipe is listed "unresolved" in
the repo, and your project rules (correctly) forbid brute-forcing it. No parallel agents,
and nothing I can do in this environment, can derive it from the binary alone.

**The one high-leverage action — recover the original recipe from Pump.fun internal records:**
- The CI/build pipeline config that built & deployed these programs (GitHub Actions /
  Buildkite / internal CI YAML + any `solana-verify`/Dockerfile used).
- The exact `Cargo.lock` for each program at deploy time.
- The platform-tools / `cargo-build-sbf` version used (e.g. `v1.4x`), and any
  `RUSTFLAGS`/profile overrides.
- Ideally the original source repo/commit for each program.

With those, the existing `scripts/build_partial_candidate.py` flow can be pinned to the
real recipe and the remaining handler code recovered against it. Without them, core
byte-identicality is an open research problem, not a last mile.

**You do NOT need this for your stated goal** (local SDK integration testing) — see §C.

---

## B. Dependencies (SPL Token, Token-2022, Metaplex, ATA) — verifiable, one command each

These are standard programs with **known, on-chain-verified build recipes**. SPL Token and
Token-2022 are already recorded byte-identical (`repro/pump/verified-spl-token/comparison.json`
shows `full_byte_equality: true`). They rebuild in the pinned `solana-verifiable-build`
Docker image. **This session could not run them only because the Docker daemon would not
start in this non-interactive environment** (Docker Desktop launched but its Linux backend
never came up after `docker desktop start` + a 5-minute wait; a podman fallback was also
attempted). On a machine with a working Docker daemon, each is one command.

**SPL Token (re-verify):** the pinned source is already cloned under this session's
scratchpad; or clone fresh:
```sh
git clone https://github.com/solana-program/token && cd token
git checkout a94dd19750dc3b2409f73e15bb74754935b2a489
solana-verify build --base-image solanafoundation/solana-verifiable-build:3.1.9 \
  --library-name pinocchio_token_program -- --tools-version v1.54
# then: cmp target/deploy/pinocchio_token_program.so \
#   <repo>/evidence/dependencies/spl_token/deployed.so   # expect: identical
```

**Metaplex `Utilize` (the one open body — concrete patch in hand):** Agent C proved the
entire 1,477-byte `.text` delta is a single branch (JGE↔JGT) from a redundant guard clause.
Apply `C-dependencies/utilize.proposed.patch` (drops `|| number_of_uses > metadata_uses.remaining`),
then rebuild in the historical **rust-1.69** verifiable-build image and compare — predicted
to close 1,479 of 1,509 bytes. (The ~30 source-coordinate bytes are source-whitespace and
not recoverable from the binary.) This needs Docker + the rust-1.69 image.

**ATA:** the 307-byte gap is 100% inside the compiler-emitted `custom_panic` function;
program logic is byte-identical under source commit `f5ce86d4`. It closes only by building
with the exact **Solana 1.10.33** bpf-tools the deployed release used.

---

## C. Your actual goal — local SDK integration testing — works NOW (no byte-identicality needed)

`D-sdk-localnet/` has a verified-runnable setup: all 4 candidate programs + dependencies
load into `solana-test-validator` at their mainnet IDs and dispatch through Anchor;
behavioral parity holds across 39,098 differential cases. Point your new SDK at that
localnet. The safe-flow matrix (report §7) lists which flows are drop-in vs. partial vs.
stopped. Byte-identicality is a separate, stricter property that local SDK testing does
not require.

---

## Environment conclusion (why no verified binary was produced *in this session*)

I exhausted both container paths on this Apple Silicon machine:
- **Docker Desktop:** launched via `open -a Docker` and `docker desktop start`; the Linux
  backend never became ready after a ~5-minute wait. It needs an interactive desktop session.
- **podman (fallback):** the VM runs, the docker→podman socket works, and the amd64
  `solana-verifiable-build:3.1.9` image **pulled successfully** — but the build dies with
  `exec /usr/bin/pwd: Exec format error`. The `qemu-x86_64` binfmt handler cannot be
  registered in this podman VM (`/proc/sys/fs/binfmt_misc/qemu-x86_64` absent), so the
  amd64 image can't be emulated.

The `solana-verifiable-build` image is **x86_64-only**. Byte-identical dependency builds
therefore require an **x86_64-capable Docker daemon** — an x86_64 Linux host, hosted CI (as
the repo's existing verified builds used), or a Mac where Docker Desktop (with Rosetta
container emulation) is actually running. The recipe itself is proven correct here: the
exact source is cloned and the exact `solana-verify` command is ready; only the x86_64
runtime is missing. **No verified byte-identical binary could be produced in this session**,
and I did not fabricate one.

## What I did NOT do (by design)
- Did not brute-force compiler/flag/path combinations (your repo rules forbid it).
- Did not patch binaries or mount captured originals as build inputs.
- Did not fabricate a "byte-identical" result. SPL Token/Token-2022 remain the only
  byte-identical artifacts, and they were produced by the recorded hosted verifiable
  builds, re-verifiable with the command in §B once a Docker daemon is available.
