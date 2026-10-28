from pathlib import Path
import hashlib,importlib.util,json,subprocess
R=Path('/mnt/c/Users/ahi20/Documents/ChatGPT/pumpfun-source');B=Path('/home/ahi200/pumpfun-work/20261028-fees-causal')
sha=lambda b:hashlib.sha256(b).hexdigest()
s=importlib.util.spec_from_file_location('elf',R/'research/fees-composed-frontier188/elf_helpers.py');m=importlib.util.module_from_spec(s);s.loader.exec_module(m)
for label in ['before','after']:
 D=B/label;I=D/'ir-with-env';out=D/'ir-qualified';out.mkdir(exist_ok=False)
 symbols=next(I.glob('*.so'));record=json.loads((I/'launch.json').read_bytes());cmd=record['command'];docker=cmd[:cmd.index('/sdk/rust/bin/rustc')]
 strip=docker+['/strip-sdk/llvm/bin/llvm-objcopy','--strip-all','/output/ir-with-env/'+symbols.name,'/output/ir-qualified/candidate.so']
 (out/'strip-command.json').write_text(json.dumps(strip,indent=2)+'\n');subprocess.run(strip,check=True)
 a=(D/'symbols.so').read_bytes();b=symbols.read_bytes();actual=(out/'candidate.so').read_bytes();expected=(D/'candidate.so').read_bytes()
 sections=[]
 for sec in m.elf_layout(a)['sections']:
  if sec['flags']&2:
   other=next(s for s in m.elf_layout(b)['sections']if s['name']==sec['name'])
   equal=sec['address']==other['address']and m.section_data(a,sec['name'])==m.section_data(b,sec['name'])
   sections.append(dict(name=sec['name'],bytes=sec['size'],equal=equal));assert equal
 assert actual==expected
 result=dict(ir_sha256=sha((I/'root.ll').read_bytes()),ir_link_symbols_sha256=sha(b),native_symbols_sha256=sha(a),symbols_equal=a==b,stripped_candidate_sha256=sha(actual),stripped_candidate_equal=actual==expected,allocated_sections=sections,scope='LLVM IR emission preserves entire stripped native candidate. Unstripped symbol tables differ and are not labeled identical.')
 (out/'result.json').write_text(json.dumps(result,indent=2)+'\n');print(label,result['stripped_candidate_sha256'],result['stripped_candidate_equal'],flush=True)
