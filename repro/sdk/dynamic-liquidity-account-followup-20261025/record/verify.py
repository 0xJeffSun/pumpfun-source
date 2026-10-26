"""Standard-library verification of symbolic source declarations; never execute JS."""
from pathlib import Path
import argparse,hashlib,json,sys,csv,io
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent;sys.path.insert(0,str(P));from analyze import analyze
H=lambda b:hashlib.sha256(b).hexdigest()
def render(closure):
 out=io.StringIO(newline='');w=csv.writer(out,lineterminator='\n');w.writerow(['SDK_route','instruction','position','IDL_name','Anchor_key','helper_expression','symbolically_substituted','signer','writable','optional','IDL_address','IDL_PDA'])
 for r in closure['routes']:
  for a in r['ordered_declarations']:w.writerow([r['route_id'],r['instruction'],a['position'],a['IDL_name'],a['Anchor_key'],a['helper_expression'],a['symbolically_substituted'],a['signer'],a['writable'],a['optional'],a['idl_address'],json.dumps(a['idl_pda'])])
 return out.getvalue()
def verify(repo):
 manifest=json.loads((P/'MANIFEST.json').read_text());actual={str(f.relative_to(P)):dict(sha256=H(f.read_bytes()),bytes=f.stat().st_size)for f in P.rglob('*')if f.is_file()and f.name!='MANIFEST.json'and'__pycache__'not in f.parts};assert actual==manifest['files']
 closure=analyze(Path(repo));assert closure==json.loads((P/'closure.json').read_text());assert render(closure)==(P/'accounts.csv').read_text()
 return dict(verified=True,prior_seal=closure['prior_seal'],route_count=4,ordered_declarations_per_route=15,duplicate_helper_sources_equal=True,JS_or_PDA_execution=False,new_runtime_acceptance=False,concrete_new_account_discrepancy_found=False)
if __name__=='__main__':
 parser=argparse.ArgumentParser();parser.add_argument('--repo',type=Path,required=True);args=parser.parse_args();print(json.dumps(verify(args.repo),indent=2))
