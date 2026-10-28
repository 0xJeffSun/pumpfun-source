# setx.py NAME OUT.rs : named text transforms on gen/set_coin_creator.blk2.rs (line 63 require kept)
import sys
s=open('/Users/shawwalters/amm100-run/lanes/mg-A-res1/gen/set_coin_creator.blk2.rs').read(); n=sys.argv[1]
def rep(a,b,cnt=1):
    global s
    assert s.count(a)>=cnt, (n,a)
    s=s.replace(a,b,cnt)
if n=='y1':   # borrow the creator first
    rep('        let coin_creator = creators[0].address;\n','        let creator = &creators[0];\n        let coin_creator = creator.address;\n')
elif n=='y3': # arm order: None first
    a=s.index('        Some(creators) => {'); b=s.index('        None => {'); c=s.index('    }\n    Ok(())')
    some=s[a:b]; none=s[b:c]
    s=s[:a]+none+some+s[c:]
elif n=='y4': # match on place with ref binding
    rep('    match &ctx.accounts.metadata.creators {\n        Some(creators) => {','    match ctx.accounts.metadata.creators {\n        Some(ref creators) => {')
elif n=='y5': # Some arm: event block without base_mint rebind
    i=s.index('        Some(creators) => {'); j=s.index('        None => {')
    s=s[:i]+s[i:j].replace('            let base_mint = base_mint;\n','',1)+s[j:]
elif n=='y6': # None arm: event block without base_mint rebind
    j=s.index('        None => {')
    s=s[:j]+s[j:].replace('            let base_mint = base_mint;\n','',1)
elif n=='y7': # coin_creator taken from creators.first()
    rep('        let coin_creator = creators[0].address;\n','        let coin_creator = creators[0].address.clone();\n')
elif n in ('z1','z2','z4'):
    i=s.index('        Some(creators) => {'); j=s.index('        None => {'); k=s.index('    }\n    Ok(())')
    some=s[i:j]; none=s[j:k]
    if n in ('z1','z4'): some=some.replace('        emit_cpi!(event);\n    }\n','        emit_cpi!(event);\n        return Ok(());\n    }\n',1)
    if n in ('z2','z4'): none=none.replace('        emit_cpi!(event);\n    }\n','        emit_cpi!(event);\n        return Ok(());\n    }\n',1)
    s=s[:i]+some+none+s[k:]
elif n=='z3':
    i=s.index('        Some(creators) => {'); j=s.index('        None => {'); k=s.index('    }\n    Ok(())')
    some=s[i:j].replace('        emit_cpi!(event);\n    }\n','        emit_cpi!(event);\n        Ok(())\n    }\n',1)
    none=s[j:k].replace('        emit_cpi!(event);\n    }\n','        emit_cpi!(event);\n        Ok(())\n    }\n',1)
    s=s[:i]+some+none+s[k:].replace('    }\n    Ok(())\n}','    }\n}',1)
lines=s.split('\n'); assert lines[62].lstrip().startswith('require_keys_eq!'), lines[62]
open(sys.argv[2],'w').write(s)
