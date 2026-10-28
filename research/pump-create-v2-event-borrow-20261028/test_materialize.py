#!/usr/bin/env python3
"""Pure UTF-8 source/materializer tests. No compiler, network, ELF or target execution."""
from pathlib import Path
import argparse
import ast
import difflib
import json
import re
import shutil
import sys
import tempfile
import unittest

import materialize as m

PARENT = None
CREATE = "programs/pump/src/create_v2.rs"
PARENT_CREATE_SHA256 = "4dfd21d725b2d3f887c3a84b3d98dcd00a33f6561be2d68e0b6bb963ffb2df5b"
OUTPUT_CREATE_SHA256 = "28d792335d869f379ebbce7e455cafd65b2d2ed17543c8ce4a7e720839e8dedf"


class MaterializeTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.pins, cls.patch = m.load_packet()
        cls.original = m.authenticate_parent(PARENT, cls.pins)[0]

    def setUp(self):
        self.temp = tempfile.TemporaryDirectory(prefix="create-event-source-tests-")
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

    def test_prepared_workspace_manifest_is_not_canonical_parent(self):
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
        path.write_bytes(path.read_bytes().replace(b"emit!(event)", b"emit!(other)", 1))
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
        for old, new in ((b"programs/pump/src/create_v2.rs", b"../escape.rs"),
                         (b"programs/pump/src/create_v2.rs", b"programs/pump/src/other.rs")):
            with self.subTest(path=new), self.assertRaises(ValueError):
                m.apply_fixed_patch(self.original, self.patch.replace(old, new))

    def test_patch_context_offset_count_and_duplicate_rejected(self):
        mutations = [
            self.patch.replace(b"@@ -133,7 +133,7 @@", b"@@ -132,7 +133,7 @@", 1),
            self.patch.replace(b"@@ -133,7 +133,7 @@", b"@@ -133,8 +133,7 @@", 1),
            self.patch.replace(b"let event=create_event", b"let other=create_event", 1),
            self.patch + self.patch,
            self.patch[:-1],
        ]
        for patch in mutations:
            with self.subTest(), self.assertRaises(ValueError):
                m.apply_fixed_patch(self.original, patch)

    def outputs(self):
        return m.apply_fixed_patch(self.original, self.patch)

    def test_exact_single_expression_change(self):
        before, after = self.original[CREATE], self.outputs()[CREATE]
        old = b" emit!(event.clone());emit_cpi!(event);Ok(())\n"
        new = b" emit!(event);emit_cpi!(event);Ok(())\n"
        self.assertEqual(before.count(old), 1)
        self.assertEqual(after, before.replace(old, new))
        self.assertEqual(len(before) - len(after), 8)
        self.assertEqual(m.digest(before), PARENT_CREATE_SHA256)
        self.assertEqual(m.digest(after), OUTPUT_CREATE_SHA256)

    def test_exact_line_and_natural_column_change(self):
        before, after = (b.decode().splitlines(True) for b in (self.original[CREATE], self.outputs()[CREATE]))
        self.assertEqual(len(before), 622)
        self.assertEqual(len(after), 622)
        self.assertEqual([i+1 for i,(a,b) in enumerate(zip(before,after)) if a!=b], [136])
        self.assertEqual(before[135].index("emit_cpi!") - after[135].index("emit_cpi!"), 8)
        self.assertEqual([s for s in before if not s.strip() or "layout-pad" in s],
                         [s for s in after if not s.strip() or "layout-pad" in s])

    def test_exact_patch_is_not_the_prior_direct_type_patch(self):
        before, after = (b.decode() for b in (self.original[CREATE], self.outputs()[CREATE]))
        expected = "".join(difflib.unified_diff(before.splitlines(True), after.splitlines(True),
                                              fromfile="a/"+CREATE, tofile="b/"+CREATE))
        self.assertEqual(expected.encode(), self.patch)
        self.assertEqual(len(self.patch), 925)
        self.assertEqual(tuple(m.CHANGED), (CREATE,))
        self.assertNotIn(b"multi_hop_curve_swap.rs", self.patch)
        self.assertNotIn(b"pump_fees", self.patch)

    def test_metadata_clones_and_event_construction_retained(self):
        before, after = (b.decode() for b in (self.original[CREATE], self.outputs()[CREATE]))
        metadata = "initialize_metadata(&ctx,name.clone(),symbol.clone(),uri.clone())?;"
        construction = "let event=create_event(name,symbol,uri,creator,"
        for text in (before, after):
            self.assertEqual(text.count(metadata), 1)
            self.assertEqual(text.count(construction), 1)
            self.assertLess(text.index(metadata), text.index(construction))
        self.assertEqual(before[before.index("fn create_event"):], after[after.index("fn create_event"):])
        self.assertIn("Ok(CreateEvent{name,symbol,uri,", after)

    def test_two_emissions_order_and_other_control_tokens_retained(self):
        before, after = (b.decode() for b in (self.original[CREATE], self.outputs()[CREATE]))
        self.assertEqual(after.splitlines()[135], " emit!(event);emit_cpi!(event);Ok(())")
        self.assertNotIn("emit!(event.clone())", after)
        for token in ("emit_cpi!(event)", "#[", "// layout-pad", "unsafe", "transmute", "inline("):
            self.assertEqual(before.count(token), after.count(token))

    def test_event_declaration_and_all_other_files_unchanged(self):
        files = self.outputs()
        for name in self.original:
            if name != CREATE:
                self.assertEqual(files[name], self.original[name], name)
        lib = files["programs/pump/src/lib.rs"].decode()
        self.assertIn("#[event]\n#[derive(Clone)]\npub struct CreateEvent", lib)
        declaration = lib.split("pub struct CreateEvent {", 1)[1].split("}", 1)[0]
        types = re.findall(r"pub \w+:([^,}]+)", declaration)
        self.assertEqual(types.count("String"), 3)
        self.assertEqual(set(types), {"String", "Pubkey", "i64", "u64", "bool", "u8"})
        self.assertNotIn("impl Drop for CreateEvent", lib)

    def test_parent_is_pr561_output_not_uncomposed_l36(self):
        prior_outputs = {
            "programs/pump/src/multi_hop_curve_swap.rs": "b6bfc38007f58a1ce55f522dbc7088742776b2c33e2e4b5129e30da7d85986a0",
            "programs/pump/src/trade_v3.rs": "bdcdaa0ff1be38cb1cee934bfd3b3eedc427e7622637ae89d0232ebbe625780c",
            "programs/pump/src/util/fee.rs": "3775a3561564bb1564e7ad5d82cb4e23e92d53692c20687bd9b32f80b1526efb",
        }
        self.assertEqual(self.pins["parent"]["pull_request"], 561)
        self.assertEqual(self.pins["parent"]["pins_sha256"], "6a61590d3a40be9c07ad7e24e5bd87bd8f1b74f324c3809d8689f602703d02d3")
        for name, sha in prior_outputs.items():
            self.assertEqual(m.digest(self.original[name]), sha)
            self.assertEqual(m.digest(self.outputs()[name]), sha)
        # Full authentication requires those already-composed bytes: this is
        # not an applicator that discovers/reapplies the previous source patch.
        self.assertEqual(len(self.pins["parent"]["files"]), 65)

    def test_materializer_has_no_external_execution_or_binary_input(self):
        tree = ast.parse((m.PACKET / "materialize.py").read_text())
        imports = {alias.name.split(".")[0] for node in ast.walk(tree)
                   if isinstance(node, ast.Import) for alias in node.names}
        imports |= {node.module.split(".")[0] for node in ast.walk(tree)
                    if isinstance(node, ast.ImportFrom) and node.module}
        self.assertLessEqual(imports, {"pathlib", "argparse", "hashlib", "json", "os", "re", "stat"})
        self.assertTrue(all(not n.endswith((".so", ".a", ".rlib", ".rmeta", ".ll")) for n in self.pins["parent"]["files"]))


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__, add_help=False)
    parser.add_argument("--parent", type=Path, required=True,
                        help="Exact 65-file PR561 materializer output")
    args, rest = parser.parse_known_args()
    PARENT = args.parent.absolute()
    unittest.main(argv=[sys.argv[0], *rest])
