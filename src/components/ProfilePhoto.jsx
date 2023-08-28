import React, { useState, useEffect } from "react";
import { supabase } from "../supabase";

function ProfilePhoto({ setFoto, nickname }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState("");

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const resizeImage = (file, maxWidth, maxHeight) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = window.URL.createObjectURL(file);
      img.onload = () => {
        window.URL.revokeObjectURL(img.src);
        let width = img.width;
        let height = img.height;
        let aspectRatio = width / height;

        if (width > maxWidth) {
          width = maxWidth;
          height = width / aspectRatio;
        }
        if (height > maxHeight) {
          height = maxHeight;
          width = height * aspectRatio;
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob((blob) => {
          resolve(blob);
        }, file.type);
      };
    });
  };

  useEffect(() => {
    const handleUpload = async () => {
      if (selectedFile) {
        const resizedFile = await resizeImage(selectedFile, 800, 800);
        const fileNameExt = selectedFile.name.split(".")[1];
        const fileName = `${Date.now()}.${fileNameExt}`;

        try {
          const { data, error } = await supabase.storage
            .from("Photos")
            .upload(fileName, resizedFile, {
              cacheControl: "3600",
              upsert: false,
            });

          setUploadedFiles(data.path);
          setFoto(data.path);

          if (error) {
            console.error("Error uploading file:", error.message);
          } else {
            console.log("File uploaded successfully:", data);
          }
        } catch (error) {
          console.error("Error uploading file:", error.message);
        }
      }
    };

    handleUpload();
  }, [selectedFile, setFoto]);

  return (
    <div className="w-full flex flex-col items-center">
      <label
        className="h-32 w-32 rounded-full bg-cover bg-center bg-gray-200 mb-10"
        style={{
          backgroundImage: uploadedFiles
            ? `url(https://nkbchoashjdmtmocitad.supabase.co/storage/v1/object/public/Photos/${uploadedFiles})`
            : null,
        }}
        htmlFor="file-input"
      ></label>
      <input
        type="file"
        id="file-input"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </div>
  );
}

export default ProfilePhoto;
