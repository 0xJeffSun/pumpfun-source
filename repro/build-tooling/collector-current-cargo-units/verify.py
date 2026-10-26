"""Strict portable publication validation and declared JSON-wire-only checker derivation."""
from pathlib import Path,PurePosixPath
import argparse,hashlib,json
P=Path(__file__).resolve().parent;H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();J=lambda p:json.loads(p.read_text())
def check(root,seal):
 assert H(root/'manifest.json')==seal==(root/'manifest.sha256').read_text().strip();m=J(root/'manifest.json');assert not any(f.is_symlink()for f in root.rglob('*'));assert set(m)=={str(f.relative_to(root))for f in root.rglob('*')if f.is_file()}-{'manifest.json','manifest.sha256'}
 for n,r in m.items():
  q=PurePosixPath(n);assert not q.is_absolute()and'..'not in q.parts;assert H(root/q)==r['sha256']and(root/q).stat().st_size==r['bytes']
def main(seal):
 assert __debug__;check(P,seal);d=J(P/'derivation.json');record=P/'record';assert d['original_record_seal']=='9760c7c71676eefc98c023f1eea876c75f1af06ef4b9932f63361aed8aad140f';check(record,d['original_record_seal'])
 original=(record/'verify.py').read_text();assert H(record/'verify.py')==d['original_checker_sha256'];old="d=module.analyze();assert d==J(P/'analysis.json')";new="d=module.analyze();assert json.loads(json.dumps(d))==J(P/'analysis.json')";assert d['only_replacement']==[old,new]and original.count(old)==1 and d['analysis_method_changed']is False
 derived=original.replace(old,new);assert(pbytes:=(P/'verify-record-portable.py').read_bytes())==derived.encode()and hashlib.sha256(pbytes).hexdigest()==d['derived_checker_sha256']
 namespace={'__file__':str(record/'verify.py'),'__name__':'declared_json_wire_checker'};exec(compile(derived,str(P/'verify-record-portable.py'),'exec'),namespace);namespace['verify'](d['original_record_seal']);check(P,seal)
 print('PASS exact original778payloads plus manifest/seal; declared one-line JSON-wire comparison only; all raw metadata/source witnesses preserved; no native/source/VM/network execution.')
if __name__=='__main__':
 p=argparse.ArgumentParser();p.add_argument('--expected-seal',required=True);a=p.parse_args();main(a.expected_seal)
