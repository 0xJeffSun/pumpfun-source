import sys; sys.path.insert(0,'/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/r436/o0084-brute-r1/tools')
import t4
H=t4.H; BASEROOT=t4.BASEROOT
N=t4.NAMES; QF=N[6:]+N[:6]
MS=['capfirst-match','m-val','m-boolbound','m-falsefirst','m-sel','m-inlinemax','m-maxfirst','m-guard','m-val-sel','m-gt0']
APPEND=[('state.rs',t4.helpers(MS))]
V=[('h4-copy',H)]
for m in MS: V.append(('cap-'+m,t4.cap(H,m)))
M=t4.cap(H,'capfirst-match')
for k in ['letelse','allmatch','h4-lowmatch','h4-pricematch']: V.append(('match+price-'+k,t4.price(M,k)))
V.append(('match+lowmatch+quotefirst',t4.arms(t4.price(M,'h4-lowmatch'),QF)))
V.append(('match+letelse+quotefirst',t4.arms(t4.price(M,'letelse'),QF)))
V.append(('match+allmatch+quotefirst',t4.arms(t4.price(M,'allmatch'),QF)))
VARIANTS=[(l,t,None) for l,t in V]
