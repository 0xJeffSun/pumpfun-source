"""Verify saved compiler evidence offline, without executing a program or toolchain."""
import argparse
import gzip
import hashlib
import io
import json
from pathlib import Path, PurePosixPath
import sys
import tarfile
import tomllib
from unittest.mock import patch
import zipfile

HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))
import elf
import run as controller
import static_frame
import trace

RUN = 40378096649
HEAD = '59afac1db1af021f1c5884ba4151e91d329c5bdb'
ARTIFACT = 12678690134
ZIP_SHA = '039aa30294cc4c61e2ac1f8a17788b63de143c4de12e05ae32a842a1381f44ed'
ORIGINAL = 'evidence/original/pump_fees/deployed.so'
ORIGINAL_SHA = '4f2955d0f6b40cc9ff7daa18ccad7d19119ba1249759f4e7e3bb691beee6b35e'
require, sha, identity = elf.require, elf.sha, elf.identity


def read(path):
    return json.loads(path.read_bytes())


def blob(raw):
    return hashlib.sha1(b'blob ' + str(len(raw)).encode() + b'\0' + raw).hexdigest()


def check_receipt(raw, row):
    require(identity(raw) == {k:row[k] for k in ('bytes','sha256')}, 'File receipt differs')
    require(blob(raw) == row['git_blob'], 'Git blob differs')


def load_run(folder=HERE):
    run = read(folder/'run.json')
    require(run['id'] == RUN and run['head_sha'] == HEAD and
            run['status'] == 'completed' and run['conclusion'] == 'success', 'Run identity/status differs')
    require(run['repository']['full_name'] == 'startrack3r/pumpfun-source' and
            run['actor']['login'] == 'startrack3r', 'Run identity differs')
    artifacts = read(folder/'artifacts.json')['artifacts']
    require(len(artifacts) == 1, 'Unexpected artifact count')
    artifact, = artifacts
    require(artifact['id'] == ARTIFACT and artifact['workflow_run']['id'] == RUN and
            artifact['workflow_run']['head_sha'] == HEAD, 'Artifact run binding differs')
    archive = (folder/(str(ARTIFACT)+'.zip')).read_bytes()
    require(sha(archive) == ZIP_SHA and artifact['digest'] == 'sha256:'+ZIP_SHA and
            len(archive) == artifact['size_in_bytes'], 'Provider artifact digest differs')
    jobs = read(folder/'jobs.json')['jobs']
    require(len(jobs) == 1 and jobs[0]['run_id'] == RUN and jobs[0]['head_sha'] == HEAD and
            jobs[0]['conclusion'] == 'success', 'Job binding differs')
    files = {}; members = []
    with zipfile.ZipFile(io.BytesIO(archive)) as stream:
        for info in stream.infolist():
            name = PurePosixPath(info.filename)
            require(not name.is_absolute() and '..' not in name.parts and '\\' not in info.filename
                    and not info.is_dir() and info.file_size < 100_000_000 and info.filename not in files,
                    'Invalid artifact member')
            raw = stream.read(info); files[info.filename] = raw
            members.append(dict(path=info.filename, **identity(raw)))
    require(members == read(folder/'artifact-members.json'), 'Artifact membership differs')
    require(files['source-commit.txt'].decode().strip() == HEAD, 'Controller revision differs')
    for name in files:
        if name.endswith('-commands.json'):
            for row in json.loads(files[name]):
                require(row['exit'] == 0, 'Successful run contains failed command')
                for output in ('stdout','stderr'):
                    receipt = row[output]
                    require(identity(files[receipt['file']]) == {k:receipt[k] for k in ('bytes','sha256')},
                            'Command output differs')
    return files


