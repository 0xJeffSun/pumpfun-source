from pathlib import Path,PurePosixPath
import hashlib,json,tarfile
W=Path(__file__).resolve().parent;P=W/'mayhem-native-build'
A=W/'windows-typeid-probe/platform-tools-windows-x86_64.tar.bz2'
with A.open('rb') as f:digest=hashlib.file_digest(f,'sha256').hexdigest()
assert digest=='98e731bc4db8b55b4dc07229639bf0c91f76cc5117dcd7f31d9633a8943b96e9'
root=P/'sdk';root.mkdir(exist_ok=False);rows=[]
llvm={'clang.exe','llvm-ar.exe','llvm-objcopy.exe','llvm-objdump.exe','lld.exe','lld-link.exe','ld.lld.exe'}
with tarfile.open(A,'r|bz2') as tar:
    for member in tar:
        name=member.name.removeprefix('./');p=PurePosixPath(name)
        selected=name=='version.md' or name.startswith('rust/') or (name.startswith('llvm/bin/') and (p.name in llvm or name.endswith('.dll'))) or name.startswith('llvm/lib/clang/')
        if not selected or member.isdir():continue
        assert member.isfile(),(name,member.type)
        assert not p.is_absolute() and '..' not in p.parts and '\\' not in name and ':' not in name
        raw=tar.extractfile(member).read();dest=root/name;dest.parent.mkdir(parents=True,exist_ok=True);dest.write_bytes(raw)
        rows.append(dict(path=name,bytes=len(raw),sha256=hashlib.sha256(raw).hexdigest()))
(P/'sdk-components.json').write_text(json.dumps(dict(archive_sha256=digest,files=rows),indent=2)+'\n')
print('SDK selected',len(rows),'regular files;',sum(r['bytes'] for r in rows),'bytes',flush=True)
