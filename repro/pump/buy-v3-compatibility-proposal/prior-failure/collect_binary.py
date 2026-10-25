from pathlib import Path
import subprocess,json,hashlib
p=Path('publication');r='/Users/shawwalters/Documents/Codex/2026-10-24/pumpfun-source';c='c1ffdd0667608d4755227e68aab9f27a7e9a0d37';rows=json.loads((p/'inputs.json').read_text())
for name in ['candidate.so','unstripped.so','function-match.json','current-bindings.json','source-sha256.json']:
 src='repro/pump/nested-ancestry-fortyeight/'+name;b=subprocess.check_output(['git','-C',r,'show',c+':'+src]);dst='inputs/binary/'+name;q=p/dst;q.parent.mkdir(parents=True,exist_ok=True);q.write_bytes(b);rows.append(dict(source=src,commit=c,path=dst,size=len(b),sha256=hashlib.sha256(b).hexdigest()))
(p/'inputs.json').write_text(json.dumps(rows,indent=2)+'\n')
