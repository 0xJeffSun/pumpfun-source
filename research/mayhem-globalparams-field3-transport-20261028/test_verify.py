#!/usr/bin/env python3
"""Counterexamples for the field_3 transport census."""

from __future__ import annotations

import importlib.util
import json
import unittest
from pathlib import Path

PACKAGE = Path(__file__).resolve().parent
SPEC = importlib.util.spec_from_file_location("field3_transport", PACKAGE / "verify.py")
CENSUS = importlib.util.module_from_spec(SPEC)
assert SPEC.loader is not None
SPEC.loader.exec_module(CENSUS)


def rows(text: str, path: str = "src/probe.rs") -> list[dict]:
    return CENSUS.occurrences_in_text(path, text)


class Field3TransportTests(unittest.TestCase):
    def test_comment_string_and_lifetime_are_not_reads(self) -> None:
        text = "\n".join(
            [
                "fn probe<'info>(global_params: &GlobalParams) {",
                "    // global_params.field_3 is only a comment",
                '    let label = "global_params.field_3";',
                "    let kept = global_params.field_30;",
                "    let also = global_params.field_13;",
                "}",
                "",
            ]
        )
        self.assertEqual(rows(text), [])

    def test_real_read_is_not_hidden_by_a_lifetime(self) -> None:
        text = "fn probe<'info>(global_params: &GlobalParams) { let value = global_params.field_3; }\n"
        found = rows(text)
        self.assertEqual([row["role"] for row in found], ["business_read"])
        with self.assertRaises(SystemExit):
            CENSUS.assert_occurrences(found)

    def test_assignment_and_event_projection_stay_transport(self) -> None:
        text = "\n".join(
            [
                "fn update(state: &mut GlobalParams) {",
                "    state.field_3 = 0;",
                "    let event = Event { field_3: state.field_3, };",
                "}",
                "",
            ]
        )
        self.assertEqual(
            [row["role"] for row in rows(text)],
            ["transport_write", "binding", "event_read"],
        )

    def test_serializer_must_copy_eight_bytes(self) -> None:
        elf = CENSUS.read_pinned(CENSUS.ELF_REL, CENSUS.ELF_SHA256, CENSUS.ELF_BYTES)
        text = bytearray(CENSUS.text_section(elf))
        # 把加载后的栈写入改成比较。字段值一旦被拿去分支，搬运结论就不成立。
        self.assertEqual(text[CENSUS.SERIALIZER_PC + 8], 0x7B)
        text[CENSUS.SERIALIZER_PC + 8] = 0x15
        with self.assertRaises(SystemExit):
            CENSUS.assert_copy8(bytes(text), CENSUS.SERIALIZER_PC)

    def test_event_store_must_not_become_a_compare(self) -> None:
        elf = CENSUS.read_pinned(CENSUS.ELF_REL, CENSUS.ELF_SHA256, CENSUS.ELF_BYTES)
        text = bytearray(CENSUS.text_section(elf))
        self.assertEqual(text[0xCEA8], 0x7B)
        text[0xCEA8] = 0x15
        with self.assertRaises(SystemExit):
            CENSUS.assert_event(bytes(text))

    def test_setter_without_field_0_is_not_silently_kept(self) -> None:
        elf = CENSUS.read_pinned(CENSUS.ELF_REL, CENSUS.ELF_SHA256, CENSUS.ELF_BYTES)
        text = bytearray(CENSUS.text_section(elf))
        gzip_bytes = CENSUS.read_pinned(
            CENSUS.SYMBOLS_REL, CENSUS.SYMBOLS_GZIP_SHA256, CENSUS.SYMBOLS_GZIP_BYTES
        )
        import gzip

        funcs = CENSUS.symbols(gzip.decompress(gzip_bytes))
        # 拿掉 field_0 的宽度 4 地标以后，这条 store 不再算 field_3。
        self.assertEqual(text[0x2BC68], 0x63)
        text[0x2BC68] = 0x05
        with self.assertRaises(SystemExit):
            CENSUS.assert_protocol(bytes(text), funcs)

    def test_recorded_survey_matches_the_image_and_source(self) -> None:
        fresh = CENSUS.build_survey(CENSUS.ROOT)
        recorded = json.loads((PACKAGE / "survey.json").read_text())
        self.assertEqual(recorded, fresh)
        self.assertEqual(fresh["business_read_count"], 0)
        self.assertEqual(fresh["paired_104_count"], 3)
        self.assertEqual(fresh["unpaired_104_count"], 100)
        self.assertEqual(fresh["history"]["series"], [20000000000] * 10)
        self.assertEqual(fresh["history"]["none_arg_count"], 4)
        names = [site["name"] for site in fresh["object_sites"]]
        self.assertEqual(
            names,
            ["setter_store", "account_serializer_load", "account_decoder_store"],
        )
        self.assertEqual(fresh["event_site"]["event_wire_offset"], 32)
        self.assertEqual(fresh["not_claimed"], ["historical_name", "older_deployment"])


if __name__ == "__main__":
    unittest.main()
