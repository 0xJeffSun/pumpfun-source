#!/usr/bin/env python3
import hashlib
import json
from pathlib import Path
import sys

P = Path(__file__).resolve().parent
ROOT = P.parents[2]
sys.path.insert(0, str(ROOT / 'repro/pump_fees/framework-matching'))
from elf_reader import Elf
H = lambda data: hashlib.sha256(data).hexdigest()


def verify():
    for name, digest in json.loads((P / 'manifest.json').read_text()).items():
        assert H((P / name).read_bytes()) == digest, name
    for name, digest in json.loads((P / 'external-inputs.json').read_text()).items():
        assert H((ROOT / name).read_bytes()) == digest, name
    baseline = json.loads((ROOT / 'repro/pump/metaplex-candidate-build-11/source-manifest.json').read_text())
    assert len(baseline) == 812
    assert baseline == json.loads((P / 'native-baseline-sdk/source-manifest.json').read_text())
    original = Elf(ROOT / 'evidence/dependencies/token_metadata/deployed.so')
    candidate11 = Elf(ROOT / 'repro/pump/metaplex-candidate-build-11/token_metadata.so')
    candidate12 = Elf(ROOT / 'repro/pump/metaplex-candidate-build-12-review/candidate12.so')
    rows = json.loads((P / 'native-experiments.json').read_text())['rows']
    for row in rows:
        directory = P / row['name']
        result = json.loads((directory / 'result.json').read_text())
        assert result['returncode'] == 0
        assert H((directory / 'build.log').read_bytes()) == result['build_log_sha256']
        assert H((directory / 'source-manifest.json').read_bytes()) == result['source_manifest_sha256']
        source_map = json.loads((directory / 'source-manifest.json').read_text())
        differing = [n for n in baseline if baseline[n] != source_map[n]]
        assert set(source_map) == set(baseline)
        assert all(n == 'programs/token-metadata/program/src/processor/uses/utilize.rs' for n in differing)
        delta = directory / 'source-delta/utilize.proposed.rs'
        if delta.exists():
            assert H(delta.read_bytes()) == source_map['programs/token-metadata/program/src/processor/uses/utilize.rs']
        native = Elf(directory / 'candidate.so')
        assert H(native.b) == result['candidate_sha256'] == row['candidate_sha256']
        lo, hi = row['utilize_range']
        assert lo == 236632 and lo in native.entries
        assert hi == next(at for at in native.entries if at > lo)
        body = native.normalized[lo:hi]
        assert (body == original.normalized[236632:241736]) == row['body_normalized_equals_target']
        assert (body == candidate11.normalized[236632:241736]) == row['body_normalized_equals_candidate11']
        assert (body == candidate12.normalized[236632:241744]) == row['body_normalized_equals_candidate12']
        assert not row['body_normalized_equals_target']
    assert (P / 'native-baseline-sdk/candidate.so').read_bytes() == (P / 'hybrid-baseline/candidate.so').read_bytes()
    assert (P / 'native-negative/candidate.so').read_bytes() == (P / 'native-negative-ir/candidate.so').read_bytes()
    failure = json.loads((P / 'native-baseline/result.json').read_text())
    assert failure['returncode'] == 101 and b"'assert.h' file not found" in (P / 'native-baseline/build.log').read_bytes()
    print(json.dumps(dict(verified=True, frozen_source_files=812,
                          successful_research_builds=len(rows), accepted=False, byte_identity=False)))


if __name__ == '__main__':
    verify()
