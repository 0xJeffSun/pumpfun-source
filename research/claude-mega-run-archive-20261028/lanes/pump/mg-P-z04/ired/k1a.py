import os
def edit(b):
    lines=b.split('\n')
    tgt=os.environ['MV']; after=os.environ['AFTER']
    i=next(k for k,l in enumerate(lines) if l.startswith(f'  {tgt} = alloca'))
    ln=lines.pop(i)
    j=next(k for k,l in enumerate(lines) if l.startswith(f'  {after} = alloca') or (after=='start:' and l=='start:'))
    lines.insert(j+1,ln)
    return '\n'.join(lines)
