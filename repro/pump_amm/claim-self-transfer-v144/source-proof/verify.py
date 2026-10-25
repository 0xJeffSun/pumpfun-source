from pathlib import Path
import json,hashlib,argparse,struct
W=Path(__file__).resolve().parent;H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();p=argparse.ArgumentParser();p.add_argument('--repo',type=Path);a=p.parse_args()
for n,h in json.loads((W/'manifest.json').read_text()).items():assert H(W/n)==h,n
if a.repo:
 for n,h in json.loads((W/'bindings.json').read_text()).items():assert H(a.repo/n)==h,n
 b=(a.repo/'evidence/original/pump_amm/deployed.so').read_bytes();I=lambda x:struct.unpack_from('<BBhi',b,x)
 def call(x):assert I(x)[:2]==(0x85,0x10);return x+8+I(x)[3]*8
 assert call(0x72920)==0x6f608 and call(0x730e0)==0xf4a30
 assert call(0x6f638)==call(0x6f678)==0x1198e0
 assert I(0x6f658)==(0x55,0,0x44,0)and 0x6f660+0x44*8==0x6f880
 assert I(0x6f690)==(0x15,0,0x3d,0)and 0x6f698+0x3d*8==0x6f880
 assert I(0x6f820)==(0x62,0x0a,-0x78,0x17c7)
 assert b[0x11d020:0x11d020+36]==b'programs/pump-amm/src/utils/token.rs'
assert 'SelfTransferNotAllowed = 87' in (W/'error-source.rs').read_text()
rows=json.loads((W/'rows.json').read_text());r=next(r for r in rows['original']if r['start']==0xf4a30);assert any(m['start']==0xe5b80 and m['normalized_equal'] and m['all_immediate_targets_normalized_equal']for m in r['candidate_matches'])
s=(W/'before.rs').read_text();needle='    token_interface::transfer_checked(CpiContext::new_with_signer';at=s.index(needle,s.index('pub fn claim('));addition='    require!(ctx.accounts.global_incentive_token_account.key()!=ctx.accounts.user_ata.key() || ctx.accounts.global_incentive_token_account.owner==g.key(),PumpAmmError::SelfTransferNotAllowed);\n';assert (W/'after.rs').read_text()==s[:at]+addition+s[at:]
print('PASS: original predicate/call/data evidence, unchanged downstream CPI, single-line source proposal; no reachability or full-handler claim')
