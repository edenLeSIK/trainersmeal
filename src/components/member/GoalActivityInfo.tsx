import styled from "styled-components";
import Input from "../ui/InputComponent";
import Button from "../ui/Button";

interface GoalActivityInfoProps {
  activityLevel: string;
  setActivityLevel: (value: string) => void;
  goal: string;
  setGoal: (value: string) => void;
  notes: string;
  setNotes: (value: string) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const GoalActivityInfo: React.FC<GoalActivityInfoProps> = ({
  activityLevel,
  setActivityLevel,
  goal,
  setGoal,
  notes,
  setNotes,
  onNext,
  onPrevious,
}) => {
  return (
    <Container>
      <div className="select-wrapper">
        <label>활동량</label>
        <select
          value={activityLevel}
          onChange={(e) => setActivityLevel(e.target.value)}
        >
          <option value="정적 (운동을 거의 하지 않음)">
            정적 (운동을 거의 하지 않음)
          </option>
          <option value="가벼운 활동 (주 1~2일 운동)">
            가벼운 활동 (주 1~2일 운동)
          </option>
          <option value="적당히 활동적 (주 3~5일 운동)">
            적당히 활동적 (주 3~5일 운동)
          </option>
          <option value="매우 활동적 (주 6~7일 운동)">
            매우 활동적 (주 6~7일 운동)
          </option>
          <option value="선수 (매일 2회 이상 운동)">
            선수 (매일 2회 이상 운동)
          </option>
        </select>
      </div>

      <div className="select-wrapper">
        <label>운동 목표</label>
        <select value={goal} onChange={(e) => setGoal(e.target.value)}>
          <option value="급격한 체중 감량 (~1kg/주)">
            급격한 체중 감량 (~1kg/주)
          </option>
          <option value="적당한 체중 감량 (~0.5kg/주)">
            적당한 체중 감량 (~0.5kg/주)
          </option>
          <option value="천천한 체중 감량 (~0.25kg/주)">
            천천한 체중 감량 (~0.25kg/주)
          </option>
          <option value="체중 유지">체중 유지</option>
          <option value="천천한 체중 증량 (~0.25kg/주)">
            천천한 체중 증량 (~0.25kg/주)
          </option>
          <option value="적당한 체중 증량 (~0.5kg/주)">
            적당한 체중 증량 (~0.5kg/주)
          </option>
          <option value="빠른 체중 증량 (~1kg/주)">
            빠른 체중 증량 (~1kg/주)
          </option>
        </select>
      </div>

      <Input
        type="textarea"
        label="메모"
        placeholder="추가 메모를 입력하세요"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />

      <div className="button-group">
        <Button onClick={onPrevious} text="이전" color="sub" />
        <Button onClick={onNext} text="다음" color="main" />
      </div>
    </Container>
  );
};

export default GoalActivityInfo;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  .select-wrapper {
    display: flex;
    flex-direction: column;
    gap: 5px;

    label {
      font-weight: bold;
    }

    select {
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 5px;
    }
  }

  .button-group {
    display: flex;
    justify-content: space-between;
  }
`;
