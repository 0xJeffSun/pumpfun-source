"""New P25 source-applicability package gate; old P24 reader stays immutable."""
from pathlib import Path
import argparse,hashlib,json,subprocess,sys
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent;H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();J=lambda p:json.loads(p.read_text())
if __name__=='__main__':
 a=argparse.ArgumentParser();a.add_argument('--repo',type=Path,required=True);x=a.parse_args();R=x.repo.resolve();assert R/'repro/layered-passes/pass-25/current-applicability'==P
 assert H(P/'manifest.json')==(P/'manifest.sha256').read_text().split()[0];M=J(P/'manifest.json');assert set(M)=={str(p.relative_to(P))for p in P.rglob('*')if p.is_file()and str(p.relative_to(P))not in('manifest.json','manifest.sha256')}
 for n,r in M.items():assert not(P/n).is_symlink()and H(P/n)==r['sha256']and(P/n).stat().st_size==r['bytes']
 t=J(P/'transition.json');before=(P/'before.py').read_text();assert H(P/'before.py')==t['before_sha256'];after=before
 for r in t['literal_replacements']:assert after.count(r['old'])==r['count'];after=after.replace(r['old'],r['new'])
 assert after==(P/'verify_current.py').read_text()and H(P/'verify_current.py')==t['after_sha256']
 subprocess.run([sys.executable,'-B',str(P/'verify_current.py'),'--repo',str(R)],check=True)
