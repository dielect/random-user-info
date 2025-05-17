"use client"

import { useState, type ReactNode } from "react"
import { motion } from "framer-motion"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

interface InfoItem {
  label: string
  value: string
}

interface UserInfoCardProps {
  title: string
  icon: ReactNode
  items: InfoItem[]
}

export default function UserInfoCard({ title, icon, items }: UserInfoCardProps) {
  const { toast } = useToast()
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  const copyToClipboard = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedIndex(index)
      toast({
        title: "Copied to clipboard",
        description: "The information has been copied to your clipboard.",
        duration: 2000,
      })
      setTimeout(() => setCopiedIndex(null), 2000)
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Could not copy text to clipboard.",
        variant: "destructive",
        duration: 2000,
      })
    }
  }

  return (
    <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
      <Card className="h-full overflow-hidden hover:shadow-md transition-shadow duration-300">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center text-lg font-medium">
            {icon}
            <span className="ml-2">{title}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <motion.div variants={container} initial="hidden" animate="show" className="space-y-2">
            {items.map((info, index) => (
              <motion.div
                key={index}
                variants={item}
                onClick={() => copyToClipboard(info.value, index)}
                className={`grid grid-cols-3 gap-2 py-1 border-b border-gray-100 last:border-0 relative cursor-pointer hover:bg-gray-50 transition-colors duration-150 ${
                  copiedIndex === index ? "bg-gray-100" : ""
                }`}
                role="button"
                tabIndex={0}
                aria-label={`Copy ${info.label}: ${info.value}`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    copyToClipboard(info.value, index)
                  }
                }}
              >
                <div className="text-sm font-medium text-gray-500">{info.label}</div>
                <div className="text-sm col-span-2 text-gray-800 break-words">{info.value}</div>
              </motion.div>
            ))}
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
