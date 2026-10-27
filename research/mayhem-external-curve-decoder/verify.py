"""Authenticate the source delta and recompute saved static/runtime evidence offline."""
from pathlib import Path,PurePosixPath
import argparse,difflib,gzip,hashlib,importlib.util,json,re,subprocess,sys,tempfile,tomllib
P=Path(__file__).resolve().parent;R=P.parents[1]
LABELS=['curve-upstream','curve-external-resolved'];ORIGINAL='a87fa9f866272514e6acb852b668c4a08aeb173d56c883039991d114d1199bdb'
CHANGED=['Cargo.lock','Cargo.toml','pump-interface/Cargo.toml','pump-interface/src/lib.rs','src/instructions/sell.rs']
def sha(b):return hashlib.sha256(b).hexdigest()
def load(n):return json.loads((P/n).read_bytes())
def safe(n):
 p=PurePosixPath(n);assert str(p)==n and not p.is_absolute()and'..'not in p.parts and'\\'not in n and':'not in n;return p

def sources():
 before={}
 for n,v in load('parent.json')['files'].items():
  safe(n);safe(v['path']);b=(R/v['path']).read_bytes();assert sha(b)==v['encoded_sha256'];b=gzip.decompress(b)if v['path'].endswith('.gz')else b;assert sha(b)==v['decoded_sha256'];before[n]=b
 assert len(before)==54 and sum(n.startswith('vendor/')for n in before)==38
 assert sorted(p.relative_to(P/'override').as_posix()for p in(P/'override').rglob('*')if p.is_file())==CHANGED
 after=dict(before);after.update({n:(P/'override'/n).read_bytes()for n in CHANGED})
 n='src/instructions/sell.rs';old=before[n].decode();cut=old.index('mod external_curve {');assert after[n]==(old[:cut]+'mod external_curve {pub use pump_interface::BondingCurve;}\n').encode()
 n='Cargo.toml';assert after[n]==before[n].replace(b'[dependencies]\n',b'[dependencies]\npump-interface = { path = "pump-interface" }\n')
 oldlock=tomllib.loads(before['Cargo.lock'].decode());newlock=tomllib.loads(after['Cargo.lock'].decode());expected=json.loads(json.dumps(oldlock))
 root=next(p for p in expected['package']if p['name']=='mayhem-recovered');root['dependencies'].append('pump-interface');root['dependencies'].sort();expected['package'].append(dict(name='pump-interface',version='0.1.0',dependencies=['anchor-lang']))
 order=lambda p:(p['name'],p['version'],p.get('source',''));expected['package'].sort(key=order);assert expected==newlock
 manifest=tomllib.loads(after['pump-interface/Cargo.toml'].decode());assert manifest==dict(package=dict(name='pump-interface',version='0.1.0',edition='2021',publish=False),features={'anchor-debug':[],'no-idl':[]},dependencies={'anchor-lang':'=1.0.0'})
 source=after['pump-interface/src/lib.rs'].decode();assert source.splitlines()[7]=='#[account("account")]';assert 'impl Owner for BondingCurve {fn owner()->Pubkey {ID}}'in source
 fields=lambda s:re.sub(r'\s+','',s.split('pub struct BondingCurve {',1)[1].split('}',1)[0]);assert fields(old)==fields(source)
 assert source.count('#[account(')==1 and '6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P'in source and 'AccountDeserialize'not in source
 patch=''.join(''.join(difflib.unified_diff(before.get(n,b'').decode().splitlines(True),after[n].decode().splitlines(True),fromfile='a/'+n if n in before else'/dev/null',tofile='b/'+n))for n in sorted(after)if before.get(n)!=after[n]);assert patch.encode()==(P/'source.patch').read_bytes()
 variants=dict(zip(LABELS,[before,after]));assert {l:{n:sha(b)for n,b in d.items()}for l,d in variants.items()}==load('source-inputs.json');assert len(after)==56;return variants

def summarize(report):
 def logs(row):return [s for s in row['metadata']['logs']if not re.fullmatch(r'Program \S+ consumed \d+ of \d+ compute units',s)]
 bad=[r['case']['name']for r in report['cases']if logs(r['original'])!=logs(r['candidate'])]
 return dict(cases=len(report['cases']),successes=report['successful_original_cases'],functional_mismatches=len(report['mismatches']),non_compute_log_mismatches=len(bad),non_compute_log_cases=bad,raw_log_mismatches=sum(r['original']['metadata']['logs']!=r['candidate']['metadata']['logs']for r in report['cases']))

