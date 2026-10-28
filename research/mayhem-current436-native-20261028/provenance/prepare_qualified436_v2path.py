from pathlib import Path
import hashlib,json,shutil
W=Path(__file__).resolve().parent;P=W/'mayhem-qualified436-native';D=P/'controller-final';shutil.copytree(P/'controller-portable',D)
p=D/'path-map.tsv';old=p.read_bytes();row=b'mayhem_recovered\tsrc/instructions\\pump_interface_v2.rs\tprograms/mayhem-program/src/instructions/pump_interface_v2.rs\n';assert b'pump_interface_v2' not in old and old.endswith(b'\n');p.write_bytes(old+row)
build=D/'build.py';text=build.read_bytes();a=hashlib.sha256(old).hexdigest().encode();b=hashlib.sha256(p.read_bytes()).hexdigest().encode();assert text.count(a)==1;build.write_bytes(text.replace(a,b))
(P/'v2-path-correction.json').write_text(json.dumps(dict(parent='controller-portable',before_sha256=a.decode(),after_sha256=b.decode(),appended_row=row.decode(),reason='Two retained SellV2 Source descriptors at instruction offsets18056/18080 use a Windows separator for the newly introduced module. This row maps that observed source path before compilation; no source or artifact byte edits.'),indent=2)+'\n',encoding='utf-8')
print('Added one exact observed V2 source-path mapping')
