import { selectedCourseState } from "@/lib/state";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

export const UploadinFile = ({
  file,
  onCompleted,
}: {
  file: File;
  onCompleted: () => void;
}) => {
  const [selectedCourse] = useRecoilState(selectedCourseState);
  const [, setUploadProgress] = useState<number>(0);
  const upload = async () => {
    if (!file) return;

    const base64 = await new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result as string);
      };
      reader.readAsDataURL(file as Blob);
    });

    await axios.post(
      import.meta.env.VITE_API_BASE + "/document/upload",
      {
        name: file.name,
        content: base64,
        courseId: selectedCourse,
      },
      {
        onUploadProgress: (progressEvent) => {
          setUploadProgress(
            Math.round(
              (progressEvent.loaded / (progressEvent.total || 0)) * 100
            )
          );
        },
      }
    );

    onCompleted();
  };

  useEffect(() => {
    upload();
  }, []);

  return (
    <div className="flex gap-2 items-center">
      <div className="aspect-square rounded-sm h-8 w-8 border flex items-center justify-center">
        <Loader2 size={18} className="animate-spin" />
      </div>
      <p className="text-foreground/70 text-sm flex-1">{file.name}</p>
    </div>
  );
};
