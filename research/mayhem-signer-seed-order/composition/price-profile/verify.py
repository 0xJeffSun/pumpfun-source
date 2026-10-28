"""Replay actual LLVM diagnostics for the helper/closure price-guard difference."""
if not __debug__:
    raise RuntimeError('Evidence checks require ordinary Python')
from pathlib import Path
import importlib.util,json,re

HERE=Path(__file__).resolve().parent
HANDLER='_ZN16mayhem_recovered12instructions14pump_interface19legacy_sell_handler17hf2e4c78980301589E'
HELPER='_ZN16mayhem_recovered12instructions14pump_interface18legacy_price_check17hb0c4e61afe85aad1E'
CLOSURE='_ZN16mayhem_recovered12instructions14pump_interface19legacy_sell_handler28_$u7b$$u7b$closure$u7d$$u7d$17h60a03ec08cb4ff82E'
LABELS=('closure-control','helper','closure','helper-callee','closure-callee')
OUTPUTS=('symbols.so','candidate-v154-strip.so')
SOURCE='src/instructions/pump_interface.rs'

def module(name,path):
    s=importlib.util.spec_from_file_location(name,path);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m

def closure_source(v,inputs):
    out=dict(inputs);b=out[SOURCE]
    marker=b'fn legacy_price_check(vt:u128,vs:u128,reference:u128,tolerance_bps:u16)->core::result::Result<(),MayhemError> {'
    v.require(b.count(marker)==1,'profile helper source anchor differs')
    body=b.split(marker)[1].strip();v.require(body.endswith(b'}') and b'//' not in body,'profile helper body differs')
    body=b' '.join(line.strip() for line in body[:-1].splitlines() if line.strip())
    old=b' legacy_price_check(c.virtual_token_reserves as u128,c.virtual_sol_reserves as u128,reference,tolerance_bps)?;'
    new=b' let vt=c.virtual_token_reserves as u128;let vs=c.virtual_sol_reserves as u128;let price_check:core::result::Result<(),MayhemError>=(||{'+body+b'})();price_check?;'
    v.require(b.count(old)==1,'profile helper invocation differs');out[SOURCE]=b.replace(old,new)
    def origin(x):i=x.index(b'error!(MayhemError::PumpCpiFailed)');return x[:i].count(b'\n'),i-x.rfind(b'\n',0,i)
    v.require(b.count(b'\n')==out[SOURCE].count(b'\n') and origin(b)==origin(out[SOURCE]),'profile CPI source coordinates shifted')
    return out,[dict(old=old.decode(),new=new.decode())]

def events(v,log,callee):
    # Rust's JSON diagnostics can quote a whole IR dump on one very long line.
    # Bind only actual LLVM headers and definitions, never those quoted strings.
    headers=[m for m in re.finditer(r'(?m)^(?:[;#] )?\*\*\* IR Dump[^\r\n]*\r?$',log) if len(m[0])<1000]
    result=[]
    for i,h in enumerate(headers):
        chunk=log[h.end():headers[i+1].start() if i+1<len(headers) else len(log)];functions={}
        for name in (HANDLER,callee):
            starts=list(re.finditer(r'(?m)^define [^\r\n]*@"?'+re.escape(name)+r'"?\(',chunk))
            v.require(len(starts)<=1,'profile duplicate function in dump')
            if starts:
                start=starts[0].start();end=chunk.find('\n}',start);v.require(end>=0,'profile unterminated definition');functions[name]=chunk[start:end+2]
        result.append(dict(index=i,header=h[0].rstrip('\r'),functions=functions))
    v.require(result and all(x['functions'] for x in result),'profile unbound IR dump')
    return result

def guard(v,fragment):
    # Bind tolerance multiplication by its zero-extended i16 operand. Other
    # umul intrinsics include quote arithmetic and price * 10^15 in early IR.
    casts=re.findall(r'(%\d+) = zext i16 %\d+ to i128',fragment);products=[]
    for cast in casts:
        products+=re.findall(r'(%\d+) = (?:tail )?call \{ i128, i1 \} @llvm\.umul\.with\.overflow\.i128\(i128 %\d+, i128 '+re.escape(cast)+r'\)',fragment)
    v.require(len(products)==1,'profile unique tolerance product required');product=products[0]
    flags=re.findall(r'(%\d+) = extractvalue \{ i128, i1 \} '+re.escape(product)+r', 1',fragment)
    v.require(len(flags)==1,'profile unique overflow flag required');flag=flags[0]
    expects=re.findall(r'(%\d+) = (?:tail )?call i1 @llvm\.expect\.i1\(i1 '+re.escape(flag)+r', i1 false\)',fragment)
    v.require(len(expects)<=1,'profile duplicate overflow expect')
    branches=[]
    for i,line in enumerate(fragment.splitlines(),1):
        m=re.fullmatch(r'\s*br i1 (%\d+), label %([\w.]+), label %([\w.]+)(.*)',line)
        if m and m[1] in [flag,*expects]:
            branches.append(dict(line=i,condition=m[1],true=m[2],false=m[3],profile=bool(re.search(r', !prof !\d+',m[4])),text=line.strip()))
    v.require(branches,'profile overflow branch missing')
    return dict(product=product,flag=flag,expect=expects,branches=branches)

