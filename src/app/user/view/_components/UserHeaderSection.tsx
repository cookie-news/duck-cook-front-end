import React from "react";

//Next
import Image from 'next/image';

//Services
import { User } from "@root/src/data/user.service";

interface UserHeaderSectionProps
{
    userData: User
}

const UserHeaderSection:React.FC<UserHeaderSectionProps> = ({userData}) => {
    return (
        <div className="flex pb-4 flex-col md:flex-row items-center	md:items-center border-b border-t-0 border-r-0 border-l-0 border-solid border-gray-default">
            <div className="relative w-36 h-36">
                <Image
                    src={userData?.image}
                    fill objectFit="cover"
                    alt="Imagem do usuário"
                    className="rounded-full"
                />
            </div>
            <h1 className="ml-5 text-4xl text-gray-default">
                <b>{userData?.name}</b>
            </h1>        
        </div>
    );
}

export default UserHeaderSection;