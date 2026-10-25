"""Retain exact existing reconstruction require! statements and relative order."""
from pathlib import Path
import hashlib
P=Path(__file__).resolve().parent
def macros(s):
 rows=[];pos=0
 while True:
  a=s.find('require!(',pos)
  if a<0:break
  n=1;b=a+len('require!(')
  while n:
   assert b<len(s)
   if s[b]=='(':n+=1
   elif s[b]==')':n-=1
   b+=1
  text=s[a:b];pos=b
  if 'ReconstructionError::'in text:rows.append({'statement':text,'line':s.count('\n',0,a)+1,'sha256':hashlib.sha256(text.encode()).hexdigest()})
 return rows
def run():
 rows=[]
 for f in sorted((P/'inputs/source/programs/pump/src').glob('*.rs')):
  n='programs/pump/src/'+f.name;b=f.read_text();q=P/'proposal/source'/n;a=q.read_text()if q.exists()else b
  old,new=macros(b),macros(a);assert [x['statement']for x in old]==[x['statement']for x in new],n
  if old:rows.append({'file':n,'before':old,'after':new,'same_statements_and_order':True})
 route=(P/'proposal/source/programs/pump/src/multi_hop_curve.rs').read_text();a=route.index("fn prepare_curve<'info>");z=route.index('fn move_lamports(',a);body=route[a:z]
 assert body.index('require!(info.data_len() >= 166')<body.index('crate::trade_types::prepare_bonding_curve(')
 trade=(P/'proposal/source/programs/pump/src/trade.rs').read_text()
 for name in ['sell','buy','buy_exact_quote']:
  a=trade.index('pub fn '+name+'(');p=trade.index('prepare_bonding_curve(',a);q=trade.index('check_quote(a)?',a);assert p<q
 return {'files':rows,'route_short_fence_before_preparation':True,'v3_preparation_before_quote_mode_work':True,'scope':'Existing explicit reconstruction require! conditions only; decoder implicit length admission deliberately changes.'}
