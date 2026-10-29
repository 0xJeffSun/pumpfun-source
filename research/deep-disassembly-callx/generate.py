"""Reviewed callx successor; keeps the original disassembler unchanged."""
import argparse
import hashlib
from pathlib import Path
import sys
import types

ROOT = Path(__file__).resolve().parents[2]
SOURCE = ROOT / 'scripts/deep_disassembly.py'
SOURCE_SHA256 = {
    'e0241c00f43218f15a127ded6c6e5398811faa38d7b6fcd8f875029135db0ceb',
    'bcc2c08b7f6e800ea484b81fc188324c89ca5f197d55815e98efa89beaca6c8e',
}
BEFORE = '''    else:
        result["mnemonic"] = f"raw_{opcode:#04x} {dst},{src},{off},{imm}"'''
AFTER = '''    elif opcode == 0x8d and dst_reg == 0 and src_reg == 0 and off == 0 and 0 <= imm <= 10:
        result["mnemonic"] = f"callx {REGS[imm]}"
    else:
        result["mnemonic"] = f"raw_{opcode:#04x} {dst},{src},{off},{imm}"'''


def load_module(correct):
    raw = SOURCE.read_bytes()
    if hashlib.sha256(raw).hexdigest() not in SOURCE_SHA256:
        raise ValueError('The reviewed disassembler source has changed')
    source = raw.decode('utf-8').replace('\r\n', '\n')
    if source.count(BEFORE) != 1:
        raise ValueError('callx adaptation is no longer unique')
    if correct:
        source = source.replace(BEFORE, AFTER)
    sys.path.insert(0, str(ROOT / 'scripts'))
    module = types.ModuleType('reviewed_callx' if correct else 'archived_callx')
    module.__file__ = str(SOURCE)
    exec(compile(source, str(SOURCE), 'exec'), module.__dict__)
    return module


def corrected_module():
    return load_module(True)


def archived_module():
    return load_module(False)


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--program', choices=['pump', 'pump_amm', 'pump_fees', 'mayhem'], required=True)
    parser.add_argument('--output', type=Path, required=True)
    args = parser.parse_args()
    if args.output.exists():
        parser.error('output already exists; preserve prior evidence')
    sys.exit(corrected_module().main())
