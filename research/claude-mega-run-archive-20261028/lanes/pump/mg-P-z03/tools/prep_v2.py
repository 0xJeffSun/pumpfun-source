H = "    let current_size = curve.to_account_info().data_len();\n    let funding = fund_bonding_curve_rent(curve, system_program, payer, current_size.max(166));\n    if funding.is_err() {\n        return funding;\n    }\n    if current_size >= 166 {\n        return funding;\n    }\n"
VARIANTS = {
 'b1': H + "    let info = curve.to_account_info();\n    info.realloc(166, false)?;\n    Ok(())",
 'b2': H + "    curve.to_account_info().realloc(166, false).map_err(Into::into)",
 'b4': H + "    if let Err(e) = curve.to_account_info().realloc(166, false) {\n        return Err(e.into());\n    }\n    Ok(())",
 'b5': H + "    curve.to_account_info().realloc(166, false).map_err(|e| e.into())",
 'b6': H + "    Ok(curve.to_account_info().realloc(166, false)?)",
 'b8': H + "    match curve.to_account_info().realloc(166, false) {\n        Ok(()) => Ok(()),\n        Err(e) => Err(e.into()),\n    }",
 'b9': H + "    let info = curve.to_account_info();\n    info.realloc(166, false).map_err(Into::into)",
 'c1': "    let current_size = curve.to_account_info().data_len();\n    let funding = fund_bonding_curve_rent(curve, system_program, payer, current_size.max(166));\n    if funding.is_err() {\n        return funding;\n    }\n    if current_size < 166 {\n        curve.to_account_info().realloc(166, false)?;\n    } else {\n        return funding;\n    }\n    Ok(())",
}
