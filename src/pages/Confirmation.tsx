import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

const Confirmation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as {
    totalPrice: number;
    deliveryType?: string;
    deliveryDate?: Date;
  };

  const handleConfirmation = () => {
    navigate("/");
  };

  return (
    <Container>
      <h1>결제 완료</h1>
      <div className="confirmation-details">
        <p>주문이 성공적으로 완료되었습니다!</p>
        <p>결제 금액: {state?.totalPrice?.toLocaleString()}원</p>
        <p>배송 방법: {state?.deliveryType === "delivery" ? "배송" : "픽업"}</p>
        <p>배송/픽업 날짜: {state?.deliveryDate?.toLocaleDateString()}</p>
        <p>결제 시간: {new Date().toLocaleString()}</p>
      </div>
      <div className="button-wrapper">
        <button onClick={handleConfirmation}>확인</button>
      </div>
    </Container>
  );
};

export default Confirmation;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
  height: 100vh;
  box-sizing: border-box;
  text-align: center;

  h1 {
    margin-bottom: 20px;
    font-size: 28px;
  }

  .confirmation-details {
    margin-bottom: 30px;
    font-size: 18px;

    p {
      margin: 10px 0;
    }
  }

  .button-wrapper {
    width: 100%;
    display: flex;
    justify-content: center;

    button {
      padding: 10px 20px;
      font-size: 18px;
      color: white;
      background-color: #007bff;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: #0056b3;
      }
    }
  }
`;
