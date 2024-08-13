import styled from "styled-components";
import { main, mainBlack } from "../../styles/color";

interface InputProps {
  type: string;
  placeholder?: string;
  id?: string;
  className?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
  type,
  placeholder,
  id,
  className,
  value,
  onChange,
}) => {
  return (
    <InputComponent
      type={type}
      placeholder={placeholder}
      id={id}
      className={className}
      value={value}
      onChange={onChange}
    />
  );
};

const InputComponent = styled.input`
  border: 1px solid ${mainBlack};

  padding: 8px;
  font-size: 16px;

  &:focus {
    border: 2px solid ${main};
  }
`;

export default Input;
