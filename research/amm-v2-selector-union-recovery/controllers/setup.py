from pathlib import Path
import tarfile, shutil, json, hashlib, subprocess
R=Path('/mnt/c/Users/ahi20/Documents/ChatGPT/pumpfun-source')
K=Path('/home/ahi200/pumpfun-work/20261028-amm-v2-union')
J=Path('/home/ahi200/pumpfun-work/20261028-amm-v2-selector')
W=Path('/home/ahi200/pumpfun-work/20261028-amm-sweep-order')
K.mkdir(exist_ok=False)
src=K/'source-baseline';src.mkdir()
with tarfile.open(R/'research/claude-amm-union-20261028/sources/candidate.tar.gz') as t:
    for m in t.getmembers():
        assert not Path(m.name).is_absolute() and '..' not in Path(m.name).parts and (m.isfile() or m.isdir()),m.name
    t.extractall(src)
assert (src/'Cargo.toml').is_file()
shutil.copytree(src,K/'source-candidate')
p=Path('programs/pump-amm/src/curve/fees.rs')
old=(src/p).read_text();win=(J/'source-apply-match'/p).read_text()
prefix=old.split('pub fn select_and_apply_v2(')[0]
tail='fn select_v2_fees('+win.split('fn select_v2_fees(',1)[1]
needed=184-(prefix+tail).splitlines().index('    require!(fee_config_len >= 2512, PumpAmmError::FeeConfigTooShort);')-1
assert needed>=0,needed
new=prefix+'\n'*needed+tail
assert new.splitlines()[183].strip()=='require!(fee_config_len >= 2512, PumpAmmError::FeeConfigTooShort);'
(K/'source-candidate'/p).write_bytes(new.encode())
subprocess.run(['cp','-a','--reflink=auto',str(W/'build-target'),str(K/'build-target')],check=True)
subprocess.run(['cp','-a','--reflink=auto',str(W/'cargo-home'),str(K/'cargo-home')],check=True)
print('source prepared',len(list(src.rglob('*.rs'))),'Rust files; padding',needed,flush=True)
