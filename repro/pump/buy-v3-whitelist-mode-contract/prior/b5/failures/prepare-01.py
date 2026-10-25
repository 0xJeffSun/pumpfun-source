from pathlib import Path
import hashlib,json,shutil
R=Path.cwd();P=R/'work/pump-buy-fee-mode-closure/publication';H=lambda b:hashlib.sha256(b).hexdigest()
def copy(src,dst):
 a=R/src;b=P/dst;assert not b.exists(),b;b.parent.mkdir(parents=True,exist_ok=True);b.write_bytes(a.read_bytes());return {'source':src,'path':dst,'sha256':H(b.read_bytes()),'bytes':b.stat().st_size}
rows=[]
base='repro/pump/buy-v3-authentic-partial-composition'
for n in ['manifest.json','manifest.sha256','REPORT.md','preservation-ledger.json','source/fee_account.rs','source/fee_selection.rs','source/buy_v3_context.rs','source/buy_v3_body.rs','source/admission.rs','source/body_amounts.rs','source/amount_selection.rs','source/module.rs.fragment','evidence/original.so','evidence/v3_configured_fee.json.gz']:
 rows.append(copy(base+'/'+n,'inputs/composition/'+n))
for n in ['REPORT.md','manifest.json','manifest.sha256']:
 rows.append(copy('repro/pump/buy-v3-typed-parser-contract/'+n,'inputs/parser/'+n))
rows.append(copy('repro/pump/buy-v3-source-composition/prior/pump_buy_event_field_closure/prior/residual-contract-prior-types-REPORT.md','inputs/global-field-identity.md'))
for n in ['elf_reader.py','decoder.py']:copy('work/pump-buy-preparation-closure/'+n,n)
base='repro/pump/final-error-metadata-fortyeight'
for n in ['manifest.json','manifest.sha256','candidate.so','symbols.so','current-bindings.json']:
 rows.append(copy(base+'/'+n,'inputs/current/'+n))
m=json.loads((R/base/'current-bindings.json').read_text())['groups']['source'];assert len(m)==37
for n,h in m.items():assert H((R/n).read_bytes())==h,n
(P/'current-source-sha256.json').write_text(json.dumps(m,indent=2)+'\n')
for n in ['programs/pump/src/trade_types.rs','programs/pump/src/lib.rs','programs/pump/Cargo.lock']:
 rows.append(copy(n,'inputs/current-source/'+n))
# Retained locked AccountInfo sources establish public clone/borrow API only.
D=R/'work/pump-buy-preparation-closure/publication'
for n in ['dependency-bindings.json']:
 copy(str((D/n).relative_to(R)),'inputs/preparation-'+n)
for p in sorted((D/'dependencies').rglob('*')):
 if p.is_file():copy(str(p.relative_to(R)),str(p.relative_to(D)))
(P/'input-bindings.json').write_text(json.dumps(rows,indent=2)+'\n')
print(len(rows),len(m))
