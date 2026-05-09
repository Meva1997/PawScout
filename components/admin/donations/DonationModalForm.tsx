import React from "react";
import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

type DonationModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function DonationModalForm({
  isOpen,
  onClose,
}: DonationModalProps) {
  function handleClose() {
    onClose();
  }

  return (
    <section className="fixed inset-0 z-0 bg-black/40 backdrop-blur-sm transition duration-300 flex items-center justify-center p-4">
      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={handleClose}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
            >
              <DialogTitle as="h3" className="text-xl font-medium text-white">
                Add New Donation
              </DialogTitle>
              <form action="" className="my-4 space-y-4">
                <label
                  htmlFor="donorName"
                  className="mt-2 text-sm/6 text-white/50"
                >
                  Donor Name:
                </label>
                <input
                  type="text"
                  id="donorName"
                  inputMode="text"
                  className="mt-1 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-white/80 focus:border-[#19e6b3] focus:outline-none focus:ring-1 focus:ring-[#19e6b3]"
                />
                <label htmlFor="date" className="mt-2 text-sm/6 text-white/50">
                  Donation Date:
                </label>
                <input
                  type="date"
                  id="date"
                  className="mt-1 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-white/80 focus:border-[#19e6b3] focus:outline-none focus:ring-1 focus:ring-[#19e6b3]"
                />

                <label
                  htmlFor="amount"
                  className="mt-2 text-sm/6 text-white/50"
                >
                  Donation Amount:
                </label>
                <input
                  type="number"
                  id="amount"
                  inputMode="numeric"
                  className="mt-1 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-white/80 focus:border-[#19e6b3] focus:outline-none focus:ring-1 focus:ring-[#19e6b3]"
                />
                <label
                  htmlFor="paymentMethod"
                  className="mt-2 text-sm/6 text-white/50"
                >
                  Payment Method:
                </label>
                <select
                  name="paymentMethod"
                  id="paymentMethod"
                  className="mt-1 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-white/80 focus:border-[#19e6b3] focus:outline-none focus:ring-1 focus:ring-[#19e6b3]"
                >
                  <option value="cash">Cash</option>
                  <option value="bankTransfer">Bank Transfer</option>
                </select>

                {/*Hidden status field since it will be 'completed' by default*/}
                <input type="hidden" name="status" value="completed" />

                <div className="mt-8 flex gap-4 justify-center">
                  <Button
                    className="inline-flex items-center gap-2 rounded-md bg-emerald-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-emerald-800 data-open:bg-emerald-800 cursor-pointer"
                    onClick={(event) => {
                      event.preventDefault();
                      handleClose();
                    }}
                    type="submit"
                  >
                    Add
                  </Button>
                  <Button
                    className="inline-flex items-center gap-2 rounded-md bg-red-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-red-800 data-open:bg-red-800 cursor-pointer"
                    onClick={handleClose}
                    type="button"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </section>
  );
}
