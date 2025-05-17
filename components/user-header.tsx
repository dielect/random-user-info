"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface UserHeaderProps {
  userData: {
    Full_Name: string
    Username: string
    Occupation: string
    Gender: string
    Birthday: string
  }
}

export default function UserHeader({ userData }: UserHeaderProps) {
  // Calculate age from birthday
  const calculateAge = (birthday: string) => {
    const [month, day, year] = birthday.split("/").map(Number)
    const birthDate = new Date(year, month - 1, day)
    const today = new Date()
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }

    return age
  }

  const age = calculateAge(userData.Birthday)

  // Generate a random avatar using DiceBear API with the username as seed
  const avatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(userData.Username)}&backgroundColor=b6e3f4,c0aede,d1d4f9`

  return (
    <Card className="p-6 bg-white shadow-lg rounded-xl overflow-hidden">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }} className="relative">
          <div className="h-32 w-32 md:h-40 md:w-40 rounded-full overflow-hidden bg-indigo-100 border-4 border-indigo-200">
            <img
              src={avatarUrl || "/placeholder.svg"}
              alt={userData.Full_Name}
              className="h-full w-full object-cover"
            />
          </div>
        </motion.div>

        <div className="flex-1 text-center md:text-left w-full">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-2xl md:text-3xl font-bold text-gray-800"
          >
            {userData.Full_Name}
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-gray-500 mt-1"
          >
            @{userData.Username}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-3"
          >
            <Badge className="bg-indigo-100 text-indigo-800 hover:bg-indigo-200 mr-2">{userData.Gender}</Badge>
            <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200">{userData.Occupation}</Badge>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-4 text-gray-400 text-xs font-mono italic w-full"
          >
            A {age}-year-old {userData.Gender.toLowerCase()} working as a {userData.Occupation.toLowerCase()}. Born on{" "}
            {userData.Birthday}.
          </motion.p>
        </div>
      </div>
    </Card>
  )
}
