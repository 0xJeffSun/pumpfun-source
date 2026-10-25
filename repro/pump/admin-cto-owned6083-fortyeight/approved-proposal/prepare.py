from pathlib import Path
import shutil,json,gzip,hashlib,difflib,sys
P=Path(__file__).resolve().parent; R=P.parents[1]; B=R/'work/pump-admin-cto-owned-build/public'; O=R/'work/pump-admin-cto-application-proof'
sys.path.insert(0,str(O));import disasm
H=lambda b:hashlib.sha256(b).hexdigest()
for n in ['analyze.py','disasm.py','original.so']:shutil.copyfile(O/n,P/n)
shutil.copyfile(B/'unstripped.so',P/'current.so')
for kind in ['original','candidate']:shutil.copyfile(B/f'full-{kind}-call-data-ledger.json.gz',P/f'{kind}-ledger.json.gz')
(P/'before').mkdir(exist_ok=True);(P/'proposal').mkdir(exist_ok=True)
for n in ['admin_cto.rs','lib.rs']:shutil.copyfile(R/'programs/pump/src'/n,P/'before'/n)
b=(P/'before/admin_cto.rs').read_text();a=b.replace('if a.bonding_curve.is_holder_reward&&holder!=Some(true){return Err(err(6083));}','if a.bonding_curve.is_holder_reward&&holder!=Some(true){return Err(error!(PumpError::HolderRewardCreatorImmutable));}')
assert a!=b and b.count('err(6083)')==1
(P/'proposal/admin_cto.rs').write_text(a);(P/'source.patch').write_text(''.join(difflib.unified_diff(b.splitlines(True),a.splitlines(True),fromfile='a/programs/pump/src/admin_cto.rs',tofile='b/programs/pump/src/admin_cto.rs')))
D=R/'work/fees-v144-cargo-home/registry/src/index.crates.io-1949cf8c6b5b557f';(P/'framework').mkdir(exist_ok=True)
for src,dst in [('anchor-lang-0.31.1/src/error.rs','error.rs'),('anchor-attribute-error-0.31.2/src/lib.rs','error-macro.rs'),('anchor-syn-0.31.2/src/codegen/error.rs','error-codegen.rs')]:shutil.copyfile(D/src,P/'framework'/dst)
roots={'original':[141840,1235456,1405824,1433224,1686320],'candidate':[441928,1118472,1353288,1353424,1353760]}; selection={}
for kind in roots:
 e=disasm.a.Elf((P/('original.so' if kind=='original' else 'current.so')).read_bytes());fs=json.load(gzip.open(P/f'{kind}-ledger.json.gz'));by={f['start']:f for f in fs}
 # Preserve all direct callees of selected full bodies, plus complete error factory descendants.
 selected=set(roots[kind]); factory=roots[kind][2:];todo=list(factory)
 while todo:
  f=by[todo.pop()]
  for call in f['direct_calls']:
   t=call['target']
   if t in by and t not in selected:selected.add(t);todo.append(t)
 for start in roots[kind][:2]:selected.update(c['target'] for c in by[start]['direct_calls'] if c['target'] in by)
 selection[kind]=[by[s] for s in sorted(selected)];(P/kind).mkdir(exist_ok=True)
 for f in selection[kind]:(P/kind/f"{f['start']}.asm").write_text(disasm.render(e,f['start'],f['end']))
(P/'selection.json').write_text(json.dumps(selection,indent=2)+'\n')
(P/'binding.json').write_text(json.dumps({'candidate_sha256':'c261d215495a35aa59970546b87bd5fb74407d2bbd5d885d41a0d1a2677cc2f2','symbols_sha256':H((P/'current.so').read_bytes()),'original_sha256':H((P/'original.so').read_bytes()),'source_sha256':H(b.encode()),'proposal_sha256':H(a.encode()),'builds':0,'runtime':0},indent=2)+'\n')
