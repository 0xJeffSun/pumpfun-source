import sys, subprocess
sys.path.insert(0,'/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/mega/mg-M-o83c/tools'); import evvar
L='/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/mega/mg-M-o83c'
lit=evvar.O79_LIT.replace('vt,et','et,vt')
OV1={'svb':'let sol_vault_balance=if native{a.sol_vault.lamports()}else{0};',
     'qvb':'let quote_vault_balance=if native{sol_vault_balance}else{a.mayhem_quote_token_vault.amount};'}
OV2={'svb':'let sol_vault_balance=if native{a.sol_vault.lamports()}else{0};'}
OV3=dict(OV1); OV3['gqd']='let global_quote_deployed=if native{global_sol_deployed}else{a.global_params.stable_deployed};'
V=[('r01','sa,svb,ssd,vs,gsd,rs,qvb,sqd,vq,gqd,rq,qm',OV1),
   ('r02','sa,svb,ssd,vs,gsd,rs,rq,gqd,vq,sqd,qvb,qm',OV1),
   ('r03','sa,svb,ssd,vs,gsd,rs,qvb,sqd,vq,gqd,rq,qm',OV2),
   ('r04','sa,svb,ssd,vs,gsd,rs,qvb,sqd,vq,gqd,rq,qm',OV3),
   ('r05','sa,rs,gsd,vs,ssd,svb,rq,gqd,vq,sqd,qvb,qm',OV1),
   ('r06','sa,rs,gsd,vs,ssd,svb,qvb,sqd,vq,gqd,rq,qm',OV1)]
for n,lets,ov in V:
    evvar.make(n,lets,lit,ov)
    r=subprocess.run(['bash',L+'/tools/qb.sh',n,L+'/roots/'+n],capture_output=True,text=True).stdout.strip()
    s=subprocess.run(['python3','-B',L+'/tools/sc3.py',f'/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/mayhem-b/out/builds/mg-M-o83c-{n}/symbols.so'],capture_output=True,text=True).stdout.strip()
    print(n,lets,'|',s,'|',r.split('|')[3].strip() if r.count('|')>3 else r,'|',r.split('|')[-1].strip()[-60:],flush=True)
