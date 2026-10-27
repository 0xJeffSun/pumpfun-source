"""Verify the isolated, field-wise Pool decoder checkpoint without executing SBF."""
from pathlib import Path
import argparse,hashlib,importlib.util,json,gzip,subprocess,sys,tempfile
HERE=Path(__file__).resolve().parent;ROOT=HERE.parents[2]
def sha(p):return hashlib.sha256(Path(p).read_bytes()).hexdigest()
def load(p):p=Path(p);return json.loads(gzip.decompress(p.read_bytes())if p.suffix=='.gz'else p.read_bytes())
def module(name,p):s=importlib.util.spec_from_file_location(name,p);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m

def main():
 p=argparse.ArgumentParser();p.add_argument('--current-source',action='store_true');a=p.parse_args();d=HERE/'results';manifest=d/'manifest.json';assert sha(manifest)=='8041b045dcfa155bb137bf363642b13fa7dffad1b96905b390fa1703528aad2e';files=load(manifest)
 assert {str(f.relative_to(d))for f in d.rglob('*')if f.is_file()}==set(files)|{'manifest.json'}
 for name,digest in files.items():assert sha(d/name)==digest
 record=load(d/'build/build-comparison.json');candidate=d/'build/candidate.so';symbols=d/'build/unstripped.so'
 assert record['returncode']==0 and record['source_unchanged'] and record['source_sha256']==record['source_after_sha256']
 assert record['comparison']['candidate_sha256']==sha(candidate)=='891046afecd5db0484f87c8327038aedba39f7e703a2da149a4723d2e7020d69'
 assert record['unstripped_sha256']==sha(symbols) and record['build_log_sha256']==sha(d/'build/build.log')
 assert record['dependency_cache_before']==record['dependency_cache_after']
 for name,digest in record['source_sha256'].items():
  rel='programs/pump-amm/'+name.split('programs/pump-amm/',1)[1];assert sha(d/'source'/rel)==digest
  if a.current_source:assert sha(ROOT/rel)==digest
 direct=module('pool_direct',HERE/'compare_direct.py').audit(d/'runtime',sha(candidate));assert direct==load(d/'direct.json.gz') and not direct['mismatches']
 assert(direct['cases'],direct['transactions'],direct['signature_fields'])==(17462,35074,35418)
 exact=module('global_static',HERE/'verify_static.py').verify(candidate,symbols);assert exact==load(HERE/'static-evidence.json')
 pools=module('pool_static',ROOT/'repro/pump_amm/pool-layouts-agent-20261027/verify_static.py').verify(candidate,symbols);assert pools==load(HERE/'pool-static-evidence.json')
 with tempfile.TemporaryDirectory()as tmp:
  out=Path(tmp)/'measurement.json';subprocess.run([sys.executable,'-B',str(ROOT/'repro/pump_amm/focused-diagnostics-20261026/measure.py'),'--candidate',str(candidate),'--symbols',str(symbols),'--output',str(out)],check=True,stdout=subprocess.DEVNULL);assert load(out)==load(d/'measurement.json.gz')
 print(json.dumps({'candidate_sha256':sha(candidate),'normalized_matches':554,'exact_pool_readers':len(pools['readers']),'exact_global_functions':len(exact['functions']),'direct_cases':direct['cases'],'signed_transactions':direct['transactions'],'direct_mismatches':0,'current_source_checked':a.current_source,'whole_elf_equal':False}))
if __name__=='__main__':main()
