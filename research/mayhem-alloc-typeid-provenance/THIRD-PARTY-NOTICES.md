# Third-party source and object files

The four unmodified ELF objects in `objects.tar.gz` are from the official
anza-xyz/platform-tools v1.54 Linux x86_64 and Darwin arm64 generic-v0 alloc
libraries. They are third-party Rust artifacts, not relicensed repository code.

Both release version files identify Rust commit
`daa3af4a1110ec3f10ce08083bb0b7855a88416f` at
[anza-xyz/rust](https://github.com/anza-xyz/rust/tree/daa3af4a1110ec3f10ce08083bb0b7855a88416f).
The corresponding `library/alloc/src/boxed/convert.rs` is retained unmodified.
Rust is available under the MIT or Apache 2.0 license; the source revision's
license texts and copyright notice are included in `licenses/`.

The analysis uses the existing parser and instruction/boundary method in
`research/mayhem-sysroot-object-provenance`, pinned by `inputs.json`. Analysis
code follows the repository's MIT license. Source revision metadata is supplied
by the release and is not independently rebuilt here.
