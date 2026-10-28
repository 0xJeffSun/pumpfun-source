#!/usr/bin/env python3
"""Verify the L39 sell reconstruction, actual call boundaries and focused runtime evidence."""
from pathlib import Path
import argparse,csv,difflib,gzip,hashlib,importlib.util,json,sys
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent
ROOT=next(p for p in P.parents if (p/'evidence/original/pump/deployed.so').is_file())
sys.path.insert(0,str(ROOT/'scripts'))
from pump_compare_function_bytes import body,normalize
from pump_quote_control_function_match import sections
spec=importlib.util.spec_from_file_location('l33_packet_verify',ROOT/'research/claude-pump-integration-20261027/r37-layout-33/verify.py');base=importlib.util.module_from_spec(spec);spec.loader.exec_module(base)
sha=lambda p:hashlib.sha256(Path(p).read_bytes()).hexdigest()

def evidence():
    original=(ROOT/'evidence/original/pump/deployed.so').read_bytes();os=sections(original);candidate=(P/'unstripped.so').read_bytes();cs=sections(candidate)
    windows={int(r['original_start']):int(r['original_end'])-int(r['original_start']) for r in csv.DictReader((ROOT/'repro/reconstruction-status-2026-10-26/functions.tsv').open(),delimiter='\t') if r['program']=='pump' and r['variant']=='selected'}
    funcs=base.elf_functions(candidate);by={a:(l,n) for a,l,n in funcs}
    start,size,name=next(x for x in funcs if '5trade4sell17' in x[2]);target=0x14a8a8
    norm=lambda b,ss,a,l:normalize(body(b,ss,a,l),a,ss)
    on,oo=norm(original,os,target,windows[target]);cn,co=norm(candidate,cs,start,size)
    oc=[v for v in oo if v['kind']=='direct-call'];cc=[v for v in co if v['kind']=='direct-call'];assert len(oc)==len(cc),(len(oc),len(cc))
    edges=[]
    for x,y in zip(oc,cc):
        a,b=x['target'],y['target'];length,symbol=by[b];u,_=norm(original,os,a,windows[a]);v,_=norm(candidate,cs,b,length)
        edges.append({'original_offset':x['offset'],'candidate_offset':y['offset'],'original_target':a,'candidate_target':b,'candidate_symbol':symbol,'original_callee_bytes':windows[a],'candidate_callee_bytes':length,'normalized_callee_equal':u==v})
    incoming=[]
    for a,l in windows.items():
        raw,ops=norm(original,os,a,l)
        for op in ops:
            if op['kind']!='direct-call' or op['target']!=target:continue
            for s,k,n in funcs:
                if '__private8__global7sell_v317' not in n:continue
                matched,cops=norm(candidate,cs,s,k);calls=[v for v in cops if v['kind']=='direct-call' and v['target']==start]
                incoming.append({'original_caller':a,'candidate_caller':s,'candidate_symbol':n,'normalized_caller_equal':raw==matched,'original_call_offset':op['offset'],'candidate_call_offsets':[v['offset'] for v in calls],'actual_reconstructed_body_called':bool(calls)})
    return {'scope':'Real incoming and direct outgoing call boundaries only; the parent body remains unmatched. Standard repository narrow normalization is unchanged.','original_sha256':sha(ROOT/'evidence/original/pump/deployed.so'),'unstripped_sha256':sha(P/'unstripped.so'),'original_start':target,'candidate_start':start,'candidate_symbol':name,'original_bytes':windows[target],'candidate_bytes':size,'normalized_parent_equal':on==cn,'different_instruction_slots':sum(on[i:i+8]!=cn[i:i+8] for i in range(0,max(len(on),len(cn)),8)),'incoming':incoming,'outgoing':edges}

def census(path):
    blob=path.read_bytes();ss=sections(blob);by={}
    for start,length,name in base.elf_functions(blob):
        raw=body(blob,ss,start,length);norm,_=normalize(raw,start,ss)
        by.setdefault((length,hashlib.sha256(norm).hexdigest()),[]).append({'start':start,'symbol':name,'raw_sha256':hashlib.sha256(raw).hexdigest()})
    original=(ROOT/'evidence/original/pump/deployed.so').read_bytes();os=sections(original);rows=[]
    for r in csv.DictReader((ROOT/'repro/reconstruction-status-2026-10-26/functions.tsv').open(),delimiter='\t'):
        if r['program']!='pump' or r['variant']!='selected':continue
        start,end=int(r['original_start']),int(r['original_end']);raw=body(original,os,start,end-start);norm,_=normalize(raw,start,os);matches=by.get((end-start,hashlib.sha256(norm).hexdigest()),[]);h=hashlib.sha256(raw).hexdigest()
        rows.append({'start':start,'end':end,'bytes':end-start,'raw_sha256':h,'raw_match':any(m['raw_sha256']==h for m in matches),'normalized_matches':matches})
    return {'original_sha256':sha(ROOT/'evidence/original/pump/deployed.so'),'candidate_sha256':sha(path),'windows':rows,'counts':{'total':len(rows),'raw':sum(w['raw_match']for w in rows),'normalized':sum(bool(w['normalized_matches'])for w in rows),'unmatched':sum(not w['normalized_matches']for w in rows),'matched_text_bytes':sum(w['bytes']for w in rows if w['normalized_matches'])}}

