import styled from "styled-components";
import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
import relativeTime from "dayjs/plugin/relativeTime";
import Menus from "../../ui/Menus";
import {HiEye} from "react-icons/hi2";
import Tag from "../../ui/Tag";
import Table from "../../ui/Table";
import PropTypes from "prop-types";

import { formatCurrency } from "../../utils/helpers";
import {  useNavigate } from "react-router";

dayjs.extend(isToday);
dayjs.extend(relativeTime);

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

function BookingRow({
  booking: {
    id: bookingId,
    created_at,
    startDate,
    endDate,
    numNights,
    numGuests,
    totalPrice,
    status,
    guests: { fullName: guestName, email },
    cabins: { name: cabinName },
  },
}) {

  const navigate = useNavigate()

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  // Debugging: Log the dates
  console.log("startDate:", startDate);
  console.log("endDate:", endDate);

  // Ensure the dates are valid Date objects
  const parsedStartDate = dayjs(startDate);
  const parsedEndDate = dayjs(endDate);

  return (
    <Table.Row>
      <Cabin>{cabinName}</Cabin>

      <Stacked>
        <span>{guestName}</span>
        <span>{email}</span>
      </Stacked>

      <Stacked>
        <span>
          {parsedStartDate.isToday()
            ? "Today"
            : dayjs(parsedStartDate).fromNow()}{" "}
          &rarr; {numNights} night stay
        </span>
        <span>
          {parsedStartDate.format("MMM DD YYYY")} &mdash;{" "}
          {parsedEndDate.format("MMM DD YYYY")}
        </span>
      </Stacked>

      <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>

      
    <Amount>{formatCurrency(totalPrice)}</Amount>

    <Menus.Menu>
      <Menus.Toggle id={bookingId}/>
      <Menus.List id={bookingId}>
        <Menus.Button icon={<HiEye />}  onClick={() => navigate(`/bookings/${bookingId}`)}>
        see details</Menus.Button>
      </Menus.List>
    </Menus.Menu>
    </Table.Row>
  );
}

BookingRow.propTypes = {
  booking: PropTypes.shape({
    id: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
    numNights: PropTypes.number.isRequired,
    numGuests: PropTypes.number.isRequired,
    totalPrice: PropTypes.number.isRequired,
    status: PropTypes.oneOf(["unconfirmed", "checked-in", "checked-out"])
      .isRequired,
    guests: PropTypes.shape({
      fullName: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    }).isRequired,
    cabins: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default BookingRow;
