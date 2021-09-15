import React from "react";
import Link from "next/link";

function NotFound() {
  return (
    <div className="page-not-found-wrapper">
      <h1 id="title_404">404</h1>
      <h3 id="description_404">Page Not Found</h3>
      <Link href="/">Go Home</Link>
    </div>
  );
}

export default NotFound;
