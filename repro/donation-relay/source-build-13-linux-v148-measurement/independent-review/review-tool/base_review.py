"""Read-only review of a FUTURE publication packet; never measure or execute."""
from pathlib import Path
import argparse,gzip,hashlib,importlib.util,json,re,shlex,struct,tomllib,sys
sys.dont_write_bytecode=True
SCRIPT='445bc1298834758770c5d145d7dc75811a76627f963857b8e7a6bb3ae457bfbd'
SELECTED='repro/donation-relay/source-build-13-typed-borrow-owned'
SELECTED_SEAL='1d323ea804581e676204a93cfa6277737243d831a91d9b6dacd4a2448067e4d5'
SELECTED_MAP='1280f565c857ceb4d23d2bd909e3720bbd723d19a4fef981e8f594abf83aa445'
OLD='repro/donation-relay/source-build-12-idl-discriminator-owned'
MAC='repro/donation-relay/source-build-12-v148-measurement'
PINS={'old_manifest':'d12ad064c15a5e1760f6a566349f982b9e4e4e57430b455a0386b89a4a57248a','map':'3b3f75fb4617075552f2d07e02b5dc2a9b53221eb35118f87ed44ac45f74b943','registry':'635ef97159e65f2f9098fb561424aa25e37806dc49e71e89bf2b7d46475ff5fc','method':'095fc2d63be0fe4233bdf4e5946cac8d03d9b1747fd39147eea9a98c12dda175','elf':'79deec70c7e2751cd5e3733566ca4fcca9666268b2cb056a447118cadb80b4ed','windows':'bbe3bb0f5003d457266e0a279c052026306100df316cbd344919cc2da13bc2cc','target':'367f07a62e3f74d358187d175cf3228848e81a56c781a9a75b9df7fed1268563','darwin':'6c32f830015bc52a890264041c20c74441db651d8f6efd6558d8fa13adec1783'}
H=lambda b:hashlib.sha256(b).hexdigest()
J=lambda p:json.loads(p.read_text())
def load(path,name):
 spec=importlib.util.spec_from_file_location(name,path);module=importlib.util.module_from_spec(spec);spec.loader.exec_module(module);return module

def classify(result):
 if result.get('compile_returncode')not in[None,0]:return'COMPILER_PROCESS_FAILED'
 if result.get('compile_returncode')==0 and result.get('strip_returncode')not in[None,0]:return'STRIP_PROCESS_FAILED'
 if result.get('error_type'):
  return'POST_COMPILE_ANALYSIS_OR_AFTERCHECK_FAILED'if result.get('compile_returncode')==0 else'SETUP_OR_FETCH_FAILED'
 if result.get('backend_diagnostics'):return'BACKEND_DIAGNOSTICS_PRESENT'
 if result.get('state')=='MEASURED':return'MEASURED_REQUIRES_STATIC_RECOMPUTATION'
 return'INCOMPLETE_OR_SETUP_ONLY'

def inventory(packet):
 expected=J(packet/'manifest.json');actual={}
 for p in packet.rglob('*'):
  assert not p.is_symlink()and p.name!='__pycache__'and p.suffix!='.pyc'
  if p.is_file()and p!=packet/'manifest.json':actual[str(p.relative_to(packet))]=H(p.read_bytes())
 assert actual==expected,'publication payload inventory differs'
 assert H((packet/'measurement-script.py').read_bytes())==SCRIPT

def check_registry(record,sealed,lock):
 approved={r['name']+'-'+r['version']:r for r in sealed};packages={r['name']+'-'+r['version']:r for r in lock['package']if r.get('source')};assert len(approved)==len(packages)==record['registry_roots']==232 and record['source_files']==7607
 rows={r['package']:r for r in record['packages']};assert set(rows)==set(approved)==set(packages)
 for name,a in approved.items():
  p=packages[name];r=rows[name];assert p['source']=='registry+https://github.com/rust-lang/crates.io-index';assert r['archive_sha256']==p['checksum']==a['archive_sha256'];assert r['verified_source_files']==len(a['files']);assert r['archive_member_hash_inventory_sha256']==H(json.dumps(a['files'],sort_keys=True,separators=(',',':')).encode());assert set(r['cargo_markers'])<={'.cargo-ok','.cargo-checksum.json'}
 assert sum(r['verified_source_files']for r in rows.values())==7607

def elf_header(raw):
 h=struct.unpack_from('<16sHHIQQQIHHHHHH',raw);assert h[0][:6]==b'\x7fELF\x02\x01';return dict(class_bits=64,endian='little',e_type=h[1],e_machine=h[2],e_flags=h[7],bytes=len(raw),sha256=H(raw))

