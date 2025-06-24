"use client"
import { CheckCircle, Copy, ExternalLink, User, Lock, Globe, AlertTriangle } from "lucide-react"
import { motion } from "framer-motion"
import { useState } from "react"

interface SuccessModalProps {
  transactionData: any
  onClose: () => void
}

export default function SuccessModal({ transactionData, onClose }: SuccessModalProps) {
  const [copiedField, setCopiedField] = useState("")

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text)
    setCopiedField(field)
    setTimeout(() => setCopiedField(""), 2000)
  }

  const openPanel = () => {
    if (transactionData?.loginUrl) {
      window.open(transactionData.loginUrl, "_blank")
    }
  }

  console.log("Success Modal - Transaction Data:", transactionData)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-gray-900 rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center mb-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="mx-auto w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-4"
          >
            <CheckCircle className="w-8 h-8 text-white" />
          </motion.div>
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
            Payment Successful!
          </h2>
          <p className="text-gray-400 mt-2">Your panel has been created successfully</p>
        </div>

        <div className="space-y-4">
          {/* Transaction Details */}
          <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="font-bold mb-3 text-green-400">Transaction Details</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Transaction ID:</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono">{transactionData?.id}</span>
                  <button
                    onClick={() => copyToClipboard(transactionData?.id, "transactionId")}
                    className="p-1 hover:bg-gray-700 rounded"
                  >
                    <Copy className="w-3 h-3" />
                  </button>
                  {copiedField === "transactionId" && <span className="text-green-400 text-xs">Copied!</span>}
                </div>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Product:</span>
                <span>{transactionData?.product}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Price:</span>
                <span className="font-bold text-purple-400">{transactionData?.priceFormatted}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Date:</span>
                <span>{transactionData?.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Payment Method:</span>
                <span>{transactionData?.paymentMethod}</span>
              </div>
            </div>
          </div>

          {/* Panel Access Details */}
          <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="font-bold mb-3 text-blue-400">Panel Access Details</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  <Globe className="w-4 h-4 inline mr-1" />
                  Panel URL:
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={transactionData?.loginUrl || "https://galangcoganzz.dzhost.my.id"}
                    readOnly
                    className="flex-1 bg-gray-700 px-3 py-2 rounded text-sm font-mono"
                  />
                  <button
                    onClick={() =>
                      copyToClipboard(transactionData?.loginUrl || "https://galangcoganzz.dzhost.my.id", "loginUrl")
                    }
                    className="p-2 hover:bg-gray-700 rounded"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  {copiedField === "loginUrl" && <span className="text-green-400 text-xs">Copied!</span>}
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  <User className="w-4 h-4 inline mr-1" />
                  Username:
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={transactionData?.username || transactionData?.customerData?.username || "N/A"}
                    readOnly
                    className="flex-1 bg-gray-700 px-3 py-2 rounded text-sm font-mono"
                  />
                  <button
                    onClick={() =>
                      copyToClipboard(transactionData?.username || transactionData?.customerData?.username, "username")
                    }
                    className="p-2 hover:bg-gray-700 rounded"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  {copiedField === "username" && <span className="text-green-400 text-xs">Copied!</span>}
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  <Lock className="w-4 h-4 inline mr-1" />
                  Password:
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={transactionData?.password || transactionData?.customerData?.password || "N/A"}
                    readOnly
                    className="flex-1 bg-gray-700 px-3 py-2 rounded text-sm font-mono"
                  />
                  <button
                    onClick={() =>
                      copyToClipboard(transactionData?.password || transactionData?.customerData?.password, "password")
                    }
                    className="p-2 hover:bg-gray-700 rounded"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  {copiedField === "password" && <span className="text-green-400 text-xs">Copied!</span>}
                </div>
              </div>

              {/* Server Details */}
              {transactionData?.serverId && (
                <div className="mt-4 p-3 bg-gray-700 rounded-lg">
                  <h4 className="font-bold text-sm text-gray-300 mb-2">Server Information:</h4>
                  <div className="text-xs space-y-1 text-gray-400">
                    <div>Server ID: {transactionData.serverId}</div>
                    <div>User ID: {transactionData.userId}</div>
                    {transactionData.panelData?.serverName && (
                      <div>Server Name: {transactionData.panelData.serverName}</div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Demo Mode Notice */}
          {transactionData?.panelData?.demoMode && (
            <div className="bg-yellow-900/20 border border-yellow-500/30 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-5 h-5 text-yellow-400" />
                <h3 className="font-bold text-yellow-400">Demo Mode</h3>
              </div>
              <p className="text-sm text-gray-300">
                This is running in demo mode. To create real panel accounts, please configure your Pterodactyl API keys
                in the environment variables.
              </p>
            </div>
          )}

          {/* Error Message */}
          {transactionData?.error && (
            <div className="bg-red-900/20 border border-red-500/30 p-4 rounded-lg">
              <h3 className="font-bold text-red-400 mb-2">Notice:</h3>
              <p className="text-sm text-gray-300">{transactionData.error}</p>
              <p className="text-sm text-gray-400 mt-2">Please contact support at WhatsApp: 08881382817</p>
            </div>
          )}

          {/* Important Notes */}
          <div className="bg-blue-900/20 border border-blue-500/30 p-4 rounded-lg">
            <h3 className="font-bold text-blue-400 mb-2">Important Notes:</h3>
            <ul className="text-sm space-y-1 text-gray-300">
              <li>• Save your login credentials in a secure place</li>
              <li>• Your panel is active immediately</li>
              <li>• Contact support if you need assistance</li>
              <li>• Panel includes automatic backups</li>
              <li>• Login URL: {transactionData?.loginUrl || "https://galangcoganzz.dzhost.my.id"}</li>
            </ul>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={openPanel}
            className="flex-1 px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
          >
            <ExternalLink className="w-4 h-4" />
            Open Panel
          </button>
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
          >
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}
