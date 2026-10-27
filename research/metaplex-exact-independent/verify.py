"""Check preserved build bytes and signed loader intent; optionally replay locally."""
from pathlib import Path
import argparse
import base64
import gzip
import hashlib
import io
import json
import struct
import subprocess
import sys
import tarfile
import tempfile

if not __debug__:
    raise SystemExit('verification requires assertions; do not use -O')

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[1]
COMPILER = 'd38edf7b5c03c25b9c323568932ac6e9c593c0e141bcea3781ee13132d88c6b0'
CANDIDATE = '99ee61a5159e15a359b01298b52c9f9f912eb19e47bdfe83987c16de52a4b1ff'
PAYLOAD = '31f0a627dba051a938de650464e55cc5397a4be0fd496929c1f9cf02fe5e9011'
IMAGE = 'solanafoundation/solana-verifiable-build@sha256:43206149a565ec35da95b1a909f4714f5d5f0d8241c31df24189e517acd18467'
PT = '/root/.cache/solana/v1.37/platform-tools'


def sha(data):
    return hashlib.sha256(data).hexdigest()


def read_json(path):
    return json.loads(path.read_bytes())


def unpack(path):
    return gzip.decompress(path.read_bytes())


def check_bindings():
    manifest = read_json(HERE / 'manifest.json')
    actual = {p.relative_to(HERE).as_posix() for p in HERE.rglob('*')
              if p.is_file() and '__pycache__' not in p.parts and p.name != 'manifest.json'}
    assert actual == set(manifest), 'packet membership'
    for name, digest in manifest.items():
        assert sha((HERE / name).read_bytes()) == digest, ('packet binding', name)
    for name, digest in read_json(HERE / 'references.json').items():
        assert sha((ROOT / name).read_bytes()) == digest, ('external binding', name)


def elf_sections(data):
    assert data[:6] == b'\x7fELF\x02\x01'
    shoff = struct.unpack_from('<Q', data, 40)[0]
    shsize, shnum, names_index = struct.unpack_from('<HHH', data, 58)
    assert shsize == 64
    sections = [struct.unpack_from('<IIQQQQIIQQ', data, shoff + i * shsize) for i in range(shnum)]
    names = sections[names_index]
    strings = data[names[4]:names[4] + names[5]]
    allocated = {}
    for s in sections:
        if s[2] & 2:
            name = strings[s[0]:].split(b'\0', 1)[0].decode()
            allocated[name] = (s[1], s[2], s[3], s[5], s[8], s[9], data[s[4]:s[4]+s[5]])
    extent = max([shoff + shsize * shnum] + [s[4]+s[5] for s in sections if s[1] != 8])
    return extent, allocated


