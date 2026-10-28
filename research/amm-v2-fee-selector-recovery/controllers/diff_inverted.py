from pathlib import Path
import subprocess,re,difflib
J=Path('/home/ahi200/pumpfun-work/20261028-amm-v2-selector');s='/home/ahi200/pumpfun-work/20261027-crank/sdk/llvm/bin/llvm-objdump';out=subprocess.check_output([s,'-d','--no-show-raw-insn','--start-address=148200','--stop-address=149856',str(J/'route-inverted2/symbols.so')],text=True);(J/'route-inverted2/function.asm').write_text(out)
def rows(asm):return [re.sub(r'^lddw (r\d+),.*',r'lddw \1, DATA',re.sub(r'^call .+','call TARGET',x[1].split(' <')[0])) for x in re.finditer(r'^\s+\d+:\s+(.+)',asm,re.M)]
orig=rows(Path('/home/ahi200/pumpfun-work/20261028-amm-select-resume/next-v2-selector/original.asm').read_text());r=rows(out);d='\n'.join(difflib.unified_diff(orig,r));(J/'route-inverted2/function.diff').write_text(d);print(len(orig),len(r));print(d)
