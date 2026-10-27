"""Authenticate and restore the complete Fees research chain into a new directory."""
from pathlib import Path
import argparse
import gzip
import hashlib
import importlib.util
import json
import shutil
import tempfile

if not __debug__:
    raise RuntimeError("Run this verifier without Python -O")

HERE = Path(__file__).resolve().parent
BASE = HERE.parent / "fees-residual-parallel-checkpoint-20261027"


def sha(data):
    return hashlib.sha256(data).hexdigest()


def require(condition, message):
    if not condition:
        raise ValueError(message)


def module(name, path):
    spec = importlib.util.spec_from_file_location(name, path)
    result = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(result)
    return result


def verify(output=None, prefix=""):
    anchor = json.loads((HERE / "base.json").read_bytes())
    require(anchor["path"] == "research/fees-residual-parallel-checkpoint-20261027", "Wrong base")
    for name, field in (
        ("archive-manifest.json", "archive_manifest_sha256"),
        ("restore_combined.py", "restore_combined_sha256"),
        ("package-sha256.json", "package_sha256"),
    ):
        require(sha((BASE / name).read_bytes()) == anchor[field], "Base binding: " + name)
    old_raw = gzip.decompress((BASE / "index.json.gz").read_bytes())
    require(sha(old_raw) == anchor["index_sha256"], "Base index binding")
    old = json.loads(old_raw)
    delta = json.loads(gzip.decompress((HERE / "index.json.gz").read_bytes()))
    require(all(delta["base_checkpoint"][k] == anchor[k] for k in delta["base_checkpoint"]), "Delta base binding")
    base_restore = module("fees_residual_previous", BASE / "restore_combined.py")
    delta_restore = module("fees_residual_delta", HERE / "restore.py")
    delta_restore.check_index(delta, json.loads((HERE / "archive-manifest.json").read_bytes()))
    combined = dict(old["current_files"])
    combined.update(delta["files"])
    for name in delta["removed_since_base"]:
        delta_restore.safe(name)
        require(name in combined, "Unknown removed path")
        del combined[name]
    require(combined.keys() == delta["current_files"].keys(), "Current path set")
    for name, row in delta["current_files"].items():
        delta_restore.safe(name)
        require(all(row[k] == combined[name][k] for k in ("blob", "bytes", "mode", "mtime_ns")), "Current row binding: " + name)
    selected = {n: r for n, r in combined.items() if n.startswith(prefix)}
    if output is not None:
        require(selected and not output.exists(), "Use a new output directory and a nonempty selection")
    base_output = output if any(n.startswith(prefix) for n in old["current_files"]) else None
    base_result = base_restore.verify(base_output, prefix)
    if output is not None and base_output is None:
        output.mkdir(parents=True)
    with tempfile.TemporaryDirectory(prefix="fees-residual-delta-") as tmp:
        stage = Path(tmp) / "delta" if output is not None and any(n.startswith(prefix) for n in delta["files"]) else None
        delta_result = delta_restore.verify_or_restore(stage, prefix)
        if output is not None:
            for name in delta["removed_since_base"]:
                if name.startswith(prefix):
                    target = output / str(delta_restore.safe(name))
                    if target.is_file():
                        target.unlink()
            if stage is not None:
                for name in delta["files"]:
                    if not name.startswith(prefix):
                        continue
                    target = output / str(delta_restore.safe(name))
                    target.parent.mkdir(parents=True, exist_ok=True)
                    shutil.copy2(stage / name, target)
            for name, row in selected.items():
                target = output / name
                require(sha(target.read_bytes()) == row["blob"], "Restored content: " + name)
                require(target.stat().st_size == row["bytes"], "Restored size: " + name)
                require(target.stat().st_mode & 0o777 == row["mode"] & 0o777, "Restored mode: " + name)
    return {
        "verified": True,
        "base_current_regular_files": base_result["current_regular_files"],
        "delta_files": delta_result["files"],
        "current_regular_files": len(combined),
        "preserved_historical_files": base_result["preserved_historical_files"],
        "restored_current_files": len(selected) if output is not None else 0,
        "acceptance": "Research snapshot only; each trial keeps its own acceptance status",
    }


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--output", type=Path)
    parser.add_argument("--prefix", default="")
    args = parser.parse_args()
    print(json.dumps(verify(args.output, args.prefix), indent=2))
