from pathlib import Path
import hashlib,json,shutil,re
W=Path(__file__).resolve().parent;R=W.parents[1];H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();J=lambda p:json.loads(p.read_text())
a=J(R/'repro/mayhem/sell-result-error-main-twentyfour/acceptance-inputs.json');m=a['compiled_source'];assert len(m)==14
for n,h in m.items():
 assert H(R/n)==h,n
 d=W/'source'/n;d.parent.mkdir(parents=True,exist_ok=True);shutil.copy2(R/n,d)
p='programs/mayhem/README.md';assert H(R/p)==a['README_sha256'];shutil.copy2(R/p,W/'source'/p)
(W/'compiled-source-sha256.json').write_text(json.dumps(m,indent=2)+'\n');(W/'review-source-sha256.json').write_text(json.dumps({**m,p:H(R/p)},indent=2)+'\n')
(W/'evidence').mkdir();shutil.copy2(R/'repro/mayhem/sell-result-error-main-twentyfour/acceptance-inputs.json',W/'evidence/main-acceptance-inputs.json')
s=(R/'programs/mayhem/src/lib.rs').read_text();rows=[{'name':x.group(1),'line':s[:x.start()].count('\n')+1,'evidence_class':'runtime-bounded'}for x in re.finditer(r'    pub fn (\w+)',s)];assert len(rows)==24
assert 'initialize_mayhem_state'not in{x['name']for x in rows}
rows.append({'name':'initialize_mayhem_state','evidence_class':'excluded-opaque','reason':'Absent current entry; explicitly excluded investigation. No body or original window read.'})
(W/'dispatch.json').write_text(json.dumps(rows,indent=2)+'\n')
b=Path('/Users/shawwalters/.cargo/registry/src/index.crates.io-1949cf8c6b5b557f');deps=['anchor-lang-1.0.0/src/accounts/program.rs','anchor-lang-1.0.0/src/accounts/account.rs','anchor-lang-1.0.0/src/accounts/interface_account.rs','anchor-attribute-event-1.0.0/src/lib.rs','anchor-syn-1.0.0/src/codegen/accounts/try_accounts.rs']
for n in deps:
 d=W/'dependencies'/n;d.parent.mkdir(parents=True,exist_ok=True);shutil.copy2(b/n,d)
(W/'dependency-source-sha256.json').write_text(json.dumps({n:H(b/n)for n in deps},indent=2)+'\n');print('14 compiled inputs,24 current entries,1 excluded opaque slot')
