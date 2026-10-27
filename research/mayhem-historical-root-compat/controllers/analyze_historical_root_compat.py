from pathlib import Path
import importlib.util,json,sys
W=Path(__file__).resolve().parent;P=W/'mayhem-historical-root-compat';Q=W/'mayhem-whole-parser/publication'
s=importlib.util.spec_from_file_location('historical_root_helpers',Q/'context_helpers.py');q=importlib.util.module_from_spec(s);s.loader.exec_module(q)
original_path=P/'original.so';original_path.write_bytes(q.raw(Q/'reference/original.so.gz'));original=q.layer.Elf(original_path)
assert q.identity(original.b)['sha256']=='a87fa9f866272514e6acb852b668c4a08aeb173d56c883039991d114d1199bdb'
windows={r['id']:original.window(r['start'],r['end'])for r in q.read(Q/'reference/prior-inventory.json.gz')['original_rows']}
out={}
for label in sys.argv[1:]:
    folder=P/label;elf=q.layer.Elf(folder/'symbols.so');inventory=q.inventory(elf,windows);functions=q.v.functions(elf)
    stripped=folder/'stripped.so'if(folder/'stripped.so').exists()else folder/'candidate-v154-strip.so'
    rows=dict(raw=q.identity(elf.b),stripped=q.identity(stripped.read_bytes()),functions=len(functions),text_bytes=elf.hi-elf.lo,inventory=inventory,unmatched=[k for k,v in inventory['matches'].items()if not v],whole_original_raw_equal=elf.b==original.b,target_executions=0)
    (folder/'analysis.json').write_text(json.dumps(rows,indent=2)+'\n',encoding='utf8',newline='\n');out[label]=rows
    print(label,'functions',len(functions),'text',rows['text_bytes'],'normalized',inventory['normalized'],'raw_local',inventory['raw_local'],'injective',inventory['injective'],'unmatched',len(rows['unmatched']))
(P/'analysis-summary.json').write_text(json.dumps(out,indent=2)+'\n',encoding='utf8',newline='\n')
