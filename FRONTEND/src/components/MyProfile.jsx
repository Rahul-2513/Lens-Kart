import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const API_BASE = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

const AVATARS = {
  male: "https://png.pngtree.com/png-clipart/20200224/original/pngtree-cartoon-color-simple-male-avatar-png-image_5230557.jpg",
  female:
    "https://img.freepik.com/premium-vector/avatar-profile-icon-flat-style-female-user-profile-vector-illustration-isolated-background-women-profile-sign-business-concept_157943-38866.jpg?semt=ais_hybrid&w=740",
};

const Profile = () => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    avatar: "",
    address: {
      firstName: "",
      lastName: "",
      phone: "",
      street: "",
      area: "",
      city: "",
      pincode: "",
      state: "",
      country: "",
    },
  });

  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    axios
      .get(`${API_BASE}/api/user/profile`)
      .then((res) => setProfile(res.data))
      .catch((err) => {
        console.error(err.response?.data || err);
        toast.error("Failed to fetch profile.");
      })
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        [name]: value,
      },
    }));
  };

  const handleAvatarSelect = (url) => {
    setProfile((prev) => ({ ...prev, avatar: url }));
  };

  const handleSave = () => {
    const updatedData = {
      name: profile.name,
      email: profile.email,
      avatar: profile.avatar,
      address: profile.address,
      ...(newPassword && { password: newPassword }),
    };

    axios
      .put(`${API_BASE}/api/user/profile`, updatedData)
      .then((res) => {
        setProfile(res.data);
        setEditing(false);
        setNewPassword("");
        toast.success("Profile updated successfully!");
      })
      .catch((err) => {
        console.error(err.response?.data || err);
        toast.error("Update failed.");
      });
  };

  if (loading)
    return (
      <p className="text-center py-10 text-gray-500">Loading profile...</p>
    );

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-md rounded-2xl p-6 space-y-4">
      <h2 className="text-2xl font-bold text-center">My Profile</h2>

      {editing ? (
        <div className="space-y-4">
          <div className="text-center">
            <img
              src={profile.avatar}
              alt="avatar"
              className="mx-auto w-24 h-24 rounded-full border"
            />
            <p className="text-sm text-gray-600 mt-1">Choose Avatar</p>
            <div className="flex justify-center gap-4 mt-2">
              <img
                src={AVATARS.male}
                alt="Male"
                className={`w-12 h-12 cursor-pointer rounded-full border-2 ${
                  profile.avatar === AVATARS.male
                    ? "border-blue-500"
                    : "border-gray-300"
                }`}
                onClick={() => handleAvatarSelect(AVATARS.male)}
              />
              <img
                src={AVATARS.female}
                alt="Female"
                className={`w-12 h-12 cursor-pointer rounded-full border-2 ${
                  profile.avatar === AVATARS.female
                    ? "border-pink-500"
                    : "border-gray-300"
                }`}
                onClick={() => handleAvatarSelect(AVATARS.female)}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              className="w-full border rounded px-3 py-2"
              name="name"
              value={profile.name}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              className="w-full border rounded px-3 py-2"
              name="email"
              value={profile.email}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium">
              New Password (optional)
            </label>
            <input
              className="w-full border rounded px-3 py-2"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Leave blank to keep current"
            />
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold mt-4">Address</h3>
            {[
              ["firstName", "First Name"],
              ["lastName", "Last Name"],
              ["phone", "Phone Number"],
              ["street", "Street"],
              ["area", "Area"],
              ["city", "City"],
              ["pincode", "Pincode"],
              ["state", "State"],
              ["country", "Country"],
            ].map(([name, label]) => (
              <input
                key={name}
                className="w-full border rounded px-3 py-2"
                name={name}
                value={profile.address?.[name] || ""}
                onChange={handleAddressChange}
                placeholder={label}
              />
            ))}
          </div>

          <div className="flex justify-between">
            <button
              onClick={handleSave}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Save
            </button>
            <button
              onClick={() => setEditing(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-3 text-center">
          <img
            src={profile.avatar}
            alt="avatar"
            className="mx-auto w-24 h-24 rounded-full border"
          />
          <p className="text-xl font-semibold">{profile.name}</p>
          <p className="text-gray-600">{profile.email}</p>

          {profile.address && (
            <div className="text-sm text-gray-500 mt-2 space-y-1">
              <p>
                {profile.address.firstName} {profile.address.lastName}
              </p>
              <p>{profile.address.phone}</p>
              <p>
                {profile.address.street}, {profile.address.area}
              </p>
              <p>
                {profile.address.city} - {profile.address.pincode}
              </p>
              <p>
                {profile.address.state}, {profile.address.country}
              </p>
            </div>
          )}

          <button
            onClick={() => setEditing(true)}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
