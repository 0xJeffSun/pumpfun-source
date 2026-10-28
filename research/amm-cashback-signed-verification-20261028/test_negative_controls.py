#!/usr/bin/env python3
"""Mutation tests for the cashback witness and packet verifier."""

import copy
import json
import shutil
import sys
import tempfile
from pathlib import Path

sys.dont_write_bytecode = True

from verify import read_receipt, verify_data, verify_manifest


HERE = Path(__file__).resolve().parent


def require(condition, message):
    if not condition:
        raise RuntimeError(message)


def rejected(data, label):
    try:
        verify_data(data)
    except ValueError:
        return
    raise RuntimeError(f"negative control accepted: {label}")


def main():
    base = read_receipt()
    verify_data(base)
    mutations = []

    def mutate(label, callback):
        value = copy.deepcopy(base)
        callback(value)
        mutations.append((label, value))

    mutate("original executable hash", lambda d: d.__setitem__("original_sha256", "0" * 64))
    mutate("candidate executable hash", lambda d: d.__setitem__("candidate_sha256", "0" * 64))
    mutate("producer hash", lambda d: d.__setitem__("script_sha256", "0" * 64))
    mutate("harness hash", lambda d: d.__setitem__("harness_sha256", "0" * 64))
    mutate("dependency hash", lambda d: d["dependencies"].__setitem__("spl_token", "0" * 64))
    mutate("saved mismatch", lambda d: d.__setitem__("mismatches", [0]))
    mutate("transaction", lambda d: d["cases"][0]["candidate"].__setitem__("tx", "AA=="))
    mutate("signature flag", lambda d: d["cases"][0]["candidate"].__setitem__("signature_verified", False))
    mutate("loaded program", lambda d: d["cases"][0]["candidate"].__setitem__("program_sha256", "0" * 64))
    mutate("ordered logs", lambda d: d["cases"][0]["candidate"]["logs"].append("tampered"))
    mutate("error", lambda d: d["cases"][0]["candidate"].__setitem__("error", "tampered"))
    mutate("state", lambda d: d["cases"][0]["candidate"].__setitem__("after", {}))
    mutate("CPI", lambda d: d["cases"][0]["candidate"].__setitem__("inner", []))
    mutate("event", lambda d: d["cases"][0]["candidate"]["events"].append("tampered"))
    mutate("return data", lambda d: d["cases"][0]["candidate"].__setitem__("return_data", None))
    mutate("case identity", lambda d: d["cases"][0]["candidate"].__setitem__("case", {"tampered": True}))
    mutate("duplicate case", lambda d: d["cases"][1].__setitem__("case", d["cases"][0]["case"]))
    mutate("unexpected receipt field", lambda d: d.__setitem__("unexpected", True))

    for label, data in mutations:
        rejected(data, label)

    packet_controls = 0
    with tempfile.TemporaryDirectory() as temporary:
        copied = Path(temporary) / "packet"
        shutil.copytree(HERE, copied)
        (copied / "README.md").write_text("tampered\n", encoding="utf-8")
        try:
            verify_manifest(copied)
        except ValueError:
            packet_controls += 1
        else:
            raise RuntimeError("negative control accepted: modified packet file")
    with tempfile.TemporaryDirectory() as temporary:
        copied = Path(temporary) / "packet"
        shutil.copytree(HERE, copied)
        (copied / "unexpected.txt").write_text("unexpected\n", encoding="utf-8")
        try:
            verify_manifest(copied)
        except ValueError:
            packet_controls += 1
        else:
            raise RuntimeError("negative control accepted: unexpected packet file")
    with tempfile.TemporaryDirectory() as temporary:
        copied = Path(temporary) / "packet"
        shutil.copytree(HERE, copied)
        (copied / "substitution").symlink_to(copied / "README.md")
        try:
            verify_manifest(copied)
        except ValueError:
            packet_controls += 1
        else:
            raise RuntimeError("negative control accepted: symlink substitution")

    require(packet_controls == 3, "packet control count")
    print(json.dumps({
        "evidence_mutations_rejected": len(mutations),
        "packet_mutations_rejected": packet_controls,
        "total_negative_controls": len(mutations) + packet_controls,
    }, sort_keys=True))


if __name__ == "__main__":
    main()
