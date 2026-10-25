from pathlib import Path
import hashlib,json,subprocess,re
R=Path.cwd(); P=R/'work/fees2387-base58-dependency-admitted'; Q=R/'work/fees2387-base58-dependency-plan'
H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
J=lambda p,d:p.write_text(json.dumps(d,indent=2)+'\n')
seal='acc8f159907a21182cfc1402d979e00d1193c7303364e958c51c23a6ee4fe8c8'
assert H(Q/'manifest.json')==seal
manifest=json.loads((Q/'manifest.json').read_text())
for n,x in manifest['files'].items():assert H(Q/n)==x['sha256'] and (Q/n).stat().st_size==x['bytes']
inputs=json.loads((Q/'inputs.json').read_text())
for x in inputs['metadata']:assert H(R/x['path'])==x['sha256'] and (R/x['path']).stat().st_size==x['bytes']
index=json.loads((R/'repro/layered-passes/pass-25/current-analysis-index.json').read_text())['programs']['pump_fees']
for side in ['original','candidate']:
 assert H(R/inputs[side]['path'])==inputs[side]['sha256']==index[side+'_sha256']
for x in index['full_ledger_files']:assert H(R/x['path'])==x['sha256'] and (R/x['path']).stat().st_size==x['bytes']
T=Path('/Users/shawwalters/Documents/Codex/2026-10-24/pumpfun-source/work/fees-compat/toolchains/v1.44/llvm/bin/llvm-objdump')
assert H(T)=='24f83fd4c314fdc358920bf9936261985b8c39266f1ba7d556716c9dec1d24f9'
A=json.loads((Q/'admission.UNRUN.json').read_text())
J(P/'preflight.json',{'gate':'PASS','plan_seal':seal,'plan_payloads':len(manifest['files']),'metadata_inputs':inputs['metadata'],'original':inputs['original'],'candidate':inputs['candidate'],'full_ledger_files':index['full_ledger_files'],'objdump':{'path':str(T),'sha256':H(T)},'scope':'Only root-admitted1520B original/candidate bodies; no data reads or lower-body decoding'})
rows=[]
for side in ['original','candidate']:
 w=A[side+'_complete_window']; start,end=w['start'],w['end']; image=R/inputs[side]['path']; name=f'{side}-{start}-{end}'
 raw=image.read_bytes()[start:end]; assert len(raw)==1520 and hashlib.sha256(raw).hexdigest()==w['raw_sha256']
 (P/(name+'.bin')).write_bytes(raw)
 cmd=[str(T),'--disassemble','--start-address='+str(start),'--stop-address='+str(end),str(image)]
 child=subprocess.run(cmd,capture_output=True)
 (P/(name+'.asm')).write_bytes(child.stdout); (P/(name+'.stderr')).write_bytes(child.stderr)
 row={'side':side,'start':start,'end':end,'bytes':len(raw),'raw_sha256':w['raw_sha256'],'command':cmd,'returncode':child.returncode}; rows.append(row)
 J(P/'capture.json',{'scope':'Only two root-admitted complete1520-byte windows','plan_seal':seal,'rows':rows,'new_data_extraction':False,'recursive_body_decode':False,'source_patch_build_vm':False})
 assert child.returncode==0
 ins=[]
 for line in child.stdout.decode().splitlines():
  m=re.match(r'^\s*(\d+):\s*((?:[0-9a-f]{2} ){7,15}[0-9a-f]{2})\s+(.+)$',line)
  if m:
   pc=int(m.group(1))*8; b=bytes.fromhex(m.group(2)); assert start<=pc<end and pc+len(b)<=end
   assert raw[pc-start:pc-start+len(b)]==b
   ins.append({'pc':pc,'offset':pc-start,'raw_hex':b.hex(),'text':m.group(3)})
 assert b''.join(bytes.fromhex(x['raw_hex']) for x in ins)==raw, 'disassembler rows must cover exact full body'
 J(P/(side+'-instructions.json'),ins)
print(json.dumps({'returncode':0,'rows':rows},indent=2))