def check_builds():
    inputs = read_json(HERE / 'source-inputs.json')
    assert len(inputs) == 812
    assert inputs == read_json(ROOT / 'research/claude-deps-metaplex-20261027/source-manifest.json')
    with tarfile.open(HERE / 'source.tar.xz') as archive:
        found = {}
        for member in archive:
            assert member.isfile() and member.name in inputs and member.name not in found
            assert not Path(member.name).is_absolute() and '..' not in Path(member.name).parts
            found[member.name] = sha(archive.extractfile(member).read())
    assert found == inputs
    outputs = []
    targets = []
    for label in ['first', 'repeat', 'portable']:
        d = HERE / 'builds' / label
        launch, result = read_json(d / 'launch.json'), read_json(d / 'result.json')
        controller = HERE / ('reproduce.py' if label == 'portable' else 'controllers/build.py')
        assert launch['controller_sha256'] == sha(controller.read_bytes())
        assert launch['source_inputs'] == inputs and launch['tools'] == read_json(HERE / 'tools.json')
        assert launch['empty_target'] is True and launch['original_mounted'] is False
        command = launch['command']
        assert command[:7] == ['docker', 'run', '--rm', '--platform', 'linux/amd64', '--network', 'none']
        assert IMAGE in command and '--locked' in command and '--offline' in command
        mounts = [command[i+1] for i, v in enumerate(command) if v == '--mount']
        assert len(mounts) == 5
        for destination in ['/build', PT, '/usr/local/cargo/registry']:
            assert sum(m.endswith('target='+destination+',readonly') for m in mounts) == 1
        targets.append(next(m for m in mounts if m.endswith('target=/build/programs/token-metadata/target')))
        assert result['returncode'] == 0 and result['source_unchanged'] and result['tools_unchanged']
        compiler, candidate, log = (unpack(d / (n+'.gz')) for n in ['compiler-output.so', 'candidate.so', 'build.log'])
        assert sha(compiler) == result['compiler_sha256'] == COMPILER and len(compiler) == 707544
        assert sha(candidate) == result['candidate_sha256'] == CANDIDATE and len(candidate) == result['candidate_bytes'] == 707448
        assert sha(log) == result['build_log_sha256'] and b'Finished release' in log
        strip = read_json(d / 'strip-command.json')
        assert strip[-4:] == [PT+'/llvm/bin/llvm-objcopy', '--strip-all', '/out/compiler-output.so', '/out/candidate.so']
        assert strip[:7] == command[:7] and IMAGE in strip
        assert elf_sections(compiler)[1] == elf_sections(candidate)[1], 'strip must preserve allocated sections'
        outputs.append((compiler, candidate))
    assert len(set(targets)) == 3 and outputs[0] == outputs[1] == outputs[2]
    candidate = outputs[0][1]
    original = (ROOT / 'evidence/dependencies/token_metadata/deployed.so').read_bytes()
    assert sha(original) == PAYLOAD and len(original) == 793991
    assert elf_sections(original)[0] == elf_sections(candidate)[0] == len(candidate)
    assert candidate == original[:len(candidate)] and not any(original[len(candidate):])
    return candidate, original


def expected_instructions(candidate, capacity):
    """Independent encoding of every expected message, including account privileges."""
    from solders.pubkey import Pubkey
    from solders.instruction import Instruction, AccountMeta
    from solders.sysvar import RENT, CLOCK
    loader = Pubkey.from_string('BPFLoaderUpgradeab1e11111111111111111111111')
    payer = Pubkey.from_string('8bcRzB3v6PxbbtkVCiX9ceW2whwakA6gX7qvSYbeMHLq')
    buffer = Pubkey.from_string('HnQFUEqUAkeAqU1PZZCbd4UfFAQhJDSYy7Qkd8DkfBJC')
    program = Pubkey.from_string('5F8wMRFMdYGMkjWQUye6WfbgRVWEo9yyKo9aFPk2TLaD')
    pdata, _ = Pubkey.find_program_address([bytes(program)], loader)
    meta = lambda key, signer=False, writable=False: AccountMeta(key, signer, writable)
    def create(key, size):
        # SystemInstruction::CreateAccount; default local rent (2 * 3480 per byte/year).
        return Instruction(Pubkey.default(), struct.pack('<IQQ', 0, (size+128)*6960, size)+bytes(loader), [meta(payer, True, True), meta(key, True, True)])
    yield 'create-and-initialize-buffer', [create(buffer, 37+len(candidate)), Instruction(loader, struct.pack('<I', 0), [meta(buffer, writable=True), meta(payer)])]
    for offset in range(0, len(candidate), 900):
        chunk = candidate[offset:offset+900]
        yield 'write-'+str(offset), [Instruction(loader, struct.pack('<IIQ', 1, offset, len(chunk))+chunk, [meta(buffer, writable=True), meta(payer, True)])]
    budget = Pubkey.from_string('ComputeBudget111111111111111111111111111111')
    yield 'create-program-and-deploy', [Instruction(budget, struct.pack('<BI', 2, 1400000), []), create(program, 36), Instruction(loader, struct.pack('<IQ', 2, capacity), [meta(payer, True, True), meta(pdata, writable=True), meta(program, writable=True), meta(buffer, writable=True), meta(RENT), meta(CLOCK), meta(Pubkey.default()), meta(payer, True)])]


