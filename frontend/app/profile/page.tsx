import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function ProfilePage() {
  return (
    <div className="min-h-screen flex flex-col bg-linear-to-tr from-[#012326] to-[#013e4a] font-sans dark:bg-black">
      <Header />
      <main className="flex-1 pt-24 mx-12">
        <div className="max-w-7xl mx-auto px-6 py-12 w-full">
          <h1 className="text-4xl font-bold text-white mb-8 text-center">
            Profile
          </h1>
        </div>
        <Card className="bg-gray-200 rounded-lg shadow-md mb-8 p-8">
          <div className="flex flex-col md:flex-row gap-24">
            <div className="flex-1 space-y-6">
              <h2 className="text-lg font-bold text-black uppercase mb-4">
                PERSONAL INFORMATION
              </h2>
              <div className="flex flex-row gap-8">
                <div className="flex-1">
                  <Label className="block text-sm font-semibold text-gray-700 mb-2">
                    First Name
                  </Label>
                  <Input type="text" placeholder="First Name" readOnly />
                </div>
                <div className="flex-1">
                  <Label className="block text-sm font-semibold text-gray-700 mb-2">
                    Last Name
                  </Label>
                  <Input type="text" placeholder="Last Name" readOnly />
                </div>
              </div>
              <Button className="bg-black text-white rounded-lg uppercase px-4 py-2 text-sm font-semibold">
                SAVE
              </Button>
              <div className="space-y-6 mt-4">
                <Label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email
                </Label>
                <Input type="email" placeholder="Email" readOnly />
                <Button className="bg-black text-white rounded-lg uppercase px-4 py-2 text-sm font-semibold">
                  CHANGE EMAIL
                </Button>
              </div>
              <div>
                <h2 className="text-lg font-bold text-black uppercase mb-4">
                  SIGN IN METHODS
                </h2>
                <Button className="bg-black text-white rounded-lg uppercase px-4 py-2 text-sm font-semibold">
                  <span className="text-white font-bold text-lg">G</span>
                  <span className="text-white">qiuyuan@gmail.com</span>
                </Button>
              </div>
            </div>
            <div className="flex flex-col items-center md:items-end pr-18">
              <div className="w-56 h-56 bg-gray-300 rounded-full overflow-hidden mb-8">
                <Image
                  src="/images/sample.png"
                  alt="Profile"
                  width={228}
                  height={228}
                />
              </div>
              <Button className="bg-black text-white rounded-lg uppercase px-4 py-2 text-sm font-semibold flex justify-center">
                CHANGE PHOTO
              </Button>
            </div>
          </div>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
