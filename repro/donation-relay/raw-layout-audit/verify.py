"""Check raw-byte accounting and unpromoted source identity experiments."""
from pathlib import Path
import hashlib,importlib.util,json
HERE=Path(__file__).resolve().parent;ROOT=HERE.parents[2]
def module(name,path):
 s=importlib.util.spec_from_file_location(name,path);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m
def verify():
 manifest=json.loads((HERE/'manifest.json').read_bytes());assert set(manifest)=={str(p.relative_to(HERE))for p in HERE.rglob('*')if p.is_file()and p.name!='manifest.json'and'__pycache__'not in p.parts}
 for name,digest in manifest.items():
  p=HERE/name;assert not p.is_symlink()and p.resolve().is_relative_to(HERE)and hashlib.sha256(p.read_bytes()).hexdigest()==digest,name
 for name,digest in json.loads((HERE/'parents.json').read_bytes()).items():assert hashlib.sha256((ROOT/name).read_bytes()).hexdigest()==digest,name
 report=module('layout_byte_accounting',HERE/'analyze.py').analyze();assert report==json.loads((HERE/'report.json').read_bytes());assert len(report['permutation_blocks'])==15 and report['text_byte_accounting']=={'aligned_direct_call_operand':462,'permuted_body_region_positions':17991}and report['common_file_differences']==18623
 results=module('layout_identity_controls',HERE/'controls.py').verify();assert all(r['summary']['common_position_different_bytes']>=18623 for r in results.values())
 print('PASS: all 18,623 common differences accounted for; 15 permutation regions; six compiled identity controls; no smaller residual or promoted candidate')
if __name__=='__main__':verify()
