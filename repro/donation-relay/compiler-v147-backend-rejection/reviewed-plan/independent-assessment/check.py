from pathlib import Path
import json,hashlib,tarfile,struct,subprocess,sys
Q=Path(__file__).resolve().parent;B=Path('/Users/shawwalters/Documents/Codex/2026-10-25/go/work/pumpfun-source/work/relay-v147-compiler-audit');P=B/'publication';R=Q.parents[1];H=lambda b:hashlib.sha256(b).hexdigest();J=lambda p:json.loads(p.read_text())
before={str(p.relative_to(P)):H(p.read_bytes()) for p in sorted(P.rglob('*')) if p.is_file()};(Q/'before.json').write_text(json.dumps(before,indent=2)+'\n');assert H((P/'manifest.json').read_bytes())=='77fb057691a2c333644d92a339dbfc8669978620346346a78e629efdd621d8ff';assert not list(P.rglob('*.pyc'))
r=subprocess.run([sys.executable,'-B',str(P/'verify.py')],capture_output=True,text=True);(Q/'saved.stdout').write_text(r.stdout);(Q/'saved.stderr').write_text(r.stderr);assert r.returncode==0,r.stderr
orig=(R/'evidence/dependencies/donation_relay/deployed.so').read_bytes();assert H(orig)=='367f07a62e3f74d358187d175cf3228848e81a56c781a9a75b9df7fed1268563';cand=(P/'build-02/pump_fees_candidate.so').read_bytes();closed=J(P/'closed-discriminators.json');d=J(P/'distribution-verification.json');archive=B/'platform-tools-v147-osx-aarch64.tar.bz2';assert archive.stat().st_size==d['asset_bytes'];digest=hashlib.sha256()
with archive.open('rb') as f:
 for b in iter(lambda:f.read(1048576),b''):digest.update(b)
assert digest.hexdigest()==d['archive_sha256']
selected={}
with tarfile.open(archive,'r:bz2') as t:
 for m in t:
  name=m.name.removeprefix('./')
  if name in d['selected_files']:
   assert m.isfile();b=t.extractfile(m).read();v=d['selected_files'][name];assert H(b)==v['sha256'] and len(b)==v['bytes'];assert H((B/'platform-tools'/name).read_bytes())==v['sha256'];selected[name]=v
assert len(selected)==60
rows=[]
for label,f,target in [('fmt',closed['fmt_write']['function'],721496),('unicode-caller',closed['unicode']['caller'],736464),('unicode-check',closed['unicode']['check'],735760),('multiply',closed['multiply']['callee'],751104),('multiply-wrapper',closed['multiply']['wrapper'],752688)]:
 cs=f['candidate_start'];size=f['bytes'];a=0;ld=[]
 while a<size:
  pc=cs+a
  if cand[pc]==0x18:
   cp=struct.unpack_from('<I',cand,pc+4)[0]+(struct.unpack_from('<I',cand,pc+12)[0]<<32);tp=struct.unpack_from('<I',orig,target+a+4)[0]+(struct.unpack_from('<I',orig,target+a+12)[0]<<32);assert orig[target+a]==0x18;ld.append({'instruction_offset':a,'candidate_pc':pc,'original_pc':target+a,'candidate_immediate':cp,'original_immediate':tp});a+=16
  else:a+=8
 if label in ['fmt','multiply']:assert cand[cs:cs+size]==orig[target:target+size]
 rows.append({'label':label,'candidate_start':cs,'original_start':target,'bytes':size,'actual_LDDW':ld,'raw_equal':cand[cs:cs+size]==orig[target:target+size]})
for a in closed['unicode']['full_six_arrays']:
 size=a['bytes'];assert cand[a['candidate_file_offset']:a['candidate_file_offset']+size]==orig[a['target_file_offset']:a['target_file_offset']+size];assert H(orig[a['target_file_offset']:a['target_file_offset']+size])==a['sha256']
assert sum(a['bytes'] for a in closed['unicode']['full_six_arrays'])==1449
after={str(p.relative_to(P)):H(p.read_bytes()) for p in sorted(P.rglob('*')) if p.is_file()};assert before==after;(Q/'after.json').write_text(json.dumps(after,indent=2)+'\n');(Q/'checks.json').write_text(json.dumps({'saved_verifier_returncode':r.returncode,'publication_seal':H((P/'manifest.json').read_bytes()),'captured_relay_sha256':H(orig),'fees_graph_candidate_sha256':H(cand),'distribution_archive_sha256':digest.hexdigest(),'selected_archive_and_isolated_files':len(selected),'actual_operand_positions':rows,'original_tables_total_bytes':1449,'new_builds':0,'new_target_executions':0},indent=2)+'\n');print('PASS saved, actual archive60, ownRelay rawhelper/data/LDDW, unchangedpublication')
