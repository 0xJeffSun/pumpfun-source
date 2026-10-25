from pathlib import Path
import sys,shutil,json,gzip,importlib
sys.dont_write_bytecode=True
R=Path.cwd();W=Path(__file__).resolve().parent;P=R/'work/amm-sync-log-build/publication';sys.path.insert(0,str(W/'static-tool'));an=importlib.import_module('analyze');en=importlib.import_module('enrich')
for side in ['before','after']:
 T=W/'inventory'/side;T.mkdir(parents=True,exist_ok=False);B=T/'inputs/repro/pump_amm/update-event-borrow-v144'
 def cp(a,b):b.parent.mkdir(parents=True,exist_ok=True);shutil.copy2(a,b)
 cp(R/'evidence/original/pump_amm/deployed.so',T/'inputs/evidence/original/pump_amm/deployed.so')
 for n in ['candidate.so','unstripped.so','static-comparison.json']:cp(P/n if side=='before'else W/n,B/n)
 h='repro/function-inventory/2026-10-24-374fcf0/work/pump-amm-current-body-inventory/pump_amm-bodies.json';cp(R/h,T/'inputs'/h)
 source=json.loads((P/'proposed-source-sha256.json'if side=='before'else W/'proposed-source-sha256.json').read_text())
 for n in source:cp((P/'source'/n)if side=='before'else(W/'source'/n),T/'inputs'/n)
 A=T/'analysis';an.P=T;sys.argv=['analyze','--original',str(T/'inputs/evidence/original/pump_amm/deployed.so'),'--candidate',str(B/'candidate.so'),'--symbols',str(B/'unstripped.so'),'--out',str(A)];an.main();en.P=T;en.B=B;en.A=A;en.main()
 for f in A.glob('*.json'):f.with_suffix('.json.gz').write_bytes(gzip.compress(f.read_bytes(),mtime=0));f.unlink()
print('PASS: complete before/after original/candidate function-call-data inventories')
