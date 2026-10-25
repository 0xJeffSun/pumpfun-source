#!/usr/bin/env python3
"""Recompute the frozen Pump paired ledger; no build or transaction execution."""
from pathlib import Path
import argparse,gzip,hashlib,importlib,json,sys,tarfile
P=Path(__file__).resolve().parent;H=lambda b:hashlib.sha256(b).hexdigest();J=lambda p:json.loads(p.read_text())
def main():
 ap=argparse.ArgumentParser();ap.add_argument('--repo',type=Path,required=True);ap.add_argument('--check',action='store_true');args=ap.parse_args();repo=args.repo.resolve();c=J(P/'input-config.json')['pump_metadata'];refs=J(P/'external-inputs.json')
 for n,v in refs.items():assert H((repo/n).read_bytes())==v['sha256'],n
 root=repo/c['package'];manifest=J(repo/c['manifest']);assert H((repo/c['manifest']).read_bytes())==c['manifest_sha256']=='67b97bd822087687487fdb3c1d250ea6317b80340ec165e62e695e7dbc535b54'
 for n in [x for x in refs if x.startswith(c['package']+'/')and x!=c['manifest']]:
  rel=n.removeprefix(c['package']+'/');assert refs[n]['sha256']==manifest[rel]['sha256'],rel
 sys.path.insert(0,str(root));m=importlib.import_module('full_inventory');fresh=m.run();saved=json.loads(gzip.decompress((repo/c['ledger']).read_bytes()));assert fresh==saved
 source=J(repo/c['source_map']);actual=J(repo/c['actual_source_map']);assert len(source)==len(actual)==37
 with tarfile.open(repo/c['source_archive'])as t:src={x.name.removeprefix('./'):t.extractfile(x).read()for x in t if x.isfile()}
 assert{n:H(b)for n,b in src.items()}==source
 # Logical source names and the originally observed build-prefix map are both retained.
 assert sorted(actual.values())==sorted(source.values())
 before,after=saved['before'],saved['after'];assert before['candidate']['sha256']==H((repo/c['baseline_candidate']).read_bytes());assert after['candidate']['sha256']==H((repo/c['candidate']).read_bytes())
 assert before['symbol_artifact']['sha256']==H((repo/c['baseline_symbols']).read_bytes());assert after['symbol_artifact']['sha256']==H((repo/c['symbols']).read_bytes())
 rows=[]
 for old,new in zip(before['original_windows'],after['original_windows'],strict=True):
  assert all(old[k]==new[k]for k in ['start','end','raw_sha256','normalized_sha256'])
  rows.append({'start':old['start'],'end':old['end'],'before_pattern_candidates':old['pattern_candidates'],'after_pattern_candidates':new['pattern_candidates'],'before_call_consistent_candidates':old['call_consistent_candidates'],'after_call_consistent_candidates':new['call_consistent_candidates']})
 result={'scope':c['scope'],'ledger_path':c['ledger'],'ledger_sha256':H((repo/c['ledger']).read_bytes()),'scratch_manifest_sha256':c['manifest_sha256'],'before_summary':before['summary'],'after_summary':after['summary'],'original_rows':rows,'before_original':{'sha256':before['original']['sha256'],'bytes':before['original']['bytes']},'before_candidate':{'sha256':before['candidate']['sha256'],'bytes':before['candidate']['bytes']},'after_candidate':{'sha256':after['candidate']['sha256'],'bytes':after['candidate']['bytes']},'complete_data_evidence':'Every symbol/inferred row, ambiguity, call, relocation, section and positional range remains in the exact public paired ledger, recomputed here.','source_inputs':37,'historical_function_names_inferred':False,'builds':0,'target_executions':0}
 out=P/'comparisons/pump-paired.json.gz';b=(json.dumps(result,sort_keys=True,separators=(',',':'))+'\n').encode()
 if args.check:assert gzip.decompress(out.read_bytes())==b
 else:out.write_bytes(gzip.compress(b,mtime=0))
 print(json.dumps({'status':'PASS','before':result['before_summary'],'after':result['after_summary'],'scratch_manifest':c['manifest_sha256'],'source_inputs':37,'check':args.check},sort_keys=True))
if __name__=='__main__':main()
