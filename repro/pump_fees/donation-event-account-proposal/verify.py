#!/usr/bin/env python3
"""Self-contained static verifier; never executes the candidate or a compiler."""
from pathlib import Path
import difflib, hashlib, json, sys, tarfile, tomllib
from analyze_evidence import generate, instruction
from elf_reader import Elf

ROOT = Path(__file__).resolve().parent
def h(b): return hashlib.sha256(b).hexdigest()

def main():
    manifest=json.loads((ROOT/'manifest-sha256.json').read_text())
    actual={p.relative_to(ROOT).as_posix() for p in ROOT.rglob('*') if p.is_file() and p.name != 'manifest-sha256.json' and '__pycache__' not in p.parts}
    assert actual == set(manifest), 'file inventory mismatch'
    for path,sha in manifest.items(): assert h((ROOT/path).read_bytes()) == sha, 'hash mismatch: '+path
    source=json.loads((ROOT/'inputs/source-sha256.json').read_text())
    assert len(source)==26
    for path,sha in source.items(): assert h((ROOT/'inputs/source'/path).read_bytes())==sha, 'source mismatch: '+path
    lock=tomllib.loads((ROOT/'inputs/source/Cargo.lock').read_text())
    framework=json.loads((ROOT/'framework-inputs.json').read_text())
    for row in framework:
        name,version=row['package'].rsplit('-',1)
        expected=next(p['checksum'] for p in lock['package'] if p['name']==name and p['version']==version)
        archive=ROOT/'inputs/framework'/(row['package']+'.crate')
        assert h(archive.read_bytes())==expected==row['package_checksum']
        with tarfile.open(archive) as t: data=t.extractfile(row['package']+'/'+row['file']).read()
        assert data==(ROOT/'inputs/framework'/row['package']/row['file']).read_bytes()
        assert h(data)==row['sha256']
    for path,expected in generate().items(): assert json.loads((ROOT/path).read_text())==expected, 'static replay mismatch: '+path
    before=(ROOT/'inputs/source/programs/pump-fees/src/donation.rs').read_text()
    old="#[account(seeds=[b\"__event_authority\"],bump)] pub event_authority: UncheckedAccount<'info>,"
    assert before.count(old)==1
    after=before.replace(old,old.replace('UncheckedAccount','AccountInfo'))
    assert after==(ROOT/'proposal/donation.rs').read_text()
    patch=''.join(difflib.unified_diff(before.splitlines(True),after.splitlines(True),fromfile='a/programs/pump-fees/src/donation.rs',tofile='b/programs/pump-fees/src/donation.rs'))
    assert patch==(ROOT/'source.patch').read_text()
    proposal=json.loads((ROOT/'proposal.json').read_text())
    assert h(before.encode())==proposal['baseline_sha256'] and h(after.encode())==proposal['proposed_sha256'] and h(patch.encode())==proposal['patch_sha256']
    o=Elf(ROOT/'inputs/original.so');c=Elf(ROOT/'inputs/candidate.so');proof=json.loads((ROOT/'account-layout-proof.json').read_text())
    for row in proof['original_field_rows']:
        for key in ['load','success_store']: assert instruction(o,row[key]['pc'])==row[key]
        assert row['load']['offset_signed']==row['account_info_offset']
        assert row['success_store']['offset_signed']==row['context_offset']
    for key in ['original_cursor_advance','wrapper_tail_memcpy_length_original']:
        assert instruction(o,proof[key]['pc'])==proof[key]
    for key in ['candidate_cursor_advance','candidate_borrow_load','candidate_borrow_success_store','wrapper_tail_memcpy_length_candidate']:
        assert instruction(c,proof[key]['pc'])==proof[key]
    assert proof['wrapper_tail_memcpy_length_original']['immediate_signed']+24==880
    assert proof['wrapper_tail_memcpy_length_candidate']['immediate_signed']+24==840
    assert proof['candidate_borrow_success_store']['offset_signed']==216
    print(json.dumps({'result':'PASS','payload_files':len(manifest),'source_inputs':26,'static_windows':12,'proposal':'one event_authority field only','builds':0,'runtime_executions':0}))

if __name__=='__main__':
    try: main()
    except (AssertionError, FileNotFoundError, KeyError, StopIteration) as e:
        print('FAIL: '+str(e),file=sys.stderr);raise SystemExit(1)
