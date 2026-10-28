#!/usr/bin/env python3
"""Positive and mutation controls for verify.py."""

import base64
import gzip
import hashlib
import json
import os
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

P = Path(__file__).resolve().parent
ROOT = P.parents[1]
UNION12 = ROOT / "research/claude-amm-union12-20261028"


def check(condition, message):
    if not condition:
        raise RuntimeError(message)


def write_gzip_json(path, value):
    path.write_bytes(gzip.compress(json.dumps(value, separators=(",", ":")).encode(), mtime=0))


def rewrite_manifest(packet):
    files = {}
    for path in sorted(packet.rglob("*")):
        if path.is_file() and not path.is_symlink() and path.name != "MANIFEST.json":
            files[path.relative_to(packet).as_posix()] = hashlib.sha256(path.read_bytes()).hexdigest()
    (packet / "MANIFEST.json").write_text(json.dumps({"schema": 1, "files": files}, indent=2, sort_keys=True) + "\n")


def run(packet, extra_env=None, signatures=False):
    env = dict(os.environ)
    env["REPOSITORY_ROOT_OVERRIDE"] = str(ROOT)
    if extra_env:
        env.update(extra_env)
    command = [sys.executable, str(packet / "verify.py")]
    if signatures:
        command.append("--signatures")
    return subprocess.run(command, cwd=ROOT, env=env, text=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT)


def negative(name, mutate, refresh=True, extra_env=None):
    with tempfile.TemporaryDirectory(prefix="amm-edge-negative-") as directory:
        packet = Path(directory) / "packet"
        shutil.copytree(P, packet)
        env = mutate(packet, Path(directory)) or {}
        if refresh:
            rewrite_manifest(packet)
        if extra_env:
            env.update(extra_env)
        result = run(packet, env)
        check(result.returncode != 0 and "FAIL:" in result.stdout, name + " was accepted\n" + result.stdout)
    print("OK", name)


def mutate_candidate(packet, directory):
    copied = directory / "union12"
    (copied / "builds/a").mkdir(parents=True)
    (copied / "tools").mkdir()
    for relative in ["builds/a/candidate.so.gz", "builds/a/symbols.so.gz", "builds/a/result.json", "tools/measure.py", "tools/elf_reader.py"]:
        target = copied / relative
        target.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(UNION12 / relative, target)
    path = copied / "builds/a/candidate.so.gz"
    raw = bytearray(path.read_bytes())
    raw[len(raw) // 2] ^= 1
    path.write_bytes(raw)
    return {"AMM_UNION12_PACKET_OVERRIDE": str(copied)}


def mutate_original(packet, directory):
    path = directory / "original.so"
    path.write_bytes((ROOT / "evidence/original/pump_amm/deployed.so").read_bytes() + b"changed")
    return {"AMM_ORIGINAL_OVERRIDE": str(path)}


def mutate_error(packet, directory):
    path = packet / "runtime/incentive1730/report.json.gz"
    data = json.loads(gzip.decompress(path.read_bytes()))
    data["cases"][0]["candidate"]["error"] = "changed-error"
    write_gzip_json(path, data)


def mutate_accumulator(packet, directory):
    path = packet / "runtime/incentive1730/report.json.gz"
    data = json.loads(gzip.decompress(path.read_bytes()))
    accounts = data["cases"][0]["candidate"]["after"]
    account = next(value for value in accounts.values() if value["data"].startswith("ca2af62b8ebe1eff"))
    account["data"] = account["data"][:-2] + ("01" if account["data"][-2:] != "01" else "02")
    write_gzip_json(path, data)


def mutate_day_index(packet, directory):
    path = packet / "runtime/incentive1730/report.json.gz"
    data = json.loads(gzip.decompress(path.read_bytes()))
    data["cases"][0]["input"]["day"] = 29
    write_gzip_json(path, data)


def mutate_logs(packet, directory):
    path = packet / "runtime/incentive1730/report.json.gz"
    data = json.loads(gzip.decompress(path.read_bytes()))
    logs = data["cases"][0]["candidate"]["logs"]
    check(len(logs) >= 2, "mutation fixture lacks logs")
    logs[0], logs[1] = logs[1], logs[0]
    write_gzip_json(path, data)


def mutate_transaction(packet, directory):
    path = packet / "runtime/incentive1730/transactions.json.gz"
    data = json.loads(gzip.decompress(path.read_bytes()))
    raw = bytearray(base64.b64decode(data["transactions"][0]["transaction_base64"], validate=True))
    raw[-1] ^= 1
    data["transactions"][0]["transaction_base64"] = base64.b64encode(raw).decode()
    write_gzip_json(path, data)


def mutate_full_summary(packet, directory):
    path = packet / "runtime/full17462/summary.json"
    data = json.loads(path.read_text())
    data["cases"] -= 1
    path.write_text(json.dumps(data, indent=2) + "\n")


def mutate_window_claim(packet, directory):
    path = packet / "attribution.json"
    data = json.loads(path.read_text())
    data["union12"]["normalized_windows"] = 782
    path.write_text(json.dumps(data, indent=2) + "\n")


def corrupt_manifest(packet, directory):
    data = json.loads((packet / "MANIFEST.json").read_text())
    first = next(iter(data["files"]))
    data["files"][first] = "0" * 64
    (packet / "MANIFEST.json").write_text(json.dumps(data) + "\n")


def add_unexpected(packet, directory):
    (packet / "unexpected.txt").write_text("unexpected\n")


def add_symlink(packet, directory):
    os.symlink("README.md", packet / "unexpected-link")


def main():
    positive = run(P, signatures=True)
    check(positive.returncode == 0 and '"status": "PASS"' in positive.stdout, "positive verification failed\n" + positive.stdout)
    print("OK positive signature verification")
    negative("changed candidate ELF", mutate_candidate)
    negative("changed original ELF", mutate_original)
    negative("altered error outcome", mutate_error)
    negative("tampered accumulator balance", mutate_accumulator)
    negative("changed day index", mutate_day_index)
    negative("reordered logs", mutate_logs)
    negative("modified signed transaction", mutate_transaction)
    negative("false full-corpus total", mutate_full_summary)
    negative("false window claim", mutate_window_claim)
    negative("corrupted manifest", corrupt_manifest, refresh=False)
    negative("unexpected file", add_unexpected, refresh=False)
    negative("unexpected symlink", add_symlink, refresh=False)
    print("13 controls OK")


if __name__ == "__main__":
    main()
