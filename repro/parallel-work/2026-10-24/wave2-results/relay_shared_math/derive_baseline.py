#!/usr/bin/env python3
"""Static byte/IDL derivation only. No program execution or external dependencies."""
import bisect,collections,hashlib,json,struct
from pathlib import Path
W=Path(__file__).resolve().parent
H=lambda b:hashlib.sha256(b).hexdigest()
def dump(p,v):p.write_text(json.dumps(v,indent=2)+'\n')
def derive():
 b=(W/'inputs/deployed.so').read_bytes(); base=json.loads((W/'inputs/baseline.json').read_text());idl=json.loads((W/'inputs/idl.json').read_text());attr=json.loads((W/'inputs/attribution.json').read_text())
 # ELF64 section/symbol/relocation parsing independent of retained inventory helper.
 shoff=struct.unpack_from('<Q',b,40)[0]; ents,n,si=struct.unpack_from('<HHH',b,58)
 sections=[struct.unpack_from('<IIQQQQIIQQ',b,shoff+i*ents) for i in range(n)]
 st=sections[si];names=b[st[4]:st[4]+st[5]];secs={names[s[0]:].split(b'\0')[0].decode():s for s in sections};text=secs['.text'];lo,hi=text[4],text[4]+text[5]
 assert text[3]==lo # address/file offset equality for this captured ELF
 ds=secs['.dynsym'];ss=sections[ds[6]];sbytes=b[ss[4]:ss[4]+ss[5]];symbols={};entries={struct.unpack_from('<Q',b,24)[0]};exports={}
 for i,p in enumerate(range(ds[4],ds[4]+ds[5],24)):
  ni,info,other,idx,val,size=struct.unpack_from('<IBBHQQ',b,p);name=sbytes[ni:].split(b'\0')[0].decode();symbols[i]=name
  if info&15==2 and size and lo<=val<hi:entries.add(val);exports[val]=name
 rel={};sec=secs['.rel.dyn']
 for p in range(sec[4],sec[4]+sec[5],16):
  at,info=struct.unpack_from('<QQ',b,p);typ=info&0xffffffff;rel[at]={'record_pc':p,'type':typ,'symbol':symbols.get(info>>32,'')}
  if typ==8:
   ptr=struct.unpack_from('<I',b,at+4)[0]+(struct.unpack_from('<I',b,at+12)[0]<<32) if lo<=at<hi and b[at]==24 else struct.unpack_from('<Q',b,at)[0]>>32
   if lo<=ptr<hi and ptr%8==0:entries.add(ptr)
 calls={}
 for p in range(lo,hi,8):
  if b[p:p+2]==b'\x85\x10' and rel.get(p,{}).get('type')!=10:
   target=p+8+8*struct.unpack_from('<i',b,p+4)[0];calls[p]=target
   if lo<=target<hi and target%8==0:entries.add(target)
 starts=sorted(entries);assert starts==[f['start'] for f in base['functions']];assert len(starts)==492
 def owner(p):
  return bisect.bisect_right(starts,p)-1 if lo<=p<hi else None
 paths=[]
 for path in attr['rust_source_paths']:
  raw=path.encode();pos=0
  while (pos:=b.find(raw,pos))>=0:paths.append({'path':path,'start':pos,'end':pos+len(raw),'sha256':H(raw)});pos+=len(raw)
 # Rust Location-shaped tuples: exact known path pointer + length, with u32 line/column.
 diagnostics=[]
 for name,s in secs.items():
  if name not in ['.rodata','.data.rel.ro']:continue
  for p in range(s[4],s[4]+s[5]-23,8):
   ptr,length,line,col=struct.unpack_from('<QQII',b,p)
   for x in paths:
    if ptr==x['start'] and length==x['end']-ptr:diagnostics.append({'start':p,'end':p+24,'path':x['path'],'path_start':ptr,'line':line,'column':col,'raw':b[p:p+24].hex()})
 diag={x['start']:x for x in diagnostics}
 rows=[]; decoded=[]
 for i,s in enumerate(starts):
  e=starts[i+1] if i+1<len(starts) else hi;old=base['functions'][i];assert H(b[s:e])==old['sha256']
  r={'ordinal':i,'start':s,'end':e,'bytes':e-s,'sha256':H(b[s:e]),'exported_name':exports.get(s),'source_identity':None,'direct_calls':[],'external_calls':[],'indirect_calls':[],'branches':[],'data_references':[],'source_path_evidence':[],'discriminator_evidence':[],'fallthrough_to_next_window':False}
  p=s; last=None
  while p<e:
   op,reg,off,imm=struct.unpack_from('<BBhi',b,p);inst={'pc':p,'raw':b[p:p+8].hex(),'opcode':op,'dst':reg&15,'src':reg>>4,'offset':off,'immediate':imm};last=op
   if op==24:
    val=struct.unpack_from('<I',b,p+4)[0]+(struct.unpack_from('<I',b,p+12)[0]<<32);inst['u64']=val;inst['raw']=b[p:p+16].hex()
    if hi<=val<len(b):
     ref={'pc':p,'target':val,'relocation':rel.get(p)};r['data_references'].append(ref)
     for path in paths:
      if path['start']<=val<path['end']:r['source_path_evidence'].append({'pc':p,'kind':'direct_path_address','path':path['path'],'target':val})
     if val in diag:r['source_path_evidence'].append({'pc':p,'kind':'location_shaped_record','target':val,**diag[val]})
    for a in idl['accounts']:
     if val==int.from_bytes(bytes(a['discriminator']),'little'):r['discriminator_evidence'].append({'name':a['name'],'pc':p,'value':val})
    p+=16
   else:
    if op==133:
     if p in calls:r['direct_calls'].append({'pc':p,'target':calls[p],'target_ordinal':owner(calls[p])})
     else:r['external_calls'].append({'pc':p,'relocation':rel.get(p),'immediate':imm})
    elif op==141:r['indirect_calls'].append({'pc':p,'register':imm})
    elif op&7 in (5,6) and op!=149:r['branches'].append({'pc':p,'target':p+8+off*8,'target_ordinal':owner(p+8+off*8),'conditional':op!=5})
    p+=8
   decoded.append(inst)
  r['fallthrough_to_next_window']=last not in [149,5] and e<hi
  rows.append(r)
 graph={r['ordinal']:set(c['target_ordinal'] for c in r['direct_calls'] if c['target_ordinal'] is not None) for r in rows}
 direct_graph={k:set(v) for k,v in graph.items()}
 # Also retain branch/fallthrough crossings: inferred boundaries are not guaranteed function exits.
 for r in rows:
  graph[r['ordinal']].update(c['target_ordinal'] for c in r['branches'] if c['target_ordinal'] is not None and c['target_ordinal']!=r['ordinal'])
  if r['fallthrough_to_next_window']:graph[r['ordinal']].add(r['ordinal']+1)
 def reach(root,edges):
  seen=set();todo=[root]
  while todo:
   x=todo.pop()
   if x in seen:continue
   seen.add(x);todo.extend(edges[x]-seen)
  return seen
 dispatch=[]
 for d in base['idl_instruction_dispatch_targets']:
  x=dict(d);cp=d['constant_pc'];pc=d['comparison_pc'];call=d['dispatch_call_pc'];disc=bytes.fromhex(d['discriminator']);assert b[cp]==24 and b[cp+4:cp+8]+b[cp+12:cp+16]==disc
  assert b[pc]==29 and pc+8+8*struct.unpack_from('<h',b,pc+2)[0]==d['branch_target'];assert calls[call]==d['direct_callee_start']
  root=owner(d['direct_callee_start']);x['wrapper_ordinal']=root;x['conservative_static_dependency_ordinals']=sorted(reach(root,graph));x['direct_call_dependency_ordinals']=sorted(reach(root,direct_graph));x['idl']=next(z for z in idl['instructions'] if z['name']==d['name']);dispatch.append(x)
 for r in rows:
  o=r['ordinal'];r['dispatch_reachability']=[d['name'] for d in dispatch if o in d['direct_call_dependency_ordinals']];r['dependency_ordinals']=sorted(direct_graph[o]);r['possible_cross_window_dependency_ordinals']=sorted(graph[o]);r['caller_ordinals']=sorted(k for k,v in direct_graph.items() if o in v);r['possible_cross_window_caller_ordinals']=sorted(k for k,v in graph.items() if o in v)
  names=sorted(set(x['path'] for x in r['source_path_evidence']));r['source_path_labels']=names
  if any(d['wrapper_ordinal']==o for d in dispatch):g='dispatch_wrapper'
  elif r['discriminator_evidence']:g='account_discriminator_check'
  elif names:g='embedded_local_path_references'
  elif r['exported_name']:g='exported_entry'
  elif len(r['dispatch_reachability'])>1:g='shared_static_dependency_unattributed'
  elif r['dispatch_reachability']:g='single_dispatch_dependency_unattributed'
  else:g='outside_dispatch_direct_call_closure_unattributed'
  r['group']=g
 groups={g:[r['ordinal'] for r in rows if r['group']==g] for g in sorted(set(r['group'] for r in rows))}
 return {'windows.json':rows,'dispatch.json':dispatch,'groups.json':groups,'source-evidence.json':{'embedded_paths':paths,'location_shaped_records':diagnostics,'limit':'Embedded strings and tuple shapes are not recovered source text or original function identity.'},'instructions.json':decoded}
if __name__=='__main__':
 for name,value in derive().items():dump(W/name,value)
 print('Static derivation complete')
