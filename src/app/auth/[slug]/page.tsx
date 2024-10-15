import Login from "@/components/Login";
import SignUp from "@/components/signup";
import ForGatePassword from "@/components/forgate-password";
import ChangePassword from "@/components/change-password";
export default function Page({ params }: { params: { slug: string } }) {
  console.log("routes is ", params.slug);

  if (params.slug === "login") {
    return <Login />;
  }  if (params.slug === "signup") {
    return <SignUp />;
  }  if (params.slug === "forgatepassword") {
    return <ForGatePassword />;
  }
  if (params.slug === "changepassword") {
    return <ChangePassword />;
    
  }
}
