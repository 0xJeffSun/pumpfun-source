#!/usr/bin/env python3
"""Counterexamples for the field_0 transport census."""

from __future__ import annotations

import importlib.util
import json
import unittest
from pathlib import Path

PACKAGE = Path(__file__).resolve().parent
SPEC = importlib.util.spec_from_file_location("field0_transport", PACKAGE / "verify.py")
CENSUS = importlib.util.module_from_spec(SPEC)
assert SPEC.loader is not None
SPEC.loader.exec_module(CENSUS)


def rows(text: str, path: str = "src/probe.rs") -> list[dict]:
    return CENSUS.occurrences_in_text(path, text)


class Field0TransportTests(unittest.TestCase):
    def test_comment_string_and_lifetime_are_not_reads(self) -> None:
        text = "\n".join(
            [
                "fn probe<'info>(global_params: &GlobalParams) {",
                "    // global_params.field_0 is only a comment",
                '    let label = "global_params.field_0";',
                "    let kept = global_params.field_10;",
                "    let also = global_params.field_01;",
                "}",
                "",
            ]
        )
        self.assertEqual(rows(text), [])

    def test_real_read_is_not_hidden_by_a_lifetime(self) -> None:
        text = "fn probe<'info>(global_params: &GlobalParams) { let value = global_params.field_0; }\n"
        found = rows(text)
        self.assertEqual([row["role"] for row in found], ["business_read"])
        with self.assertRaises(SystemExit):
            CENSUS.assert_occurrences(found)

    def test_assignment_and_event_projection_stay_transport(self) -> None:
        text = "\n".join(
            [
                "fn update(state: &mut GlobalParams) {",
                "    state.field_0 = 0;",
                "    let event = Event { field_0: state.field_0, };",
                "}",
                "",
            ]
        )
        self.assertEqual([row["role"] for row in rows(text)], ["transport_write", "binding", "event_read"])

    def test_serializer_must_copy_four_bytes(self) -> None:
        elf = CENSUS.read_pinned(CENSUS.ELF_REL, CENSUS.ELF_SHA256, CENSUS.ELF_BYTES)
        text = bytearray(CENSUS.text_section(elf))
        CENSUS.assert_word_protocol(bytes(text))
        # 把加载后的栈写入改成比较。字段值一旦被拿去分支，搬运结论就不成立。
        self.assertEqual(text[0x66EF8], 0x63)
        text[0x66EF8] = 0x15
        with self.assertRaises(SystemExit):
            CENSUS.assert_word_protocol(bytes(text))

    def test_event_store_must_not_become_a_compare(self) -> None:
        elf = CENSUS.read_pinned(CENSUS.ELF_REL, CENSUS.ELF_SHA256, CENSUS.ELF_BYTES)
        text = bytearray(CENSUS.text_section(elf))
        self.assertEqual(text[0xCED0], 0x63)
        text[0xCED0] = 0x15
        with self.assertRaises(SystemExit):
            CENSUS.assert_word_protocol(bytes(text))

    def test_checked_add_is_not_silently_accepted_as_the_u32(self) -> None:
        elf = CENSUS.read_pinned(CENSUS.ELF_REL, CENSUS.ELF_SHA256, CENSUS.ELF_BYTES)
        text = bytearray(CENSUS.text_section(elf))
        # 溢出检查若不再比较“和”与加数，这条 8 字节加法就不能再被排除。
        self.assertEqual(text[0x14DF0], 0xAD)
        text[0x14DF0] = 0x05
        with self.assertRaises(SystemExit):
            CENSUS.assert_word_protocol(bytes(text))

    def test_recorded_survey_matches_the_image_and_source(self) -> None:
        fresh = CENSUS.build_survey(CENSUS.ROOT)
        recorded = json.loads((PACKAGE / "survey.json").read_text())
        self.assertEqual(recorded, fresh)
        self.assertEqual(fresh["business_read_count"], 0)
        self.assertEqual(fresh["history"]["series"], [8000] * 10)
        self.assertEqual(fresh["history"]["none_arg_count"], 4)
        names = [site["name"] for site in fresh["word_sites"]]
        self.assertEqual(
            names,
            ["setter_store", "account_serializer_load", "account_decoder_store", "update_event_load"],
        )
        self.assertEqual(fresh["not_claimed"], ["field_3"])


if __name__ == "__main__":
    unittest.main()
