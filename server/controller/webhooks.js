import { Webhook } from "svix";
import User from "../models/User.js";

export const ClerkWebhooks = async (req, res) => {
    try {
        const whook = new Webhook (process.env.CLERK_WEBHOOK_SECRET);

        // Verify the webhook signature
        await whook.verify(JSON.stringify(req.body), {
            "svix-id": req.headers["svix-id"],
            "svix-signature": req.headers["svix-signature"],
            "svix-timestamp": req.headers["svix-timestamp"]
        });

        const { data, type } = req.body;

        switch (type) {
            case "user.created": {
                const userdata = {
                    _id: data.id,
                    name: `${data.first_name} ${data.last_name}`,
                    email: data.email_addresses?.[0]?.email_address || "",
                    image: data.image_url,
                    resume: ""
                };
                await User.create(userdata);
                return res.json({ message: "User created successfully" });
            }
            case "user.updated": {
                const userdata = {
                    name: `${data.first_name} ${data.last_name}`,
                    email: data.email_addresses?.[0]?.email_address || "",
                    image: data.image_url
                };
                await User.findByIdAndUpdate(data.id, userdata);
                return res.json({ message: "User updated successfully" });
            }
            case "user.deleted": {
                await User.findByIdAndDelete(data.id);
                return res.json({ message: "User deleted successfully" });
            }
            default:
                console.log("Unhandled event type:", type);
                return res.status(400).json({ error: "Unhandled event type" });
        }
    } catch (err) {
        console.error("Webhook verification failed:", err);
        return res.status(400).json({ error: "Webhook verification failed" });
    }
};
