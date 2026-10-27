from pathlib import Path
import importlib.util,json,struct
D=Path(__file__).resolve().parent;R=D.parents[1];P=R/'research/fees-composed-frontier188/window_map.py';s=importlib.util.spec_from_file_location('wm',P);w=importlib.util.module_from_spec(s);s.loader.exec_module(w)
o=(R/'evidence/original/pump_fees/deployed.so').read_bytes();ow=w.windows(o);ob={v['address']:v for v in ow};rel=dict(w.m.relocations(o))
def loc(data,p):
 low,ptr,n,line,col=struct.unpack('<IIQII',w.m.at_address(data,p,24))
 assert low==0 and 0<n<=300 and 0<line<=100000 and 0<col<=300
 name=w.m.at_address(data,ptr,n);assert name.endswith(b'.rs');return(name.decode(),line,col)
reports={}
for label in ['baseline-native','composed207']:
 b=(D/'builds'/label/'symbols.so').read_bytes();cw=w.windows(b);cb={v['address']:v for v in cw};pairs=w.compare(ow,cw)['unique_pairs'];edges={};locations={};badloc=[]
 for pair in pairs:
  a,z=pair['original'],pair['candidate']
  for x,y in zip(w.m.instructions(o,a['address'],a['bytes']),w.m.instructions(b,z['address'],z['bytes'])):
   at=a['address']+x['offset'];info=rel.get(at,0)&0xffffffff;k=f"{a['address']}:{x['offset']}"
   if info==8:
    try:l=loc(o,x['lddw_value'])
    except(AssertionError,ValueError,StopIteration,struct.error):continue
    try:r=loc(b,y['lddw_value'])
    except(AssertionError,ValueError,StopIteration,struct.error):r=None
    locations[k]=[l,r];badloc.extend([k]if l!=r else[])
   if 'call_target'in x and info!=10:edges[k]=ob[x['call_target']]['signature']==cb[y['call_target']]['signature']
 reports[label]={'edges':edges,'locations':locations,'location_mismatches':badloc}
a,b=reports.values();out={k:{'equal_edges':sum(v['edges'].values()),'total_edges':len(v['edges']),'locations':len(v['locations']),'location_mismatches':v['location_mismatches']}for k,v in reports.items()};out['lost_equal_edges']=[k for k,v in a['edges'].items()if v and not b['edges'].get(k)];out['lost_equal_locations']=[k for k,v in a['locations'].items()if v[0]==v[1]and (k not in b['locations']or b['locations'][k][0]!=b['locations'][k][1])];(D/'edges.json').write_text(json.dumps(out,indent=2)+'\n');print(json.dumps(out,indent=2))
