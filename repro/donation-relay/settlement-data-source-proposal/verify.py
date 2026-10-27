#!/usr/bin/env python3
"""Source-only integrity/materialization; local ELF comparison is explicit opt-in."""
import argparse, difflib, hashlib, importlib.util, json, subprocess
from pathlib import Path, PurePosixPath
HERE=Path(__file__).resolve().parent
ROOT=next(p for p in HERE.parents if(p/'.git').exists())
ORDER=['anchor-facade','natural485-facade','natural485-tight']
def sha(data):return hashlib.sha256(data).hexdigest()
def read(path):return json.loads(path.read_bytes())
def safe(name):
 p=PurePosixPath(name);assert name and not p.is_absolute() and str(p)==name and '..'not in p.parts and '\\'not in name;return p
def file(folder,name):
 p=folder
 for part in safe(name).parts:p=p/part;assert not p.is_symlink()
 assert p.resolve().is_relative_to(folder.resolve());return p
def manifest(folder=HERE):
 assert not any(p.is_symlink()for p in folder.rglob('*'))
 expected=read(folder/'manifest.json');actual={str(p.relative_to(folder))for p in folder.rglob('*')if p.is_file()and p.name!='manifest.json'and'__pycache__'not in p.parts};assert actual==set(expected)
 for name,digest in expected.items():
  data=file(folder,name).read_bytes();assert sha(data)==digest,name;assert b'\0'not in data;data.decode('utf8');assert not name.endswith(('.so','.gz','.bz2','.zip','.tar'))
def public_blob(revision,name):
 safe(name);assert len(revision)==40 and all(c in '0123456789abcdef'for c in revision)
 return subprocess.check_output(['git','--no-optional-locks','show',revision+':'+name],cwd=ROOT)
def patch(before,after):
 return ''.join(''.join(difflib.unified_diff(before[n].decode().splitlines(True),after[n].decode().splitlines(True),fromfile='a/'+n,tofile='b/'+n))for n in sorted(after)if before[n]!=after[n])
def sources(folder=HERE):
 base=read(folder/'baseline-sources.json');source={}
 for name,row in base['files'].items():
  safe(name);data=public_blob(base['revision'],row['path']);assert sha(data)==row['sha256'];source[name]=data
 spec=read(folder/'variants.json');assert spec['order']==ORDER;result={}
 for i,label in enumerate(ORDER):
  before=dict(source);meta=spec['variants'][label];assert meta['parent']==(ORDER[i-1]if i else None)
  if i:
   overrides=folder/'overrides'/label;actual={str(p.relative_to(overrides))for p in overrides.rglob('*')if p.is_file()};assert actual==set(meta['changed_files'])
   for name in sorted(actual):source[name]=file(overrides,name).read_bytes();assert source[name]!=before[name]
   assert patch(before,source).encode()==(folder/(label+'.patch')).read_bytes()
  assert len(source)==60 and {n:sha(b)for n,b in source.items()}==meta['files'];result[label]=dict(source)
 return result
def reports(folder=HERE):
 previous=None
 for i,label in enumerate(ORDER):
  r=read(folder/'measurements'/(label+'.json'));s=r['summary'];assert s['original_normalized_match_windows']==[483,485,485][i] and s['original_raw_match_windows']==142 and not s['whole_file_equal']
  assert s['recursive_call_shape_closed_pairs']==[644,650,650][i]
  for kind in ['normalized','raw']:
   values=r['inventories'][kind];assert len(values)==s['original_'+kind+'_match_windows']
   before=previous['inventories'][kind]if previous else values
   assert r['transitions'][kind]=={'gained':sorted(set(values)-set(before)),'lost':sorted(set(before)-set(values))}
  assert r['transitions']['normalized']['gained']==([96,99]if i==1 else[]) and not r['transitions']['normalized']['lost']
  assert r['transitions']['raw']=={'gained':[],'lost':[]}
  section={x['name']:x for x in r['sections']};assert section['.text']['length_delta']==[320,304,120][i]
  assert section['.rodata']['common_position_differences']==[321,321,0][i]
  previous=r
 return {'source_variants':3,'inputs_per_variant':60,'compiler_executed':False,'runtime_verified':False,'elf_comparison':'not requested'}
def materialize(destination,source):
 assert not destination.exists() and not destination.is_symlink();assert not any(p.is_symlink()for p in destination.parents);destination.mkdir(parents=True)
 for name,data in source.items():p=file(destination,name);p.parent.mkdir(parents=True,exist_ok=True);p.write_bytes(data)
 assert {str(p.relative_to(destination)):sha(p.read_bytes())for p in destination.rglob('*')if p.is_file()}=={n:sha(b)for n,b in source.items()}
def main():
 p=argparse.ArgumentParser(description=__doc__);p.add_argument('--materialize',type=Path);p.add_argument('--variant',choices=ORDER,default=ORDER[-1]);p.add_argument('--verify-local',type=Path);args=p.parse_args();manifest();s=sources();r=reports()
 if args.materialize:materialize(args.materialize,s[args.variant])
 if args.verify_local:
  spec=importlib.util.spec_from_file_location('tight_optional_comparison',HERE/'compare.py');m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m);r['elf_comparison']=m.compare(args.verify_local)
 print(json.dumps(r,sort_keys=True))
if __name__=='__main__':main()
