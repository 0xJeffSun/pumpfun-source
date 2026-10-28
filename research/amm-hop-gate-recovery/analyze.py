"""Recompute whole-body coverage and retain the actual unresolved callee."""
from pathlib import Path
from functools import lru_cache
from collections import Counter
import gzip,hashlib,importlib.util,json,sys
HERE=Path(__file__).resolve().parent;ROOT=HERE.parents[1]
spec=importlib.util.spec_from_file_location('w',ROOT/'research/fees-composed-frontier188/window_map.py');w=importlib.util.module_from_spec(spec);spec.loader.exec_module(w)
w.m.elf_layout=lru_cache(maxsize=4)(w.m.elf_layout);w.m.relocations=lru_cache(maxsize=4)(w.m.relocations)
blobs={'original':(ROOT/'evidence/original/pump_amm/deployed.so').read_bytes()}
blobs.update({k:gzip.decompress((HERE/'builds'/k/'symbols.so.gz').read_bytes()) for k in ['baseline','candidate']})
maps={k:{f['address']:f for f in w.windows(v)} for k,v in blobs.items()};original=maps['original'][0x44ab0];targets={'original':original}
for k in ['baseline','candidate']:targets[k]=next(f for f in maps[k].values() if f['name'] and '14apply_hop_fees17h' in f['name'])
assert targets['candidate']['signature']==original['signature']!=targets['baseline']['signature']
assert original['bytes']==536 and original['instructions']==67
counts={k:[Counter(f[field] for f in maps['original'].values())&Counter(f[field] for f in fs.values()) for field in ['signature','raw_sha256']] for k,fs in maps.items()}
assert [sum(x.values()) for x in counts['baseline']]==[735,159]
assert [sum(x.values()) for x in counts['candidate']]==[736,159]
assert not counts['baseline'][0]-counts['candidate'][0] and not counts['baseline'][1]-counts['candidate'][1]
assert counts['candidate'][0]-counts['baseline'][0]==Counter({original['signature']:1})
calls={}
for k,f in targets.items():
 rows=w.m.instructions(blobs[k],f['address'],f['bytes']);assert not any('lddw_value' in row for row in rows)
 direct=[row for row in rows if 'call_target' in row];assert len(direct)==1 and direct[0]['offset']==208
 callee=maps[k][direct[0]['call_target']];calls[k]={'offset':208,'target':callee}
assert calls['original']['target']['address']==0x14088
for k in ['baseline','candidate']:assert '19select_and_apply_v217h' in calls[k]['target']['name']
assert calls['baseline']['target']['signature']==calls['candidate']['target']['signature']
assert calls['original']['target']['signature']!=calls['candidate']['target']['signature']
out={'symbols_sha256':{k:hashlib.sha256(v).hexdigest() for k,v in blobs.items()},'counts':{k:[sum(x.values()) for x in v] for k,v in counts.items()},'targets':targets,'actual_direct_call':calls,'root_data_references':0,'callee_body_matches_original':False,'whole_elf_equal':False}
if '--write' in sys.argv:(HERE/'static.json').write_bytes((json.dumps(out,indent=2)+'\n').encode())
else:assert out==json.loads((HERE/'static.json').read_bytes())
print('PASS: 735 -> 736,159raw retained; complete536B hop body; selector callee remains unmatched')
