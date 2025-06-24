"use client"

import { useState } from "react"
import { X, CreditCard, Smartphone, Wallet, ExternalLink, CheckCircle, Clock, AlertCircle } from "lucide-react"
import { motion } from "framer-motion"

interface PaymentModalProps {
  product: any
  purchaseData: any
  onClose: () => void
  onComplete: (transaction: any) => void
}

export default function PaymentModal({ product, purchaseData, onClose, onComplete }: PaymentModalProps) {
  const [selectedPayment, setSelectedPayment] = useState("")
  const [showPaymentInfo, setShowPaymentInfo] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState("")
  const [isWaitingPayment, setIsWaitingPayment] = useState(false)
  const [statusMessage, setStatusMessage] = useState("")
  const [paymentProof, setPaymentProof] = useState("")

  const paymentMethods = [
    {
      id: "dana",
      name: "DANA",
      icon: Wallet,
      number: "08881382817", // Changed from 08881382818 to 08881382817
      color: "from-blue-500 to-blue-600",
    },
    {
      id: "gopay",
      name: "GoPay",
      icon: Smartphone,
      number: "083824299082",
      color: "from-green-500 to-green-600",
    },
    {
      id: "ovo",
      name: "OVO",
      icon: CreditCard,
      number: "08881382817", // Also update OVO to use the same number
      color: "from-purple-500 to-purple-600",
    },
    {
      id: "shopeepay",
      name: "ShopeePay",
      icon: Wallet,
      number: "08881382817", // Also update ShopeePay to use the same number
      color: "from-orange-500 to-red-500",
    },
  ]

  const generateTransactionId = () => {
    return "TXN" + Date.now() + Math.random().toString(36).substr(2, 5).toUpperCase()
  }

  const handlePaymentSelect = (method) => {
    setSelectedPayment(method.id)
    setShowPaymentInfo(true)
  }

  const handlePayNow = async (method) => {
    const transactionId = generateTransactionId()

    // Create transaction data
    const transaction = {
      id: transactionId,
      product: product.name,
      price: product.priceNum,
      priceFormatted: product.price,
      date: new Date().toLocaleDateString("id-ID"),
      customerData: purchaseData,
      paymentMethod: method.name,
      status: "waiting_payment",
    }

    // Set to waiting payment
    setPaymentStatus("waiting_payment")
    setIsWaitingPayment(true)
    setStatusMessage("Please complete your payment first")

    // Use specific DANA link for each product
    if (method.id === "dana" && product.danaLink) {
      window.open(product.danaLink, "_blank")
    } else {
      // Show manual payment instructions
      showManualPayment(method, product.priceNum, method.number, transactionId)
    }

    // Start checking for payment (in real app, this would be webhook-based)
    startPaymentVerification(transaction)
  }

  const showManualPayment = (method, amount, recipient, transactionId) => {
    const instructions = `
INSTRUKSI PEMBAYARAN ${method.name}:

1. Buka aplikasi ${method.name}
2. Pilih "Transfer" atau "Kirim Uang"  
3. Masukkan nomor: ${recipient}
4. Masukkan jumlah: Rp ${amount.toLocaleString("id-ID")}
5. Catatan: Panel-${transactionId}
6. SCREENSHOT bukti pembayaran
7. Kirim screenshot ke WhatsApp: 08881382817

⚠️ PENTING: Panel akan dibuat HANYA setelah pembayaran dikonfirmasi!
    `

    alert(instructions)
  }

  const startPaymentVerification = (transaction) => {
    setStatusMessage("Waiting for payment confirmation...")

    // In real implementation, this would check webhook or manual verification
    // For now, we'll simulate waiting for manual confirmation

    let checkCount = 0
    const maxChecks = 60 // 5 minutes maximum wait

    const checkInterval = setInterval(() => {
      checkCount++

      if (checkCount >= maxChecks) {
        clearInterval(checkInterval)
        setPaymentStatus("timeout")
        setStatusMessage("Payment verification timeout. Please contact support.")
        return
      }

      setStatusMessage(`Waiting for payment confirmation... (${checkCount}/60)`)

      // Simulate checking payment status
      // In real app, this would call an API to check payment status
      checkPaymentStatus(transaction.id).then((isPaid) => {
        if (isPaid) {
          clearInterval(checkInterval)
          handlePaymentConfirmed(transaction)
        }
      })
    }, 5000) // Check every 5 seconds
  }

  const checkPaymentStatus = async (transactionId) => {
    try {
      // In real implementation, this would check with payment provider or manual verification system
      const response = await fetch(`/api/check-payment/${transactionId}`)
      const data = await response.json()
      return data.isPaid || false
    } catch (error) {
      console.error("Error checking payment:", error)
      return false
    }
  }

  const handlePaymentConfirmed = async (transaction) => {
    setPaymentStatus("payment_confirmed")
    setStatusMessage("Payment confirmed! Creating your panel...")
    setIsWaitingPayment(false)

    try {
      // Now create the panel ONLY after payment is confirmed
      const response = await fetch("/api/create-panel", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          transaction: { ...transaction, status: "paid" },
          product,
          userData: purchaseData,
        }),
      })

      const responseData = await response.json()

      if (response.ok && !responseData.error) {
        const completeTransaction = {
          ...transaction,
          status: "completed",
          panelData: responseData,
          loginUrl: responseData.loginUrl || "https://galangcoganzz.dzhost.my.id",
          username: responseData.username || purchaseData.username,
          password: responseData.password || purchaseData.password,
          serverId: responseData.serverId,
          userId: responseData.userId,
          success: true,
        }

        setPaymentStatus("success")
        setStatusMessage("Panel created successfully!")

        setTimeout(() => {
          onComplete(completeTransaction)
        }, 1000)
      } else {
        throw new Error(responseData.error || "Failed to create panel")
      }
    } catch (error) {
      setPaymentStatus("error")
      setStatusMessage("Panel creation failed. Please contact support.")

      const errorTransaction = {
        ...transaction,
        status: "error",
        error: error.message,
        loginUrl: "https://galangcoganzz.dzhost.my.id",
        username: purchaseData.username,
        password: purchaseData.password,
      }

      setTimeout(() => {
        onComplete(errorTransaction)
      }, 2000)
    }
  }

  // Manual payment confirmation (for admin use)
  const handleManualConfirm = () => {
    if (!paymentProof.trim()) {
      alert("Please enter payment proof/reference number")
      return
    }

    const transaction = {
      id: generateTransactionId(),
      product: product.name,
      price: product.priceNum,
      priceFormatted: product.price,
      date: new Date().toLocaleDateString("id-ID"),
      customerData: purchaseData,
      paymentMethod: paymentMethods.find((m) => m.id === selectedPayment)?.name,
      status: "manual_confirmed",
      paymentProof: paymentProof,
    }

    handlePaymentConfirmed(transaction)
  }

  if (showPaymentInfo) {
    const method = paymentMethods.find((m) => m.id === selectedPayment)
    const Icon = method?.icon

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        onClick={!isWaitingPayment ? onClose : undefined}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-gray-900 rounded-lg p-6 w-full max-w-md"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              Payment Required
            </h2>
            {!isWaitingPayment && (
              <button onClick={onClose} className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          <div className="space-y-4">
            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="font-bold mb-2">Order Summary</h3>
              <div className="flex justify-between">
                <span>{product.name}</span>
                <span className="font-bold text-purple-400">{product.price}</span>
              </div>
            </div>

            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="font-bold mb-2">Payment Method</h3>
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg bg-gradient-to-r ${method?.color}`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-bold">{method?.name}</div>
                  <div className="text-sm text-gray-400">{method?.number}</div>
                </div>
              </div>
            </div>

            {/* Payment Status */}
            {paymentStatus === "waiting_payment" && (
              <div className="bg-yellow-900/20 border border-yellow-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-yellow-400 animate-pulse" />
                  <span className="font-bold text-yellow-400">Waiting for Payment</span>
                </div>
                <p className="text-sm text-gray-300 mt-2">{statusMessage}</p>
                <div className="mt-3 p-3 bg-red-900/20 border border-red-500/30 rounded">
                  <p className="text-red-400 text-sm font-bold">⚠️ IMPORTANT:</p>
                  <p className="text-red-300 text-xs mt-1">
                    Panel will ONLY be created after payment is confirmed. Send payment proof to WhatsApp: 08881382817
                  </p>
                </div>
              </div>
            )}

            {paymentStatus === "payment_confirmed" && (
              <div className="bg-blue-900/20 border border-blue-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-400" />
                  <span className="font-bold text-blue-400">Payment Confirmed</span>
                </div>
                <p className="text-sm text-gray-300 mt-2">{statusMessage}</p>
                <div className="mt-2 bg-blue-800/30 rounded-full h-2">
                  <div className="bg-blue-400 h-2 rounded-full animate-pulse" style={{ width: "70%" }}></div>
                </div>
              </div>
            )}

            {paymentStatus === "success" && (
              <div className="bg-green-900/20 border border-green-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="font-bold text-green-400">Success!</span>
                </div>
                <p className="text-sm text-gray-300 mt-2">{statusMessage}</p>
              </div>
            )}

            {paymentStatus === "timeout" && (
              <div className="bg-red-900/20 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-red-400" />
                  <span className="font-bold text-red-400">Payment Timeout</span>
                </div>
                <p className="text-sm text-gray-300 mt-2">{statusMessage}</p>
                <p className="text-xs text-gray-400 mt-1">Contact WhatsApp: 08881382817</p>
              </div>
            )}

            {!paymentStatus && (
              <div className="bg-gradient-to-r from-red-900/20 to-yellow-900/20 border border-red-500/30 p-4 rounded-lg">
                <h4 className="font-bold text-red-400 mb-2">⚠️ PAYMENT REQUIRED:</h4>
                <ol className="text-sm space-y-1 text-gray-300">
                  <li>1. Click "MAKE PAYMENT" button</li>
                  <li>2. Complete payment in {method?.name} app</li>
                  <li>3. Send payment proof to WhatsApp</li>
                  <li>4. Wait for confirmation</li>
                  <li>5. Panel will be created after payment verified</li>
                </ol>
                <div className="mt-2 p-2 bg-red-900/20 rounded text-xs text-red-400">🚫 NO PAYMENT = NO PANEL</div>
              </div>
            )}

            {/* Manual confirmation for testing (remove in production) */}
            {paymentStatus === "waiting_payment" && (
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                <h4 className="font-bold text-gray-300 mb-2">For Testing Only:</h4>
                <input
                  type="text"
                  placeholder="Enter payment proof/reference"
                  value={paymentProof}
                  onChange={(e) => setPaymentProof(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 rounded mb-2 text-sm"
                />
                <button
                  onClick={handleManualConfirm}
                  className="w-full px-3 py-2 bg-green-600 rounded text-sm hover:bg-green-700"
                >
                  Confirm Payment (Test)
                </button>
              </div>
            )}

            <div className="flex gap-3">
              {!isWaitingPayment && (
                <button
                  onClick={() => setShowPaymentInfo(false)}
                  className="flex-1 px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Back
                </button>
              )}
              <button
                onClick={() => handlePayNow(method)}
                disabled={paymentStatus === "waiting_payment" || paymentStatus === "payment_confirmed"}
                className={`flex-1 px-4 py-2 rounded-lg transition-colors bg-gradient-to-r ${method?.color} hover:opacity-90 flex items-center justify-center gap-2 disabled:opacity-50`}
              >
                <ExternalLink className="w-4 h-4" />
                {paymentStatus === "waiting_payment" ? "WAITING..." : "MAKE PAYMENT"}
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    )
  }

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
        className="bg-gray-900 rounded-lg p-6 w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            Choose Payment Method
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mb-6 p-4 bg-gray-800 rounded-lg">
          <h3 className="font-bold mb-2">Order Summary</h3>
          <div className="flex justify-between items-center">
            <span>{product?.name}</span>
            <span className="font-bold text-purple-400">{product?.price}</span>
          </div>
          <div className="text-sm text-gray-400 mt-2">Customer: {purchaseData?.email}</div>
        </div>

        <div className="space-y-3">
          <h3 className="font-bold mb-4">Select E-Wallet:</h3>
          {paymentMethods.map((method) => {
            const Icon = method.icon
            return (
              <button
                key={method.id}
                onClick={() => handlePaymentSelect(method)}
                className="w-full p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-all duration-300 flex items-center gap-4"
              >
                <div className={`p-3 rounded-lg bg-gradient-to-r ${method.color}`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 text-left">
                  <div className="font-bold">{method.name}</div>
                  <div className="text-sm text-gray-400">{method.number}</div>
                </div>
                <div className="text-purple-400">→</div>
              </button>
            )
          })}
        </div>

        <div className="mt-6 pt-4 border-t border-gray-700">
          <div className="bg-red-900/20 border border-red-500/30 p-3 rounded-lg mb-4">
            <p className="text-red-400 text-sm font-bold">⚠️ IMPORTANT NOTICE:</p>
            <p className="text-red-300 text-xs mt-1">
              Panel will ONLY be created after payment verification. No payment = No panel access.
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}
