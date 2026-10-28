H = "    let current_size = curve.to_account_info().data_len();\n    let funding = fund_bonding_curve_rent(curve, system_program, payer, current_size.max(166));\n    if funding.is_err() {\n        return funding;\n    }\n    if current_size >= 166 {\n        return funding;\n    }\n"
VARIANTS = {
 'e1': H + "    curve.to_account_info().realloc(166, false).map_err(Error::from)?;\n    Ok(())",
 'e3': H + "    curve.to_account_info().realloc(166, false).map_err(|e| Error::from(e))?;\n    Ok(())",
 'e7': H + "    curve.to_account_info().realloc(166, false)?;\n    return Ok(());",
 'e8': H.replace(">= 166", "> 165") + "    curve.to_account_info().realloc(166, false)?;\n    Ok(())",
 'e9': H.replace("funding.is_err()", "let Err(_) = funding") + "    curve.to_account_info().realloc(166, false)?;\n    Ok(())",
 'e10': H + "    let () = curve.to_account_info().realloc(166, false)?;\n    Ok(())",
 'e11': H + "    curve.to_account_info().realloc(166, false).map_err(Into::<Error>::into)?;\n    Ok(())",
 'e12': H.replace("    if current_size >= 166 {\n        return funding;\n    }\n", "    if current_size >= 166 {\n        funding\n    } else {\n        curve.to_account_info().realloc(166, false)?;\n        Ok(())\n    }"),
}
