#!/usr/bin/env python3
"""Read all captured bytes; never edits an executable or constructs an allocation image."""
from pathlib import Path
import argparse,gzip,hashlib,json,subprocess

def digest(b):return hashlib.sha256(b).hexdigest()
def one(root,name,original,candidate,kind):
 a=(root/original).read_bytes();b=(root/candidate).read_bytes();n=min(len(a),len(b));runs=[];start=None;count=0
 for i in range(n):
  if a[i]!=b[i]:
   count+=1
   if start is None:start=i
  elif start is not None:runs.append([start,i]);start=None
 if start is not None:runs.append([start,n])
 return dict(name=name,kind=kind,original_path=original,candidate_path=candidate,original_sha256=digest(a),candidate_sha256=digest(b),original_bytes=len(a),candidate_bytes=len(b),whole_file_equal=a==b,common_extent_differing_bytes=count,excess_bytes=abs(len(a)-len(b)),total_differing_or_missing_positions=count+abs(len(a)-len(b)),first_difference=runs[0][0]if runs else n if len(a)!=len(b)else None,common_extent_mismatch_ranges=runs,excess_range=[n,max(len(a),len(b))]if len(a)!=len(b)else None)
def main():
 p=argparse.ArgumentParser();p.add_argument('--repo',type=Path,default=Path.cwd());p.add_argument('--output',type=Path,required=True);args=p.parse_args();root=args.repo.resolve();out=args.output;out.mkdir(parents=True,exist_ok=False)
 status=json.loads((root/'repro/status.json').read_text());rows=[]
 for name in ['pump','pump_amm','pump_fees','mayhem']:rows.append(one(root,name,'evidence/original/'+name+'/deployed.so',status[name]['candidate_artifact'],'accepted_core_candidate'))
 deps=[('spl_token','repro/pump/verified-spl-token/pinocchio_token_program.so','compiler_output'),('spl_token_2022','repro/pump/verified-token-2022/rebuilt.deployed.so','retained_allocation_image'),('associated_token','repro/pump/ata-candidate-build-2/rebuilt.deployed.so','retained_allocation_image'),('token_metadata','repro/parallel-work/2026-10-24/results/metaplex_utilize/evidence/inputs/build11/rebuilt.deployed.so','retained_allocation_image'),('donation_relay','repro/donation-relay/source-build-04-stack-clean/candidate.so','bounded_local_candidate_with_diagnostic_mismatch')]
 for name,candidate,kind in deps:rows.append(one(root,name,'evidence/dependencies/'+name+'/deployed.so',candidate,kind))
 extra=[]
 for name,candidate in [('spl_token_2022','repro/pump/verified-token-2022/spl_token_2022.so'),('token_metadata','repro/parallel-work/2026-10-24/results/metaplex_utilize/evidence/inputs/build11/token_metadata.so')]:extra.append(one(root,name,'evidence/dependencies/'+name+'/deployed.so',candidate,'raw_compiler_output'))
 full={'programs':rows,'raw_compiler_supplement':extra};raw=(json.dumps(full,separators=(',',':'))+'\n').encode();(out/'all-byte-ranges.json.gz').write_bytes(gzip.compress(raw,mtime=0))
 summary={key:[{k:v for k,v in r.items()if k!='common_extent_mismatch_ranges'}|{'common_extent_mismatch_range_count':len(r['common_extent_mismatch_ranges'])}for r in value]for key,value in full.items()}
 summary.update(scope='Exact read-only comparison of existing artifacts; allocation images and raw compiler outputs are separately identified. Every original byte is included. Positional mismatches are not semantic distance or a completion percentage.',baseline_git_commit=subprocess.check_output(['git','rev-parse','HEAD'],cwd=root,text=True).strip(),status_sha256=digest((root/'repro/status.json').read_bytes()),whole_core_equal=sum(r['whole_file_equal']for r in rows[:4]),whole_core_total=4,dependency_capture_equal=sum(r['whole_file_equal']for r in rows[4:]),dependency_total=5,ranges_sha256=digest((out/'all-byte-ranges.json.gz').read_bytes()))
 (out/'summary.json').write_text(json.dumps(summary,indent=2)+'\n');print(json.dumps({k:summary[k]for k in ['whole_core_equal','dependency_capture_equal','ranges_sha256']}))
if __name__=='__main__':main()
