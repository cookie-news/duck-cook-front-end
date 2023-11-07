//Material UI
import { CircularProgress } from "@mui/material";

const Loading = ({load = false}) => {
    return (
        <>
            {
                
                load ? (
                    <div className='flex justify-center items-center h-screen w-screen z-10 absolute' style={{backgroundColor: 'rgb(0 0 0 / 34%)'}}>
                    <CircularProgress />
                    </div>
                ) : (
                    <></>
                )
            }
        </>
    );
}

export default Loading;