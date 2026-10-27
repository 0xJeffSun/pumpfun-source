"""Verify one ordinary Rust expression, its compiler delta and bounded executions."""
from pathlib import Path
import argparse,ast,difflib,gzip,hashlib,importlib.util,json,struct,sys,tarfile,tempfile
if not __debug__:raise RuntimeError('verification requires assertions')
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent
sha=lambda b:hashlib.sha256(b).hexdigest()
def read(p):
    b=p.read_bytes();return gzip.decompress(b)if p.suffix=='.gz'else b
def load(p):return json.loads(read(p))
def module():
    s=importlib.util.spec_from_file_location('sync_inventory',P/'inventory.py');m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m
def inputs(label):
    with tarfile.open(P/(label+'-source.tar.xz'))as t:
        rows=t.getmembers();assert all(r.isfile()and not r.name.startswith('/')and '..'not in Path(r.name).parts for r in rows)
        assert len({r.name for r in rows})==len(rows);result={r.name:t.extractfile(r).read()for r in rows}
    assert {n:sha(b)for n,b in result.items()}==load(P/(label+'-inputs.json'));return result
def helper(m,image):
    rows=[r for r in m.functions(image)if any('27sync_virtual_quote_reserves' in n for n in r['symbols'])]
    assert len(rows)==1 and rows[0]['bytes']==1168
    r=rows[0];return r,m.body(image,m.sections(image),r['start'],r['bytes'])
def commuting_delta(m,parent,proposal):
    assert len(parent)==len(proposal) and sum(a!=b for a,b in zip(parent,proposal))==4
    assert m.sections(parent)==m.sections(proposal) and m.functions(parent)==m.functions(proposal)
    f,a=helper(m,parent);g,b=helper(m,proposal);assert f==g
    assert a[:736]==b[:736] and a[752:]==b[752:]
    assert a[736:744]==b[744:752] and a[744:752]==b[736:744]
    one,two=[struct.unpack('<BBhi',a[o:o+8])for o in [736,744]]
    assert one[0]==two[0]==0x79 and one[1]>>4==two[1]>>4==10
    assert one[1]&15!=two[1]&15 and all(r[1]&15!=10 and -4096<=r[2]<=-8 and r[2]%8==0 for r in [one,two])
    i=0;branch_offsets=[]
    while i<len(a):
        op,regs,disp,imm=struct.unpack_from('<BBhi',a,i)
        if op&7 in [5,6]and op not in [0x85,0x95]:
            assert i+8+disp*8!=744,'control flow enters the middle of the swapped pair'
            branch_offsets.append(i)
        i+=16 if op==0x18 else 8
    assert i==len(a) and branch_offsets
    return dict(parent_bytes=a[736:752].hex(),proposal_bytes=b[736:752].hex(),branch_offsets=branch_offsets)
def immediate_calls(m,original,candidate):
    os,cs=m.sections(original),m.sections(candidate);f,b=helper(m,candidate)
    a=m.body(original,os,664560,1168);an,ao=m.normalize(a,664560,os);bn,bo=m.normalize(b,f['start'],cs)
    assert an==bn and len(ao)==len(bo)==9
    ranges=load(P/'reference/inventory.json.gz')['windows'];om={r['start']:r for r in ranges};cm={r['start']:r for r in m.functions(candidate)};result=[]
    for x,y in zip(ao,bo):
        assert x['kind']==y['kind']=='direct-call'and x['offset']==y['offset']
        left,right=om[x['target']],cm[y['target']]
        a=m.normalize(m.body(original,os,left['start'],left['bytes']),left['start'],os)[0]
        b=m.normalize(m.body(candidate,cs,right['start'],right['bytes']),right['start'],cs)[0]
        assert a==b,'actual immediate callee differs'
        result.append(dict(offset=x['offset'],original=x['target'],candidate=y['target'],original_bytes=left['bytes'],candidate_bytes=right['bytes'],symbol=right['symbols'],normalized_equal=True))
    return result
