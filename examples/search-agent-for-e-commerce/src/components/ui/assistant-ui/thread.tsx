import {
  ComposerPrimitive,
  MessagePrimitive,
  ThreadPrimitive,
} from "@assistant-ui/react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import React, { PropsWithChildren, type FC } from "react";
import { Button, type ButtonProps } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { ArrowDownIcon, SendHorizonalIcon } from "lucide-react";

export const Thread: FC = () => {
  return (
    <TooltipProvider>
      <ThreadPrimitive.Root className="flex h-full flex-col items-center pb-3">
        <ThreadPrimitive.Viewport className="flex w-full flex-grow flex-col items-center overflow-y-scroll scroll-smooth px-4 pt-12">
          <ThreadPrimitive.Empty>
            <ThreadEmpty />
          </ThreadPrimitive.Empty>

          <ThreadPrimitive.Messages
            components={{
              UserMessage,
              AssistantMessage,
            }}
          />
          <ThreadScrollToBottom />
        </ThreadPrimitive.Viewport>

        <Composer />
      </ThreadPrimitive.Root>
    </TooltipProvider>
  );
};

const ThreadEmpty: FC = () => {
  return (
    <div className="flex w-full max-w-2xl grow flex-col justify-end px-4 py-6">
      {" "}
      {/* Stick to bottom */}
      <div className="mb-1 flex flex-grow flex-col items-center justify-center">
        {" "}
        {/* Reduced margin-bottom */}
        <img
          src="/image.png"
          alt="Your Logo"
          className="mb-4 w-1/2 max-w-xs"
        />{" "}
        {/* Smaller image */}
        <div className="flex items-center">
          <Avatar className="mr-4" style={{ width: "20px", height: "20px" }}>
            {" "}
            {/* Adjusted size */}
            <AvatarImage src="/favicon.ico" alt="AI" />
            <AvatarFallback>AI</AvatarFallback>
          </Avatar>
          <p className="mt-4">
            Hi, do you know what product you are looking for, or you have a
            general question?
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-4 self-stretch sm:flex-row">
        <ThreadSuggestion prompt="I need help with product search">
          <p className="mb-2 font-semibold">Product search</p>
        </ThreadSuggestion>
        <ThreadSuggestion prompt="I need to talk to human agent support">
          <p className="mb-2 font-semibold">Human agent</p>
        </ThreadSuggestion>
      </div>
    </div>
  );
};

const ThreadSuggestion: FC<PropsWithChildren<{ prompt: string }>> = ({
  prompt,
  children,
}) => {
  return (
    <ThreadPrimitive.Suggestion
      prompt={prompt}
      method="replace"
      autoSend
      asChild
    >
      <Button
        variant="outline"
        className="text-md flex h-full items-center justify-center sm:basis-full"
      >
        {children}
      </Button>
    </ThreadPrimitive.Suggestion>
  );
};

const ThreadScrollToBottom: FC = () => {
  return (
    <div className="sticky bottom-0">
      <ThreadPrimitive.ScrollToBottom asChild>
        <IconButton
          tooltip="Scroll to bottom"
          variant="outline"
          className="absolute -top-10 rounded-full disabled:invisible"
        >
          <ArrowDownIcon className="size-4" />
        </IconButton>
      </ThreadPrimitive.ScrollToBottom>
    </div>
  );
};

const Composer: FC = () => {
  return (
    <ComposerPrimitive.Root className="flex w-[calc(100%-32px)] max-w-[40rem] items-end rounded-lg border p-0.5 transition-shadow focus-within:shadow-sm">
      <ComposerPrimitive.Input
        placeholder="Write a message..."
        className="placeholder:text-foreground/50 h-12 max-h-40 flex-grow resize-none bg-transparent p-3.5 text-sm outline-none"
      />
      <ComposerPrimitive.Send className="bg-foreground m-2 flex h-8 w-8 items-center justify-center rounded-md text-2xl font-bold shadow transition-opacity disabled:opacity-10">
        <SendHorizonalIcon className="text-background size-4" />
      </ComposerPrimitive.Send>
    </ComposerPrimitive.Root>
  );
};

const UserMessage: FC = () => {
  return (
    <MessagePrimitive.Root className="relative flex w-full max-w-2xl gap-3 pb-6">
      {/* OPTIONALLY YOU CAN ADD AVATARS OF THE ASSISTANT */}
      {/* <Avatar>
        <AvatarFallback>Y</AvatarFallback>
      </Avatar> */}

      <div className="flex-grow">
        {/* <p className="font-semibold">You</p> */}

        <div className="rounded-full bg-gray-800 p-4 text-white">
          <p className="whitespace-pre-line">
            <MessagePrimitive.Content />
          </p>
        </div>
      </div>
    </MessagePrimitive.Root>
  );
};

const AssistantMessage: FC = () => {
  return (
    <MessagePrimitive.Root className="relative flex w-full max-w-2xl gap-3 pb-6">
      {/* OPTIONALLY YOU CAN ADD AVATARS OF THE USER */}
      {/* <Avatar>
        <AvatarFallback>A</AvatarFallback>
      </Avatar> */}

      <div className="flex-grow">
        {/* <p className="font-semibold">Assistant</p> */}

        <p className="text-foreground whitespace-pre-line">
          <MessagePrimitive.Content />
        </p>
      </div>
    </MessagePrimitive.Root>
  );
};

type IconButton = ButtonProps & { tooltip: string };

const IconButton: FC<IconButton> = ({
  children,
  tooltip,
  className,
  ...rest
}) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn("size-auto p-1", className)}
          {...rest}
        >
          {children}
          <span className="sr-only">{tooltip}</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent side="bottom">{tooltip}</TooltipContent>
    </Tooltip>
  );
};
