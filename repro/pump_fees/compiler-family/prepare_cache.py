#!/usr/bin/env python3
"""Populate an isolated Cargo home from checksum-verified existing local archives."""
from pathlib import Path
import hashlib,json,shutil,tomllib
ROOT=Path(__file__).resolve().parent;DEST=ROOT/'cargo-home';ORIG=Path('/Users/shawwalters/.cargo/registry')
lock=tomllib.loads((ROOT/'v143-crate/Cargo.lock').read_text());registries=['index.crates.io-6f17d22bba15001f','index.crates.io-1949cf8c6b5b557f']
def index_path(n):return '1/'+n if len(n)==1 else '2/'+n if len(n)==2 else '3/'+n[0]+'/'+n if len(n)==3 else n[:2]+'/'+n[2:4]+'/'+n
records=[]
for pkg in lock['package']:
 if not pkg.get('source','').startswith('registry+'):continue
 name=pkg['name'];version=pkg['version'];filename=f'{name}-{version}.crate'
 possible=list((ORIG/'cache').glob('*/'+filename));archives=[p for p in possible if hashlib.sha256(p.read_bytes()).hexdigest()==pkg['checksum']]
 if not archives:raise RuntimeError(f'Missing checksum-verified archive: {filename}')
 rel=index_path(name);metadata=list((ORIG/'index').glob('*/.cache/'+rel));metadata.sort(key=lambda p:'1949cf8' not in str(p))
 if not metadata:raise RuntimeError(f'Missing local index metadata: {name}')
 for registry in registries:
  target=DEST/'registry/cache'/registry/filename;target.parent.mkdir(parents=True,exist_ok=True);shutil.copyfile(archives[0],target)
  target=DEST/'registry/index'/registry/'.cache'/rel;target.parent.mkdir(parents=True,exist_ok=True);shutil.copyfile(metadata[0],target)
 records.append({'package':name,'version':version,'archive_sha256':pkg['checksum'],'archive_source':str(archives[0]),'index_source':str(metadata[0])})
for registry in registries:
 dst=DEST/'registry/index'/registry/'config.json';shutil.copyfile(ORIG/'index'/registry/'config.json',dst)
(ROOT/'cache-manifest.json').write_text(json.dumps(records,indent=2)+'\n')
print('Prepared isolated Cargo home:',DEST,'packages',len(records))
