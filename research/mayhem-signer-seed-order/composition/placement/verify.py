"""Bind retained LLVM diagnostics to actual compiler artifacts, without execution."""
if not __debug__:
    raise RuntimeError('Evidence checks require ordinary Python')
from pathlib import Path
import hashlib,importlib.util,json,re,tempfile
HERE=Path(__file__).resolve().parent
FUNCTION='_ZN16mayhem_recovered12instructions14pump_interface19legacy_sell_handler17hf2e4c78980301589E'

def module(name,path):
    spec=importlib.util.spec_from_file_location(name,path);out=importlib.util.module_from_spec(spec);spec.loader.exec_module(out);return out

def handler_ir(v,data):
    lines=data.decode('utf-8').splitlines(keepends=True);starts=[i for i,line in enumerate(lines) if line.startswith('define ') and '@'+FUNCTION+'(' in line]
    v.require(len(starts)==1,'unique LLVM handler definition required');a=starts[0];z=next(i for i in range(a+1,len(lines)) if lines[i]=='}\n');return ''.join(lines[a:z+1]),dict(first_line=a+1,last_line=z+1)

def compare_prefix(v,a,b):
    start='  %0 = getelementptr';end='  %before_tokens = load i64'
    def prefix(s):
        v.require(s.count(start)==1 and s.count(end)==1,'LLVM prefix bounds differ');return s[s.index(start):s.index('\n',s.index(end))+1]
    x,y=prefix(a),prefix(b)
    v.require(x.count('%bb67')==y.count('%bb66')==3 and '\nbb67:' in a and '\nbb66:' in b,'LLVM return-label bridge differs')
    v.require(x.replace('%bb67','%bb66')==y,'LLVM arithmetic prefix differs beyond return labels')
    rows={}
    for label,s in [('baseline',a),('late-inline',b)]:
        hits=[i for i,line in enumerate(s.splitlines()) if 'getelementptr' in line and 'ptr %ctx, i64 34' in line]
        v.require(len(hits)==1,'LLVM Context field access differs');rows[label]=hits[0]+1
    v.require(rows=={'baseline':260,'late-inline':902},'LLVM Context field position differs')
    return dict(lines=len(x.splitlines()),sha256_after_return_label_bridge=hashlib.sha256(y.encode()).hexdigest(),explicit_bridge={'baseline':'%bb67','late-inline':'%bb66','occurrences':3},context_gep_handler_lines=rows,scope='Exact 210-line text prefix with one explicit return-label rename; not an IR/CFG/alias equivalence proof.')

def parse_trace(v,log,stage):
    marker='# *** IR Dump '+stage+' Branch Probability Basic Block Placement (block-placement) ***:'
    v.require(log.count(marker)==1,'unique block-placement trace required');a=log.index(marker);end='# End machine code for function '+FUNCTION+'.';z=log.index(end,a)+len(end);fragment=log[a:z]
    v.require(fragment.count('# Machine code for function '+FUNCTION+':')==1,'trace function filter differs')
    blocks=[];current=None
    for line in fragment.splitlines():
        header=re.match(r'^bb\.(\d+)(?: \((.*)\))?:$',line)
        if header:current=dict(id=int(header[1]),ir_block=header[2],calls=[]);blocks.append(current);continue
        call=re.match(r'\s*JAL\s+[@&]("[^"]+"|[^,]+),',line)
        if call:
            v.require(current is not None,'trace call outside block');current['calls'].append(call[1].strip('"'))
        elif re.search(r'\bJAL\w*\b',line):v.require(False,'unhandled trace call encoding')
    v.require(blocks and len({b['id'] for b in blocks})==len(blocks),'trace block labels duplicate')
    return dict(sha256=hashlib.sha256(fragment.encode()).hexdigest(),block_count=len(blocks),calls=[dict(block=b['id'],name=name) for b in blocks for name in b['calls']])

def trace_analysis(v,c,e,originals,log):
    fs=v.functions(e);symbols={}
    for s in e.symbols:symbols.setdefault(s['name'],set()).add(s['value'])
    imports={s['name'] for s in e.symbols if s['table']=='.dynsym'}
    def resolve(name):
        values=symbols.get(name,set());v.require(len(values)<=1,'ambiguous trace symbol');address=next(iter(values),None)
        if address in fs:return ('local',*v.shape(fs[address]))
        v.require(name in imports,'trace target lacks ELF binding');return ('import',name)
    result={}
    for stage in ('Before','After'):
        row=parse_trace(v,log,stage);row['callee_identities']=[resolve(x['name']) for x in row['calls']];v.require(len(row['calls'])==51,'trace callee count differs');result[stage.lower()]=row
    w,binding=c.body(v,e,originals,'sell','O0082');actual=c.calls(v,w,fs)
    v.require(result['after']['callee_identities']==[x[1] for x in actual],'post-placement callees differ from executable')
    result.update(entry_binding=binding,post_placement_matches_final_callees=True,final_call_offsets=[x[0] for x in actual])
    return result

