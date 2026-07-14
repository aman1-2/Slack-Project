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
    //     try{
    //         const user = localStorage.getItem('user');
    //         const token = localStorage.getItem('token');

    //         if(user && token) {
    //             // setUser(JSON.parse(user));
    //             // setToken(token);

    //             setAuth({
    //                 user: user ? JSON.parse(user) : null,
    //                 token: token || null,
    //                 isLoading: (user && token) || (!user || !token) ? false : true
    //             });
    //         }
    //     } catch(error) {
    //         console.log('Failed to load auth data: ', error);

    //         setAuth({
    //             user: null,
    //             token: null,
    //             isLoading: false
    //         });
    //     }

    // }, []);

    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    const [auth, setAuth] = useState(() => {
        try{
            return {
            user: user ? JSON.parse(user) : null,
            token: token || null,
            isLoading:  false
        };
        } catch(error) {
            console.log('Failed to load auth data: ', error);

            return({
                user: null,
                token: null,
                isLoading: false
            });
        }
    });

    async function logout() {
        localStorage.removeItem('user');
        localStorage.removeItem('token');

        setAuth({
            user: null,
            token: null,
            isLoading: false
        });
    }

    return (
        <AuthContext.Provider value={{ auth, setAuth, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;