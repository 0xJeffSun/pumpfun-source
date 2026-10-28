H = "    let current_size = curve.to_account_info().data_len();\n"
R = "        curve.to_account_info().realloc(166, false)?;\n"
VARIANTS = {
 'A': H + "    fund_bonding_curve_rent(curve, system_program, payer, current_size.max(166))?;\n    if current_size < 166 {\n" + R + "    }\n    Ok(())",
 'B': H + "    let needs_realloc = current_size < 166;\n    fund_bonding_curve_rent(curve, system_program, payer, current_size.max(166))?;\n    if needs_realloc {\n" + R + "    }\n    Ok(())",
 'C': H + "    fund_bonding_curve_rent(curve, system_program, payer, current_size.max(166))?;\n    if current_size.lt(&166) {\n" + R + "    }\n    Ok(())",
 'D': H + "    let funding = fund_bonding_curve_rent(curve, system_program, payer, current_size.max(166));\n    if funding.is_err() {\n        return funding;\n    }\n    funding?;\n    if current_size < 166 {\n" + R + "    }\n    Ok(())",
 'E': H + "    let funding = fund_bonding_curve_rent(curve, system_program, payer, current_size.max(166));\n    funding?;\n    if current_size < 166 {\n" + R + "    }\n    Ok(())",
 'F': H + "    match fund_bonding_curve_rent(curve, system_program, payer, current_size.max(166)) {\n        Ok(()) => {}\n        Err(e) => return Err(e),\n    }\n    if current_size < 166 {\n" + R + "    }\n    Ok(())",
 'H': H + "    fund_bonding_curve_rent(curve, system_program, payer, current_size.max(166))?;\n    if current_size >= 166 {\n        return Ok(());\n    }\n    curve.to_account_info().realloc(166, false)?;\n    Ok(())",
 'J': H + "    let funding = fund_bonding_curve_rent(curve, system_program, payer, current_size.max(166));\n    if funding.is_err() {\n        return funding;\n    }\n    if current_size >= 166 {\n        return funding;\n    }\n    funding?;\n    curve.to_account_info().realloc(166, false)?;\n    Ok(())",
 'K': H + "    let new_size = current_size.max(166);\n    fund_bonding_curve_rent(curve, system_program, payer, new_size)?;\n    if current_size < new_size {\n        curve.to_account_info().realloc(new_size, false)?;\n    }\n    Ok(())",
 'M': H + "    if let Err(e) = fund_bonding_curve_rent(curve, system_program, payer, current_size.max(166)) {\n        return Err(e);\n    }\n    if current_size < 166 {\n" + R + "    }\n    Ok(())",
 'O': H + "    fund_bonding_curve_rent(curve, system_program, payer, current_size.max(166))?;\n    if current_size < 166 {\n        let info = curve.to_account_info();\n        info.realloc(166, false)?;\n    }\n    Ok(())",
 'P': H + "    let needs_realloc = current_size < 166;\n    let new_size = current_size.max(166);\n    fund_bonding_curve_rent(curve, system_program, payer, new_size)?;\n    if needs_realloc {\n" + R + "    }\n    Ok(())",
}
