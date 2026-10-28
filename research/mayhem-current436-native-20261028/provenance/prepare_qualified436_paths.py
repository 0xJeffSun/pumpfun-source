"""Remove an obsolete native path mapping that shadows current Cargo flags."""
from pathlib import Path
import hashlib,json,shutil
W=Path(__file__).resolve().parent;P=W/'mayhem-qualified436-native';S=P/'controller-current';D=P/'controller-current-paths';shutil.copytree(S,D)
sha=lambda b:hashlib.sha256(b).hexdigest()
old=(D/'path-map.tsv').read_bytes();a=b'anchor_lang\tvendor/anchor-lang/src/bpf_writer.rs\tvendor/anchor-lang/src/bpf_writer.rs\n';b=b'anchor_lang\tvendor/anchor-lang/src/bpf_writer.rs\tsrc/bpf_writer.rs\n';assert old.count(a)==1;new=old.replace(a,b);(D/'path-map.tsv').write_bytes(new)
builder=(D/'build.py').read_text(encoding='utf-8');assert builder.count(sha(old))==1;(D/'build.py').write_text(builder.replace(sha(old),sha(new)),encoding='utf-8',newline='\n')
record=dict(old=a.decode(),new=b.decode(),old_sha256=sha(old),new_sha256=sha(new),scope='Use the current Cargo.toml anchor-lang source-path destination for the same path-map entry. The previous self-map appended by the wrapper shadowed the earlier current-source remap flag. All67sourcebytes, metadata seeds and linker selectors are unchanged.')
(P/'current-path-correction.json').write_text(json.dumps(record,indent=2)+'\n',encoding='utf-8');print('Prepared one path-map correction matching current source Cargo flags')
