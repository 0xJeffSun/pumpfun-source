from pathlib import Path
import importlib.util,json,sys
D=Path(__file__).resolve().parent;W=D.parent;R=W.parents[1]
def mod(n,p):
 s=importlib.util.spec_from_file_location(n,p);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m
reader=mod('buy_event_reader',R/'research/mayhem-amm-sell-cfg-recovery-20261027/helpers/reader.py');audit=mod('buy_event_audit',R/'research/mayhem-amm-sell-cfg-recovery-20261027/analysis.py');ev=mod('buy_event_extract',D/'frozen-amm436-prefix-event-20261027/event_order.py')
o=reader.Elf(R/'evidence/original/mayhem/deployed.so');a=o.window(85600,95336);event=o.window(374528,378584);original=ev.extract(o,a,event);result={'original':original,'controls':{}}
for name in sys.argv[1:]:
 c=reader.Elf(W/(name+'-build/symbols.so'));cw=audit.windows(c);b=audit.named(c,cw,'buy_pump_swap7handler');ce=next(w for w in cw.values()if audit.key(w)==audit.key(event));v=ev.extract(c,b,ce)
 left=[(w['offset'],w['width'])for w in original['writes']];right=[(w['offset'],w['width'])for w in v['writes']];v['ordered_write_matches']=sum(x==y for x,y in zip(left,right));an=o.norm(a['start'],a['end'])[0];bn=c.norm(b['start'],b['end'])[0];v['exact_prefix_bytes']=next((i for i in range(0,min(len(an),len(bn)),8)if an[i:i+8]!=bn[i:i+8]),min(len(an),len(bn)));result['controls'][name]=v;print(name,'base',v['event_base'],'writes',v['ordered_write_matches'],'prefix',v['exact_prefix_bytes'])
(D/'buy-event-order.json').write_text(json.dumps(result,indent=2)+'\n')
