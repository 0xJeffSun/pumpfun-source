"""Strict portable wrapper checks and declared path-only checker replay.
No JavaScript, SDK execution, network, target or compiler execution.
"""
from pathlib import Path,PurePosixPath
import argparse,hashlib,json,sys
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent
H=lambda b:hashlib.sha256(b).hexdigest()
J=lambda n:json.loads((P/n).read_text())
def check_manifest(root,manifest_name,expected,extra):
 raw=(root/manifest_name).read_bytes();assert H(raw)==expected
 rows=json.loads(raw)
 assert not any(f.is_symlink()for f in root.rglob('*'))
 actual={str(f.relative_to(root))for f in root.rglob('*')if f.is_file()}
 assert actual==set(rows)|set(extra)
 for name,r in rows.items():
  n=PurePosixPath(name);assert not n.is_absolute()and'..'not in n.parts
  b=(root/name).read_bytes();assert H(b)==r['sha256']and len(b)==r['bytes'],name
 return rows
def verify(expected):
 assert __debug__,'Use ordinary Python without -O'
 check_manifest(P,'manifest.json',expected,['manifest.json','manifest.sha256'])
 assert (P/'manifest.sha256').read_text().strip()==expected
 d=J('derivation.json');record=P/'record'
 assert d['original_record_seal']=='33e756fc21ac913ba7455e3d1391900fbbe038180f8c593b7d542b8b0295ce7a'
 rows=check_manifest(record,'manifest.json',d['original_record_seal'],['manifest.json']);assert len(rows)==48
 review=P/'independent-review';check_manifest(review,'manifest.json',d['independent_review_seal'],['manifest.json','manifest.sha256'])
 assert (review/'manifest.sha256').read_text().strip()==d['independent_review_seal']
 ref=json.loads((record/'prior-reference.json').read_text());assert set(ref['files'])==set(d['prior_controls'])and len(ref['files'])==4
 for key,row in ref['files'].items():
  b=(P/'prior-controls'/key).read_bytes();assert H(b)==row['sha256']and len(b)==row['bytes'];assert d['prior_controls'][key]=={'sha256':row['sha256'],'bytes':row['bytes']}
 original=(record/'verify.py').read_text();assert H(original.encode())==d['original_checker_sha256']
 expected_replacements=[["for row in ref['files'].values():","for key,row in ref['files'].items():"],["f=Path(row['path']);","f=P.parent/'prior-controls'/key;"]]
 assert d['replacements']==expected_replacements and d['analysis_method_changed']is False
 derived=original
 for old,new in expected_replacements:assert derived.count(old)==1;derived=derived.replace(old,new)
 assert (P/'verify-record-portable.py').read_bytes()==derived.encode()and H(derived.encode())==d['derived_checker_sha256']
 assert 'analyze'not in sys.modules,'Run verifier in a fresh Python process'
 sys.path.insert(0,str(record))
 # The declared data-root __file__ keeps original immutable membership logic;
 # the compile filename correctly identifies the derived checker being replayed.
 exec(compile(derived,str(P/'verify-record-portable.py'),'exec'),{'__file__':str(record/'verify.py'),'__name__':'__main__'})
 assert Path(sys.modules['analyze'].__file__).resolve()==(record/'analyze.py').resolve()
 check_manifest(P,'manifest.json',expected,['manifest.json','manifest.sha256'])
 print('PASS portable publication: exact original48 payloads+manifest; four copied prior controls; independently reviewed static evidence; declared two-line path derivation only.')
if __name__=='__main__':
 p=argparse.ArgumentParser();p.add_argument('--expected-seal',required=True);a=p.parse_args();verify(a.expected_seal)
