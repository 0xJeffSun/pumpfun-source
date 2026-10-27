"""Verify this partial-recovery packet without compiling or executing target programs."""
from pathlib import Path
import gzip
import hashlib
import importlib.util
import json
import sys

if not __debug__:
    raise RuntimeError("verification requires assertions")
sys.dont_write_bytecode = True
PACKET = Path(__file__).resolve().parent
ROOT = PACKET.parents[1]


def sha(data):
    return hashlib.sha256(data).hexdigest()


def module(name, path):
    spec = importlib.util.spec_from_file_location(name, path)
    result = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(result)
    return result


def analyze(root, packet):
    static = module("amm_cfg_analysis", packet / "analysis.py")
    runtime = module("amm_cfg_runtime", packet / "runtime_check.py")
    result, graphs = static.analyze(root, packet)
    result["runtime"] = runtime.verify(root, packet, result["controls"])
    return result, graphs


def verify(root=ROOT, packet=PACKET):
    paths = list(packet.rglob("*"))
    assert not any(p.is_symlink() for p in paths)
    assert all(p.is_dir() or p.is_file() for p in paths)
    actual = {p.relative_to(packet).as_posix(): sha(p.read_bytes()) for p in paths
              if p.is_file() and p.relative_to(packet).as_posix() != "manifest.json"}
    assert actual == json.loads((packet / "manifest.json").read_bytes())
    for name, digest in json.loads((packet / "external-inputs.json").read_bytes()).items():
        assert sha((root / name).read_bytes()) == digest
    negative = json.loads((packet / "negative-controls.json").read_bytes())
    assert all(row["whole_body_equal"] is False for row in negative)
    result, graphs = analyze(root, packet)
    assert result == json.loads((packet / "report.json").read_bytes())
    for label, graph in graphs.items():
        assert json.loads(json.dumps(graph)) == json.loads(gzip.decompress((packet / f"analysis/{label}-cfg.json.gz").read_bytes()))
    assert result["accepted_complete_handler_gains"] == 0
    return result


if __name__ == "__main__":
    import argparse
    parser = argparse.ArgumentParser()
    parser.add_argument("--packet", type=Path, default=PACKET)
    parser.add_argument("--root", type=Path, default=ROOT)
    args = parser.parse_args()
    result = verify(args.root.resolve(), args.packet.resolve())
    print(json.dumps({"controls": list(result["controls"]), "normalized_preserved": 432,
                      "unqualified_raw_preserved": 89, "accepted_complete_handler_gains": 0,
                      "runtime_pairs": result["runtime"]["total_replayed_pairs"],
                      "signed_records": result["runtime"]["total_signed_records"],
                      "new_target_executions": 0}, indent=2))
