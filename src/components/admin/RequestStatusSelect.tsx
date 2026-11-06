"use client";

export type StudioRequestStatus =
  | "NEW"
  | "CONTACTED"
  | "QUOTED"
  | "APPROVED"
  | "COMPLETED"
  | "CANCELLED";

const STATUS_OPTIONS: Array<{
  value: StudioRequestStatus;
  label: string;
}> = [
  { value: "NEW", label: "Novo" },
  { value: "CONTACTED", label: "Contatado" },
  { value: "QUOTED", label: "Orçamento enviado" },
  { value: "APPROVED", label: "Aprovado" },
  { value: "COMPLETED", label: "Concluído" },
  { value: "CANCELLED", label: "Cancelado" },
];

type RequestStatusSelectProps = {
  requestId: number;
  value: StudioRequestStatus;
  disabled?: boolean;
  onChange: (
    requestId: number,
    status: StudioRequestStatus,
  ) => void | Promise<void>;
};

export function RequestStatusSelect({
  requestId,
  value,
  disabled = false,
  onChange,
}: RequestStatusSelectProps) {
  return (
    <div className="w-full">
      <label
        htmlFor={`status-${requestId}`}
        className="font-sans text-xs uppercase tracking-[0.1em] text-white/35"
      >
        Status
      </label>

      <select
        id={`status-${requestId}`}
        value={value}
        disabled={disabled}
        onChange={(event) => {
          void onChange(
            requestId,
            event.target.value as StudioRequestStatus,
          );
        }}
        className="mt-2 w-full rounded-xl border border-white/10 bg-black px-4 py-3 font-sans text-sm text-white outline-none transition focus:border-ayo-red/60 disabled:cursor-wait disabled:opacity-50"
      >
        {STATUS_OPTIONS.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
