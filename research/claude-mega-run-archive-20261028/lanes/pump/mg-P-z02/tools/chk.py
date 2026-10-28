import sys,subprocess
L='/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/r5-z02'
W={'0x3a7b8':'set_creator::sync','0x38fc0':'set_creator::set$','0x3b8d8':'extend::execute','0x311f8':'distribution::get_distribution_amounts',
   '0x32840':'distribution::execute$','0x33c50':'distribution::(distribute_native|execute_native_distribution)','0x34558':'holder_distribution::execute','0x2fa60':'distribution::v2::'}
so=sys.argv[1] if sys.argv[1].endswith('.so') else f'{L}/variants/{sys.argv[1]}/work/last/unstripped.so'
only=sys.argv[2:] or list(W)
for w in only:
    out=subprocess.run(['python3',L+'/../../harness/win.py','show',w,'--cand',so,'--sym',W[w]],capture_output=True,text=True).stdout.split('\n')
    cands=[l for l in out if l.strip().startswith('cand')]
    nd=sum(1 for l in out if l.startswith('- ') or l.startswith('+ '))
    print(w, (cands[0].strip() if cands else 'NO CAND')[:110], 'difflines',nd)
