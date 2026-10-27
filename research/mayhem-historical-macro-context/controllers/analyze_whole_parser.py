from pathlib import Path
import importlib.util,json,sys
sys.dont_write_bytecode=True
W=Path(__file__).resolve().parent;P=W/'mayhem-whole-parser';Q=W/'pumpfun-source/research/mayhem-allocator-parser-provenance'
s=importlib.util.spec_from_file_location('context',Q/'context_helpers.py');q=importlib.util.module_from_spec(s);s.loader.exec_module(q)
base=q.text_sections(q.objects(q.raw(Q/'reference/curve_accounts.rlib.gz')));out={}
for label in ('old-empty','old-current-create','old-historical-create','old-historical-events','current-historical-create','gated-empty','gated-historical-create','old-historical-create-repeat'):
    folder=P/label;result=q.read(folder/'result.json');assert result['returncode']==0
    obj=q.objects(next(folder.glob('*.rlib')).read_bytes());(folder/'object.o').write_bytes(obj);sections=q.text_sections(obj)
    changed=[n for n in base if n in sections and sections[n]!=base[n]];missing=sorted(set(base)-set(sections));added=sorted(set(sections)-set(base))
    helpers=[dict(name=n,**q.identity(b))for n,b in sections.items()if'finish_grow'in n]
    out[label]=dict(object=q.identity(obj),changed=changed,missing=missing,added=added,helpers=helpers)
    print(label,'helper',[(h['bytes'],h['sha256'])for h in helpers],'changed',len(changed),'missing',len(missing),'added',len(added),flush=True)
(P/'object-comparison.json').write_text(json.dumps(out,indent=2)+'\n',encoding='utf8',newline='\n')
