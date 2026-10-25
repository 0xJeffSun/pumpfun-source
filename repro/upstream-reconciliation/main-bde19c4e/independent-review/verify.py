from pathlib import Path
import argparse,subprocess,json,hashlib
p=argparse.ArgumentParser();p.add_argument('--repo',type=Path,required=True);a=p.parse_args();w=Path(__file__).resolve().parent;H=lambda b:hashlib.sha256(b).hexdigest()
def git(*args):return subprocess.check_output(['git','-C',str(a.repo),*args],stderr=subprocess.DEVNULL)
j=json.loads((w/'paths.json').read_text());assert j['path_count']==len(j['rows'])==266
expected={line.split('\t',1)[1]:line.split('\t',1)[0]for line in git('diff','--name-status',j['merge_base'],j['incoming_head']).decode().splitlines()};assert expected=={r['path']:r['incoming_status_since_merge_base']for r in j['rows']}
for r in j['rows']:
 assert git('rev-parse',j['incoming_head']+':'+r['path']).decode().strip()==r['incoming_git_blob'];b=git('cat-file','blob',r['incoming_git_blob']);assert len(b)==r['incoming_bytes']and H(b)==r['incoming_sha256']
 if r['accepted_git_blob']:assert git('rev-parse',j['accepted_head']+':'+r['path']).decode().strip()==r['accepted_git_blob']
 assert r['execution_allowed']is False
assert sum(r['archive_path']is not None for r in j['rows'])==15
if(w/'manifest.json').exists():
 m=json.loads((w/'manifest.json').read_text());assert set(m)=={str(f.relative_to(w))for f in w.rglob('*')if f.is_file()and f not in[w/'manifest.json',w/'manifest.sha256']}
 for n,h in m.items():assert H((w/n).read_bytes())==h
 assert H((w/'manifest.json').read_bytes())==(w/'manifest.sha256').read_text().strip()
print('PASS:266 exact incoming path identities and inactive/restore dispositions; no source or target execution.')
