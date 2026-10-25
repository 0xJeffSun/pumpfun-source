"""Repeat saved review/direct decode only; no new measurement or target execution."""
from pathlib import Path
import argparse,gzip,hashlib,importlib.util,json,sys
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent;H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();J=lambda p:json.loads(p.read_text())
def load(p,n):
 s=importlib.util.spec_from_file_location(n,p);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m

def verify(repo,packet):
 manifest=J(P/'MANIFEST.json');assert set(manifest)=={str(f.relative_to(P))for f in P.rglob('*')if f.is_file()and f!=P/'MANIFEST.json'}
 for n,h in manifest.items():assert not(P/n).is_symlink()and H(P/n)==h,n
 result=J(P/'actual-review.json');tool=P/'review-tool';assert H(tool/'MANIFEST.json')==result['proposal_tool_manifest_sha256']=='90a5868093ac417158bb0fc89d6b92509d3b440e94fac46a7015382764d86b2a'
 for n,h in J(tool/'MANIFEST.json')['files'].items():assert H(tool/n)==h
 assert H(packet/'manifest.json')==result['packet_manifest_sha256'];fresh=load(tool/'review.py','immutable_linux_review').review(repo,packet);assert fresh==J(P/'review-tool-result.json')
 descriptor,scan=load(P/'direct_decode.py','direct_bytes_review').analyze(repo,packet);assert descriptor==J(P/'direct-descriptor-comparison.json')==result['direct_descriptor_comparison'];assert scan==json.loads(gzip.decompress((P/'direct-r10-scan.json.gz').read_bytes()));assert descriptor['semantic_descriptor_fields_equal']and not descriptor['equality']['prefix_hex']
 for side,rows in scan.items():assert not rows['direct_accesses_outside_nominal_minus4096_to_0']and {k:v for k,v in rows.items()if k!='accesses'}==result['direct_r10_scan_summary'][side]
 return dict(status='PASS',packet_manifest_sha256=result['packet_manifest_sha256'],direct_descriptor_fields_equal=True,raw_descriptor_prefix_equal=False,bounded_r10_scan_verified=True,new_builds=0,new_target_executions=0,whole_original_byte_identity=False)
if __name__=='__main__':
 p=argparse.ArgumentParser();p.add_argument('--repo',type=Path,required=True);p.add_argument('--packet',type=Path,required=True);args=p.parse_args();print(json.dumps(verify(args.repo.resolve(),args.packet.resolve()),indent=2))
