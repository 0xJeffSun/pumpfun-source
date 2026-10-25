from pathlib import Path
import hashlib,json,shutil,re
W=Path(__file__).resolve().parent;R=W.parents[1];H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
files=['Cargo.toml','Cargo.lock']+[str(p.relative_to(R))for p in sorted((R/'programs/pump-fees').rglob('*'))if p.is_file()and 'target' not in p.parts]
for n in files:
 d=W/'source'/n;d.parent.mkdir(parents=True,exist_ok=True);shutil.copy2(R/n,d)
source={n:H(R/n)for n in files};(W/'source-sha256.json').write_text(json.dumps(source,indent=2)+'\n')
base=R/'work/fees-v2-caller-build/cargo-home/registry/src/index.crates.io-6f17d22bba15001f'
deps=['anchor-attribute-event-0.31.2/src/lib.rs','anchor-syn-0.31.2/src/codegen/accounts/constraints.rs','anchor-syn-0.31.2/src/codegen/program/accounts.rs','anchor-lang-0.31.1/src/accounts/account.rs','anchor-lang-0.31.1/src/accounts/program.rs','anchor-lang-0.31.1/src/accounts/interface_account.rs','anchor-lang-0.31.1/src/accounts/interface.rs','anchor-lang-0.31.1/src/accounts/system_account.rs','anchor-spl-0.31.1/src/token_interface.rs','anchor-spl-0.31.1/src/token_2022.rs']
for n in deps:
 if not(base/n).is_file():continue
 d=W/'dependencies'/n;d.parent.mkdir(parents=True,exist_ok=True);shutil.copy2(base/n,d)
(W/'dependency-source-sha256.json').write_text(json.dumps({n:H(base/n)for n in deps if(base/n).is_file()},indent=2)+'\n')
idl={}
for name,types,ixs in [('pump',['Global','BondingCurve'],['distribute_creator_fees','distribute_creator_fees_v2']),('pump_amm',['Pool'],['transfer_creator_fees_to_pump','transfer_creator_fees_to_pump_v2'])]:
 p=R/'programs/pump-fees/idls'/f'{name}.json';d=json.loads(p.read_text());idl[name]={'address':d['address'],'accounts':[x for x in d['accounts']if x['name'] in types],'types':[x for x in d['types']if x['name'] in types],'instructions':[x for x in d['instructions']if x['name'] in ixs]}
(W/'external-idl-relevant.json').write_text(json.dumps(idl,indent=2)+'\n')
s=(R/'programs/pump-fees/src/lib.rs').read_text();rows=[{'name':m.group(1),'line':s[:m.start()].count('\n')+1}for m in re.finditer(r'    pub fn (\w+)',s)];assert len(rows)==31
(W/'dispatch.json').write_text(json.dumps(rows,indent=2)+'\n');print('snapshot',len(source),'files',len(rows),'instruction paths')
