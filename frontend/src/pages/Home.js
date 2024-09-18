import { useEffect } from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'

//components
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm'


const Home = () =>{
    const {workouts, dispatch } = useWorkoutsContext()
    
    
    useEffect(() => {  //this fires a function when the component is rendered. [] (dependency array)-> fires once 
        const fetchWorkouts = async () => {
            const response = await fetch('/api/workouts') // to solve cors error (added proxy in pacakage-json)
            const json = await response.json()

            if(response.ok){
                //setWorkouts(json)  // setting state to response if the response is okay
                dispatch({type: 'SET_WORKOUTS', payload: json})
            }
        }
        fetchWorkouts()
    },[dispatch])
    
    return (
        <div className="home">
            <div className="workouts">
                {workouts && workouts.map((workout) =>(  //if there is workouts then run map
                    <WorkoutDetails key={workout._id} workout={workout} />  //passing workout as prop to the WorkoutDetails component
                ))}
            </div>
            <WorkoutForm />
        </div>
    )
}

export default Home