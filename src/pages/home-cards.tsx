import { useEffect, useReducer, useState } from "react"
import AuthLayout from "../layout/AuthLayout"
import logOut from "../firebase/auth/logOut";
import { HomeCard } from "../components/Homes/HomeCard"
import { Home } from "../types/Home";
import { HomesReducer, State, setHomes, addHome, setSelectedHome, removeHome, updateHome } from "../reducers/HomesReducer";
import * as HomeDummyData from "../../data/initial.json"
import { HomeDetailModal } from "../components/Homes/HomeDetailModal";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const initialState: State = {
    homes: [],
    selectedHome: null,
};

const HomeCardsPage = () => {
    const [homeDetailModalOpen, setHomeDetailModalOpen] = useState(false)
    const [state, dispatch] = useReducer(HomesReducer, initialState);
    const sampleHome = JSON.parse(JSON.stringify(HomeDummyData))
    const fetchAllHomes = async () => {
        try {
            const response = await fetch('/api/getAllHomes');
            if (!response.ok) {
                throw new Error(`Request failed with status: ${response.status}`);
            }
            const data = await response.json();
            dispatch(setHomes(data));
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const addNewHome = async () => {
        try {
            const response = await fetch('/api/addNewHome', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(sampleHome),
            });
            if (!response.ok) {
                throw new Error(`Request failed with status: ${response.status}`);
            }
            const data = await response.json();
            dispatch(addHome(data));
            toast.success("Successfully added new home");
        } catch (error) {
            console.error('Error adding new home:', error);
        }
    };

    const deleteHome = async (id: number | undefined) => {
        try {
            const response = await fetch('/api/deleteHome', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(id),
            })
            if (!response.ok) {
                toast.error("Unabled to delete home");
            } else {
                dispatch(removeHome(id ?? 0));
                toast.success("Successfully deleted home");
                setHomeDetailModalOpen(false)
            }
        }
        catch (error) {
            console.error('Error deleting  home:', error);
        }
    }

    const updateHomeDetail = async (home: Home) => {
        try {
            const response = await fetch('/api/updateHome', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(home),
            })
            if (!response.ok) {
                toast.error("Unabled to update home details");
            } else {
                dispatch(updateHome(home));
                toast.success("Successfully updated home");
                setHomeDetailModalOpen(false)
            }
        }
        catch (error) {
            console.error('Error updating  home:', error);
        }
    }

    const setHome = (home: Home) => {
        dispatch(setSelectedHome(home))
        setHomeDetailModalOpen(true)
    }

    useEffect(() => {
        fetchAllHomes()
    }, [])

    console.log("state", state)

    return (
        <div>
            <div className="m-6 flex justify-between">
                <button className="bg-primary text-white py-3 px-4 rounded-md" onClick={addNewHome}>Add new home</button>
                <button className="bg-primary text-white py-3 px-4 rounded-md" onClick={logOut}>Sign out</button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {state.homes && state.homes?.map((home: Home) => {
                    return <HomeCard home={home} key={home.id} handleSetHome={setHome} />;
                })}
            </div>
            {homeDetailModalOpen && <HomeDetailModal isOpen={homeDetailModalOpen} onClose={() => setHomeDetailModalOpen(false)} home={state.selectedHome} handleDelete={deleteHome} updateHome={updateHomeDetail} />}
            <ToastContainer />
        </div>


    )
}
export default function HomeCards() {
    return (
        <AuthLayout>
            <HomeCardsPage />
        </AuthLayout>
    );
}

