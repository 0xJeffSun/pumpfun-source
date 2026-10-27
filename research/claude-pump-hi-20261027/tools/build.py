#!/usr/bin/env python3
"""Build a main-Pump source directory with the frontier packet's exact recipe.

Same as the packet's reproduce.py (archived pump_build_verified.py, workspace layout,
v1.44 SDK, physical-source wrapper, verified external dependency cache) but for an
arbitrary source directory inside this repository and without asserting the frontier
hashes. Run it under the shared slot lock:

  python3 SP/sbf_lock.py --slots 6 --name sbf -- python3 build.py --packet P \
      --source-directory programs/pump --registry-home ~/.cargo --output work/x \
      --dependency-cache SP/lanes/pump-hi/out/depcache
"""
from pathlib import Path
import argparse, importlib.util, sys
sys.dont_write_bytecode = True
HERE = Path(__file__).resolve()
ROOT = next(p for p in HERE.parents if (p / 'evidence/original/pump/deployed.so').is_file())


def main():
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument('--packet', type=Path, required=True)
    p.add_argument('--source-directory', type=Path, required=True)
    p.add_argument('--registry-home', type=Path, required=True)
    p.add_argument('--output', type=Path, required=True)
    p.add_argument('--dependency-cache', type=Path)
    a = p.parse_args()
    packet = a.packet.resolve()
    sys.path.insert(0, str(packet / 'inputs/scripts'))
    path = packet / 'inputs/scripts/pump_build_verified.py'
    spec = importlib.util.spec_from_file_location('archived_pump_builder', path)
    b = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(b)
    b.ROOT = ROOT
    sys.argv = [str(path), '--source-directory', str(a.source_directory.resolve()), '--workspace-layout',
                '--registry-home', str(a.registry_home.resolve()), '--output', str(a.output.resolve())]
    if a.dependency_cache:
        sys.argv += ['--dependency-cache', str(a.dependency_cache.resolve())]
    b.main()


if __name__ == '__main__':
    main()
