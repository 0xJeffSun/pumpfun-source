from pathlib import Path
import json,hashlib,re,shutil
W=Path(__file__).resolve().parent;R=W.parents[1];H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();J=lambda p:json.loads(p.read_text())
i=J(R/'work/pump-creator-full-curve-main-control/identity.json');m=i['source'];assert len(m)==37
opaque=['programs/pump/src/sell_v2.rs','programs/pump/recovered/sell_accounting.rs','programs/pump/recovered/sell_accounting_host.rs']
redacted={};views={}
for n,h in m.items():
 assert H(R/n)==h,n
 if n in opaque:continue
 p=W/'source-view'/n;p.parent.mkdir(parents=True,exist_ok=True)
 if n=='programs/pump/src/trade.rs':
  lines=(R/n).read_text().splitlines(True);ranges=[(51,114),(297,318)]
  for a,b in ranges:
   for j in range(a-1,b):lines[j]='// OPAQUE: excluded sell/old V3 extension-related closure.\n'
  p.write_text(''.join(lines));redacted[n]={'line_ranges':ranges,'reason':'Conservatively omit sell_v3 body and common quote-extension helper; old V3 extension/leaf investigation excluded.'}
 else:shutil.copy2(R/n,p)
 views[n]=H(p)
(W/'compiled-source-sha256.json').write_text(json.dumps(m,indent=2)+'\n');(W/'source-view-sha256.json').write_text(json.dumps(views,indent=2)+'\n');(W/'redactions.json').write_text(json.dumps({'opaque_files':opaque,'redacted_files':redacted,'absent_excluded_entries':['admin_update_token_incentives','claim_token_incentives'],'excluded_leaf':'0x17c3d8'},indent=2)+'\n')
(W/'evidence').mkdir();shutil.copy2(R/'work/pump-creator-full-curve-main-control/identity.json',W/'evidence/main-identity.json');shutil.copy2(R/'programs/pump/README.md',W/'README.input.md')
s=(R/'programs/pump/src/lib.rs').read_text();rows=[{'name':x.group(1),'line':s[:x.start()].count('\n')+1}for x in re.finditer(r'    pub fn (\w+)',s)];(W/'dispatch.json').write_text(json.dumps(rows,indent=2)+'\n');print(len(rows),'entries;',len(m),'bound inputs;',len(views),'allowed/redacted views')
