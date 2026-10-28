"""Compare captured-account load results and timings in two repository checkouts."""
from pathlib import Path
import argparse, gc, hashlib, importlib.util, json, statistics, time


def load_module(root, name):
    path = root / 'scripts/pump_captured_loader.py'
    spec = importlib.util.spec_from_file_location(name, path)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module, hashlib.sha256(path.read_bytes()).hexdigest()


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--baseline', type=Path, required=True)
    parser.add_argument('--candidate', type=Path, required=True)
    parser.add_argument('--output', type=Path, required=True)
    args = parser.parse_args()
    modules = {name: load_module(path.resolve(), 'bench_' + name) for name, path in
               [('baseline', args.baseline), ('candidate', args.candidate)]}
    paths = ['evidence/original/pump/deployed.so', 'evidence/original/pump_fees/deployed.so']
    inputs = {p: (args.baseline / p).read_bytes() for p in paths}
    if any((args.candidate / p).read_bytes() != raw for p, raw in inputs.items()):
        raise ValueError('ELF inputs differ between checkouts')
    durations = {name: [] for name in modules}
    receipts = {name: [] for name in modules}
    for repeat in range(3):
        for name in (['baseline', 'candidate'] if repeat % 2 == 0 else ['candidate', 'baseline']):
            module, _ = modules[name]
            module.LOADS.clear()
            if hasattr(module, '_programdata_image'):
                module._programdata_image.cache_clear()
            gc.collect()
            started = time.perf_counter()
            for raw in list(inputs.values()) * 4:
                vm = module.CapturedLiteSVM()
                vm.add_program(module.PROGRAM, raw)
                del vm
            durations[name].append(time.perf_counter() - started)
            receipts[name].append(list(module.LOADS))
    if receipts['baseline'] != receipts['candidate']:
        raise ValueError('Loaded account identity or receipt changed')
    medians = {name: statistics.median(values) for name, values in durations.items()}
    result = {'scope': 'Local loading benchmark; preserves full captured-account checks. No function-window gain.',
        'loader_sha256': {name: digest for name, (_, digest) in modules.items()},
        'elf_sha256': {p: hashlib.sha256(raw).hexdigest() for p, raw in inputs.items()},
        'rounds': 3, 'loads_per_round': 8, 'durations_seconds': durations,
        'median_seconds': medians, 'speedup': medians['baseline'] / medians['candidate'],
        'all_load_receipts_equal': True, 'receipts': receipts['candidate']}
    args.output.write_text(json.dumps(result, indent=2) + '\n')
    print(json.dumps({k: result[k] for k in ['median_seconds', 'speedup', 'all_load_receipts_equal']}))


if __name__ == '__main__':
    main()
