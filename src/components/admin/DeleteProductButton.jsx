"use client";

export default function DeleteProductButton({ deleteAction }) {
return (
    <form
    action={deleteAction}
    onSubmit={(e) => {
        if (
        !confirm(
            "¿Eliminar este producto? Esta acción no se puede deshacer."
        )
        ) {
        e.preventDefault();
        }
    }}
    >
    <button
        type="submit"
        className="text-xs font-medium text-red-500 hover:underline"
    >
        Eliminar
    </button>
    </form>
);
}