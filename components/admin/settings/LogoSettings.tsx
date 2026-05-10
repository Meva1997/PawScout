"use client";

import { useEffect, useState, useRef } from "react";
import {
  uploadLogoAction,
  getLogoAction,
} from "@/actions/settings/logo-action";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface LogoSettingsProps {
  onMessage?: (
    message: {
      type: "success" | "error" | "info";
      text: string;
    } | null,
  ) => void;
}

export default function LogoSettings({ onMessage }: LogoSettingsProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploadingLogo, setIsUploadingLogo] = useState(false);
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch current logo on mount
    const fetchLogo = async () => {
      const logoResult = await getLogoAction();
      if (logoResult.success && logoResult.logo_url) {
        setLogoUrl(logoResult.logo_url);
      }
      setIsLoading(false);
    };
    fetchLogo();
  }, []);

  const handleLogoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (!validTypes.includes(file.type)) {
      onMessage?.({
        type: "error",
        text: "Invalid file format. Use JPG, PNG, GIF, or WebP",
      });
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      onMessage?.({
        type: "error",
        text: "File is too large. Maximum 5MB.",
      });
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setLogoPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Upload immediately
    handleLogoUpload(file);
  };

  const handleLogoUpload = async (file: File) => {
    setIsUploadingLogo(true);
    onMessage?.(null);

    const formData = new FormData();
    formData.append("file", file);

    const result = await uploadLogoAction(formData);

    if (result.success) {
      setLogoUrl(result.logo_url || null);
      setLogoPreview(null);
      onMessage?.({
        type: "success",
        text: result.message || "Logo uploaded successfully",
      });

      // Clear success message after 3 seconds
      setTimeout(() => {
        onMessage?.(null);
      }, 3000);

      router.refresh();
    } else {
      setLogoPreview(null);
      onMessage?.({
        type: "error",
        text: result.error || "Error uploading logo",
      });
    }

    setIsUploadingLogo(false);

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  if (isLoading) {
    return (
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="relative w-48 h-48 rounded-lg overflow-hidden border border-white/10 bg-white/5 flex items-center justify-center">
            <div className="animate-pulse text-white/50">Loading...</div>
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-white text-lg font-medium">Shelter Logo</p>
          <span className="text-white/70 text-sm">
            This logo represents the shelter&apos;s visual identity and will appear on
            all public pages.
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-4">
        {/* Current Logo or Preview */}
        <div className="relative w-48 h-48 rounded-lg overflow-hidden border border-white/10 bg-white/5 flex items-center justify-center">
          {logoPreview || logoUrl ? (
            <>
              <Image
                src={logoPreview || logoUrl || ""}
                alt="Shelter logo"
                fill
                className="object-contain p-2"
              />
              {isUploadingLogo && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
                </div>
              )}
            </>
          ) : (
            <div className="text-center p-4">
              <svg
                className="mx-auto h-12 w-12 text-white/30"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p className="mt-2 text-xs text-white/50">No logo</p>
            </div>
          )}
        </div>

        {/* Upload Button */}
        <div>
          <input
            ref={fileInputRef}
            type="file"
            id="logo_upload"
            accept="image/jpeg,image/png,image/gif,image/webp"
            onChange={handleLogoSelect}
            className="hidden"
            disabled={isUploadingLogo}
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploadingLogo}
            className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition cursor-pointer font-medium disabled:opacity-50 disabled:cursor-not-allowed border border-white/10"
          >
            {isUploadingLogo
              ? "Uploading..."
              : logoUrl
                ? "Change logo"
                : "Upload logo"}
          </button>
          <p className="text-xs text-white/50 mt-2">
            JPG, PNG, GIF or WebP. Maximum 5MB.
          </p>
        </div>
      </div>
      <div className="space-y-2">
        <p className="text-white text-lg font-medium">Shelter Logo</p>
        <span className="text-white/70 text-sm">
          This logo represents the shelter&apos;s visual identity and will appear on
          all public pages.
        </span>
      </div>
    </div>
  );
}
