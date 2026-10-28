from pathlib import Path
import importlib.util,json
W=Path(__file__).resolve().parent;P=W/'mayhem-path-source-control';D=W/'mayhem-historical-root-compat/publication';Q=W/'mayhem-historical-framework/publication'
def module(n,p):
    s=importlib.util.spec_from_file_location(n,p);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m
q=module('layout_helpers',Q/'context_helpers.py');v=module('layout_root_helpers',D/'verify.py');layout=module('path_layout',W/'path_layout.py')
def compare(a,b):
    am={k for k,h in a['matches'].items() if h};bm={k for k,h in b['matches'].items() if h}
    return dict(gained=sorted(bm-am),lost=sorted(am-bm),raw_gained=sorted(set(b['raw_ids'])-set(a['raw_ids'])),raw_lost=sorted(set(a['raw_ids'])-set(b['raw_ids'])))
labels=('build-01-registry','build-02-registry-repeat','build-03-path','build-04-path-repeat');runs=v.read(P/'analysis-summary.json');prior=v.read(D/'report.json')
comparison=dict(relocated=compare(prior['init_control']['runs']['build-02-after']['inventory'],runs[labels[0]]['inventory']),path_source=compare(runs[labels[0]]['inventory'],runs[labels[2]]['inventory']),prior_path=compare(prior['panic_control']['runs']['build-01-baseline']['inventory'],runs[labels[2]]['inventory']),repeat={a:{n:(P/a/n).read_bytes()==(P/b/n).read_bytes() for n in ('symbols.so','stripped.so')} for a,b in [(labels[0],labels[1]),(labels[2],labels[3])]},compiler_commands={n:v.read(P/n/'result.json')['crate_compilations'] for n in labels})
registry=q.layer.Elf(P/labels[0]/'symbols.so');path=q.layer.Elf(P/labels[2]/'symbols.so');original=q.layer.Elf(P/'original.so');rows={r['id']:r for r in v.read(D/'reference/prior-inventory.json.gz')['original_rows']}
trace=layout.inspect(q,v,registry,path,original,rows,v.map_rows((P/labels[0]/'link/link.map').read_bytes(),449,663384),v.map_rows((P/labels[2]/'link/link.map').read_bytes(),451,664104))
prior_registry=W/'mayhem-historical-init-needed/build-02-after';prior_path=W/'mayhem-historical-panic-return/build-01-baseline'
prior_trace=layout.inspect(q,v,q.layer.Elf(prior_registry/'symbols.so'),q.layer.Elf(prior_path/'symbols.so'),original,rows,v.map_rows((prior_registry/'link/link.map').read_bytes(),449,663384),v.map_rows((prior_path/'link/link.map').read_bytes(),451,664104))
for n,j in [('comparison.json',comparison),('layout-comparison.json',trace)]: (P/n).write_text(json.dumps(j,indent=2)+'\n',encoding='utf-8')
(P/'prior-layout-comparison.json').write_text(json.dumps(prior_trace,indent=2)+'\n',encoding='utf-8')
print(json.dumps(comparison));print(json.dumps(dict(changed_owner_extents=trace['changed_owner_extents'],added=trace['added_allocator_sections'],target_raw_equal={k:r['target_raw_equal'] for k,r in trace['callers'].items()})))
print('Prior published location',json.dumps(prior_trace['changed_owner_extents']))