def evidence():
 maps=load('source-inputs.json');builds={}
 for label in LABELS+['curve-external-repeat','curve-external-portable']:
  launch=load('builds/'+label+'/launch.json');result=load('builds/'+label+'/result.json');log=(P/'builds'/label/'build.log').read_bytes();variant=label if label in LABELS else LABELS[1]
  assert launch['source_inputs']==maps[variant]and not launch['originals_mounted']and launch['command'][launch['command'].index('--network')+1]=='none'
  assert result['exit_code']==0 and result['source_unchanged']and result['registry_unchanged']and result['root_invocations']==log.count(b'--crate-name mayhem_recovered ')==1 and sha(log)==result['build_log_sha256']
  assert launch['fresh']==(label=='curve-external-repeat');assert '--locked'in launch['command']and'--offline'in launch['command'];builds[label]=result['artifacts']
  if label=='curve-external-repeat':assert log.count(b'--crate-name pump_interface ')==1 and log.count(b'--crate-name anchor_lang ')==1
 assert builds[LABELS[1]]==builds['curve-external-repeat']==builds['curve-external-portable']
 with tempfile.TemporaryDirectory()as td:
  t=Path(td)
  for label in LABELS:
   (t/label).mkdir()
   for kind in ['candidate','symbols']:
    b=gzip.decompress((P/'artifacts'/(label+'-'+kind+'.so.gz')).read_bytes());assert sha(b)==builds[label][kind+'.so']['sha256']and len(b)==builds[label][kind+'.so']['bytes'];(t/label/(kind+'.so')).write_bytes(b)
  spec=importlib.util.spec_from_file_location('decoder_static',P/'static.py');m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m);static=m.compare(t);assert static==load('validation/static.json')
  parent=json.loads((R/'research/mayhem-full-curve-recovery/audit.json').read_bytes());public={x['id']for x in parent['rows']if x['status']!='unmatched'};assert len(public)==345 and public<=set(static[LABELS[0]]['full_matches'])
  decoder=static[LABELS[1]]['decoder'];assert len(decoder['direct_callees'])==15 and all(x['full_shape_equal']for x in decoder['direct_callees']);assert len(decoder['indirect_calls'])==1 and len(decoder['candidate_data_references'])==6
  summaries={};checked_results=[]
  expected_names=[]
  for kind,folder,count in [('buy','twenty',486),('sell','nineteen',396),('buy_v2','twentytwo',613),('sell_v2','twentyone',473)]:
   expected=json.loads((R/'repro/mayhem'/folder/(kind.replace('_','-')+'-cases.json')).read_bytes())['cases'];assert len(expected)==count
   for family in (['native','token','token22']if kind.endswith('_v2')else['legacy']):
    name=LABELS[1]+'-'+kind+'-'+family;expected_names.append(name);b=gzip.decompress((P/'validation'/(name+'.json.gz')).read_bytes());report=json.loads(b)
    assert report['candidate_sha256']==builds[LABELS[1]]['candidate.so']['sha256']and report['original_sha256']==ORIGINAL and report['case_count']==len(report['cases'])==count and not report['mismatches']
    for item,row in zip(expected,report['cases']):assert all(row['case'][k]==v for k,v in item.items())
    summaries[name]=summarize(report);receipt=t/(name+'.json');receipt.write_bytes(b);out=t/(name+'-verified.json');cmd=[sys.executable,'-I','-B',str(R/('scripts/verify_mayhem_'+kind+'.py')),'--receipts',str(receipt),'--candidate',str(t/LABELS[1]/'candidate.so'),'--output',str(out)];run=subprocess.run(cmd,capture_output=True,text=True);assert run.returncode==0,run.stderr;checked=json.loads(out.read_bytes());assert checked==load('validation/'+name+'-independent.json');checked_results.append(checked)
  assert [j['name']for j in load('validation/commands.json')]==expected_names;assert summaries==load('validation/summary.json')
  assert sum(x['cases']for x in summaries.values())==4140 and sum(x['verified_signed_transactions']for x in checked_results)==8280
  return dict(fresh_comparisons=4140,verified_signature_entries=8280,functional_mismatches=0,non_compute_log_differences=sum(x['non_compute_log_mismatches']for x in summaries.values()),local_full_matches_before=347,local_full_matches_after=348,preserved_local_raw_matches=64,new_complete_body='O0213',new_complete_body_bytes=2272,matching_immediate_callees=15,unresolved_indirect_calls=1,unresolved_referenced_extents=6,compiler_executed=False,target_executed=False)

def main():
 ap=argparse.ArgumentParser(description=__doc__);ap.add_argument('--materialize',type=Path);ap.add_argument('--variant',choices=LABELS,default=LABELS[1]);a=ap.parse_args();assert not any(p.is_symlink()for p in P.rglob('*'))
 actual={p.relative_to(P).as_posix():sha(p.read_bytes())for p in P.rglob('*')if p.is_file()and p.name!='manifest.json'and'__pycache__'not in p.parts};assert actual==load('manifest.json')
 for n,h in load('external-inputs.json').items():safe(n);assert sha((R/n).read_bytes())==h,n
 variants=sources();result=evidence()
 if a.materialize:
  dst=a.materialize.absolute();assert not dst.exists()and not dst.is_symlink()and not any(p.is_symlink()for p in dst.parents);dst.mkdir(parents=True)
  for n,b in variants[a.variant].items():p=dst/safe(n);p.parent.mkdir(parents=True,exist_ok=True);p.write_bytes(b)
  result['materialized']=str(dst)
 print(json.dumps(result,indent=2))
if __name__=='__main__':main()
