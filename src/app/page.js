'use client'

import { Suspense } from "react";
import HomePage from "./home/Homepage";


export default function Page() {
  return (
    <Suspense fallback={<div className="text-center mt-10">Loading...</div>}>
      <HomePage />
    </Suspense>
  );
}