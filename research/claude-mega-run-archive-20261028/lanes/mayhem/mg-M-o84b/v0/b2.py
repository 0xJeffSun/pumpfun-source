import sys; sys.path.insert(0,'/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/r436/o0084-brute-r1/tools')
import tx
VARIANTS=[('base-copy',tx.H,None)]+[('cpi-'+k,tx.cpi(tx.H,k),None) for k in tx.CPI_FORMS if k!='x02']
