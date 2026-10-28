"""Build an isolated source tree with an explicit, previously prepared SDK."""
import argparse
import hashlib
import json
import os
from pathlib import Path
import shutil
import subprocess
import time


def sha(path):
    with path.open('rb') as stream:
        return hashlib.file_digest(stream, 'sha256').hexdigest()


def inventory(root):
    return {p.relative_to(root).as_posix(): sha(p)
            for p in sorted(root.rglob('*')) if p.is_file()}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    for name in ('source', 'sdk', 'cargo-home', 'target', 'output', 'strip'):
        parser.add_argument('--' + name, required=True, type=Path)
    parser.add_argument('--linker-script', type=Path)
    parser.add_argument('--historical-macro', required=True, type=Path)
    args = parser.parse_args()
    source, sdk, cargo_home, target, output, strip = (
        p.resolve() for p in (args.source, args.sdk, args.cargo_home,
                             args.target, args.output, args.strip))
    output.mkdir(parents=True, exist_ok=False)
    inputs = inventory(source)
    tools = [sdk / 'rust/bin' / n for n in ('rustc', 'cargo', 'rustdoc')]
    tools += [sdk / 'llvm/bin' / n for n in ('clang', 'llvm-ar')]
    tools += [strip]
    checked = {str(p): sha(p) for p in tools}
    libraries = inventory(sdk / 'rust/lib/rustlib/sbpf-solana-solana')
    overrides = {
        'RUSTC': str(tools[0]), 'RUSTDOC': str(tools[2]),
        'CARGO_HOME': str(cargo_home), 'CARGO_TARGET_DIR': str(target),
        'CARGO_NET_OFFLINE': 'true', 'CC': str(tools[3]), 'AR': str(tools[4]),
        'CARGO_TARGET_SBPF_SOLANA_SOLANA_RUSTFLAGS': '-Zremap-cwd-prefix=',
    }
    env = os.environ.copy()
    macro = args.historical_macro.resolve()
    host_dependencies = inventory(macro.parent / 'deps')
    checked[str(macro)] = sha(macro)
    wrapper = output / 'rustc-wrapper.py'
    wrapper.write_text('''#!/usr/bin/env python3
import os, sys, json
from pathlib import Path
p=Path(__file__).resolve().parent
compiler, *args=sys.argv[1:]
name=args[args.index('--crate-name')+1] if '--crate-name' in args else None
incoming=args.copy()
macro=''' + repr(str(macro)) + '''
if name in ('curve_accounts','mayhem_recovered'):
    if name=='curve_accounts':args+=['--extern','historical_anchor_program='+macro]
    args+=['-L','dependency='+str(Path(macro).parent/'deps')]
    (p/(name+'-invocation.json')).write_text(json.dumps(dict(compiler=compiler,incoming=incoming,forwarded=args),indent=2)+'\\n')
os.execv(compiler,[compiler,*args])
''')
    wrapper.chmod(0o755)
    overrides['RUSTC_WRAPPER'] = str(wrapper)
    checked[str(wrapper)] = sha(wrapper)
    env.update(overrides)
    cmd = [str(tools[1]), 'rustc', '--manifest-path', str(source / 'Cargo.toml'),
           '--release', '--target', 'sbpf-solana-solana', '--locked', '--offline',
           '--verbose', '--jobs', '4', '--',
           '--remap-path-prefix=src/=programs/mayhem-program/src/',
           '--remap-path-prefix=src/account_wrapper.rs=src/account_wrapper.rs',
           '-Clink-arg=-Map=' + str(output / 'link.map')]
    if args.linker_script:
        shutil.copyfile(args.linker_script, output / 'ordered.ld')
        wrapper = output / 'linker.py'
        real = sdk / 'rust/lib/rustlib/aarch64-apple-darwin/bin/rust-lld'
        wrapper.write_text('''#!/usr/bin/env python3
import os, sys, json
from pathlib import Path
p=Path(__file__).resolve().parent
args=sys.argv[1:]; incoming=args.copy(); changes=0
for i,arg in enumerate(incoming):
    if arg in ('--script','-T'):
        (p/'default.ld').write_bytes(Path(incoming[i+1]).read_bytes())
        args[i+1]=str(p/'ordered.ld'); changes+=1
    elif arg.startswith('--script='):
        (p/'default.ld').write_bytes(Path(arg.split('=',1)[1]).read_bytes())
        args[i]='--script='+str(p/'ordered.ld'); changes+=1
assert changes==1
(p/'linker-invocation.json').write_text(json.dumps(dict(incoming=incoming,forwarded=args),indent=2)+'\\n')
real=''' + repr(str(real)) + '''
os.execv(real,[real,*args])
''')
        wrapper.chmod(0o755)
        cmd += ['-Clinker=' + str(wrapper)]
        checked[str(real)] = sha(real)
        checked[str(wrapper)] = sha(wrapper)
        checked[str(output / 'ordered.ld')] = sha(output / 'ordered.ld')
    launch = dict(command=cmd, cwd=str(source), environment_overrides=overrides,
                  source_inputs=inputs, checked_tools=checked,
                  target_libraries=libraries, controller_sha256=sha(Path(__file__)))
    launch['historical_macro_dependencies'] = host_dependencies
    (output / 'launch.json').write_text(json.dumps(launch, indent=2) + '\n')
    start = time.monotonic()
    with (output / 'build.log').open('wb') as log:
        result = subprocess.run(cmd, cwd=source, env=env, stdout=log, stderr=log)
    record = dict(returncode=result.returncode, seconds=time.monotonic() - start,
                  source_unchanged=inventory(source) == inputs,
                  tools_unchanged=all(sha(Path(p)) == h for p, h in checked.items()),
                  target_libraries_unchanged=inventory(sdk / 'rust/lib/rustlib/sbpf-solana-solana') == libraries,
                  historical_macro_dependencies_unchanged=inventory(macro.parent / 'deps') == host_dependencies,
                  build_log_sha256=sha(output / 'build.log'))
    if result.returncode == 0:
        shutil.copyfile(target / 'sbpf-solana-solana/release/mayhem_recovered.so', output / 'symbols.so')
        subprocess.run([str(strip), '--strip-all', str(output / 'symbols.so'),
                        str(output / 'candidate.so')], check=True)
        record.update({n + '_sha256': sha(output / (n + '.so'))
                       for n in ('candidate', 'symbols')})
        record['candidate_bytes'] = (output / 'candidate.so').stat().st_size
    (output / 'result.json').write_text(json.dumps(record, indent=2) + '\n')
    print(json.dumps(record, indent=2))
    assert result.returncode == 0 and all(record[k] for k in (
        'source_unchanged', 'tools_unchanged', 'target_libraries_unchanged'))


if __name__ == '__main__':
    main()
