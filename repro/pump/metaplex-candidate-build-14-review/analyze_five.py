"""Read-only five-artifact complete-body/section/call/relocation comparison."""
from pathlib import Path
import collections,hashlib,json,struct,sys
P=Path(__file__).resolve().parent
ROOT=next(p for p in P.parents if (p/'evidence/dependencies/token_metadata/deployed.so').is_file())
from elf_reader import Elf
H=lambda b:hashlib.sha256(b).hexdigest()
LO=236632;HI=241736
PATHS={'original':ROOT/'evidence/dependencies/token_metadata/deployed.so','candidate11':ROOT/'repro/pump/metaplex-candidate-build-11/token_metadata.so','candidate12':ROOT/'repro/pump/metaplex-candidate-build-12-review/candidate12.so','candidate13':ROOT/'repro/pump/metaplex-candidate-build-13-review/build13/token_metadata.so','candidate14':P/'build14/token_metadata.so'}
def decode(e,lo,hi):
    rows=[];at=lo
    while at<hi:
        op,regs,off,imm=struct.unpack_from('<BBhi',e.b,at);size=16 if op==0x18 else 8
        row=dict(file_offset=at,body_offset=at-lo,raw=e.b[at:at+size].hex(),opcode=op,dst=regs&15,src=regs>>4,displacement=off,immediate=imm,size=size)
        if size==16:row['u64']=(imm&0xffffffff)|(struct.unpack_from('<I',e.b,at+12)[0]<<32)
        if at in e.calls:row['call_target']=e.calls[at]
        if (op&7)in[5,6] and op not in[0x85,0x95]:row['branch_target']=at+8+off*8
        if at in e.relocations:row['relocation']=e.relocations[at]
        rows.append(row);at+=size
    assert at==hi
    return rows

def analyze():
    es={n:Elf(f) for n,f in PATHS.items()};o=es['original'];result=dict(scope='Saved bytes only; no compiled candidate edits, new builds, VM or transaction execution',artifacts={},calls={},body_relocations={},guard_regions={});bodies={}
    for name,e in es.items():
        assert LO in e.entries,name
        hi=next(x for x in e.entries if x>LO);rows=decode(e,LO,hi);bodies[name]=rows
        payload=e.b+bytes(len(o.b)-len(e.b));dif=[i for i in range(len(o.b)) if o.b[i]!=payload[i]]
        result['artifacts'][name]=dict(raw_bytes=len(e.b),raw_sha256=H(e.b),payload_sha256=H(payload),payload_different_bytes=len(dif),first_difference=next(iter(dif),None),text_start=e.lo,text_end=e.hi,text_sha256=H(e.b[e.lo:e.hi]),body_start=LO,body_end=hi,body_sha256=H(e.b[LO:hi]),body_instruction_count=len(rows),body_slots=(hi-LO)//8,body_call_count=sum('call_target'in r for r in rows),body_branch_count=sum('branch_target'in r for r in rows),function_entries=len(e.entries),per_original_section={n:sum(o.b[i]!=payload[i] for i in range(s[4],s[4]+s[5])) for n,s in o.secs.items() if n and s[1]!=8})
        result['calls'][name]=[dict(file_offset=r['file_offset'],target=r['call_target']) for r in rows if 'call_target'in r]
        result['body_relocations'][name]=[dict(file_offset=at,**r) for at,r in e.relocations.items() if LO<=at<hi]
        result['guard_regions'][name]=[r for r in rows if 238800<=r['file_offset']<239020]
    original=result['artifacts']['original'];new=result['artifacts']['candidate14']
    result['candidate14_raw_text_equal']=o.b[o.lo:o.hi]==es['candidate14'].b[es['candidate14'].lo:es['candidate14'].hi]
    result['candidate14_body_equal']=o.b[LO:HI]==es['candidate14'].b[LO:new['body_end']]
    result['candidate14_raw_calls_multiset_equal']=collections.Counter(c['target']for c in result['calls']['original'])==collections.Counter(c['target']for c in result['calls']['candidate14'])
    result['candidate14_raw_relocations_equal']=o.relocations==es['candidate14'].relocations
    result['whole_byte_identity']=new['payload_different_bytes']==0
    B=es['candidate14']
    result['pairwise_raw_equal']={a+'='+b:es[a].b==es[b].b for a in es for b in es if list(es).index(a)<list(es).index(b)}
    result['candidate14_complete_body_differences']=[dict(index=i,original=a,candidate14=b) for i,(a,b) in enumerate(__import__('itertools').zip_longest(bodies['original'],bodies['candidate14'])) if a!=b]
    result['candidate14_relocation_records']=[dict(file_offset=at,**rel) for at,rel in B.relocations.items()]
    result['original_relocation_records']=[dict(file_offset=at,**rel) for at,rel in o.relocations.items()]
    result['candidate14_vs_original_data_differences']={}
    for section in ['.rodata','.data.rel.ro']:
        st,sz=o.secs[section][4:6]
        result['candidate14_vs_original_data_differences'][section]=[dict(file_offset=i,original=o.b[i],candidate14=B.b[i]) for i in range(st,st+sz) if o.b[i]!=B.b[i]]
    return result,bodies
if __name__=='__main__':
    result,bodies=analyze()
    (P/'five-artifact-result.json').write_text(json.dumps(result,indent=2)+'\n');(P/'complete-body-decode.json').write_text(json.dumps(bodies,indent=2)+'\n')
    print(json.dumps({n:{k:v for k,v in r.items() if k in['raw_sha256','payload_different_bytes','first_difference','body_end','body_instruction_count','body_call_count','body_branch_count']} for n,r in result['artifacts'].items()},indent=2))
