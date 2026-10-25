#!/usr/bin/env python3
"""One fixed Fees source build; proposed helper, never dispatches a workflow.

This revision has static checks and focused file-retention tests; no build ran.
Compilation uses
only exported source, public locked crates and official tools. Captured bytes are
opened in compare_after_build(), after the single successful compiler invocation.
"""
import argparse
import datetime as dt
import hashlib
import json
import os
import platform
from pathlib import Path
import shutil
import subprocess
import sys
import tarfile
import time
import tomllib
import traceback
import urllib.request

REVISION = "4ffe8bd88761059693e481ae972443c10204f7af"
PLATFORM_URL = "https://github.com/anza-xyz/platform-tools/releases/download/v1.44/platform-tools-linux-x86_64.tar.bz2"
PLATFORM_SHA = "6719b889d60677a8a2fcf4c82f68441a1afe0ab093edd2efe9f84a67a808b3e9"
PLATFORM_SIZE = 490710349
CLI_URL = "https://github.com/anza-xyz/agave/releases/download/v2.1.21/solana-release-x86_64-unknown-linux-gnu.tar.bz2"
CLI_SIZE = 298782636
CLI_SHA = "5da3359e296f1e6c13522b874317cb4cfe33e73301a9dc60b1e1435cc133b397"
CLI_ASSET_ID = 247593735
CLI_COMMIT = "8a085eebcb901b6846d1f82f4636667742146545"
RUSTUP_URL = "https://static.rust-lang.org/rustup/archive/1.29.0/x86_64-unknown-linux-gnu/rustup-init"
RUSTUP_SHA = "4acc9acc76d5079515b46346a485974457b5a79893cfb01112423c89aeb5aa10"
HOST_CHANNEL_URL = "https://static.rust-lang.org/dist/channel-rust-1.94.0.toml"
HOST_CHANNEL_SHA = "aaa177def36e01d539bee6bde95295230b9ce378f81057845db8d0ebe97898ee"
ORIGINAL_PATH = "evidence/original/pump_fees/deployed.so"
ORIGINAL_SHA = "4f2955d0f6b40cc9ff7daa18ccad7d19119ba1249759f4e7e3bb691beee6b35e"
DARWIN_SHA = "a9c4ea9e47356a91bf9bd97318746a7c207b873e32485d7786853f048d7d4afa"
SYSTEM_PATH = "/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"


def digest(path):
    h = hashlib.sha256()
    with Path(path).open("rb") as f:
        for block in iter(lambda: f.read(1024 * 1024), b""):
            h.update(block)
    return h.hexdigest()


def write_json(path, value):
    Path(path).parent.mkdir(parents=True, exist_ok=True)
    Path(path).write_text(json.dumps(value, indent=2, sort_keys=True) + "\n")


def generated_keypair_path(relative_path):
    """Classify by path spelling only; never open/stat the excluded entry."""
    return any(part.endswith("-keypair.json") for part in Path(relative_path).parts)


def tree_hashes(root, *, exclude=None, excluded_paths=None):
    """Exclude before file inspection; prune excluded directories without opening.

    Nonexcluded directory links are not followed. Exclusions retain paths only,
    never sizes, hashes, link targets or file contents.
    """
    root = Path(root)
    rows = {}
    for directory, dirs, files in os.walk(root, followlinks=False):
        directory = Path(directory)
        for name in list(dirs):
            relative = (directory / name).relative_to(root)
            if exclude is not None and exclude(relative):
                dirs.remove(name)
                if excluded_paths is not None:
                    excluded_paths.append(str(relative))
        for name in sorted(dirs + files):
            path = directory / name
            relative = path.relative_to(root)
            rel = str(relative)
            if exclude is not None and exclude(relative):
                if excluded_paths is not None:
                    excluded_paths.append(rel)
                continue
            if path.is_symlink():
                rows[rel] = {"symlink": os.readlink(path)}
            elif path.is_file():
                rows[rel] = {"sha256": digest(path), "bytes": path.stat().st_size}
    return rows


