from build_composition import *
record=json.loads((W/'composed/launch.json').read_bytes());H=W/'historical-source'
for label in ['composed-linked','repeat-linked']:
 cmd=list(record['command']);cmd[cmd.index('--out-dir')+1]=str(W/label);cmd+=['-L','dependency='+str(W)]
 d=run(label,cmd,H,record['environment'],{k:v for k,v in record.items()if k not in ['command','cwd','environment']})
 assert inv(H)==record['source_inputs'] and all(sha(Path(p))==v for p,v in record['dependency_inputs'].items())
 shutil.copyfile(d/'mayhem_recovered.so',d/'symbols.so');subprocess.run([str(SDK/'llvm/bin/llvm-objcopy'),'--strip-all',str(d/'symbols.so'),str(d/'candidate.so')],check=True)
for label in ['baseline','composed-linked','repeat-linked']:
 d=W/label;write(d/'artifacts.json',dict(source_unchanged=inv(W/'source'if label=='baseline'else H)==json.loads((d/'launch.json').read_bytes())['source_inputs'],checked_tools_unchanged=all(sha(SDK/n)==v for n,v in record['tools'].items()),**{n+'_sha256':sha(d/(n+'.so'))for n in ['candidate','symbols']}))
assert (W/'composed-linked/symbols.so').read_bytes()==(W/'repeat-linked/symbols.so').read_bytes()
assert (W/'composed-linked/candidate.so').read_bytes()==(W/'repeat-linked/candidate.so').read_bytes()
print('complete: baseline, composed-linked, repeat-linked',flush=True)
