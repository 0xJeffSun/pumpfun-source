from pathlib import Path
import shutil,json,hashlib
src=Path('/Users/shawwalters/.nvm/versions/node/v24.22.1/lib/node_modules/rea-agents')
dst=Path('/Users/shawwalters/.local/share/rea-tools/rea-agents-6.8.0-sbpf')
if dst.exists(): shutil.rmtree(dst)
shutil.copytree(src,dst,ignore=shutil.ignore_patterns('node_modules'))
(dst/'node_modules').symlink_to(src/'node_modules',target_is_directory=True)
records=[]
for rel in ['dist/domain/elfFixedHeader.js','dist/cli-runtime/peMachine-BoMBJgsB.js','dist/mcp/peMachine-D9uANXTA.js']:
 p=dst/rel;t=p.read_text();before=t
 if rel=='dist/domain/elfFixedHeader.js':
  needle='        case 243: // EM_RISCV:';replacement='        case 263: // Local adapter: EM_SBF; requires explicit Ghidra sBPF processor.\n            return "sbpf";\n'+needle
 else:
  needle='\t\t\t\tcase 243: return "riscv";';replacement='\t\t\t\tcase 263: return "sbpf";\n'+needle
 assert t.count(needle)==1,rel;t=t.replace(needle,replacement)
 gate='if (machine === 263 && (elfClass !== 64 || !littleEndian || readU16(16) !== 3 || readU32(48) !== 0)) return err("Local sBPF adapter admits only ELF64 little-endian ET_DYN with flags zero");'
 at='const headerSize = readU16(elfClass === 32 ? 40 : 52);'
 assert t.count(at)==1,rel
 t=t.replace(at,at+'\n'+gate);p.write_text(t)
 records.append({'file':rel,'original_sha256':hashlib.sha256(before.encode()).hexdigest(),'adapter_sha256':hashlib.sha256(t.encode()).hexdigest()})
# Extend only named architecture inventories, including bundled CLI/MCP copies.
import re
for p in sorted((dst/'dist').rglob('*.js')):
 t=p.read_text();before=t
 pattern=r'((?:BINARY_ARCHITECTURES = \[|SUPPORTED_ARCHITECTURES = new Set\(\[)(.*?)(?:\]))'
 def extend(m):
  body=m.group(0)
  if '"hexagon"' not in body:return body
  return body.replace('"hexagon"','"hexagon", "sbpf"')
 t=re.sub(pattern,extend,t,flags=re.S)
 if t!=before:
  p.write_text(t);records.append({'file':str(p.relative_to(dst)),'original_sha256':hashlib.sha256(before.encode()).hexdigest(),'adapter_sha256':hashlib.sha256(t.encode()).hexdigest()})
# Repair declared sBPF call relocations before creating function seeds.
p=dst/'bridge/ghidra/ReaGhidraApplySeeds.java';before=p.read_text();t=before
method=Path(__file__).with_name('relocation-method.java.txt').read_text()
t=t.replace('        String[] args = getScriptArgs();','        applySbfCallRelocations();\n        String[] args = getScriptArgs();')
pos=t.index('    @Override');t=t[:pos]+method+'\n'+t[pos:];p.write_text(t)
records.append({'file':str(p.relative_to(dst)),'original_sha256':hashlib.sha256(before.encode()).hexdigest(),'adapter_sha256':hashlib.sha256(t.encode()).hexdigest()})
Path(__file__).with_name('adapter-manifest.json').write_text(json.dumps({'package':'rea-agents@6.8.0','root':str(dst),'scope':'Experimental local EM_SBF admission for explicit sBPF Ghidra language; no binary bytes patched; not upstream support or runtime equivalence proof.','files':records},indent=2)+'\n')
print(dst)

import subprocess,sys
subprocess.run([sys.executable,str(Path(__file__).with_name("patch_evidence_metadata.py"))],check=True)
