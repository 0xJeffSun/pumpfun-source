"""Stage completed root receipts losslessly; never write the reviewed packet."""
from pathlib import Path,PurePosixPath
import gzip,hashlib,json,lzma,shutil
W=Path(__file__).resolve().parents[1];R=W.parents[1];D=W/'source-origins-composed-runtime-01';S=W/'source-origin-runtime-stage';assert not S.exists();assert(D/'trades/commands.json').is_file(),'wait for completed root trade commands'
S.mkdir();sha=lambda b:hashlib.sha256(b).hexdigest();records=json.loads((D/'trades/commands.json').read_bytes());assert len(records['runs'])==14 and sum(x['cases']for x in records['runs'])==6636
frozen={};files={}
def write(name,b):
 n=PurePosixPath(name);assert not n.is_absolute() and '..'not in n.parts
 p=S/name;p.parent.mkdir(parents=True,exist_ok=True);p.write_bytes(b);files[name]=sha(b)
def freeze(name,expected=None):
 n=PurePosixPath(name);assert not n.is_absolute() and '..'not in n.parts
 b=(R/name).read_bytes();assert expected is None or sha(b)==expected,(name,expected,sha(b))
 if name in frozen:assert frozen[name]==sha(b)
 else:write('frozen/'+name,b);frozen[name]=sha(b)
write('trades/commands.json',(D/'trades/commands.json').read_bytes())
for row in records['runs']:
 assert row['returncode']==0 and row['mismatches']==0
 name=row['family'];raw=(D/'trades'/(name+'.json')).read_bytes();j=json.loads(raw);assert j['candidate_sha256']==records['candidate_sha256'] and j['case_count']==row['cases']
 write('trades/'+name+'.json.xz',lzma.compress(raw,preset=0));write('trades/'+name+'.log',(D/'trades'/(name+'.log')).read_bytes())
 for n,h in j['harness_sha256'].items():freeze(n,h)
for path in ['repro/mayhem/twenty/buy-cases.json','repro/mayhem/nineteen/sell-cases.json','repro/mayhem/twentytwo/buy-v2-cases.json','repro/mayhem/twentyone/sell-v2-cases.json','repro/mayhem/twentyfour/buy-pump-swap-cases.json','repro/mayhem/twentyfour/sell-pump-swap-cases.json']:freeze(path)
for name in ['rejections','pump-cpi']:
 raw=(D/'initializer'/(name+'.json.gz')).read_bytes();j=json.loads(gzip.decompress(raw));assert j['candidate_sha256']==records['candidate_sha256'];write('first/'+name+'.json.gz',raw)
 for n,h in j['harness_sha256'].items():freeze(n,h)
 producer=(R/'research/mayhem-quotes-current-recovery-20261027/runtime/producer.py').read_bytes();assert sha(producer)==j['runner_sha256'];write('producer.py',producer)
write('initializer_check.py',(R/'research/mayhem-quotes-current-recovery-20261027/runtime_check.py').read_bytes());write('trade_check.py',(R/'research/mayhem-accounting-extend-recovery/verify.py').read_bytes())
write('inputs.json',(json.dumps({'frozen':frozen,'staged_files':files,'candidate_sha256':records['candidate_sha256'],'source_runtime_directory':str(D),'scope':'Raw reports preserved exactly through lossless compression; not yet a qualification result.'},indent=2)+'\n').encode());print(S)
