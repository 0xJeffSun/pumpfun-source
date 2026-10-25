#!/usr/bin/env python3
"""Portable integrity + deterministic static evidence verifier. No target execution."""
import argparse, hashlib, json, os, subprocess, sys
from pathlib import Path
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent
sys.path.insert(0,str(P))
import tracker

def main():
 ap=argparse.ArgumentParser();ap.add_argument('--scratch',type=Path,required=True);args=ap.parse_args()
 scratch=args.scratch.resolve()
 if scratch==P or P in scratch.parents:raise ValueError('scratch must be outside sealed publication')
 scratch.mkdir(parents=True,exist_ok=True)
 assert not any(f.is_symlink() for f in P.rglob('*')),'symlink in publication'
 manifest=json.loads((P/'manifest.json').read_text())
 assert tracker.h((P/'manifest.json').read_bytes())==(P/'manifest.sha256').read_text().split()[0],'manifest seal'
 actual={str(f.relative_to(P)) for f in P.rglob('*') if f.is_file()}
 assert actual==set(manifest['files'])|{'manifest.json','manifest.sha256'},'exact file set'
 for path,entry in manifest['files'].items():
  b=(P/path).read_bytes();assert len(b)==entry['size'] and tracker.h(b)==entry['sha256'],path
 for r in json.loads((P/'input-provenance.json').read_text()):
  b=(P/r['path']).read_bytes()
  assert tracker.h(b)==r['sha256'] and len(b)==r['size'],r['path']
  assert hashlib.sha1(b'blob '+str(len(b)).encode()+b'\0'+b).hexdigest()==r['git_blob'],r['path']
  assert r['revision']==tracker.REV
 rebuilt=tracker.generate()
 assert tracker.enc(rebuilt)==(P/'residual-ledger.json').read_bytes(),'deterministic ledger'
 assert len(rebuilt['original_windows'])==492 and not rebuilt['candidate_windows']
 assert rebuilt['comparison']['raw_mismatch'] is None
 assert len(rebuilt['business_branches'])==11 and len(rebuilt['idl_contracts']['operations'])==7
 assert all(w['source_attribution']['historical_identity'] is None for w in rebuilt['original_windows'])
 assert sum(len(w['calls']) for w in rebuilt['original_windows'])==4508
 assert sum(len(w['branches']) for w in rebuilt['original_windows'])==11172
 assert len(rebuilt['original']['elf']['relocations'])==2327
 env=dict(os.environ);env['TMPDIR']=str(scratch);env['PYTHONDONTWRITEBYTECODE']='1';env.pop('PYTHONPATH',None)
 results=[]
 for packet in (tracker.OLD,tracker.CTX,tracker.IDL,tracker.DSP):
  proc=subprocess.run([sys.executable,'-B',str(packet/'verify.py')],cwd=scratch,env=env,stdout=subprocess.PIPE,stderr=subprocess.PIPE,text=True)
  assert proc.returncode==0,(str(packet),proc.stdout,proc.stderr)
  results.append({'path':str(packet.relative_to(P)),'exit_code':proc.returncode,'stdout':proc.stdout})
 # Require retained evidence unchanged even after recursive static verifiers.
 for path,entry in manifest['files'].items():assert tracker.h((P/path).read_bytes())==entry['sha256'],path
 print(json.dumps({'status':'pass','manifest_sha256':tracker.h((P/'manifest.json').read_bytes()),'payload_files':len(manifest['files']),'original_windows':492,'business_branches':11,'idl_operations':7,'candidate_available':False,'builds':0,'typechecks':0,'target_executions':0,'static_packet_verifiers':results,'claim':'integrity, reproducible static inventory and retained source contracts only'},indent=2))
if __name__=='__main__':main()
