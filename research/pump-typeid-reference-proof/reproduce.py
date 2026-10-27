"""Recompile the public source with both authenticated Linux v1.44 target libraries."""
from pathlib import Path
import argparse,datetime,gzip,hashlib,json,subprocess,tarfile
from elf import members,symbols,symbol_body,thunk
P=Path(__file__).resolve().parent
ARCHIVE='6719b889d60677a8a2fcf4c82f68441a1afe0ab093edd2efe9f84a67a808b3e9'
IMAGE='solanafoundation/solana-verifiable-build@sha256:6c73adc767ee7ff212f2532d4695472b12f3d4ac20aea3db22b89d8c614dac50'
TARGETS=('sbf-solana-solana','sbpf-solana-solana')
def sha(raw):return hashlib.sha256(raw).hexdigest()
def inventory(sdk):
 paths=[sdk/'rust/bin/rustc']
 paths += [p for p in (sdk/'rust/lib').iterdir()if p.is_file()]
 for target in TARGETS:paths += [p for p in (sdk/'rust/lib/rustlib'/target).rglob('*')if p.is_file()]
 return {p.relative_to(sdk).as_posix():sha(p.read_bytes())for p in sorted(paths)}
def write(path,value):path.write_text(json.dumps(value,indent=2)+'\n')
def main():
 parser=argparse.ArgumentParser(description=__doc__);parser.add_argument('--sdk',type=Path,required=True);parser.add_argument('--archive',type=Path,required=True);parser.add_argument('--output',type=Path,required=True);a=parser.parse_args()
 sdk=a.sdk.resolve();output=a.output.resolve();output.mkdir(parents=True,exist_ok=False)
 assert sha(a.archive.read_bytes())==ARCHIVE
 inputs=inventory(sdk);authenticated={}
 with tarfile.open(a.archive,mode='r|bz2')as t:
  for member in t:
   name=member.name.removeprefix('./')
   if name in inputs and member.isfile():authenticated[name]=sha(t.extractfile(member).read())
 assert authenticated==inputs,'SDK inputs differ from authenticated archive members'
 write(output/'sdk-inputs.json',dict(archive_sha256=ARCHIVE,files=inputs))
 source=P/'source';source_inputs={p.name:sha(p.read_bytes())for p in source.iterdir()if p.is_file()}
 for target in TARGETS:
  d=output/target;d.mkdir()
  docker=['docker','run','--rm','--network','none','--platform','linux/amd64','--mount',f'type=bind,source={sdk},target=/sdk,readonly','--mount',f'type=bind,source={source},target=/source,readonly','--mount',f'type=bind,source={d},target=/output','-w','/source',IMAGE,'env','-i','PATH=/sdk/rust/bin:/usr/bin:/bin','HOME=/output','RUSTC_BOOTSTRAP=1']
  command=docker+['/sdk/rust/bin/rustc','--edition','2021','--crate-type','lib','--crate-name','typeid_probe','--target',target,'-C','opt-level=3','-C','panic=abort','--emit=asm,obj','--out-dir','/output','/source/probe.rs']
  write(d/'launch.json',dict(command=command,started=datetime.datetime.now(datetime.timezone.utc).isoformat(),source_inputs=source_inputs,sdk_inputs_sha256=sha((output/'sdk-inputs.json').read_bytes()),controller_sha256=sha(Path(__file__).read_bytes()),original_mounted=False))
  with(d/'compile.log').open('wb')as log:r=subprocess.run(command,stdout=log,stderr=subprocess.STDOUT)
  write(d/'result.json',dict(returncode=r.returncode,source_unchanged=source_inputs=={p.name:sha(p.read_bytes())for p in source.iterdir()if p.is_file()},sdk_unchanged=inventory(sdk)==inputs,files={p.name:sha(p.read_bytes())for p in d.iterdir()if p.is_file()}));r.check_returncode()
  assert inventory(sdk)==inputs
  core=next((sdk/'rust/lib/rustlib'/target/'lib').glob('libcore-*.rlib'));chosen=[]
  for member in members(core.read_bytes()):
   if not member['name'].endswith('.o'):continue
   syms=[s for s in symbols(member['bytes'])if s['type']==2 and s['size']==56 and thunk(symbol_body(member['bytes'],s))]
   if syms:
    assert len(syms)==1;chosen.append(member)
    (d/'core-member.o.gz').write_bytes(gzip.compress(member['bytes'],mtime=0))
    write(d/'core-member.json',dict(archive=core.relative_to(sdk).as_posix(),archive_sha256=sha(core.read_bytes()),member=member['name'],offset=member['offset'],size=len(member['bytes']),sha256=sha(member['bytes']),symbol=syms[0],value=[f'{v:016x}'for v in thunk(symbol_body(member['bytes'],syms[0]))]))
  assert len(chosen)==1
  print(target,'native object/assembly and authenticated core member retained',flush=True)
if __name__=='__main__':main()
