#!/usr/bin/env python3
"""Verify the shared-holder destination guard and same-operation Source records."""
from pathlib import Path
import sys,json,gzip,hashlib,tarfile,tempfile,difflib,base64,tomllib,re
P=Path(__file__).resolve().parent;R=next(p for p in P.parents if(p/'evidence/original/pump/deployed.so').is_file())
sys.dont_write_bytecode=True;sys.path.insert(0,str(P/'tools'));sys.path.insert(0,str(R/'scripts'));import measure
from solders.transaction import Transaction
sha=lambda b:hashlib.sha256(b).hexdigest()
read=lambda p:json.loads(gzip.decompress(p.read_bytes())if p.suffix=='.gz'else p.read_bytes())
def tarfiles(p):
 with tarfile.open(p)as tar:
  out={}
  for m in tar:
   assert m.isfile()and not Path(m.name).is_absolute()and'..'not in Path(m.name).parts
   out[m.name]=tar.extractfile(m).read()
  return out

def main():
 manifest=read(P/'MANIFEST.json');actual={str(p.relative_to(P))for p in P.rglob('*')if p.is_file()and'__pycache__'not in p.parts};assert actual==set(manifest)|{'MANIFEST.json'};assert all(sha((P/k).read_bytes())==v for k,v in manifest.items())
 prov=read(P/'PROVENANCE.json');res=read(P/'RESULT.json');bind=read(P/'ARTIFACT-BINDING.json');rec=read(P/'build-record.json');ctrl=read(P/'control/build-record.json');src=tarfiles(P/'source.tar.gz');oldsrc=tarfiles(P/'control/source.tar.gz')
 assert rec['returncode']==0 and rec['source_unchanged']and rec['target_libraries_unchanged'];assert{p:sha(b)for p,b in src.items()}==rec['source_sha256'];assert sha((P/'tools/recorded-build.py').read_bytes())==rec['builder_sha256']
 assert ctrl['returncode']==0 and ctrl['source_unchanged']and ctrl['target_libraries_unchanged'];oldbind=read(P/'control/ARTIFACT-BINDING.json');assert oldbind['candidate_sha256']==prov['control_candidate_sha256']and oldbind['unstripped_sha256']==prov['control_unstripped_sha256'];assert oldbind['build_record_sha256']==sha((P/'control/build-record.json').read_bytes())and oldbind['source_archive_sha256']==sha((P/'control/source.tar.gz').read_bytes());assert ctrl['tool_sha256']==rec['tool_sha256']and ctrl['target_libraries_sha256']==rec['target_libraries_sha256']
 assert bind['build_record_sha256']==sha((P/'build-record.json').read_bytes())and bind['source_archive_sha256']==sha((P/'source.tar.gz').read_bytes())and bind['control_compiler_receipt_sha256']==sha((P/'control/build-record.json').read_bytes())and bind['control_source_archive_sha256']==sha((P/'control/source.tar.gz').read_bytes())
 assert bind['candidate_sha256']==res['candidate_sha256']and bind['unstripped_sha256']==res['unstripped_sha256']
 assert{p:sha(b)for p,b in oldsrc.items()}==ctrl['source_sha256']
 assert set(src)==set(oldsrc)
 for name in['Cargo.toml','programs/pump/Cargo.toml']:assert tomllib.loads(src[name].decode())==tomllib.loads(oldsrc[name].decode())
 rel=prov['changed_source'];changed=[p for p in sorted(src)if src[p]!=oldsrc[p]and p not in['Cargo.toml','programs/pump/Cargo.toml']];assert changed==[rel];assert src[rel]==(P/'source'/rel).read_bytes();patch=''.join(difflib.unified_diff(oldsrc[rel].decode().splitlines(keepends=True),src[rel].decode().splitlines(keepends=True),'a/'+rel,'b/'+rel));assert patch==(P/'source.patch').read_text()
 assert sha((R/'evidence/original/pump/deployed.so').read_bytes())==prov['original_sha256']
 with tempfile.TemporaryDirectory()as tmp:
  paths={}
  for name in['candidate.so','unstripped.so','control/candidate.so','control/unstripped.so']:
   p=Path(tmp)/name.replace('/','-');p.write_bytes(gzip.decompress((P/(name+'.gz')).read_bytes()));paths[name]=p
  assert sha(paths['candidate.so'].read_bytes())==res['candidate_sha256']and sha(paths['unstripped.so'].read_bytes())==res['unstripped_sha256'];assert sha(paths['control/candidate.so'].read_bytes())==prov['control_candidate_sha256']and sha(paths['control/unstripped.so'].read_bytes())==prov['control_unstripped_sha256']
  new=measure.census(paths['unstripped.so']);old=measure.census(paths['control/unstripped.so']);assert new==read(P/'inventory.json.gz')and old==read(P/'control/inventory.json.gz');assert new['counts']==old['counts']==res['counts'];assert new['counts']['normalized']==1018 and new['counts']['raw']==166
  for predicate in[lambda r:bool(r['normalized_matches']),lambda r:r['raw_match']]:assert{r['start']for r in new['windows']if predicate(r)}=={r['start']for r in old['windows']if predicate(r)}
  assert res['gains']==res['losses']==res['raw_gains']==res['raw_losses']==[]
 sites=read(P/'SOURCE-RECORDS.json');assert sites['control_source_sha256']==sha(oldsrc[rel])and sites['candidate_source_sha256']==sha(src[rel])and sites['patch_sha256']==sha((P/'source.patch').read_bytes())
 errors=lambda data:{name:[data[:m.start()].count('\n')+1 for m in re.finditer(r'(?:PumpError|ErrorCode)::'+name+r'\b',data)]for name in set(re.findall(r'(?:PumpError|ErrorCode)::(\w+)',data))}
 olderrors=errors(oldsrc[rel].decode());newerrors=errors(src[rel].decode());assert set(olderrors)==set(newerrors)
 for name,positions in olderrors.items():
  if name=='CtoSharedVaultFrozen':assert positions==[413,557]and newerrors[name]==[660,719]
  else:assert positions==newerrors[name]
 text=src[rel].decode();assert 'if shared && holder{'in text and 'if shared && holder && amount>0{'not in text
 assert text.index('if shared && holder{')<text.index('let dest=Pubkey::find_program_address')<text.index('let shared_amm_frozen=')<text.index('let amount=if native{')<text.index('if amount>0{')
 assert text.splitlines()[647].count('ConstraintSeeds')==1
 focused=read(P/'focused.json.gz');assert focused['candidate_sha256']==res['candidate_sha256']and focused['baseline_sha256']==prov['control_candidate_sha256']and focused['case_count']==12 and focused['signature_verifications']==36 and not focused['mismatches'];assert focused['producer_sha256']==sha((P/'tools/focused.py').read_bytes())
 assert len(focused['baseline_mismatches'])==9
 logs=lambda r:[s for s in r['logs']if s.startswith('Program log: ')or s.startswith('Program data: ')]
 for row in focused['cases']:
  for name in['original','baseline','candidate']:
   r=row[name];Transaction.from_bytes(base64.b64decode(r['transaction_base64'])).verify();assert r['signatures_verified']and not r['pool_authority_top_level_signer']
  for key in['error','before','after','events','inner','return']:assert row['original'][key]==row['candidate'][key]
  assert logs(row['original'])==logs(row['candidate'])and row['differences']['candidate']==[]
  line=row['original_error_source_line']
  if line:assert any(f"admin_cto.rs:{line}."in s for s in row['original']['logs'])
  else:assert row['original']['error']is None
  if row['case']['name'].startswith('empty-wrong-holder-'):
   assert row['baseline']['error']is None and '2006'in row['original']['error']
  elif row['case']['name'].startswith('wrong-holder-positive-frozen-'):
   assert '6093'in row['baseline']['error']and '2006'in row['original']['error']
  elif row['case']['name'].startswith('positive-frozen-'):
   oldline=413 if line==660 else 557
   assert any(f"admin_cto.rs:{oldline}."in s for s in row['baseline']['logs'])
 assert sha(focused['fixture_input_adapter_source'].encode())==focused['fixture_input_adapter_sha256']
 corpus=read(P/'admin.json.gz');assert corpus['candidate_sha256']==res['candidate_sha256']and corpus['case_count']==363 and not corpus['mismatches']
 for row in corpus['cases']:
  for name in['original','candidate']:
   r=row[name];Transaction.from_bytes(base64.b64decode(r['transaction_base64'])).verify();assert r['signatures_verified']and not r['pool_authority_top_level_signer']
  for key in['error','before','after','events','inner','return']:assert row['original'][key]==row['candidate'][key]
  assert row['match']and logs(row['original'])==logs(row['candidate'])
 ordered=read(P/'ordered-logs.json');assert ordered['case_count']==363 and ordered['mismatches']==[]
 for name,hashes in[('focused',{res['candidate_sha256'],prov['original_sha256'],prov['control_candidate_sha256']}),('admin',{res['candidate_sha256'],prov['original_sha256']})]:
  loader=read(P/(name+'.loader.json.gz'));assert{r['elf_sha256']for r in loader['loads']}==hashes;assert all(r['elf_prefix_unchanged']and r['zero_allocation_tail']and r['program_bytes']==36 and r['programdata_bytes']==10485760 for r in loader['loads'])
 clean=read(P/'clean-record.json');assert clean['returncode']==0 and bind['clean_record_sha256']==sha((P/'clean-record.json').read_bytes())
 for flag in['--manifest-path','--release','--target','sbpf-solana-solana','--offline','pump-recovered','pump-token-ext']:assert flag in clean['command']
 for name in['build.log.gz','control/build.log.gz']:
  log=gzip.decompress((P/name).read_bytes()).decode()
  for package in['pump-recovered','pump-token-ext']:assert 'Compiling '+package in log
 # Decode the original instructions anew; no executable bytes are manufactured.
 import struct
 cfg=read(P/'ORIGINAL-CFG.json');original=(R/'evidence/original/pump/deployed.so').read_bytes();raw=measure.body(original,measure.sections(original),0x22a10,27400)
 assert cfg['original_sha256']==sha(original)
 for row in cfg['instructions']:
  off=int(row['offset'],16);op,rs,br,imm=struct.unpack_from('<BBhi',raw,off)
  assert (op,rs&15,rs>>4,br,imm)==(int(row['opcode'],16),row['dst'],row['src'],row['branch_offset'],row['immediate'])
  if op==0x85:assert row['target']==hex(0x22a10+off+8+imm*8)
  elif op&7==5:assert row['branch_target_offset']==hex(off+8+br*8)
 for stem,count in [('admin-shared-frozen-probe',2),('admin-shared-guard-priority',3)]:
  triage=read(P/('pr569-'+stem+'.json.gz'));assert len(triage['cases'])==count and triage['original_sha256']==prov['original_sha256']and triage['candidate_sha256']==prov['root_pr569_candidate_sha256']and triage['producer_sha256']==sha((P/'tools'/(stem+'.py')).read_bytes())
  for row in triage['cases']:
   for name in ['original','candidate']:
    r=row[name];Transaction.from_bytes(base64.b64decode(r['transaction_base64'])).verify();assert r['signatures_verified']and not r['pool_authority_top_level_signer']
  loader=read(P/('pr569-'+stem+'.loader.json.gz'));assert{r['elf_sha256']for r in loader['loads']}=={prov['original_sha256'],prov['root_pr569_candidate_sha256']}
  assert all(r['elf_prefix_unchanged']and r['zero_allocation_tail']and r['program_bytes']==36 and r['programdata_bytes']==10485760 for r in loader['loads'])
 print(json.dumps({'verified':True,'normalized':1018,'raw':166,'all_normalized_and_raw_matches_preserved':True,'new_window_gain':False,'original_destination_guard_restored':True,'corrected_frozen_source_records':2,'focused_cases':12,'verified_focused_signatures':36,'admin_corpus_cases':363,'ordered_program_message_mismatches':0,'whole_elf_identity':False},indent=2))
if __name__=='__main__':main()
