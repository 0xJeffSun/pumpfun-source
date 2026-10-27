"""Mutation controls for exact source edits and live Source records."""
from pathlib import Path
import copy,gzip,hashlib,importlib.util,io,json,shutil,struct,tarfile,tempfile,unittest
P=Path(__file__).resolve().parent
sp=importlib.util.spec_from_file_location('origins_tests',P/'verify.py');v=importlib.util.module_from_spec(sp);sp.loader.exec_module(v)

def seal(p):
 (p/'manifest.json').write_text(json.dumps({str(x.relative_to(p)):v.sha(x.read_bytes())for x in p.rglob('*')if x.is_file()and x!=p/'manifest.json'and'__pycache__'not in x.parts},indent=2)+'\n')
def archive(files):
 b=io.BytesIO()
 with tarfile.open(fileobj=b,mode='w')as t:
  for n,data in sorted(files.items()):i=tarfile.TarInfo(n);i.size=len(data);t.addfile(i,io.BytesIO(data))
 return gzip.compress(b.getvalue(),mtime=0)

class Scope(unittest.TestCase):
 @classmethod
 def setUpClass(cls):
  cls.candidate=v.raw(P/'artifacts/recovered/candidate.so.gz');cls.symbols=v.raw(P/'artifacts/recovered/symbols.so.gz');cls.data=v.load(P/'data.json');cls.parent=v.module('origin_parent_tests',v.B/'verify.py');cls.proof=v.module('origin_data_tests',P/'data.py')
 def corrupt_source(self,change):
  with tempfile.TemporaryDirectory()as td:
   p=Path(td);shutil.copytree(P,p,dirs_exist_ok=True);files=self.parent.archived(p/'source.tar.gz');change(files);(p/'source.tar.gz').write_bytes(archive(files));(p/'source-inputs.json').write_text(json.dumps({n:v.sha(b)for n,b in files.items()}));seal(p);old=v.P;v.P=p
   try:
    with self.assertRaises(AssertionError):v.verify(runtime=False)
   finally:v.P=old
 def test_unrelated_source_edit_rejected(self):self.corrupt_source(lambda x:x.__setitem__('src/lib.rs',b'// unrelated\n'+x['src/lib.rs']))
 def test_unused_amount_helper_rejected(self):self.corrupt_source(lambda x:x.__setitem__('src/instructions/sell_pump_swap.rs',x['src/instructions/sell_pump_swap.rs'].replace(b'let (sol,tokens)=super::pump_amm_interface::sold_amounts(before_sol,after_quote,before_tokens,a.mayhem_token_vault.amount);',b'let sol=after_quote-before_sol;let tokens=before_tokens-a.mayhem_token_vault.amount;')))
 def damaged_data(self,at):
  b=bytearray(self.symbols);struct.pack_into('<I',b,at+16,109)
  with tempfile.TemporaryDirectory()as td:
   p=Path(td)/'symbols.so';p.write_bytes(b)
   with self.assertRaises(AssertionError):self.proof.inspect(p)
 def test_sell_source_line_rejected(self):self.damaged_data(self.data['sell']['candidate_sources'][0]['target'])
 def test_retained_source_line_rejected(self):self.damaged_data(self.data['retained']['handlers'][0]['matching_source_records'][0]['target'])
 def test_missing_trade_case_rejected(self):
  r=v.load(P/'runtime/buy.json.gz');r['cases'].pop();r['case_count']-=1
  with self.assertRaises(AssertionError):self.parent.check_trade_receipts('buy',r,self.candidate,v.R)
 def test_altered_trade_input_rejected(self):
  r=v.load(P/'runtime/buy-v2-native.json.gz');r['cases'][0]['case']['token_quote']=True
  with self.assertRaises(AssertionError):self.parent.check_trade_receipts('buy-v2-native',r,self.candidate,v.R)

if __name__=='__main__':unittest.main()
