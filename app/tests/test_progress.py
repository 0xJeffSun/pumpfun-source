import importlib.util
import pathlib
import unittest
import tempfile
from unittest.mock import patch
spec=importlib.util.spec_from_file_location('progress',pathlib.Path(__file__).resolve().parents[1]/'scripts/progress.py')
progress=importlib.util.module_from_spec(spec)
spec.loader.exec_module(progress)
class ProgressTests(unittest.TestCase):
    def test_pending_does_not_earn_credit(self):
        self.assertEqual(progress.score({'one':{'status':'pending','evidence':[]}}),'0/1 (0%)')
    def test_acceptance_requires_evidence(self):
        with self.assertRaises(ValueError):progress.score({'one':{'status':'accepted','evidence':[]}})
    def test_not_applicable_requires_a_recorded_decision(self):
        with self.assertRaises(ValueError):progress.score({'one':{'status':'not-applicable','evidence':[]}})
    def test_check_rejects_stale_reports(self):
        with tempfile.TemporaryDirectory() as tmp:
            root=pathlib.Path(tmp)/'app';root.mkdir()
            (root/'PROGRESS.md').write_text('stale',encoding='utf-8')
            (root.parent/'README.md').write_text('## Remaining work\n',encoding='utf-8')
            with patch.object(progress,'ROOT',root),patch.object(progress,'render',return_value='Current report'),patch('sys.argv',['progress.py','--check']):
                with self.assertRaisesRegex(ValueError,'stale'):progress.main()
    def test_generated_region_preserves_unrelated_readme_content(self):
        old='Existing contract table\n\n## Remaining work\n\nExisting tasks\n'
        updated=progress.replace_readme(old,'App table')
        self.assertTrue(updated.startswith('Existing contract table\n\n'))
        self.assertTrue(updated.endswith('## Remaining work\n\nExisting tasks\n'))
        self.assertEqual(progress.replace_readme(updated,'App table'),updated)
        refreshed=progress.replace_readme(updated,'Updated app table')
        self.assertEqual(refreshed,updated.replace('App table','Updated app table'))
    def test_malformed_regions_are_rejected_before_reports_are_written(self):
        malformed={
            'missing start':progress.END,
            'missing end':progress.BEGIN,
            'reversed':progress.END+'\nstale table\n'+progress.BEGIN,
            'duplicate start':progress.BEGIN+'\n'+progress.BEGIN+'\n'+progress.END,
            'duplicate end':progress.BEGIN+'\n'+progress.END+'\n'+progress.END,
        }
        with tempfile.TemporaryDirectory() as tmp:
            root=pathlib.Path(tmp)/'app';root.mkdir()
            report=root/'PROGRESS.md';readme=root.parent/'README.md'
            for name,region in malformed.items():
                for mode in [[],['--check']]:
                    with self.subTest(region=name,mode=mode):
                        original=('Contract table\n\n'+region+'\n\n## Remaining work\n\nExisting tasks\n').encode('utf-8')
                        readme.write_bytes(original)
                        # Keep the standalone report fresh, so --check must validate the README.
                        report.write_bytes(b'# Application progress report\n\nCurrent report\n')
                        with patch.object(progress,'ROOT',root),patch.object(progress,'render',return_value='Current report'),patch('sys.argv',['progress.py',*mode]):
                            with self.assertRaisesRegex(ValueError,'marker'):progress.main()
                        self.assertEqual(readme.read_bytes(),original)
                        self.assertEqual(report.read_bytes(),b'# Application progress report\n\nCurrent report\n')
if __name__=='__main__':unittest.main()
