from pathlib import Path
import hashlib,json,shutil,re
W=Path(__file__).resolve().parent;R=W.parents[1];H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();J=lambda p:json.loads(p.read_text())
A=R/'repro/pump_amm/claim-context-main-v144';i=J(A/'acceptance-inputs.json');m=i['source']
for n,h in m.items():
 assert H(R/n)==h,n
 d=W/'source'/n;d.parent.mkdir(parents=True,exist_ok=True);shutil.copy2(R/n,d)
extra=['programs/pump-amm/README.md','programs/pump-amm/THIRD_PARTY_NOTICES.md','programs/pump-amm/solana-sdk-LICENSE-APACHE-2.0.txt']
for n in extra:
 d=W/'source'/n;d.parent.mkdir(parents=True,exist_ok=True);shutil.copy2(R/n,d)
(W/'compiled-source-sha256.json').write_text(json.dumps(m,indent=2)+'\n');(W/'review-source-sha256.json').write_text(json.dumps({**m,**{n:H(R/n)for n in extra}},indent=2)+'\n')
E=W/'evidence';E.mkdir();shutil.copy2(A/'acceptance-inputs.json',E/'main-acceptance-inputs.json')
for n in ['vendor-origin.json','lock-delta.json','renderer-static.json']:
 shutil.copy2(R/'repro/pump_amm/formatter-restoration-v144'/n,E/n)
shutil.copy2(R/'repro/pump_amm/formatter-restoration-v144/source-proposal/archives/solana-pubkey-2.4.0.crate',E/'solana-pubkey-2.4.0.crate')
for n in ['claim-static.json','new-matches.json']:shutil.copy2(A/'reference'/n,E/n)
s=(R/'programs/pump-amm/src/lib.rs').read_text();rows=[{'name':x.group(1),'line':s[:x.start()].count('\n')+1,'evidence_class':'static-only'if x.group(1)=='create_config'else'runtime-bounded'}for x in re.finditer(r'    pub fn (\w+)',s)];assert len(rows)==38
(W/'dispatch.json').write_text(json.dumps(rows,indent=2)+'\n');print(len(m),'compiled inputs;',len(rows),'entries')
