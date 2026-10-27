#!/usr/bin/env python3
from pathlib import Path
import hashlib,importlib.util,json,gzip,subprocess,sys,tempfile
HERE=Path(__file__).resolve().parent;ROOT=HERE.parents[2]
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def load(p):return json.loads(gzip.decompress(p.read_bytes())if p.suffix=='.gz'else p.read_bytes())
def main():
 d=HERE/'results';assert sha(d/'manifest.json')=='17962ad2c80093c76a2acb8e5790763042aedcb2d2cf66b8178152647b946eb9'
 manifest=load(d/'manifest.json');assert set(manifest)|{'manifest.json'}=={str(p.relative_to(d))for p in d.rglob('*')if p.is_file()}
 for name,digest in manifest.items():assert sha(d/name)==digest
 b=load(d/'build/build-comparison.json');candidate=d/'build/candidate.so';assert sha(candidate)==b['comparison']['candidate_sha256']=='fa71948adfb003ba20a4e70938edf430547e6970fea37e40a9b4e0a63ff7805c';assert b['returncode']==0 and b['source_unchanged']and b['source_sha256']==b['source_after_sha256'];assert b['dependency_cache_before']==b['dependency_cache_after'];assert sha(d/'build/unstripped.so')==b['unstripped_sha256']and sha(d/'build/build.log')==b['build_log_sha256']
 for name,digest in b['source_sha256'].items():assert sha(d/'source'/('programs/pump-amm/'+name.split('programs/pump-amm/',1)[1]))==digest
 spec=importlib.util.spec_from_file_location('liquidity_check',HERE/'verify_candidate.py');m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m)
 suite=m.check(d/'liquidity.json.gz',d/'liquidity-transactions.json.gz',candidate,680);overflow=m.check(d/'overflow.json.gz',d/'overflow-transactions.json.gz',candidate,18);assert not suite['mismatches']and not overflow['mismatches']
 with tempfile.TemporaryDirectory()as tmp:
  out=Path(tmp)/'measurement.json';subprocess.run([sys.executable,'-B',str(ROOT/'repro/pump_amm/focused-diagnostics-20261026/measure.py'),'--candidate',str(candidate),'--symbols',str(d/'build/unstripped.so'),'--output',str(out)],check=True,stdout=subprocess.DEVNULL);measurement=load(out);assert measurement==load(d/'measurement.json.gz')
 old=load(d/'base-measurement.json.gz');gain=[r for p,r in zip(old['rows'],measurement['rows'])if not p['matches']and r['matches']];loss=[p for p,r in zip(old['rows'],measurement['rows'])if p['matches']and not r['matches']];assert [r['start']for r in gain]==[0xe5278,0xe57b0]and not loss
 print(json.dumps({'candidate_sha256':sha(candidate),'normalized_matches':measurement['normalized_matches'],'gain':2,'loss':0,'liquidity':suite,'overflow':overflow}))
if __name__=='__main__':main()