def recompute_static(repo,packet):
 mac=repo/MAC;target=repo/'evidence/dependencies/donation_relay/deployed.so';candidate=packet/'build-01/candidate.so';symbols=packet/'build-01/unstripped.so';darwin=mac/'build-01/candidate.so'
 for path,pin in[(target,PINS['target']),(darwin,PINS['darwin']),(mac/'reference-build12-analyze.py',PINS['method']),(mac/'match_helpers.py',PINS['elf']),(mac/'original-windows.json',PINS['windows'])]:assert H(path.read_bytes())==pin,str(path)
 method=load(mac/'reference-build12-analyze.py','independent_saved_full_ledger')
 class Inputs:
  def __truediv__(self,name):return{'original.so':target,'candidate.so':candidate,'unstripped.so':symbols,'original-windows.json':mac/'original-windows.json'}[name]
 ledger=method.analyze(Inputs())
 for name,value in ledger.items():
  saved=(packet/'full-ledger'/name).read_bytes();saved=gzip.decompress(saved)if name.endswith('.gz')else saved;assert saved==method.encode(value),'full ledger differs: '+name
 elf=load(mac/'match_helpers.py','independent_saved_elf');c,o,u=elf.Elf(candidate),elf.Elf(target),elf.Elf(symbols);assert c.b[c.lo:c.hi]==u.b[u.lo:u.hi]and c.relocations==u.relocations
 originals={r['start']:r for r in ledger['original-function-ledger.json']};candidates={r['start']:r for r in ledger['candidate-function-ledger.json']};witnesses={(r['original_ordinal'],r['candidate_index']):r for r in ledger['match-witnesses.json']};report=J(packet/'static-comparison.json');observed={r['start']:r for r in report['driftsort']};rows=[]
 for f in u.funcs:
  if'driftsort_main'not in f['name']or f['size']!=608:continue
  start=f['start'];equal=c.normalized[start:start+608]==o.normalized[36192:36800]and c.pattern(start,608)==o.pattern(36192,608);saved=observed.pop(start);assert saved['original608_instruction_relocation_match']==equal;assert saved['raw_equal_original']==(c.b[start:start+608]==o.b[36192:36800]);assert saved['entry_bounded']==(start in c.entries and next((e for e in c.entries if e>start),None)==start+608)
  row=dict(start=start,bytes=608,full_instruction_relocation_equal=equal)
  if equal:
   a,b=originals[36192],candidates[start];parent=witnesses[(a['ordinal'],b['index'])];assert parent['recursive_call_shape_closed']and[a['original']['offset']for a in parent['direct_calls']]==[160,560,600];closed=[]
   for edge in parent['direct_calls']:
    k=edge['original']['offset'];ot=o.calls[36192+k];ct=c.calls[start+k];assert ot=={160:752688,560:36800,600:712224}[k]==edge['original']['target']and ct==edge['candidate']['target'];a,b=originals[ot],candidates[ct];assert edge['target_pair']==[a['ordinal'],b['index']];assert edge['normalized_body_pair']and edge['recursive_call_shape_closed'];assert a['bytes']==b['bytes']and next(e for e in o.entries if e>ot)==a['end']==ot+a['bytes'];assert any(s['start']==ct and s['size']==b['bytes']for s in u.funcs);assert c.normalized[ct:ct+b['bytes']]==o.normalized[ot:ot+a['bytes']]and c.pattern(ct,b['bytes'])==o.pattern(ot,a['bytes']);child=witnesses[(a['ordinal'],b['index'])];assert child['recursive_call_shape_closed']
    for call in child['direct_calls']:
     n=call['original']['offset'];assert o.calls[ot+n]==call['original']['target']and c.calls[ct+n]==call['candidate']['target'];assert call['normalized_body_pair']and call['recursive_call_shape_closed']
    closed.append(dict(offset=k,original_target=ot,candidate_target=ct,complete_bytes=a['bytes']))
   assert len(saved['actual_three_edge_closure'])==3
   for fresh,old in zip(closed,saved['actual_three_edge_closure']):assert all(old[k if k!='offset'else'body_offset']==v for k,v in fresh.items())
   pc=start+584;assert c.b[pc]==0x18 and c.relocations[pc]=={'type':8,'symbol':''};ptr=struct.unpack_from('<I',c.b,pc+4)[0]|struct.unpack_from('<I',c.b,pc+12)[0]<<32;v,n,line,col=struct.unpack_from('<QQII',c.b,ptr);pathstart=v>>32;assert 0<=pathstart<=len(c.b)and n<=len(c.b)-pathstart;path=c.b[pathstart:pathstart+n];d=saved['bounded_descriptor_prefix'];assert d==dict(file_offset=ptr,prefix_bytes=24,prefix_hex=c.b[ptr:ptr+24].hex(),path_hex=path.hex(),path_utf8=path.decode('utf-8',errors='backslashreplace'),path_bytes=n,line=line,column=col,full_object_extent_proven=False,historical_os_unique=False)
   for anchor in saved.get('descriptor_pointer_flow',{}).get('anchors',[]):
    at=anchor['pc'];assert anchor['raw']==c.b[at:at+(16 if c.b[at]==0x18 else 8)].hex();assert anchor['call_target']==c.calls.get(at)and anchor['relocation']==c.relocations.get(at)
   ins=lambda at:struct.unpack_from('<BBhi',c.b,at)
   try:
    handle=c.calls[start+600];assert ins(handle)==(0x55,1,2,0)and ins(handle+8)==(0xbf,0x31,0,0);capacity=c.calls[handle+16];assert ins(capacity)==(0xbf,0x12,0,0);panic=c.calls[capacity+80];assert ins(panic)==(0x7b,0x2a,-16,0)and ins(panic+32)==(7,1,0,-24);unwind=c.calls[panic+40];pal=c.calls[unwind];assert c.relocations[pal]=={'type':10,'symbol':'custom_panic'};flow=True
   except(AssertionError,KeyError):flow=False
   assert saved['descriptor_pointer_flow']['checked_to_external_custom_panic']==flow
   multiply=saved['named_multiply_edge'];wrapper=c.calls[start+160];callee=c.calls[wrapper+24]
   mulmatch=c.normalized[wrapper:wrapper+72]==o.normalized[752688:752760]and c.pattern(wrapper,72)==o.pattern(752688,72)and c.b[callee:callee+352]==o.b[751104:751456]and any(s['start']==wrapper and s['size']==72 and s['name']=='__multi3'for s in u.funcs)and any(s['start']==callee and s['size']==352 for s in u.funcs)and wrapper in c.entries and callee in c.entries and 752688 in o.entries and next(e for e in o.entries if e>752688)==752760 and 751104 in o.entries and next(e for e in o.entries if e>751104)==751456
   assert multiply['checked']==mulmatch
   if mulmatch:assert multiply['wrapper']==wrapper and multiply['callee']==callee
   row.update(actual_three_edges=closed,descriptor_path_hex=path.hex(),descriptor_path_bytes=n,descriptor_full_extent_proven=False,multiply_actual_raw_leaf_match=mulmatch)
  rows.append(row)
 assert not observed
 raw=candidate.read_bytes();orig=target.read_bytes();macraw=darwin.read_bytes();whole=lambda b:dict(equal=raw==b,common_different_bytes=sum(a!=b for a,b in zip(raw,b)),excess_bytes=abs(len(raw)-len(b)),candidate_bytes=len(raw),reference_bytes=len(b));assert report['summary']==ledger['comparison-summary.json'];cmp=report['linux_versus_darwin'];assert cmp['raw_equal']==(raw==macraw)and cmp['linux_sha256']==H(raw)and cmp['darwin_sha256']==H(macraw)and cmp['common_position_different_bytes']==sum(a!=b for a,b in zip(raw,macraw))
 return dict(headers={'candidate':elf_header(raw),'unstripped':elf_header(symbols.read_bytes()),'target':elf_header(orig)},whole_target=whole(orig),whole_darwin=whole(macraw),full_ledger_recomputed=True,summary=ledger['comparison-summary.json'],scratch_rows=rows,limits='No full descriptor/data/indirect/external consumer, runtime ABI or historical uniqueness proof')