def excluded_keypair_paths(root):
    """Inventory names only; this helper performs no file-content access."""
    root = Path(root)
    excluded = []
    for directory, dirs, files in os.walk(root, followlinks=False):
        for name in list(dirs) + files:
            relative = (Path(directory) / name).relative_to(root)
            if generated_keypair_path(relative):
                excluded.append(str(relative))
                if name in dirs:
                    dirs.remove(name)
    return sorted(excluded)


def source_hashes(source, expected):
    # Check the complete path set before opening any file. In particular, an
    # unexpected build-generated keypair in the source tree is never hashed.
    paths = {str(p.relative_to(source)): p for p in source.rglob("*") if p.is_file() or p.is_symlink()}
    if set(paths) != set(expected) or any(p.is_symlink() for p in paths.values()):
        raise ValueError("Source file paths differ from the frozen 22-file input set")
    return {name: digest(path) for name, path in paths.items()}


def prepare_compile_inputs(source, expected, fetch_target, target, evidence, env):
    """Keep Cargo's fetch metadata separate from the fresh compiler target."""
    before = source_hashes(source, expected)
    write_json(evidence / "source-after-fetch.json", before)
    excluded = []
    write_json(evidence / "fetch-target-files.json", tree_hashes(
        fetch_target, exclude=generated_keypair_path, excluded_paths=excluded))
    write_json(evidence / "fetch-target-excluded-paths.json", excluded)
    if before != expected:
        raise ValueError("Frozen source changed during locked fetch")
    if any(target.iterdir()):
        raise ValueError("The separate compiler target is not empty before build")
    env["CARGO_TARGET_DIR"] = str(target)
    write_json(evidence / "compiler-environment.json", env)
    return before


def retain_generated_outputs(attempt):
    """Run on success/failure; read candidate bytes only, omit deployment keys."""
    if attempt.state["build_attempts"] == 0:
        return
    excluded = set(attempt.state.get("excluded_generated_keypair_paths", []))
    for name, report in [("target", "target-files.json"), ("artifacts", "artifact-files.json")]:
        root = attempt.output / name
        if not root.exists():
            continue
        omitted = []
        rows = tree_hashes(root, exclude=generated_keypair_path, excluded_paths=omitted)
        write_json(attempt.evidence / report, rows)
        excluded.update(str(Path(name) / path) for path in omitted)
    attempt.state["excluded_generated_keypair_paths"] = sorted(excluded)
    attempt.save()
    candidate = attempt.output / "artifacts/pump_fees_candidate.so"
    if candidate.is_symlink():
        raise ValueError("Candidate must be a regular emitted file, not a symlink")
    if candidate.is_file():
        shutil.copy2(candidate, attempt.evidence / "pump_fees_candidate.so")


def seal_evidence(attempt):
    excluded = set(attempt.state.get("excluded_generated_keypair_paths", []))
    excluded.update(str(Path("evidence") / path) for path in excluded_keypair_paths(attempt.evidence))
    attempt.state["excluded_generated_keypair_paths"] = sorted(excluded)
    attempt.save()
    # Never include this manifest in its own digest set when resealing a test.
    rows = tree_hashes(attempt.evidence, exclude=lambda path: generated_keypair_path(path) or str(path) == "artifact-hashes.json")
    write_json(attempt.evidence / "artifact-hashes.json", rows)


