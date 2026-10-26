# v1.37 Rust branch code-generation microprobes

These six synthetic Rust functions isolate the requested/remaining/total guards, mutation, success call and an owned object's cleanup. They contain no captured executable instructions as build inputs. The source forms share the same local arithmetic/rejection domain; they do not model the complete Metaplex handler or establish its full behavior.

The official platform-tools v1.37 Darwin/arm64 distribution supplies Rust1.68.0-dev and LLVM15.0.7. `results.json` binds the downloaded archive, compiler executable, source versions, every Rust input, command, log and actual generated assembly/LLVM IR/object. The release workspace's `opt-level=z`, overflow checking, LTO and one codegen unit were used. This is an explicit native research environment, not authentication of the target's historical compiler closure.

| Source form | Guard bytes | JGE | JGT | JA |
| --- | ---: | ---: | ---: | ---: |
| checked subtraction |168|1|1|1|
| positive expression with early return |168|1|1|1|
| explicit negative guard with early return |168|1|1|1|
| unified guard with early return |168|1|1|1|
| error-first tail result |176|0|2|2|
| positive tail result |176|0|2|2|

All four168-byte bodies are raw-identical. Both176-byte bodies are raw-identical. The tail-result forms retain an additional unconditional jump. These are complete synthetic function bodies; the JA count includes the shared cleanup continuation jump.

**The stock compiler can emit the desired single JGE.** A claim that this instruction requires another nominal compiler version is contradicted by the actual object bytes. However, the reviewed positive-expression and tail-result forms both compiled to candidate12 in the complete Metaplex program. The synthetic result therefore cannot be promoted to a full-program prediction: surrounding error/ownership/control flow matters. The next useful step is to examine the complete handler's compiler IR and compare a source hypothesis in that context.

Run `python3 repro/pump/metaplex-guard-microprobes/verify.py` to verify retained inputs/outputs and instruction counts without a compiler. To rerun compilation, install the pinned official `platform-tools-osx-aarch64.tar.bz2` from release v1.37 under this folder's `toolchain/`, retain the archive beside it, then run `run.py` with a fresh/absent `output/` directory. The complete native toolchain is intentionally not vendored.
