"""Static V2 diagnostics on the actual 18648/18096-byte original root windows."""
from pathlib import Path
import difflib,gzip,importlib.util,json,sys
D=Path(__file__).resolve().parent;W=D.parent
s=importlib.util.spec_from_file_location('v2_helpers',W/'mayhem-amm-lifetimes/audit.py');a=importlib.util.module_from_spec(s);s.loader.exec_module(a)
def audit(label,path):
 e=a.reader.Elf(path.resolve());cw,_=a.c.tables(e);result=a.v.measure(a.c,a.o,a.ow,a.rows,e);result['partial']={}
 for ident,marker in [('O0083','buy_v2_handler17h' if any('buy_v2_handler17h' in x['name'] for x in e.symbols) else '6buy_v27handler17h'),('O0084','sell_v2_handler17h')]:
  row=next(r for r in a.rows if r['id']==ident);ow=a.ow[row['start']];w=a.a.named(e,cw,marker);on=a.o.norm(ow['start'],ow['end'])[0];cn=e.norm(w['start'],w['end'])[0]
  assert len(on)==(18648 if ident=='O0083' else 18096)
  graph=a.a.cfg_report(a.cfg,a.o,e,ow,w);(D/(label+'-'+ident+'-cfg.json.gz')).write_bytes(gzip.compress(json.dumps(graph).encode(),mtime=0))
  seq=difflib.SequenceMatcher(a=[on[i:i+8] for i in range(0,len(on),8)],b=[cn[i:i+8] for i in range(0,len(cn),8)],autojunk=False)
  oc=[a.c.key(a.ow[x['target']]) for x in ow['direct']];cc=[a.c.key(cw[x['target']]) for x in w['direct']]
  ev=a.ow[374528];ew=[z for z in cw.values() if a.c.key(z)==a.c.key(ev)];oe=a.ev.extract(a.o,ow,ev);ce=a.ev.extract(e,w,ew[0]);assert len(ew)==1
  diag=dict(marker=marker,original_start=ow['start'],candidate_start=w['start'],original_bytes=len(on),candidate_bytes=len(cn),full_equal=a.c.key(ow)==a.c.key(w),prefix_bytes=next((i for i in range(0,min(len(on),len(cn)),8) if on[i:i+8]!=cn[i:i+8]),min(len(on),len(cn))),aligned_slots=sum(x.size for x in seq.get_matching_blocks()),position_equal_slots=sum(on[i:i+8]==cn[i:i+8] for i in range(0,min(len(on),len(cn)),8)),ordered_callee_shapes_equal=oc==cc,call_count=len(oc),call_offsets_equal=[x['offset'] for x in ow['direct']]==[x['offset'] for x in w['direct']],same_call_offsets=sum(x['offset']==y['offset'] for x,y in zip(ow['direct'],w['direct'])),source_profiles_equal=a.c.profile(a.o,ow)==a.c.profile(e,w),original_blocks=len(graph['original_blocks']),candidate_blocks=len(graph['candidate_blocks']),mapped_blocks=len(graph['block_mapping']),topology_conflicts=graph['topology_conflicts'],opcode_differences=graph['opcode_different_blocks'],original_event_base=oe['event_base'],candidate_event_base=ce['event_base'],event_write_order_matches=sum((x['offset'],x['width'])==(y['offset'],y['width']) for x,y in zip(oe['writes'],ce['writes'])))
  result['partial'][ident]=diag
  if ident=='O0084':
   ids={a.c.key(a.ow[r['start']]):r['id'] for r in a.rows};calls={x['offset']:ids.get(a.c.key(a.ow[x['target']])) for x in ow['direct']};other={x['offset']:ids.get(a.c.key(cw[x['target']])) for x in w['direct']}
   lines=['Original | candidate positional diagnostics; addresses/calls are not normalized in rendered text.']
   for i in range(0,min(2600,len(cn)),8):lines.append(f'{i:5} {" " if on[i:i+8]==cn[i:i+8] else "!"} {a.fmt(a.o.b,ow["start"]+i):40} {calls.get(i,""):5} | {a.fmt(e.b,w["start"]+i):40} {other.get(i,"")}')
   (D/(label+'-sell-start.txt')).write_text('\n'.join(lines)+'\n',encoding='utf-8')
 (D/(label+'-audit.json')).write_text(json.dumps(result,indent=2)+'\n',encoding='utf-8');print(label,'frontier',result['normalized'],result['raw_local'],result['direct_closed'])
 for ident,d in result['partial'].items():print(ident,{k:v for k,v in d.items() if k not in ['topology_conflicts','opcode_differences']},'conflicts',len(d['topology_conflicts']))
 return result
if __name__=='__main__':audit(sys.argv[1],Path(sys.argv[2]))
