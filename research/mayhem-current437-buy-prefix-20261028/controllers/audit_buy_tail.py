from pathlib import Path
import importlib.util,json,struct
D=Path(__file__).resolve().parent;W=D.parent;R=W.parents[1]
def mod(n,p):
 s=importlib.util.spec_from_file_location(n,p);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m
reader=mod('bt_reader',R/'research/mayhem-amm-sell-cfg-recovery-20261027/helpers/reader.py');audit=mod('bt_audit',R/'research/mayhem-amm-sell-cfg-recovery-20261027/analysis.py');events=mod('bt_events',D/'frozen-amm436-prefix-event-20261027/event_order.py')
o=reader.Elf(R/'evidence/original/mayhem/deployed.so');c=reader.Elf(W/'qualified-amm436-derived-event-origin-01-build/symbols.so');cw=audit.windows(c);a=o.window(85600,95336);b=audit.named(c,cw,'buy_pump_swap7handler');g=json.loads((D/'qualified-amm436-derived-event-origin-01-buy-cfg.json').read_bytes())
def fmt(v):
 op=v['op'];d=v['dst'];s=v['src'];k=v['imm'];f=v['offset'];size={0:32,8:16,16:8,24:64}.get(op&0x18)
 if op&7==1 and op&0xe0==0x60:return f'r{d} = *(u{size} *)(r{s}{f:+})'
 if op&7==3 and op&0xe0==0x60:return f'*(u{size} *)(r{d}{f:+}) = r{s}'
 if op&7==2 and op&0xe0==0x60:return f'*(u{size} *)(r{d}{f:+}) = {k}'
 if op==0x85:return f'call {k}'
 if op==0x18:return f'r{d} = lddw {k}'
 if op==0x95:return 'exit'
 if op&7 in(4,7):
  typ={0x0:'+=',0x10:'-=',0x20:'*=',0x30:'/=',0x40:'|=',0x50:'&=',0x60:'<<=',0x70:'>>=',0x80:'neg',0x90:'%=',0xa0:'^=',0xb0:'=',0xc0:'s>>='}.get(op&0xf0,hex(op))
  return f'r{d} {typ} '+(f'r{s}'if op&8 else str(k))
 if op&7 in(5,6):return f'branch op{op:02x} r{d},'+(f'r{s}'if op&8 else str(k))+f' -> {v["at"]+8+f*8}'
 return str(v)
lines=[];diff=[]
for k,ob in g['original_blocks'].items():
 if ob['start']<7000:continue
 cb=g['candidate_blocks'][str(ob['start'])]
 lines.append(f'BLOCK {ob["start"]} original/candidate')
 for oi,ci in zip(ob['ins'],cb['ins']):
  x,y=fmt(oi),fmt(ci);mark=' 'if x==y else '!';lines.append(f'{oi["at"]:5} {mark} {x:40} | {y}')
  if x!=y:diff.append(dict(offset=oi['at'],original=oi,candidate=ci))
(D/'buy-tail-disassembly.txt').write_text('\n'.join(lines)+'\n')
ow={r['start']:o.window(r['start'],r['end'])for r in json.loads((R/'research/mayhem-provider-sharing/audit.json').read_bytes())['rows']};event=ow[374528];ce=next(w for w in cw.values()if audit.key(w)==audit.key(event))
first=events.extract(o,a,event);second=events.extract(c,b,ce)
(D/'buy-tail-audit.json').write_text(json.dumps(dict(differing_instructions=diff,original_event=first,candidate_event=second),indent=2)+'\n')
print('differing slots',len(diff),'first offsets',[x['offset']for x in diff[:12]],'event bases',first['event_base'],second['event_base'])
