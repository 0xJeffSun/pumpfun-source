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
if __name__=='__main__':unittest.main()
