#!/usr/bin/env python3
"""Run one static verifier with file opens restricted to bundle and Python runtime."""
import ast
import bz2
import collections
import difflib
import gzip
import hashlib
import importlib.util
import json
import lzma
import os
from pathlib import Path
import re
import runpy
import struct
import sys
import tarfile
import tomllib
from unittest.mock import patch
import zlib

ROOT = Path(__file__).resolve().parent
target = (ROOT / sys.argv[1]).resolve()
assert target.is_relative_to(ROOT)
runtime = Path(sys.base_prefix).resolve()
opened = []


def audit(event, args):
    if event != 'open' or not isinstance(args[0], (str, bytes, os.PathLike)):
        return
    path = Path(os.fsdecode(args[0])).resolve()
    if not (path.is_relative_to(ROOT) or path.is_relative_to(runtime)):
        raise RuntimeError('Verifier external file access denied: ' + str(path))
    if path.is_relative_to(ROOT):
        opened.append(str(path.relative_to(ROOT)))


sys.dont_write_bytecode = True
sys.path.insert(0, str(target.parent))
sys.argv = [str(target)]
sys.addaudithook(audit)
runpy.run_path(str(target), run_name='__main__')
print(json.dumps({'file_open_guard': 'PASS', 'bundle_opens': len(opened),
                  'external_work_cache_access': False}))
