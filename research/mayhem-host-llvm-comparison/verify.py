"""Read-only verification of one captured same-IR host LLVM diagnostic."""
from pathlib import Path
import argparse,gzip,hashlib,io,json,struct,tarfile
P=Path(__file__).resolve().parent
PINS={'source-inputs.json': 'e9ac5359e4d20ced3c2aabe25fe1e94ee3fff011b944b12e8e46961a0f8c2121', 'source-build/launch.json': 'bbe530046b1dea845cf5617b4c589edc3f7a3602c18b5a03f1745837fe44b37e', 'source-build/result.json': '23f454bb9aa3046f24c3e6e459eb406faaf199dcd711087574bc2dc7751bdba4', 'captured/comparison.json': '2cf51e4532840bd6f16946c1d005ed7868d557ff9a667f7836d15ffb59d206c0', 'captured/mac-llc-receipt.json': '6c411323566870a25e89bbdaddc09bf7040ef1247ceb88c1c5e555ffcdf1e9df', 'captured/linux-llc-receipt.json': '691f0ed911c9f332d106e4ebe66d7c753f3af690bc0e3e70390c1d0e95067e95', 'captured/linux-version.txt': '8537e219cee1890b943d3b08a6fc3688df27627056ff10096d4dfd3e449e01bf', 'captured/mac-version.txt': '757b9bd494701555f59fe21849a09113604b1c83f2f8f618cf4099157ae09b8b', 'captured/guest-environment.txt': 'c7ce81347cc0215b4878f82d99362012a8a05084fdd6fff817b2041faee66041', 'captured/input-provenance.json': '7345ccb1712a1bc4889df2f472dd4054d053f31e3e6ffc2c1f825a81dc77afee', 'captured/lima.yaml': 'd0ee00e7d798ddcae6bc4040358f066c7477310de9d0e66535108e0f376831d4', 'licenses/LLVM-LICENSE.txt': '8d85c1057d742e597985c7d4e6320b015a9139385cff4cbae06ffc0ebe89afee', 'licenses/source-MIT.txt': 'ba51a7cc271409e95725baccc1114eb103094614019f58fa132ec6dfbd1bef0c', 'licenses/rust-LICENSE-APACHE.txt': 'cfc7749b96f63bd31c3c42b5c471bf756814053e847c10f3eb003417bc523d30', 'licenses/rust-LICENSE-MIT.txt': 'eb07d497d26e6d68fbc76e793f5e5c9cfa197df2a580e47383569c287a55edf9'}
sha=lambda b:hashlib.sha256(b).hexdigest()
def read(p):return gzip.decompress(p.read_bytes())if p.suffix=='.gz'else p.read_bytes()
def load(p):return json.loads(read(p))
def verify(p=P):
 assert not any(f.is_symlink()for f in p.rglob('*'))
 actual={str(f.relative_to(p)):sha(f.read_bytes())for f in p.rglob('*')if f.is_file()and f!=p/'manifest.json'}
 assert load(p/'manifest.json')==actual
 for name,digest in PINS.items():assert sha((p/name).read_bytes())==digest,name
 ir=read(p/'artifacts/input.ll.gz');obj=read(p/'artifacts/object.o.gz');c=load(p/'captured/comparison.json')
 assert sha(ir)=='ca8cc7e10774da9acb15ef872539b54dc121ed502b23eaf7b949e283643f9347'
 assert sha(obj)=='5a933121645fcb08c822bde8dce55051ea803e75af5287ec2b5afb3be354f544'and len(obj)==1096664
 assert obj[:6]==b'\x7fELF\x02\x01'and struct.unpack_from('<HH',obj,16)==(1,263)
 assert c['input_ir_sha256']==sha(ir)and c['whole_object_identical']is True and c['overlap_differing_bytes']==0
 for host in ['mac','linux']:
  assert c[host+'_object_sha256']==sha(obj)and c[host+'_object_bytes']==len(obj)
  run=load(p/f'captured/{host}-llc-receipt.json');assert run['returncode']==0
  args=run['command'];assert args[-4]=='-filetype=obj'and args[-3].endswith('/input.ll')and args[-2]=='-o'and args[-1].endswith('/'+host+'.o')
  assert args[-5]=='-O2'
 assert c['tools']=={'mac_llc_sha256':'6532743a6d22940d60c4167a097226b71659e54625df2ed5d5970f0edb020efa','linux_llc_sha256':'acd8842584712b96cccbeac3dbf20156367497ca156ee6346b462860c9e7f2c5'}
 for host in ['mac','linux']:
  assert 'LLVM version 20.1.7-rust-dev' in (p/f'captured/{host}-version.txt').read_text()
 assert load(p/'captured/stop-receipt.json')['returncode']==0
 runs=[load(f)for f in(p/'captured').glob('*-receipt.json')]
 assert min(x['minimum_free_bytes']for x in runs)>=2*1024**3
 assert max(x['peak_vm_disk_allocated_bytes']for x in runs)==1410994176
 assert c['peak_observed_vm_allocated_bytes']==1269321728
 source={}
 with tarfile.open(fileobj=io.BytesIO(read(p/'source.tar.gz')),mode='r:')as t:
  for m in t:
   assert m.isfile()and not m.name.startswith('/')and'..'not in Path(m.name).parts and m.name not in source
   source[m.name]=t.extractfile(m).read()
 hashes={n:sha(b)for n,b in source.items()};assert len(hashes)==66 and hashes==load(p/'source-inputs.json')
 launch=load(p/'source-build/launch.json');result=load(p/'source-build/result.json');assert launch['source_inputs']==hashes and '--emit=link,llvm-ir'in launch['command']
 assert result['returncode']==0 and all(result[k]for k in ['source_unchanged','tools_unchanged','target_libraries_unchanged'])
 for name in ['stdout','stderr']:assert sha(read(p/f'source-build/{name}.gz'))==result[name+'_sha256']
 assert result['candidate_sha256']=='0580f26842755b8466cfa2c3e8b60ccdaca29e2c9b4e847b8381cdadd567c268'
 assert b'target triple = "sbf"'in ir and b'state10initialize'in ir
 return dict(input_ir_sha256=sha(ir),object_sha256=sha(obj),object_bytes=len(obj),mac_linux_object_identical=True,retained_object_copies=1,source_inputs=66,compiler_executed=False,target_executed=False,original_ELF_identity_gain=False,scope='One saved IR lowered by two pinned LLVM hosts. No full Rust frontend or linked-program equivalence claim.')
if __name__=='__main__':
 a=argparse.ArgumentParser();a.add_argument('--packet',type=Path,default=P);print(json.dumps(verify(a.parse_args().packet),indent=2))
