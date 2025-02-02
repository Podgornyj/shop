"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { getQueryClient } from "./utils/queryClient";

getQueryClient

export function QueryProvider({ children }: { children: React.ReactNode }) {
    const [queryClient] = useState(() => getQueryClient());

    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
