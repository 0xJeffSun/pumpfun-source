#!/usr/bin/env python3
"""Check actual immediate call edges for newly restored transfer context function windows."""
import argparse
import gzip
import hashlib
import json
from pathlib import Path
import struct
import sys

ROOT=Path(__file__).resolve().parents[3]
sys.dont_write_bytecode=True
sys.path.insert(0,str(ROOT/'repro/pump_amm/claim-self-transfer-v144/static-tool'))
from elf_reader import Elf

def sha(path):return hashlib.sha256(Path(path).read_bytes()).hexdigest()
def load(path):return json.loads(gzip.decompress(path.read_bytes()) if path.suffix=='.gz' else path.read_bytes())
def main():
    p=argparse.ArgumentParser(description=__doc__)
    for name in ('candidate','symbols','measurement','baseline_measurement','output'):p.add_argument('--'+name,type=Path,required=True)
    a=p.parse_args();assert not a.output.exists()
    o=Elf(ROOT/'evidence/original/pump_amm/deployed.so');c=Elf(a.candidate);s=Elf(a.symbols);m=load(a.measurement)
    assert m['candidate_sha256']==sha(a.candidate) and m['symbols_sha256']==sha(a.symbols)
    assert c.b[c.lo:c.hi]==s.b[s.lo:s.hi]
    windows={r['start']:r for r in m['rows']};rows=[]
    baseline=load(a.baseline_measurement); baseline_rows={r['start']:r for r in baseline['rows']}
    selected={r['start']for r in m['rows']if r['matches']and not baseline_rows[r['start']]['matches']}
    for start in sorted(selected):
        window=windows[start];size=window['end']-start
        for match in window['matches']:
            at=match['start'];edges=[];refs=[]
            for call,target in o.calls.items():
                if not start<=call<start+size:continue
                offset=call-start;other=c.calls.get(at+offset);callee=windows.get(target)
                corresponding=callee is not None and any(x['start']==other for x in callee['matches'])
                edges.append({'offset':offset,'original_call':call,'candidate_call':at+offset,'original_target':target,'candidate_target':other,
                    'actual_target_normalized_match':corresponding,'candidate_target_symbols':[f['name']for f in s.funcs if f['start']==other]})
            x=0
            while x<size:
                if o.b[start+x]==0x18:
                    ov=struct.unpack_from('<I',o.b,start+x+4)[0]|(struct.unpack_from('<I',o.b,start+x+12)[0]<<32)
                    cv=struct.unpack_from('<I',c.b,at+x+4)[0]|(struct.unpack_from('<I',c.b,at+x+12)[0]<<32)
                    rel=o.relocations.get(start+x)
                    if rel:
                        refs.append({'offset':x,'original_pointer':ov,'candidate_pointer':cv,'original_relocation':rel,'candidate_relocation':c.relocations.get(at+x),
                                     'referenced_data_equality':'unproved; masked relocation is not byte/data identity'})
                    x+=16
                else:x+=8
            rows.append({'original_start':start,'candidate_start':at,'bytes':size,'candidate_symbol':match['name'],'direct_edges':edges,
                         'actual_matched_edges':sum(x['actual_target_normalized_match'] for x in edges),'relocated_data':refs})
    result={'candidate_sha256':sha(a.candidate),'symbols_sha256':sha(a.symbols),'measurement_sha256':sha(a.measurement),'rows':rows,
            'scope':'Full normalized root bodies and actual immediate static call destinations only. Transitive callees, indirect calls and referenced data are not closed.'}
    a.output.write_text(json.dumps(result,indent=2)+'\n')
    print(json.dumps([{'original':hex(r['original_start']),'candidate':hex(r['candidate_start']),'bytes':r['bytes'],'matched_actual_edges':r['actual_matched_edges'],
                       'direct_edges':len(r['direct_edges']),'unclosed_data_references':len(r['relocated_data'])}for r in rows]))

if __name__=='__main__':main()
