import { useNavigate, useLocation } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styled from "styled-components";
import { apiClient } from "../api"; // apiClient를 가져옵니다.

const DeliveryDate: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // location.state가 null이 아닌지 확인
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
    return null;
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

  const handleDateChange = async (selectedDate: Date) => {
    const formattedDate = selectedDate.toISOString().split("T")[0]; // "YYYY-MM-DD" 형식

    if (isMonday(selectedDate) && selectedDate >= getNextMonday()) {
      try {
        // 서버로 데이터 전송
        const response = await apiClient.post("/your-endpoint", {
          deliveryType: state.deliveryType,
          deliveryDate: formattedDate, // YYYY-MM-DD 형식으로 날짜 전송
          selectedMenus: state.selectedMenus,
          totalPrice: state.totalPrice,
          clientId: state.clientId,
        });

        console.log("서버 응답:", response.data);

        // 결제 페이지로 이동
        navigate("/payment", {
          state: {
            totalPrice: state.totalPrice,
            clientId: state.clientId,
          },
        });
      } catch (error) {
        console.error("데이터 전송 실패:", error);
        alert("데이터 전송에 실패했습니다. 다시 시도해주세요.");
      }
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
