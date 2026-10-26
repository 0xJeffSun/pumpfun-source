"""Read immutable Git metadata/source only. No dependency/build/target execution."""
from pathlib import Path
import hashlib,json,subprocess
P=Path(__file__).resolve().parent;R=P.parent/'pr8-review';COMMIT='67608d457c096cebf73f1685f78f2f0ab9f9bdb0';(P/'objects').mkdir();(P/'inputs').mkdir()
T={};files={}
def raw(kind,oid):
 b=subprocess.check_output(['git','cat-file',kind,oid],cwd=R);(P/'objects'/oid).write_bytes(b);T[oid]=kind;return b
commit=raw('commit',COMMIT);root=commit.splitlines()[0].split()[1].decode()
def entries(h):
 b=raw('tree',h);i=0;out={}
 while i<len(b):
  j=b.index(b' ',i);k=b.index(b'\0',j);out[b[j+1:k].decode()]=(b[i:j].decode(),b[k+1:k+21].hex());i=k+21
 return out
paths=['Cargo.toml','Cargo.lock','programs/pump-fees/Cargo.toml','repro/status.json']
for name in ['pump','pump-amm','mayhem','donation-relay']:paths.extend(['programs/'+name+'/Cargo.toml','programs/'+name+'/Cargo.lock'])
paths.extend(['programs/pump-amm/vendor/solana-pubkey/Cargo.toml','programs/pump-amm/vendor/solana-pubkey/src/lib.rs'])
paths.extend(['repro/pump/remaining-guards-main-fortyeight/main/build-comparison.json','repro/pump_amm/owner6048-v144/main/build-01/build-comparison.json','repro/pump_fees/sharing-authorize-main-v144/main/build-comparison.json','repro/mayhem/compiler-v154-main/main/build-comparison.json'])
for name in paths:
 tree=root;parts=name.split('/')
 for part in parts[:-1]:mode,tree=entries(tree)[part];assert mode in ['40000','040000']
 mode,blob=entries(tree)[parts[-1]];assert mode in ['100644','100755'];b=subprocess.check_output(['git','cat-file','blob',blob],cwd=R);out=P/'inputs'/name;out.parent.mkdir(parents=True,exist_ok=True);out.write_bytes(b);files[name]={'blob':blob,'mode':mode,'sha256':hashlib.sha256(b).hexdigest(),'bytes':len(b)}
(P/'references.json').write_text(json.dumps({'commit':COMMIT,'root_tree':root,'types':T,'files':files},indent=2)+'\n');print('Captured',len(files),'Git-bound version/source/build-receipt inputs;',len(T),'commit/tree objects')
