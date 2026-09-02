"use client";

import { useFormStatus } from "react-dom";

export default function SubmitButton({ idleLabel, pendingLabel }) {
const { pending } = useFormStatus();

return (
    <button
    type="submit"
    disabled={pending}
    className="mt-2 w-full rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
    >
    {pending ? pendingLabel : idleLabel}
    </button>
);
}