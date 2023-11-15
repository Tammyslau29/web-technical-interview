import Image from "next/image"
import { useContext } from "react"
import HomeContext from "../../context/HomeContext"
import { setSelectedHome } from "../../reducers/HomesReducer"
import { Home } from "../../types/Home"
interface HomeCardProp {
  home: Home
  handleSetHome: () => void
}

export const HomeCard = ({ home, handleSetHome }: HomeCardProp) => {
  const homeCtx = useContext(HomeContext)
  const { dispatch } = homeCtx

  const {
    address,
    zipCode,
    city,
    state,
    yearBuilt,
    bedrooms,
    bathrooms,
    sqft,
  } = home

  const handleOpenHomeModal = () => {
    dispatch(setSelectedHome(home))
    handleSetHome()
  }

  return (
    <div className="max-w-sm mx-auto px-4 sm:px-6 lg:px-8 relative">
      <img
        className="rounded-lg"
        src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2Ffb%2F83%2F84%2Ffb8384c29f637cb6539a100c001eb233.jpg&f=1&nofb=1&ipt=0df878a0b8db0e3da45d094585e3f91855c8f19217afa2e70ba49f2002ff77c2&ipo=images"
        alt=""
      />
      <div
        style={{ backgroundColor: "white" }}
        className="bg-white h-30 flex-row justify-between shadow-lg rounded-lg relative bottom-10 p-4"
      >
        <div className="justify-between flex">
          <div>
            <div className="text-xl font-bold">{address}</div>
            <div>
              {city}, {state} {zipCode}
            </div>
          </div>
          <button
            style={{ height: "30px", width: "30px" }}
            className="bg-primary text-white"
            onClick={handleOpenHomeModal}
          >
            →
          </button>
        </div>
        <div className="flex justify-between flex-row mt-6 text-xs">
          <div className=" flex items-center">
            <Image src="/sleeping.png" alt="Bedrooms" width={20} height={20} />
            <div className="ml-1">{bedrooms}</div>
          </div>
          <div className=" flex items-center">
            <Image src="/bath.png" alt="Bathrooms" width={20} height={20} />
            <div className="ml-1">{bathrooms}</div>
          </div>
          <div className=" flex items-center">
            <Image
              src="/calendar.png"
              alt="Year Built"
              width={18}
              height={18}
            />
            <div className="ml-1">{yearBuilt}</div>
          </div>
          <div className=" flex items-center">
            <Image src="/home.png" alt="Sqft" width={15} height={15} />
            <div className="ml-1">{sqft} sq ft</div>
          </div>
        </div>
      </div>
    </div>
  )
}
