# Current-parent handler controls

| Control | Buy bytes / aligned slots | Sell bytes / aligned slots | Sell callee multiset |
| --- | ---: | ---: | --- |
| baseline | 9016 / 297 | 8088 / 209 | False |
| root-sell-inline-current | 9016 / 297 | 16064 / 391 | False |
| root-buy-direct-current | 9488 / 294 | 8088 / 209 | False |
| root-sell-inline-price | 9016 / 297 | 16528 / 347 | True |
| root-buy-enum-price | 9120 / 254 | 8088 / 209 | False |
| root-sell-late-native | 9016 / 297 | 16600 / 559 | True |
| root-buy-late-native | 9176 / 302 | 8088 / 209 | False |
| root-sell-price-order | 9016 / 297 | 16624 / 567 | True |
| root-buy-price-order | 9200 / 330 | 8088 / 209 | False |

Original Buy: 9,736 bytes / 1,217 slots. Original Sell: 17,312 bytes / 2,164 slots. Alignment is diagnostic sequence overlap, not a function match.