def blocks(fragment):
    result={};current=None
    for line in fragment.splitlines()[1:-1]:
        label=re.match(r'^([\w.]+):',line)
        if label:current=label[1];result[current]=[]
        elif current and line.strip() and not line.lstrip().startswith(';'):result[current].append(line.strip())
    return result

def empty_diamond(fragment,branch):
    b=blocks(fragment);jumps=[]
    for name in ('true','false'):
        lines=b.get(branch[name],[])
        if len(lines)!=1:return None
        match=re.fullmatch(r'br label %([\w.]+)',lines[0])
        if not match:return None
        jumps.append(match[1])
    return jumps[0] if jumps[0]==jumps[1] else None

def pair(v,records,passname,name,occurrence=0):
    before=[r for r in records if r['header'].startswith('; *** IR Dump Before '+passname+' on '+name+' ***')]
    v.require(len(before)>occurrence,'profile pass boundary missing');b=before[occurrence]
    a=records[b['index']+1]
    v.require(a['header']==b['header'].replace('Before ','After ',1),'profile pass pair differs')
    return b,a

def loss(v,before,after):
    b=guard(v,before);a=guard(v,after)
    v.require(not b['expect'] and len(b['branches'])==3 and [x['profile'] for x in b['branches']]==[True,False,False],'profile pre-simplification guards differ')
    join=empty_diamond(before,b['branches'][0])
    v.require(join is not None and blocks(before)[join]==[b['branches'][1]['text']],'profile empty diamond differs')
    v.require(not a['expect'] and len(a['branches'])==1 and not a['branches'][0]['profile'],'profile surviving guard differs')
    return dict(before=b,after=a,empty_diamond_join=join)

def calls(fragment,name):
    return len(re.findall(r'(?m)^\s*[^\n]*\bcall [^\n]*@"?'+re.escape(name)+r'"?\(',fragment))

