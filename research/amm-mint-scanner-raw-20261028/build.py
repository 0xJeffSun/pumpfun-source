"""Compile one no_std helper crate offline with the pinned Windows SDK; never run SBF."""
import argparse
import gzip
import json
import os
from pathlib import Path
import subprocess
import sys
sys.path.insert(0, str(Path(__file__).resolve().parent))
import common as c

HERE = Path(__file__).resolve().parent

def build(sdk, output, case):
    sdk, output = Path(sdk).resolve(), Path(output).resolve()
    c.require(not output.exists(), 'output directory must be absent')
    manifest = json.loads(gzip.decompress((HERE / 'sdk-components.json.gz').read_bytes()))
    for row in manifest['files']:
        data = (sdk / row['path']).read_bytes()
        c.require(len(data) == row['bytes'] and c.sha(data) == row['sha256'], 'SDK component: ' + row['path'])
    output.mkdir(parents=True)
    (output / 'temp').mkdir()
    source = (HERE / 'sources' / (case + '.rs')).read_bytes()
    (output / 'lib.rs').write_bytes(source)
    rustc = sdk / 'rust/bin/rustc.exe'
    args = c.command(rustc, output / 'lib.rs', output)
    env = {key: os.environ[key] for key in ('SystemRoot', 'WINDIR', 'SystemDrive', 'COMSPEC', 'PROCESSOR_ARCHITECTURE') if key in os.environ}
    env.update(PATH=str(rustc.parent) + os.pathsep + str(Path(env['SystemRoot']) / 'System32'),
               TEMP=str(output / 'temp'), TMP=str(output / 'temp'))
    process = subprocess.run(args, cwd=output, env=env, capture_output=True)
    (output / 'stdout.log').write_bytes(process.stdout)
    (output / 'stderr.log').write_bytes(process.stderr)
    record = dict(command=args, environment=env, source_sha256=c.sha(source),
                  compiler_sha256=c.sha(rustc.read_bytes()), returncode=process.returncode,
                  target_executions=0, fresh_output=True, sdk_verified_files=len(manifest['files']))
    (output / 'launch.json').write_text(json.dumps(record, indent=2) + '\n')
    c.require(process.returncode == 0, 'compiler failed; logs retained')
    archive = (output / c.ARCHIVE).read_bytes()
    members = c.archive_members(archive)
    names = [name for name in members if name.endswith('.rcgu.o')]
    c.require(len(names) == 1, 'one codegen object')
    obj = members[names[0]]
    (output / 'crate.o').write_bytes(obj)
    body = c.functions(obj)[c.SYMBOL]['data']
    (output / 'supported_mint_data.bin').write_bytes(body)
    result = dict(archive_sha256=c.sha(archive), object_sha256=c.sha(obj), object_member=names[0],
                  function=c.SYMBOL, bytes=len(body), sha256=c.sha(body), case=case)
    (output / 'result.json').write_text(json.dumps(result, indent=2) + '\n')
    print(json.dumps(result, indent=2))
    return result

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--sdk', required=True)
    parser.add_argument('--output', required=True)
    parser.add_argument('--case', choices=('baseline', 'recovered', 'last-guard-negative'), default='recovered')
    args = parser.parse_args()
    build(args.sdk, args.output, args.case)
