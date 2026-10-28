"use client";

import { type ChangeEvent, type FormEvent, useRef, useState } from "react";
import {
  CREATE_LIMITS,
  type DraftErrors,
  type DraftValues,
  validateDraftField,
} from "./create-coin-validation";

const EMPTY_DRAFT: DraftValues = {
  name: "",
  ticker: "",
  description: "",
  website: "",
  twitter: "",
  telegram: "",
};

const TEXT_FIELDS = [
  {
    name: "name",
    label: "Coin name",
    placeholder: "Name your coin",
    required: true,
    maxLength: CREATE_LIMITS.name,
  },
  {
    name: "ticker",
    label: "Ticker",
    placeholder: "Add a coin ticker (e.g. DOGE)",
    required: true,
    maxLength: CREATE_LIMITS.ticker,
  },
] as const;

const SOCIAL_FIELDS = [
  {
    name: "website",
    label: "Website",
    placeholder: "https://example.com",
    hint: "Optional HTTPS website.",
  },
  {
    name: "twitter",
    label: "X / Twitter",
    placeholder: "https://x.com/username",
    hint: "Optional x.com or twitter.com profile.",
  },
  {
    name: "telegram",
    label: "Telegram",
    placeholder: "https://t.me/channel",
    hint: "Optional t.me or telegram.me link.",
  },
] as const;

function FieldError({ field, error }: { field: string; error?: string }) {
  if (!error) return null;
  return (
    <p className="create-field-error" id={`${field}-error`}>
      {error}
    </p>
  );
}

function validPreviewLink(
  field: "website" | "twitter" | "telegram",
  value: string,
) {
  return value && !validateDraftField(field, value) ? value.trim() : null;
}

