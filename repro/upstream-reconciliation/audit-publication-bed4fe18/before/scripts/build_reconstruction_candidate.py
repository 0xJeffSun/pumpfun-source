#!/usr/bin/env python3
"""Choose evidence-qualified research defaults, then invoke the frozen build helper.

The accepted historical helper is kept byte-identical for its immutable package
proofs. Existing source-build records use explicit --tools-version arguments.
This wrapper does not identify the historical compiler or alter saved evidence.
"""
import argparse
from pathlib import Path
import subprocess
import sys

DEFAULTS = {'pump': 'v1.44', 'pump_amm': 'v1.44', 'pump_fees': 'v1.44', 'mayhem': 'v1.52'}
ROOT = Path(__file__).resolve().parents[1]


def command(arguments):
    parser = argparse.ArgumentParser(description=__doc__, add_help=False)
    parser.add_argument('--program', choices=DEFAULTS, required=True)
    parser.add_argument('--tools-version')
    selected, _ = parser.parse_known_args(arguments)
    forwarded = list(arguments)
    if selected.tools_version is None:
        forwarded += ['--tools-version', DEFAULTS[selected.program]]
    return [sys.executable, str(ROOT / 'scripts/build_partial_candidate.py'), *forwarded]


def main():
    if '--help' in sys.argv[1:] or '-h' in sys.argv[1:]:
        print(__doc__)
        print('Research defaults: Pump/AMM/Fees=v1.44; Mayhem=v1.52. Historical identity unresolved.\n')
        return subprocess.call([sys.executable, str(ROOT / 'scripts/build_partial_candidate.py'), '--help'])
    return subprocess.call(command(sys.argv[1:]))


if __name__ == '__main__':
    raise SystemExit(main())
