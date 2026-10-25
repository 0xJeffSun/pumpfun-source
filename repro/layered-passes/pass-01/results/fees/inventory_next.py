#!/usr/bin/env python3
"""Reusable static inventory for a NEXT accepted pair; does not rewrite this seal.
python -B inventory_next.py ORIGINAL CANDIDATE SYMBOLS NEW_OUTPUT_DIRECTORY
Only new output directories are accepted. No target execution or compilation.
"""
import sys,shutil,json
from pathlib import Path
import inventory_method as method
from elf_reader import Elf
from analyze import diff,headers,instructions,relocation_ledger,dump,comparison_relocations

def main():
 if len(sys.argv)!=5:raise SystemExit(__doc__)
 original,candidate,symbols=map(lambda p:Path(p).resolve(),sys.argv[1:4]);out=Path(sys.argv[4]).resolve()
 # New artifacts belong to a caller-selected directory. Never modify inputs.
 out.mkdir(parents=True,exist_ok=False);(out/'inputs').mkdir()
 shutil.copyfile(original,out/'inputs/original.so')
 method.W=out
 cat=method.catalogue(candidate,symbols);o,c=Elf(original),Elf(candidate)
 result={'catalog.json':cat,'whole-file-diff.json':diff(o.b,c.b),'headers.json':{'original':headers(o),'candidate':headers(c)},'paired-relocations.json':comparison_relocations(cat,o,c)}
 for side,e in [('original',o),('candidate',c)]:
  result[side+'-instructions.json']=instructions(e,cat[side+'_rows']);result[side+'-relocations.json']=relocation_ledger(e,cat[side+'_rows'])
 for name,value in result.items():(out/name).write_text(dump(value))
 print(json.dumps(cat['summary'],indent=2))
if __name__=='__main__':main()
