"""UNRUN proposal: opt-in exact main source/document overlay; no build or git action."""
from pathlib import Path
import argparse,hashlib,json,shutil
P=Path(__file__).resolve().parent
H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
def main():
 p=argparse.ArgumentParser();p.add_argument('--repo',type=Path,required=True);p.add_argument('--execute',action='store_true');args=p.parse_args();r=args.repo.resolve();w=r/'work/pump-buy-fee-basis-main'
 base=json.loads((P/'baseline-source-sha256.json').read_text());source=json.loads((P/'source-sha256.json').read_text());assert len(base)==len(source)==37
 assert [n for n in base if base[n]!=source[n]]==['programs/pump/src/trade.rs']
 for n,h in base.items():assert H(r/n)==h,n
 assert H(P/'source/programs/pump/src/trade.rs')==source['programs/pump/src/trade.rs']
 assert H(r/'programs/pump/README.md')==H(P/'README.before.md')
 record={'status':'UNRUN' if not args.execute else 'overlay_applied_main_build_not_run','source_sha256':source,'documentation_sha256':{'programs/pump/README.md':H(P/'README.proposed.md')},'overlay':['programs/pump/src/trade.rs'],'source_build_candidate_sha256':H(P/'candidate.so'),'next':'Run build_main_once.py once; require exact stripped and symbol identity to tested scratch; preserve any mismatch without retry.'}
 if args.execute:
  assert not w.exists();w.mkdir();shutil.copyfile(P/'source/programs/pump/src/trade.rs',r/'programs/pump/src/trade.rs');shutil.copyfile(P/'README.proposed.md',r/'programs/pump/README.md');(w/'promotion.json').write_text(json.dumps(record,indent=2)+'\n')
 print(json.dumps(record,indent=2))
if __name__=='__main__':main()
