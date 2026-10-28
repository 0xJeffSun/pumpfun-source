SM='crate::utils::token::supported_mint'
Q='a.quote_mint.as_ref().as_ref()'
E='PumpAmmError::UnsupportedQuoteMint'
def q(block,at): return lambda l: put(l,215,block,at)
VARS=[
 ('Q0-id', lambda l: l),
 ('Q1-let-ifelse', q([f'    let quote_supported = if canonical {{', f'        {SM}({Q}, true)', '    } else {', f'        {SM}({Q}, false)', '    };', f'    require!(quote_supported, {E});'],5)),
 ('Q2-require-ifelse-1line', q([f'    require!(if canonical {{ {SM}({Q}, true) }} else {{ {SM}({Q}, false) }}, {E});'],0)),
 ('Q3-let-allow-ifelse', q([f'    let allow_extensions = if canonical {{ true }} else {{ false }};', f'    require!({SM}({Q}, allow_extensions), {E});'],1)),
 ('Q4-qref-ifelse', q(['    let quote_mint = a.quote_mint.as_ref();', f'    let quote_supported = if canonical {{', f'        {SM}(quote_mint.as_ref(), true)', '    } else {', f'        {SM}(quote_mint.as_ref(), false)', '    };', f'    require!(quote_supported, {E});'],6)),
 ('Q5-match', q([f'    let quote_supported = match canonical {{', f'        true => {SM}({Q}, true),', f'        false => {SM}({Q}, false),', '    };', f'    require!(quote_supported, {E});'],4)),
 ('Q6-notcanon', q([f'    let quote_supported = if !canonical {{', f'        {SM}({Q}, false)', '    } else {', f'        {SM}({Q}, true)', '    };', f'    require!(quote_supported, {E});'],5)),
 ('Q7-info-ifelse', q(['    let quote_mint: &AccountInfo = a.quote_mint.as_ref().as_ref();', f'    let quote_supported = if canonical {{', f'        {SM}(quote_mint, true)', '    } else {', f'        {SM}(quote_mint, false)', '    };', f'    require!(quote_supported, {E});'],6)),
 ('Q8-arg-ifelse', q([f'    require!({SM}({Q}, if canonical {{ true }} else {{ false }}), {E});'],0)),
 ('Qb-two-requires-1line', q([f'    if canonical {{ require!({SM}({Q}, true), {E}) }} else {{ require!({SM}({Q}, false), {E}) }}'],0)),
 ('Qc-let-allow-match', q([f'    let allow_extensions = match canonical {{ true => true, false => false }};', f'    require!({SM}({Q}, allow_extensions), {E});'],1)),
 ('Qd-ifelse-require-inside', q([f'    let quote_supported;', f'    if canonical {{', f'        quote_supported = {SM}({Q}, true);', '    } else {', f'        quote_supported = {SM}({Q}, false);', '    }', f'    require!(quote_supported, {E});'],6)),
]
