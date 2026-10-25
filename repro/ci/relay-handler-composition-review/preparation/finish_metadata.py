from pathlib import Path
import hashlib,json,tarfile
P=Path(__file__).resolve().parent
H=lambda b:hashlib.sha256(b).hexdigest()

def get(package,path):
 with tarfile.open(P/'inputs'/f'{package}.tar.gz') as t:return t.extractfile(path).read()
selected={
'relay_donation_handlers':['source-hypothesis.rs','context-fragments.rs','REPORT.md','variants.json'],
'relay_epoch_whitelist_handlers':['hypothesis.rs','context-hypothesis.rs','REPORT.md'],
'relay_swap_handlers':['hypothesis.rs','contexts.json','REPORT.md'],
'relay_distribution_handlers':['hypothesis.rs','interface.json','REPORT.md'],
'relay_integrated_source_hypothesis':['source/lib.rs','source/model.rs','source/codec.rs','source/codec/constants.rs','source/runtime.rs','source/handlers.rs','source/phases.rs','source/context_existing.rs','source/anchor_contexts.rs','source/arithmetic.rs','REPORT.md','result.json','instruction-ledger.json']}
# Full source bytes stay in exact sealed archives; line spans are navigation aids.
bindings=[]
for package,files in selected.items():
 for path in files:
  data=get(package,path);bindings.append({'package':package,'path':path,'sha256':H(data),'size':len(data),'line_count':len(data.splitlines())})
(P/'source-bindings.json').write_text(json.dumps(bindings,indent=2)+'\n')
anchors={
'C01':[('source/handlers.rs',71,84)],'C02':[('source/handlers.rs',87,108),('source/phases.rs',1,25)],
'C03':[('source/handlers.rs',122,140)],'C04':[('source/codec.rs',14,18),('source/model.rs',13,17)],
'C05':[('source/handlers.rs',29,37),('source/handlers.rs',60,69),('source/handlers.rs',110,120)],
'C06':[('source/handlers.rs',87,100)],'C07':[('source/arithmetic.rs',1,27),('source/handlers.rs',73,84)],
'C08':[('source/handlers.rs',77,84)],'C09':[('source/handlers.rs',60,69),('source/handlers.rs',122,140),('source/lib.rs',17,21)],
'C10':[('source/handlers.rs',39,50),('source/runtime.rs',37,41)],'C11':[('source/runtime.rs',28,36),('source/handlers.rs',131,140)],
'C12':[('source/model.rs',35,41),('source/handlers.rs',110,114)],'C13':[('source/phases.rs',1,25)],
'C14':[('source/handlers.rs',10,16),('source/handlers.rs',52,54)],'C15':[('source/runtime.rs',49,60)],
'N01':[('source/runtime.rs',42,47),('source/model.rs',31,32)],'N02':[('source/lib.rs',17,21)],
'N03':[('source/lib.rs',17,21)],'N04':[('source/lib.rs',17,21)],'N05':[('source/context_existing.rs',1,20)],
'N06':[('source/lib.rs',17,21)],'N07':[('source/lib.rs',17,21)],'N08':[('source/phases.rs',12,25)],'N09':[('source/lib.rs',1,21),('source/codec.rs',24,42)]}
nav={}
for key,spans in anchors.items():
 nav[key]=[]
 for path,lo,hi in spans:
  data=get('relay_integrated_source_hypothesis',path);lines=data.decode().splitlines();hi=min(hi,len(lines));assert lo<=hi
  nav[key].append({'path':path,'lines':[lo,hi],'excerpt':'\n'.join(lines[lo-1:hi]),'file_sha256':H(data)})
(P/'integrated-source-navigation.json').write_text(json.dumps(nav,indent=2)+'\n')
b=(P/'inputs/original.so').read_bytes();inventory=json.loads((P/'inputs/windows.json').read_text())
contracts=json.loads((P/'composition-ledger.json').read_text())
for c in contracts:
 c['raw_witnesses']=[]
 for pc in c['original_witness_pcs']:
  w=next((w for w in inventory if w['start']<=pc<w['end']),None);assert w is not None
  c['raw_witnesses'].append({'pc':pc,'bytes_hex':b[pc:pc+8].hex(),'window_start':w['start'],'window_end':w['end'],'window_sha256':w['sha256']})
(P/'composition-ledger.json').write_text(json.dumps(contracts,indent=2)+'\n')
