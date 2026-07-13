import { createContext, useState } from 'react';

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {

    // const [user, setUser] = useState(null);
    // const [token, setToken] = useState('');

    // const [auth, setAuth] = useState({
    //     user: null,
    //     token: null,
    //     isLoading: true
    // });

    // /** Throwing Error because we are just fetching and updating a value inside useEffect */
    // useEffect(() => {
    //     const user = localStorage.getItem('user');
    //     const token = localStorage.getItem('token');

    //     if(user && token) {
    //         // setUser(JSON.parse(user));
    //         // setToken(token);

    //         setAuth({
    //             user: JSON.parse(user),
    //             token: token,
    //             isLoading: false
    //         });
    //     }

    // }, []);

    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    const [auth, setAuth] = useState(() => {
        return {
            user: user ? JSON.parse(user) : null,
            token: token || null,
            isloading: (user && token) ? false : true
        };
    });

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;