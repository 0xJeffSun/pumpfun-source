#!/usr/bin/env python3
"""Exercise real Git checkout conversion without touching repository evidence."""
import os
from pathlib import Path
import subprocess
import tempfile
import unittest


ROOT = Path(__file__).resolve().parents[2]
ATTRIBUTES = ROOT / ".gitattributes"
FIXTURES = {
    "evidence/upstream/receipt.json": b'{\n  "receipt": true\n}\n',
    "repro/frozen/source.rs": b"fn main() {}\n",
    "repro/frozen/windows-receipt.txt": b"original\r\nreceipt\r\n",
    "repro/frozen/mixed-receipt.txt": b"first\r\nsecond\nthird\r\n",
    "scripts/example.py": b"print('receipt')\n",
    "programs/example/src/lib.rs": b"pub fn example() {}\n",
    "evidence/original/example/deployed.so": b"\x7fELF\0\r\n\xff\n",
    "evidence/original/example/program-account.bin": b"\0\r\n\xff\n",
}


def checkout_bytes(attributes, autocrlf, eol="native"):
    """Seed exact Git blobs, then materialize them with the requested policy."""
    with tempfile.TemporaryDirectory(prefix="pumpfun-checkout-") as folder:
        root = Path(folder)
        env = os.environ.copy()
        # The fixture's policy must not depend on an operator's Git setup.
        for key in list(env):
            if key.startswith("GIT_"):
                del env[key]
        env.update(GIT_CONFIG_NOSYSTEM="1", GIT_CONFIG_GLOBAL=os.devnull)

        def git(*args, data=None):
            return subprocess.run(
                ["git", *args], cwd=root, env=env, input=data,
                stdout=subprocess.PIPE, stderr=subprocess.PIPE, check=True,
            ).stdout

        git("init", "--quiet")
        git("config", "core.autocrlf", autocrlf)
        git("config", "core.eol", eol)
        (root / ".gitattributes").write_bytes(attributes)
        git("add", ".gitattributes")
        for path, data in FIXTURES.items():
            oid = git("hash-object", "-w", "--stdin", data=data).decode().strip()
            git("update-index", "--add", "--cacheinfo", f"100644,{oid},{path}")
        git("checkout-index", "--all", "--force")
        checked_out = {path: (root / path).read_bytes() for path in FIXTURES}
        # Also check staging: preservation must work in both directions.
        git("add", "--", *FIXTURES)
        staged = {path: git("show", f":{path}") for path in FIXTURES}
        return checked_out, staged


class CheckoutBytesTests(unittest.TestCase):
    def test_repository_policy_preserves_checkout_and_staging(self):
        for autocrlf, eol in [("true", "native"), ("input", "native"), ("false", "crlf")]:
            with self.subTest(autocrlf=autocrlf, eol=eol):
                checked_out, staged = checkout_bytes(ATTRIBUTES.read_bytes(), autocrlf, eol)
                self.assertEqual(checked_out, FIXTURES)
                self.assertEqual(staged, FIXTURES)

    def test_binary_only_policy_reproduces_receipt_corruption(self):
        checked_out, _ = checkout_bytes(b"*.so binary\n*.bin binary\n", "true")
        path = "evidence/upstream/receipt.json"
        self.assertEqual(checked_out[path], FIXTURES[path].replace(b"\n", b"\r\n"))
        self.assertNotEqual(checked_out[path], FIXTURES[path])

    def test_forcing_lf_would_rewrite_authentic_crlf_on_staging(self):
        _, staged = checkout_bytes(b"* text eol=lf\n*.so binary\n*.bin binary\n", "true")
        path = "repro/frozen/windows-receipt.txt"
        self.assertNotEqual(staged[path], FIXTURES[path])
        self.assertEqual(staged[path], FIXTURES[path].replace(b"\r\n", b"\n"))


if __name__ == "__main__":
    unittest.main()
