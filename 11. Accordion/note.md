Accordion ARIA – Tiny Notes

Use aria-expanded on the accordion header to announce open / closed state

The header must be focusable (button OR role="button" + tabIndex={0})

Use aria-controls on the header to reference the panel id

The panel must have a stable id

Decorative icons should have aria-hidden="true"

If header is not a <button>, keyboard support is mandatory (Enter + Space)

ARIA does not add behavior — it only describes it

Prefer <button> for headers to avoid extra ARIA + key handling

aria-expanded should always reflect actual UI state

Never use ARIA on non-interactive, non-focusable elements