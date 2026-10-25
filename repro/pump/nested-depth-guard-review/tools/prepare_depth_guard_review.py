"""Copy named retained evidence and a one-line proposal; no build or VM execution."""
from pathlib import Path
import bisect,difflib,gzip,hashlib,json,re,shutil,struct,sys,tarfile,tomllib
sys.dont_write_bytecode=True
ROOT=Path(__file__).resolve().parents[2]
B=ROOT/'work/pump-nested-source-build'
P=ROOT/'work/pump-nested-depth-guard-review'
sys.path.insert(0,str(B));from elf_reader import Elf
sha=lambda b:hashlib.sha256(b).hexdigest()
def put(path,data):
    path.parent.mkdir(parents=True,exist_ok=True);path.write_bytes(data)
def obj(path,value):put(path,(json.dumps(value,indent=2,sort_keys=True)+'\n').encode())
def copy(src,dst):
    assert not src.name.endswith('-keypair.json')
    put(dst,src.read_bytes())
def seal(path):
    rows={}
    for f in sorted(path.rglob('*')):
        assert not f.is_symlink()
        if f.is_file():
            assert not f.name.endswith('-keypair.json')
            rows[str(f.relative_to(path))]=sha(f.read_bytes())
    obj(path/'manifest-sha256.json',rows)
assert not P.exists();P.mkdir()
F=B/'focused-01-preserved';assert not F.exists();F.mkdir()
for name in ['original-acceptance-02','focused-01']:
    for suffix in ['.json.gz','.log','.json.gz.partial.json.gz']:
        copy(B/(name+suffix),F/(name+suffix))
    for f in sorted((B/(name+'.json.gz.case-journal')).glob('*.json')):copy(f,F/(name+'.json.gz.case-journal')/f.name)
copy(B/'original-acceptance-02-verification.log',F/'original-acceptance-02-verification.log')
for f in sorted((B/'execution-harness-v2').rglob('*')):
    if f.is_file():copy(f,F/'execution-harness-v2'/f.relative_to(B/'execution-harness-v2'))
for name in ['execution-v2-bindings.json','revision2-fixture-map.json','revision2-proposal.json','universal-metadata.patch','incremental-fixture.patch','incremental-runner.patch']:
    copy(B/name,F/name)
obj(F/'classification.json',{'original_acceptance':'All16 complete saved;15success/1expected6105;32signatures.','focused_result':'FAIL: depth-limit-rollback semantic_logs; all16 saved,64signatures;15successes match.','candidate_sha256':'3c5feecfc6a009c4215169aef1d1e550abd613c48ff395e9d0d210ee5cfcf957','no_full_corpus_run':True,'first_attempt':'attempt-01-preserved contains only unsaved preliminary first12 observations and pre-send oversizedcase13; not accepted runtime evidence.'})
seal(F)
for f in F.rglob('*'):
    if f.is_file():copy(f,P/'retained-focused-01'/f.relative_to(F))
for name in ['build-01/build-attempt.json','build-01/build-comparison.json','build-01/build.log','proposed-source-sha256.json','toolchain-phases.json','tools-before.json','tools-after.json','dependency-integrity.json','dependency-integrity.log','function-match.json','serializer-verification.log','authorization.json']:
    copy(B/name,P/'prior-build'/name)
for f in (B/'build-helper-snapshot').rglob('*.py'):copy(f,P/'prior-build/build-helper-snapshot'/f.relative_to(B/'build-helper-snapshot'))
report=json.loads((B/'build-01/build-comparison.json').read_text());source_map={}
for src,h in report['source_sha256'].items():
    f=ROOT/src;assert sha(f.read_bytes())==h
    name=src[src.index('programs/pump/'):];copy(f,P/'before-source'/name);source_map[name]=h
