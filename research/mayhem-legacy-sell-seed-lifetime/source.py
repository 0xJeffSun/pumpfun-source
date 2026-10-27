"""Reconstruct the exact current parent and defer the Legacy Sell signer seeds."""
import hashlib
import importlib.util
import io
import json
from pathlib import Path,PurePosixPath
import tarfile

ROOT=Path(__file__).resolve().parents[2]
FILE='src/instructions/pump_interface.rs'

def module(name,path):
    spec=importlib.util.spec_from_file_location(name,path)
    value=importlib.util.module_from_spec(spec);spec.loader.exec_module(value)
    return value

def archive(path):
    files={}
    with tarfile.open(fileobj=io.BytesIO(path.read_bytes()),mode='r:gz') as tar:
        for m in tar:
            p=PurePosixPath(m.name)
            assert m.isfile() and not p.is_absolute() and '..' not in p.parts
            assert str(p)==m.name and m.name not in files
            files[m.name]=tar.extractfile(m).read()
    return files

def parent():
    files=archive(ROOT/'research/mayhem-initializer-current-recovery-20261027/source.tar.gz')
    files[FILE]=(ROOT/'research/mayhem-current-ownership-composition-20261027/sources/qualified.rs').read_bytes()
    for n in ('src/state.rs','src/instructions/sell_pump_swap.rs'):
        files[n]=(ROOT/'research/mayhem-sell-current-recovery-20261027/overrides'/n).read_bytes()
    for n in ('src/state.rs','src/instructions/buy_pump_swap.rs'):
        files[n]=(ROOT/'research/mayhem-quotes-current-recovery-20261027/overrides'/n).read_bytes()
    assert len(files)==67
    assert {n:hashlib.sha256(b).hexdigest() for n,b in files.items()}==json.loads((ROOT/'research/mayhem-quotes-current-recovery-20261027/source-inputs.json').read_bytes())
    return files

def recover(before):
    after=dict(before)
    a,b=before[FILE].decode().split('pub fn legacy_sell_handler',1)
    body,tail=b.split('\n#[inline(always)]\nfn clone_sell_info',1)
    old='let bump=[ctx.bumps.sol_vault];let seeds:&[&[u8]]=&[b"sol-vault",&bump];'
    assert body.count(old)==body.count(' },&[seeds])')==1
    body=body.replace(old,'').replace(' },&[seeds])',' },&[&[b"sol-vault",&[ctx.bumps.sol_vault]]])')
    after[FILE]=(a+'pub fn legacy_sell_handler'+body+'\n#[inline(always)]\nfn clone_sell_info'+tail).encode()
    assert after[FILE].count(b'\n')==before[FILE].count(b'\n')
    return after
