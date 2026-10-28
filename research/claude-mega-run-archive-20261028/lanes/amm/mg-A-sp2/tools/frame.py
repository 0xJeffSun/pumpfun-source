#!/usr/bin/env python3
"""frame.py ADDR [SO SUB] : stack slot usage summary (min offset, distinct slots) for orig window or cand fn"""
import sys,re,subprocess
L='/Users/shawwalters/amm100-run/lanes/mg-A-sp2'
if len(sys.argv)==2: out=subprocess.run(['python3','-I',L+'/tools/dis.py','orig',sys.argv[1]],capture_output=True,text=True).stdout
else: out=subprocess.run(['python3','-I',L+'/tools/dis.py','cand',sys.argv[2],sys.argv[3]],capture_output=True,text=True).stdout
offs=[int(x,16) for x in re.findall(r'\[r10 - 0x([0-9a-f]+)\]',out)]
offs2=[int(x,16) for x in re.findall(r'add64 r\d, -0x([0-9a-f]+)',out)]
print('max slot depth',hex(max(offs+offs2)),'distinct slots',len(set(offs)),'insns',len(out.splitlines()))
