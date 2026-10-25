from pathlib import Path
import argparse,json,hashlib,struct
W=Path(__file__).resolve().parent;H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();p=argparse.ArgumentParser();p.add_argument('--repo',type=Path);a=p.parse_args()
for n,h in json.loads((W/'manifest.json').read_text()).items():assert H(W/n)==h,n
b=json.loads((W/'bindings.json').read_text())
if a.repo:
 for n,h in b.items():assert H(a.repo/n)==h,n
 O=(a.repo/'evidence/original/pump_amm/deployed.so').read_bytes();C=(a.repo/'work/amm-claim-context-build/publication/candidate.so').read_bytes()
 I=lambda e,x:struct.unpack_from('<BBhi',e,x)
 assert I(O,0x5a9f8)==(0x0f,0x10,0,0)
 assert I(O,0x5aa10)==(0xad,0x20,1,0)
 assert I(O,0x5ab68)==(0x7a,8,0x2b8,0)
 assert I(C,0xb2540)==(0x7a,7,0x2b8,0)
 assert I(C,0xb2558)[0]==0x55
 assert O[0x11ce15:0x11ce15+18]==b'No tokens to claim'
old='    u.total_unclaimed_tokens=0;u.total_claimed_tokens+=amount;u.has_total_claimed_tokens=true;u.needs_claim=u.current_sol_volume>0;u.last_update_timestamp=timestamp;'
new='    let total_claimed_tokens=u.total_claimed_tokens+amount;\n    u.total_unclaimed_tokens=0;u.total_claimed_tokens=total_claimed_tokens;u.has_total_claimed_tokens=true;u.needs_claim=u.current_sol_volume>0;u.last_update_timestamp=timestamp;'
s=(W/'before.rs').read_text();assert s.count(old)==1;assert (W/'after.rs').read_text()==s.replace(old,new)
for r in json.loads((W/'context-preservation.json').read_text())['rows']:assert r['candidate_matches']
print('PASS: sealed evidence and narrow pre-mutation-add proposal; no compiled correction or full handler equivalence claimed')
