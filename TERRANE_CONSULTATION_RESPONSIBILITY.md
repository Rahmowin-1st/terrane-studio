# TERRANE V2 — CONSULTATION RESPONSIBILITY

Status: END-TO-END AUTHORITY for the highest-intent section.

## Purpose
Consultation is not a generic footer form. It is the final architectural scene, the primary conversion surface, the client-trust boundary, and the frontend client for the accepted inquiry backend.

## Responsibilities
### Visual responsibility
- Must be one of the strongest compositions on the page.
- The final scene becomes quieter, darker and more focused.
- Large editorial statement + luminous form plane + subtle architectural line/grid detail.
- Strong separation from normal content sections without looking like SaaS.

### Interaction responsibility
- Clear idle, focused, validating, submitting, success, failure and offline states.
- Disable accidental duplicate submit while pending.
- Preserve user-entered content on failed/offline attempts.
- Validation feedback stays near the relevant field.
- No distracting animation while the user types.

### Backend responsibility
Preserve the existing accepted contract:
- `POST /api/consultation`
- client-generated idempotent request ID
- server validation is authoritative
- database persistence occurs before notification outcome
- success UI requires HTTP success and `payload.ok === true`
- no localStorage as lead authority
- no public inquiry read path
- rate limiting/honeypot/idempotency remain intact

### Truth responsibility
- Never imply the owner received email unless delivery is actually configured/verified.
- The visible brand email may be brand correspondence copy; it is not proof of delivery.
- Failure must never look visually similar to success.

### Accessibility responsibility
- Real labels remain associated with inputs.
- Keyboard path and visible focus are mandatory.
- Errors must be readable and `aria-invalid` must remain truthful.
- Submission state is announced via an appropriate status region.
- Reduced-motion path must be fully usable.

### Motion responsibility
Consultation is explicitly included in `TERRANE_MOTION_GUIDANCE.md`.
- Section copy and form converge from opposite axes on desktop.
- Fields sequence in with restrained timing.
- Focus treatment is micro-motion only.
- Submit state becomes a stable progress plane, not a layout jump.
- Success resolves calmly after server persistence.
- Error/offline state returns control without losing data.
- Mobile uses a shorter vertical sequence with no long pinned choreography.

## Acceptance gates
- FORM_VISUAL_QUALITY = PASS
- FORM_ACCESSIBILITY = PASS
- IDLE_STATE = PASS
- VALIDATION_STATE = PASS
- SUBMITTING_STATE = PASS
- SUCCESS_TRUTH = PASS
- FAILURE_PRESERVES_INPUT = PASS
- OFFLINE_PRESERVES_INPUT = PASS
- DOUBLE_SUBMIT_BLOCKED = PASS
- BACKEND_CONTRACT_UNCHANGED = PASS
- MOBILE_320_390 = PASS
- REDUCED_MOTION = PASS

This section is not complete merely because a POST request succeeds. It is complete only when design, motion, accessibility, backend truth and recovery behavior work together.