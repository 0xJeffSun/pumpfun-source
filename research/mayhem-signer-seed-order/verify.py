"""Replay ordinary Rust CPI-order controls offline; never execute a target or compiler."""
from pathlib import Path, PurePosixPath
from collections import Counter
import difflib,gzip,hashlib,importlib.util,io,json,struct,tarfile,tempfile

HERE=Path(__file__).resolve().parent
ORIGINAL='a87fa9f866272514e6acb852b668c4a08aeb173d56c883039991d114d1199bdb'
QUALIFIED='440b92811753dd9af1468f6bf2d0e9139309984de3519a8f9a937babfdb6c903'
LABELS=('baseline','baseline-repeat','early-staged','late-staged','late-inline','late-inline-repeat','late-literal')

def require(ok,message):
    if not ok:raise ValueError(message)
def identity(b):return dict(bytes=len(b),sha256=hashlib.sha256(b).hexdigest())
def raw(p):
    b=p.read_bytes();return gzip.decompress(b) if p.suffix=='.gz' else b
def read(p):return json.loads(raw(p))
def safe(name):
    p=PurePosixPath(name);require(name and not p.is_absolute() and '..' not in p.parts and ':' not in name and '\\' not in name and p.as_posix()==name,'unsafe archive path');return name
def unpack(b):
    out={}
    with tarfile.open(fileobj=io.BytesIO(b),mode='r:gz') as tf:
        for m in tf.getmembers():
            n=safe(m.name);require(m.isfile() and n not in out,'nonregular or duplicate archive member');out[n]=tf.extractfile(m).read()
    return out
def shape(w):return (w['end']-w['start'],w['normalized_sha256'],json.dumps(w['normalization_pattern'],sort_keys=True))
def functions(e):
    spans={(s['value'],s['value']+s['size']) for s in e.symbols if s['info']&15==2 and s['size']>=8 and e.lo<=s['value']<e.hi}
    return {a:e.window(a,b) for a,b in sorted(spans)}
def inventory(e,originals):
    fs=functions(e);by_shape={}
    for a,w in fs.items():by_shape.setdefault(shape(w),[]).append(a)
    matches={k:by_shape.get(shape(w),[]) for k,w in originals.items()};taken={}
    def assign(k,seen):
        for a in matches[k]:
            if a in seen:continue
            seen.add(a)
            if a not in taken or assign(taken[a],seen):taken[a]=k;return True
        return False
    for k in matches:assign(k,set())
    hashes={w['raw_sha256'] for w in fs.values()};raw_ids=[k for k,w in originals.items() if w['raw_sha256'] in hashes]
    return dict(normalized=sum(bool(v) for v in matches.values()),raw_local=len(raw_ids),injective=len(taken),raw_ids=raw_ids,matches=matches)
def operands(e,start,end):return [(pc,*struct.unpack_from('<BBhi',e.b,pc)) for pc in range(start,end,8)]
def context_spill_chain(e,w,pc,reg):
    """Syntactic reaching definitions in file order, not CFG/alias feasibility."""
    rows=operands(e,w['start'],pc);chain=[]
    def register(stop,r,depth=0):
        require(depth<20,'spill chain too deep')
        for at,op,rr,off,imm in reversed([x for x in rows if x[0]<stop]):
            if op in (0x85,0x8d) and r<6:return False
            if op&7 not in (1,4,7) and op!=0x18:continue
            if rr&15!=r:continue
            chain.append(dict(offset=at-w['start'],raw_hex=e.b[at:at+8].hex()))
            if op==0xbf:return register(at,rr>>4,depth+1)
            if op==0x79 and rr>>4==10:
                for sa,so,sr,ss,si in reversed([x for x in rows if x[0]<at]):
                    if so&7 not in (2,3) or sr&15!=10:continue
                    size={0:4,8:2,16:1,24:8}[so&24]
                    if ss<off+8 and ss+size>off:
                        chain.append(dict(offset=sa-w['start'],raw_hex=e.b[sa:sa+8].hex()))
                        return so==0x7b and ss==off and register(sa,sr>>4,depth+1)
                return False
            return False
        return r==1
    require(register(pc,reg),'Context load lacks syntactic argument-one spill chain')
    return list(reversed(chain))
def bump_read(e,w):
    hits=[r for r in operands(e,w['start'],w['end']) if r[1]==0x71 and r[3]==0x22]
    require(len(hits)==1,'ambiguous Context byte-load candidate');pc,op,regs,off,imm=hits[0]
    return dict(offset=pc-w['start'],raw_hex=e.b[pc:pc+8].hex(),base_register=regs>>4,destination_register=regs&15,syntactic_argument_spill_chain=context_spill_chain(e,w,pc,regs>>4))
