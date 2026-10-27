#!/usr/bin/env python3
"""Source-only integrity/materialization; local ELF comparison is explicit opt-in."""
import argparse, difflib, hashlib, importlib.util, json, subprocess
from pathlib import Path, PurePosixPath
HERE=Path(__file__).resolve().parent
ROOT=next(p for p in HERE.parents if(p/'.git').exists())
ORDER=['baseline','integrated','diagnostics']
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
 return ''.join(''.join(difflib.unified_diff(before.get(n,b'').decode().splitlines(True),after[n].decode().splitlines(True),fromfile='a/'+n,tofile='b/'+n))for n in sorted(after)if before.get(n)!=after[n])
def sources(folder=HERE):
 before={}
 for name,row in read(folder/'baseline-sources.json')['files'].items():
  safe(name);data=public_blob(row['revision'],row['path']);assert sha(data)==row['sha256'];before[name]=data
 spec=read(folder/'variants.json');assert spec['order']==ORDER;result={}
 for label in ORDER:
  meta=spec['variants'][label];parent={'baseline':None,'integrated':'baseline','diagnostics':'integrated'}[label];assert meta['parent']==parent
  source=dict(result[parent])if parent else dict(before);old=dict(source);overrides=folder/'overrides'/label
  actual={str(p.relative_to(overrides))for p in overrides.rglob('*')if p.is_file()};assert actual==set(meta['changed_files'])
  for name in actual:source[name]=file(overrides,name).read_bytes();assert source[name]!=old.get(name)
  assert len(source)==42
  assert {n:sha(b)for n,b in source.items()}==meta['files']
  if parent:assert patch(old,source).encode()==(folder/(label+'.patch')).read_bytes()
  result[label]=source
 # This union changes neither dependency manifest nor lock.
 for label in ORDER[1:]:
  for name in ['Cargo.lock','Cargo.toml','programs/pump-fees/Cargo.toml','pump-fees-math/Cargo.toml']:
   assert result[label][name]==result['baseline'][name]

 return result
def reports(folder=HERE):
 expected=read(folder/'expected.json')
 for label,count,locations in zip(ORDER,[545,550,550],[161,163,163]):
  r=expected['reports'][label];assert r['normalized']==count and r['raw']==118 and r['location_equal']==locations
  assert not r['whole_capture_equal']and not r['whole_meaningful_elf_equal']and not r['runtime_verified']
 return {'source_variants':3,'inputs_per_variant':[42,42,42],'compiler_executed':False,'runtime_verified':False,'elf_comparison':'not requested'}

def materialize(destination,source):
 assert not destination.exists() and not destination.is_symlink();assert not any(p.is_symlink()for p in destination.parents);destination.mkdir(parents=True)
 for name,data in source.items():p=file(destination,name);p.parent.mkdir(parents=True,exist_ok=True);p.write_bytes(data)
 assert {str(p.relative_to(destination)):sha(p.read_bytes())for p in destination.rglob('*')if p.is_file()}=={n:sha(b)for n,b in source.items()}
def main():
 p=argparse.ArgumentParser(description=__doc__);p.add_argument('--materialize',type=Path);p.add_argument('--variant',choices=ORDER,default='diagnostics')
 for label in ORDER:p.add_argument('--'+label+'-build',type=Path)
 args=p.parse_args();manifest();source=sources();r=reports()
 if args.materialize:materialize(args.materialize,source[args.variant])
 builds={label:getattr(args,label+'_build')for label in ORDER};assert all(builds.values())or not any(builds.values()),'Supply all three build directories'
 if all(builds.values()):
  spec=importlib.util.spec_from_file_location('fees_math_pack_optional',HERE/'compare.py');m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m);r['elf_comparison']=m.compare(builds)
 print(json.dumps(r,sort_keys=True))
if __name__=='__main__':main()
