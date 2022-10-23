import { ModalStyled, Overlay } from "./Modal.styles";

export default function Modal({src, alt, onClick}) {
    return (
        <Overlay onClick={onClick}>
            <ModalStyled>
                <img src={src} alt={alt} onClick={onClick}/>
            </ModalStyled>
        </Overlay>
    )
}
