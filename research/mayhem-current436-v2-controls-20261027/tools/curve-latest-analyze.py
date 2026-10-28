from pathlib import Path
import importlib.util,sys,json,hashlib,collections,difflib
W=Path(__file__).resolve().parent;R=W.parents[1]
def module(name,p):
 s=importlib.util.spec_from_file_location(name,p);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m
reader=module('reader',R/'research/mayhem-trade-origins-validator/reader.py')
analysis=module('analysis',R/'research/mayhem-amm-sell-cfg-recovery-20261027/analysis.py')
cfg=module('cfg',R/'research/mayhem-amm-sell-cfg-recovery-20261027/cfg.py')
progress=module('progress',R/'research/mayhem-trade-origins-validator/progress.py')
label=sys.argv[1];marker=sys.argv[2] if len(sys.argv)>2 else 'legacy_buy_handler';original_start={'legacy_buy_handler':113672,'legacy_sell_handler':127520,'buy_v2_handler':140512,'sell_v2_handler':159160}[marker]
o=reader.Elf(R/'evidence/original/mayhem/deployed.so');c=reader.Elf(W/(label+'-build/symbols.so'))
rows=json.loads((R/'research/mayhem-trade-origins-validator/audit.json').read_bytes())['rows'];ow={x['start']:o.window(x['start'],x['end'])for x in rows};cw=analysis.windows(c);a=ow[original_start];symbol_marker=('buy_v2_handler17h' if any('buy_v2_handler17h' in row['name'] for row in c.symbols) else '6buy_v27handler17h') if marker=='buy_v2_handler' else marker+'17h';b=analysis.named(c,cw,symbol_marker)
graph=analysis.cfg_report(cfg,o,c,a,b)
key=analysis.key;ids={key(ow[x['start']]):x['id']for x in rows}
ca=[dict(offset=x['offset'],id=ids.get(key(ow[x['target']])))for x in a['direct']]
cb=[dict(offset=x['offset'],id=ids.get(key(cw[x['target']])))for x in b['direct']]
an=o.norm(a['start'],a['end'])[0];bn=c.norm(b['start'],b['end'])[0]
blocks=difflib.SequenceMatcher(a=[an[i:i+8]for i in range(0,len(an),8)],b=[bn[i:i+8]for i in range(0,len(bn),8)],autojunk=False).get_matching_blocks()
report=dict(label=label,marker=marker,candidate_sha256=hashlib.sha256((W/(label+'-build/candidate.so')).read_bytes()).hexdigest(),symbols_sha256=hashlib.sha256(c.b).hexdigest(),original_bytes=a['end']-a['start'],candidate_bytes=b['end']-b['start'],full_equal=key(a)==key(b),aligned_slots=sum(x.size for x in blocks),position_calls_equal=sum(x==y for x,y in zip(ca,cb)),original_calls=ca,candidate_calls=cb,callee_multisets_equal=collections.Counter(x['id']for x in ca)==collections.Counter(x['id']for x in cb),original_blocks=len(graph['original_blocks']),candidate_blocks=len(graph['candidate_blocks']),mapped_blocks=len(graph['block_mapping']),topology_conflicts=graph['topology_conflicts'],opcode_different_blocks=graph['opcode_different_blocks'])
D=W/'curve-latest-audit';D.mkdir(exist_ok=True);(D/(label+'-'+marker+'.json')).write_text(json.dumps(report,indent=2)+'\n')
# Keep complete diagnostics separate to retain the limits of this structural aid.
import gzip
(D/(label+'-'+marker+'-cfg.json.gz')).write_bytes(gzip.compress(json.dumps(graph).encode(),mtime=0))
print(json.dumps({k:v for k,v in report.items()if k not in ['original_calls','candidate_calls','topology_conflicts','opcode_different_blocks']},indent=2));print('conflicts',report['topology_conflicts'][:8]);print('opcode differences',report['opcode_different_blocks'][:8])