def review(repo,packet):
 repo=Path(repo).resolve();packet=Path(packet).resolve();inventory(packet);old=repo/OLD;assert H((old/'manifest.json').read_bytes())==PINS['old_manifest'];assert H((old/'launcher/resolved-source-sha256.json').read_bytes())==PINS['map'];assert H((old/'launcher/resolved-source-archive-equality.json').read_bytes())==PINS['registry'];selected=repo/SELECTED;assert H((selected/'manifest.json').read_bytes())==SELECTED_SEAL;assert H((selected/'source-map.json').read_bytes())==SELECTED_MAP;source=J(selected/'source-map.json');assert {str(f.relative_to(selected/'source')):H(f.read_bytes())for f in(selected/'source').rglob('*')if f.is_file()}==source;sealed=J(old/'launcher/resolved-source-archive-equality.json');assert len(source)==23
 result=J(packet/'result.json');output=dict(classification=classify(result),reported_result=result,measurement_script_sha256=SCRIPT,packet_manifest_sha256=H((packet/'manifest.json').read_bytes()),new_measurements=0,new_target_executions=0,hosted_acceptance_checked=False,missing_evidence=[],attestation_limits=['Official tool/archive and registry cache bytes are not exported; saved hashes/member/cache attestations do not replace independently hashing unavailable bytes.','No v1.48 publisher digest exists; measured SHA is not a publisher-authenticated digest.'])
 assert result['runtime_executions']==0 and result['readiness_or_promotion']is False
 assert J(packet/'source-map.json')==source
 present={str(p.relative_to(packet/'source')):H(p.read_bytes())for p in(packet/'source').rglob('*')if p.is_file()};assert all(source.get(n)==h for n,h in present.items())
 if present!=source:output['missing_evidence'].append('complete source23 snapshot')
 plan=J(packet/'plan.json');assert plan['frozen_source']==source and plan['registry_map_sha256']==PINS['registry']and plan['program_build_attempt_limit']==1 and plan['runtime_or_chain_execution']is False;assert plan['target']=='sbf-solana-solana'and plan['rustflags']=='-Zremap-cwd-prefix='and plan['expected_stock_features']=='+store-imm,+jmp-ext';assert plan['profile']=={'opt-level':3,'panic':'abort','overflow-checks':True,'lto':False,'codegen-units':1}
 assets={'compiler':('v1.48',218636077,254652416,516334851,None),'strip':('v1.52',258591601,310634197,519270959,'sha256:8b3861e93daf085ec12b65c4fac374d9bec4587a3de16871da6b08ab0c1d907e')};acquisitions={}
 for label,(tag,releaseid,assetid,size,digest)in assets.items():
  if not(packet/label/'acquisition.json').is_file():output['missing_evidence'].append(label+' acquisition');continue
  receipt=J(packet/label/'acquisition.json');release=J(packet/label/'release.json');asset=next(a for a in release['assets']if a['id']==assetid);assert release['id']==releaseid;assert receipt['pin']==plan['assets'][label]=={'tag':tag,'release_id':releaseid,'id':assetid,'name':'platform-tools-linux-x86_64.tar.bz2','size':size,'digest':digest};assert asset['size']==size and asset.get('digest')==digest;url='https://github.com/anza-xyz/platform-tools/releases/download/'+tag+'/platform-tools-linux-x86_64.tar.bz2';assert asset['browser_download_url']==receipt['official_url']==url;assert receipt['expected_publisher_digest']==digest and receipt['publisher_digest_available']==(digest is not None)
  if receipt['status']=='ACQUIRED':assert receipt['bytes']==size and receipt['size_match']and receipt['digest_match_or_unavailable'];assert receipt['publisher_digest_verified']==(digest is not None);assert digest is None or digest=='sha256:'+receipt['measured_sha256']
  acquisitions[label]=receipt
 output['acquisitions']=acquisitions;receipts={};logs={}
 for label in['compiler-version','cargo-version','target-cfg','target-spec','target-libdir','strip-version','cargo-fetch','program-build','strip']:
  path=packet/'receipts'/(label+'.json')
  if not path.is_file():continue
  row=J(path);raw=gzip.decompress((packet/'receipts'/(label+'.log.gz')).read_bytes());assert H(raw)==row['log_sha256'];receipts[label]=row;logs[label]=raw
 output['actual_process_receipts']={k:{f:v.get(f)for f in['returncode','process_started','launch_error','command']}for k,v in receipts.items()}
 compile_receipt=receipts.get('program-build');strip_receipt=receipts.get('strip');output['actual_compile_returncode']=compile_receipt.get('returncode')if compile_receipt else None;output['actual_strip_returncode']=strip_receipt.get('returncode')if strip_receipt else None
 if compile_receipt:
  assert result['program_build_attempts']==1 and result['compile_returncode']==compile_receipt['returncode'];assert compile_receipt['environment']['CARGO_NET_OFFLINE']=='true';assert '--offline'in compile_receipt['command']and'--locked'in compile_receipt['command'];raw=logs['program-build'];ansi=re.compile(r'\x1b\[[0-?]*[ -/]*[@-~]');errors=[line for line in raw.decode(errors='replace').splitlines()if ansi.sub('',line).lstrip().startswith('Error:')];output['backend_diagnostic_count']=len(errors);output['backend_diagnostic_lines']=errors
  if(packet/'build-state.json').is_file():
   state=J(packet/'build-state.json');assert state['compile_returncode']==compile_receipt['returncode']and state['backend_diagnostics']==errors and state['source_after_sha256']==source and state['source_unchanged'];assert state['program_build_attempts']==1
  if'backend_diagnostics'in result:assert result['backend_diagnostics']==errors
 if strip_receipt:assert result['strip_returncode']==strip_receipt['returncode'];assert strip_receipt['command'][1:]==['--strip-all',str(Path(plan['output'])/'build-01/unstripped.so'),str(Path(plan['output'])/'build-01/candidate.so')]
 if present==source:
  lock=tomllib.loads((packet/'source/Cargo.lock').read_text());profile=tomllib.loads((packet/'source/Cargo.toml').read_text())['profile']['release'];assert profile=={'panic':'abort','overflow-checks':True,'lto':False,'codegen-units':1}
  for name in['registry-before.json','registry-after.json']:
   if(packet/name).is_file():check_registry(J(packet/name),sealed,lock)
   else:output['missing_evidence'].append(name)
  if(packet/'registry-before.json').is_file()and(packet/'registry-after.json').is_file():assert J(packet/'registry-before.json')==J(packet/'registry-after.json')
 if(packet/'fetch-state.json').is_file():
  fetch=J(packet/'fetch-state.json');assert fetch['source_before_sha256']==fetch['source_after_sha256']==source and fetch['source_unchanged'];assert fetch['returncode']==receipts['cargo-fetch']['returncode']
 if(packet/'tools-after.json').is_file():assert J(packet/'tools-after.json')=={'compiler':J(packet/'compiler-tools.json'),'strip':J(packet/'strip-tools.json')}
 else:output['missing_evidence'].append('tools-after.json')
 if(packet/'capability.json').is_file():
  cap=J(packet/'capability.json');assert cap['spec']['features']=='+store-imm,+jmp-ext'and cap['spec'].get('cpu','generic')=='generic';assert'target_feature="dynamic-frames"'not in cap['cfg'];assert cap['program_compilation_probes']==0
 if(packet/'compiled-log-links.json').is_file():
  links=J(packet/'compiled-log-links.json');raw=logs['program-build'];assert links['log_sha256']==H(raw);commands=[]
  for line in raw.decode(errors='replace').splitlines():
   if'Running `'in line and'/rust/bin/rustc 'in line:commands.append(shlex.split(line.split('Running `',1)[1].removesuffix('`')))
  assert len(commands)==links['rustc_command_count'];roots=[c for c in commands if'--crate-name'in c and c[c.index('--crate-name')+1]=='donation_relay_source_proposal'];assert roots==links['actual_root_commands']
  prefix=re.escape(str(Path(compile_receipt['environment']['CARGO_HOME'])/'registry/src'));used=sorted(set(re.findall(prefix+r'/[^/\s]+/([^/\s]+)/','\n'.join(' '.join(c)for c in commands))));assert used==links['actual_compiled_registry_roots'];approved={r['name']+'-'+r['version']:r for r in sealed};assert all(n in approved for n in used);assert links['actual_compiled_source_files']==sum(len(approved[n]['files'])for n in used)
  if compile_receipt['returncode']==0:
   assert len(roots)==1;root=roots[0];assert root[0]==compile_receipt['environment']['RUSTC']and root[root.index('--target')+1]=='sbf-solana-solana';flags=[root[i+1]for i,x in enumerate(root[:-1])if x=='-C'];assert{'opt-level=3','panic=abort','codegen-units=1','overflow-checks=on'}<=set(flags);assert not any(x.startswith(('lto','target-feature','target-cpu'))for x in flags);assert root.count('-Zremap-cwd-prefix=')==1 and not any(x.startswith('--remap-path-prefix')for x in root)
 if(packet/'static-comparison.json').is_file():output['static_recomputation']=recompute_static(repo,packet)
 elif output['actual_compile_returncode']==0 and output['actual_strip_returncode']==0:output['missing_evidence'].append('static-comparison/full-ledger: compiled+stripped artifact may exist despite post-analysis failure')
 if output['classification']=='MEASURED_REQUIRES_STATIC_RECOMPUTATION':assert not output['missing_evidence']and'static_recomputation'in output
 return output
if __name__=='__main__':
 parser=argparse.ArgumentParser();parser.add_argument('--repo',type=Path,required=True);parser.add_argument('--packet',type=Path,required=True);args=parser.parse_args();print(json.dumps(review(args.repo,args.packet),indent=2))
