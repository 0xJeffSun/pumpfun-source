#!/usr/bin/env python3
"""Regression checks for byte identity, alias accounting, archive membership and boundaries."""
import argparse
import copy
import gzip
import io
import json
from pathlib import Path
import struct
import subprocess
import sys
import tarfile
import tempfile
import unittest
from unittest import mock
sys.path.insert(0, str(Path(__file__).resolve().parent))
import analyze as a
import elf
import verify as v

HERE = Path(__file__).resolve().parent
REPO = HERE.parents[1]


def ar_member(name, raw):
    header = (name.ljust(16) + "0".ljust(12) + "0".ljust(6) + "0".ljust(6) +
              "100644".ljust(8) + str(len(raw)).ljust(10) + "`\n").encode()
    return header + raw + (b"\n" if len(raw) % 2 else b"")


def call(displacement):
    return struct.pack("<BBhi", 0x85, 0x10, 0, displacement)


EXIT = bytes.fromhex("9500000000000000")


class LinkedFixture:
    kind, machine, flags = 3, 263, 0

    def __init__(self, text, rels=(), address=0x1000):
        self.text = text
        reloc_bytes = b"".join(struct.pack("<QQ", pc, kind) for pc, kind in rels)
        self.data = b"\0" * 64 + text + reloc_bytes
        self.sections = [
            dict(type=1, name=".text", addr=address, offset=64, size=len(text)),
            dict(type=9, offset=64 + len(text), size=len(reloc_bytes), entsize=16)]

    def section_named(self, name):
        assert name == ".text"
        return 0, self.sections[0]

    def section_bytes(self, index):
        assert index == 0
        return self.text


class ProvenanceTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.objects = v.load_objects(HERE)
        cls.inputs = v.repository_inputs(HERE, REPO)
        cls.capture = cls.inputs[v.CAPTURE]
        cls.linked = cls.inputs[v.BUILD + "build-01/unstripped.so"]
        cls.stripped = cls.inputs[v.BUILD + "build-01/candidate.so"]
        cls.prior = json.loads(cls.inputs[v.BUILD + "helper-results.json"])
        cls.findings = v.calculate(HERE, REPO)

    def test_full_retained_packet(self):
        result = v.verify(HERE, REPO)
        self.assertEqual(result["summary"], dict(objects=354, selected_symbols=286,
            rejected_symbols=1067, positive_symbols=16, selected_without_raw_hit=270,
            distinct_capture_ranges=10, call_bounded_relocation_free_ranges=10,
            ranges_in_prior_helper_table=8, ranges_absent_from_prior_helper_table=2))
        self.assertFalse(result["release_archive_verification"]["publisher_digest_checked"])

    def test_aliases_are_not_additional_capture_ranges(self):
        groups = self.findings["matches"]
        self.assertEqual(len(groups), 10)
        self.assertEqual(sum(len(g["object_symbols"]) for g in groups), 16)
        f = next(g for g in groups if g["capture"]["file_offset"] == 703112)
        self.assertEqual(len(f["object_symbols"]), 3)
        self.assertEqual(f["bytes"], 512)

    def test_two_conversions_absent_from_bounded_prior_table(self):
        names = {f["symbol"] for g in self.findings["matches"]
                 if not g["prior_helper_records"] for f in g["linked_functions"]}
        self.assertEqual(names, {"__floatundidf", "__fixunsdfdi"})

    def test_negative_scan_is_retained(self):
        rows = self.findings["scan"]
        no_hits = [r for r in rows["selected"] if not r["raw_hits"]]
        self.assertEqual(len(no_hits), 270)
        self.assertEqual({reason for r in rows["rejected"] for reason in r["reasons"]},
                         {"under_64_bytes", "object_relocations", "direct_call_opcode"})

    def test_capture_byte_mutation_removes_match(self):
        changed = bytearray(self.capture)
        changed[678096] ^= 1
        result = a.group_matches(a.scan(self.objects, bytes(changed)))
        self.assertNotIn(678096, [g["capture"]["file_offset"] for g in result])
        self.assertEqual(len(result), 9)

    def test_same_named_linked_body_required(self):
        linked, stripped = bytearray(self.linked), bytearray(self.stripped)
        linked[510352] ^= 1
        stripped[510352] ^= 1
        with self.assertRaisesRegex(ValueError, "same-named linked symbol"):
            a.compare(self.objects, self.capture, bytes(linked), bytes(stripped), self.prior)

    def test_strip_text_mutation_fails(self):
        changed = bytearray(self.stripped)
        changed[510352] ^= 1
        with self.assertRaisesRegex(ValueError, "strip changed"):
            a.compare(self.objects, self.capture, self.linked, bytes(changed), self.prior)

    def test_pinned_capture_mutation_fails(self):
        rows = elf.read_json(HERE / "repository-inputs.json")["files"]
        row = next(r for r in rows if r["path"] == v.CAPTURE)
        with self.assertRaisesRegex(ValueError, "identity differs"):
            v.identity(self.capture[:-1] + bytes([self.capture[-1] ^ 1]), row, v.CAPTURE)

    def test_file_offset_and_virtual_address_are_distinct(self):
        obj = LinkedFixture(call(1) + EXIT + EXIT)
        _, _, refs, _ = a.context(obj)
        self.assertIn(0x1010, refs)
        self.assertEqual(refs[0x1010][0]["caller_file_offset"], 64)
        self.assertEqual(refs[0x1010][0]["caller_address"], 0x1000)

    def test_signed_backward_call(self):
        obj = LinkedFixture(EXIT + call(-2))
        self.assertIn(0x1000, a.context(obj)[2])

    def test_external_relocation_excludes_apparent_call(self):
        obj = LinkedFixture(call(1) + EXIT + EXIT, [(0x1000, 10)])
        self.assertEqual(a.context(obj)[2], {})

    def test_lddw_continuation_never_decoded_as_call_or_target(self):
        lddw = bytes.fromhex("1800000000000000") + call(0)
        obj = LinkedFixture(lddw + call(-2) + EXIT)
        self.assertEqual(a.context(obj)[2], {})
        with self.assertRaisesRegex(ValueError, "truncated LDDW"):
            list(a.instructions(lddw[:8]))

    def test_direct_call_window_requires_next_called_entry(self):
        obj = LinkedFixture(call(1) + call(1) + EXIT + EXIT)
        matches = a.occurrences(obj, EXIT, a.context(obj))
        self.assertTrue(next(h for h in matches if h["file_offset"] == 80)["call_bounded"])
        self.assertFalse(next(h for h in matches if h["file_offset"] == 88)["call_bounded"])

    def test_relocation_crossing_match_start_is_excluded(self):
        rows = [dict(address=0x1008, type=1)]
        self.assertEqual(a.overlapping(rows, 0x1010, 0x1018), rows)
        self.assertEqual(a.overlapping(rows, 0x1018, 0x1020), [])

    def test_ar_bsd_payload_offset_and_truncation(self):
        raw = b"!<arch>\n" + ar_member("#1/5", b"foo.o" + b"ELF")
        self.assertEqual(list(elf.ar_members(raw)), [("foo.o", 73, b"ELF")])
        with self.assertRaises(ValueError):
            list(elf.ar_members(raw[:-1]))

    def test_rlib_membership_and_body_are_recomputed(self):
        key, payload = next(iter(self.objects.items()))
        raw = b"!<arch>\n" + ar_member("one.o/", payload)
        lib = dict(path="fixture.rlib", bytes=len(raw), sha256=elf.digest(raw),
                   objects=[dict(name="one.o", offset=68, bytes=len(payload), sha256=key)])
        v.check_rlib(raw, lib, {key: payload})
        wrong = copy.deepcopy(lib)
        wrong["objects"][0]["offset"] += 1
        with self.assertRaisesRegex(ValueError, "membership differs"):
            v.check_rlib(raw, wrong, {key: payload})
        changed = bytearray(raw)
        changed[80] ^= 1
        wrong = copy.deepcopy(lib)
        wrong["sha256"] = elf.digest(changed)
        with self.assertRaisesRegex(ValueError, "object bytes differ"):
            v.check_rlib(bytes(changed), wrong, {key: payload})

    def test_duplicate_and_missing_object_payloads_fail(self):
        key, payload = next(iter(self.objects.items()))
        for duplicate in [False, True]:
            with self.subTest(duplicate=duplicate), tempfile.TemporaryDirectory() as tmp:
                folder = Path(tmp)
                (folder / "objects.json").write_bytes((HERE / "objects.json").read_bytes())
                with tarfile.open(folder / "objects.tar.gz", "w:gz") as tar:
                    for _ in range(2 if duplicate else 1):
                        info = tarfile.TarInfo(key + ".o")
                        info.size = len(payload)
                        tar.addfile(info, io.BytesIO(payload))
                with self.assertRaisesRegex(ValueError, "unexpected/duplicate|missing objects"):
                    v.load_objects(folder)

    def test_release_digest_gate_precedes_archive_parsing(self):
        with tempfile.TemporaryDirectory() as tmp:
            path = Path(tmp) / "wrong.tar.bz2"
            path.write_bytes(b"bad")
            metadata = dict(asset=dict(size=3, digest="sha256:" + "0" * 64))
            with mock.patch.object(elf, "read_json", return_value=metadata):
                with self.assertRaisesRegex(ValueError, "archive digest differs"):
                    v.check_archive(HERE, path, self.objects)

    def test_findings_tampering_fails_even_after_manifest_gate(self):
        changed = copy.deepcopy(self.findings)
        changed["summary"]["distinct_capture_ranges"] = 16
        real_read = elf.read_json
        def read(path):
            return changed if path.name == "findings.json" else real_read(path)
        with mock.patch.object(v, "manifest"), mock.patch.object(elf, "read_json", side_effect=read):
            with self.assertRaisesRegex(ValueError, "findings differ"):
                v.verify(HERE, REPO)

    def test_source_notice_git_blobs(self):
        import hashlib
        for row in elf.read_json(HERE / "source-notices.json"):
            raw = (HERE / row["path"]).read_bytes()
            blob = hashlib.sha1(b"blob " + str(len(raw)).encode() + b"\0" + raw).hexdigest()
            self.assertEqual(blob, row["git_blob"], row["path"])

    def test_isolated_cli_with_only_pinned_external_inputs(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            for name, raw in self.inputs.items():
                target = elf.local_path(root, name)
                target.parent.mkdir(parents=True, exist_ok=True)
                target.write_bytes(raw)
            run = subprocess.run([sys.executable, "-I", str(HERE / "verify.py"),
                                  "--repo", str(root)], cwd=root, capture_output=True, text=True)
            self.assertEqual(run.returncode, 0, run.stderr)
            self.assertEqual(json.loads(run.stdout)["summary"]["distinct_capture_ranges"], 10)


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--repo", type=Path, default=REPO)
    args, rest = parser.parse_known_args()
    REPO = args.repo
    unittest.main(argv=[sys.argv[0]] + rest)