def verify(root=HERE,check_manifest=True):
    parent=root.parent.parent;v=module('placement_parent',parent/'verify.py');c=module('placement_composition',root.parent/'verify.py')
    if check_manifest:v.manifest_check(parent)
    reader=module('placement_reader',parent/'reader.py');v.require(v.identity((parent/'reader.py').read_bytes())['sha256']==v.read(parent/'scope.json')['reader_sha256'],'placement reader differs')
    sources=c.sources(root.parent,v);builds=v.read(root.parent/'builds.json');irs={};result={}
    with tempfile.TemporaryDirectory(prefix='mayhem-placement-') as tmp:
        def elf(name,data):p=Path(tmp)/name;p.write_bytes(data);return reader.Elf(p)
        original=elf('original.so',v.raw(parent/'reference/original.so.gz'));v.require(v.identity(original.b)['sha256']==v.ORIGINAL,'placement original differs');originals={r['id']:original.window(r['start'],r['end']) for r in v.read(parent/'reference/original-windows.json')}
        for label in ('baseline','late-inline'):
            parent_folder=root.parent/'builds'/label;prior_launch=v.read(parent_folder/'launch.json.gz');prior=elf(label+'-parent.so',v.raw(parent_folder/'symbols.so.gz'));prior_strip=v.raw(parent_folder/'candidate-v154-strip.so.gz');rows={}
            for mode in ('ir','placement'):
                folder=root/'builds'/(label+'-'+mode);launch=v.read(folder/'launch.json.gz');receipt=v.read(folder/'result.json.gz');command=prior_launch['command'][:];command[command.index('--out-dir')+1]=launch['command'][launch['command'].index('--out-dir')+1]
                if mode=='ir':command[command.index('--emit=dep-info,link')]='--emit=dep-info,link,llvm-ir'
                else:command += ['-C','llvm-args=-print-before=block-placement','-C','llvm-args=-print-after=block-placement','-C','llvm-args=-filter-print-funcs='+FUNCTION]
                v.require(command==launch['command'],'diagnostic compiler command differs')
                inputs=c.variant(root.parent,v,sources,label)
                v.require(launch['source_inputs']==builds[label]['source_inputs']=={n:v.identity(b)['sha256'] for n,b in inputs.items()},'diagnostic source binding differs')
                v.require(launch['parent_launch_sha256']==v.identity(v.raw(parent_folder/'launch.json.gz'))['sha256'] and all(launch[k]==prior_launch[k] for k in ('checked_executables','reused_dependencies')),'diagnostic parent/compiler context differs')
                v.require(receipt['status']=='SUCCEEDED' and receipt['returncode']==0 and receipt['target_executions']==0 and receipt['source_unchanged'] and receipt['dependencies_unchanged'] and receipt['strip']['returncode']==0,'diagnostic compile failed/unexecuted')
                outputs={n:v.raw(folder/(n+'.gz')) for n in receipt['outputs']};v.require({n:v.identity(b) for n,b in outputs.items()}==receipt['outputs'],'diagnostic output binding differs')
                e=elf(label+'-'+mode+'.so',outputs['symbols.so']);strip=elf(label+'-'+mode+'-strip.so',outputs['candidate-v154-strip.so'])
                v.require(v.allocated(e)==v.allocated(prior)==v.allocated(strip) and strip.b==prior_strip,'diagnostic executable bytes changed')
                same=e.b==prior.b;v.require(same==(mode=='placement') and receipt['complete_outputs_equal_parent']==same,'diagnostic unstripped identity claim differs')
                row=dict(outputs=receipt['outputs'],whole_stripped_equal_parent=True,allocated_sections_equal_parent=True,whole_symbols_equal_parent=same)
                if mode=='ir':
                    ir=v.raw(folder/'module.ll.gz');v.require({'mayhem_recovered.ll':v.identity(ir)}==receipt['llvm_ir'],'retained optimized IR differs');handler,bounds=handler_ir(v,ir);irs[label]=handler
                    differences=[n for n,s in prior.sec.items() if e.b[e.sec[n]['offset']:e.sec[n]['offset']+e.sec[n]['size']]!=prior.b[s['offset']:s['offset']+s['size']]];v.require(differences==['.symtab','.strtab'],'IR-emission section differences changed')
                    row.update(module=v.identity(ir),handler_ir=v.identity(handler.encode()),handler_bounds=bounds,different_sections=differences)
                else:row['trace']=trace_analysis(v,c,e,originals,v.raw(folder/'stderr.log.gz').decode('utf-8'))
                rows[mode]=row
            result[label]=rows
        a=result['baseline']['placement']['trace'];b=result['late-inline']['placement']['trace']
        v.require(a['before']['callee_identities']==b['before']['callee_identities'],'pre-placement callee sequences differ')
        v.require(a['after']['callee_identities']!=b['after']['callee_identities'],'post-placement callee sequences unexpectedly equal')
        v.require((a['before']['block_count'],a['after']['block_count'],b['before']['block_count'],b['after']['block_count'])==(197,197,199,197),'machine block counts differ')
    return json.loads(json.dumps(dict(builds=result,arithmetic_prefix=compare_prefix(v,irs['baseline'],irs['late-inline']),pre_placement_callees_equal=True,post_placement_callees_equal=False,post_placement_matches_both_final_artifacts=True,successful_compiler_builds=4,target_executions=0,complete_windows_gained=0,scope='Compiler layout diagnostic; not behavior, CFG identity, source authenticity or complete-body recovery. Block numbers are stage-local and are not treated as stable identities.')))

if __name__=='__main__':
    r=verify();v=module('placement_report',HERE.parent.parent/'verify.py');v.require(r==v.read(HERE/'report.json.gz'),'placement saved report differs');print('Verified four diagnostic builds: identical pre-placement callees diverge in block placement; stripped outputs repeat their parents.')
