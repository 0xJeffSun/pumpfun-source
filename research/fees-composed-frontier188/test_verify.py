from pathlib import Path
import importlib.util,struct,unittest
HERE=Path(__file__).resolve().parent
s=importlib.util.spec_from_file_location('composed_verify',HERE/'verify.py');v=importlib.util.module_from_spec(s);s.loader.exec_module(v)
class Tests(unittest.TestCase):
 def test_source_scope(self):
  source=v.sources();a,b=source['baseline'],source['origins'];self.assertEqual(len(a),42);self.assertEqual(len(b),42)
  self.assertEqual(sum(a[n]!=b[n]for n in a),4);self.assertEqual(a['Cargo.lock'],b['Cargo.lock'])
 def test_social_order_and_coordinate(self):
  s=v.sources()['origins']['programs/pump-fees/src/instructions/fee_sharing/create_social_fee_pda.rs'].decode();self.assertIn('require!(user_id.len()<=20',s.splitlines()[66]);self.assertLess(s.index('version!=0'),s.index('user_id.len()<=20'))
 def test_reader_operand_mutation_is_visible(self):
  a=v.module('reader_negative',v.ROOT/'research/fees-admin-sharing-context/analyze.py');wm=a.wm
  raw=(v.ROOT/'evidence/original/pump_fees/deployed.so').read_bytes();windows=wm.windows(raw);index={r['address']:r for r in windows};before=a.reader_contract(raw,index[381352],index)
  rows={r['offset']:r for r in wm.m.instructions(raw,381352,6152)};pc=rows[1584]['call_target']+40+4
  section=next(s for s in wm.m.elf_layout(raw)['sections']if s['address']<=pc<s['address']+s['size']);offset=section['offset']+pc-section['address'];mutated=bytearray(raw);struct.pack_into('<i',mutated,offset,3006)
  after=a.reader_contract(bytes(mutated),index[381352],index);self.assertNotEqual(before,after)
if __name__=='__main__':unittest.main()
