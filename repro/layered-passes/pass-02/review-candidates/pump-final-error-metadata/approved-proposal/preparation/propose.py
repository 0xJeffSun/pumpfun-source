from pathlib import Path
import difflib,hashlib,json
W=Path(__file__).resolve().parent;P=W/'publication';src=P/'inputs/source';out=P/'proposal';out.mkdir()
paths=['programs/pump/src/lib.rs','programs/pump/src/create_v2.rs','programs/pump/src/trade.rs','programs/pump/src/multi_hop_curve.rs']
patch=[];mapping={};uses=[]
for n in paths:
 before=(src/n).read_text();after=before
 if n.endswith('/lib.rs'):
  old='''    #[msg("Reconstruction branch is not implemented") ]
    ReconstructionBranchUnsupported,
}'''
  new='''    // Binary evidence extends the captured official IDL, which stops at 6109.
    #[msg("quote_mint must be writable for a quote with a Token-2022 transfer fee: its withheld fees are harvested to the mint")]
    QuoteMintNotWritable = 110,
}

// Local reconstruction limits keep their existing code/name/message separate
// from the captured program's error metadata. This is not an original enum.
#[error_code]
pub enum ReconstructionError {
    #[msg("Reconstruction branch is not implemented")]
    ReconstructionBranchUnsupported = 110,
}'''
  assert before.count(old)==1;after=before.replace(old,new)
 else:
  old='PumpError::ReconstructionBranchUnsupported';new='crate::ReconstructionError::ReconstructionBranchUnsupported'
  for i,line in enumerate(before.splitlines(),1):
   if old in line:uses.append({'path':n,'line':i,'occurrences':line.count(old),'scope':'exact error-expression replacement only; surrounding mode/extension semantics not analyzed'})
  assert old in before;after=before.replace(old,new)
 d=out/n;d.parent.mkdir(parents=True,exist_ok=True);d.write_text(after)
 mapping[n]={'before_sha256':hashlib.sha256(before.encode()).hexdigest(),'after_sha256':hashlib.sha256(after.encode()).hexdigest()}
 patch.extend(difflib.unified_diff(before.splitlines(keepends=True),after.splitlines(keepends=True),fromfile='a/'+n,tofile='b/'+n))
(P/'metadata-separation.patch').write_text(''.join(patch))
(P/'proposal-source-map.json').write_text(json.dumps(mapping,indent=2)+'\n')
(P/'surrogate-sites.json').write_text(json.dumps({'sites':uses,'total':sum(u['occurrences']for u in uses),'unchanged_contract':{'name':'ReconstructionBranchUnsupported','message':'Reconstruction branch is not implemented','ordinal':110,'code':6110},'authentic_contract':{'name':'QuoteMintNotWritable','ordinal':110,'code':6110},'local_migrate_error':'Unchanged opaque accepted migration implementation and its dedicated enum. No additional check or caller is introduced.'},indent=2)+'\n')
print('exact error-site replacements',len(uses))
