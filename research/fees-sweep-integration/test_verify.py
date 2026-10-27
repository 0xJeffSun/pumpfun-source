"""Reject coherent Sweep packet mutations after authenticating the parent once."""
from pathlib import Path
import gzip
import hashlib
import importlib.util
import json
import os
import shutil
import struct
import subprocess
import sys
import tempfile
import unittest

HERE = Path(__file__).resolve().parent
SWEEP_FILE = "programs/pump-fees/src/instructions/buyback/mod.rs"
STATE_FILE = "programs/pump-fees/src/state.rs"


def module(name, path):
    spec = importlib.util.spec_from_file_location(name, path)
    result = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(result)
    return result


BASE = module("sweep_test_base", HERE / "verify.py")


class SourceTransformTests(unittest.TestCase):
    def parent_source(self, name):
        return BASE.parent_state()[1][name]

    def test_exact_two_file_transform_hashes(self):
        self.assertEqual(set(BASE.FILES), {SWEEP_FILE, STATE_FILE})
        self.assertEqual(set(BASE.BEFORE_SHA256), set(BASE.FILES))
        self.assertEqual(set(BASE.AFTER_SHA256), set(BASE.FILES))
        for name in BASE.FILES:
            with self.subTest(file=name):
                before = self.parent_source(name)
                self.assertEqual(BASE.sha(before), BASE.BEFORE_SHA256[name])
                after = BASE.transform_source(name, before)
                self.assertEqual(BASE.sha(after), BASE.AFTER_SHA256[name])

    def test_real_source_locations_are_retained(self):
        locations = {
            SWEEP_FILE: [b"require_gt!(8u8,index,FeeError::InvalidBuybackIndex);"],
            STATE_FILE: [b"Clock::get().unwrap()", b"now - self.last_claimed"],
        }
        for name, markers in locations.items():
            before = self.parent_source(name)
            after = BASE.transform_source(name, before)
            for marker in markers:
                with self.subTest(file=name, marker=marker):
                    # InitializeBuyback has its own index guard; select Sweep's final one.
                    old_position = before.rindex(marker)
                    new_position = after.rindex(marker)
                    self.assertEqual(before[:old_position].count(b"\n"),
                                     after[:new_position].count(b"\n"))

    def test_wrong_parent_rejected_for_each_file(self):
        for name in BASE.FILES:
            with self.subTest(file=name):
                with self.assertRaisesRegex(AssertionError, "unexpected parent"):
                    BASE.transform_source(name, self.parent_source(name) + b"\n")

    def test_unknown_source_file_rejected(self):
        with self.assertRaises((AssertionError, KeyError)):
            BASE.transform_source("programs/pump-fees/src/unrequested.rs", b"")


class MutationTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        BASE.verify()
        cls.windows = BASE.module(
            "sweep_test_windows",
            BASE.ROOT / "research/fees-composed-frontier188/window_map.py",
        )

    def setUp(self):
        self.temp = tempfile.TemporaryDirectory(prefix="fees-sweep-negative-")
        self.copy = Path(self.temp.name) / "packet"
        shutil.copytree(HERE, self.copy)
        self.verifier = module("sweep_test_copy", self.copy / "verify.py")
        self.verifier.ROOT = BASE.ROOT
        self.verifier.PARENT = BASE.PARENT
        self.verifier.parent_state = BASE.parent_state

    def tearDown(self):
        self.temp.cleanup()

    def write_json(self, name, value):
        (self.copy / name).write_text(json.dumps(value, indent=2) + "\n")

    def reject(self, expected=None):
        # Recompute the outer manifest so these exercise inner evidence checks.
        self.write_json("manifest.json", {
            str(p.relative_to(self.copy)): hashlib.sha256(p.read_bytes()).hexdigest()
            for p in self.copy.rglob("*")
            if p.is_file() and p != self.copy / "manifest.json"
        })
        if expected:
            with self.assertRaisesRegex(AssertionError, expected):
                self.verifier.verify()
        else:
            with self.assertRaises((AssertionError, ValueError, KeyError)):
                self.verifier.verify()

    def replace_source(self, name, before, after, count=1):
        path = self.copy / "overrides" / name
        source = path.read_bytes()
        self.assertIn(before, source)
        path.write_bytes(source.replace(before, after, count))

    def mutate_native(self, section, relative, pointer=None):
        for role in ["candidate", "repeat"]:
            values = {}
            for file in ["symbols.so", "candidate.so"]:
                path = self.copy / "builds" / role / (file + ".gz")
                image = bytearray(gzip.decompress(path.read_bytes()))
                sec = next(s for s in self.windows.m.elf_layout(bytes(image))["sections"]
                           if s["name"] == section)
                if pointer is None:
                    image[sec["offset"] + relative] ^= 1
                else:
                    struct.pack_into("<I", image, sec["offset"] + relative, pointer)
                path.write_bytes(gzip.compress(image, mtime=0))
                values[file] = hashlib.sha256(image).hexdigest()
            receipt = json.loads((self.copy / "builds" / role / "result.json").read_bytes())
            receipt["symbols_sha256"] = values["symbols.so"]
            receipt["candidate_sha256"] = values["candidate.so"]
            self.write_json("builds/" + role + "/result.json", receipt)

    def mutate_stripped(self, mutate):
        # Keep all digest receipts coherent, leaving the symbol-bearing proof
        # image unchanged so only the stripped-image relationship can reject it.
        digests = []
        for role in ("candidate", "repeat"):
            path = self.copy / "builds" / role / "candidate.so.gz"
            image = bytearray(gzip.decompress(path.read_bytes()))
            mutate(image)
            path.write_bytes(gzip.compress(image, mtime=0))
            digest = hashlib.sha256(image).hexdigest()
            digests.append(digest)
            result = self.copy / "builds" / role / "result.json"
            receipt = json.loads(result.read_bytes())
            receipt["candidate_sha256"] = digest
            self.write_json(str(result.relative_to(self.copy)), receipt)
        self.assertEqual(digests[0], digests[1])
        path = self.copy / "runtime.json.gz"
        runtime = json.loads(gzip.decompress(path.read_bytes()))
        runtime["candidate_sha256"] = digests[0]
        for suite in runtime["suites"].values():
            suite["candidate_sha256"] = digests[0]
        path.write_bytes(gzip.compress(json.dumps(runtime).encode(), mtime=0))
        execution = json.loads((self.copy / "runtime-execution.json").read_bytes())
        execution["candidate_sha256"] = digests[0]
        self.write_json("runtime-execution.json", execution)

    def sweep_pointer(self, ordinal):
        image = BASE.read(HERE / "builds/candidate/symbols.so")
        function = self.windows.windows(image)[143]
        self.assertEqual(function["bytes"], 6960)
        self.assertIn("sweep_buyback", function["name"])
        relocations = dict(self.windows.m.relocations(image))
        pointers = [row for row in self.windows.m.instructions(
            image, function["address"], function["bytes"])
            if row["opcode"] == 0x18
            and relocations.get(function["address"] + row["offset"], 0) & 0xffffffff == 8]
        self.assertGreaterEqual(len(pointers), 2)
        row = pointers[ordinal]
        text = next(s for s in self.windows.m.elf_layout(image)["sections"]
                    if s["name"] == ".text")
        relative = function["address"] + row["offset"] - text["address"] + 4
        return relative, row["lddw_value"]

    def test_source_change(self):
        path = self.copy / "overrides" / SWEEP_FILE
        path.write_bytes(path.read_bytes() + b"\n")
        self.reject()

    def test_index_guard_removed(self):
        self.replace_source(
            SWEEP_FILE,
            b"require_gt!(8u8,index,FeeError::InvalidBuybackIndex);\n    let vault",
            b"let _ = 8u8 > index;\n    let vault",
        )
        self.reject()

    def test_bump_destination_order_reversed(self):
        self.replace_source(
            SWEEP_FILE,
            b"let bump_value = ctx.bumps.buyback_vault; let destination = &mut ctx.accounts.destination;",
            b"let destination = &mut ctx.accounts.destination; let bump_value = ctx.bumps.buyback_vault;",
        )
        self.reject()

    def test_claimed_counter_error_ignored(self):
        self.replace_source(
            SWEEP_FILE,
            b"vault.add_total_claimed(sol_amount)?;",
            b"let _ = vault.add_total_claimed(sol_amount);",
        )
        self.reject()

    def test_claimed_counter_overflow_unwrapped(self):
        self.replace_source(
            STATE_FILE,
            b".ok_or(crate::FeeError::MathOverflow)?; Ok(())",
            b".ok_or(crate::FeeError::MathOverflow).unwrap(); Ok(())",
        )
        self.reject()

    def test_extra_override_rejected(self):
        path = self.copy / "overrides/programs/pump-fees/src/unrequested.rs"
        path.write_text("// unrequested source\n")
        self.reject()

    def test_first_sweep_relocated_pointer_wrong(self):
        relative, pointer = self.sweep_pointer(0)
        self.mutate_native(".text", relative, pointer + 8)
        self.reject("original pointer")

    def test_second_sweep_relocated_pointer_wrong(self):
        relative, pointer = self.sweep_pointer(1)
        self.mutate_native(".text", relative, pointer + 1)
        self.reject("original pointer")

    def test_stripped_only_entry_change(self):
        def mutate(image):
            entry = struct.unpack_from("<Q", image, 24)[0]
            struct.pack_into("<Q", image, 24, entry + 8)
        self.mutate_stripped(mutate)
        self.reject("stripped ELF header differs")

    def test_stripped_only_program_header_change(self):
        def mutate(image):
            offset = struct.unpack_from("<Q", image, 32)[0]
            count = struct.unpack_from("<H", image, 56)[0]
            for index in range(count):
                start = offset + index * 56
                if struct.unpack_from("<I", image, start)[0] == 1:
                    flags = struct.unpack_from("<I", image, start + 4)[0]
                    struct.pack_into("<I", image, start + 4, flags ^ 2)
                    return
            self.fail("missing PT_LOAD program header")
        self.mutate_stripped(mutate)
        self.reject("stripped program headers differ")

    def test_stripped_only_allocated_flags_change(self):
        def mutate(image):
            address = next(section["address"] for section in
                           self.windows.m.elf_layout(bytes(image))["sections"]
                           if section["name"] == ".text")
            offset = struct.unpack_from("<Q", image, 40)[0]
            count = struct.unpack_from("<H", image, 60)[0]
            for index in range(count):
                start = offset + index * 64
                if struct.unpack_from("<Q", image, start + 16)[0] == address:
                    flags = struct.unpack_from("<Q", image, start + 8)[0]
                    struct.pack_into("<Q", image, start + 8, flags ^ 1)
                    return
            self.fail("missing .text section header")
        self.mutate_stripped(mutate)
        self.reject("stripped allocated section metadata differs")

    def test_unrelated_instruction_change(self):
        self.mutate_native(".text", 4)
        self.reject()

    def test_readonly_constant_change(self):
        self.mutate_native(".rodata", 10)
        self.reject("readonly payload")

    def test_wrong_build_target(self):
        receipt = json.loads((self.copy / "builds/candidate/launch.json").read_bytes())
        index = receipt["command"].index("--target") + 1
        receipt["command"][index] = "x86_64-unknown-linux-gnu"
        self.write_json("builds/candidate/launch.json", receipt)
        self.reject()

    def test_added_layout_padding(self):
        path = self.copy / "layout/ordered.ld"
        before = b"  .rodata : {"
        self.assertIn(before, path.read_bytes())
        path.write_bytes(path.read_bytes().replace(before, before + b" BYTE(0);", 1))
        self.reject()

    def test_missing_runtime_case(self):
        path = self.copy / "runtime.json.gz"
        report = json.loads(gzip.decompress(path.read_bytes()))
        report["suites"]["queries"]["cases"].pop()
        path.write_bytes(gzip.compress(json.dumps(report).encode(), mtime=0))
        self.reject()

    def test_unlisted_nested_manifest_and_cache(self):
        for name in ("nested/manifest.json", "__pycache__/extra.pyc"):
            path = self.copy / name
            path.parent.mkdir(exist_ok=True)
            path.write_bytes(b"{}")
            with self.assertRaises(AssertionError):
                self.verifier.check_manifest()
            path.unlink()

    def test_symlink_rejected(self):
        (self.copy / "alias").symlink_to(self.copy / "manifest.json")
        with self.assertRaisesRegex(AssertionError, "symlink"):
            self.verifier.check_manifest()

    @unittest.skipUnless(hasattr(os, "mkfifo"), "POSIX-only FIFO creation")
    def test_special_file_rejected(self):
        os.mkfifo(self.copy / "fifo")
        with self.assertRaisesRegex(AssertionError, "special file"):
            self.verifier.check_manifest()

    def test_optimized_python_rejected(self):
        result = subprocess.run(
            [sys.executable, "-I", "-O", "-B", str(self.copy / "verify.py")],
            capture_output=True, text=True,
        )
        self.assertNotEqual(result.returncode, 0)
        self.assertIn("verification requires assertions", result.stderr)


if __name__ == "__main__":
    unittest.main()
