from pathlib import Path
import argparse,json,hashlib,subprocess,sys,tempfile,tarfile
P=Path(__file__).resolve().parent;H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();J=lambda p:json.loads(p.read_text())
a=argparse.ArgumentParser();a.add_argument('--current-root',type=Path);a.add_argument('--runtime-signatures',action='store_true');args=a.parse_args();m=J(P/'manifest.json');assert set(m)=={str(f.relative_to(P))for f in P.rglob('*')if f.is_file()and f not in[P/'manifest.json',P/'manifest.sha256']}
for n,h in m.items():assert H(P/n)==h,n
S=P/'scratch';assert H(S/'manifest.json')=='52cd978029f67b8c79e738131fa2bec3251de8fdfc2a22270e1464b210125ba7'
cmd=[sys.executable,'-B',str(S/'verify.py')]+(['--runtime-signatures']if args.runtime_signatures else[]);r=subprocess.run(cmd,capture_output=True,text=True);assert r.returncode==0,r.stderr
C=P/'controls';i=J(C/'identity.json');assert J(C/'runner-exit.json')['returncode']==J(C/'build-exit.json')['returncode']==0
assert (P/'main/candidate.so').read_bytes()==(S/'candidate.so').read_bytes()and(P/'main/symbols.so').read_bytes()==(S/'symbols.so').read_bytes()
src=J(C/'source-proposed.json');base=J(S/'acceptance.json')['source'];assert len(src)==26 and[n for n in src if src[n]!=base[n]]==['programs/pump-fees/README.md'];assert src==i['main_source_sha256']
b=J(P/'main/build-attempt.json');assert b['returncode']==0 and b['source_unchanged']and b['source_sha256']==b['source_after_sha256']==src
assert J(C/'dependency-before.json')==J(C/'dependency-after.json')
if args.current_root:
 for n,h in src.items():assert H(args.current_root/n)==h,n
print(json.dumps({'passed':True,'whole_candidate_symbols_equal':True,'source_inputs':26,'README_only_difference':True,'target_executions':0}))
