import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styled from "styled-components";

const DeliveryDate: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { deliveryType: string };
  const [date, setDate] = useState<Date | null>(null);

  const isMonday = (date: Date) => date.getDay() === 1;

  const getNextMonday = () => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const nextMonday = new Date(today);

    // Determine next Monday or two Mondays later
    if (dayOfWeek === 3 && today.getHours() >= 17) {
      nextMonday.setDate(today.getDate() + ((15 - dayOfWeek) % 7));
    } else if (dayOfWeek > 3 || (dayOfWeek === 3 && today.getHours() >= 17)) {
      nextMonday.setDate(today.getDate() + ((15 - dayOfWeek) % 7));
    } else {
      nextMonday.setDate(today.getDate() + ((8 - dayOfWeek) % 7));
    }

    return nextMonday;
  };

  const handleDateChange = (selectedDate: Date) => {
    if (isMonday(selectedDate) && selectedDate >= getNextMonday()) {
      setDate(selectedDate);
      navigate("/checkout", {
        state: { deliveryType: state.deliveryType, deliveryDate: selectedDate },
      });
    } else {
      alert("월요일만 선택 가능합니다.");
    }
  };

  return (
    <Container>
      <h1>배송일자 선택</h1>
      <Calendar
        onClickDay={handleDateChange}
        value={getNextMonday()}
        tileDisabled={({ date }) => !isMonday(date) || date < getNextMonday()}
        locale="en-US" // This will make the week start on Sunday
      />
    </Container>
  );
};

export default DeliveryDate;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
  height: 100vh;
  box-sizing: border-box;

  h1 {
    margin-bottom: 20px;
    font-size: 28px;
  }

  .react-calendar {
    border: none;
    width: 100%;
    max-width: 400px;
  }

  .react-calendar__tile--disabled {
    background-color: #f0f0f0;
    cursor: not-allowed;
  }

  .react-calendar__tile {
    height: 60px;
    font-size: 18px;
  }
`;
