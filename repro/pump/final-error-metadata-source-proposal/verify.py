#!/usr/bin/env python3
"""Static metadata/source verification only; no target build or execution."""
from pathlib import Path, PurePosixPath
import argparse,difflib,hashlib,json,stat,sys,tarfile,tomllib
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent
H=lambda b:hashlib.sha256(b).hexdigest()

def safe(n):
 p=PurePosixPath(n)
 assert n and not p.is_absolute() and str(p)==n and '..' not in p.parts
 assert '__pycache__' not in p.parts and p.suffix not in ('.pyc','.pyo') and not p.name.endswith('-keypair.json')

def verify(repo):
 actual={}
 for f in P.rglob('*'):
  n=f.relative_to(P).as_posix();safe(n);mode=f.lstat().st_mode
  assert stat.S_ISDIR(mode)or stat.S_ISREG(mode),n
  if stat.S_ISREG(mode):actual[n]=f
 b=(P/'manifest.json').read_bytes();assert H(b)==(P/'manifest.sha256').read_text().strip(),'seal'
 m=json.loads(b)['files'];assert set(actual)==set(m)|{'manifest.json','manifest.sha256'},'payload set'
 for n,v in m.items():
  safe(n);b=actual[n].read_bytes();assert {'sha256':H(b),'bytes':len(b)}==v,n
 smap=json.loads((P/'inputs/source-sha256.json').read_text());assert len(smap)==37
 for n,h in smap.items():
  safe(n);assert H((P/'inputs/source'/n).read_bytes())==h,n
  if repo:assert H((repo/n).read_bytes())==h,('current source changed',n)
 for n,v in json.loads((P/'input-origins.json').read_text()).items():
  b=(P/n).read_bytes();assert H(b)==v['sha256']and len(b)==v['bytes'],n
 lock=tomllib.loads((P/'inputs/source/programs/pump/Cargo.lock').read_text());pkgs={(p['name'],p['version']):p for p in lock['package']}
 deps=json.loads((P/'locked-dependencies.json').read_text());assert len(deps)==3
 for d in deps:
  a=P/d['archive'];assert H(a.read_bytes())==d['sha256']==pkgs[d['name'],d['version']]['checksum']
  with tarfile.open(a)as t:
   for n,v in d['files'].items():
    b=t.extractfile(v['member']).read();assert b==(P/n).read_bytes()and H(b)==v['sha256']
 from analyze import run
 evidence=run();assert evidence==json.loads((P/'static-evidence.json').read_text()),'static evidence'
 assert evidence['identities']['candidate']=={'sha256':'731003570927c206353555d9743d70229234e7e3fa167a5915fa146f3007fc93','bytes':1579424}
 mapping=json.loads((P/'proposal-source-map.json').read_text());assert len(mapping)==4
 patch=[];seen=[];token='PumpError::ReconstructionBranchUnsupported';replacement='crate::ReconstructionError::ReconstructionBranchUnsupported'
 for n,v in mapping.items():
  before=(P/'inputs/source'/n).read_text();after=(P/'proposal'/n).read_text()
  assert H(before.encode())==v['before_sha256']and H(after.encode())==v['after_sha256'],n
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
   assert before.count(old)==1 and after==before.replace(old,new),'lib exact change'
   assert evidence['last_display_selection']['original'][-1]['text']in after
  else:
   assert after==before.replace(token,replacement),'fence-only substitution'
   for line,text in enumerate(before.splitlines(),1):
    if token in text:seen.append({'path':n,'line':line,'occurrences':text.count(token),'scope':'exact error-expression replacement only; surrounding mode/extension semantics not analyzed'})
  patch.extend(difflib.unified_diff(before.splitlines(keepends=True),after.splitlines(keepends=True),fromfile='a/'+n,tofile='b/'+n))
 assert ''.join(patch)==(P/'metadata-separation.patch').read_text(),'patch bytes'
 sites=json.loads((P/'surrogate-sites.json').read_text());assert sites['sites']==seen and sites['total']==sum(v['occurrences']for v in seen)==11
 assert sites['unchanged_contract']=={'name':'ReconstructionBranchUnsupported','message':'Reconstruction branch is not implemented','ordinal':110,'code':6110}
 # Complete source binding scanned only for the exact surrogate token, not body semantics.
 allsites=0
 for n in smap:
  if n.endswith('.rs'):allsites+=(P/'inputs/source'/n).read_text().count(token)
 assert allsites==11,'omitted surrogate reference'
 result=json.loads((P/'result.json').read_text());assert result['builds']==result['target_executions']==result['runtime_cases']==0
 assert result['main_source_changed']is False and result['whole_binary_equal']is False
 print(json.dumps({'status':'PASS','payload_files':len(m),'source_inputs':37,'locked_archives':3,'proposal_files':4,'preserved_surrogate_sites':11,'original_debug_names_bound_to_idl':110,'binary_extra_error_code':6110,'official_idl_last':6109,'original_literal_use_sites':2,'current_source_checked':bool(repo),'new_builds':0,'new_transactions':0,'excluded_semantics_analyzed':False,'proposal_runtime_accepted':False},sort_keys=True))

if __name__=='__main__':
 ap=argparse.ArgumentParser();ap.add_argument('--repo',type=Path);args=ap.parse_args();verify(args.repo.resolve()if args.repo else None)
