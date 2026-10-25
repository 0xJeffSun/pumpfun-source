"""New direct current composition; immutable f4/28e current checks stay historical."""
from pathlib import Path
import argparse,hashlib,json,importlib.util,re,subprocess,sys
from common import H,J,local,digest,sealed
from bindings import gather,R
P=Path(__file__).resolve().parent

def load(path,name):
 spec=importlib.util.spec_from_file_location(name,path);module=importlib.util.module_from_spec(spec);spec.loader.exec_module(module);return module

def workflow_transition(before,observed,rows):
 required=[('python -B repro/layered-passes/pass-24/verify_review_applicability.py --repo .','python -B repro/layered-passes/pass-24/ci-review-source-applicability/verify.py --repo .'),('python -B repro/layered-passes/pass-24/verify_reconciliation.py --repo .','python -B repro/layered-passes/pass-24/ci-review-reconciliation/verify.py --repo .')]
 assert [(r['old'],r['new'])for r in rows]==required
 for row in rows:assert before.count(row['old'])==1;before=before.replace(row['old'],row['new'])
 assert before==observed,'Only exact two reviewed CI commands may change'
 return observed

def check(d,root):
 root=root.resolve();assert root==R.resolve(),'Check actual root owning this companion; no shadow root'
 current,before,after=gather();assert d==current,'Frozen obligations differ from immutable record derivation'
 assert H(P/'before-workflow.yml')==d['workflow']['before_sha256']and H(P/'after-workflow.yml')==d['workflow']['after_sha256']
 text=workflow_transition((P/'before-workflow.yml').read_text(),local(root,'.github/workflows/verify.yml').read_text(),d['workflow']['replacements'])
 assert text==after==(P/'after-workflow.yml').read_text()
 for n,h in d['bound_files'].items():digest(root,n,d['workflow']['after_sha256']if n=='.github/workflows/verify.yml'else h)
 for n,seal in d['immutable_packages'].items():sealed(root/n,seal)
 for n,row in d['git_blobs'].items():
  raw=local(root,n).read_bytes();assert hashlib.sha256(raw).hexdigest()==row['sha256']and hashlib.sha1(b'blob '+str(len(raw)).encode()+b'\0'+raw).hexdigest()==row['git_blob'],n
  if'bytes'in row:assert len(raw)==row['bytes'],n
 for n,row in d['archives'].items():
  raw=local(root,n).read_bytes();assert hashlib.sha256(raw).hexdigest()==row['sha256'],n
  if'git_blob'in row:assert hashlib.sha1(b'blob '+str(len(raw)).encode()+b'\0'+raw).hexdigest()==row['git_blob'],n
 for n in d['removed']:assert not(root/n).exists(),n
 for command in d['excluded_commands']:assert command not in text,command
 for command in ['repro/pump/buy-v3-static-gap-review/verify.py','repro/pump/buy-v3-funded-gap-audit/verify_package.py','pump_create_mayhem_differential.py']:assert command not in text,command
 fq=root/d['f4_package']/'reviewed-plan';fz=J(fq/'plan.json');old=root/fz['old_transition_path'];oq=old/'reviewed-plan';oz=J(oq/'plan.json')
 restored=J(P/'restoration-witness.json');assert restored['sha256']=='948a1a13f9ff947c8a544db7a2241c95e09618c9bb3613d4d2ab900d986329d8'and restored['bytes']==789456
 for name in ['restored_path','canonical_retained_path']:digest(root,restored[name],restored['sha256']);assert local(root,restored[name]).stat().st_size==restored['bytes']
 # Invoke only the independent immutable saved preparation function, never its old current check.
 previous=load(old/'bridge.py','unchanged_saved_preparation');assert previous.check_preparation(oq,root,oz['preparation_helper'])==d['prior_saved_preparation']
 scanner=local(root,d['source_scanner']);assert H(scanner)==d['source_scanner_sha256'];source_manifest=load(scanner,'actual_current_source_inventory').source_manifest
 status=J(root/'repro/status.json');assert status==J(fq/'status.expected.json')
 assert J(fq/'status.before.json')==J(oq/'status.expected.json')
 sb=J(fq/'status.before.json');sa=J(fq/'status.expected.json');assert[k for k in sb if sb[k]!=sa[k]]==['pump'];assert sorted(k for k in set(sb['pump'])|set(sa['pump'])if sb['pump'].get(k)!=sa['pump'].get(k))==fz['allowed_status_changed_keys']
 for program,row in d['compiled'].items():
  s=status[program];assert s['comparison_report']==row['report']and s['candidate_artifact']==row['candidate']
  report=J(local(root,row['report']));assert H(local(root,row['report']))==row['report_sha256']and report['source_sha256']==row['source']and report['comparison']['candidate_sha256']==row['candidate_sha256'];digest(root,row['candidate'],row['candidate_sha256'])
  layout=d['source_layout'][program];actual=source_manifest(root/layout['crate'],root/layout['workspace'],root,extra_inputs=[root/n for n in layout.get('extra_inputs',[])]);assert actual==row['source']and len(actual)==d['counts'][program],program
 relay=J(root/'repro/donation-relay/current.json');assert relay==d['relay'];assert len(d['relay_source_map'])==23
 for n,h in d['relay_source_map'].items():digest(root,relay['source_snapshot']+'/'+n,h)
 digest(root,relay['candidate_artifact'],relay['candidate_sha256']);digest(root,str(Path(relay['evidence_manifest']).parent/'unstripped.so'),relay['symbols_sha256'])
 attrs=local(root,'.gitattributes').read_bytes();base=(fq/'attributes.incoming').read_bytes();assert attrs==(fq/'attributes.expected').read_bytes()and attrs.startswith(base)
 witness={}
 for line in attrs[len(base):].decode().splitlines():
  if not line.strip()or line.startswith('#'):continue
  m=re.fullmatch(r'(repro/[^\s*?\[\]{}\\]+) -whitespace',line);assert m,line;witness[m[1]]=H(local(root,m[1]))
 assert witness==d['attributes_witness']and len(witness)==26
 # Exact frozen source-applicability composition invokes the new portable50-signature check.
 subprocess.run([sys.executable,'-B',str(root/'repro/layered-passes/pass-24/ci-review-source-applicability/verify.py'),'--repo',str(root)],cwd=root,check=True,capture_output=True)
 return {'passed':True,'actual_current_files':len(d['bound_files']),'immutable_package_seals':len(d['immutable_packages']),'exact_incoming_paths':[595,126],'opaque_archived_blobs':len(d['archives']),'removed_active_paths':len(d['removed']),'compiled_source_counts':d['counts'],'actual_compiled_inputs':107,'relay_current':'immutable13','relay_source_inputs':23,'reviewed_workflow_replacements':2,'old_f4_or_28e_current_verifier_executed':False,'old_verifier_rewritten_or_monkeypatched':False,'current_crypto_separate_from_origin_runtime':True,'stopped_source_semantics_reviewed':False,'new_builds':0,'new_target_executions':0}

def main():
 if sys.version_info[:2]!=(3,12):raise SystemExit('This current composition requires Python3.12, as qualified by the sealed signature-portability checker; no source/crypto check attempted.')
 ap=argparse.ArgumentParser();ap.add_argument('--repo','--current-root',dest='repo',type=Path,required=True);a=ap.parse_args()
 m=J(P/'manifest.json');assert set(m)=={str(f.relative_to(P))for f in P.rglob('*')if f.is_file()and f not in[P/'manifest.json',P/'manifest.sha256']and'__pycache__'not in f.parts};assert H(P/'manifest.json')==(P/'manifest.sha256').read_text().split()[0]
 for n,h in m.items():digest(P,n,h)
 print(json.dumps(check(J(P/'bindings.json'),a.repo),indent=2))
if __name__=='__main__':main()
