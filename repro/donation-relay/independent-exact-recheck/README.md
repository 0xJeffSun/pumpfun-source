# Additional independent exact Relay build

An additional empty-target build independently reproduces the existing
[linked ELF recipe](../linked-elf-reproduction/README.md). It runs in a separate
network-disabled container with source, linker configuration, SDK and registry
mounted read-only; the captured original is not mounted. All60 source inputs
match the published ordinary Rust source. All253 locked crate archives and7,968
extracted files match before and after the build. The compiler performs one real
root invocation and leaves source unchanged.

The resulting818,280-byte ELF is literally equal to the complete original ELF
extent: SHA-256 `56d81ec64a0ba070d3d23f3c1547b31d659e85716dfa2198ec4b0ce6cd355333`.
The unstripped result also exactly matches the published build. This uses the
explicit linker layout; it does not establish the original historical recipe.

A new execution of the existing offline loader implementation then submits912
signed local transactions using this newly built ELF. Its830,448-byte payload
is literally equal to the captured payload, with SHA-256
`367f07a62e3f74d358187d175cf3228848e81a56c781a9a75b9df7fed1268563`.
The loader supplies the12,168 zero-capacity bytes; no compiler output is patched
or padded. The complete deterministic transaction receipt agrees with the prior
published run. No network transaction is submitted.

```sh
python3 -I -B repro/donation-relay/independent-exact-recheck/verify.py
```

The verifier checks retained source/build/configuration/archive/output and
loader-receipt bindings. It does not compile or execute a VM. Actual build
controllers are retained; their host-local SDK/cache locators must be adapted
while preserving hashes and empty-target/readonly-source conditions on another
host. Materialize the parent complete492 source and copy its two layout files
into a fresh build workspace before using the controller.

This evidence does not update canonical selected source, prove historical
ProgramData metadata or upgrade history, or complete the four core programs.
The exact Relay research recipe and remaining selected/core work stay distinct.
