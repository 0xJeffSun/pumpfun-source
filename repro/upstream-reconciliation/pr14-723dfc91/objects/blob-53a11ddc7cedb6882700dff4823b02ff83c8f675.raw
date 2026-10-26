from pathlib import Path
import concurrent.futures,subprocess,json,hashlib,os
P=Path(__file__).resolve().parent
compiler=P/'toolchain/rust/bin/rustc'
H=lambda b:hashlib.sha256(b).hexdigest()
def compile_one(source):
 out=P/'output'/source.stem;out.mkdir(parents=True,exist_ok=False)
 cmd=[str(compiler),'--crate-name','probe','--crate-type','cdylib','--edition=2021','--target','sbf-solana-solana','-Copt-level=z','-Coverflow-checks=yes','-Clto=fat','-Cembed-bitcode=yes','-Ccodegen-units=1','-Cpanic=abort','--emit=asm,llvm-ir,obj','--out-dir',str(out),str(source)]
 run=subprocess.run(cmd,capture_output=True);(out/'compiler.log').write_bytes(run.stdout+run.stderr)
 return dict(name=source.stem,command=cmd,source_sha256=H(source.read_bytes()),returncode=run.returncode,files={f.name:H(f.read_bytes()) for f in out.iterdir() if f.is_file()})
with concurrent.futures.ThreadPoolExecutor(max_workers=3) as pool:
 rows=list(pool.map(compile_one,sorted((P/'sources').glob('*.rs'))))
result=dict(scope='Synthetic Rust branch and ownership code-generation probes; not a recovered contract or full-program equivalence',compiler_version=subprocess.check_output([str(compiler),'--version','--verbose'],text=True),compiler_sha256=H(compiler.read_bytes()),toolchain_archive_sha256=H((P/'platform-tools-osx-aarch64.tar.bz2').read_bytes()),platform_source_versions=(P/'toolchain/version.md').read_text(),results=rows)
(P/'results.json').write_text(json.dumps(result,indent=2)+'\n')
print(json.dumps({'compiler_version':result['compiler_version'],'results':[dict(name=x['name'],returncode=x['returncode']) for x in rows]},indent=2))
