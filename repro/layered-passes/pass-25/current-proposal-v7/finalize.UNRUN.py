"""Read-only final-state capture/new-work-package builder. Never active writes/build/VM/Git."""
from pathlib import Path
import argparse,json,hashlib,shutil,importlib.util,re,sys
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent;H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();J=lambda p:json.loads(p.read_text())
PEER='repro/layered-passes/pass-24/ci-review-reconciliation-v4';DD='d17224a7c07d7bd1bc10575d0daf495dd16ab5f20509298dedf3b49c20334fc4'
FIXED={'repro/layered-passes/pass-25/pump-current-evidence':'e299855a87efe5770e3a22033c37bb969557854ea289fd8d231726c7bad15037','repro/pump/remaining-guards-main-fortyeight':'8ddf73d78e98005c8f68d189ada95add9690770bbd95c17ba42b25c6b0b95749','repro/pump/remaining-guards-fortyeight':'38558828d8187996e6f9f06db2b4054af7e65e29345a85f4417f71558312beba','repro/mayhem/compiler-v154-main':'f5d514664d47a04cc22282fdd19ca9e01d835c8a335aa9acc3f637fc61650acc','repro/donation-relay/source-build-15-owned-arithmetic':'7dd4661a57c13430b7186fcc21ec7e1649fe9a17350faf95b52b1d9661ec8ce3','repro/donation-relay/source-build-15-selection-v3':'010aea888bd359eaf46a6a512fd85477893cf9115213858b7ca6639fea42c8b0','repro/layered-passes/pass-25/pump-source-continuation':'c8da63520c4ee261beabc22ca7cf7b62f1ca80dac8c508a386a26435428f5047'}
def js(p,d):p.write_text(json.dumps(d,indent=2,sort_keys=True)+'\n')
def copy(src,dst):dst.parent.mkdir(parents=True,exist_ok=True);shutil.copyfile(src,dst)
def manifest(D):
 m={str(p.relative_to(D)):{'sha256':H(p),'bytes':p.stat().st_size}for p in sorted(D.rglob('*'))if p.is_file()and str(p.relative_to(D))not in('manifest.json','manifest.sha256')};js(D/'manifest.json',m);h=H(D/'manifest.json');(D/'manifest.sha256').write_text(h+'  manifest.json\n');return h
def module(p,n):
 s=importlib.util.spec_from_file_location(n,p);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m
