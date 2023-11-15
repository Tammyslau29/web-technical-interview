import { useContext, useEffect, useState } from "react"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import * as HomeDummyData from "../../data/initial.json"
import { HomeCard } from "../components/Homes/HomeCard"
import { HomeDetailModal } from "../components/Homes/HomeDetailModal"
import HomeContext from "../context/HomeContext"
import logOut from "../firebase/auth/logOut"
import AuthLayout from "../layout/AuthLayout"
import { addHome, setHomes } from "../reducers/HomesReducer"
import { Home } from "../types/Home"

const HomeCardsPage = () => {
  const [homeDetailModalOpen, setHomeDetailModalOpen] = useState(false)
  const homeCtx = useContext(HomeContext)
  const { homes, dispatch } = homeCtx
  const sampleHome = JSON.parse(JSON.stringify(HomeDummyData))
  const fetchAllHomes = async () => {
    try {
      const response = await fetch("/api/getAllHomes")
      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`)
      }
      const data = await response.json()
      dispatch(setHomes(data))
    } catch (error) {
      console.error("Error fetching data:", error)
    }
  }

  const addNewHome = async () => {
    try {
      const response = await fetch("/api/addNewHome", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sampleHome),
      })
      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`)
      }
      const data = await response.json()
      dispatch(addHome(data))
      toast.success("Successfully added new home")
    } catch (error) {
      console.error("Error adding new home:", error)
    }
  }

  useEffect(() => {
    fetchAllHomes()
  }, [])

  return (
    <div>
      <div className="m-6 flex justify-between">
        <button
          className="bg-primary text-white py-3 px-4 rounded-md"
          onClick={addNewHome}
        >
          Add new home
        </button>
        <button
          className="bg-primary text-white py-3 px-4 rounded-md"
          onClick={logOut}
        >
          Sign out
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {homes &&
          homes?.map((home: Home) => {
            return (
              <HomeCard
                home={home}
                key={home.id}
                handleSetHome={() => setHomeDetailModalOpen(true)}
              />
            )
          })}
      </div>
      {homeDetailModalOpen && (
        <HomeDetailModal
          isOpen={homeDetailModalOpen}
          onClose={() => setHomeDetailModalOpen(false)}
        />
      )}
      <ToastContainer />
    </div>
  )
}
export default function HomeCards() {
  return (
    <AuthLayout>
      <HomeCardsPage />
    </AuthLayout>
  )
}
