import { ButtonStyled } from "./Button.styles";

export default function Button({onClick}) {
  return (
    <ButtonStyled type="button" onClick={onClick}>Load more</ButtonStyled>
  )
}
