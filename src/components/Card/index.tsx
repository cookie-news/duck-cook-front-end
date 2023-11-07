import { isMobile } from "react-device-detect";

//Material UI
import {
    Typography
} from "@mui/material";

//Styles
import styles from "./styles";

const Card = ({children, title}:{children: ReactNode, title: string}) => {

    let contentCard = children;
    let footerCard;
    
    if(Array.isArray(children)) 
    { 
        contentCard = children[0];
        footerCard = children[1]; 
    }

    return (
        <div className="flex flex-col justify-center items-center content-center h-full w-full">
            <div className="m-4 w-11/12" style={styles.card}>
                <div className="p-4">
                    {
                        title &&
                        <div style={styles["card-title"]}>
                            <Typography color="primary" variant="h4">
                                {title}
                            </Typography>
                        </div>
                    }
                    <div style={styles["card-content"]}>
                        {contentCard}
                    </div>
                    {
                        footerCard &&
                        <div className="mt-4 w-full flex flex-wrap md:grid md:grid-cols-2 gap-2 justify-between">
                            {footerCard}
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default Card;