class Attempt:
    def __init__(self, output):
        self.output = output
        self.evidence = output / "evidence"
        self.evidence.mkdir(parents=True)
        self.state = {"schema": 1, "source_revision": REVISION,
                      "started_utc": dt.datetime.now(dt.timezone.utc).isoformat(),
                      "status": "preparing", "build_attempts": 0,
                      "commands": [], "downloads": [],
                      "scope": "One source-only Linux x86_64 v1.44 Fees build; no runtime probes, binary edits or adaptive variants."}
        self.save()

    def save(self):
        write_json(self.evidence / "attempt.json", self.state)

    def run(self, name, command, cwd, env, check=True):
        logfile = self.evidence / "logs" / (name + ".log")
        logfile.parent.mkdir(parents=True, exist_ok=True)
        row = {"name": name, "command": [str(x) for x in command],
               "cwd": str(cwd), "started_utc": dt.datetime.now(dt.timezone.utc).isoformat(),
               "log": str(logfile.relative_to(self.evidence)), "returncode": None}
        self.state["commands"].append(row)
        self.save()
        start = time.monotonic()
        with logfile.open("wb") as log:
            result = subprocess.run(command, cwd=cwd, env=env, stdout=log, stderr=subprocess.STDOUT)
        row.update(returncode=result.returncode, seconds=time.monotonic() - start,
                   log_sha256=digest(logfile))
        self.save()
        if check and result.returncode:
            raise RuntimeError(f"{name} failed with {result.returncode}; retain {logfile}")
        return result.returncode

    def download(self, name, url, expected_sha=None, expected_size=None):
        destination = self.evidence / "downloads" / name
        destination.parent.mkdir(parents=True, exist_ok=True)
        partial = destination.with_name(destination.name + ".partial")
        row = {"url": url, "file": str(destination.relative_to(self.evidence)),
               "expected_sha256": expected_sha, "expected_bytes": expected_size,
               "status": "started"}
        self.state["downloads"].append(row)
        self.save()
        request = urllib.request.Request(url, headers={"User-Agent": "pumpfun-source-fixed-build-evidence"})
        with urllib.request.urlopen(request, timeout=120) as response, partial.open("wb") as target:
            row["resolved_url"] = response.geturl().split("?")[0]
            shutil.copyfileobj(response, target, length=1024 * 1024)
        row.update(sha256=digest(partial), bytes=partial.stat().st_size)
        self.save()
        if expected_sha is not None and row["sha256"] != expected_sha:
            raise ValueError(f"Unexpected archive hash: {name}")
        if expected_size is not None and row["bytes"] != expected_size:
            raise ValueError(f"Unexpected archive size: {name}")
        partial.rename(destination)
        row["status"] = ("verified" if expected_sha else "official-url-size-checked-content-hash-recorded"
                         if expected_size is not None else "downloaded-content-hash-recorded")
        self.save()
        return destination


def git_blob(repository, name):
    return subprocess.check_output(["git", "-C", str(repository), "show", REVISION + ":" + name])


def unpack(archive, destination):
    destination.mkdir(parents=True)
    with tarfile.open(archive, "r:*") as tar:
        tar.extractall(destination, filter="data")


def snapshot_source(source, expected, evidence):
    actual = source_hashes(source, expected)
    if actual != expected:
        raise ValueError("The source workspace does not contain exactly the frozen 22 inputs")
    write_json(evidence / "source-before.json", actual)
    with tarfile.open(evidence / "source-snapshot.tar.gz", "w:gz") as tar:
        for name in sorted(expected):
            tar.add(source / name, arcname=name, recursive=False)


