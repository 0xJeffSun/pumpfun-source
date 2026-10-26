from pathlib import Path
import argparse,json,hashlib,tomllib,difflib
P=Path(__file__).resolve().parent;H=lambda b:hashlib.sha256(b).hexdigest();J=lambda p:json.loads(p.read_text())
a=argparse.ArgumentParser();a.add_argument('--repo',type=Path,required=True);R=a.parse_args().repo.resolve();Q=R/'work/cto6019-6091-native-constant-proposal';F=R/'work/cto6019-6091-build-proposal';E=R/'work/cto6019-6091-experiment'
for n,v in J(P/'manifest.json').items():assert H((P/n).read_bytes())==v
assert H((Q/'manifest.json').read_bytes())=='2d5a84fa111777c79b61d5bb228252aa2f7928a523c0ae2c4635e57441b9639e'
for n,v in J(Q/'manifest.json').items():
 b=(Q/n).read_bytes();assert H(b)==(v if isinstance(v,str)else v['sha256'])
old=J(F/'source-proposed.json');new=J(Q/'source-proposed.json');assert len(old)==len(new)==37 and set(old)==set(new);assert[n for n in old if old[n]!=new[n]]==['programs/pump/src/admin_cto.rs']
for n,h in new.items():assert H((Q/'source'/n).read_bytes())==h
s=(F/'source/programs/pump/src/admin_cto.rs').read_text();t=(Q/'source/programs/pump/src/admin_cto.rs').read_text();before='a.bonding_curve.quote_mint==anchor_lang::solana_program::pubkey!("So11111111111111111111111111111111111111112")';after='a.bonding_curve.quote_mint==anchor_spl::token::spl_token::native_mint::ID';assert s.count(before)==1 and t==s.replace(before,after) and t.count('return Err(err(6092));')==s.count('return Err(err(6092));')==2
assert H(t.encode())=='6b800d86f65b69cee50fad9a68bb82d1cafc14c0d9b1a3cc09f7742a26e54314'
lock=tomllib.loads((Q/'source/programs/pump/Cargo.lock').read_text());anchor=next(x for x in lock['package']if x['name']=='anchor-spl');assert anchor['version']=='0.31.1';assert next(x for x in lock['package']if x['name']=='spl-token')['version']=='7.0.0'
cache=J(F/'cache-allowlist.json')['files']
for ns in ['index.crates.io-1949cf8c6b5b557f','index.crates.io-6f17d22bba15001f']:
 for package,path,needle in [('anchor-spl-0.31.1','src/token.rs','pub use spl_token;'),('spl-token-7.0.0','src/native_mint.rs','solana_program::declare_id!("So11111111111111111111111111111111111111112");')]:
  n='registry/src/'+ns+'/'+package+'/'+path;b=(E/'cargo-home'/n).read_bytes();assert H(b)==cache[n]['sha256']and needle in b.decode()
assert not J(Q/'lineage.json')['built']and not J(Q/'lineage.json')['selected']
print('PASS: exact constant-only source37 proposal, authenticated locked reexport/nativeMintID source; unbuilt, emitted call removal unproved')