def increment_patterns(e,w,limit):
    """Narrow load/add/store signatures; not alias, path or overflow equivalence."""
    rows=operands(e,w['start'],w['start']+limit);out=[]
    for i,r in enumerate(rows[:-1]):
        pc,op,regs,off,imm=r;count=regs&15;base=regs>>4
        if op!=0x79 or off!=0 or count==base:continue
        p,op2,regs2,off2,imm2=rows[i+1]
        if (op2,regs2,off2,imm2)!=(0x07,count,0,1):continue
        for end in rows[i+2:i+18]:
            at,code,rr,oo,ii=end
            if code==0x7b and rr&15==base and rr>>4==count and oo==0:
                out.append(dict(load_offset=pc-w['start'],store_offset=at-w['start'],count_register=count,base_register=base));break
            if code in (0x85,0x8d,0x95):break
            if code&7 in (1,4,7) and rr&15 in (base,count):break
    return out
def handler(e):
    rows=[s for s in e.symbols if s['info']&15==2 and 'legacy_sell_handler' in s['name']]
    require(len(rows)==1,'unique complete Legacy Sell symbol required');s=rows[0];return e.window(s['value'],s['value']+s['size'])
def call_shapes(w,targets):
    require(all(c['target'] in targets for c in w['direct']),'direct target lacks a complete window')
    return [shape(targets[c['target']]) for c in w['direct']]
def positive_calls(originals,candidate,inv):
    original_targets={w['start']:w for w in originals.values()};targets=functions(candidate);out={}
    for k,addresses in inv['matches'].items():
        ow=originals[k];positive=set()
        for a in addresses:
            cw=targets[a];require([c['offset'] for c in ow['direct']]==[c['offset'] for c in cw['direct']],'matched body direct-call offsets differ')
            for x,y in zip(ow['direct'],cw['direct']):
                if x['target'] in original_targets and y['target'] in targets and shape(original_targets[x['target']])==shape(targets[y['target']]):positive.add(x['offset'])
        out[k]=sorted(positive)
    return out
def allocated(e):return {s['name']:(s['address'],s['size'],s['flags'],identity(e.b[s['offset']:s['offset']+s['size']]) if s['type']!=8 else None) for s in e.sections if s['flags']&2}
def analyze_handler(e,w,original,ow,originals):
    a,_=original.norm(ow['start'],ow['end']);b,_=e.norm(w['start'],w['end'])
    align=difflib.SequenceMatcher(None,[a[i:i+8] for i in range(0,len(a),8)],[b[i:i+8] for i in range(0,len(b),8)],autojunk=False)
    oc=call_shapes(ow,{v['start']:v for v in originals.values()});cc=call_shapes(w,functions(e));bump=bump_read(e,w)
    return dict(start=w['start'],bytes=w['end']-w['start'],raw_sha256=w['raw_sha256'],normalized_sha256=w['normalized_sha256'],complete_shape_equal=shape(ow)==shape(w),diagnostic_aligned_slots=sum(m.size for m in align.get_matching_blocks()),direct_calls=len(cc),direct_callee_multiset_equal=Counter(oc)==Counter(cc),ordered_direct_callees_equal=oc==cc,external_calls=len(w['external']),bump_read=bump,increment_patterns_before_bump=increment_patterns(e,w,bump['offset']))
def manifest_check(root):
    paths=list(root.rglob('*'));require(not any(p.is_symlink() for p in paths),'packet symlink');require(all(p.is_file() or p.is_dir() for p in paths),'packet special file')
    actual={p.relative_to(root).as_posix():identity(p.read_bytes()) for p in paths if p.is_file() and p!=root/'manifest.json'}
    require(actual==read(root/'manifest.json')['files'],'packet manifest differs')
