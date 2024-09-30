import { Message } from "ai";
import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const selectedCourseState = atom<string | undefined>({
  key: "selectedCourse",
  default: undefined,
  effects_UNSTABLE: [persistAtom],
});

export const messagesState = atom<{
  [courseId: string]: Message[];
}>({
  key: "messages",
  default: {},
  effects_UNSTABLE: [persistAtom],
});
