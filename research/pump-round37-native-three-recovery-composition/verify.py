"""Offline byte/source/body/record verification. No compiler, VM, Git or network."""
from pathlib import Path
import base64,gzip,posixpath,hashlib,importlib.util,io,json,struct,sys,tarfile,tempfile
if not __debug__:raise RuntimeError('Optimized Python is not supported')
sys.dont_write_bytecode=True
R=Path(__file__).resolve().parent
sha=lambda b:hashlib.sha256(b).hexdigest()
def read(n):return (R/n).read_bytes()
def js(n):return json.loads(read(n))
def unpack(n):
 with tarfile.open(fileobj=io.BytesIO(read(n)),mode='r:gz')as t:
  members=t.getmembers();assert all(m.isfile()and not m.name.startswith('/')and '..'not in Path(m.name).parts for m in members)
  out={m.name:t.extractfile(m).read()for m in members};assert len(out)==len(members);return out
def load(n):
 s=importlib.util.spec_from_file_location('round37_composition_inventory',R/n);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m
M=load('inventory.py')
def identity(image,ss,row):
 n,ops=M.normalize(M.body(image,ss,row['start'],row['bytes']),row['start'],ss);return row['bytes'],sha(n),ops
def check_roots(original,candidate,inv):
 os,cs=M.sections(original),M.sections(candidate);of={r['start']:r for r in inv['windows']};cf={r['start']:r for r in M.functions(candidate)};roots=[]
 for start in [11200,664560,907008]:
  o=of[start];assert len(o['candidates'])==1;c=cf[o['candidates'][0]['start']];x=identity(original,os,o);y=identity(candidate,cs,c);assert x[:2]==y[:2],('root',start)
  oc=[p for p in x[2]if p['kind']=='direct-call'];cc=[p for p in y[2]if p['kind']=='direct-call'];assert len(oc)==len(cc);edges=[]
  for a,b in zip(oc,cc):
   assert a['offset']==b['offset'];left=of[a['target']];right=cf[b['target']];assert identity(original,os,left)[:2]==identity(candidate,cs,right)[:2],('callee',start,a['offset']);edges.append(dict(offset=a['offset'],original_target=a['target'],candidate_target=b['target'],bytes=left['bytes']))
  roots.append(dict(original_start=start,candidate_start=c['start'],bytes=o['bytes'],immediate_edges=edges))
 return roots
def source_check(source,base,claims):
 assert {n:sha(b)for n,b in source.items()}==claims['source_inputs']
 assert {n:sha(b)for n,b in base.items()}==claims['baseline_inputs']
 changes={n for n in set(base)|set(source)if base.get(n)!=source.get(n)}
 assert changes=={'programs/pump/src/lib.rs','programs/pump/src/mayhem_virtual_params.rs','programs/pump/src/multi_hop_curve_swap.rs','programs/pump/src/util/account_name.rs'}
 # No other source, namespace, generated API or physical line is changed.
 n='programs/pump/src/multi_hop_curve_swap.rs';assert source[n]==base[n].replace(b'bonding_curve.quote_mint==quote_mint.key()',b'quote_mint.key()==bonding_curve.quote_mint')
 n='programs/pump/src/mayhem_virtual_params.rs';assert source[n]==base[n].replace(b'(denominator as u128 + virtual_token_reserves as u128)',b'(denominator as u128).checked_add(virtual_token_reserves as u128).ok_or(PumpError::Overflow)?')
 n='programs/pump/src/lib.rs';old=b'error!(anchor_lang::error::ErrorCode::ConstraintExecutable).with_account_name(format!(';new=b'crate::account_name::with_owned_name(error!(anchor_lang::error::ErrorCode::ConstraintExecutable), &format!(';assert base[n].count(old)==1
 assert source[n]==base[n].replace(old,new)+b'\n#[path="util/account_name.rs"] pub mod account_name;\n'
 for n in changes-{'programs/pump/src/lib.rs','programs/pump/src/util/account_name.rs'}:assert base[n].count(b'\n')==source[n].count(b'\n')
