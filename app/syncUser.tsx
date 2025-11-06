"use client"
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { useEffect } from "react";

export default function SyncClerkToConvex() {
    const {user} = useUser();
    const syncUser = useMutation(api.users.syncUser);

    useEffect(() => {

        console.log("Syncing user to Convex:", user);
        if(!user) return

        syncUser({
            userId: user.id,
            email: user.primaryEmailAddress?.emailAddress || "",
            isPremium: (user.publicMetadata?.isPremium as boolean) || false,
        }).then(() => console.log("User synced to convex "))
        .catch((error) => console.error("User sync failed", error))
    }, [user, syncUser]);

    return null;
}