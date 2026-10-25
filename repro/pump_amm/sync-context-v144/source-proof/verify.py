from pathlib import Path
import json,hashlib,struct,argparse
W=Path(__file__).resolve().parent;H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();p=argparse.ArgumentParser();p.add_argument('--repo',type=Path);a=p.parse_args()
for n,h in json.loads((W/'manifest.json').read_text()).items():assert H(W/n)==h,n
if a.repo:
 for n,h in json.loads((W/'bindings.json').read_text()).items():assert H(a.repo/n)==h,n
 o=(a.repo/'evidence/original/pump_amm/deployed.so').read_bytes();c=(a.repo/'repro/pump_amm/claim-self-transfer-v144/candidate.so').read_bytes();I=lambda b,x:struct.unpack_from('<BBhi',b,x)
 def call(b,x):assert I(b,x)[:2]==(0x85,0x10);return x+8+I(b,x)[3]*8
 assert o[0x11e8e6:0x11e8e6+38]==b'Instruction: SyncUserVolumeAccumulator'
 assert call(o,0xe7160)==0xd3120 and call(o,0xd3290)==0x10608
 assert I(o,0xe71a8)==(0xb7,3,0,0x2fa)and I(c,0x95fd0)==(0xb7,3,0,0xba)
 assert I(o,0xd32f0)==(0xb7,3,0,0x208)and I(c,0x586e0)==(0xb7,2,0,0x220)
 assert I(o,0xd42c8)==(7,1,0,0x230)
rows=json.loads((W/'rows.json').read_text());o={r['start']:r for r in rows['original']}
for x,y in [(0x6168,0x5f38),(0xd47b8,0x57f00),(0x48b8,0x4d58)]:assert any(m['start']==y and m['normalized_equal']for m in o[x]['candidate_matches'])
assert 784-208==(544-8)+(48-8)
macro=(W/'event_cpi.rs').read_text();assert 'pub #authority_name: AccountInfo<#info_lifetime>'in macro and 'pub program: AccountInfo<#info_lifetime>'in macro
s=(W/'before.rs').read_text();a=s.index('pub struct SyncUserVolumeAccumulator');b=s.index('fn reset(',a);new=s[a:b].replace("pub user:UncheckedAccount<'info>","pub user:AccountInfo<'info>").replace("pub global_volume_accumulator:Box<Account<'info,GlobalVolumeAccumulator>>","pub global_volume_accumulator:Account<'info,GlobalVolumeAccumulator>");assert (W/'after.rs').read_text()==s[:a]+new+s[b:]
print('PASS: exact sync log/constructor/member-size/macro evidence and two-declaration-only proposal; no build or runtime equivalence asserted')
