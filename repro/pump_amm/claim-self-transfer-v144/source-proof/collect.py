from pathlib import Path
import gzip,json,hashlib,subprocess,sys
R=Path.cwd();W=Path(__file__).resolve().parent;P=R/'work/amm-claim-overflow-order-build/publication';L=json.load(gzip.open(P/'inventory/after/residual-ledger.json.gz'));H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
sel={}
for side,roots in [('original',[0x5a570,0x727b8,0x6f608,0xf4a30]),('candidate',[])]:
 if side=='candidate':roots=[r['start']for r in L[side]if any('pump_amm_recovered18pump_amm_recovered22claim_token_incentives17h'in n or 'anchor_spl10token_202216transfer_checked17h'in n for n in r.get('names',[]))]
 rows={r['start']:r for r in L[side]};targets=set(roots)
 for a in roots:targets.update(c['target']for c in rows[a]['direct_calls'])
 sel[side]=[rows[a]for a in sorted(targets)if a in rows]
 d=W/side;d.mkdir(exist_ok=True)
 for a in roots:
  r=rows[a];file=R/'evidence/original/pump_amm/deployed.so'if side=='original'else P/'unstripped.so';z=subprocess.run(['/Users/shawwalters/.cache/solana/v1.54/platform-tools/llvm/bin/llvm-objdump','-d','--start-address='+str(a),'--stop-address='+str(r['end']),str(file)],capture_output=True);assert z.returncode==0;(d/(hex(a)+'.asm')).write_bytes(z.stdout)
(W/'rows.json').write_text(json.dumps(sel,indent=2)+'\n');S=P/'source/programs/pump-amm/src/incentives.rs';s=S.read_text();needle='    token_interface::transfer_checked(CpiContext::new_with_signer';at=s.index(needle,s.index('pub fn claim('));addition='    require!(ctx.accounts.global_incentive_token_account.key()!=ctx.accounts.user_ata.key() || ctx.accounts.global_incentive_token_account.owner==g.key(),PumpAmmError::SelfTransferNotAllowed);\n';(W/'before.rs').write_text(s);(W/'after.rs').write_text(s[:at]+addition+s[at:]);z=subprocess.run(['diff','-u','--label','a/programs/pump-amm/src/incentives.rs','--label','b/programs/pump-amm/src/incentives.rs',str(W/'before.rs'),str(W/'after.rs')],capture_output=True);assert z.returncode==1;(W/'proposal.patch').write_bytes(z.stdout)
paths=[R/'evidence/original/pump_amm/deployed.so',P/'candidate.so',P/'unstripped.so',P/'inventory/after/residual-ledger.json.gz',S,P/'source/programs/pump-amm/src/lib.rs'];(W/'bindings.json').write_text(json.dumps({str(p.relative_to(R)):H(p)for p in paths},indent=2)+'\n')
print('Complete admitted helper windows and exact narrow source proposal retained; no build or runtime.')
