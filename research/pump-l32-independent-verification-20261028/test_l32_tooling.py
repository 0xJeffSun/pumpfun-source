#!/usr/bin/env python3
"""Integration controls for portable, fail-closed L32 verification tooling."""
from pathlib import Path
import json
import subprocess
import sys
import tempfile
import unittest

sys.dont_write_bytecode = True
HERE = Path(__file__).resolve().parent
ROOT = next(path for path in HERE.parents if (path / 'evidence/original/pump/deployed.so').is_file())
L32 = ROOT / 'research/claude-pump-integration-20261027/r37-layout-32'


def run(*arguments, cwd=None):
    return subprocess.run(
        [sys.executable, *map(str, arguments)],
        cwd=cwd,
        text=True,
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
        check=False,
    )


class L32ToolingControls(unittest.TestCase):
    def test_01_main_verifier_passes_normally(self):
        result = run(L32 / 'verify.py')
        self.assertEqual(result.returncode, 0, result.stdout)
        self.assertIn('verified', result.stdout.lower())

    def test_02_main_verifier_rejects_optimized_python(self):
        result = run('-O', L32 / 'verify.py')
        self.assertNotEqual(result.returncode, 0, result.stdout)
        self.assertIn('optimized Python disables', result.stdout)

    def test_03_retained_comparison_is_checkout_independent(self):
        with tempfile.TemporaryDirectory() as directory:
            result = run(L32 / 'runtime-review/retained_vs_fresh.py', cwd=directory)
        self.assertEqual(result.returncode, 0, result.stdout)
        report = json.loads(result.stdout)
        self.assertEqual(report['pairs'], 10468)
        self.assertEqual(report['candidate_insert_only'], 115)
        self.assertEqual(report['unexpected_count'], 0)

    def test_04_saved_runtime_audit_is_checkout_independent(self):
        with tempfile.TemporaryDirectory() as directory:
            result = run(L32 / 'runtime-review/audit_saved_runtime.py', cwd=directory)
        self.assertEqual(result.returncode, 0, result.stdout)
        report = json.loads(result.stdout)
        self.assertEqual(report['counts']['pairs'], 10468)
        self.assertEqual(report['transaction_accounting']['direct_case_outcome_fields']['distinct'], 2407)
        self.assertEqual(report['transaction_accounting']['all_transactions_inside_outcomes']['distinct'], 2409)
        self.assertEqual(report['non_filename_log_differences'], 23)

    def test_05_accounting_is_optimization_safe(self):
        normal = run(HERE / 'transaction_accounting.py')
        optimized = run('-O', HERE / 'transaction_accounting.py')
        self.assertEqual(normal.returncode, 0, normal.stdout)
        self.assertEqual(optimized.returncode, 0, optimized.stdout)
        self.assertEqual(normal.stdout, optimized.stdout)


if __name__ == '__main__':
    unittest.main(verbosity=2)
