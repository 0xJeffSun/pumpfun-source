#[inline(always)] fn h1<'a>(ctx: Ctx<'a>) -> Result<(),E> { upd(ctx, OK::try_from(None)?) }
#[inline] fn h2<'a>(ctx: Ctx<'a>) -> Result<(),E> { upd(ctx, OK::try_from(None)?) }
#[inline(always)] fn h3<'a>(ctx: Ctx<'a>) -> Result<(),E> { return upd(ctx, OK::try_from(None)?); }
#[inline(always)] fn h4(bump:u8, x:&(&Info,&Info,&Info)) -> Result<(),E> { let signer:&[&[&[u8]]]=&[&[b"mint-authority",&[bump]]]; upd(ctx!(x,signer), OK::try_from(None)?) }
