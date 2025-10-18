import React from "react";

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
    <div className="p-4 bg-red-100 text-red-800 rounded-md">
      <h2 className="text-lg font-bold">{title}</h2>
      <p className="mt-2">{message}</p>
      {details && <pre className="mt-2 text-sm text-red-700">{details}</pre>}
    </div>
  );
}