assert len(source_map)==37
obj(P/'before-source-map.json',source_map)
n='programs/pump/src/nested_create.rs';old=(P/'before-source'/n).read_text()
a='    require!(depth <= g.max_curve_depth.min(5), PumpError::CurveDepthExceeded);'
b='    require_gte!(g.max_curve_depth.min(5), depth, PumpError::CurveDepthExceeded);'
assert old.count(a)==1;new=old.replace(a,b);put(P/'proposed'/n,new.encode())
put(P/'depth-guard.patch',''.join(difflib.unified_diff(old.splitlines(True),new.splitlines(True),fromfile='a/'+n,tofile='b/'+n)).encode())
after=dict(source_map);after[n]=sha(new.encode());obj(P/'proposed-source-map.json',after)
copy(B/'elf_reader.py',P/'elf_reader.py')
copy(ROOT/'evidence/original/pump/deployed.so',P/'inputs/original.so')
copy(B/'candidate.so',P/'inputs/failed-candidate.so');copy(B/'unstripped.so',P/'inputs/failed-symbols.so')
o=Elf(P/'inputs/original.so');c=Elf(P/'inputs/failed-symbols.so')
original_asm=(ROOT/'research/imported-lab/analysis/pump_fun/pump.asm').read_text().splitlines(True)
asm_index={int(m[1],16):line for line in original_asm if (m:=re.match(r'\s*([0-9a-f]+):',line))}
windows=[]
starts=[0x60a80,0x878,0x157380,0x15de88,0x19bb30,0x1ace18,0xd5d0,0x1ab198,0x1b3610,0x156fe8,0x1ab1b0]
for start in starts:
    end=o.entries[bisect.bisect_right(o.entries,start)]
    stem=f'inputs/windows/original-{start:x}-{end:x}'
    put(P/(stem+'.bin'),o.b[start:end]);put(P/(stem+'.asm'),''.join(v for k,v in asm_index.items()if start<=k<end).encode())
    matches=[f for f in c.funcs if f['size']==end-start and c.normalized[f['start']:f['start']+f['size']]==o.normalized[start:end]]
    windows.append({'start':start,'end':end,'bytes':end-start,'bin':stem+'.bin','asm':stem+'.asm','sha256':sha(o.b[start:end]),'normalized_sha256':sha(o.normalized[start:end]),'actual_calls':o.callsites(start,end-start),'relocations':o.pattern(start,end-start),'complete_candidate_normalized_matches':matches})
walk=next(f for f in c.funcs if 'nested_create4walk17' in f['name'])
put(P/'inputs/windows/failed-candidate-walk.bin',c.b[walk['start']:walk['start']+walk['size']])
obj(P/'windows.json',windows);obj(P/'failed-walk.json',{**walk,'actual_calls':c.callsites(walk['start'],walk['size']),'with_values_symbols':[f for f in c.funcs if 'Error11with_values' in f['name']]})
obj(P/'original-input-identities.json',{p:{'sha256':sha((ROOT/p).read_bytes()),'bytes':(ROOT/p).stat().st_size}for p in ['evidence/original/pump/deployed.so','research/imported-lab/analysis/pump_fun/pump.asm']})
deps={
 'anchor-lang-0.31.1':['src/lib.rs','src/error.rs'],
 'anchor-attribute-error-0.31.2':['src/lib.rs'],
 'anchor-syn-0.31.2':['src/codegen/error.rs'],
}
lock=tomllib.loads((P/'before-source/programs/pump/Cargo.lock').read_text());dep_rows=[]
for crate,files in deps.items():
    package=next(x for x in lock['package']if x['name']+'-'+x['version']==crate)
    archive=ROOT/'work/fees-v144-cargo-home/registry/cache/index.crates.io-6f17d22bba15001f'/(crate+'.crate');assert sha(archive.read_bytes())==package['checksum']
    copy(archive,P/'inputs/dependencies'/archive.name)
    with tarfile.open(archive)as t:
        for file in files:
            src=ROOT/'work/fees-v144-cargo-home/registry/src/index.crates.io-6f17d22bba15001f'/crate/file
            data=src.read_bytes();assert t.extractfile(crate+'/'+file).read()==data
            copy(src,P/'inputs/dependencies'/crate/file)
    dep_rows.append({'name':package['name'],'version':package['version'],'archive_sha256':package['checksum'],'files':files})
obj(P/'dependencies.json',dep_rows)
obj(P/'scope.json',{'change':'Exactly one require! to require_gte!, limit first, checked depth second; unchanged u8 cap arithmetic, overflow ordering, error code, traversal, pricing, account handling.','before_source_count':37,'source_changes':[n],'new_builds':0,'new_transactions':0,'full_original_byte_equality':False,'macro_spelling':'Natural locked Anchor macro equivalent; binary proves comparison, decoration and order, not original token spelling.','failed_focus_preservation_manifest_sha256':sha((F/'manifest-sha256.json').read_bytes())})
print(json.dumps({'prepared':str(P.relative_to(ROOT)),'preserved_failure_manifest_sha256':sha((F/'manifest-sha256.json').read_bytes())}))
