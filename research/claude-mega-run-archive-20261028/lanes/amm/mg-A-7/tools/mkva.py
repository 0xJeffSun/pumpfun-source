# mkva.py UPDBLOCK OUT : va.t1 template with lines 38-119 replaced by UPDBLOCK, then pad.py -> OUT
import sys,subprocess
L='/Users/shawwalters/amm100-run/lanes/mg-A-7'
t=open(L+'/gen/va.t1').read().split('\n')
assert t[72].startswith('impl GlobalVolumeAccumulator') and t[118]=='}', (t[72],t[118])
new=t[:37]+open(sys.argv[1]).read().rstrip('\n').split('\n')+t[119:]
open(L+'/gen/va.tmp','w').write('\n'.join(new))
print(subprocess.run(['python3','-B',L+'/tools/pad.py',L+'/gen/va.tmp',sys.argv[2]],capture_output=True,text=True).stdout.strip())
