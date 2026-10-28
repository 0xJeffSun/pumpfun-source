# Local shell viewport review

These screenshots were rendered from commit inputs with the Next.js production server on `127.0.0.1:3000`. They document the local implementation; they are not upstream screenshots and do not establish pixel parity.

| State | SHA-256 | Result |
| --- | --- | --- |
| `desktop-1440x900.png` | `1148294061d2a19d038e4e5b9037e85cdf388c7cc33697c3f21e570114085ca1` | Expanded 13rem navigation, search and local status visible; no horizontal overflow. |
| `laptop-1280x800.png` | `42c093a2a73311cd423179eff476fabbf95969d1539bfc049a365212069b861f` | Expanded navigation and content remain readable; no horizontal overflow. |
| `tablet-768x1024.png` | `5c6de3d19fb63451f3574960bfa1fad2c025c72bb94258c67079021b5814e977` | 3.5rem icon rail preserves all destinations and active state; no horizontal overflow. |
| `mobile-390x844.png` | `b8aa14f197f5e7e8b872f60989876547cffc14889da5ba8385e47856625034e0` | Compact brand/header, full-width search and closed off-canvas navigation; no horizontal overflow. |
| `small-mobile-375x667.png` | `3cb99bdfed2f822bec0cf845e65c750b87286eb4e14097bed91ec4af42ba0e2e` | Search and content remain usable at the smallest requested viewport; no horizontal overflow. |

## Static reference comparison

- Geometry follows the recovered `13rem` desktop sidebar, `3.5rem` collapsed rail, `18rem` mobile drawer and sub-768px mobile boundary.
- Typography uses the retained Geist declarations. Colors, borders and focus accents use the retained neutral/zinc/green token values.
- Navigation hierarchy follows the recovered primary and Discover groups. Search placement follows the captured sticky top bar and 420px maximum width.
- The local mobile header, simple SVG icons, direct URL search form and unavailable product states are disclosed local design choices in `SHELL-EVIDENCE.md`.

No equivalent authenticated reference screenshots were retained at these exact viewports and states. Captured HTML/CSS and recovered inert factories are therefore the comparison source; exact spacing, icon artwork, feature-flag-dependent rows, account controls and animation timing remain visually unqualified.
