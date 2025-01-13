import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getBookings } from "../../services/apiBookings";
import { PAGE_SIZE } from "../../utils/constant";

export function useBookings() {
  const queryClient = useQueryClient()
  const [searchParams] = useSearchParams();

  //Fiter
  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };
  // { field: "totalPrice", value: 3000, method: "gte" };

  //Sort
  const sortByRaw = searchParams.get("sortBy") || "startDate-desc";

  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };

  //PAGINATION
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  //query
  const {
    isLoading,
    data: { data: bookings, count } = {},
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

//Pre-Fetching
const pageCount = Math.ceil(count / PAGE_SIZE)

if(page < pageCount)
queryClient.prefetchQuery({
  queryKey: ["bookings", filter, sortBy, page+1],
  queryFn: () => getBookings({ filter, sortBy,page: page+1 }),
})


if(page > 1)
  queryClient.prefetchQuery({
    queryKey: ["bookings", filter, sortBy, page-1],
    queryFn: () => getBookings({ filter, sortBy,page: page-1 }),
  })
  
  return { isLoading, error, bookings, count };
}
