from pathlib import Path
import shutil,sys
P=Path(__file__).resolve().parent;sys.path.insert(0,str(P));from build import *
shutil.copytree(J/'source-apply-match',J/'source-repeat');build('repeat','Independent normal source repeat of qualified apply-match737 candidate with54identicalsourceinputs and396frozendependencies; compare both symbol and stripped ELF against firstbuild.')
assert (J/'repeat/candidate.so').read_bytes()==(J/'apply-match/candidate.so').read_bytes()
assert (J/'repeat/symbols.so').read_bytes()==(J/'apply-match/symbols.so').read_bytes()
print('REPEAT IDENTICAL',flush=True)
