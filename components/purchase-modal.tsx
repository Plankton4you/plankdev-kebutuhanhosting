"use client"

import { useState } from "react"
import { X, User, Mail, Phone, Server } from "lucide-react"
import { motion } from "framer-motion"

interface PurchaseModalProps {
  product: any
  onClose: () => void
  onSubmit: (data: any) => void
}

export default function PurchaseModal({ product, onClose, onSubmit }: PurchaseModalProps) {
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    selectedPlan: product?.id || "",
    username: "",
    password: "",
  })

  const [errors, setErrors] = useState({})

  const validateForm = () => {
    const newErrors = {}

    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }

    if (!formData.phone) {
      newErrors.phone = "Phone number is required"
    } else if (!/^(\+62|62|0)[0-9]{9,13}$/.test(formData.phone)) {
      newErrors.phone = "Phone number is invalid"
    }

    if (!formData.username) {
      newErrors.username = "Username is required"
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      onSubmit(formData)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-gray-900 rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            Purchase {product?.name}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mb-6 p-4 bg-gray-800 rounded-lg">
          <h3 className="font-bold text-lg mb-2">{product?.name}</h3>
          <p className="text-purple-400 font-bold text-xl">{product?.price}</p>
          {product?.specs && (
            <div className="mt-3 text-sm text-gray-300">
              <div className="grid grid-cols-2 gap-2">
                <div>RAM: {product.specs.ram}</div>
                <div>CPU: {product.specs.cpu}</div>
                <div>Disk: {product.specs.disk}</div>
                <div>Databases: {product.specs.databases}</div>
              </div>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              <Mail className="w-4 h-4 inline mr-2" />
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 ${
                errors.email ? "focus:ring-red-500 border border-red-500" : "focus:ring-purple-600"
              }`}
              placeholder="your@email.com"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              <Phone className="w-4 h-4 inline mr-2" />
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 ${
                errors.phone ? "focus:ring-red-500 border border-red-500" : "focus:ring-purple-600"
              }`}
              placeholder="08xxxxxxxxxx"
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              <User className="w-4 h-4 inline mr-2" />
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 ${
                errors.username ? "focus:ring-red-500 border border-red-500" : "focus:ring-purple-600"
              }`}
              placeholder="Choose a username"
            />
            {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              <Server className="w-4 h-4 inline mr-2" />
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 ${
                errors.password ? "focus:ring-red-500 border border-red-500" : "focus:ring-purple-600"
              }`}
              placeholder="Choose a secure password"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Continue to Payment
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}
