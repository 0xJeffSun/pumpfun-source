from pathlib import Path
import hashlib,json,tarfile,subprocess
W=Path(__file__).resolve().parents[1];T=Path('/home/shawwalters.guest/amm436-linux/sdk');O=T.parent/'full436-01'
archive=W/'layout-lane-sdk154-linux-second.tar.bz2'
sha=lambda p:hashlib.file_digest(p.open('rb'),'sha256').hexdigest()
expected='fcc41631c7f77561bf5412218bf297501dccf0305ea280f338f0ace2aab9f31e';assert sha(archive)==expected
files={};fail=[]
with tarfile.open(archive,'r|bz2') as tf:
 for m in tf:
  if not m.isfile():continue
  rel=Path(m.name); f=T/rel
  h=hashlib.file_digest(tf.extractfile(m),'sha256').hexdigest()
  assert f.is_file(),str(f)
  actual=sha(f);files[str(rel)]=h
  if h!=actual:fail.append(str(rel))
assert not fail,fail
record=dict(archive_sha256=expected,sdk_files=files,sdk_files_count=len(files),failures=fail,rustc_version=subprocess.check_output([str(T/'rust/bin/rustc'),'-vV'],text=True),linker_version=subprocess.check_output(['x86_64-linux-gnu-gcc','--version'],text=True),packages=subprocess.check_output(['dpkg-query','-W','gcc-x86-64-linux-gnu','gcc-14-x86-64-linux-gnu','libc6-dev-amd64-cross','libc6-amd64-cross'],text=True))
(O/'sdk-check.json').write_text(json.dumps(record,indent=2)+'\n');print('checked SDK regular files',len(files))
