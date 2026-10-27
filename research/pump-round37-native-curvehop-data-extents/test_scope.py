import importlib.util,gzip,json,struct
from pathlib import Path
P=Path(__file__).resolve().parent;s=importlib.util.spec_from_file_location('v',P/'verify.py');v=importlib.util.module_from_spec(s);s.loader.exec_module(v)
a=gzip.decompress((P/'original.so.gz').read_bytes());b=gzip.decompress((P/'candidate.so.gz').read_bytes());report=v.compare(a,b);ss=v.m.sections(b)
def reject(fn):
 try:fn()
 except (AssertionError,KeyError,ValueError):return True
 raise AssertionError('Mutation admitted')
def fileoff(addr):
 sec=next(s for s in ss.values()if s['addr']and s['addr']<=addr<s['addr']+s['size']);return addr-sec['addr']+sec['offset']
for row in report['candidate']:
 x=bytearray(b);x[fileoff(row['pointer'])+row['bytes']-1]^=1;assert reject(lambda:v.compare(a,bytes(x)))
for offset in [312,1768,1816,2800]:
 x=bytearray(b);x[fileoff(0xbb510+offset)+4]^=1;assert reject(lambda:v.compare(a,bytes(x)))
x=bytearray(b);p=fileoff(report['candidate'][-2]['pointer']);row=next(r for r in report['candidate']if r['offset']==2784);p=fileoff(row['pointer'])+32;x[p]^=1;assert v.sha(x)!=v.sha(b);assert v.compare(a,bytes(x))['candidate']==report['candidate']
# A relocation-normalized pointer may change code equality, but wrong bytes cannot pass extent checking.
x=bytearray(b);struct.pack_into('<I',x,fileoff(0xbb510+296)+4,report['candidate'][1]['pointer']);assert reject(lambda:v.compare(a,bytes(x)))
print(json.dumps(dict(in_extent_mutations_rejected=12,length_or_slice_mutations_rejected=4,wrong_pointer_rejected=True,outside_extent_positive=True)))
