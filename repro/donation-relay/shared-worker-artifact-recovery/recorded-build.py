#!/usr/bin/env python3
"""Run one fresh, offline Linux v1.48 Relay source build in Docker."""
import argparse
import hashlib
import json
from pathlib import Path
import shutil
import subprocess
import time

ROOT = Path(__file__).resolve().parents[1]
SDK = ROOT / "work/relay-worker-toolchain-v148"
CARGO_HOME = ROOT / "work/relay-worker-cargo-home-v148"
BUILD_ROOT = ROOT / "work/relay-worker-artifact-build"
IMAGE = "solanafoundation/solana-verifiable-build@sha256:6c73adc767ee7ff212f2532d4695472b12f3d4ac20aea3db22b89d8c614dac50"
ARCHIVE_SHA256 = "a9d3157f937d5f6faf4321a35a8035e0f827114a663b0150db492e893ec27597"
RUSTC_SHA256 = "89fd4ccdd6e678a24c2cda074b498b46a352fcfce21018119c9526751afc678d"
VARIANTS = {
    "baseline": {
        "source": ROOT / "work/relay-worker-artifact-baseline",
        "source_map": "baseline",
        "candidate": "c6ae09b906b3c6a88042e40b02e0a2f6598268061d7527b667c0e631655a3921",
        "symbols": "786d74595e015abb6a0eee39bc94ad0ce6304e4b066227c5a4f8a8ff8f327e4c",
    },
    "baseline-sparse": {
        "source": ROOT / "work/relay-worker-artifact-baseline",
        "source_map": "baseline",
        "candidate": "c6ae09b906b3c6a88042e40b02e0a2f6598268061d7527b667c0e631655a3921",
        "symbols": "786d74595e015abb6a0eee39bc94ad0ce6304e4b066227c5a4f8a8ff8f327e4c",
    },
    "baseline-v148": {
        "source": ROOT / "work/relay-worker-artifact-baseline",
        "source_map": "baseline",
        "candidate": "c6ae09b906b3c6a88042e40b02e0a2f6598268061d7527b667c0e631655a3921",
        "symbols": "786d74595e015abb6a0eee39bc94ad0ce6304e4b066227c5a4f8a8ff8f327e4c",
    },
    "recovered": {
        "source": ROOT / "work/relay-worker-artifact-validation",
        "source_map": "recovered",
        "candidate": "bdd03c7765c65d5c7ea9f1c16900f766e38c97fcec3071e29678f0ae52772399",
        "symbols": "1ca9e99a37864a75d854d815848c7ce7cae838a719591dfac0286addf2193120",
    },
}
sha = lambda path: hashlib.sha256(path.read_bytes()).hexdigest()


