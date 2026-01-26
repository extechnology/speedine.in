import axiosInstance from "../api/axiosInstance";



export interface AddressPayload {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  type: "home" | "work" | "other";
  is_default: boolean;
}


export interface AddressResponse extends AddressPayload {
  id: number;
  user: number;
  created: string;
}

export const getAddresses = async (): Promise<AddressResponse[]> => {
  const res = await axiosInstance.get("users/user-address/");
  return res.data;
};


export const addAddress = async (
  payload: AddressPayload
): Promise<AddressResponse> => {
  const res = await axiosInstance.post("users/user-address/", payload);
  return res.data;
};


export const updateAddress = async (
  id: number,
  payload: Partial<AddressPayload>
): Promise<AddressResponse> => {
  const res = await axiosInstance.patch(`users/user-address/${id}/`, payload);
  return res.data;
};


export const deleteAddress = async (id: number): Promise<void> => {
  await axiosInstance.delete(`users/user-address/${id}/`);
};


export const setDefaultAddress = async (
  id: number
): Promise<AddressResponse> => {
  const res = await axiosInstance.patch(`/addresses/${id}/`, {
    is_default: true,
  });
  return res.data;
};
