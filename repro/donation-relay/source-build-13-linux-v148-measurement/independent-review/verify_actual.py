"""Portable saved actual13 review replay; no current pointer/compiler/VM/network."""
from pathlib import Path
import argparse,gzip,hashlib,importlib.util,json,sys
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent;H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();J=lambda p:json.loads(p.read_text())
def load(p,n):
 s=importlib.util.spec_from_file_location(n,p);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m

def verify(repo,packet):
 manifest=J(P/'MANIFEST.json');assert set(manifest)=={str(f.relative_to(P))for f in P.rglob('*')if f.is_file()and f!=P/'MANIFEST.json'}
 for n,h in manifest.items():assert not(P/n).is_symlink()and H(P/n)==h,n
 actual=J(P/'actual-review.json');assert H(P/'review-tool/MANIFEST.json')==actual['review_tool_seal']=='b4876acadae4865d02cb158398fd33fa85236dafc24bfff9985f68c1f16f0fa6';assert H(packet/'manifest.json')==actual['packet_manifest_sha256']
 fresh=load(P/'review-tool/review.py','frozen_actual13_reviewer').review(repo,packet);assert fresh==J(P/'review-tool-result.json');rows=fresh['all_original_window_transitions'];assert rows==J(P/'window-transitions.json')and len(rows)==492;changed=[r for r in rows if any(r['linux12_'+k]!=r['linux13_'+k]for k in['status','raw_match','normalized_match'])];assert len(changed)==actual['changed_status_raw_normalized_transition_rows']==0
 helper=P/'reused-direct-decode.py';assert H(helper)==actual['reused_cff_helper']['source_sha256'];direct=load(helper,'unchanged_cff_decode');method=repo/'repro/donation-relay/source-build-12-v148-measurement/match_helpers.py';assert H(method)==direct.METHOD;m=load(method,'actual13_elf');control=repo/'repro/donation-relay/source-build-12-linux-v148-measurement/download/extracted';elfs={'original':m.Elf(repo/'evidence/dependencies/donation_relay/deployed.so'),'linux12':m.Elf(control/'build-01/candidate.so'),'linux13':m.Elf(packet/'build-01/candidate.so')};descs={'original':[direct.descriptor(elfs['original'],36192)],'linux12':[direct.descriptor(elfs['linux12'],r['start'])for r in fresh['linux12_control_review']['static_recomputation']['scratch_rows']if r['full_instruction_relocation_equal']],'linux13':[direct.descriptor(elfs['linux13'],r['start'])for r in fresh['linux13_review']['static_recomputation']['scratch_rows']if r['full_instruction_relocation_equal']]};assert descs==J(P/'direct-descriptor-comparison.json')==actual['direct_descriptors'];scans={k:direct.scan(v)for k,v in elfs.items()};assert scans==json.loads(gzip.decompress((P/'direct-r10-scan.json.gz').read_bytes()))
 for side,scan in scans.items():assert {k:v for k,v in scan.items()if k!='accesses'}==actual['direct_r10_summary'][side]
 return dict(status='PASS',packet_manifest_sha256=actual['packet_manifest_sha256'],all492_transition_rows_recomputed=True,changed_status_raw_normalized_rows=len(changed),direct_descriptor_and_bounded_frame_scan_recomputed=True,current_pointer_used=False,new_builds=0,new_target_executions=0,whole_original_byte_identity=False)
if __name__=='__main__':
 p=argparse.ArgumentParser();p.add_argument('--repo',type=Path,required=True);p.add_argument('--packet',type=Path,required=True);a=p.parse_args();print(json.dumps(verify(a.repo.resolve(),a.packet.resolve()),indent=2))
