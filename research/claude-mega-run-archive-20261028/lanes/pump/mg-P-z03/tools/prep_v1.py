H = "    let current_size = curve.to_account_info().data_len();\n    let funding = fund_bonding_curve_rent(curve, system_program, payer, current_size.max(166));\n"
VARIANTS = {
 'a1': H + "    if funding.is_err() {\n        return funding;\n    }\n    if current_size < 166 {\n        curve.to_account_info().realloc(166, false)?;\n        return Ok(());\n    }\n    funding",
 'a2': H + "    if funding.is_err() {\n        return funding;\n    }\n    if current_size >= 166 {\n        return funding;\n    }\n    curve.to_account_info().realloc(166, false)?;\n    Ok(())",
 'a4': H + "    if funding.is_ok() {\n        if current_size < 166 {\n            curve.to_account_info().realloc(166, false)?;\n            return Ok(());\n        }\n        return funding;\n    }\n    funding",
 'a8': H + "    if let Err(e) = funding {\n        return Err(e);\n    }\n    if current_size >= 166 {\n        return funding;\n    }\n    curve.to_account_info().realloc(166, false)?;\n    Ok(())",
 'a9': H + "    if funding.is_ok() && current_size < 166 {\n        curve.to_account_info().realloc(166, false)?;\n        return Ok(());\n    }\n    funding",
}
