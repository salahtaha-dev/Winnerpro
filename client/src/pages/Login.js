import React, { useContext } from 'react';
import Log from '../components/Log';
import { UidContext } from "../components/AppContext";
import "bootstrap/dist/css/bootstrap.min.css";

const Login = () => {
    const uid = useContext(UidContext);

    return (
        <div>
            {uid ? (
                <h1>Vous êtes déja connecté, rentrer à la page d'accueil</h1>
            ) : (
                <Log />
            )}
        </div>
    );
};

export default Login;