def validate_build(files):
    obj = lambda name: json.loads(files[name])
    policy = read(HERE/'policy.json'); obs = obj('observation.json')
    require(obs['status'] == 'COMPLETED' and obs['program_executions'] == 0 and
            obs['target_inputs_mounted'] is False and obs['source_changed_files'] == [], 'Experiment scope differs')
    source = controller.source_members()
    expected = {k:sha(v) for k,v in source.items()}
    for phase in ('fetch','trace'):
        for when in ('before','after'):
            require(obj(phase+'-source-'+when+'.json') == expected, 'Source state differs')
    for name in ('run.py','rustc-wrapper.py','test_inputs.py','policy.json','source-inputs.json',
                 'proposal.patch','source.tar.gz','LICENSE'):
        require(files[name] == (HERE/name).read_bytes(), 'Executed controller differs: '+name)
    flags = ['-Cllvm-args=-print-before=stack-coloring,prologepilog',
             '-Cllvm-args=-print-after=stack-coloring,prologepilog',
             '-Cllvm-args=-filter-print-funcs='+trace.FUNCTION]
    argv = obj('trace-rustc-argv.json')
    require(argv['added'] == flags == obs['added_root_arguments'] and
            argv['actual'] == argv['input']+flags, 'Unexpected compiler argument change')
    require(argv['input'][0] == '/gate/run/toolchains/v1.44/rust/bin/rustc' and
            argv['input'][argv['input'].index('--crate-name')+1] == 'pump_fees_candidate' and
            argv['input'][argv['input'].index('--target')+1] == 'sbf-solana-solana' and
            '-Zremap-cwd-prefix=' in argv['input'], 'Root compiler invocation differs')
    host = {r['label']:r for r in obj('host-commands.json')}
    docker = host['container-trace']['argv']
    require(docker[docker.index('--network')+1] == 'none' and '--read-only' in docker and
            docker[docker.index('--cap-drop')+1] == 'ALL' and
            docker[docker.index('--security-opt')+1] == 'no-new-privileges' and '--user' in docker,
            'Build isolation differs')
    require(policy['container']['image'] in docker, 'Container image differs')
    require(policy['container']['image'] in obj('inspect-image.stdout.log')[0]['RepoDigests'], 'Image digest differs')
    build, strip = obj('trace-commands.json')
    with patch.object(controller, 'Path', PurePosixPath):
        environment = controller.environment('trace')
    require(build['environment'] == strip['environment'] == environment, 'Build environment differs')
    require(build['argv'] == ['/gate/run/toolchains/v1.44/rust/bin/cargo','build','--manifest-path',
            '/gate/input/source/programs/pump-fees/Cargo.toml','--release','--target','sbf-solana-solana',
            '--locked','--offline','--verbose','--config','profile.release.strip="debuginfo"'], 'Cargo recipe differs')
    require(strip['argv'] == ['/gate/run/toolchains/v1.52/llvm/bin/llvm-objcopy','--strip-all',
            '/gate/evidence/trace.unstripped.so','/gate/evidence/trace.stripped.so'], 'Strip recipe differs')
    registry = obj('registry-before.json')
    locked = {(p['name'],p['version']):p['checksum'] for p in tomllib.loads(source['Cargo.lock'].decode())['package']
              if p.get('source','').startswith('registry+')}
    require(len(registry) == len(locked) == obs['registry_archives_verified'] == 252 and
            {(p['name'],p['version']):p['sha256'] for p in registry} == locked, 'Registry receipt differs')
    tools = obj('tool-identities.json')
    for path, digest in policy['compile']['selected_sha256'].items():
        require(tools['v1.44/'+path]['sha256'] == digest, 'Compiler identity differs')
    require(tools['v1.52/llvm/bin/llvm-objcopy']['sha256'] == policy['strip']['objcopy_sha256'], 'Stripper differs')
    outputs = {k:identity(files['trace.'+k+'.so']) for k in ('stripped','unstripped')}
    require(outputs == obs['outputs'] == policy['expected'] and obs['raw_pr75_outputs_equal'], 'Output gate differs')
    a, b = (elf.Elf(files['trace.'+k+'.so']) for k in ('stripped','unstripped'))
    require(a.content(a.text) == b.content(b.text), 'Stripped/unstripped .text differ')
    return outputs


def validate_references(files):
    for row in read(HERE/'references.json'):
        require(row['commit'] == '5f8f2aef2a70e43642e65e10d1db3e7476a533d6', 'Wrong PR75 revision')
        check_receipt((HERE/row['local_path']).read_bytes(), row)
    variant = read(HERE/'references/experiment.json')['variants']['body-direct']
    require(variant['input_sha256'] == read(HERE/'source-inputs.json'), 'PR75 source input differs')
    for kind, suffix in [('candidate','stripped'),('symbols','unstripped')]:
        prior = gzip.decompress((HERE/'references'/('body-direct-'+kind+'.so.gz')).read_bytes())
        require(identity(prior) == {k:variant['files'][kind][k] for k in ('bytes','sha256')}, 'PR75 output descriptor differs')
        require(prior == files['trace.'+suffix+'.so'], 'Raw PR75 output differs')
    receipts = {r['local_file']:r for r in read(HERE/'compiler-source-receipts.json')}
    seen = set()
    with tarfile.open(HERE/'compiler-source.tar.gz','r:gz') as archive:
        for member in archive:
            require(member.isfile() and member.name in receipts and member.name not in seen, 'Compiler source member differs')
            check_receipt(archive.extractfile(member).read(), receipts[member.name]); seen.add(member.name)
    require(seen == set(receipts), 'Compiler source missing')


def analyze(files, original):
    require(sha(original) == ORIGINAL_SHA, 'Original capture differs')
    return dict(trace=trace.analyze(files['trace-build.stderr.log']),
                static=static_frame.analyze(original, files['trace.unstripped.so']),
                captured_allocation_comparison=elf.raw_difference(original, files['trace.stripped.so']))


def verify(root):
    actual = {p.relative_to(HERE).as_posix():sha(p.read_bytes()) for p in HERE.rglob('*')
              if p.is_file() and p != HERE/'manifest.json' and '__pycache__' not in p.parts}
    require(actual == read(HERE/'manifest.json'), 'Packet membership or digest differs')
    files = load_run(); outputs = validate_build(files); validate_references(files)
    result = analyze(files, (root/ORIGINAL).read_bytes())
    require(result == read(HERE/'analysis.json'), 'Recomputed analysis differs')
    return dict(status='PASS', successful_run=RUN, raw_pr75_outputs=outputs,
                observed_slot_remapping=result['trace']['frame_remapping'],
                captured_allocation_raw_equal=result['captured_allocation_comparison']['raw_equal'])


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--repository-root', type=Path, default=HERE.parents[1])
    args = parser.parse_args()
    print(json.dumps(verify(args.repository_root), indent=2))