def dependency_inventory(cargo_home, source, evidence, suffix):
    lock = tomllib.loads((source / "Cargo.lock").read_text())
    locked = [p for p in lock["package"] if p.get("source")]
    if len(locked) != 252 or any(p["source"] != "registry+https://github.com/rust-lang/crates.io-index" for p in locked):
        raise ValueError("Frozen dependency graph unexpectedly differs from 252 public registry packages")
    inventory = []
    archives_dir = evidence / "crate-archives"
    archives_dir.mkdir(exist_ok=True)
    for package in locked:
        stem = package["name"] + "-" + package["version"]
        archives = list((cargo_home / "registry/cache").glob("*/" + stem + ".crate"))
        sources = list((cargo_home / "registry/src").glob("*/" + stem))
        if len(archives) != 1 or len(sources) != 1:
            raise ValueError(f"Expected exactly one downloaded archive and source tree: {stem}")
        archive, directory = archives[0], sources[0]
        observed = digest(archive)
        if observed != package["checksum"]:
            raise ValueError(f"Lock checksum mismatch: {stem}")
        copied = archives_dir / archive.name
        if not copied.exists():
            shutil.copy2(archive, copied)
        elif digest(copied) != observed:
            raise ValueError(f"Retained archive changed: {stem}")
        files = tree_hashes(directory)
        # Cargo registry caches use .cargo-ok; .cargo-checksum.json is a vendor
        # artifact. Compare the actual unpacked bytes directly with the already
        # lock-checksummed crate archive instead of changing Cargo's source kind.
        archive_files = {}
        with tarfile.open(archive, "r:gz") as crate:
            for member in crate:
                if member.isdir():
                    continue
                name = Path(member.name)
                if not member.isfile() or name.is_absolute() or ".." in name.parts or name.parts[0] != stem:
                    raise ValueError(f"Unexpected crate archive member: {stem}/{member.name}")
                rel = str(Path(*name.parts[1:]))
                if rel in archive_files:
                    raise ValueError(f"Duplicate crate archive member: {stem}/{rel}")
                archive_files[rel] = hashlib.sha256(crate.extractfile(member).read()).hexdigest()
                if digest(directory / rel) != archive_files[rel]:
                    raise ValueError(f"Unpacked source checksum mismatch: {stem}/{rel}")
        if set(files) - set(archive_files) - {".cargo-ok"}:
            raise ValueError(f"Unexpected files in fresh dependency tree: {stem}")
        inventory.append({"name": package["name"], "version": package["version"],
                          "source": package["source"], "lock_checksum": package["checksum"],
                          "archive": str(archive.relative_to(cargo_home)),
                          "archive_sha256": observed, "archive_bytes": archive.stat().st_size,
                          "unpacked_source": str(directory.relative_to(cargo_home)),
                          "archive_file_sha256": archive_files, "files": files})
    write_json(evidence / ("dependencies-" + suffix + ".json"), inventory)
    # Record index/config inputs separately; no credentials are loaded into this fresh Cargo home.
    write_json(evidence / ("registry-index-" + suffix + ".json"), tree_hashes(cargo_home / "registry/index"))
    return inventory


def compare_after_build(repository, candidate, evidence):
    """First and only captured-ELF read; compilation has already returned zero."""
    original = git_blob(repository, ORIGINAL_PATH)
    candidate_bytes = candidate.read_bytes()
    if hashlib.sha256(original).hexdigest() != ORIGINAL_SHA:
        raise ValueError("Unexpected captured original at frozen source revision")
    overlap = min(len(original), len(candidate_bytes))
    first = next((i for i in range(overlap) if original[i] != candidate_bytes[i]), None)
    if first is None and len(original) != len(candidate_bytes):
        first = overlap
    result = {"comparison_phase": "after successful single source compilation",
              "original_path_at_revision": ORIGINAL_PATH, "source_revision": REVISION,
              "original_sha256": ORIGINAL_SHA, "original_bytes": len(original),
              "candidate_sha256": digest(candidate), "candidate_bytes": len(candidate_bytes),
              "full_byte_equality": original == candidate_bytes,
              "first_difference": first,
              "different_positions_in_shared_length": sum(a != b for a, b in zip(original, candidate_bytes)),
              "length_difference": len(candidate_bytes) - len(original),
              "previous_darwin_candidate_sha256": DARWIN_SHA,
              "same_sha256_as_previous_darwin_candidate": digest(candidate) == DARWIN_SHA,
              "normalization_or_patching": False,
              "runtime_validation": "not performed; prior candidate runtime receipts are not transferred by this build"}
    write_json(evidence / "whole-file-comparison.json", result)
    return result


