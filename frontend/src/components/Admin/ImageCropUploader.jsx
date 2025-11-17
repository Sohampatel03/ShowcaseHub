import "react-image-crop/dist/ReactCrop.css";
import { useState, useRef, useCallback } from "react";
import ReactCrop, { centerCrop, makeAspectCrop } from "react-image-crop";

function centerAspectCrop(mediaWidth, mediaHeight, aspect) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: "%",
        width: 80,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
}

const ImageCropUploader = ({ label = "Image", aspect = 9 / 7, onCroppedFile }) => {
  const [imgSrc, setImgSrc] = useState("");
  const [crop, setCrop] = useState();
  const imgRef = useRef(null);

  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImgSrc(reader.result.toString() || "");
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onImageLoad = useCallback((e) => {
    const { width, height } = e.currentTarget;
    setCrop(centerAspectCrop(width, height, aspect));
  }, [aspect]);

  const generateCroppedImage = async () => {
    if (!imgRef.current || !crop?.width || !crop?.height) return;

    const image = imgRef.current;
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    const pixelRatio = window.devicePixelRatio || 1;

    canvas.width = Math.floor(crop.width * scaleX * pixelRatio);
    canvas.height = Math.floor(crop.height * scaleY * pixelRatio);

    const ctx = canvas.getContext("2d");
    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = "high";

    const cropX = crop.x * scaleX;
    const cropY = crop.y * scaleY;

    ctx.drawImage(
      image,
      cropX,
      cropY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * scaleX,
      crop.height * scaleY
    );

    return new Promise((resolve) => {
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            console.error("Canvas is empty");
            return;
          }
          const file = new File([blob], "cropped-image.jpg", {
            type: "image/jpeg",
          });
          resolve(file);
        },
        "image/jpeg",
        0.9
      );
    });
  };

  const handleConfirm = async () => {
    const file = await generateCroppedImage();
    if (file && onCroppedFile) {
      onCroppedFile(file);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium">{label}</label>
      <input type="file" accept="image/*" onChange={onSelectFile} />
      {imgSrc && (
        <div className="mt-3">
          <ReactCrop
            crop={crop}
            onChange={(c) => setCrop(c)}
            aspect={aspect}
            circularCrop={false}
          >
            <img
              ref={imgRef}
              src={imgSrc}
              alt="Crop"
              onLoad={onImageLoad}
              className="max-h-64"
            />
          </ReactCrop>
          <button
            type="button"
            onClick={handleConfirm}
            className="mt-2 px-4 py-1 rounded-full bg-blue-600 text-white text-xs"
          >
            Use Cropped Image
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageCropUploader;