def check_runtime(records,inputs,claims):
 from solders.transaction import Transaction
 pump='6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P';assert pump in json.loads(records['authority-observer.json'])['records'][0]['before']
 frozen=sha(inputs['evidence/original/pump/deployed.so']);assert frozen==claims['original_sha256'];known={sha(b)for n,b in inputs.items()if n.endswith('.so')}|{claims['candidate_sha256']};total=0;success=0
 specs=[('authority.json.gz','authority-observer.json','scripts/pump_validate_authority.py',59,['error','data_hex','lamports','payer_lamports','authority_lamports','event_payloads','inner_instructions'],'error'),('sync-frozen.json.gz','sync-frozen-observer.json','scripts/pump_set_mayhem_virtual_params_differential.py',84,['err','vqr','vtr','events','logs'],'err'),('curve-restored.json','curve-restored-observer.json','repro/pump/native-curve-partial-fortyeight/harness/pump_multi_hop_curve_differential.py',56,['error','events','inner','return_data','before','after'],'error')]
 for report,observer,script,count,fields,error in specs:
  raw=records[report];j=json.loads(gzip.decompress(raw)if report.endswith('.gz')else raw);o=json.loads(records[observer]);assert j['candidate_sha256']==claims['candidate_sha256'];assert o['failure']is None;assert o['script_sha256']==sha(inputs[script]);assert o['observer_sha256']==sha(read('runtime/observe_frozen_runtime.py'));assert len(j['cases'])==count and len(o['records'])==2*count
  if 'mismatches'in j:assert not j['mismatches']
  for i,c in enumerate(j['cases']):
   assert all(c['original'].get(k)==c['candidate'].get(k)for k in fields),(report,i)
   success+=c['original'][error]is None
   for side in range(2):
    rec=o['records'][2*i+side];tx=Transaction.from_bytes(base64.b64decode(rec['transaction_base64']));assert all(tx.verify_with_results());assert str(tx.signatures[0])==rec['signature'];assert rec['signature_verified']is True
    assert rec['checks']['signature']in [True,'SDK default']and rec['checks']['blockhash']in [True,'SDK default']
    assert rec['before']==rec['after'];assert set(rec['programs'])==set(rec['before']);assert rec['before'][pump]['sha256']==(claims['candidate_sha256']if side else frozen)
    for key,v in rec['programs'].items():assert v['sha256']in known and rec['before'][key]['sha256']==v['sha256']and rec['before'][key]['executable']is True
    if 'transaction_base64'in c['original']:
     assert c[['original','candidate'][side]]['transaction_base64']==rec['transaction_base64']
    total+=1
 # Failures were before any actual send. They are not accepted cases.
 for n in ['curve-observer.json','sync-observer.json']:
  j=json.loads(records[n]);assert j['failure']and not j['records']
 assert total==398 and success==111
 return dict(pairs=199,signed_records=total,success=success,reject=199-success)
def check_sdk(binding,sdk):
 assert binding['archive_sha256']=='6719b889d60677a8a2fcf4c82f68441a1afe0ab093edd2efe9f84a67a808b3e9'
 members=binding['archive_members']
 def resolve(n,seen=()):
  assert n not in seen
  if n not in members:return None
  row=members[n]
  if row['kind']=='file':return row['sha256']
  if row['kind']=='directory':return None
  assert row['kind']in ['symlink','hardlink']
  t=posixpath.normpath(posixpath.join(posixpath.dirname(n),row['target']))if row['kind']=='symlink'else posixpath.normpath(row['target'])
  return resolve(t,seen+(n,))
 assert {n:h for n in members if(h:=resolve(n))is not None}==binding['resolved_inputs']==sdk
