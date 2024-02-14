import Sidebar from "@/components/Sidebar"


export const metadata = {
  title: 'Dashboard',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <>
      <Sidebar />
      {children}
    </>
  )
}