def verify(original_path):
    assert not any(x.is_symlink()for x in P.rglob('*'))
    actual={x.relative_to(P).as_posix():sha(x.read_bytes())for x in P.rglob('*')if x.is_file()and x.name!='manifest.json'};assert actual==load(P/'manifest.json')
    cp=load(P/'CHECKPOINT.json');m=module();original=original_path.read_bytes();assert sha(original)==cp['original_sha256']
    for n in ['pump_compare_function_bytes.py','pump_quote_control_function_match.py']:
        assert sha((P/'reference/inputs/scripts'/n).read_bytes())==cp['input_python_sha256']['scripts/'+n]
    provenance=load(P/'provenance.json')
    assert provenance['original_helper_start']==664560 and provenance['original_helper_bytes']==1168
    assert provenance['new_normalized_windows']==1 and not provenance['whole_elf_equal']
    primary=inputs('primary');assert len(primary)==56 and {n:sha(b)for n,b in primary.items()}==cp['primary_source_sha256']
    before,after=inputs('before'),inputs('after');key='programs/pump/src/mayhem_virtual_params.rs'
    text=primary['Cargo.toml'].decode();start=text.index('[profile.release]');end=text.index('[workspace]')
    assert not text[end+len('[workspace]'):].strip()
    expected={'programs/pump/'+n:b for n,b in primary.items()if n not in ['Cargo.toml','Cargo.lock']}
    expected.update({'programs/pump/Cargo.toml':(text[:start].rstrip()+'\n').encode(),
        'Cargo.toml':('[workspace]\nmembers = ["programs/pump"]\nresolver = "2"\n\n'+text[start:end].strip()+'\n').encode(),
        'Cargo.lock':primary['Cargo.lock']});assert expected==before
    assert set(before)==set(after)and[n for n in before if before[n]!=after[n]]==[key]
    old=b'let numerator = (denominator as u128 + virtual_token_reserves as u128)'
    new=b'let numerator = (denominator as u128).checked_add(virtual_token_reserves as u128).ok_or(PumpError::Overflow)?'
    assert before[key].count(old)==1 and before[key].replace(old,new)==after[key]
    assert before[key].count(b'\n')==after[key].count(b'\n')
    patch=''.join(difflib.unified_diff(before[key].decode().splitlines(True),after[key].decode().splitlines(True),fromfile='before/'+key,tofile='after/'+key))
    assert patch.encode()==read(P/'source.patch.gz')
    binding=load(P/'sdk-archive-binding.json.gz');sdk=binding['resolved_inputs']
    assert binding['archive_sha256']=='6719b889d60677a8a2fcf4c82f68441a1afe0ab093edd2efe9f84a67a808b3e9'and len(sdk)==2775
    assert sdk['rust/bin/rustc']=='c8807b7ebede8578ac5a257ea333780f9d89bd356064fd8184af7e996cb71a97'
    images={};reports={};full={}
    with tempfile.TemporaryDirectory()as td:
        for label,count,source in [('parent',749,before),('proposal',750,after),('repeat',750,after)]:
            p=P/'builds'/label;launch,result=load(p/'launch.json.gz'),load(p/'result.json')
            assert launch['primary_source_inputs']==cp['primary_source_sha256']
            assert launch['workspace_inputs']=={n:sha(b)for n,b in source.items()}and launch['sdk_inputs']==sdk
            assert result['exit_code']==0 and result['root_invocations']==1 and result['primary_unchanged']and result['source_unchanged']and result['sdk_unchanged']
            assert '--locked'in launch['command']and '--offline'in launch['command']
            assert launch['command'][launch['command'].index('--target')+1]=='sbpf-solana-solana'
            log=read(p/'build.log.gz');assert sha(log)==result['build_log_sha256']and log.count(b'--crate-name pump_recovered ')==1 and b'exceeded max offset'not in log
            symbols,stripped=[read(p/(n+'.gz'))for n in ['unstripped.so','candidate.so']]
            assert sha(symbols)==result['unstripped_sha256']and sha(stripped)==result['candidate_sha256']
            ss,ts=m.sections(symbols),m.sections(stripped)
            for name in ['.text','.rodata','.data.rel.ro','.dynsym','.dynstr','.dynamic','.rel.dyn']:
                assert ss[name]['addr']==ts[name]['addr']and ss[name]['size']==ts[name]['size']
                assert symbols[ss[name]['offset']:ss[name]['offset']+ss[name]['size']]==stripped[ts[name]['offset']:ts[name]['offset']+ts[name]['size']]
            images[label]=(symbols,stripped);path=Path(td)/(label+'.so');path.write_bytes(symbols);iv=m.inventory(path,original_path)
            assert (iv['injective_normalized'],iv['membership_normalized'],iv['injective_raw'])==(count,count,131)and not iv['losses']
            full[label]=iv;reports[label]={k:v for k,v in iv.items()if k!='windows'}
            if label!='repeat':assert iv==load(p/'inventory.json.gz')
    assert images['proposal']==images['repeat']
    assert sha(images['parent'][0])=='f5f70a89c15b864c94e2539db72b8abc78eed91c66f27d60a10c2238037075b1'
    assert sha(images['parent'][1])=='b46dc735d6abe155ecb1eaa120894e450c04240d4ed23d530717579eec283842'
    for index in [0,1]:assert sum(x!=y for x,y in zip(images['parent'][index],images['proposal'][index]))==4
    delta=commuting_delta(m,images['parent'][0],images['proposal'][0])
    old={r['start']for r in full['parent']['windows']if r['candidates']};new={r['start']for r in full['proposal']['windows']if r['candidates']};assert new-old=={664560}and not old-new
    for iv in [full['parent'],full['proposal']]:
        iv['raw_set']={r['start']for r in iv['windows']if any(c['raw_sha256']==r['raw_sha256']for c in r['candidates'])}
    assert full['parent']['raw_set']==full['proposal']['raw_set']
    assert immediate_calls(m,original,images['proposal'][0])==load(P/'immediate-calls.json')
    oracle=(P/'runtime/frozen_oracle.py').read_bytes();assert sha(oracle)=='d266caf96eb7619e6a26e5775b40a35480161dc08b90ab83935d261b1cfde5cb'
    fn=next(x for x in ast.parse(oracle).body if isinstance(x,ast.FunctionDef)and x.name=='cases');scope={};exec(compile(ast.Module(body=[fn],type_ignores=[]),'<frozen cases>','exec'),scope);cases=scope['cases']();assert len(cases)==84
    execution=load(P/'runtime/execution.json');bound=load(P/'runtime/inputs.json');assert bound['evidence/original/pump/deployed.so']==sha(original)and bound['scripts/pump_set_mayhem_virtual_params_differential.py']==sha(oracle)
    for label in ['parent','proposal']:
        result=load(P/'runtime'/(label+'.json.gz'));receipt=execution[label]
        assert receipt['returncode']==0 and receipt['candidate_unchanged']and receipt['inputs_unchanged']
        assert result['original_sha256']==sha(original)and result['candidate_sha256']==receipt['candidate_sha256']==sha(images[label][1])
        assert result['stub_sha256']==bound['scripts/fixtures/signer_stub.so']and not result['mismatches']
        assert [r['case']for r in result['cases']]==cases
        for i,row in enumerate(result['cases']):
            assert row['i']==i and not row['diff']and all(row['original'].get(k)==row['candidate'].get(k)for k in ['err','vqr','vtr','events','logs'])
        assert sum(r['original']['err']is None for r in result['cases'])==82
    return dict(verified=True,profiles=reports,helper_bytes=1168,immediate_calls=9,compiler_changed_bytes=4,delta=delta,synthetic_comparisons=168,distinct_new_case_definitions=0,whole_elf_equal=False)
