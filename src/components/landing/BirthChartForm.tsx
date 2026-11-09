"use client";

import { useEffect, useId, useRef, useState } from "react";
import { PRIVACY_URL, resultUrl } from "@/lib/site";
import { INVALID_DATE, STEPS, validateField, type Field } from "./form-fields";

type Values = Record<string, string>;
type Errors = Record<string, string>;
type FieldProps = { id: string; field: Field; value: string; error?: string; onChange: (v: string) => void };

const CURRENT_YEAR = new Date().getFullYear();
const range = (from: number, to: number) =>
  Array.from({ length: Math.abs(to - from) + 1 }, (_, i) => String(from + (from <= to ? i : -i)));
const DAYS = range(1, 31);
const MONTHS = range(1, 12);
const YEARS = range(CURRENT_YEAR, 1900);

function describedBy({ id, field, error }: FieldProps) {
  if (error) return `${id}-error`;
  return field.hint ? `${id}-hint` : undefined;
}

/** Day / month / year selects that emit an ISO date, or INVALID_DATE for e.g. 31/02. */
function DateField(props: FieldProps) {
  const { id, field, value, error, onChange } = props;
  const [parts, setParts] = useState(() => {
    const m = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    return m ? { d: String(Number(m[3])), m: String(Number(m[2])), y: m[1] } : { d: "", m: "", y: "" };
  });

  const update = (key: "d" | "m" | "y", v: string) => {
    const next = { ...parts, [key]: v };
    setParts(next);
    const { d, m, y } = next;
    if (!d || !m || y.length !== 4) return onChange("");
    const day = Number(d);
    const month = Number(m);
    const valid = month >= 1 && month <= 12 && day >= 1 && day <= new Date(Number(y), month, 0).getDate();
    onChange(valid ? `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}` : INVALID_DATE);
  };

  const selects = [
    { key: "d" as const, label: "Ngày", options: DAYS },
    { key: "m" as const, label: "Tháng", options: MONTHS },
    { key: "y" as const, label: "Năm", options: YEARS },
  ];

  return (
    <div role="group" aria-labelledby={`${id}-label`} aria-describedby={describedBy(props)} className="grid grid-cols-3 gap-2">
      {selects.map(({ key, label, options }) => (
        <select
          key={key}
          aria-label={`${field.label}, ${label.toLowerCase()}`}
          aria-required={field.required}
          aria-invalid={!!error}
          value={parts[key]}
          onChange={(e) => update(key, e.target.value)}
          autoComplete={key === "d" ? "bday-day" : key === "m" ? "bday-month" : "bday-year"}
          className="field-control !pl-2 !pr-1 !text-[16px] sm:!pl-3.5"
        >
          <option value="">{label}</option>
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      ))}
    </div>
  );
}

function RadioChips(props: FieldProps) {
  const { id, field, value, error, onChange } = props;
  return (
    <div
      role="radiogroup"
      aria-labelledby={`${id}-label`}
      aria-required={field.required}
      aria-invalid={!!error}
      aria-describedby={describedBy(props)}
      className={`grid gap-1.5 sm:flex sm:flex-wrap sm:gap-2 ${
        (field.options?.length ?? 0) <= 4 ? "grid-cols-[1fr_1fr_1.45fr_1fr]" : "grid-cols-3"
      }`}
    >
      {field.options?.map((o) => {
        const checked = value === o.value;
        return (
          <label
            key={o.value}
            className={`flex min-h-[44px] cursor-pointer items-center justify-center whitespace-nowrap rounded-md border px-1 text-center text-[13px] leading-tight transition-colors sm:px-3.5 sm:text-sm has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-gold ${
              checked ? "border-gold bg-gold/10 text-parchment" : "border-line text-muted hover:text-parchment"
            }`}
          >
            <input type="radio" name={id} value={o.value} checked={checked} onChange={() => onChange(o.value)} className="sr-only" />
            {o.label}
          </label>
        );
      })}
    </div>
  );
}

