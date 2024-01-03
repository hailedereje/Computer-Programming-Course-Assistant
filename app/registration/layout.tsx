export default function registration({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="h-screen flex items-center justify-center bg-[#2196f3] text-black p-5">
        {children}
    </div>
  )
}
