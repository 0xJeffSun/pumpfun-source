"""Calibrate modeled native-layout state against serialized VM account results."""
from pathlib import Path
import sys,struct,json,gzip,hashlib
ROOT=Path(__file__).resolve().parents[2];sys.path.insert(0,str(ROOT/'scripts'));sys.path.insert(0,str(Path(__file__).resolve().parent))
import pump_incentives_admin_differential as fixture
import scheduler_microcheck as model
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
receipt=ROOT/'work/pump-shared-day-recovery/checked-schedule-cases.json.gz';data=json.loads(gzip.decompress(receipt.read_bytes()));model_record=json.loads((ROOT/'work/pump-shared-day-recovery/scheduler-microcheck.json').read_text())
original=ROOT/'evidence/original/pump/deployed.so';candidate=ROOT/'work/pump-shared-day-recovery/checked/unstripped.so';ob,cb=original.read_bytes(),candidate.read_bytes()
def state(a):
 b=bytes.fromhex(a['data']);assert len(b)>=544
 start,end,day=struct.unpack_from('<qqq',b,8)
 return {'start':start,'end':end,'day':day,'mint':b[32:64].hex(),'supplies':list(struct.unpack_from('<30Q',b,64)),'volumes':list(struct.unpack_from('<30Q',b,304))}
rows=[]
for row in data['cases']:
 if row['original']['error'] is not None:continue
 case=row['case'];before=state(row['original']['before'][str(fixture.G)]);after=state(row['original']['after'][str(fixture.G)])
 inputs={'now':case.get('now',10),'old_start':before['start'],'old_end':before['end'],'old_day':before['day'],'old_mint_bytes':list(bytes.fromhex(before['mint'])),'start':case.get('start',20),'end':case.get('end',49),'day':case.get('day',1),'index':case.get('index',0),'supply':case.get('supply',1000),'mint_bytes':list(bytes(fixture.Pubkey.from_string(case.get('mint',str(fixture.MINT))))),'supplies':before['supplies'],'volumes':before['volumes']}
 outputs=[]
 for image,start,size,key in [(ob,model_record['original_start'],model_record['original_bytes'],'original_call_names'),(cb,model_record['candidate_start'],model_record['candidate_bytes'],'candidate_call_names')]:
  names={int(k):v for k,v in model_record[key].items()};result=model.run(image,start,size,names,inputs);assert result['outcome']=={'kind':'ok'};assert result['global']==after,(case['name'],result['global'],after);outputs.append(result)
 rows.append({'case':case['name'],'input':inputs,'vm_before':before,'vm_after':after,'model_original':outputs[0],'model_candidate':outputs[1]})
record={'scope':__doc__,'global_key':str(fixture.G),'script_sha256':sha(Path(__file__)),'receipt_sha256':sha(receipt),'model_sha256':sha(Path(model.__file__)),'original_sha256':sha(original),'candidate_sha256':sha(candidate),'case_count':len(rows),'cases':rows}
(ROOT/'work/pump-shared-day-recovery/model-vm-calibration.json').write_text(json.dumps(record,indent=2)+'\n');print('Calibrated',len(rows),'successful signed VM cases against both instruction models')
