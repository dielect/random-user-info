"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Loader2, RefreshCw, User, MapPin, CreditCard, Briefcase, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import UserInfoCard from "@/components/user-info-card"
import UserHeader from "@/components/user-header"
import { Toaster } from "@/components/ui/toaster"

interface UserAddress {
  Address: string
  Telephone: string
  City: string
  Zip_Code: string
  State: string
  State_Full: string
  Expires: string
  Credit_Card_Type: string
  Credit_Card_Number: string
  CVV2: string
  Full_Name: string
  Gender: string
  Full_Name_Tran: string
  Title: string
  Birthday: string
  Username: string
  Password: string
  Height: string
  Weight: string
  Temporary_mail: string
  System: string
  Blood_Type: string
  Browser_User_Agent: string
  Educational_Background: string
  Hair_Color: string
  Occupation: string
  Website: string
  Monthly_Salary: string
  Employment_Status: string
  Company_Name: string
  Social_Security_Number?: string
  Security_Question?: string
  Security_Answer?: string
}

interface ApiResponse {
  address: UserAddress
  status: string
}

export default function Home() {
  const [userData, setUserData] = useState<UserAddress | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchUserData = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch("https://address.mianfei.uk/")
      if (!response.ok) {
        throw new Error("Failed to fetch data")
      }
      const data: ApiResponse = await response.json()
      if (data.status === "ok") {
        setUserData(data.address)
      } else {
        throw new Error("API returned an error")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUserData()
  }, [])

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto"
      >
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-indigo-800">Random User Profile</h1>
          <Button onClick={fetchUserData} disabled={loading} className="bg-indigo-600 hover:bg-indigo-700">
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <RefreshCw className="mr-2 h-4 w-4" />}
            Refresh
          </Button>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6"
          >
            {error}
          </motion.div>
        )}

        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center items-center h-[60vh]"
            >
              <Loader2 className="h-16 w-16 text-indigo-600 animate-spin" />
            </motion.div>
          ) : userData ? (
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <UserHeader userData={userData} />

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                <UserInfoCard
                  title="Personal Information"
                  icon={<User className="h-5 w-5 text-indigo-600" />}
                  items={[
                    { label: "Full Name", value: userData.Full_Name },
                    { label: "Chinese Name", value: userData.Full_Name_Tran },
                    { label: "Gender", value: userData.Gender },
                    { label: "Birthday", value: userData.Birthday },
                    { label: "Blood Type", value: userData.Blood_Type },
                    { label: "Height", value: userData.Height },
                    { label: "Weight", value: userData.Weight },
                    { label: "Hair Color", value: userData.Hair_Color },
                  ]}
                />

                <UserInfoCard
                  title="Contact Information"
                  icon={<MapPin className="h-5 w-5 text-emerald-600" />}
                  items={[
                    { label: "Address", value: userData.Address },
                    { label: "City", value: userData.City },
                    { label: "State", value: `${userData.State} (${userData.State_Full})` },
                    { label: "Zip Code", value: userData.Zip_Code },
                    { label: "Telephone", value: userData.Telephone },
                    { label: "Email", value: userData.Temporary_mail },
                    { label: "Website", value: userData.Website },
                  ]}
                />

                <UserInfoCard
                  title="Financial Information"
                  icon={<CreditCard className="h-5 w-5 text-amber-600" />}
                  items={[
                    { label: "Credit Card", value: `${userData.Credit_Card_Type} (${userData.Credit_Card_Number})` },
                    { label: "CVV", value: userData.CVV2 },
                    { label: "Expires", value: userData.Expires },
                    { label: "Monthly Salary", value: userData.Monthly_Salary },
                  ]}
                />

                <UserInfoCard
                  title="Professional Information"
                  icon={<Briefcase className="h-5 w-5 text-blue-600" />}
                  items={[
                    { label: "Occupation", value: userData.Occupation },
                    { label: "Employment Status", value: userData.Employment_Status },
                    { label: "Company Name", value: userData.Company_Name },
                    { label: "Education", value: userData.Educational_Background },
                  ]}
                />

                <UserInfoCard
                  title="Account Information"
                  icon={<Shield className="h-5 w-5 text-purple-600" />}
                  items={[
                    { label: "Username", value: userData.Username },
                    { label: "Password", value: userData.Password },
                    { label: "SSN", value: userData.Social_Security_Number || "N/A" },
                    { label: "Security Question", value: userData.Security_Question || "N/A" },
                    { label: "Security Answer", value: userData.Security_Answer || "N/A" },
                  ]}
                />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="no-data"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded"
            >
              No user data available. Please try refreshing.
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      <Toaster />
    </main>
  )
}
