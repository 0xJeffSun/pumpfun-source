from pathlib import Path
import sys,json,importlib.util,tempfile
from unittest.mock import patch
R=Path(__file__).resolve().parents[2];sys.path.insert(0,str(R/'scripts'))
s=importlib.util.spec_from_file_location('prep',R/'scripts/prepare_fees_withdraw_runtime.py');m=importlib.util.module_from_spec(s);s.loader.exec_module(m)
rows=[]
with tempfile.TemporaryDirectory() as t:
 out=Path(t)/'prepared';result=m.prepare(out);w=json.loads((out/'source-binding-witness.json').read_text());assert len(w['new_source_sha256'])==26;assert w['old_source_sha256']!=w['new_source_sha256'];assert (out/'historical-corrected-source-sha256.json').read_bytes();rows.append({'case':'actual-current-positive','pass':True,'result':result})
 # Saved-only unit mutations of hash observations, canonical files unchanged.
 for label,tail in [('manifest','manifest.json'),('source','source/programs/pump-fees/src/sharing.rs')]:
  original=m.sha
  def altered(p):
   if str(p).endswith('sharing-authorize-main-v144/'+tail):return '0'*64
   return original(p)
  try:
   with patch.object(m,'sha',altered),patch('verify_current_checkpoint.verify',return_value=w['current']['bridge']):m.current_binding()
  except AssertionError:rows.append({'case':label+'-rejected','pass':True})
  else:raise AssertionError(label)
 with patch.dict(m.CURRENT_CHECKPOINTS,{},clear=True):
  try:m.current_binding()
  except AssertionError:rows.append({'case':'unknown-checkpoint-rejected','pass':True})
  else:raise AssertionError('unknown')
print(json.dumps({'cases':rows,'target_executions':0,'negative_method':'in-memory observations only; canonical packages never altered'},indent=2))
