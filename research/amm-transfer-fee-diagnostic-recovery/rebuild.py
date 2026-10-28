"""Run the retained, offline Linux v1.44 PumpSwap build recipe."""
from pathlib import Path
import argparse
import hashlib
import json
import subprocess

HERE = Path(__file__).resolve().parent
IMAGE = "buildpack-deps@sha256:ccb050a415a94a3a78acbe35084ec8f06ae46fa158e3650c96f9b4fb514de6d3"
EXPECTED = {
    "symbols_sha256": "c8f754063a2aa1d0b8d6f228c46401ba85571546f0234dc81c9eb8927eb12376",
    "candidate_sha256": "d17a657baf5cc19736a924c41e75424604411ddbe9f6e72cddf41ab72a695007",
}


def sha(path):
    return hashlib.sha256(Path(path).read_bytes()).hexdigest()


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    for name in ("source", "sdk", "cargo-home", "target-dir", "output"):
        parser.add_argument("--" + name, type=Path, required=True)
    args = parser.parse_args()
    args.output.mkdir(parents=True, exist_ok=False)
    command = [
        "docker", "run", "--rm", "--platform", "linux/amd64", "--network", "none",
        "-v", f"{args.source.resolve()}:/source:ro",
        "-v", f"{args.sdk.resolve()}:/sdk:ro",
        "-v", f"{args.cargo_home.resolve()}:/cargo:rw",
        "-v", f"{args.target_dir.resolve()}:/target:rw",
        "-w", "/source",
        "-e", "CARGO_HOME=/cargo",
        "-e", "CARGO_TARGET_DIR=/target",
        "-e", "RUSTFLAGS=--remap-path-prefix=/source=/workspace",
        "-e", "PATH=/sdk/rust/bin:/sdk/llvm/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin",
        IMAGE, "/sdk/rust/bin/cargo", "build", "--release", "--target", "sbpf-solana-solana",
        "--locked", "--offline", "-p", "pump-amm-recovered", "-vv",
    ]
    (args.output / "command.json").write_text(json.dumps(command, indent=2) + "\n")
    with (args.output / "build.log").open("wb") as log:
        subprocess.run(command, stdout=log, stderr=subprocess.STDOUT, check=True)
    symbols = args.output / "symbols.so"
    symbols.write_bytes((args.target_dir / "sbpf-solana-solana/release/pump_amm_recovered.so").read_bytes())
    strip = [
        "docker", "run", "--rm", "--platform", "linux/amd64", "--network", "none",
        "-v", f"{args.sdk.resolve()}:/sdk:ro", "-v", f"{args.output.resolve()}:/out:rw",
        IMAGE, "/sdk/llvm/bin/llvm-objcopy", "--strip-all", "/out/symbols.so", "/out/candidate.so",
    ]
    subprocess.run(strip, check=True)
    result = {"symbols_sha256": sha(symbols), "candidate_sha256": sha(args.output / "candidate.so")}
    assert result == EXPECTED, result
    (args.output / "hashes.json").write_text(json.dumps(result, indent=2) + "\n")
    print(json.dumps(result))


if __name__ == "__main__":
    main()
