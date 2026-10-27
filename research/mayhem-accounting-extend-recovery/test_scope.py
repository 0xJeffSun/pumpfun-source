"""Actual in-memory mutation controls; captured inputs are never edited."""
from pathlib import Path
import argparse,base64,copy,difflib,gzip,hashlib,importlib.util,io,json,struct,tarfile,tempfile,unittest
P=Path(__file__).resolve().parent
spec=importlib.util.spec_from_file_location('extend_verified_tests',P/'verify.py');v=importlib.util.module_from_spec(spec);spec.loader.exec_module(v)
ROOT=P.parents[1]

def archive(files):
 b=io.BytesIO()
 with tarfile.open(fileobj=b,mode='w')as t:
  for n,data in sorted(files.items()):x=tarfile.TarInfo(n);x.size=len(data);t.addfile(x,io.BytesIO(data))
 return gzip.compress(b.getvalue(),mtime=0)

class Scope(unittest.TestCase):
 @classmethod
 def setUpClass(cls):
  cls.original=(ROOT/'evidence/original/mayhem/deployed.so').read_bytes();cls.symbols=v.raw(P/'artifacts/recovered/symbols.so.gz');cls.candidate=v.raw(P/'artifacts/recovered/candidate.so.gz');cls.parent=v.raw(P/'artifacts/parent/symbols.so.gz');cls.rt=v.load(P/'runtime/extend.json.gz');cls.helper=v.module('extend_helper_test',P/'helper.py');cls.progress=v.module('extend_progress_test',P/'progress.py');cls.h=v.load(P/'helper.json');cls.audit=v.load(P/'audit.json')
 def damaged(self,offset,data):
  b=bytearray(self.symbols);b[offset:offset+len(data)]=data;return bytes(b)
 def reject_helper(self,offset,data):
  with self.assertRaises((AssertionError,KeyError,StopIteration,UnicodeError,struct.error)):self.helper.inspect(self.original,self.damaged(offset,data))
 def test_unchanged_control(self):self.assertEqual(self.helper.inspect(self.original,self.symbols),self.h)
 def test_opcode(self):self.reject_helper(self.h['candidate_start'],b'\x18')
 def test_direct_call_target(self):
  c=self.h['direct_calls'][0];pc=self.h['candidate_start']+c['offset'];self.reject_helper(pc+4,struct.pack('<i',(self.h['candidate_start']-pc-8)//8))
 def test_error_discriminant(self):
  d=next(d for d in self.h['data']if d['offset']==296);self.reject_helper(d['candidate_target'],struct.pack('<I',17))
 def test_vtable_route(self):
  d=next(d for d in self.h['data']if d['offset']==344);self.reject_helper(d['candidate_target']+28,struct.pack('<I',self.h['candidate_start']))
 def test_panic_source_line(self):
  d=next(d for d in self.h['data']if d['offset']==4240);self.reject_helper(d['candidate_target']+16,struct.pack('<I',95))
 def test_counted_message_byte(self):
  d=next(d for d in self.h['data']if d['offset']==712);self.reject_helper(d['candidate_target'],b'X')
 def test_parent_candidate(self):
  with self.assertRaises(AssertionError):v.check_receipts(self.rt,v.raw(P/'artifacts/parent/candidate.so.gz'))
 def test_missing_case(self):
  r=copy.deepcopy(self.rt);r['cases'].pop();r['case_count']-=1
  with self.assertRaises(AssertionError):v.check_receipts(r,self.candidate)
 def test_duplicate_case(self):
  r=copy.deepcopy(self.rt);r['cases'][-1]=copy.deepcopy(r['cases'][0])
  with self.assertRaises(AssertionError):v.check_receipts(r,self.candidate)
 def test_invalid_signature(self):
  r=copy.deepcopy(self.rt);row=r['cases'][0];b=bytearray(base64.b64decode(row['original_transaction_base64']));b[1]^=1
  row['original_transaction_base64']=row['candidate_transaction_base64']=base64.b64encode(b).decode()
  with self.assertRaises(AssertionError):v.check_receipts(r,self.candidate)
 def test_account_effect(self):
  r=copy.deepcopy(self.rt);r['cases'][0]['candidate']['accounts']['user']['lamports']+=1
  with self.assertRaises(AssertionError):v.check_receipts(r,self.candidate)
 def test_diagnostic_not_hidden(self):
  r=copy.deepcopy(self.rt);r['cases'][0]['candidate']['logs'].append('deliberate diagnostic change')
  with self.assertRaises(AssertionError):v.check_receipts(r,self.candidate)
 def test_nested_manifest_rejected(self):
  with tempfile.TemporaryDirectory()as td:
   p=Path(td);(p/'manifest.json').write_text('{}');(p/'nested').mkdir();(p/'nested/manifest.json').write_text('{}')
   with self.assertRaises(AssertionError):v.check_manifest(p)
 def test_trade_case_parameters(self):
  report=copy.deepcopy(v.load(P/'runtime/buy.json.gz'));row=report['cases'][0]
  for case in [row['case'],row['original']['case'],row['candidate']['case']]:case['unrecorded_amount']=123
  with self.assertRaises(AssertionError):v.check_trade_receipts('buy',report,self.candidate,ROOT)
 def test_trade_nested_case(self):
  report=copy.deepcopy(v.load(P/'runtime/buy.json.gz'));report['cases'][0]['original']['case']['unrecorded_amount']=123
  with self.assertRaises(AssertionError):v.check_trade_receipts('buy',report,self.candidate,ROOT)
 def test_archive_traversal(self):
  with tempfile.TemporaryDirectory()as t:
   p=Path(t)/'source.tar.gz';p.write_bytes(archive({'../outside':b'bad'}))
   with self.assertRaises(AssertionError):v.archived(p)
 def test_resealed_unrelated_source(self):
  with tempfile.TemporaryDirectory()as t:
   p=Path(t)
   for name in ['source.tar.gz','parent-source.tar.gz','source-inputs.json','parent-source-inputs.json','source-delta.json','source.patch']:(p/name).write_bytes((P/name).read_bytes())
   files=v.archived(p/'source.tar.gz');files['src/lib.rs']=b'// unrelated edit\n'+files['src/lib.rs'];(p/'source.tar.gz').write_bytes(archive(files));(p/'source-inputs.json').write_text(json.dumps({n:v.sha(b)for n,b in files.items()}));before=v.archived(p/'parent-source.tar.gz')
   for n in v.load(p/'source-delta.json')['overrides']+v.load(p/'source-delta.json')['added']:
    dest=p/'overrides'/n;dest.parent.mkdir(parents=True,exist_ok=True);dest.write_bytes(files[n])
   patch=''.join(''.join(difflib.unified_diff(before.get(n,b'').decode().splitlines(True),files[n].decode().splitlines(True),fromfile='a/'+n,tofile='b/'+n))for n in sorted(files)if before.get(n)!=files[n]);(p/'source.patch').write_text(patch)
   with self.assertRaises(AssertionError):v.source_inputs(p)
 def test_positive_edge_loss(self):
  rows=[r for r in self.audit['rows']if r['id']!='O0072'and r['counterpart_count']==1]
  r=next(r for r in rows if any(e['status']=='matching_target_shape'for e in r['counterparts'][0]['direct_edges']));c=r['counterparts'][0];e=next(e for e in c['direct_edges']if e['status']=='matching_target_shape');pc=c['start']+e['offset'];target=self.h['candidate_start'];bad=self.damaged(pc+4,struct.pack('<i',(target-pc-8)//8))
  with self.assertRaises(AssertionError):self.progress.compare(self.original,self.parent,bad)
 def test_existing_source_profile_loss(self):
  reader=v.module('source_mutation_reader',P/'reader.py')
  with tempfile.TemporaryDirectory()as td:
   p=Path(td)/'symbols.so';p.write_bytes(self.symbols);e=reader.Elf(p)
   row=next(r for r in self.audit['rows']if r['id']=='O0003');c=row['counterparts'][0];w=e.window(c['start'],c['end']);found=None
   for d in w['data_references']:
    at=d['target']
    if at not in e.rel:continue
    low,pay=struct.unpack_from('<II',e.b,at);n,line,col=struct.unpack_from('<QII',e.b,at+8)
    if low==0 and 0<n<300 and 0<line<100000 and 0<col<1000 and e.b[pay:pay+n].endswith(b'.rs\0'):found=(at,line);break
   self.assertIsNotNone(found);at,line=found;bad=self.damaged(at+16,struct.pack('<I',line+1))
   with self.assertRaises(AssertionError):self.progress.compare(self.original,self.parent,bad)
 def test_accounting_error_data(self):
  h=v.load(P/'accounting.json');d=next(r for r in h['data']if r['kind']=='u32 MayhemError discriminant');bad=self.damaged(d['candidate'],struct.pack('<I',123))
  with self.assertRaises(AssertionError):v.module('accounting_test',P/'accounting.py').inspect(self.original,bad)
 def test_accounting_callee(self):
  h=v.load(P/'accounting.json');edge=h['direct_calls'][0];pc=h['candidate_start']+edge['offset'];bad=self.damaged(pc+4,struct.pack('<i',(h['candidate_start']-pc-8)//8))
  with self.assertRaises(AssertionError):v.module('accounting_call_test',P/'accounting.py').inspect(self.original,bad)
 def test_amm_actual_transfer(self):
  h=v.load(P/'amm-transfer.json');pc=h['candidate_handler'][0]+h['candidate_call_offset'];bad=self.damaged(pc+4,struct.pack('<i',(self.h['candidate_start']-pc-8)//8))
  with self.assertRaises(AssertionError):v.module('amm_transfer_test',P/'amm_transfer.py').inspect(self.original,bad)
 def test_raw_body_loss(self):
  r=next(r for r in self.audit['rows']if r['status']=='raw_local_match');bad=bytearray(self.symbols)
  for at in {c['start']for c in r['counterparts']if c['raw_body_equal']}:bad[at]^=1
  with self.assertRaises(AssertionError):self.progress.compare(self.original,self.parent,bytes(bad))

if __name__=='__main__':
 p=argparse.ArgumentParser(add_help=False);p.add_argument('--repository-root',type=Path,default=ROOT);a,rest=p.parse_known_args();ROOT=a.repository_root.resolve();unittest.main(argv=[__file__]+rest)
