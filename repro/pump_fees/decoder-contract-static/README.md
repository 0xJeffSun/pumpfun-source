# Fees decoder contract: static review

This publishes the unchanged [28-file review](sealed/REPORT.md) of original decoder 257264 and candidate unchecked method 78104. It adds no program changes, builds, runtime probes or new fixtures.

The discriminator handoff does not establish a behavioral correction. Original body-length thresholds 2504 / 4065 / 4089 equal candidate full-account thresholds 2512 / 4073 / 4097 after adding the eight-byte discriminator. Both observed original callers pass a local slice and discard its remaining cursor after decoding. The original shared helper, separate allocation branches and cursor writes remain structural differences from the current source; exact source reconstruction and full equivalence remain unresolved.

The preserved original seal covers six raw assembly ranges, two direct decoder callers per ELF, four matching normalized direct callee bodies with equal relocation patterns, and three threshold correspondences. Direct-body matches do not prove recursive data/call closure, and the caller inventory does not rule out indirect invocation. The reports of earlier unsuccessful source trials remain historical evidence.

The candidate remains SHA-256 `a9c4ea9e47356a91bf9bd97318746a7c207b873e32485d7786853f048d7d4afa`; the original is `4f2955d0f6b40cc9ff7daa18ccad7d19119ba1249759f4e7e3bb691beee6b35e`. All 28 original files and their manifest remain unchanged under `sealed/` and are archived in `sealed-review.tar.gz`. Their manifest hash is `0ce158df076d1a73b6b6d36061d99225c2f73abf7a5729f6aea6ff4ffe57c536`.

Run from any working directory, including after copying this entire directory outside the repository:

```sh
PYTHONDONTWRITEBYTECODE=1 python3 /path/to/decoder-contract-static/verify.py
```

The verifier uses only the Python standard library and bundled files. It checks both package seals, the original archive, all 16 frozen input records, the bundled prior 44-file closure archive and its 22 source inputs, exact saved assembly bytes, signed call operands and threshold arithmetic. Historical work-directory and dependency-cache paths are retained as provenance strings; they are not opened. No compiler, disassembler, installed dependencies or program execution is required.

`portable/` contains only path/output adaptations of the sealed analysis and ELF reader. The verifier checks those adaptations against the unchanged originals before recomputing the report. Use the top-level verifier; the original scripts under `sealed/` retain their historical repository assumptions.
