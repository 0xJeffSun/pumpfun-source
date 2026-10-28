H0 = "    let current_size = curve.to_account_info().data_len();\n"
F = "    let funding = fund_bonding_curve_rent(curve, system_program, payer, current_size.max(166));\n"
VARIANTS = {
 'k1': H0 + F + "    match funding {\n        Err(_) => return funding,\n        Ok(()) if current_size >= 166 => return funding,\n        Ok(()) => {}\n    }\n    curve.to_account_info().realloc(166, false)?;\n    Ok(())",
 'k2': H0 + F + "    if funding.is_err() {\n        funding\n    } else if current_size >= 166 {\n        funding\n    } else {\n        curve.to_account_info().realloc(166, false)?;\n        Ok(())\n    }",
 'k3': H0 + "    let new_size = current_size.max(166);\n    let funding = fund_bonding_curve_rent(curve, system_program, payer, new_size);\n    if funding.is_err() { return funding; }\n    if current_size >= new_size { return funding; }\n    curve.to_account_info().realloc(new_size, false)?;\n    Ok(())",
 'k4': H0 + F + "    if funding.is_err() { return funding; }\n    if current_size >= 166 { return funding; }\n    curve.to_account_info().realloc(166, false)?;\n    funding.map(|_| ())",
 'k5': H0 + F + "    if funding.is_err() { return funding; }\n    if current_size > 165 { return funding; }\n    let () = curve.to_account_info().realloc(166, false)?;\n    Ok(())",
 'k6': H0 + "    let new_size = current_size.max(166);\n    let funding = fund_bonding_curve_rent(curve, system_program, payer, new_size);\n    if funding.is_err() { return funding; }\n    if current_size >= 166 { return funding; }\n    curve.to_account_info().realloc(new_size, false)?;\n    Ok(())",
}
