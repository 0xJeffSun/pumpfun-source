#!/usr/bin/env python3
"""Offline verification; --archive additionally rechecks the official release chain."""
import argparse
import gzip
import hashlib
import json
from pathlib import Path
import sys
import tarfile
sys.path.insert(0, str(Path(__file__).resolve().parent))
import analyze
import elf

HERE = Path(__file__).resolve().parent
BUILD = "repro/identity-audit/2026-10-25/mayhem-v154/"
CAPTURE = "evidence/original/mayhem/deployed.so"


def identity(data, row, label):
    elf.require(len(data) == row["bytes"] and elf.digest(data) == row["sha256"],
                "identity differs: " + label)


def manifest(package):
    rows = elf.read_json(package / "manifest.json")
    for row in rows:
        identity(elf.local_path(package, row["path"]).read_bytes(), row, row["path"])


def load_objects(package):
    libraries = elf.read_json(package / "objects.json")
    expected = {}
    for lib in libraries:
        for row in lib["objects"]:
            key = row["sha256"]
            if key in expected:
                elf.require(expected[key]["bytes"] == row["bytes"], "conflicting object size")
            expected[key] = row
    objects = {}
    with tarfile.open(package / "objects.tar.gz", "r:gz") as archive:
        for member in archive:
            elf.require(member.isfile() and member.name.endswith(".o"),
                        "non-object tar member")
            key = member.name[:-2]
            elf.require(key in expected and key not in objects, "unexpected/duplicate object")
            elf.require(member.size == expected[key]["bytes"], "object size differs")
            data = archive.extractfile(member).read()
            identity(data, expected[key], member.name)
            objects[key] = data
    elf.require(objects.keys() == expected.keys(), "missing objects")
    return objects


def repository_inputs(package, repo):
    rows = elf.read_json(package / "repository-inputs.json")["files"]
    result = {}
    for row in rows:
        data = elf.local_path(repo, row["path"]).read_bytes()
        identity(data, row, row["path"])
        blob = hashlib.sha1(b"blob " + str(len(data)).encode() + b"\0" + data).hexdigest()
        elf.require(blob == row["git_blob"], "Git blob differs: " + row["path"])
        result[row["path"]] = data
    return result


def check_rlib(raw, lib, objects):
    identity(raw, lib, lib["path"])
    rows = []
    for name, offset, data in elf.ar_members(raw):
        if not data.startswith(b"\x7fELF"):
            continue
        key = elf.digest(data)
        elf.require(key in objects and objects[key] == data, "rlib object bytes differ")
        rows.append(dict(name=name, offset=offset, bytes=len(data), sha256=key))
    elf.require(rows == lib["objects"], "rlib membership differs")


def check_archive(package, archive_path, objects):
    release = elf.read_json(package / "release.json")
    asset = release["asset"]
    elf.require(asset["digest"].startswith("sha256:"), "missing publisher digest")
    elf.require(archive_path.stat().st_size == asset["size"], "release archive size differs")
    with archive_path.open("rb") as stream:
        sha = hashlib.file_digest(stream, "sha256").hexdigest()
    elf.require("sha256:" + sha == asset["digest"], "release archive digest differs")
    selected = {row["path"]: row for row in elf.read_json(package / "selected-members.json")}
    libraries = {row["path"]: row for row in elf.read_json(package / "objects.json")}
    seen = set()
    with tarfile.open(archive_path, "r|bz2") as archive:
        for member in archive:
            name = member.name.removeprefix("./")
            if name not in selected:
                continue
            elf.require(member.isfile() and name not in seen, "bad/duplicate selected member")
            elf.require(member.size == selected[name]["bytes"], "selected member size differs")
            raw = archive.extractfile(member).read()
            identity(raw, selected[name], name)
            if name in libraries:
                check_rlib(raw, libraries[name], objects)
            else:
                elf.require(name == "version.md" and raw == (package / name).read_bytes(),
                            "version receipt differs")
            seen.add(name)
    elf.require(seen == selected.keys(), "missing selected release members")
    return dict(publisher_digest_checked=True, archive_sha256=sha,
                selected_members=len(seen), rlibs=len(libraries),
                all_elf_member_associations_checked=True)


def calculate(package, repo):
    objects = load_objects(package)
    inputs = repository_inputs(package, repo)
    return analyze.compare(objects, inputs[CAPTURE], inputs[BUILD + "build-01/unstripped.so"],
                           inputs[BUILD + "build-01/candidate.so"],
                           json.loads(inputs[BUILD + "helper-results.json"]))


def verify(package=HERE, repo=None, archive=None):
    repo = HERE.parents[1] if repo is None else repo
    manifest(package)
    result = calculate(package, repo)
    expected = elf.read_json(package / "findings.json")
    expected["scan"] = json.loads(gzip.decompress((package / "scan.json.gz").read_bytes()))
    elf.require(result == expected, "findings differ")
    archive_result = (check_archive(package, archive, load_objects(package)) if archive else
                      dict(publisher_digest_checked=False,
                           all_elf_member_associations_checked=False,
                           reason="Full release archive omitted; pass --archive to recheck association."))
    return dict(summary=result["summary"], release_archive_verification=archive_result)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--repo", type=Path, default=HERE.parents[1])
    parser.add_argument("--archive", type=Path)
    args = parser.parse_args()
    print(json.dumps(verify(repo=args.repo, archive=args.archive), indent=2))


if __name__ == "__main__":
    main()