def build(args, attempt):
    output, evidence = attempt.output, attempt.evidence
    repository = args.repository.resolve()
    actual_rev = subprocess.check_output(["git", "-C", str(repository), "rev-parse", "HEAD"], text=True).strip()
    if actual_rev != REVISION:
        raise ValueError("The input checkout must be the exact frozen revision")
    if platform.system() != "Linux" or platform.machine() != "x86_64":
        raise ValueError("This proposal permits one Linux x86_64 environment only")
    pins = json.loads(args.inputs.read_text())
    expected = pins["source_files_sha256"]
    if pins["revision"] != REVISION or len(expected) != 22:
        raise ValueError("Unexpected source pin manifest")
    shutil.copy2(args.inputs, evidence / "source-pins.json")
    shutil.copy2(Path(__file__).resolve(), evidence / "build-helper.py")
    write_json(evidence / "runner.json", {"uname": list(platform.uname()),
              "python": sys.version, "github_run_id": os.environ.get("GITHUB_RUN_ID"),
              "github_run_attempt": os.environ.get("GITHUB_RUN_ATTEMPT"),
              "image_os": os.environ.get("ImageOS"), "image_version": os.environ.get("ImageVersion"),
              "home_unchanged": os.environ["HOME"]})
    if Path("/etc/os-release").exists():
        shutil.copy2("/etc/os-release", evidence / "os-release")
    source = output / "source"
    source.mkdir()
    for name, sha in expected.items():
        p = Path(name)
        if p.is_absolute() or ".." in p.parts or p.suffix in {".so", ".o", ".a"}:
            raise ValueError("Only frozen source/workspace/IDL inputs may enter the compiler workspace")
        content = git_blob(repository, name)
        if hashlib.sha256(content).hexdigest() != sha:
            raise ValueError(f"Frozen source mismatch: {name}")
        destination = source / name
        destination.parent.mkdir(parents=True, exist_ok=True)
        destination.write_bytes(content)
    snapshot_source(source, expected, evidence)
    for parent in [source, *source.parents]:
        for name in [".cargo/config", ".cargo/config.toml", "rust-toolchain", "rust-toolchain.toml"]:
            if (parent / name).exists():
                raise ValueError(f"Unexpected ancestor Cargo/toolchain configuration: {parent/name}")
    # HOME stays unchanged. The CLI hardcodes this lookup; never reuse an existing cache.
    cache = Path(os.environ["HOME"]) / ".cache/solana/v1.44/platform-tools"
    if os.path.lexists(cache):
        raise ValueError("Expected absent v1.44 cache in a fresh hosted runner")
    platform_archive = attempt.download("platform-tools-linux-x86_64.tar.bz2", PLATFORM_URL, PLATFORM_SHA, PLATFORM_SIZE)
    tools_dir = output / "platform-tools"
    unpack(platform_archive, tools_dir)
    for member, sha in pins["platform_selected_sha256"].items():
        if digest(tools_dir / member) != sha:
            raise ValueError(f"Official selected platform member mismatch: {member}")
    write_json(evidence / "platform-files.json", tree_hashes(tools_dir))
    cache.parent.mkdir(parents=True, exist_ok=True)
    cache.symlink_to(tools_dir, target_is_directory=True)
    attempt.state["platform_cache"] = {"link": str(cache), "target": str(tools_dir), "home_environment_changed": False}
    attempt.save()
    cli_metadata = attempt.download("agave-release.json", "https://api.github.com/repos/anza-xyz/agave/releases/tags/v2.1.21")
    release = json.loads(cli_metadata.read_text())
    matches = [x for x in release["assets"] if x["id"] == CLI_ASSET_ID and x["browser_download_url"] == CLI_URL and x["size"] == CLI_SIZE]
    if release["tag_name"] != "v2.1.21" or len(matches) != 1:
        raise ValueError("Official CLI release asset identity changed")
    cli_version = attempt.download("agave-release.yml", "https://github.com/anza-xyz/agave/releases/download/v2.1.21/solana-release-x86_64-unknown-linux-gnu.yml", "aa8f5e66f5c9e79d671b6b3e15c11cec5204ae0055408dd9ed26dba71734580f")
    if CLI_COMMIT not in cli_version.read_text():
        raise ValueError("CLI release revision mismatch")
    cli_archive = attempt.download("solana-release-x86_64-unknown-linux-gnu.tar.bz2", CLI_URL, expected_sha=CLI_SHA, expected_size=CLI_SIZE)
    cli_root = output / "cli"
    unpack(cli_archive, cli_root)
    cli_bin = cli_root / "solana-release/bin"
    cli = cli_bin / "cargo-build-sbf"
    sdk_source = cli_bin / "sdk/sbf"
    if not cli.is_file() or not sdk_source.is_dir():
        raise ValueError("Unexpected official CLI archive layout")
    write_json(evidence / "cli-files.json", tree_hashes(cli_root))
    sdk = output / "sdk"
    shutil.copytree(sdk_source, sdk, ignore=shutil.ignore_patterns("dependencies"))
    sdk_before = tree_hashes(sdk)
    write_json(evidence / "sdk-source-before.json", sdk_before)
    if {k: v.get("sha256") for k, v in sdk_before.items()} != pins["sdk_source_sha256"]:
        raise ValueError("Official Linux CLI SDK source differs from the pinned official archive")
    rustup_init = attempt.download("rustup-init", RUSTUP_URL, RUSTUP_SHA)
    rustup_init.chmod(0o755)
    attempt.download("channel-rust-1.94.0.toml", HOST_CHANNEL_URL, HOST_CHANNEL_SHA)
    cargo_home, rustup_home, target, fetch_target = (output / n for n in ["cargo-home", "rustup-home", "target", "fetch-target"])
    for path in [cargo_home, rustup_home, target, fetch_target, output / "tmp", output / "artifacts"]:
        path.mkdir()
    env = {"HOME": os.environ["HOME"], "PATH": SYSTEM_PATH,
           "LANG": "C.UTF-8", "LC_ALL": "C.UTF-8", "TMPDIR": str(output / "tmp"),
           "CARGO_HOME": str(cargo_home), "RUSTUP_HOME": str(rustup_home),
           "CARGO_TARGET_DIR": str(fetch_target)}
    attempt.run("rustup-host-install", [str(rustup_init), "-y", "--no-modify-path", "--profile", "minimal", "--default-toolchain", "1.94.0"], source, env)
    env["PATH"] = str(cargo_home / "bin") + ":" + str(cli_bin) + ":" + SYSTEM_PATH
    write_json(evidence / "preparation-environment.json", env)
    for name, command in [("rustup-version", ["rustup", "--version"]),
                          ("host-cargo-version", ["cargo", "--version"]),
                          ("host-rustc-version", ["rustc", "--version", "--verbose"]),
                          ("cli-version", [str(cli), "--version"]),
                          ("sbf-rustc-version", [str(tools_dir / "rust/bin/rustc"), "--version", "--verbose"]),
                          ("sbf-cargo-version", [str(tools_dir / "rust/bin/cargo"), "--version"]),
                          ("system-cc-version", ["cc", "--version"]),
                          ("system-ld-version", ["ld", "--version"]),
                          ("system-libc-version", ["ldd", "--version"]),
                          ("system-packages", ["dpkg-query", "-W"])]:
        attempt.run(name, command, source, env)
    if "cargo 1.94.0 " not in (evidence / "logs/host-cargo-version.log").read_text():
        raise ValueError("Host Cargo is not frozen 1.94.0")
    if "rustup 1.29.0 " not in (evidence / "logs/rustup-version.log").read_text():
        raise ValueError("Host rustup is not frozen 1.29.0")
    if "solana-cargo-build-sbf 2.1.21" not in (evidence / "logs/cli-version.log").read_text():
        raise ValueError("CLI is not 2.1.21")
    write_json(evidence / "host-toolchain-files.json", tree_hashes(rustup_home))
    write_json(evidence / "cargo-launchers.json", tree_hashes(cargo_home / "bin"))
    manifest = source / "programs/pump-fees/Cargo.toml"
    # Fetch does not compile. Resolve the unchanged lock with the same host Cargo used
    # by cargo-build-sbf's metadata stage; the target build later selects +solana.
    attempt.run("public-locked-fetch", ["cargo", "fetch", "--manifest-path", str(manifest), "--locked"], source, env)
    before_deps = dependency_inventory(cargo_home, source, evidence, "before")
    before_source = prepare_compile_inputs(source, expected, fetch_target, target, evidence, env)
    attempt.state.update(status="building", build_attempts=1,
                         source_before_sha256=before_source,
                         target_empty_before_build=True,
                         cli_default_note="Unchanged CLI 2.1.21 internally uses -Zremap-cwd-prefix=. No additional remapping or flags are passed.")
    attempt.save()
    command = ["cargo", "build-sbf", "--manifest-path", str(manifest), "--tools-version", "v1.44", "--offline",
               "--sbf-sdk", str(sdk), "--sbf-out-dir", str(output / "artifacts"), "--", "--locked", "--offline"]
    code = attempt.run("build", command, source, env, check=False)
    after_source = source_hashes(source, expected)
    write_json(evidence / "source-after.json", after_source)
    candidate = output / "artifacts/pump_fees_candidate.so"
    if candidate.is_symlink():
        raise ValueError("Candidate must be a regular emitted file, not a symlink")
    if after_source != expected:
        raise ValueError("Compiler changed a frozen source input")
    after_deps = dependency_inventory(cargo_home, source, evidence, "after")
    if after_deps != before_deps:
        raise ValueError("Dependency source/archive bytes changed during build")
    if tree_hashes(tools_dir) != json.loads((evidence / "platform-files.json").read_text()):
        raise ValueError("Platform tool distribution changed during build")
    sdk_after = tree_hashes(sdk)
    write_json(evidence / "sdk-source-after.json", sdk_after)
    if {k: v for k, v in sdk_after.items() if not k.startswith("dependencies/")} != sdk_before:
        raise ValueError("SDK source changed during build")
    if code:
        raise RuntimeError(f"Single compiler attempt failed ({code}); no fallback/variant/retry is authorized")
    if not candidate.is_file():
        raise ValueError("Compiler returned zero without expected candidate")
    write_json(evidence / "rustup-after-build.json", tree_hashes(rustup_home))
    if (sdk / "dependencies/platform-tools").resolve() != tools_dir:
        raise ValueError("SDK did not use the verified official platform distribution")
    attempt.state.update(status="comparing", compiler_success=True)
    attempt.save()
    result = compare_after_build(repository, candidate, evidence)
    attempt.state.update(status="completed", comparison=result,
                         historical_toolchain_proven=False, runtime_tests_performed=0)
    attempt.save()
    print(json.dumps({"compiler_success": True, **result}, indent=2))


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--repository", type=Path, required=True)
    parser.add_argument("--inputs", type=Path, required=True)
    parser.add_argument("--output", type=Path, required=True)
    args = parser.parse_args()
    output = args.output.resolve()
    if output.exists():
        raise SystemExit("Use a new output directory; prior attempts may not be overwritten")
    output.mkdir(parents=True)
    attempt = Attempt(output)
    failed = False
    try:
        build(args, attempt)
    except BaseException as error:
        failed = True
        attempt.state.update(status="failed", error_type=type(error).__name__, error=str(error))
        (attempt.evidence / "exception.txt").write_text(traceback.format_exc())
        attempt.save()
        print(str(error), file=sys.stderr)
    finally:
        try:
            retain_generated_outputs(attempt)
        except BaseException as error:
            failed = True
            attempt.state.update(status="failed", retention_error_type=type(error).__name__, retention_error=str(error))
            (attempt.evidence / "retention-exception.txt").write_text(traceback.format_exc())
        attempt.state["finished_utc"] = dt.datetime.now(dt.timezone.utc).isoformat()
        seal_evidence(attempt)
    return 1 if failed else 0


if __name__ == "__main__":
    raise SystemExit(main())
