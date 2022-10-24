import { ThreeDots } from "react-loader-spinner";

export default function Loader() {
  return (
    <>
        <ThreeDots 
            height="80" 
            width="80" 
            radius="9"
            color="#1727a6" 
            ariaLabel="three-dots-loading"
            wrapperStyle={{justifyContent: "center"}}
            wrapperClassName=""
            visible={true}
        />
    </>
  )
}
