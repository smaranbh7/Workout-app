import { AuthContext } from '../context/AuthContext'
import { useContext } from 'react'

export const useAuthContext = () =>{
    const context = useContext(AuthContext) // This returns state and dispatch objects from the providers from workoutsContext

    if (!context) {
        throw Error ('useAuthContext must be used inside an AuthContextProvider')
    }

    return context
}