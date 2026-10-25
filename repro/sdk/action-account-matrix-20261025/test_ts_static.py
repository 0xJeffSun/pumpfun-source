"""Compiler/JS-free regression fixtures for balanced declaration extraction."""
import unittest
from ts_static import exported_const_declarations
class DeclarationTests(unittest.TestCase):
 def extract(self,s):return [(d['name'],s[d['start']:d['end']])for d in exported_const_declarations(s)]
 def test_block_arrow_inner_semicolon(self):
  s='export const f = (x: number) => { const y = x + 1; return y; };\nexport const next = 2;'
  self.assertEqual(self.extract(s),[('f',s.split('\n')[0]),('next','export const next = 2;')])
 def test_strings_comments_and_nested_braces(self):
  s='export const f = () => { /* }; fake; */ const a = "};\\\";"; // };\n return {v: [a, ";"], x: () => { return 1; }}; };'
  self.assertEqual(self.extract(s),[('f',s)])
 def test_template_literal(self):
  s='export const text = `a;{} ${ignored}`; export const n = 1;'
  self.assertEqual(self.extract(s),[('text','export const text = `a;{} ${ignored}`;'),('n','export const n = 1;')])
 def test_top_level_only_and_comment_decoy(self):
  s='// export const fake = 1;\nnamespace N { export const inner = 2; }\nexport const real = [1,2];'
  self.assertEqual(self.extract(s),[('real','export const real = [1,2];')])
 def test_nested_call_object_and_regex(self):
  s='export const f = fn({p: /[;}]/, q: () => { return ";"; }});'
  self.assertEqual(self.extract(s),[('f',s)])
 def test_missing_top_level_terminator_rejected(self):
  with self.assertRaises(ValueError):self.extract('export const f = () => { return 1; }')
 def test_missing_terminator_before_next_export_rejected(self):
  with self.assertRaises(ValueError):self.extract('export const a = 1\nexport const b = 2;')
 def test_authenticated_relay_arrow_declarations(self):
  from analyze_sdk import archives
  s=archives()['pump']['package/src/pda.ts'].decode()
  declarations={d['name']:s[d['start']:d['end']]for d in exported_const_declarations(s)}
  for name,seed in [('donationRelayEpochTrackerPda','epoch_tracker_v1'),('donationRelayDebouncerPda','debouncer_v1')]:
   declaration=declarations[name]
   self.assertTrue(declaration.endswith('\n};'))
   self.assertIn('return donationRelayPda(',declaration)
   self.assertIn(seed,declaration)
if __name__=='__main__':unittest.main()
