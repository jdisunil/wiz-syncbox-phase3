# wiz-syncbox-phase3
# WiZ Sync Box — Phase 3 (11-light simulation)

## Scope
- iPhone Safari rear camera captures Sony TV image; 8 zone sampling with optional four-corner calibration.
- Configurable smoothing, interval, brightness and **11 individually mapped living-room light placeholders**.
- Live HEX colours, per-light simulated colour display, enable/disable, persistent mapping, JSON export.
- All processing runs locally in the browser; no external dependencies, backend, WiZ API, or actual light control.

## Deploy
Upload **index.html**, **styles.css**, and the entire **js/** directory to the root of your existing GitHub Pages `wiz-syncbox` repository. Do not upload only index.html; the JavaScript imports require the other files. `tests/`, `package.json`, and `README.md` are optional for GitHub Pages.

On iPhone Safari, refresh the GitHub Pages URL, verify **Phase 3**, select **Run colour demo**, then **Start camera**. Recalibrate TV corners if the phone position changes. Choose a zone for each of the 11 light placeholders. Tap **Export commands (JSON)** to inspect the simulated transport payload.

## Architecture
- `config.js`: zone layout, 11-light defaults and settings
- `colors.js`: pure image sampling, smoothing, brightness and colour conversion
- `lights.js`: mapping validation, command generation and transport abstraction
- `storage.js`: versioned browser preferences and calibration
- `app.js`: camera lifecycle, UI and simulator orchestration
- `styles.css`: responsive iPhone UI

## Tests
With Node.js installed: `npm test` (or `node tests/test.mjs`).

## Limitations and next phase
This phase **does not control physical WiZ bulbs**. Safari lacks raw UDP sockets for the local WiZ protocol. A future native iOS implementation can use AVFoundation + Network framework with local network permission, mapping real bulb identifiers/IPs to the existing light model. App distribution/signing and device compatibility must be validated before claiming an iPhone-only deployable solution. This simulator deliberately makes no WiZ network requests.
