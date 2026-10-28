#!/usr/bin/env python3
"""Tamper with retained records in temporary copies and require audit rejection."""
import base64, gzip, hashlib, json, shutil, subprocess, sys, tempfile
from pathlib import Path

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[1]
AMM = "pAMMBay6oceH9fJKBRHGP5D4bD4sWpmSwMn52FMfXEA"
sha = lambda data: hashlib.sha256(data).hexdigest()
canonical = lambda value: json.dumps(value, sort_keys=True, separators=(",", ":")).encode()


def read_witness(packet, suite="admin"):
    path = packet / "evidence/witnesses" / (suite + ".json.gz")
    return path, json.loads(gzip.decompress(path.read_bytes()))


def seal(packet, relative):
    manifest = json.loads((packet / "MANIFEST.json").read_text())
    manifest["files"][relative] = sha((packet / relative).read_bytes())
    (packet / "MANIFEST.json").write_text(json.dumps(manifest, indent=2) + "\n")


def write_witness(packet, path, document):
    with path.open("wb") as raw:
        with gzip.GzipFile(filename="", mode="wb", fileobj=raw, mtime=0, compresslevel=9) as compressed:
            compressed.write(canonical(document) + b"\n")
    seal(packet, path.relative_to(packet).as_posix())


def outcome_digest(execution):
    value = {key: execution[key] for key in ["error", "poststate_digest", "changed_nonexecutable_accounts",
             "events", "inner_instructions", "return_data", "logs_sha256"]}
    execution["outcome_sha256"] = sha(canonical(value))


def state_digest(snapshot):
    rows = [row for row in snapshot if row["account"] is None or not row["account"]["executable"]]
    return sha(canonical(rows))


def reject(label, mutate):
    with tempfile.TemporaryDirectory(prefix="amm-h11-negative-") as temporary:
        packet = Path(temporary) / "packet"; shutil.copytree(HERE, packet)
        mutate(packet)
        result = subprocess.run([sys.executable, "-I", "-B", str(packet / "audit.py"), "--root", str(ROOT)],
                                stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True)
        assert result.returncode != 0, "accepted " + label
        print("PASS rejected", label)


def invalid_signature(packet):
    path, doc = read_witness(packet); execution = doc["cases"][0]["executions"][0]
    raw = bytearray(base64.b64decode(execution["transaction_base64"])); raw[1] ^= 1
    execution["transaction_base64"] = base64.b64encode(raw).decode(); execution["transaction_sha256"] = sha(raw)
    write_witness(packet, path, doc)


def wrong_case_transaction(packet):
    path, doc = read_witness(packet); a = doc["cases"][0]["executions"][0]; b = doc["cases"][1]["executions"][0]
    for key in ["transaction_base64", "transaction_sha256", "message_sha256", "signature_count"]:
        a[key], b[key] = b[key], a[key]
    write_witness(packet, path, doc)


def swapped_sides(packet):
    path, doc = read_witness(packet); doc["cases"][0]["executions"].reverse(); write_witness(packet, path, doc)


def forged_executable(packet):
    path, doc = read_witness(packet); execution = doc["cases"][0]["executions"][1]
    execution["amm_program_sha256"] = "0" * 64; execution["loaded_programs"][AMM]["sha256"] = "0" * 64
    write_witness(packet, path, doc)


def wrong_prestate(packet):
    path, doc = read_witness(packet); execution = doc["cases"][0]["executions"][0]
    row = next(row for row in execution["prestate"] if row["account"] and not row["account"]["executable"])
    row["account"]["lamports"] += 1; execution["prestate_digest"] = state_digest(execution["prestate"])
    write_witness(packet, path, doc)


def mutated_poststate(packet):
    path, doc = read_witness(packet); execution = doc["cases"][0]["executions"][1]
    row = next(row for row in execution["poststate"] if row["account"] and not row["account"]["executable"])
    row["account"]["lamports"] += 1; execution["poststate_digest"] = state_digest(execution["poststate"]); outcome_digest(execution)
    write_witness(packet, path, doc)


def mutated_error(packet):
    path, doc = read_witness(packet); execution = doc["cases"][0]["executions"][1]
    execution["error"] = "mutated-error"; outcome_digest(execution); write_witness(packet, path, doc)


def mutated_event(packet):
    path, doc = read_witness(packet); execution = doc["cases"][0]["executions"][1]
    execution["events"].append("Program data: mutated"); outcome_digest(execution); write_witness(packet, path, doc)


def mutated_cpi(packet):
    path, doc = read_witness(packet, "claim")
    execution = next(case["executions"][1] for case in doc["cases"] if case["executions"][1]["inner_instructions"])
    instruction = execution["inner_instructions"][0][0]["instruction"]
    instruction["programIdIndex"] += 1; outcome_digest(execution); write_witness(packet, path, doc)


def duplicate_occurrence(packet):
    path, doc = read_witness(packet)
    doc["cases"][1]["executions"][0]["occurrence_id"] = doc["cases"][0]["executions"][0]["occurrence_id"]
    write_witness(packet, path, doc)


def omitted_occurrence(packet):
    path, doc = read_witness(packet); doc["cases"][0]["executions"].pop(); write_witness(packet, path, doc)


def extra_file(packet):
    (packet / "unexpected.txt").write_text("not listed\n")


def altered_replay(packet):
    path = packet / "replay.py"; path.write_text(path.read_text() + "\n# altered\n"); seal(packet, "replay.py")


def altered_expected_hash(packet):
    path = packet / "evidence/provenance.json"; doc = json.loads(path.read_text()); doc["replay_sha256"] = "0" * 64
    path.write_text(json.dumps(doc, indent=2) + "\n"); seal(packet, "evidence/provenance.json")


def main():
    for label, mutate in [
        ("invalid signed transaction bytes", invalid_signature),
        ("valid signature attached to wrong case", wrong_case_transaction),
        ("swapped original/candidate outcomes", swapped_sides),
        ("forged executable hash", forged_executable),
        ("wrong fixture prestate", wrong_prestate),
        ("mutated final account state", mutated_poststate),
        ("mutated error code", mutated_error),
        ("mutated event payload", mutated_event),
        ("mutated CPI payload", mutated_cpi),
        ("duplicate occurrence", duplicate_occurrence),
        ("omitted occurrence", omitted_occurrence),
        ("extra unlisted packet file", extra_file),
        ("altered replay script", altered_replay),
        ("altered expected replay hash", altered_expected_hash),
    ]:
        reject(label, mutate)
    print("PASS 14 negative controls")


if __name__ == "__main__":
    main()
