"""No-return classification and corruption controls; execute no target program."""
from pathlib import Path
import gzip
import hashlib
import importlib.util
import json
import shutil
import struct
import subprocess
import sys
import tempfile

P = Path(__file__).resolve().parent
ROOT = P.parents[1]


def module(name, path):
    spec = importlib.util.spec_from_file_location(name, path)
    value = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(value)
    return value


def seal(packet):
    files = {p.relative_to(packet).as_posix(): hashlib.sha256(p.read_bytes()).hexdigest()
             for p in packet.rglob("*") if p.is_file() and p.relative_to(packet).as_posix() != "manifest.json"}
    (packet / "manifest.json").write_text(json.dumps(files, indent=2, sort_keys=True) + "\n")


def edit_json(packet, path, change):
    file = packet / path
    compressed = file.suffix == ".gz"
    value = json.loads(gzip.decompress(file.read_bytes()) if compressed else file.read_bytes())
    change(value)
    data = (json.dumps(value, indent=2) + "\n").encode()
    file.write_bytes(gzip.compress(data, mtime=0) if compressed else data)


cfg = module("cfg_policy_test", P / "cfg.py")


class Elf:
    def __init__(self, symbol):
        self.b = struct.pack("<BBhi", 0x85, 0x10, 0, -1) + struct.pack("<BBhi", 0x95, 0, 0, 0)
        self.rel = {0: {"type": 10, "symbol": symbol}}


_, returning = cfg.cfg(Elf("___rust_no_alloc_shim_is_unstable_v2"), 0, 16)
assert len(returning) == 1 and len(returning[0]["ins"]) == 2
_, aborting = cfg.cfg(Elf("abort"), 0, 16)
assert len(aborting) == 2 and aborting[0]["succ"] == []
print("relocation-aware no-return classification passed", flush=True)


def corrupt_binary(packet):
    path = packet / "controls/conditional-event/candidate.so.gz"
    data = bytearray(gzip.decompress(path.read_bytes()))
    data[5000] ^= 1
    path.write_bytes(gzip.compress(data, mtime=0))
    edit_json(packet, "controls/conditional-event/result.json",
              lambda x: x.update(candidate_sha256=hashlib.sha256(data).hexdigest()))


def corrupt_program_digest(packet):
    def change(value):
        value["cases"][0]["candidate"]["before"]["MAyhSmzXzV1pTf7LsNkrNwkWKTo4ougAJ1PPg47MD4e"]["data_sha256"] = "0" * 64
    edit_json(packet, "runtime/conditional-event/native.json.gz", change)


checks = [
    ("source", lambda p: (p / "controls/conditional-event/overrides/src/instructions/sell_pump_swap.rs").write_text("invalid source\n"), True),
    ("allocated-image mutation", corrupt_binary, True),
    ("false full-handler gain", lambda p: edit_json(p, "report.json", lambda x: x.update(accepted_complete_handler_gains=1)), True),
    ("saved CFG mutation", lambda p: edit_json(p, "analysis/direct-signer-cfg.json.gz", lambda x: x["block_mapping"].pop("0")), True),
    ("runtime program digest", corrupt_program_digest, True),
    ("runtime cohort", lambda p: edit_json(p, "runtime/conditional-event/native.json.gz", lambda x: x["cases"].pop()), True),
    ("extra file", lambda p: (p / "unexpected").write_text("unexpected"), False),
    ("symlink", lambda p: (p / "link").symlink_to(p / "README.md"), False),
]
with tempfile.TemporaryDirectory(prefix="amm-cfg-tests-") as directory:
    target = Path(directory) / "packet"
    for name, change, reseal in checks:
        shutil.copytree(P, target)
        change(target)
        if reseal:
            seal(target)
        result = subprocess.run([sys.executable, "-B", str(P / "verify.py"), "--packet", str(target),
                                 "--root", str(ROOT)], capture_output=True, text=True)
        assert result.returncode != 0, (name, "incorrectly accepted")
        print(name, "rejected", flush=True)
        shutil.rmtree(target)
    result = subprocess.run([sys.executable, "-O", "-B", str(P / "verify.py")], capture_output=True, text=True)
    assert result.returncode != 0 and "verification requires assertions" in result.stderr
    print("optimized Python rejected", flush=True)
