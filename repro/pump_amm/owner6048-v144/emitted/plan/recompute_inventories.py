"""Saved-only exact existing full-inventory regeneration; no target execution."""
from pathlib import Path
import argparse,json,gzip,sys,importlib,tempfile,shutil,hashlib
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent
J=lambda p:json.loads(gzip.decompress(p.read_bytes())if p.suffix=='.gz'else p.read_bytes())
def verify(root):
 sys.path.insert(0,str(P/'inventory-method'));an=importlib.import_module('analyze');en=importlib.import_module('enrich');results=[]
 for side in['before','after']:
  frozen=root/'inventories'/side
  with tempfile.TemporaryDirectory(prefix='amm-owner-inventory-',dir=root.parent)as td:
   q=Path(td);shutil.copytree(frozen/'inputs',q/'inputs');b=q/'inputs/repro/pump_amm/update-event-borrow-v144';out=q/'analysis';an.P=q;sys.argv=['analyze','--original',str(q/'inputs/evidence/original/pump_amm/deployed.so'),'--candidate',str(b/'candidate.so'),'--symbols',str(b/'unstripped.so'),'--out',str(out)];an.main();en.P=q;en.B=b;en.A=out;en.main()
   checked=[]
   for f in sorted(out.iterdir()):
    expected=frozen/'analysis'/(f.name+'.gz'if f.suffix=='.json'else f.name);assert expected.is_file(),(side,f.name);assert(J(f)==J(expected)if f.suffix=='.json'else f.read_bytes()==expected.read_bytes()),(side,f.name);checked.append({'file':str(expected.relative_to(root)),'sha256':hashlib.sha256(expected.read_bytes()).hexdigest()})
   assert {f.name for f in(frozen/'analysis').iterdir()}=={f.name+'.gz'if f.suffix=='.json'else f.name for f in out.iterdir()};results.append({'side':side,'files':checked,'summary':J(frozen/'analysis/summary.json.gz')})
 return {'status':'PASS_SAME_METHOD_FULL_INVENTORIES','sides':results,'new_original_callee_semantic_analysis':False,'target_executions':0}
if __name__=='__main__':
 a=argparse.ArgumentParser();a.add_argument('--packet',type=Path,required=True);a.add_argument('--output',type=Path,required=True);x=a.parse_args();x.output.write_text(json.dumps(verify(x.packet.absolute()),indent=2)+'\n')
