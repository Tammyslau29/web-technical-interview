import React, { useEffect, useState } from 'react';
import { Home } from '../../types/Home';
import Modal from 'react-modal';

interface HomeDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    home: Home | null;
    handleDelete: (id: number | undefined) => void;
    updateHome: (home: Home) => void;
}

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

export const HomeDetailModal = ({ isOpen, onClose, home, handleDelete, updateHome }: HomeDetailModalProps) => {
    const { id, fullAddress } = home || {}

    const [formData, setFormData] = useState({
        id: home?.id || 0,
        fullAddress: home?.fullAddress || '',
        address: home?.address || '',
        city: home?.city || '',
        state: home?.state || '',
        zipCode: home?.zipCode || '',
        bedrooms: home?.bedrooms || 0,
        bathrooms: home?.bathrooms || 0,
        yearBuilt: home?.yearBuilt || 0,
        sqft: home?.sqft || 0,
    });

    useEffect(() => {
        const fullAddress = `${formData.address}, ${formData.city} ${formData.state} ${formData.zipCode}`
        setFormData({ ...formData, fullAddress })
    }, [formData.address])

    return (

        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel={fullAddress}
            style={customStyles}

        >
            <div className="modal-content p-2">
                <h2 className="text-xl font-bold mb-4">{fullAddress}</h2>
                <div>
                    <label htmlFor="inputElement" className="block text-gray-700 font-bold">Address</label>
                    <input
                        className="appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline my-4"
                        id="address"
                        type="text"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    />
                    <label htmlFor="inputElement" className="block text-gray-700 font-bold">City</label>
                    <input
                        className="appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline my-4"
                        id="city"
                        type="text"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    />
                    <label htmlFor="inputElement" className="block text-gray-700 font-bold">State</label>
                    <input
                        className="appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline my-4"
                        id="state"
                        type="text"
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    />
                    <label htmlFor="inputElement" className="block text-gray-700 font-bold">Zipcode</label>
                    <input
                        className="appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline my-4"
                        id="zipCode"
                        type="text"
                        value={formData.zipCode}
                        onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                    />
                    <div className="flex items-center justify-between">
                        <label htmlFor="inputElement" className="block text-gray-700 font-bold mr-2">Bedrooms</label>
                        <input
                            className="appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline my-4 mr-2"
                            id="bedrooms"
                            type="number"
                            value={formData.bedrooms}
                            onChange={(e) => setFormData({ ...formData, bedrooms: parseInt(e.target.value) })}
                        />
                        <label htmlFor="inputElement" className="block text-gray-700 font-bold mr-2">Bathrooms</label>
                        <input
                            className="appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline my-4 mr-2"
                            id="bathrooms"
                            type="number"
                            value={formData.bathrooms}
                            onChange={(e) => setFormData({ ...formData, bathrooms: parseFloat(e.target.value) })}
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <label htmlFor="inputElement" className="block text-gray-700 font-bold mr-2">Year Built</label>
                        <input
                            className="appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline my-4 mr-2"
                            id="yearBuilt"
                            type="number"
                            value={formData.yearBuilt}
                            onChange={(e) => setFormData({ ...formData, yearBuilt: parseInt(e.target.value) })}
                        />
                        <label htmlFor="inputElement" className="block text-gray-700 font-bold mr-2">Sqft</label>
                        <input
                            className="appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline my-4 mr-2"
                            id="sqft"
                            type="number"
                            value={formData.sqft}
                            onChange={(e) => setFormData({ ...formData, sqft: parseInt(e.target.value) })}
                        />
                    </div>

                </div>
                <button
                    onClick={() => updateHome(formData)}
                    className="mt-4 bg-primary text-white py-2 px-4 rounded mr-2"
                >
                    Update
                </button>
                <button
                    onClick={() => handleDelete(id)}
                    className="mt-4 bg-red text-white py-2 px-4 rounded mr-2"
                    style={{ background: "red" }}
                >
                    Delete House
                </button>
                <button
                    onClick={onClose}
                    className="mt-4 bg-primary text-white py-2 px-4 rounded"
                >
                    Close
                </button>
            </div>
        </Modal >
    );
};
