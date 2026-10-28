#!/usr/bin/env python3
"""Verify the integrity of this evidence packet."""
import hashlib, json, os, sys

PACKET_DIR = os.path.dirname(os.path.abspath(__file__))

def sha256_file(path):
    h = hashlib.sha256()
    with open(path, "rb") as f:
        for chunk in iter(lambda: f.read(1 << 16), b""):
            h.update(chunk)
    return h.hexdigest()

def main():
    manifest_path = os.path.join(PACKET_DIR, "manifest.json")
    if not os.path.exists(manifest_path):
        print("FAIL: manifest.json missing")
        return 1

    with open(manifest_path) as f:
        manifest = json.load(f)

    errors = 0
    for rel_path, expected_hash in manifest.items():
        full = os.path.join(PACKET_DIR, rel_path)
        if not os.path.exists(full):
            print(f"FAIL: {rel_path} missing")
            errors += 1
            continue
        actual = sha256_file(full)
        if actual != expected_hash:
            print(f"FAIL: {rel_path} hash mismatch")
            print(f"  expected: {expected_hash}")
            print(f"  actual:   {actual}")
            errors += 1
        else:
            print(f"  OK: {rel_path}")

    # Check summary consistency
    summary_path = os.path.join(PACKET_DIR, "summary.json")
    events_path = os.path.join(PACKET_DIR, "events.json")
    if os.path.exists(summary_path) and os.path.exists(events_path):
        with open(summary_path) as f:
            summary = json.load(f)
        with open(events_path) as f:
            events = json.load(f)
        if summary["total_events"] != len(events):
            print(f"FAIL: summary says {summary['total_events']} events but events.json has {len(events)}")
            errors += 1
        else:
            print(f"  OK: event count consistent ({len(events)})")

    # Check token-index consistency
    token_index_path = os.path.join(PACKET_DIR, "token-index.json")
    if os.path.exists(token_index_path) and os.path.exists(events_path):
        with open(token_index_path) as f:
            token_index = json.load(f)
        with open(events_path) as f:
            events = json.load(f)
        event_mints = set()
        for e in events:
            m = e.get("data", {}).get("mint")
            if m:
                event_mints.add(m)
        index_mints = set(t["mint"] for t in token_index)
        if not index_mints.issubset(event_mints):
            print(f"FAIL: token-index has mints not in events")
            errors += 1
        else:
            print(f"  OK: token-index mints consistent ({len(index_mints)} tokens)")

    if errors:
        print(f"\n{errors} error(s)")
        return 1
    print("\nAll checks passed.")
    return 0

if __name__ == "__main__":
    sys.exit(main())
