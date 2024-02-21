import Image from "next/image"

export const GoogleIcon = () => (<Image src={'/assets/icons/google.svg'} width={0} height={0} alt="google" className="w-5 h-auto"/>)
export const AvatarIcon = ({className}) => (<Image src={'/assets/icons/avatar.svg'} width={0} height={0} alt="Profile" className={`w-5 h-auto ${className}`}/>)
export const GeminiIcon = () => (<Image src={'/assets/icons/gemini.png'} width={40} height={40} alt="Gemini"/>)
export const GPTIcon = () => (<Image src={'/assets/icons/gpt.png'} width={40} height={40} alt="GPT"/>)
export const AssessAIIcon = () => (<Image src={'/assets/logo.png'} width={40} height={40} alt="Assess AI"/>)
