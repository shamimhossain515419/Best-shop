
import AuthUser from "@/middleware/AuthUser";
import { NextResponse } from "next/server";

const stripe = require("stripe")(
     "sk_test_51NEGeNGO16nc6gMPNLQWKAnCbDIhWGcQ9CJzJALKGq020sbMrbcOxmZXIlUjnJY4AInn9vkXGwTRuyoBAKSbRXsS00wfIQuIIO"
);

export const dynamic = "force-dynamic";

export async function POST(req) {
     try {
          const isAuthUser = await AuthUser(req);
          if (isAuthUser) {
               const res = await req.json();

               const session = await stripe.checkout.sessions.create({
                    payment_method_types: ["card"],
                    line_items: res,
                    mode: "payment",
                    success_url: "https://best-shop-sigma.vercel.app/checkout" + "?status=success",
                    cancel_url: "https://best-shop-sigma.vercel.app/checkout" + "?status=cancel",
               });

               return NextResponse.json({
                    success: true,
                    id: session.id,
               });
          } else {
               return NextResponse.json({
                    success: true,
                    message: "You are not authenticated",
               });
          }
     } catch (e) {
          console.log(e);
          return NextResponse.json({
               status: 500,
               success: false,
               message: "Something went wrong ! Please try again",
          });
     }
}
