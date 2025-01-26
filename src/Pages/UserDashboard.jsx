import { LoanApplicationForm } from "../components/App Components/LoanApplicationForm";
import UserLayout from "../components/App Components/UserLayout";

export function UserDashboard(){
    return(
        <UserLayout>
            <h1>User Dashboard</h1>
            {/* User Dashboard Content */}
            <LoanApplicationForm />
        </UserLayout>
    )
}