"""Derive five complete-body call-offset losses and their linked-text context."""
from collections import Counter
from pathlib import PureWindowsPath
import re

IDS=('O0255','O0256','O0258','O0265','O0271')


def inspect(q,v,registry,path,original,original_rows,registry_map,path_map):
    require=v.require
    def stems(e,a,b):return sorted({re.sub(r'17h[0-9a-f]{16}E$','E',s['name']) for s in e.symbols if s['table']=='.symtab' and s['value']==a and s['size']==b-a})
    def target(e,address):
        rows=[(a,b) for a,b in q.v.functions(e) if a==address];require(len(rows)==1,'path target full-function boundary differs');a,b=rows[0]
        return dict(start=a,bytes=b-a,names=stems(e,a,b),raw=v.identity(e.b[a:b]),normalized=e.window(a,b)['normalized_sha256'])
    out={}
    for oid in IDS:
        r=original_rows[oid];ob=original.b[r['start']:r['end']]
        old=[(a,b) for a,b in q.v.functions(registry) if registry.b[a:b]==ob];require(len(old)==1,'path original raw counterpart ambiguity differs');a,b=old[0]
        names=stems(registry,a,b)
        new=[(x,y) for x,y in q.v.functions(path) if y-x==b-a and set(stems(path,x,y))&set(names) and path.window(x,y)['normalized_sha256']==registry.window(a,b)['normalized_sha256']]
        require(len(new)==1,'path caller correspondence ambiguity differs');c,d=new[0]
        delta=[i for i in range(0,b-a,8) if registry.b[a+i:a+i+8]!=path.b[c+i:c+i+8]];require(len(delta)==1,'path raw difference is not one instruction');off=delta[0]
        rc=registry.window(a,b)['direct'];pc=path.window(c,d)['direct'];require(len(rc)==len(pc)==1 and rc[0]['offset']==pc[0]['offset']==off,'path direct-call slot differs')
        # The reader, not symbol spelling, decides the actual call destinations.
        rt=target(registry,rc[0]['target']);pt=target(path,pc[0]['target'])
        before=registry.b[a+off:a+off+8];after=path.b[c+off:c+off+8]
        require(a==c and b==d and before[:4]==after[:4]==bytes.fromhex('85100000'),'path caller location/opcode differs')
        require(pt['start']-rt['start']==720 and int.from_bytes(after[4:],'little',signed=True)-int.from_bytes(before[4:],'little',signed=True)==90,'path call displacement differs')
        require(rt['bytes']==pt['bytes'] and rt['names']==pt['names'] and rt['normalized']==pt['normalized'],'path direct target correspondence differs')
        out[oid]=dict(original_start=r['start'],original_bytes=len(ob),original_raw=v.identity(ob),registry_start=a,path_start=c,bytes=b-a,names=names,changed_slot=off,registry_instruction=before.hex(),path_instruction=after.hex(),call_displacement_delta=90,registry_target=rt,path_target=pt,target_shift_bytes=720,target_raw_equal=rt['raw']==pt['raw'])
    def owners(rows):
        result={}
        for address,size,owner,section in rows:
            m=re.fullmatch(r'(.+\.rlib)\((.+)\)',owner)
            name=re.sub(r'-[0-9a-f]+\.rlib$','',PureWindowsPath(m[1]).name) if m else 'root-object'
            r=result.setdefault(name,dict(bytes=0,functions=0,sections=[]));r['bytes']+=size;r['functions']+=1;r['sections'].append(dict(address=address,bytes=size,section=re.sub(r'17h[0-9a-f]{16}E$','E',section)))
        return result
    old=owners(registry_map);new=owners(path_map);empty=dict(bytes=0,functions=0)
    changed={n:dict(registry_bytes=old.get(n,empty)['bytes'],path_bytes=new.get(n,empty)['bytes'],registry_functions=old.get(n,empty)['functions'],path_functions=new.get(n,empty)['functions']) for n in sorted(old.keys()|new.keys()) if (old.get(n,empty)['bytes'],old.get(n,empty)['functions'])!=(new.get(n,empty)['bytes'],new.get(n,empty)['functions'])}
    require(len(changed)==1 and all(r['path_bytes']-r['registry_bytes']==720 and r['path_functions']-r['registry_functions']==2 for r in changed.values()),'path net text-owner difference differs')
    name=next(iter(changed));a=Counter((r['bytes'],r['section']) for r in old.get(name,dict(sections=[]))['sections']);b=Counter((r['bytes'],r['section']) for r in new[name]['sections'])
    require(not a-b,'path allocator-owner text-section loss differs');added=b-a
    require(added==Counter({(312,'.text.unlikely._ZN5alloc7raw_vec11finish_growE'):1,(408,'.text._ZN5alloc7raw_vec19RawVec$LT$T$C$A$GT$8grow_oneE'):1}),'path added allocator helper cohort differs')
    added_rows=[r for r in new[name]['sections'] if (r['bytes'],r['section']) in added]
    require(len(added_rows)==2 and sum(r['bytes'] for r in added_rows)==720,'path additional helper extent differs')
    for r in out.values():require(r['path_start']+r['bytes']<=min(a['address'] for a in added_rows) and max(a['address']+a['bytes'] for a in added_rows)<=r['path_target']['start'],'path helpers do not lie between caller and target')
    return dict(callers=out,changed_owner_extents=changed,added_allocator_sections=added_rows,target_executions=0,recursive_call_graph_identity_claimed=False)
