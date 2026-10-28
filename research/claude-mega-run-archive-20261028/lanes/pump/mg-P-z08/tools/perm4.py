import itertools, subprocess, sys, re
L='/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z08'
src=open(f'{L}/ir/sp.x.ll').read()
names=['initial_virtual_token_reserves','initial_virtual_sol_reserves','initial_real_token_reserves','token_total_supply']
offs=[1104,1112,1120,1128]
pairs=[]
for i,(n,o) in enumerate(zip(names,offs)):
    v=['%18','%19','%20','%21'][i]
    pairs.append(f"  {v} = getelementptr inbounds i8, ptr %_159, i64 {o}\n  store i64 %{n}, ptr {v}, align 8\n")
blob=''.join(pairs); assert blob in src
for p in itertools.permutations(range(4)):
    nb=''.join(f"  %{18+k} = getelementptr inbounds i8, ptr %_159, i64 {offs[i]}\n  store i64 %{names[i]}, ptr %{18+k}, align 8\n" for k,i in enumerate(p))
    t=src.replace(blob,nb)
    tag='perm'+''.join(map(str,p)); open(f'{L}/llx/{tag}.ll','w').write(t)
    r=subprocess.run([f'{L}/tools/llt.sh',f'{L}/llx/{tag}.ll',tag,'0x1367c0','pump_recovered14pump_recovered10set_params17'],capture_output=True,text=True)
    print(tag,r.stdout.strip().split(': ',1)[-1])
