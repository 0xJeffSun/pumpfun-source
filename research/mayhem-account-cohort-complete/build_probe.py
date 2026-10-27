"""Compile the separate ABI probe to LLVM IR using explicit pinned inputs."""
from pathlib import Path
import argparse, hashlib, json, subprocess

P = Path(__file__).resolve().parent
parser = argparse.ArgumentParser()
parser.add_argument('--sdk', type=Path, required=True)
parser.add_argument('--target-inventory', type=Path, required=True)
parser.add_argument('--output', type=Path, required=True)
args = parser.parse_args()
sdk, out = args.sdk.resolve(), args.output.absolute()
assert not out.exists()
out.mkdir(parents=True)
compiler, source = sdk / 'bin/rustc', P / 'abi_probe.rs'
sha = lambda p: hashlib.file_digest(p.open('rb'), 'sha256').hexdigest()
target = json.loads(args.target_inventory.read_bytes())
assert target['archive_sha256'] == 'fcc41631c7f77561bf5412218bf297501dccf0305ea280f338f0ace2aab9f31e'
for name, digest in target['files'].items(): assert sha(sdk / name) == digest
cmd = [str(compiler), '--crate-name', 'mayhem_data_abi', '--edition', '2021', '--crate-type', 'lib',
       '--target', 'sbpf-solana-solana', '-C', 'opt-level=3', '-C', 'panic=abort', '-C', 'overflow-checks=on',
       '--emit=llvm-ir', '-o', str(out / 'abi_probe.ll'), str(source)]
launch = dict(command=cmd, compiler_sha256=sha(compiler), source_sha256=sha(source), target_inventory=target,
              controller_sha256=sha(Path(__file__)), scope='Separate ABI probe; no target program or VM execution.')
(out / 'launch.json').write_text(json.dumps(launch, indent=2) + '\n')
with (out / 'stdout').open('wb') as stdout, (out / 'stderr').open('wb') as stderr:
    result = subprocess.run(cmd, stdout=stdout, stderr=stderr)
receipt = dict(returncode=result.returncode, source_unchanged=sha(source) == launch['source_sha256'],
               compiler_unchanged=sha(compiler) == launch['compiler_sha256'],
               target_libraries_unchanged=all(sha(sdk / n) == d for n, d in target['files'].items()),
               stdout_sha256=sha(out / 'stdout'), stderr_sha256=sha(out / 'stderr'))
if result.returncode == 0: receipt['llvm_ir_sha256'] = sha(out / 'abi_probe.ll')
(out / 'result.json').write_text(json.dumps(receipt, indent=2) + '\n')
print(json.dumps(receipt, indent=2))
assert result.returncode == 0 and receipt['source_unchanged'] and receipt['compiler_unchanged'] and receipt['target_libraries_unchanged']
