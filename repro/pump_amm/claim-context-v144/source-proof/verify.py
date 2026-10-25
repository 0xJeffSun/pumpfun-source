from pathlib import Path
import argparse,json,hashlib
p=argparse.ArgumentParser();p.add_argument('--repo',type=Path);a=p.parse_args();w=Path(__file__).resolve().parent
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
m=json.loads((w/'manifest.json').read_text())
for n,h in m.items():assert sha(w/n)==h,n
if a.repo:
 for n,h in json.loads((w/'bindings.json').read_text()).items():assert sha(a.repo/n)==h,n
l=json.loads((w/'complete-ledger-rows.json').read_text());o={r['start']:r for r in l['original']};c={r['start']:r for r in l['candidate']}
for x,y in [(0x6168,0x5f38),(0xd47b8,0x57f00),(0x2370,0x1d50)]:
 assert any(m['start']==y and m['normalized_equal'] for m in o[x]['candidate_matches'])
 assert o[x]['normalized_sha256']==c[y]['normalized_sha256']
assert next(x for x in o[0x10608]['direct_calls'] if x['address']==0x106b0)['target']==0x6168
before=(w/'before.rs').read_text();after=(w/'after.rs').read_text();start=before.index('pub struct ClaimTokenIncentives');end=before.index('pub fn claim(',start)
r=before[start:end].replace("pub user:UncheckedAccount<'info>","pub user:AccountInfo<'info>").replace("pub global_volume_accumulator:Box<Account<'info,GlobalVolumeAccumulator>>","pub global_volume_accumulator:Account<'info,GlobalVolumeAccumulator>").replace("pub event_authority:UncheckedAccount<'info>","pub event_authority:AccountInfo<'info>")
assert after==before[:start]+r+before[end:]
assert 1336-720==(544-8)+2*(48-8)
print('PASS: seal, optional current bindings, constructor/unchecked identity and exact three-field-only proposal; no build/runtime equivalence asserted')
