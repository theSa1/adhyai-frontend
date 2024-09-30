import { ChatTextbox } from "@/components/chat-textbox";
import { messagesState, selectedCourseState } from "@/lib/state";
import { cn } from "@/lib/utils";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useChat } from "ai/react";
import { useEffect } from "react";
import Markdown from "react-markdown";
import { useRecoilState } from "recoil";

const Page = () => {
  const [selectedCourse] = useRecoilState(selectedCourseState);
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    data,
    isLoading,
    setMessages,
  } = useChat({
    api: import.meta.env.VITE_API_BASE + "/chat/send",
    body: {
      courseId: selectedCourse!,
    },
  }) as Omit<ReturnType<typeof useChat>, "data"> & {
    data: {
      type: "quiz";
      data: {
        quizId: string;
      };
    }[];
  };

  const [messagesStatee, setMessagesState] = useRecoilState(messagesState);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) return;
    setMessagesState((prev) => {
      return {
        ...prev,
        [selectedCourse!]: messages,
      };
    });
  }, [messages]);

  useEffect(() => {
    if (
      messages.length === 0 &&
      (messagesStatee[selectedCourse!]?.length ?? 0) > 0
    ) {
      setMessages(messagesStatee[selectedCourse!]);
    }
  }, [messagesStatee]);

  useEffect(() => {
    if (isLoading) return;
    if (messagesStatee[selectedCourse!]) {
      setMessages(messagesStatee[selectedCourse!]);
    } else {
      setMessages([]);
    }
  }, [selectedCourse]);

  useEffect(() => {
    if (data) {
      data.forEach((d) => {
        if (d.type === "quiz") {
          navigate({
            to: "/quiz/$quizId",
            params: { quizId: d.data.quizId },
          });
        }
      });
    }
  }, [data]);

  return (
    <>
      <div className="gap-3 flex py-4 flex-col justify-end w-[42rem] mx-auto pb-28 pt-20">
        {messages
          .filter(
            (message) =>
              (message.role === "assistant" || message.role === "user") &&
              !message.toolInvocations
          )
          .map((message, i) => (
            <div className="relative" key={message.id}>
              <Markdown
                key={message.id}
                className={cn(
                  "w-fit max-w-[90%] px-3 py-2 rounded-md prose dark:prose-invert",
                  {
                    "bg-slate-800 text-slate-50 ml-auto":
                      message.role === "user",
                    "bg-secondary text-secondary-foreground border":
                      message.role === "assistant",
                    "animate-pulse":
                      isLoading &&
                      message.role === "assistant" &&
                      i === messages.length - 1,
                  }
                )}
              >
                {message.content}
              </Markdown>
            </div>
          ))}
      </div>
      <ChatTextbox
        input={input}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        reset={() => setMessages([])}
        isLoading={isLoading}
      />
    </>
  );
};

export const Route = createFileRoute("/_app/chat/")({
  component: Page,
});
