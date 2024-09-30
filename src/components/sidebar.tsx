import { FileText, Upload } from "lucide-react";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { useState } from "react";
import { AddCourseDialog } from "./add-course-dialog";
import { DocumentList } from "./documents-list";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCourses } from "@/lib/query-functions";
import { useRecoilState } from "recoil";
import { selectedCourseState } from "@/lib/state";
import { Logo } from "./logo";

export const Sidebar = () => {
  const [isAddCourseDialogOpen, setIsAddCourseDialogOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] =
    useRecoilState(selectedCourseState);

  const coursesQuery = useQuery({
    queryKey: ["get-courses"],
    queryFn: getCourses,
  });

  return (
    <div className="h-dvh grid grid-rows-[auto_1fr] w-72 bg-background border-r shadow">
      <AddCourseDialog
        isOpen={isAddCourseDialogOpen}
        setIsOpen={setIsAddCourseDialogOpen}
      />
      <div className="p-4 border-b">
        <Logo />
      </div>
      <div className="p-4 flex flex-col gap-4 overflow-y-auto">
        <Select
          onValueChange={(v) => {
            if (v === "add-course") {
              setIsAddCourseDialogOpen(true);
            } else {
              setSelectedCourse(v);
            }
          }}
          value={selectedCourse}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a course" />
          </SelectTrigger>
          <SelectContent>
            {coursesQuery.data?.map((course) => (
              <SelectItem value={course.id} key={course.id}>
                {course.name}
              </SelectItem>
            ))}
            <SelectItem value="add-course">Add Course</SelectItem>
          </SelectContent>
        </Select>
        {selectedCourse && <DocumentList />}
      </div>
    </div>
  );
};
