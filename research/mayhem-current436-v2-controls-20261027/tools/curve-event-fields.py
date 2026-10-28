from pathlib import Path
import importlib.util,json,sys
W=Path(__file__).resolve().parent;R=W.parents[1]
def mod(n,p):
 s=importlib.util.spec_from_file_location(n,p);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m
r=mod('r',R/'research/mayhem-trade-origins-validator/reader.py');a=mod('a',R/'research/mayhem-amm-sell-cfg-recovery-20261027/analysis.py');g=mod('g',R/'research/mayhem-amm-sell-cfg-recovery-20261027/cfg.py');g.fields={i:'account_slot_'+hex(i)for i in range(0,2048,8)}
label=sys.argv[1];marker=sys.argv[2]if len(sys.argv)>2 else'legacy_buy_handler';start={'legacy_buy_handler':113672,'legacy_sell_handler':127520,'buy_v2_handler':140512,'sell_v2_handler':159160}[marker]
o=r.Elf(R/'evidence/original/mayhem/deployed.so');c=r.Elf(W/(label+'-build/symbols.so'));rows=json.loads((R/'research/mayhem-trade-origins-validator/audit.json').read_bytes())['rows'];ow={x['start']:o.window(x['start'],x['end'])for x in rows};cw=a.windows(c);cc=a.named(c,cw,marker+'17h')
clock=a.key(ow[651216]);event=a.key(ow[374528]);out={}
for name,e,w,table in [('original',o,ow[start],ow),('candidate',c,cc,cw)]:
 clock_at=next(x['offset']for x in w['direct']if a.key(table[x['target']])==clock);event_at=next(x['offset']for x in w['direct']if x['offset']>clock_at and a.key(table[x['target']])==event)
 ins,blocks=g.cfg(e,w['start'],w['end']);fields=g.field_reads(blocks)
 reads=[x for xs in fields.values()for x in xs if clock_at-320<=x['at']<event_at];reads.sort(key=lambda x:x['at'])
 out[name]={'clock_at':clock_at,'event_at':event_at,'reads':reads}
print(json.dumps(out,indent=2));(W/'curve-latest-audit'/(label+'-'+marker+'-fields.json')).write_text(json.dumps(out,indent=2)+'\n')
