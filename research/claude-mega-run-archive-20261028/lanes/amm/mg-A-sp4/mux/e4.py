FNS=['execute','account_size']
H='fn account_size(account: &AccountInfo) -> Result<usize> {'
V=[
 ('b0',[]),
 ('b1',[(H,'#[inline(always)]\n'+H)]),
 ('b2',[(H,'fn account_size(account: &AccountInfo<\'_>) -> Result<usize> {'),('    let new_size = account_size(account)?;','    let new_size = account_size(&ctx.accounts.account)?;')]),
 ('b3',[('    let data = account.try_borrow_data()?;\n    let discriminator = &data[..8];\n    let size = match discriminator {','    let data = account.try_borrow_data()?;\n    let size = match &data[..8] {')]),
 ('b5',[(H,'fn account_size(account: AccountInfo) -> Result<usize> {'),('    let new_size = account_size(account)?;','    let new_size = account_size(account.clone())?;')]),
]
