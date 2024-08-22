import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { apiClient } from "../api";
import Button from "../components/ui/Button";

interface MemberProps {
  client_id: string;
  name: string;
  gender: number;
  birthdate: string;
  height: number;
  weight: number;
  muscleMass: number;
  bodyFatMass: number;
  bodyFatPercentage: number;
  activityLevel: string;
  goal: string;
  address: string;
  detailAddress: string;
  deliveryMessage: string;
  entryMethod: string;
  entryPassword: string;
}

const Member: React.FC = () => {
  const { clientId } = useParams<{ clientId: string }>();
  const [memberDetail, setMemberDetail] = useState<MemberDetailProps | null>(
    null
  );
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMemberDetail = async () => {
      try {
        const response = await apiClient.get(`/clients/${clientId}`);
        setMemberDetail(response.data);
      } catch (error) {
        console.error("Error fetching member details:", error);
        alert("회원 정보를 가져오는데 실패했습니다.");
      }
    };

    fetchMemberDetail();
  }, [clientId]);

  if (!memberDetail) {
    return <div>Loading...</div>;
  }

  const handleEditClick = () => {
    navigate(`/edit/${memberDetail.client_id}`);
  };

  return (
    <Container>
      <h1>{memberDetail.name}님의 정보</h1>
      <div className="info-group">
        <h2>개인 정보</h2>
        <p>
          <strong>이름:</strong> {memberDetail.name}
        </p>
        <p>
          <strong>성별:</strong> {memberDetail.gender === 1 ? "남" : "여"}
        </p>
        <p>
          <strong>생년월일:</strong> {memberDetail.birthdate}
        </p>
      </div>
      <div className="info-group">
        <h2>신체 정보</h2>
        <p>
          <strong>키:</strong> {memberDetail.height} cm
        </p>
        <p>
          <strong>체중:</strong> {memberDetail.weight} kg
        </p>
        <p>
          <strong>골격근량:</strong> {memberDetail.muscleMass} kg
        </p>
        <p>
          <strong>체지방량:</strong> {memberDetail.bodyFatMass} kg
        </p>
        <p>
          <strong>체지방률:</strong> {memberDetail.bodyFatPercentage} %
        </p>
      </div>
      <div className="info-group">
        <h2>목표 및 활동 수준</h2>
        <p>
          <strong>활동 수준:</strong> {memberDetail.activityLevel}
        </p>
        <p>
          <strong>목표:</strong> {memberDetail.goal}
        </p>
      </div>
      <div className="info-group">
        <h2>배송 정보</h2>
        <p>
          <strong>주소:</strong> {memberDetail.address}
        </p>
        <p>
          <strong>상세 주소:</strong> {memberDetail.detailAddress}
        </p>
        <p>
          <strong>배송 메세지:</strong> {memberDetail.deliveryMessage}
        </p>
        <p>
          <strong>출입 방법:</strong> {memberDetail.entryMethod}
        </p>
        {memberDetail.entryMethod === "password" && (
          <p>
            <strong>출입 비밀번호:</strong> {memberDetail.entryPassword}
          </p>
        )}
      </div>
      <div className="button-wrapper">
        <Button text="뒤로 가기" onClick={() => navigate(-1)} color="sub" />
        <Button text="수정하기" onClick={handleEditClick} color="main" />

      </div>
    </Container>
  );
};

export default Member;

const Container = styled.div`
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;

  h1 {
    margin-bottom: 20px;

    text-align: center;
    font-size: 30px;
  }

  .info-group {
    margin-bottom: 20px;

    h2 {
      font-size: 25px;
      margin-bottom: 10px;
    }

    p {
      font-size: 20px;
      margin: 5px 0;

    }

    strong {
      font-weight: bold;
    }
  }

  .button-wrapper {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }
`;
