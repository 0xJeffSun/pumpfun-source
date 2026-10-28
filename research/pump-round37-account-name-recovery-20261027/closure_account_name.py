exec(open('/workspace/fees-recovery/measure.py').read().split('original=')[0])
original=(R/'evidence/original/pump/deployed.so').read_bytes();candidate=Path(sys.argv[1]).read_bytes();ow,cw=[w.windows(x)for x in[original,candidate]];om,cm=[{x['address']:x for x in rows}for rows in[ow,cw]];pairs=[]
for addr in [0x880b0,0xa0838,0x834c8,0x2bc0]:
 hits=[x for x in cw if x['signature']==om[addr]['signature']];assert len(hits)==1;pairs.append((addr,hits[0]['address']))
queue=list(pairs);seen=set();edges=[];open_edges=[]
while queue:
 a,b=queue.pop()
 if(a,b)in seen:continue
 seen.add((a,b));left,right=om[a],cm[b]
 if left['signature']!=right['signature']:open_edges.append(dict(original=a,candidate=b,reason='callee body differs'));continue
 ar,br=[w.m.instructions(z,f['address'],f['bytes'])for z,f in [(original,left),(candidate,right)]]
 for x,y in zip(ar,br):
  if 'call_target'not in x:continue
  oa,cb=x['call_target'],y['call_target'];assert x['offset']==y['offset']
  if oa not in om or cb not in cm:continue
  match=om[oa]['signature']==cm[cb]['signature'];edges.append(dict(original_caller=a,candidate_caller=b,offset=x['offset'],original_target=oa,candidate_target=cb,callee_normalized_equal=match))
  if match:queue.append((oa,cb))
  else:open_edges.append(edges[-1])
r=dict(scope='Pointwise direct-call closure from four recovered arithmetic bodies; excludes indirect calls, readonly/data bindings and whole ELF identity.',roots=pairs,visited_pairs=len(seen),direct_edges=len(edges),open_edges=open_edges,edges=edges)
Path(sys.argv[2]).write_text(json.dumps(r,indent=2)+'\n');print({k:v for k,v in r.items()if k not in['edges']})
