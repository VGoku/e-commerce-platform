import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserCircleIcon, CameraIcon } from '@heroicons/react/24/outline'
import useAuthStore from '../stores/useAuthStore'
import { supabase } from '../lib/supabase'
import toast from 'react-hot-toast'

export default function Profile() {
    const navigate = useNavigate()
    const { user } = useAuthStore()
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [uploading, setUploading] = useState(false)
    const fileInputRef = useRef(null)
    const [formData, setFormData] = useState({
        full_name: '',
        username: '',
        avatar_url: '',
        bio: ''
    })

    useEffect(() => {
        if (!user) {
            navigate('/login')
            return
        }
        fetchProfile()
    }, [user, navigate])

    async function fetchProfile() {
        try {
            setLoading(true)
            console.log('Fetching profile for user:', user.id)

            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', user.id)
                .single()

            if (error) {
                console.error('Error fetching profile:', error)
                if (error.code === 'PGRST116') {
                    // Profile doesn't exist, create it
                    const newProfile = {
                        id: user.id,
                        full_name: '',
                        username: user.user_metadata?.username || '',
                        avatar_url: '',
                        bio: '',
                        updated_at: new Date().toISOString()
                    }

                    const { error: insertError } = await supabase
                        .from('profiles')
                        .insert([newProfile])

                    if (insertError) {
                        throw insertError
                    }

                    setFormData(newProfile)
                } else {
                    throw error
                }
            } else if (data) {
                console.log('Profile data received:', data)
                setFormData({
                    full_name: data.full_name || '',
                    username: data.username || user.user_metadata?.username || '',
                    avatar_url: data.avatar_url || '',
                    bio: data.bio || ''
                })
            }
        } catch (error) {
            console.error('Error in profile operation:', error)
            toast.error('Error loading profile. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    async function updateProfile() {
        try {
            setSaving(true)
            console.log('Updating profile for user:', user.id)

            if (!formData.username.trim()) {
                toast.error('Username is required')
                return
            }

            const updates = {
                id: user.id,
                full_name: formData.full_name.trim(),
                username: formData.username.trim(),
                avatar_url: formData.avatar_url,
                bio: formData.bio.trim(),
                updated_at: new Date().toISOString()
            }

            console.log('Sending profile updates:', updates)

            const { error } = await supabase
                .from('profiles')
                .upsert(updates)

            if (error) throw error

            // Update the username in auth metadata
            const { error: metadataError } = await supabase.auth.updateUser({
                data: { username: formData.username.trim() }
            })

            if (metadataError) throw metadataError

            toast.success('Profile updated successfully!')
            await fetchProfile() // Refresh the profile data
        } catch (error) {
            console.error('Error updating profile:', error)
            toast.error(error.message || 'Error updating profile')
        } finally {
            setSaving(false)
        }
    }

    async function uploadAvatar(event) {
        try {
            setUploading(true)

            if (!event.target.files || event.target.files.length === 0) {
                throw new Error('You must select an image to upload.')
            }

            const file = event.target.files[0]
            const fileExt = file.name.split('.').pop()
            const filePath = `${user.id}-${Math.random()}.${fileExt}`

            const { error: uploadError } = await supabase.storage
                .from('avatars')
                .upload(filePath, file)

            if (uploadError) {
                throw uploadError
            }

            // Get public URL
            const { data } = supabase.storage
                .from('avatars')
                .getPublicUrl(filePath)

            // Update profile with new avatar URL
            const updates = {
                ...formData,
                avatar_url: data.publicUrl,
                id: user.id,
                updated_at: new Date().toISOString()
            }

            const { error: updateError } = await supabase
                .from('profiles')
                .upsert(updates)

            if (updateError) throw updateError

            setFormData(prev => ({
                ...prev,
                avatar_url: data.publicUrl
            }))

            toast.success('Avatar updated successfully!')
        } catch (error) {
            console.error('Error uploading avatar:', error)
            toast.error(error.message || 'Error uploading avatar')
        } finally {
            setUploading(false)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        await updateProfile()
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleAvatarClick = () => {
        fileInputRef.current?.click()
    }

    if (!user) return null

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
            </div>
        )
    }

    return (
        <div className="py-6">
            <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                <div className="overflow-hidden bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                    <div className="px-4 py-5 sm:px-6">
                        <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">Profile Settings</h3>
                        <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
                            Manage your profile information and preferences
                        </p>
                    </div>

                    <div className="border-t border-gray-200 dark:border-gray-700">
                        <form onSubmit={handleSubmit} className="space-y-6 px-4 py-5 sm:p-6">
                            {/* Profile Picture Section */}
                            <div className="flex items-center space-x-6">
                                <div className="flex-shrink-0">
                                    <div className="relative">
                                        {formData.avatar_url ? (
                                            <img
                                                className="h-24 w-24 rounded-full object-cover"
                                                src={formData.avatar_url}
                                                alt="Profile"
                                            />
                                        ) : (
                                            <div className="h-24 w-24 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                                                <UserCircleIcon className="h-12 w-12 text-gray-400" />
                                            </div>
                                        )}
                                        <button
                                            type="button"
                                            onClick={handleAvatarClick}
                                            disabled={uploading}
                                            className="absolute bottom-0 right-0 rounded-full bg-white dark:bg-gray-700 p-1.5 shadow-sm border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                                        >
                                            <CameraIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                                        </button>
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            onChange={uploadAvatar}
                                            accept="image/*"
                                            className="hidden"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                                        {uploading ? 'Uploading...' : 'Profile Picture'}
                                    </h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        {uploading
                                            ? 'Please wait while we upload your photo...'
                                            : 'Click the camera icon to upload a new photo'
                                        }
                                    </p>
                                </div>
                            </div>

                            {/* Full Name */}
                            <div>
                                <label htmlFor="full_name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Full Name
                                </label>
                                <div className="mt-1">
                                    <input
                                        type="text"
                                        name="full_name"
                                        id="full_name"
                                        className="input"
                                        value={formData.full_name}
                                        onChange={handleChange}
                                        placeholder="Enter your full name"
                                    />
                                </div>
                            </div>

                            {/* Username */}
                            <div>
                                <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Username
                                </label>
                                <div className="mt-1">
                                    <input
                                        type="text"
                                        name="username"
                                        id="username"
                                        className="input"
                                        value={formData.username}
                                        onChange={handleChange}
                                        required
                                        minLength={3}
                                        placeholder="Choose a unique username"
                                    />
                                </div>
                                <p className="mt-1 text-sm text-gray-500">This is your public display name.</p>
                            </div>

                            {/* Email */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Email
                                </label>
                                <div className="mt-1">
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        className="input"
                                        value={user.email}
                                        disabled
                                    />
                                </div>
                                <p className="mt-1 text-sm text-gray-500">Your email cannot be changed.</p>
                            </div>

                            {/* Bio */}
                            <div>
                                <label htmlFor="bio" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Bio
                                </label>
                                <div className="mt-1">
                                    <textarea
                                        name="bio"
                                        id="bio"
                                        rows={3}
                                        className="input"
                                        value={formData.bio}
                                        onChange={handleChange}
                                        placeholder="Tell us a little about yourself"
                                    />
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => navigate(-1)}
                                    className="btn btn-secondary"
                                    disabled={saving}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    disabled={saving}
                                >
                                    {saving ? 'Saving...' : 'Save Changes'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
} 