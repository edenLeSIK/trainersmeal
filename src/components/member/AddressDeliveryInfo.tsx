import { useState } from "react";
import styled from "styled-components";
import Input from "../ui/InputComponent";
import Button from "../ui/Button";
import DaumPostcode from "react-daum-postcode";
import { main } from "../../styles/color";

interface AddressDeliveryInfoProps {
  address: string;
  setAddress: (value: string) => void;
  detailAddress: string;
  setDetailAddress: (value: string) => void;
  deliveryMessage: string;
  setDeliveryMessage: (value: string) => void;
  entryMethod: string;
  setEntryMethod: (value: string) => void;
  entryPassword: string;
  setEntryPassword: (value: string) => void;
  onRegister: () => void;
  onPrevious: () => void;
}

const AddressDeliveryInfo: React.FC<AddressDeliveryInfoProps> = ({
  address,
  setAddress,
  detailAddress,
  setDetailAddress,
  deliveryMessage,
  setDeliveryMessage,
  entryMethod,
  setEntryMethod,
  entryPassword,
  setEntryPassword,
  onRegister,
  onPrevious,
}) => {
  const [isAddressOpen, setIsAddressOpen] = useState<boolean>(false);

  const handleAddressComplete = (data: any) => {
    setAddress(data.address);
    setIsAddressOpen(false);
  };

  return (
    <Container>
      <div className="address-section">
        <label>배송지 주소</label>
        <div className="address-input-group">
          <Input
            type="text"
            placeholder="배송지 주소를 입력하세요"
            value={address}
            readonly={true}
          />
          <button onClick={() => setIsAddressOpen(true)}>주소 검색</button>
        </div>
        {isAddressOpen && (
          <Modal>
            <div className="content">
              <DaumPostcode
                onComplete={handleAddressComplete}
                style={{ width: "100%", height: "100%" }}
              />
              <button
                className="close-button"
                onClick={() => setIsAddressOpen(false)}
              >
                닫기
              </button>
            </div>
          </Modal>
        )}
        <Input
          type="text"
          label="상세 주소"
          placeholder="상세 주소를 입력하세요"
          value={detailAddress}
          onChange={(e) => setDetailAddress(e.target.value)}
        />
      </div>

      <div className="delivery-options">
        <div className="title">배송 요청사항</div>
        <div className="delivery-message">
          <label>배송메시지</label>
          <select
            value={deliveryMessage}
            onChange={(e) => setDeliveryMessage(e.target.value)}
          >
            <option value="">배송메시지를 선택해주세요.</option>
            <option value="문 앞에 놔주세요">문 앞에 놔주세요</option>
          </select>
        </div>
        <div className="entry-method">
          <label>공동현관 출입방법</label>
          <div>
            <Input
              type="radio"
              id="password"
              name="entry"
              onChange={() => setEntryMethod("password")}
              checked={entryMethod === "password"}
            />
            <label htmlFor="password">비밀번호</label>
            <Input
              type="radio"
              id="call"
              name="entry"
              onChange={() => setEntryMethod("call")}
              checked={entryMethod === "call"}
            />
            <label htmlFor="call">경비실 호출</label>
            <Input
              type="radio"
              id="free"
              name="entry"
              onChange={() => setEntryMethod("free")}
              checked={entryMethod === "free"}
            />
            <label htmlFor="free">자유출입가능</label>
          </div>
          {entryMethod === "password" && (
            <Input
              type="text"
              label="공동현관 비밀번호"
              placeholder="공동현관 비밀번호를 입력해주세요"
              value={entryPassword}
              onChange={(e) => setEntryPassword(e.target.value)}
            />
          )}
        </div>
      </div>

      <div className="button-group">
        <Button onClick={onPrevious} text="이전" color="main" />
        <Button onClick={onRegister} text="등록" color="main" />
      </div>
    </Container>
  );
};

export default AddressDeliveryInfo;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  .address-section {
    display: flex;
    flex-direction: column;
    gap: 10px;

    label {
      margin-bottom: 5px;
      font-weight: bold;
    }

    .address-input-group {
      display: flex;
      align-items: center;

      button {
        margin-left: 10px;
        padding: 8px 12px;
        border: 1px solid #ccc;
        border-radius: 5px;
        background-color: #f5f5f5;
        cursor: pointer;
      }
    }
  }

  .delivery-options {
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 10px;

    .title {
      font-size: 20px;
      font-weight: bold;
      margin-bottom: 15px;
    }

    .delivery-message,
    .entry-method {
      margin-bottom: 15px;
    }

    .entry-method div {
      display: flex;
      gap: 10px;
    }

    .privacy {
      margin-top: 10px;

      Input {
        margin-right: 10px;
      }
    }
  }

  .button-group {
    display: flex;
    justify-content: space-between;
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;

  .content {
    background-color: white;
    width: 90%;
    max-width: 600px;
    height: 80%;
    position: relative;
    border-radius: 10px;
    overflow: hidden;

    .close-button {
      position: absolute;
      top: 10px;
      right: 10px;
      padding: 5px 10px;
      border: none;
      border-radius: 5px;
      background-color: ${main};
      color: white;
      cursor: pointer;
    }
  }
`;
