"""Compose the ordinary sweep-rate source form with current quotes and sweep diagnostics."""
import hashlib
import importlib.util
import io
import json
from pathlib import Path, PurePosixPath
import tarfile

ROOT=Path(__file__).resolve().parents[2]


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
    files['src/instructions/pump_interface.rs']=(ROOT/'research/mayhem-current-ownership-composition-20261027/sources/qualified.rs').read_bytes()
    for n in ('src/state.rs','src/instructions/sell_pump_swap.rs'):
        files[n]=(ROOT/'research/mayhem-sell-current-recovery-20261027/overrides'/n).read_bytes()
    for n in ('src/state.rs','src/instructions/buy_pump_swap.rs'):
        files[n]=(ROOT/'research/mayhem-quotes-current-recovery-20261027/overrides'/n).read_bytes()
    assert len(files)==67
    assert {n:hashlib.sha256(b).hexdigest() for n,b in files.items()}==json.loads((ROOT/'research/mayhem-quotes-current-recovery-20261027/source-inputs.json').read_bytes())
    return files


def recover(before):
    after=module('previous_sweep_source',ROOT/'research/mayhem-sweep-failure-recovery/source.py').recover(before)
    name='src/instructions/fee_recipients.rs'
    old=b'let last = if native {self.field_10}else{self.field_34} as i64;'
    new=b'let last = if native == false {self.field_34}else{self.field_10} as i64;'
    assert after[name].count(old)==1
    after[name]=after[name].replace(old,new)
    return after
