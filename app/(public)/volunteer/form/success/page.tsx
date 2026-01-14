import Link from "next/link";

export default function page() {
  return (
    <main className="grow flex items-center justify-center p-4 sm:p-6 lg:p-10 bg-gray-100">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row min-h-150 my-20">
        <div className="relative w-full md:w-5/12 h-64 md:h-auto bg-slate-200 order-first">
          <div
            className="absolute inset-0 bg-center bg-cover bg-no-repeat"
            data-alt="Two happy dogs running in a grassy field playing together"
            style={{
              backgroundImage:
                'url("https://lh3.googleusercontent.com/aida-public/AB6AXuA4rY_Sd1SSKHyDnwyjS60Sz2iYIO4IkkYweC0Xr4NND0YvxJttYr34okzu73T69iAzDXI-L2RHPWGVSNaS-nf6PFHN0fliZHndDLjkffqt7u7uHb_8n3D3G8Jo3hhfLBlWuy76NNcicS4otTgoTlvQ6Zrp_0B-Sh0JY18--Q330tuNToK8XS9w3_mb9rfnYbnW19moPzyEIH1jocH2QKF3P7owKJ1n_6VDNdLHEJjlB8yuz3JAGRezm_9ddr10PhOPJ2m1_m9iXQ4")',
            }}
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent md:bg-linear-to-r md:from-transparent md:to-black/10" />
          <div className="absolute bottom-6 left-6 right-6 text-white md:hidden">
            <h3 className="text-xl font-bold">Making tails wag.</h3>
          </div>
        </div>

        <div className="w-full md:w-7/12 flex flex-col p-8 sm:p-10 lg:p-14">
          <div className="flex flex-col items-center md:items-start text-center md:text-left mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">¡Gracias!</h1>
            <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed max-w-md">
              Su solicitud ha sido enviada con éxito. Gracias por ofrecer su
              tiempo para ayudar a nuestras mascotas.
            </p>
          </div>

          <div className="mt-auto flex flex-col sm:flex-row gap-4">
            <Link
              className="flex-1 inline-flex items-center justify-center rounded-xl h-12 px-6 py-4 bg-emerald-400 text-black font-bold  text-sm hover:bg-emerald-600 transition-colors"
              href="/"
            >
              Pagina principal
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
