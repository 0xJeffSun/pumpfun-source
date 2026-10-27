# Relay Linux Rust 1.84.1-family probes

The official Linux x86_64 SBF sysroots from platform-tools v1.49, v1.50 and v1.51
were tested with the same fixed StringError probe and each release's installed
native compiler. All three compiled successfully, left their target libraries
unchanged, and produced type-ID constants different from the captured Relay
windows 56, 267 and 351. No source or accepted artifact was changed.

This extends the preceding v1.47/v1.48 Linux and native-host checks. Equal printed
Rust versions do not establish equal crate identities. These negative probes do
not identify the original sysroot, exclude custom builds or prove every possible
SDK/host combination was tested.

Asset metadata records the official download locations; the probe records contain
measured archive and library hashes, commands and LLVM IR. Archives remain in the
local SDK cache rather than this package. The verifier reads the three actual
original ELF windows, checks every saved result and rederives the IR constants.
With `--cache`, it additionally hashes all recorded installed target libraries.

```sh
python3 -B repro/rea/2026-10-26/linux-family-probes/verify.py --cache
```

Relay's accepted reconstruction remains the 477-window Jupiter checkpoint.
Whole binary identity remains unachieved across the full project scope.
