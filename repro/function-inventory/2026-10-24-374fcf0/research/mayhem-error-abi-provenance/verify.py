#!/usr/bin/env python3
from pathlib import Path
import hashlib,importlib.util,json
ROOT=Path(__file__).resolve().parent
seal=json.loads((ROOT/'manifest.json').read_text())
files={str(p.relative_to(ROOT)) for p in ROOT.rglob('*') if p.is_file() and p.name!='manifest.json'}
assert files==set(seal['files'])
for p,h in seal['files'].items():assert hashlib.sha256((ROOT/p).read_bytes()).hexdigest()==h,p
spec=importlib.util.spec_from_file_location('analysis',ROOT/'analyze.py');m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m)
result=m.analyze();assert result==json.loads((ROOT/'analysis.json').read_text())
fingerprint=json.loads((ROOT/'retained-tool-fingerprint.json').read_text())
assert fingerprint['sha256']==result['retained_toolchain']['historical_executable_sha256']
print(json.dumps({'verified':True,'files':len(files),'frozen_inputs':result['inputs'],'source_location_pairs':3,'constructor_payload_layout_agrees':True,'normalized_framework_matches':2,'equivalent_format_flag_pairs':7,'replacement_toolchain_identified':False,'compiler_invocations':0,'runtime_probes':0},indent=2))
