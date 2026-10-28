import runpy
B = runpy.run_path('/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z08b/gen/cv2.py')
REQ, INIT, META, MINT, SETA, EMIT, SL, SI, BLD, CALL = [B[k] for k in ('REQ', 'INIT', 'META', 'MINT', 'SETA', 'EMIT', 'SL', 'SI', 'BLD', 'CALL')]
A = "let a=&ctx.accounts;"
S3 = lambda seed: META(seed, NM) + MINT(seed) + SETA(seed)
def V(clones, nm, seeds='let'):
    global NM; NM = nm
    if seeds == 'let': return (REQ + INIT + A + clones + SL + S3('&[seeds]') + CALL + EMIT, BLD())
    return (REQ + INIT + A + clones + "let bump=ctx.bumps.mint_authority;" + S3(SI) + CALL + EMIT, BLD())
T1 = "let (name_c,symbol_c,uri_c)=(name.clone(),symbol.clone(),uri.clone());"
T2 = "let c=(name.clone(),symbol.clone(),uri.clone());"
T3 = "let [name_c,symbol_c,uri_c]=[name.clone(),symbol.clone(),uri.clone()];"
VARIANTS = {
 't1': V(T1, ('name_c', 'symbol_c', 'uri_c')),
 't2': V(T2, ('c.0', 'c.1', 'c.2')),
 't3': V(T3, ('name_c', 'symbol_c', 'uri_c')),
 't1i': V(T1, ('name_c', 'symbol_c', 'uri_c'), 'inl'),
 't2i': V(T2, ('c.0', 'c.1', 'c.2'), 'inl'),
 't3i': V(T3, ('name_c', 'symbol_c', 'uri_c'), 'inl'),
}
