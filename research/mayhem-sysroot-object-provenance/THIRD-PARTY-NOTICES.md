# Third-party objects

`objects.tar.gz` contains unmodified ELF members from the official Anza
platform-tools v1.54 Darwin arm64 generic-v0 sysroot. Member-to-library mappings
are in `objects.json`; the release's `version.md` identifies
[anza-xyz/rust at daa3af4a1110ec3f10ce08083bb0b7855a88416f](https://github.com/anza-xyz/rust/tree/daa3af4a1110ec3f10ce08083bb0b7855a88416f).

- Rust/core: Copyright (c) The Rust Project Contributors. Upstream's dual
  MIT/Apache-2.0 license and copyright notices are preserved in
  [rust-LICENSE-MIT](licenses/rust-LICENSE-MIT),
  [rust-LICENSE-APACHE](licenses/rust-LICENSE-APACHE), and
  [rust-COPYRIGHT](licenses/rust-COPYRIGHT).
- compiler-builtins 0.1.160: upstream's full
  [LICENSE.txt](licenses/compiler-builtins-LICENSE.txt) is included, with MIT,
  Apache-2.0 and LLVM exception texts and applicable legacy notices.
  The pinned [Cargo.toml](licenses/compiler-builtins-Cargo.toml) declares
  `MIT AND Apache-2.0 WITH LLVM-exception AND (MIT OR Apache-2.0)`.
  The Rust library [Cargo.lock](licenses/rust-library-Cargo.lock) also records
  version 0.1.160. Authors and applicable license terms remain those of upstream.

These are release metadata associations, not an independent source rebuild.
The objects were neither modified nor executed. Original analysis code is covered
by the repository's MIT license. Exact upstream source paths and Git blobs for
the preserved notices are in [source-notices.json](source-notices.json).
