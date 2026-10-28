#!/usr/bin/env python3
"""Apply this one-expression patch to the exact PR561 materializer output.

Pure Python source processing only: no compiler, Git, network, ELF, or runtime.
This is deliberately a fixed-packet applicator, not a general patch utility.
"""
from pathlib import Path, PurePosixPath
import argparse
import hashlib
import json
import os
import re
import stat

PACKET = Path(__file__).absolute().parent
PINS_SHA256 = "7c999de0c2bb9fffd9f0edea9c49a12b91cd6dbb3e41f13ac8ef771b43f56db5"
CHANGED = ('programs/pump/src/create_v2.rs',)
HUNK = re.compile(r"@@ -(\d+)(?:,(\d+))? \+(\d+)(?:,(\d+))? @@[^\n]*\n")


def require(condition, message):
    if not condition:
        raise ValueError(message)


def digest(raw):
    return hashlib.sha256(raw).hexdigest()


def relative_name(name):
    path = PurePosixPath(name)
    require(isinstance(name, str) and name == str(path), "noncanonical path")
    require(not path.is_absolute() and all(p not in ("", ".", "..") for p in path.parts), "unsafe path")
    require(bool(path.parts) and "\\" not in name, "unsafe path")
    return name


def no_symlink_ancestors(path):
    for item in (path, *path.parents):
        require(not item.is_symlink(), f"symlink: {item}")


def regular_bytes(path):
    no_symlink_ancestors(path)
    require(stat.S_ISREG(path.stat().st_mode), f"not a regular file: {path}")
    raw = path.read_bytes()
    raw.decode("utf-8")
    return raw


def load_packet(packet=PACKET):
    packet = Path(os.path.abspath(packet))
    raw = regular_bytes(packet / "pins.json")
    require(digest(raw) == PINS_SHA256, "pins digest mismatch")
    pins = json.loads(raw)
    require(pins["schema"] == 1 and tuple(pins["changed_paths"]) == CHANGED, "packet schema/scope")
    parent = pins["parent"]["files"]
    require(len(parent) == 65 and parent.keys() == pins["output_sha256"].keys(), "file inventory")
    for name in parent:
        relative_name(name)
    changed = tuple(sorted(n for n in parent if parent[n]["sha256"] != pins["output_sha256"][n]))
    require(changed == CHANGED, "unexpected output changes")
    patch = regular_bytes(packet / "source.patch")
    require(digest(patch) == pins["patch_sha256"], "patch digest mismatch")
    return pins, patch


def snapshot(root):
    root = Path(os.path.abspath(root))
    no_symlink_ancestors(root)
    require(root.is_dir(), "parent must be a directory")
    files, directories, metadata = {}, set(), {}
    for parent, dirs, names in os.walk(root, followlinks=False):
        for name in dirs:
            path = Path(parent) / name
            require(not path.is_symlink(), f"source directory symlink: {path}")
            directories.add(path.relative_to(root).as_posix())
        for name in names:
            path = Path(parent) / name
            key = relative_name(path.relative_to(root).as_posix())
            files[key] = regular_bytes(path)
            info = path.stat()
            metadata[key] = (info.st_mode, info.st_ino, info.st_size, info.st_mtime_ns)
    return files, directories, metadata


def authenticate_parent(root, pins):
    state = snapshot(root)
    files, directories, _ = state
    expected = pins["parent"]["files"]
    require(files.keys() == expected.keys(), "parent file inventory mismatch")
    wanted_dirs = {str(p) for n in expected for p in PurePosixPath(n).parents if str(p) != "."}
    require(directories == wanted_dirs, "parent directory inventory mismatch")
    for name, raw in files.items():
        require(digest(raw) == expected[name]["sha256"], f"parent SHA256 mismatch: {name}")
        blob = hashlib.sha1(b"blob " + str(len(raw)).encode() + b"\0" + raw).hexdigest()
        require(blob == expected[name]["git_blob"], f"parent Git blob mismatch: {name}")
    return state


def apply_fixed_patch(files, patch):
    """Strict context/count/offset application; no fuzzy matching or path discovery."""
    lines = patch.decode("utf-8").splitlines(keepends=True)
    require(lines and all(line.endswith("\n") for line in lines), "patch newline format")
    result, seen, i = dict(files), [], 0
    while i < len(lines):
        require(lines[i].startswith("--- a/"), "expected old-file header")
        name = relative_name(lines[i][6:-1])
        require(name in CHANGED and name not in seen, "unexpected or duplicate patch file")
        require(i + 1 < len(lines) and lines[i + 1] == "+++ b/" + name + "\n", "new-file header mismatch")
        original = files[name].decode("utf-8").splitlines(keepends=True)
        output, cursor, hunks = [], 0, 0
        i += 2
        while i < len(lines) and lines[i].startswith("@@ "):
            match = HUNK.fullmatch(lines[i])
            require(match is not None, "bad hunk header")
            old_start, old_count, new_start, new_count = (int(x) if x is not None else 1 for x in match.groups())
            require(old_start > 0 and new_start > 0 and old_count > 0 and new_count > 0, "unsupported empty hunk")
            position = old_start - 1
            require(cursor <= position <= len(original), "overlapping or outside hunk")
            output.extend(original[cursor:position])
            cursor = position
            require(len(output) == new_start - 1, "new hunk offset mismatch")
            consumed = produced = 0
            i += 1
            while i < len(lines) and not lines[i].startswith(("@@ ", "--- a/")):
                line = lines[i]
                require(line[0] in " +-", "unsupported patch record")
                if line[0] in " -":
                    require(cursor < len(original) and original[cursor] == line[1:], "patch context mismatch")
                    cursor += 1
                    consumed += 1
                if line[0] in " +":
                    output.append(line[1:])
                    produced += 1
                i += 1
            require((consumed, produced) == (old_count, new_count), "hunk line-count mismatch")
            hunks += 1
        require(hunks > 0, "patch file has no hunks")
        output.extend(original[cursor:])
        result[name] = "".join(output).encode("utf-8")
        seen.append(name)
    require(tuple(seen) == CHANGED, "patch file scope/order mismatch")
    return result


def materialize(parent, output, packet=PACKET):
    pins, patch = load_packet(packet)
    parent, output = Path(os.path.abspath(parent)), Path(os.path.abspath(output))
    no_symlink_ancestors(output)
    require(not output.exists(), "output already exists")
    require(output.parent.is_dir(), "output parent must already exist")
    require(not output.is_relative_to(parent), "output cannot be inside parent")
    before = authenticate_parent(parent, pins)
    files = apply_fixed_patch(before[0], patch)
    require({n: digest(raw) for n, raw in files.items()} == pins["output_sha256"], "output digest mismatch")
    # Validate everything before creating an output. Only fixed, authenticated
    # source paths are written; an existing tree is never modified or replaced.
    output.mkdir(exist_ok=False)
    for name, raw in files.items():
        path = output / name
        path.parent.mkdir(parents=True, exist_ok=True)
        no_symlink_ancestors(path)
        with path.open("xb") as stream:
            stream.write(raw)
    require(snapshot(parent) == before, "parent changed during materialization")
    written = snapshot(output)[0]
    require(written == files, "written source verification failed")
    return {"source_files": len(files), "changed_paths": list(CHANGED), "parent_unchanged": True}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--parent", type=Path, required=True, help="Exact 65-file PR561 materializer output, not archived L36 or a prepared workspace")
    parser.add_argument("--output", type=Path, required=True, help="Fresh output directory with an existing parent")
    args = parser.parse_args()
    print(json.dumps(materialize(args.parent, args.output), indent=2))


if __name__ == "__main__":
    main()
