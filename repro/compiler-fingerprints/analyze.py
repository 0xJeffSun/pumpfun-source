#!/usr/bin/env python3
"""Read-only ELF/stdlib fingerprint extraction. Outputs only next to this script."""
import hashlib,json,re,struct,subprocess
from pathlib import Path
ROOT=Path(__file__).resolve().parent
REPO=ROOT.parent.parent
PROGRAMS=['pump','pump_amm','pump_fees','mayhem']
TOOLCHAINS={'v1.41':REPO/'work/toolchains/v1.41','v1.43':Path.home()/'.cache/solana/v1.43/platform-tools','v1.48':REPO/'work/toolchains/v1.48','v1.52':Path.home()/'.cache/solana/v1.52/platform-tools'}
def sha(b):return hashlib.sha256(b).hexdigest()
def sections(b):
 shoff=struct.unpack_from('<Q',b,40)[0];entsize,count,idx=struct.unpack_from('<HHH',b,58)
 raw=[struct.unpack_from('<IIQQQQIIQQ',b,shoff+i*entsize) for i in range(count)]
 names=b[raw[idx][4]:raw[idx][4]+raw[idx][5]]
 return {names[r[0]:].split(b'\0',1)[0].decode():{'address':r[3],'offset':r[4],'size':r[5],'flags':r[2]} for r in raw},shoff+count*entsize
programs={}
for name in PROGRAMS:
 path=REPO/'evidence/original'/name/'deployed.so';b=path.read_bytes();secs,extent=sections(b)
 rel=secs['.rel.dyn'];relocs={struct.unpack_from('<Q',b,o)[0]:struct.unpack_from('<Q',b,o+8)[0] for o in range(rel['offset'],rel['offset']+rel['size'],16)}
 data=secs['.data.rel.ro'];paths=[]
 for m in re.finditer(rb'(?:/home/runner/work/platform-tools/platform-tools/out/rust/)?library/(?:alloc|core|std)/src/[a-zA-Z0-9_/]+\.rs',b):
  records=[]
  for nul in [False,True]:
   if nul and b[m.end()]!=0:continue
   length=len(m[0])+int(nul);needle=struct.pack('<QQ',m.start()<<32,length);off=data['offset']
   while (off:=b.find(needle,off,data['offset']+data['size']))>=0:
    line,column=struct.unpack_from('<II',b,off+16)
    if relocs.get(off)==8 and 0<line<100000 and 0<column<1000:records.append({'record_offset':off,'line':line,'column':column,'stored_filename_length':length,'filename_includes_trailing_nul':nul,'relocation_info':8,'pointer_encoding':'file_offset << 32'})
    off+=1
  paths.append({'path_offset':m.start(),'path':m[0].decode(),'records':records})
 programs[name]={'file':str(path.relative_to(REPO)),'sha256':sha(b),'bytes':len(b),'elf_extent':extent,'elf_sha256':sha(b[:extent]),'elf_flags':struct.unpack_from('<I',b,48)[0],'rodata_flags':secs['.rodata']['flags'],'stdlib_paths':paths,'hashbrown_0_15_4_path_offset':b.find(b'/home/runner/.cargo/registry/src/index.crates.io-1949cf8c6b5b557f/hashbrown-0.15.4/src/raw/mod.rs')}
(ROOT/'panic-locations.json').write_text(json.dumps({n:p['stdlib_paths'] for n,p in programs.items()},indent=2)+'\n')
toolchains={}
for version,base in TOOLCHAINS.items():
 compiler=base/'rust/bin/rustc';info={'path':str(base),'rustc_sha256':sha(compiler.read_bytes()),'rustc_vV':subprocess.check_output([str(compiler),'-vV'],text=True),'version_md':(base/'version.md').read_text(),'version_md_sha256':sha((base/'version.md').read_bytes()),'files':{}}
 for path in sorted({p['path'].split('/rust/')[-1] for b in programs.values() for p in b['stdlib_paths']}):
  f=base/'rust/lib/rustlib/src/rust'/path
  info['files'][path]=sha(f.read_bytes()) if f.exists() else None
 toolchains[version]=info
(ROOT/'analysis.json').write_text(json.dumps({'programs':programs,'toolchains':toolchains},indent=2)+'\n')
print('Extracted', {n:sum(len(p['records']) for p in b['stdlib_paths']) for n,b in programs.items()})
