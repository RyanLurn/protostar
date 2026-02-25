import {
  TriangleAlertIcon,
  CircleCheckIcon,
  OctagonXIcon,
  Loader2Icon,
  InfoIcon,
} from "lucide-react";
import { Toaster as Sonner, type ToasterProps } from "sonner";

import { useTheme } from "@/components/providers/theme";

function Toaster({ ...props }: ToasterProps) {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      icons={{
        loading: <Loader2Icon className="size-4 animate-spin" />,
        warning: <TriangleAlertIcon className="size-4" />,
        success: <CircleCheckIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
      }}
      style={
        {
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)",
          "--normal-bg": "var(--popover)",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast: "cn-toast",
        },
      }}
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      {...props}
    />
  );
}

export { Toaster };
