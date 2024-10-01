import { FileText, Upload } from "lucide-react";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { useCallback, useEffect, useState } from "react";
import { UploadinFile } from "./uploading-file";
import { useQuery } from "@tanstack/react-query";
import { useRecoilState } from "recoil";
import { selectedCourseState } from "@/lib/state";
import { getFiles } from "@/lib/query-functions";
import { useDropzone } from "react-dropzone";
import { nanoid } from "nanoid";
import { useAuth } from "@clerk/clerk-react";

const fileTypes = ["PDF"];

export const DocumentList = () => {
  const [selectedCourse] = useRecoilState(selectedCourseState);
  const { getToken } = useAuth();
  const [uploadingFiles, setUploadingFiles] = useState<
    {
      id: string;
      file: File;
    }[]
  >([]);
  const filesQuery = useQuery({
    queryKey: ["files", selectedCourse],
    queryFn: () => getFiles({ courseId: selectedCourse!, getToken }),
  });

  const onDrop = useCallback(async (files: File[]) => {
    setUploadingFiles((prev) => [
      ...prev,
      ...files.map((file) => ({ file, id: nanoid() })),
    ]);
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <>
      <div className="flex flex-col gap-3 mt-2">
        <Label>Files</Label>
        {filesQuery.data?.map((file) => (
          <div className="flex gap-2 items-center" key={file.id}>
            <div className="aspect-square rounded-sm h-8 w-8 border flex items-center justify-center">
              <FileText size={18} />
            </div>
            <p className="text-foreground/70 text-sm flex-1">{file.name}</p>
          </div>
        ))}
        {filesQuery.data?.length === 0 && (
          <p className="text-foreground/70 text-sm">No files available</p>
        )}
        {uploadingFiles.map((file, i) => (
          <UploadinFile
            key={file.id}
            file={file.file}
            onCompleted={() => {
              setUploadingFiles((prev) =>
                prev.filter((_, index) => index !== i)
              );
              filesQuery.refetch();
            }}
          />
        ))}
      </div>
      <div
        {...getRootProps()}
        className="flex flex-col gap-1 items-center justify-center text-sm rounded-md border border-dashed text-foreground/60 px-2 py-10"
      >
        <input {...getInputProps()} />
        <Upload size={30} />
        <p>Drag and drop your files here</p>
      </div>
    </>
  );
};
