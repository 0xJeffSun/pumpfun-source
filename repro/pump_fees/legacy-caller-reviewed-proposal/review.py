"""Static review facts only. No compilation, target execution, or fixtures."""
from pathlib import Path
import sys,json,hashlib,struct,re,gzip,tarfile
P=Path(__file__).resolve().parent
sys.path.insert(0,str(P/'interrupted'))
from elf_reader import Elf
H=lambda b:hashlib.sha256(b).hexdigest()
KEY='programs/pump-fees/src/sharing_update.rs'
ROOTS={193400:'legacy caller',75880:'quote admission',234096:'authorization',231576:'remaining-account preprocessing',237464:'AMM adapter and reserve/owner guard',199072:'owned payout preparation',204080:'legacy payout adapter and early exit',205768:'final validation/state/event',235304:'Pump adapter',544192:'generated Pump CPI',582624:'generated AMM CPI',567376:'Pump metas',573464:'Pump infos',593584:'AMM metas',561600:'AMM infos',19528:'SharingConfig account exit',640672:'legacy wrapper',484816:'legacy parser',500928:'event serialization',538040:'curve decoding'}
def facts():
 m=json.loads((P/'baseline-source-sha256.json').read_text());n=json.loads((P/'proposed-source-sha256.json').read_text())
 assert len(m)==len(n)==26 and set(m)==set(n)
 for f,h in m.items():assert H((P/'baseline'/f).read_bytes())==h
 assert [f for f in m if m[f]!=n[f]]==[KEY]
 s=(P/'proposal/sharing_update.rs').read_text();assert H(s.encode())==n[KEY]
 base=(P/'baseline'/KEY).read_text();suffix=base[base.index(' pub fn update_fee_shares_v2<'):]
 assert s.count(suffix)==1,'V2, prior helpers, event, or contexts changed'
 assert s.startswith(base[:base.index('pub fn update_fee_shares<')])
 ev=json.loads((P/'interrupted/static-evidence.json').read_text());rows={r['start']:r for r in ev['windows']['original']}
 e=Elf(P/'interrupted/evidence/preprocess/inputs/original.so')
 q={x['pc']:x for r in rows.values() for x in r['instructions']}
 selected=[]
 for a,role in ROOTS.items():
  r=rows[a];assert H(e.b[a:r['end']])==r['raw_sha256']
  for x in r['instructions']:assert e.b[x['pc']:x['pc']+len(bytes.fromhex(x['raw']))].hex()==x['raw']
  selected.append({'role':role,'start':a,'end':r['end'],'size':r['end']-a,'instructions':len(r['instructions']),'raw_sha256':r['raw_sha256'],'normalized_sha256':r['normalized_sha256'],'dependencies':r['dependencies'],'matches_to_current_8ff':r['matches']})
 # Check raw signed internal call operands, rejecting relocated external calls.
 edges={193744:75880,194824:234096,195040:231576,198256:237464,198312:204080,198448:205768,198952:235304,199024:205768,204160:199072,205424:19528,236184:544192,240032:582624,544448:567376,544760:573464,546536:724336,582880:593584,583192:561600,584968:724336,641320:193400,640992:484816}
 for a,t in edges.items():
  assert e.b[a:a+2]==b'\x85\x10' and e.relocations.get(a,{}).get('type')!=10
  assert a+8+struct.unpack_from('<i',e.b,a+4)[0]*8==t==e.calls[a]
 # Scalar stores/loads are raw witnesses, not a full machine proof.
 witnesses={234296:9,234960:6016,235200:6018,202600:6013,202824:6020}
 for a,v in witnesses.items():assert q[a]['immediate']==v
 assert q[200080]['offset']==90 # executable at offset42 from entry pointer (base advanced separately)
 assert q[208424]['opcode']==0x57 and q[208432]['immediate']==10000
 assert q[209448]['immediate']==1 and q[209448]['offset']==89 # revoke only after vector replacement
 # Fixed CPI privileges from both IDLs and actual original meta stores.
 cpis=[]
 for prog,name,a,z,g,disc in [('pump','distribute_creator_fees',567376,568848,544192,[165,114,103,0,121,206,247,81]),('pump_amm','transfer_creator_fees_to_pump',593584,595656,582624,[139,52,134,85,228,229,108,241])]:
  ix=next(x for x in json.loads((P/'baseline/programs/pump-fees/idls'/f'{prog}.json').read_text())['instructions'] if x['name']==name)
  assert ix['discriminator']==disc and ix['args']==[]
  flags=[x['immediate'] for x in rows[a]['instructions'] if x['opcode']==0x6a and x['offset']>=32 and (x['offset']-32)%34==0]
  expected=[int(x.get('signer',False))+256*int(x.get('writable',False)) for x in ix['accounts']]
  assert flags==expected
  ds=[x for x in rows[g]['instructions'] if x.get('value')==int.from_bytes(bytes(disc),'little')];assert len(ds)==1
  alloc=[x for x in rows[g]['instructions'] if x['opcode']==7 and x['immediate']==-256];assert alloc and alloc[0]['pc']<ds[0]['pc']
  cpis.append({'program':prog,'instruction':name,'discriminator':disc,'fixed_accounts':[{'name':x['name'],'writable':x.get('writable',False),'signer':x.get('signer',False)} for x in ix['accounts']],'original_meta_start':a,'generated_start':g,'data_allocation_witness':alloc[0],'discriminator_witness':ds[0],'return_is_ignored_without_get':True})
  structname='DistributeCreatorFees' if prog=='pump' else 'TransferCreatorFeesToPump'
  literal=s.split('crate::'+prog+'::cpi::accounts::'+structname+' {',1)[1].split('}',1)[0]
  fields=re.findall(r'^\s*(\w+): ctx.accounts.(\w+).to_account_info\(\),',literal,re.M)
  assert set(x for x,y in fields)==set(x['name'] for x in ix['accounts'])
  cpis[-1]['source_field_mapping']=dict(fields)
 assert 'fn legacy_cpi<' not in s and 'data.to_vec()' not in s[s.index('// Original [234096'):]
 assert s.index('retained.push(share.clone())')<s.index('accounts.push(account.clone())')<s.index('if share.share_bps > max_weight')<s.index('sum = sum.saturating_add')
 assert 'max_index = retained.len() - 1;' in s and '.get()' not in s[s.index('// Original adapters'):]
 framework=json.loads((P/'framework-provenance.json').read_text());lock=(P/'baseline/Cargo.lock').read_text()
 for crate,r in framework.items():
  archive=P/'framework'/f'{crate}.crate';assert H(archive.read_bytes())==r['archive_sha256'] and r['archive_sha256'] in lock
  with tarfile.open(archive) as t:
   for member,h in r['members'].items():assert H(t.extractfile(crate+'/'+member).read())==H((P/'framework'/crate/member).read_bytes())==h
 # Old saved cases remain identified as historical; never accepted for new source.
 j=json.load(gzip.open(P/'historical/differential.json.gz','rt'));sharing=j['suites']['sharing_update'];assert sharing['case_count']==len(sharing['cases'])==417
 rs=json.load(gzip.open(P/'historical/runtime-summary.json.gz','rt'));assert rs['baseline_comparisons']==17441 and rs['focused_comparisons']==20 and rs['sequence_steps_separate']==10
 return {'scope':'Static source hypothesis only; no compilation, runtime, or new coverage; original boundaries inferred','baseline_source_count':26,'changed_paths':[KEY],'source_sha256':n[KEY],'baseline_sha256':m[KEY],'whole_original_equal_to_current':False,'original_sha256':H(e.b),'candidate_sha256':ev['inputs']['candidate']['sha256'],'symbols_sha256':ev['inputs']['symbols']['sha256'],'preserved_suffix_sha256':H(suffix.encode()),'roots':selected,'actual_edges':[{'pc':a,'target':t,'raw':e.b[a:a+8].hex()} for a,t in edges.items()],'cpi_contracts':cpis,'historical_requirements':{'sharing_rows':417,'baseline_comparisons':17441,'focused_comparisons':20,'total_comparisons':17461,'donation_steps_separate':10,'new_cases':0,'execution_here':False}}
if __name__=='__main__':print(json.dumps(facts(),indent=2,sort_keys=True))
