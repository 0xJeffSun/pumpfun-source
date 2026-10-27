#!/usr/bin/env python3
"""Audit actual direct call destinations of matched AMM windows; no data-identity claim."""
import argparse
from collections import Counter
import gzip
import hashlib
import json
from pathlib import Path
import sys
ROOT=Path(__file__).resolve().parents[3]
sys.path.insert(0,str(ROOT/'repro/pump_amm/claim-self-transfer-v144/static-tool'))
from elf_reader import Elf

def load(p):
    b=p.read_bytes();return json.loads(gzip.decompress(b)if p.suffix=='.gz'else b)
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def audit(candidate,symbols,measurement):
    original=ROOT/'evidence/original/pump_amm/deployed.so'
    o,c,s=Elf(original),Elf(candidate),Elf(symbols);m=load(measurement)
    assert m['candidate_sha256']==sha(candidate) and m['symbols_sha256']==sha(symbols)
    assert c.b[c.lo:c.hi]==s.b[s.lo:s.hi]
    windows={r['start']:r for r in m['rows']};pairs={(r['start'],a['start'])for r in m['rows']for a in r['matches']};rows={}
    names={f['start']:f['name']for f in s.funcs};missing={}
    for r in m['rows']:
        start,end=r['start'],r['end']
        for a in r['matches']:
            at=a['start'];edges=[]
            for call,target in o.calls.items():
                if start<=call<end:
                    target2=c.calls.get(at+call-start);matched=(target,target2)in pairs
                    edges.append({'offset':call-start,'original_target':target,'candidate_target':target2,'target_body_matched':matched,'candidate_symbol':names.get(target2)})
                    if not matched:missing.setdefault(target,set()).add((start,call-start))
            refs=[{'offset':p-start,'original':v,'candidate':c.relocations.get(at+p-start)}for p,v in sorted(o.relocations.items())if start<=p<end]
            indirect=[p-start for p in range(start,end,8)if o.b[p]==0x8d]
            rows[start,at]={'original':start,'candidate':at,'bytes':end-start,'symbol':a['name'],'edges':edges,'relocations':refs,'indirect_calls':indirect}
    # Greatest subset whose actual static direct callees all belong to the subset.
    closed=set(pairs)
    while True:
        remove={k for k in closed if any((e['original_target'],e['candidate_target'])not in closed for e in rows[k]['edges'])}
        if not remove:break
        closed-=remove
    pure={k for k in closed if not rows[k]['indirect_calls'] and not rows[k]['relocations']}
    while True:
        remove={k for k in pure if any((e['original_target'],e['candidate_target'])not in pure for e in rows[k]['edges'])}
        if not remove:break
        pure-=remove
    summary={'matched_windows':sum(bool(r['matches'])for r in m['rows']),'matched_pairs':len(pairs),'immediate_direct_edge_closed_windows':len({k[0]for k,r in rows.items()if all(e['target_body_matched']for e in r['edges'])}),'recursive_direct_edge_closed_windows':len({k[0]for k in closed}),'recursive_direct_closed_without_indirect_or_relocations':len({k[0]for k in pure})}
    for k,r in rows.items():r['recursive_direct_edges_closed']=k in closed
    return {'original_sha256':sha(original),'candidate_sha256':sha(candidate),'symbols_sha256':sha(symbols),'measurement_sha256':sha(measurement),'summary':summary,'unmatched_targets_referenced_by_matched_pairs':[{'original':k,'distinct_original_caller_edges':len(v),'original_window_bytes':windows[k]['end']-k if k in windows else None}for k,v in sorted(missing.items(),key=lambda item:len(item[1]),reverse=True)],'rows':list(rows.values()),'scope':'Actual direct-call destinations only. Recursion closure covers paired normalized instruction bodies, not data references, indirect calls, ABI, semantic equivalence or full original ELF identity. Multiple matching candidate bodies produce separate pairs.'}
def main():
    p=argparse.ArgumentParser()
    for key in ('candidate','symbols','measurement','output'):p.add_argument('--'+key,type=Path,required=True)
    a=p.parse_args();assert not a.output.exists();result=audit(a.candidate,a.symbols,a.measurement);a.output.write_text(json.dumps(result,indent=2)+'\n');print(json.dumps(result['summary']))
if __name__=='__main__':main()
