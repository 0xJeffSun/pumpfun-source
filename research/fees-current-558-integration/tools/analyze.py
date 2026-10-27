from pathlib import Path
import importlib.util,json
ROOT=Path(__file__).resolve().parents[2]
P=ROOT/'research/fees-composed-frontier188/window_map.py';s=importlib.util.spec_from_file_location('wm',P);w=importlib.util.module_from_spec(s);s.loader.exec_module(w)
D=Path(__file__).resolve().parent
o=(ROOT/'evidence/original/pump_fees/deployed.so').read_bytes();ow=w.windows(o);prior=None;reports={}
for label in ['baseline-native','composed207']:
 p=D/'builds'/label/'symbols.so'
 if not p.exists():continue
 b=p.read_bytes();bw=w.windows(b);c=w.compare(ow,bw);sigs={r['signature']for r in bw};raw={r['raw_sha256']for r in bw};covered={r['address']for r in ow if r['signature']in sigs};rawcovered={r['address']for r in ow if r['raw_sha256']in raw};report={'normalized':len(covered),'unique':len(c['unique_pairs']),'raw':len(rawcovered),'unmatched':len(c['unmatched_original']),'unmatched_text_bytes':sum(x['bytes']for x in c['unmatched_original'])}
 if prior:report.update(gains=sorted(covered-prior[0]),losses=sorted(prior[0]-covered),raw_gains=sorted(rawcovered-prior[1]),raw_losses=sorted(prior[1]-rawcovered))
 prior=covered,rawcovered;reports[label]=report
(D/'analysis.json').write_text(json.dumps(reports,indent=2)+'\n');print(json.dumps(reports,indent=2))
