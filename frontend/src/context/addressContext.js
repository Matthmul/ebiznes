import { useState, createContext } from "react";
import { addressHook } from "../hooks/addressHook";

export const AddressContext = createContext({
    addressId: -1,
    setAddressId: () => {
        // Intentional empty
    },
    saveAddress: () => {
        // Intentional empty
    },
});

export const AddressContextProvider = ({ children }) => {
    const [addressId, setAddressId] = useState(-1);

    const saveAddress = (data) => {
        addressHook.sendAddress(data).then(
            (status) => {
                setAddressId(status.id)
                console.log(status.id);
            },
            () => {
                console.error("Błąd serwera")
            });
    }

    return (
        <AddressContext.Provider value={{
            addressId,
            setAddressId,
            saveAddress
        }}>
            {children}
        </AddressContext.Provider>
    )
}