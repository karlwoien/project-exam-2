import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { updateProfileSchema } from "../../forms/validation/userSchema";
import { updateUserProfile } from "../../api"; 
import useAuthStore from "../../store/authStore";
import { toast } from "react-toastify";

export default function ProfileEditForm({ profile, onClose }) {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(updateProfileSchema),
        defaultValues: {
            bio: profile.bio || "",
            avatarUrl: profile.avatar?.url || "",
            bannerUrl: profile.banner?.url || "",
        },
    });

    const { user, token, updateProfile } = useAuthStore();

    const onSubmit = async (data) => {
        try {
            const updatedData = {
                bio: data.bio,
                avatar: { url: data.avatarUrl, alt: `${user.name}'s avatar` },
                banner: { url: data.bannerUrl, alt: `${user.name}'s banner` },
            };
    
            const updatedProfile = await updateUserProfile(user.name, updatedData, token);
            updateProfile(updatedProfile.data);
            toast.success("Update successful!", {
                position: "top-center",
                autoClose: 1000,
                onClose: () => {
                onClose();
            },
            });
        } catch (error) {
            toast.error ("Update failed. Please try again later!", {
                position: "top-center",
                autoClose: 1000,
            });
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-lg mb-4">Edit Profile</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label className="block mb-2">Bio</label>
                <textarea {...register("bio")} className="w-full p-2 border rounded-md" />
                <p className="text-red-500">{errors.bio?.message}</p>

                <label className="block mt-4 mb-2">Avatar URL</label>
                <input type="text" {...register("avatarUrl")} className="w-full p-2 border rounded-md" />
                <p className="text-red-500">{errors.avatarUrl?.message}</p>

                <label className="block mt-4 mb-2">Banner URL</label>
                <input type="text" {...register("bannerUrl")} className="w-full p-2 border rounded-md" />
                <p className="text-red-500">{errors.bannerUrl?.message}</p>

                <div className="flex justify-between mt-4">
                    <button type="submit" className="bg-bg-primary text-white px-4 py-2 rounded-full hover:bg-bg-highlight">Save</button>
                    <button type="button" onClick={onClose} className="bg-gray-400 text-white px-4 py-2 rounded-full hover:bg-gray-500">Cancel</button>
                </div>
            </form>
        </div>
    );
}