# Evidence and reconstruction tooling

Python 3.12 is supported. Capture, structural analysis, evidence verification and
comparison require only the standard library. Optional local execution uses pinned
`solders==0.27.1` from `requirements.txt`; pyelftools supports independent ELF checks.
No command here signs or sends transactions to a network. LiteSVM uses local test keys.

## Verify the saved snapshot

```sh
python3 scripts/verify_evidence.py
python3 scripts/test_tooling.py
python3 scripts/analyze.py
python3 -m venv .venv
.venv/bin/pip install -r requirements.txt
.venv/bin/python scripts/local_validation.py
```

The validation script regenerates `audit/local-validation.json`. Evidence verification
is distinct from reconstruction verification. CI runs the same checks and compares
the regenerated local validation record; it does not build reconstructed source.

## Capture a new deployment snapshot

```sh
python3 scripts/capture.py --output work/new-capture
```

This captures the four addresses in `repro/programs.json`. It refuses existing program
output directories. Keep failed/partial captures separate and use a fresh output root
when retrying. Optional `--rpc` accepts another RPC; its URL is not written to evidence
to avoid disclosing credentials. Record the provider separately if needed.

`repro/dependencies.json` lists external captures. To capture one dependency, call
`scripts.capture.capture(rpc_url, name, address, fresh_output_path)` from Python.
The loader-v2 branch handles immutable legacy Program accounts. The upgradeable
branch preserves both Program and ProgramData accounts. Other loader formats are
not supported and must not be silently parsed as upgradeable programs.

## Inspect original machine code

```sh
python3 scripts/disassemble.py --objdump /path/to/platform-tools/llvm/bin/llvm-objdump \
  --output work/disassembly-new
```

This records the tool hash, version, input hashes and output hashes. The output
is original-derived disassembly for analysis, never a rebuilt executable.

## Compare an independently compiled candidate

No source build recipe is available yet. Once a candidate has actually been built:

```sh
python3 scripts/compare.py pump /path/to/independently-built/pump.so \
  --pad-zero-to-allocation --output work/comparison-pump
```

Exit status is zero only for full byte equality, including the allocation suffix.
Omit the padding flag when the candidate already contains the complete allocation.
The optional padding step appends newly allocated zeros only; it never copies data
from the original. It first checks that the original's bytes beyond all ELF file
extents are zero. Original bytes are used only for validation and comparison.

The report records both hashes, original/candidate lengths, changed positions,
first difference and whether zero padding was requested. It deliberately sets
`source_provenance_verified` to false: the comparator cannot prove how a caller
obtained a candidate. A future release needs source/compiler manifests and a clean
build trace in addition to this comparison. Passing the original as the candidate
would prove nothing about source reconstruction.

## Local compiler inputs

`build_partial_candidate.py` records crate Rust sources/manifests, the owning workspace manifest and lockfile, ancestor `idls/` JSON files used by Anchor `declare_program!`, and repository-local Cargo/toolchain configuration before and after compilation. `--extra-input <path>` adds a repository-local path dependency or other build-script/include asset; repeat it for additional inputs. The before/after maps must be identical. This is an inventory of known local inputs, not a hermetic toolchain/dependency closure. Registry archives, environment and toolchain identity require their separate build records.

Older saved builds keep their original manifests; their scope is not retroactively expanded. Fees workspace experiments explicitly bind their root manifest/lock and IDLs in separate provenance records. Run `python3 scripts/test_build_source_manifest.py` to verify that workspace-lock, IDL and explicit-asset changes are detected.
