"""Static full-body and signed-receipt verification; no compiler, VM or RPC."""
from pathlib import Path
import contextlib,gzip,hashlib,importlib.util,io,json,re,shutil,struct,sys,tempfile
HERE=Path(__file__).resolve().parent
ROOT=next((p for p in HERE.parents if(p/'evidence/original/mayhem/deployed.so').is_file()and(p/'repro/mayhem/compiler-v154-main/main/identity.json').is_file()),None)
ORIGINAL='a87fa9f866272514e6acb852b668c4a08aeb173d56c883039991d114d1199bdb'
BASE='46b6a660c35868ac3821bc3edac5817e6ceb640679e5e9538e6004dc1a5e31e8'
CANDIDATE='9be9d40f1c8995915d55c29abf42cf6bd1c07a1f386054ed89c2156a1ecd5460'
SYMBOLS='1fc36019bec29a194822354bb38d29cdf2b11de2756e13d8b78ef578693fd338'
SOURCE_MAP_SHA='6b75613e965f6401f71d0bc7fe986507da5fbde1c8571869135119c03afb6d9f'
def sha(b):return hashlib.sha256(b).hexdigest()
def read(p):
 b=p.read_bytes();return json.loads(gzip.decompress(b)if p.suffix=='.gz'else b)
def module(name,p):
 spec=importlib.util.spec_from_file_location(name,p);m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m);return m
def integrity(p,root):
 assert not any(f.is_symlink()for f in p.rglob('*')),'source/evidence symlink'
 manifest=read(p/'manifest.json');actual={str(f.relative_to(p))for f in p.rglob('*')if f.is_file()and f.name!='manifest.json'and'__pycache__'not in f.parts};assert set(manifest)==actual
 for n,h in manifest.items():
  f=p/n;assert not any(a.is_symlink()for a in [f,*f.parents]if a==p or p in a.parents)and not f.is_symlink()and f.resolve().is_relative_to(p.resolve())and sha(f.read_bytes())==h,n
 for n,h in {'tools/admin_checker.py': '1ea9f3e3dc7bce439fa445d4f8a886a5f757526314552c6407223c4c38bdbb7c', 'tools/admin_runner.py': '02c8597c18e704472bcde86485e8784228020bb3e099ab805d4583269e0393db', 'tools/burn_runner.py': 'be7b5c9ab8feed0743ce0c2001081122cbcf9284f49861792e958b8207a61cae', 'tools/global_codec_proof.py': '491f227ace827d2010a083c5007b2ad4476fd0d07fc643fe5a166fe31187b9e1', 'tools/layer01.py': '7be3a56418587fdc05178529428ab18df40a252fbd46431ceb98e9107fe414b1', 'tools/mayhem_sell_differential.py': '99c1dca933d2ca45b7e5cadb7a0c449cc43e91e5bab86eaae22663a23af87ab5', 'tools/mayhem_sell_fixture.py': '6884bdbfb94f6ef98392f5c126193ee68d3d7de1ca5c311c03b21d26abe8d60c', 'tools/pump_trade_fixture.py': '9ee647c928070734fe700929b87d4016f76ec244c873e6f484318b5212aea1e1', 'tools/verify_burn.py': '79320867b5cf335c27268f75723fba5afd5b45789e766eed15493ca3f4604ee0', 'tools/verify_mayhem_sell.py': '45fa02d885815a23a453e5ccf5c1cdb11ddb5b644d889758f0c10380256464bd'}.items():assert sha((p/n).read_bytes())==h,('pinned verifier dependency',n)
 for n,h in read(p/'parents.json').items():assert sha((root/n).read_bytes())==h,n
 assert sha((p/'source-inputs.json').read_bytes())==SOURCE_MAP_SHA

