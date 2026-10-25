"""Recompute bounded serializer/diagnostic facts from saved exact ELF bytes only."""
from pathlib import Path
import bisect,hashlib,json,struct,sys
sys.dont_write_bytecode=True
from elf_reader import Elf
H=Path(__file__).resolve().parent
sha=lambda b:hashlib.sha256(b).hexdigest()
def run():
    o=Elf(H/'evidence/original/pump/deployed.so');c=Elf(H/'candidate.so');s=Elf(H/'unstripped.so')
    assert c.b[c.lo:c.hi]==s.b[s.lo:s.hi]and c.pattern(c.lo,c.hi-c.lo)==s.pattern(s.lo,s.hi-s.lo)
    f=json.loads((H/'function-match.json').read_text());d=json.loads((H/'depth-guard-match.json').read_text())
    assert sha(c.b)==f['candidate']['sha256']==d['candidate_sha256']
    assert sha(o.b)==f['original']['sha256']==d['original_sha256']
    assert sha(s.b)==f['symbols']['sha256']==d['symbols_sha256']
    symbols={x['start']:x for x in s.funcs};r=f['candidate_body'];start=r['start'];size=r['bytes'];assert size==1840
    assert o.normalized[0x5a28:0x6158]==c.normalized[start:start+size]
    assert o.pattern(0x5a28,size)==c.pattern(start,size)
    calls=c.callsites(start,size);assert len(calls)==25
    for call,row in zip(calls,f['direct_target_checks']):
        target=symbols[call['target']];ot=o.calls[0x5a28+call['offset']];end=o.entries[bisect.bisect_right(o.entries,ot)]
        assert row['candidate_target']==call['target']and row['original_target']==ot
        assert end-ot==target['size']and o.normalized[ot:end]==c.normalized[target['start']:target['start']+target['size']]
        assert o.pattern(ot,end-ot)==c.pattern(target['start'],target['size'])
    for elf,st in [(o,0x5a28),(c,start)]:
        at=st+248;ptr=struct.unpack_from('<I',elf.b,at+4)[0]|struct.unpack_from('<I',elf.b,at+12)[0]<<32
        assert elf.b[ptr:ptr+8]==bytes.fromhex('17b7f83760d8ac60')
    w=d['candidate_walk'];assert symbols[w['start']]['size']==w['size']==11432
    assert sha(c.b[w['start']:w['start']+w['size']])==w['raw_sha256']
    assert sha(c.normalized[w['start']:w['start']+w['size']])==w['normalized_sha256']
    assert c.callsites(w['start'],w['size'])==[{'offset':x['offset'],'target':x['target']}for x in d['actual_direct_calls']]
    assert not d['actual_standalone_with_values_calls']
    for row in d['instruction_facts']:
        at=row['address'];assert list(struct.unpack_from('<BBhi',c.b,at))==row['decoded']and c.b[at:at+8].hex()==row['bytes_hex']
    for name,row in d['actual_error_targets'].items():
        assert c.calls[row['site']]==row['target'];target=symbols[row['target']]
        for ot in row['complete_original_body_matches']:
            end=o.entries[bisect.bisect_right(o.entries,ot)]
            assert end-ot==target['size']and o.normalized[ot:end]==c.normalized[target['start']:target['start']+target['size']]
    for row in d['consumed_data']:
        at=row['instruction'];ptr=struct.unpack_from('<I',c.b,at+4)[0]|struct.unpack_from('<I',c.b,at+12)[0]<<32
        assert ptr==row['pointer']and c.b[ptr:ptr+row['bytes']].hex()==row['hex']
    assert not f['full_byte_equality']and not d['full_byte_equality']and c.b!=o.b
    return {'serializer_full_body':1840,'serializer_direct_targets':25,'serializer_discriminator':True,'fresh_walk_bytes':11432,'diagnostic_actual_matched_targets':3,'standalone_with_values_calls':0,'full_original_elf_equality':False}
if __name__=='__main__':print(json.dumps(run(),sort_keys=True))
