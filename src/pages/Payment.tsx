import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { apiClient } from "../api";

const Payment: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const state = location.state as {
    selectedMenus?: { name: string; price: number; options: string[] }[];
    deliveryType?: boolean;
    deliveryDate?: Date;
    clientId?: string;
  } | null;

  // state가 없거나 필수 데이터가 없을 경우 처리
  if (!state || !state.clientId) {
    alert("잘못된 접근입니다. 처음부터 다시 시도해주세요.");
    console.log("232");

    return null; // 컴포넌트를 렌더링하지 않음
  }

  const selectedMenus = state.selectedMenus ?? [];
  const totalPrice = selectedMenus.reduce((acc, menu) => acc + menu.price, 0);

  const [paymentRequestId, setPaymentRequestId] = useState<string | null>(null);

  useEffect(() => {
    // 결제 요청 ID를 생성하는 API 호출
    const createPayment = async () => {
      try {
        const response = await apiClient.post("/payment", {
          clientId: state.clientId,
          amount: totalPrice,
          deliveryType: state.deliveryType,
          deliveryDate: state.deliveryDate,
          menus: selectedMenus,
        });

        setPaymentRequestId(response.data.paymentRequestId); // PaymentRequestId를 백엔드에서 받아옴
      } catch (error) {
        console.error("결제 요청 생성에 실패했습니다:", error);
        alert("결제 요청 생성에 실패했습니다. 다시 시도해주세요.");
      }
    };

    createPayment();
  }, [
    state.clientId,
    state.deliveryDate,
    state.deliveryType,
    totalPrice,
    selectedMenus,
  ]);

  const handlePayment = () => {
    if (!paymentRequestId) {
      alert("결제 요청 ID를 생성하는데 실패했습니다.");
      return;
    }

    // 실제 결제를 처리하는 페이지로 이동
    navigate("/confirm", {
      state: {
        paymentRequestId,
        clientId: state.clientId,
        deliveryType: state.deliveryType,
        deliveryDate: state.deliveryDate,
        totalPrice,
      },
    });
  };

  return (
    <Container>
      <h1>결제 선택</h1>
      <div className="summary">
        <h2>주문 요약</h2>
        {selectedMenus.map((menu, index) => (
          <div key={index} className="menu-item">
            <p className="menu-name">{menu.name}</p>
            <p className="menu-price">{menu.price.toLocaleString()}원</p>
          </div>
        ))}
        <div className="total">
          <p>총 금액</p>
          <p>{totalPrice.toLocaleString()}원</p>
        </div>
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

    .menu-item {
      display: flex;
      justify-content: space-between;
      padding: 10px 0;
      border-bottom: 1px solid #ddd;
    }

    .total {
      display: flex;
      justify-content: space-between;
      padding: 15px 0;
      font-weight: bold;
      font-size: 20px;
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
