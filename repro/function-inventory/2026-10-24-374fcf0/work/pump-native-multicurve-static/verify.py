#!/usr/bin/env python3
"""Verify saved static bytes and prior-receipt summaries; do not execute programs."""
from pathlib import Path
import hashlib,json,struct
W=Path(__file__).resolve().parent;R=W.parents[1];sha=lambda b:hashlib.sha256(b).hexdigest()
seal=json.loads((W/'manifest-sha256.json').read_text())
for name,h in seal.items():assert sha((W/name).read_bytes())==h,name
inputs=json.loads((W/'input-sha256.json').read_text())
for name,h in inputs.items():assert sha((R/name).read_bytes())==h,name
for row in json.loads((W/'windows.json').read_text()):
 data=(R/f"evidence/original/{row['program']}/deployed.so").read_bytes();assert sha(data[row['start']:row['end']])==row['raw_sha256']and row['entry_bounded']
 window=json.loads((W/f"{row['program']}-{row['label']}.json").read_text())
 for ins in window['instructions']:
  raw=bytes.fromhex(ins['raw']);assert data[ins['at']:ins['at']+len(raw)]==raw
  if 'branch_target'in ins:assert ins['branch_target']==ins['at']+8+8*struct.unpack_from('<h',raw,2)[0]
rows=json.loads((W/'saved-caller-evidence.json').read_text());assert (rows['partial_cases'],rows['partial_pump_cpi_cases'],rows['partial_successes'])==(56,50,11)
assert all(c['flags']==[3]and c['groups']==1 and c['global_config_is_canonical']for r in rows['partial_rows']for c in r['pump_calls'])
mixed=next(r for r in rows['amm_rows']if r['case']=='mixed-direction');assert not mixed['pump_calls']and'6086'in mixed['error']
assert {tuple(c['flags'])for r in rows['amm_rows']for c in r['pump_calls']}=={(1,2),(2,1)}
assert all(c['groups']==2 and c['global_config_is_canonical']for r in rows['amm_rows']for c in r['pump_calls'])
print(json.dumps({'sealed_payload_files':len(seal),'original_windows':4,'existing_partial_cases':56,'existing_two_curve_cases':16,'new_runtime_cases':0,'program_source_edits':0,'full_routing_resolved':False,'native_only_scope_can_support_successful_multicurve':False},indent=2))
