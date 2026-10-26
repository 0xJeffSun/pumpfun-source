"""Read-only validation of retained archives and bounded resolver observations.
No subprocesses, installation, extraction, JavaScript, network, or target execution.
Run with python -B verify.py. Assertions are intentional: do not use python -O.
"""
from pathlib import Path
import base64, hashlib, io, json, re, struct, tarfile
import analyze_graph
P=Path(__file__).resolve().parent
J=lambda n:json.loads((P/n).read_text())
H=lambda b:hashlib.sha256(b).hexdigest()
ALPHABET='123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'
def decode(s):
 n=0
 for c in s:n=n*58+ALPHABET.index(c)
 return b'\0'*(len(s)-len(s.lstrip('1')))+n.to_bytes((n.bit_length()+7)//8,'big')
def encode(b):
 n=int.from_bytes(b,'big');s=''
 while n:n,r=divmod(n,58);s=ALPHABET[r]+s
 return '1'*(len(b)-len(b.lstrip(b'\0')))+s
def on_curve(b):
 # Ed25519 compressed-point decompression: y and the sign of x.
 q=2**255-19;v=int.from_bytes(b,'little');sign=v>>255;y=v&((1<<255)-1)
 if y>=q:return False
 d=(-121665*pow(121666,q-2,q))%q;den=(d*y*y+1)%q
 if den==0:return False
 x2=((y*y-1)*pow(den,q-2,q))%q;x=pow(x2,(q+3)//8,q)
 if x*x%q!=x2:x=x*pow(2,(q-1)//4,q)%q
 return x*x%q==x2 and not(x==0 and sign)
def pda(seeds,program):
 assert len(program)==32 and len(seeds)<16 and all(len(s)<=32 for s in seeds)
 for bump in range(255,-1,-1):
  h=hashlib.sha256(b''.join(seeds)+bytes([bump])+program+b'ProgramDerivedAddress').digest()
  if not on_curve(h):return encode(h)
 raise AssertionError('no PDA bump')
def main():
 assert __debug__, 'Use ordinary Python without -O'
 graph=analyze_graph.analyze();assert graph==J('graph.json')
 assert graph['counts']=={'lock_nodes':99,'unique_archives':91,'regular_files':4747,'loaded_commonjs_modules':152,'dependency_edges':196,'unresolved_edges':1}
 unresolved=[x for x in graph['edges'] if x['resolved_path'] is None]
 assert [(x['owner'],x['role'],x['name'],x['declared_range'],x['optional_peer'])for x in unresolved]==[('node_modules/node-fetch','peerDependencies','encoding','^0.1.0',True)]
 launch=J('launch.json');exit=J('exit.json')
 assert launch=={k:v for k,v in exit.items() if k in launch}
 assert exit['returncode']==0 and exit['input_unchanged'] and exit['node_modules_absent']
 assert H((P/'resolution/package.json').read_bytes())==launch['input_package_json_sha256']
 assert H((P/'resolution/package-lock.json').read_bytes())==exit['lock_sha256']
 for name in ['stdout','stderr']:assert H((P/(name+'.log')).read_bytes())==exit[name+'_sha256']
 receipts=J('archive-receipts.json')['archives'];by_path={};archive_contents={}
 for r in receipts:
  raw=(P/r['file']).read_bytes();assert hashlib.sha1(raw).hexdigest()==r['sha1']
  assert r['url'].startswith('https://registry.npmjs.org/') and r['status']==200
  t=tarfile.open(fileobj=io.BytesIO(raw),mode='r:gz')
  files={'/'.join(m.name.split('/')[1:]):t.extractfile(m).read() for m in t.getmembers() if m.isfile()}
  for n in r['lock_paths']:by_path[n]=r;archive_contents[n]=files
 assert sum(x['bytes']for x in receipts)==15817698
 mat=J('materialization-03.json')['rows'];assert len(mat)==99 and len({x['lock_path']for x in mat})==99
 for row in mat:
  files=archive_contents[row['lock_path']];md=json.loads(files['package.json']);r=by_path[row['lock_path']]
  assert row['archive_sha256']==r['sha256'] and row['regular_file_count']==len(files)
  assert row['package_json_sha256']==H(files['package.json']) and row['name']==md['name'] and row['version']==md['version']
  assert row['lifecycle_scripts_executed'] is False and row['bin_links_created'] is False
 for binding in J('frozen-sdk-archive-bindings.json'):
  assert by_path[binding['package']]['sha256']==binding['sha256'] and binding['archive_equal'] is True
 # Prior frozen paths are provenance references; external original bytes are not re-read here.
 files=archive_contents['node_modules/@pump-fun/pump-swap-sdk'];idl_raw=files['src/idl/pump_amm.json']
 assert archive_contents['node_modules/@pump-fun/pump-sdk']['src/idl/pump_amm.json']==idl_raw
 idl=json.loads(idl_raw);result=J('resolver-result.json');inputs=J('ordinary-inputs.json')['explicit_account_keys']
 assert len({x['relative']for x in result['loadedModules']})==152
 assert len(inputs)==len(set(inputs))==19 and result['node']=='v24.5.0' and result['anchor']=='0.31.1' and result['rootWeb3']=='1.98.0'
 supplied={re.sub(r'([A-Z])',lambda m:'_'+m[0].lower(),n):encode(bytes([i+1])*32)for i,n in enumerate(inputs)}
 saved_pda={x['instruction']:x['expected_filled']for x in J('resolver-independent-pda.json')['rows']}
 assert [x['instruction']for x in result['rows']]==['buy','sell']
 for row in result['rows']:
  name=row['instruction'];ix=next(x for x in idl['instructions']if x['name']==name);actual=row['actual']
  assert row['programId']==idl['address'] and row['explicitKeys']==inputs and row['remainingAccounts']==[]
  assert len(actual)==len(ix['accounts'])==(23 if name=='buy' else 21)
  resolved=dict(supplied)
  for a in ix['accounts']:
   if a['name'] not in supplied and 'address'in a:resolved[a['name']]=a['address']
  for a in ix['accounts']:
   n=a['name']
   if n not in resolved:
    recipe=a['pda'];seeds=[]
    for s in recipe['seeds']:
     if s['kind']=='const':seeds.append(bytes(s['value']))
     else:assert s['kind']=='account';seeds.append(decode(resolved[s['path']]))
    program=decode(resolved[recipe['program']['path']])if 'program'in recipe else decode(idl['address'])
    resolved[n]=pda(seeds,program)
  filled=[]
  for i,(a,got) in enumerate(zip(ix['accounts'],actual)):
   assert got=={'index':i,'idlName':a['name'],'key':resolved[a['name']],'isSigner':a.get('signer',False),'isWritable':a.get('writable',False)}
   if a['name']not in supplied:filled.append(got)
  assert filled==row['filled'] and {x['idlName']:x['key']for x in filled}==saved_pda[name]
  expected=bytes(ix['discriminator'])+struct.pack('<QQ',1,1)+(b'\1'if name=='buy'else b'')
  assert row['dataHex']==expected.hex()
 checked=J('resolver-checked-run/result.json');assert checked['returncode']==0 and checked['loaded_module_count']==152 and checked['files']==4747
 assert checked['all4747_regular_files_unchanged'] is True and checked['loaded_module_hashes_all_archive_bound'] is True
 assert checked['network_or_rpc_attempts']==checked['target_executions']==checked['lifecycle_execution']==0
 assert checked['test_sha256']==H((P/'resolve-ordinary.cjs').read_bytes())
 for name in ['stdout','stderr']:
  raw=(P/'resolver-checked-run'/f'{name}.log').read_bytes()
  assert H(raw)==checked[name+'_sha256']
 assert b'pure JS will be used'in (P/'resolver.stderr').read_bytes()
 assert (P/'resolver.exit').read_text().strip()=='0'
 print('PASS: 99 lock nodes; 91 authenticated archives; 4747 files; 196 dependency edges; 152 loaded CJS modules; buy23/sell21 order/flags/data and 4/2 derived defaults.')
 print('Bounded retained observations only: historical graph, npm-ci/native identity, SDK wrappers/state/remaining accounts and target acceptance remain unproved.')
if __name__=='__main__':main()
