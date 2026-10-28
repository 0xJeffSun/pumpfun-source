H = "    let current_size = curve.to_account_info().data_len();\n    let funding = fund_bonding_curve_rent(curve, system_program, payer, current_size.max(166));\n    if funding.is_err() {\n        return funding;\n    }\n    if current_size >= 166 {\n        return funding;\n    }\n"
G = "    #[inline(always)]\n    fn grow(curve: &Account<'_, BondingCurve>) -> Result<()> {\n        curve.to_account_info().realloc(166, false)?;\n        Ok(())\n    }\n"
VARIANTS = {
 'f1': H + "    curve.to_account_info().realloc(166, false)?;\n    funding",
 'h1': G + H + "    grow(curve)?;\n    Ok(())",
 'h2': G + H + "    grow(curve)",
 'h3': H + "    let grow = || -> Result<()> {\n        curve.to_account_info().realloc(166, false)?;\n        Ok(())\n    };\n    grow()",
 'g1': H + "    match curve.to_account_info().realloc(166, false) {\n        Ok(()) => {}\n        Err(e) => return Err(e.into()),\n    }\n    Ok(())",
 'g2': H + "    match curve.to_account_info().realloc(166, false) {\n        Ok(()) => Ok(()),\n        Err(e) => return Err(Error::from(e)),\n    }",
 'h4': G.replace("#[inline(always)]", "#[inline]") + H + "    grow(curve)",
 'h5': G + H + "    return grow(curve);",
}
