// "use client"

// import { useRouter } from "next/router";
// import { useState } from "react";

// export default function LoginPage() {
//     const router = useRouter();
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [isLoading, setIsLoading] = useState(false);
//     const [error, setError] = useState<string | null>(null);

//     const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
//         setIsLoading(true);
//         setError(null);

//         try {
//           const result = await signIn.email({
//             email,
//             password,
//           });

//           if (result.error) {
//             setError(result.error.message || "Login failed. Please try again.");
//           } else {
//             router.push("/profile");
//           }
//         } catch (err) {
//           setError("An unexpected error occurred. Please try again.");
//         } finally {
//           setIsLoading(false);
//         }
//       };
// }
