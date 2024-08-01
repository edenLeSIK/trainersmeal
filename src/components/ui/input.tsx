import styled from "styled-components";

interface InputProps {
  type: string;
  placeholder?: string;
  id?: string;
}

const Input: React.FC<InputProps> = ({ type, placeholder, id }) => {
  return <InputComponent type={type} placeholder={placeholder} id={id} />;
};

const InputComponent = styled.input``;

export default Input;
