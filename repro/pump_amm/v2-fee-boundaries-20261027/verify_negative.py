from pathlib import Path
import hashlib,importlib.util,json
HERE=Path(__file__).resolve().parent;ROOT=HERE.parents[2]
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def main():
 d=HERE/'negative';assert sha(d/'manifest.json')=='6a20eb54c2c5ec6b9a15451780c226f44c5323ca217b39716e1b3cd40a3fc9e0'
 entries=json.loads((d/'manifest.json').read_text());assert set(entries)|{'manifest.json'}=={str(p.relative_to(d))for p in d.rglob('*')if p.is_file()}
 for name,value in entries.items():assert sha(d/name)==value
 record=json.loads((d/'intermediate/build/build-comparison.json').read_text());assert record['returncode']==0 and record['source_unchanged'] and record['source_sha256']==record['source_after_sha256']
 assert record['dependency_cache_before']==record['dependency_cache_after'];assert record['unstripped_sha256']==sha(d/'intermediate/build/unstripped.so');assert record['build_log_sha256']==sha(d/'intermediate/build/build.log')
 for name,value in record['source_sha256'].items():assert sha(d/'intermediate/source/programs/pump-amm'/name.split('programs/pump-amm/',1)[1])==value
 s=importlib.util.spec_from_file_location('v',HERE/'verify.py');v=importlib.util.module_from_spec(s);s.loader.exec_module(v)
 for name,producer,count,bad,candidate in [('boundary','probe.py',72,11,ROOT/'repro/pump_amm/parallel-order-recovery-20261027/results/build/candidate.so'),('transfer','probe_transfer.py',4,1,ROOT/'repro/pump_amm/parallel-order-recovery-20261027/results/build/candidate.so'),('order','probe_order.py',144,44,d/'intermediate/build/candidate.so'),('validation-order','probe_validation_order.py',252,69,d/'intermediate/build/candidate.so')]:
  assert name in ['boundary','transfer']or sha(candidate)==record['comparison']['candidate_sha256'];r=v.verify(d/(name+'.json.gz'),d/(name+'-transactions.json.gz'),candidate,producer,count,bad);print(name,r['cases'],len(r['mismatches']))
if __name__=='__main__':main()
