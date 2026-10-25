#!/usr/bin/env python3
"""Portable saved-evidence verification. No compilation, runtime replay, or network."""
from pathlib import Path
import gzip,hashlib,json,subprocess,sys,tempfile
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
read=lambda p:json.loads(p.read_text())
m=read(P/'manifest.json')
assert sha(P/'manifest.json')==(P/'manifest.sha256').read_text().split()[0]
actual={str(p.relative_to(P))for p in P.rglob('*')if p.is_file()and p.name not in ['manifest.json','manifest.sha256'] and '__pycache__'not in p.parts}
# Nested provenance manifests are ordinary payload files.
actual|={str(p.relative_to(P))for p in P.rglob('manifest.json')if p.parent!=P}
actual|={str(p.relative_to(P))for p in P.rglob('manifest.sha256')if p.parent!=P}
assert actual==set(m['files']), (actual-set(m['files']),set(m['files'])-actual)
for n,r in m['files'].items():
 p=P/n;assert not p.is_symlink()and not p.name.endswith('-keypair.json');assert sha(p)==r['sha256']and p.stat().st_size==r['bytes'],n
b=read(P/'baseline-source-sha256.json');a=read(P/'proposed-source-sha256.json');assert len(a)==len(b)==22
changed=[p for p in a if a[p]!=b[p]];assert changed==['programs/pump-amm/src/transfer_creator.rs']
for p,h in a.items():assert sha(P/'source'/p)==h and sha(P/'runtime-source'/p)==b[p]
p=changed[0];old=(P/'runtime-source'/p).read_bytes();new=(P/'source'/p).read_bytes()
assert old.count(b'rent.minimum_balance(0)')==1
assert new==old.replace(b'rent.minimum_balance(0)',b'rent.minimum_balance(destination.data_len())')
attempt=read(P/'build-attempt.json');assert attempt['returncode']==0 and attempt['source_unchanged']and attempt['source_sha256']==attempt['source_after_sha256']==a
before=read(P/'tools-before.json');after=read(P/'tools-after.json');assert all(before[k]==after[k]for k in ['tools','sdk_source'])
assert read(P/'dependency-integrity.json')==read(P/'dependency-integrity-after.json')
gate=read(P/'runtime-gate.json');assert gate['pass'] and not gate['backend_stack_failures']and gate['candidate_sha256']==sha(P/'candidate.so')
assert read(P/'runtime-01/inputs-before.json')==read(P/'runtime-01/inputs-after.json')
inputs=read(P/'runtime-01/inputs-before.json')
for mapping in [inputs['harness'],inputs['runtime'],inputs['legacy_checkout_snapshot']]:
 for p,h in mapping.items():assert sha(P/'runtime-source'/p)==h
# Existing read-only signature/receipt/diagnostic verifier is kept unchanged.
r=subprocess.run([sys.executable,str(P/'verify_runtime.py'),'--verify'],cwd=P,capture_output=True,text=True);assert r.returncode==0,r.stdout+r.stderr
sys.path.insert(0,str(P/'static-tool'));from elf_reader import Elf
from analyze import instructions
s=Elf(P/'unstripped.so');c=Elf(P/'candidate.so');assert s.b[s.lo:s.hi]==c.b[c.lo:c.hi]and s.pattern(s.lo,s.hi-s.lo)==c.pattern(c.lo,c.hi-c.lo)
t=read(P/'targeted-static.json');helper=next(f for f in s.funcs if 'unwrap_and_move'in f['name']);assert helper==t['helper']and list(instructions(s,helper['start'],helper['size']))==t['instructions']
for call in t['calls']:assert s.calls[call['address']]==call['target']
chain=t['data_len_rent_chain'];assert s.calls[chain[1]['address']]==t['actual_targets']['data_len']['candidate']['start']and s.calls[chain[4]['address']]==t['actual_targets']['minimum_balance']['candidate']['start']
assert chain[3]['opcode']==191 and chain[3]['dst']==2 and chain[3]['src']==0
ata=read(P/'ata-selector-static.json');assert s.calls[ata['callsite']]==ata['actual_constructor']['start'];assert list(instructions(s,ata['actual_constructor']['start'],ata['actual_constructor']['size']))==ata['instructions']and ata['instructions'][1]['immediate']==0
with tempfile.TemporaryDirectory(prefix='verify-static-',dir=P)as tmp:
 out=Path(tmp)
 r=subprocess.run([sys.executable,str(P/'static-tool/analyze.py'),'--original',str(P/'runtime-source/evidence/original/pump_amm/deployed.so'),'--candidate',str(P/'candidate.so'),'--symbols',str(P/'unstripped.so'),'--out',str(out)],cwd=P,capture_output=True,text=True);assert r.returncode==0,r.stdout+r.stderr
 for f in (P/'static').iterdir():assert read(f)==read(out/f.name),f.name
summary=read(P/'runtime-summary.json');static=read(P/'static/summary.json')
print(json.dumps({'status':'PASS','payload_files':len(m['files']),'candidate_sha256':sha(P/'candidate.so'),'comparisons':summary['case_count'],'verified_signatures':summary['signature_count'],'original_windows':static['original_windows'],'candidate_windows':static['candidate_symbol_windows'],'full_original_equality':static['whole']['equal'],'runtime_replay':False,'compile':False},indent=2))
