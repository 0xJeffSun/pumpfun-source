"""Lossless reassembly of sealed98 bytes; no target/build/history transformations."""
from pathlib import Path,PurePosixPath
import argparse,json,hashlib,shutil,os
from strict_evidence import strict_package,plain,data
INNER='98c49ab1a0aaad83f51224df4aa44bbfb36308f53e8351dbed51298b87fdc67a'
H=lambda p:hashlib.sha256(data(p)).hexdigest()
def materialize(root,outer_seal,destination):
 root=plain(root);strict_package(root,outer_seal);layout=json.loads(data(root/'layout.json'));assert layout['inner_manifest_seal']==INNER
 raw=data(root/'inner-manifest.json');assert hashlib.sha256(raw).hexdigest()==INNER
 m=json.loads(raw);assert set(layout['files'])==set(m)
 assert data(root/'inner-manifest.sha256')==(INNER+'  manifest.json\n').encode()
 assert H(root/'inner-reader.py')==m['verify.py']['sha256']
 destination=Path(os.path.abspath(destination));plain(destination.parent);assert not destination.exists();destination.mkdir()
 for n,row in layout['files'].items():
  rel=PurePosixPath(n);assert str(rel)==n and not rel.is_absolute()and'..'not in rel.parts
  target=destination/n;target.parent.mkdir(parents=True,exist_ok=True);digest=hashlib.sha256();length=0
  with target.open('xb')as out:
   for part in row['parts']:
    assert part['offset']==length
    source=root/part['path'];assert H(source)==part['sha256']and source.stat().st_size==part['bytes']
    with source.open('rb')as stream:
     while block:=stream.read(1024*1024):out.write(block);digest.update(block);length+=len(block)
  assert digest.hexdigest()==m[n]['sha256']==row['sha256']and length==m[n]['bytes']==row['bytes'],n
  target.chmod(row['mode'])
 (destination/'manifest.json').write_bytes(raw);(destination/'manifest.sha256').write_bytes(data(root/'inner-manifest.sha256'))
 strict_package(destination,INNER);assert data(destination/'verify.py')==data(root/'inner-reader.py')
 return destination
if __name__=='__main__':
 p=argparse.ArgumentParser();p.add_argument('--expected-seal',required=True);p.add_argument('--output',type=Path,required=True);a=p.parse_args();result=materialize(Path(__file__).resolve().parent,a.expected_seal,a.output);print(json.dumps({'materialized':str(result),'inner_seal':INNER,'lossless':True,'target_executions':0,'builds':0}))
