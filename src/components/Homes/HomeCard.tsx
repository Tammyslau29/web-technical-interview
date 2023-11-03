import { Home } from "../../types/Home";
import Image from 'next/image';

interface HomeCardProp {
    home: Home;
}
export const HomeCard = ({ home }: HomeCardProp) => {
    const { address, fullAddress, zipCode, city, state, yearBuilt, bedrooms, bathrooms, sqft } = home
    return (
        <div className="max-w-sm mx-auto px-4 sm:px-6 lg:px-8 relative">
            <img className="rounded-lg" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2Ffb%2F83%2F84%2Ffb8384c29f637cb6539a100c001eb233.jpg&f=1&nofb=1&ipt=0df878a0b8db0e3da45d094585e3f91855c8f19217afa2e70ba49f2002ff77c2&ipo=images" alt="" />
            <div style={{ backgroundColor: 'white' }} className="bg-white h-30 flex-row justify-between shadow-lg rounded-lg relative bottom-10 p-4">
                <div className="text-xl font-bold">{address}</div>
                <div>{city}, {state} {zipCode}</div>
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
                        <Image src="/calendar.png" alt="Year Built" width={18} height={18} />
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