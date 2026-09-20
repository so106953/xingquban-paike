# Design QA — 周末探险队

final result: passed

## Course manager extension

- Added arbitrary courses with editable total lessons, prior-used lessons, weekday, start date, start time and end time.
- Added automatic illustration matching for 21 categories, a manual illustration selector, and local custom image upload up to 1 MB.
- Added archive, restore and guarded permanent deletion for courses.
- Browser-verified a 24-lesson Wednesday course at 16:00–17:30: prior-used 3, remaining 21, correct automatic illustration. The test course was removed afterward.
- Verified mobile add-course form at 390 × 844 and existing responsive course list without horizontal overflow.

Selected source: exec-f8c26b29-f839-4716-bc6f-22040d781ff1.png (second displayed child-friendly concept).
Implementation: http://127.0.0.1:4173/
Evidence: desktop-qa.png, mobile-qa.png, comparison.png.

## Comparison

Desktop viewport 1488 × 1058; reference 1487 × 1058. The IAB screenshot export places the rendered surface at approximately 80% scale inside its output canvas. The comparison removes the blank export margin and normalizes that surface to the reference dimensions; this is an export artifact rather than page overflow. Mobile viewport 390 × 844, DOM scroll width 375, no horizontal overflow.

## Fixes verified

- Enlarged basketball/book artwork and desktop action groups after first comparison.
- Adjusted desktop heading and vertical rhythm to the chosen composition.
- Fixed mobile heading's isolated final character by explicitly grouping the second phrase.
- Preserved readable mobile course panels, complete controls, and unclipped form fields.

## Fidelity surfaces

- Typography: locally hosted ZCOOL KuaiLe display font, Microsoft YaHei body text. Real selectable headings and course data. The generated hand-lettering is approximated by a licensed font rather than rasterized UI text.
- Layout: explorer at upper right, two weekend rows below hero, summary above rows, landscape footer. Small screens use stacked panels to keep controls reachable.
- Color: sky blue, navy, pale yellow weekday markers, coral leave buttons, powder-blue settings buttons.
- Assets: separately generated cloud/landscape background, transparent basketball and English books; no placeholder art. Standard controls use Phosphor icons. Images load successfully.
- Content: schedule, totals, next dates and actions retained; data is calculated, not embedded in imagery. Extra setup help explains the start-date assumption.

## Remaining P3 refinements

The concept's decorative mountain logo, yellow hand-drawn underline and dotted route are omitted. Font glyphs and illustration details differ slightly from generated concept lettering/art. These decorative differences do not affect usability or the selected scene and layout.

## Interaction checks

In-app browser: settings open and save; leave and cancel leave toggle correctly; English history displays the September 20 lesson; reload preserves data. No captured browser console errors. All visible image resources loaded. Ten schedule assertions passed. QA leave changes were reversed.

The preview is local only. No public deployment, cloud synchronization or mobile WeChat verification is claimed.
