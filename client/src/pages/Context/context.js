import React, {useState, useEffect} from 'react'
import useApi from '../../helpers/BookAPI'
import Cookie from 'js-cookie'

export const context = React.createContext()

const Store = ({children}) => {
    const [state, setState] = useState(null)
    const api = useApi()

    
    useEffect(() => {
        if (Cookie.get('status') == "Logado"){
            api.getUserInfo().then(res => {
                setState(res)
            }).catch(err => {
                Cookie.remove('status')
            })
        }

    },[])


    return (
        <context.Provider value={state}>
            {children}
        </context.Provider>
    )
}

export default Store