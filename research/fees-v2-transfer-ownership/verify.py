"""Verify retained native provenance and finite execution observations offline."""
from pathlib import Path
import difflib,gzip,hashlib,importlib.util,json
HERE=Path(__file__).resolve().parent;ROOT=HERE.parents[1];sha=lambda b:hashlib.sha256(b).hexdigest()
def load(p):return json.loads(gzip.decompress(p.read_bytes()) if p.suffix=='.gz' else p.read_bytes())
def module(n,p):
 s=importlib.util.spec_from_file_location(n,p);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m
def source_scope(a,b):assert a.keys()==b.keys()and {n for n,h in b.items()if h!=a[n]}=={'programs/pump-fees/src/sharing_update.rs'}
def counts(r):
 assert r['gains']==[240088]and not r['losses']and r['positive_edges_preserved']==3656 and r['locations_preserved']==168
 for label,v in r['reports'].items():
  assert v['normalized']==(570 if label=='origins' else 569)and v['unique']==(423 if label=='origins' else 422)and v['unmatched']==(15 if label=='origins' else 16)and v['direct_edges']==(3680 if label=='origins' else 3667)and v['candidate_windows']==593
  assert v['raw']==143 and v['unique_raw']==72 and v['equal_locations']==168 and not v['capture_equal']and not v['extent_equal']
 assert len(r['details']['callees'])==14 and all(x['equal']for x in r['details']['callees'])and sum(x['original']['kind']=='local'for x in r['details']['callees'])==13 and r['details']['system_program_id']=='00'*32
def focused(r,c):
 assert len(r['cases'])==417 and not r['mismatches']and r['candidate_sha256']==c and r['original_sha256']=='4f2955d0f6b40cc9ff7daa18ccad7d19119ba1249759f4e7e3bb691beee6b35e'
 for x in r['cases']:assert x['match']and all(x['original'][k]==x['candidate'][k]for k in ['error','before','after','events','inner','return'])
