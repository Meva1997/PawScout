"use client";

import { useState } from "react";
import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { createAnimal, uploadMultipleImages } from "@/api/api";
import type { CreateAnimalFormData } from "@/schemas/dashboard-schema";
import Image from "next/image";

type NewPetFormProps = {
  isOpen: boolean;
  onCloseAction: () => void;
  token: string;
};

export default function NewPetForm({
  isOpen,
  onCloseAction,
  token,
}: NewPetFormProps) {
  const queryClient = useQueryClient();
  const [loadingMessage, setLoadingMessage] = useState("");
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
    // setValue,
  } = useForm<CreateAnimalFormData>({
    defaultValues: {
      name: "",
      type: "",
      breed: "",
      age: 0,
      gender: "",
      size: "",
      shortDescription: "",
      longDescription: "",
      goodWithKids: false,
      goodWithDogs: false,
      homeTrained: false,
      availableForAdoption: "available",
      media: undefined,
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    // Agregar nuevos archivos a los existentes
    const newFiles = Array.from(files);
    const updatedFiles = [...selectedFiles, ...newFiles];
    setSelectedFiles(updatedFiles);

    // Crear nuevas previsualizaciones para todos los archivos
    const newPreviews = updatedFiles.map((file) => URL.createObjectURL(file));

    // Limpiar previsualizaciones anteriores
    imagePreviews.forEach((url) => URL.revokeObjectURL(url));

    setImagePreviews(newPreviews);

    // Limpiar el error de media si hay archivos seleccionados
    if (updatedFiles.length > 0) {
      clearErrors("media");
    }

    // Limpiar el input para permitir seleccionar el mismo archivo de nuevo
    event.target.value = "";
  };

  const removeImage = (index: number) => {
    // Remover archivo
    const updatedFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(updatedFiles);

    // Limpiar y recrear previsualizaciones
    URL.revokeObjectURL(imagePreviews[index]);
    const updatedPreviews = imagePreviews.filter((_, i) => i !== index);
    setImagePreviews(updatedPreviews);
  };

  function handleClose() {
    // Limpiar previsualizaciones al cerrar
    imagePreviews.forEach((url) => URL.revokeObjectURL(url));
    setImagePreviews([]);
    setSelectedFiles([]);
    onCloseAction();
  }

  const createAnimalMutation = useMutation({
    mutationFn: async (data: CreateAnimalFormData) => {
      // Paso 1: Subir las imágenes primero
      let mediaUrls: Array<{
        url: string;
        public_id: string;
        resource_type: string;
      }> = [];

      // Usar los archivos del estado en lugar del input
      if (selectedFiles.length > 0) {
        setLoadingMessage(`Subiendo ${selectedFiles.length} imagen(es)...`);
        // Crear un FileList simulado o usar los archivos directamente
        const dataTransfer = new DataTransfer();
        selectedFiles.forEach((file) => dataTransfer.items.add(file));
        const uploadedMedia = await uploadMultipleImages(
          token,
          dataTransfer.files,
        );
        mediaUrls = uploadedMedia;
      }

      // Paso 2: Crear el animal con los datos y las URLs de las imágenes
      setLoadingMessage("Creando animal...");
      const animalData = {
        name: data.name,
        type: data.type,
        breed: data.breed,
        age: data.age,
        gender: data.gender,
        size: data.size,
        shortDescription: data.shortDescription,
        longDescription: data.longDescription,
        goodWithKids: data.goodWithKids,
        goodWithDogs: data.goodWithDogs,
        homeTrained: data.homeTrained,
        availableForAdoption: "available",
        media: mediaUrls.length > 0 ? mediaUrls : undefined,
      };

      return await createAnimal(token, animalData);
    },
    onSuccess: () => {
      setLoadingMessage("");
      queryClient.invalidateQueries({ queryKey: ["animals"] });
      handleClose();
    },
    onError: (error) => {
      setLoadingMessage("");
      console.error("Error creating animal:", error);
    },
  });

  const submitAnimal = async (data: CreateAnimalFormData) => {
    // Validar que haya al menos una imagen seleccionada
    if (selectedFiles.length === 0) {
      setError("media", {
        type: "manual",
        message: "Debes seleccionar al menos una imagen",
      });
      return;
    }

    await createAnimalMutation.mutateAsync(data);
  };

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
                Agregar Nuevo Animal{" "}
                {Object.keys(errors).length > 0 && (
                  <span className="text-red-500">
                    {" "}
                    - Por favor corrige los errores{" "}
                  </span>
                )}
              </DialogTitle>
              {loadingMessage && (
                <p className="mt-2 text-sm text-emerald-400 animate-pulse">
                  {loadingMessage}
                </p>
              )}
              <form
                onSubmit={handleSubmit(submitAnimal)}
                className="my-4 space-y-4"
              >
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm/6 text-white/50"
                  >
                    {errors.name ? (
                      <span className="text-red-500">* Nombre:</span>
                    ) : (
                      "Nombre:"
                    )}
                  </label>
                  <input
                    type="text"
                    id="name"
                    inputMode="text"
                    className="mt-1 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-white/80 focus:border-[#19e6b3] focus:outline-none focus:ring-1 focus:ring-[#19e6b3]"
                    {...register("name", {
                      required: true,
                      maxLength: 100,
                      minLength: 3,
                    })}
                  />
                </div>

                <div>
                  <label
                    htmlFor="type"
                    className="block text-sm/6 text-white/50"
                  >
                    {errors.type ? (
                      <span className="text-red-500">* Tipo de Animal:</span>
                    ) : (
                      "Tipo de Animal:"
                    )}
                  </label>
                  <select
                    id="type"
                    className="mt-1 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-white/80 focus:border-[#19e6b3] focus:outline-none focus:ring-1 focus:ring-[#19e6b3]"
                    {...register("type", { required: true })}
                  >
                    <option value="">Selecciona un tipo</option>
                    <option value="Dog">Perro</option>
                    <option value="Cat">Gato</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="breed"
                    className="block text-sm/6 text-white/50"
                  >
                    {errors.breed ? (
                      <span className="text-red-500">* Raza:</span>
                    ) : (
                      "Raza:"
                    )}
                  </label>
                  <input
                    type="text"
                    id="breed"
                    {...register("breed", {
                      required: true,
                      maxLength: 100,
                      minLength: 1,
                    })}
                    inputMode="text"
                    className="mt-1 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-white/80 focus:border-[#19e6b3] focus:outline-none focus:ring-1 focus:ring-[#19e6b3]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="age"
                    className="block text-sm/6 text-white/50"
                  >
                    {errors.age ? (
                      <span className="text-red-500">* Edad:</span>
                    ) : (
                      "Edad:"
                    )}
                  </label>
                  <input
                    type="number"
                    id="age"
                    {...register("age", { required: true, min: 0, max: 30 })}
                    inputMode="numeric"
                    min="0"
                    max="30"
                    className="mt-1 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-white/80 focus:border-[#19e6b3] focus:outline-none focus:ring-1 focus:ring-[#19e6b3]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="gender"
                    className="block text-sm/6 text-white/50"
                  >
                    {errors.gender ? (
                      <span className="text-red-500">* Género:</span>
                    ) : (
                      "Género:"
                    )}
                  </label>
                  <select
                    {...register("gender", { required: true })}
                    id="gender"
                    className="mt-1 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-white/80 focus:border-[#19e6b3] focus:outline-none focus:ring-1 focus:ring-[#19e6b3]"
                  >
                    <option value="">Selecciona un género</option>
                    <option value="Male">Macho</option>
                    <option value="Female">Hembra</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="size"
                    className="block text-sm/6 text-white/50"
                  >
                    {errors.size ? (
                      <span className="text-red-500">* Tamaño:</span>
                    ) : (
                      "Tamaño:"
                    )}
                  </label>
                  <select
                    {...register("size", { required: true })}
                    id="size"
                    className="mt-1 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-white/80 focus:border-[#19e6b3] focus:outline-none focus:ring-1 focus:ring-[#19e6b3]"
                  >
                    <option value="">Selecciona un tamaño</option>
                    <option value="Small">Pequeño</option>
                    <option value="Medium">Mediano</option>
                    <option value="Large">Grande</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="shortDescription"
                    className="block text-sm/6 text-white/50"
                  >
                    {errors.shortDescription ? (
                      <span className="text-red-500">* Descripción Corta:</span>
                    ) : (
                      "Descripción Corta:"
                    )}
                  </label>
                  <input
                    type="text"
                    id="shortDescription"
                    {...register("shortDescription", {
                      required: true,
                      maxLength: 200,
                    })}
                    className="mt-1 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-white/80 focus:border-[#19e6b3] focus:outline-none focus:ring-1 focus:ring-[#19e6b3]"
                    placeholder="Ej: Friendly and energetic"
                  />
                </div>

                <div>
                  <label
                    htmlFor="longDescription"
                    className="block text-sm/6 text-white/50"
                  >
                    {errors.longDescription ? (
                      <span className="text-red-500">
                        * Descripción Completa:
                      </span>
                    ) : (
                      "Descripción Completa:"
                    )}
                  </label>
                  <textarea
                    id="longDescription"
                    {...register("longDescription", {
                      required: true,
                      maxLength: 2000,
                    })}
                    rows={4}
                    className="mt-1 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-white/80 focus:border-[#19e6b3] focus:outline-none focus:ring-1 focus:ring-[#19e6b3]"
                    placeholder="Descripción detallada del animal..."
                  ></textarea>
                </div>

                {/* Checkboxes para características */}
                <div className="space-y-3">
                  <p className="text-sm/6 text-white/50">Características:</p>
                  <label className="flex items-center gap-2 text-white/80 cursor-pointer">
                    <input
                      type="checkbox"
                      {...register("goodWithKids")}
                      className="rounded border-white/10 bg-white/5 text-[#19e6b3] focus:ring-[#19e6b3]"
                    />
                    <span className="text-sm">Bueno con niños</span>
                  </label>
                  <label className="flex items-center gap-2 text-white/80 cursor-pointer">
                    <input
                      type="checkbox"
                      {...register("goodWithDogs")}
                      className="rounded border-white/10 bg-white/5 text-[#19e6b3] focus:ring-[#19e6b3]"
                    />
                    <span className="text-sm">Bueno con otros perros</span>
                  </label>
                  <label className="flex items-center gap-2 text-white/80 cursor-pointer">
                    <input
                      type="checkbox"
                      {...register("homeTrained")}
                      className="rounded border-white/10 bg-white/5 text-[#19e6b3] focus:ring-[#19e6b3]"
                    />
                    <span className="text-sm">Entrenado para casa</span>
                  </label>
                </div>

                <label
                  htmlFor="media"
                  className="block text-sm/6 text-white/50"
                >
                  {errors.media ? (
                    <span className="text-red-500">* Imágenes:</span>
                  ) : (
                    "Imágenes:"
                  )}
                </label>
                <div className="mt-1 w-full rounded-xl border border-dashed border-white/20 bg-white/5 p-5 text-center text-white/70">
                  <p className="text-sm font-medium">
                    Arrastra y suelta tus fotos aquí
                  </p>
                  <p className="text-xs text-white/50">
                    Formatos JPG o PNG hasta 5MB
                  </p>
                  <div className="mt-4">
                    <label
                      htmlFor="media"
                      className="inline-flex items-center gap-2 rounded-md bg-white/10 px-4 py-2 text-sm font-semibold text-white shadow-inner shadow-white/10 cursor-pointer hover:bg-white/20 focus:outline focus:outline-[#19e6b3]"
                    >
                      Seleccionar archivos
                    </label>
                    <input
                      id="media"
                      {...register("media")}
                      type="file"
                      accept="image/*"
                      multiple
                      className="sr-only"
                      onChange={handleFileChange}
                    />
                  </div>
                </div>

                {/* Previsualizaciones de imágenes */}
                {imagePreviews.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm font-medium text-white/70 mb-2">
                      Previsualizaciones ({imagePreviews.length} imagen
                      {imagePreviews.length > 1 ? "es" : ""}):
                    </p>
                    <div className="grid grid-cols-3 gap-3">
                      {imagePreviews.map((preview, index) => (
                        <div
                          key={index}
                          className="relative aspect-square rounded-lg overflow-hidden border border-white/10 bg-white/5 group"
                        >
                          <Image
                            width={100}
                            height={100}
                            src={preview}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-8 flex gap-4 justify-center">
                  <Button
                    className="inline-flex items-center gap-2 rounded-md bg-emerald-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-emerald-800 data-open:bg-emerald-800 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    type="submit"
                    disabled={createAnimalMutation.isPending}
                  >
                    {createAnimalMutation.isPending
                      ? loadingMessage || "Procesando..."
                      : "Agregar"}
                  </Button>
                  <Button
                    className="inline-flex items-center gap-2 rounded-md bg-red-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-red-800 data-open:bg-red-800 cursor-pointer"
                    onClick={handleClose}
                    type="button"
                  >
                    Cancelar
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
