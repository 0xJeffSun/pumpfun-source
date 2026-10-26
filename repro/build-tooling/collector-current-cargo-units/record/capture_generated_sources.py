"""Retain six already-observed generated compiler input files as opaque data; never import/execute them."""
from pathlib import Path
import hashlib,json
P=Path(__file__).resolve().parent;J=lambda p:json.loads(p.read_text());H=lambda b:hashlib.sha256(b).hexdigest()
def main():
 c=J(P/'capture.json');rows=[];gap=[]
 for raw,r in c['source_path_bindings'].items():
  if r['kind']!='generated-target-source':continue
  f=Path(c['target_root'])/r['relative'];assert f.is_file()and all(not x.is_symlink()for x in[f,*f.parents]);b=f.read_bytes();assert len(b)==r['bytes_observation']and H(b)==r['sha256_observation']
  item={'raw_path':raw,'relative_target_path':r['relative'],'sha256':H(b),'bytes':len(b),'role':'Generated current compiler input retained as data, not publisher-authored source','generator_identity_or_actual_argv_proved':False}
  if len(b)>50*1024*1024:item.update(retained_file=None,gap='Greater than50MiB; hash only');gap.append(item)
  else:
   dest=P/'generated-source'/r['relative'];assert not dest.exists();dest.parent.mkdir(parents=True,exist_ok=True);dest.write_bytes(b);assert dest.read_bytes()==b and H(f.read_bytes())==H(b);item['retained_file']=str(dest.relative_to(P));rows.append(item)
 assert len(rows)+len(gap)==6 and not(P/'generated-source-retention.json').exists()
 (P/'generated-source-retention.json').write_text(json.dumps({'status':'PASS_GENERATED_SOURCE_DATA_RETENTION','supersedes_only_raw_retention_field_of_capture':True,'capture_sha256':H((P/'capture.json').read_bytes()),'rows':rows,'oversized_hash_only':gap,'files_imported_or_executed':0,'target_or_compiler_rerun':0},indent=2)+'\n');print(json.dumps({'retained':len(rows),'bytes':sum(x['bytes']for x in rows),'hash_only_gaps':len(gap),'executions':0}))
if __name__=='__main__':main()