def main():
 manifest=load(HERE/'manifest.json');assert set(manifest)=={str(p.relative_to(HERE))for p in HERE.rglob('*')if p.is_file()and p.name!='manifest.json'and'__pycache__'not in p.parts}
 for n,h in manifest.items():
  p=HERE/n;assert p.resolve().is_relative_to(HERE)and not p.is_symlink()and sha(p.read_bytes())==h,n
 e=load(HERE/'experiment.json');base=e['variants']['control'];assert load(HERE/'parent-launch.json')['inputs']==base['input_sha256']and base['files']['candidate']['sha256']=='f3b94e2d45443f84ef88bde02eb1d75bd5178b50c994a9ac0a3775188e4fbfbe'and base['files']['symbols']['sha256']=='6d4d4099ec77f9b77c5bdfe0fc81b6e9a1facbdfd9dd55b3754b4ecd3fc0c100'
 sources={};name='programs/pump-fees/src/sharing_update.rs'
 for label,v in e['variants'].items():
  assert len(v['input_sha256'])==43 and v['input_sha256'].keys()==v['source_paths'].keys()
  for n,h in v['input_sha256'].items():assert sha((HERE/v['source_paths'][n]).read_bytes())==h,n
  if label!='control':source_scope(base['input_sha256'],v['input_sha256'])
  sources[label]=(HERE/v['source_paths'][name]).read_text()
  for k,d in v['files'].items():
   b=gzip.decompress((HERE/d['path']).read_bytes());assert sha(b)==d['sha256']and len(b)==d['bytes']
  launch=load(HERE/f'builds/{label}-launch.json');result=load(HERE/f'builds/{label}-result.json');log=(HERE/f'builds/{label}-build.log').read_bytes();assert launch['input_sha256']==result['input_sha256']==v['input_sha256']and result['exit_code']==result['strip_exit_code']==0 and result['source_unchanged'];assert launch['rustc_sha256']=='c8807b7ebede8578ac5a257ea333780f9d89bd356064fd8184af7e996cb71a97'and'sbpf-solana-solana'in launch['command']and sum(x.startswith('--remap-path-prefix=')for x in launch['command'])==3
  assert log.count(b'--crate-name pump_fees_candidate ')==1 and b'Finished `release` profile'in log and b'-Zremap-cwd-prefix='in log;assert v['strip_replay']['exit_code']==0 and v['strip_replay']['sha256']==v['files']['candidate']['sha256']
 for kind in ['candidate','symbols']:assert e['variants']['origins']['files'][kind]['sha256']==e['variants']['repeat']['files'][kind]['sha256']
 assert e['variants']['origins']['input_sha256']==e['variants']['repeat']['input_sha256']and sources['origins']==sources['repeat']
 upstream=load(HERE/'upstream570-reproduction.json');assert upstream['pr']==222 and not upstream['source_differences']and load(HERE/'upstream570-launch.json')['inputs']==e['variants']['origins']['input_sha256']
 portable=load(HERE/'portable/result.json');pl=load(HERE/'portable/launch.json');assert portable['exit_code']==portable['strip_exit_code']==0 and portable['source_unchanged']and pl['input_sha256']==e['variants']['origins']['input_sha256']and pl['tool_sha256']==load(HERE/'sdk-tools.json')
 for kind in ['candidate','symbols']:
  raw=gzip.decompress((HERE/f'portable/{kind}.so.gz').read_bytes());assert sha(raw)==portable['artifacts'][kind]['sha256']==e['variants']['origins']['files'][kind]['sha256']==upstream['artifacts'][kind]['raw_sha256']and len(raw)==portable['artifacts'][kind]['bytes']
 assert (HERE/'portable/build.log').read_bytes().count(b'--crate-name pump_fees_candidate ')==1
 # No source outside the existing call and helper changes; following coordinates are preserved.
 anchor='pub fn v2_transfer_creator_fees_to_pump';a,b=sources['control'],sources['origins'];assert a.split(anchor,1)[1].split('\n}',1)[1]==b.split(anchor,1)[1].split('\n}',1)[1]and a.count('\n')==b.count('\n')
 assert sources['origins']==sources['borrowed'].replace('TransferCreatorFeesToPumpV2 { program: program.clone(), payer: payer.clone(), quote_mint, token_program, system_program, associated_token_program, coin_creator, coin_creator_vault_authority, coin_creator_vault_ata, pump_creator_vault, pump_creator_vault_ata, event_authority }','TransferCreatorFeesToPumpV2 { payer: payer.clone(), quote_mint, token_program, system_program, associated_token_program, coin_creator, coin_creator_vault_authority, coin_creator_vault_ata, pump_creator_vault, pump_creator_vault_ata, event_authority, program: program.clone() }',1)
 patch=''.join(difflib.unified_diff(a.splitlines(True),b.splitlines(True),fromfile='a/'+name,tofile='b/'+name,n=0));assert patch==(HERE/'source.patch').read_text()
 frozen=load(HERE/'harness-sha256.json');assert len(frozen)==187 and set(frozen)=={str(p.relative_to(ROOT))for p in(ROOT/'scripts').glob('*.py')}
 for n,h in frozen.items():assert sha((ROOT/n).read_bytes())==h
 r=module('v2_measured',HERE/'analyze.py').analyze();assert r==load(HERE/'analysis.json.gz');counts(r)
 c=e['variants']['origins']['files']['candidate']['sha256'];o='4f2955d0f6b40cc9ff7daa18ccad7d19119ba1249759f4e7e3bb691beee6b35e';focused(load(HERE/'receipts/origins-sharing.json.gz'),c);signatures=load(HERE/'checks/signatures.json');assert signatures['transaction_records_verified']==1668 and signatures['receipt_sha256']==sha((HERE/'receipts/origins-sharing.json.gz').read_bytes())
 f=load(HERE/'receipts/origins-full.json.gz');assert f['candidate_sha256']==c and f['original_sha256']==o and f['case_count']==17331 and len(f['suites'])==18 and not f['mismatches'];assert all(x['candidate_sha256']==c and x['original_sha256']==o and not x.get('mismatches',x.get('failures',[]))for x in f['suites'].values())
 f=load(HERE/'receipts/origins-flags.json.gz');assert f['candidate_sha256']==c and f['original_sha256']==o and f['case_count']==len(f['cases'])==1542 and not f['failures']and not f['compute_differences']and all(x['original']==x['candidate']for x in f['cases'])
 for name,count in [('precedence',24),('optional',32),('seeds',20),('logs',8),('mint',30),('relay',16)]:
  f=load(HERE/f'receipts/origins-{name}.json.gz');assert f['candidate_sha256']==c and f['original_sha256']==o and f['case_count']==len(f['cases'])==count and not f['mismatches']and all(x['match']and all(x['original'][k]==x['candidate'][k]for k in f['fields'])for x in f['cases'])
 f=load(HERE/'receipts/origins-social.json.gz');assert f['candidate_sha256']==c and f['original_sha256']==o and len(f['cases'])==157 and not f['mismatches']and all(x['match']and x['original']==x['candidate']for x in f['cases'])
 raw=module('v2_raw',HERE/'raw_compare.py').compare();assert raw==load(HERE/'raw-comparisons.json')and all(not x['capture_equal']and not x['elf_extent_equal']for x in raw.values())
 print('PASS: exact569 control;new3096-byte V2 adapter;570normalized/143raw;13local+abort;SystemID;3656positive edges preserved;fresh runtime;whole0/4')
if __name__=='__main__':main()
