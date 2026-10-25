#!/usr/bin/env python3
"""Download official compiler evidence only; never writes capture/source directories."""
import concurrent.futures, hashlib, json, re, urllib.request, urllib.error
from pathlib import Path
ROOT=Path(__file__).resolve().parent
TAGS=[f'v1.{n}' for n in range(40,59)]+['v1.42.1','v1.46.1','v1.51.1']
def fetch(url,path):
 path=ROOT/path
 if not path.exists():
  try:
   with urllib.request.urlopen(url,timeout=30) as response: data=response.read()
  except urllib.error.HTTPError as e:
   return {'url':url,'error':e.code}
  path.parent.mkdir(parents=True,exist_ok=True);path.write_bytes(data)
 data=path.read_bytes()
 return {'url':url,'saved_as':str(path.relative_to(ROOT)),'sha256':hashlib.sha256(data).hexdigest()}
def one(tag):
 a=fetch(f'https://raw.githubusercontent.com/anza-xyz/platform-tools/{tag}/build.sh',Path('remote')/tag/'build.sh')
 if 'error' in a:return tag,a
 text=(ROOT/a['saved_as']).read_text()
 refs=re.findall(r'--branch\s+(\S+)\s+.*?https://github.com/(?:anza-xyz|solana-labs)/rust(?:.git)?',text)
 a['rust_refs']=refs
 return tag,a
with concurrent.futures.ThreadPoolExecutor(max_workers=8) as p: out=dict(p.map(one,TAGS))
(ROOT/'official-build-references.json').write_text(json.dumps(out,indent=2)+'\n')
for tag,a in out.items():print(tag,a.get('rust_refs',a.get('error')))
