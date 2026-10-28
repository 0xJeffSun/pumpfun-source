H0 = "    let current_size = curve.to_account_info().data_len();\n    let funding = fund_bonding_curve_rent(curve, system_program, payer, current_size.max(166));\n"
VARIANTS = {
 'n1': H0 + "    if funding.is_ok() {\n        if current_size < 166 {\n            curve.to_account_info().realloc(166, false)?;\n        }\n    }\n    funding",
 'n2': H0 + "    if let Ok(()) = funding {\n        if current_size < 166 {\n            curve.to_account_info().realloc(166, false)?;\n        }\n    }\n    funding",
 'n3': H0 + "    if funding.is_err() { return funding; }\n    if current_size < 166 {\n        curve.to_account_info().realloc(166, false)?;\n    }\n    funding",
 'n5': H0 + "    if funding.is_err() { return funding; }\n    if current_size >= 166 { return funding; }\n    curve.to_account_info().realloc(166, false)?;\n    funding",
 'n6': H0 + "    funding.and_then(|()| {\n        if current_size < 166 {\n            curve.to_account_info().realloc(166, false)?;\n        }\n        Ok(())\n    })",
}
