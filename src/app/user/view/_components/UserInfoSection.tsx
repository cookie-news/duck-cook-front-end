import React from "react";

//Services
import { User } from "@root/src/data/user.service";

interface UserInfoSectionProps {
    userData: User
}

const UserInfoSection:React.FC<UserInfoSectionProps> = ({userData}) => {
    return (
        <div className="text-gray-default">
            <h5 className="text-2xl">
                <b>Informações do Usuário:</b>
            </h5>
            <p className="mt-2">
                <b>Nome de Completo:</b>
            </p>
            <span>
                {userData.name}
            </span>
            <p className="mt-2">
                <b>Nome de Usuário:</b>
            </p>
            <span>
                {userData.user}
            </span>
            <p className="mt-2">
                <b>Email:</b>
            </p>
            <span>
                {userData.email}
            </span>
        </div>
    );
}

export default UserInfoSection;