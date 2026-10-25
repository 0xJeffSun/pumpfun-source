from pathlib import Path
import json,hashlib,re,struct,shutil
root=Path('/Users/shawwalters/Documents/Codex/2026-10-24/pumpfun-source');out=root/'work/cli-swarm-2026-10-24/pump_event';(out/'evidence').mkdir(exist_ok=True)
files={'original.so':'research/imported-lab/inputs/pump_fun/pump.so','candidate.so':'repro/pump/bonding-curve-serializer-fortyeight/candidate.so','unstripped.so':'repro/pump/bonding-curve-serializer-fortyeight/unstripped.so','trade_types.rs':'programs/pump/src/trade_types.rs','legacy_buy.rs':'programs/pump/src/legacy_buy.rs','legacy_sell.rs':'programs/pump/src/legacy_sell.rs','dispatch-map.json':'research/imported-lab/analysis/pump_fun/dispatch-map.json','baseline-report.md':'work/pump-amm-current-body-inventory/REPORT.md','COMPLETION.md':'docs/COMPLETION.md','status.json':'repro/status.json'}
manifest=[]
for name,path in files.items():
 b=(root/path).read_bytes();(out/'evidence'/name).write_bytes(b);manifest.append(dict(file='evidence/'+name,source=path,sha256=hashlib.sha256(b).hexdigest(),size=len(b)))
ranges=[('serializer',0x1624b0,0x1639e8),('buy_wrapper',0x12a4e0,0x12abc8),('exact_buy_wrapper',0x12abc8,0x12b2b0),('sell_wrapper',0x12b2b0,0x12b7d8),('buy',0x14c038,0x14eab8),('exact_buy',0x14f4e0,0x152888),('sell',0x152888,0x1549b0)]
asm=(root/'research/imported-lab/analysis/pump_fun/pump.asm').read_text().splitlines(); b=(out/'evidence/original.so').read_bytes(); rr=[]
for name,start,end in ranges:
 lines=[l for l in asm if (m:=re.match(r'\s*([0-9a-f]+):',l)) and start<=int(m[1],16)<end];p='evidence/'+name+'.asm';(out/p).write_text('\n'.join(lines)+'\n');rr.append(dict(name=name,start=start,end_exclusive=end,sha256=hashlib.sha256(b[start:end]).hexdigest(),assembly=p))
(out/'inputs.json').write_text(json.dumps(manifest,indent=2)+'\n');(out/'ranges.json').write_text(json.dumps(rr,indent=2)+'\n')
