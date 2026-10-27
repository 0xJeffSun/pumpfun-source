# Disassembly coverage regression tests

Run the standard-library suite from the repository root with Python 3.12:

```sh
python -I -B research/disassembly-coverage/test_disassembly.py
```

The 18 listing tests check complete executable-byte coverage and reject missing,
mutated, duplicate, misaddressed and undecoded rows. Two CLI tests run the actual
`disassemble_checked.py` process against a temporary fake objdump: valid bytes
must produce a checked manifest; successful but empty output must be rejected
without publishing a manifest. The fixture lives in a path containing spaces.

## Windows fixture correction

The previous fake objdump was a shebang-only Python file. On native Windows,
`CreateProcess` rejected it with `WinError 193` during `--version`, before either
CLI test reached the coverage checker. On Python 3.12.10, the original suite
reported **20 tests, 2 failures** (the two CLI tests).

The fixture now uses a quoted `.cmd` launcher on Windows and the executable
shebang script on POSIX. Both invoke the current test interpreter. The real
generator subprocess, its `--version`/`-d` calls, byte checks and negative-test
assertions are retained; neither test is skipped or mocked.

Local checks after the correction:

| Environment | Result |
| --- | --- |
| Native Windows, Python 3.12.10 | 20 tests pass |
| Local Ubuntu / WSL, Python 3.12.3 | 20 tests pass |
| `python -B scripts/verify_evidence.py` | Nine saved captures pass |
| `python -B scripts/test_tooling.py` | Six tests pass |

This changes test portability only. It does not change the generator, verifier,
original captures, historical manifests, selected candidates or pinned CI files.
The fixture is not a real LLVM decoder: these checks do not establish native
Windows platform-tools support, fresh disassembly, source reconstruction or a
binary-identity gain. For real-tool provenance and reproduction commands, see
the [v1.44 disassembly checkpoint](../../repro/disassembly/2026-10-26-v144/README.md).
As documented there, this suite is run manually; it is not added to the sealed CI
workflow by this change.
