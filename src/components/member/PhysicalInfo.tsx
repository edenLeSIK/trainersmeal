import styled from "styled-components";
import Input from "../ui/InputComponent";
import Button from "../ui/Button";

interface PhysicalInfoProps {
  height: string;
  setHeight: (value: string) => void;
  weight: string;
  setWeight: (value: string) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const PhysicalInfo: React.FC<PhysicalInfoProps> = ({
  height,
  setHeight,
  weight,
  setWeight,
  onNext,
  onPrevious,
}) => {
  return (
    <Container>
      <Input
        type="number"
        label="키(cm)"
        placeholder="키(cm)를 입력하세요"
        value={height}
        onChange={(e) => setHeight(e.target.value)}
      />
      <Input
        type="number"
        label="체중(kg)"
        placeholder="체중(kg)을 입력하세요"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
      />
      <div className="button-group">
        <Button onClick={onPrevious} text="이전" color="sub" />
        <Button onClick={onNext} text="다음" color="main" />
      </div>
    </Container>
  );
};

export default PhysicalInfo;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  .button-group {
    display: flex;
    justify-content: space-between;
  }
`;
