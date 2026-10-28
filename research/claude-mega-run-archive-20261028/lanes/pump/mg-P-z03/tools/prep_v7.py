P = "    let current_size = curve.to_account_info().data_len();\n    let funding = fund_bonding_curve_rent(curve, system_program, payer, current_size.max(166));\n    if funding.is_err() { return funding; }\n    if current_size >= 166 { return funding; }\n"
VARIANTS = {
 'o1': P + "    curve.to_account_info().realloc(166, false).map_err(anchor_lang::error::Error::from).and(funding)",
 'o2': P + "    curve.to_account_info().realloc(166, false)?;\n    return funding;",
 'o3': P + "    match curve.to_account_info().realloc(166, false) {\n        Ok(()) => funding,\n        Err(e) => Err(e.into()),\n    }",
 'o4': P + "    curve.to_account_info().realloc(166, false).map_err(Into::into).and(funding)",
 'o5': P + "    let () = curve.to_account_info().realloc(166, false)?;\n    funding",
 'o6': P.replace("if current_size >= 166 { return funding; }\n", "if current_size >= 166 { return funding; }\n    let _ = &funding;\n") + "    curve.to_account_info().realloc(166, false)?;\n    funding",
}
