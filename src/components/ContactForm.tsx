import { useState } from 'react';
import type { FormEvent } from 'react';

type FieldName = 'name' | 'email' | 'subject' | 'message';

type FormValues = Record<FieldName, string>;
type FormErrors = Partial<Record<FieldName, string>>;

const initialValues: FormValues = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

export default function ContactForm() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = (nextValues: FormValues) => {
    const nextErrors: FormErrors = {};

    if (!nextValues.name.trim()) nextErrors.name = 'This field is required.';
    if (!nextValues.email.trim()) nextErrors.email = 'This field is required.';
    if (!nextValues.subject.trim()) nextErrors.subject = 'This field is required.';
    if (!nextValues.message.trim()) nextErrors.message = 'This field is required.';

    return nextErrors;
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    setSubmitted(true);

    if (Object.keys(nextErrors).length === 0) {
      window.alert('This demo form is wired for layout only. You can connect it to Formspree, Netlify Forms, or your preferred backend later.');
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
          placeholder="Your name"
          value={values.name}
          onChange={(event) => setValues((current) => ({ ...current, name: event.target.value }))}
          aria-invalid={Boolean(errors.name)}
        />
      </label>
      {errors.name ? <p className="form-error">{errors.name}</p> : null}

      <label className="form-field">
        <span>Email</span>
        <input
          type="email"
          name="email"
          placeholder="your.email@example.com"
          value={values.email}
          onChange={(event) => setValues((current) => ({ ...current, email: event.target.value }))}
          aria-invalid={Boolean(errors.email)}
        />
      </label>
      {errors.email ? <p className="form-error">{errors.email}</p> : null}

      <label className="form-field">
        <span>Subject</span>
        <input
          type="text"
          name="subject"
          placeholder="What's this about?"
          value={values.subject}
          onChange={(event) => setValues((current) => ({ ...current, subject: event.target.value }))}
          aria-invalid={Boolean(errors.subject)}
        />
      </label>
      {errors.subject ? <p className="form-error">{errors.subject}</p> : null}

      <label className="form-field">
        <span>Message</span>
        <textarea
          name="message"
          rows={6}
          placeholder="Your message..."
          value={values.message}
          onChange={(event) => setValues((current) => ({ ...current, message: event.target.value }))}
          aria-invalid={Boolean(errors.message)}
        />
      </label>
      {errors.message ? <p className="form-error">{errors.message}</p> : null}

      <p className="contact-form__help">Share a little context so I can respond helpfully.</p>

      {submitted && Object.keys(errors).length > 0 ? (
        <p className="form-banner">Please fix the highlighted fields before submitting.</p>
      ) : null}

      <button className="button button--primary button--full" type="submit">
        <span className="button__icon">↗</span>
        Send Message
      </button>
    </form>
  );
}
