"""Follow the conditional Custom branch through its nested formatter descriptor."""
from pathlib import Path
import importlib.util
import json
import struct

P = Path(__file__).resolve().parent
spec = importlib.util.spec_from_file_location('private_format_route', P/'unit_trace.py')
m = importlib.util.module_from_spec(spec)
spec.loader.exec_module(m)


class CustomTrace(m.Trace):
    def __init__(self,*args,**kwargs):
        super().__init__(*args,**kwargs)
        self.write((1<<40)+36,4,None)

    def call(self, target, next_pc, offset, indirect):
        name = self.roles.get(target)
        if name == 'custom_reference_debug':
            assert self.role == 'debug_tuple_field1_finish' and offset == 192 and indirect
            payload = self.read(self.reg[1],8)
            assert payload == (1<<40)+36
            reference=self.reg[1]
            result=super().call(target,next_pc,offset,indirect)
            self.events[-1].update(payload_reference=reference,payload_target=payload)
            return result
        if name == 'custom_value_display':
            assert self.role=='custom_reference_debug' and offset==56 and not indirect
            assert self.reg[1]==(1<<40)+36 and self.read(self.reg[1],4)is None
            self.events.append(dict(caller=self.role,offset=offset,callee=name,target=target,
                                    indirect=False,payload_target=self.reg[1],payload_value_is_opaque=True))
            return True
        if name == 'string_write_str' and self.role == 'debug_tuple_field1_finish':
            assert indirect
            pointer,length=self.reg[2:4]
            self.events.append(dict(caller=self.role,offset=offset,callee=name,target=target,
                                    indirect=True,string_pointer=pointer,length=length,
                                    string_hex=self.raw(pointer,length).hex(),
                                    contract='Delimiter writer returns Ok; all 24 String metadata bytes become opaque.'))
            self.write(self.reg[1],24,None)
            self.reg[0]=0
            self.reg[1:6]=[None]*5
            self.pc=next_pc
            return False
        return super().call(target,next_pc,offset,indirect)


def inspect(images=None):
    o,c=m.proof.elves(*(images or m.proof.inputs()))
    rows=json.loads((m.proof.M/'original-windows.json').read_text())
    ow={r['start']:o.window(r['start'],r['start']+r['bytes'])for r in rows}
    cw,_=m.proof.matcher.tables(c)
    groups,_,closed,_=m.proof.matcher.relation(ow,cw)
    roles=dict(m.ROLES,debug_tuple_field1_finish=682832,custom_reference_debug=616480,custom_value_display=694080)
    starts={'original':{n:[a]for n,a in roles.items()},
            'candidate':{n:groups[m.proof.matcher.key(ow[a])]for n,a in roles.items()}}
    scalar_contracts=[]
    for e,windows,address in [(o,ow,roles['program_error_into_u64']),
                               (c,cw,starts['candidate']['program_error_into_u64'][0])]:
        w=windows[address]
        assert not(w['direct']or w['indirect']or w['external']or w['data_references'])
        assert len(w['exits'])==1 and w['exits'][0]['pc']==w['end']-8
        assert all(x['pc']<x['target']<w['end']for x in w['branches'])
        assert {e.b[a]for a in range(address,w['end'],8)}<={0,0x05,0x15,0x18,0x55,0x65,0x67,0x77,0x95,0xbf,0xd5}
        scalar_contracts.append(dict(start=address,bytes=w['end']-address,forward_branches=len(w['branches']),memory_operations=0,calls=0))
    traces=[CustomTrace(e,starts[side],side,tag=0).run()for side,e in [('original',o),('candidate',c)]]
    normalize=lambda t:[(x['caller'],x['offset'],x['callee'],x['indirect'],x.get('length'),x.get('string_hex'),x.get('requested_size'),x.get('payload_target'))for x in t['events']]
    assert normalize(traces[0])==normalize(traces[1])
    assert traces[0]['steps']==traces[1]['steps']
    for a,b in zip(traces[0]['events'],traces[1]['events']):assert(a['target'],b['target'])in closed
    assert len(traces[0]['data_reads'])==len(traces[1]['data_reads'])
    for a,b in zip(traces[0]['data_reads'],traces[1]['data_reads']):
        assert(a['caller'],a['offset'],a['size'],a['relocated'])==(b['caller'],b['offset'],b['size'],b['relocated'])
        if a['relocated']and a['target']in ow:assert(a['target'],b['target'])in closed
        elif not a['relocated']:assert a['value']==b['value']
    vtables=[]
    for e,t in zip([o,c],traces):
        word=next(x for x in t['data_reads']if x['caller']=='debug_tuple_field1_finish'and x['offset']==168)
        at=word['address']-24
        section=next(s for s in e.sections if s['type']!=8 and s['address']<=at and at+32<=s['address']+s['size'])
        header=struct.unpack_from('<QQQ',e.b,section['offset']+at-section['address'])
        assert header==(0,8,8)
        assert not any(at+x in e.rel for x in [0,8,16])
        vtables.append(dict(address=at,bytes=32,header=list(header),formatter=word['target']))
    indirect=[(x['caller'],x['offset'],x['callee'])for x in traces[0]['events']if x['indirect']]
    assert indirect==[('fmt_write',672,'string_write_str'),('fmt_write',720,'program_error_debug'),
                      ('debug_tuple_field1_finish',64,'string_write_str'),
                      ('debug_tuple_field1_finish',144,'string_write_str'),
                      ('debug_tuple_field1_finish',192,'custom_reference_debug')]
    return dict(original_sha256=m.proof.sha(o.b),candidate_symbols_sha256=m.proof.sha(c.b),
                traces=traces,vtables=vtables,scalar_conversion_contracts=scalar_contracts,
                explicit_contracts=['Input discriminator is 2 and ProgramError tag is 0.',
                                    'Allocation succeeds; prefix and delimiter writes return Ok.',
                                    'Writers may mutate the String metadata and owned buffer but preserve readonly data and unrelated stack memory.',
                                    'The numeric payload remains opaque; stop at entry to its u32 formatter.'],
                indirect_sites=5,new_sites_beyond_unit_route=3,
                scope='Conditional Custom/tag0 route to a nested numeric formatter; no VM execution, formatter output, generic dispatch or whole-ELF identity claim.')

