import { Webhook } from "svix";
import User from "../models/User.js";

export const ClerkWebhooks = async (req, res) => {
  // 1. Verify we have the required headers
  const requiredHeaders = ['svix-id', 'svix-signature', 'svix-timestamp'];
  const missingHeaders = requiredHeaders.filter(header => !req.headers[header]);

  if (missingHeaders.length > 0) {
    console.error('Missing required headers:', missingHeaders);
    return res.status(400).json({ error: 'Missing webhook headers' });
  }

  try {
    // 2. Initialize webhook verifier
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
    
    // 3. Verify the webhook (note: req.body should be RAW buffer)
    const payload = whook.verify(req.body.toString(), {
      "svix-id": req.headers["svix-id"],
      "svix-signature": req.headers["svix-signature"],
      "svix-timestamp": req.headers["svix-timestamp"]
    });

    const { data, type } = JSON.parse(payload);

    // 4. Validate required fields
    if (!data?.id) {
      return res.status(400).json({ error: 'Missing user ID in webhook payload' });
    }

    // 5. Handle different event types
    switch (type) {
      case "user.created": {
        const email = data.email_addresses?.[0]?.email_address;
        if (!email) {
          console.warn('User created without email:', data.id);
        }

        const userdata = {
          _id: data.id,
          name: `${data.first_name || ''} ${data.last_name || ''}`.trim(),
          email: email || "",
          image: data.image_url,
          resume: ""
        };

        await User.create(userdata);
        return res.json({ success: true, message: "User created" });
      }

      case "user.updated": {
        const updateData = {
          name: `${data.first_name || ''} ${data.last_name || ''}`.trim(),
          image: data.image_url
        };

        // Only update email if present
        if (data.email_addresses?.[0]?.email_address) {
          updateData.email = data.email_addresses[0].email_address;
        }

        await User.findByIdAndUpdate(data.id, updateData, { new: true });
        return res.json({ success: true, message: "User updated" });
      }

      case "user.deleted": {
        await User.findByIdAndDelete(data.id);
        return res.json({ success: true, message: "User deleted" });
      }

      default:
        console.log("Unhandled event type:", type);
        return res.status(200).json({ received: true }); // Still return 200 for unhandled but valid webhooks
    }
  } catch (err) {
    console.error("Webhook processing failed:", err);
    
    // Differentiate between verification errors and processing errors
    if (err.name === 'WebhookVerificationError') {
      return res.status(401).json({ error: "Invalid webhook signature" });
    }
    
    return res.status(500).json({ 
      error: "Internal server error",
      details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
};