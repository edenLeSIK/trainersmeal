import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { apiClient } from "../api";

const Payment: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const state = location.state as {
    totalPrice: number;
    clientId?: string;
  } | null;

  // state가 없거나 필수 데이터가 없을 경우 처리
  if (!state || !state.clientId) {
    alert("잘못된 접근입니다. 처음부터 다시 시도해주세요.");
    return null;
  }

  const { totalPrice, clientId } = state;

  const [paymentType, setPaymentType] = useState<number>(0); // 0: 일반결제, 1: 정기결제

  const handlePayment = async () => {
    try {
      const response = await apiClient.post("/payment", {
        clientId,
        amount: totalPrice,
        paymentType, // 결제 유형 전송
      });

      const paymentRequestId = response.data.paymentRequestId;

      // 결제가 성공적으로 생성되면 결제 확인 페이지로 이동
      navigate("/confirm", {
        state: {
          paymentRequestId,
          clientId,
          totalPrice,
          paymentType,
        },
      });
    } catch (error) {
      console.error("결제 요청 생성에 실패했습니다:", error);
      alert("결제 요청 생성에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <Container>
      <h1>결제 선택</h1>
      <div className="summary">
        <h2>주문 요약</h2>
        <div className="total">
          <p>총 금액</p>
          <p>{totalPrice.toLocaleString()}원</p>
        </div>
      </div>
      <div className="payment-type">
        <label>
          <input
            type="radio"
            value={0}
            checked={paymentType === 0}
            onChange={() => setPaymentType(0)}
          />
          일반결제
        </label>
        <label>
          <input
            type="radio"
            value={1}
            checked={paymentType === 1}
            onChange={() => setPaymentType(1)}
          />
          정기결제
        </label>
      </div>
      <div className="button-wrapper">
        <button onClick={handlePayment}>결제하기</button>
      </div>
    </Container>
  );
};

export default Payment;

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

  .summary {
    width: 100%;
    margin-bottom: 20px;

    h2 {
      font-size: 22px;
      margin-bottom: 10px;
    }

    .total {
      display: flex;
      justify-content: space-between;
      padding: 15px 0;
      font-weight: bold;
      font-size: 20px;
    }
  }

  .payment-type {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;

    label {
      font-size: 18px;
      margin-right: 20px;

      input {
        margin-right: 8px;
      }
    }
  }

  .button-wrapper {
    margin-top: 20px;
    width: 100%;
    display: flex;
    justify-content: center;

    button {
      padding: 15px 30px;
      font-size: 18px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }
  }
`;
