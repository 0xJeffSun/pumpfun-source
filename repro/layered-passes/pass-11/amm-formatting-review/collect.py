from pathlib import Path
import json,gzip,hashlib,struct,subprocess
R=Path.cwd();W=R/'work/amm-next-source-pass';P=R/'repro/pump_amm/accumulator-order-v144';x=json.load(gzip.open(P/'inventory/after/residual-ledger.json.gz'));g=json.load(gzip.open(P/'inventory/after/relocation-data-graph.json.gz'))
original_starts=[1105472,1106816,1135856];candidate_starts=[1061560,1077272]
# Original caller is the complete admitted 0x10e380 window, not a decoded new region.
assert 1106816==0x10e380
selected={'original':[r for r in x['original']if r['start']in original_starts],'candidate':[r for r in x['candidate']if r['start']in candidate_starts],'incoming_original_direct_calls':[{'from':r['start'],**c}for r in x['original']for c in r['direct_calls']if c['target']==1105472],'formatter_relocation_edges':[r for r in g['original']if r.get('pointer')==1105472]}
(W/'selected-ledger.json').write_text(json.dumps(selected,indent=2)+'\n')
O=R/'evidence/original/pump_amm/deployed.so';C=P/'candidate.so';S=P/'unstripped.so';ob=O.read_bytes();cb=C.read_bytes()
data={'original_debug_literal':{'address':1182731,'bytes':14,'hex':ob[1182731:1182745].hex(),'text':ob[1182731:1182745].decode()},'candidate_debug_literal':{'address':1124730,'bytes':5,'hex':cb[1124730:1124735].hex(),'text':cb[1124730:1124735].decode()},'original_vtable':{'address':1194976,'bytes':32,'hex':ob[1194976:1195008].hex(),'size':struct.unpack_from('<Q',ob,1194984)[0],'align':struct.unpack_from('<Q',ob,1194992)[0],'formatter_pointer':struct.unpack_from('<II',ob,1195000)[1]},'original_caller_references':[1107576,1107592]}
assert data['original_debug_literal']['text']=='BufferTooSmall' and data['candidate_debug_literal']['text']=='Error'
(W/'bounded-data.json').write_text(json.dumps(data,indent=2)+'\n')
obj='/Users/shawwalters/.cache/solana/v1.54/platform-tools/llvm/bin/llvm-objdump'
for side,rows,f in [('original',selected['original'],O),('candidate',selected['candidate'],S)]:
 for r in rows:
  out=subprocess.run([obj,'--disassemble','--start-address='+str(r['start']),'--stop-address='+str(r['end']),str(f)],capture_output=True,text=True,check=True)
  (W/(side+'-'+hex(r['start'])+'.asm')).write_text(out.stdout)
inputs=[O,C,S,P/'inventory/after/residual-ledger.json.gz',P/'inventory/after/near-shape-residuals.json.gz',P/'inventory/after/relocation-data-graph.json.gz',R/'programs/pump-amm/src/state.rs',R/'programs/pump-amm/src/state/global_config.rs']
(W/'input-bindings.json').write_text(json.dumps({str(f.relative_to(R)):hashlib.sha256(f.read_bytes()).hexdigest()for f in inputs},indent=2)+'\n')
