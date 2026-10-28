M0=""" let minimum = Rent::get()?.minimum_balance(165)
     .checked_add(deficit).ok_or(error!(PumpAmmError::Overflow))?;"""
V=[
 ('m0',[]),
 ('m1',[(M0," let min_balance = Rent::get()?.minimum_balance(165);\n let minimum = min_balance.checked_add(deficit).ok_or(error!(PumpAmmError::Overflow))?;")]),
 ('m2',[(M0," let minimum = deficit.checked_add(Rent::get()?.minimum_balance(165)).ok_or(error!(PumpAmmError::Overflow))?;")]),
 ('m3',[(M0," let minimum = Rent::get()?.minimum_balance(165).checked_add(deficit).ok_or(error!(PumpAmmError::Overflow));\n let minimum = minimum?;")]),
 ('m4',[(M0," let rent = Rent::get()?;\n let minimum = rent.minimum_balance(165).checked_add(deficit).ok_or(error!(PumpAmmError::Overflow))?;")]),
 ('m5',[(M0," let minimum = Rent::get().map(|r| r.minimum_balance(165))?.checked_add(deficit).ok_or(error!(PumpAmmError::Overflow))?;")]),
 ('m6',[(M0," let minimum = u64::checked_add(Rent::get()?.minimum_balance(165), deficit).ok_or(error!(PumpAmmError::Overflow))?;")]),
]
