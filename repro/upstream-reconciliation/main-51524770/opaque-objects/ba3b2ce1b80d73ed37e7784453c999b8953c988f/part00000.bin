"""Saved byte/source-only6092 witnesses; recorded baseline, no tools/VM/network."""
from pathlib import Path
import argparse,gzip,hashlib,json,re,struct,tarfile,tomllib
from extract import render
P=Path(__file__).resolve().parent;H=lambda b:hashlib.sha256(b).hexdigest();J=lambda p:json.loads(p.read_text())
a=argparse.ArgumentParser();a.add_argument('--repo',type=Path,required=True);R=a.parse_args().repo.resolve()
for n,row in J(P/'manifest.json').items():raw=(P/n).read_bytes();assert H(raw)==row['sha256']and len(raw)==row['bytes'],n
for n,row in J(P/'input-references.json').items():raw=(R/n).read_bytes();assert H(raw)==row['sha256']and len(raw)==row['bytes'],n
q=R/'repro/layered-passes/pass-24/pump-compared-errors-source-proof';O=(q/'original.so').read_bytes();I=lambda pc:struct.unpack_from('<BBhi',O,pc);L=lambda pc:struct.unpack_from('<I',O,pc+4)[0]|struct.unpack_from('<I',O,pc+12)[0]<<32
ledger={str(f['start']):f for f in json.loads(gzip.decompress((q/'original-ledger.json.gz').read_bytes()))};rows=J(P/'bounded-ledger.json');w=J(P/'witness.json')
for name,f in rows.items():assert f==ledger[name]and H(O[f['start']:f['end']])==f['raw_sha256'];assert(P/(name+'.asm')).read_text()==render(O,f['start'],f['end'])
assert struct.unpack_from('<I',O,1793436)[0]==92
name=bytearray(28)
for pc,off in[(1423608,0),(1423584,8),(1423560,16)]:assert I(pc)[0]==24;name[off:off+8]=O[pc+4:pc+8]+O[pc+12:pc+16]
name[24:28]=O[1423644:1423648];assert name.decode()==w['error_name']=='CtoCreatorAccountNotWritable'
ptr,n=struct.unpack_from('<QQ',O,1828336);assert ptr>>32==1808601 and n==75 and O[ptr>>32:(ptr>>32)+n].decode()==w['message']
assert L(163800)==L(163944)==1793436 and L(164600)==1796300 and O[1796300:1796338]==b'programs/pump/src/creator/admin_cto.rs'
for pc,callee in[(1236928,141840),(748272,11432),(756496,1783416),(163816,1405824),(163960,1433224),(164696,1686320),(149208,1783416),(151640,169240),(169264,1715000),(169304,1715368),(169432,1597136)]:assert I(pc)[:3]==(133,16,0)and pc+8+I(pc)[3]*8==callee,(pc,callee)
anchors=[(164624,(98,10,-568,6092)),(164640,(98,10,-696,556)),(164648,(122,10,-704,38)),(164656,(122,10,-720,0)),(1686336,(183,1,0,160)),(1686416,(183,3,0,160)),(1686440,(122,6,0,0)),(149160,(113,97,210,0)),(149176,(121,97,192,0)),(151600,(113,97,209,0)),(11736,(113,53,42,0)),(11744,(121,48,24,0)),(11768,(113,51,41,0)),(11776,(115,54,41,0)),(11800,(123,6,24,0)),(11832,(115,86,42,0)),(748296,(113,161,-1046,0)),(748776,(123,26,-3816,0)),(748784,(123,42,-3808,0)),(748800,(121,161,-1064,0)),(748808,(123,26,-1888,0)),(748832,(105,161,-1048,0)),(748840,(107,26,-1872,0)),(769232,(105,161,-1872,0)),(769240,(107,22,208,0)),(769264,(121,161,-1888,0)),(769272,(123,22,192,0)),(769632,(121,161,-3816,0)),(769640,(115,22,210,0)),(769968,(121,161,-3808,0)),(769976,(123,22,168,0)),(749032,(123,58,-3824,0)),(770176,(121,161,-3824,0)),(770184,(123,22,64,0)),(148144,(183,6,0,0)),(148184,(183,6,0,0)),(142512,(113,145,165,0)),(142520,(123,26,-2272,0)),(148208,(121,161,-2272,0))]
for pc,expected in anchors:assert I(pc)==expected,(pc,I(pc),expected)
for pc,target in[(149136,149152),(149168,149272),(149232,151600),(151608,163784),(163968,164504),(164728,164472),(756520,756952),(148216,148232)]:assert I(pc)[0]&7==5 and pc+8+I(pc)[2]*8==target,(pc,target)
assert O[1799910:1799925]==b'current_creator'and O[1799337:1799350]==b'creator_vault'and O[1792936:1792968]==bytes(32)
pcs=[];pc=141840
while pc<169240:pcs.append(pc);pc+=16 if I(pc)[0]==24 else 8
assert[pc for pc in pcs if I(pc)==(98,10,-568,6092)]==[164624]
for destination,expected in[(163784,[151608]),(151600,[149232])]:assert[pc for pc in pcs if I(pc)[0]&7==5 and I(pc)[0]not in[133,149]and pc+8+I(pc)[2]*8==destination]==expected
assert rows['1783416']['external_calls'][0]['relocation']['symbol']=='sol_memcmp_'
source=(R/'programs/pump/src/admin_cto.rs').read_text();assert source.count('return Err(err(6092));')==2
assert 'let wallet=old!=Pubkey::default()&&a.current_creator.owner==&anchor_lang::system_program::ID&&!a.current_creator.executable;if wallet&&!a.current_creator.is_writable{return Err(err(6092));}let wallet_frozen='in source
assert 'if wallet&&!wallet_frozen{\n  if !a.current_creator.is_writable{return Err(err(6092));}'in source
assert 'let mut wallet'not in source and 'unsafe'not in source and not re.search(r'current_creator\.is_writable\s*=',source)
lib=(R/'programs/pump/src/lib.rs').read_text();enum=lib.split('pub enum PumpError {',1)[1].split('\n}',1)[0];value=-1;values={}
for name,explicit in re.findall(r'^\s*(\w+)\s*(?:=\s*(\d+))?\s*,\s*$',enum,re.M):value=int(explicit)if explicit else value+1;values[name]=value
assert values[w['error_name']]==92 and w['message']in lib
field=R/'repro/pump/cto-6091-static-review-20261025/pump-error-static-deserializers';assert H((field/'manifest.json').read_bytes())==w['field_packet_manifest_sha256']
for n,row in J(field/'manifest.json').items():assert H((field/n).read_bytes())==row['sha256']
pkg=next(x for x in tomllib.loads((R/'programs/pump/Cargo.lock').read_text())['package']if x['name']=='solana-account-info');base=R/'repro/pump_fees/legacy-quote-admission-source-proposal/inputs/framework';archive=base/'solana-account-info-2.3.0.crate';assert H(archive.read_bytes())==pkg['checksum']==w['account_info_archive_sha256']
with tarfile.open(archive)as tf:assert tf.extractfile('solana-account-info-2.3.0/src/lib.rs').read()==(base/'solana-account-info-2.3.0/src/lib.rs').read_bytes()
print('PASS: owned named6092 Source556/file38/emptycompared, single original constructor edge, actual AccountInfo role and two current sites; upstream route gate remains UNPROVED; no patch/build/runtime')
