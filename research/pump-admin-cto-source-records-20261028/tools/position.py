from pathlib import Path
import re,shutil,difflib,hashlib
D=Path(__file__).resolve().parent;out=D/'source-admin-positioned';shutil.copytree(D/'source-cashback-parse-order',out);rel='programs/pump/src/creator/admin_cto.rs';p=out/rel;before=p.read_text();lines=before.splitlines()
assert len(lines)>698
line=lines[283];cut=line.index('if a.bonding_curve.is_holder_reward');assert 'CtoNotAllowedForMayhemCoin'in line[:cut]and'HolderRewardCreatorImmutable'in line[cut:];lines[283]=line[:cut];assert not lines[288].strip();lines[288]=' '+line[cut:]
line=lines[305];cut=line.index('if !holder');assert'CtoNewCreatorNotAllowed'in line[:cut]and'CtoNewCreatorRequired'in line[cut:];assert lines[297].startswith('// layout-pad');lines[297]=line[:cut];lines[305]=' '+line[cut:]
line=lines[311];cut=line.index('if !holder &&');assert'CreatorShouldNotBeZero'in line[:cut]and'InvalidCreator'in line[cut:];assert lines[306].startswith('// layout-pad');lines[306]=line[:cut];lines[311]=' '+line[cut:]
config=lines[330];bounds=lines[331];prepare=lines[332];assert'CreatorFeeNotConfigurable)'in config and'CreatorFeeBpsOutOfRange'in bounds and'prepare_bonding_curve'in prepare
lines[330]=lines[331]=lines[332]='';assert lines[333].startswith('// layout-pad')and not lines[337].strip()and not lines[338].strip();lines[333]=config;lines[337]=bounds;lines[338]=prepare
lines[284]='// Reconstructed positions of the same deployed validations.'
after='\n'.join(lines)+'\n';assert len(before.splitlines())==len(after.splitlines())
tokens=lambda s:re.sub(r'\s+','',re.sub(r'//[^\n]*','',s));assert tokens(before)==tokens(after),'Only formatting and comments may change'
p.write_text(after);patch=''.join(difflib.unified_diff(before.splitlines(keepends=True),after.splitlines(keepends=True),'a/'+rel,'b/'+rel));(D/'admin-position.patch').write_text(patch);print({'patch_sha256':hashlib.sha256(patch.encode()).hexdigest(),'source_sha256':hashlib.sha256(after.encode()).hexdigest(),'rust_token_stream_unchanged':True})
