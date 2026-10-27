"""Reproduce bounded ordinary source-name/metadata controls, without promoting them."""
from pathlib import Path
import difflib,gzip,hashlib,importlib.util,json,tempfile
HERE=Path(__file__).resolve().parent;ROOT=HERE.parents[2]
VARIANTS={
 'identity-module':('donation_relay_source_proposal','donation_relay',None),
 'identity-crate':('donation_relay','relay_anchor_idl_reconstruction_probe',None),
 'identity-both':('donation_relay','donation_relay',None),
 'identity-contracts':('contracts','donation_relay',None),
 'identity-package-relay':('donation_relay','donation_relay','donation-relay'),
 'identity-package-contracts':('contracts','donation_relay','contracts'),
}
def sha(raw):return hashlib.sha256(raw).hexdigest()
def module(name,path):
 s=importlib.util.spec_from_file_location(name,path);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m

def source_maps():
 parent=module('identity_source_parent',ROOT/'repro/donation-relay/donation-wrapper-source-proposal/verify.py');parent.manifest();base=parent.sources()['complete492'];out={}
 for label,(crate,program,package)in VARIANTS.items():
  source=dict(base);source['Cargo.toml']=source['Cargo.toml'].replace(b'name = "donation_relay_source_proposal"',('name = "'+crate+'"').encode());source['src/lib.rs']=source['src/lib.rs'].replace(b'pub mod relay_anchor_idl_reconstruction_probe {',('pub mod '+program+' {').encode())
  if package:
   for name in ['Cargo.toml','Cargo.lock']:
    old=b'name = "donation-relay-source-proposal"\nversion = "0.1.0"';assert source[name].count(old)==1;source[name]=source[name].replace(old,('name = "'+package+'"\nversion = "0.6.0"').encode())
  out[label]=source
 return base,out

def source_patch(before,after):
 return ''.join(''.join(difflib.unified_diff(before[n].decode().splitlines(True),after[n].decode().splitlines(True),fromfile='a/'+n,tofile='b/'+n))for n in sorted(before)if before[n]!=after[n])

def analyze():
 parser=module('identity_parser',ROOT/'repro/donation-relay/swap-receipt-coordinate-recovery/analyze.py');meta=json.loads((HERE/'controls.json').read_bytes());out={};cache={}
 with tempfile.TemporaryDirectory()as temp:
  d=Path(temp);(d/'original.so').write_bytes((ROOT/'evidence/dependencies/donation_relay/deployed.so').read_bytes());(d/'original-windows.json').write_bytes((ROOT/'repro/donation-relay/swap-receipt-coordinate-recovery/original-windows.json').read_bytes())
  for label in VARIANTS:
   desc=meta[label]['artifacts'];key=tuple(desc[k]['sha256']for k in ['candidate','symbols'])
   if key not in cache:
    for kind,name in [('candidate','candidate.so'),('symbols','unstripped.so')]:
     row=desc[kind];raw=gzip.decompress((ROOT/row['path']).read_bytes());assert len(raw)==row['bytes']and sha(raw)==row['sha256'];(d/name).write_bytes(raw)
    result=parser.analyze(d);cache[key]=dict(summary=result['comparison-summary.json'],raw_ordinals=[r['ordinal']for r in result['match-ledger.json']if r['raw_candidate_indices']],normalized_ordinals=[r['ordinal']for r in result['match-ledger.json']if r['normalized_candidate_indices']])
   out[label]=cache[key]
 return out

def verify():
 base,maps=source_maps();meta=json.loads((HERE/'controls.json').read_bytes())
 for label,source in maps.items():
  folder=HERE/'builds'/label;launch=json.loads((folder/'launch.json').read_bytes());result=json.loads((folder/'result.json').read_bytes());log=(folder/'build.log').read_bytes();crate=VARIANTS[label][0]
  assert len(source)==60 and launch['inputs']=={n:sha(b)for n,b in source.items()}
  assert (folder/'source.patch').read_text()==source_patch(base,source)
  assert launch['rustc_sha256']=='89fd4ccdd6e678a24c2cda074b498b46a352fcfce21018119c9526751afc678d'
  assert result['exit_code']==0 and result['source_unchanged']and result['root_invocations']==1 and log.count(('--crate-name '+crate+' ').encode())==1 and sha(log)==result['build_log_sha256']
  for kind in ['candidate','symbols']:assert result[kind+'_sha256']==meta[label]['artifacts'][kind]['sha256']
 actual=analyze();assert actual==json.loads((HERE/'control-results.json').read_bytes())
 for row in actual.values():assert row['summary']['original_normalized_match_windows']==492 and row['summary']['candidate_bytes']==818280 and not row['summary']['whole_file_equal']
 return actual
