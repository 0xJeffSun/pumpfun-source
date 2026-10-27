# Main Pump toolchain identity: official Linux x86_64 platform-tools v1.44, target `sbpf-solana-solana`

The deployed main-Pump program was built with the **official Linux x86_64 platform-tools v1.44** target libraries for triple **`sbpf-solana-solana`**. The current pipelines use the macOS v1.44 `sbf-solana-solana` libraries, or the Linux `sbf` libraries in Round36's profile. Five original windows are std `TypeId` thunks, and only this toolchain reproduces them. With the same Rust source, the five windows match, the pump code generation is otherwise unchanged and nothing is lost:

| build (all from this packet, `builds/`) | recipe | normalized | raw |
|---|---|---:|---:|
| Round36 primary | macOS v1.44 libraries, `sbf-solana-solana` | 738 | 126 |
| Round36 primary | official Linux x86_64 v1.44 libraries, `sbpf-solana-solana` | **743** | 133 |
| `r36-i1b` packet source | official Linux x86_64 v1.44 libraries, `sbpf-solana-solana` | **776** | 135 |

The raw counts use the plain link. The published Round36 inventory applies derived text- and data-order linker scripts on top.

## Evidence

1. **The windows belong to two standard-library types.**
   - `0xce50`, `0x188cc8`, `0x19a1a0` and `0x1a8e28` are the 56-byte `core::error::Error::type_id` thunks in 88-byte `dyn Error` vtables. Their drop, Debug and Display entries belong to alloc's private `StringError`, created by `Box<dyn Error+Send+Sync>::from(String)`. There is one vtable per crate that calls `io::Error::new(kind, &str)`.
   - `0x1ab9b8` is `<NoPayload as Any>::type_id`. That vtable is referenced only by libcore's precompiled `core::panicking::panic_fmt`.
   - Both TypeIds are therefore fixed by the StableCrateIds of the precompiled std rlibs. Pump's package name, features and manifest cannot change them. `evidence/vtrefs.py` and `evidence/typeids.py` locate them; SBFv1 data relocations store each address shifted left by 32.
2. **Only one toolchain matches NoPayload.** `evidence/typeid-matrix.txt` reads the NoPayload thunk straight out of every libcore rlib available locally:
   - macOS v1.41–v1.46, every sbf/sbpf triple;
   - Linux x86_64 v1.40–v1.46;
   - Windows and macOS x86_64 v1.41.
   
   Only `linux-x86_64 v1.44 rustlib/sbpf-solana-solana/libcore-52876eb403c2f847.rlib` contains the original 128-bit value `a3f5295a8e9e84c1 ca6c34d708d27ee8`.
3. **The same toolchain matches StringError.** `evidence/probe.rs` performs an ordinary `Box::<dyn Error+Send+Sync>::from(String)`. Compiled for `sbpf-solana-solana` against those libraries, it emits `1b204ea073ccb1b7 00e61d2cabdb5e3d`, the value in all four original thunks. The other three combinations (macOS or Linux libraries, `sbf` or `sbpf` triple) all differ.
4. **The original was built on Linux.** Its std panic `Location` paths are `/home/runner/work/platform-tools/...`; the macOS libraries embed `/Users/runner/...`.
5. **The library files are authentic.** The 25 `rustlib/sbpf-solana-solana` files equal the members of `platform-tools-linux-x86_64.tar.bz2` (sha256 `6719b889d60677a8a2fcf4c82f68441a1afe0ab093edd2efe9f84a67a808b3e9`, official v1.44 release asset 234589397). The member hashes are in `evidence/archive-member-sha256.txt` and `recipe/linux144-sbpf-target-libs.sha256`.
6. **Pump code is unchanged.** In v1.44 the `sbf-solana-solana` and `sbpf-solana-solana` target specifications are identical (`+store-imm,+jmp-ext`, no CPU), and the compiler binary is the same macOS v1.44 `rustc 1.79.0-dev`. The builds above lose no window.

## Recipe

`recipe/make_hybrid144.sh` assembles the sysroot. `rust/bin/rustc` and its dylibs are byte-identical APFS clones of the macOS v1.44 compiler, with the macOS host libraries for proc macros. `rustlib/sbpf-solana-solana` comes from the official Linux v1.44 archive. rustc derives its default sysroot from the location of `librustc_driver`, so no `--sysroot` flag or RUSTFLAGS change is needed.

The crate is then built exactly as the repository's workspace-layout builder does, with three differences: `--target sbpf-solana-solana`, `RUSTC` set to the hybrid compiler, and `-Zremap-cwd-prefix=` placed in `CARGO_TARGET_SBPF_SOLANA_SOLANA_RUSTFLAGS`. `recipe/fastbuild.py --recipe identity` is the script used here.

Inferred CLI: every locally installed `cargo-build-sbf` (2.1.0, 2.1.17, 2.1.21) targets only `sbf-solana-solana`. The deployed program was therefore built by a newer Agave `cargo build-sbf` that targets `sbpf-solana-solana`, on Linux x86_64 with platform-tools v1.44.

**What still differs:** cargo's `-C metadata` hashes the build host triple for this `-dev` compiler: `aarch64-apple-darwin` here, presumably `x86_64-unknown-linux-gnu` originally. Symbol hashes, and with them the natural `.text` order, are therefore not expected to match yet. A follow-up lane is testing host emulation.

```sh
python research/claude-pump-integration-20261027/toolchain-identity/verify.py
```

`verify.py` is pure Python. It checks the manifest, extracts the five original TypeId constants and the 56-byte thunks of every packaged ELF, and recomputes each ELF's normalized/raw window counts with the repository's normalization. It also confirms that exactly the identity-recipe builds return the original constants. No constants are written by hand, and no source change, padding or binary edit is involved.
