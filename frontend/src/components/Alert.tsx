import React from "react";

export default function Alert({
  isError,
  content,
}: {
  isError?: boolean;
  content: string;
}) {
  return isError ? (
    <div className="container mb-2">
      <div className="alert alert-danger" role="alert">
        {content}
      </div>
    </div>
  ) : (
    <div className="container mb-2">
      <div className="alert alert-primary" role="alert">
        {content}
      </div>
    </div>
  );
}
