import { WorkoutsContext } from '../context/WorkoutsContext'
import { useContext } from 'react'

export const useWorkoutsContext = () =>{
    const context = useContext(WorkoutsContext) // This returns state and dispatch objects from the providers from workoutsContext

    if (!context) {
        throw Error ('useWorkoutsContext must be used inside an WorkoutsContextProvider')
    }

    return context
}