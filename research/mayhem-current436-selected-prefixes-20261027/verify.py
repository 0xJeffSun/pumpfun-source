"""Recompute the bounded selected-data relation; no target code executes."""
from pathlib import Path
import gzip,hashlib,importlib.util,json
if not __debug__:raise RuntimeError('Assertions are required')
P=Path(__file__).resolve().parent;R=P.parents[1];sha=lambda b:hashlib.sha256(b).hexdigest()
def load_reader():
 s=importlib.util.spec_from_file_location('selected_prefix_reader',P/'reader.py');m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m
def inputs():return((R/'evidence/original/mayhem/deployed.so').read_bytes(),gzip.decompress((R/'research/mayhem-current436-composition-20261027/builds/first/symbols.so.gz').read_bytes()))
def verify():
 files=list(P.rglob('*'));assert not any(p.is_symlink()for p in files), 'packet symlink';assert all(p.is_file()or p.is_dir()for p in files), 'packet special file'
 assert {p.relative_to(P).as_posix():sha(p.read_bytes())for p in files if p.is_file()and p!=P/'manifest.json'}==json.loads((P/'manifest.json').read_text()), 'packet inventory differs'
 for n,h in json.loads((P/'inputs.json').read_text()).items():assert sha((R/n).read_bytes())==h,n
 result=load_reader().inspect(*inputs());assert result==json.loads((P/'observations.json').read_text());s=result['summary']
 assert(s['normalized_windows'],s['raw_windows'],s['direct_windows'],s['selected_data_windows'],s['direct_pairs'],s['selected_data_pairs'])==(436,141,429,429,601,579)
 assert(s['prefix_sites'],s['original_prefixes'],s['source_sites'],s['code_sites'])==(119,30,486,48)
 assert s['lost_direct_windows']==[] and s['rejected_direct_pairs']==22
 return s
if __name__=='__main__':print(json.dumps(verify(),indent=2))