def main():
    manifest=json.loads((P/'MANIFEST.json').read_text());actual={str(f.relative_to(P))for f in P.rglob('*')if f.is_file() and '__pycache__'not in f.parts}
    assert actual==set(manifest)|{'MANIFEST.json'}
    for k,v in manifest.items():assert sha(P/k)==v,k
    ev=evidence();assert ev==json.loads((P/'call-order.json').read_text())
    assert ev['incoming'] and all(x['normalized_caller_equal']and x['actual_reconstructed_body_called']for x in ev['incoming'])
    assert len(ev['outgoing'])==47 and all(x['normalized_callee_equal']for x in ev['outgoing'])
    assert not ev['normalized_parent_equal'] and ev['candidate_bytes']==6056 and ev['original_bytes']==6032 and ev['different_instruction_slots']==651
    before=census(P/'control/unstripped.so');after=census(P/'unstripped.so')
    assert before==json.load(gzip.open(P/'control/inventory.json.gz')) and after==json.load(gzip.open(P/'inventory.json.gz'))
    comp={'control_counts':before['counts'],'candidate_counts':after['counts']}
    for key,label in [('normalized_matches','normalized'),('raw_match','raw')]:
        a={w['start']for w in before['windows']if w[key]};b={w['start']for w in after['windows']if w[key]}
        comp[label+'_gains']=sorted(b-a);comp[label+'_losses']=sorted(a-b);assert a==b
    assert comp==json.loads((P/'census-comparison.json').read_text()) and after['counts']['normalized']==1018 and after['counts']['raw']==166
    old=(P/'control/source/programs/pump/src/trade_v3.rs').read_text();new=(P/'source/programs/pump/src/trade_v3.rs').read_text()
    assert ''.join(difflib.unified_diff(old.splitlines(keepends=True),new.splitlines(keepends=True),'a/programs/pump/src/trade_v3.rs','b/programs/pump/src/trade_v3.rs'))==(P/'source.patch').read_text()
    i=old.index('pub fn sell(');oe=old.index('\n}',i)+2;j=new.index('pub fn sell(');ne=new.index('\n}',j)+2
    assert old[:i]==new[:j] and old[oe:]==new[ne:] and len(new.splitlines())==1295
    receipts=[json.loads((q/'build-receipt.json').read_text())for q in [P/'control',P]]
    for q,r in zip([P/'control',P],receipts):
        assert r['source_unchanged'] and r['source_before']==r['source_after']
        assert r['unstripped_sha256']==sha(q/'unstripped.so') and r['candidate_sha256']==sha(q/'candidate.so')
        assert r['build_log_sha256']==sha(q/'build.log')
        clean,build=r['commands'];assert clean[1]=='clean' and all(x in clean for x in ['--release','--target','sbpf-solana-solana','--manifest-path','--offline','pump-recovered','pump-token-ext'])
        assert build[1]=='build' and all(x in build for x in ['--release','--locked','--offline','--target','sbpf-solana-solana'])
        log=(q/'build.log').read_text();assert 'Compiling pump-token-ext v0.1.0'in log and 'Compiling pump-recovered v0.1.0'in log
        assert 'stack offset'not in log.lower()
    a,b=receipts;assert a['tools']==b['tools']
    assert [k for k in a['source_before']if a['source_before'][k]!=b['source_before'][k]]==['programs/pump/src/trade_v3.rs']
    assert a['source_before']['programs/pump/src/trade_v3.rs']==sha(P/'control/source/programs/pump/src/trade_v3.rs')
    assert b['source_before']['programs/pump/src/trade_v3.rs']==sha(P/'source/programs/pump/src/trade_v3.rs')
    bm=json.loads((P/'BASE-MANIFEST.json').read_text())
    for k,v in a['source_before'].items():
        if k.startswith('programs/pump/') and k!='programs/pump/Cargo.toml':assert bm['source/'+k]==v,k
    runtime=json.load(gzip.open(P/'runtime.json.gz'));assert runtime['candidate_sha256']==sha(P/'candidate.so')and runtime['baseline_sha256']==sha(P/'control/candidate.so')and not runtime['mismatches']and len(runtime['cases'])==128
    for row in runtime['cases']:
        assert all(row['equal']['candidate'].values())and all(x['signature_verified']for x in row['outcomes'].values())
        for k in ['error','accounts','inner_instructions','event_payloads','return_data']:assert row['outcomes']['original'][k]==row['outcomes']['candidate'][k]
    witnesses=[r for r in runtime['cases']if r.get('baseline_witness')];assert len(witnesses)==3 and all(not all(r['equal']['baseline'].values())for r in witnesses)
    print(json.dumps({'verified':True,'new_exact_windows':0,'normalized_windows':1018,'raw_windows':166,'normalized_losses':0,'raw_losses':0,'original_bytes':6032,'candidate_bytes':6056,'direct_callee_pairs':47,'runtime_cases':128,'runtime_mismatches':0,'baseline_regression_witnesses':3,'whole_elf_equal':False},indent=2))

if __name__=='__main__':main()
