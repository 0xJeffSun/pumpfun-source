from pathlib import Path
import importlib.util,json,sys
W=Path(__file__).resolve().parent;P=W/'mayhem-historical-borsh';Q=W/'mayhem-whole-parser/publication'
s=importlib.util.spec_from_file_location('program_id_analysis_helpers',Q/'context_helpers.py');q=importlib.util.module_from_spec(s);s.loader.exec_module(q)
original_path=P/'original.so';original_path.write_bytes(q.raw(Q/'reference/original.so.gz'));original=q.layer.Elf(original_path)
assert q.identity(original.b)['sha256']=='a87fa9f866272514e6acb852b668c4a08aeb173d56c883039991d114d1199bdb'
windows={r['id']:original.window(r['start'],r['end'])for r in q.read(Q/'reference/prior-inventory.json.gz')['original_rows']};out={}
for label in sys.argv[1:]:
    folder=P/label;elf=q.layer.Elf(folder/'symbols.so');inv=q.inventory(elf,windows);functions=q.v.functions(elf)
    row=dict(raw=q.identity(elf.b),stripped=q.identity((folder/'stripped.so').read_bytes()),functions=len(functions),text_bytes=elf.hi-elf.lo,inventory=inv,unmatched=[k for k,v in inv['matches'].items()if not v],whole_original_raw_equal=elf.b==original.b,target_executions=0)
    (folder/'analysis.json').write_text(json.dumps(row,indent=2)+'\n',encoding='utf-8');out[label]=row
    print(label,'functions',len(functions),'text',row['text_bytes'],'normalized',inv['normalized'],'raw_local',inv['raw_local'],'injective',inv['injective'],'raw',row['raw']['sha256'])
(P/'analysis-summary.json').write_text(json.dumps(out,indent=2)+'\n',encoding='utf-8')