def trace(v,a,log,canonical,callee_enabled):
    callee=HELPER if canonical=='helper' else CLOSURE;records=events(v,log,callee);observations={}
    if callee_enabled:
        b,z=pair(v,records,'LowerExpectIntrinsicPass',callee)
        before=guard(v,b['functions'][callee]);after=guard(v,z['functions'][callee])
        v.require(len(before['expect'])==1 and before['branches'][0]['condition']==before['expect'][0] and not before['branches'][0]['profile'],'profile expected intrinsic missing')
        v.require(not after['expect'] and after['branches'][0]['condition']==after['flag'] and after['branches'][0]['profile'],'profile lowering lost expected branch metadata')
        observations['lower_expect']=dict(before=before,after=after)
        b,z=pair(v,records,'SimplifyCFGPass',callee,1)
        if canonical=='closure':observations['second_simplifycfg']=loss(v,b['functions'][callee],z['functions'][callee])
        else:
            before=guard(v,b['functions'][callee]);after=guard(v,z['functions'][callee])
            v.require(len(before['branches'])==len(after['branches'])==1 and before['branches'][0]['profile'] and after['branches'][0]['profile'],'profile helper guard not retained')
            v.require(empty_diamond(b['functions'][callee],before['branches'][0]) is None,'profile helper unexpectedly has empty diamond')
            observations['second_simplifycfg']=dict(before=before,after=after,empty_diamond_join=None)
        b,z=pair(v,records,'AlwaysInlinerPass','[module]')
        v.require(callee in b['functions'] and calls(b['functions'][HANDLER],callee)==1,'profile pre-always-inline callee missing')
        if canonical=='helper':
            v.require(callee not in z['functions'] and calls(z['functions'][HANDLER],callee)==0,'profile helper was not always-inlined')
            v.require(guard(v,z['functions'][HANDLER])['branches'][0]['profile'],'profile inlined helper lost profile')
        else:
            v.require(callee in z['functions'] and calls(z['functions'][HANDLER],callee)==1,'profile closure unexpectedly always-inlined')
            v.require(not guard(v,z['functions'][callee])['branches'][0]['profile'],'profile closure metadata regained before inlining')
        observations['always_inliner']=dict(callee_before=True,callee_after=callee in z['functions'],handler_calls_before=1,handler_calls_after=calls(z['functions'][HANDLER],callee))
    # Ordinary InlinerPass is per SCC; use the actual handler definition and
    # adjacency of dumps, not an assumed name in the SCC's header.
    transitions=[]
    for b,z in zip(records,records[1:]):
        if 'IR Dump Before InlinerPass ' not in b['header'] or z['header']!=b['header'].replace('Before ','After ',1):continue
        if HANDLER not in b['functions'] or HANDLER not in z['functions']:continue
        pre,post=b['functions'][HANDLER],z['functions'][HANDLER]
        transitions.append((b,z,pre,post))
    v.require(len(transitions)==1,'profile unique handler inliner boundary required')
    b,z,pre,post=transitions[0]
    v.require(calls(pre,callee)==(0 if canonical=='helper' else 1) and calls(post,callee)==0,'profile ordinary inliner calls differ')
    observation=guard(v,post);v.require(len(observation['branches'])==1 and observation['branches'][0]['profile']==(canonical=='helper'),'profile post-inliner guard differs')
    observations['ordinary_inliner']=dict(header=b['header'],guard=observation)
    final=a.ir_fragment(v,log,'CodeGen Prepare (codegenprepare)');order=a.ir_order(v,final)
    v.require(order['price_before_guard'] and order['price_divide']<order['multiply_overflow'] and order['guard_has_profile_metadata']==(canonical=='helper'),'profile final guard/order differs')
    observations['codegen_prepare']=dict(sha256=v.identity(final.encode())['sha256'],order=order)
    observations['stages']=[dict(index=r['index'],header=r['header'],functions={n:v.identity(f.encode())['sha256'] for n,f in r['functions'].items()}) for r in records]
    return observations,final

