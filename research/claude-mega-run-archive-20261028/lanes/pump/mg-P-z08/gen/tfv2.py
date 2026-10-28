#!/usr/bin/env python3
"""tfv2.py <crate>: append selection-form variants of trade_fees as unused pub fns in pub mod tfv (lib.rs)."""
import sys
sys.argv = [sys.argv[0], sys.argv[1]]
A = 'global.creator_fee_configurable'; B = 'curve.creator_fee_bps > 0'; C = 'curve.creator_fee_bps'; D = 'fees.creator_fee_bps'
SELS = {
 's0': f"let mut creator_fee_bps = {D}; if {A} && {B} {{ creator_fee_bps = {C}; }}",
 's1': f"let creator_fee_bps = if {A} && {B} {{ {C} }} else {{ {D} }};",
 's2': f"let creator_fee_bps; if {A} && {B} {{ creator_fee_bps = {C}; }} else {{ creator_fee_bps = {D}; }}",
 's3': f"let configurable = {A} && {B}; let creator_fee_bps = if configurable {{ {C} }} else {{ {D} }};",
 's4': f"let configurable = {A} && {B}; let mut creator_fee_bps = {D}; if configurable {{ creator_fee_bps = {C}; }}",
 's5': f"let creator_fee_bps = match {A} && {B} {{ true => {C}, false => {D} }};",
 's6': f"let creator_fee_bps = if {A} {{ if {B} {{ {C} }} else {{ {D} }} }} else {{ {D} }};",
 's9': f"let creator_fee_bps = ({A} && {B}).then(|| {C}).unwrap_or({D});",
 's11': f"let creator_fee_bps = match ({A}, {C}) {{ (true, x) if x > 0 => x, _ => {D} }};",
 's13': f"let default_bps = {D}; let creator_fee_bps = if {A} && {B} {{ {C} }} else {{ default_bps }};",
 's14': f"let creator_fee_bps = fees.creator_fee_bps; let creator_fee_bps = if {A} && curve.creator_fee_bps != 0 {{ {C} }} else {{ creator_fee_bps }};",
 's16': f"let creator_fee_bps = if {A} && curve.creator_fee_bps != 0 {{ {C} }} else {{ {D} }};",
 's17': f"let (protocol_fee_bps, creator_fee_bps) = (fees.protocol_fee_bps, fees.creator_fee_bps); let creator_fee_bps = if {A} && curve.creator_fee_bps != 0 {{ {C} }} else {{ creator_fee_bps }}; let _ = protocol_fee_bps;",
 's12': f"let mut creator_fee_bps = {D}; if {A} {{ if {B} {{ creator_fee_bps = {C}; }} else {{ creator_fee_bps = {D}; }} }}",
}
V = {k: "\n    " + v + """
    let protocol_fee = fee(quote_amount, fees.protocol_fee_bps)?;
    let creator_fee = if curve.creator != Pubkey::default() { fee(quote_amount, creator_fee_bps)? } else { 0 };
    return Ok((protocol_fee, creator_fee, fees.protocol_fee_bps, creator_fee_bps));
""" for k, v in SELS.items()}
