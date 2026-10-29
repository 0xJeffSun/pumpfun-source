"""The 20-offset display cap must not decide the struct size."""
import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import correct

ROOT = correct.ROOT
PROGRAMS = ('pump', 'pump_amm', 'pump_fees', 'mayhem')


def elf_for(program):
    from window_elf_reader import Elf
    return Elf(ROOT / 'evidence/original' / program / 'deployed.so')


class StructSizeTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.archived = correct.archived_module()
        cls.corrected = correct.corrected_module()

    def test_archived_helper_is_bound(self):
        raw = correct.HELPER.read_bytes()
        self.assertEqual(
            __import__('hashlib').sha256(raw).hexdigest(),
            '805379ab5b529f77fd9207155f3bf0f19442a818749d3a55152f83007b861310',
        )
        self.assertEqual(raw.replace(b'\r\n', b'\n').decode().count(correct.BEFORE), 1)

    def test_display_cap_understates_positive_sizes(self):
        totals = {}
        for program in PROGRAMS:
            elf = elf_for(program)
            before = self.archived.recover_anchor_idl(elf)['deserialization_patterns']
            after = self.corrected.recover_anchor_idl(elf)['deserialization_patterns']
            self.assertEqual(len(before), len(after))
            changed = 0
            for old, new in zip(before, after):
                self.assertEqual(old['field_offsets'], new['field_offsets'])
                self.assertEqual(old['window'], new['window'])
                self.assertEqual(old['base_reg'], new['base_reg'])
                if old['likely_struct_size'] != new['likely_struct_size']:
                    changed += 1
                    if old['likely_struct_size'] > 0:
                        self.assertGreater(new['likely_struct_size'], old['likely_struct_size'])
            totals[program] = changed
            self.assertGreater(changed, 0)
        self.assertGreater(totals['pump'], 0)
        # The witness is inside the returned prefix.
        elf = elf_for('pump')
        rows = [
            (old, new)
            for old, new in zip(
                self.archived.recover_anchor_idl(elf)['deserialization_patterns'],
                self.corrected.recover_anchor_idl(elf)['deserialization_patterns'],
            )
            if old['window'] == '0xfbc0' and old['base_reg'] == 3
        ]
        self.assertEqual(len(rows), 1)
        self.assertEqual(rows[0][0]['likely_struct_size'], 215)
        self.assertEqual(rows[0][1]['likely_struct_size'], 231)

    def test_inferred_size_set_grows_when_the_cap_is_removed(self):
        elf = elf_for('pump')
        before = set(self.archived.recover_anchor_idl(elf)['inferred_struct_sizes'])
        after = set(self.corrected.recover_anchor_idl(elf)['inferred_struct_sizes'])
        self.assertIn(215, before)
        self.assertIn(231, after)
        self.assertFalse(before == after)


if __name__ == '__main__':
    unittest.main()
