#!/usr/bin/env python3
"""Check current tracked bytes using canonical published files; run verify.py separately."""
from pathlib import Path
import argparse,hashlib,json,subprocess
P=Path(__file__).resolve().parent
parser=argparse.ArgumentParser(description=__doc__);parser.add_argument('--repo',type=Path,required=True);args=parser.parse_args();root=args.repo.resolve()
tracked=set(subprocess.check_output(['git','-C',str(root),'ls-files','-z']).decode().split('\0'))
groups={name:json.loads((P/name).read_text())for name in ['source-sha256.json','build-helper-sha256.json','documentation-sha256.json','published-harness-sha256.json','runtime-inputs.json']}
assert len(groups['build-helper-sha256.json'])==4 and len(groups['runtime-inputs.json'])==18
assert len(groups['source-sha256.json'])==26 and len(groups['published-harness-sha256.json'])==44
for group,entries in groups.items():
 for name,digest in entries.items():
  assert not name.startswith('work/')and name in tracked,(group,name)
  file=root/name;assert not file.is_symlink()and hashlib.sha256(file.read_bytes()).hexdigest()==digest,(group,name)
print(json.dumps({'verified':True,'program':'pump_fees','tracked_bindings_by_group':{k:len(v)for k,v in groups.items()},'recorded_work_origins_used_as_live_inputs':False,'saved_package_verifier_required_separately':True,'runtime_replayed':False},indent=2))
