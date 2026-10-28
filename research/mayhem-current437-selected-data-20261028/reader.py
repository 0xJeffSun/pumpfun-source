"""Rebind unchanged selected32, writer48 and counted-literal readers to437."""
from pathlib import Path
import gzip,hashlib,importlib.util,json,re,tarfile,tomllib
if not __debug__:raise RuntimeError('Assertions are required')
sha=lambda data:hashlib.sha256(data).hexdigest()
def module(name,path):
 spec=importlib.util.spec_from_file_location(name,path);m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m);return m

def readers(packet,root):
 return(module('data437_prefix',root/'research/mayhem-current436-selected-prefixes-20261027/reader.py'),module('data437_writer',root/'research/mayhem-current436-writer-records-20261028/proof.py'),module('data437_literal',packet/'helpers/literals.py'))

def inspect(packet,root,original,candidate):
 prefix,writer,literal=readers(packet,root)
 p=prefix.inspect(original,candidate);w=writer.inspect(original,candidate,root);l=literal.inspect(original,candidate,root)
 assert {tuple(x)for x in w['active_pairs']}<={tuple(x)for x in p['active_pairs']}
 assert {tuple(x)for x in l['active_pairs']}<={tuple(x)for x in w['active_pairs']}
 return {'selected32':p,'writer48':w,'counted_literals':l}

def inputs(root,checkpoint):
 return gzip.decompress((root/'research'/checkpoint/'builds/first/symbols.so.gz').read_bytes())

def source_context(packet,root,report):
 with tarfile.open(root/'research/mayhem-current437-composition-20261028/source.tar.gz')as t:
  lib=t.extractfile('src/lib.rs').read().decode();lock=tomllib.loads(t.extractfile('Cargo.lock').read().decode())
 packages={p['name']:p for p in lock['package']if p['name']in('anchor-syn','solana-msg')}
 for name,version in [('anchor-syn','1.0.0'),('solana-msg','3.1.0')]:
  assert packages[name]['version']==version
  assert sha((packet/'source-context'/f'{name}-{version}.crate').read_bytes())==packages[name]['checksum']
 with tarfile.open(packet/'source-context/anchor-syn-1.0.0.crate')as t:generator=t.extractfile('anchor-syn-1.0.0/src/codegen/program/handlers.rs').read().decode()
 with tarfile.open(packet/'source-context/solana-msg-3.1.0.crate')as t:logger=t.extractfile('solana-msg-3.1.0/src/lib.rs').read().decode()
 assert 'let ix_name_log = format!("Instruction: {ix_name}");'in generator
 assert 'anchor_lang::prelude::msg!(#ix_name_log);'in generator
 assert 'syscalls::sol_log_(message.as_ptr(), message.len() as u64);'in logger
 for row in report['counted_literals']['observations']:
  matches=[]
  for name in row['candidate_names']:
   match=re.search(r'__global(\d+)([a-z0-9_]+?)17h',name)
   if match:
    length,ident=match.groups();assert len(ident)==int(length);matches.append(ident)
  assert len(matches)==1;ident=matches[0]
  assert re.search(r'pub\s+fn\s+'+re.escape(ident)+r'\s*(?:<[^>]*>)?\s*\(',lib)
  expected='Instruction: '+''.join(p[0].upper()+p[1:]for p in ident.split('_'))
  assert row['original']['bytes_hex']==expected.encode().hex()
 for row in report['writer48']['records']:
  for slot,fragment in [(24,'9write_str'),(32,'10write_char'),(40,'9write_fmt')]:
   m=next(m for m in row['methods']if m['slot']==slot)
   assert any(fragment in n and 'Write'in n for n in m['candidate_names'])

def check(packet,root):
 paths=list(packet.rglob('*'));assert not any(p.is_symlink()for p in paths),'packet symlink';assert all(p.is_file()or p.is_dir()for p in paths),'packet special file'
 assert {str(p.relative_to(packet)):sha(p.read_bytes())for p in paths if p.is_file()and p!=packet/'manifest.json'}==json.loads((packet/'manifest.json').read_bytes()),'packet inventory differs'
 for path,digest in json.loads((packet/'inputs.json').read_bytes()).items():
  q=Path(path);assert not q.is_absolute()and'..'not in q.parts
  assert sha((root/q).read_bytes())==digest,path
 origins=json.loads((packet/'provenance/reader-origins.json').read_bytes())
 assert origins['helpers/literals.py']['prior_manifest_sha256']=='bd9468fcf7132b3c93b8897488077d0d613dada034a3a13ce097c1b8dbc05548'
 assert sha((packet/'helpers/literals.py').read_bytes())==origins['helpers/literals.py']['sha256']=='d496854fa6655d11ffcecf0dfc27a5e66fd0c77155d32d8866d2f56459e18357'
 original=(root/'evidence/original/mayhem/deployed.so').read_bytes();candidate=inputs(root,'mayhem-current437-composition-20261028');baseline=inputs(root,'mayhem-current436-composition-20261027')
 assert sha(candidate)=='32098641a885e48451df4f6d8cb62f45afafc96651106f5e467ac3f7e0a9ab9a'
 prefix,_,_=readers(packet,root);_,elf=prefix.elves(original,candidate)
 import tempfile
 with tempfile.TemporaryDirectory()as td:prefix.q.verify_image_pair(prefix.reader,elf,gzip.decompress((root/'research/mayhem-current437-composition-20261028/builds/first/candidate.so.gz').read_bytes()),Path(td)/'candidate.so')
 current=inspect(packet,root,original,candidate);old=inspect(packet,root,original,baseline)
 source_context(packet,root,current)
 assert current==json.loads(gzip.decompress((packet/'observations.json.gz').read_bytes()))
 summary={name:report['summary']for name,report in current.items()};before={name:report['summary']for name,report in old.items()}
 assert {'qualified436':before,'qualified437':summary}==json.loads((packet/'comparison.json').read_bytes())
 s=summary['selected32'];assert(s['normalized_windows'],s['raw_windows'],s['direct_windows'],s['direct_pairs'],s['selected_data_windows'],s['selected_data_pairs'])==(437,141,431,603,431,581)
 assert(s['source_sites'],s['code_sites'],s['prefix_sites'],s['original_prefixes'])==(499,48,121,30)
 w=summary['writer48'];assert(w['extended_windows'],w['extended_pairs'],w['selected_original_records'],w['selected_original_sites'])==(431,581,5,48)
 l=summary['counted_literals'];assert(l['literal_windows'],l['literal_pairs'],l['literals'],l['literal_bytes'],l['reference_sites'])==(431,581,21,575,21)
 for name in ['selected32','writer48','counted_literals']:
  assert {a for a,b in old[name]['active_pairs']}<={a for a,b in current[name]['active_pairs']}
 assert all(row['pair_closed']for row in current['selected32']['prefixes']if row['shape_equal']and(row['original'],row['candidate'])in{tuple(p)for p in current['selected32']['active_pairs']})
 assert all(row['owner_closed']and all(m['target_closed']for m in row['methods'])for row in current['writer48']['records'])
 assert all(row['owner_closed']and row['bytes_equal']for row in current['counted_literals']['observations'])
 return summary
