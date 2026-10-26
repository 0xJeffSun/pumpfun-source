"""UNRUN exact P25 digest+one, admitted numeric ranges only; no byte-value output."""
from pathlib import Path
import hashlib
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