def verify():
 assert __debug__,'Optimized Python is not supported'
 assert not any(p.is_symlink()for p in R.rglob('*'))
 manifest=js('manifest.json');actual={str(p.relative_to(R)):sha(p.read_bytes())for p in R.rglob('*')if p.is_file()and p.name!='manifest.json'and '__pycache__'not in p.parts};assert actual==manifest
 claims=js('claims.json');assert (claims['normal'],claims['raw'],claims['runtime_pairs'],claims['signed_records'])==(752,131,199,398);source=unpack('source.tar.gz');base=unpack('baseline-source.tar.gz');assert len(source)==58 and len(base)==57;source_check(source,base,claims)
 cp=js('CHECKPOINT.json')
 with tarfile.open(R/'primary.tar.xz')as t:primary={m.name:t.extractfile(m).read()for m in t.getmembers()if m.isfile()}
 assert len(primary)==56 and {n:sha(b)for n,b in primary.items()}==cp['primary_source_sha256']
 text=primary['Cargo.toml'].decode();a=text.index('[profile.release]');b=text.index('[workspace]')
 expected={'programs/pump/'+n:v for n,v in primary.items()if n not in ['Cargo.toml','Cargo.lock']}
 expected.update({'programs/pump/Cargo.toml':(text[:a].rstrip()+'\n').encode(),'Cargo.toml':('[workspace]\nmembers = ["programs/pump"]\nresolver = "2"\n\n'+text[a:b].strip()+'\n').encode(),'Cargo.lock':primary['Cargo.lock']})
 assert expected==base
 for n in ['pump_compare_function_bytes.py','pump_quote_control_function_match.py']:assert sha(read('reference/inputs/scripts/'+n))==cp['input_python_sha256']['scripts/'+n]
 assert sha(read('inputs/scripts/pump_physical_source_wrapper.py'))==cp['input_python_sha256']['scripts/pump_physical_source_wrapper.py']
 check_sdk(json.loads(gzip.decompress(read('sdk-archive-binding.json.gz'))),js('builds/combined/launch.json')['sdk_inputs'])
 original=gzip.decompress(read('reference/original.so.gz'));candidate=gzip.decompress(read('builds/combined/unstripped.so.gz'));deployment=gzip.decompress(read('builds/combined/candidate.so.gz'));assert sha(original)==claims['original_sha256'];assert sha(candidate)==claims['symbols_sha256'];assert sha(deployment)==claims['candidate_sha256'];assert original!=deployment
 for label in ['combined','repeat','native-parent']:
  r=js('builds/'+label+'/result.json');l=js('builds/'+label+'/launch.json');assert r['exit_code']==0 and r['root_invocations']==1;assert all(r[k]is True for k in ['primary_unchanged','source_unchanged','sdk_unchanged']);assert l['command'][l['command'].index('--target')+1]=='sbpf-solana-solana';assert len(l['sdk_inputs'])==2775;assert sha(gzip.decompress(read('builds/'+label+'/build.log.gz')))==r['build_log_sha256'];assert l['workspace_inputs']==(claims['baseline_inputs']if label=='native-parent'else claims['source_inputs'])
  for kind in ['unstripped','candidate']:
   data=gzip.decompress(read('builds/'+label+'/'+kind+'.so.gz'));assert sha(data)==r[kind+'_sha256']
   if label=='repeat':assert data==gzip.decompress(read('builds/combined/'+kind+'.so.gz'))
  assert l['sdk_inputs']==js('builds/combined/launch.json')['sdk_inputs'];assert l['primary_source_inputs']==cp['primary_source_sha256'];assert l['wrapper_sha256']==cp['input_python_sha256']['scripts/pump_physical_source_wrapper.py']
 # Actual normalized counts are recomputed with the unchanged imported parser/normalizer.
 with tempfile.TemporaryDirectory(prefix='round37-verify-')as tmp:
  p=Path(tmp);(p/'original.so').write_bytes(original);(p/'candidate.so').write_bytes(candidate);inv=M.inventory(p/'candidate.so',p/'original.so');assert inv==js('inventory.json');assert (inv['membership_normalized'],inv['injective_normalized'],inv['injective_raw'])==(752,752,131)
  parentbytes=gzip.decompress(read('builds/native-parent/unstripped.so.gz'));(p/'parent.so').write_bytes(parentbytes);parent=M.inventory(p/'parent.so',p/'original.so');assert parent==js('parent-inventory.json');assert (parent['injective_normalized'],parent['injective_raw'])==(749,131)
 matched=lambda d:{r['start']for r in d['windows']if r['candidates']};raw=lambda d:{r['start']for r in d['windows']if any(c['raw_sha256']==r['raw_sha256']for c in r['candidates'])};assert matched(parent)<=matched(inv)and raw(parent)<=raw(inv);assert matched(inv)-matched(parent)==set(claims['new_roots']);assert not inv['losses']
 roots=check_roots(original,candidate,inv);assert roots==js('three-roots-static.json')['roots'];assert sum(len(r['immediate_edges'])for r in roots)==44
 # Ordinary strip changes metadata; all allocated section bytes remain equal.
 ss,ds=M.sections(candidate),M.sections(deployment)
 for name,s in ss.items():
  if name in ds and name in ['.text','.rodata','.data.rel.ro','.data','.bss','.eh_frame']:
   d=ds[name];assert s['addr']==d['addr']and s['size']==d['size'];assert candidate[s['offset']:s['offset']+s['size']]==deployment[d['offset']:d['offset']+d['size']]
 rt=check_runtime(unpack('runtime/records.tar.gz'),unpack('runtime/inputs.tar.gz'),claims)
 return dict(normalized=752,raw=131,new_windows=3,immediate_edges=44,repeat_complete_outputs_equal=True,runtime=rt,whole_identity=False)
if __name__=='__main__':print(json.dumps(verify(),sort_keys=True))
