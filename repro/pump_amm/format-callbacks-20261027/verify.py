#!/usr/bin/env python3
from pathlib import Path
import hashlib,importlib.util,json
HERE=Path(__file__).resolve().parent
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def main():
 assert sha(HERE/'manifest.json')=='abc3be8f4e14e6d7ea0ab0a2221190d7d11741fabff992c7144b39cddee70a7b'
 for name,digest in json.loads((HERE/'manifest.json').read_text()).items():assert sha(HERE/name)==digest,name
 s=importlib.util.spec_from_file_location('callbacks_audit',HERE/'audit.py');m=importlib.util.module_from_spec(s);s.loader.exec_module(m);r=m.audit();assert r==json.loads((HERE/'results.json').read_text())
 print(json.dumps({'callback_contexts':len(r['contexts']),'conditional_no_effect_drop_targets':len(r['conditional_drop_resolutions']),'pad_adapter_nonmatching_methods':len(r['pad_adapter_identity_counterexample'])}))
if __name__=='__main__':main()
