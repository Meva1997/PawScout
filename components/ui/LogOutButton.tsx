"use client";

import { logout } from "@/actions/login/logout-action";
import { useActionState, useEffect } from "react";
import { toast } from "react-toastify";

export default function LogOutButton() {
  const [state, dispatch, isPending] = useActionState(logout, {});

  useEffect(() => {
    if (state?.error) {
      toast.error(state.error);
    }
  }, [state]);

  return (
    <>
      {/*Logout button*/}
      <section>
        <div className="max-w-6xl mx-auto px-4 my-6">
          <form action={dispatch}>
            <button
              type="submit"
              disabled={isPending}
              className="bg-red-500 text-white px-4 py-2 rounded-2xl hover:bg-red-600 transition cursor-pointer font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? "Logging Out..." : "Log Out"}
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
