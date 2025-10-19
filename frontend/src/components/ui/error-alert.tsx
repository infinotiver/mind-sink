import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemHeader,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { FiAlertCircle } from "react-icons/fi";

interface ErrorAlertProps {
  title?: string;
  message?: string;
  details?: string | null;
}

export default function ErrorAlert({
  title = "Error",
  message = "Something went wrong.",
  details = null,
}: ErrorAlertProps) {
  return (
    <Item
      variant={"outline"}
      className="flex items-center justify-center text-center gap-4 p-4"
    >
      <ItemMedia>
        <FiAlertCircle className="w-6 h-6 text-destructive" />
      </ItemMedia>

      <div className="flex flex-col items-center justify-center">
        <ItemHeader className="p-0">
          <ItemTitle>{title}</ItemTitle>
          <ItemDescription className="text-sm">{message}</ItemDescription>
        </ItemHeader>

        {details && (
          <ItemContent className="mt-2 p-0 w-full">
            <pre className="text-xs text-muted-foreground whitespace-pre-wrap mx-auto">
              {details}
            </pre>
          </ItemContent>
        )}

        <ItemActions className="self-center mt-2">
          {/* Add action buttons here if needed */}
        </ItemActions>
      </div>

      <ItemFooter className="hidden" />
    </Item>
  );
}