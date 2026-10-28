#!/usr/bin/env python3
"""Pure UTF-8 source/materializer tests. No Rust compile, account fixture or VM."""
from pathlib import Path
import argparse
import json
import shutil
import sys
import tempfile
import unittest

import materialize as m

DEFAULT_PARENT = Path(__file__).absolute().parents[2] / "research/claude-pump-integration-20261027/r37-layout-36/source"
PARENT = DEFAULT_PARENT


class MaterializeTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.pins, cls.patch = m.load_packet()
        cls.original = m.authenticate_parent(PARENT, cls.pins)[0]

    def setUp(self):
        self.temp = tempfile.TemporaryDirectory(prefix="decoder-source-tests-")
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name)
        self.parent = self.root / "parent"
        self.parent.mkdir()
        for name, raw in self.original.items():
            path = self.parent / name
            path.parent.mkdir(parents=True, exist_ok=True)
            path.write_bytes(raw)
        self.output = self.root / "output"
        self.packet = self.root / "packet"
        self.packet.mkdir()
        for name in ("pins.json", "source.patch"):
            shutil.copyfile(m.PACKET / name, self.packet / name)

    def reject(self):
        with self.assertRaises((ValueError, OSError)):
            m.materialize(self.parent, self.output, self.packet)
        self.assertFalse(self.output.exists())

    def test_exact_output_and_unchanged_parent(self):
        before = m.snapshot(self.parent)
        result = m.materialize(self.parent, self.output, self.packet)
        self.assertEqual(result, {"source_files": 65, "changed_paths": list(m.CHANGED), "parent_unchanged": True})
        self.assertEqual(m.snapshot(self.parent), before)
        files = m.snapshot(self.output)[0]
        self.assertEqual({n: m.digest(raw) for n, raw in files.items()}, self.pins["output_sha256"])
        self.assertEqual(sorted(n for n in files if files[n] != self.original[n]), list(m.CHANGED))

    def test_every_parent_file_single_byte_mutation_rejected(self):
        for name, raw in self.original.items():
            with self.subTest(path=name):
                path = self.parent / name
                mutated = bytearray(raw)
                mutated[len(mutated) // 2] ^= 1
                path.write_bytes(mutated)
                self.reject()
                path.write_bytes(raw)

    def test_missing_parent_file_rejected(self):
        (self.parent / m.CHANGED[0]).unlink()
        self.reject()

    def test_extra_parent_file_rejected(self):
        (self.parent / "unexpected.rs").write_text("// not an admitted source file\n")
        self.reject()

    def test_extra_empty_directory_rejected(self):
        (self.parent / "unexpected").mkdir()
        self.reject()

    def test_prepared_workspace_manifest_is_not_archived_parent(self):
        path = self.parent / "programs/pump/Cargo.toml"
        path.write_text(path.read_text().replace("[workspace]\n", ""))
        self.reject()

    def test_parent_file_symlink_rejected(self):
        path = self.parent / m.CHANGED[0]
        raw = path.read_bytes()
        other = self.root / "same-bytes.rs"
        other.write_bytes(raw)
        path.unlink()
        path.symlink_to(other)
        self.reject()

    def test_parent_directory_symlink_rejected(self):
        path = self.parent / "programs/pump/src"
        other = self.root / "src"
        path.rename(other)
        path.symlink_to(other, target_is_directory=True)
        self.reject()

    def test_parent_root_symlink_rejected(self):
        link = self.root / "parent-link"
        link.symlink_to(self.parent, target_is_directory=True)
        with self.assertRaises(ValueError):
            m.materialize(link, self.output, self.packet)
        self.assertFalse(self.output.exists())

    def test_existing_output_is_preserved(self):
        self.output.mkdir()
        marker = self.output / "keep"
        marker.write_text("do not overwrite\n")
        with self.assertRaises(ValueError):
            m.materialize(self.parent, self.output, self.packet)
        self.assertEqual(marker.read_text(), "do not overwrite\n")

    def test_output_inside_parent_rejected_before_creation(self):
        with self.assertRaises(ValueError):
            m.materialize(self.parent, self.parent / "nested-output", self.packet)
        self.assertFalse((self.parent / "nested-output").exists())

    def test_dangling_output_symlink_rejected(self):
        self.output.symlink_to(self.root / "missing-target", target_is_directory=True)
        with self.assertRaises(ValueError):
            m.materialize(self.parent, self.output, self.packet)
        self.assertTrue(self.output.is_symlink())
        self.assertFalse((self.root / "missing-target").exists())

    def test_output_ancestor_symlink_rejected(self):
        target = self.root / "target-dir"
        target.mkdir()
        link = self.root / "link-dir"
        link.symlink_to(target, target_is_directory=True)
        with self.assertRaises(ValueError):
            m.materialize(self.parent, link / "output", self.packet)
        self.assertEqual(list(target.iterdir()), [])

    def test_output_parent_must_exist(self):
        with self.assertRaises(ValueError):
            m.materialize(self.parent, self.root / "missing/output", self.packet)
        self.assertFalse((self.root / "missing").exists())

    def test_pins_mutation_rejected(self):
        path = self.packet / "pins.json"
        path.write_bytes(path.read_bytes() + b"\n")
        self.reject()

    def test_patch_mutation_rejected(self):
        path = self.packet / "source.patch"
        path.write_bytes(path.read_bytes().replace(b"try_from(user_volume_accumulator)", b"try_from_unchecked(user_volume_accumulator)", 1))
        self.reject()

    def test_packet_symlink_rejected(self):
        path = self.packet / "source.patch"
        path.unlink()
        path.symlink_to(m.PACKET / "source.patch")
        self.reject()

    def test_path_traversal_absolute_and_backslash_rejected(self):
        for path in ("../escape.rs", "/absolute.rs", "a/../escape.rs", "a\\escape.rs", ".", "a//b"):
            with self.subTest(path=path), self.assertRaises(ValueError):
                m.relative_name(path)

    def test_patch_traversal_and_unexpected_file_rejected(self):
        for old, new in ((b"programs/pump/src/sell.rs", b"../escape.rs"),
                         (b"programs/pump/src/sell.rs", b"programs/pump/src/other.rs")):
            with self.subTest(path=new), self.assertRaises(ValueError):
                m.apply_fixed_patch(self.original, self.patch.replace(old, new))

    def test_patch_context_offset_count_and_duplicate_rejected(self):
        mutations = [
            self.patch.replace(b"@@ -85,7 +85,7 @@", b"@@ -84,7 +85,7 @@", 1),
            self.patch.replace(b"@@ -85,7 +85,7 @@", b"@@ -85,8 +85,7 @@", 1),
            self.patch.replace(b"        Ok(())", b"        Err(())", 1),
            self.patch + self.patch,
            self.patch[:-1],
        ]
        for patch in mutations:
            with self.subTest(), self.assertRaises(ValueError):
                m.apply_fixed_patch(self.original, patch)

    def test_unrelated_source_lines_and_existing_padding_unchanged(self):
        result = m.apply_fixed_patch(self.original, self.patch)
        old = self.original[m.CHANGED[0]].decode().splitlines(keepends=True)
        new = result[m.CHANGED[0]].decode().splitlines(keepends=True)
        self.assertEqual(len(old), 148)
        self.assertEqual(len(new), 148)
        self.assertEqual([i+1 for i, (a, b) in enumerate(zip(old, new)) if a != b], [88])

    def test_exact_one_token_replacement(self):
        result = m.apply_fixed_patch(self.original, self.patch)
        old = self.original[m.CHANGED[0]]
        before = b"Account::<crate::UserVolumeAccumulator>::try_from_unchecked(user_volume_accumulator)?"
        after = b"Account::<crate::UserVolumeAccumulator>::try_from(user_volume_accumulator)?"
        self.assertEqual(old.count(before), 1)
        self.assertEqual(result[m.CHANGED[0]], old.replace(before, after))
        for name, raw in self.original.items():
            if name != m.CHANGED[0]:
                self.assertEqual(result[name], raw)

    def test_payment_decode_update_exit_curve_order_unchanged(self):
        result = m.apply_fixed_patch(self.original, self.patch)
        sell = result[m.CHANGED[0]].decode()
        markers = ["transfer_native(bonding_curve, user_volume_accumulator, amount)?",
                   "Account::<crate::UserVolumeAccumulator>::try_from(user_volume_accumulator)?",
                   "if user_volume_accumulator.user == Pubkey::default()",
                   "user_volume_accumulator.cashback_earned =",
                   "user_volume_accumulator.exit(&crate::ID)?",
                   "require!(remaining_accounts.len() > 1"]
        positions = [sell.index(marker) for marker in markers]
        self.assertEqual(positions, sorted(positions))


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__, add_help=False)
    parser.add_argument("--parent", type=Path, default=DEFAULT_PARENT)
    args, rest = parser.parse_known_args()
    PARENT = args.parent.absolute()
    unittest.main(argv=[sys.argv[0], *rest])
