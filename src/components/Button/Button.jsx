import PropTypes from 'prop-types';
import { ButtonStyled } from "./Button.styles";

export default function Button({onClick}) {
  return (
    <ButtonStyled type="button" onClick={onClick}>
      Load more
    </ButtonStyled>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
}