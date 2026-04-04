import { useState } from 'react';
import type { FormEvent } from 'react';

type FieldName = 'name' | 'email' | 'subject' | 'message';

type FormValues = Record<FieldName, string>;
type FormErrors = Partial<Record<FieldName, string>>;
type FormTouched = Record<FieldName, boolean>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const initialValues: FormValues = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

const initialTouched: FormTouched = {
  name: false,
  email: false,
  subject: false,
  message: false,
};

const formspreeEndpoint = import.meta.env.PUBLIC_FORMSPREE_ENDPOINT;

export default function ContactForm() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<FormTouched>(initialTouched);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const validateField = (fieldName: FieldName, rawValue: string) => {
    const value = rawValue.trim();

    switch (fieldName) {
      case 'name':
        if (!value) return 'This field is required.';
        if (value.length < 2) return 'Please enter your name.';
        return undefined;
      case 'email':
        if (!value) return 'This field is required.';
        if (!emailPattern.test(value)) return 'Please enter a valid email address.';
        return undefined;
      case 'subject':
        if (!value) return 'This field is required.';
        if (value.length < 5) return 'Please add a bit more detail to the subject.';
        return undefined;
      case 'message':
        if (!value) return 'This field is required.';
        if (value.length < 20) return 'Please share a little more context so I can respond thoughtfully.';
        return undefined;
      default:
        return undefined;
    }
  };

  const validate = (nextValues: FormValues) => {
    return (Object.keys(nextValues) as FieldName[]).reduce<FormErrors>((nextErrors, fieldName) => {
      const error = validateField(fieldName, nextValues[fieldName]);
      if (error) {
        nextErrors[fieldName] = error;
      }
      return nextErrors;
    }, {});
  };

  const updateField = (fieldName: FieldName, value: string) => {
    const nextValues = { ...values, [fieldName]: value };
    setValues(nextValues);
    setSuccessMessage('');
    setSubmitError('');

    if (touched[fieldName] || submitted) {
      const error = validateField(fieldName, value);
      setErrors((current) => ({
        ...current,
        [fieldName]: error,
      }));
    }
  };

  const markTouched = (fieldName: FieldName) => {
    setTouched((current) => ({ ...current, [fieldName]: true }));
    setErrors((current) => ({
      ...current,
      [fieldName]: validateField(fieldName, values[fieldName]),
    }));
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    setSubmitted(true);
    setTouched({
      name: true,
      email: true,
      subject: true,
      message: true,
    });
    setSuccessMessage('');
    setSubmitError('');

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    if (!formspreeEndpoint) {
      setSubmitError('Formspree is not configured yet. Add PUBLIC_FORMSPREE_ENDPOINT to your environment to enable submissions.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(formspreeEndpoint, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          subject: values.subject.trim(),
          message: values.message.trim(),
        }),
      });

      if (response.ok) {
        setSuccessMessage('Thanks for reaching out. Your message has been sent.');
        setValues(initialValues);
        setTouched(initialTouched);
        setErrors({});
        setSubmitted(false);
        return;
      }

      const data = await response.json().catch(() => null);
      const formspreeMessage =
        data && typeof data === 'object' && 'errors' in data && Array.isArray(data.errors)
          ? data.errors
              .map((error) =>
                error && typeof error === 'object' && 'message' in error ? String(error.message) : null,
              )
              .filter(Boolean)
              .join(' ')
          : '';

      if (response.status === 429) {
        setSubmitError('Too many messages were sent in a short time. Please wait a minute and try again.');
      } else {
        setSubmitError(formspreeMessage || 'There was a problem sending your message. Please try again.');
      }
    } catch {
      setSubmitError('There was a network problem sending your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="contact-form" onSubmit={onSubmit} noValidate>
      <p className="contact-form__intro">
        All fields are required. If you prefer, you can also email me directly.
      </p>

      <label className="form-field">
        <span>Name</span>
        <input
          type="text"
          name="name"
          autoComplete="name"
          required
          minLength={2}
          placeholder="Your name"
          value={values.name}
          onChange={(event) => updateField('name', event.target.value)}
          onBlur={() => markTouched('name')}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? 'name-error' : undefined}
        />
      </label>
      {errors.name ? <p className="form-error" id="name-error">{errors.name}</p> : null}

      <label className="form-field">
        <span>Email</span>
        <input
          type="email"
          name="email"
          autoComplete="email"
          inputMode="email"
          required
          placeholder="your.email@example.com"
          value={values.email}
          onChange={(event) => updateField('email', event.target.value)}
          onBlur={() => markTouched('email')}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? 'email-error' : undefined}
        />
      </label>
      {errors.email ? <p className="form-error" id="email-error">{errors.email}</p> : null}

      <label className="form-field">
        <span>Subject</span>
        <input
          type="text"
          name="subject"
          required
          minLength={5}
          placeholder="What's this about?"
          value={values.subject}
          onChange={(event) => updateField('subject', event.target.value)}
          onBlur={() => markTouched('subject')}
          aria-invalid={Boolean(errors.subject)}
          aria-describedby={errors.subject ? 'subject-error' : undefined}
        />
      </label>
      {errors.subject ? <p className="form-error" id="subject-error">{errors.subject}</p> : null}

      <label className="form-field">
        <span>Message</span>
        <textarea
          name="message"
          rows={6}
          required
          minLength={20}
          placeholder="Your message..."
          value={values.message}
          onChange={(event) => updateField('message', event.target.value)}
          onBlur={() => markTouched('message')}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'message-error' : undefined}
        />
      </label>
      {errors.message ? <p className="form-error" id="message-error">{errors.message}</p> : null}

      <p className="contact-form__help">Share a little context so I can respond helpfully.</p>

      {submitted && Object.keys(errors).length > 0 ? (
        <p className="form-banner" role="alert">Please fix the highlighted fields before submitting.</p>
      ) : null}

      {submitError ? (
        <p className="form-banner" role="alert">
          {submitError}
        </p>
      ) : null}

      {successMessage ? (
        <p className="form-banner form-banner--success" role="status" aria-live="polite">
          {successMessage}
        </p>
      ) : null}

      <button className="button button--primary button--full" type="submit" disabled={isSubmitting}>
        <span className="button__icon">↗</span>
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}