function Control(props: FieldProps) {
  const { id, field, value, error, onChange } = props;
  if (field.type === "date") return <DateField {...props} />;
  if (field.type === "radio") return <RadioChips {...props} />;
  const common = {
    id,
    value,
    "aria-required": field.required,
    "aria-invalid": !!error,
    "aria-describedby": describedBy(props),
    className: "field-control",
  };
  if (field.type === "select") {
    return (
      <select {...common} onChange={(e) => onChange(e.target.value)}>
        <option value="">{field.emptyOption ?? "Chọn…"}</option>
        {field.options?.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    );
  }
  return (
    <input
      {...common}
      type={field.type}
      placeholder={field.placeholder}
      autoComplete={field.type === "email" ? "email" : field.type === "tel" ? "tel" : field.key === "name" ? "name" : "off"}
      inputMode={field.type === "email" ? "email" : field.type === "tel" ? "tel" : undefined}
      autoCapitalize={field.type === "text" && field.key !== "occupation" ? "words" : field.type === "email" ? "none" : undefined}
      autoCorrect={field.type === "text" ? undefined : "off"}
      spellCheck={field.type === "email" || field.key === "name" || field.key === "commonName" ? false : undefined}
      enterKeyHint="next"
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

function FieldRow(props: FieldProps) {
  const { id, field, error } = props;
  const grouped = field.type === "date" || field.type === "radio";
  const labelClass = "mb-1 block text-[13px] font-medium leading-[18px] text-parchment sm:mb-2 sm:text-sm sm:leading-5";
  const label = (
    <>
      {field.label}
      {field.required && (
        <span aria-hidden="true" className="ml-1 text-gold">
          *
        </span>
      )}
    </>
  );
  return (
    <div className={`col-span-2 min-w-0 ${field.half ? "sm:col-span-1" : ""}`}>
      {grouped ? (
        <p id={`${id}-label`} className={labelClass}>
          {label}
        </p>
      ) : (
        <label htmlFor={id} className={labelClass}>
          {label}
        </label>
      )}
      <Control {...props} />
      {field.hint && !error && (
        <p id={`${id}-hint`} className={`mt-1.5 text-xs leading-5 text-muted sm:mt-2 ${field.hintFromSm ? "hidden sm:block" : ""}`}>
          {field.hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-[13px] leading-5 text-danger-text sm:mt-2 sm:text-sm">
          {error}
        </p>
      )}
    </div>
  );
}

const consentRow = "flex cursor-pointer items-start gap-3";
const consentBox = "focus-gold mt-0.5 h-5 w-5 shrink-0 accent-gold";

function Consent({
  consent,
  sensitiveConsent,
  error,
  onConsentChange,
  onSensitiveConsentChange,
}: {
  consent: boolean;
  sensitiveConsent: boolean;
  error: string;
  onConsentChange: (v: boolean) => void;
  onSensitiveConsentChange: (v: boolean) => void;
}) {
  return (
    <div className="col-span-2 space-y-4 border-t border-line pt-5 text-sm leading-6 text-muted">
      <label className={consentRow}>
        <input
          type="checkbox"
          checked={consent}
          aria-required="true"
          aria-invalid={!!error}
          onChange={(e) => onConsentChange(e.target.checked)}
          className={consentBox}
        />
        <span>
          Tôi đã đọc và đồng ý với{" "}
          <a href={PRIVACY_URL} target="_blank" rel="noopener noreferrer" className="text-gold underline underline-offset-4">
            Chính sách bảo mật
          </a>
          .
          <span aria-hidden="true" className="ml-1 text-gold">
            *
          </span>
        </span>
      </label>
      {error && (
        <p role="alert" className="text-danger-text">
          {error}
        </p>
      )}
      <label className={consentRow}>
        <input
          type="checkbox"
          checked={sensitiveConsent}
          onChange={(e) => onSensitiveConsentChange(e.target.checked)}
          className={consentBox}
        />
        <span>
          Tôi đồng ý cho xử lý dữ liệu nhạy cảm tôi đã điền (xu hướng tính dục, thu nhập) để luận giải sát hơn. Dữ liệu này
          tự xoá sau 7 ngày. Không đánh dấu thì 2 thông tin này sẽ không được gửi đi.
        </span>
      </label>
    </div>
  );
}

export function BirthChartForm() {
  const uid = useId();
  const [step, setStep] = useState(0);
  const [values, setValues] = useState<Values>({});
  const [errors, setErrors] = useState<Errors>({});
  const [consent, setConsent] = useState(false);
  const [sensitiveConsent, setSensitiveConsent] = useState(false);
  const [consentError, setConsentError] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const headingRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const lastStep = useRef(step);

  const current = STEPS[step];
  const isLast = step === STEPS.length - 1;

  // Move focus to the new step's heading so keyboard and screen reader users follow along.
  useEffect(() => {
    if (lastStep.current === step) return;
    lastStep.current = step;
    headingRef.current?.focus({ preventScroll: true });
    headingRef.current?.scrollIntoView({ block: "center" });
  }, [step]);

  // Coming back from the result page via the back button should not leave the button stuck.
  useEffect(() => {
    const onShow = (e: PageTransitionEvent) => {
      if (e.persisted) setStatus("idle");
    };
    window.addEventListener("pageshow", onShow);
    return () => window.removeEventListener("pageshow", onShow);
  }, []);

  const focusFirstInvalid = () => {
    requestAnimationFrame(() => {
      const el = formRef.current?.querySelector<HTMLElement>(
        'input[aria-invalid="true"], select[aria-invalid="true"], [role="radiogroup"][aria-invalid="true"] input',
      );
      el?.scrollIntoView({ block: "center" });
      el?.focus({ preventScroll: true });
    });
  };

  const validateStep = () => {
    const next: Errors = {};
    for (const f of current.fields) {
      const msg = validateField(f, values[f.key]);
      if (msg) next[f.key] = msg;
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = async () => {
    const payload: Record<string, unknown> = { ...values, consent, sensitiveConsent };
    if (!sensitiveConsent) {
      delete payload.sexualOrientation;
      delete payload.incomeRange;
    }
    setStatus("submitting");
    try {
      const res = await fetch("/api/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(String(res.status));
      const { id } = (await res.json()) as { id?: string };
      if (!id) throw new Error("missing id");
      window.location.assign(resultUrl(id));
    } catch {
      setStatus("error");
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep()) return focusFirstInvalid();
    if (!isLast) return setStep((s) => s + 1);
    if (!consent) {
      setConsentError("Vui lòng đồng ý Chính sách bảo mật để lập lá số");
      focusFirstInvalid();
      return;
    }
    void submit();
  };

  return (
    <div className="w-full text-left" data-step={step + 1}>
      {/* Step label and progress share one row so step 1 fits a phone's first screen. */}
      <div className="form-steprow flex items-center gap-3">
        <p className="type-kicker shrink-0 !text-[11px] text-muted sm:!text-xs">
          Bước {step + 1}/{STEPS.length}
        </p>
        <div aria-hidden="true" className="h-px flex-1 bg-line">
          <div className={`h-px bg-gold transition-[width] duration-300 ${isLast ? "w-full" : "w-1/2"}`} />
        </div>
      </div>
      <h2
        ref={headingRef}
        tabIndex={-1}
        className="mt-1.5 text-[22px] font-bold leading-tight tracking-[-0.01em] text-parchment outline-none sm:mt-3 sm:text-2xl"
      >
        {current.mobileTitle ? (
          <>
            <span className="sm:hidden">{current.mobileTitle}</span>
            <span className="hidden sm:inline">{current.title}</span>
          </>
        ) : (
          current.title
        )}
      </h2>
      <p className="form-subtitle mt-0.5 text-[13px] leading-5 text-muted sm:mt-2 sm:text-sm sm:leading-6">{current.subtitle}</p>
      <form
        ref={formRef}
        noValidate
        className="form-grid mt-3.5 grid grid-cols-2 gap-x-2.5 gap-y-[10px] sm:mt-6 sm:gap-x-3 sm:gap-y-4"
        onSubmit={onSubmit}
      >
        {current.fields.map((f) => (
          <FieldRow
            key={f.key}
            id={`${uid}-${f.key}`}
            field={f}
            value={values[f.key] ?? ""}
            error={errors[f.key]}
            onChange={(v) => {
              setValues((prev) => ({ ...prev, [f.key]: v }));
              if (errors[f.key]) setErrors((prev) => ({ ...prev, [f.key]: "" }));
            }}
          />
        ))}
        {isLast && (
          <Consent
            consent={consent}
            sensitiveConsent={sensitiveConsent}
            error={consentError}
            onConsentChange={(v) => {
              setConsent(v);
              if (v) setConsentError("");
            }}
            onSensitiveConsentChange={setSensitiveConsent}
          />
        )}
        {status === "error" && (
          <p
            role="alert"
            className="col-span-2 rounded-md border border-danger/50 bg-danger/10 p-3 text-sm leading-6 text-danger-text"
          >
            Chưa lập được lá số vì hệ thống đang quá tải. Bạn bấm “Xem Mệnh của tôi” lần nữa sau khoảng 30 giây, thông tin
            đã nhập vẫn được giữ.
          </p>
        )}
        <div className="col-span-2 mt-1 flex gap-2.5 sm:mt-0 sm:gap-3">
          {step > 0 && (
            <button
              type="button"
              onClick={() => {
                setStatus("idle");
                setStep((s) => s - 1);
              }}
              className="btn-ghost focus-gold !min-h-[48px] !px-4 sm:!min-h-[52px] sm:!px-6"
            >
              Quay lại
            </button>
          )}
          <button
            type="submit"
            disabled={status === "submitting"}
            className="btn-gold focus-gold !min-h-[48px] flex-1 sm:!min-h-[52px]"
          >
            {status === "submitting" ? "Đang lập lá số…" : isLast ? "Xem Mệnh của tôi" : "Tiếp tục để xem lá số"}
          </button>
        </div>
        {isLast && (
          <p className="col-span-2 text-center text-xs leading-5 text-muted">
            Bản miễn phí hiện ngay sau khi bạn bấm “Xem Mệnh của tôi”.
          </p>
        )}
      </form>
    </div>
  );
}
