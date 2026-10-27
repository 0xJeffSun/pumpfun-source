#!/usr/bin/env python3
"""Offline reproduction; no compiler, VM, network or ELF output."""
import argparse
import hashlib
import importlib.util
import json
from pathlib import Path, PurePosixPath

HERE = Path(__file__).resolve().parent


def load_graph(package=HERE):
    spec = importlib.util.spec_from_file_location("relay_reference_graph", package / "graph.py")
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


def check_files(root, rows):
    seen = set()
    for row in rows:
        name = row["path"]
        path = PurePosixPath(name)
        if path.is_absolute() or ".." in path.parts or "\\" in name or ":" in name or name in seen:
            raise ValueError("invalid or duplicate pin: " + name)
        seen.add(name)
        raw = (root / name).read_bytes()
        if len(raw) != row["bytes"] or hashlib.sha256(raw).hexdigest() != row["sha256"]:
            raise ValueError("input bytes differ: " + name)
        if "git_blob" in row:
            blob = hashlib.sha1(b"blob " + str(len(raw)).encode() + b"\0" + raw).hexdigest()
            if blob != row["git_blob"]:
                raise ValueError("Git blob differs: " + name)


def verify(repo, package=HERE):
    manifest = json.loads((package / "manifest.json").read_bytes())
    check_files(package, manifest["files"])
    pins = json.loads((package / "inputs.json").read_bytes())
    check_files(repo, pins["files"])  # Includes the upstream parser, before importing it.
    graph = load_graph(package)
    result = json.loads(graph.canonical(graph.derive(repo)))
    if result != graph.read(package / "certificate.json.gz"):
        raise ValueError("regenerated certificate differs")
    if result["summary"] != graph.read(package / "summary.json"):
        raise ValueError("regenerated summary differs")
    return result["summary"]


if __name__ == "__main__":
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--repo", type=Path, default=HERE.parents[1])
    args = ap.parse_args()
    summary = verify(args.repo)
    print(json.dumps(summary, indent=2))
