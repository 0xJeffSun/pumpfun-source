from pathlib import Path
import hashlib,json,subprocess,tarfile,re,sys
p=Path(__file__).resolve().parent;compiler=Path('/Users/shawwalters/.cache/solana/v1.44/platform-tools/rust/bin/rustc');source=Path('repro/rea/2026-10-26/type-id-probes/probe.rs').resolve();target=[17468942302809253682,537780998277994213]
for host in sys.argv[1:]:
 root=Path('/Users/shawwalters/.cache/solana/v1.44-linux-probe');root.mkdir(exist_ok=True);archive=Path('work/linux-v144-provenance/platform-tools-linux-x86_64.tar.bz2');dest=root/'platform-tools';dest.mkdir(exist_ok=True)
 print('extracting target sysroot',host,flush=True)
 with tarfile.open(archive,'r|bz2') as tf:
  for m in tf:
   if '/rustlib/sbf-solana-solana/' not in m.name and not m.name.endswith('version.md'):continue
   assert not m.name.startswith('/') and '..' not in Path(m.name).parts and not m.issym() and not m.islnk(),m.name
   tf.extract(m,dest,filter='data')
 rustroot=dest/'rust';libs=rustroot/'lib/rustlib/sbf-solana-solana/lib';assert libs.is_dir()
 H=lambda b:hashlib.sha256(b).hexdigest();before={x.name:H(x.read_bytes()) for x in libs.iterdir() if x.is_file()}
 output=p/(host+'.ll');cmd=[str(compiler),str(source),'--sysroot',str(rustroot),'--target','sbf-solana-solana','--crate-type','lib','--emit=llvm-ir','-O','-o',str(output)]
 run=subprocess.run(cmd,capture_output=True,text=True);record={'host':host,'command':cmd,'returncode':run.returncode,'stderr':run.stderr,'archive_sha256':H(archive.read_bytes()),'library_sha256':before,'sysroot_unchanged':before=={x.name:H(x.read_bytes()) for x in libs.iterdir() if x.is_file()}}
 if run.returncode==0:
  blocks=re.findall(r'define internal \{ i64, i64 \}.*?type_id.*?\n\}',output.read_text(),re.S)
  assert len(blocks)==1;nums=re.findall(r'ret \{ i64, i64 \} \{ i64 (-?\d+), i64 (-?\d+) \}',blocks[0]);assert len(nums)==1
  record['type_id_u64']=[int(x)%(1<<64) for x in nums[0]];record['matches_original']=record['type_id_u64']==target;record['ir_sha256']=H(output.read_bytes())
 (p/(host+'.json')).write_text(json.dumps(record,indent=2)+'\n');print(host,{k:v for k,v in record.items() if k in ['returncode','type_id_u64','matches_original']},flush=True)
