import {
  QueryObserver,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";

function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: checkin, isLoading: isCheckingIn } = useMutation({
    mutationFn: ({ bookingId, breakfast }) =>
      updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
        ...breakfast,
      }),
    onSuccess: (data) => {
      toast.success(`booking #${data.id} sucessfully checkin in`);
      queryClient.invalidateQueries({ active: true });
      navigate("/");
    },

    onError: () => toast.error("There was an error while checking in"),
  });
  return { checkin, isCheckingIn };
}

export default useCheckin;
