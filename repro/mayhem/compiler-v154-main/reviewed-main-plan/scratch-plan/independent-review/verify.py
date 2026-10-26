"""Saved-only review verification; no compiler, VM, network or application decoding."""
from pathlib import Path
import argparse,json,hashlib,struct
H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();J=lambda p:json.loads(p.read_text())
def verify(P,R):
 D=Path(__file__).resolve().parent;assessment=J(D/'assessment.json');assert H(P/'manifest.json')==assessment['packet_manifest_sha256']
 m=J(P/'manifest.json')
 for n,h in m.items():assert H(P/n)==h,n
 frozen=J(P/'frozen-source.json');assert frozen==assessment['source14_exact']and len(frozen)==14
 baseline=J(R/'repro/mayhem/sell-result-error-main-twentyfour/main/build-attempt.json');assert frozen=={k.removeprefix('programs/mayhem/'):v for k,v in baseline['source_sha256'].items()}
 for n,h in frozen.items():assert H(P/'crate'/n)==h
 b=(P/'build-01/candidate.so').read_bytes();o=(R/'evidence/original/mayhem/deployed.so').read_bytes()
 def ptr(raw,at):
  assert raw[at]==0x18
  return struct.unpack_from('<I',raw,at+4)[0]|struct.unpack_from('<I',raw,at+12)[0]<<32
 u=J(P/'unicode-data-proof.json');count=0
 for ref in u['full_six_arrays']:
  offset=ref['helper_instruction_offset'];assert ptr(b,u['candidate_start']+offset)==ref['candidate_file_offset'];assert ptr(o,u['original_start']+offset)==ref['original_file_offset'];count+=1
 dec=J(P/'decimal-and-multiply-proof.json')
 for leaf in dec['leaf_decimal_helpers']:
  for ref in leaf['references']:
   offset=ref['helper_instruction_offset'];assert ptr(b,leaf['candidate_start']+offset)==ref['candidate_table_offset'];assert ptr(o,leaf['original_start']+offset)==ref['original_table_offset'];count+=1
 assert count==14
 assert J(D/'verify-exit.json')['returncode']==0
 return {'passed':True,'full_array_pointer_references_redecoded':count,'source_inputs':14,'new_builds':0,'new_target_executions':0,'historical_unique':False}
if __name__=='__main__':
 p=argparse.ArgumentParser();p.add_argument('--packet',type=Path,required=True);p.add_argument('--accepted-root',type=Path,required=True);a=p.parse_args();print(json.dumps(verify(a.packet,a.accepted_root),indent=2))
