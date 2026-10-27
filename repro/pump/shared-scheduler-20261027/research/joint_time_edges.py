"""Signed original/candidate schedule probes with jointly extreme i64 fields."""
from pathlib import Path
import sys,json,gzip,hashlib,itertools
ROOT=Path(__file__).resolve().parents[2];sys.path.insert(0,str(ROOT/'scripts'))
import pump_incentives_admin_differential as fixture
from pump_incentive_schedule_differential import panic_messages
from solders.transaction import Transaction
import base64
candidate=ROOT/'work/pump-shared-day-recovery/checked/candidate.so';lo=-(1<<63);hi=(1<<63)-1
cases=[]
for now,start,end in [(lo,lo+1,hi),(lo,lo+1,lo+2),(lo,hi-1,hi),(-2,-1,hi),(-2,-1,1)]:
 for day in [1,hi,lo]:
  for supply in [0,1]:cases.append({'name':f'joint-{len(cases)}','now':now,'start':start,'end':end,'day':day,'supply':supply})
for old_start,old_end,now in [(lo,hi,lo),(hi,hi,lo),(0,hi,hi),(1,hi,hi),(hi-1,hi,hi-1)]:
 for day in [0,1,hi]:
  for index in [0,30]:cases.append({'name':f'stored-{len(cases)}','old_start':old_start,'old_end':old_end,'now':now,'start':0,'end':0,'day':day,'index':index,'supply':1})
rows=[]
for case in cases:
 a=fixture.run(case);b=fixture.run(case,candidate)
 assert a['transaction_base64']==b['transaction_base64'];Transaction.from_bytes(base64.b64decode(a['transaction_base64'])).verify()
 diff=[f for f in ('before','after','error','events','inner','return') if a[f]!=b[f]]
 if panic_messages(a)!=panic_messages(b):diff.append('panic_message')
 rows.append({'case':case,'original':a,'candidate':b,'differences':diff})
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
r={'scope':__doc__,'original_sha256':sha(fixture.ORIGINAL),'candidate_sha256':sha(candidate),'script_sha256':sha(Path(__file__)),'fixture_sha256':sha(Path(fixture.__file__)),'case_count':len(rows),'mismatches':[r['case']['name'] for r in rows if r['differences']],'cases':rows}
(ROOT/'work/pump-shared-day-recovery/joint-time-edges.json.gz').write_bytes(gzip.compress(json.dumps(r).encode(),mtime=0));print({'cases':len(rows),'mismatches':r['mismatches']});assert not r['mismatches']
