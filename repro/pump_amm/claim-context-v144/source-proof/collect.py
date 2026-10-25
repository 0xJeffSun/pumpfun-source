from pathlib import Path
import json,gzip,struct,sys,subprocess,hashlib,shutil
R=Path.cwd();W=R/'work/amm-claim-member-map';P=R/'repro/pump_amm/formatter-restoration-v144';sys.path.insert(0,str(P/'static-tool'));from elf_reader import Elf
L=json.load(gzip.open(P/'inventory/after/residual-ledger.json.gz')); O=Elf(R/'evidence/original/pump_amm/deployed.so');C=Elf(P/'candidate.so');selected={}
for side,e,roots in [('original',O,[0xc8588,0xe62b8,0xcc2a0,0x5a570,0x10608,0x6168,0xd44e0,0xd47b8,0x2370]),('candidate',C,[0x5d0e0,0x96638,0x60af8,0xb1590,0xe3b8,0x5f38,0x57c28,0x57f00,0x1d50])]:
 rows={r['start']:r for r in L[side]};roots=[x for x in roots if x in rows]
 # Complete admitted bodies plus every immediate target, retaining full ledger records.
 targets=set(roots)
 for a in roots:targets.update(x['target'] for x in rows[a]['direct_calls'])
 selected[side]=[rows[a] for a in sorted(targets) if a in rows]
 d=W/side;d.mkdir(exist_ok=True)
 for a in roots:
  r=rows[a];cmd=['/Users/shawwalters/.cache/solana/v1.54/platform-tools/llvm/bin/llvm-objdump','-d','--start-address='+str(a),'--stop-address='+str(r['end']),str(e.path if side=='original' else P/'unstripped.so')]
  z=subprocess.run(cmd,capture_output=True);assert z.returncode==0;(d/(hex(a)+'.asm')).write_bytes(z.stdout)
(W/'complete-ledger-rows.json').write_text(json.dumps(selected,indent=2)+'\n')
S=P/'source/programs/pump-amm/src/incentives.rs';s=S.read_text();(W/'before.rs').write_text(s)
a=s.index('pub struct ClaimTokenIncentives');b=s.index('pub fn claim(',a);region=s[a:b]
region=region.replace("pub user:UncheckedAccount<'info>","pub user:AccountInfo<'info>").replace("pub global_volume_accumulator:Box<Account<'info,GlobalVolumeAccumulator>>","pub global_volume_accumulator:Account<'info,GlobalVolumeAccumulator>").replace("pub event_authority:UncheckedAccount<'info>","pub event_authority:AccountInfo<'info>")
(W/'after.rs').write_text(s[:a]+region+s[b:])
z=subprocess.run(['diff','-u','--label','a/programs/pump-amm/src/incentives.rs','--label','b/programs/pump-amm/src/incentives.rs',str(W/'before.rs'),str(W/'after.rs')],capture_output=True);assert z.returncode==1;(W/'proposal.patch').write_bytes(z.stdout)
d=W/'dependencies';d.mkdir(exist_ok=True)
base=Path('/Users/shawwalters/.cargo/registry/src/index.crates.io-1949cf8c6b5b557f/anchor-lang-0.31.1/src/accounts')
for name in ['account.rs','account_info.rs','unchecked_account.rs','boxed.rs']:
 shutil.copy2(base/name,d/name)
paths=[R/'evidence/original/pump_amm/deployed.so',P/'candidate.so',P/'unstripped.so',S,P/'inventory/after/residual-ledger.json.gz']
(W/'bindings.json').write_text(json.dumps({str(p.relative_to(R)):hashlib.sha256(p.read_bytes()).hexdigest()for p in paths},indent=2)+'\n')
print('Complete admitted bodies, immediate target rows, dependency source and proposal saved; no build/runtime.')
