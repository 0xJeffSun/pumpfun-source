"""Bounded CFG/operand observations; no execution or stack-equivalence claim."""
import elf

def graph(rows,start):
    offsets={r['relative_offset'] for r in rows}
    edges={}
    for i,r in enumerate(rows):
        pc=r['relative_offset'];targets=[]
        if r['opcode']==0x95:
            pass
        elif 'branch_target' in r:
            targets.append(r['branch_target']-start)
            if r['opcode'] not in (0x05,0x06):
                elf.require(i+1<len(rows),'Conditional fallthrough outside window')
                targets.append(rows[i+1]['relative_offset'])
        else:
            elf.require(i+1<len(rows),'Fallthrough outside window')
            targets.append(rows[i+1]['relative_offset'])
        elf.require(all(x in offsets for x in targets),'Branch target is not an instruction boundary')
        edges[pc]=targets
    return edges


def all_paths(edges):
    paths=[]
    def visit(pc,path):
        elf.require(pc not in path,'Cycle in bounded CFG')
        path=path+[pc]
        if not edges[pc]:paths.append(path)
        else:
            for dest in edges[pc]:visit(dest,path)
    visit(0,[])
    return paths


def analyze(original_raw,candidate_raw):
    original,candidate=elf.Elf(original_raw),elf.Elf(candidate_raw)
    h=elf.helper(candidate)
    elf.require(h['size']==1248,'Expected PR75 body-direct helper extent')
    a=elf.instructions(original.body(36072,1248),36072)
    b=elf.instructions(candidate.body(h['address'],h['size']),h['address'])
    elf.require([r['relative_offset'] for r in a]==[r['relative_offset'] for r in b],'Instruction positions differ')
    ga,gb=graph(a,36072),graph(b,h['address'])
    elf.require(ga==gb,'CFG differs')
    paths=all_paths(ga)
    changes=[]
    for i,(x,y) in enumerate(zip(a,b)):
        elf.require((x['opcode'],x['destination'],x['source'])==(y['opcode'],y['destination'],y['source']),
                    'Opcode/register shape differs')
        if x['opcode'] in (0x79,0x7b) and (x['source']==10 or x['destination']==10):
            if x['displacement']!=y['displacement']:
                changes.append(dict(offset=x['relative_offset'],kind='direct_frame_access',
                                    original=x['displacement'],candidate=y['displacement']))
        if x['opcode']==0x07 and i and a[i-1]['opcode']==0xbf and a[i-1]['source']==10:
            elf.require(a[i-1]['destination']==x['destination'] and a[i-1]['raw']==b[i-1]['raw'],
                        'Frame pointer address construction differs')
            if x['immediate']!=y['immediate']:
                changes.append(dict(offset=x['relative_offset'],kind='frame_address_addend',
                                    original=x['immediate'],candidate=y['immediate']))
    groups={}
    for row in changes:groups.setdefault(row['candidate']-row['original'],[]).append(row['offset'])
    elf.require(set(groups)=={16,152} and len(groups[16])==22 and groups[152]==[1024,1040,1072],
                'Unexpected frame translation pattern')
    # ProgramError argument and the descriptor argument are constructed locally
    # at these fixed offsets. No assertion about callee memory semantics is made.
    for rows in (a,b):
        by={r['relative_offset']:r for r in rows}
        elf.require(by[696]['opcode']==by[912]['opcode']==0x07 and
                    by[696]['immediate']==by[912]['immediate']==-24,'Error argument base differs')
        for pos in (704,920,1080):elf.require('encoded_call_target' in by[pos],'Expected direct call')
        for pos in (1024,1040):elf.require(by[pos]['opcode']==0x7b and by[pos]['destination']==10,
                                         'Expected descriptor store')
    error_sites={664,704,880,920};slice_sites={1024,1040,1072,1080}
    mixed=[p for p in paths if error_sites.intersection(p) and slice_sites.intersection(p)]
    elf.require(not mixed,'Error and descriptor regions share a local path')
    return dict(original_helper=elf.identity(original.body(36072,1248)),
                candidate_helper=dict(address=h['address'],symbol=h['name'],**elf.identity(candidate.body(h['address'],h['size']))),
                decoded_instructions=len(a),cfg_equal=True,acyclic_local_paths=len(paths),
                paths_with_error_region=sum(bool(error_sites.intersection(p)) for p in paths),
                paths_with_descriptor_region=sum(bool(slice_sites.intersection(p)) for p in paths),
                paths_with_both_regions=len(mixed),frame_operand_changes=changes,
                groups={str(k):v for k,v in groups.items()},
                limits=['Calls are modeled as normal fallthrough; this is a conservative local path observation, not a callee proof.',
                        'Original function extent remains inferred. Slot translation is not raw identity or full stack-memory equivalence.'])
