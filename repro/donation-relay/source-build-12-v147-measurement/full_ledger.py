"""Exact retained build12 full-ledger method with explicit read-only input map."""
from pathlib import Path
import gzip,importlib.util,json
P=Path(__file__).resolve().parent;R=next(p for p in P.parents if(p/'repro/programs.json').is_file());spec=importlib.util.spec_from_file_location('sealed_build12_ledger',P/'reference-build12-analyze.py');method=importlib.util.module_from_spec(spec);spec.loader.exec_module(method)
class Inputs:
 def __truediv__(self,name):return{'original.so':R/'evidence/dependencies/donation_relay/deployed.so','candidate.so':P/'build-01/candidate.so','unstripped.so':P/'build-01/unstripped.so','original-windows.json':P/'original-windows.json'}[name]
def analyze():return method.analyze(Inputs())
if __name__=='__main__':
 out=analyze();folder=P/'full-ledger';folder.mkdir(exist_ok=False)
 for name,value in out.items():
  data=method.encode(value)
  if name.endswith('.gz'):data=gzip.compress(data,mtime=0)
  (folder/name).write_bytes(data)
 print(json.dumps(out['comparison-summary.json'],indent=2))
