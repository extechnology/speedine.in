import { useEffect, useState } from "react";
import { X } from "lucide-react";
import type {
  AddressPayload,
  AddressResponse,
} from "../../services/addressService";

interface AddressModalProps {
  open: boolean;
  initialData: AddressResponse | null;
  onClose: () => void;
  onSubmit: (data: AddressPayload) => Promise<void>;
}

const emptyForm: AddressPayload = {
  name: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  country: "India",
  pincode: "",
  type: "home",
  is_default: false,
};

const AddressModal = ({
  open,
  initialData,
  onClose,
  onSubmit,
}: AddressModalProps) => {
  const [form, setForm] = useState<AddressPayload>(emptyForm);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      const { id, user, created, ...rest } = initialData;
      setForm(rest);
    } else {
      setForm(emptyForm);
    }
  }, [initialData]);

  if (!open) return null;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit(form);
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-gray-100">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-xl font-semibold text-[#640000]">
            {initialData ? "Edit Address" : "Add New Address"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Full Name"
              required
              className="input"
            />

            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email Address"
              required
              className="input"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              maxLength={10}
              placeholder="Phone Number"
              required
              className="input"
            />

            <select
              name="country"
              value={form.country}
              onChange={handleChange}
              className="input"
              required
            >
              <option value="India">India</option>
              <option value="United States">United States</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="Australia">Australia</option>
            </select>
          </div>

          <textarea
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Street address"
            required
            className="input h-24 resize-none"
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <input
              name="city"
              value={form.city}
              onChange={handleChange}
              placeholder="City"
              required
              className="input"
            />

            <input
              name="state"
              value={form.state}
              onChange={handleChange}
              placeholder="State"
              required
              className="input"
            />

            <input
              name="pincode"
              value={form.pincode}
              onChange={handleChange}
              placeholder="Pincode"
              required
              className="input"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="input"
            >
              <option value="home">Home</option>
              <option value="work">Work</option>
              <option value="other">Other</option>
            </select>

            <label className="flex items-center gap-3 text-sm text-gray-700">
              <input
                type="checkbox"
                name="is_default"
                checked={form.is_default}
                onChange={handleChange}
                className="w-4 h-4 accent-[#DBB737]"
              />
              Set as default address
            </label>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 rounded-lg bg-linear-to-r from-[#DBB737] to-[#D1A837] text-white font-medium hover:opacity-90 transition disabled:opacity-60"
            >
              {loading
                ? "Saving..."
                : initialData
                ? "Update Address"
                : "Add Address"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddressModal;
