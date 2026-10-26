#!/usr/bin/env python3
import hashlib
import json
from pathlib import Path

P = Path(__file__).resolve().parent
ROOT = P.parents[2]
H = lambda b: hashlib.sha256(b).hexdigest()

if __name__ == '__main__':
    report = json.loads((P / 'comparison.json').read_text())
    original = (ROOT / 'evidence/dependencies/token_metadata/deployed.so').read_bytes()
    raw = (P / 'token_metadata.so').read_bytes()
    padded = (P / 'rebuilt.deployed.so').read_bytes()
    assert H(original) == report['original_sha256']
    assert H(raw) == report['candidate_input_sha256']
    assert H(padded) == report['candidate_sha256']
    assert H((P / 'build.log').read_bytes()) == report['build_log_sha256']
    assert H((P / 'source-manifest.json').read_bytes()) == report['source_manifest_sha256']
    assert padded == raw + bytes(len(original) - len(raw))
    proposal = ROOT / 'repro/pump/metaplex-utilize-positive-guard-source-recovery'
    assert (P / 'source.patch').read_bytes() == (proposal / 'source.patch').read_bytes()
    assert (P / 'patch-source-inputs.json').read_bytes() == (proposal / 'source-inputs.json').read_bytes()
    assert H((P / 'source.patch').read_bytes()) == report['source_patch']['sha256']
    assert raw == (ROOT / 'repro/pump/metaplex-candidate-build-12-review/candidate12.so').read_bytes()
    differences = sum(x != y for x, y in zip(original, padded))
    assert differences == 196601 and not report['full_byte_equality']
    print(json.dumps(dict(verified=True, source_compiled=True, raw_equals_rejected_candidate12=True,
                          differing_payload_positions=differences, accepted=False, byte_identity=False)))