def controls(original_path):
    m=module();a=read(P/'builds/parent/unstripped.so.gz');b=read(P/'builds/proposal/unstripped.so.gz');f,code=helper(m,b);section=m.sections(b)['.text'];base=f['start']-section['addr']+section['offset']
    # A valid branch entering the second load invalidates the commutation argument.
    proof=commuting_delta(m,a,b);site=proof['branch_offsets'][0];left,right=bytearray(a),bytearray(b)
    for image in [left,right]:struct.pack_into('<h',image,base+site+2,(744-site-8)//8)
    try:commuting_delta(m,left,right)
    except AssertionError:pass
    else:raise AssertionError('interior entry was accepted')
    # Ordinary function normalization masks this call; actual callee qualification must reject it.
    changed=bytearray(b);struct.pack_into('<i',changed,base+336+4,(1694896-(f['start']+336+8))//8)
    try:immediate_calls(m,original_path.read_bytes(),changed)
    except AssertionError:pass
    else:raise AssertionError('wrong actual call target was accepted')
    return dict(interior_branch_rejected=True,wrong_actual_callee_rejected=True)
if __name__=='__main__':
    p=argparse.ArgumentParser(description=__doc__);p.add_argument('--original',type=Path,default=P.parents[1]/'evidence/original/pump/deployed.so');p.add_argument('--controls',action='store_true');a=p.parse_args();r=verify(a.original)
    if a.controls:r['controls']=controls(a.original)
    print(json.dumps(r))