def table_proof(raw,witness):
 # Same bounded constant propagation as the evidence generator, no calls executed.
 for row in witness['all20']:
  value=row['value'];assert row['name_table_cell']==727696+8*value
  lo,ptr=struct.unpack_from('<II',raw,row['name_table_cell']);assert lo==0
  size=struct.unpack_from('<Q',raw,713112+8*value)[0];assert(ptr,size)==(row['name_pointer'],row['name_length'])and raw[ptr:ptr+size].decode()==row['name']
  pc=196096;regs={2:value};path=[]
  while pc!=196872:
   op,r,off,imm=struct.unpack_from('<BBhi',raw,pc);dst=r&15;path.append(dict(pc=pc,raw=raw[pc:pc+8].hex()))
   if op==0x18:regs[dst]=struct.unpack_from('<I',raw,pc+4)[0]+(struct.unpack_from('<I',raw,pc+12)[0]<<32);pc+=16
   elif op==0xb7:regs[dst]=imm;pc+=8
   elif op==0x05:pc+=8+off*8
   elif op in[0x65,0xd5,0x15,0x55]:
    a=regs[dst];take={0x65:a>imm,0xd5:a<=imm,0x15:a==imm,0x55:a!=imm}[op];pc+=8+(off*8 if take else 0)
   else:raise AssertionError((pc,op))
   assert len(path)<50 and 196096<=pc<=196872
  assert path==row['display_dispatch_path']and(regs[2],regs[3])==(row['message_pointer'],row['message_length'])
  assert raw[regs[2]:regs[2]+regs[3]].decode()==row['message']
 assert len(witness['all20'])==20 and sum(r['matches_preexisting_source_anchor']for r in witness['all20'])==16