def build(a):
 R=a.repo.resolve();api=module(P/'current-reconciliation.proposed.py','p25_proposed_readonly_api');api.sealed(P,a.expected_plan_seal);api.check_latest14(R,a.latest14_seal);api.check_upstream2508(R,a.upstream2508_seal);api.sealed(R/PEER,DD);B=J(R/PEER/'bindings.json');assert H(R/PEER/'bindings.json')==H(P/'peer-d172/bindings.json');old=dict(B['bound_files']);old['.github/workflows/verify.yml']=H(P/'workflow.before.yml')
 # The actual merged manual-only workflow must already be present and exact.
 assert(R/'.github/workflows/measure-relay-linux-v148.yml').read_bytes()==(P/'manual-linux148.expected.yml').read_bytes();assert(R/'.github/workflows/measure-relay13-linux-v148.yml').read_bytes()==(P/'manual-relay13-linux148.expected.yml').read_bytes()
 # Source107 must already be restored before even a draft capture writes a receipt.
 assert H(R/B['source_scanner'])==B['source_scanner_sha256'];early_scanner=module(R/B['source_scanner'],'pre_capture_actual_scanner').source_manifest;tested=J(P/'tested107.8951.json')['source_maps']
 for role,l in B['source_layout'].items():
  actual=early_scanner(R/l['crate'],R/l['workspace'],R,extra_inputs=[R/n for n in l.get('extra_inputs',[])]);assert actual==tested[role]and len(actual)==B['counts'][role],('UNRESTORED_SOURCE_BEFORE_CAPTURE',role,len(actual))
 replacements={n:{'before':h,'after':H(api.path(R,n))}for n,h in old.items()if H(api.path(R,n))!=h}
 if a.draft_deltas:
  assert not a.draft_deltas.exists();js(a.draft_deltas,replacements);return {'draft':str(a.draft_deltas),'sha256':H(a.draft_deltas),'changed_paths':list(replacements),'active_writes':0,'finalization_permitted':False}
 assert a.reviewed_deltas and a.reviewed_deltas_sha256 and H(a.reviewed_deltas)==a.reviewed_deltas_sha256;assert J(a.reviewed_deltas)==replacements,'Every before/after delta requires exact reviewed receipt'
 assert a.output and not a.output.exists();assert not a.output.resolve().is_relative_to(R/'programs')and not a.output.resolve().is_relative_to(R/'repro'),'write NEW work output only'
 # Only the known accepted prospective current contract is eligible.
 S=J(R/'repro/status.json');assert S['pump']==J(P/'pump-bridge21bc/pump-status.proposed.json');assert S['mayhem']==J(R/'repro/mayhem/compiler-v154-main/current-contract.json')['mayhem_status']
 oldS=J(R/B['f4_package']/'reviewed-plan/status.expected.json');assert {k:v for k,v in S.items()if k not in('pump','mayhem')}=={k:v for k,v in oldS.items()if k not in('pump','mayhem')}
 for n,h in FIXED.items():api.sealed(R/n,h)
 for name in['verify_current_checkpoint.py','verify_current_bindings.py','verify_recovered_builds.py','verify_pump_remaining_checkpoint.py']:assert(R/'scripts'/name).read_bytes()==(P/'pump-bridge21bc'/name).read_bytes()
 assert(R/'repro/donation-relay/current.json').read_bytes()==(P/'relay15-known-selection/current.proposed.json').read_bytes();assert(R/'programs/donation-relay/source-selected.json').read_bytes()==(P/'relay15-known-selection/source-selected.proposed.json').read_bytes();assert(R/'programs/donation-relay/README.md').read_bytes()==(P/'relay15-known-selection/canonical-README.proposed.md').read_bytes();assert(R/'repro/donation-relay/README.md').read_bytes()==(P/'relay15-known-selection/README.proposed.md').read_bytes()
 assert(R/'.github/workflows/verify.yml').read_bytes()==(P/'workflow.proposed.yml').read_bytes(),'Root applies exact workflow only after review; builder never applies'
 digest=B['source_scanner_sha256'];assert H(R/B['source_scanner'])==digest;scanner=module(R/B['source_scanner'],'actual_final_inventory').source_manifest;compiled={}
 for role,l in B['source_layout'].items():
  s=S[role];report=J(R/s['comparison_report']);source=report['source_sha256'];actual=scanner(R/l['crate'],R/l['workspace'],R,extra_inputs=[R/n for n in l.get('extra_inputs',[])]);assert actual==source and len(source)==B['counts'][role];assert H(R/s['candidate_artifact'])==report['comparison']['candidate_sha256']==s['candidate_sha256'];compiled[role]={'report':s['comparison_report'],'report_sha256':H(R/s['comparison_report']),'source':source,'candidate':s['candidate_artifact'],'candidate_sha256':s['candidate_sha256']}
 for role in('pump_amm','pump_fees'):assert compiled[role]==B['compiled'][role]
 assert compiled['mayhem']['source']==B['compiled']['mayhem']['source'];changed=[n for n,h in B['compiled']['pump']['source'].items()if compiled['pump']['source'][n]!=h];assert changed==['programs/pump/src/admin_cto.rs']
 Q=R/'programs/donation-relay';m=J(P/'relay15-known-selection/source-map.json');assert scanner(Q,Q,R)=={'programs/donation-relay/'+n:h for n,h in m.items()}
 base=(P/'attributes.before').read_bytes();attrs=(R/'.gitattributes').read_bytes();assert attrs.startswith(base);witness={}
 for line in attrs[len(base):].decode().splitlines():
  if not line.strip()or line.startswith('#'):continue
  if line=='programs/donation-relay/src/dispatch.rs -whitespace':
   n='programs/donation-relay/src/dispatch.rs';h='e8f649f4468ea1f178af86739333bd28076fb42b756270c2e1f99f13826f42e7';assert m['src/dispatch.rs']==h and H(api.path(R,n))==h
  else:
   match=re.fullmatch(r'(repro/[^\s*?\[\]{}\\]+) -whitespace',line);assert match,line;n=match[1];h=H(api.path(R,n))
  assert n not in witness;witness[n]=h
 for r in J(P/'attributes.initial12.json')+J(P/'attributes.postmerge3.json'):assert witness.get(r['path'])==r['sha256']
 A=a.output/'current-applicability';C=a.output/'current-reconciliation';A.mkdir(parents=True);C.mkdir(parents=True)
 copy(P/'source-applicability.proposed.py',A/'verify_current.py');copy(P/'source-applicability.before.py',A/'before.py');copy(P/'source-applicability-transition.json',A/'transition.json');copy(P/'applicability-wrapper.proposed.py',A/'verify.py')
 continuation={'complete':True,'pump_chain':[{'package':'repro/layered-passes/pass-25/pump-source-continuation','seal':FIXED['repro/layered-passes/pass-25/pump-source-continuation'],'before':'retained/history-first-build/static-review/source-before.rs','after':'retained/history-first-build/static-review/source-after.rs'},{'package':'repro/layered-passes/pass-25/pump-source-continuation','seal':FIXED['repro/layered-passes/pass-25/pump-source-continuation'],'before':'retained/build/static-review/source-before.rs','after':'retained/build/static-review/source-after.rs'}],'relay':{'approved_selection_complete':True,'bridge':'repro/donation-relay/source-build-15-selection-v3','seal':FIXED['repro/donation-relay/source-build-15-selection-v3']}}
 js(A/'source-continuation.json',continuation);appseal=manifest(A)
 for n in['workflow.before.yml','workflow.proposed.yml','workflow-transition.json','manual-linux148.expected.yml','manual-relay13-linux148.expected.yml','attributes.before','attributes.initial12.json','attributes.postmerge3.json','source-selected.peer13.before.json']:copy(P/n,C/n)
 copy(P/'relay15-known-selection/source-selected.proposed.json',C/'source-selected.proposed.json');copy(P/'current-reconciliation.proposed.py',C/'verify.py');copy(P/'peer-origin.json',C/'peer-origin.json');copy(P/'peer2508-origin.json',C/'peer2508-origin.json');copy(P/'latest14.git-metadata.json',C/'latest14.git-metadata.json');copy(P/'tested107.8951.json',C/'tested107.8951.json')
 workflows=sorted(str(p.relative_to(R))for p in(R/'.github/workflows').rglob('*')if p.is_file());scripts=sorted(str(p.relative_to(R))for p in(R/'scripts').glob('*.py'));assets={n:H(R/n)for n in workflows+scripts+['programs/mayhem/README.md','programs/pump/README.md','programs/pump-fees/README.md','programs/pump-amm/README.md','.gitattributes']}
 F={'complete':True,'publication':'repro/layered-passes/pass-25/current-reconciliation','status':S,'reviewed_replacements':replacements,'reviewed_delta_receipt_sha256':H(a.reviewed_deltas),'latest14_seal':a.latest14_seal,'upstream2508_seal':a.upstream2508_seal,'immutable_packages':{**FIXED,'repro/upstream-reconciliation/main-2f14c36c':a.latest14_seal,'repro/layered-passes/pass-25/pinned2508-hash-inventory':a.upstream2508_seal,'repro/layered-passes/pass-25/current-applicability':appseal},'assets':assets,'compiled':compiled,'workflow_set':workflows,'script_set':scripts,'attributes_appended_witness':witness,'relay':{'current':J(R/'repro/donation-relay/current.json'),'bridge':'repro/donation-relay/source-build-15-selection-v3','seal':FIXED['repro/donation-relay/source-build-15-selection-v3'],'source23':m,'canonical_readme_sha256':H(Q/'README.md'),'source_selected_sha256':H(Q/'source-selected.json')}}
 js(C/'bindings.json',F);copy(a.reviewed_deltas,C/'reviewed-deltas.json');reconseal=manifest(C);js(a.output/'result.json',{'applicability_seal':appseal,'reconciliation_seal':reconseal,'active_writes':0,'current_verifiers_executed':False,'must_independently_verify_before_publication':True});return J(a.output/'result.json')
if __name__=='__main__':
 a=argparse.ArgumentParser();a.add_argument('--repo',required=True,type=Path);a.add_argument('--expected-plan-seal',required=True);a.add_argument('--latest14-seal',required=True);a.add_argument('--upstream2508-seal',required=True);a.add_argument('--draft-deltas',type=Path);a.add_argument('--reviewed-deltas',type=Path);a.add_argument('--reviewed-deltas-sha256');a.add_argument('--output',type=Path);x=a.parse_args();print(json.dumps(build(x),indent=2))
