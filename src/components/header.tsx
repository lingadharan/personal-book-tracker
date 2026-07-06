import Image from 'next/image'

export default function Header() {
  return (
    <div className='flex justify-between gap-3 p-2'>
      <Image src="/next.svg" alt="Next.js Logo" width={100} height={20} />
      <h1 className=' font-bold text-4xl'>Personal Book Tracker</h1>
      <button>Sign Up</button>
    </div>
  )
}