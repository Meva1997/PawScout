"use client";

import { useState, useEffect, useMemo } from "react";
import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import {
  createAnimal,
  uploadMultipleImages,
  updateAnimal,
  deleteImage,
} from "@/api/api";
import type { CreateAnimalFormData } from "@/schemas/dashboard-schema";
import type { DogsDataType } from "@/db/dogs";
import Image from "next/image";

type NewPetFormProps = {
  isOpen: boolean;
  onCloseAction: () => void;
  token: string;
  animalToEdit?: DogsDataType | null;
};

export default function NewPetForm({
  isOpen,
  onCloseAction,
  token,
  animalToEdit,
}: NewPetFormProps) {
  const queryClient = useQueryClient();
  const [loadingMessage, setLoadingMessage] = useState("");
  const [newImagePreviews, setNewImagePreviews] = useState<string[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [deletedImagePublicIds, setDeletedImagePublicIds] = useState<string[]>(
    [],
  );

  const isEditMode = !!animalToEdit;

  // Memoizar las previsualizaciones existentes del animal a editar (sin las eliminadas)
  const existingImagePreviews = useMemo(() => {
    const allMedia = animalToEdit?.media || [];
    return allMedia
      .filter((m) => !deletedImagePublicIds.includes(m.public_id))
      .map((m) => m.url);
  }, [animalToEdit, deletedImagePublicIds]);

  // Combinar previsualizaciones existentes con las nuevas
  const imagePreviews = useMemo(() => {
    return [...existingImagePreviews, ...newImagePreviews];
  }, [existingImagePreviews, newImagePreviews]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
    reset,
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

  // Pre-llenar formulario cuando es modo edición
  useEffect(() => {
    if (isEditMode && animalToEdit) {
      reset({
        name: animalToEdit.name,
        type: animalToEdit.type,
        breed: animalToEdit.breed,
        age: animalToEdit.age,
        gender: animalToEdit.gender,
        size: animalToEdit.size,
        shortDescription: animalToEdit.shortDescription,
        longDescription: animalToEdit.longDescription,
        goodWithKids: animalToEdit.goodWithKids,
        goodWithDogs: animalToEdit.goodWithDogs,
        homeTrained: animalToEdit.homeTrained,
        availableForAdoption: animalToEdit.availableForAdoption,
        media: undefined,
      });
    } else {
      // Resetear cuando no hay animal a editar
      reset({
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
      });
    }
  }, [isEditMode, animalToEdit, reset]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    // Agregar nuevos archivos a los existentes
    const newFiles = Array.from(files);
    const updatedFiles = [...selectedFiles, ...newFiles];
    setSelectedFiles(updatedFiles);

    // Crear previsualizaciones solo para los nuevos archivos
    const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
    setNewImagePreviews((prev) => [...prev, ...newPreviews]);

    // Limpiar el error de media si hay archivos seleccionados
    if (updatedFiles.length > 0) {
      clearErrors("media");
    }

    // Limpiar el input para permitir seleccionar el mismo archivo de nuevo
    event.target.value = "";
  };

  const removeImage = async (index: number) => {
    // Verificar si es una imagen existente o nueva
    const existingCount = existingImagePreviews.length;

    if (index < existingCount) {
      // Es una imagen existente del servidor
      if (!isEditMode || !animalToEdit?.media) return;

      // Encontrar la imagen original que corresponde al índice en las previsualizaciones filtradas
      const filteredMedia = animalToEdit.media.filter(
        (m) => !deletedImagePublicIds.includes(m.public_id),
      );
      const imageToDelete = filteredMedia[index];

      if (!imageToDelete) return;

      try {
        setLoadingMessage("Deleting image...");
        await deleteImage(
          token,
          imageToDelete.public_id,
          imageToDelete.resource_type,
        );

        // Agregar a la lista de eliminadas para filtrarla de la UI
        setDeletedImagePublicIds((prev) => [...prev, imageToDelete.public_id]);
        setLoadingMessage("");
      } catch (error) {
        console.error("Error eliminando imagen:", error);
        setLoadingMessage("");
        alert("Error deleting image. Please try again.");
      }
      return;
    }

    // Es una imagen nueva, la removemos solo del estado local
    const newImageIndex = index - existingCount;

    // Remover archivo
    const updatedFiles = selectedFiles.filter((_, i) => i !== newImageIndex);
    setSelectedFiles(updatedFiles);

    // Limpiar y actualizar previsualizaciones
    URL.revokeObjectURL(newImagePreviews[newImageIndex]);
    const updatedPreviews = newImagePreviews.filter(
      (_, i) => i !== newImageIndex,
    );
    setNewImagePreviews(updatedPreviews);
  };

  function handleClose() {
    // Limpiar previsualizaciones al cerrar (solo las blob URLs nuevas)
    newImagePreviews.forEach((url) => URL.revokeObjectURL(url));
    setNewImagePreviews([]);
    setSelectedFiles([]);
    setDeletedImagePublicIds([]);
    reset();
    onCloseAction();
  }

  const createAnimalMutation = useMutation({
    mutationFn: async (data: CreateAnimalFormData) => {
      // Paso 1: Subir las imágenes nuevas si hay
      let mediaUrls: Array<{
        url: string;
        public_id: string;
        resource_type: string;
      }> = [];

      // En modo edición, mantener solo las imágenes existentes que no fueron eliminadas
      if (isEditMode && animalToEdit?.media) {
        mediaUrls = animalToEdit.media.filter(
          (m) => !deletedImagePublicIds.includes(m.public_id),
        );
      }

      // Agregar las nuevas imágenes subidas
      if (selectedFiles.length > 0) {
        setLoadingMessage(`Uploading ${selectedFiles.length} image(s)...`);
        const dataTransfer = new DataTransfer();
        selectedFiles.forEach((file) => dataTransfer.items.add(file));
        const uploadedMedia = await uploadMultipleImages(
          token,
          dataTransfer.files,
        );
        mediaUrls = [...mediaUrls, ...uploadedMedia];
      }

      // Paso 2: Crear o actualizar el animal
      setLoadingMessage(
        isEditMode ? "Updating animal..." : "Creating animal...",
      );
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
        availableForAdoption: data.availableForAdoption,
        media: mediaUrls.length > 0 ? mediaUrls : undefined,
      };

      return isEditMode
        ? await updateAnimal(token, animalToEdit!.id, animalData)
        : await createAnimal(token, animalData);
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
    // Validar que haya al menos una imagen (existente o nueva)
    const hasExistingImages =
      isEditMode && animalToEdit?.media && animalToEdit.media.length > 0;
    const hasNewImages = selectedFiles.length > 0;

    if (!hasExistingImages && !hasNewImages) {
      setError("media", {
        type: "manual",
        message: "You must select at least one image",
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
                {isEditMode ? "Edit Animal" : "Add New Animal"}{" "}
                {Object.keys(errors).length > 0 && (
                  <span className="text-red-500">
                    {" "}
                    - Please fix the errors{" "}
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
                      <span className="text-red-500">* Name:</span>
                    ) : (
                      "Name:"
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
                      <span className="text-red-500">* Animal Type:</span>
                    ) : (
                      "Animal Type:"
                    )}
                  </label>
                  <select
                    id="type"
                    className="mt-1 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-white/80 focus:border-[#19e6b3] focus:outline-none focus:ring-1 focus:ring-[#19e6b3]"
                    {...register("type", { required: true })}
                  >
                    <option value="">Select a type</option>
                    <option value="Dog">Dog</option>
                    <option value="Cat">Cat</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="breed"
                    className="block text-sm/6 text-white/50"
                  >
                    {errors.breed ? (
                      <span className="text-red-500">* Breed:</span>
                    ) : (
                      "Breed:"
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
                      <span className="text-red-500">* Age:</span>
                    ) : (
                      "Age:"
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
                      <span className="text-red-500">* Gender:</span>
                    ) : (
                      "Gender:"
                    )}
                  </label>
                  <select
                    {...register("gender", { required: true })}
                    id="gender"
                    className="mt-1 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-white/80 focus:border-[#19e6b3] focus:outline-none focus:ring-1 focus:ring-[#19e6b3]"
                  >
                    <option value="">Select a gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="size"
                    className="block text-sm/6 text-white/50"
                  >
                    {errors.size ? (
                      <span className="text-red-500">* Size:</span>
                    ) : (
                      "Size:"
                    )}
                  </label>
                  <select
                    {...register("size", { required: true })}
                    id="size"
                    className="mt-1 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-white/80 focus:border-[#19e6b3] focus:outline-none focus:ring-1 focus:ring-[#19e6b3]"
                  >
                    <option value="">Select a size</option>
                    <option value="Small">Small</option>
                    <option value="Medium">Medium</option>
                    <option value="Large">Large</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="shortDescription"
                    className="block text-sm/6 text-white/50"
                  >
                    {errors.shortDescription ? (
                      <span className="text-red-500">* Short Description:</span>
                    ) : (
                      "Short Description:"
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
                        * Full Description:
                      </span>
                    ) : (
                      "Full Description:"
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
                    placeholder="Detailed animal description..."
                  ></textarea>
                </div>

                <div>
                  <label
                    htmlFor="availableForAdoption"
                    className="block text-sm/6 text-white/50"
                  >
                    {errors.availableForAdoption ? (
                      <span className="text-red-500">
                        * Adoption Status:
                      </span>
                    ) : (
                      "Adoption Status:"
                    )}
                  </label>
                  <select
                    {...register("availableForAdoption", { required: true })}
                    id="availableForAdoption"
                    className="mt-1 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-white/80 focus:border-[#19e6b3] focus:outline-none focus:ring-1 focus:ring-[#19e6b3]"
                  >
                    <option value="">Select a status</option>
                    <option value="available">Available</option>
                    <option value="adopted">Adopted</option>
                    <option value="pending">Pending</option>
                  </select>
                </div>

                {/* Checkboxes para características */}
                <div className="space-y-3">
                  <p className="text-sm/6 text-white/50">Characteristics:</p>
                  <label className="flex items-center gap-2 text-white/80 cursor-pointer">
                    <input
                      type="checkbox"
                      {...register("goodWithKids")}
                      className="rounded border-white/10 bg-white/5 text-[#19e6b3] focus:ring-[#19e6b3]"
                    />
                    <span className="text-sm">Good with kids</span>
                  </label>
                  <label className="flex items-center gap-2 text-white/80 cursor-pointer">
                    <input
                      type="checkbox"
                      {...register("goodWithDogs")}
                      className="rounded border-white/10 bg-white/5 text-[#19e6b3] focus:ring-[#19e6b3]"
                    />
                    <span className="text-sm">Good with other dogs</span>
                  </label>
                  <label className="flex items-center gap-2 text-white/80 cursor-pointer">
                    <input
                      type="checkbox"
                      {...register("homeTrained")}
                      className="rounded border-white/10 bg-white/5 text-[#19e6b3] focus:ring-[#19e6b3]"
                    />
                    <span className="text-sm">House trained</span>
                  </label>
                </div>

                <label
                  htmlFor="media"
                  className="block text-sm/6 text-white/50"
                >
                  {errors.media ? (
                    <span className="text-red-500">* Images:</span>
                  ) : (
                    "Images:"
                  )}
                </label>
                <div className="mt-1 w-full rounded-xl border border-dashed border-white/20 bg-white/5 p-5 text-center text-white/70">
                  <p className="text-sm font-medium">
                    Drag and drop your photos here
                  </p>
                  <p className="text-xs text-white/50">
                    JPG or PNG formats up to 5MB
                  </p>
                  <div className="mt-4">
                    <label
                      htmlFor="media"
                      className="inline-flex items-center gap-2 rounded-md bg-white/10 px-4 py-2 text-sm font-semibold text-white shadow-inner shadow-white/10 cursor-pointer hover:bg-white/20 focus:outline focus:outline-[#19e6b3]"
                    >
                      Select files
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
                      Previews ({imagePreviews.length} image
                      {imagePreviews.length > 1 ? "s" : ""}):
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
                      ? loadingMessage || "Processing..."
                      : isEditMode
                        ? "Update"
                        : "Add"}
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
