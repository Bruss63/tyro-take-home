import { QueryClient } from "@tanstack/query-core";
import { QueryKey } from "@tanstack/query-core";
import { useHydrateAtoms } from "jotai/utils";
import { queryClientAtom } from "jotai-tanstack-query";

export const HydrateQueries = ({
  queries,
  children,
}: {
  queries: [QueryKey, unknown][];
  children: React.ReactNode;
}) => {
  const queryClient = new QueryClient();
  queries.forEach(([key, value]) => {
    queryClient.setQueryData(key, value);
  });

  useHydrateAtoms([[queryClientAtom, queryClient]]);
  return children;
};
