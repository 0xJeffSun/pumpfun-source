from pathlib import Path
import importlib.util,json,sys,difflib
W=Path(__file__).resolve().parent;R=W.parents[1]
def mod(n,p):
 s=importlib.util.spec_from_file_location(n,p);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m
r=mod('r',R/'research/mayhem-trade-origins-validator/reader.py');a=mod('a',R/'research/mayhem-amm-sell-cfg-recovery-20261027/analysis.py');g=mod('g',R/'research/mayhem-amm-sell-cfg-recovery-20261027/cfg.py');g.fields={i:'account_slot_'+hex(i)for i in range(0,2048,8)}
label=sys.argv[1];name_marker=sys.argv[2] if len(sys.argv)>2 else 'buy_v2_handler';original_start={'buy_v2_handler':140512,'sell_v2_handler':159160}[name_marker];o=r.Elf(R/'evidence/original/mayhem/deployed.so');c=r.Elf(W/(label+'-build/symbols.so'));rows=json.loads((R/'research/mayhem-trade-origins-validator/audit.json').read_bytes())['rows'];ow={x['start']:o.window(x['start'],x['end'])for x in rows};cw=a.windows(c);cc=a.named(c,cw,name_marker+'17h');out={}
marker=a.key(ow[419744]) if 419744 in ow else None
# O0317 is the existing clone/borrow marker, selected by original inventory ID.
marker=a.key(ow[next(x['start'] for x in rows if x['id']=='O0317')])
for name,e,w,table in [('original',o,ow[original_start],ow),('candidate',c,cc,cw)]:
 end=next(x['offset']for x in w['direct']if a.key(table[x['target']])==marker)
 ins,blocks=g.cfg(e,w['start'],w['end']);fields=g.field_reads(blocks);reads=sorted([x for xs in fields.values()for x in xs if x['at']<end],key=lambda x:x['at']);out[name]=reads
f=lambda values:[str((x['base'],x['offset'],x['width']))for x in values]
print('\n'.join(difflib.unified_diff(f(out['original']),f(out['candidate']))));(W/'curve-latest-audit'/(label+'-'+name_marker+'-first-fields.json')).write_text(json.dumps(out,indent=2)+'\n')
