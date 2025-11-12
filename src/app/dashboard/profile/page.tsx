import { UserProfile } from "@clerk/nextjs";

export default function ProfilePage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight mb-8">My Profile</h1>
      <UserProfile
        appearance={{
          elements: {
            card: "shadow-none",
            headerTitle: "text-2xl",
          },
        }}
      />
    </div>
  );
}
