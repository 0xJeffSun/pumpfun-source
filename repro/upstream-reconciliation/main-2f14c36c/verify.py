from pathlib import Path
import argparse,hashlib,json,importlib.util
P=Path(__file__).resolve().parent;H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();J=lambda p:json.loads(p.read_text())
a=argparse.ArgumentParser();a.add_argument('--repo',type=Path);x=a.parse_args();seal=H(P/'manifest.json');assert(P/'manifest.sha256').read_text().split()[0]==seal;M=J(P/'manifest.json');assert set(M)=={str(p.relative_to(P))for p in P.rglob('*')if p.is_file()and p not in[P/'manifest.json',P/'manifest.sha256']}
for p in P.rglob('*'):assert not p.is_symlink()and p.suffix!='.pyc'and p.name!='__pycache__'
for n,r in M.items():assert H(P/n)==r['sha256']and(P/n).stat().st_size==r['bytes']
rows=J(P/'incoming14.json');assert len(rows)==14
for r in rows:
 b=(P/'incoming'/r['path']).read_bytes();assert H(P/'incoming'/r['path'])==r['sha256']and len(b)==r['bytes'];assert hashlib.sha1(b'blob '+str(len(b)).encode()+b'\0'+b).hexdigest()==r['git_blob']
s=J(P/'restoration.json');assert len(s['restore'])==5 and len(s['remove'])==8 and s['actual_after_passed'];assert J(P/'capture-refusal.json')['returncode']==1
for n in s['restore']:assert H(P/'selected-restore'/n)==next(m[n]for m in s['source107_by_role'].values()if n in m)
if x.repo:
 R=x.repo.resolve();spec=importlib.util.spec_from_file_location('scanner',R/'scripts/build_source_manifest.py');m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m)
 for role,c,w,e in [('pump','programs/pump','programs/pump',[]),('mayhem','programs/mayhem','programs/mayhem',[]),('amm','programs/pump-amm','programs/pump-amm',['programs/pump-amm/vendor/solana-pubkey']),('fees','programs/pump-fees','.', ['programs/pump-fees/README.md'])]:assert m.source_manifest(R/c,R/w,R,extra_inputs=[R/n for n in e])==s['source107_by_role'][role]
 for n in s['remove']:assert not(R/n).exists(),n
 assert H(R/s['passive_document'])==next(r['sha256']for r in rows if r['path']==s['passive_document'])
print(json.dumps({'passed':True,'incoming_blobs':14,'restored_source_paths':5,'inactive_added_paths':8,'source_counts':s['actual_after_source_counts'],'current_root_checked':bool(x.repo),'new_build_or_VM_or_fixture_execution':0}))
