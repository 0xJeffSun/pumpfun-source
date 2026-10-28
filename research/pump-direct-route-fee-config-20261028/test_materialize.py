#!/usr/bin/env python3
"""Pure UTF-8 source/materializer tests. No Rust compile, account fixture or VM."""
from pathlib import Path
import argparse
import json
import re
import shutil
import sys
import tempfile
import unittest

import materialize as m

DEFAULT_PARENT = Path(__file__).absolute().parents[2] / "research/claude-pump-integration-20261027/r37-layout-36/source"
PARENT = DEFAULT_PARENT
SOURCE_CHANGES = {'src/multi_hop_curve_swap.rs': {'parent_sha256': '7fdc0889b28918aaee5a875c187e7dbbe472193e58344ea7ebce8c02062ee640', 'candidate_sha256': 'b6bfc38007f58a1ce55f522dbc7088742776b2c33e2e4b5129e30da7d85986a0', 'lines': 876, 'replacements': [{'before': "bump=fee_config.0.bump,seeds::program=FEES)]pub fee_config:Box<Account<'info,RouteFeeConfig>>", 'after': "bump=fee_config.bump,seeds::program=FEES)]pub fee_config:Box<Account<'info,crate::pump_fees::accounts::FeeConfig>>"}, {'before': 'let config = &a.fee_config.0;', 'after': 'let config = &a.fee_config;'}, {'before': 'fn complete_fill(global: &Global, fee_config: &FeeConfig,', 'after': 'fn complete_fill(global: &Global, fee_config: &crate::pump_fees::accounts::FeeConfig,'}, {'before': 'complete_fill(&a.global,&a.fee_config.0,', 'after': 'complete_fill(&a.global,&a.fee_config,'}]}, 'src/trade_v3.rs': {'parent_sha256': '8049d1f4422b2400402627963ade1b711b2d5d91ead53a395c70468c771eea91', 'candidate_sha256': 'bdcdaa0ff1be38cb1cee934bfd3b3eedc427e7622637ae89d0232ebbe625780c', 'lines': 1295, 'replacements': [{'before': 'bump=fee_config.0.bump,seeds::program=FEE_PROGRAM', 'after': 'bump=fee_config.bump,seeds::program=FEE_PROGRAM'}, {'before': "pub fee_config: Box<Account<'info, crate::multi_hop_curve::RouteFeeConfig>>", 'after': "pub fee_config: Box<Account<'info, crate::pump_fees::accounts::FeeConfig>>"}, {'before': 'get_fees(&a.global,curve,&a.fee_config.0,', 'after': 'get_fees(&a.global,curve,&a.fee_config,'}]}, 'src/util/fee.rs': {'parent_sha256': '410cfeaec2024b95496978d9dd3e5646a62ba52f29678fd7243905db9fb91eb5', 'candidate_sha256': '3775a3561564bb1564e7ad5d82cb4e23e92d53692c20687bd9b32f80b1526efb', 'lines': 204, 'replacements': [{'before': 'use crate::trade_types::{BondingCurve,FeeConfig,FeeTier};', 'after': 'use crate::{trade_types::{BondingCurve,FeeTier},pump_fees::accounts::FeeConfig};'}]}}


class MaterializeTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.pins, cls.patch = m.load_packet()
        cls.original = m.authenticate_parent(PARENT, cls.pins)[0]

    def setUp(self):
        self.temp = tempfile.TemporaryDirectory(prefix="route-direct-type-source-tests-")
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
        path.write_bytes(path.read_bytes().replace(b"crate::pump_fees", b"crate::other_fees", 1))
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
        for old, new in ((b"programs/pump/src/multi_hop_curve_swap.rs", b"../escape.rs"),
                         (b"programs/pump/src/multi_hop_curve_swap.rs", b"programs/pump/src/other.rs")):
            with self.subTest(path=new), self.assertRaises(ValueError):
                m.apply_fixed_patch(self.original, self.patch.replace(old, new))

    def test_patch_context_offset_count_and_duplicate_rejected(self):
        mutations = [
            self.patch.replace(b"@@ -11,7 +11,7 @@", b"@@ -10,7 +11,7 @@", 1),
            self.patch.replace(b"@@ -11,7 +11,7 @@", b"@@ -11,8 +11,7 @@", 1),
            self.patch.replace(b"pub struct MultiHopCurve", b"pub struct OtherCurve", 1),
            self.patch + self.patch,
            self.patch[:-1],
        ]
        for patch in mutations:
            with self.subTest(), self.assertRaises(ValueError):
                m.apply_fixed_patch(self.original, patch)

    def outputs(self):
        return m.apply_fixed_patch(self.original, self.patch)

    def test_exact_three_file_eight_use_site_changes(self):
        files = self.outputs()
        count = 0
        for short, pin in SOURCE_CHANGES.items():
            name = "programs/pump/" + short
            before, after = self.original[name], files[name]
            self.assertEqual(m.digest(before), pin["parent_sha256"])
            self.assertEqual(m.digest(after), pin["candidate_sha256"])
            text = before.decode()
            for edit in pin["replacements"]:
                self.assertEqual(text.count(edit["before"]), 1)
                text = text.replace(edit["before"], edit["after"])
                count += 1
            self.assertEqual(text.encode(), after)
        self.assertEqual(len(SOURCE_CHANGES), 3)
        self.assertEqual(count, 8)

    def test_exact_line_positions_and_no_new_padding(self):
        files = self.outputs()
        wanted = {m.CHANGED[0]: [14, 83, 291, 593], m.CHANGED[1]: [65, 66, 409], m.CHANGED[2]: [37]}
        for name, positions in wanted.items():
            before, after = (x.decode().splitlines(True) for x in (self.original[name], files[name]))
            self.assertEqual(len(before), len(after))
            self.assertEqual([i+1 for i,(a,b) in enumerate(zip(before,after)) if a!=b], positions)
            self.assertEqual([x for x in before if not x.strip() or "layout-pad" in x], [x for x in after if not x.strip() or "layout-pad" in x])

    def test_existing_public_wrapper_exactly_unchanged_and_unused(self):
        files = self.outputs()
        name = m.CHANGED[0]
        def wrapper(text):
            return text[text.index("// D01:"):text.index("fn add(a: u64")]
        self.assertEqual(wrapper(self.original[name].decode()), wrapper(files[name].decode()))
        self.assertIn("pub struct RouteFeeConfig(pub FeeConfig);", wrapper(files[name].decode()))
        self.assertIn("impl AccountSerialize for RouteFeeConfig {}", wrapper(files[name].decode()))
        for path, raw in files.items():
            if path.endswith(".rs"):
                text = raw.decode()
                if path == name:
                    text = text.replace(wrapper(text), "")
                self.assertNotIn("RouteFeeConfig", text)

    def test_local_nominal_reader_and_selector_remain_distinct(self):
        files = self.outputs()
        name = m.CHANGED[1]
        old, new = self.original[name].decode(), files[name].decode()
        self.assertEqual(old[old.index("fn selected("):old.index("// layout-pad(44)")], new[new.index("fn selected("):new.index("// layout-pad(44)")])
        self.assertEqual(old[old.index("fn read_config("):], new[new.index("fn read_config("):])
        self.assertIn("use crate::trade_types::{BondingCurve, FeeConfig, Fees, TradeEvent};", new)
        types = files["programs/pump/src/trade_types.rs"]
        self.assertEqual(types, self.original["programs/pump/src/trade_types.rs"])
        self.assertIn(b"pub struct FeeConfig {", types)
        self.assertNotIn(b"type FeeConfig =", types)

    def test_two_checked_readonly_contexts_and_all_v3_handlers(self):
        files = self.outputs()
        multi, trade = (files[n].decode() for n in m.CHANGED[:2])
        self.assertIn("Box<Account<'info,crate::pump_fees::accounts::FeeConfig>>", multi)
        self.assertIn("Box<Account<'info, crate::pump_fees::accounts::FeeConfig>>", trade)
        for text in (multi, trade):
            self.assertIn("bump=fee_config.bump", text)
            self.assertNotIn("fee_config.0", text)
        for name in m.CHANGED[:2]:
            old, new = (x.decode() for x in (self.original[name], files[name]))
            self.assertEqual(re.findall(r"#\[account[^\n]+",old.replace("fee_config.0.bump","fee_config.bump")), re.findall(r"#\[account[^\n]+",new.replace("crate::pump_fees::accounts::FeeConfig", "RouteFeeConfig" if name==m.CHANGED[0] else "crate::multi_hop_curve::RouteFeeConfig")))
        lib = files["programs/pump/src/lib.rs"].decode()
        for handler in ("buy_v3", "buy_exact_quote_in_v3", "sell_v3"):
            self.assertRegex(lib, r"pub fn " + handler + r"(?:<[^>]*>)?\([^\n]*Context<[^\n]*SellV3")

    def test_borrowed_helper_bodies_errors_and_order_unchanged(self):
        files = self.outputs()
        for short, pin in SOURCE_CHANGES.items():
            name = "programs/pump/" + short
            # Reversing only authenticated type/projection substitutions recovers
            # every byte: fee formulas, error sites and argument order included.
            restored = files[name].decode()
            for edit in reversed(pin["replacements"]):
                self.assertEqual(restored.count(edit["after"]), 1)
                restored = restored.replace(edit["after"], edit["before"])
            self.assertEqual(restored.encode(), self.original[name])
        fee = files[m.CHANGED[2]].decode()
        self.assertIn("pump_fees::accounts::FeeConfig", fee)
        self.assertIn("fn get_fee_basis_points(fee_config: &FeeConfig,", fee)
        self.assertIn("fee_config: &FeeConfig, fee_config_len:", fee)

    def test_no_owned_conversion_clone_unsafe_or_new_attributes(self):
        for pin in SOURCE_CHANGES.values():
            for edit in pin["replacements"]:
                for forbidden in ("unsafe", "transmute", ".clone(", "Vec::", "Box::new", "#[inline", "repr(", ".try_serialize(", ".exit(", ".reload(", ".into_inner("):
                    self.assertEqual(edit["before"].count(forbidden), edit["after"].count(forbidden))

    def test_local_schema_and_generated_idl_identity_unchanged(self):
        files = self.outputs()
        local = files["programs/pump/src/trade_types.rs"].decode()
        body = local.split("pub struct FeeConfig {",1)[1].split("}",1)[0]
        self.assertEqual(re.findall(r"pub (\w+): ([^,\n]+),",body), [("bump","u8"),("admin","Pubkey"),("flat_fees","Fees"),("fee_tiers","Vec<FeeTier>"),("stable_fee_tiers","Vec<FeeTier>"),("exotic_flat_fees","Fees")])
        idl = json.loads(files["programs/pump/idls/pump_fees.json"])
        account = next(a for a in idl["accounts"] if a["name"]=="FeeConfig")
        self.assertEqual(account["discriminator"], [143,52,146,187,219,123,76,155])
        self.assertEqual(idl["address"], "pfeeUxB6jkeY1Hxd7CsFCAjcbHA9rWtchMGdZ6VojVZ")
        self.assertIn("types::{FeeTier, Fees, Shareholder}",local)


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__, add_help=False)
    parser.add_argument("--parent", type=Path, default=DEFAULT_PARENT)
    args, rest = parser.parse_known_args()
    PARENT = args.parent.absolute()
    unittest.main(argv=[sys.argv[0], *rest])
