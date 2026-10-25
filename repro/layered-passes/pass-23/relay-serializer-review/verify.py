from pathlib import Path
import json,hashlib,struct,sys,re
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent;sys.path.insert(0,str(P));import disasm
H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
def run():
 m=json.loads((P/'manifest.json').read_text());assert H(P/'manifest.json')==(P/'manifest.sha256').read_text().split()[0];assert set(m)=={str(f.relative_to(P))for f in P.rglob('*')if f.is_file()and f not in[P/'manifest.json',P/'manifest.sha256']}
 assert not any(f.is_symlink()or f.name=='__pycache__'or f.suffix=='.pyc'for f in P.rglob('*'))
 for n,h in m.items():assert H(P/n)==h
 d=json.loads((P/'closure.json').read_text());assert d['baseline_checkpoint_seal']==H(P/'checkpoint-manifest.json')=='d12ad064c15a5e1760f6a566349f982b9e4e4e57430b455a0386b89a4a57248a'
 assert H(P/'unstripped.so')==d['symbols_sha256'];src=json.loads((P/'source-map.json').read_text());assert len(src)==23
 for n,h in src.items():assert H(P/'source'/n)==h
 es={k:disasm.a.Elf((P/('original.so'if k=='original'else'unstripped.so')).read_bytes())for k in['original','candidate']};counts={}
 for k,e in es.items():
  rows=json.loads((P/f'{k}-function-ledger.json').read_text());counts[k]=len(rows)
  for f in rows:assert hashlib.sha256(e.at(f['start'],f['bytes'])).hexdigest()==f['raw_sha256']
  for f in json.loads((P/'selected-rows.json').read_text())[k]:assert disasm.render(e,f['start'],f['end'])==(P/k/f"{f['start']}.asm").read_text()
 ins=lambda e,p:struct.unpack('<BBhi',e.at(p,8))
 for row in d['pairs']:
  for k in['original','candidate']:
   e=es[k];drop=row[k+'_error_drop_callx'];factory=row[k+'_3004_factory_call'];release=row[k+'_guard_release'];assert drop<factory<release;assert ins(e,drop)[0]==0x8d and ins(e,drop)[3]==2
   op,r,off,imm=ins(e,factory);assert op==133 and factory+8+imm*8==(665312 if k=='original' else 71016)
   assert ins(e,release)[0]==0x7b
 for a,disc in [(757517,[130,12,50,226,170,109,160,155]),(757573,[137,137,192,77,110,184,189,28]),(757557,[228,175,114,137,165,18,11,14])]:assert es['original'].at(a,8)==bytes(disc)
 for a,name in [(424188,b'epoch_tracker'),(424201,b'debouncer'),(424233,b'distribution')]:assert es['candidate'].at(a,len(name))==name
 for pc in[75072,73392,76856]:
  op,r,off,imm=ins(es['candidate'],pc);assert op==133 and pc+8+imm*8==67336
 return{'status':'PASS','full_raw_functions':counts,'paired_serializer_orderings':3,'proposed_source_changes':0,'builds':0,'target_executions':0,'original_whole_identity':False}
if __name__=='__main__':print(json.dumps(run(),indent=2))
