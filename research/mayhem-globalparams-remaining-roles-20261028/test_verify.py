#!/usr/bin/env python3
"""Counterexamples for the GlobalParams field-role census."""

from __future__ import annotations

import importlib.util
import json
import unittest
from pathlib import Path

PACKAGE = Path(__file__).resolve().parent
SPEC = importlib.util.spec_from_file_location("field_role_census", PACKAGE / "verify.py")
CENSUS = importlib.util.module_from_spec(SPEC)
assert SPEC.loader is not None
SPEC.loader.exec_module(CENSUS)


def rows(text: str, path: str = "src/probe.rs") -> list[dict]:
    return CENSUS.occurrences_in_text(path, text)


class CensusTests(unittest.TestCase):
    def test_comment_and_string_are_not_reads(self) -> None:
        text = '\n'.join(
            [
                "fn probe() {",
                "    // global_params.field_10 is only a comment",
                '    let label = "global_params.field_0";',
                "    let interval = global_params.field_10 as i64;",
                "}",
                "",
            ]
        )
        found = rows(text)
        self.assertEqual([(row["field"], row["role"]) for row in found], [("field_10", "business_read")])

    def test_fee_recipient_timestamp_is_a_different_field(self) -> None:
        text = "\n".join(
            [
                "struct FeeRecipient { pub field_10: u64, }",
                "impl FeeRecipient {",
                "    fn validate_sweep(&mut self, global_params: &GlobalParams, native: bool) {",
                "        let last = if native {self.field_10}else{self.field_34} as i64;",
                "        if last != 0 && global_params.field_10 as i64 != 0 {",
                "            let interval = global_params.field_10 as i64;",
                "        }",
                "        if native {self.field_10=current_time as u64;}",
                "    }",
                "}",
                "",
            ]
        )
        found = {(row["owner"], row["role"]) for row in rows(text)}
        self.assertIn(("FeeRecipient", "declaration"), found)
        self.assertIn(("FeeRecipient", "recipient_read"), found)
        self.assertIn(("FeeRecipient", "recipient_write"), found)
        self.assertIn(("GlobalParams", "business_read"), found)
        self.assertNotIn(("GlobalParams", "recipient_read"), found)

    def test_assignment_and_event_projection_are_transport(self) -> None:
        text = "\n".join(
            [
                "fn update(state: &mut GlobalParams) {",
                "    state.field_10 = 1;",
                "    let event = Event { field_10: state.field_10, };",
                "}",
                "",
            ]
        )
        self.assertEqual([row["role"] for row in rows(text)], ["transport_write", "binding", "event_read"])

    def test_injected_field_0_read_is_rejected_by_the_frozen_set(self) -> None:
        text = "fn probe(global_params: &GlobalParams) { let leaked = global_params.field_0; }\n"
        found = rows(text)
        self.assertEqual(found[0]["role"], "business_read")
        self.assertNotIn(CENSUS.business_key(found[0]), CENSUS.BUSINESS_QUOTES)

    def test_admin_sweep_cannot_silently_gain_the_interval(self) -> None:
        archive = (CENSUS.ROOT / CENSUS.TAR_REL).read_bytes()
        sources = CENSUS.program_sources(archive)
        fee = sources["src/instructions/fee_recipients.rs"].decode("utf-8")
        mutated = fee.replace(
            "impl<'info> crate::SweepFeesAdmin<'info> {",
            "impl<'info> crate::SweepFeesAdmin<'info> {\n    fn sweep(&self){ recipient.validate_sweep(global_params, native)?; }\n",
            1,
        )
        self.assertNotEqual(mutated, fee)
        sources["src/instructions/fee_recipients.rs"] = mutated.encode()
        counted = []
        for path, raw in sources.items():
            counted.extend(CENSUS.occurrences_in_text(path, raw.decode("utf-8")))
        with self.assertRaises(SystemExit):
            CENSUS.assert_census(counted, sources)

    def test_recorded_survey_matches_the_archive(self) -> None:
        fresh = CENSUS.build_survey(CENSUS.ROOT)
        recorded = json.loads((PACKAGE / "survey.json").read_text())
        self.assertEqual(recorded, fresh)
        self.assertEqual(
            [item["quote"] for item in fresh["summary"]["field_10"]["business_reads"]],
            [
                "if last != 0 && global_params.field_10 as i64 != 0 {",
                "let interval = global_params.field_10 as i64;",
            ],
        )
        self.assertEqual(fresh["summary"]["field_0"]["business_reads"], [])
        self.assertEqual(fresh["summary"]["field_1"]["business_reads"], [])
        self.assertEqual(fresh["summary"]["field_3"]["business_reads"], [])


if __name__ == "__main__":
    unittest.main()
