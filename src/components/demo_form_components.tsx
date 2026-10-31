import { useStore } from "@tanstack/react-form";
import { useId } from "react";

import { useFieldContext, useFormContext } from "#/hooks/demo_form_context";

export function SubscribeButton({ label }: { label: string }) {
  const form = useFormContext();
  return (
    <form.Subscribe selector={(state) => state.isSubmitting}>
      {(isSubmitting) => (
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors disabled:opacity-50"
        >
          {label}
        </button>
      )}
    </form.Subscribe>
  );
}

function ErrorMessages({
  errors,
  id,
}: {
  errors: Array<string | { message: string }>;
  id: string;
}) {
  return (
    <div id={id} aria-live="polite">
      {errors.map((error) => (
        <div
          key={typeof error === "string" ? error : error.message}
          className="text-red-500 mt-1 font-bold"
        >
          {typeof error === "string" ? error : error.message}
        </div>
      ))}
    </div>
  );
}

export function TextField({ label, placeholder }: { label: string; placeholder?: string }) {
  const field = useFieldContext<string>();
  const errors = useStore(field.store, (state) => state.meta.errors);
  const inputId = useId();
  const errorId = `${inputId}-errors`;
  const hasErrors = field.state.meta.isTouched && errors.length > 0;

  return (
    <div>
      <label htmlFor={inputId} className="block font-bold mb-1 text-xl">
        {label}
      </label>
      <input
        id={inputId}
        name={field.name}
        value={field.state.value}
        placeholder={placeholder}
        aria-invalid={hasErrors}
        aria-describedby={hasErrors ? errorId : undefined}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
        className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      {field.state.meta.isTouched && <ErrorMessages id={errorId} errors={errors} />}
    </div>
  );
}

export function TextArea({ label, rows = 3 }: { label: string; rows?: number }) {
  const field = useFieldContext<string>();
  const errors = useStore(field.store, (state) => state.meta.errors);
  const inputId = useId();
  const errorId = `${inputId}-errors`;
  const hasErrors = field.state.meta.isTouched && errors.length > 0;

  return (
    <div>
      <label htmlFor={inputId} className="block font-bold mb-1 text-xl">
        {label}
      </label>
      <textarea
        id={inputId}
        name={field.name}
        value={field.state.value}
        aria-invalid={hasErrors}
        aria-describedby={hasErrors ? errorId : undefined}
        onBlur={field.handleBlur}
        rows={rows}
        onChange={(e) => field.handleChange(e.target.value)}
        className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      {field.state.meta.isTouched && <ErrorMessages id={errorId} errors={errors} />}
    </div>
  );
}

export function Select({
  label,
  values,
}: {
  label: string;
  values: Array<{ label: string; value: string }>;
  placeholder?: string;
}) {
  const field = useFieldContext<string>();
  const errors = useStore(field.store, (state) => state.meta.errors);
  const inputId = useId();
  const errorId = `${inputId}-errors`;
  const hasErrors = field.state.meta.isTouched && errors.length > 0;

  return (
    <div>
      <label htmlFor={inputId} className="block font-bold mb-1 text-xl">
        {label}
      </label>
      <select
        id={inputId}
        name={field.name}
        value={field.state.value}
        aria-invalid={hasErrors}
        aria-describedby={hasErrors ? errorId : undefined}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
        className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        {values.map((value) => (
          <option key={value.value} value={value.value}>
            {value.label}
          </option>
        ))}
      </select>
      {field.state.meta.isTouched && <ErrorMessages id={errorId} errors={errors} />}
    </div>
  );
}
