from pathlib import Path
import json,gzip,subprocess,hashlib,shutil
R=Path.cwd();W=Path(__file__).resolve().parent;P=R/'repro/pump_amm/claim-self-transfer-v144';L=json.load(gzip.open(P/'inventory/after/residual-ledger.json.gz'));H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();out={}
for side,roots in [('original',[0xe70b8,0xd3120,0x5dc20,0x10608,0x6168,0xd44e0,0xd47b8,0x48b8]),('candidate',[0x95ed8,0x58568,0xaeee8,0xe3b8,0x5f38,0x57c28,0x57f00,0x4d58])]:
 rows={r['start']:r for r in L[side]};targets=set(roots)
 for a in roots:targets.update(c['target']for c in rows[a]['direct_calls'])
 out[side]=[rows[a]for a in sorted(targets)if a in rows];d=W/side;d.mkdir(exist_ok=True)
 for a in roots:
  r=rows[a];z=subprocess.run(['/Users/shawwalters/.cache/solana/v1.54/platform-tools/llvm/bin/llvm-objdump','-d','--start-address='+str(a),'--stop-address='+str(r['end']),str(R/'evidence/original/pump_amm/deployed.so'if side=='original'else P/'unstripped.so')],capture_output=True);assert z.returncode==0;(d/(hex(a)+'.asm')).write_bytes(z.stdout)
(W/'rows.json').write_text(json.dumps(out,indent=2)+'\n');s=(P/'source/programs/pump-amm/src/incentives.rs').read_text();a=s.index('pub struct SyncUserVolumeAccumulator');b=s.index('fn reset(',a);old=s[a:b];new=old.replace("pub user:UncheckedAccount<'info>","pub user:AccountInfo<'info>").replace("pub global_volume_accumulator:Box<Account<'info,GlobalVolumeAccumulator>>","pub global_volume_accumulator:Account<'info,GlobalVolumeAccumulator>");assert new!=old;(W/'before.rs').write_text(s);(W/'after.rs').write_text(s[:a]+new+s[b:]);z=subprocess.run(['diff','-u','--label','a/programs/pump-amm/src/incentives.rs','--label','b/programs/pump-amm/src/incentives.rs',str(W/'before.rs'),str(W/'after.rs')],capture_output=True);assert z.returncode==1;(W/'proposal.patch').write_bytes(z.stdout)
macro=Path('/Users/shawwalters/.cargo/registry/src/index.crates.io-1949cf8c6b5b557f/anchor-syn-0.31.1/src/parser/accounts/event_cpi.rs');shutil.copy2(macro,W/'event_cpi.rs')
paths=[R/'evidence/original/pump_amm/deployed.so',P/'candidate.so',P/'unstripped.so',P/'inventory/after/residual-ledger.json.gz',P/'source/programs/pump-amm/src/incentives.rs'];(W/'bindings.json').write_text(json.dumps({str(p.relative_to(R)):H(p)for p in paths},indent=2)+'\n')