export default function CreateCoinForm() {
  const [draft, setDraft] = useState<DraftValues>(EMPTY_DRAFT);
  const [errors, setErrors] = useState<DraftErrors>({});
  const [status, setStatus] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  function updateField(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const field = event.target.name as keyof DraftValues;
    const value = event.target.value;
    setDraft((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setStatus("");
  }

  function checkField(field: keyof DraftValues) {
    const error = validateDraftField(field, draft[field]);
    setErrors((current) => ({ ...current, [field]: error }));
  }

  function previewDraft(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors: DraftErrors = {};
    for (const field of Object.keys(draft) as (keyof DraftValues)[]) {
      const error = validateDraftField(field, draft[field]);
      if (error) nextErrors[field] = error;
    }
    setErrors(nextErrors);
    const firstError = Object.keys(nextErrors)[0];
    if (firstError) {
      setStatus("Correct the highlighted fields to preview this draft.");
      requestAnimationFrame(() => {
        formRef.current
          ?.querySelector<HTMLElement>(`[name="${firstError}"]`)
          ?.focus();
      });
      return;
    }
    setStatus("Local draft is ready to review. Nothing has been uploaded.");
  }

  function resetDraft() {
    setDraft(EMPTY_DRAFT);
    setErrors({});
    setStatus("Draft cleared.");
  }

  const metadataPreview = {
    name: draft.name,
    symbol: draft.ticker,
    description: draft.description,
    ...(draft.twitter && { twitter: draft.twitter }),
    ...(draft.telegram && { telegram: draft.telegram }),
    ...(draft.website && { website: draft.website }),
  };

  const previewLinks = SOCIAL_FIELDS.flatMap((field) => {
    const href = validPreviewLink(field.name, draft[field.name]);
    return href ? [{ label: field.label, href }] : [];
  });

  return (
    <div className="create-workspace">
      <form
        className="create-form create-panel"
        ref={formRef}
        onSubmit={previewDraft}
        noValidate
      >
        <div className="create-section-heading">
          <div>
            <h2>Coin details</h2>
            <p>Draft metadata locally. Required fields are marked.</p>
          </div>
          <span className="offline-badge">Offline only</span>
        </div>

        <div className="create-field-row">
          {TEXT_FIELDS.map((field) => (
            <div className="create-field" key={field.name}>
              <label htmlFor={`create-${field.name}`}>
                {field.label} <span aria-hidden="true">*</span>
              </label>
              <input
                id={`create-${field.name}`}
                name={field.name}
                type="text"
                autoComplete="off"
                placeholder={field.placeholder}
                value={draft[field.name]}
                maxLength={field.maxLength}
                required={field.required}
                aria-invalid={Boolean(errors[field.name])}
                aria-describedby={`${field.name}-hint${errors[field.name] ? ` ${field.name}-error` : ""}`}
                onChange={updateField}
                onBlur={() => checkField(field.name)}
              />
              <div className="create-field-meta" id={`${field.name}-hint`}>
                <span>{field.required ? "Required" : "Optional"}</span>
                <span>
                  {draft[field.name].length}/{field.maxLength}
                </span>
              </div>
              <FieldError field={field.name} error={errors[field.name]} />
            </div>
          ))}
        </div>

        <div className="create-field">
          <label htmlFor="create-description">
            Description <span className="optional-label">Optional</span>
          </label>
          <textarea
            id="create-description"
            name="description"
            rows={5}
            placeholder="Write a short description"
            value={draft.description}
            maxLength={CREATE_LIMITS.description}
            aria-invalid={Boolean(errors.description)}
            aria-describedby={`description-hint${errors.description ? " description-error" : ""}`}
            onChange={updateField}
            onBlur={() => checkField("description")}
          />
          <div className="create-field-meta" id="description-hint">
            <span>Multiline text is supported.</span>
            <span>
              {draft.description.length}/
              {CREATE_LIMITS.description.toLocaleString()}
            </span>
          </div>
          <FieldError field="description" error={errors.description} />
        </div>

        <fieldset className="create-fieldset">
          <legend>
            Social links <span>Optional</span>
          </legend>
          <p className="fieldset-description">
            Only valid HTTPS links are shown as clickable preview links.
          </p>
          <div className="social-grid">
            {SOCIAL_FIELDS.map((field) => (
              <div className="create-field" key={field.name}>
                <label htmlFor={`create-${field.name}`}>{field.label}</label>
                <input
                  id={`create-${field.name}`}
                  name={field.name}
                  type="url"
                  inputMode="url"
                  autoComplete="url"
                  placeholder={field.placeholder}
                  value={draft[field.name]}
                  maxLength={CREATE_LIMITS.socialUrl}
                  aria-invalid={Boolean(errors[field.name])}
                  aria-describedby={`${field.name}-hint${errors[field.name] ? ` ${field.name}-error` : ""}`}
                  onChange={updateField}
                  onBlur={() => checkField(field.name)}
                />
                <p className="create-field-hint" id={`${field.name}-hint`}>
                  {field.hint}
                </p>
                <FieldError field={field.name} error={errors[field.name]} />
              </div>
            ))}
          </div>
        </fieldset>

        <div className="create-actions">
          <button className="draft-button" type="submit">
            Preview draft
          </button>
          <button className="reset-button" type="button" onClick={resetDraft}>
            Reset draft
          </button>
        </div>
        <p className="form-status" aria-live="polite">
          {status}
        </p>

        <div className="launch-boundary">
          <button type="button" disabled>
            Launch unavailable in local reconstruction
          </button>
          <p>
            Wallet signing, metadata upload and token creation have not been
            reconstructed or qualified.
          </p>
        </div>
      </form>

      <aside
        className="create-preview create-panel"
        aria-labelledby="preview-title"
      >
        <div className="create-section-heading">
          <div>
            <p className="preview-kicker">Local draft preview</p>
            <h2 id="preview-title">{draft.name || "Your coin name"}</h2>
          </div>
          <span className="ticker-preview">{draft.ticker || "TICKER"}</span>
        </div>
        <div
          className="preview-media-placeholder"
          aria-label="No local image selected"
        >
          <span aria-hidden="true">P</span>
          <p>Local image preview will appear here.</p>
        </div>
        <p className="preview-description">
          {draft.description ||
            "Your optional coin description will appear here."}
        </p>
        {previewLinks.length ? (
          <ul className="preview-links" aria-label="Draft social links">
            {previewLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href} target="_blank" rel="noreferrer">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="preview-empty-links">
            No valid social links in this draft.
          </p>
        )}
        <details className="metadata-json">
          <summary>Inspect draft JSON</summary>
          <p>This is local descriptive output, not a production API payload.</p>
          <pre>{JSON.stringify(metadataPreview, null, 2)}</pre>
        </details>
        <div className="preview-disclaimer">
          No mint address, metadata URI, transaction or launch status exists.
        </div>
      </aside>
    </div>
  );
}
