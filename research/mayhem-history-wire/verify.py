"""Re-decode the pinned Mayhem captures offline and check the saved findings."""
import argparse
import hashlib
import json
from pathlib import Path, PurePosixPath
import sys

HERE = Path(__file__).resolve().parent
sys.path.insert(0,str(HERE))
import decode

PREFIX = 'research/mayhem-globalparams-field-history/evidence/'


def sha(raw):
    return hashlib.sha256(raw).hexdigest()


def read(path):
    return json.loads(path.read_bytes())


def inputs(root):
    descriptor = read(HERE/'inputs.json')
    decode.require(descriptor['revision'] == 'ba7883511942965c5c9def03971bdaff84963d6b', 'Input revision differs')
    files = {}
    for row in descriptor['files']:
        name = PurePosixPath(row['path'])
        decode.require(not name.is_absolute() and '..' not in name.parts and '\\' not in row['path'] and
                       row['path'] not in files, 'Invalid input path')
        raw = (root/row['path']).read_bytes()
        decode.require(len(raw) == row['bytes'] and sha(raw) == row['sha256'], 'Input digest differs: '+row['path'])
        blob = hashlib.sha1(b'blob '+str(len(raw)).encode()+b'\0'+raw).hexdigest()
        decode.require(blob == row['git_blob'], 'Input Git blob differs')
        files[row['path']] = raw
    decode.require(len(files) == 17, 'Input set differs')
    return files


def recompute(files):
    captures = {Path(name).name:json.loads(raw) for name,raw in files.items()
                if name.startswith(PREFIX+'tx_')}
    accounts = {Path(name).name:json.loads(raw) for name,raw in files.items()
                if name.startswith(PREFIX+'capture_globalparams_')}
    decode.require(len(captures) == 13 and len(accounts) == 2, 'Capture cohort differs')
    return decode.derive(captures,accounts,json.loads(files[PREFIX+'analysis_timeseries.json']))


def verify(root):
    manifest = read(HERE/'manifest.json')
    actual = {p.relative_to(HERE).as_posix():sha(p.read_bytes()) for p in HERE.rglob('*')
              if p.is_file() and p != HERE/'manifest.json' and '__pycache__' not in p.parts}
    decode.require(actual == manifest, 'Packet membership or digest differs')
    result = recompute(inputs(root))
    decode.require(result == read(HERE/'findings.json'), 'Recomputed findings differ')
    return dict(status='PASS',transactions=result['transaction_count'],updates=result['update_count'],
                mayhem_instructions=result['mayhem_instruction_count'],version_range=result['version_range'],
                current_accounts=len(result['accounts']),raw_timeseries_reproduced=True,
                network_used=False,program_executed=False,history_completeness_proven=False,
                historical_field_semantics_proven=False)


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--repository-root',type=Path,default=HERE.parents[1])
    args = parser.parse_args()
    print(json.dumps(verify(args.repository_root),indent=2))
