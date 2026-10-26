#!/usr/bin/env python3
"""One serialized, source-only Utilize experiment in a validated Linux container."""
import argparse
import fcntl
import hashlib
import json
from pathlib import Path
import shutil
import subprocess
import sys
import time

ROOT = Path(__file__).resolve().parents[3]
sys.path.insert(0, str(ROOT / 'scripts'))
from analyze import elf_layout
sys.path.insert(0, str(ROOT / 'repro/pump_fees/framework-matching'))
from elf_reader import Elf
H = lambda b: hashlib.sha256(b).hexdigest()
NAME = 'programs/token-metadata/program/src/processor/uses/utilize.rs'


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--baseline', type=Path, required=True)
    parser.add_argument('--source-file', type=Path, required=True)
    parser.add_argument('--output', type=Path, required=True)
    parser.add_argument('--expect-raw-sha256')
    args = parser.parse_args()
    baseline = args.baseline.resolve()
    lock = (baseline / 'iteration.lock').open('a')
    fcntl.flock(lock, fcntl.LOCK_EX | fcntl.LOCK_NB)
    info = json.loads((baseline / 'container.json').read_text())
    container = info['id']
    state = json.loads(subprocess.check_output(['podman', 'inspect', container], text=True))[0]
    image = json.loads((baseline / 'image-inspect.json').read_text())[0]
    assert state['State']['Running']
    assert state['Image'].removeprefix('sha256:') == image['Id'].removeprefix('sha256:')
    known = json.loads((baseline / 'resume-result.json').read_text())
    assert known['returncode'] == 0 and known['equals_linux_candidate11']
    source = Path(info['source'])
    inputs = json.loads((baseline / 'source-manifest.json').read_text())
    assert len(inputs) == 812
    assert all(H((source / n).read_bytes()) == d for n, d in inputs.items() if n != NAME)
    requested = args.source_file.resolve()
    assert requested.suffix == '.rs' and requested != source / NAME
    proposed = requested.read_bytes()
    output = args.output.resolve()
    output.mkdir(parents=True, exist_ok=False)
    shutil.copyfile(Path(__file__), output / 'build-driver.py')
    (output / 'previous-source.rs').write_bytes((source / NAME).read_bytes())
    (output / 'applied-source.rs').write_bytes(proposed)
    (source / NAME).write_bytes(proposed)
    planned = dict(inputs)
    planned[NAME] = H(proposed)
    (output / 'source-manifest.json').write_text(json.dumps(planned, indent=2) + '\n')
    deployed = source / 'programs/token-metadata/target/deploy/token_metadata.so'
    if deployed.exists():
        (output / 'prior-candidate-sha256.txt').write_text(H(deployed.read_bytes()) + '\n')
        deployed.unlink()  # Owned generated output; never accept a stale deployment file.
    active = subprocess.check_output(
        ['podman', 'exec', '-w', '/', container, 'rustup', 'show', 'active-toolchain'], text=True).split()[0]
    command = ['podman', 'exec', '-e', 'RUSTUP_TOOLCHAIN=' + active,
               '-e', 'CARGO_REGISTRIES_CRATES_IO_PROTOCOL=sparse',
               '-w', '/build/programs/token-metadata', container, 'cargo', 'build-sbf',
               '--', '--config', 'registries.crates-io.protocol="sparse"', '--locked',
               '--manifest-path', '/build/programs/token-metadata/Cargo.toml']
    (output / 'command.json').write_text(json.dumps(command, indent=2) + '\n')
    started = time.monotonic()
    with (output / 'build.log').open('wb') as log:
        run = subprocess.run(command, stdout=log, stderr=subprocess.STDOUT)
    unchanged = all(H((source / n).read_bytes()) == d for n, d in planned.items())
    result = dict(scope='Cached pinned Linux source build, only one disclosed Rust file changed; no captured executable mounted',
                  returncode=run.returncode, elapsed_seconds=time.monotonic() - started,
                  all_planned_source_hashes_unchanged=unchanged,
                  applied_source_sha256=H(proposed), source_manifest_sha256=H((output / 'source-manifest.json').read_bytes()),
                  build_log_sha256=H((output / 'build.log').read_bytes()), image_id=state['Image'],
                  expected_control_sha256=args.expect_raw_sha256, accepted=False)
    if run.returncode == 0:
        assert unchanged and deployed.exists()
        shutil.copyfile(deployed, output / 'candidate.so')
        raw = deployed.read_bytes()
        # Reference bytes are first read after the source compilation has finished.
        original = (ROOT / 'evidence/dependencies/token_metadata/deployed.so').read_bytes()
        layout = elf_layout(original)
        assert layout['trailing_all_zero']
        payload = raw + bytes(max(0, len(original) - len(raw)))
        (output / 'allocation-image.so').write_bytes(payload)
        original_elf = Elf(ROOT / 'evidence/dependencies/token_metadata/deployed.so')
        candidate = Elf(output / 'candidate.so')
        result.update(candidate_bytes=len(raw), candidate_sha256=H(raw),
                      allocation_image_sha256=H(payload), original_sha256=H(original),
                      full_byte_equality=payload == original,
                      differing_payload_positions=sum(a != b for a, b in zip(payload, original)) + abs(len(payload)-len(original)),
                      whole_text_equality=candidate.b[candidate.lo:candidate.hi] == original_elf.b[original_elf.lo:original_elf.hi])
        if 236632 in candidate.entries:
            hi = next(at for at in candidate.entries if at > 236632)
            result['utilize_range'] = [236632, hi]
            result['utilize_normalized_equals_target'] = candidate.normalized[236632:hi] == original_elf.normalized[236632:241736]
        if args.expect_raw_sha256:
            result['known_control_reproduced'] = H(raw) == args.expect_raw_sha256
    (output / 'result.json').write_text(json.dumps(result, indent=2) + '\n')
    print(json.dumps(result, indent=2))
    if run.returncode or not unchanged or (args.expect_raw_sha256 and not result.get('known_control_reproduced')):
        raise SystemExit(1)


if __name__ == '__main__':
    main()
