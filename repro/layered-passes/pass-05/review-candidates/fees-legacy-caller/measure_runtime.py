from pathlib import Path
import hashlib,json,sys,importlib.metadata,solders
W=Path(__file__).resolve().parent;S=Path(solders.__file__).parent
H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
d={'invoked_python':sys.executable,'python_executable':str(Path(sys.executable).resolve()),'python_sha256':H(Path(sys.executable).resolve()),'python_version':sys.version,'solders_version':importlib.metadata.version('solders'),'solders_files':{str(p.relative_to(S)):H(p) for p in sorted(S.rglob('*')) if p.is_file() and '__pycache__' not in p.parts},'scope':'Fresh '+sys.argv[1]+' observation for the explicitly invoked unchanged corpus.'}
(W/('runtime-engine-'+sys.argv[1]+'.json')).write_text(json.dumps(d,indent=2)+'\n')
