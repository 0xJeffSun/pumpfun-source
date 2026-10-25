#!/usr/bin/env python3
from pathlib import Path
import difflib,hashlib,json,tarfile,tomllib
import analyze
W=Path(__file__).resolve().parent
H=lambda b:hashlib.sha256(b).hexdigest()
J=lambda p:json.loads(p.read_text())
def contents(p):
 with tarfile.open(p)as t:return{m.name.removeprefix('./'):t.extractfile(m).read()for m in t if m.isfile()}
def main():
 raw=(W/'manifest-sha256.json').read_bytes();assert H(raw)==(W/'MANIFEST.sha256').read_text().split()[0];m=json.loads(raw)
 fs={str(p.relative_to(W)):p for p in W.rglob('*')if p.is_file()and str(p.relative_to(W))not in['manifest-sha256.json','MANIFEST.sha256']};assert set(fs)==set(m)
 for n,p in fs.items():assert H(p.read_bytes())==m[n]['sha256'] and p.stat().st_size==m[n]['bytes'],n
 for r in J(W/'input-origins.json'):assert H((W/r['path']).read_bytes())==r['sha256'],r['path']
 proposal=J(W/'proposal.json');base=J(W/'inputs/base/source-sha256.json');files=contents(W/'inputs/base/source-snapshot.tar.gz');assert{n:H(b)for n,b in files.items()}==base and len(base)==26
 pkg=J(W/'inputs/base/manifest-sha256.json');assert H((W/'inputs/base/manifest-sha256.json').read_bytes())==proposal['baseline_package_manifest_sha256']
 for n in ['source-sha256.json','source-snapshot.tar.gz','build-comparison.json','tool-phase-provenance.json']:assert H((W/'inputs/base'/n).read_bytes())==pkg[n]
 assert H((W/'inputs/candidate.so').read_bytes())==pkg['pump_fees_candidate.so']==proposal['baseline_candidate_sha256'];assert H((W/'inputs/symbols.so').read_bytes())==pkg['symbols.so']
 prior=J(W/'inputs/prior/manifest.json');assert H((W/'inputs/prior/manifest.json').read_bytes())==proposal['prior_manifest_sha256']==(W/'inputs/prior/MANIFEST.sha256').read_text().split()[0]
 for n in ['REPORT.md','sharing-pairs.json','predicate-evidence.json','pending-sharing.patch']:
  v=prior[n];assert H((W/'inputs/prior'/n).read_bytes())==(v if isinstance(v,str)else v['sha256'])
 path='programs/pump-fees/src/sharing_update.rs';assert(W/'inputs/base/sharing_update.rs').read_bytes()==files[path]
 parallel=J(W/'inputs/parallel/source-sha256.json');assert len(parallel)==26 and set(parallel)==set(base)
 changed={n for n in base if base[n]!=parallel[n]};assert changed=={path,'programs/pump-fees/src/donation.rs'}
 for n in changed:assert H((W/'inputs/parallel'/n).read_bytes())==parallel[n]
 helper="""fn legacy_curve_quote_is_zero(info: &AccountInfo<'_>) -> Result<bool> {
  if info.data_len() < 115 { return Ok(true); }
  let data = info.data.borrow();
  Ok(Pubkey::new_from_array(data[83..115].try_into().unwrap()) == Pubkey::default())
}

"""
 guard='  let quote_is_zero = legacy_curve_quote_is_zero(&ctx.accounts.bonding_curve.to_account_info())?;\n  require!(quote_is_zero,FeeError::UnsupportedQuoteMint);\n'
 for label,old,source in [('base5cf8',files[path].decode(),base),('after_parallel',(W/'inputs/parallel'/path).read_text(),parallel)]:
  q=W/'proposal'/label;new=(q/'sharing_update.rs').read_text();needle="pub fn update_fee_shares<'info>(ctx:Context<'_, '_, '_, 'info,UpdateFeeShares<'info>>,shareholders:Vec<Shareholder>)->Result<()> {\n"
  expected=old.replace(needle,needle+guard).replace('fn authorize(state:',helper+'fn authorize(state:');assert new==expected
  patch=''.join(difflib.unified_diff(old.splitlines(True),new.splitlines(True),fromfile='a/'+path,tofile='b/'+path));assert(q/'source.patch').read_text()==patch
  wanted=dict(source);wanted[path]=H(new.encode());assert J(q/'source-sha256.json')==wanted;assert proposal['proposals'][label]['new_sha256']==wanted[path]
 lock=tomllib.loads(files['Cargo.lock'].decode());framework=J(W/'framework.json')
 for name,info in framework.items():
  pkg=next(x for x in lock['package']if x['name']==name);assert(pkg['version'],pkg['checksum'])==(info['version'],info['crate_sha256']);stem=name+'-'+info['version'];arc=W/'inputs/framework'/(stem+'.crate');assert H(arc.read_bytes())==pkg['checksum'];members=contents(arc)
  for n,h in info['selected_source_sha256'].items():assert H((W/'inputs/framework'/stem/n).read_bytes())==h and members[stem+'/'+n]==(W/'inputs/framework'/stem/n).read_bytes()
 assert J(W/'static-evidence.json')==json.loads(json.dumps(analyze.run()))
 print(json.dumps({'status':'PASS','payloads':len(m),'source_inputs_per_version':26,'changed_paths_per_proposal':1,'helper_bytes':504,'framework_crates':3,'builds':0,'target_executions':0},sort_keys=True))
if __name__=='__main__':main()
