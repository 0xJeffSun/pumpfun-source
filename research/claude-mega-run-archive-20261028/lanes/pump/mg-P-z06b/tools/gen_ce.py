import sys, os, subprocess
L='/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z06b'
REL='src/quote_control/state.rs'
base=open(f'{L}/src/{REL}').read().split('\n')
assert base[144].strip().startswith('require!(data.len() >= 108') and base[157].strip().startswith('let entries = data.get(108..end)')
H145='    let header = data.get(..108).ok_or_else(|| error!(PumpError::InvalidQuoteControl))?;'
H146='    require!(header[..8] == *QuoteControl::DISCRIMINATOR, PumpError::InvalidQuoteControl);'
CNT=base[146]
PADC='// layout-pad(10): aligns the next Source site with the original line'
V={}
# c: single statement on 158
V['ce_c']=[H145,H146,CNT,PADC]+['']*9+['    let entries = QuoteControl::space(count).and_then(|end| data.get(108..end).ok_or_else(|| error!(PumpError::InvalidQuoteControl)))?;']
# b: match form, Ok arm on 158
V['ce_b']=[H145,H146,CNT,'// layout-pad(9): aligns the next Source site with the original line']+['']*8+['    let entries = match QuoteControl::space(count) {',
  '        Ok(end) => data.get(108..end).ok_or_else(|| error!(PumpError::InvalidQuoteControl)),','        Err(error) => Err(error),','    }?;']
# a: chain split: space on 157, and_then on 158
V['ce_a']=[H145,H146,CNT,'// layout-pad(9): aligns the next Source site with the original line']+['']*8+['    let entries = QuoteControl::space(count)',
  '        .and_then(|end| data.get(108..end).ok_or_else(|| error!(PumpError::InvalidQuoteControl)))?;']
for name in sys.argv[1:]:
    new=V[name]
    # replace lines 145..158 (idx 144..157) -> must keep 158 as the error! line; extra lines after 158 must be balanced
    out=base[:144]+new+base[158:]
    # balance: count of lines between must equal original count (14) up to the 158 line, extra lines after must be removed from following pad (none here)
    idx=[i for i,l in enumerate(out) if 'error!(PumpError::InvalidQuoteControl)' in l and ('108..end' in l)][0]
    print(name,'158-line ->',idx+1,'total delta',len(out)-len(base))
    d=f'{L}/var/{name}'
    subprocess.run(['rm','-rf',d]); subprocess.run(['cp','-c','-R',f'{L}/src',d],check=True)
    open(f'{d}/{REL}','w').write('\n'.join(out))
