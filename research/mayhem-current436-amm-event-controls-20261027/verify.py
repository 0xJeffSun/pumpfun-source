"""Recheck this bounded checkpoint; no compiler, VM, network or Git operation."""
from pathlib import Path
import base64,gzip,hashlib,importlib.util,json,re,subprocess,sys,tarfile,tempfile
from solders.transaction import Transaction
if not __debug__:raise RuntimeError('Assertions are required')
P=Path(__file__).resolve().parent
R=next(p for p in P.parents if (p/'evidence/original/mayhem/deployed.so').is_file())
sha=lambda b:hashlib.sha256(b).hexdigest()
def module(n,p):
 s=importlib.util.spec_from_file_location(n,p);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m
paths=list(P.rglob('*'));assert not any(x.is_symlink()for x in paths);assert all(x.is_file()or x.is_dir()for x in paths)
assert {x.relative_to(P).as_posix():sha(x.read_bytes())for x in paths if x.is_file()and x!=P/'manifest.json'}==json.loads((P/'manifest.json').read_text())
for name,digest in json.loads((P/'inputs.json').read_text()).items():assert sha((R/name).read_bytes())==digest,name
for name in ['candidate.so','symbols.so']:assert (P/'primary'/name).read_bytes()==(P/'repeat'/name).read_bytes()
with tarfile.open(P/'primary/source.tar.gz')as tar:
 entries=tar.getmembers();assert all(x.isdir()or x.isfile()for x in entries);assert all(not x.name.startswith('/')and'..'not in Path(x.name).parts for x in entries)
 source={str(Path(x.name).relative_to('programs/mayhem')):sha(tar.extractfile(x).read())for x in entries if x.isfile()}
assert len(source)==67 and source==json.loads((P/'primary/launch.json').read_text())['source_inputs']
reader=module('checkpoint_reader',R/'research/mayhem-amm-sell-cfg-recovery-20261027/helpers/reader.py')
audit=module('checkpoint_audit',R/'research/mayhem-amm-sell-cfg-recovery-20261027/analysis.py')
cfg=module('checkpoint_cfg',R/'research/mayhem-amm-sell-cfg-recovery-20261027/cfg.py')
progress=module('checkpoint_progress',R/'research/mayhem-amm-sell-cfg-recovery-20261027/helpers/progress.py')
original=(R/'evidence/original/mayhem/deployed.so').read_bytes();candidate=(P/'primary/symbols.so').read_bytes();baseline=gzip.decompress((R/'research/mayhem-current436-composition-20261027/builds/first/symbols.so.gz').read_bytes())
check=progress.compare(original,baseline,candidate);assert(check['matches'],check['raw_matches'],check['positive_direct_edges_after'],check['positive_Source_records_after'])==(436,141,4473,486)
image_check=module('checkpoint_image_check',R/'research/mayhem-current-macro-call-closure-20261027/verify.py')
with tempfile.TemporaryDirectory()as temporary:
 image_check.verify_image_pair(reader,reader.Elf(P/'primary/symbols.so'),(P/'primary/candidate.so').read_bytes(),Path(temporary)/'candidate.so')
 image_check.verify_image_pair(reader,reader.Elf(P/'alternative-direct-event/symbols.so'),(P/'alternative-direct-event/candidate.so').read_bytes(),Path(temporary)/'alternative.so')
o=reader.Elf(R/'evidence/original/mayhem/deployed.so');c=reader.Elf(P/'primary/symbols.so');cw=audit.windows(c);rows=json.loads((R/'research/mayhem-provider-sharing/audit.json').read_text())['rows'];ow={x['start']:o.window(x['start'],x['end'])for x in rows}
for name,at,size,calls in [('buy',85600,9736,96),('sell',95848,17312,47)]:
 a=ow[at];b=audit.named(c,cw,name+'_pump_swap7handler17h');assert b['end']-b['start']==size
 assert len(a['direct'])==len(b['direct'])==calls
 assert [x['offset']for x in a['direct']]==[x['offset']for x in b['direct']]
 assert [audit.key(ow[x['target']])for x in a['direct']]==[audit.key(cw[x['target']])for x in b['direct']]
 assert audit.sources(o,a)==audit.sources(c,b)
 g=audit.cfg_report(cfg,o,c,a,b);assert not g['topology_conflicts']
 if name=='buy':assert o.norm(at,at+size)[0][:7144]==c.norm(b['start'],b['end'])[0][:7144]
 else:assert not g['opcode_different_blocks']and not g['different_field_reads'];sell=(a,b)
 assert audit.key(a)!=audit.key(b) # Explicitly retain the remaining whole-body mismatch.
events=module('checkpoint_events',P/'event_order.py');ed=ow[374528];cd=next(w for w in cw.values()if audit.key(w)==audit.key(ed));left=events.extract(o,sell[0],ed);right=events.extract(c,sell[1],cd)
assert len(left['writes'])==len(right['writes'])==39
assert [(x['offset'],x['width'])for x in left['writes']]==[(x['offset'],x['width'])for x in right['writes']]
assert(left['event_base'],right['event_base'])==(-1728,-1760)
M='MAyhSmzXzV1pTf7LsNkrNwkWKTo4ougAJ1PPg47MD4e';pairs=signatures=success=0
reports=[p for p in (P/'runtime-primary').glob('*.json')if p.name not in ['commands.json','summary.json']and not p.name.endswith('-verified.json')];assert len(reports)==4
with tempfile.TemporaryDirectory()as directory:
 for receipt in reports:
  j=json.loads(receipt.read_bytes());assert j['candidate_sha256']==sha((P/'primary/candidate.so').read_bytes())and j['case_count']==9 and not j['mismatches']
  subprocess.run([sys.executable,'-B',str(R/'scripts/verify_mayhem_pump_swap.py'),'--candidate',str(P/'primary/candidate.so'),'--receipts',str(receipt),'--output',str(Path(directory)/(receipt.stem+'.json'))],check=True,stdout=subprocess.DEVNULL)
  for pair in j['cases']:
   a,b=pair['original'],pair['candidate'];assert a['transaction_base64']==b['transaction_base64']
   for record,digest in [(a,j['original_sha256']),(b,j['candidate_sha256'])]:
    tx=Transaction.from_bytes(base64.b64decode(record['transaction_base64']));assert all(tx.verify_with_results());signatures+=len(tx.signatures)
    for phase in ['before','after']:assert record[phase][M]['executable']and record[phase][M]['data_sha256']==digest
   log=lambda r:[x for x in r['metadata']['logs']if not re.search(r' consumed \d+ of \d+ compute units',x)]
   assert log(a)==log(b);pairs+=1;success+=a['error']is None
assert(pairs,signatures,success)==(36,144,7)
print(json.dumps({'normalized_windows':436,'raw_windows':141,'buy_exact_normalized_prefix_bytes':7144,'sell_matching_final_event_writes':39,'runtime_pairs':pairs,'signed_transaction_records':72,'verified_signature_fields':signatures,'full_AMM_bodies_equal':False,'whole_ELF_equal':False},indent=2))
