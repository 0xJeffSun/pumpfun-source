#!/usr/bin/env python3
"""Verify the narrow source change, ELF census, real signatures, and saved runtime."""
from pathlib import Path
import argparse,base64,csv,ctypes,ctypes.util,gzip,hashlib,io,json,struct,sys,tarfile,tempfile
from types import SimpleNamespace
if not __debug__:raise SystemExit('Optimized Python is unsupported: assertions are verification checks.')
sys.dont_write_bytecode=True
HERE=Path(__file__).resolve().parent
sys.path.insert(0,str(HERE/'tools'))
from pump_compare_function_bytes import body,normalize
from pump_quote_control_function_match import sections
PUMP='6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P';AMM='pAMMBay6oceH9fJKBRHGP5D4bD4sWpmSwMn52FMfXEA'
def sha(b):return hashlib.sha256(b).hexdigest()
def read(path):return gzip.decompress((HERE/path).read_bytes())
def functions(blob):
 shoff=struct.unpack_from('<Q',blob,0x28)[0];esz,count,ni=struct.unpack_from('<HHH',blob,0x3a);hs=[struct.unpack_from('<IIQQQQIIQQ',blob,shoff+i*esz)for i in range(count)]
 def string(table,off):
  start=table[4]+off;return blob[start:blob.index(b'\0',start)].decode()
 text=next(i for i,h in enumerate(hs)if string(hs[ni],h[0])=='.text')
 for h in hs:
  if h[1]!=2:continue
  for k in range(h[5]//24):
   nm,info,_,sec,addr,size=struct.unpack_from('<IBBHQQ',blob,h[4]+24*k)
   if info&15==2 and sec==text and size:yield addr,size,string(hs[h[6]],nm)
def census(original,candidate):
 os=sections(original);cs=sections(candidate);index={}
 for start,size,name in functions(candidate):
  raw=body(candidate,cs,start,size);norm,_=normalize(raw,start,cs);index.setdefault((size,sha(norm)),[]).append(sha(raw))
 result={}
 for start,size in json.loads((HERE/'windows.json').read_text()):
  raw=body(original,os,start,size);norm,_=normalize(raw,start,os);matches=index.get((size,sha(norm)),[]);result[start]=(bool(matches),sha(raw)in matches)
 assert len(result)==1035
 return result

def verify_artifacts():
 manifest=json.loads((HERE/'MANIFEST.json').read_text())
 assert {str(p.relative_to(HERE))for p in HERE.rglob('*')if p.is_file()}==set(manifest['files'])|{'MANIFEST.json'}
 for name,digest in manifest['files'].items():assert sha((HERE/name).read_bytes())==digest,name
 original=read('runtime/images/pump-original.so.gz');assert sha(original)==manifest['original_pump_sha256']
 sources={};images={};inventories={};counts={}
 for label in ['baseline','fixed']:
  with tarfile.open(fileobj=io.BytesIO(read('builds/'+label+'/source.tar.gz')),mode='r:')as tar:sources[label]={m.name:tar.extractfile(m).read()for m in tar.getmembers()if m.isfile()}
  recorded=json.loads((HERE/'builds'/label/'source-sha256.json').read_text());assert {k:sha(v)for k,v in sources[label].items()}==recorded
  for kind in ['candidate','unstripped']:
   raw=read('builds/'+label+'/'+kind+'.so.gz');images[label+'-'+kind]=raw;assert sha(raw)==json.loads((HERE/'builds'/label/'elf-sha256.json').read_text())[kind+'.so']
  for section in ['.text','.rodata','.data.rel.ro']:
   one=sections(images[label+'-candidate']);two=sections(images[label+'-unstripped'])
   if section in one and section in two:
    a=one[section];b=two[section];assert a['addr']==b['addr'] and images[label+'-candidate'][a['offset']:a['offset']+a['size']]==images[label+'-unstripped'][b['offset']:b['offset']+b['size']]
  log=read('builds/'+label+'/build.log.gz').decode();assert 'Compiling pump-token-ext 'in log and 'Compiling pump-recovered 'in log
  inv=census(original,images[label+'-unstripped']);inventories[label]=inv
  counts[label]={'normalized':sum(v[0]for v in inv.values()),'raw':sum(v[1]for v in inv.values())};assert counts[label]=={'normalized':1018,'raw':166}
  saved=json.loads(read('builds/'+label+'/inventory.json.gz'));assert saved['candidate_sha256']==sha(images[label+'-unstripped'])
  assert {w['start']:(bool(w['normalized_matches']),w['raw_match'])for w in saved['windows']}==inv
 assert set(sources['baseline'])==set(sources['fixed'])
 changed=[k for k in sources['baseline']if sources['baseline'][k]!=sources['fixed'][k]];assert changed==['programs/pump/src/create_v2.rs']
 name=changed[0];before=sources['baseline'][name].decode();after=sources['fixed'][name].decode()
 import difflib
 actual=''.join(difflib.unified_diff(before.splitlines(True),after.splitlines(True),fromfile='a/'+name,tofile='b/'+name,n=1));assert actual==(HERE/'source.patch').read_text()
 assert 'require!(mint.key()!=UNSUPPORTED_QUOTE_MINT,PumpError::UnsupportedQuoteMint);'in before.splitlines()[69]
 assert 'require_keys_neq!(mint.key(),UNSUPPORTED_QUOTE_MINT,PumpError::UnsupportedQuoteMint);'in after.splitlines()[69]
 assert inventories['baseline']==inventories['fixed'],'Original-window membership changed'
 bodies={}
 for label in ['baseline','fixed']:
  candidate=images[label+'-unstripped'];st,sz,n=next(f for f in functions(candidate)if '9create_v27execute'in f[2]);raw=body(candidate,sections(candidate),st,sz);norm,_=normalize(raw,st,sections(candidate));bodies[label]={'start':st,'bytes':sz,'sha256':sha(raw),'normalized_sha256':sha(norm),'symbol':n}
 assert bodies['baseline']['normalized_sha256']!=bodies['fixed']['normalized_sha256'],'Assertion did not change live constructor body'
 receipt=json.loads((HERE/'builds/fixed/confirmation.json').read_text())
 expected=json.loads((HERE/'builds/fixed/source-sha256.json').read_text());assert receipt['source_before_sha256']==receipt['source_after_sha256']==expected
 assert receipt['tool_before_sha256']==receipt['tool_after_sha256']and receipt['returncode']==0
 assert receipt['elf_sha256']==json.loads((HERE/'builds/fixed/elf-sha256.json').read_text())
 clean=receipt['clean_command'];assert all(x in clean for x in ['--manifest-path','--release','--target','sbpf-solana-solana','pump-recovered','pump-token-ext','--offline'])
 assert len(receipt['compiler_commands'])==2 and [c[c.index('--crate-name')+1]for c in receipt['compiler_commands']]==['pump_token_ext','pump_recovered']
 confirm=read('builds/fixed/confirmation-build.log.gz').decode();assert 'Compiling pump-token-ext 'in confirm and 'Compiling pump-recovered 'in confirm
 return manifest,images,counts,bodies

ALPHABET='123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'
def b58(raw):
 n=int.from_bytes(raw,'big');out=''
 while n:n,r=divmod(n,58);out=ALPHABET[r]+out
 return '1'*(len(raw)-len(raw.lstrip(b'\0')))+out

def ed25519(public,signature,message):
 crypto=ctypes.CDLL(ctypes.util.find_library('crypto'))
 new=crypto.EVP_PKEY_new_raw_public_key;new.argtypes=[ctypes.c_int,ctypes.c_void_p,ctypes.c_void_p,ctypes.c_size_t];new.restype=ctypes.c_void_p
 ctx_new=crypto.EVP_MD_CTX_new;ctx_new.restype=ctypes.c_void_p
 init=crypto.EVP_DigestVerifyInit;init.argtypes=[ctypes.c_void_p,ctypes.c_void_p,ctypes.c_void_p,ctypes.c_void_p,ctypes.c_void_p];init.restype=ctypes.c_int
 verify=crypto.EVP_DigestVerify;verify.argtypes=[ctypes.c_void_p,ctypes.c_void_p,ctypes.c_size_t,ctypes.c_void_p,ctypes.c_size_t];verify.restype=ctypes.c_int
 crypto.EVP_MD_CTX_free.argtypes=[ctypes.c_void_p];crypto.EVP_PKEY_free.argtypes=[ctypes.c_void_p]
 key=new(1087,None,public,len(public));ctx=ctx_new();assert key and ctx
 try:assert init(ctx,None,None,None,key)==1;assert verify(ctx,signature,len(signature),message,len(message))==1
 finally:crypto.EVP_MD_CTX_free(ctx);crypto.EVP_PKEY_free(key)

def transaction(raw):
 at=0
 def short():
  nonlocal at
  value=0;shift=0
  while True:
   assert at<len(raw);v=raw[at];at+=1;value|=(v&127)<<shift
   if v<128:return value
   shift+=7;assert shift<=14
 def take(n):
  nonlocal at
  assert 0<=n<=len(raw)-at;out=raw[at:at+n];at+=n;return out
 signatures=[take(64)for _ in range(short())];message=raw[at:];header=take(3);assert not header[0]&128 and len(signatures)==header[0]
 public_keys=[take(32)for _ in range(short())];blockhash=take(32);instructions=[]
 for _ in range(short()):
  program=take(1)[0];accounts=list(take(short()));data=take(short());instructions.append(SimpleNamespace(program_id_index=program,accounts=accounts,data=data))
 assert at==len(raw)
 for public,signature in zip(public_keys,signatures):ed25519(public,signature,message)
 return SimpleNamespace(message=SimpleNamespace(account_keys=[b58(k)for k in public_keys],instructions=instructions,header=SimpleNamespace(num_required_signatures=header[0]),recent_blockhash=b58(blockhash)))

def verify_runtime(images,replay):
 if replay:
  from solders.account import Account
  from solders.clock import Clock
  from solders.pubkey import Pubkey
  from solders.transaction import Transaction
  from solders.transaction_metadata import FailedTransactionMetadata
  from solders.litesvm import LiteSVM
 records=json.loads(read('runtime/cases.json.gz'));cases=records['cases'];assert len(cases)==4
 ids=json.loads((HERE/'runtime/images.json').read_text());programs={}
 for name,row in ids.items():
  blob=read('runtime/images/'+name+'.so.gz');assert sha(blob)==row['sha256'];programs[row['program_id']]=blob
 assert records['image_sha256']=={'original':sha(programs[PUMP]),'baseline':sha(images['baseline-candidate']),'fixed':sha(images['fixed-candidate'])}
 transactions=0;replayed=0;negative=0;seen=set();mint=''
 with tempfile.TemporaryDirectory(prefix='pump-create-keys-replay-')as tmp:
  tmp=Path(tmp)
  for case in cases:
   key=(case['rejected'],case['token2022']);assert key not in seen;seen.add(key)
   original=case['results']['original'];baseline=case['results']['baseline'];fixed=case['results']['fixed']
   fields=['before','after','error','events','inner','return'];assert all(original[k]==q[k]for k in fields for q in [baseline,fixed])
   assert original['transaction_base64']==baseline['transaction_base64']==fixed['transaction_base64']
   if case['rejected']:
    negative+=1;assert '6063'in original['error'];assert not original['events'];assert len(original['inner'])==2
    banned='9pan9bMn5HatX4EJdBwg9VgCa7Uz5HL8N1m5D3NdXejP';assert case['input']['quote_pubkey']==banned
    compared=['Program log: Left:','Program log: '+banned,'Program log: Right:','Program log: '+banned]
    for label,result in case['results'].items():
     at=next(i for i,line in enumerate(result['logs'])if 'Error Code: UnsupportedQuoteMint. Error Number: 6063.'in line)
     assert ('create_v2.rs:220.'if label=='original'else'create_v2.rs:70.')in result['logs'][at]
     assert (result['logs'][at+1:at+5]==compared)==(label!='baseline')
   else:assert original['error']is None and len(original['events'])==1
   for label,result in case['results'].items():
    raw_tx=base64.b64decode(result['transaction_base64']);tx=transaction(raw_tx);transactions+=1
    keys=tx.message.account_keys;assert len(tx.message.instructions)==2 and str(keys[tx.message.instructions[1].program_id_index])==PUMP
    assert tx.message.header.num_required_signatures==2
    assert tx.message.instructions[1].data[:8]==bytes([214,144,76,236,95,139,49,180])
    selected=dict(programs);selected[PUMP]=programs[PUMP]if label=='original'else images[label+'-candidate']
    if not replay:continue
    vm=LiteSVM().with_transaction_history(0);vm.set_clock(Clock(100,1700000000,0,0,1700000000))
    for pid,blob in selected.items():
     path=tmp/(pid+'.so');path.write_bytes(blob);vm.add_program_from_file(Pubkey.from_string(pid),path)
    for address,a in result['before'].items():
     if a is not None:vm.set_account(Pubkey.from_string(address),Account(a['lamports'],bytes.fromhex(a['data']),Pubkey.from_string(a['owner'])))
    assert tx.message.recent_blockhash==str(vm.latest_blockhash())
    actual=Transaction.from_bytes(raw_tx);assert all(actual.verify_with_results());sent=vm.send_transaction(actual)
    failed=isinstance(sent,FailedTransactionMetadata);meta=sent.meta()if failed else sent;encoded=json.loads(meta.to_json())
    got={'error':str(sent.err())if failed else None,'logs':meta.logs(),'events':[l for l in meta.logs()if l.startswith('Program data:')],'inner':encoded['inner_instructions'],'return':encoded.get('return_data'),'after':{}}
    for address in result['after']:
     a=vm.get_account(Pubkey.from_string(address));got['after'][address]=None if a is None else{'lamports':a.lamports,'owner':str(a.owner),'data':bytes(a.data).hex()}
    for field in got:assert got[field]==result[field],(key,label,field)
    replayed+=1
 assert seen=={(x,y)for x in [False,True]for y in [False,True]}and negative==2 and transactions==12
 return{'cases':len(cases),'baseline_payload_mismatches':negative,'verified_transactions':transactions,'replayed_transactions':replayed,'source_lines':{'original':220,'baseline':70,'fixed':70}}

def main():
 ap=argparse.ArgumentParser();ap.add_argument('--replay',action='store_true',help='Re-execute all frozen signed transactions with captured AMM and dependencies.');a=ap.parse_args()
 _,images,counts,bodies=verify_artifacts();runtime=verify_runtime(images,a.replay)
 print(json.dumps({'counts':counts,'live_constructor_bodies':bodies,'runtime':runtime,'normalized_window_gain':0,'whole_elf_equal':False},indent=2))
if __name__=='__main__':main()
