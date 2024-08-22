import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { apiClient } from "../api";
import Button from "../components/ui/Button";
import { main } from "../styles/color";

interface OptionBlock {
  id: string;
  block_name: string;
  difference?: number;
  price?: number;
  is_default?: boolean;
}

interface OptionItem {
  id: string;
  option: string;
  block: OptionBlock[];
}

const Option: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [baseOptions, setBaseOptions] = useState<OptionItem[]>([]);
  const [proteinOptions, setProteinOptions] = useState<OptionItem[]>([]);
  const [vegOptions, setVegOptions] = useState<OptionItem[]>([]);
  const [flavorOptions, setFlavorOptions] = useState<OptionItem[]>([]);

  const [selectedBase, setSelectedBase] = useState<string>("");
  const [selectedProtein, setSelectedProtein] = useState<string>("");
  const [selectedVeg, setSelectedVeg] = useState<string>("");
  const [selectedFlavor, setSelectedFlavor] = useState<string>("");

  const [additionalProtein, setAdditionalProtein] = useState<string[]>([]);
  const [additionalVeg, setAdditionalVeg] = useState<string[]>([]);
  const [additionalFlavor, setAdditionalFlavor] = useState<string[]>([]);

  const [totalPrice, setTotalPrice] = useState<number>(11000);

  // 메뉴 ID에 해당하는 옵션 데이터를 가져오는 함수
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await apiClient.get(`/menu/options/${id}`);
        const data = response.data;

        setBaseOptions(data.base || []);
        setProteinOptions(data.protein || []);
        setVegOptions(data.veg || []);
        setFlavorOptions(data.flavor || []);

        // 기본값 설정
        setSelectedBase(
          data.base?.find((item: OptionItem) =>
            item.block.find((block: OptionBlock) => block.is_default)
          )?.block[0].id || ""
        );
        setSelectedProtein(
          data.protein?.find((item: OptionItem) =>
            item.block.find((block: OptionBlock) => block.is_default)
          )?.block[0].id || ""
        );
        setSelectedVeg(
          data.veg?.find((item: OptionItem) =>
            item.block.find((block: OptionBlock) => block.is_default)
          )?.block[0].id || ""
        );
        setSelectedFlavor(
          data.flavor?.find((item: OptionItem) =>
            item.block.find((block: OptionBlock) => block.is_default)
          )?.block[0].id || ""
        );
      } catch (error) {
        console.error("옵션 데이터를 불러오는데 실패했습니다:", error);
        alert("옵션 데이터를 불러오는데 실패했습니다. 다시 시도해주세요.");
      }
    };

    fetchOptions();
  }, [id]);

  // 가격 계산 로직
  useEffect(() => {
    const basePrice = 11000;
    const selectedBasePrice =
      baseOptions
        .find((opt) => opt.id === selectedBase)
        ?.block.find((block) => block.id === selectedBase)?.difference || 0;
    const selectedProteinPrice =
      proteinOptions
        .find((opt) => opt.id === selectedProtein)
        ?.block.find((block) => block.id === selectedProtein)?.difference || 0;
    const selectedVegPrice =
      vegOptions
        .find((opt) => opt.id === selectedVeg)
        ?.block.find((block) => block.id === selectedVeg)?.difference || 0;
    const selectedFlavorPrice =
      flavorOptions
        .find((opt) => opt.id === selectedFlavor)
        ?.block.find((block) => block.id === selectedFlavor)?.difference || 0;

    const additionalProteinPrice = additionalProtein.reduce(
      (acc, id) =>
        acc +
        (proteinOptions
          .find((opt) => opt.id === id)
          ?.block.find((block) => block.id === id)?.price || 0),
      0
    );
    const additionalVegPrice = additionalVeg.reduce(
      (acc, id) =>
        acc +
        (vegOptions
          .find((opt) => opt.id === id)
          ?.block.find((block) => block.id === id)?.price || 0),
      0
    );
    const additionalFlavorPrice = additionalFlavor.reduce(
      (acc, id) =>
        acc +
        (flavorOptions
          .find((opt) => opt.id === id)
          ?.block.find((block) => block.id === id)?.price || 0),
      0
    );

    setTotalPrice(
      basePrice +
        selectedBasePrice +
        selectedProteinPrice +
        selectedVegPrice +
        selectedFlavorPrice +
        additionalProteinPrice +
        additionalVegPrice +
        additionalFlavorPrice
    );
  }, [
    selectedBase,
    selectedProtein,
    selectedVeg,
    selectedFlavor,
    additionalProtein,
    additionalVeg,
    additionalFlavor,
  ]);

  const handleAdditionalChange = (
    optionType: "protein" | "veg" | "flavor",
    id: string
  ) => {
    const setOption =
      optionType === "protein"
        ? setAdditionalProtein
        : optionType === "veg"
        ? setAdditionalVeg
        : setAdditionalFlavor;
    setOption((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSubmit = async () => {
    try {
      // 선택된 옵션과 추가 옵션을 서버에 전송
      const response = await apiClient.post(`/menu/update/${id}`, {
        selectedBase,
        selectedProtein,
        selectedVeg,
        selectedFlavor,
        additionalProtein,
        additionalVeg,
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
          베이스 <span className="required">필수</span>
        </h2>
        {Array.isArray(baseOptions) &&
          baseOptions.map((option) =>
            option.block.map((block) => (
              <OptionItem key={block.id}>
                <input
                  type="radio"
                  id={`base-${block.id}`}
                  name="base"
                  value={block.id}
                  checked={selectedBase === block.id}
                  onChange={() => setSelectedBase(block.id)}
                />
                <label htmlFor={`base-${block.id}`}>
                  {block.block_name} (+{block.difference}원)
                </label>
              </OptionItem>
            ))
          )}
      </OptionSection>

      <OptionSection>
        <h2 className="option-title">
          단백질 <span className="required">필수</span>
        </h2>
        {Array.isArray(proteinOptions) &&
          proteinOptions.map((option) =>
            option.block.map((block) => (
              <OptionItem key={block.id}>
                <input
                  type="radio"
                  id={`protein-${block.id}`}
                  name="protein"
                  value={block.id}
                  checked={selectedProtein === block.id}
                  onChange={() => setSelectedProtein(block.id)}
                />
                <label htmlFor={`protein-${block.id}`}>
                  {block.block_name} (+{block.difference}원)
                </label>
              </OptionItem>
            ))
          )}
      </OptionSection>

      <OptionSection>
        <h2 className="option-title">
          채소 <span className="required">필수</span>
        </h2>
        {Array.isArray(vegOptions) &&
          vegOptions.map((option) =>
            option.block.map((block) => (
              <OptionItem key={block.id}>
                <input
                  type="radio"
                  id={`veg-${block.id}`}
                  name="veg"
                  value={block.id}
                  checked={selectedVeg === block.id}
                  onChange={() => setSelectedVeg(block.id)}
                />
                <label htmlFor={`veg-${block.id}`}>
                  {block.block_name} (+{block.difference}원)
                </label>
              </OptionItem>
            ))
          )}
      </OptionSection>

      <OptionSection>
        <h2 className="option-title">
          소스 <span className="required">필수</span>
        </h2>
        {Array.isArray(flavorOptions) &&
          flavorOptions.map((option) =>
            option.block.map((block) => (
              <OptionItem key={block.id}>
                <input
                  type="radio"
                  id={`flavor-${block.id}`}
                  name="flavor"
                  value={block.id}
                  checked={selectedFlavor === block.id}
                  onChange={() => setSelectedFlavor(block.id)}
                />
                <label htmlFor={`flavor-${block.id}`}>
                  {block.block_name} (+{block.difference}원)
                </label>
              </OptionItem>
            ))
          )}
      </OptionSection>

      {/* 추가 옵션들 */}
      <OptionSection>
        <h2 className="option-title">추가 단백질</h2>
        {Array.isArray(proteinOptions) &&
          proteinOptions.map((option) =>
            option.block.map((block) => (
              <OptionItem key={block.id}>
                <input
                  type="checkbox"
                  id={`additionalProtein-${block.id}`}
                  value={block.id}
                  onChange={() => handleAdditionalChange("protein", block.id)}
                />
                <label htmlFor={`additionalProtein-${block.id}`}>
                  {block.block_name} (+{block.price}원)
                </label>
              </OptionItem>
            ))
          )}
      </OptionSection>

      <OptionSection>
        <h2 className="option-title">추가 채소</h2>
        {Array.isArray(vegOptions) &&
          vegOptions.map((option) =>
            option.block.map((block) => (
              <OptionItem key={block.id}>
                <input
                  type="checkbox"
                  id={`additionalVeg-${block.id}`}
                  value={block.id}
                  onChange={() => handleAdditionalChange("veg", block.id)}
                />
                <label htmlFor={`additionalVeg-${block.id}`}>
                  {block.block_name} (+{block.price}원)
                </label>
              </OptionItem>
            ))
          )}
      </OptionSection>

      <OptionSection>
        <h2 className="option-title">추가 소스</h2>
        {Array.isArray(flavorOptions) &&
          flavorOptions.map((option) =>
            option.block.map((block) => (
              <OptionItem key={block.id}>
                <input
                  type="checkbox"
                  id={`additionalFlavor-${block.id}`}
                  value={block.id}
                  onChange={() => handleAdditionalChange("flavor", block.id)}
                />
                <label htmlFor={`additionalFlavor-${block.id}`}>
                  {block.block_name} (+{block.price}원)
                </label>
              </OptionItem>
            ))
          )}
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
