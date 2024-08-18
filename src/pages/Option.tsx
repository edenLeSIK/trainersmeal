import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { apiClient } from "../api";
import Button from "../components/ui/Button";
import { main } from "../styles/color";

interface OptionItem {
  id: string;
  block_name: string;
  difference: number;
}

const Option: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [proUtilOptions, setProUtilOptions] = useState<OptionItem[]>([]);
  const [vegUtilOptions, setVegUtilOptions] = useState<OptionItem[]>([]);
  const [baseUtilOptions, setBaseUtilOptions] = useState<OptionItem[]>([]);
  const [flavorOptions, setFlavorOptions] = useState<OptionItem[]>([]);

  const [selectedProUtil, setSelectedProUtil] = useState<string>("");
  const [selectedVegUtil, setSelectedVegUtil] = useState<string>("");
  const [selectedBaseUtil, setSelectedBaseUtil] = useState<string>("");
  const [selectedFlavor, setSelectedFlavor] = useState<string>("");

  const [additionalProUtil, setAdditionalProUtil] = useState<string[]>([]);
  const [additionalVegUtil, setAdditionalVegUtil] = useState<string[]>([]);
  const [additionalFlavor, setAdditionalFlavor] = useState<string[]>([]);

  const [totalPrice, setTotalPrice] = useState<number>(11000);

  // 메뉴 ID에 해당하는 옵션 데이터를 가져오는 함수
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [proUtilRes, vegUtilRes, baseUtilRes, flavorRes] =
          await Promise.all([
            apiClient.get(`/options/pro_util/${id}`),
            apiClient.get(`/options/veg_util/${id}`),
            apiClient.get(`/options/base_util/${id}`),
            apiClient.get(`/options/flavor/${id}`),
          ]);

        setProUtilOptions(proUtilRes.data || []);
        setVegUtilOptions(vegUtilRes.data || []);
        setBaseUtilOptions(baseUtilRes.data || []);
        setFlavorOptions(flavorRes.data || []);

        // 각 옵션의 첫 번째 항목을 기본값으로 설정
        setSelectedProUtil(proUtilRes.data?.[0]?.id || "");
        setSelectedVegUtil(vegUtilRes.data?.[0]?.id || "");
        setSelectedBaseUtil(baseUtilRes.data?.[0]?.id || "");
        setSelectedFlavor(flavorRes.data?.[0]?.id || "");
      } catch (error) {
        console.error("옵션 데이터를 불러오는데 실패했습니다:", error);
        alert("옵션 데이터를 불러오는데 실패했습니다. 다시 시도해주세요.");
      }
    };

    fetchOptions();
  }, [id]);

  // 가격 계산 로직
  useEffect(() => {
    const baseDifference = 11000;
    const proDifference =
      proUtilOptions.find((opt) => opt.id === selectedProUtil)?.difference || 0;
    const vegDifference =
      vegUtilOptions.find((opt) => opt.id === selectedVegUtil)?.difference || 0;
    const baseDifferenceOption =
      baseUtilOptions.find((opt) => opt.id === selectedBaseUtil)?.difference ||
      0;
    const flavorDifference =
      flavorOptions.find((opt) => opt.id === selectedFlavor)?.difference || 0;

    const additionalProDifference = additionalProUtil.reduce(
      (acc, id) =>
        acc + (proUtilOptions.find((opt) => opt.id === id)?.difference || 0),
      0
    );
    const additionalVegDifference = additionalVegUtil.reduce(
      (acc, id) =>
        acc + (vegUtilOptions.find((opt) => opt.id === id)?.difference || 0),
      0
    );
    const additionalFlavorDifference = additionalFlavor.reduce(
      (acc, id) =>
        acc + (flavorOptions.find((opt) => opt.id === id)?.difference || 0),
      0
    );

    setTotalPrice(
      baseDifference +
        proDifference +
        vegDifference +
        baseDifferenceOption +
        flavorDifference +
        additionalProDifference +
        additionalVegDifference +
        additionalFlavorDifference
    );
  }, [
    selectedProUtil,
    selectedVegUtil,
    selectedBaseUtil,
    selectedFlavor,
    additionalProUtil,
    additionalVegUtil,
    additionalFlavor,
  ]);

  const handleAdditionalChange = (
    optionType: "pro" | "veg" | "flavor",
    id: string
  ) => {
    const setOption =
      optionType === "pro"
        ? setAdditionalProUtil
        : optionType === "veg"
        ? setAdditionalVegUtil
        : setAdditionalFlavor;

    setOption((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSubmit = async () => {
    try {
      // 선택된 옵션과 추가 옵션을 서버에 전송
      const response = await apiClient.post(`/menu/update/${id}`, {
        selectedProUtil,
        selectedVegUtil,
        selectedBaseUtil,
        selectedFlavor,
        additionalProUtil,
        additionalVegUtil,
        additionalFlavor,
        totalPrice,
      });

      // 서버로부터 업데이트된 데이터를 받았다면, 그 데이터를 diet 페이지로 보냄
      navigate("/diet", {
        state: {
          updatedMenu: response.data,
        },
      });
    } catch (error) {
      console.error("옵션을 저장하는데 실패했습니다:", error);
      alert("옵션을 저장하는데 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <Container>
      <div className="header">
        <div className="back-button" onClick={() => navigate(-1)}>
          ←
        </div>
        <h1 className="title">메뉴 이름</h1>
      </div>

      {/* 옵션 섹션들 */}
      <OptionSection>
        <h2 className="option-title">
          단백질 <span className="required">필수</span>
        </h2>
        {Array.isArray(proUtilOptions) &&
          proUtilOptions.map((option) => (
            <OptionItem key={option.id}>
              <input
                type="radio"
                id={`proUtil-${option.id}`}
                name="proUtil"
                value={option.id}
                checked={selectedProUtil === option.id}
                onChange={() => setSelectedProUtil(option.id)}
              />
              <label htmlFor={`proUtil-${option.id}`}>
                {option.block_name} (+{option.difference}원)
              </label>
            </OptionItem>
          ))}
      </OptionSection>

      <OptionSection>
        <h2 className="option-title">
          채소 <span className="required">필수</span>
        </h2>
        {Array.isArray(vegUtilOptions) &&
          vegUtilOptions.map((option) => (
            <OptionItem key={option.id}>
              <input
                type="radio"
                id={`vegUtil-${option.id}`}
                name="vegUtil"
                value={option.id}
                checked={selectedVegUtil === option.id}
                onChange={() => setSelectedVegUtil(option.id)}
              />
              <label htmlFor={`vegUtil-${option.id}`}>
                {option.block_name} (+{option.difference}원)
              </label>
            </OptionItem>
          ))}
      </OptionSection>

      <OptionSection>
        <h2 className="option-title">
          베이스 <span className="required">필수</span>
        </h2>
        {Array.isArray(baseUtilOptions) &&
          baseUtilOptions.map((option) => (
            <OptionItem key={option.id}>
              <input
                type="radio"
                id={`baseUtil-${option.id}`}
                name="baseUtil"
                value={option.id}
                checked={selectedBaseUtil === option.id}
                onChange={() => setSelectedBaseUtil(option.id)}
              />
              <label htmlFor={`baseUtil-${option.id}`}>
                {option.block_name} (+{option.difference}원)
              </label>
            </OptionItem>
          ))}
      </OptionSection>

      <OptionSection>
        <h2 className="option-title">
          소스 <span className="required">필수</span>
        </h2>
        {Array.isArray(flavorOptions) &&
          flavorOptions.map((option) => (
            <OptionItem key={option.id}>
              <input
                type="radio"
                id={`flavor-${option.id}`}
                name="flavor"
                value={option.id}
                checked={selectedFlavor === option.id}
                onChange={() => setSelectedFlavor(option.id)}
              />
              <label htmlFor={`flavor-${option.id}`}>
                {option.block_name} (+{option.difference}원)
              </label>
            </OptionItem>
          ))}
      </OptionSection>

      {/* 추가 옵션들 */}
      <OptionSection>
        <h2 className="option-title">추가 단백질</h2>
        {Array.isArray(proUtilOptions) &&
          proUtilOptions.map((option) => (
            <OptionItem key={option.id}>
              <input
                type="checkbox"
                id={`additionalPro-${option.id}`}
                value={option.id}
                onChange={() => handleAdditionalChange("pro", option.id)}
              />
              <label htmlFor={`additionalPro-${option.id}`}>
                {option.block_name} (+{option.difference}원)
              </label>
            </OptionItem>
          ))}
      </OptionSection>

      <OptionSection>
        <h2 className="option-title">추가 채소</h2>
        {Array.isArray(vegUtilOptions) &&
          vegUtilOptions.map((option) => (
            <OptionItem key={option.id}>
              <input
                type="checkbox"
                id={`additionalVeg-${option.id}`}
                value={option.id}
                onChange={() => handleAdditionalChange("veg", option.id)}
              />
              <label htmlFor={`additionalVeg-${option.id}`}>
                {option.block_name} (+{option.difference}원)
              </label>
            </OptionItem>
          ))}
      </OptionSection>

      <OptionSection>
        <h2 className="option-title">추가 소스</h2>
        {Array.isArray(flavorOptions) &&
          flavorOptions.map((option) => (
            <OptionItem key={option.id}>
              <input
                type="checkbox"
                id={`additionalFlavor-${option.id}`}
                value={option.id}
                onChange={() => handleAdditionalChange("flavor", option.id)}
              />
              <label htmlFor={`additionalFlavor-${option.id}`}>
                {option.block_name} (+{option.difference}원)
              </label>
            </OptionItem>
          ))}
      </OptionSection>

      <div className="button-wrapper">
        <Button
          text={`${totalPrice}원 담기`}
          onClick={handleSubmit}
          color="main"
        />
      </div>
    </Container>
  );
};

export default Option;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 20px;
  box-sizing: border-box;

  .header {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }

  .back-button {
    font-size: 24px;
    cursor: pointer;
    margin-right: 10px;
  }

  .title {
    font-size: 30px;
    margin-bottom: 20px;
  }

  .button-wrapper {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    padding-bottom: 20px;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: white;
    box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
    padding: 10px;
    box-sizing: border-box;
  }

  hr {
    border: none;
    border-top: 1px solid #ddd;
    margin: 10px 0;
  }
`;

const OptionSection = styled.div`
  margin-bottom: 20px;

  .option-title {
    font-size: 18px;
    margin-bottom: 10px;
  }

  .required {
    font-size: 12px;
    color: ${main};
    margin-left: 8px;
    vertical-align: middle;
  }
`;

const OptionItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;

  input[type="radio"],
  input[type="checkbox"] {
    margin-right: 10px;
  }

  label {
    font-size: 16px;
    cursor: pointer;
  }
`;
