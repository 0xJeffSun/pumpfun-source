from pathlib import Path
import gzip,hashlib,importlib.util,json
W=Path(__file__).resolve().parent;P=W/'mayhem-historical-panic-return';D=W/'mayhem-historical-root-compat/publication'
s=importlib.util.spec_from_file_location('panic_helpers',W/'mayhem-historical-framework/publication/context_helpers.py');q=importlib.util.module_from_spec(s);s.loader.exec_module(q)
def read(p):return json.loads(gzip.decompress(p.read_bytes()) if p.suffix=='.gz' else p.read_bytes())
def compare(a,b):
    am={k for k,h in a['matches'].items() if h};bm={k for k,h in b['matches'].items() if h}
    return dict(gained=sorted(bm-am),lost=sorted(am-bm),raw_gained=sorted(set(b['raw_ids'])-set(a['raw_ids'])),raw_lost=sorted(set(a['raw_ids'])-set(b['raw_ids'])))
labels=('build-01-baseline','build-02-after','build-03-repeat');runs=read(P/'analysis-summary.json');prior=read(D/'report.json')
comparison=dict(path_control=compare(prior['init_control']['runs']['build-02-after']['inventory'],runs[labels[0]]['inventory']),source=compare(runs[labels[0]]['inventory'],runs[labels[1]]['inventory']),current=compare(prior['runs']['current-native-control'],runs[labels[1]]['inventory']),repeat={n:(P/labels[1]/n).read_bytes()==(P/labels[2]/n).read_bytes() for n in ('symbols.so','stripped.so')},compiler_commands={n:read(P/n/'result.json')['crate_compilations'] for n in labels})
current_path=P/'current.so';current_path.write_bytes(gzip.decompress((D/'runs/current-native-control/symbols.so.gz').read_bytes()));current=q.layer.Elf(current_path);after=q.layer.Elf(P/labels[1]/'symbols.so');before=q.layer.Elf(P/labels[0]/'symbols.so');original=q.layer.Elf(P/'original.so')
o=next(r for r in read(D/'reference/prior-inventory.json.gz')['original_rows'] if r['id']=='O0199');ob=original.b[o['start']:o['end']]
def body(e):
    rows=[r for r in e.symbols if r['table']=='.symtab' and r['name']=='custom_panic'];assert len(rows)==1;r=rows[0];return r,e.b[r['value']:r['value']+r['size']]
bs,bb=body(before);as_,ab=body(after);cs,cb=body(current)
panic=dict(before_symbol=bs,after_symbol=as_,current_symbol=cs,original_window=o,before=q.identity(bb),after=q.identity(ab),original=q.identity(ob),before_prefix_equals_original=bb[:len(ob)]==ob,before_suffix_hex=bb[len(ob):].hex(),after_equals_original=ab==ob,current_equals_original=cb==ob,target_executions=0)
complete=dict(text_equal=after.b[after.lo:after.hi]==current.b[current.lo:current.hi],raw_equal=after.b==current.b,stripped_equal=(P/labels[1]/'stripped.so').read_bytes()==gzip.decompress((D/'runs/current-native-control/stripped.so.gz').read_bytes()))
for stage in ('before','after'):
    p=P/('upstream-'+stage+'.rs');b=p.read_bytes().replace(b'\r\n',b'\n');p.write_bytes(b)
    if stage=='after':assert hashlib.sha1(b'blob '+str(len(b)).encode()+b'\0'+b).hexdigest()=='651634b51e1fd92de65794fac24a400c5c3e6dca'
for n,j in [('comparison.json',comparison),('panic-comparison.json',panic),('current-artifact-comparison.json',complete)]: (P/n).write_text(json.dumps(j,indent=2)+'\n',encoding='utf-8')
print(json.dumps(dict(comparison=comparison,panic=panic,current_artifacts=complete),indent=2))
