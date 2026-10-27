from pathlib import Path
import gzip,hashlib,json,shutil
W=Path(__file__).resolve().parent;P=W/'mayhem-source-data-native'
for original in ['alloc-provider','error-provider','both-providers']:
 source=P/original;out=P/(original+'-yes');out.mkdir(exist_ok=False)
 for n in ['sources','builds']:shutil.copytree(source/n,out/n)
 for n in ['build.py','sdk-components.json.gz','target-components.json','vendor-inputs.json']:shutil.copyfile(source/n,out/n)
 path=out/'sources/Cargo.toml.gz';before=gzip.decompress(path.read_bytes());assert before.count(b'-Zshare-generics=no')==(2 if original=='both-providers'else 1)
 after=before.replace(b'-Zshare-generics=no',b'-Zshare-generics=yes');path.write_bytes(gzip.compress(after,mtime=0))
 inputs=json.loads((source/'source-inputs.json').read_bytes())
 for row in inputs['source_files']:
  data=gzip.decompress((out/'sources'/(row['path']+'.gz')).read_bytes());row['bytes']=len(data);row['sha256']=hashlib.sha256(data).hexdigest()
 (out/'source-inputs.json').write_text(json.dumps(inputs,indent=2)+'\n')
 print(out.name)
