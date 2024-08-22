import { useNavigate, useLocation } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styled from "styled-components";

const DeliveryDate: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // location.state가 null이 아닌지 확인합니다.
  const state = location.state as {
    deliveryType: boolean;
    selectedMenus: any[];
    totalPrice: number;
    clientId: string;
  } | null;

  // state가 null일 경우에 대한 처리
  if (!state) {
    alert("잘못된 접근입니다. 처음부터 다시 시도해주세요.");
    navigate("/delivery-pickup");
    return null; // 컴포넌트를 렌더링하지 않도록 합니다.
  }

  const isMonday = (date: Date) => date.getDay() === 1;

  const getNextMonday = () => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const nextMonday = new Date(today);

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
      navigate("/payment", {
        state: {
          deliveryType: state.deliveryType,
          deliveryDate: selectedDate,
          selectedMenus: state.selectedMenus,
          totalPrice: state.totalPrice,
          clientId: state.clientId,
        },
      });
    } else {
      alert("월요일만 선택 가능합니다.");
    }
  };

  return (
    <Container>
      <h1>{state.deliveryType ? "배송일자 선택" : "픽업일자 선택"}</h1>
      <Calendar
        onClickDay={handleDateChange}
        value={getNextMonday()}
        tileDisabled={({ date }) => !isMonday(date) || date < getNextMonday()}
        locale="en-US"
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