def verify(root=HERE,check_manifest=True):
    parent=root.parent.parent;composition=root.parent
    v=module('profile_parent',parent/'verify.py');c=module('profile_composition',composition/'verify.py');a=module('profile_arithmetic',composition/'arithmetic/verify.py');g=module('profile_guard',composition/'arithmetic/guard/verify.py')
    if check_manifest:v.manifest_check(parent)
    helper_folder=composition/'arithmetic/guard/builds/checked-price-first-late';closure_folder=root/'builds/closure-control';option_folder=composition/'arithmetic/guard/builds/option-projection-late'
    helper_launch=v.read(helper_folder/'launch.json.gz');helper=g.variant(composition/'arithmetic/guard',v,c,a,c.sources(composition,v),'checked-price-first-late');closure,transforms=closure_source(v,helper)
    v.require(closure[SOURCE]==(root/'closure-control.rs').read_bytes(),'profile closure source differs')
    pins=lambda inputs:{n:v.identity(b)['sha256'] for n,b in inputs.items()}
    v.require(len(helper)==len(closure)==67 and pins(helper)==helper_launch['source_inputs'] and len(helper_launch['reused_dependencies'])==104,'profile parent inputs differ')
    results={};images={};traces={};finals={}
    for label in LABELS:
        folder=root/'builds'/label;launch=v.read(folder/'launch.json.gz');receipt=v.read(folder/'result.json.gz');canonical='helper' if label.startswith('helper') else 'closure';prior_folder=helper_folder if canonical=='helper' or label=='closure-control' else closure_folder;prior=v.read(prior_folder/'launch.json.gz')
        v.require(launch['source_inputs']==pins(helper if canonical=='helper' else closure),'profile build source binding differs')
        v.require(launch['parent_launch_sha256']==v.identity(v.raw(prior_folder/'launch.json.gz'))['sha256'],'profile parent launch differs')
        v.require(all(launch[k]==helper_launch[k] for k in ('checked_executables','reused_dependencies')),'profile tools/dependencies differ')
        command=prior['command'][:]
        if label=='closure-control':
            v.require(launch['parent_source_inputs']==pins(helper) and launch['changed_source_files']==[SOURCE] and launch['transforms']==transforms,'profile closure transform differs')
        else:
            filtered=[];i=0
            while i<len(command):
                if command[i]=='-C' and command[i+1].startswith('llvm-args='):i+=2;continue
                filtered.append(command[i]);i+=1
            command=filtered;callee_enabled=label.endswith('callee');names=HANDLER+(','+(HELPER if canonical=='helper' else CLOSURE) if callee_enabled else '');passes='lower-expect,inline,simplifycfg'+(',always-inline' if callee_enabled else '')
            flags=['-print-pass-numbers','-print-before='+passes,'-print-after='+passes+',codegenprepare','-filter-print-funcs='+names]
            v.require(launch['diagnostic_flags']==flags and launch['function_filter']==names,'profile diagnostics flags differ')
            for flag in flags:command+=['-C','llvm-args='+flag]
        command[command.index('--out-dir')+1]=launch['command'][launch['command'].index('--out-dir')+1]
        v.require(command==launch['command'],'profile compiler command differs')
        # Capture paths change per run; all remaining environment values stay
        # exactly equal. Keep the historical Windows paths as receipt data.
        moving=('MAYHEM_LINKER_OUTPUT','TEMP','TMP','CARGO_MANIFEST_DIR','CARGO_MANIFEST_PATH')
        v.require({k:x for k,x in launch['environment'].items() if k not in moving}=={k:x for k,x in prior['environment'].items() if k not in moving},'profile compiler environment differs')
        v.require(launch['environment']['CARGO_MANIFEST_DIR']==launch['cwd'] and launch['environment']['CARGO_MANIFEST_PATH']==launch['cwd']+'\\Cargo.toml' and launch['environment']['TEMP']==launch['environment']['TMP'],'profile working paths differ')
        v.require(receipt['status']=='SUCCEEDED' and receipt['returncode']==receipt['target_executions']==receipt['strip']['returncode']==0 and receipt['source_unchanged'] and receipt['dependencies_unchanged'],'profile failed/unexecuted compilation')
        strip=receipt['strip']['command'];v.require(len(strip)==4 and strip[0] in launch['checked_executables'] and strip[1]=='--strip-all' and strip[2].endswith('\\symbols.so') and strip[3].endswith('\\candidate-v154-strip.so'),'profile ordinary stripping command differs')
        v.require(set(receipt['outputs'])==set(OUTPUTS),'profile output cohort differs');images[label]={n:v.raw(folder/(n+'.gz')) for n in OUTPUTS}
        v.require({n:v.identity(b) for n,b in images[label].items()}==receipt['outputs'],'profile output binding differs')
        expected_folder=option_folder if label=='closure-control' else prior_folder
        v.require(all(images[label][n]==v.raw(expected_folder/(n+'.gz')) for n in OUTPUTS),'profile complete outputs differ from control')
        if label!='closure-control':
            v.require(receipt['complete_outputs_equal_parent'],'profile output repeat receipt differs')
            traces[label],finals[label]=trace(v,a,v.raw(folder/'stderr.log.gz').decode('utf-8'),canonical,label.endswith('callee'))
            old=a.ir_fragment(v,v.raw(prior_folder/'stderr.log.gz').decode('utf-8'),'CodeGen Prepare (codegenprepare)')
            v.require(finals[label]==old,'profile diagnostic final IR differs from control')
        results[label]=dict(outputs=receipt['outputs'],source_inputs=launch['source_inputs'])
    for canonical in ('helper','closure'):
        v.require(finals[canonical]==finals[canonical+'-callee'],'profile callee filter changes final IR')
    option_ir=a.ir_fragment(v,v.raw(option_folder/'stderr.log.gz').decode('utf-8'),'CodeGen Prepare (codegenprepare)')
    v.require(finals['closure']!=option_ir and closure[SOURCE]!=g.variant(composition/'arithmetic/guard',v,c,a,c.sources(composition,v),'option-projection-late')[SOURCE],'profile distinct-source/IR collision evidence differs')
    # Both complete ELFs equal the already verified Option control. The parent
    # verifier separately checks that control's allocations and exact match sets.
    return dict(builds=results,traces=traces,successful_root_compilations=5,diagnostic_repeats=4,fresh_dependency_builds=0,target_executions=0,closure_complete_outputs_equal_option=True,closure_codegen_ir_equal_option=False,complete_windows_gained=0,scope='Actual compiler pass evidence and whole-output repetition; no whole CFG, behavior, historical-source or original byte-identity claim.')

if __name__=='__main__':
    r=verify();v=module('profile_report',HERE.parent.parent/'verify.py');v.require(r==v.read(HERE/'report.json.gz'),'profile saved report differs');print('Verified one closure control and four compiler trace repeats; SimplifyCFG removes the redundant profiled closure test, and both complete closure outputs equal the distinct Option control.')
