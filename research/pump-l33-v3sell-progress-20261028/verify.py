#!/usr/bin/env python3
"""Verify the partial source/ELF/edge/runtime packet; makes no census or identity gain claim."""
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

def main():
    p=argparse.ArgumentParser();p.add_argument('--write-edges',action='store_true');a=p.parse_args();ev=evidence()
    if a.write_edges:(P/'call-order.json').write_text(json.dumps(ev,indent=2)+'\n');return
    manifest=json.loads((P/'MANIFEST.json').read_text());actual={str(f.relative_to(P)) for f in P.rglob('*') if f.is_file() and '__pycache__' not in f.parts};assert actual==set(manifest)|{'MANIFEST.json'}
    for k,v in manifest.items():assert sha(P/k)==v,k
    assert ev==json.loads((P/'call-order.json').read_text())
    assert ev['incoming'] and all(x['normalized_caller_equal'] and x['actual_reconstructed_body_called'] for x in ev['incoming'])
    assert ev['outgoing'] and all(x['normalized_callee_equal'] for x in ev['outgoing'])
    res=json.loads((P/'RESULT.json').read_text());assert not ev['normalized_parent_equal'] and ev['candidate_bytes']==res['candidate_function_bytes']==6128 and ev['original_bytes']==6032
    assert ev['different_instruction_slots']==res['different_instruction_slots']==668
    assert sha(P/'candidate.so')==res['candidate_sha256'] and sha(P/'unstripped.so')==res['unstripped_sha256']
    x=(ROOT/res['base_source']/'src/trade_v3.rs').read_text().splitlines(keepends=True);y=(P/'source/programs/pump/src/trade_v3.rs').read_text().splitlines(keepends=True)
    assert len(y)==1295 and ''.join(difflib.unified_diff(x,y,'a/programs/pump/src/trade_v3.rs','b/programs/pump/src/trade_v3.rs'))==(P/'source.patch').read_text()
    runtime=json.load(gzip.open(P/'runtime.json.gz'));assert runtime['candidate_sha256']==res['unstripped_sha256'] and not runtime['mismatches'] and len(runtime['cases'])==8
    for row in runtime['cases']:
        assert row['equal'] and row['original']['signature_verified'] and row['candidate']['signature_verified']
        for k in ['error','accounts','inner_instructions','event_payloads','return_data']:assert row['original'][k]==row['candidate'][k],k
    assert len({(r['whitelist'],r['case']['token_quote'],tuple(r['case']['flags'])) for r in runtime['cases']})==8
    print(json.dumps({'verified':True,'new_exact_windows':0,'parent_normalized_equal':False,'original_bytes':6032,'candidate_bytes':6128,'direct_callee_pairs':len(ev['outgoing']),'runtime_cases':8,'runtime_mismatches':0,'whole_elf_equal':False},indent=2))

if __name__=='__main__':main()