def verify(p=HERE,root=ROOT,crypto=True):
 p=Path(p);root=Path(root);integrity(p,root)
 maps=read(p/'source-inputs.json');assert len(maps['baseline'])==15 and len(maps['recovered'])==15
 for label,mapping in maps.items():
  source=p/'sources'/label;actual={str(f.relative_to(source))[:-3]:sha(gzip.decompress(f.read_bytes()))for f in source.rglob('*')if f.is_file()and f.suffix=='.gz'};assert all(f.suffix=='.gz'for f in source.rglob('*')if f.is_file());assert actual==mapping
 parent=read(p/'parent.json');assert sha((p/'parent.json').read_bytes())=='cbe122ec2d16ec8d2809f596290a66d92694150b8ab3c01df610f77cff998d05'
 assert sha((p/'parent-source-inputs.json').read_bytes())==parent['source_input_document_sha256']
 assert sha((p/'parent-manifest.json').read_bytes())==parent['manifest_sha256']
 assert read(p/'parent-source-inputs.json')['recovered']==maps['baseline']
 assert parent['decoded_candidate_sha256']==BASE
 changed={n for n in maps['baseline']if maps['baseline'][n]!=maps['recovered'][n]};assert changed=={'src/instructions/buy.rs','src/instructions/buy_pump_swap.rs','src/instructions/buy_v2.rs','src/instructions/sell.rs','src/instructions/sell_pump_swap.rs','src/instructions/sell_v2.rs','src/lib.rs','src/state.rs'}
 assert set(maps['recovered'])==set(maps['baseline'])
 lines=gzip.decompress((p/'sources/recovered/src/instructions/burn.rs.gz').read_bytes()).decode().splitlines();assert [(i+1,l.index('unwrap')+1)for i,l in enumerate(lines)if 'Clock::get().unwrap' in l]==[(77,52),(104,33),(110,33)]
 prior=read(p/'prior-inventory.json.gz');raw=(root/'evidence/original/mayhem/deployed.so').read_bytes();assert sha(raw)==ORIGINAL
 table=read(p/'error-table-recovery.json');table_proof(raw,table)
 lib=gzip.decompress((p/'sources/recovered/src/lib.rs.gz').read_bytes()).decode();enum=re.search(r'#\[error_code\]\s*pub enum MayhemError\s*\{(.*?)\n\}',lib,re.S)[1]
 values=[dict(message=m[1],name=m[2],value=int(m[3]))for m in re.finditer(r'#\[msg\("([^"]+)"\)\]\s*(\w+)\s*=\s*(\d+)\s*,',enum)]
 assert values==[{k:r[k]for k in ['message','name','value']}for r in table['all20']]
 tool=module('error_full_body_parser',p/'tools/layer01.py');O=tool.Elf(root/'evidence/original/mayhem/deployed.so');canonical=lambda n:re.sub(r'17h[0-9a-f]+E$','',n);excluded={canonical(n)for r in prior['candidate_rows']if r['scope']=='opaque'for n in r['names']}
 reports={};new_ids=[94,95,96,97,98,138,139,140,153,156,157,227]
 for label,expected in [('baseline',BASE),('recovered',CANDIDATE)]:
  cb=gzip.decompress((p/f'artifacts/{label}-candidate.so.gz').read_bytes());sb=gzip.decompress((p/f'artifacts/{label}-symbols.so.gz').read_bytes());assert sha(cb)==expected
  if label=='recovered':assert sha(sb)==SYMBOLS
  else:assert sha(sb)=='2e5acc7beed21099fd4154195a93259c9f1e9f17ec18c007faf67b93a9f51ec3'
  with tempfile.TemporaryDirectory()as td:
   cp=Path(td)/'candidate';sp=Path(td)/'symbols';cp.write_bytes(cb);sp.write_bytes(sb);C=tool.Elf(cp);S=tool.Elf(sp)
   assert C.b[C.lo:C.hi]==S.b[S.lo:S.hi];groups={}
   for symbol in S.symbols:
    if symbol['info']&15==2 and symbol['size']>=8 and S.lo<=symbol['value']<S.hi:groups.setdefault((symbol['value'],symbol['value']+symbol['size']),set()).add(symbol['name'])
   candidates=[]
   for (start,end),names in sorted(groups.items()):
    if {canonical(n)for n in names}&excluded or any('initializemayhemstate'in n.lower()or'initialize_mayhem_state'in n.lower()for n in names):continue
    candidates.append(C.window(start,end))
   matched=[];rawmatched=[];extra={}
   for idx,row in enumerate(prior['original_rows']):
    if row['scope']=='opaque'and idx not in new_ids:continue
    original=O.window(row['start'],row['end']);matches=[c for c in candidates if c['end']-c['start']==row['end']-row['start']and c['normalized_sha256']==original['normalized_sha256']and c['normalization_pattern']==original['normalization_pattern']]
    if idx in new_ids:extra[row['id']]=[dict(start=c['start'],end=c['end'],raw_equal=c['raw_sha256']==original['raw_sha256'])for c in matches]
    else:
     if matches:matched.append(row['id'])
     if any(c['raw_sha256']==original['raw_sha256']for c in matches):rawmatched.append(row['id'])
   assert len(matched)==177 and len(rawmatched)==46 and 'O0071'not in matched
   literal_hashes={sha(cb[a:b])for a,b in groups}
   literal=[row['id']for row in prior['original_rows']if row['raw_sha256']in literal_hashes]
   opaque_literal=[row['id']for row in prior['original_rows']if row['scope']=='opaque'and row['raw_sha256']in literal_hashes]
   assert len(literal)==58 and opaque_literal==['O0234','O0261','O0269','O0321','O0335','O0361','O0366','O0384','O0386','O0437','O0438','O0439']
   reports[label]=dict(matched=matched,raw=rawmatched,new=extra,literal=literal,opaque_literal=opaque_literal)
  result=read(p/f'builds/{label}/result.json');command=read(p/f'builds/{label}/command.json');assert result['returncode']==0 and result['source_unchanged']and result['candidate_sha256']==expected
  assert read(p/f'builds/{label}/source-before.json')==maps[label]
  assert sha(gzip.decompress((p/f'builds/{label}/stderr.gz').read_bytes()))==result['stderr_sha256']
  assert command['command'][1]in['build','rustc']and all(x in command['command']for x in ['--locked','--offline','--target','sbpf-solana-solana'])
 assert reports['baseline']['matched']==reports['recovered']['matched']and reports['baseline']['raw']==reports['recovered']['raw']
 assert not any(reports['baseline']['new'][f'O{i:04}']for i in[94,95,138,139,140])
 assert all(reports['baseline']['new'][f'O{i:04}']for i in[96,97,98,153,156,157,227])
 assert not reports['recovered']['new']['O0095'],'O0095 must remain unmatched'
 assert all(reports['recovered']['new'][f'O{i:04}']for i in new_ids if i!=95),'new helper full-body mismatch'
 assert reports['baseline']['new']['O0227']
 assert reports['baseline']['literal']==reports['recovered']['literal']
 receipt=read(p/'runtime/comparison.json.gz');assert receipt['case_count']==3 and receipt['signed_transactions']==12 and not receipt['mismatches']and receipt['inputs_unchanged']
 for c in receipt['cases']:
  assert c['candidate']['binary_sha256']==CANDIDATE and c['original']['binary_sha256']==ORIGINAL
  assert not c['different_fields']
  assert c['original']['logs_without_compute_numbers']==c['candidate']['logs_without_compute_numbers']
  assert c['original']['sequential_second']['logs_without_compute_numbers']==c['candidate']['sequential_second']['logs_without_compute_numbers']
 if crypto:
  verifier=module('saved_error_runtime_checker',p/'tools/verify_burn.py')
  with tempfile.TemporaryDirectory()as td:
   temp=Path(td);out=temp/'receipts';out.mkdir()
   for f in(p/'runtime').glob('*.gz'):(out/f.name[:-3]).write_bytes(gzip.decompress(f.read_bytes()))
   for n,digest in receipt['input_sha256'].items():
    if n.startswith('fixtures:'):continue
    dest=temp/n;dest.parent.mkdir(parents=True,exist_ok=True)
    if digest==CANDIDATE:data=gzip.decompress((p/'artifacts/recovered-candidate.so.gz').read_bytes())
    else:data=(root/n).read_bytes()
    assert sha(data)==digest;dest.write_bytes(data)
   f=temp/'scripts/mayhem_burn_sequence.py';f.parent.mkdir(exist_ok=True);f.write_bytes((p/'tools/burn_runner.py').read_bytes())
   verifier.REPO=temp;previous=sys.argv;sys.argv=['verify_burn','--fixtures',str(root/'repro/mayhem/compiler-v154-runtime/control/burn-fixtures'),'--receipts',str(out)]
   try:
    with contextlib.redirect_stdout(io.StringIO()):verifier.main()
   finally:sys.argv=previous
   checked=read(out/'verification.json');assert checked['success']and checked['verified_transactions']==12
 # Bind exact IDL projection and full three-function admission evidence.
 upstream=read(root/'evidence/upstream/pump.json');sell=next(x for x in upstream['instructions']if x['name']=='sell')
 projection=read(p/'sources/recovered/idls/pump.json.gz');assert projection=={**{k:upstream[k]for k in ['address','metadata']},'instructions':[sell]}
 assert len(sell['accounts'])==14 and sell['discriminator']==[51,230,133,164,1,127,131,173]
 closure=read(p/'legacy-sell-cpi-audit.json.gz');assert closure['original_sha256']==ORIGINAL
 assert [(x['original_id'],x['start'],x['end'])for x in closure['windows']]==[('O0153',457152,461432),('O0156',469352,472448),('O0157',472448,476328)]
 for window in closure['windows']:
  assert O.window(window['start'],window['end'])==window['body']
 for i,meta in enumerate(closure['account_metas']):
  account=sell['accounts'][i];op,register,offset,value=struct.unpack_from('<BBhi',raw,meta['instruction_pc'])
  assert op==0x6a and register==1 and offset==32+34*i and value==int(account.get('signer',False))+256*int(account.get('writable',False))
  assert meta['field']==account['name'] and meta['account_info_offset']==48*i
 # Preserve the typed helper's actual edges to its verified metas/infos bodies.
 body=O.window(457152,461432);new=reports['recovered']['new']['O0153'][0];candidate_body=C.window(new['start'],new['end'])
 edges={469352:reports['recovered']['new']['O0156'][0]['start'],472448:reports['recovered']['new']['O0157'][0]['start']}
 for original_call,candidate_call in zip(body['direct'],candidate_body['direct']):
  if original_call['target']in edges:assert candidate_call['target']==edges[original_call['target']]
 assert len(closure['account_metas'])==14
 assert [struct.unpack_from('<BBhi',raw,pc)[2]for pc in range(469352,472448,8)if raw[pc]==0x79 and raw[pc+1]>>4==7]==[48*i for i in range(14)]
 sellraw=gzip.decompress((p/'runtime/sell.json.gz').read_bytes());assert sha(sellraw)=='1a0a5a6d10eefcc6428a2a19a240cb24f481010295ad225ddbfd3038e6e9fcb5'
 sellreceipt=json.loads(sellraw);assert sellreceipt['candidate_sha256']==CANDIDATE and sellreceipt['original_sha256']==ORIGINAL
 assert sellreceipt['case_count']==396 and sellreceipt['signed_transactions']==792 and sellreceipt['successful_original_cases']==134 and not sellreceipt['mismatches']
 assert sellreceipt['normalized_log_differences']==['interval_overflow','retained10001','retained65535','quote_extreme_1_0_1']
 if crypto:
  sellverifier=module('saved_sell_runtime_checker',p/'tools/verify_mayhem_sell.py');sellverifier.ROOT=root
  with tempfile.TemporaryDirectory()as td:
   temp=Path(td);candidate=temp/'candidate.so';candidate.write_bytes(gzip.decompress((p/'artifacts/recovered-candidate.so.gz').read_bytes()));saved=temp/'sell.json';saved.write_bytes(sellraw);output=temp/'verified.json'
   previous=sys.argv;sys.argv=['verify_sell','--receipts',str(saved),'--candidate',str(candidate),'--output',str(output)]
   try:
    with contextlib.redirect_stdout(io.StringIO()):sellverifier.main()
   finally:sys.argv=previous
   checked=read(output);assert checked['verified_signed_transactions']==792 and checked['successful_cases']==134 and checked['rejection_cases']==262 and not checked['mismatches']
 # Fresh original-byte serializer proof; source map pins all26 declarations.
 codec=module('scalar_global_codec_proof',p/'tools/global_codec_proof.py')
 proof=read(p/'global-params-serializer-proof.json.gz');assert codec.prove(raw)==proof['success_path_writes']
 assert O.window(421840,423672)==proof['body']
 layout=read(p/'global-params-field-layout-proposal.json.gz');declaration='\n'.join(state_line for state_line in gzip.decompress((p/'sources/recovered/src/state.rs.gz').read_bytes()).decode().splitlines())
 block=re.search(r'pub struct GlobalParams \{(.*?)\n\}',declaration,re.S)[1];declared=re.findall(r'pub (\w+): (\w+),',block)
 assert declared==[(x['name'],x['type'])for x in layout] and len(layout)==26
 widths={'u8':1,'bool':1,'u32':4,'u64':8,'i128':16,'Pubkey':32}
 assert [(x['name'],x['serialized_offset'],x['original_object_offset'],widths[x['type']])for x in layout]==[(x['field'],x['serialized_offset'],x['object_offset'],x['width'])for x in proof['success_path_writes'][1:]]
 for idx,start,end in [(139,423672,424672),(140,424672,427120)]:assert O.window(start,end)==read(p/f'global-params-original-{idx}.json.gz')
 validation=read(p/'legacy-sell-validation-audit.json.gz')
 assert [(r['original_id'],r['start'],r['end'])for r in validation['new_static_admission']]==[('O0094',187672,188864),('O0095',188864,190160)]
 for row in validation['new_static_admission']:assert O.window(row['start'],row['end'])==row['body']
 state=gzip.decompress((p/'sources/recovered/src/state.rs.gz').read_bytes()).decode().splitlines()
 assert state[11]=='#[account]' and [(i+1,l.index('unwrap')+1)for i,l in enumerate(state)if 'Clock::get().unwrap' in l]==[(558,41)]
 admin=read(p/'runtime/admin.json.gz');assert sha((p/'runtime/admin.json.gz').read_bytes())=='88be0bf4f1c4d202c9b443cf79687e3d11eab7b242edb4d21d0d26b2adbcb79b'
 assert admin['candidate_sha256']==CANDIDATE and admin['original_sha256']==ORIGINAL and admin['case_count']==1032 and admin['signed_transactions']==2064 and not admin['mismatches']
 assert all(r['case']['op']!='initialize_global_params'for r in admin['cases'])
 if crypto:
  admincheck=module('saved_scalar_admin_checker',p/'tools/admin_checker.py');checked=admincheck.verify(p/'runtime/admin.json.gz')
  assert checked['verified_signed_transactions']==2064 and checked['successful_account_bytes_rederived']==624 and not checked['mismatches']
 return dict(historical_admitted=184,historical_matched=177,admitted_raw=46,all_row_raw=58,opaque_literal_raw=12,parent_admitted=191,parent_matched=184,parent_opaque=250,new_source_matches=[94,138,139,140],retained_parent_source_matches=[96,97,98,153,156,157],already_matching_new_admission=[227],examined_unmatched=[95],expanded_admitted=196,expanded_matched=188,expanded_opaque=245,remaining_admitted_unmatched=8,burn_still_unmatched=True,legacy_sell_still_unmatched=True,signed_transactions_verified=2868 if crypto else 0,sell_signed_transactions=792 if crypto else 0,burn_signed_transactions=12 if crypto else 0,admin_signed_transactions=2064 if crypto else 0,sell_log_difference_cases=sellreceipt['normalized_log_differences'],whole_elf_equal=False,canonical_promoted=False)
if __name__=='__main__':print(json.dumps(verify(),indent=2))