def check_loader(report, data, candidate, original):
    from solders.transaction import Transaction
    from solders.message import Message
    from solders.pubkey import Pubkey
    capture_dir = ROOT / 'evidence/dependencies/token_metadata'
    captured_account = (capture_dir / 'programdata-account.bin').read_bytes()
    capacity = len(captured_account)-45
    assert captured_account[45:] == original and capacity == 793991
    assert report['candidate_sha256'] == sha(candidate) == CANDIDATE and report['candidate_bytes'] == len(candidate)
    assert report['capture_sha256'] == sha((capture_dir / 'capture.json').read_bytes())
    assert report['observed_capacity'] == capacity and report['solders'] == '0.27.1'
    payer = Pubkey.from_string('8bcRzB3v6PxbbtkVCiX9ceW2whwakA6gX7qvSYbeMHLq')
    program = Pubkey.from_string('5F8wMRFMdYGMkjWQUye6WfbgRVWEo9yyKo9aFPk2TLaD')
    loader = Pubkey.from_string('BPFLoaderUpgradeab1e11111111111111111111111')
    pdata, _ = Pubkey.find_program_address([bytes(program)], loader)
    expected = list(expected_instructions(candidate, capacity))
    receipts = report['receipts']
    assert report['transactions'] == len(receipts) == len(expected) == 789
    signatures = 0
    for row, (label, instructions) in zip(receipts, expected):
        raw = base64.b64decode(row['transaction_base64'], validate=True)
        tx = Transaction.from_bytes(raw)
        assert len(raw) <= 1232 and bytes(tx) == raw
        assert all(tx.verify_with_results()), ('transaction signature', label)
        assert row['signatures'] == [str(s) for s in tx.signatures]
        assert bytes(tx.message) == bytes(Message.new_with_blockhash(instructions, payer, tx.message.recent_blockhash)), ('signed instruction intent', label)
        assert row['label'] == label and 0 < row['compute_units'] <= 1400000
        assert row['logs'][-1] == 'Program '+str(loader)+' success'
        signatures += len(tx.signatures)
    assert signatures == report['verified_signature_fields'] == 791
    assert report['payer'] == str(payer) and report['program'] == str(program) and report['programdata'] == str(pdata)
    assert report['buffer'] == 'HnQFUEqUAkeAqU1PZZCbd4UfFAQhJDSYy7Qkd8DkfBJC'
    assert data[:45] == struct.pack('<IQB', 3, 0, 1)+bytes(payer), 'synthetic metadata'
    assert len(data) == report['programdata_bytes'] == capacity+45
    assert sha(data) == report['programdata_sha256']
    assert data[45:] == original and data[45:45+len(candidate)] == candidate, 'loader payload'
    assert not any(data[45+len(candidate):]) and report['zero_tail_bytes'] == 86543
    assert sha(data[45:]) == report['payload_sha256'] == PAYLOAD
    assert report['payload_equals_capture'] is True and report['programdata_equals_capture'] is False
    assert data != captured_account
    assert report['programdata_owner'] == str(loader) and report['program_executable'] is True
    assert report['programdata_lamports'] == (len(data)+128)*6960
    assert base64.b64decode(report['program_account_data']) == struct.pack('<I', 2)+bytes(pdata)


def main(execute=False):
    check_bindings()
    candidate, original = check_builds()
    saved = []
    for label in ['loader-first', 'loader-repeat']:
        d = HERE / label
        report, data = json.loads(unpack(d/'receipt.json.gz')), unpack(d/'programdata.bin.gz')
        check_loader(report, data, candidate, original)
        saved.append((report, data))
    assert saved[0] == saved[1], 'repeat loader results'
    if execute:
        with tempfile.TemporaryDirectory(prefix='metaplex-loader-') as temporary:
            d = Path(temporary)
            (d/'candidate.so').write_bytes(candidate)
            subprocess.run([sys.executable, '-B', str(HERE/'loader_replay.py'), '--root', str(ROOT), '--candidate', str(d/'candidate.so'), '--output', str(d/'replay')], check=True, stdout=subprocess.DEVNULL)
            fresh = json.loads(unpack(d/'replay/receipt.json.gz')), unpack(d/'replay/programdata.bin.gz')
            check_loader(*fresh, candidate, original)
            assert fresh == saved[0], 'fresh loader receipt/state differs'
    print('PASS: 3 fresh-build records, exact707448-byte ELF, 2 signed789-transaction loader records, exact793991-byte payload'+('; fresh local replay agrees' if execute else ''))


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--execute', action='store_true', help='execute signed transactions in local LiteSVM only')
    main(parser.parse_args().execute)
