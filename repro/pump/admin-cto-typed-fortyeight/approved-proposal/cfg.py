from pathlib import Path
import struct,json,importlib.util
P=Path(__file__).resolve().parent
s=importlib.util.spec_from_file_location('d',P/'disasm.py');d=importlib.util.module_from_spec(s);s.loader.exec_module(d)
def graph(elf,start,end):
 nodes={};p=start
 while p<end:
  op,r,off,imm=struct.unpack('<BBhi',elf.at(p,8));n=p+(16 if op==24 else 8);succ=[]
  if op==0x95:pass
  elif op&7 in[5,6]and op not in[0x85,0x8d]:
   succ=[p+8+off*8]
   if op&0xf0:succ.append(n)
  else:succ=[n]
  nodes[p]=[x for x in succ if start<=x<end];p=n
 assert all(x in nodes for ss in nodes.values()for x in ss)
 return nodes

def run():
 elf=d.a.Elf((P/'original.so').read_bytes());g=graph(elf,141840,169240);seen={141840};todo=[141840]
 while todo:
  for x in g[todo.pop()]:
   if x not in seen:seen.add(x);todo.append(x)
 pred={x:set()for x in seen}
 for a,ss in g.items():
  if a in seen:
   for b in ss:pred[b].add(a)
 dom={x:({x}if x==141840 else set(seen))for x in seen};changed=True
 while changed:
  changed=False
  for x in sorted(seen):
   if x==141840:continue
   value={x}|set.intersection(*(dom[p]for p in pred[x]))
   if value!=dom[x]:dom[x]=value;changed=True
 writes=[161056,161072,161088,161104,161144,161160,161224]
 claims={str(x):{'dominated_by_writes':[p for p in writes if p in dom[x]]}for x in[161848,161904,167008]}
 assert all(p in dom[161848]and p in dom[161904]for p in writes)
 assert not any(p in dom[167008]for p in writes)
 def reachable(start):
  reached={start};todo=[start]
  while todo:
   for x in g[todo.pop()]:
    if x not in reached:reached.add(x);todo.append(x)
  return reached
 after=reachable(161224)
 pre_cpis=[148632,157056,160904,165944,166408,169008]
 assert all(x not in after for x in pre_cpis)
 assert 167008 not in after and 161848 in after and 161904 in after
 return {'pre_mutation_calls_not_reachable_after_last_store':pre_cpis,'collect_clock_not_reachable_after_last_store':167008,'instruction_nodes':len(g),'reachable_nodes':len(seen),'scope':'Intraprocedural CFG with calls treated as returning. Dominance is a stronger overapproximation; it does not establish callees success or runtime reachability.','claims':claims}
if __name__=='__main__':print(json.dumps(run(),indent=2))