def source_hashes(source):
    return {
        str(path.relative_to(source)): sha(path)
        for path in sorted(source.rglob("*"))
        if path.is_file()
    }


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("variant", choices=VARIANTS)
    args = parser.parse_args()
    variant = VARIANTS[args.variant]
    source = variant["source"]
    output = BUILD_ROOT / args.variant
    assert source.is_dir() and SDK.is_dir() and CARGO_HOME.is_dir()
    assert not output.exists(), output
    output.mkdir(parents=True)
    (output / "home").mkdir()
    expected_sources = json.loads((ROOT / "repro/donation-relay/shared-worker-source-proposal/source-inputs.json").read_text())[variant["source_map"]]
    before = source_hashes(source)
    assert before == expected_sources
    environment = {
        "PATH": "/sdk/rust/bin:/sdk/llvm/bin:/usr/bin:/bin",
        "HOME": "/output/home",
        "CARGO_HOME": "/cargo",
        "CARGO_TARGET_DIR": "/output/target",
        "CARGO_NET_OFFLINE": "true",
        "CARGO_REGISTRIES_CRATES_IO_PROTOCOL": "sparse",
        "CARGO_TERM_COLOR": "never",
        "CARGO_BUILD_JOBS": "3",
        "CARGO_TARGET_SBPF_SOLANA_SOLANA_RUSTFLAGS": "-Zremap-cwd-prefix=",
        "RUSTC": "/sdk/rust/bin/rustc",
        "RUSTDOC": "/sdk/rust/bin/rustdoc",
        "CC": "/sdk/llvm/bin/clang",
        "AR": "/sdk/llvm/bin/llvm-ar",
        "OBJDUMP": "/sdk/llvm/bin/llvm-objdump",
        "OBJCOPY": "/sdk/llvm/bin/llvm-objcopy",
        "LANG": "C.UTF-8",
        "LC_ALL": "C.UTF-8",
    }
    command = [
        "/sdk/rust/bin/cargo", "rustc", "--release", "--target", "sbpf-solana-solana",
        "--locked", "--offline", "--verbose", "--manifest-path", "/source/Cargo.toml", "--lib",
        "--", "--remap-path-prefix=src/=programs/contracts/src/",
    ]
    docker = [
        "docker", "run", "--rm", "--platform", "linux/amd64", "--network", "none",
        "--mount", f"type=bind,source={source},target=/source,readonly",
        "--mount", f"type=bind,source={output},target=/output",
        "--mount", f"type=bind,source={SDK},target=/sdk,readonly",
        "--mount", f"type=bind,source={CARGO_HOME},target=/cargo",
    ]
    for key, value in environment.items():
        docker.extend(("-e", f"{key}={value}"))
    docker.extend(("-w", "/source", IMAGE, *command))
    launch = {
        "variant": args.variant,
        "runner": docker,
        "container_command": command,
        "environment": environment,
        "source_inputs": before,
        "image": IMAGE,
        "platform": "linux/amd64",
        "network": "none",
        "fresh_target": True,
        "compiler_archive_sha256": ARCHIVE_SHA256,
        "rustc_sha256": sha(SDK / "rust/bin/rustc"),
        "cargo_sha256": sha(SDK / "rust/bin/cargo"),
        "llvm_objcopy_sha256": sha(SDK / "llvm/bin/llvm-objcopy"),
    }
    assert launch["rustc_sha256"] == RUSTC_SHA256
    (output / "launch.json").write_text(json.dumps(launch, indent=2) + "\n")
    started = time.monotonic()
    with (output / "build.log").open("wb") as log:
        completed = subprocess.run(docker, stdout=log, stderr=subprocess.STDOUT)
    result = {
        "exit_code": completed.returncode,
        "elapsed_seconds": time.monotonic() - started,
        "build_log_sha256": sha(output / "build.log"),
        "source_unchanged": source_hashes(source) == before,
        "compiled_root": (output / "build.log").read_bytes().count(b"--crate-name donation_relay_source_proposal ") == 1,
        "binary_patching": False,
        "allocation_padding": False,
    }
    if completed.returncode == 0 and result["compiled_root"]:
        symbols = output / "target/sbpf-solana-solana/release/donation_relay_source_proposal.so"
        shutil.copyfile(symbols, output / "symbols.so")
        strip = [
            "docker", "run", "--rm", "--platform", "linux/amd64", "--network", "none",
            "--mount", f"type=bind,source={output},target=/output",
            "--mount", f"type=bind,source={SDK},target=/sdk,readonly",
            IMAGE, "/sdk/llvm/bin/llvm-objcopy", "--strip-all", "/output/symbols.so", "/output/candidate.so",
        ]
        subprocess.run(strip, check=True)
        result.update(
            strip_command=strip,
            candidate_sha256=sha(output / "candidate.so"),
            candidate_bytes=(output / "candidate.so").stat().st_size,
            symbols_sha256=sha(output / "symbols.so"),
            symbols_bytes=(output / "symbols.so").stat().st_size,
            expected_candidate_sha256=variant["candidate"],
            expected_symbols_sha256=variant["symbols"],
        )
    (output / "result.json").write_text(json.dumps(result, indent=2) + "\n")
    print(json.dumps(result, indent=2))
    assert completed.returncode == 0 and result["source_unchanged"] and result["compiled_root"]
    assert result["candidate_sha256"] == variant["candidate"]
    assert result["symbols_sha256"] == variant["symbols"]


if __name__ == "__main__":
    main()