def verify(root=HERE,check_manifest=True):
    if check_manifest:manifest_check(root)
    scope=read(root/'scope.json');acquisition=read(root/'acquisition.json');reader_bytes=(root/'reader.py').read_bytes()
    require(identity(reader_bytes)['sha256']==scope['reader_sha256']==acquisition['files']['research/mayhem-quotes-current-recovery-20261027/reader.py']['sha256'],'reader differs')
    spec=importlib.util.spec_from_file_location('retained_cpi_reader',root/'reader.py');reader=importlib.util.module_from_spec(spec);spec.loader.exec_module(reader)
    source=unpack((root/'source/baseline.tar.gz').read_bytes());pins=read(root/'source-inputs.json')
    require(len(source)==67 and {n:identity(b)['sha256'] for n,b in source.items()}==pins==acquisition['source_inputs'],'exact current source differs')
    later=read(root/'related-work/review.json');compared=0
    def cpi_region(b):
        b=b.split(b'pub fn legacy_sell_handler(')[1];return b[b.index(b' let before_sol='):b.index(b' a.mayhem_token_vault.reload()?;a.bonding_curve.reload()?;')]
    for record in later['records'].values():
        if record['revision']==later['main']:
            require(record['sha256']==acquisition['files'][record['path']]['sha256'],'qualified inputs changed on reviewed main');continue
        b=(root/'related-work'/safe(record['retained'])).read_bytes();require(identity(b)['sha256']==record['sha256'] and hashlib.sha1(b'blob '+str(len(b)).encode()+b'\0'+b).hexdigest()==record['git_blob'],'related source Git blob differs')
        require(cpi_region(gzip.decompress(b))==cpi_region(source['src/instructions/pump_interface.rs']),'related CPI source overlaps');compared+=1
    require(compared==6,'related source cohort differs')
    rows=read(root/'reference/original-windows.json');prior=read(root/'reference/original-inventory-provenance.json.gz')['original_rows']
    require(rows==[{k:r[k] for k in ('id','start','end')} for r in prior],'original range provenance differs')
    original_data=raw(root/'reference/original.so.gz');require(identity(original_data)['sha256']==ORIGINAL,'original ELF differs')
    qualified_data=raw(root/'reference/qualified-symbols.so.gz');require(identity(qualified_data)['sha256']==QUALIFIED,'qualified ELF differs')
    builds=read(root/'builds.json');require(set(builds)==set(LABELS),'build cohort differs');result={};baseline=None;all_bytes={}
    with tempfile.TemporaryDirectory(prefix='mayhem-cpi-order-') as tmp:
        tmp=Path(tmp)
        def elf(name,b):p=tmp/name;p.write_bytes(b);return reader.Elf(p)
        original=elf('original.so',original_data);qualified=elf('qualified.so',qualified_data);originals={r['id']:original.window(r['start'],r['end']) for r in rows}
        require(len(originals)==441 and rows[0]['start']==original.lo and rows[-1]['end']==original.hi and all(a['end']==b['start'] for a,b in zip(rows,rows[1:])),'original ranges incomplete')
        ow=originals['O0082'];require((ow['start'],ow['end']-ow['start'])==(127520,12992),'original handler bounds differ')
        qi=inventory(qualified,originals);require((qi['normalized'],qi['raw_local'],qi['injective'])==(432,100,431),'qualified inventory differs')
        original_observation=dict(bump_read=bump_read(original,ow));original_observation['increment_patterns_before_bump']=increment_patterns(original,ow,original_observation['bump_read']['offset'])
        for label in LABELS:
            folder=root/'builds'/label;launch=read(folder/'launch.json.gz');receipt=read(folder/'result.json.gz');record=builds[label]
            require(receipt['status']=='SUCCEEDED' and receipt['returncode']==0 and receipt['target_executions']==0,'failed/unexecuted build')
            inputs=dict(source)
            if not label.startswith('baseline'):inputs['src/instructions/pump_interface.rs']=(root/'source'/(label+'.rs')).read_bytes()
            require({n:identity(b)['sha256'] for n,b in inputs.items()}==record['source_inputs']==launch['source_inputs'],'build source binding differs')
            src=inputs['src/instructions/pump_interface.rs'];old=source['src/instructions/pump_interface.rs'];marker=b'pub fn legacy_sell_handler(';ending=b'#[inline(always)]\nfn clone_sell_info'
            require(src.split(marker)[0]==old.split(marker)[0] and src.split(ending)[1]==old.split(ending)[1],'control escaped handler')
            require(src.count(b'\n')==old.count(b'\n'),'source lines shifted')
            def origin(b):i=b.index(b'error!(MayhemError::PumpCpiFailed)');return b[:i].count(b'\n')+1,i-b.rfind(b'\n',0,i)
            require(origin(src)==origin(old),'CPI error source coordinate changed')
            for name,pin in record['outputs'].items():require(identity(raw(folder/(name+'.gz')))==pin==receipt['outputs'][name],'compiler output binding differs')
            data=raw(folder/'symbols.so.gz');all_bytes[label]=data;e=elf(label+'.so',data);stripped=elf(label+'-strip.so',raw(folder/'candidate-v154-strip.so.gz'));require(allocated(e)==allocated(stripped),'strip changed allocated sections');require(data!=original_data and stripped.b!=original_data,'unexpected whole original equality')
            inv=inventory(e,originals);require((inv['normalized'],inv['raw_local'],inv['injective'])==(432,77,431),'native inventory differs');positive=positive_calls(originals,e,inv)
            if baseline is None:baseline=(inv,positive,launch)
            bi,bp,bl=baseline
            require(inv['raw_ids']==bi['raw_ids'] and {k for k,v in inv['matches'].items() if v}=={k for k,v in bi['matches'].items() if v}=={k for k,v in qi['matches'].items() if v},'match set changed')
            require(all(set(bp[k])<=set(positive[k]) for k in bp),'positive direct-call observation lost')
            require(launch['checked_executables']==bl['checked_executables'],'compiler tool cohort changed')
            h=analyze_handler(e,handler(e),original,ow,originals);require(not h['complete_shape_equal'] and h['direct_callee_multiset_equal'] and h['direct_calls']==50 and h['external_calls']==1,'handler scope/callees differ')
            result[label]=dict(artifact=identity(data),inventory=inv,positive_direct_observations=sum(map(len,positive.values())),handler=h)
        require(all_bytes['baseline']==all_bytes['baseline-repeat'],'baseline root repeat differs');require(all_bytes['late-inline']==all_bytes['late-inline-repeat'],'inline root repeat differs')
        require(result['baseline']['handler']['normalized_sha256']==handler(qualified)['normalized_sha256'],'native and qualified handler differ')
    records=unpack((root/'builds/baseline/wrapper-records.tar.gz').read_bytes());commands=[json.loads(b) for b in records.values()]
    compiles=[c for c in commands if '--crate-name' in c['after'] and any(a in c['after'] for a in ('--emit=dep-info,link','--emit=dep-info,metadata,link'))]
    targets=[c for c in compiles if '--target' in c['after'] and c['after'][c['after'].index('--target')+1]=='sbpf-solana-solana'];require(len(compiles)==163 and len(targets)==85,'baseline compile cohort differs')
    metadata=[line.split('\t') for line in (root/'controller/metadata-map.tsv').read_text().splitlines()]
    for c in targets:
        old=[a[9:] for a in c['before'] if a.startswith('metadata=')];new=[a[9:] for a in c['after'] if a.startswith('metadata=')];name=c['after'][c['after'].index('--crate-name')+1]
        require(len(old)==len(new)==1 and [old[0],new[0],name] in metadata,'actual metadata binding differs')
    rv=root/'rebuild-validation';rebuilt=read(rv/'result.json.gz');comparison=read(rv/'comparison.json.gz');relaunch=read(rv/'launch.json.gz')
    require(rebuilt['status']=='SUCCEEDED' and rebuilt['returncode']==0 and rebuilt['source_unchanged'] and rebuilt['root_invocations']==1 and rebuilt['target_executions']==0,'rebuild incomplete')
    require(comparison['outputs_equal'] and comparison['actual']==comparison['expected']==rebuilt['outputs']==builds['baseline']['outputs'],'rebuild complete outputs differ')
    require(relaunch['target_directory_initially_absent'] and relaunch['source_inputs']==pins and relaunch['checked_executables']==baseline[2]['checked_executables'],'rebuild inputs differ')
    for n,pin in rebuilt['logs'].items():require(identity(raw(rv/(n+'.gz')))==pin,'rebuild log differs')
    rc=[json.loads(b) for b in unpack((rv/'wrapper-records.tar.gz').read_bytes()).values()];rc=[c for c in rc if '--crate-name' in c['after'] and any(a in c['after'] for a in ('--emit=dep-info,link','--emit=dep-info,metadata,link'))]
    require(len(rc)==163,'rebuild compiler cohort differs')
    child_spec=importlib.util.spec_from_file_location('retained_composition_check',root/'composition/verify.py');child=importlib.util.module_from_spec(child_spec);child_spec.loader.exec_module(child)
    composition=child.verify(root/'composition',False);require(composition==read(root/'composition/report.json.gz'),'composition saved report differs')
    return dict(original=original_observation,qualified=dict(normalized=432,raw_local=100,injective=431),builds=result,full_build_compiler_commands=len(compiles),target_compiler_commands=len(targets),rebuild_validation=dict(fresh=True,complete_outputs_equal=True,compiler_commands=len(rc)),composition=dict(compiler_builds=composition['compiler_builds'],complete_windows_gained=0,target_executions=0),complete_windows_gained=0,target_executions=0,whole_original_equal=False)

if __name__=='__main__':
    r=verify();require(r==read(HERE/'report.json'),'saved report differs');print('Verified seven parent builds, eight composition root builds and a fresh composition rebuild: native matches retained; Legacy Sell remains unmatched; no target execution.')
