from pathlib import Path
import json,hashlib,shutil,struct
P=Path(__file__).resolve().parent;R=P.parents[1];A=R/'repro/layered-passes/pass-09/dependency-review/retained/ata';U=R/'repro/identity-audit/2026-10-25/ata';H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
shutil.copyfile(A/'residual-ledger.json',P/'full-residual-ledger.json');shutil.copyfile(R/'evidence/dependencies/associated_token/deployed.so',P/'original.so');shutil.copyfile(R/'repro/pump/ata-candidate-build-2/spl_associated_token_account.so',P/'candidate.so')
(P/'official').mkdir();
for n in['REPORT.md','assessment.json','asset-assessment.json','retained-files.json','manifest.json']:shutil.copyfile(U/n,P/'official'/n)
for n in['solana-1.10.33-install.sh','version.md','solana-tag.json','bpf-tools-v1.27-release.json']:shutil.copyfile(U/'official'/n,P/'official'/n)
for n in['build.log','tool-versions.json','source-manifest.json','hosted-run.json']:shutil.copyfile(R/'repro/pump/ata-candidate-build-2'/n,P/n)
(P/'source-evidence').mkdir();D=A/'inputs/repro/pump/dependency-provenance-20261025/ata'
for n in['anchor-v0242-lib.rs','spl-ci_cargo-test-bpf.sh','spl-ci_rust-version.sh','spl-.github_workflows_pull-request-token.yml']:
 if(D/n).exists():shutil.copyfile(D/n,P/'source-evidence'/n)
d=json.loads((P/'full-residual-ledger.json').read_text());selected=[]
for r in d['best_window_correspondence']:
 if r['original_ordinal']not in[38,39,41,44,46,47]:continue
 row=dict(r);row['role_proof']='moved linked helper (RawVec specialization hypothesis only)'if r['original_ordinal']in[38,39]else'caller with changed direct-call displacements; exact source role unknown';row['complete_bodies']={}
 for side in['original','candidate']:
  b=(P/f'{side}.so').read_bytes();a,z=r[side+'_range'];ins=[];pc=a
  while pc<z:
   op,regs,off,imm=struct.unpack_from('<BBhi',b,pc);n=16 if op==24 else 8;ins.append({'pc':pc,'raw':b[pc:pc+n].hex(),'opcode':op,'registers':regs,'offset':off,'immediate':imm});pc+=n
  assert pc==z;row['complete_bodies'][side]=ins
 selected.append(row)
(P/'six-windows.json').write_text(json.dumps(selected,indent=2)+'\n')
