"""Pinned canonical-source selection, exact bytes and real-loader production evidence."""
from pathlib import Path
import ast,hashlib,json
HERE=Path(__file__).resolve().parent
TRANSITION_SHA256="9cb8f436a234c221af359f39eb236d5b3a90a3ef5fc94b752a5c3498fec95ba7"
GOVERNANCE_SHA256 = 'a2fe8ef6fd68910e4a34c9795dd74433ef02dda2a21451a52467d38eb084fd62'
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
def recorded_mounts(launch):
 from pathlib import PurePosixPath
 create=launch['create'];assert create[create.index('--network')+1]=='none' and launch['fresh_target'] is True
 rows=[create[i+1].rsplit(':',2)for i,x in enumerate(create)if x=='-v'];assert len(rows)==6 and all(len(x)==3 for x in rows)
 mounts={dest:(host,mode)for host,dest,mode in rows};assert len(mounts)==6
 assert {k:v[1]for k,v in mounts.items()}=={'/source':'ro','/config':'ro','/output':'rw','/target':'rw','/sdk':'ro','/cargo/registry':'ro'}
 assert all(PurePosixPath(host).is_absolute()for host,mode in mounts.values())
 source=PurePosixPath(mounts['/source'][0]);assert source.parts[-2:]==('programs','donation-relay')
 recorded_root=source.parent.parent
 assert PurePosixPath(mounts['/config'][0])==recorded_root/'repro/donation-relay/canonical-exact-selection/layout'
 assert all(not any(x in host for x in ['evidence/','candidate.so','linked-elf-reproduction/artifacts'])for host,mode in mounts.values())
 return str(recorded_root)

def verify(root):
 root=Path(root).resolve()
 authenticate()
 from selection_gate import verify as verify_gate
 result=verify_gate(root,HERE/'transition.json',TRANSITION_SHA256)
 t=json.loads((HERE/'transition.json').read_bytes());launch=json.loads((root/t['new']['canonical_build_receipt']).read_bytes())
 recorded_mounts(launch);command=launch['command']
 assert command[command.index('-w')+1]=='/source' and '/source/Cargo.toml' in command and '--offline' in command and '--locked' in command
 assert command[command.index('--target')+1]=='sbpf-solana-solana'
 assert launch['rustc_sha256']=='89fd4ccdd6e678a24c2cda074b498b46a352fcfce21018119c9526751afc678d'
 # The producer is exactly the reviewed loader function, plus saving its actual account payload.
 parent=(root/t['new']['loader_runner']).read_text();parent=parent[parent.index('def execute('):parent.index('\ndef verify_static')]
 producer=(HERE/'produce_payload.py').read_text();producer=producer[producer.index('def execute('):producer.index("\nif __name__")]
 producer=producer.replace('def execute(elf,CAPACITY,original,output):','def execute(elf,CAPACITY,original):').replace('\n    Path(output).write_bytes(payload)','')
 assert ast.dump(ast.parse(parent))==ast.dump(ast.parse(producer))
 return result
