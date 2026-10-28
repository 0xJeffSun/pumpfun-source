"""Materialize the maintained two-member PumpSwap v1.44 build workspace."""
from pathlib import Path
import argparse
import hashlib
import shutil

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[1]
ROOT_MANIFEST = b"""[workspace]
members = ["programs/pump-amm", "crates/native-transfer-fee"]
resolver = "2"

[profile.release]
panic = "abort"
overflow-checks = true
lto = false
codegen-units = 1
"""
STANDALONE_SUFFIX = b"""
[profile.release]
panic = "abort"
overflow-checks = true
lto = false
codegen-units = 1

[workspace]

"""
EXPECTED_TREE_SHA256 = "2bf0742a53aeb2039d5a0a9855d006a7c773acc05774424cb37b50270df460db"


def tree_digest(root):
    result = hashlib.sha256()
    count = 0
    for path in sorted(item for item in root.rglob("*") if item.is_file()):
        result.update(path.relative_to(root).as_posix().encode() + b"\0")
        result.update(hashlib.sha256(path.read_bytes()).digest())
        count += 1
    return count, result.hexdigest()


def materialize(destination):
    destination = Path(destination)
    destination.mkdir(parents=True, exist_ok=False)
    (destination / "programs").mkdir()
    (destination / "crates").mkdir()
    shutil.copytree(ROOT / "programs/pump-amm", destination / "programs/pump-amm")
    shutil.copytree(ROOT / "crates/native-transfer-fee", destination / "crates/native-transfer-fee")
    manifest = destination / "programs/pump-amm/Cargo.toml"
    data = manifest.read_bytes()
    assert data.endswith(STANDALONE_SUFFIX)
    manifest.write_bytes(data[:-len(STANDALONE_SUFFIX)])
    (destination / "Cargo.toml").write_bytes(ROOT_MANIFEST)
    shutil.copyfile(ROOT / "programs/pump-amm/Cargo.lock", destination / "Cargo.lock")
    assert tree_digest(destination) == (62, EXPECTED_TREE_SHA256)
    return destination


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("destination", type=Path)
    args = parser.parse_args()
    result = materialize(args.destination)
    print(result)
