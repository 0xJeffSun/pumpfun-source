"""Pinned canonical-source selection, exact bytes and real-loader production evidence."""
from pathlib import Path
import ast,hashlib,json
HERE=Path(__file__).resolve().parent
TRANSITION_SHA256="9cb8f436a234c221af359f39eb236d5b3a90a3ef5fc94b752a5c3498fec95ba7"
GOVERNANCE_SHA256="377eadc0a36f3f2f64f9c9ad7d8b5b24899927861e2b4f7b6577cae7dbb24b69"
def authenticate():
 assert hashlib.sha256((HERE/'governance.json').read_bytes()).hexdigest()==GOVERNANCE_SHA256
 for n,h in json.loads((HERE/'governance.json').read_bytes())['critical_code'].items():
  p=HERE/n;assert not p.is_symlink() and hashlib.sha256(p.read_bytes()).hexdigest()==h,('critical code',n)
 rows=json.loads((HERE/'manifest.json').read_bytes())['files']
 actual={str(f.relative_to(HERE))for f in HERE.rglob('*')if f.is_file() and '__pycache__'not in f.parts and f.name not in ['manifest.json','manifest.sha256']}
 assert actual==set(rows)
 assert hashlib.sha256((HERE/'manifest.json').read_bytes()).hexdigest()==(HERE/'manifest.sha256').read_text().split()[0]
 for n,r in rows.items():
  p=HERE/n;assert not p.is_symlink() and p.stat().st_size==r['bytes'] and hashlib.sha256(p.read_bytes()).hexdigest()==r['sha256'],n
def verify(root):
 root=Path(root).resolve()
 authenticate()
 from selection_gate import verify as verify_gate
 result=verify_gate(root,HERE/'transition.json',TRANSITION_SHA256)
 t=json.loads((HERE/'transition.json').read_bytes());launch=json.loads((root/t['new']['canonical_build_receipt']).read_bytes())
 create=launch['create'];command=launch['command']
 assert create[create.index('--network')+1]=='none' and launch['fresh_target'] is True
 mounts=[create[i+1]for i,x in enumerate(create)if x=='-v']
 assert len(mounts)==6 and str(root/'programs/donation-relay')+':/source:ro' in mounts
 assert str(HERE/'layout')+':/config:ro' in mounts
 assert all(any(m.endswith(':'+n+':ro') for m in mounts)for n in ['/source','/config','/sdk','/cargo/registry'])
 assert all(not any(x in m for x in ['evidence/','candidate.so','linked-elf-reproduction/artifacts']) for m in mounts)
 assert command[command.index('-w')+1]=='/source' and '/source/Cargo.toml' in command and '--offline' in command and '--locked' in command
 assert command[command.index('--target')+1]=='sbpf-solana-solana'
 assert launch['rustc_sha256']=='89fd4ccdd6e678a24c2cda074b498b46a352fcfce21018119c9526751afc678d'
 # The producer is exactly the reviewed loader function, plus saving its actual account payload.
 parent=(root/t['new']['loader_runner']).read_text();parent=parent[parent.index('def execute('):parent.index('\ndef verify_static')]
 producer=(HERE/'produce_payload.py').read_text();producer=producer[producer.index('def execute('):producer.index("\nif __name__")]
 producer=producer.replace('def execute(elf,CAPACITY,original,output):','def execute(elf,CAPACITY,original):').replace('\n    Path(output).write_bytes(payload)','')
 assert ast.dump(ast.parse(parent))==ast.dump(ast.parse(producer))
 return result
